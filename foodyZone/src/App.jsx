import React, { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Card from './components/Card';
import axios from '../node_modules/axios/lib/axios';

export const BASE_URL = 'http://localhost:9000'

const App = () => {
  
const [foodsData,setFoodsData] = useState(null)
const [error,setError] = useState(null)
const [loading,setLoading] = useState(false)
const [filteredData,setFilteredData] = useState(null)

const fetchFood = async() =>{
    setLoading(true)
    try{
      const data = await axios.get(BASE_URL)
      setFoodsData(data.data)
      setLoading(false)
    }catch(e){
      setError("Unable to fetch data reload and try again")
    }
}
useEffect(() => {
    fetchFood()
}, [])

const searchFilter = (e) =>{  
  
  const filterString = e.target.value.toLowerCase().trim()

  if(filterString == '' || filterString == null ){
    setFilteredData(null)
  }
  const filter = foodsData?.filter((item)=> item.name.toLowerCase().includes(filterString))
  setFilteredData(filter)

}

const buttonFilter = (type) =>{  
  
  const filterString = type.toLowerCase().trim()

  if(filterString == 'all' ){
    setFilteredData(null)
    return
  }
  const filter = foodsData?.filter((item)=> item.type.toLowerCase().includes(filterString))
  setFilteredData(filter)
}

  return (
    <div className='w-full h-screen bg-zinc-400'>
      <Nav searchFilter = {searchFilter} buttonFilter = {buttonFilter}/>
     {loading || error? <div>{error ? error : "loading..."}</div>
     :
      <div className='cards-con h-[calc(100%-145px)] w-full  bg-[url("./bg.png")] bg-cover bg-center overflow-hidden flex p-7 gap-5 content-start flex-wrap '>
        {filteredData? filteredData.map((item,index)=> <Card key = {index} foodsData = {item}/>):
        foodsData?.map((item,index)=> <Card key = {index} foodsData = {item}/>)
        }
      </div>
     }
    </div>
  )
}

export default App