import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Link from "next/link";

const QUERY = gql`
    {
        restaurants {
            id
            name
            description
            image {
                url
            }
            neighborhood
            delivery
        }
    }`;

function RestaurantList(props) {
    const { loading, error, data } = useQuery(QUERY);
    if (error) return "Error loading restaurants";
    // if restaurants are returnned from the GraphQL query, run the filter query
    // and set equal to variable restaurantSearch
    if (loading) return <h1>Fetching</h1>;
    if (data.restaurants && data.restaurants.length) {
        // searchQuery
        const searchQuery = data.restaurants.filter((query) =>
        query.name.toLowerCase().includes(props.search));
        if (searchQuery.length != 0) {
            return (
                <div className="pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
                    <div className="inset-0">
                        <div className="bg-white h-1/3 sm:h-2/3"></div>
                    </div>
                    <div className="relative max-w-7xl mx-auto">
                        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
                        {searchQuery.map((res) => (
                            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden" key={res.id}>
                                <div className="flex-shrink-0">
                                    <img className="h-48 w-full object-cover" top={true} src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`} />
                                </div>
                                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm leading-5 font-medium text-indigo-600">
                                            <a href="#" className="hover:underline">
                                            {res.name}
                                            </a>
                                        </p>
                                        <a href="#" className="block">
                                        <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
                                        Located in {res.neighborhood}
                                        </h3>
                                        <Link
                                as={`/restaurants/${res.id}`}
                                href={`/restaurants?id=${res.id}`}><a className="make this a button">View</a></Link>
                                        <p className="mt-3 text-base leading-6 text-gray-500">
                                        {res.description}
                                        </p>
                                        </a>
                                    </div>
                                    <div className="mt-6 flex flex-row items-center">
                                        
                                        <div className="ml-3">
                                        <div className="flex text-sm leading-5 font-medium text-gray-900">
                                        Delivery: {res.delivery ? (
                                        <div className="flex"> <div className="mx-1">🚗</div> <div className="mx-1">✅</div></div> ) : (<div className="flex"> <div className="mx-1">😢</div> <div className="mx-1">❌</div></div>)}
                                        </div>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div> );
        } else {
            return <div className="h-64 flex flex-col justify-center"><h1 className="text-3xl text-white">Sorry, No Restaurants Found.</h1>
            <p className="text-white">Check your spelling or try another restaurant.</p></div>;
        }
    }
    return <h5>Add Restaurants</h5>;
}
export default RestaurantList;
                    
                    