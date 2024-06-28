import img0 from '../assets/items/0.jpg'
import img1 from '../assets/items/1.jpg'
import img2 from '../assets/items/2.jpg'
import img3 from '../assets/items/3.jpg'
import img4 from '../assets/items/4.jpg'
import img5 from '../assets/items/5.jpg'
import img6 from '../assets/items/6.jpg'

const itemImages = [img0, img1, img2, img3, img4, img5, img6]
const itemIds = [
    "ITM728tD1719467205365",
    "ITMFkJew1719468038323",
    "ITM7L96p1719468038325",
    "ITMBIqs81719468038325",
    "ITMzZdmk1719468038326",
    "ITMfR3Kb1719468038326",
    "ITMYIZmc1719468038327"
]

const itemImagesObj = {}
itemIds.forEach((item, index) => {
    itemImagesObj[item] = itemImages[index]
})

export default itemImagesObj