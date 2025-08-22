import { useEffect, useRef, useState } from "react"
import { cards as initialDeck } from "../data/cards"
import Card from "./Card"
import Modal from "./Modal";

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
  const [open, setOpen] = useState(false);
  const [scoutedCards, setScoutedCards] = useState([]);
  const scoutNumber = useRef();

  useEffect(() => {
    if (open && scoutNumber.current) {
      scoutNumber.current.focus();
      scoutNumber.current.select(); 
    }
  }, [open]);

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

  const scoutCards = () => {
    if (!scoutNumber.current) return;
  
    const amount = parseInt(scoutNumber.current.value, 10);
    if (isNaN(amount) || amount <= 0) return;
  
    setDeck((prevDeck) => {
      const cardsToScout = prevDeck.slice(0, amount);
      const remaining = prevDeck.slice(amount);
  
      setScoutedCards(cardsToScout);
      return remaining;
    });
  };

  const sendToTop = (index) => {
    if (scoutedCards.length === 0) return;
    const cardToTop = scoutedCards[index];
    setDeck((prev) => [cardToTop, ...prev]);
    setScoutedCards((prev) => prev.filter((_, i) => i !== index));
  };

  const sendToBottom = (index) => {
    if (scoutedCards.length === 0) return;
    const cardToBottom = scoutedCards[index];
    setDeck((prev) => [...prev, cardToBottom]);
    setScoutedCards((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length === 0) {
        closeModal();
      }
      return updated;
    });
  };

  const closeModal = () => {
    setOpen(false);
    setDeck(prev => [...scoutedCards, ...prev])
    setScoutedCards([]);
    scoutNumber.current.value = 1;
  };


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

      <div className="mt-6">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-[#fcfce9] text-[#1e4131] rounded-lg"
        >
          Scout cards
        </button>
      </div>
      <Modal isOpen={open} onClose={closeModal} title="Mi Modal">
        <input type="number" className="border p-2 rounded w-full mt-2" placeholder="Number of cards to scout" ref={scoutNumber} defaultValue={1} />
        <button className="mt-4 px-4 py-2 bg-[#fcfce9] text-[#1e4131] rounded-lg" onClick={scoutCards}>Scout!</button>

        <div>
          <h3 className="text-lg font-semibold mt-4">Scouted Cards:</h3>
          <div className="flex justify-center flex-wrap">
            <p className="text-sm text-gray-500 mb-2">
              The last card added to top will be the first to go.
            </p>
            {scoutedCards.length > 0 ? (
              scoutedCards.map((card, index) => (
                <div key={index} className="flex flex-col items-center m-1">
                  <Card {...card} size="small" />
                  <div className="m-1 flex">
                    <button
                      className="px-1 py-1 bg-gray-600 text-white rounded mr-2 text-sm"
                      onClick={() => sendToTop(index)}>
                      Top
                    </button>
                    <button
                      className="px-1 py-1 bg-gray-600 text-white rounded text-sm"
                      onClick={() => sendToBottom(index)}>
                      Bottom
                    </button>
                  </div>
                </div>

              ))
            ) : (
              <p>No cards scouted yet</p>
            )}
          </div>
        </div>
      </Modal>
    </div >
  )
}
