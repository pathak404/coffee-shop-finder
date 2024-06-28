// import { useEffect, useState } from "react"
import { FiX } from "react-icons/fi"

const CartItem = ({ storeId, itemId, itemImage, quantity, name, price, updateCartItem }) => {

    return (
        <div className="relative">
            <div className="w-full min-h-36 flex flex-row gap-3 md:gap-6 p-4 bg-sea-form-1 md:bg-white rounded-3xl">
                <div className="basis-24">
                    <img src={itemImage} alt={name} className="w-24 h-28 rounded-3xl bg-cover" />
                </div>
                <div className="basis-3/5 md:basis-[calc(100%-150px)] flex flex-col gap-2 items-start justify-center text-start">
                    <p className="text-base font-bold text-lagoon-blue">{name}</p>
                    {/* <div className="w-full h-0.5 bg-lagoon-blue"></div> */}
                    <div className="w-full flex flex-row flex-nowrap gap-x-2">
                        <p className="text-white bg-lagoon-blue text-xl rounded-3xl w-8 h-8 grid place-items-center cursor-pointer" onClick={() => updateCartItem(itemId, storeId, quantity-1)}>-</p>
                        <input type="number" className="w-8 h-8 border border-lagoon-blue rounded-3xl text-center text-lagoon-blue" value={quantity} disabled />
                        <p className="text-white bg-lagoon-blue text-xl rounded-3xl w-8 h-8 grid place-items-center cursor-pointer" onClick={() => updateCartItem(itemId, storeId, quantity+1)}>+</p>
                    </div>
                    <p className="text-base font-semibold text-lagoon-blue">₹ {price*quantity}</p>
                </div>
            </div>
            <div
                onClick={() => updateCartItem(itemId, storeId, 0)}
                className="absolute -top-2 -right-2 text-lagoon-blue cursor-pointer bg-sea-form-1 md:bg-slate-50 border-[3px] border-white md:border-[#e5e5e5] rounded-full p-1 md:p-2">
                <FiX className="text-xl" />
            </div>
        </div>
    )
}
export default CartItem