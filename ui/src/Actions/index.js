export const addUsers = users => {
  return {
    type: "ADD_USERS",
    payload: users
  };
};

export const addGroups = groups => {
  return {
    type: "ADD_GROUPS",
    payload: groups
  };
};

export const delGroup = group => {
  return {
    type: "DEL_GROUP",
    payload: group
  };
};

export const loginUser = user => {
  return {
    type: "SET_USER",
    payload: user
  };
};

export const changeGroup = groupId => {
  return {
    type: "CHANGE_GROUP",
    payload: groupId
  };
};

export const addCurrentGroup = () => {
  return {
    type: "ADD_CURRENT_GROUP"
  }
}

export const changeInviteGroup = groupId => {
  return {
    type: "CHANGE_INVITE_GROUP",
    payload: groupId
  }
}

export const addInvitations = inviteArr =>{
  return{
    type: "ADD_INVITATIONS",
    payload: inviteArr
  }
}

export const removeInvitation = invite => {
  return{
    type: "REMOVE_INVITATION",
    payload: invite
  }
}