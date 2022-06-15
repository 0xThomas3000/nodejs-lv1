import { createServer } from "http";

import { configs } from "./modules/config.js";
import { helper } from "./modules/helper.js";

const { port, hostname, show } = configs;

createServer(helper.onRequest).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  show();
});
