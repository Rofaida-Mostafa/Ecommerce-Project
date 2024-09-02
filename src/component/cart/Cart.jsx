import { useContext } from "react";
import { CartContextProvider } from "../../context/CardContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const {
    updateCartProduct,
    cartProducts,
    cartProductsPrice,
    cartProductsItem,
    deleteCartProduct,
  } = useContext(CartContextProvider);

  function handleUpdateCount(itemId, newItemCount) {
    updateCartProduct(itemId, newItemCount);
  }
  async function handleDeleteItem(itemId) {
    const resFlag = await deleteCartProduct(itemId);

    if (resFlag) {
      {
        toast.success("Product remove successfully.", {
          position: "top-right",
          duration: 3000,
        });
      }
    } else {
      toast.error("Product remove failed.", {
        position: "top-right",
        duration: 3000,
      });
    }
  }

  return (
    <>
      <div className="my-[15vh] h-fit bg-fuchsia-100  p-3">
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="Cart application" />
    </Helmet>
        <div className="flex justify-end -mb-5 me-5 ">
          <Link to={"/payment"}>
            {" "}
            <button className="text-white font-semibold font-serif bg-cyan-600 px-3 py-2 rounded-lg">
              Purchase products
            </button>
          </Link>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5 my-[6vh]">
          <table className="w-full  h-fit text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartProducts?.map((product) => (
                <tr
                  key={product._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        disabled={product.count === 1 ? true : false}
                        onClick={() => {
                          handleUpdateCount(
                            product.product._id,
                            product.count - 1
                          );
                        }}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <input
                          type="number"
                          id="first_product"
                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={product.count}
                          required
                        />
                      </div>
                      <button
                        onClick={() => {
                          handleUpdateCount(
                            product.product._id,
                            product.count + 1
                          );
                        }}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      onClick={() => handleDeleteItem(product.product._id)}
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="px-4 py-4">
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td></td>
                <td></td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-sky-400 w-72 flex justify-center ">
                  {" "}
                  <p className="w-[5vw]  mr-[3.5vw]"> {cartProductsItem}</p>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-sky-400">
                  {" "}
                  <p> {cartProductsPrice}</p>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}
