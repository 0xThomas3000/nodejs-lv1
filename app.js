import { createServer } from "http";
import { readFile } from "fs";
import url from "url";

import { configs } from "./modules/config.js";

const { port, hostname, show } = configs;

// function showHTML(path)
function onRequest(req, res) {
  /* const path = url.parse(req.url).pathname; // Deprecated */
  const myUrl = new URL(req.url, "http://localhost:3000/");
  const path = myUrl.pathname;

  const trimmedPath = path.replace(/\/+|\/+&/g, "");
  console.log(trimmedPath);

  if (path == "/about") {
    readFile("./views/about.html", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.write("File not found!");
      } else {
        res.write(data);
      }
      res.end();
    });
  } else if (path == "/") {
    readFile("./views/home.html", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.write("File not found!");
      } else {
        res.write(data);
      }
      res.end();
    });
  }
}

createServer(onRequest).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  show();
});
