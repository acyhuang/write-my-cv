const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('=== Generate CV Route ===');
  console.log('1. Route accessed');
  console.log('Request body:', {
    resumeLength: req.body.resume?.length || 0,
    jobDescriptionLength: req.body.jobDescription?.length || 0,
    messagesCount: req.body.messages?.length || 0
  });

  const { resume, jobDescription, messages } = req.body;
  
  const anthropic = new Anthropic({
    apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY,
  });

  try {
    console.log('2. Creating prompt...');
    const prompt = `
            Resume: ${resume}
            
            Job Description: ${jobDescription}
            
            Please provide two things:
            1. A message explaining what you did (this will be added to the conversation history)
            2. The generated cover letter
            
            Format your response as a JSON object with these exact keys:
            {
              "message": "your explanation message here", 
              "coverLetter": "the full cover letter here"
            }
          `;

    console.log('3. Calling Anthropic API...');
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      messages: [
        ...messages.map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        })),
        {
          role: 'user',
          content: prompt
        }
      ],
      system: "Always respond with valid JSON matching the requested format. Ensure all quotes are properly escaped.",
    });

    console.log('4. Received Anthropic response');
    const jsonResponse = JSON.parse(response.content.join(''));

    console.log('5. Parsed response successfully');
    res.json(jsonResponse);
  } catch (error) {
    console.error('6. Error occurred:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ error: 'Failed to generate cover letter' });
  }
});

module.exports = router; 