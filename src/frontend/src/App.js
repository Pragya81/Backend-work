// src/App.js (React component)
import React from 'react';
import FAQList from './components/FAQList'; // Import the FAQList component

function App() {
  return (
    <div className="App">
      <h1>Welcome to the FAQ page</h1>
      <FAQList />  {/* Render FAQ List */}
    </div>
  );
}

export default App;
