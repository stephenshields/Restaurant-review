import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import Stars from '../components/Stars'

class RestaurantCard extends Component {
    state = {
        details: {},
    };

    componentDidMount = () => {

	}


    render() {
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
	  >
	    <Card.Title>{this.props.name}</Card.Title>
	    <Stars rating={this.props.rating}/>
	    <Card.Text>{this.props.address}</Card.Text>
	    <Card.Img src={"https://maps.googleapis.com/maps/api/streetview?location=" + this.props.address +"&size=360x180&key=AIzaSyAFgDq1kt_7e-81aC8_hmRIZhEuxCZQyoI&libraries=places"}/> 
	  </Card.Body>
	</Card>
    </div>
        )
    }
}

export default RestaurantCard