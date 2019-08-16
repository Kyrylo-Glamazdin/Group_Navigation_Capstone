import {combineReducers} from 'redux';

let users = [
    {id: 1, name: "User 1"},
    {id: 2, name: "User 2"},
    {id: 3, name: "User 3"},
    {id: 4, name: "User 4"},
    {id: 5, name: "User 5"}
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