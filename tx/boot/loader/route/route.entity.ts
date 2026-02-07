import type { baseEntity } from "../base/base.entity.js";

export interface routeEntity {
    method: string; 
    path: string;
    base: string;
    base_config: any;
    file_path:string,
    baseInstance:baseEntity
}