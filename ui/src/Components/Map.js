import React, {Component} from 'react';
import { connect } from "react-redux";
import DeckGL from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import { PathLayer } from '@deck.gl/layers';
import 'mapbox-gl/dist/mapbox-gl.css';
// data needed for overlay here


let colors = [
  [219, 0, 0],
  [0, 196, 0],
  [0, 0, 178],
  [80, 180, 210],
  [151, 0, 166],
  [78, 72, 82],
  [47, 123, 132],
  [234, 242, 83],
  [234, 6, 83],
  [234, 123, 25]
];

let curEndOfColorArray = colors.length;

class Map extends Component {
  constructor (props){
    super(props);
    this.findGroupById = this.findGroupById.bind(this);
    this.selectRandomColor = this.selectRandomColor.bind(this);
  }

  findGroupById(){
    for (let i = this.props.groups.length - 1; i >= 0; i--){
      if (this.props.groups[i].id === this.props.currentGroup){
        return this.props.groups[i];
      }
    }
  }

  selectRandomColor(){
    let randomColorNum = Math.floor(Math.random() * curEndOfColorArray);
    let selectedColor = colors[randomColorNum];
    let temp = colors[curEndOfColorArray - 1];
    colors[curEndOfColorArray - 1] = selectedColor;
    colors[randomColorNum] = temp;
    curEndOfColorArray--;
    if (curEndOfColorArray <= 0){
      curEndOfColorArray = colors.length;
    }
    return selectedColor;
  }

render() {
  if (this.props.currentGroup === -1){
    return (
      <div>Select a group to see the path</div>
    );
  }

  let userPaths = [];
  let workingGroup = this.findGroupById();
  for(let i = 0; i < workingGroup.paths.length; i++){ //Get the generated api paths from the group state
    userPaths.push(workingGroup.paths[i]);
  }

  let pathData = [];  //reversing the 3d array to be compatable with the map gl component
  for (let i = 0; i < userPaths.length; i++){
    let currentUserPath = [];
    for (let j = 0; j < userPaths[i].length; j++){
      let reversedPath = [];
      for (let k = userPaths[i][j].length - 1; k >= 0; k--){
        reversedPath.push(userPaths[i][j][k]);
      }
      currentUserPath.push(reversedPath);
    }
    
    let nextPath = [ 
      {
        name: workingGroup.users[i].name + "-path",
        color: this.selectRandomColor(),
        path: currentUserPath,
      }
    ]
    pathData.push(nextPath);
  }

  let userPathLayers = [];
  for (let i = 0; i < pathData.length; i++){
    let curLayer = [new PathLayer({
      id: "path-layer-" + i,
      data: pathData[i],
      getWidth: data => 3,
      getColor: data => data.color,
      widthMinPixels: 7
    })]
    userPathLayers.push(curLayer);
  }





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
    layers={userPathLayers} // layer here
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


const mapStateToProps = state => {
  return {
    users: state.users,
    groups: state.groups,
    currentGroup: state.currentGroup
  };
};


export default connect(mapStateToProps)(Map);
