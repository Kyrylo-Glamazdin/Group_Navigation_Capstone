import React, {Component} from 'react';
import DeckGL from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import { PathLayer } from '@deck.gl/layers';
// data needed for overlay here

const data = [{
 name: "random-name",
 color: [101, 147, 245],
 path:[[-74.00578, 40.713067],
       [-74.004577, 40.712425],
       [-74.003626, 40.713650],
       [-74.002666, 40.714243],
       [-74.002136, 40.715177],
       [-73.998493, 40.713452],
       [-73.997981, 40.713673],
       [-73.997586, 40.713448],
       [-73.99256, 40.713863]]}
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