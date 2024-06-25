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

  const login = ({authToken, refreshToken, ...rest}) => {
    setAuth(authToken)
    localStorage.setItem("authToken", authToken)
    localStorage.setItem("refreshToken", refreshToken)
    localStorage.setItem("user", JSON.stringify(rest))
  }

  const logout = () => {
    setAuth(null)
    localStorage.removeItem("authToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
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
      element: <ProtectedPage><Store /></ProtectedPage>
    }
  ])

  return (
    <AuthContext.Provider value={{isAuth, login, logout}}>
      <ToastContainer position="top-center" />
      <RouterProvider router={router}>
      </RouterProvider>
    </AuthContext.Provider>
  )
}

export default App
