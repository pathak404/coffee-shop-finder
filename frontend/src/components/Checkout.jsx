import React, { useState, useEffect, useRef } from 'react'
import FormButton from './FormButton'
import { toast } from 'react-toastify'


const Checkout = ({ cart, updatePaymentStatus, updateDelayedLoading }) => {
    const [subTotal, setSubTotal] = useState(0)
    const [total, setTotal] = useState(0)
    const orderData = useRef('')

    useEffect(() => {
        const sbTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        setSubTotal(sbTotal)
        setTotal(sbTotal + 50)
    }, [cart])

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        document.body.appendChild(script)
        return () => {
            document.body.removeChild(script)
        }
    }, [])


    const handleCheckout = async (e) => {
        e.preventDefault();
        updateDelayedLoading(true)
        const response = await fetch(import.meta.env.VITE_API_URL + '/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
        })
        const { data } = await response.json()
        orderData.current = data
        const user = JSON.parse(localStorage.getItem('user'))

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            amount: data.amount * 100,
            currency: 'INR',
            name: 'Coffee Shop',
            description: 'A test transaction for coffee shop',
            image: import.meta.env.VITE_FRONTEND_URL + '/logo.svg',
            order_id: data.razorpayOrderId,
            handler: onSuccess,
            modal: {
                ondismiss: function() { 
                    updateDelayedLoading(false) 
                }
            },
            prefill: {
                name: user.name,
                contact: user.phone
            },
            theme: {
                color: "#003B40"
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
        rzp.on('payment.failed', onError)
    }

    const onSuccess = async ({ razorpay_payment_id }) => {
        const response = await fetch(import.meta.env.VITE_API_URL + '/verify-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({ 
                razorpayPaymentId: razorpay_payment_id, 
                razorpayOrderId: orderData.current.razorpayOrderId
            })
        })
        const { message } = await response.json()
        if(message.indexOf('Payment verified successfully') > -1 ) {
            updateDelayedLoading(false)
            updatePaymentStatus({ status: true, ...orderData.current })
        }else{
            onError(message)
        }
    }

    const onError = (message = undefined) => {
        updateDelayedLoading(false)
        toast.error(message ?? 'Payment failed')
    }


    return (
        <>
            <div className="w-full md:max-w-96 md:ms-16">
                <div className="bg-white px-4 py-10 md:px-6 rounded-3xl">
                    <h1 className="text-lg md:text-2xl font-semibold">Order Summary</h1>
                    <div className="flex justify-between mt-5">
                        <h1 className="text-base md:text-lg font-semibold">Subtotal</h1>
                        <h1 className="text-base md:text-lg font-semibold">₹ {subTotal}</h1>
                    </div>
                    <div className="flex justify-between mt-3">
                        <h1 className="text-base md:text-lg font-semibold">Shipping</h1>
                        <h1 className="text-base md:text-lg font-semibold">₹ 50</h1>
                    </div>
                    <div className="flex justify-between mt-4 border-t border-lagoon-blue border-dashed pt-2">
                        <h1 className="text-base md:text-lg font-semibold">Total</h1>
                        <h1 className="text-base md:text-lg font-semibold">₹ {total}</h1>
                    </div>
                    <div className="flex justify-center mt-10 items-center" onClick={handleCheckout} >
                        <FormButton arrow>Proceed to Checkout</FormButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout