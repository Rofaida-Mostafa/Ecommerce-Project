import axios from "axios";
import { PulseLoader } from "react-spinners";
import SimpleSlider from "../homeSlider/HomeSlider";

import image1 from "../../assets/img/images/blog-img-1.jpeg";
import image2 from "../../assets/img/images/blog-img-2.jpeg";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContextProvider } from "../../context/CardContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import Responsive from "../CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";
import WhishList from "../../customhook/useGetWhishlist";
// import useProductMutate from "../../customhook/useProductMutate";

export default function Products() {
  const { addProduct } = useContext(CartContextProvider);
  const { data: dataFav } = WhishList();
  const WhishlistData = dataFav?.data?.data;
  const WhishlistDataId = WhishlistData?.map((pro) => pro._id);

  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //

  async function handleAddProduct(id) {
    const resFlag = await addProduct(id);
    console.log(resFlag);

    if (resFlag) {
      {
        toast.success("Product added successfully.", {
          position: "top-right",
          duration: 2000,
        });
      }
    } else {
      toast.error("Product added failed.", {
        position: "top-right",
        duration: 2000,
      });
    }
  }

  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //

  const headers = {
    token: localStorage.getItem("tkn"),
  };
  async function addProductToWishlist(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then((res) => {
        console.log("success", res);

        if (res) {
          toast.success("Product added successfully.", {
            position: "top-right",
            duration: 2000,
          });
        }
        return true;
      })
      .catch((error) => {
        console.log(error);
        toast.error("Product added failed.", {
          position: "top-right",
          duration: 2000,
        });
        return false;
      });
  }

  // <>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><><>><><><><><></><><><> //

  async function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isError, isLoading, error } = useQuery({
    queryKey: "Allproducts",
    queryFn: getProducts,
  });

  if (isError) {
    console.log(error);

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
          <title>Products</title>
          <meta name="description" content="Product application" />
        </Helmet>
        <div className="flex items-center justify-center">
          <div className="w-[70%]">
            <SimpleSlider />
          </div>
          <div className="w-[30%]  mt-[5vh] ml-[-0.5vw] ">
            <div className="">
              <img src={image1} alt="" className="h-40 rounded-lg" />
            </div>
            <div className="">
              <img src={image2} alt="" className="h-40 rounded-lg" />
            </div>
          </div>
        </div>
        <Responsive />
        <div className=" container mx-auto text-center gap-3  grid md:grid-cols-3 lg:grid-cols-6  not">
          {data?.data.data.map((product) => (
            <div
              key={product._id}
              className=" text-red-100 rounded-xl bg-cyan-900 "
            >
              <div className="relative overflow-hidden group ">
                <div
                  onClick={() => handleAddProduct(product._id)}
                  className="cart text-center z-10 absolute end-0 top-0 p-3 bg-cyan-700 cursor-pointer opacity-0 rounded-md  group-hover:opacity-100 group-hover:transition-[1s] "
                >
                  <i className="fa-solid  fa-plus text-white"></i>
                </div>
                <div
                  onClick={() => {
                    addProductToWishlist(product._id);
                  }}
                  className="fav text-center z-10 absolute md:end-[2.2vw] end-[9.2vw] top-[0vh] p-3 bg-cyan-700 cursor-pointer opacity-0 rounded-md  group-hover:opacity-100 group-hover:transition-[1s] "
                >
                  {WhishlistDataId?.includes(product._id) ? (
                    <i className="fa-solid  fa-heart text-red-600"></i>
                  ) : (
                    <i className="fa-solid  fa-heart text-white"></i>
                  )}
                </div>
                <Link to={`/det/${product._id}`}>
                  <div className="relative w-full">
                    <img
                      className="rounded-t-lg"
                      src={product.imageCover}
                      alt={product.title}
                    />
                  </div>
                  <h2 className="text-[15px]  text-left mx-1 text-red-50 font-serif font-medium h-[60px]">
                    <span className="text-slate-200 font-semibold">
                      {" "}
                      Title:{" "}
                    </span>{" "}
                    {product.title.split(" ").slice(0, 2).join(" ")}.
                  </h2>
                  <div className="flex justify-between items-center p-2">
                    <p className="text-white font-bold">
                      <span
                        className={
                          product.priceAfterDiscount
                            ? "text-stone-400 line-through mr-2"
                            : ""
                        }
                      >
                        {product.price}
                      </span>
                      <span className="">{product.priceAfterDiscount}</span>
                    </p>

                    <p className="text-white font-bold">
                      <i className="text-yellow-300 fa-solid fa-star"></i>
                      {product.ratingsAverage}
                    </p>
                  </div>{" "}
                </Link>{" "}
              </div>
            </div>
          ))}
        </div>{" "}
      </div>
    </>
  );
}
