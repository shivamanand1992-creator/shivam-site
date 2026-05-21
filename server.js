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

// AI News API - Real-time updates from multiple sources
app.get('/api/ai-news', async (req, res) => {
  try {
    const stories = [];
    
    // Try Hacker News for AI/ML stories
    try {
      const hackRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const storyIds = await hackRes.json();
      
      for (let i = 0; i < Math.min(20, storyIds.length) && stories.length < 4; i++) {
        const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyIds[i]}.json`);
        const story = await storyRes.json();
        
        const title = (story.title || '').toLowerCase();
        const isAIRelated = title.includes('ai') || title.includes('ml') || title.includes('llm') || 
                           title.includes('gpt') || title.includes('claude') || title.includes('neural') ||
                           title.includes('model') || title.includes('agent') || title.includes('transformer');
        
        if (story.title && isAIRelated) {
          stories.push({
            title: story.title,
            source: 'Hacker News',
            category: 'Trending',
            score: story.score || 0,
            link: story.url || `https://news.ycombinator.com/item?id=${story.id}`
          });
        }
      }
    } catch (e) {
      console.log('Hacker News fetch failed');
    }
    
    // Fallback curated AI news if not enough from HN
    if (stories.length < 4) {
      stories.push(
        {
          title: 'Latest Advances in Agentic AI Systems',
          source: 'AI Research',
          category: 'Agents',
          score: 150,
          link: '#'
        },
        {
          title: 'Open Source LLMs Compete with Proprietary Models',
          source: 'Tech News',
          category: 'Open Source',
          score: 120,
          link: '#'
        },
        {
          title: 'Enterprise AI Adoption Accelerates',
          source: 'Industry Report',
          category: 'Enterprise',
          score: 110,
          link: '#'
        },
        {
          title: 'Multimodal Models Transform AI Capabilities',
          source: 'Research',
          category: 'Models',
          score: 100,
          link: '#'
        }
      );
    }
    
    res.json(stories.slice(0, 8));
  } catch (error) {
    console.error('AI News API error:', error);
    res.json([
      { title: 'AI News Updates', source: 'Multiple Sources', category: 'Real-time Feed', score: 100, link: '#' },
      { title: 'Latest in Machine Learning', source: 'Tech Community', category: 'ML', score: 95, link: '#' }
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
