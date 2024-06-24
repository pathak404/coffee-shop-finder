import { useEffect, useState, useRef, useCallback, useContext } from "react"
import { toast } from "react-toastify"
import AuthContext from "../context/AuthContext"

const useFetch = ({ path, isAuth = false, method = 'GET', body = undefined, isNotify=undefined }) => {
  console.log(path, isAuth, method, body)
  const { logout } = useContext(AuthContext)
  const [state, setState] = useState({ data: null, error: null, loading: false })
  const isMounted = useRef(true)
  const headersRef = useRef({
    "Content-Type": "application/json",
  })


  const options = useRef({
    method,
    cache: "no-cache",
    headers: headersRef.current,
    body: body ? JSON.stringify(body) : undefined,
  })


  const reAuth = useCallback(async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/reauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") }),
      })
      if (!response.ok) {
        toast.error("Please login again.")
        logout()
        return
      }
      const data = await response.json()
      localStorage.setItem("authToken", data.authToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      headersRef.current["Authorization"] = "Bearer " + data.authToken
      return true
    } catch (error) {
      toast.error("Unauthorized: Please login again.")
      logout()
    }
  }, [logout])


  const fetchHandler = useCallback(async (body=null) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    if (body) {
      options.current.body = JSON.stringify(body)
    }
    if (isAuth) {
      headersRef.current["Authorization"] = "Bearer " + localStorage.getItem("authToken")
    }
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + path, options.current)
      if (!response.ok) {
        const errorResponse = await response.json()
        if (response.status === 401 && errorResponse.message?.includes("Unauthorized")) {
          const tryReAuth = await reAuth()
          if (tryReAuth) return fetchHandler()
        }
        throw new Error(errorResponse?.message || response.statusText)
      }
      const jsonResponse = await response.json()
      if (isMounted.current) {
        setState({ data: jsonResponse?.data, error: null, loading: false })
        if (isNotify) toast.success(jsonResponse?.message)
      }
    } catch (error) {
      if (isMounted.current) {
        setState({ data: null, error: error.message, loading: false })
        toast.error(error.message)
      }
    } finally {
      if (isMounted.current) {
        setState((prev) => ({ ...prev, loading: false }))
      }
    }
  }, [path, reAuth, isAuth])
  


  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return { ...state, fetch: fetchHandler }
}

export default useFetch
