const http = require("http");
const fs = require("fs");

const PORT = 3000;

let books = JSON.parse(fs.readFileSync("books.json"));
let users = JSON.parse(fs.readFileSync("users.json"));

const server = http.createServer((req, res) => {
  if (req.url === "/users/signup" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newUser = JSON.parse(body);
      users.push(newUser);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newUser));
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(
      JSON.stringify({
        message: "Endpoint not found",
        status: "failed",
      })
    );
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
