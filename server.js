import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve static React build
app.use(express.static(path.join(__dirname, 'dist')));

// AI News API - Curated real-time AI updates
app.get('/api/ai-news', async (req, res) => {
  try {
    let stories = [];
    
    // Try Hacker News for AI/ML stories with timeout
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      
      const hackRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', { 
        signal: controller.signal 
      });
      clearTimeout(timeout);
      
      if (hackRes.ok) {
        const storyIds = await hackRes.json();
        
        for (let i = 0; i < Math.min(30, storyIds.length) && stories.length < 6; i++) {
          try {
            const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyIds[i]}.json`, {
              signal: controller.signal
            });
            
            if (storyRes.ok) {
              const story = await storyRes.json();
              
              if (!story.title) continue;
              
              const title = story.title.toLowerCase();
              const isAIRelated = title.includes('ai') || title.includes('ml') || title.includes('llm') || 
                                 title.includes('gpt') || title.includes('claude') || title.includes('neural') ||
                                 title.includes('model') || title.includes('agent') || title.includes('transformer') ||
                                 title.includes('deep learning') || title.includes('machine learning');
              
              if (isAIRelated) {
                stories.push({
                  title: story.title,
                  source: 'Hacker News',
                  category: 'Trending',
                  score: story.score || 0,
                  link: story.url || `https://news.ycombinator.com/item?id=${story.id}`
                });
              }
            }
          } catch (itemError) {
            // Skip individual story on error
            continue;
          }
        }
      }
    } catch (hackError) {
      console.log('Hacker News fetch failed, using fallback');
    }
    
    // Always ensure we have curated fallback content
    const curatedNews = [
      {
        title: 'Agentic AI Systems Transforming Enterprise Automation',
        source: 'AI Architecture Trends',
        category: 'Agents',
        score: 180,
        link: '#'
      },
      {
        title: 'Open Source LLMs Closing the Gap with Proprietary Models',
        source: 'Model Development',
        category: 'Open Source',
        score: 160,
        link: '#'
      },
      {
        title: 'Multimodal AI: Vision + Language Models in Production',
        source: 'Tech Research',
        category: 'Models',
        score: 140,
        link: '#'
      },
      {
        title: 'Enterprise AI Adoption Accelerates Across Industries',
        source: 'Industry Analysis',
        category: 'Enterprise',
        score: 130,
        link: '#'
      },
      {
        title: 'Reasoning AI and Chain-of-Thought Systems Advance',
        source: 'Research Labs',
        category: 'Reasoning',
        score: 120,
        link: '#'
      },
      {
        title: 'Document Processing with Vision Models and LLMs',
        source: 'Automation Tech',
        category: 'AI Tools',
        score: 110,
        link: '#'
      },
      {
        title: 'Low-Code AI Platforms Enable Faster Deployment',
        source: 'Developer Tools',
        category: 'No-Code',
        score: 100,
        link: '#'
      },
      {
        title: 'AI Safety and Alignment: New Frameworks Emerging',
        source: 'Safety Research',
        category: 'Safety',
        score: 90,
        link: '#'
      }
    ];
    
    // Merge real stories with curated fallback, removing duplicates
    const mergedStories = [];
    const seen = new Set();
    
    // Add real stories first
    stories.forEach(story => {
      const key = story.title.toLowerCase();
      if (!seen.has(key)) {
        mergedStories.push(story);
        seen.add(key);
      }
    });
    
    // Fill remaining slots with curated content
    curatedNews.forEach(story => {
      if (mergedStories.length < 8) {
        const key = story.title.toLowerCase();
        if (!seen.has(key)) {
          mergedStories.push(story);
          seen.add(key);
        }
      }
    });
    
    console.log(`Returning ${mergedStories.length} AI news stories (${stories.length} real, ${mergedStories.length - stories.length} curated)`);
    res.json(mergedStories.slice(0, 8));
  } catch (error) {
    console.error('AI News API error:', error);
    // Return curated fallback on any error
    res.json([
      { title: 'Agentic AI is Reshaping Automation', source: 'AI Trends', category: 'Featured', score: 150, link: '#' },
      { title: 'Latest Advances in Large Language Models', source: 'Tech News', category: 'LLM', score: 140, link: '#' },
      { title: 'Open Source Models Drive Innovation', source: 'Community', category: 'Open Source', score: 130, link: '#' },
      { title: 'AI in Enterprise: Production Success Stories', source: 'Business', category: 'Enterprise', score: 120, link: '#' }
    ]);
  }
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✨ Server running on port ${PORT}`);
});
