import React, { useCallback, useEffect } from 'react'
import StoreCard from './StoreCard'
import useFetch from '../hooks/useFetch'
import StoreImagesObj from './StoreImages'
import NoData from './NoData'

const Stores = ({ stores }) => {
  const { data, fetch } = useFetch({ path: '/wishlist', method: 'GET', isNotify: false })
  const [wishlist, setWishlist] = React.useState([])

  useEffect(() => {
    fetch()
  }, [fetch])

  useEffect(() => {
    if (data) {
      setWishlist(data)
    }
  }, [data])

  const updateWishlist = useCallback(async (storeId) => {
    let updatedWishlist
    const isInWishlist = wishlist.some(store => store.storeId === storeId)

    if (isInWishlist) {
      updatedWishlist = wishlist.filter(store => store.storeId !== storeId)
      await fetch({ customMethod: 'DELETE', customBody: { storeId } })
    } else {
      updatedWishlist = [...wishlist, { storeId }]
      await fetch({ customMethod: 'POST', customBody: { storeId } })
    }
    setWishlist(updatedWishlist)
  }, [wishlist, fetch])


  return (
    <div className="w-full mt-10 md:bg-white md:p-4 lg:p-6 xl:p-10 md:rounded-t-3xl">
      {stores?.length === 0 ? <NoData 
        textClassNames="md:text-xl" 
        containerClassNames="relative -top-20 min-h-[343px] md:min-h-[563px]"
        text='No stores found'
      /> : 
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-5">
        {stores?.map((shop, index) => (
          <StoreCard
            key={index}
            storeId={shop.storeId}
            name={shop.name}
            rating={shop.rating}
            reviews={shop.reviews}
            imageUrl={StoreImagesObj[shop.storeId]}
            className={`${index % 2 != 0 ? 'translate-y-5' : ''}`}
            heartFill={wishlist?.find(store => store.storeId === shop.storeId) ? 'rgb(0 59 64)' : 'rgb(237, 240, 239)'}
            updateWishlist={updateWishlist}
          />
        ))}
      </div>}
    </div>
  )
}

export default Stores