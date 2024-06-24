import React, { useContext } from 'react'
import userImg from "../../assets/images/user.png"
import { NavLink } from 'react-router-dom'
import { FiHome, FiHeart, FiShoppingCart, FiUser, FiShoppingBag, FiLogOut  } from "react-icons/fi"
import AuthContext from '../../context/AuthContext'

const Navigation = () => {
  const {logout} = useContext(AuthContext)
  return (
    <div className='bg-white md:bg-transparent w-full h-full p-5 flex flex-row md:flex-col items-center justify-between md:justify-evenly'>
        <div className="hidden md:block">
            <img src={userImg} className='w-14 h-14 rounded-full' alt="user profile" />
        </div>

        <NavLink to="/" className="text-lg md:text-2xl font-bold text-disabled md:text-black p-4"><FiHome className='w-6 h-6'/></NavLink>
        <NavLink to="/wishlist" className="text-lg md:text-2xl font-bold text-disabled md:text-black p-4"><FiHeart className='w-6 h-6'/></NavLink>
        <NavLink to="/cart" className="text-lg md:text-2xl font-bold text-disabled md:text-black p-4"><FiShoppingCart className='w-6 h-6'/></NavLink>
        <NavLink to="/account" className="md:hidden text-lg md:text-2xl font-bold text-disabled md:text-black p-4"><FiUser className='w-6 h-6'/></NavLink>
        <NavLink to="/orders" className="hidden md:block text-lg md:text-2xl font-bold text-disabled md:text-black p-4"><FiShoppingBag className='w-6 h-6'/></NavLink>
        <div className="hidden md:block text-lg md:text-2xl font-bold text-disabled md:text-black p-4 cursor-pointer" onClick={logout}><FiLogOut className='w-6 h-6'/></div>

    </div>
  )
}

export default Navigation