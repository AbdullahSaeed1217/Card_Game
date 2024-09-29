import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    // Initialize cards (shuffle them)
    const initialCards = [
      { id: 1, value: 'A', flipped: false },
      { id: 2, value: 'A', flipped: false },
      { id: 3, value: 'B', flipped: false },
      { id: 4, value: 'B', flipped: false },
      { id: 5, value: 'C', flipped: false },
      { id: 6, value: 'C', flipped: false },
      { id: 7, value: 'D', flipped: false },
      { id: 8, value: 'D', flipped: false },
    ].sort(() => Math.random() - 0.5);
    setCards(initialCards);
  }, []);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || matchedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      if (cards[first].value === cards[second].value) {
        setMatchedCards([...matchedCards, first, second]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="App">
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <h1>Enter Your Name</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit">Start Game</button>
        </form>
      ) : (
        <div>
          <h1>Welcome, {name}! Match the cards!</h1>
          <div className="cards-grid">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`card ${flippedCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                {flippedCards.includes(index) || matchedCards.includes(index) ? card.value : 'X'}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
