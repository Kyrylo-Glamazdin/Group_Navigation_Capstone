import { combineReducers } from "redux";

let invMembersGroupId = -1;

let currentGroup = -1;

let curGroupId = -1;

const usersReducer = (oldUsers = [], action) => {
  switch (action.type) {
    case "ADD_USERS":
      return oldUsers.concat(action.payload);
    default:
      return oldUsers;
  }
};

const groupsReducer = (oldGroups = [], action) => {
  switch (action.type) {
    case "ADD_GROUPS":
      return oldGroups.concat(action.payload);
    case "DEL_GROUP":
      let ngr = oldGroups.filter(gp => gp !== action.payload);
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

const invMembersReducer = (oldInvMembersGroupId = invMembersGroupId, action) => {
  switch(action.type){
    case 'CHANGE_INVITE_GROUP':
      return action.payload
    default:
      return oldInvMembersGroupId;
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
  currentGroup: currentGroupReducer,
  invGroup : invMembersReducer
});