import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";
import Cart from "../components/cart/index";
import AppContext from "../context/AppContext";
import Hero from "../components/Hero";

const GET_RESTAURANT_DISHES = gql`
    query($id: ID!) {
        restaurant(id: $id) {
            id
            name
            dishes {
                id
                name
                description
                price
                image {
                    url
                }
            }
        }
    }`;

    export default function Restaurants(props) {
        const appContext = useContext(AppContext);
        const router = useRouter();
        const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
            variables: { id: router.query.id },
    });

    if (error) return "Error Loading Dishes";
    if (loading) return <h1>Loading ...</h1>;
    if (data.restaurant) {
        const { restaurant } = data;
        return (
            <div>
                <Hero />
                <div className="flex my-16">
                <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10 mx-auto">{restaurant.name}</h2>
                </div>
                <div className="w-full xl:w-2/3 xl:mx-auto">
                    {restaurant.dishes.map((res) => (
                        <div className="flex flex-row justify-between py-3 border-b" key={res.id}>
                            <div className="mx-auto my-auto">
                                <img className="h-48 w-64 object-cover" src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}/>
                            </div>
                            <div className="mx-4 w-1/2">
                                <div className="font-bold ml-4">{res.name}</div>
                                <div className="text-sm">{res.description}</div>
                            </div>
                            <div className="footer">
                                <button className="border rounded-lg py-2 px-3 bg-gray-200 hover:bg-white text-blue-500 transition duration-150 ease-in"
                                onClick={() => appContext.addItem(res)}
                                >
                                    + Add To Cart
                                </button>
                                </div>
                            </div>
                        ))}
                        <div className="mt-8">
                            <Cart />
                        </div>
                    </div>
                </div>
            )
        }
    return <h1>Add Dishes</h1>;
};