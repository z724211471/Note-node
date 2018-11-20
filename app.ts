import "reflect-metadata";
import { createConnection } from "typeorm";
import { router } from "./router/adminlogin"
import { noterouter } from "./router/Note"
import * as bodyParser  from "koa-bodyparser"
const Koa = require("koa");

var cors = require("koa-cors");


createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "czy",
    password: "123456",
    database: "test",
    entities: [
        __dirname + "/mysql/*.ts",
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    // here you can start to work with your entities\

   // console.log(connection);
}).catch(error => console.log(error));
const app = new Koa();
app.use(cors());
app.use(bodyParser());
 app.use(router.routes()).use(router.allowedMethods());
 app.use(noterouter.routes()).use(noterouter.allowedMethods());
app.listen(9000);
