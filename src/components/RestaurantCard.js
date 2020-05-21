import React, { Component } from 'react'
import { Card, Accordion} from 'react-bootstrap'
import Ratings from 'react-ratings-declarative'
import axios from 'axios'
import Stars from '../components/Stars'
import AddReview from '../components/AddReview'

class RestaurantCard extends Component {
    state = {
        apiKey: this.props.apiKey,
        reviews: {
            reviews: [{
                author_name: "	",
                text: "No reviews found."
            }]
        }
    };


    componentDidMount = () => {

        //Grabs place url
        const url = ("https://maps.googleapis.com/maps/api/place/details/json?place_id=" + this.props.cardId +
            "&fields=reviews&key=" + this.state.apiKey);

//display reviews from url
        axios.get(url)
            .then(res => {
                const reviews = res.data.result;
                if (typeof reviews !== 'undefined') {
                    for (var p in reviews) {
                        if (reviews.hasOwnProperty(p)) {
                            this.setState({ reviews })
                            //console.log(this.state.reviews.reviews)
                        }
                    }
                }

            })
    }

    render() {
//loop through the reviews and display each
        const reviews = this.state.reviews.reviews.map(review => {
            // console.log("review",review)
            return (
                <div style={{
                	marginTop: '20px',
                	marginBottom: '20px',
                	padding: '10px',
                	backgroundColor: 'rgba(128, 128, 128, 0.1)'}}>
                <Ratings
                key={review.time}
	        rating={review.rating}
	        widgetDimensions="1.5rem"
	        widgetSpacings=".1rem"
	        widgetRatedColors="#273baa"
	      >
	        <Ratings.Widget />
	        <Ratings.Widget />
	        <Ratings.Widget />
	        <Ratings.Widget />
	        <Ratings.Widget />
	      </Ratings>
	    <Card.Text>{review.text}</Card.Text>
	    <Card.Subtitle className="text-muted">{review.author_name}</Card.Subtitle>
	    <Card.Text className="text-muted">{review.relative_time_description}</Card.Text>
	    </div>
            )
        })
//display cards in sidebar & handling accordion
        return (
            <div  
    style={{padding: '.3em'}}
    >
    <Card 
    style={{backgroundColor: '#21242b'}} 
    text='white'
    >
	  <Accordion.Toggle onClick={this.handleClick} as={Card.Body} variant="link" eventKey={this.props.cardId} 
	  style={{cursor: 'pointer'}} 
	  >
	    <Card.Title>{this.props.name}</Card.Title>
	    <Stars rating={this.props.rating}/>
	    <Card.Text>{this.props.address}</Card.Text>
	    </Accordion.Toggle>
	    <Accordion.Collapse eventKey={this.props.cardId}>
	    <div>
	    <Card.Img style={{padding: '15px'}} src={"https://maps.googleapis.com/maps/api/streetview?location=" + this.props.address +
	    "&size=360x180&key=" + this.state.apiKey}/>
	    <div style={{padding: '15px'}}>{reviews}</div>
	    <Card.Subtitle className="mb-2 text-center text-muted">Add A Review...</Card.Subtitle>
	    <AddReview fetchReview={this.fetchReview} />
	    </div>
	    </Accordion.Collapse>
	</Card>
    </div>
        )
    }

//Retrieve new reviews from AddReview.js
    fetchReview = newReview => {
    	console.log('before',this.state.reviews)
        this.setState({
            reviews: {
                reviews: [
                    ...this.state.reviews.reviews,
                    newReview
                ]
            }
        })
        console.log('after ',this.state.reviews)
    }

}

export default RestaurantCard