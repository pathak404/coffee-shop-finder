import React, { useCallback, useEffect, useState } from 'react'
import userImg from "../../assets/images/user.png"
import InputGroup from '../../components/InputGroup'
import { FiSearch } from 'react-icons/fi'
import Filter from '../../components/private/Filter'
import useFetch from '../../hooks/useFetch'
import StoreCard from '../../components/StoreCard'
import productImage0 from "../../assets/images/productImage0.jpg"
import productImage1 from "../../assets/images/productImage1.jpg"
import productImage2 from "../../assets/images/productImage2.jpg"
import productImage3 from "../../assets/images/productImage3.jpg"
import productImage4 from "../../assets/images/productImage4.jpg"
import productImage5 from "../../assets/images/productImage5.jpg"
import productImage6 from "../../assets/images/productImage6.jpg"
import productImage7 from "../../assets/images/productImage7.jpg"
import productImage8 from "../../assets/images/productImage8.jpg"
import productImage9 from "../../assets/images/productImage9.jpg"
import productImage10 from "../../assets/images/productImage10.jpg"
import productImage11 from "../../assets/images/productImage11.jpg"
import productImage12 from "../../assets/images/productImage12.jpg"
import productImage13 from "../../assets/images/productImage13.jpg"
import productImage14 from "../../assets/images/productImage14.jpg"
import productImage15 from "../../assets/images/productImage15.jpg"

const productImage = [productImage0, productImage1, productImage2, productImage3, productImage4, productImage5, productImage6, productImage7, productImage8, productImage9, productImage10, productImage11, productImage12, productImage13, productImage14, productImage15]

const Home = () => {
  const { loading, data, fetch } = useFetch({
    path: "/store/all",
    isAuth: true,
    method: "GET",
  })

  useEffect(() => {
    fetch()
  }, [])


  const [filteredData, setFilteredData] = useState(data)
  const [finalData, setFinalData] = useState(data)

  useEffect(() => {
    if (data && data.length > 0) {
      setFilteredData(data)
      setFinalData(data)
    }
  }, [data])

  const handleFilter = useCallback((criteria) => {
    console.log('Filter criteria:', criteria);
    const filtered = data.filter(item =>
      (criteria.price === 0 || item.price <= criteria.price) &&
      (criteria.category === "all" || item.category === criteria.category)
    )
    console.log('Filtered data:', filtered);
    setFilteredData(filtered)
  }, [data])

  const sortByNameAZ = (a, b) => a.name.localeCompare(b.name)
  const sortByNameZA = (a, b) => b.name.localeCompare(a.name)
  const sortByPopularity = (a, b) => b.rating - a.rating

  const handleSort = useCallback((sortField) => {
    let sorted
    switch (sortField) {
      case 'name-az':
        sorted = [...filteredData].sort(sortByNameAZ)
        break
      case 'name-za':
        sorted = [...filteredData].sort(sortByNameZA)
        break
      case 'popularity':
        sorted = [...filteredData].sort(sortByPopularity)
        break
      default:
        sorted = filteredData
        break
    }
    setFilteredData(sorted)
  }, [filteredData])

  useEffect(() => {
    if(filteredData && filteredData.length > 0) {
      setFinalData(filteredData)
    }
  }, [filteredData])

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
            handler={() => { }}
            value={""} />
        </div>
        <div className="basis-2/6">
          <Filter onFilter={handleFilter} onSort={handleSort} />
        </div>
      </div>


      <div className="w-full mt-10 md:bg-white md:p-4 lg:p-6 xl:p-10 md:rounded-t-3xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-5">
          {finalData?.map((shop, index) => (
            <StoreCard
              key={index}
              storeId={shop.storeId}
              name={shop.name}
              rating={shop.rating}
              reviews={shop.reviews}
              imageUrl={productImage[index]}
              className={`${index % 2 != 0 ? 'translate-y-5' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home