const fs = require('fs');
const OpenAI = require('openai');

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analyzeBody(imagePath) {
    const base64Image = fs.readFileSync(imagePath, {
        encoding: 'base64',
    });

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
            {
                role: "system",
                content: `
                You are a fitness analysis AI. 
Return ONLY valid JSON in this exact format:

{
  "bodyFat": number,
  "bodyType": "ectomorph | mesomorph | endomorph",
  "posture": string,
  "muscleDistribution": {
    "chest": number (1-10),
    "arms": number (1-10),
    "core": number (1-10),
    "legs": number (1-10)
  },
  "recommendations": string[]
}
  `,
    },
    {
        role: "user",
        content: [
            { type: "text", text: "Analyze this physique." },
            {
                type: "iamge_url",
                image_url: {
                    url: `data:image/jpeg;base64,${base64Image}`,
                    },
                }.

            ],
            },
        ],
    });
    return JSON.parse(response.choices[0].message.content);
}

module.exports = { analyzeBody };