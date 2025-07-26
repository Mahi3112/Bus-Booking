// import React, { useState, useEffect, useCallback } from "react";
// import { useDispatch } from "react-redux";
// import { axiosInstance } from "../helpers/axiosInstance";
// import { HideLoading, ShowLoading } from "../redux/alertsSlice";
// import { Row, Col, message } from "antd";
// import { useNavigate, useParams } from "react-router-dom";
// import SeatSelection from "../components/SeatSelection";
// import StripeCheckout from "react-stripe-checkout";
// import { Helmet } from "react-helmet";
// import moment from "moment";

// function BookNow() {
//   const navigate = useNavigate();
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const params = useParams();
//   const dispatch = useDispatch();
//   const [bus, setBus] = useState(null);

//   const getBus = useCallback(async () => {
//     try {
//       dispatch(ShowLoading());
//       const response = await axiosInstance.get(`/api/buses/${params.id}`);
//       dispatch(HideLoading());
//       if (response.data.success) {
//         setBus(response.data.data);
//       } else {
//         message.error(response.data.message);
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   }, [dispatch, params.id]);

//   const bookNow = async (transactionId) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await axiosInstance.post(
//         `/api/bookings/book-seat/${localStorage.getItem("user_id")}`,
//         {
//           bus: bus._id,
//           seats: selectedSeats,
//           transactionId,
//         }
//       );
//       dispatch(HideLoading());
//       if (response.data.success) {
//         message.success(response.data.message);
//         navigate("/bookings");
//       } else {
//         message.error(response.data.message);
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   const onToken = async (token) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await axiosInstance.post("/api/bookings/make-payment", {
//         token,
//         amount: selectedSeats.length * bus.price,
//       });

//       dispatch(HideLoading());
//       if (response.data.success) {
//         message.success(response.data.message);
//         bookNow(response.data.data.transactionId);
//       } else {
//         message.error(response.data.message);
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getBus();
//   }, [getBus]);
//   return (
//     <>
//       <Helmet>
//         <title>Book Now</title>
//       </Helmet>
//       <div>
//         {bus && (
//           <Row className="m-3 p-5" gutter={[30, 30]}>
//             <Col lg={12} xs={24} sm={24}>
//               <h1 className="font-extrabold text-2xl text-blue-500">
//                 {bus.name}
//               </h1>
//               <h1 className="text-2xl font-bold">
//                 {bus.from} - {bus.to}
//               </h1>
//               <hr className="border-black" />

//               <div className="flex flex-col gap-1 ">
//                 <h1 className="text-lg">
//                   <b className="text-blue-600 italic">Journey Date : </b>
//                   <span className="">{bus.journeyDate}</span>
//                 </h1>

//                 <h1 className="text-lg">
//                   <b className="text-blue-600 italic">Price :</b> DH {bus.price}{" "}
//                   /-
//                 </h1>
//                 <h1 className="text-lg">
//                   <b className="text-blue-600 italic">Departure Time</b> :{" "}
//                   {moment(bus.departure, "HH:mm").format("hh:mm A")}
//                 </h1>
//                 <h1 className="text-lg">
//                   <b className="text-blue-600 italic">Arrival Time</b> :{" "}
//                   {moment(bus.arrival, "HH:mm").format("hh:mm A")}
//                 </h1>
//               </div>
//               <hr className="border-black" />

//               <div className="flex w-60 flex-col ">
//                 <h1 className="text-lg mt-2 font-bold">
//                   <span className="text-blue-600 italic">Capacity : </span>{" "}
//                   <p>{bus.capacity}</p>
//                 </h1>
//                 <h1 className="text-lg font-bold">
//                   <span className="text-blue-600 italic">Seats Left : </span>{" "}
//                   <p>{bus.capacity - bus.seatsBooked.length}</p>
//                 </h1>
//               </div>
//               <hr className="border-black" />

//               <div className="flex flex-col gap-2 w-48 ">
//                 <h1 className="text-xl">
//                   <b className="text-blue-600 italic">Selected Seats : </b>{" "}
//                   {selectedSeats.join(", ")}
//                 </h1>
//                 <h1 className="text-xl mt-2 mb-3">
//                   <b className="text-blue-600 italic"> Price :</b> DH{" "}
//                   {bus.price * selectedSeats.length}
//                 </h1>

//                 <StripeCheckout
//                   billingAddress
//                   disabled={selectedSeats.length === 0}
//                   token={onToken}
//                   amount={bus.price * selectedSeats.length * 100}
//                   currency="MAD"
//                   stripeKey="pk_test_51Ro87cF5Aha5zzwHiMi5Bod66r6oMZq5ZZdoM3GbIXlCG6mlQ2gKZzkLDoqKmnryTAh5NEtmFEgnAzhyagvcBKGY00V9GSzLzw"
//                 >
//                   <button
//                     className={`${
//                       selectedSeats.length === 0
//                         ? "animate-none cursor-not-allowed btn btn-primary py-2 px-5 rounded-full btn-disabled text-white"
//                         : "animate-bounce btn btn-primary py-2 px-5 rounded-full bg-blue-600 hover:bg-blue-800 hover:duration-300 text-white"
//                     }`}
//                   >
//                     Pay Now
//                   </button>
//                 </StripeCheckout>
//               </div>
//             </Col>
//             <Col lg={12} xs={24} sm={24}>
//               <SeatSelection
//                 selectedSeats={selectedSeats}
//                 setSelectedSeats={setSelectedSeats}
//                 bus={bus}
//               />
//             </Col>
//           </Row>
//         )}
//       </div>
//     </>
//   );
// }

// export default BookNow;



// Updated BookNow component using Stripe Elements (modern approach)
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { Row, Col, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import { Helmet } from "react-helmet";
import moment from "moment";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Ro87cF5Aha5zzwHiMi5Bod66r6oMZq5ZZdoM3GbIXlCG6mlQ2gKZzkLDoqKmnryTAh5NEtmFEgnAzhyagvcBKGY00V9GSzLzw");

function CheckoutForm({ clientSecret, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (result.error) {
      message.error(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      message.success("Payment successful");
      onPaymentSuccess(result.paymentIntent.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 btn btn-primary bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded"
      >
        Pay
      </button>
    </form>
  );
}

function BookNow() {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const [bus, setBus] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const getBus = useCallback(async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.get(`/api/buses/${params.id}`);
      dispatch(HideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }, [dispatch, params.id]);

  const createPaymentIntent = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/create-payment-intent", {
        amount: selectedSeats.length * bus.price,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setClientSecret(response.data.clientSecret);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const bookNow = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        `/api/bookings/book-seat/${localStorage.getItem("user_id")}`,
        {
          bus: bus._id,
          seats: selectedSeats,
          transactionId,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/bookings");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBus();
  }, [getBus]);

  useEffect(() => {
    if (bus && selectedSeats.length > 0) {
      createPaymentIntent();
    }
  }, [selectedSeats, bus]);

  return (
    <>
      <Helmet>
        <title>Book Now</title>
      </Helmet>
      <div>
        {bus && (
          <Row className="m-3 p-5" gutter={[30, 30]}>
            <Col lg={12} xs={24} sm={24}>
              <h1 className="font-extrabold text-2xl text-blue-500">
                {bus.name}
              </h1>
              <h1 className="text-2xl font-bold">
                {bus.from} - {bus.to}
              </h1>
              <hr className="border-black" />

              <div className="flex flex-col gap-1 ">
                <h1 className="text-lg">
                  <b className="text-blue-600 italic">Journey Date : </b>
                  <span className="">{bus.journeyDate}</span>
                </h1>
                <h1 className="text-lg">
                  <b className="text-blue-600 italic">Price :</b> DH {bus.price} /-
                </h1>
                <h1 className="text-lg">
                  <b className="text-blue-600 italic">Departure Time</b> :
                  {moment(bus.departure, "HH:mm").format("hh:mm A")}
                </h1>
                <h1 className="text-lg">
                  <b className="text-blue-600 italic">Arrival Time</b> :
                  {moment(bus.arrival, "HH:mm").format("hh:mm A")}
                </h1>
              </div>
              <hr className="border-black" />

              <div className="flex w-60 flex-col ">
                <h1 className="text-lg mt-2 font-bold">
                  <span className="text-blue-600 italic">Capacity : </span>
                  <p>{bus.capacity}</p>
                </h1>
                <h1 className="text-lg font-bold">
                  <span className="text-blue-600 italic">Seats Left : </span>
                  <p>{bus.capacity - bus.seatsBooked.length}</p>
                </h1>
              </div>
              <hr className="border-black" />

              <div className="flex flex-col gap-2 w-72 ">
                <h1 className="text-xl">
                  <b className="text-blue-600 italic">Selected Seats : </b>
                  {selectedSeats.join(", ")}
                </h1>
                <h1 className="text-xl mt-2">
                  <b className="text-blue-600 italic">Price :</b> DH {bus.price * selectedSeats.length}
                </h1>

                {clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                    <CheckoutForm onPaymentSuccess={bookNow} clientSecret={clientSecret} />
                  </Elements>
                )}
              </div>
            </Col>

            <Col lg={12} xs={24} sm={24}>
              <SeatSelection
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                bus={bus}
              />
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}

export default BookNow;