// import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderimage1 from "../../assets/img/images/slider-image-1.jpeg";
import sliderimage2 from "../../assets/img/images/slider-image-2.jpeg";
import sliderimage3 from "../../assets/img/images/slider-image-3.jpeg";
import groceryimage1 from "../../assets/img/images/grocery-banner.png";
import groceryimage2 from "../../assets/img/images/grocery-banner-2.jpeg";
import image2 from "../../assets/img/images/slider-2.jpeg";

// function Responsive() {
//   var settings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 2
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };
//   return (
//     <div className=" slider-container  mb-[5vh]  h-fit">
//       <Slider {...settings} className=" text-center   h-fit ">
//         <div className="">
//          <img src={sliderimage1} alt="sliderimage1" className="rounded-xl  h-80" />
//         </div>
//         <div>
//         <img src={sliderimage2} alt="sliderimage2" className="kk" />
//         </div>
//         <div>
//         <img src={sliderimage3} alt="sliderimage3" className="kk" />
//         </div>
//         <div>
//         <img src={groceryimage1} alt="groceryimage1" className="kk" />
//         </div>
//         <div>
//         <img src={groceryimage2} alt="groceryimage2" className="kk" />
//         </div>
//         <div>
//         <img src={sliderimage1} alt="sliderimage1" className="kk" />
//         </div>

//       </Slider>
//     </div>
//   );
// }

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className=" slider-container  my-[10vh] p-5  h-80">
      {" "}
      <Slider {...settings} arrows={false} className="  h-80">
        <div className="">
          <img
            src={sliderimage1}
            alt="sliderimage1"
            className=" rounded-xl w-full h-80"
          />
        </div>
        <div>
          <img
            src={sliderimage2}
            alt="sliderimage2"
            className="rounded-xl w-full h-80"
          />
        </div>
        <div>
          <img
            src={sliderimage3}
            alt="sliderimage3"
            className="rounded-xl w-full h-80"
          />
        </div>
        <div>
          <img
            src={groceryimage1}
            alt="groceryimage1"
            className="rounded-xl w-full h-80"
          />
        </div>
        <div>
          <img
            src={groceryimage2}
            alt="groceryimage2"
            className="rounded-xl w-full h-80"
          />
        </div>
        <div>
          <img
            src={image2}
            alt="sliderimage1"
            className="rounded-xl w-full h-80"
          />
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;

// export default Responsive;
