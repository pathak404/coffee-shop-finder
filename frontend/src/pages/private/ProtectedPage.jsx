import { useContext, useEffect } from "react"
import AuthContext from "../../context/AuthContext"
import Navigation from "../../components/Navigation"

const ProtectedPage = ({children, layout=1}) => {
    const {isAuth} = useContext(AuthContext)
    useEffect(() => {
        if (!isAuth) {
            window.location.href = '/'
        }
    }, [isAuth])

    if(layout === 2) {
      return (
        <div className="w-full h-auto bg-white md:bg-transparent">
        <div className='hidden md:block h-24 w-full md:w-36 md:min-h-screen fixed bottom-0 md:bottom-auto md:top-0 right-0 z-50'>
          <Navigation/>
        </div>
        <div className="md:w-[calc(100%-9rem)] md:mb-0 min-h-screen">
            {children}
        </div>
      </div>
      )
    }
    
  return (
    <div className="w-full h-auto bg-white md:bg-transparent">
      <div className='h-24 w-full md:w-36 md:min-h-screen fixed bottom-0 md:bottom-auto md:top-0 right-0 z-50'>
        <Navigation/>
      </div>
      <div className="md:w-[calc(100%-9rem)] mb-24 md:mb-0 min-h-screen">
          {children}
      </div>
    </div>
  )
}

export default ProtectedPage