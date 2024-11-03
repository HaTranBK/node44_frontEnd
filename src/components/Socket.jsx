import React from "react";
import { io } from "socket.io-client";

// tạo đối tượng client cho FE

const socket = io("http://localhost:8080"); //hoặc là ws thay cho http, ws là websocket giao thức của socket.io
socket.on("send-new-number", (data) => {
  document.getElementById("number").innerHTML = data;
});
const Socket = () => {
  return (
    <div className="text-white">
      <button
        onClick={() => {
          socket.emit("send-client", "");
        }}
      >
        click
      </button>
      <p id="number">0</p>
    </div>
  );
};

export default Socket;
