import React, { Component } from 'react'
import { Card, Accordion } from 'react-bootstrap'
import Stars from '../components/Stars'

class RestaurantCard extends Component {


    componentDidMount = () => {

	}

    render() {
        return (
            <div  
    style={{padding: '.3em'}}
    onClick={this.handleClick}
    >
    <Card 
    style={{backgroundColor: '#21242b'}} 
    text='white'
    >
	  <Accordion.Toggle as={Card.Body} variant="link" eventKey={this.props.cardId} 
	  style={{cursor: 'pointer'}} 
	  >
	    <Card.Title>{this.props.name}</Card.Title>
	    <Stars rating={this.props.rating}/>
	    <Card.Text>{this.props.address}</Card.Text>
	    <Accordion.Collapse eventKey={this.props.cardId}>
	    <Card.Img src={"https://maps.googleapis.com/maps/api/streetview?location=" + this.props.address +
	    "&size=360x180&key=AIzaSyAFgDq1kt_7e-81aC8_hmRIZhEuxCZQyoI&libraries=places"}/>
	    </Accordion.Collapse>
		  </Accordion.Toggle>
	</Card>
    </div>
        )
    }
}

export default RestaurantCard