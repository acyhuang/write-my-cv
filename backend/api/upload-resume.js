const pdf = require('pdf-parse');

async function parseResume(fileBuffer) {
  try {
    const data = await pdf(fileBuffer);
    return { text: data.text };
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Invalid PDF format or corrupted file');
  }
}

module.exports = {
  parseResume
}; 