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
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  try {
    console.log('2. Creating prompt...');
    const latestUserMessage = messages[messages.length - 1]?.text || "No instructions";
    
    const prompt = `
Current cover letter: ${req.body.currentCoverLetter || "No existing cover letter"}

User instructions: ${latestUserMessage}

Generate a cover letter based on the resume and job description in previous messages. Do not include information about the candidate that is not present in their resume unless they provide it in their instructions.

Please provide two things:
1. A message explaining how you followed the instructions (this will be added to the conversation history)
2. The generated cover letter

Format your response as a JSON object with these exact keys:
{
  "message": "your explanation message here", 
  "coverLetter": "the full cover letter here"
}
    `;
    
    console.log('Prompt:', prompt);

    const history = [
      {
        role: 'user',
        content: `Resume:\n\`\`\`\n${resume}\n\`\`\` \n Job description:\n\`\`\`\n${jobDescription}\n\`\`\``
      },
      {
        role: 'assistant',
        content: '{"message": "Thank you! I have reviewed your resume and job description.", "coverLetter": ""}'
      },
      ...messages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      {
        role: 'user',
        content: prompt
      }
    ];
    
    console.log('3. Calling Anthropic API...');
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      messages: history,
      system: `Always respond with valid JSON matching the requested format. 
      Ensure all quotes are properly escaped. 
      Do not include any text before or after the JSON object. 
      All newlines in strings should be escaped as \\n.`,
    });

    console.log('MESSAGE HISTORY:', history.map(msg => ({
      role: msg.role,
      content: msg.content
    })));

    console.log('4. Received Anthropic response');
    const responseContent = response.content[0].text;
    
    let jsonResponse;
    try {
      const trimmedResponse = responseContent.trim();
      jsonResponse = JSON.parse(trimmedResponse);
    } catch (error) {
      console.error('JSON parsing error:', error);
      console.log('Raw response:', responseContent);
      throw new Error('Failed to parse AI response.');
    }

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