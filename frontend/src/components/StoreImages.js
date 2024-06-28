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
    "STRFhvKY1719466779817",
    "STRcVhAw1719466779818",
    "STRIYfHU1719466779819",
    "STR1H7Rp1719466779820",
    "STRu4PqG1719466779820",
    "STRQK1iZ1719466779822",
    "STRZV33W1719466779822",
    "STRhfDTL1719466779823",
    "STROCZTo1719466779824",
    "STR357tY1719466779824",
    "STRmB4bR1719466779825",
    "STR7VyBW1719466779825",
    "STRnCVIK1719466779825",
    "STRkuWvR1719466779826",
    "STRM8GJ01719466779826"
]

const StoreImagesObj = {}
StoreList.forEach((store, index) => {
    StoreImagesObj[store] = StoreImages[index]
})

export default StoreImagesObj