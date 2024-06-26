import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiStar } from 'react-icons/fi'

const StoreCard = ({ storeId, name, rating, reviews, imageUrl, className, updateWishlist, heartFill }) => {
    const distance = useRef(Math.floor(Math.random() * 10) + 1)

    return (
        <div className={`relative overflow-visible mb-6 max-w-[12rem] ${className}`}>
            <Link to={`/store/${storeId}`}>
                <img src={imageUrl} alt="Coffee Shop" className="w-full h-52 object-cover rounded-xl" />
                <div className="pt-2 px-1">
                    <h3 className="text-lg font-semibold text-lagoon-blue">{name}</h3>
                    <div className="flex items-center text-gold">
                        <span className="mr-1"><FiStar fill='rgb(253 203 110)' /></span>
                        <span className="text-lagoon-blue font-semibold">{rating}&nbsp;</span>
                        <span className="text-sea-form-2 text-sm">{reviews} reviews</span>
                    </div>
                    <div className="text-lagoon-blue font-semibold text-sm mt-1">{distance.current} miles</div>
                </div>
            </Link>
            <div className="absolute -top-2 -right-2 bg-sea-form-1 border-2 border-white rounded-full p-1">
                <FiHeart onClick={() => updateWishlist(storeId)} className="text-lagoon-blue cursor-pointer" fill={heartFill} />
            </div>
        </div>
    )
}

export default StoreCard
