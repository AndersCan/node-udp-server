import { createSocket } from "dgram";
import { createInterface } from "readline";

const readLine = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const client = createSocket("udp4");

readLine.question("Please type your name: ", (name) => {
  client.send(JSON.stringify({ type: "CONNECT", name }), 41234, "127.0.0.1");

  readLine.on("line", function (line) {
    const message = `${name}: ${line}`;
    client.send(
      JSON.stringify({ type: "MESSAGE", message }),
      41234,
      "127.0.0.1"
    );
  });
});

client.on("message", (rawMessage, serverInfo) => {
  const rawString = rawMessage.toString("utf8");
  console.log(`${rawString}`);
});
