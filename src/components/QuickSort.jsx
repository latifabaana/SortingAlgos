import { useState, useEffect } from 'react'

import '../App.css'

function QuickSort() {
    const [originalArray, setOriginalArray]= useState([6, 9, 7, 3, 1, 2, 4])
    const [changed, setChanged] = useState(false)

    function swap(m,n,this_array){
        var k=this_array[m]
        this_array[m] = this_array[n]
        this_array[n] = k
        // console.log(this_array)
        setOriginalArray(this_array)
        setChanged(prevChanged => !prevChanged)
    }

    async function outerLoopTimer(nums, start, end){
        var p = nums[start]
        var j = end
        if(end-start == 0) return nums
        var i = start
        return new Promise((resolve) => {
            async function outerLoop(){
                if(nums[i]>p){
                    j--
                    console.log('i = ', +i)
                    console.log('j = ' + j)
                    console.log(await innerLoopTimer(nums,i, j,p, start,end))
                }
                i++ 
                if(i<end)setTimeout(outerLoop, 1)
                else resolve("finished outer loop")
               
            }
            outerLoop()
            
        }).then(()=>{
            if((i>=j) && (j>start)){
                swap(j-1,start, nums)
                outerLoopTimer(nums, start, j-1)
                console.log(nums)
                return nums
            }
            return nums
        })
    }
    
    function innerLoopTimer(nums,i, j,p, start, end){
        return new Promise((resolve) => {
            let innerLoop = ()=>{
                if(nums[j] < p && i<=j){
                    swap(i,j,nums)
                    resolve("finished inner loop")
                }
                else if(i>j){
                    swap(start,j, nums)
                    outerLoopTimer(nums, start, j+1)
                    outerLoopTimer(nums, j+1, end)
                }
                j--
                console.log(' j in inner loop = ' + j)
                if(j>start)setTimeout(innerLoop, 1000)
            }
            innerLoop()
            
        });
        
    }
    
    async function sequentialStart(nums) {
        var start = 0
        var end = nums.length
        console.log(await outerLoopTimer(nums, start, end))
    }


    return ( 
        <div>
            <div className = 'container'>
                {originalArray.map(item => <div style = {{ height:50*item, width: 30 ,backgroundColor: 'green'
                }} key = {item}>{item}</div>)}

            </div>

            <button type = "button" onClick = {() => sequentialStart(originalArray)} >QUICK SORT</button>

        </div>
     );
}

export default QuickSort;

