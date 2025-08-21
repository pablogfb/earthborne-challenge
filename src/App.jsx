import { useState } from 'react'
import './App.css'

import Deck from './components/Deck'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Deck />
      </div>
    </>
  )
}

export default App
