import React, { useState, useEffect } from 'react'
import {Card} from 'react-bootstrap'
import Stars from '../components/Stars'

function RestaurantCard(props) {
	const [details, setDetails] = useState(null);
	console.log(props)
	// console.log(props.geometry[0].location[0].lat)
	let image = null;

	useEffect(() => {
		return () => {
		 image = props.geometry
		};
	})
console.log("image " + image)

	const handleClick = () => {
		console.log('hello')
	}

  return (
    <div  
    style={{padding: '.3em'}}
    >
    <Card 
    style={{backgroundColor: '#21242b'}} 
    text='white'
    >
	  <Card.Body 
	  style={{cursor: 'pointer'}} 
	  onClick={handleClick}
	  >
	    <Card.Title>{props.name}</Card.Title>
	    <Stars rating={props.rating}/>
	    <Card.Text>{props.address}</Card.Text>
	    <Card.Img src={"https://maps.googleapis.com/maps/api/streetview?location=" + image.location.lat + "," + image.location.lng +"&size=600x400&key=AIzaSyAFgDq1kt_7e-81aC8_hmRIZhEuxCZQyoI&libraries=places"}/> 
	  </Card.Body>
	</Card>
    </div>
  )
}

export default RestaurantCard