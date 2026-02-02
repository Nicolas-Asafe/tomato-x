import { BaseModel } from "./tx/distros_tools/class/base.class.js";
import type { manifestEntity } from "./tx/boot/loader/manifest/manifest.entity.js";
import type { distroEntity } from "./tx/boot/loader/distros/distro.entity.js";
import type { routeEntity } from "./tx/boot/loader/route/route.entity.js";
import type { ctxEntity } from "./tx/distros_tools/entitys/ctx.entity.js";
import type { userEntity } from "./tx/distros_tools/entitys/user.entity.js";
import { Base } from "./tx/distros_tools/decorators/base.decorator.js";
import { DistroApplication } from "./tx/distros_tools/decorators/distroApplication.decorator.js";
import { jsonRead } from "./tx/shared/read/json.read.js";
import { deepFreeze } from "./tx/shared/freeze/deepFreeze.freeze.js";
import { validatorOfKeys } from "./tx/shared/validator_keys/validator.js";
import type { key } from "./tx/shared/validator_keys/key.entity.js";
export declare namespace TomatoEntitys {
    type Manifest = manifestEntity;
    type Route = routeEntity;
    type Distro = distroEntity;
    type Ctx = ctxEntity;
    type User = userEntity;
}
export declare namespace TomatoDecorators {
    const BaseDecorator: typeof Base;
    const DistroApplicationDecorator: typeof DistroApplication;
}
export declare namespace TomatoBase {
    const BaseModelClass: typeof BaseModel;
}
export declare namespace TomatoUtils {
    const readJson: typeof jsonRead;
    const freeze: typeof deepFreeze;
    const ValidatorKeys: typeof validatorOfKeys;
    type Key = key;
    const Events: {
        getAll(): Map<string, {
            status: "STARTING" | "RUNNING" | "FINISH" | "NOTSTARTED" | "LOADED";
            payload?: unknown;
        }>;
        emit(event: string, status: "STARTING" | "RUNNING" | "FINISH" | "NOTSTARTED" | "LOADED", payload?: unknown): void;
        on(event: string, fn: (payload?: unknown) => void): void;
    };
}
//# sourceMappingURL=tomato-contracts.d.ts.map