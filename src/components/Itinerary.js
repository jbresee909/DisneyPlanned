import React, { useRef } from "react";
import { Card, Button } from 'react-bootstrap';
import Ride from '../components/Ride';
import Restaurant from "./Restaurant";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


function Itinerary(props) {

    const parentRef = useRef(null);

    const handleDownload = async (e) => {
        e.preventDefault();
        const items = parentRef.current.querySelectorAll('.day-itinerary');
        const item = parentRef.current;
        const pdf = new jsPDF('p', 'pt', 'a4');
        let y = 0;

        for (let i = 0; i <= items.length; i++) {
            const canvas = await html2canvas(item);
            const imgData = canvas.toDataURL('image/png');

            if (i > 0) {
                pdf.addPage();
            }
            pdf.addImage(imgData, 'PNG', 0, y);

            y -= 830;
        }

        pdf.save('download.pdf');
    };

    function getArrivalInstructions(stayingOnProperty, parkSelection, minHeight, day) {
        if (stayingOnProperty) {
            return (
                <>
                    <p><b>7:15 a.m.</b> Head to {parkSelection === "Park Hopper" ? "Disneyland Park" : parkSelection}. Since you're staying on Disney property, you can enter the park 30 min eariler than guests that are not staying on property</p>
                    <p><b>7:30 a.m.</b> {day === 1 ? 'This is when you\'re allowed to go to your first ride. You will see the shortest lines the first hour the park is open so take advantage and ride the rides with the longest lines.' : ""}
                        We recommend you ride {getRopeDropSuggestion(minHeight, parkSelection, 1)} for rope drop.</p>
                    <p><b>8:00 a.m.</b> For your second ride, we recommend {getRopeDropSuggestion(minHeight, parkSelection, 2)}</p>
                </>

            )
        } else {
            return (
                <>
                    <p><b>7:30 a.m.</b> Arrive at {parkSelection === "Park Hopper" ? "Disneyland Park" : parkSelection}</p>
                    <p><b>8:00 a.m.</b> {day === 1 ? 'This is when you\'re allowed to go to your first ride. You will see the shortest lines the first hour the park is open so take advantage and ride the rides with the longest lines.' : ""}
                        We recommend you ride {getRopeDropSuggestion(minHeight, parkSelection, 1)} for rope drop.</p>
                    <p><b>8:30 a.m.</b> For your second ride, we recommend {getRopeDropSuggestion(minHeight, parkSelection, 2)}</p>
                </>
            )
        }
    }


    function getRopeDropSuggestion(minHeight, park, rideNum) {
        if (park === 'Park Hopper' || park === 'Disneyland Park') {
            if (rideNum === 1) {
                if (minHeight >= 40) return (<u>Star Wars: Rise of the Resistance</u>)
                else if (minHeight >= 38) return (<u>Millennium Falcon: Smugglers Run</u>)
                else return (<u>Peter Pan's Flight</u>)
            }
            else {
                if (minHeight >= 40) return (<u>Big Thunder Mountain Railroad</u>)
                else if (minHeight >= 38) return (<u>Jungle Cruise</u>)
                else return (<u>Alice in Wonderland</u>)
            }
        } else {
            if (rideNum === 1) {
                if (minHeight >= 40) return (<u>Radiator Springs Racers</u>)
                else return (<u>Web Slingers: A Spider-Man Adventure</u>)
            }
            else {
                if (minHeight >= 40) return (<u>Web Slingers: A Spider-Man Adventure</u>)
                else return (<u>Toy Story Midway Mania</u>)
            }
        }
    }

    function getRidesList(park, minHeight) {
        if (park === 'Park Hopper' || park === 'Disneyland Park') {
            return (
                <ul>
                    <Ride id='1' minHeight={minHeight} listItem={true} />
                    <Ride id='2' minHeight={minHeight} listItem={true} />
                    <Ride id='3' minHeight={minHeight} listItem={true} />
                    <Ride id='4' minHeight={minHeight} listItem={true} />
                    <Ride id='5' minHeight={minHeight} listItem={true} />
                    <Ride id='6' minHeight={minHeight} listItem={true} />
                    <Ride id='7' minHeight={minHeight} listItem={true} />
                    <Ride id='8' minHeight={minHeight} listItem={true} />
                    <Ride id='9' minHeight={minHeight} listItem={true} />
                    <Ride id='12' minHeight={minHeight} listItem={true} />
                </ul>
            )
        } else {
            return (
                <ul>
                    <Ride id='13' minHeight={minHeight} listItem={true} />
                    <Ride id='16' minHeight={minHeight} listItem={true} />
                    <Ride id='17' minHeight={minHeight} listItem={true} />
                    <Ride id='18' minHeight={minHeight} listItem={true} />
                    <Ride id='19' minHeight={minHeight} listItem={true} />
                    <Ride id='21' minHeight={minHeight} listItem={true} />
                    <Ride id='22' minHeight={minHeight} listItem={true} />
                    <Ride id='14' minHeight={minHeight} listItem={true} />
                    <Ride id='15' minHeight={minHeight} listItem={true} />
                </ul>
            )
        }
    }

    function getLunchRestaurants(park, isSnack) {
        if (park === 'Park Hopper' || park === 'Disneyland Park') {
            if (isSnack) {
                return (
                    <ul>
                        <Restaurant id='1' />
                        <Restaurant id='4' />
                        <Restaurant id='5' />
                        <Restaurant id='6' />
                    </ul>
                )
            }
            else {
                return (
                    <ul>
                        <Restaurant id='2' />
                        <Restaurant id='3' />
                        <Restaurant id='7' />
                    </ul>
                )
            }
        } else {
            if (isSnack) {
                return (
                    <ul>
                        <Restaurant id='12' />
                        <Restaurant id='13' />
                        <Restaurant id='15' />
                    </ul>
                )
            }
            else {
                return (
                    <ul>
                        <Restaurant id='8' />
                        <Restaurant id='9' />
                        <Restaurant id='10' />
                        <Restaurant id='11' />
                        <Restaurant id='14' />
                    </ul>
                )
            }
        }
    }

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <Button onClick={(e) => handleDownload(e)} className="mt-3">Download Itinerary</Button>
            </div>
            <Card style={{ backgroundColor: '#5e23b0', padding: '20px', maxWidth: "795px", marginTop: "12px" }} ref={parentRef}>
                <h4>First Night (Downtown Disney)</h4>
                <p>
                    <b>7:00 p.m.</b> Go to downtown Disney! It's wedged in between Disneyland and California adventure.
                    It's free to go to and they have places to eat, buy/look at merchandise, and see street performances!
                    If you want to get merchandise, but don't see anything you like here, they have more options inside the parks.
                    The store that has the most is Emporium (Disneyland on your left when you first enter the park) however,
                    if there is something you see in downtown disney that you like and is not in your size ask a cast member
                    if they have it in the two parks and they will tell you which parks has what in what size.
                    This goes for any other type of merchandise.
                </p>
                <div>
                    {props.parkSelections.map((selection, index) => {
                        return (
                            <div key={index} style={{ marginTop: "40px" }} className="day-itinerary">
                                <u><h4>Day {index}: {selection}</h4></u>
                                {selection === 'Disneyland Park' || selection === 'Park Hopper' ? <p><b>6:00 a.m.</b> Confirm your party for virtual queue on Disneyland app for Mickey and Minnie's Runnaway Railway</p> : null}
                                {selection === 'Disneyland Park' || selection === 'Park Hopper' ? <p><b>7:00 a.m.</b> Get a boarding group for Mickey and Minnie's Runnaway Railway on the Disneyland App. You need to do this at 7:00 am on the dot! If you don’t get a boarding group at 7, you can try again at 11:00 am</p> : null}
                                {getArrivalInstructions(props.stayingOnProperty, selection, props.minHeight, index)}
                                <p><b>9:00 a.m. - 11:00 a.m.</b> Lines will start getting long by this point so just go on whichever rides you want at this point. Below are our favorites:</p>
                                {selection === 'Park Hopper' ? <p><b>1:00 p.m.</b> You can park hop. This means you can visit either California Adventure or Disneyland for the rest of the day.</p> : ''}
                                {getRidesList(selection, props.minHeight)}
                                <p><b>11:30 - 12:00 p.m.</b> Lunch</p>
                                <p>Below are some of our favorite spots to get lunch:</p>
                                {getLunchRestaurants(selection, false)}
                                <p>We also recommend you try some of the snack options are the park as well. These are not full meals, but they are super delicious!</p>
                                {getLunchRestaurants(selection, true)}
                                <p><b>12:30 p.m.</b> From now until dinner is when lines will be longest.</p>
                                <p><b>3:00 p.m.</b> We recommend taking a break around this time to go grab some dinner, take a break, sit down, maybe even go back to your hotel and relax if you are able to. That way you can return to the parks at night with enough energy to ride some more rides and enjoy the nighttime shows!</p>
                                <p><b>6:00 p.m.</b> Ride more rides!</p>
                                <p><b>9:00 - 9:15 p.m.</b> Find seats to watch one of the nighttime shows. Typically showing are at 9:30 and 10:00 p.m. Check the 'Entertainment' tab on the Disneyland app to view availble shows. We recommend watching {selection === 'Disneyland Park' ? 'Fantasmic! or one of the firework shows' : 'World of Color'} if these options are available.</p>
                                <p><b>10:00 p.m. - 12:00 a.m</b> Check the app to see exact time parks close. Shopping at parks are open for an hour after rides close.</p>
                            </div>
                        )
                    })}
                </div>
            </Card>
            <div style={{ textAlign: "center" }}>
                <Button onClick={(e) => handleDownload(e)} className="mt-3">Download Itinerary</Button>
            </div>
        </div>)
}


export default Itinerary;