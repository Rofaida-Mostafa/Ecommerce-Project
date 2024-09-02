import { useContext, useEffect, useState } from "react";
import { authContextProvider } from "../../context/AuthContext";
import { CartContextProvider } from "../../context/CardContext";
// import { PulseLoader } from "react-spinners";
// import { CartContextProvider } from "../../context/CardContext";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const { userId } = useContext(authContextProvider);
  const { getOrders } = useContext(CartContextProvider);

  useEffect(() => {
    if (userId) {
      getAllOrders();
    }
  }, [userId]);

  async function getAllOrders() {
    let orders = await getOrders(userId);
    setOrders(orders);
    console.log("orders", orders);
    console.log("userId", userId);
  }

  return (
    <>
      <div className=" h-fit  bg-fuchsia-100  p-5 ">
        <div className="  gap-3  grid md:grid-cols-3 lg:grid-cols-3 my-[12vh] ">
          {orders.data?.map((product, index) => (
            <div key={index} className=" text-red-50 rounded-xl bg-cyan-900">
              <div className="relative overflow-hidden group ">
                {}

                <h2 className="text-lg text-left mx-1 text-red-50 font-serif font-medium h-[60px] p-3">
                  <span className="text-pink-200  font-semibold">
                    {" "}
                    Created at:{" "}
                  </span>{" "}
                  {product.createdAt}.
                </h2>
                <div className="flex justify-between items-center p-3">
                  <p className=" font-bold">
                    Payment method:{" "}
                    <span className="text-violet-200">
                      {product.paymentMethodType}.
                    </span>{" "}
                    <br />
                    Total price:{" "}
                    <span className="text-violet-200">
                      {product.totalOrderPrice} L.E
                    </span>{" "}
                    <br />
                  </p>

                  <p className="text-white font-bold">
                    {product.ratingsAverage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
