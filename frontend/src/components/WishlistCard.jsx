import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiX, FiStar } from 'react-icons/fi'

const WishlistCard = ({ storeId, name, rating, reviews, imageUrl, className, removeFromWishlist }) => {
    const distance = useRef(Math.floor(Math.random() * 10) + 1)
    return (
        <div className={`relative overflow-visible mb-6 max-w-[12rem] ${className}`}>
            <Link to={`/store/${storeId}`}>
                <img src={imageUrl} alt="Coffee Shop" className="w-full h-52 object-cover rounded-xl" />
                <div className="pt-2 px-1">
                    <h3 className="text-lg font-semibold text-lagoon-blue">{name}</h3>
                    <div className="flex items-center text-gold">
                        <span className="mr-1"><FiStar fill='rgb(253 203 110)' /></span>
                        <span className="text-black">{rating} &nbsp;&nbsp;|&nbsp;&nbsp;</span>
                        <span className="text-sea-form-2 md:text-black text-sm">{reviews} reviews</span>
                    </div>
                    <div className="text-sea-form-2 md:text-black text-sm mt-2">{distance.current} miles</div>
                    {/* <p className="text-lagoon-blue flex items-center font-medium mt-3"><FiShoppingCart className='text-lg me-3' /> Add to Cart</p> */}
                </div>
            </Link>
            <div className="absolute -top-2 -right-2 bg-sea-form-1 border-2 border-white rounded-full p-1">
                <FiX onClick={() => removeFromWishlist(storeId)} className="text-lagoon-blue cursor-pointer" />
            </div>
        </div>
    )
}

export default WishlistCard
