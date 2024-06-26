import React, { useCallback, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import WishlistCard from '../../components/WishlistCard'
import StoreImagesObj from '../../components/StoreImages'
import userImg from "../../assets/images/user.png"

const Wishlist = () => {
  const { data, fetch } = useFetch({
    path: "/wishlist",
    method: "GET",
  })

  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    if (data) {
      setWishlist(data)
    }
  }, [data])

  const removeFromWishlist = useCallback(async (storeId) => {
    let updatedWishlist
    const isInWishlist = wishlist.some(store => store.storeId === storeId)
    if (isInWishlist) {
      updatedWishlist = wishlist.filter(store => store.storeId !== storeId)
      await fetch({ customMethod: 'DELETE', customBody: { storeId } })
    }
    setWishlist(updatedWishlist)
  }, [wishlist, fetch])


  return (
    <div className='w-full px-3 pt-16 md:pt-8 md:ps-10 h-full flex flex-col items-start justify-between'>
        <div className="absolute top-8 right-6 md:hidden">
        <img src={userImg} className='w-12 h-12 rounded-full' alt="user profile" />
      </div>
      <div className="mt-5">
        <h1 className='text-2xl md:text-5xl font-semibold'>Your Favorite Stores</h1>
      </div>

      <div className="w-full mt-10 md:bg-white md:p-4 lg:p-6 xl:p-10 md:rounded-t-3xl md:h-[563px]">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-5">
        {wishlist?.map((store, index) => (
          <WishlistCard 
          key={index} 
          {...store} 
          removeFromWishlist={removeFromWishlist} 
          imageUrl={StoreImagesObj[store.storeId]}
          className={`${index % 2 != 0 ? 'translate-y-5' : ''}`}
          />
        ))}
      </div>
    </div>
    </div>
  )
}

export default Wishlist