import { BaseModel } from "./tx/distros_tools/class/base.class.js";
import { Base } from "./tx/distros_tools/decorators/base.decorator.js";
import { DistroApplication } from "./tx/distros_tools/decorators/distroApplication.decorator.js";
import { jsonRead } from "./tx/shared/read/json.read.js";
import { deepFreeze } from "./tx/shared/freeze/deepFreeze.freeze.js";
import { validatorOfKeys } from "./tx/shared/validator_keys/validator.js";
import { events } from "./tx/events/events.js";
export var TomatoDecorators;
(function (TomatoDecorators) {
    TomatoDecorators.BaseDecorator = Base;
    TomatoDecorators.DistroApplicationDecorator = DistroApplication;
})(TomatoDecorators || (TomatoDecorators = {}));
export var TomatoBase;
(function (TomatoBase) {
    TomatoBase.BaseModelClass = BaseModel;
})(TomatoBase || (TomatoBase = {}));
export var TomatoUtils;
(function (TomatoUtils) {
    TomatoUtils.readJson = jsonRead;
    TomatoUtils.freeze = deepFreeze;
    TomatoUtils.ValidatorKeys = validatorOfKeys;
    TomatoUtils.Events = events;
})(TomatoUtils || (TomatoUtils = {}));
//# sourceMappingURL=tomato-contracts.js.map