import React, { useContext } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InjectedCheckoutForm from "../components/checkout/CheckoutForm";
import AppContext from "../context/AppContext";
import Cart from "../components/cart/index";

export default function Checkout() {
    //get app context
    const appContext = useContext(AppContext);
    // isAuthenticated is passed to the cart component to display order button
    const { isAuthenticated } = appContext;

    // load stripe to inject into elements components
    const stripePromise = loadStripe("YOUR STRIPE PUBLIC (pk_) KEY");
    return (
        <div>
            <div>
            <h1 className="mx-auto text-3xl leading-9 tracking-tight font-extrabold sm:text-4xl sm:leading-10 text-white md:mt-1 text-red-800">Checkout</h1>
            <div className="border-t border-b">
            <Cart isAuthenticated={isAuthenticated} />
            </div>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <InjectedCheckoutForm />
                </Elements>
            </div>
        </div>
    )
}