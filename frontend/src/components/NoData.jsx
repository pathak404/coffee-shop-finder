import React from 'react'
import noDataJSON from '../assets/lottie/no-data.json'
import Lottie from 'lottie-react'



const NoData = ({text="No data found", containerClassNames, textClassNames, lottieRef, autoplay=true}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${containerClassNames}`}>
        <Lottie
        lottieRef={lottieRef} 
        animationData={noDataJSON}
        loop={false}
        autoplay={autoplay}
        style={{ width: '140px', height: '140px' }}
        initialSegment={[0, 52]}
        />
        <h2 className={`text-center font-semibold mt-5 ${textClassNames}`}>{text}</h2>
    </div>
  )
}

export default NoData