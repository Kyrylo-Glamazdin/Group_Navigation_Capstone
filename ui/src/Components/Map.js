import React, {Component} from 'react';
import { connect } from "react-redux";
import DeckGL from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import { PathLayer } from '@deck.gl/layers';
// data needed for overlay here

const data = [{
 name: "random-name",
 color: [101, 147, 245],
 path:[]}
]
export class Map extends Component {
render() {
// below, add whatever layers you need to overlay on your map
 const layer = [
   new PathLayer({
    id: "path-layer",
    data,
    getWidth: data => 7,
    getColor: data => data.color,
    widthMinPixels: 7
  })
 ]
return (
  <React.Fragment>
   <DeckGL
    initialViewState={{
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 12
    }}
    height='100%'
    width='100%'
    controller={true}
    layers={layer} // layer here
   >
     <StaticMap
       mapStyle='mapbox://styles/mapbox/streets-v11'
       mapboxApiAccessToken = {process.env.REACT_APP_MB_API_KEY}
      />
   </DeckGL>
  </React.Fragment>
  )
 }
}

export default Map


// const mapStateToProps = state => {
//   return {
//     users: state.users,
//     groups: state.groups
//   };
// };


// export default connect(mapStateToProps)(Map);
