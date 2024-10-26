// src/Translator.js
import React, { useEffect, useState } from 'react';
import './index.css'; // Import the CSS file

const Translator = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('af'); // Default to Afrikaans

  useEffect(() => {
    const loadGoogleTranslate = () => {
      const script = document.createElement('script');
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.onload = () => {
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'af,en,ns,xh,zu,st,tn,ss,ve,ts',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          }, 'google_translate_element');
        };
      };
      document.body.appendChild(script);
    };

    loadGoogleTranslate();
  }, []);

  const handleTranslate = () => {
    // Mock translation logic for demonstration
    if (text.trim()) {
      setTranslatedText(`"${text}" translated to ${targetLanguage}: [mock translation]`);
    } else {
      setTranslatedText('');
    }
  };

  return (
    <div className="translator-container">
      <h2>Translate Your Text</h2>
      <textarea
        className="input-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <div className="controls">
        <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
          <option value="af">Afrikaans</option>
          <option value="en">English</option>
          <option value="ns">isiNdebele</option>
          <option value="xh">isiXhosa</option>
          <option value="zu">isiZulu</option>
          <option value="st">Sesotho</option>
          <option value="tn">Setswana</option>
          <option value="ss">siSwati</option>
          <option value="ve">Tshivenda</option>
          <option value="ts">Xitsonga</option>
        </select>
        <button className="translate-button" onClick={handleTranslate}>Translate</button>
      </div>
      {translatedText && (
        <div className="translated-text">
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
      <div id="google_translate_element" style={{ marginTop: '20px' }}></div>
    </div>
  );
};

export default Translator;
