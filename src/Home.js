import React, { useState } from 'react';
import './Home.css';

function HomePage() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_GEMINI_API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: inputText }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResponse(data.message);
      setInputText('');
    } catch (error) {
      console.error('Error posting data:', error);
      setResponse({ error: 'Error fetching data' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Hello I am Sana, your Mental Health Coach</h1>
      <h2>Happy to answer your questions</h2>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        className="textarea"
        placeholder="Type your question here..."
        disabled={isLoading}
      ></textarea>
      <button onClick={handleSubmit} className="button" disabled={isLoading}>Post</button>
      {isLoading && <div className="loading">Thinking ...</div>} {/* Loading indicator */}
      {response && (
        <div className="response">
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}

export default HomePage;
