import io from 'socket.io-client';
import store from './';
import {addGroups} from './Actions';

const socket = io('http://localhost:4000');

socket.on('connect', ()=>{
    console.log("you have been connected");
})

socket.on('routes', (response)=>{
    console.log(response);
})

socket.on('success-group-made', (data) =>{
    console.log('sucess-group-made');
   store.dispatch(addGroups(data));
})

export default socket;