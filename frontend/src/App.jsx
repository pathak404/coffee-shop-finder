import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AuthContext from "./context/AuthContext"
import { useState } from "react"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/private/Home"
import ProtectedPage from "./pages/private/ProtectedPage"
import Wishlist from "./pages/private/Wishlist"
import Store from "./pages/private/Store"

function App() {
  const [isAuth, setAuth] = useState(localStorage.getItem("authToken") || null)
  const [totalCart, setTotalCart] = useState(localStorage.getItem("totalCart") || 0)

  const login = ({authToken, refreshToken, ...rest}) => {
    localStorage.setItem("authToken", authToken)
    localStorage.setItem("refreshToken", refreshToken)
    localStorage.setItem("user", JSON.stringify(rest))
    updateTotalCart(rest.totalCart)
    setAuth(authToken)
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    updateTotalCart(0)
    setAuth(null)
  }

  const updateTotalCart = (value) => {
    setTotalCart(value)
    localStorage.setItem("totalCart", value)
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuth ? <ProtectedPage><Home/></ProtectedPage> : <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/wishlist",
      element: <ProtectedPage><Wishlist /></ProtectedPage>
    },
    {
      path: "/store/:storeId",
      element: <ProtectedPage layout={2}><Store /></ProtectedPage>
    }
  ])

  return (
    <AuthContext.Provider value={{isAuth, login, logout, updateTotalCart, totalCart}}>
      <ToastContainer position="top-center" hideProgressBar={true} autoClose={2000} />
      <RouterProvider router={router}>
      </RouterProvider>
    </AuthContext.Provider>
  )
}

export default App
