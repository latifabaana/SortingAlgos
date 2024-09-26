import { useState, useEffect } from 'react'

import './App.css'
import BubbleSort from './components/BubbleSort'
import QuickSort from './components/QuickSort'
import SelectionSort from './components/SelectionSort'
import CountingSort from './components/CountingSort'
import InsertionSort from './components/InsertionSort'

function App() {

  const [generatedArray, setGeneratedArray] = useState([])
  const [changed, setChanged] = useState(false)

  const generateArray = () => {
    const arr = new Array(9)
    
    for (var i=0; i<arr.length;i++){
      arr[i] = Math.floor(Math.random()*i*2+1)
    }
    setGeneratedArray(arr)
    setChanged(prevChanged => !prevChanged)
  }

  useEffect(()=>{
    generateArray()
  },[])

  useEffect(()=>{
    console.log(generatedArray)
    setChanged(prevChanged => !prevChanged)
  }, [generatedArray])

  return (
    <div>
      <h1>Sorting Functions</h1>
      <button onClick={generateArray}>generate array</button>
      <div className='main-container'>
        <BubbleSort generatedArray = {generatedArray} />
        <SelectionSort generatedArray = {generatedArray}/>
        <CountingSort generatedArray = {generatedArray}/>
        <InsertionSort generatedArray = {generatedArray}/>
      </div>
   
    </div>

  )

}

export default App