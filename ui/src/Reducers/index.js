import {combineReducers} from 'redux';

let data = [
    {
        name: "Group 1",
        groupMembers: [],
        dLong: -73.942744,
        dLat: 40.790492
    },
    {
        name: "Group 2",
        groupMembers: ["Member 1", "Member 2", "Member 3"],
        dLong: -73.964716,
        dLat: 40.636434        
    }
];

const dataReducer = (oldData = data, action) => {
    let newData = oldData;
    return oldData;
}

export default combineReducers({
    data: dataReducer
});