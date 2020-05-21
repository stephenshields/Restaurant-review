import React, { Component } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col } from 'react-bootstrap'
import * as restaurantData from './data/restaurant-data'
import NavBar from './components/NavBar'
import Map from './components/Map'
import SideBar from './components/SideBar'


class App extends Component {

  state = {
    places: restaurantData.restaurants,
    filteredPlaces: [],
    filter: 0,
    apiKey: 'AIzaSyAFgDq1kt_7e-81aC8_hmRIZhEuxCZQyoI'
  };  
  render() {
    return (
        <div>
          <NavBar setFilter={this.setFilter}/>
            <Row style={{margin: 0}}>
              <Col sm={8} style={{padding: 0}}>
                <Map fetchPlaces={this.fetchPlaces}
                    places={this.state.places}/>
              </Col>
            <Col sm={4} style={{padding: 0}}>
          <SideBar places={this.state.places}
                   apiKey={this.state.apiKey}/>
            </Col>
          </Row>  
      </div>
    );
  }

  fetchPlaces = places => {
    this.setState({
  places: places
})

    // console.log(this.state.places)
    this.filterPlaces(places);
  };

  filterPlaces = places => {
    const filtered = places.filter(place => place.rating >= this.state.filter)
    this.setState({filteredPlaces: filtered})
    console.log(this.state.filteredPlaces)
    this.setState({places: this.state.filteredPlaces})
  }

  setFilter = filter => {
    this.setState({
      filter: filter
    })
  }
}

export default App;