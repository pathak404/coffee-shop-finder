import { useEffect, useState } from "react"
import { FiCheck, FiPlus } from "react-icons/fi"

const ItemCard = ({ storeId, itemId, itemImage, name, price, desc, updateCart, isInCart }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [descLength, setDescLength] = useState(60)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (screenWidth < 768) {
      setDescLength(60)
    } else {
      setDescLength(120)
    }
  }, [screenWidth])

  const getIcon = () => {
    if (isInCart) {
      return (
        <div 
        onClick={() => updateCart(itemId, storeId)} 
        className="absolute -top-2 -right-2 text-lagoon-blue cursor-pointer bg-sea-form-1 md:bg-slate-50 border-[3px] border-white md:border-[#e5e5e5] rounded-full p-1 md:p-2">
          <FiCheck className="text-xl"/>
        </div>
      )
    } else {
      return (
        <div 
        onClick={() => updateCart(itemId, storeId)} 
        className="absolute -top-2 -right-2 bg-lagoon-blue cursor-pointer text-sea-form-1 border-[3px] border-white md:border-[#e5e5e5] rounded-full p-1 md:p-2">
          <FiPlus className="text-xl"/>
        </div>
      )
    }
  }


  return (
    <div className="relative">
      <div className="w-full min-h-36 flex flex-row gap-3 md:gap-6 p-4 bg-sea-form-1 md:bg-white rounded-3xl">
        <div className="basis-2/5 md:basis-[150px]">
          <img src={itemImage} alt={name} className="w-full h-[130px] rounded-3xl bg-cover" />
        </div>
        <div className="basis-3/5 md:basis-[calc(100%-150px)] flex flex-col gap-2 items-start justify-center text-start">
          <p className="text-base font-bold text-lagoon-blue">{name}</p>
          <p className="text-sm font-semibold text-lagoon-blue text-left hyphens-auto">{desc.slice(0, descLength)} ...</p>
          <p className="text-base font-semibold text-lagoon-blue">₹ {price}</p>
        </div>
      </div>
      {getIcon()}
    </div>
  )

}
export default ItemCard