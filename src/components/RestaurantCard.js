import React from 'react'
import {Card} from 'react-bootstrap'
import Stars from '../components/Stars'

function RestaurantCard(props) {
  return (
    <div style={{padding: '.3em'}}>
    <Card style={{backgroundColor: '#21242b'}} text='white'>
	  <Card.Body>
	    <Card.Title>{props.name}</Card.Title>
	    <Stars rating={props.rating}/>
	    <Card.Text>{props.address}</Card.Text>
	  </Card.Body>
	</Card>
    </div>
  )
}

export default RestaurantCard