import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from './Card';
import axios from '../utils/axios'
import {errorFlash} from '../utils/Flash'

const Cards = () => {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4.1,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              initialSlide: 0,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1.4,
              slidesToScroll: 1.4,
              initialSlide: 2
            }
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };
    const [freeBooks,setFreeBooks] = useState([])
    const [books,setBooks] = useState([])

    useEffect(()=>{
     async function getBooks(){
       try{
        const res = await axios.get("/books")
        setBooks(res.data)
      }
       catch(err){ 
        errorFlash(err.message)
       }   
     }
     getBooks()
    },[])

    useEffect(()=>{
      const  filteredFreeBooks =  books.filter((item)=>item.category === 'Free')
      setFreeBooks(filteredFreeBooks)
    },[books])

  return (
    <>

    <div className='max-w-screen-2xl mx-auto px-6 py-10 mb-28'>
    <Slider {...settings}>
     {freeBooks.map((item)=><Card key = {item._id} books={item}/>)}
      </Slider>

      </div>
    </>
  )
}

export default Cards