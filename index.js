const pool = require("./config");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
// const io = new Server(server, { cors: { origin: "*" } });
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
});

// const getData = () => {
//   pool.query(
//     `SELECT * FROM table1;`,

//     (err, result) => {
//       err ? console.log(err) : null;
//       console.log(result.rows);
//     }
//   );
// };

io.on("connection", (socket) => {
  console.log(socket.id)

  socket.on('test', (data) => {
    console.log(data)
  })

});

const getData = (name) => {
  pool.query(`INSERT INTO table1(name) VALUES('${name}')`, (err, result) => {
  });
  pool.query(
        `SELECT * FROM table1;`,
    
        (err, result) => {
          err ? console.log(err) : null;
          io.emit("psql", result.rows)
          console.log('got rows')
        }
      );
  
};

app.post("/home/:name", (req, res) => {
  getData(req.params.name)
  console.log('post request sent')
  res.send(`<h1>Hello Server</h1>`);
});

server.listen(3000, "0.0.0.0", () => {
  console.log("listening on localhost:3000");
});
