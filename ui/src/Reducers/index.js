import {combineReducers} from 'redux';

let users = [
    {id: 1, name: "User 1", long: -73.985954, lat: 40.756814}, //Dummy data to use in place of their live location
    {id: 2, name: "User 2", long: -73.9862, lat: 40.757},
    {id: 3, name: "User 3", long: -73.9865, lat: 40.756},   //6 decimal precision needed for coords
    {id: 4, name: "User 4", long: -73.9854, lat: 40.770},
    {id: 5, name: "User 5", long: -73.985329, lat: 40.740}
];

let groups = [
    {  
        id: 1,
        name: "Group 1",
        users: [
            {name: "User 1"},
            {name: "User 2"},
            {name: "User 3"}
        ],
        latitude: 40.23134,
        longitude: -70.45321
    },
    {
        id: 2,
        name: "Group 2",
        users: [
            {name: "User 4"},
            {name: "User 5"} 
        ],
        latitude: 40.211234,
        longitude: -70.12345
    }
];

let curGroupId = 3;

const usersReducer = (oldUsers = users, action) => {
    switch(action.type){
        case 'ADD_USERS':
            return oldUsers.concat(action.payload);
        default:
            return oldUsers;
    }
}

const groupsReducer = (oldGroups = groups, action) => {
    switch(action.type){
        case 'ADD_GROUPS':
            action.payload.id = curGroupId;
            curGroupId++;
            return oldGroups.concat(action.payload);
        default:
            return oldGroups;
    }
}

export default combineReducers({
    users: usersReducer,
    groups: groupsReducer
});