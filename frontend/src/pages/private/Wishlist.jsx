import React, { useCallback, useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import WishlistCard from '../../components/WishlistCard'
import StoreImagesObj from '../../components/StoreImages'
import NoData from '../../components/NoData'
import Loading from '../../components/Loading'

const Wishlist = () => {
  const { loading, data, fetch } = useFetch({
    path: "/wishlist",
    method: "GET",
  })
  const [delayedLoading, setDelayedLoading] = useState(true)
  const [wishlist, setWishlist] = useState([])


  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    if (data) {
      setWishlist(data)
    }
  }, [data])

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setDelayedLoading(false)
      }, 700)
    }
  }, [loading])

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
    <div className='w-full px-4 pt-16 md:pt-8 md:ps-10 h-full flex flex-col items-start justify-between'>
      <div className="absolute top-8 right-6 md:hidden">
        <img src="/logo.svg" className='w-12 h-12' alt="user profile" />
      </div>
      <div className="mt-5">
        <h1 className='text-2xl md:text-5xl font-semibold'>Your Favorite Stores</h1>
      </div>

      <div className="w-full mt-10 md:bg-white md:p-4 lg:p-6 xl:p-10 md:rounded-3xl md:min-h-[563px]">
        {delayedLoading ?
          <Loading className='w-full min-h-[343px] md:min-h-[563px]' /> :
          wishlist.length === 0 ? <NoData
            text="No stores found in your wishlist"
            textClassNames="md:text-xl"
            containerClassNames="md:mt-10"
          /> :
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
        }
      </div>
    </div>
  )
}

export default Wishlist