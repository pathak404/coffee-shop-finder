import React, { useEffect } from 'react'
import { useLottie } from 'lottie-react'
import successJSON from '../assets/lottie/success.json'
import QrCode from "qrcode"

const OrderSuccess = ({ orderId, items, amount }) => {

    const lottieOptions = {
        animationData: successJSON,
        loop: false,
        autoplay: false,
        style: { width: '170px', height: '170px' },
    }
    const { View, play } = useLottie(lottieOptions)

    useEffect(() => {
        QrCode.toCanvas(document.getElementById('qr-code'), orderId, { width: 190 })
    }, [orderId])

    useEffect(() => {
        play()
    }, [play])

    return (
        <div className="w-full flex flex-col">
            <div className={`w-full h-full flex flex-col items-center justify-start bg-success md:bg-transparent py-10 md:py-6 px-4 min-h-sm`}>
                {View}
                <h2 className="text-center mt-5 textbase md:text-2xl font-bold text-white md:text-lagoon-blue">Your order has been placed successfully!</h2>
            </div>

            <div className="w-full flex flex-col md:flex-row items-start justify-center md:gap-x-5 md:my-10">
                <div className="md:max-w-96 bg-white md:bg-transparent md:border md:border-lagoon-blue px-4 pt-10 pb-1 md:pt-10 md:pb-10 md:px-6 rounded-3xl w-full">
                    <h1 className="text-base md:text-lg font-semibold pb-3">Show this QR code at the shop and enjoy your meal.</h1>
                    <div className="flex w-full items-center justify-center">
                        <canvas id="qr-code" />
                    </div>
                </div>

                <div className='md:max-w-96 bg-white md:bg-transparent md:border md:border-lagoon-blue px-4 py-10 md:px-6 rounded-3xl w-full'>
                    <h1 className='text-sm font-medium py-2 border-b border-lagoon-blue border-dashed'>Order: {orderId}</h1>
                    <h1 className="text-lg md:text-2xl font-semibold mt-2">Order Items</h1>
                    <div className="flex flex-col my-2">
                        {items?.map((item, index) => (
                            <div key={index} className="flex justify-between text-slate-600">
                                <h1 className="text-base md:text-lg font-semibold">{item.name} x {item.quantity}</h1>
                                <h1 className="text-base md:text-lg font-semibold">₹ {item.price * item.quantity}</h1>
                            </div>
                        ))}
                    </div>
                    <h1 className="text-lg md:text-2xl font-semibold mt-8">Order Summary</h1>
                    <div className="flex justify-between mt-2 text-slate-600">
                        <h1 className="text-base md:text-lg font-semibold">Subtotal</h1>
                        <h1 className="text-base md:text-lg font-semibold">₹ {items?.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h1>
                    </div>
                    <div className="flex justify-between mt-3 text-slate-600">
                        <h1 className="text-base md:text-lg font-semibold">Shipping</h1>
                        <h1 className="text-base md:text-lg font-semibold">₹ 50</h1>
                    </div>
                    <div className="flex justify-between mt-4 border-t border-lagoon-blue border-dashed pt-2">
                        <h1 className="text-base md:text-lg font-semibold">Total</h1>
                        <h1 className="text-base md:text-lg font-semibold">₹ {amount}</h1>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderSuccess