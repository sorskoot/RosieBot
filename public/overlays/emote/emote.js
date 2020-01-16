let socket = io('http://localhost:7532');
let emotes = document.querySelector("#emotes");

socket.on('render emotes', function (msg) {
    console.log("render emotes", msg);
})