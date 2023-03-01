import { useRouter } from "next/router"

const ProductDetail = ()=>{
  const router = useRouter()
  const{id} = router.query

  const query = ``

  return <p>Post: {id}</p>

}

export default ProductDetail