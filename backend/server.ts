import * as express from "express";
import relayer from "./routers/relayerRouter";
import account from "./routers/accountsRouter";
import otherRoutes from "./routers/publicRouter";

const app = express();
app.use('/account', account);
app.use('/v2', relayer);
app.use('/', otherRoutes);

const port = 3001
app.listen(port, () => console.log(`Example app listening on port ${port}!`))