import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const FavouriteContext = createContext();

export default function FavouriteContextProvider({ children }) {
  const [wishlistProducts, setWishlistProducts] = useState(null);
  const [wishlistProductsCount, setWishlistProductsCount] = useState(0);
  const [wishlistId, setWishlistId] = useState(null);

  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //

  const headers = {
    token: localStorage.getItem("tkn"),
  };

  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //

  function displayUserWishlist() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers,
      })
      .then((resp) => {

        setWishlistProducts(resp.data.data);
        setWishlistProductsCount(resp.data.count);
        setWishlistId(resp.data.data._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //


  useEffect(() => {
    // Call the function to fetch the cart data when the component mounts.
    displayUserWishlist();
  }, []);
  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //


  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //

  return (
    <FavouriteContext.Provider
      value={{
        // addProductToWishlist,
        displayUserWishlist,
        wishlistProducts,
        wishlistProductsCount,
        wishlistId,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
}
