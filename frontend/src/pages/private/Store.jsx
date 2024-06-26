import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import storesImg from "../../components/StoreImages"
import { FiChevronLeft, FiStar } from "react-icons/fi"
import useFetch from '../../hooks/useFetch'
import StoreTab from '../../components/StoreTab'
import ItemCard from '../../components/ItemCard'
import ItemImages from "../../components/ItemImages"
import AuthContext from '../../context/AuthContext'
import useDebounce from '../../hooks/useDebounce'

const Store = () => {
  const { storeId } = useParams()
  const navigate = useNavigate()
  const [store, setStore] = useState({})
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const { data, fetch } = useFetch({ path: `/store/${storeId}` })
  const { data:itemsData, fetch:fetchItems } = useFetch({ path: `/store/${storeId}/items` })
  const [activeTab, setActiveTab] = useState('coffee')

  const [cart, setCart] = useState([])
  const {updateTotalCart} = useContext(AuthContext)
  const { data:cartData, fetch:fetchCart } = useFetch({ path: `/cart` })
  const { fetch:fetchAddCart } = useFetch({ path: `/cart`, method: 'POST', isNotify: true})
  const isUpdatingCart = useRef(false)
  const prevCartRef = useRef([]);


  useEffect(() => {
    fetch()
    fetchItems()
    fetchCart()
  }, [fetch, fetchItems, fetchCart])

  useEffect(() => {
    if (data) {
      setStore(data)
    }
  }, [data])


  useEffect(() => {
    if (itemsData) {
      setItems(itemsData)
      setFilteredItems(itemsData.filter(item => item.category === 'coffee'))
    }
  }, [itemsData])


  useEffect(() => {
    if (cartData) {
      setCart(cartData)
    }
  }, [cartData])

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab)
    setFilteredItems(items.filter(item => item.category === tab))
  }, [setActiveTab, items])


  const debouncedUpdateCart = useDebounce(async (itemId, storeId, action) => {
    try {
      if (isUpdatingCart.current) return
      isUpdatingCart.current = true
      fetchAddCart({
        customBody: { itemId, quantity: action === 'remove' ? 0 : 1, storeId }
      })
      setCart(prevCart => {
        let updatedCart
        if (action === 'remove') {
          updatedCart = prevCart.filter(item => item.itemId !== itemId)
        } else {
          updatedCart = [...prevCart, { itemId, quantity: 1 }]
        }
        return updatedCart
      })
    } finally {
      isUpdatingCart.current = false
    }
  }, 300)


  const updateCart = useCallback((itemId, storeId) => {
    const itemExists = cart.some(item => item.itemId === itemId)
    const action = itemExists ? 'remove' : 'add'

    debouncedUpdateCart(itemId, storeId, action)
  }, [cart, debouncedUpdateCart])


  const updateTotalCartDebounced = useDebounce((totalItems) => {
    updateTotalCart(totalItems);
  }, 300);

  useEffect(() => {
    if (prevCartRef.current.length !== cart.length) {
      updateTotalCartDebounced(cart.length);
      prevCartRef.current = cart;
    }
  }, [cart, updateTotalCartDebounced])

  
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-center h-screen relative">
      <div className="w-full md:w-1/2 order-2 bg-white md:bg-transparent fixed top-48 md:top-0 md:relative rounded-t-3xl h-[calc(100vh-12rem)] md:h-full z-10">
        <div className="text-center h-full overflow-y-scroll px-4 custom-scrollbar">
          <div className="mb-10 mt-5 md:mt-8 md:mx-4">
            <div className="text-left">
              <h3 className="text-lg md:text-2xl font-semibold text-lagoon-blue">{store.name}</h3>
              <div className="flex items-center text-gold md:text-lg">
                <span className="mr-1"><FiStar fill='rgb(253 203 110)' /></span>
                <span className="text-lagoon-blue font-semibold">{store.rating} &nbsp;</span>
                <span className="text-sea-form-2 md:text-gray-400 text-sm md:text-lg">{store.reviews} reviews</span>
              </div>
              <div className="text-lagoon-blue font-semibold text-sm md:text-lg mt-2">{store.address}</div>
            </div>
            <StoreTab activeTab={activeTab} handleTabChange={handleTabChange} />
            <div className="flex flex-col justify-center gap-5 mt-7">
              {filteredItems.map((item, index) => 
              <ItemCard 
              key={index} 
              {...item} 
              itemImage={ItemImages[item.itemId]} 
              updateCart={updateCart}
              isInCart={cart.some(cartItem => cartItem.itemId === item.itemId)}
              />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 order-1 h-56 fixed md:relative top-0 md:h-screen">
        <div className="bg-white rounded-md p-1 md:p-2 absolute top-4 left-4 cursor-pointer" onClick={() => navigate("/")}>
          <FiChevronLeft className="text-lagoon-blue text-xl md:text-2xl" />
        </div>
        <img
          src={storesImg[storeId] ? storesImg[storeId] : storesImg[0]}
          alt="Login Image"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  )
}

export default Store