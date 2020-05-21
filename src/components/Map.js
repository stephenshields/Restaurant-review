import React, { Component } from "react";
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AddRestaurant from '../components/AddRestaurant';

export default class Map extends Component {
    state = {
        mapCenter: { lat: 53.999980, lng: -6.403740 },
        map: null,
        newPlace: null,
        geometry: null,
        newCenter: {},
        activePlace: {},
        markers: [],
        modalShow: false
    };
    componentDidMount = () => {
        let map = new window.google.maps.Map(this.refs.map, {
            center: this.state.mapCenter,
            zoom: 14,
            mapTypeId: "roadmap"
        });
        //initialising the map
        this.setState({ map });

        //updates the places when dragged
        map.addListener("dragend", event => {
            //Construct and set new center 
            const mapCenter = {
                lat: map.getCenter().lat(),
                lng: map.getCenter().lng()
            }
            console.log(mapCenter);

            this.setState({ mapCenter });

            // retrieves all nearby restaurants within the stated radius and sends results to App.js
            let service = new window.google.maps.places.PlacesService(map);
            service.nearbySearch({
                    location: mapCenter,
                    radius: "1500",
                    type: ["restaurant"]
                },
                (results, status) => {
                    this.props.fetchPlaces(results);
                    console.log("places", results);
                }
            );

        });

        //when map is clicked, set location and display modal 
        map.addListener("click", event => {
            const location = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            }

            console.log("click", location);

            this.setState({
                geometry: { location }
            });
            this.setState({ modalShow: true })
            console.log(this.state.modalShow)
        })

        //Find user location and set it to mapCenter
        navigator.geolocation.getCurrentPosition(position => {
            const mapCenter = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(mapCenter);

            this.setState({ mapCenter });

            this.homeMarker(mapCenter, map);
            this.loadPlaces();
        });
    };

    //when places are updated, reload markers
    componentWillReceiveProps = nextProps => {
        //console.log("props", nextProps.places);
        this.createMarkers(nextProps.places, this.state.map);
    };

    render() {
        return (
            <div>
        <div ref="map" 
            style={{ width: "100%", height: "93vh" }} />
            <AddRestaurant
        createNewPlace={this.createNewPlace}
        show={this.state.modalShow}
        onHide={() => this.setState({modalShow: false})}
      />
      </div>
        );
    }

    // Place a marker on your location
    homeMarker = (position, map) => {
        let marker = new window.google.maps.Marker({
            map,
            position,
            animation: window.google.maps.Animation.DROP,
            icon: "http://plebeosaur.us/etc/map/bluedot_retina.png"
        });

        const infoWindow = new window.google.maps.InfoWindow({
            content: `
        <h3>Your location</h3>
      `
        });

        marker.addListener("click", function() {
            infoWindow.open(map, marker);
        });
    }

    //Create and display map markers
    createMarkers = (places, map) => {
        // console.log("place", places);
        this.clearMarkers();
        let markers = [];

        for (var i = 0, place;
            (place = places[i]); i++) {

            const marker = new window.google.maps.Marker({
                map: map,
                title: place.name,
                rating: place.rating,
                place_id: place.place_id,
                position: place.geometry.location,
                animation: window.google.maps.Animation.DROP
            });

            //Constructing info window
            const placeContent = `
            <h2>${place.name}</h2>
            <p>${place.vicinity}</p>
          `;

            const infoWindow = new window.google.maps.InfoWindow({
                content: placeContent
            });

            marker.addListener("click", function() {
                //console.log("marker", marker);
                infoWindow.open(map, marker);
                map.panTo(marker.getPosition());
            });

            markers.push(marker);
            window.google.maps.event.addListener(marker, "click", function() {});
            this.setState({ markers: markers });

        }
    };

    //Clears map markers when called
    clearMarkers = () => {
        let markers = this.state.markers;

        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers.length = 0;
    };

    //Take data from modal and create new restaurant
    createNewPlace = (newPlace) => {
        let map = this.state.map
        let place = newPlace
        let coords = this.state.geometry
        console.log(coords)
        this.setState({
            newPlace: {
                name: place.name,
                vicinity: place.vicinity,
                rating: place.rating,
                place_id: place.name,
                geometry: coords
            }
        });
        console.log(this.state.newPlace)
        this.loadPlaces();
    }

    // retrieves all nearby restaurants within the stated radius and sends results to App.js
    loadPlaces = () => {
        let service = new window.google.maps.places.PlacesService(this.state.map);
        service.nearbySearch({
                location: this.state.mapCenter,
                radius: "1500",
                type: ["restaurant"]
            },
            (results, status) => {
                let result = results
                if (this.state.newPlace !== null) {
                    result.push(this.state.newPlace)
                }
                this.props.fetchPlaces(result);
                console.log("places", result);
            }
        );
    }
}