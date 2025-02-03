import React, { useState, useEffect } from 'react';
import FAQDisplay from './FAQDisplay'; // Import the FAQDisplay component

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);

  // Fetch FAQs from your backend
  useEffect(() => {
    fetch('/api/faqs')
      .then((response) => response.json())
      .then((data) => setFaqs(data))
      .catch((error) => console.error('Error fetching FAQs:', error));
  }, []);

  return (
    <div>
      <h2>FAQs</h2>
      {faqs.length === 0 ? (
        <p>No FAQs available</p>
      ) : (
        faqs.map((faq) => <FAQDisplay key={faq.id} faq={faq} />)
      )}
    </div>
  );
};

export default FAQList;
