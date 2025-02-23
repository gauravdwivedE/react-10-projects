import { setFilter } from '@/store/reducer/jobsReducer';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch()

  const [selectedFilters, setSelectedFilters] = useState({
    Location: '',
    Salary: '',
    Jobs: ''
  });

  const filterData = [
    {
      key: "Location",
      values: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"]
    },
    {
      key: "Salary",
      values: [50000, 100000, 200000, 300000, 500000]
    },
    {
      key: "Jobs",
      values: ["Full Stack", "Frontend", "Backend", "Data Scientist", "Dev oops", "Sales"]
    }
  ];

  // Handle radio button change
  const handleRadioChange = (category, value) => {
    setSelectedFilters(prevState => ({
      ...prevState,
      [category]: value
    }))
  }

  useEffect(() => {
   dispatch(setFilter(selectedFilters))
   return () => {
   dispatch(setFilter(null))
   } 
  }, [selectedFilters, setSelectedFilters])

  return (
    <div className='w-[20%] h-full border-r-[1px] border-zinc-300 px-8'>

      {filterData.map((item, index) => (
        <div key={index}>
          <h1 className='font-bold text-lg my-2'>{item.key}</h1>
          <div className='flex items-center gap-2 ml-1 my-1'>
            <input
              type="radio"
              name={item.key}
              id={`all-${item.key}`}
              checked={selectedFilters[item.key] === ''}
              onChange={() => handleRadioChange(item.key, '')}
            />
            <label htmlFor={`all-${item.key}`} className='text-sm'>All</label>
          </div>

          {item.values.map((filterString, idx) => (
            <div key={idx} className='flex items-center gap-2 ml-1 my-1'>
              <input
                type="radio"
                name={item.key}
                id={filterString}
                checked={selectedFilters[item.key] === filterString}
                onChange={() => handleRadioChange(item.key, filterString)}
              />
              <label htmlFor={filterString} className='text-sm'>{filterString}</label>
            </div>
          ))}
        </div>
      ))}
      
    </div>
  )
}

export default Filter
