import React, { useEffect } from 'react'
import { FiCoffee } from 'react-icons/fi'
import foodIcon from "../assets/icons/food.svg"
import foodIconActive from "../assets/icons/food-active.svg"
import drinkIcon from "../assets/icons/drink.svg"
import drinkIconActive from "../assets/icons/drink-active.svg"

const StoreTab = ({ activeTab, handleTabChange }) => {

  return (
    <div className='mt-7'>
      <div className="grid grid-cols-3 grid-rows-1 gap-x-7 text-base font-semibold text-disabled">
        <div
          className={`${activeTab === "coffee" ? 'bg-sea-form-1 md:bg-white text-lagoon-blue' : ''} rounded-3xl p-3 flex flex-col gap-2 items-center cursor-pointer select-none`}
          onClick={() => handleTabChange("coffee")}>
          <FiCoffee className="text-2xl" />
          Coffee
        </div>
        <div
          className={`${activeTab === "drinks" ? 'bg-sea-form-1 md:bg-white text-lagoon-blue' : ''} rounded-3xl p-3 flex flex-col gap-2 items-center cursor-pointer select-none`}
          onClick={() => handleTabChange("drinks")}>
          <img src={activeTab === "drinks" ? drinkIconActive : drinkIcon} className='w-6 h-6' />
          Drinks
        </div>
        <div
          className={`${activeTab === "food" ? 'bg-sea-form-1 md:bg-white text-lagoon-blue' : ''} rounded-3xl p-3 flex flex-col gap-2 items-center cursor-pointer select-none`}
          onClick={() => handleTabChange("food")}>
          <img src={activeTab === "food" ? foodIconActive : foodIcon} className='w-6 h-6' />
          Food
        </div>
      </div>
    </div>
  )
}

export default StoreTab