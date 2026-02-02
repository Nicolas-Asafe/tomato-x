import { boot } from "../tx/boot/boot.main.js";
import cluster from "node:cluster";
import os from "os";
async function app() {
    const numCPUs = os.cpus().length;
    if (cluster.isMaster) {
        // cria um worker por núcleo
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on("exit", (worker) => {
            cluster.fork();
        });
    }
    else {
        (async () => {
            await boot(null);
        })();
    }
}
app();
//# sourceMappingURL=app.tomato.js.map