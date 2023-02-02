import React from "react";
const restaurants = require('../data/restaurantData');


function Restaurant(props) {
    const restaurant = restaurants.find(ride => ride.id === Number(props.id));

    return (
        <li><u>{restaurant.name}</u> - {restaurant.note}</li>
    )
}

export default Restaurant;