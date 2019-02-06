import * as express from "express";
const path = require('path');

import relayer from "./routers/relayerRouter";
import account from "./routers/accountsRouter";
import publicRouter from "./routers/publicRouter";

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/account', account);
app.use('/v2', relayer);
app.use('/public', publicRouter)

const port = 3001
app.listen(port, () => console.log(`Example app listening on port ${port}!`))