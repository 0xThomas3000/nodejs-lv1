import { readFile } from "fs";

function renderHTML(path, res) {
  readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("<h1 style='color: red'>File not found !!</h1>");
    } else {
      res.write(data);
    }
    res.end();
  });
}

function render404(res) {
  res.writeHead(404);
  res.write("<h1 style='color: red'>File not found !!</h1>");
  res.end();
}

export const helper = {
  onRequest: function onRequest(req, res) {
    /* const path = url.parse(req.url).pathname; // Deprecated */
    const myUrl = new URL(req.url, "http://localhost:3000/");
    const path = myUrl.pathname;

    const trimmedPath = path.replace(/\/+|\/+&/g, "");
    console.log(trimmedPath);

    switch (path) {
      case "/":
        renderHTML("./views/home.html", res);
        break;
      case "/about":
        renderHTML("./views/about.html", res);
        break;
      default:
        render404(res);
        break;
    }
  },
};
