import { Note } from './mysql/text';
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

}).catch(error => console.log(error));
const app = new Koa();
app.use(cors({
    origin: function (ctx) {
        console.log(ctx);
     
        return 'http://localhost:3000'; // 允许来自所有域名请求
        
     
    },
    credentials: true,
}));
app.use(bodyParser());
 app.use(router.routes()).use(router.allowedMethods());
 app.use(noterouter.routes()).use(noterouter.allowedMethods());
app.listen(9000);
