const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");

const db = require("./db.json");
const cors = require("cors");

const dashboardRoutes = require("./routes/dashboardRoutes");
const plansRoutes = require("./routes/plansRoutes");
const usersRoutes = require("./routes/usersRoutes");

server.use(cors());

server.use(jsonServer.bodyParser);

server.use("/dashboard", dashboardRoutes(db));
server.use("/plans", plansRoutes(db));
server.use("/users", usersRoutes(db));

server.use(router);



const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
