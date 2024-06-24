import { useContext, useEffect } from "react"
import AuthContext from "../../context/AuthContext"
import Navigation from "../../components/private/Navigation"

const ProtectedPage = ({children}) => {
    const {isAuth} = useContext(AuthContext)
    useEffect(() => {
        if (!isAuth) {
            window.location.href = '/'
        }
    }, [isAuth])
    
  return (
    <div className="w-full h-auto">
      <div className='h-24 w-full md:w-52 md:min-h-screen fixed bottom-0 md:bottom-auto md:top-0 right-0'>
        <Navigation/>
      </div>
      <div className="md:w-[calc(100%-6rem)] mb-24 md:mb-0 min-h-screen">
          {children}
      </div>
    </div>
  )
}

export default ProtectedPage