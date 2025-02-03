const googleTranslate = require('googletrans');

const translateText = async (text, targetLang = 'en') => {
  try {
    const translated = await googleTranslate.translate(text, { to: targetLang });
    return translated.text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text in case of error
  }
};

module.exports = translateText;
