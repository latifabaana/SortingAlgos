import { useState, useEffect } from 'react'

import '../App.css'

function SelectionSort({generatedArray}) {

    const [originalArray, setOriginalArray]= useState(()=> generatedArray?[...generatedArray] : [])
    const [changed, setChanged] = useState(false)

    const [finished, setFinished] = useState(false)

    useEffect(()=>{
        setOriginalArray([...generatedArray])
        console.log(generatedArray)
      }, [generatedArray])
    
      useEffect(()=>{
        setChanged(prevChanged => !prevChanged)
        console.log(originalArray)
      }, [originalArray])

    async function outerLoopTimer(this_array, min, length, k){
    
        return new Promise((resolve) => {
            async function outerLoop(){
                // console.log('min = '+min)
                var i=min
                console.log(await innerLoopTimer(this_array,min, i,k, length))
                if(min++<length)setTimeout(outerLoop, 1)
                else resolve("finished outer loop")
            }
            outerLoop()
            
        }).then(()=>{return this_array})
    }
    
    function innerLoopTimer(this_array,min, i,k, length){
        return new Promise((resolve) => {
            let innerLoop = ()=>{
                if(this_array[i]<this_array[min]){
                    k = this_array[i]
                    this_array[i] = this_array[min]
                    this_array[min] = k
                    setOriginalArray(this_array)
                    setChanged(prevChanged => !prevChanged)
                }
                // console.log(i)
                if(i++<length)setTimeout(innerLoop, 1000)
                else resolve("finished inner loop")
            }
            innerLoop()
            
        });
        
    }
    
    async function sequentialStart(this_array) {
        setFinished(false)
        var min = 0;
        var k =0 
        var length = this_array.length
        console.log(await outerLoopTimer(this_array, min, length,k))
        setFinished(true)
    }
    
    return ( 
        <div>
            <div className = 'container'>
                {originalArray.map((item,i) => <div style = {{ height:20*item, width: 20 ,backgroundColor: 'green'
                }} key = {i}>{item}</div>)}

            </div>

            <button type = "button" onClick = {() => (sequentialStart(originalArray))}>SELECTION SORT</button>
            {finished && <p>DONE!</p>}


        </div>
     );
}

export default SelectionSort;