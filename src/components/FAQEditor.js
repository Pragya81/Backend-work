import React, { useState } from 'react';
import CKEditor from 'ckeditor4-react';

const FAQEditor = ({ onSave }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [questionHi, setQuestionHi] = useState('');
  const [questionBn, setQuestionBn] = useState('');

  const handleSave = () => {
    const faqData = {
      question,
      answer,
      question_hi: questionHi,
      question_bn: questionBn,
    };
    onSave(faqData);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter FAQ Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <textarea
        placeholder="Enter Hindi Translation"
        value={questionHi}
        onChange={(e) => setQuestionHi(e.target.value)}
      />
      <textarea
        placeholder="Enter Bengali Translation"
        value={questionBn}
        onChange={(e) => setQuestionBn(e.target.value)}
      />

      <CKEditor
        initData={answer} // Initialize with existing data
        onChange={(event) => setAnswer(event.editor.getData())} // Capture formatted answer
        config={{
          language: 'en',
          extraPlugins: 'language', // Supports multilingual input
        }}
      />

      <button onClick={handleSave}>Save FAQ</button>
    </div>
  );
};

export default FAQEditor;
