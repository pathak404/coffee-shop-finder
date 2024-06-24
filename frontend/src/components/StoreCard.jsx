import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiStar } from 'react-icons/fi'

const StoreCard = ({ storeId, name, rating, reviews, imageUrl, className }) => {
    const distance = useRef(Math.floor(Math.random() * 10) + 1)
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        const wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : []
        setWishlist(wishlist)
    }, [])

    const wishlistHandler = (store) => {
        setWishlist((prevWishlist) => {
            const storeExists = prevWishlist.some(item => item.storeId === store.storeId);
            let updatedWishlist;
            if (storeExists) {
                updatedWishlist = prevWishlist.filter(item => item.storeId !== store.storeId);
            } else {
                updatedWishlist = [...prevWishlist, {...store}];
            }
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            return updatedWishlist;
        });
    };

    return (
        <div className={`relative overflow-visible mb-6 max-w-[12rem] ${className}`}>
            <Link to={`/store/${storeId}`}>
                <img src={imageUrl} alt="Coffee Shop" className="w-full h-52 object-cover rounded-xl" />
                <div className="pt-2 px-1">
                    <h3 className="text-lg font-semibold text-lagoon-blue">{name}</h3>
                    <div className="flex items-center text-gold">
                        <span className="mr-1"><FiStar fill='rgb(253 203 110)' /></span>
                        <span className="text-black">{rating}</span>
                    </div>
                    <div className="text-sea-form-2 md:text-black text-sm">{reviews} reviews</div>
                    <div className="text-sea-form-2 md:text-black text-sm mt-2">{distance.current} miles</div>
                </div>
            </Link>
            <div className="absolute -top-2 -right-2 bg-sea-form-1 border-2 border-white rounded-full p-1">
                <FiHeart onClick={() => wishlistHandler({storeId})} className="text-lagoon-blue cursor-pointer" fill={`${wishlist?.find(store => store.storeId === storeId) ? 'rgb(0 59 64)' : 'rgb(237, 240, 239)'}`} />
            </div>
        </div>
    )
}

export default StoreCard
