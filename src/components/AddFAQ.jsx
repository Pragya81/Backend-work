// src/components/AddFAQ.js

import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

const AddFAQ = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [questionHi, setQuestionHi] = useState('');
  const [questionBn, setQuestionBn] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newFAQ = {
        question,
        answer,
        question_hi: questionHi,
        question_bn: questionBn,
      };

      const response = await axios.post('http://localhost:5000/api/faqs', newFAQ);
      alert('FAQ created successfully!');
      setQuestion('');
      setAnswer('');
      setQuestionHi('');
      setQuestionBn('');
    } catch (error) {
      alert('Error creating FAQ');
    }
  };

  return (
    <div>
      <h2>Add a New FAQ</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question (English):</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Answer:</label>
          <CKEditor
            editor={ClassicEditor}
            data={answer}
            onChange={(event, editor) => {
              const data = editor.getData();
              setAnswer(data);
            }}
          />
        </div>
        <div>
          <label>Question (Hindi):</label>
          <input
            type="text"
            value={questionHi}
            onChange={(e) => setQuestionHi(e.target.value)}
          />
        </div>
        <div>
          <label>Question (Bengali):</label>
          <input
            type="text"
            value={questionBn}
            onChange={(e) => setQuestionBn(e.target.value)}
          />
        </div>
        <button type="submit">Add FAQ</button>
      </form>
    </div>
  );
};

export default AddFAQ;
