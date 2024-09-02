import axios from "axios";
import { useQuery } from "react-query";

function fetchWhishlist () {
  const headers = {
    token: localStorage.getItem("tkn"),
  };

return ( axios
.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
  headers,
}))

}


const WhishList =() => {return useQuery({

  queryKey:["displayWishlist"],
  queryFn: fetchWhishlist
  
    })};


export default WhishList