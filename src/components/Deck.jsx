import { useState } from "react"
import { cards as initialDeck } from "../data/cards"
import Card from "./Card"

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

export default function Deck() {
  const [deck, setDeck] = useState(shuffle(initialDeck))
  const [currentCard, setCurrentCard] = useState(null)
  const [discard, setDiscard] = useState([])
  const [lastDrawn, setLastDrawn] = useState([])

  const drawCard = () => {
    if (deck.length === 0) return

    if (currentCard) {
      setLastDrawn(prev => [currentCard, ...prev].slice(0, 5))
    }

    const [drawnCard, ...rest] = deck
    setDeck(rest)
    setCurrentCard(drawnCard)
    setDiscard(prev => [...prev, drawnCard])

    if (drawnCard.shuffle) {
      setDeck(shuffle([...rest, ...discard, drawnCard]))
      setDiscard([])
    }
  }

  return (
    <div className="p-4 text-[#fcfce9]">
      <h1 className="text-xl font-bold mb-4">Challenge Deck</h1>
      <button
        onClick={drawCard}
        className="px-4 py-2 bg-[#fcfce9] text-[#1e4131] rounded-lg"
      >
        Draw a Card
      </button>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Cards in deck: {deck.length}</h2>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Last drawn card:</h2>
        {currentCard ? (
          <div className="mt-2">
            <div className="mt-2 flex justify-center">
              <Card {...currentCard} />
            </div>
          </div>
        ) : (
          <p>No card drawn yet</p>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Previous drawn cards:</h2>
        <div className="flex justify-center">
          {Array.isArray(lastDrawn) &&
            lastDrawn.map((card, index) => (
              <Card key={card.id ?? index} {...card} size="small" />
            ))}
        </div>
      </div>
    </div >
  )
}
