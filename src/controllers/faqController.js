const FAQ = require('../models/faqModel');
const redis = require('redis');
const redisClient = require('../config/redis');
const translateText = require('../utils/translate');
const googleTranslate = require('googletrans');

// Add new FAQ with translations
// Add new FAQ with translations
exports.addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Use googletrans to translate the question to French and Hindi
    const translate = new googleTranslate.Translate();
    
    const translateToLanguages = async (text, languages) => {
      const translations = {};
      for (let lang of languages) {
        try {
          const translatedText = await translate.translate(text, lang);
          translations[lang] = translatedText.text;
        } catch (err) {
          console.error(`Error translating to ${lang}:`, err);
          translations[lang] = text; // Fallback to original text (English)
        }
      }
      return translations;
    };

    // Translate question to Hindi and French, fallback to English if error occurs
    const translatedQuestions = await translateToLanguages(question, ['hi', 'fr']);
    
    const faq = new FAQ({
      question: question, // Original (English) question
      question_hi: translatedQuestions['hi'], // Hindi translation
      question_fr: translatedQuestions['fr'], // French translation
      answer: answer, // Answer remains in English
    });

    await faq.save();
    res.status(201).json({ message: 'FAQ created successfully', faq });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add FAQ' });
  }
};


// Get all FAQs with Redis caching and translation support
exports.getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || 'en';  // Default to 'en' if no language is provided
    const cacheKey = `faqs:${lang}`;  // Cache key for the selected language

    // Check Redis cache for FAQs
    redisClient.get(cacheKey, async (err, cachedData) => {
      if (err) {
        console.log('Redis get error:', err);
        return res.status(500).json({ error: 'Server Error' });
      }

      if (cachedData) {
        console.log('Using cached data');
        return res.status(200).json(JSON.parse(cachedData));  // Return cached data
      }

      // If no cache found, fetch data from MongoDB
      const faqs = await FAQ.find();

      // Translate questions if necessary
      const translatedFAQs = await Promise.all(faqs.map(async (faq) => {
        const translatedQuestion = await translateText(faq[`question_${lang}`] || faq.question_en, lang);
        return {
          id: faq._id,
          question: translatedQuestion,
          answer: faq.answer, // Answer remains the same (or could be translated)
        };
      }));

      // Cache the result for 1 hour (3600 seconds)
      redisClient.setex(cacheKey, 3600, JSON.stringify(translatedFAQs));

      res.status(200).json(translatedFAQs);
    });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Check if a cache key exists
exports.checkCacheExists = async (req, res) => {
  const { lang } = req.query;
  const cacheKey = `faqs:${lang}`;  // Cache key pattern

  try {
    redisClient.exists(cacheKey, (err, reply) => {
      if (err) {
        console.error('Redis error:', err); // Log the error
        return res.status(500).json({ error: 'Redis error' });
      }

      if (reply === 1) {
        return res.status(200).json({ message: `Cache exists for ${cacheKey}` });
      } else {
        return res.status(404).json({ message: `Cache not found for ${cacheKey}` });
      }
    });
  } catch (error) {
    console.error('Error in checkCacheExists:', error); // Log the error
    return res.status(500).json({ error: 'Server error' });
  }
};

// View Cached Data
exports.viewCacheData = async (req, res) => {
  const { lang } = req.query;
  const cacheKey = `faqs:${lang}`;

  redisClient.get(cacheKey, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Redis error' });
    }

    if (data) {
      res.status(200).json(JSON.parse(data));  // Return the cached data
    } else {
      res.status(404).json({ message: `Cache not found for ${cacheKey}` });
    }
  });
};

// Delete Cached Data
exports.deleteCacheData = async (req, res) => {
  const { lang } = req.query;
  const cacheKey = `faqs:${lang}`;

  redisClient.del(cacheKey, (err, response) => {
    if (err) {
      return res.status(500).json({ error: 'Redis error' });
    }

    if (response === 1) {
      res.status(200).json({ message: `Cache for ${cacheKey} deleted` });
    } else {
      res.status(404).json({ message: `Cache not found for ${cacheKey}` });
    }
  });
};

// Update an existing FAQ by ID
exports.updateFAQ = async (req, res) => {
  try {
    const { question, answer, question_hi, question_bn } = req.body;

    // Use the ID from the URL to find the FAQ
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      req.params.id, // ID comes from req.params
      { question, answer, question_hi, question_bn }, // New data to update
      { new: true, runValidators: true } // Return updated document and validate
    );

    if (!updatedFAQ) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    res.status(200).json({ message: 'FAQ updated successfully', updatedFAQ });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update FAQ' });
  }
};
