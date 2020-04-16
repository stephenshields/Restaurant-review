import React, {Component} from 'react'
import Ratings from 'react-ratings-declarative'

class Filter extends Component {
	state = {
        filter: 5
    };
	 changeFilter( newFilter ) {
      this.setState({
        rating: newFilter
      });
    }

	render() {
	return	(
			<Ratings
	        rating={this.state.filter}
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
	)
	}
}

export default Filter;