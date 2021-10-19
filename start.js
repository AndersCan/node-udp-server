require("./a.js");
require("./b.js");

const { users } = require("./users.js");

users.push("Hello from start.js");

console.log(users);
