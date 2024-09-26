import { useState, useEffect } from 'react'

import '../App.css'

function BubbleSort({generatedArray}) {

  var swapped
  const [originalArray, setOriginalArray]= useState(()=> generatedArray?[...generatedArray] : [])
  const [changed, setChanged] = useState(false)

  const [finished, setFinished] = useState(false)

//   max value needs to be in state.

  useEffect(()=>{
    setOriginalArray([...generatedArray])
    console.log(generatedArray)
  }, [generatedArray])

  useEffect(()=>{
    setChanged(prevChanged => !prevChanged)
    console.log(originalArray)
  }, [originalArray])

  async function sequentialStart() {
    setFinished(false)
    let k =0 
    let max = 0;
    let arrayCopy = originalArray
    let length = arrayCopy.length
    console.log(await outerLoopTimer(arrayCopy, max, length,k))
    setFinished(true)
  }

  async function outerLoopTimer(this_array, max, length, k){
    
    return new Promise((resolve) => {
      async function outerLoop(){
        // console.log('min = '+min)
        swapped = false
        let i=0
        console.log(await innerLoopTimer(this_array,max, i,k, length))
        length--
        console.log(swapped)
        if (swapped == false){
            resolve("finished outer loop")
        }
        else if(length>1)setTimeout(outerLoop, 1)
        // else resolve("finished outer loop")
      }
      outerLoop()
        
    }).then(()=>{
      return this_array
    })
  }

  function innerLoopTimer(this_array,max, i,k, length){
    return new Promise((resolve) => {
      let innerLoop = ()=>{
        max=this_array[i]
        if(max>this_array[i+1]){
            k= this_array[i+1]
            this_array[i+1] = max
            this_array[i] = k
            setOriginalArray(this_array)
            swapped = true
            setChanged(prevChanged => !prevChanged)
        }
        else{
            max = this_array[i+1]
        }
        // console.log(i)
        if(i++<length)setTimeout(innerLoop, 1000)
        else resolve("finished inner loop")
      }
      innerLoop()
        
    });
      
  }

    return ( 
        <div>

            <div className = 'container'>
                {originalArray.map((item,i) => <div style = {{ height:20*item, width: 20 ,backgroundColor: 'green'
                }} key = {i}>{item}</div>)}

            </div>

            <button type = "button" onClick = {sequentialStart}>BUBBLE SORT</button>
            {finished && <p>DONE!</p>}

        </div>
     );
}

export default BubbleSort;