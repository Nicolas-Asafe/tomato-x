import { baseEntity } from "../base/base.entity";

export interface distroEntity {
    __distro_name: string;
    __bases_location: string;
    __bases: baseEntity[]
    
}