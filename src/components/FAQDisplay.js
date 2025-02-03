import React from 'react';

const FAQDisplay = ({ faq }) => {
  return (
    <div>
      <h3>{faq.question}</h3>
      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
    </div>
  );
};

export default FAQDisplay;
