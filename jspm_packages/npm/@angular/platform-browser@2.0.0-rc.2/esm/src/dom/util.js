/* */ 
"format cjs";
import { StringWrapper } from '../facade/lang';
var CAMEL_CASE_REGEXP = /([A-Z])/g;
var DASH_CASE_REGEXP = /-([a-z])/g;
export function camelCaseToDashCase(input) {
    return StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, (m /** TODO #9100 */) => { return '-' + m[1].toLowerCase(); });
}
export function dashCaseToCamelCase(input) {
    return StringWrapper.replaceAllMapped(input, DASH_CASE_REGEXP, (m /** TODO #9100 */) => { return m[1].toUpperCase(); });
}
//# sourceMappingURL=util.js.map