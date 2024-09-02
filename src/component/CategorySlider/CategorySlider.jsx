import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import axios from "axios";
// import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
// import { useQuery } from "react-query";
import useCategories from "../../customhook/useCategories";

function Responsive() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { data, isLoading, isError, error } = useCategories();
  // console.log("error " + isError);
  // console.log("isFetched " + isFetched);
  if (isLoading) {
    return (
      <div className="spin relative  z-30 w-full h-40 bg-slate-400 opacity-50  flex justify-center items-center">
        <PulseLoader color="rgba(25, 55, 64, 1)" height="80" width="80" />
      </div>
    );
  }

  if (isError) {
    return error;
  }

  return (
    <>
      <div className=" slider-container  mb-[9vh] p-5 ">
        <Slider {...settings} arrows={false} className="" swipe={2}>
          {data.data.data.map((category) => (
            <div className=" " key={category._id}>
              <img
                src={category.image}
                alt={category.name}
                className="  w-full h-44"
              />
              <h6 className="text-center font-medium font-sans mb-[4vh]">
                {category.name}
              </h6>
            </div>
          ))}
        </Slider>{" "}
      </div>
    </>
  );
}

// function CategorySlider() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 10,
//     slidesToScroll: 5,
//   };
//   // const [allCategories, setAllCategories] = useState(null);

//   // async function getCategories() {
//   //   const { data } = await axios.get(
//   //     "https://ecommerce.routemisr.com/api/v1/categories"
//   //   );
//   //   setAllCategories(data.data);
//   // }
//   // useEffect(() => {
//   //   getCategories();
//   // }, []);

//   // async function getCategories() {
//   //   return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
//   // }

//   // const { data, isLoading, isError, error, isFetched } = useQuery({
//   //   queryKey: "CategoryDetails",
//   //   queryFn: getCategories,
//   // });

//   const {data, isLoading, isError, error, isFetched}= useCategories();
//   console.log("error " + isError);
//   console.log("isFetched " + isFetched);
//   if (isLoading) {
//     return (
//       <div className="spin relative  z-30 w-full h-40 bg-slate-400 opacity-50  flex justify-center items-center">
//         <PulseLoader color="rgba(25, 55, 64, 1)" height="80" width="80" />
//       </div>
//     );
//   }

//   if (isError) {
//     return error;
//   }

//   return (
//     <>
//       <div className=" slider-container  mb-[8vh] p-5 ">
//         <Slider {...settings} arrows={false} className="" swipe={2}>
//           {data.data.data.map((category) => (
//             <div className=" " key={category._id}>
//               <img
//                 src={category.image}
//                 alt={category.name}
//                 className="  w-full h-40"
//               />
//               <h6 className="text-center font-medium font-sans ">
//                 {category.name}
//               </h6>
//             </div>
//           ))}
//         </Slider>{" "}
//       </div>
//     </>
//   );
// }

// export default CategorySlider;

export default Responsive;
