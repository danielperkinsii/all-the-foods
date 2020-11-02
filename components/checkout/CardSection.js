import React from "react";

import { CardElement } from "@stripe/react-stripe-js";

export default function(props) {
    return (
        <div>
            <div className="">
                <label className="text-lg my-1" htmlFor="card-element">Card</label>
                <div>
                <fieldset style={{ border: "none" }}>
                    <div className="form-row">
                    <div id="card-element" style={{ width: "100%" }}>
                        <CardElement className="m-2 p-2 border rounded-md"
                        options={{
                            style: { width: "100%", base: { fontSize: "18px" } },
                        }}
                        />
                    </div>
                    <br />
                    <div className="order-button-wrapper">
                        <button className="p-2 border rounded-lg hover:bg-green-600 hover:text-white text-green-600 transition duration-150 ease-in" onClick={props.submitOrder}>Confirm Order</button>
                    </div>
                    {props.stripeError ? (
                        <div>{props.stripeError.toString()}</div>
                    ) : null}
                    <div id="card-errors" role="alert" />
                    </div>
                </fieldset>
                </div>
            </div>
        </div>
    )
};