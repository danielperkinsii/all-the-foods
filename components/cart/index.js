import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AppContext from "../../context/AppContext";

export default function Cart() {
    const appContext  = useContext(AppContext);
    const router = useRouter();

    const { cart, isAuthenticated } = appContext;

    return (
        <div className="flex flex-col my-12">
            <small>Items:</small>
            <div className="flex flex-col">
                {cart.items
                ? cart.items.map((item) => {
                    if (item.quantity > 0) {
                        return (
                            <div key={item.id} className="my-2 mx-1 p-2 flex flex-row justify-between">
                                <div className="flex flex-row justify-between w-1/3">
                                <span className="m-2"> {item.name}</span>
                                <span className="m-2"> ${item.price}</span>
                                </div>
                                <div>
                                    <button 
                                    className="border rounded-l-lg py-2 px-3 bg-gray-200 hover:bg-white text-blue-500 w-12 transition duration-150 ease-in"
                                    onClick={() => appContext.addItem(item)}>
                                        +
                                    </button>
                                    <button
                                    className="border rounded-r-lg py-2 px-3 bg-gray-200 hover:bg-white text-blue-500 w-12 transition duration-150 ease-in"
                                    onClick={() => appContext.removeItem(item)}>
                                        -
                                    </button>
                                    <span
                                    className="py-2 px-3 text-blue-500"
                                    id="item-quantity">
                                        {item.quantity} x
                                    </span>
                                </div>
                            </div>
                        );
                    }
                })
                : null }
                {isAuthenticated ? (
                    cart.items.length > 0 ? (
                        <div>
                            <div className="flex">
                                <h5 className="my-1 mx-2 text-lg">Total:</h5>
                                <h3 className="my-1 text-lg">${appContext.cart.total.toFixed(2)}</h3>
                            </div>
                            {router.pathname === "/restaurants" && (
                                <div>
                                    <Link href="/checkout">
                                        <button className="p-2 border rounded-lg hover:bg-green-600 hover:text-white text-green-600 transition duration-150 ease-in">Order</button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                        {router.pathname === "/checkout" && (
                            <small className="text-blue-400" onClick={() => window.history.back()}>
                                back to restaurant
                            </small>
                        )}
                        </>
                    )
                ) : (
                    <h5 className="mx-auto text-3xl leading-9 tracking-tight font-extrabold sm:text-4xl sm:leading-10 text-white text-red-800">Login to Order</h5>
                )}
            </div>
            {console.log(router.pathname)}
        </div>
    );
}