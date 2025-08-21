import { useState } from "react"
import { cards as initialDeck } from "../data/cards"
import Card from "./Card"

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Deck() {
  const [deck, setDeck] = useState(shuffle(initialDeck))
  const [currentCard, setCurrentCard] = useState(null)
  const [discard, setDiscard] = useState([])

  const drawCard = () => {
    if (deck.length === 0) return

    let updatedDeck = [...deck]
    let updatedDiscard = [...discard]
    if (currentCard) {
      updatedDiscard = [currentCard, ...updatedDiscard]
    }
  
    // If shuffle is needed
    if (currentCard && currentCard.shuffle) {
      updatedDeck = shuffle([...updatedDeck, ...updatedDiscard])
      updatedDiscard = []
    }
  
    const [drawnCard, ...restDeck] = updatedDeck
    if (!drawnCard) return
  
    // Update all states at once based on the new local values
   
    setDeck(restDeck)
    setCurrentCard(drawnCard)
    setDiscard(updatedDiscard)

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
        <h2 className="text-lg font-semibold">Previous drawn cards (most recent first):</h2>
        <div className="flex justify-center flex-wrap">
          {discard.length > 0 &&
            discard.map((card, index) => (
              <Card key={card.id ?? index} {...card} size="small" />
            ))}
        </div>
      </div>
    </div >
  )
}
