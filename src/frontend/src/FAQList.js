// src/components/FAQList.js (React component to display FAQ list)
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FAQList() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    // Fetch FAQs from the backend API
    axios.get('http://localhost:3000/api/faqs')
      .then(response => {
        setFaqs(response.data);
      })
      .catch(error => {
        console.error('Error fetching FAQs:', error);
      });
  }, []);

  return (
    <div>
      <h2>FAQ List</h2>
      <ul>
        {faqs.map(faq => (
          <li key={faq._id}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FAQList;
