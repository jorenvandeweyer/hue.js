"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
function parseErrors(response) {
    if (!(response instanceof Array)) {
        return null;
    }
    const errors = [];
    for (const obj of response) {
        if ('error' in obj) {
            errors.push({
                type: obj.error?.type,
                description: obj.error?.description,
            });
        }
    }
    return errors.length ? errors : null;
}
exports.default = parseErrors;
//# sourceMappingURL=parseErrors.js.map