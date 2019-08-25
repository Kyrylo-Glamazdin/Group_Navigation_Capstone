import React, {Component} from 'react';
import { connect } from "react-redux";
import DeckGL from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import { PathLayer } from '@deck.gl/layers';
import 'mapbox-gl/dist/mapbox-gl.css';
import {IconLayer} from '@deck.gl/layers';
import axios from 'axios'
import './Map.css'

/*** This is the Map component which renders the map and all of the user paths, as well as their icons and ETAs ***/


//path colors will be randomly chosen from this array
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

//this array will be filled up with the randomly chosen colors for users' paths
let selectedColors = [];
//this array fill have all of the users' estimated travel times
let travelTimes = [];

let curEndOfColorArray = colors.length;

class Map extends Component {
  constructor (props){
    super(props);
    this.state = {
      x: 0,
      y: 0,
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
  
  //finds and returns the group whose id is equal to this.props.currentGroup
  findGroupById(){
    for (let i = this.props.groups.length - 1; i >= 0; i--){
      if (this.props.groups[i].id === this.props.currentGroup){
        return this.props.groups[i];
      }
    }
  }

  //selects random colors for the user paths from the 'colors' array.
  //the same color cannot be chosen twice, unless the size of the group exceeds the length of the array.
  selectRandomColor(){
    let randomColorNum = Math.floor(Math.random() * curEndOfColorArray);
    let selectedColor = colors[randomColorNum];
    let temp = colors[curEndOfColorArray - 1]; //swap randomly selected color with the color at the current end of the array
    colors[curEndOfColorArray - 1] = selectedColor;
    colors[randomColorNum] = temp;
    curEndOfColorArray--; //decrease current end of the array
    if (curEndOfColorArray <= 0){
      curEndOfColorArray = colors.length; //if all colors are selected, reset array's length
    }
    selectedColors.push(selectedColor)
    return selectedColor;
  }

  //returns the color which was already selected for the particular path
  selectChosenColor(number){
    if (selectedColors[number] !== undefined){
      return selectedColors[number];
    }
    return [235, 231, 237]; //return light gray as default
  }

  //returns estimated travel time of the user
  getUserETA(number){
    if (travelTimes[number] !== undefined){
      return travelTimes[number];
    }
    return 0;
  }

  //estimated travel time from google directions api response if formatted in the following way: "30 mins", or "1 hour 15 mins".
  //this function converts ETA from google directions response to an integer that corresponds to the number of minutes
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

  //analyzes travel times of all users and returns the largest
  findLargestTravelTime(){
    if (this.state.etaResponse.length <= 0){
      return "0 minutes"
    }
    let maxTime = "0 minutes";
    let maxTimeInt = 0;
    for (let i = 0; i < this.state.etaResponse.length; i++){
      //call to convertTravelTimeToMinutes function to retrieve the number of minutes that the user has to spend for traveling to the destination.
      //compare the result to the current maximum, and replace current maximum if result is larger
      if (this.convertTravelTimeToMinutes(this.state.etaResponse[i][0]) > maxTimeInt){
        maxTime = this.state.etaResponse[i][0];
        maxTimeInt = this.convertTravelTimeToMinutes(this.state.etaResponse[i][0])
      }
    }
    return maxTime;
  }

  //finds the user by name within the currently selected group.
  //@pre: no users within the same group have the same name.
  findUserByName(name){
    let workingGroup = this.findGroupById();
    for (let i = 0; i < workingGroup.users.length; i++){
      if (workingGroup.users[i].name == name){
        return workingGroup.users[i];
      }
    }
    return undefined; //return undefined if user is not found
  }

  //renders the message next to the hovered user's icon
  _renderTooltip() {
    const {hoveredObject, pointerX, pointerY} = this.state || {};
    //if the hovered icon is the destination marker, render the longest user's travel time
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
    //if hovered object is user's icon, render user's name and the amount of time this user needs to travel to the destination
    if (hoveredObject){
      let curHoveredUser = this.findUserByName(hoveredObject.message);
      if (curHoveredUser !== undefined && this.state.hoveredUser == null){
        this.setState({
          hoveredUser: curHoveredUser
        })
      }
    }
    //when user is no longer hovered, set the hoveredUser to null
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

  //finds and stores clickedUser when someone clicks on user's IconLayer
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
    //sets clickedUser to null if clickedObject is reset
    else{
      if (this.state.clickedUser != null){
        this.setState({
          clickedUser: null
        })
      }
    }
  }

  //sets clickedObject to null
  resetClickedUser(){
    if (this.state.clickedUser != null){
      this.setState({
        clickedObject: null
      })
    }
  }
  
  //retrieves estimeted travel time for each user in currentGroup from Google Directions API (the actual API request is made in the backend)
  callAxios = async (workingGroup) => {
    let response = await axios.post("http://localhost:4000/api/directions/eta", {workingGroup}).catch(err => {console.log(err)});
    this.setState({
      etaResponse: response.data
    })
    return response.data;
  }

  render() {
  //when group is not selected, the user sees a default message
  if (this.props.currentGroup === -1){
    return (
      <div>
        Select a group to see the path
      </div>
    );
  }

  //array that stores the sets of coordinates for each user.
  //these sets of coordinates correspond to each user's path from their current location to the destination
  let userPaths = [];

  let userIcons = [];

  //finding current group
  let workingGroup = this.findGroupById();

    //when user changes the group, the states of clickedObject and loadedETA indicator are reset
    if (this.state.previousGroup !== this.props.currentGroup){
      this.resetClickedUser();
      this.setState({
        previousGroup: this.props.currentGroup,
        loadedETA: false
      })

      //fetching travel times for all users
      this.callAxios(workingGroup)
      .then(result => {
        travelTimes = (result);
        this.setState({
          loadedETA: true //updating the state of loadedETA indicator
        })
      })
      .catch(err => {console.log(err)})
      }

  //processing each user in the current group
  for(let i = 0; i < workingGroup.paths.length; i++){ 
    //Get the generated paths from the group state
    userPaths.push(workingGroup.paths[i]);

    //gathering data for IconLayers for each user
    let curUserLat = parseFloat(workingGroup.users[i].lat);
    let curUserLong = parseFloat(workingGroup.users[i].long);
    let curCoordinates = [];
    curCoordinates.push(curUserLong);
    curCoordinates.push(curUserLat);
    //the dataBoject contains user's current location, inforation about their icon, as well as their estimated travel time
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

    //creating an icon layer for each user
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

  //gathering data for the destination marker.
  //the marker is placed exactly at the end of the users' path.
  //when the destination marker is hovered, it shows the maximum amount of time needed for all users to reach the destination
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

  //creating destination IconLayer
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

  //gathering data for each users PathLayer
  let pathData = [];
  //since google directions api returns the coordinates in the format of [latitude, longitude], but the MapBox receives coordinates as [longitude, latitude],
  //the app puts the coordinates in the needed for MapBox order
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
    //selecting the color for each path

    //if colors haven't been assigned yet, pick a random color for each path
    if (!this.state.colorsSelected){
      nextPath[0].color = this.selectRandomColor();
    }
    else{
      //if colors have been selected and no user has recently been clicked on, pick the color which has already been selected for them
      if (this.state.clickedUser == null){
        nextPath[0].color = this.selectChosenColor(i);
      }
      //if colors have been selected, and a user's icon has been clicked, render the corresponding path color for that user, and hide all other users' paths
      else{
        if (workingGroup.users[i].name == this.state.clickedUser.name){
          nextPath[0].color = this.selectChosenColor(i);
        }
        else{
          nextPath[0].color = [20,20,20,0]
        }
      }
    }
    pathData.push(nextPath);
  }

  //set the colorsSelected indicator to true when each user's path has been assigned a color
  if (!this.state.colorsSelected){
    this.setState({
      colorsSelected: true
    })
  }

  //creating PathLayers for all users
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

//return function renders the Map, all of the PathLayers and IconLayers,
//and also displays the maximum amount of time needed for each user to reach the destination.
return (
  <div>
    <div className = "infoMessage" style={{position: 'absolute', zIndex: 1, left: '80vw', top: 20}}>
      {this.state.loadedETA ?
      <div>
        All members will reach the destination in {this.findLargestTravelTime()}
      </div> :
      "Loading..."}
    </div>

    <div className = "clearSelection" onClick = {this.resetClickedUser}>
      {this.state.clickedUser ?
      <div className = "resetButton" style={{position: 'absolute', zIndex: 1, left: '87vw', top: '12vh'}}>
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
