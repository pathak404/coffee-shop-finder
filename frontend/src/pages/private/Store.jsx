import React from 'react'
import { useParams } from 'react-router-dom'

const Store = () => {
  const {storeId} = useParams()
  return (
    <div>{storeId}</div>
  )
}

export default Store