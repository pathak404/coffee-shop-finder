import React, { useEffect } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import QrCode from "qrcode"


const Order = () => {
    const { orderId } = useParams()
    const { items, amount } = useLocation().state?.data
    const navigate = useNavigate()

    useEffect(() => {
        QrCode.toCanvas(document.getElementById('qr-code'), orderId, { width: 190 })
    }, [orderId])


    return (
        <div className='w-full md:pt-8 md:ps-10 h-full flex flex-col items-start justify-between'>
            <div className="md:hidden flex items-center relatuve cursor-pointer h-16 border-b w-full ps-3" onClick={() => navigate("/orders")}>
                <FiChevronLeft className="text-lagoon-blue text-2xl" />
                <h1 className='text-base md:text-5xl font-semibold'>{orderId}</h1>
            </div>
            <div className="hidden md:block mt-5">
                <h1 className='text-5xl font-semibold'>Order Details</h1>
            </div>

            <div className="w-full flex flex-col md:flex-row items-start justify-center md:gap-x-5 md:my-8 md:py-10 lg:p-20 md:rounded-3xl md:min-h-[623px] bg-white">
                <div className="md:max-w-96 md:border md:border-lagoon-blue px-4 pt-6 pb-1 md:pt-10 md:pb-10 md:px-6 rounded-3xl w-full">
                    <h1 className="text-base md:text-lg font-semibold pb-3">Show this QR code at the shop and enjoy your meal.</h1>
                    <div className="flex w-full items-center justify-center">
                        <canvas id="qr-code" />
                    </div>
                </div>

                <div className='md:max-w-96 md:border md:border-lagoon-blue px-4 py-10 md:px-6 rounded-3xl w-full'>
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
export default Order