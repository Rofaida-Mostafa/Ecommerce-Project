
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContextProvider } from "../../context/CardContext";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  let navigate = useNavigate();

  const { cartId, clearCart } = useContext(CartContextProvider);
  const [isonline, setIsonline] = useState(false);
  // <<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>..

  function detectAndCall(values) {
    if (isonline) {
      createOnlineOrder(values);
    } else {
      createCashOrder(values);
    }
  }

  //  <<<<<<<<<<<<<<createCashOrder>>>>>>>>>>>>>

  function createCashOrder(values) {
    // console.log(values);
    const backendBody = {
      shippingAddress: values,
    };

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        backendBody,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((resp) => {
        clearCart();
        navigate("/products");
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // <<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>..

  //  <<<<<<<<<<<<<<createOnlineOrder>>>>>>>>>>>>>

  function createOnlineOrder(values) {
    // console.log(values);
    const backendBody = {
      shippingAddress: values,
    };

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        backendBody,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
          params: {
            url: "http://localhost:5173",
          },
        }
      )
      .then((resp) => {
        console.log("after Onl:", resp);
        // console.log(cartId)

       window.open(resp.data.session.url,'_self');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // <<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>..

  //<<<<<<<<<<<<<<paymentFormik>>>>>>>>>>>>>

  const paymentFormik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    // onSubmit: createCashOrder,
    // onSubmit: () => isonline? createOnlineOrder(paymentFormik.values) : createCashOrder(paymentFormik.values),
    onSubmit: detectAndCall,
  });

  // <<<<<<<<<<<<<<<<<<<ii>>>>>>>>>>>>>>>>>>>..

  return (
    <>
      <div className="relative w-full h-full  flex  justify-center items-center p-5  bg-sky-950">
        <div className="relative w-full  my-[10vh] p-5">
          <form
            onSubmit={paymentFormik.handleSubmit}
            className="max-w-md mx-auto "
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={paymentFormik.handleChange}
                onBlur={paymentFormik.handleBlur}
                value={paymentFormik.values.details}
                type="text"
                name="details"
                placeholder=""
                required
                id="details"
                className="block py-2.5 px-0 w-full text-sm font-semibold text-gray-300 bg-transparent border-0 border-b-2 border-gray-300  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="details"
                className="peer-focus:font-medium absolute text-sm font-semibold text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-lg peer-focus:dark:font-bold peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Details
              </label>

              {paymentFormik.errors.details && paymentFormik.touched.details ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-yellow-50 dark:bg-gray-300 dark:text-red-600"
                  role="alert"
                >
                  {paymentFormik.errors.details}
                </div>
              ) : (
                ""
              )}
            </div>

            {/* =========================== */}

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="city"
                id="city"
                className="block py-2.5 px-0 w-full text-sm font-semibold text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={paymentFormik.handleChange}
                onBlur={paymentFormik.handleBlur}
                value={paymentFormik.values.city}
              />
              <label
                htmlFor="city"
                className="peer-focus:font-medium absolute text-sm font-semibold text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-lg peer-focus:dark:font-bold peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                City
              </label>

              {paymentFormik.errors.city && paymentFormik.touched.city ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-yellow-50 dark:bg-gray-300 dark:text-red-600"
                  role="alert"
                >
                  {paymentFormik.errors.city}
                </div>
              ) : (
                ""
              )}
            </div>

            {/* =========================== */}

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                name="phone"
                id="phone"
                className="block py-2.5 px-0 w-full text-sm font-semibold text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={paymentFormik.handleChange}
                onBlur={paymentFormik.handleBlur}
                value={paymentFormik.values.phone}
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm font-semibold text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-lg peer-focus:dark:font-bold peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone
              </label>

              {paymentFormik.errors.phone && paymentFormik.touched.phone ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-yellow-50 dark:bg-gray-300 dark:text-red-600"
                  role="alert"
                >
                  {paymentFormik.errors.phone}
                </div>
              ) : (
                ""
              )}
            </div>

            <button
              onClick={() => {
                setIsonline(false);
              }}
              type="submit"
              className="md:mb-0 mb-2 mr-4 text-slate-100 hover:text-blue-100 bg-slate-600 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm font-semibold w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-500 dark:focus:ring-slate-300"
            >
              Pay cash
            </button>

            <button
              onClick={() => {
                setIsonline(true);
              }}
              type="submit"
              className="md:mx-5 text-slate-100 hover:text-blue-100 bg-slate-600 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm font-semibold w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-500 dark:focus:ring-slate-300"
            >
              Pay online
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
