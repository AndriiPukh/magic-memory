import React, { useState } from 'react'
import './App.css'

const cardImages = [
  { src: '/img/lion1.png' },
  { src: '/img/lion3.png' },
  { src: '/img/lion4.png' },
  { src: '/img/lion5.png' },
  { src: '/img/lion6.png' },
  { src: '/img/lion7.png' },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
  }
  console.log('turns', turns)
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button type="button" onClick={shuffleCards}>
        New Game
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <div>
              <img className="card-front" src={card.src} alt="Card front" />
              <img
                className="card-back"
                src="/img/pngegg.png"
                alt="Cart back"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
