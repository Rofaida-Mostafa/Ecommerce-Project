import axios from "axios"; 
import { useMutation, useQueryClient } from "react-query"; 
 
const useAddToWishList = () => { 
  const queryClient = useQueryClient(); 
  const addProductToWishList = async (productId) => { 
    return await axios.post( 
      "https://ecommerce.routemisr.com/api/v1/wishlist", 
      { 
        productId: productId, 
      }, 
      { 
        headers: { 
          token: localStorage.getItem("userToken"), 
        }, 
      } 
    ); 
  }; 
 
  const addToWishList = useMutation({ 
    mutationFn: addProductToWishList, 
    onSuccess: () => { 
      queryClient.invalidateQueries(["getWishListItems"]); 
    }, 
  }); 
  return addToWishList; 
}; 
 
export default useAddToWishList;





// import axios from "axios";
// import { useMutation, useQueryClient } from "react-query";

// export default function useAddWhishlist() {
//   const headers = {
//     token: localStorage.getItem("tkn"),
//   };

//   async function addProductToWishlist(productId) {
//     console.log(productId);
//     console.log(headers);
//     return await axios
//           .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`, {
//             headers,
//           })
//     // return await axios.post(
//     //   `https://ecommerce.routemisr.com/api/v1/wishlist`,
//     //   {
//     //     headers,
//     //   },
//     //   {
//     //     productId: productId,
//     //   }
//     );
//   }
//   // const queryClient = useQueryClient();
//   const addWhishlist = useMutation({
//     mutationFn: addProductToWishlist,
   
// //         onSuccess: () => {

// // queryClient.invalidateQueries(['displayWishlist'])

      
// //     },
//   });

//   return addWhishlist;
// }
