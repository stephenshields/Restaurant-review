import React, { Component } from 'react'
import RestaurantCard from '../components/RestaurantCard'

export default class SideBar extends Component {  
  
    render() {
        const restaurants = this.props.places.map(restaurant => {
            // let averageRating = 0
            // for (var i = 0; i < restaurant.ratings.length; i++) { 
            //   averageRating = averageRating += restaurant.ratings[i].stars
            // }
            console.log(restaurant)
            return (
                <RestaurantCard 
            key={restaurant.place_id}
            name={restaurant.name} 
            rating={restaurant.rating}
            address={restaurant.vicinity}
            geometry={restaurant.geometry}
            />
            )
        })
        // console.log(restaurants)

        return (
            <div 
          style={{
          width: '100%',
          height: '93vh',
          backgroundColor: '#2f343f',
          overflow: 'auto'
          }}>
          {restaurants}
          </div>
        )
    }
}