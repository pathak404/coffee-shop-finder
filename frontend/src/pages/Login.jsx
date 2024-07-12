import React, { useContext, useEffect, useState } from 'react'
import img from '../assets/images/img1.jpg'
import { Link, useNavigate } from 'react-router-dom'
import InputGroup from '../components/InputGroup'
import FormButton from '../components/FormButton'
import AuthContext from '../context/AuthContext'
import useFetch from '../hooks/useFetch'
import { toast } from 'react-toastify'
import { FiLock, FiPhone } from "react-icons/fi"

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  })

  const { loading, data, fetch } = useFetch({
    path: "/login",
    method: "POST",
    isAuth: false,
    isNotify: true,
  })

  useEffect(() => {
    if (data) {
      login(data);
      navigate("/")
    }
  }, [data])

  const inputHandler = (e) => {
    if (e.target.name === "phone" && isNaN(e.target.value)) return;
    if (e.target.name === "phone" && e.target.value.length > 10) return;
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
    fetch({ customBody: formData })
  }

  return (
    <div className="bg-white flex flex-col md:flex-row items-center md:justify-center h-screen relative">
      <div className="w-full md:w-2/5 order-2 md:order-1 bg-white fixed top-48 md:top-0 md:relative rounded-t-3xl h-[calc(100vh-12rem)] md:h-auto z-10">
        <div className="text-center h-full overflow-y-scroll md:overflow-hidden px-4 pb-10">
          <h1 className="block text-2xl md:text-4xl font-bold ms-1 text-center mb-5 mt-7 md:mt-0 leading-relaxed">Welcome to <br />Coffee Shop finder app</h1>
          <p className='mt-3 font-mono text-xs md:text-sm'>Use the given credentials to save time :)</p>
          <p className='mt-1 mb-5 font-mono text-xs md:text-sm'>Phone: 1234567890 &nbsp;&nbsp; Password: pass1234</p>
          <form className="max-w-sm mx-auto" onSubmit={formHandler}>
            <InputGroup icon={<FiPhone className='w-5 h-5' />} type={"number"} name={"phone"} placeholder={"Enter phone number"} handler={inputHandler} value={formData.phone} />
            <InputGroup icon={<FiLock className='w-5 h-5' />} type={"password"} name={"password"} placeholder={"Enter the password"} handler={inputHandler} value={formData.password} />
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
