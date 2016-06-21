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
var core_1 = require('@angular/core');
var router_1 = require('../router');
var url_tree_1 = require('../url_tree');
var router_link_1 = require('./router_link');
var RouterLinkActive = (function() {
  function RouterLinkActive(router, element, renderer) {
    var _this = this;
    this.router = router;
    this.element = element;
    this.renderer = renderer;
    this.classes = [];
    this.routerLinkActiveOptions = {exact: true};
    this.subscription = router.events.subscribe(function(s) {
      if (s instanceof router_1.NavigationEnd) {
        _this.update();
      }
    });
  }
  RouterLinkActive.prototype.ngAfterContentInit = function() {
    var _this = this;
    this.links.changes.subscribe(function(s) {
      return _this.update();
    });
    this.update();
  };
  Object.defineProperty(RouterLinkActive.prototype, "routerLinkActive", {
    set: function(data) {
      if (Array.isArray(data)) {
        this.classes = data;
      } else {
        this.classes = data.split(' ');
      }
    },
    enumerable: true,
    configurable: true
  });
  RouterLinkActive.prototype.ngOnChanges = function(changes) {
    this.update();
  };
  RouterLinkActive.prototype.ngOnDestroy = function() {
    this.subscription.unsubscribe();
  };
  RouterLinkActive.prototype.update = function() {
    var _this = this;
    if (!this.links || this.links.length === 0)
      return;
    var currentUrlTree = this.router.parseUrl(this.router.url);
    var isActive = this.links.reduce(function(res, link) {
      return res || url_tree_1.containsTree(currentUrlTree, link.urlTree, _this.routerLinkActiveOptions.exact);
    }, false);
    this.classes.forEach(function(c) {
      return _this.renderer.setElementClass(_this.element.nativeElement, c, isActive);
    });
  };
  __decorate([core_1.ContentChildren(router_link_1.RouterLink), __metadata('design:type', core_1.QueryList)], RouterLinkActive.prototype, "links", void 0);
  __decorate([core_1.Input(), __metadata('design:type', Object)], RouterLinkActive.prototype, "routerLinkActiveOptions", void 0);
  __decorate([core_1.Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], RouterLinkActive.prototype, "routerLinkActive", null);
  RouterLinkActive = __decorate([core_1.Directive({selector: '[routerLinkActive]'}), __metadata('design:paramtypes', [router_1.Router, core_1.ElementRef, core_1.Renderer])], RouterLinkActive);
  return RouterLinkActive;
}());
exports.RouterLinkActive = RouterLinkActive;
