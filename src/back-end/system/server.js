import http from "http";
import app from "../framework/framework.js";
import routerBook from "../routes/book.routes.js";
import routerUser from "../routes/user.routes.js";
import routerBookmarked from "../routes/bookMarkedBooks.routes.js";

const PORT = process.env | 3000;

const server = http.createServer((req, res) => {
  app.handle(req, res);
});

// Middleware
const waitData = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      req.body = JSON.parse(body);
      resolve();
    });
  });
};
app.use(async (req) => {
  if (req.method === "POST" || req.method === "PUT") await waitData(req);
});

console.log(routerBookmarked);

// routes
app.useRoute("/user", routerUser);
app.useRoute("/book", routerBook);
app.useRoute("/bookmarked", routerBookmarked);
// app.get("*", (req, res) => {
//   res.writeHead(404);
//   res.end("NOT FOUND");
// });
// listen
server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
