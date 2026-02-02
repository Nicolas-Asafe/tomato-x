import type { baseEntity } from "../base/base.entity.js";

export interface distroEntity {
    __distro_name: string;
    __bases_location: string;
    __bases: baseEntity[]
    __version: string;
    __compatibility_version:string
}