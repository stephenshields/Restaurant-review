import React, { Component } from 'react'
import Ratings from 'react-ratings-declarative'

class Filter extends Component {
    constructor(props) {
        super(props);

        this.changeRating = this.changeRating.bind(this);
        this.state = {
            filter: 0
        };
    };
// Setting the filter to the selected star
    changeRating(newFilter) {
        this.setState({ filter: newFilter });
        this.props.setFilter(newFilter, this.props.keyNum);
    }

    render() {
        return (
            <Ratings
	        rating={this.state.filter}
	        widgetDimensions="1.5rem"
	        widgetSpacings=".1rem"
	        widgetRatedColors="#e6432f"
	        changeRating={this.changeRating}
	      >
	        <Ratings.Widget />
	        <Ratings.Widget />
	        <Ratings.Widget />
	        <Ratings.Widget />
	        <Ratings.Widget />
	      </Ratings>
        )
    }
}

export default Filter;