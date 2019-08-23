import React, {Component} from 'react';
import { connect } from "react-redux";
import DeckGL from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import { PathLayer } from '@deck.gl/layers';
import 'mapbox-gl/dist/mapbox-gl.css';
import {IconLayer} from '@deck.gl/layers';
import axios from 'axios'
import './Map.css'
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

let selectedColors = [];
let travelTimes = [];
let onHoverColors = [];

let curEndOfColorArray = colors.length;

class Map extends Component {
  constructor (props){
    super(props);
    this.state = {
      x: 0,
      y: 0,
      hoveredItems: null,
      expanded: false,
      colorsSelected: false,
      previousGroup: this.props.currentGroup,
      etaResponse: [],
      hoveredUser: null,
      clickedUser: null,
      loadedETA: false
    };
    this.findGroupById = this.findGroupById.bind(this);
    this.selectRandomColor = this.selectRandomColor.bind(this);
    this.selectChosenColor = this.selectChosenColor.bind(this);
    this.getUserETA = this.getUserETA.bind(this);
    this.findLargestTravelTime = this.findLargestTravelTime.bind(this);
    this.convertTravelTimeToMinutes = this.convertTravelTimeToMinutes.bind(this);
    this.findUserByName = this.findUserByName.bind(this);
    this.handleClickedObject = this.handleClickedObject.bind(this);
    this.resetClickedUser = this.resetClickedUser.bind(this);
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
    selectedColors.push(selectedColor)
    return selectedColor;
  }

  selectChosenColor(number){
    if (selectedColors[number] !== undefined){
      return selectedColors[number];
    }
    return [235, 231, 237];
  }

  getUserETA(number){
    if (travelTimes[number] !== undefined){
      return travelTimes[number];
    }
    return 0;
  }

  convertTravelTimeToMinutes(travelTime){
    let minutes = 0;
    let allNums = [];
    for (let i = 0; i < travelTime.length; i++){
      if (!isNaN(travelTime[i])){
        let curNum = travelTime[i];
        let index = i + 1;
        while (!isNaN(travelTime[index])){
          curNum = curNum + travelTime[index];
          index++;
        }
        i = index;
        allNums.push(curNum);
      }
    }
    if (allNums.length >= 2){
      minutes = minutes + parseInt(allNums[0]) * 60;
      minutes = minutes + parseInt(allNums[1]);
    }
    else if (allNums.length >= 1){
      minutes = minutes + parseInt(allNums[0]);
    }
    return minutes;
  }

  findLargestTravelTime(){
    if (this.state.etaResponse.length <= 0){
      return "0 minutes"
    }
    let maxTime = "0 minutes";
    let maxTimeInt = 0;
    for (let i = 0; i < this.state.etaResponse.length; i++){
      if (this.convertTravelTimeToMinutes(this.state.etaResponse[i][0]) > maxTimeInt){
        maxTime = this.state.etaResponse[i][0];
        maxTimeInt = this.convertTravelTimeToMinutes(this.state.etaResponse[i][0])
      }
    }
    return maxTime;
  }

  findUserByName(name){
    let workingGroup = this.findGroupById();
    for (let i = 0; i < workingGroup.users.length; i++){
      if (workingGroup.users[i].name == name){
        return workingGroup.users[i];
      }
    }
    return undefined;
  }

  _renderTooltip() {
    const {hoveredObject, pointerX, pointerY} = this.state || {};
    if (hoveredObject && hoveredObject.message == "Your Destination"){
      return hoveredObject && (
        <div className = "infoMessage" style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY}}>
          {this.state.loadedETA ?
          hoveredObject.travelTime :
          "Loading..."
          }
        </div>    
      );
    }
    if (hoveredObject){
      let curHoveredUser = this.findUserByName(hoveredObject.message);
      if (curHoveredUser !== undefined && this.state.hoveredUser == null){
        this.setState({
          hoveredUser: curHoveredUser
        })
      }
    }
    else{
      if (this.state.hoveredUser != null){
        this.setState({
          hoveredUser: null
        })
      }
    }
    return hoveredObject && (
      <div className = "infoMessage" style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY}}>
        {this.state.loadedETA ?
        hoveredObject.message  + " will reach the destination in " +  hoveredObject.travelTime
        :
        "Loading..." }
      </div>    
    );
  }


  handleClickedObject() {
    const {clickedObject, pointerX, pointerY} = this.state || {};
    if (clickedObject){
      let curClickedUser = this.findUserByName(clickedObject.message);
      if (curClickedUser !== undefined && this.state.clickedUser != curClickedUser){
        this.setState({
          clickedUser: curClickedUser
        })
      }
    }
    else{
      if (this.state.clickedUser != null){
        this.setState({
          clickedUser: null
        })
      }
    }
  }

  resetClickedUser(){
    if (this.state.clickedUser != null){
      this.setState({
        clickedObject: null,
        clickedUser: null
      })
    }
  }
  

  callAxios = async (workingGroup) => {
    let response = await axios.post("http://localhost:4000/api/directions/eta", {workingGroup}).catch(err => {console.log(err)});
    this.setState({
      etaResponse: response.data
    })
    return response.data;
  }

  render() {
  if (this.props.currentGroup === -1){
    return (
      <div>
        Select a group to see the path
      </div>
    );
  }

  let userPaths = [];
  let userIcons = [];
  let workingGroup = this.findGroupById();


    if (this.state.previousGroup !== this.props.currentGroup){
      this.setState({
        previousGroup: this.props.currentGroup,
        loadedETA: false
      })

      //fetching travel times for all users
      this.callAxios(workingGroup)
      .then(result => {
        travelTimes = (result);
        this.setState({
          loadedETA: true
        })
      })
      .catch(err => {console.log(err)})
      }

  for(let i = 0; i < workingGroup.paths.length; i++){ //Get the generated api paths from the group state
    userPaths.push(workingGroup.paths[i]);

    let curUserLat = parseFloat(workingGroup.users[i].lat);
    let curUserLong = parseFloat(workingGroup.users[i].long);
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
      message: workingGroup.users[i].name,
      travelTime: this.getUserETA(i)
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
      onHover: info =>{ 
      this.setState({
        hoveredObject: info.object,
        pointerX: info.x+16,
        pointerY: info.y-3
      })
      },
      onClick: info => this.setState({
      clickedObject: info.object,
      pointerX: info.x+16,
      pointerY: info.y-3
      })
      });

    userIcons.push(newIcon);
  }

  let destinationData = [];
  let destinationCoordinates = [];
  destinationCoordinates.push(workingGroup.paths[0][workingGroup.paths[0].length - 1][1]);
  destinationCoordinates.push(workingGroup.paths[0][workingGroup.paths[0].length - 1][0]);
  let destinationObject = {
    position: destinationCoordinates,
    icon: {
      url: "https://cdn2.iconfinder.com/data/icons/bitsies/128/Location-512.png",
      width: 128,
      height: 128,
      anchorY: 128
    },
    message: "Your Destination",
    travelTime: "All members will reach the destination in " + this.findLargestTravelTime()
  }
destinationData.push(destinationObject);

  let destinationIcon = new IconLayer({
    id: "destinationMarker",
    data: destinationData,
    getIcon: d => d.icon,
    getPosition: d => d.position,
    getSize: 90,
    pickable: true,
    onHover: info => this.setState({
      hoveredObject: info.object,
      pointerX: info.x+16,
      pointerY: info.y-3
    })
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
        path: currentUserPath,
      }
    ]

    if (!this.state.colorsSelected){
      nextPath[0].color = this.selectRandomColor();
    }
    else{
      if (this.state.clickedUser == null){
        nextPath[0].color = this.selectChosenColor(i);
      }
      else{
        if (workingGroup.users[i].name == this.state.clickedUser.name){
          nextPath[0].color = this.selectChosenColor(i);
        }
        else{
          nextPath[0].color = [255,255,255,1]
        }
      }
    }
    pathData.push(nextPath);
  }

  if (!this.state.colorsSelected){
    this.setState({
      colorsSelected: true
    })
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

return (
  <div>
    <div className = "infoMessage" style={{position: 'absolute', zIndex: 1, left: 1350, top: 20}}>
      {this.state.loadedETA ?
      <div>
        All members will reach the destination in {this.findLargestTravelTime()}
      </div> :
      "Loading..."}
    </div>

    <div className = "clearSelection" onClick = {this.resetClickedUser}>
      {this.state.clickedUser ?
      <div className = "resetButton" style={{position: 'absolute', zIndex: 1, left: 1495, top: 65}}>
        Clear Selection
      </div> :
      ""}
    </div>
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
     <StaticMap
       mapStyle='mapbox://styles/mapbox/dark-v9'
       mapboxApiAccessToken = {process.env.REACT_APP_MB_API_KEY}
      />
      { this._renderTooltip() }
      { this.handleClickedObject() }
   </DeckGL>
  </React.Fragment>
  </div>
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
