import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { CartContextProvider } from "../../context/CardContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();

  console.log(id);
  const { addProduct } = useContext(CartContextProvider);

  async function handleAddProduct(id) {
    const resFlag = await addProduct(id);
    console.log(resFlag);

    if (resFlag) {
      toast.success("Product added successfully.", {
        position: "top-right",
        duration: 3000,
      });
    } else {
      toast.error("Product added failed.", {
        position: "top-right",
        duration: 3000,
      });
    }
  }

  async function getProductsDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["productDetais", id],
    queryFn: getProductsDetails,
  });
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

  const Data = data.data.data;
  return (
    <div className=" container mx-auto p-5 my-[9vh] md:my-[13vh] flex-col  flex md:flex-row  justify-center items-center  ">
      <div className=" lg:w-1/4 md:me-5 w-[95%] mb-4 ">
        <img
          src={Data.imageCover}
          alt={Data.title}
          className="md:w-full w-[60%] rounded-xl"
        />
      </div>
      <div className="  md:w-[70%] font-serif font-semibold ">
        {/* <h1>{Data.title}</h1> */}
        <h2 className="text-[18px] text-left mx-1 text-sky-600 font-serif ">
          <span className="text-slate-500 font-semibold"> Title: </span>{" "}
          {Data.title.split(" ").slice(0, 2).join(" ")}.
        </h2>
        <p className=""></p>

        <h5 className="text-[18px] text-left mx-1 text-sky-600 font-serif  ">
          <span className="text-slate-500 font-semibold text-lg"> Description: </span>{" "}
          {Data.description.split(" ").slice(0, 4).join(" ")}.
        </h5>
        <h5 className="text-[18px] text-left mx-1 text-sky-600 font-serif  ">
          {" "}
          <span className="text-slate-500 text-lg font-semibold">Category: </span>{" "}
          {Data.category.name}
        </h5>

        <p className="text-[15px] text-left mx-1 text-sky-600 font-serif  ">
          <span className="text-slate-500 text-lg font-semibold"> Price: </span>{" "}
          <span
            className={
              Data.priceAfterDiscount ? "text-stone-400 line-through mr-4" : ""
            }
          >
            [ {" " + Data.price}]
          </span>
          <span className="">
            {Data.priceAfterDiscount ? `[${Data.priceAfterDiscount}]` : ""}
          </span>
        </p>
        <button
          onClick={() => handleAddProduct(Data._id)}
          className=" my-3  text-slate-100 hover:text-blue-100 bg-slate-600 hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm font-semibold w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-500 dark:focus:ring-slate-300"
        >
          + add products
        </button>
      </div>
    </div>
  );
}
