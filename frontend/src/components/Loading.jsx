import { AiOutlineLoading3Quarters } from "react-icons/ai"

const Loading = ({ className = "w-full min-h-screen", message=undefined }) => {
  return (
    <div className={`m-auto flex items-center justify-center ${className}`}>
      <div className="relative p-3 rounded-lg flex flex-col items-center justify-center space-y-3">
        <AiOutlineLoading3Quarters className="animate-spin text-lagoon-blue text-3xl" />
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export default Loading