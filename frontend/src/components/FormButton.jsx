import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"

const FormButton = ({ children, loading, arrow }) => {
  return (
    <button type="submit" className="inline-flex gap-3 items-center justify-center w-full px-3 py-3 md:px-5 md:py-5 bg-lagoon-blue text-white font-bold rounded-full hover:bg-lagoon-blue/90 transition-all duration-300">
      { 
        loading ? <><AiOutlineLoading3Quarters className="inline w-4 h-4 text-gray-100 animate-spin" /><span>Please Wait ...</span></> : <>{ children }{ arrow && <HiOutlineArrowNarrowRight className="w-5 h-5"/> }</>
      }
    </button>
  )
}

export default FormButton