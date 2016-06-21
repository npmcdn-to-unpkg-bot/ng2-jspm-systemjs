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
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var router_1 = require('../router');
var router_state_1 = require('../router_state');
var RouterLink = (function() {
  function RouterLink(router, route, locationStrategy) {
    this.router = router;
    this.route = route;
    this.locationStrategy = locationStrategy;
    this.commands = [];
  }
  Object.defineProperty(RouterLink.prototype, "routerLink", {
    set: function(data) {
      if (Array.isArray(data)) {
        this.commands = data;
      } else {
        this.commands = [data];
      }
    },
    enumerable: true,
    configurable: true
  });
  RouterLink.prototype.ngOnChanges = function(changes) {
    this.updateTargetUrlAndHref();
  };
  RouterLink.prototype.onClick = function(button, ctrlKey, metaKey) {
    if (button !== 0 || ctrlKey || metaKey) {
      return true;
    }
    if (typeof this.target === 'string' && this.target != '_self') {
      return true;
    }
    this.router.navigateByUrl(this.urlTree);
    return false;
  };
  RouterLink.prototype.updateTargetUrlAndHref = function() {
    this.urlTree = this.router.createUrlTree(this.commands, {
      relativeTo: this.route,
      queryParams: this.queryParams,
      fragment: this.fragment
    });
    if (this.urlTree) {
      this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
    }
  };
  __decorate([core_1.Input(), __metadata('design:type', String)], RouterLink.prototype, "target", void 0);
  __decorate([core_1.Input(), __metadata('design:type', Object)], RouterLink.prototype, "queryParams", void 0);
  __decorate([core_1.Input(), __metadata('design:type', String)], RouterLink.prototype, "fragment", void 0);
  __decorate([core_1.HostBinding(), __metadata('design:type', String)], RouterLink.prototype, "href", void 0);
  __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], RouterLink.prototype, "routerLink", null);
  __decorate([core_1.HostListener('click', ['$event.button', '$event.ctrlKey', '$event.metaKey']), __metadata('design:type', Function), __metadata('design:paramtypes', [Number, Boolean, Boolean]), __metadata('design:returntype', Boolean)], RouterLink.prototype, "onClick", null);
  RouterLink = __decorate([core_1.Directive({selector: '[routerLink]'}), __metadata('design:paramtypes', [router_1.Router, router_state_1.ActivatedRoute, common_1.LocationStrategy])], RouterLink);
  return RouterLink;
}());
exports.RouterLink = RouterLink;
