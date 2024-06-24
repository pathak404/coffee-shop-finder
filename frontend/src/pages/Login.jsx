import React, { useContext, useEffect, useState } from 'react'
import img from '../assets/images/img1.jpg'
import { Link, useNavigate } from 'react-router-dom'
import InputGroup from '../components/InputGroup'
import FormButton from '../components/FormButton'
import AuthContext from '../context/AuthContext'
import useFetch from '../hooks/useFetch'
import { toast } from 'react-toastify'
import { FiLock, FiAtSign  } from "react-icons/fi"

const Login = () => {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      email: "",
      password: ""
    })
  
    const { loading, data, fetch } = useFetch({
      path: "/login",
      method: "POST",
      isNotify: true,
    })
  
    useEffect(() => {
      if (data) {
        login(data);
        navigate("/")
      }
    }, [data])
  
    const inputHandler = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  
    const formHandler = (e) => {
      e.preventDefault();
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters long")
        return;
      }
      fetch(formData)
    }

    return (
        <div className="bg-white flex flex-col md:flex-row items-center md:justify-center h-screen relative">
            <div className="w-full md:w-2/5 order-2 md:order-1 bg-white fixed top-48 md:top-0 md:relative rounded-t-3xl h-[calc(100vh-12rem)] md:h-auto">
                <div className="text-center h-full overflow-y-scroll md:overflow-hidden px-4">
                    <h1 className="block text-2xl md:text-4xl font-bold ms-1 text-center mb-10 mt-7 md:mt-0 leading-relaxed">Welcome to <br />Coffee Shop finder app</h1>
                    <form className="max-w-sm mx-auto" onSubmit={formHandler}>
                        <InputGroup icon={<FiAtSign className='w-5 h-5'/>} type={"email"} name={"email"} placeholder={"Enter your email"} handler={inputHandler} value={formData.email} />
                        <InputGroup icon={<FiLock className='w-5 h-5'/>} type={"password"} name={"password"} placeholder={"Enter your password"} handler={inputHandler} value={formData.password} />
                        <FormButton loading={loading} arrow={true}>Continue to login</FormButton>
                    </form>
                    <div className="mx-auto grid place-items-center mt-4">
                        <Link to={"/register"} className="mx-auto text-center font-bold">Create a new account</Link>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-3/5 order-1 md:order-2 h-56 fixed md:relative top-0 md:h-screen">
                <img
                    src={img}
                    alt="Login Image"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    )
}

export default Login
