import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContextProvider = createContext();

export default function CartContext({ children }) {
  const headers = {
    token: localStorage.getItem("tkn"),
  };
  const [cartProducts, setCartProducts] = useState(null);
  const [cartProductsPrice, setCartProductsPrice] = useState(0);
  const [cartProductsItem, setCartProductsItem] = useState(0);
  const [cartId, setCartId] = useState(null);
  // const [userId, setUserId] = useState(null);
  // console.log("cartProducts", cartProducts);

  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //

  function clearCart() {
    setCartProducts(null);
    setCartProductsPrice(0);
    setCartProductsItem(0);
    setCartId(null);
  }

  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //

  function userCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((resp) => {
        setCartProducts(resp.data.data.products);
        setCartProductsPrice(resp.data.data.totalCartPrice);
        setCartProductsItem(resp.data.numOfCartItems);
        setCartId(resp.data.data._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //

  useEffect(() => {
    // Call the function to fetch the cart data when the component mounts.
    userCart();
  }, []);

  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //

  async function addProduct(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then(() => {
        // console.log(resp);

        // لاغينا الحل ده بسبب إن البرودكت بترجع الداتا ناقصة وفي شكل سترينج فمش بنعرف نوصل لأي خاصية فيها
        // setCartProducts(resp.data.data.products);
        // setCartProductsPrice(resp.data.data.totalCartPrice);
        // setCartProductsItem(resp.data.numOfCartItems);

        // فهنستدعي الميثود دي بس ده مش صح لأني بعمل استدعاء لل
        //  api
        //  من تاني فده بيزود حمل عقبال ما الميثود تتنفذ

        userCart();

        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //

  function updateCartProduct(itemId, newItemCount) {
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${itemId}`,
        {
          count: newItemCount,
        },
        {
          headers,
        }
      )
      .then((resp) => {
        setCartProducts(resp.data.data.products);
        setCartProductsPrice(resp.data.data.totalCartPrice);
        setCartProductsItem(resp.data.numOfCartItems);
        // setUserId(resp.data.data.cartOwner);

        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //

  async function deleteCartProduct(itemId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, {
        headers,
      })
      .then((resp) => {
        setCartProducts(resp.data.data.products);
        setCartProductsPrice(resp.data.data.totalCartPrice);
        setCartProductsItem(resp.data.numOfCartItems);

        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //

  function getOrders(userId) {
   return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
   
  }

  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //

  return (
    <CartContextProvider.Provider
      value={{
        addProduct,
        userCart,
        updateCartProduct,
        deleteCartProduct,
        clearCart,
        getOrders,
        cartProducts,
        cartProductsPrice,
        cartProductsItem,
        cartId,
      }}
    >
      {children}
    </CartContextProvider.Provider>
  );
}
