import { createSocket } from "dgram";
import * as Storage from "./storage.js";

const server = createSocket("udp4");

server.on("message", (rawMessage, clientInfo) => {
  const rawString = rawMessage.toString("utf8");
  console.log(`Got "${rawString}"`);

  const message = JSON.parse(rawString);

  if (message.type === "CONNECT") {
    // new user! :)
    Storage.save(message.name, clientInfo);
  } else if (message.type === "MESSAGE") {
    // broadcast message to everyone
    const allUsers = Storage.getAll();
    allUsers.forEach((clientInfo) => {
      server.send(message.message, clientInfo.port, clientInfo.address);
    });
  }
});

server.on("listening", () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.bind(41234);

server.on("error", (err) => {
  console.log(`server error: ${err.message}`);
  server.close();
});
