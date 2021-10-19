import { createSocket } from "dgram";
const server = createSocket("udp4");

server.on("error", (err) => {
  console.log(`server error: ${err.message}`);
  server.close();
});

server.on("message", (rawMessage, clientInfo) => {
  const message = rawMessage.toString("utf8");
  console.log(`Got "${message}"`);
  // sending pong back
  const response = "Pong!";
  server.send(response, clientInfo.port, clientInfo.address);
});

server.on("listening", () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.bind(41234);
