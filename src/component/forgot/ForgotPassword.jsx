// import React from 'react'

import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";


export default function ForgotPassword() {
  let navigate = useNavigate();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [clicked, setClicked] = useState(false);

  async function postData(values) {

    setClicked(true);

    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then(function (x) {
        // setToken(x.data.token);
        // userCart();
        localStorage.setItem("tkn", x.data.token);
        setSuccess(true);
        setClicked(false);
        setTimeout(() => {
          navigate("/verify");
          // setSuccess(null);
        }, 2000);
      })
      .catch((error) => {
        console.log("Error", error.response.data.message);
        setError("Error " + error.response.data.message);
        setClicked(false);
        setTimeout(() => {
          setError(null);
        }, 2000);
      });
  }

  const forgetFormik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: postData,
  });

  return (
    <>
      {" "}
      <div className=" relative w-full h-full flex flex-col items-center   mt-[5vh] bg-sky-950 ">
        {success ? (
          <div
            className="relative  mt-[9vh]  text-center  w-[500px] h-fit m-3 p-4 mb-4 text-red-800 rounded-lg bg-yellow-50 font-bold dark:bg-lime-50 dark:text-green-900"
            role="alert"
          >
            Code is sended!
          </div>
        ) : (
          ""
        )}
        {error ? (
          <div
            className="relative  mt-[9vh] text-center w-[400px]  md:w-[800px] h-fit m-3 p-4 mb-4  text-red-800 rounded-lg bg-yellow-50 font-bold dark:bg-red-100 dark:text-red-700"
            role="alert"
          >
            {error}
          </div>
        ) : (
          ""
        )}
        <div className="p-5 relative  w-full h-full mt-5  bg-sky-950">
          <h1 className=" text-gray-300 font-bold underline  text-2xl text-center m-5 p-5">
            Forget password 
          </h1>
          <form onSubmit={forgetFormik.handleSubmit} className="max-w-md mx-auto ">
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={forgetFormik.handleChange}
                onBlur={forgetFormik.handleBlur}
                value={forgetFormik.values.email}
                type="email"
                name="email"
                placeholder=""
                required
                id="email"
                className="block py-2.5 px-0 w-full text-sm font-semibold text-gray-300 bg-transparent border-0 border-b-2 border-gray-300  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm font-semibold text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-lg peer-focus:dark:font-bold peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>

              {forgetFormik.errors.email && forgetFormik.touched.email ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-yellow-50 dark:bg-gray-300 dark:text-red-600"
                  role="alert"
                >
                  {forgetFormik.errors.email}
                </div>
              ) : (
                ""
              )}
            </div>

            <button
              type="submit"
              className="text-slate-100 hover:text-blue-100 bg-slate-600 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm font-semibold w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-500 dark:focus:ring-slate-300"
            >
              {!clicked ? (
                "Submit"
              ) : (
                <ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={["#e15b64", "#fff", "#fff4", "#abbd81", "#849b87"]}
                />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
