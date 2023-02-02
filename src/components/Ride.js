import React from "react";
const rides = require('../data/rideData');

function Ride(props) {
    const ride = rides.find(ride => ride.id === Number(props.id));
    if (props.minHeight < ride.heightRequirement) return null
    if (props.listItem) {
        return (
            <li><u>{ride.name}</u></li>
        )
    } else return (
        <u>{ride.name}</u>
    )
}

export default Ride;