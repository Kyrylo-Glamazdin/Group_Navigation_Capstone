export const addUsers = (users) =>{
    return {
        type: 'ADD_USERS',
        payload: users
    }
}

export const addGroups = (groups) =>{
    return {
        type: 'ADD_GROUPS',
        payload: groups
    }
}