import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import useFetch from '../hooks/useFetch'
import Loading from "../components/Loading"

const AutoLogin = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)
    const { data, fetch } = useFetch({
        path: "/login",
        method: "POST",
        isAuth: false,
        body: {
            phone: 1234567890,
            password: 'pass1234'
        }
    })


    useEffect(() => {
        if(id === "d3f182d4b0a71d6ec3697e62026619ad"){
            setTimeout(() => {
                fetch()
            }, 500)
        }else{
            navigate("/")
        }
    }, [])

    useEffect(() => {
        if(data){
            login(data)
            navigate("/")
        }
    }, [data])

  return (
    <Loading message="Skipping login process, Please wait ..." />
  )
}

export default AutoLogin