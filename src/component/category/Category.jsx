// import React from 'react'
// import axios from "axios";
import { PulseLoader } from "react-spinners";
import useCategories from "../../customhook/useCategories";
import { Helmet } from "react-helmet";
// import { useQuery } from "react-query";

export default function Category() {
  // async function getCategory() {
  //   return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  // }

  // const { data, isError, isFetched, isLoading, error } = useQuery({
  //   queryKey: "CategoryDetails",
  //   queryFn: getCategory,

  // });
  const { data, isLoading, isError, error, isFetched } = useCategories();

  console.log(data);
  console.log("error " + isError);
  console.log("isFetched " + isFetched);

  if (isError) {
    return error;
  }

  if (isLoading) {
    return (
      <div className="spin fixed top-0 z-30 h-100 w-full h-full bg-slate-400 opacity-50  flex justify-center items-center">
        <PulseLoader color="rgba(25, 55, 64, 1)" height="80" width="80" />
      </div>
    );
  }
  return (
    <>
      <div className=" h-fit  bg-fuchsia-100 p-5">
        <Helmet>
          <title>Categories</title>
          <meta name="description" content="Categories application" />
        </Helmet>
        <div className=" container mx-auto text-center gap-3  grid md:grid-cols-3 lg:grid-cols-5  my-[13vh]">
          {data.data.data.map((category) => (
            <div
              key={category._id}
              className=" text-red-100 rounded-xl bg-cyan-900 "
            >
              <div className="relative w-full">
                <img
                  className="rounded-t-lg h-80 w-full"
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <h2 className="text-lg text-left mx-1 text-red-50 font-serif  h-[60px]">
                <span className="text-slate-200 font-semibold"> Title: </span>{" "}
                {category.name}.
              </h2>
            </div>
          ))}
        </div>
      </div>
      )
    </>
  );
}
