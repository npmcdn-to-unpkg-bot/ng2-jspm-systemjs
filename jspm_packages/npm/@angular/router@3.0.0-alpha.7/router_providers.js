/* */ 
"use strict";
var common_1 = require('@angular/common');
var platform_browser_1 = require('@angular/platform-browser');
var common = require('./common_router_providers');
function provideRouter(config, opts) {
  if (opts === void 0) {
    opts = {};
  }
  return [{
    provide: common_1.PlatformLocation,
    useClass: platform_browser_1.BrowserPlatformLocation
  }].concat(common.provideRouter(config, opts));
}
exports.provideRouter = provideRouter;
