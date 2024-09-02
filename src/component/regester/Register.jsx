// import React from 'react'

import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [clicked, setClicked] = useState(false);

  async function postData(values) {
    setClicked(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(() => {
        setSuccess(true);
        setClicked(false);
        setTimeout(() => {
          navigate("/signIn");
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

    // try {
    //   const {data} = await axios.post(
    //     "https://ecommerce.routemisr.com/api/v1/auth/signup",
    //     values
    //   );
    //   console.log("res", data.response.data.message);
    // } catch (error) {
    //   console.log("Error", error.response.data.message);
    // }
  }

  const regFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: postData,

    // validate: (values) => {
    //   let error = {};
    //   const regName = /^[A-Z][a-z]{4,}$/;
    //   const regPhone = /^(02)?01[0125][0-9]{8}$/;

    //   if (!regName.test(values.name)) {
    //     error.name =
    //       "Name must start with uppercase letter and contain at least 5 characters";
    //   }

    //   if (!regPhone.test(values.phone)) {
    //     error.phone =
    //       "Invalid phone number, should start with 010 or 011 or 012 and contain exactly 9 digits";
    //   }

    //   if (!values.email.includes("@") || !values.email.includes(".")) {
    //     error.email = "Please enter a valid email address";
    //   }
    //   if (values.password < 6 || !values.password > 12) {
    //     error.password = "Password must be between 6 and 12 characters long";
    //   }
    //   if (values.rePassword !== values.password) {
    //     error.rePassword = "Passwords do not match";
    //   }
    //   return error;
    // },

    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Name is required.")
        .min(3, "Min must be 3 charac ")
        .max(12, "Max must be 12 charac "),
      email: yup
        .string()
        .email("Email must like ro@.com.")
        .required("Email is required."), // check formate of email
      password: yup
        .string()
        .required("Password is required.")
        .min(6, "min must be 6 charac ")
        .max(12, "max must be 12 charac "),
      rePassword: yup
        .string()
        .required("Confirm password is required.")
        .oneOf([yup.ref("password")], "Password must match"),
      phone: yup
        .string()
        .required("phone is required.")
        .matches(/^(02)?01[0125][0-9]{8}$/, "Phone must like 01111252345"),
    }),
  });
  //   console.log(regFormik);

  return (
    <>
      {" "}
      <div className="h-full relative w-full flex flex-col  justify-center items-center mt-[8vh] md:mt-[9vh] bg-sky-950 ">
        <Helmet>
          <title>Sign up</title>
          <meta name="description" content="Sign up application" />
        </Helmet>
        {success ? (
          <div
            className="relative   mt-[9vh] text-center w-[400px] h-fit m-3 p-4 mb-4 text-red-800 rounded-lg bg-yellow-50 font-bold dark:bg-slate-300 dark:text-green-500"
            role="alert"
          >
            Success!
          </div>
        ) : (
          ""
        )}
        {error ? (
          <div
            className="relative  mt-[9vh] text-center w-[500px] md:w-[700px] h-fit m-3 p-4 mb-4  text-red-800 rounded-lg bg-yellow-50 font-bold dark:bg-red-100 dark:text-red-500"
            role="alert"
          >
            {error}
          </div>
        ) : (
          ""
        )}

        <div className=" relative w-[350px]  md:w-full h-full ">
          <h2 className="text-gray-300 font-bold underline  text-2xl text-center m-5 p-5">
            Register form
          </h2>
          <form
            onSubmit={regFormik.handleSubmit}
            className="max-w-md mx-auto   text-black"
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="name"
                id="name"
                className="block py-2.5  px-0 w-full text-sm font-semibold text-gray-300 bg-transparent border-0 border-b-2 border-gray-300  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={regFormik.handleChange}
                onBlur={regFormik.handleBlur}
                value={regFormik.values.name}
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm font-semibold text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-lg peer-focus:dark:font-bold peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Your name
              </label>

              {regFormik.errors.name && regFormik.touched.name ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-yellow-50 dark:bg-gray-300 dark:text-red-600"
                  role="alert"
                >
                  {regFormik.errors.name}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5  px-0 w-full text-sm font-semibold text-gray-300 bg-transparent border-0 border-b-2 border-gray-300  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                required
                onChange={regFormik.handleChange}
                onBlur={regFormik.handleBlur}
                value={regFormik.values.email}
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm font-semibold text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-lg peer-focus:dark:font-bold peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
              {regFormik.errors.email && regFormik.touched.email ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-yellow-50 dark:bg-gray-300 dark:text-red-600"
                  role="alert"
                >
                  {regFormik.errors.email}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block py-2.5  px-0 w-full text-sm font-semibold text-gray-300 bg-transparent border-0 border-b-2 border-gray-300  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={regFormik.handleChange}
                  onBlur={regFormik.handleBlur}
                  value={regFormik.values.password}
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm font-semibold text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-lg peer-focus:dark:font-bold peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>

                {regFormik.errors.password && regFormik.touched.password ? (
                  <div
                    className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-yellow-50 dark:bg-gray-300 dark:text-red-600"
                    role="alert"
                  >
                    {regFormik.errors.password}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="rePassword"
                  id="rePassword"
                  className=" block py-2.5  px-0 w-full text-sm font-semibold text-gray-300 bg-transparent border-0 border-b-2 border-gray-300  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={regFormik.handleChange}
                  onBlur={regFormik.handleBlur}
                  value={regFormik.values.rePassword}
                />
                <label
                  htmlFor="rePassword"
                  className="peer-focus:font-medium absolute text-sm font-semibold text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-lg peer-focus:dark:font-bold peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirm password
                </label>

                {regFormik.errors.rePassword && regFormik.touched.rePassword ? (
                  <div
                    className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-yellow-50 dark:bg-gray-300 dark:text-red-600"
                    role="alert"
                  >
                    {regFormik.errors.rePassword}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                name="phone"
                id="phone"
                className="block py-2.5  px-0 w-full text-sm font-semibold text-gray-300 bg-transparent border-0 border-b-2 border-gray-300  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={regFormik.handleChange}
                onBlur={regFormik.handleBlur}
                value={regFormik.values.phone}
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm font-semibold text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-lg peer-focus:dark:font-bold peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number (123-456-7890)
              </label>

              {regFormik.errors.phone && regFormik.touched.phone ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-yellow-50 dark:bg-gray-300 dark:text-red-600"
                  role="alert"
                >
                  {regFormik.errors.phone}
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
                " Submit"
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
