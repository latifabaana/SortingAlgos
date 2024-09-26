import { useState, useEffect } from 'react'

import '../App.css'

function CountingSort({generatedArray}) {

    const [originalArray, setOriginalArray]= useState(()=> generatedArray?[...generatedArray] : [])
    const [newArray, setNewArray] = useState([])

    const numbers = [0,1,2,3,4,5,6,7,8,9]

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

    async function innerCounter(arr,this_arr){
        return new Promise((resolve) => {
            let innerCounterLoop = ()=>{
                if (arr.length >0){
                    var val = arr[0]
                    // setNewArray(prevNewArray => ([
                    //     ...prevNewArray.slice(0, val),
                    //     // New item:
                    //     prevNewArray[val]++,
                    //     // Items after the insertion point:
                    //     ...prevNewArray.slice((val+1))
                    // ]))
                    // setChanged(prevChanged => !prevChanged)
                    console.log("val = "+val)
                    this_arr[val] = this_arr[val]+1
                    setNewArray(this_arr)
                    console.log("this is my new arra - " + this_arr)
                    setOriginalArray(originalArray.slice(1))
                    arr.splice(0, 1)
                    setChanged(prevChanged => !prevChanged)
                }
                if(arr.length>0)setTimeout(innerCounterLoop, 1000)
                else resolve("finished counter inner loop")
            }
            innerCounterLoop()
            
        }).then(()=>{
            return this_arr
          })
        
    }

    var j=0; //this is annoying me, along with swapped in bubble, why can't it just behave?
    async function outerLoopTimer(arr,i,length, new_arr, new_arr_length){
        return new Promise((resolve) => {
            async function outerLoop(){
                console.log("arr = " + new_arr)
                var count=0; 
                console.log(await innerLoopTimer(arr,new_arr, count,i))
                i++
                console.log(i)
                if(i<new_arr_length)setTimeout(outerLoop, 1000)
                else resolve("finished outer loop")
            }
            outerLoop()
            
        }).then(()=>{
            return arr})
    }
    
    function innerLoopTimer(arr, new_arr, count,i){ //don't need count here
        return new Promise((resolve) => {
            // setNewArray(prevArray => prevArray.slice(1))
            let innerLoop = ()=>{
                // console.log('count = ' + count)
                console.log('new array i = ' + new_arr[i])
                if(new_arr[i]>0){
                    console.log("j = " + j)
                    // console.log('count = '+ count)
                    setOriginalArray(prevArray => ([
                        ...prevArray.slice(0, j),
                        // New item:
                        i,
                        // Items after the insertion point:
                        ...prevArray.slice(j+1)
                    ]))
                    arr[j] = i
                    j++
                    // count++
                    console.log("i = "+ i)
                    // setNewArray(prevArray => [...prevArray.slice(1)])
                    new_arr[i]--
                    // setNewArray(prevArray => [...prevArray.slice(0,i), prevArray[i]--, ...prevArray.slice(i+1)])
                    setNewArray(new_arr)
                    // setChanged(prevChanged => !prevChanged)
                }
                // else{
                    // setNewArray(prevArray => [...prevArray.slice(1)])
                // }
                if(new_arr[i]>0)setTimeout(innerLoop, 1000)
                else resolve("finished inner loop")
            }
            innerLoop()
            
        });
        
    }
    
    async function sequentialStart() {
        setFinished(false)
        var length = originalArray.length
        var arr = originalArray
        var new_arr_length = Math.max(...originalArray)+1
        var new_arr = new Array(new_arr_length).fill(0)
        setNewArray(prevArray => [...prevArray, ...new_arr])
        // count_remove(arr, new_arr)
        console.log(await innerCounter(arr, new_arr))
        // setTimeout(() => innerCounter(arr, new_arr), 1000)

        var i=0
        console.log(await outerLoopTimer(arr, i,length, new_arr, new_arr_length))
        setFinished(true)

    }
    useEffect(()=>{
        console.log(originalArray)
        console.log(originalArray.length)
    }, [changed])

    useEffect(()=>{
        console.log(newArray)
    }, [newArray])

    return ( 
        <div className='counting-container'>
            <div className = 'container'>
                {originalArray.map((item, i) => <div style = {{ height:20*item, width: 20 ,backgroundColor: 'green'
                }} key = {i}>{item}</div>)}
            </div>
            {newArray.some(x => x>0) && (<div className = 'new-array-container'>
                {newArray.map((item,i) => <div className = "newArray" style = {{ height:20*item, width: 20 ,backgroundColor: 'green'
                }} key = {i}><p>{item}</p><p>{i}</p></div>
                )}

                
                
            </div>)}
            <div className='counting-sort-button'>
                <button type = "button" onClick = {sequentialStart}>COUNTING SORT</button>
            </div>
            

            {finished && <p>DONE!</p>}

            
        </div> 
    
    );
}

export default CountingSort;