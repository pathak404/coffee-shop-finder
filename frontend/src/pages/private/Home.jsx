import React, { useCallback, useEffect, useState } from 'react'
import userImg from "../../assets/images/user.png"
import InputGroup from '../../components/InputGroup'
import { FiSearch } from 'react-icons/fi'
import Filter from '../../components/Filter'
import useFetch from '../../hooks/useFetch'
import Stores from '../../components/Stores'


const Home = () => {
  const { data, fetch } = useFetch({
    path: "/stores",
    method: "GET",
  })

  const [finalData, setFinalData] = useState([])

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    if (data) {
      setFinalData(data)
    }
  }, [data])

  const handleFilter = useCallback((criteria) => {
    const filtered = data.filter(item =>
      (criteria.startingPrice === 0 || item.startingPrice <= criteria.startingPrice) &&
      (criteria.category === "all" || item.category === criteria.category)
    )
    setFinalData(filtered)
  }, [data])

  const sortByNameAZ = (a, b) => a.name.localeCompare(b.name)
  const sortByNameZA = (a, b) => b.name.localeCompare(a.name)
  const sortByPopularity = (a, b) => b.rating - a.rating

  const handleSort = useCallback((sortField) => {
    let sorted
    switch (sortField) {
      case 'name-az':
        sorted = [...data].sort(sortByNameAZ)
        break
      case 'name-za':
        sorted = [...data].sort(sortByNameZA)
        break
      case 'popularity':
        sorted = [...data].sort(sortByPopularity)
        break
      default:
        sorted = data
        break
    }
    setFinalData(sorted)
  }, [data])

  const handleSearch = useCallback((e) => {
    const search = e.target.value
    const searched = data.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    setFinalData(searched)
  }, [data])


  return (
    <div className='w-full px-3 pt-16 md:pt-8 md:ps-10 h-full flex flex-col items-start justify-between'>
      <div className="absolute top-8 right-6 md:hidden">
        <img src={userImg} className='w-12 h-12 rounded-full' alt="user profile" />
      </div>
      <div className="mt-5">
        <h1 className='text-3xl md:text-5xl font-semibold'>Find a coffee shop anywhere</h1>
      </div>

      <div className="w-full flex items-center mt-10 z-10">
        <div className="w-[80%] md:w-[350px]">
          <InputGroup
            icon={<FiSearch className='w-6 h-6 text-sea-form-2' />}
            className="bg-sea-form-1 md:bg-white px-4 py-5 text-lg"
            type={"text"}
            name={"search"}
            placeholder={"Search"}
            handler={handleSearch} />
        </div>
        <div className="basis-2/6">
          <Filter onFilter={handleFilter} onSort={handleSort} />
        </div>
      </div>

      <Stores stores={finalData} />

    </div>
  )
}

export default Home