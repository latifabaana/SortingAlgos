import { useState, useEffect } from 'react'

import '../App.css'

function InsertionSort({generatedArray}) {
    const [insertionArray, setInsertionArray]= useState(()=> generatedArray?[...generatedArray] : [])
    const [changed, setChanged] = useState(false)
    const [finished, setFinished] = useState(false)

    useEffect(()=>{
        setInsertionArray([...generatedArray])
        console.log(generatedArray)
      }, [generatedArray])
    
      useEffect(()=>{
        setChanged(prevChanged => !prevChanged)
        console.log(insertionArray)
      }, [insertionArray])

    async function outerLoopTimer(arr,i,length){
        return new Promise((resolve) => {
            async function outerLoop(){
                var j = i-1;
                var k= arr[i]
                console.log(await innerLoopTimer(arr,j,k))
                i++
                if(i<length)setTimeout(outerLoop, 1000)
                else {
                    resolve("finished outer loop")
                    return arr
                }

            }
            outerLoop()
            
        })
    }
    
    function innerLoopTimer(this_array,j,k){
        return new Promise((resolve) => {
            let innerLoop = ()=>{
                if(j>=0){
                    console.log("j = " + j)
                    if(k<this_array[j]) {
                        // setInsertionArray(prevArray => ([
                        //     ...prevArray.slice(0, j+1),
                        //     // New item:
                        //     j,
                        //     // Items after the insertion point:
                        //     ...prevArray.slice(j+1)
                        // ]))
                        this_array[j+1] = this_array[j]
                        setInsertionArray(this_array)
                        setChanged(prevChanged => !prevChanged)
                        console.log('this arr = ' + this_array)
                    }
                    else {
                        // setInsertionArray(prevArray => ([
                        //     ...prevArray.slice(0, j+1),
                        //     // New item:
                        //     k,
                        //     // Items after the insertion point:
                        //     ...prevArray.slice(j+1)
                        // ]))
                        this_array[j+1] = k
                        setInsertionArray(this_array)
                        setChanged(prevChanged => !prevChanged)
                        console.log(this_array)
                        resolve("finished inner loop")
                        return this_array
                    }
                    j--
                }
                if(j<0) {
                    // setInsertionArray(prevArray => ([
                    //         k,
                    //         ...prevArray.slice(1),
                    //     ]))

                    this_array[0] = k
                    setInsertionArray(this_array)
                    setChanged(prevChanged => !prevChanged)
                }
                if(j>=0)setTimeout(innerLoop, 1000)
                else resolve("finished inner loop")
            }
            innerLoop()
            
        });
        
    }
    
    async function sequentialStart() {
        setFinished(false)
        var arr = insertionArray
        var length = arr.length
        var i=1
        console.log(await outerLoopTimer(arr, i,length))
        setFinished(true)
    }

    useEffect(()=>{
        console.log(insertionArray)
    }, [insertionArray])

    return ( 
        <div>
            <div className = 'container'>
                {insertionArray.map((item, i) => <div style = {{ height:20*item, width: 20 ,backgroundColor: 'green'
                }} key = {i}>{item}</div>)}
            </div>

            <button type = "button" onClick = {sequentialStart}>INSERTION SORT</button>

            {finished && <p>DONE!</p>}

        </div>
     );
}

export default InsertionSort;