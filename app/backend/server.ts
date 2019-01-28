import * as express from "express";
import relayer from "./relayer";
import account from "./account";

const app = express();
app.use('/account', account);
app.use('/v2', relayer);

const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))