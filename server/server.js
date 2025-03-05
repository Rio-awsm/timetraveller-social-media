const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
};

const extractJsonFromText = (text) => {
  try {
    return JSON.parse(text);
  } catch (e) {
    let cleanedText = text;
    const codeBlockRegex = /```(?:\w+)?\s*([\s\S]*?)```/g;
    const codeBlockMatch = codeBlockRegex.exec(cleanedText);
    if (codeBlockMatch && codeBlockMatch[1]) {
      cleanedText = codeBlockMatch[1].trim();
      try {
        return JSON.parse(cleanedText);
      } catch (e) {
      }
    }
    const firstBrace = cleanedText.indexOf('{');
    const lastBrace = cleanedText.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && firstBrace < lastBrace) {
      const jsonSubstring = cleanedText.substring(firstBrace, lastBrace + 1);
      try {
        return JSON.parse(jsonSubstring);
      } catch (e) {
      }
    }
    const firstBracket = cleanedText.indexOf('[');
    const lastBracket = cleanedText.lastIndexOf(']');
    
    if (firstBracket !== -1 && lastBracket !== -1 && firstBracket < lastBracket) {
      const jsonSubstring = cleanedText.substring(firstBracket, lastBracket + 1);
      try {
        return JSON.parse(jsonSubstring);
      } catch (e) {
      }
    }
  
    let fixedText = cleanedText.replace(/'/g, '"');
    fixedText = fixedText.replace(/(\w+):/g, '"$1":');
    
    fixedText = fixedText.replace(/:\s*"([^"]*?)\\?"([^"]*?)"/g, ': "$1\\"$2"');
    
    fixedText = fixedText.replace(/,\s*}/g, '}').replace(/,\s*\]/g, ']');
    
 
    try {
      return JSON.parse(fixedText);
    } catch (e) {
      const jsonPattern = /(\{[\s\S]*?\}|\[[\s\S]*?\])/g;
      const matches = Array.from(cleanedText.matchAll(jsonPattern));
      
      for (const match of matches) {
        try {
          return JSON.parse(match[0]);
        } catch (e) {
        }
      }
      
      try {
        
        if (cleanedText.includes('{') && cleanedText.includes('}')) {
          const objectRegex = /\{[\s\S]*\}/;
          const objectMatch = cleanedText.match(objectRegex);
          if (objectMatch) {
            
            let potentialJson = objectMatch[0]
              .replace(/(\w+)(?=:)/g, '"$1"')
              .replace(/:\s*'([^']*)'/g, ': "$1"')
              .replace(/,\s*}/g, '}')
              .replace(/\\/g, '\\\\')
              .replace(/(?<!\\)"/g, '\\"')
              .replace(/\\\\"/g, '\\"')
              .replace(/^/, '"text":')
              .replace(/^"text":/, '{"text":')
              .replace(/$/g, '}');
            
            try {
              return JSON.parse(potentialJson);
            } catch (e) {
              
              return { 
                error: "Could not parse JSON", 
                originalText: text.substring(0, 1000) 
              };
            }
          }
        }
        
        if (cleanedText.includes('[') && cleanedText.includes(']')) {
          const arrayRegex = /\[[\s\S]*\]/;
          const arrayMatch = cleanedText.match(arrayRegex);
          if (arrayMatch) {
           
            let potentialJson = arrayMatch[0]
              .replace(/'/g, '"') 
              .replace(/,\s*\]/g, ']'); 
            
            try {
              return JSON.parse(potentialJson);
            } catch (e) {
              
            }
          }
        }
      } catch (e) {
        
      }
      
      return { 
        parsingError: true,
        message: "Could not extract valid JSON",
        textSample: text.substring(0, 200) + (text.length > 200 ? "..." : "")
      };
    }
  }
};



app.post('/api/generate-event', async (req, res) => {
  try {
    const { period, eventType } = req.body;
    const model = getGeminiModel();
    const prompt = `Generate a detailed ${period.includes("future") || parseInt(period) > 2025 ? "speculative future" : "historical"} event from ${period}${eventType ? ` related to ${eventType}` : ''}. 
    ${period.includes("future") || parseInt(period) > 2025 ? "The event should be creative yet plausible, considering current technological trends and societal developments." : "The event should be factually accurate with respect to the time period."}
    Include the date, location, key figures involved, and a brief description of what happened. 
    Your response should be formatted as a JSON object with the following structure:
    {
      "title": "Name of the event",
      "date": "Date of the event",
      "location": "Where it happened",
      "description": "A paragraph describing what happened",
      "keyFigures": ["Person 1", "Person 2"]
    }
    Ensure your response is properly formatted JSON without any markdown syntax or code blocks.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const eventData = extractJsonFromText(text);
    res.json({ success: true, data: eventData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || 'Failed to generate event' });
  }
});

app.post('/api/generate-posts', async (req, res) => {
  try {
    const { event, platform, tone, personalities } = req.body;
    const model = getGeminiModel();
    const personasPrompt = personalities && personalities.length > 0 
      ? personalities.join(', ') 
      : 'Politician, Conspiracy Theorist, Comedian, Average Citizen, Scholar';
    const isFuture = event.date.includes("future") || (new Date(event.date) > new Date("2025-01-01"));
    const prompt = `Create social media posts about this ${isFuture ? "future" : "historical"} event: "${event.title} - ${event.description}" 
    in the style of ${platform || 'Twitter'} with a ${tone || 'humorous'} tone.
    Generate 5-8 posts from different perspectives including: ${personasPrompt}.
    ${isFuture ? "For this future event, imagine how social media might evolve, but keep the format recognizable." : "The posts should be historically appropriate but in social media format."}
    For each post include:
    1. Username (${isFuture ? "futuristic but creative" : "historically appropriate but creative"})
    2. Handle (for Twitter-like platforms)
    3. Post content (${isFuture ? "language that reflects future cultural norms but in recognizable social media format" : "appropriate language/style for the era but in social media format"})
    4. Number of likes/shares (realistic numbers ${isFuture ? "for future social media" : ""})
    5. Timestamp (relative to when the event occurred)
    6. A relevant hashtag they might use
    7. Persona type (e.g. Politician, Comedian, etc.)
    Your response should be a JSON array with objects containing these fields, structured like this:
    [
      {
        "username": "Name",
        "handle": "handle",
        "content": "Post text",
        "likes": 42,
        "shares": 12,
        "timestamp": "2 hours after the event",
        "hashtag": "EventTag",
        "persona": "Politician"
      }
    ]
    Ensure your response is properly formatted JSON without any markdown syntax or code blocks.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const postsData = extractJsonFromText(text);
    res.json({ success: true, data: postsData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || 'Failed to generate social media posts' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
