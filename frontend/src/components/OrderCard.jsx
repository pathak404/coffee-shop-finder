import React from 'react'
import { Link } from 'react-router-dom'

const OrderCard = ({ storeName, amount, paymentStatus, createdAt, items, orderId }) => {
    const date = new Date(createdAt).toDateString()
    const time = new Date(createdAt).toLocaleTimeString()
    return (
        <div className="flex flex-col justify-between text-slate-600 border border-lagoon-blue rounded-3xl p-6">
            <div className="flex flex-row justify-between">
                <p className="text-xs text-lagoon-blue">{orderId}</p>
                <p className="text-xs font-semibold text-lagoon-blue">{date}</p>
            </div>
                <h1 className="text-lg font-bold text-lagoon-blue py-2">{storeName}</h1>
            <div className="flex flex-row justify-between">
                <p className="text-base md:text-lg font-bold">₹ {amount}</p>
                <Link
                    to={`/orders/${orderId}`} state={{ data: { items, amount, paymentStatus, createdAt } }}
                    className="text-sm md:text-base font-bold">
                    View Order
                </Link>
            </div>
        </div>
    )
}
export default OrderCard