/* */ 
"use strict";
var shared_1 = require('./shared');
var url_serializer_1 = require('./url_serializer');
var collection_1 = require('./utils/collection');
function createEmptyUrlTree() {
  return new UrlTree(new UrlSegment([], {}), {}, null);
}
exports.createEmptyUrlTree = createEmptyUrlTree;
function containsTree(container, containee, exact) {
  if (exact) {
    return equalSegments(container.root, containee.root);
  } else {
    return containsSegment(container.root, containee.root);
  }
}
exports.containsTree = containsTree;
function equalSegments(container, containee) {
  if (!equalPath(container.pathsWithParams, containee.pathsWithParams))
    return false;
  if (Object.keys(container.children).length !== Object.keys(containee.children).length)
    return false;
  for (var c in containee.children) {
    if (!container.children[c])
      return false;
    if (!equalSegments(container.children[c], containee.children[c]))
      return false;
  }
  return true;
}
function containsSegment(container, containee) {
  return containsSegmentHelper(container, containee, containee.pathsWithParams);
}
function containsSegmentHelper(container, containee, containeePaths) {
  if (container.pathsWithParams.length > containeePaths.length) {
    var current = container.pathsWithParams.slice(0, containeePaths.length);
    if (!equalPath(current, containeePaths))
      return false;
    if (Object.keys(containee.children).length > 0)
      return false;
    return true;
  } else if (container.pathsWithParams.length === containeePaths.length) {
    if (!equalPath(container.pathsWithParams, containeePaths))
      return false;
    for (var c in containee.children) {
      if (!container.children[c])
        return false;
      if (!containsSegment(container.children[c], containee.children[c]))
        return false;
    }
    return true;
  } else {
    var current = containeePaths.slice(0, container.pathsWithParams.length);
    var next = containeePaths.slice(container.pathsWithParams.length);
    if (!equalPath(container.pathsWithParams, current))
      return false;
    return containsSegmentHelper(container.children[shared_1.PRIMARY_OUTLET], containee, next);
  }
}
var UrlTree = (function() {
  function UrlTree(root, queryParams, fragment) {
    this.root = root;
    this.queryParams = queryParams;
    this.fragment = fragment;
  }
  UrlTree.prototype.toString = function() {
    return new url_serializer_1.DefaultUrlSerializer().serialize(this);
  };
  return UrlTree;
}());
exports.UrlTree = UrlTree;
var UrlSegment = (function() {
  function UrlSegment(pathsWithParams, children) {
    var _this = this;
    this.pathsWithParams = pathsWithParams;
    this.children = children;
    this.parent = null;
    collection_1.forEach(children, function(v, k) {
      return v.parent = _this;
    });
  }
  UrlSegment.prototype.toString = function() {
    return url_serializer_1.serializePaths(this);
  };
  return UrlSegment;
}());
exports.UrlSegment = UrlSegment;
var UrlPathWithParams = (function() {
  function UrlPathWithParams(path, parameters) {
    this.path = path;
    this.parameters = parameters;
  }
  UrlPathWithParams.prototype.toString = function() {
    return url_serializer_1.serializePath(this);
  };
  return UrlPathWithParams;
}());
exports.UrlPathWithParams = UrlPathWithParams;
function equalPathsWithParams(a, b) {
  if (a.length !== b.length)
    return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i].path !== b[i].path)
      return false;
    if (!collection_1.shallowEqual(a[i].parameters, b[i].parameters))
      return false;
  }
  return true;
}
exports.equalPathsWithParams = equalPathsWithParams;
function equalPath(a, b) {
  if (a.length !== b.length)
    return false;
  for (var i = 0; i < a.length; ++i) {
    if (a[i].path !== b[i].path)
      return false;
  }
  return true;
}
exports.equalPath = equalPath;
function mapChildren(segment, fn) {
  var newChildren = {};
  collection_1.forEach(segment.children, function(child, childOutlet) {
    if (childOutlet === shared_1.PRIMARY_OUTLET) {
      newChildren[childOutlet] = fn(child, childOutlet);
    }
  });
  collection_1.forEach(segment.children, function(child, childOutlet) {
    if (childOutlet !== shared_1.PRIMARY_OUTLET) {
      newChildren[childOutlet] = fn(child, childOutlet);
    }
  });
  return newChildren;
}
exports.mapChildren = mapChildren;
function mapChildrenIntoArray(segment, fn) {
  var res = [];
  collection_1.forEach(segment.children, function(child, childOutlet) {
    if (childOutlet === shared_1.PRIMARY_OUTLET) {
      res = res.concat(fn(child, childOutlet));
    }
  });
  collection_1.forEach(segment.children, function(child, childOutlet) {
    if (childOutlet !== shared_1.PRIMARY_OUTLET) {
      res = res.concat(fn(child, childOutlet));
    }
  });
  return res;
}
exports.mapChildrenIntoArray = mapChildrenIntoArray;
