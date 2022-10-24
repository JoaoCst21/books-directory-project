import http from "http";
import app from "../framework/framework.js";
import routerBook from "../routes/book.routes.js";
import routerUser from "../routes/user.routes.js";

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
app.use(() => console.log("Working?"));
app.use(async (req, res) => {
  if (req.method !== "POST") return;
  await waitData(req);
  // console.log(req.body);
});

// routes
app.useRoute("/user", routerUser);
app.useRoute("/book", routerBook);
app.post("/test", (req, res) => {
  console.log(req.body, "body");
  res.end("Test Working");
});

// listen
server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
