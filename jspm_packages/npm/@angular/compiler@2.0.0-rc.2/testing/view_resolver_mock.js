/* */ 
"use strict";
var __extends = (this && this.__extends) || function(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var index_1 = require('../index');
var collection_1 = require('../src/facade/collection');
var lang_1 = require('../src/facade/lang');
var MockViewResolver = (function(_super) {
  __extends(MockViewResolver, _super);
  function MockViewResolver() {
    _super.call(this);
    this._views = new collection_1.Map();
    this._inlineTemplates = new collection_1.Map();
    this._animations = new collection_1.Map();
    this._viewCache = new collection_1.Map();
    this._directiveOverrides = new collection_1.Map();
  }
  MockViewResolver.prototype.setView = function(component, view) {
    this._checkOverrideable(component);
    this._views.set(component, view);
  };
  MockViewResolver.prototype.setInlineTemplate = function(component, template) {
    this._checkOverrideable(component);
    this._inlineTemplates.set(component, template);
  };
  MockViewResolver.prototype.setAnimations = function(component, animations) {
    this._checkOverrideable(component);
    this._animations.set(component, animations);
  };
  MockViewResolver.prototype.overrideViewDirective = function(component, from, to) {
    this._checkOverrideable(component);
    var overrides = this._directiveOverrides.get(component);
    if (lang_1.isBlank(overrides)) {
      overrides = new collection_1.Map();
      this._directiveOverrides.set(component, overrides);
    }
    overrides.set(from, to);
  };
  MockViewResolver.prototype.resolve = function(component) {
    var view = this._viewCache.get(component);
    if (lang_1.isPresent(view))
      return view;
    view = this._views.get(component);
    if (lang_1.isBlank(view)) {
      view = _super.prototype.resolve.call(this, component);
    }
    var directives = [];
    if (lang_1.isPresent(view.directives)) {
      flattenArray(view.directives, directives);
    }
    var animations = view.animations;
    var templateUrl = view.templateUrl;
    var overrides = this._directiveOverrides.get(component);
    var inlineAnimations = this._animations.get(component);
    if (lang_1.isPresent(inlineAnimations)) {
      animations = inlineAnimations;
    }
    var inlineTemplate = this._inlineTemplates.get(component);
    if (lang_1.isPresent(inlineTemplate)) {
      templateUrl = null;
    } else {
      inlineTemplate = view.template;
    }
    if (lang_1.isPresent(overrides) && lang_1.isPresent(view.directives)) {
      overrides.forEach(function(to, from) {
        var srcIndex = directives.indexOf(from);
        if (srcIndex == -1) {
          throw new core_1.BaseException("Overriden directive " + lang_1.stringify(from) + " not found in the template of " + lang_1.stringify(component));
        }
        directives[srcIndex] = to;
      });
    }
    view = new core_1.ViewMetadata({
      template: inlineTemplate,
      templateUrl: templateUrl,
      directives: directives.length > 0 ? directives : null,
      animations: animations,
      styles: view.styles,
      styleUrls: view.styleUrls,
      pipes: view.pipes,
      encapsulation: view.encapsulation
    });
    this._viewCache.set(component, view);
    return view;
  };
  MockViewResolver.prototype._checkOverrideable = function(component) {
    var cached = this._viewCache.get(component);
    if (lang_1.isPresent(cached)) {
      throw new core_1.BaseException("The component " + lang_1.stringify(component) + " has already been compiled, its configuration can not be changed");
    }
  };
  MockViewResolver.decorators = [{type: core_1.Injectable}];
  MockViewResolver.ctorParameters = [];
  return MockViewResolver;
}(index_1.ViewResolver));
exports.MockViewResolver = MockViewResolver;
function flattenArray(tree, out) {
  if (!lang_1.isPresent(tree))
    return;
  for (var i = 0; i < tree.length; i++) {
    var item = core_1.resolveForwardRef(tree[i]);
    if (lang_1.isArray(item)) {
      flattenArray(item, out);
    } else {
      out.push(item);
    }
  }
}
