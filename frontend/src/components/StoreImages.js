import productImage0 from "../assets/images/productImage0.jpg"
import productImage1 from "../assets/images/productImage1.jpg"
import productImage2 from "../assets/images/productImage2.jpg"
import productImage3 from "../assets/images/productImage3.jpg"
import productImage4 from "../assets/images/productImage4.jpg"
import productImage5 from "../assets/images/productImage5.jpg"
import productImage6 from "../assets/images/productImage6.jpg"
import productImage7 from "../assets/images/productImage7.jpg"
import productImage8 from "../assets/images/productImage8.jpg"
import productImage9 from "../assets/images/productImage9.jpg"
import productImage10 from "../assets/images/productImage10.jpg"
import productImage11 from "../assets/images/productImage11.jpg"
import productImage12 from "../assets/images/productImage12.jpg"
import productImage13 from "../assets/images/productImage13.jpg"
import productImage14 from "../assets/images/productImage14.jpg"
import productImage15 from "../assets/images/productImage15.jpg"
const StoreImages = [productImage0, productImage1, productImage2, productImage3, productImage4, productImage5, productImage6, productImage7, productImage8, productImage9, productImage10, productImage11, productImage12, productImage13, productImage14, productImage15]

const StoreList= [
    "STReRDiM1719220280607",
    "STRw0YtB1719220300261",
    "STR1iUHy1719220347089",
    "STRRrxSz1719220361879",
    "STRtawTR1719220553940",
    "STRAlXUf1719220638878",
    "STRQh1vr1719220655150",
    "STRlovv91719220668616",
    "STRVDZEc1719220701397",
    "STR0bO0c1719220717806",
    "STRQlM651719220731334",
    "STRno3th1719220776404",
    "STRr2OVv1719220847696",
    "STRcjdcC1719220864283",
    "STRXx7tj1719220891373"
]

const StoreImagesObj = {}
StoreList.forEach((store, index) => {
    StoreImagesObj[store] = StoreImages[index]
})

export default StoreImagesObj