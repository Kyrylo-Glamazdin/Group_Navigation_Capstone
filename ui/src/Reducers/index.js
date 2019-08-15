import {combineReducers} from 'redux';

let users = [
    {name: "User 1"},
    {name: "User 2"},
    {name: "User 3"},
    {name: "User 4"},
    {name: "User 5"}
];

let groups = [
    {
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
        name: "Group 2",
        users: [
            {name: "User 4"},
            {name: "User 5"} 
        ],
        latitude: 40.211234,
        longitude: -70.12345
    }
];

const usersReducer = (oldUsers = users, action) => {
    switch(action.type){
        case 'ADD_USERS':
            return [...oldUsers, ...action.payload];
        default:
            return oldUsers;
    }
}

const groupsReducer = (oldGroups = groups, action) => {
    switch(action.type){
        case 'ADD_GROUPS':
            return [...oldGroups,...action.payload];
        default:
            return oldGroups;
    }
}

export default combineReducers({
    users: usersReducer,
    groups: groupsReducer
});