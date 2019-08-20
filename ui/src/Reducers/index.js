import { combineReducers } from "redux";

let users = [
  {
    id: 1,
    name: "Elon Musk",
    image:
      "https://render.fineartamerica.com/images/rendered/default/flat/round-beach-towel/images/artworkimages/medium/1/elon-musk-greg-joens.jpg?&targetx=0&targety=-98&imagewidth=787&imageheight=985&modelwidth=788&modelheight=788&backgroundcolor=F8F8F8&orientation=0",
    long: -73.95648,
    lat: 40.631054
  },
  {
    id: 2,
    name: "Barack Obama",
    image: "https://images-na.ssl-images-amazon.com/images/I/51NuSfifT-L.jpg",
    long: -73.8322516,
    lat: 40.7662358
  },
  {
    id: 3,
    name: "Neil Tyson",
    image:
      "https://render.fineartamerica.com/images/rendered/default/flat/round-beach-towel/images-medium-5/neil-degrasse-tyson-dan-sproul.jpg?&targetx=-131&targety=0&imagewidth=1050&imageheight=788&modelwidth=788&modelheight=788&backgroundcolor=070C11&orientation=0",
    long: -73.9514206,
    lat: 40.7779154
  },
  {
    id: 4,
    name: "User 4",
    image:
      "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1",
    long: -73.985477,
    lat: 40.770125
  },
  {
    id: 5,
    name: "User 5",
    image:
      "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1",
    long: -73.985329,
    lat: 40.740532
  },
  {
    id: 1,
    name: "Elon Musk",
    image:
      "https://render.fineartamerica.com/images/rendered/default/flat/round-beach-towel/images/artworkimages/medium/1/elon-musk-greg-joens.jpg?&targetx=0&targety=-98&imagewidth=787&imageheight=985&modelwidth=788&modelheight=788&backgroundcolor=F8F8F8&orientation=0",
    long: -73.985954,
    lat: 40.756814
  },
  {
    id: 1,
    name: "Elon Musk",
    image:
      "https://render.fineartamerica.com/images/rendered/default/flat/round-beach-towel/images/artworkimages/medium/1/elon-musk-greg-joens.jpg?&targetx=0&targety=-98&imagewidth=787&imageheight=985&modelwidth=788&modelheight=788&backgroundcolor=F8F8F8&orientation=0",
    long: -73.985954,
    lat: 40.756814
  },
  {
    id: 1,
    name: "Elon Musk",
    image:
      "https://render.fineartamerica.com/images/rendered/default/flat/round-beach-towel/images/artworkimages/medium/1/elon-musk-greg-joens.jpg?&targetx=0&targety=-98&imagewidth=787&imageheight=985&modelwidth=788&modelheight=788&backgroundcolor=F8F8F8&orientation=0",
    long: -73.985954,
    lat: 40.756814
  },
  {
    id: 1,
    name: "Elon Musk",
    image:
      "https://render.fineartamerica.com/images/rendered/default/flat/round-beach-towel/images/artworkimages/medium/1/elon-musk-greg-joens.jpg?&targetx=0&targety=-98&imagewidth=787&imageheight=985&modelwidth=788&modelheight=788&backgroundcolor=F8F8F8&orientation=0",
    long: -73.985954,
    lat: 40.756814
  },
  {
    id: 1,
    name: "Elon Musk",
    image:
      "https://render.fineartamerica.com/images/rendered/default/flat/round-beach-towel/images/artworkimages/medium/1/elon-musk-greg-joens.jpg?&targetx=0&targety=-98&imagewidth=787&imageheight=985&modelwidth=788&modelheight=788&backgroundcolor=F8F8F8&orientation=0",
    long: -73.985954,
    lat: 40.756814
  },
  {
    id: 1,
    name: "Elon Musk",
    image:
      "https://render.fineartamerica.com/images/rendered/default/flat/round-beach-towel/images/artworkimages/medium/1/elon-musk-greg-joens.jpg?&targetx=0&targety=-98&imagewidth=787&imageheight=985&modelwidth=788&modelheight=788&backgroundcolor=F8F8F8&orientation=0",
    long: -73.985954,
    lat: 40.756814
  },
  {
    id: 1,
    name: "Elon Musk",
    image:
      "https://render.fineartamerica.com/images/rendered/default/flat/round-beach-towel/images/artworkimages/medium/1/elon-musk-greg-joens.jpg?&targetx=0&targety=-98&imagewidth=787&imageheight=985&modelwidth=788&modelheight=788&backgroundcolor=F8F8F8&orientation=0",
    long: -73.985954,
    lat: 40.756814
  },
  {
    id: 1,
    name: "Elon Musk",
    image:
      "https://render.fineartamerica.com/images/rendered/default/flat/round-beach-towel/images/artworkimages/medium/1/elon-musk-greg-joens.jpg?&targetx=0&targety=-98&imagewidth=787&imageheight=985&modelwidth=788&modelheight=788&backgroundcolor=F8F8F8&orientation=0",
    long: -73.985954,
    lat: 40.756814
  },
  {
    id: 1,
    name: "Elon Musk",
    image:
      "https://render.fineartamerica.com/images/rendered/default/flat/round-beach-towel/images/artworkimages/medium/1/elon-musk-greg-joens.jpg?&targetx=0&targety=-98&imagewidth=787&imageheight=985&modelwidth=788&modelheight=788&backgroundcolor=F8F8F8&orientation=0",
    long: -73.985954,
    lat: 40.756814
  },
  {
    id: 1,
    name: "Elon Musk",
    image:
      "https://render.fineartamerica.com/images/rendered/default/flat/round-beach-towel/images/artworkimages/medium/1/elon-musk-greg-joens.jpg?&targetx=0&targety=-98&imagewidth=787&imageheight=985&modelwidth=788&modelheight=788&backgroundcolor=F8F8F8&orientation=0",
    long: -73.985954,
    lat: 40.756814
  }
];

let groups = [
  {
    id: 1,
    name: "Group 1",
    users: [{ name: "User 1" }, { name: "User 2" }, { name: "User 3" }],
    latitude: 40.231347,
    longitude: -70.453215
  },
  {
    id: 2,
    name: "Group 2",
    users: [{ name: "User 4" }, { name: "User 5" }],
    latitude: 40.211234,
    longitude: -70.123456
  }
];

let currentGroup = -1;

let curGroupId = 3;

const usersReducer = (oldUsers = users, action) => {
  switch (action.type) {
    case "ADD_USERS":
      return oldUsers.concat(action.payload);
    default:
      return oldUsers;
  }
};

const groupsReducer = (oldGroups = groups, action) => {
  switch (action.type) {
    case "ADD_GROUPS":
      action.payload.id = curGroupId;
      curGroupId++;
      return oldGroups.concat(action.payload);
    case "DEL_GROUP":
      let ngr = oldGroups.filter(gp => gp != action.payload);
      return ngr;
    default:
      return oldGroups;
  }
};

const currentGroupReducer = (oldCurrentGroup = currentGroup, action) => {
  switch (action.type){
    case "ADD_CURRENT_GROUP":
      oldCurrentGroup = curGroupId;
      return oldCurrentGroup;
    case "CHANGE_GROUP":
      oldCurrentGroup = action.payload;
      return oldCurrentGroup;
    default:
      return oldCurrentGroup;
  }
}

const loginReducer = (currentUser = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return currentUser;
  }
};

export default combineReducers({
  users: usersReducer,
  groups: groupsReducer,
  login: loginReducer,
  currentGroup: currentGroupReducer
});