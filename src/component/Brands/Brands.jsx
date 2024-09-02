import axios from "axios";
import { PulseLoader } from "react-spinners";

import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

export default function Brands() {
  async function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isError, isFetched, isLoading, error } = useQuery({
    queryKey: "brandDetails",
    queryFn: getBrands,
    // refetchOnWindowFocus:true,
    // staleTime: 10000,
  });

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
      <div className=" h-fit  bg-fuchsia-100  p-5">
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Brands application" />
    </Helmet>
        <div className=" container mx-auto text-center gap-3  grid md:grid-cols-3 lg:grid-cols-6  my-[13vh]">
          {data.data.data.map((brand) => (
            <div
              key={brand._id}
              className=" text-red-100 rounded-xl bg-cyan-900 "
            >
              <div className="relative w-full">
                <img
                  className="rounded-t-lg w-full"
                  src={brand.image}
                  alt={brand.name}
                />
              </div>
              <h2 className="text-lg text-left mx-1 text-red-50 font-serif  h-[45px]">
                <span className="text-slate-200 font-semibold"> Title: </span>{" "}
                {brand.name}.
              </h2>
              <div className="flex justify-between items-center p-2">
                <p className="text-white font-bold"></p>
              </div>
            </div>
          ))}
        </div>
      </div>
      )
    </>
  );
}
