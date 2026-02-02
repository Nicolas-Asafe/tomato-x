interface DistroApplicationParamDecorator {
    __distro_name: string;
    __version: string;
    __compatibility_version: string;
}
export declare function DistroApplication(params: DistroApplicationParamDecorator): (constructor: Function) => void;
export {};
//# sourceMappingURL=distroApplication.decorator.d.ts.map