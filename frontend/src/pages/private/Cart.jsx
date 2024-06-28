import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import ItemImages from "../../components/ItemImages"
import { useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import CartItem from '../../components/CartItem'
import AuthContext from '../../context/AuthContext'
import Checkout from '../../components/Checkout'
import NoData from '../../components/NoData'
import OrderSuccess from '../../components/OrderSuccess'
import Loading from '../../components/Loading'


const Cart = () => {
    const navigate = useNavigate()
    const { updateTotalCart } = useContext(AuthContext)
    const { loading, data: cartData, fetch: fetchCart } = useFetch({ path: '/cart' })
    const [cart, setCart] = useState([])
    const [isPaymentSuccess, setIsPaymentSuccess] = useState({ status: false, orderId: undefined })
    const [delayedLoading, setDelayedLoading] = useState(true)

    useEffect(() => {
        fetchCart()
    }, [fetchCart])

    useEffect(() => {
        if (cartData) {
            setCart(cartData)
        }
    }, [cartData])


    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                setDelayedLoading(false)
            }, 400)
        }
    }, [loading])


    const updateCartItem = useCallback((itemId, storeId, quantity) => {
        fetchCart({
            customMethod: 'POST',
            customBody: { itemId, quantity: quantity, storeId }
        })
        setCart(prevCart => {
            let itemIndex = prevCart.findIndex(item => item.itemId === itemId)
            if (quantity !== 0) {
                prevCart[itemIndex].quantity = quantity
                return [...prevCart]
            }
            return prevCart.filter(item => item.itemId !== itemId)
        })
        if (quantity === 0) {
            updateTotalCart(cart.length - 1)
        }
    }, [cart, fetchCart])


    const updatePaymentStatus = (data) => {
        setIsPaymentSuccess((prev) => ({ ...prev, ...data }))
        if (data.status === true) updateTotalCart(0)
    }

    const updateDelayedLoading = (status) => {
        setDelayedLoading(status)
    }

    return (
        <div className='w-full md:pt-8 md:ps-10 h-full flex flex-col items-start justify-between'>
            <div className="md:hidden flex items-center relatuve cursor-pointer h-16 border-b w-full ps-3" onClick={() => navigate("/")}>
                <FiChevronLeft className="text-lagoon-blue text-2xl" />
                <h1 className='text-base md:text-5xl font-semibold'>Your Cart</h1>
            </div>
            <div className="hidden md:block mt-5">
                <h1 className='text-5xl font-semibold'>Your Cart</h1>
            </div>
            {isPaymentSuccess.status === true && <OrderSuccess {...isPaymentSuccess} />}
            {delayedLoading && isPaymentSuccess.status === false ? 
            <Loading className='mt-10 min-h-[400px] md:min-h-[480px]' /> :
            cart?.length === 0 && isPaymentSuccess.status === false ? <NoData
                textClassNames={"md:text-xl"}
                containerClassNames={"px-3 mt-10 min-h-[400px] md:min-h-[480px]"}
                text='Your cart is empty. Go back to the store and add some items to your cart.'
            /> : isPaymentSuccess.status === false ?
                <div className="w-full px-3 md:p-2 mt-8 flex justify-start flex-col md:flex-row md:py-5">
                    <div className="w-full md:max-w-[500px]">
                        <div className="space-y-5 md:space-y-8">
                            {cart.map((item, index) => (
                                <CartItem
                                    key={index}
                                    {...item}
                                    itemImage={ItemImages[item.itemId]}
                                    updateCartItem={updateCartItem}
                                />
                            ))}
                        </div>
                    </div>
                    <Checkout cart={cart} updatePaymentStatus={updatePaymentStatus} updateDelayedLoading={updateDelayedLoading} />
                </div> : null}
        </div>
    )
}

export default Cart