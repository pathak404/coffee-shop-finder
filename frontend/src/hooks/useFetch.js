import { useEffect, useState, useRef, useCallback, useContext } from "react"
import { toast } from "react-toastify"
import AuthContext from "../context/AuthContext"

const useFetch = ({ path, isAuth = true, method = 'GET', body = undefined, isNotify = undefined }) => {
  const { logout } = useContext(AuthContext)
  const [state, setState] = useState({ data: null, error: null, loading: false })
  const isMounted = useRef(true)

  const optionsRef = useRef({
    method,
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
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
        return false
      }
      const data = await response.json()
      localStorage.setItem("authToken", data.authToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      optionsRef.current.headers.Authorization = "Bearer " + data.authToken
      return true
    } catch (error) {
      toast.error("Unauthorized: Please login again.")
      logout()
      return false
    }
  }, [logout])

  const fetchHandler = useCallback(async (fetchOptions) => {
    if (state.loading) return
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + fetchOptions.path, fetchOptions.options)
      if (!response.ok) {
        const errorResponse = await response.json()
        if (response.status === 401 && errorResponse.message?.includes("Unauthorized")) {
          const reAuthSuccess = await reAuth()
          if (reAuthSuccess) {
            return fetchHandler(fetchOptions)
          }
        }
        throw new Error(errorResponse?.message || response.statusText)
      }
      const jsonResponse = await response.json()
      if (isMounted.current) {
        setState({ data: jsonResponse?.data, error: null, loading: false })
        if (isNotify) toast.success(jsonResponse?.message)
      }
      return jsonResponse?.data
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
  }, [ path, reAuth, isNotify])


  const initiateFetch = useCallback(({ customPath, customMethod, customBody } = {}) => {
    const fetchOptions = {
      path: customPath || path,
      options: {
        method: customMethod || method,
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          ...(isAuth && { Authorization: "Bearer " + localStorage.getItem("authToken") }),
        },
        body: customBody ? JSON.stringify(customBody) : body ? JSON.stringify(body) : undefined,
      }
    }

    fetchHandler(fetchOptions)
  }, [ fetchHandler, isAuth ])

  
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return { ...state, fetch: initiateFetch }
}

export default useFetch
