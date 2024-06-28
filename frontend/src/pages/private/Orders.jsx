import React, { useContext, useEffect, useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import OrderCard from '../../components/OrderCard'
import { FiArrowRight } from 'react-icons/fi'
import AuthContext from '../../context/AuthContext'
import NoData from '../../components/NoData'
import Loading from '../../components/Loading'

const Orders = () => {
	const { loading, data: orders, fetch: fetchOrders } = useFetch({ path: "/orders" })
	const user = useRef(JSON.parse(localStorage.getItem('user')))
	const { logout } = useContext(AuthContext)
	const [delayedLoading, setDelayedLoading] = useState(true)


	useEffect(() => {
		fetchOrders()
	}, [fetchOrders])

	useEffect(() => {
		if (!loading) {
		  setTimeout(() => {
			setDelayedLoading(false)
		  }, 400)
		}
	  }, [loading])

	return (
		<div className='w-full px-4 pt-4 md:pt-8 md:ps-10 h-full flex flex-col items-start justify-between'>
			<div className="w-full relative flex flex-row gap-x-4 md:hidden border-b border-lagoon-blue border-dashed py-4">
				<img src="/logo.svg" className='w-16 h-16 border border-lagoon-blue rounded-full' alt="user profile" />
				<div>
					<h1 className='text-2xl font-semibold'>{user.current?.name}</h1>
					<div className='flex flex-row gap-x-4 justify-center'>
						<p className='text-base font-semibold'>+91 {user.current?.phone} &nbsp; | </p>
						<p
							className='text-sm font-bold leading-6 flex gap-x-2 items-center'
							onClick={() => logout()}
						>
							Logout
							<FiArrowRight />
						</p>
					</div>
				</div>
			</div>


			<div className="mt-5">
				<h1 className='text-2xl md:text-5xl font-semibold'>Your orders</h1>
			</div>

			<div className="w-full mt-5 md:mt-10 md:bg-white md:p-4 lg:p-6 xl:p-10 md:rounded-3xl md:min-h-[563px]">
				{delayedLoading ? <Loading className='w-full min-h-[300px] md:min-h-[563px]'/> : 
				orders?.length === 0 ? <NoData
					text="No orders found in your account"
					textClassNames="md:text-xl"
					containerClassNames="mt-10"
				/> :
				<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
					{orders?.map((order, index) => (
						<OrderCard key={index} {...order} />
					))}
				</div>}
			</div>

		</div>
	)
}

export default Orders