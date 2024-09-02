import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export default function useRemovewhishlistProduct() {

const queryClient=useQueryClient()

    const headers = {
        token: localStorage.getItem("tkn"),
      };
    async function deleteProductFromWishlist(itemId) {
        
        return await axios
          .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`, {
            headers,
          })
        }
      const removeWhishlist = useMutation({
       
        mutationFn: deleteProductFromWishlist,
        onSuccess: () => {
          queryClient.invalidateQueries(["displayWishlist"]) //update data
          
        }
      });
    
    
  return removeWhishlist
  
}
