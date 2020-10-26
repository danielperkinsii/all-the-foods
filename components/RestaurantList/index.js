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
                <div>
                    {searchQuery.map((res) => (
                        <div key={res.id}>
                            <img 
                            top={true} src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`} />
                            <div>
                    <p>{res.name}</p>
                    <p>{res.description}</p>
                            </div>
                            <div>
                                <Link
                                as={`/restaurants/${res.id}`}
                                href={`/restaurants?id=${res.id}`}><a className="make this a button">View</a></Link>
                            </div>
                        </div>
                    ))}
                </div>
            )
        } else {
            return <h1>No Restaurants Found</h1>;
        }
    }
    return <h5>Add Restaurants</h5>
}
export default RestaurantList