/* */ 
"use strict";
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var core_1 = require('@angular/core');
var router_outlet_map_1 = require('../router_outlet_map');
var shared_1 = require('../shared');
var RouterOutlet = (function() {
  function RouterOutlet(parentOutletMap, location, name) {
    this.location = location;
    parentOutletMap.registerOutlet(name ? name : shared_1.PRIMARY_OUTLET, this);
  }
  Object.defineProperty(RouterOutlet.prototype, "isActivated", {
    get: function() {
      return !!this.activated;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(RouterOutlet.prototype, "component", {
    get: function() {
      if (!this.activated)
        throw new Error('Outlet is not activated');
      return this.activated.instance;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(RouterOutlet.prototype, "activatedRoute", {
    get: function() {
      if (!this.activated)
        throw new Error('Outlet is not activated');
      return this._activatedRoute;
    },
    enumerable: true,
    configurable: true
  });
  RouterOutlet.prototype.deactivate = function() {
    if (this.activated) {
      this.activated.destroy();
      this.activated = null;
    }
  };
  RouterOutlet.prototype.activate = function(factory, activatedRoute, providers, outletMap) {
    this.outletMap = outletMap;
    this._activatedRoute = activatedRoute;
    var inj = core_1.ReflectiveInjector.fromResolvedProviders(providers, this.location.parentInjector);
    this.activated = this.location.createComponent(factory, this.location.length, inj, []);
  };
  RouterOutlet = __decorate([core_1.Directive({selector: 'router-outlet'}), __param(2, core_1.Attribute('name')), __metadata('design:paramtypes', [router_outlet_map_1.RouterOutletMap, core_1.ViewContainerRef, String])], RouterOutlet);
  return RouterOutlet;
}());
exports.RouterOutlet = RouterOutlet;
