import React, { useState, useContext } from "react";
import fetch from "isomorphic-fetch";
import Cookies from "js-cookie";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import AppContext from "../../context/AppContext";

export default function CheckoutForm() {
    const [data, setData] = useState({
        address: "",
        city: "",
        state: "",
        stripe_id: "",
    });
    const [error, setError] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const appContext = useContext(AppContext);

    function onChange(e) {
        // set the key = to the name property equal to the value typed
        const updateItem = (data[e.target.name] = e.target.value);
        // update the state data object
        setData({ ...data, updateItem });
    }
    async function submitOrder() {
        // event.preventDefault();

        // use elements.getElement to get a reference to the mounted element
        const cardElement = elements.getElement(CardElement);
        // // pass the element directly to other Stripe.js methods:
        // // e.g. createToken - https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
        // get token back from stripe to process credit card.

        const token = await stripe.createToken(cardElement);
        const userToken = Cookies.get("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            method: "POST",
            headers: userToken && { Authorization: `Bearer ${userToken}` },
            body: JSON.stringify({
                amount: Number(Math.round(appContext.cart.total + "e2") + "e-2"),
                dishes: appContext.cart.items,
                address: data.address,
                city: data.city,
                state: data.state,
                token: token.token.id,
            }),
        });
        if (!response.ok) {
            setError(response.statusText);
        }
    }

    return (
        <div className="w-full">
            <h5 className="text-xl m-4">Your information:</h5>
            <form className="flex flex-col">
                <div className="flex w-full justify-between">
                    <label className="py-4">Address</label>
                    <input className="text-right m-2 p-2 border rounded-md w-3/4" name="address" onChange={onChange} />
                </div>
                <div className="flex w-full justify-between">
                    <label className="py-4">City</label>
                    <input className="text-right m-2 p-2 border rounded-md w-3/4" name="city" onChange={onChange} />
                </div>
                <div className="flex w-full justify-between">
                    <label className="py-4">State</label>
                    <input className="text-right m-2 p-2 border rounded-md w-3/4" name="state" onChange={onChange} />
                </div>
                <div>
                    <CardSection data={data} stripeError={error} submitOrder={submitOrder}/>
                </div>
            </form>
        </div>
    )
}