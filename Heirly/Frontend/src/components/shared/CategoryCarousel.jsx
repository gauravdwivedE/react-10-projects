import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from '@/components/ui/button'
import { setSearchTerm } from '@/store/reducer/jobsReducer'

const Categorycarousel = () => {
  const jobs = [
    "Full Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "Graphics Designer",
    "App Developer"
  ]

  // Redux hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // On click handler
  const handleItemClick = (item) => {
    dispatch(setSearchTerm(item)) // Dispatch the action to set the search term
    navigate("/browse") // Navigate to the browse page
  }

  return (
    <div className="w-full max-w-xl mx-auto my-16">
      <Carousel>
        <CarouselContent>
          {jobs.map((item, idx) => (
            <CarouselItem key={idx} className="flex justify-center items-center">
              <Button
                variant="outline"
                className="rounded-full px-8 py-4"
                onClick={() => handleItemClick(item)} // Call handleItemClick with the current item
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2">
          {/* Customize your Previous Arrow */}
          Previous
        </CarouselPrevious>
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2">
          {/* Customize your Next Arrow */}
          Next
        </CarouselNext>
      </Carousel>
    </div>
  )
}

export default Categorycarousel;
