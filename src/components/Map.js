import React, { Component } from "react";

export default class Map extends Component {
    state = {
        mapCenter: { lat: 53.999980, lng: -6.403740 },
        map: null,
        newPlace: {},
        newCenter: {},
        activePlace: {},
        markers: []
    };
    componentDidMount = () => {
        let map = new window.google.maps.Map(this.refs.map, {
            center: this.state.mapCenter,
            zoom: 14,
            mapTypeId: "roadmap"
        });

        this.setState({ map });

        const clearMarkers = () => {
            let markers = this.state.markers;

            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers.length = 0;
        };

        map.addListener("click", event => {
            const mapCenter = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            }
            console.log(mapCenter);

            this.setState({
                mapCenter: { mapCenter }
            });
            clearMarkers();
            map.panTo(mapCenter);

            let service = new window.google.maps.places.PlacesService(map);
            service.nearbySearch({
                    location: mapCenter,
                    radius: "1500",
                    type: ["restaurant"]
                },
                (results, status) => {
                    this.props.fetchPlaces(results);
                    // console.log("places", results);
                }
            );

        });

        navigator.geolocation.getCurrentPosition(position => {
            const mapCenter = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(mapCenter);

            this.setState({ mapCenter });

            this.homeMarker(mapCenter, map);

            let service = new window.google.maps.places.PlacesService(map);
            service.nearbySearch({
                    location: mapCenter,
                    radius: "1500",
                    type: ["restaurant"]
                },
                (results, status) => {
                    this.props.fetchPlaces(results);
                    // console.log("places", results);
                }
            );
        });
    };

    componentWillReceiveProps = nextProps => {
        console.log("props", nextProps.places);
        this.createMarkers(nextProps.places, this.state.map);
    };

    render() {
        return (
            <div>
        <div ref="map" 
            style={{ width: "100%", height: "93vh" }} />
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


    createMarkers = (places, map) => {
        // console.log("place", places);
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

}