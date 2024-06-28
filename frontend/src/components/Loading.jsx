import { AiOutlineLoading3Quarters } from "react-icons/ai"

const Loading = ({ className = "w-full min-h-screen" }) => {
  return (
    <div className={`m-auto flex items-center justify-center ${className}`}>
      <div className="relative p-3 rounded-lg w-min flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-lagoon-blue text-3xl" />
      </div>
    </div>
  )
}

export default Loading