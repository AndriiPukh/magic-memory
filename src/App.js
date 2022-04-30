import React, { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { src: '/img/lion1.png', matched: false },
  { src: '/img/lion3.png', matched: false },
  { src: '/img/lion4.png', matched: false },
  { src: '/img/lion5.png', matched: false },
  { src: '/img/lion6.png', matched: false },
  { src: '/img/lion7.png', matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // reset choices
  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
  }

  // compare two selected cards
  useEffect(() => {
    if (choiceOne) {
      if (choiceTwo) {
        if (choiceOne.src === choiceTwo.src) {
          setCards((prevCards) =>
            prevCards.map((card) => {
              if (card.src === choiceOne.src) {
                return { ...card, matched: true }
              }
              return card
            })
          )
          resetTurns()
        } else {
          setTimeout(() => {
            resetTurns()
          }, 1000)
        }
      }
    }
  }, [choiceOne, choiceTwo])

  console.log('turns, choiceTwo, choiceOne', turns, choiceTwo, choiceOne)
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button type="button" onClick={shuffleCards}>
        New Game
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  )
}

export default App
