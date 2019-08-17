import socket from '../socket';

export const addUsers = (users) => {
    return {
        type: 'ADD_USERS',
        payload: users
    }
}

export const addGroups = (groups) => {
    return {
        type: 'ADD_GROUPS',
        payload: groups
    }
}

export const loginUser = (user) => {
    return{
        type: 'SET_USER',
        payload: user
    }
}