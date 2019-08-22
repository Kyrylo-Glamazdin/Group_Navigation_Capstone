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

function isEquivalent(a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  if (aProps.length != bProps.length) {
      return false;
  }
  for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];
      if (a[propName] !== b[propName]) {
          return false;
      }
  }
  return true;
}

const invitationReducer = (oldInvitations = [], action) =>{
  switch(action.type){
    case "ADD_INVITATION":
      return oldInvitations.concat(action.payload);
    case "REMOVE_INVITATION":
      let newInv= oldInvitations.filter(inv => !isEquivalent(inv,action.payload));
      return newInv;
    case "CHANGE_INVITATION":
      oldInvitations = action.payload;
      return action.payload;
    default:
      return oldInvitations;
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
  invGroup : invMembersReducer,
  invites : invitationReducer
});