import React from 'react'
import Ratings from 'react-ratings-declarative'


function Stars(props) {
  return (
    <Ratings
        rating={props.rating}
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

  export default Stars