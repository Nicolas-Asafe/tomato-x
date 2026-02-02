import type { manifestEntity } from "../../boot/loader/manifest/manifest.entity.js";
import http from "http";
type Handler = (req: http.IncomingMessage, res: http.ServerResponse) => void;
export declare const routes: Map<string, Handler>;
export declare const server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
export declare function runHttp(manifest: manifestEntity): void;
export {};
//# sourceMappingURL=run.http.d.ts.map