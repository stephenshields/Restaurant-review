import React, { Component } from "react";
import StarRatings from "react-star-ratings";

export default class Place extends Component {
  state = {
    place: {
      opening_hours: { weekday_text: [] }
    },
    reviews: [],
    addingReview: false,
    location: []
  };

  componentDidMount = () => {
    let map = new window.google.maps.Map(this.refs.map, {
      center: this.state.mapCenter,
      zoom: 14,
      mapTypeId: "roadmap"
    });

    let service = new window.google.maps.places.PlacesService(map);
    service.getDetails(
      { placeId: this.props.match.params.place_id },
      (place, status) => {
        const latLng = String(place.geometry.location)
          .replace(" ", "")
          .replace("(", "")
          .replace(")", "")
          .split(",");
        // console.log("latLng", latLng);
        this.setState({
          location: latLng,
          place,
          reviews: place.reviews
        });
      }
    );
  };
};