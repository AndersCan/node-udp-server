import { createSocket } from "dgram";

const client = createSocket("udp4");
const message = "Ping!";

console.log(`Sending "${message}"`);
client.send(message, 41234, "127.0.0.1", (error) => {
  if (error) {
    throw error;
  }
  process.exit(0);
});

process.once("beforeExit", () => {
  client.close();
});

// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false,
// });

// rl.on("line", function (line) {
//   client.send(line, 0, line.length, 41234, "127.0.0.1");
// });

// client.on("message", (rawMessage, clientInfo) => {
//   const message = rawMessage.toString("utf8");
//   console.log({
//     message,
//     rinfo: clientInfo,
//   });
//   console.log(
//     `client got: ${message} from ${clientInfo.address}:${clientInfo.port}`,
//   );
// });
