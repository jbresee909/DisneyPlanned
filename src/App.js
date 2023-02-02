import './App.css';
import { Form, Button } from 'react-bootstrap';
import React, { useState } from "react";
import Itinerary from './components/Itinerary';

function App() {
  const [formPage, setFormPage] = useState(1);
  const [numDays, setNumDays] = useState(1);
  const [parkSelections, setParkSelections] = useState([]);
  const [hasKids, setHasKids] = useState(false);
  const [numKids, setNumKids] = useState(0);
  const [kidHeights, setKidHeights] = useState([]);
  const [stayingOnProperty, setStayingOnProperty] = useState(true);
  const [minHeight, setMinHeight] = useState(54);

  function handleSetNumDays(num) {
    setNumDays(num);
  }

  function handleSetParkSelections(index, value) {
    if (value === "Select a Park") return;
    setParkSelections(newParkSelections => {
      newParkSelections[index] = value;
      return newParkSelections
    })
  }

  function handleSetHasKids() {
    setHasKids(!hasKids);
  }

  function handleSetNumKids(num) {
    if (num > 20) return
    setNumKids(num);
  }

  function handleSetKidHeights(index, height) {
    if (isNaN(height)) return
    setKidHeights(newKidsHeights => {
      newKidsHeights[index] = height;
      setMinHeight(Math.min(...newKidsHeights));
      return newKidsHeights;
    });
  }

  function handleSetStayingOnProperty() {
    setStayingOnProperty(!stayingOnProperty);
  }

  function handleSetFormPage(direction) {
    if (direction === "next") setFormPage(formPage + 1)
    else setFormPage(formPage - 1)
  }

  function getDayOptions() {
    return new Array(10).fill().map((el, i) => {
      return (<option key={i}>{i + 1}</option>)
    })
  }

  // returns array of dropdowns for park selection
  function getParkOptions() {
    let parkOptions = []
    for (let i = 1; i <= numDays; i++) {
      parkOptions.push((
        <div key={i}>
          <Form.Label>Day {i}: Select a park (or park hopper for both)</Form.Label>
          <Form.Select onChange={e => handleSetParkSelections(i, e.target.value)}>
            <option>Select a Park</option>
            <option>Disneyland Park</option>
            <option>California Adventure</option>
            <option>Park Hopper</option>
          </Form.Select>
        </div>

      ))
    }

    return parkOptions;
  }

  function getHeightSelections() {
    let heightSelections = [];

    for (let i = 1; i <= numKids; i++) {
      heightSelections.push((
        <div key={i}>
          <Form.Label className="mt-3">Child: {i} - Enter Height Of Child</Form.Label>
          <Form.Control type="email" placeholder="Enter Height In Inches" onChange={e => handleSetKidHeights(i - 1, e.target.value)} />
        </div>

      ))
    }

    return heightSelections;
  }


  return (
    <Form id="itinerary-generator">
      <h2>DisneyPlanned</h2>
      <h6 style={{ fontWeight: "300" }}>Itinerary Generator</h6>
      <Form.Group style={formPage === 1 ? { display: "block" } : { display: "none" }} className="mb-3">
        <Form.Label>How many days do you plan to visit the Disney Parks in California?</Form.Label>
        <Form.Select onChange={e => handleSetNumDays(e.target.value)}>
          {getDayOptions()}
        </Form.Select>
        <Form.Label className="mt-3">Make Your Park Selections</Form.Label>
        {getParkOptions()}
      </Form.Group>


      <Form.Group style={formPage === 2 ? { display: "block" } : { display: "none" }} className="mb-3">
        <Form.Label>Do You Have Kids?</Form.Label>
        <Form.Select onChange={e => handleSetHasKids(e.target.value)}>
          <option>No</option>
          <option>Yes</option>
        </Form.Select>
        <div style={hasKids ? { display: "block" } : { display: "none" }}>
          <Form.Label className="mt-3">How Many Kids Do You Have?</Form.Label>
          <Form.Control placeholder="Enter Number" onChange={e => handleSetNumKids(e.target.value)} />
          {getHeightSelections()}
        </div>
      </Form.Group>

      <Form.Group style={formPage === 3 ? { display: "block" } : { display: "none" }} className="mb-3">
        <Form.Label>Are You Planning To Stay On Property At One Of The Disneyland Hotels?</Form.Label>
        <Form.Select onChange={e => handleSetStayingOnProperty(e.target.value)}>
          <option>Yes</option>
          <option>No</option>
        </Form.Select>
      </Form.Group>
      <Button variant="secondary"
        className="me-2"
        style={formPage > 1 ? { display: "inline" } : { display: "none" }}
        onClick={() => handleSetFormPage("previous")}>
        Previous
      </Button>
      <Button variant="secondary"
        style={formPage < 3 ? { display: "inline" } : { display: "none" }}
        className="me-2"
        onClick={() => handleSetFormPage("next")}>
        Next
      </Button>
      <Button variant="primary"
        style={formPage === 3 ? { display: "inline" } : { display: "none" }}
        onClick={() => handleSetFormPage("next")}
      >Submit</Button>
      <div style={formPage === 4 ? { display: "inline" } : { display: "none" }}>
        <Itinerary parkSelections={parkSelections} minHeight={minHeight} kidHeights={kidHeights} stayingOnProperty={stayingOnProperty} />
      </div>
    </Form >
  );
}

export default App;
