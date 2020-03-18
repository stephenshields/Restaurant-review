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
    filter: 0
  };  
  render() {
    return (
        <div>
          <NavBar />
            <Row style={{margin: 0}}>
              <Col sm={8} style={{padding: 0}}>
                <Map fetchPlaces={this.fetchPlaces}
                    places={this.state.places}/>
              </Col>
            <Col sm={4} style={{padding: 0}}>
          <SideBar places={this.state.places} />
            </Col>
          </Row>  
      </div>
    );
  }

  fetchPlaces = places => {
    places.map(place =>{
    this.setState({
  places: [...this.state.places, place]
})})

    // console.log(this.state.places)
  };
}

export default App;