import React, { Component } from 'react'
import { Accordion } from 'react-bootstrap'
import RestaurantCard from '../components/RestaurantCard'

export default class SideBar extends Component {

    render() {
        //Places restaurant cards in the SideBar.js
        const restaurants = this.props.places.map(restaurant => {
            // let averageRating = 0
            // for (var i = 0; i < restaurant.ratings.length; i++) { 
            //   averageRating = averageRating += restaurant.ratings[i].stars
            // }
            //console.log(restaurant)
            return (
                <RestaurantCard 
            key={restaurant.place_id}
            apiKey={this.props.apiKey}
            name={restaurant.name} 
            rating={restaurant.rating}
            address={restaurant.vicinity}
            geometry={restaurant.geometry}
            cardId={restaurant.place_id}
            />
            )
        })
        //console.log(restaurants)

        return (
            <Accordion  >
            <div 
          style={{
          width: '100%',
          height: '93vh',
          backgroundColor: '#2f343f',
          overflow: 'auto'
          }}>
          {restaurants}
          </div>
          </Accordion>
        )
    }
}