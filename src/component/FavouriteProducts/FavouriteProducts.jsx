import { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { CartContextProvider } from "../../context/CardContext";
import { Helmet } from "react-helmet";
// import { useWishlist } from "react-use-wishlist";
import WhishList from "../../customhook/useGetWhishlist";
import { PulseLoader } from "react-spinners";
import useRemovewhishlistProduct from "../../customhook/useRemovewhishlistProduct";

export default function FavouriteProducts() {

  const {data, isLoading, isError, error} = WhishList();
  const WhishlistData= data?.data?.data  

  const {mutateAsync}= useRemovewhishlistProduct();


  const { addProduct } = useContext(CartContextProvider);

  async function handleAddProduct(id) {
    const resFlag = await addProduct(id);
    console.log(resFlag);

    if (resFlag) {
      toast.success("Product added successfully.", {
        position: "top-right",
        duration: 2000,
      });
    } else {
      toast.error("Product added failed.", {
        position: "top-right",
        duration: 2000,
      });
    }
  }
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
      {" "}
      <div className=" h-fit  bg-fuchsia-100  p-5">
        <Helmet>
          <title>Whishlist</title>
          <meta name="description" content="Whishlist application" />
        </Helmet>
        <div className=" container mx-auto text-center gap-3  grid md:grid-cols-3 lg:grid-cols-6  my-[13vh]">
          {WhishlistData?.map((product, index) => (
            <div key={index} className=" text-red-100 rounded-xl bg-cyan-900 ">
              {" "}
              <div className="relative overflow-hidden group ">
                <div
                  onClick={() => handleAddProduct(product._id)}
                  className="cart text-center z-10 absolute end-0 top-0 p-3 bg-cyan-700 cursor-pointer opacity-0 rounded-md  group-hover:opacity-100 group-hover:transition-[1s] "
                >
                  <i className="fa-solid  fa-plus text-white"></i>
                </div>
                <div
                  onClick={async() => {
                   const req= await mutateAsync(product._id);
                   console.log(req);
                   
                  }}
                  className="fav text-center z-10 absolute end-[2.2vw] top-[0vh] p-3 bg-cyan-700 cursor-pointer opacity-0 rounded-md  group-hover:opacity-100 group-hover:transition-[1s] "
                >
                  <i className="fas fa-trash-alt text-white"></i>
                </div>
                <Link to={`/det/${product._id}`}>
                  <div className="relative w-full">
                    <img
                      className="rounded-t-lg"
                      src={product.imageCover}
                      alt={product.title}
                    />
                  </div>
                  <h2 className="text-lg text-left mx-1 text-red-50 font-serif font-medium h-[60px]">
                    <span className="text-slate-200 font-semibold">
                      {" "}
                      Title:{" "}
                    </span>{" "}
                    {product.title?.split(" ").slice(0, 2).join(" ")}.
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
        </div>
      </div>
    </>
  );
}
