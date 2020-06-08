//deepndencies

/// run nodemon server to run this app as 
//npm init
//version,name,etc and enter yes
// npm i socket.io
//nodemon index.js index nodemon to run the server.


const socket=io('http://localhost:8000');
// get dom elements in respective js variables 

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");

var audio=new Audio('juntos.mp3');
//audio will play


//function 
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
    audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";
})
//ask for their name 
const name=prompt("enter your name to join..");

socket.emit('new-user-joined',name)
// anyone joins print the joined with name

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left');
})
//name and the data of the person
socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`,'left');
})
//if anyone left the chat then it replies it
socket.on('left',name=>{
    append(`${name} left the chat`,'left');
})

