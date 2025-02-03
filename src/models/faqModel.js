const mongoose = require('mongoose'); 

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true, // Ensure question is required
  },
  question_hi: {
    type: String,
  },
  question_fr: {
    type: String,
  },
  answer: {
    type: String,
    required: true, // Ensure answer is also required
  }
}, { timestamps: true });

// Method to get the translated question
faqSchema.methods.getTranslatedQuestion = function(lang) {
  if (lang === 'hi' && this.question_hi) return this.question_hi;
  if (lang === 'bn' && this.question_bn) return this.question_bn;
  return this.question;  // Default to original question
};

const FAQ = mongoose.model('FAQ', faqSchema);
module.exports = FAQ;
