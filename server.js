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

// AI News API
app.get('/api/ai-news', async (req, res) => {
  try {
    // Try Hacker News
    const hackRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = await hackRes.json();
    
    const stories = [];
    for (let i = 0; i < Math.min(6, storyIds.length); i++) {
      const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyIds[i]}.json`);
      const story = await storyRes.json();
      if (story.title && (story.title.toLowerCase().includes('ai') || story.title.toLowerCase().includes('ml'))) {
        stories.push({
          title: story.title,
          source: 'Hacker News',
          category: 'AI/ML',
          time: '2h ago',
          link: story.url
        });
        if (stories.length >= 6) break;
      }
    }

    res.json(stories.length > 0 ? stories : [
      {
        title: 'Claude 3.5 Sonnet Released',
        source: 'Anthropic',
        category: 'LLM',
        time: '2h ago',
        link: '#'
      },
      {
        title: 'OpenAI o1 Model Announced',
        source: 'OpenAI',
        category: 'AI Models',
        time: '4h ago',
        link: '#'
      },
      {
        title: 'Open Source LLMs Advancing',
        source: 'Meta Research',
        category: 'Open Source',
        time: '6h ago',
        link: '#'
      }
    ]);
  } catch (error) {
    res.json([
      { title: 'Claude AI Update', source: 'Anthropic', category: 'LLM', time: '2h', link: '#' },
      { title: 'GPT-4 Turbo', source: 'OpenAI', category: 'Models', time: '4h', link: '#' }
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
