import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
         <h1 className="bg-(--color-primary) hover:bg-(--color-primary-dark) text-black px-4 py-2  rounded">hello world</h1>
      </div>
    </>
  )
}

export default App
