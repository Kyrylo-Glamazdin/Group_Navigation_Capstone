import React, {Component} from 'react';
import { connect } from "react-redux";
import DeckGL from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import { PathLayer } from '@deck.gl/layers';
import 'mapbox-gl/dist/mapbox-gl.css';
import {IconLayer} from '@deck.gl/layers';
import axios from 'axios'
// data needed for overlay here

let colors = [
  [115, 241, 206],
  [0, 196, 0],
  [0, 0, 178],
  [80, 180, 210],
  [151, 0, 166],
  [235, 231, 237],
  [47, 123, 132],
  [234, 242, 83],
  [234, 6, 83],
  [235, 125, 34]
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

  _renderTooltip() {
    const {hoveredObject, pointerX, pointerY} = this.state || {};
    return hoveredObject && (
      <div style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY}}>
        { hoveredObject.message }
      </div>
    );
  }

  callAxios = async (workingGroup) => {
    let response = await axios.post("http://localhost:4000/api/directions/eta", {workingGroup}).catch(err => {console.log(err)});
    return response.data;
  }

  render() {
  if (this.props.currentGroup === -1){
    return (
      <div>Select a group to see the path</div>
    );
  }

  let userPaths = [];
  let userIcons = [];
  let workingGroup = this.findGroupById();
  for(let i = 0; i < workingGroup.paths.length; i++){ //Get the generated api paths from the group state
    userPaths.push(workingGroup.paths[i]);

    let curUserLat = workingGroup.users[i].lat;
    let curUserLong = workingGroup.users[i].long;
    let curCoordinates = [];
    curCoordinates.push(curUserLong);
    curCoordinates.push(curUserLat);
    let dataObject = {
      position: curCoordinates,
      icon: {
        url: "https://cors-anywhere.herokuapp.com/" + workingGroup.users[i].image,
        width: 128,
        height: 128,
        anchorY: 128
      },
      name: workingGroup.users[i].name
    }
    let coordinatesData = [];
    coordinatesData.push(dataObject);

    let newIcon = new IconLayer ({
      id: workingGroup.users[i].name + workingGroup.users[i].id + workingGroup.latitude + workingGroup.longitude,
      data: coordinatesData,
      getIcon: d => (d.icon),
      getPosition: d => (d.position),
      getSize: 90,
      pickable: true,
      getName: d => d.name,
      // onHover: info => this.setState({
      //   hoveredObject: info.object,
      //   pointerX: info.x,
      //   pointerY: info.y
      // })
      });

    userIcons.push(newIcon);

  }

  let destinationData = [];
  let destinationCoordinates = [];
  destinationCoordinates.push(workingGroup.paths[0][workingGroup.paths[0].length - 1][1]);
  destinationCoordinates.push(workingGroup.paths[0][workingGroup.paths[0].length - 1][0]);
  console.log(destinationCoordinates);
  let destinationObject = {
    position: destinationCoordinates,
    icon: {
      url: "https://cdn2.iconfinder.com/data/icons/bitsies/128/Location-512.png",
      width: 128,
      height: 128,
      anchorY: 128
    },
    message: "Hover over me!"
  }
destinationData.push(destinationObject);
console.log(destinationData);

  let destinationIcon = new IconLayer({
    id: "destinationMarker",
    data: destinationData,
    getIcon: d => d.icon,
    getPosition: d => d.position,
    getSize: 90,
    pickable: true,
    // onHover: info => this.setState({
    //   hoveredObject: info.object,
    //   pointerX: info.x,
    //   pointerY: info.y
    // })
  })

  let pathData = [];
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

  let userPathAndIconLayers = [];
  for (let i = 0; i < pathData.length; i++){
    let curLayer = [new PathLayer({
      id: "path-layer-" + i + workingGroup.users[i] + workingGroup.latitude + workingGroup.longitude,
      data: pathData[i],
      getWidth: data => 3,
      getColor: data => data.color,
      widthMinPixels: 3
    })]
    userPathAndIconLayers.push(curLayer);
  }

  for (let i = 0; i < userIcons.length; i++){
    userPathAndIconLayers.push(userIcons[i]);
  }

  userPathAndIconLayers.push(destinationIcon);

  this.callAxios(workingGroup);


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
    layers={userPathAndIconLayers} // layer here
   >
   {this._renderTooltip()}
     <StaticMap
       mapStyle='mapbox://styles/mapbox/dark-v9'
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
