/* */ 
"use strict";
var shared_1 = require('./shared');
var url_tree_1 = require('./url_tree');
var collection_1 = require('./utils/collection');
var UrlSerializer = (function() {
  function UrlSerializer() {}
  return UrlSerializer;
}());
exports.UrlSerializer = UrlSerializer;
var DefaultUrlSerializer = (function() {
  function DefaultUrlSerializer() {}
  DefaultUrlSerializer.prototype.parse = function(url) {
    var p = new UrlParser(url);
    return new url_tree_1.UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
  };
  DefaultUrlSerializer.prototype.serialize = function(tree) {
    var segment = "/" + serializeSegment(tree.root, true);
    var query = serializeQueryParams(tree.queryParams);
    var fragment = tree.fragment !== null ? "#" + tree.fragment : '';
    return "" + segment + query + fragment;
  };
  return DefaultUrlSerializer;
}());
exports.DefaultUrlSerializer = DefaultUrlSerializer;
function serializePaths(segment) {
  return segment.pathsWithParams.map(function(p) {
    return serializePath(p);
  }).join('/');
}
exports.serializePaths = serializePaths;
function serializeSegment(segment, root) {
  if (segment.children[shared_1.PRIMARY_OUTLET] && root) {
    var primary = serializeSegment(segment.children[shared_1.PRIMARY_OUTLET], false);
    var children_1 = [];
    collection_1.forEach(segment.children, function(v, k) {
      if (k !== shared_1.PRIMARY_OUTLET) {
        children_1.push(k + ":" + serializeSegment(v, false));
      }
    });
    if (children_1.length > 0) {
      return primary + "(" + children_1.join('//') + ")";
    } else {
      return "" + primary;
    }
  } else if (segment.children[shared_1.PRIMARY_OUTLET] && !root) {
    var children_2 = [serializeSegment(segment.children[shared_1.PRIMARY_OUTLET], false)];
    collection_1.forEach(segment.children, function(v, k) {
      if (k !== shared_1.PRIMARY_OUTLET) {
        children_2.push(k + ":" + serializeSegment(v, false));
      }
    });
    return serializePaths(segment) + "/(" + children_2.join('//') + ")";
  } else {
    return serializePaths(segment);
  }
}
function serializeChildren(segment) {
  if (segment.children[shared_1.PRIMARY_OUTLET]) {
    var primary = serializePaths(segment.children[shared_1.PRIMARY_OUTLET]);
    var secondary_1 = [];
    collection_1.forEach(segment.children, function(v, k) {
      if (k !== shared_1.PRIMARY_OUTLET) {
        secondary_1.push(k + ":" + serializePaths(v) + serializeChildren(v));
      }
    });
    var secondaryStr = secondary_1.length > 0 ? "(" + secondary_1.join('//') + ")" : '';
    var primaryChildren = serializeChildren(segment.children[shared_1.PRIMARY_OUTLET]);
    var primaryChildrenStr = primaryChildren ? "/" + primaryChildren : '';
    return "" + primary + secondaryStr + primaryChildrenStr;
  } else {
    return '';
  }
}
function serializePath(path) {
  return "" + path.path + serializeParams(path.parameters);
}
exports.serializePath = serializePath;
function serializeParams(params) {
  return pairs(params).map(function(p) {
    return (";" + p.first + "=" + p.second);
  }).join('');
}
function serializeQueryParams(params) {
  var strs = pairs(params).map(function(p) {
    return (p.first + "=" + p.second);
  });
  return strs.length > 0 ? "?" + strs.join("&") : '';
}
var Pair = (function() {
  function Pair(first, second) {
    this.first = first;
    this.second = second;
  }
  return Pair;
}());
function pairs(obj) {
  var res = [];
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      res.push(new Pair(prop, obj[prop]));
    }
  }
  return res;
}
var SEGMENT_RE = /^[^\/\(\)\?;=&#]+/;
function matchPathWithParams(str) {
  SEGMENT_RE.lastIndex = 0;
  var match = SEGMENT_RE.exec(str);
  return match ? match[0] : '';
}
var QUERY_PARAM_RE = /^[^=\?&#]+/;
function matchQueryParams(str) {
  QUERY_PARAM_RE.lastIndex = 0;
  var match = SEGMENT_RE.exec(str);
  return match ? match[0] : '';
}
var QUERY_PARAM_VALUE_RE = /^[^\?&#]+/;
function matchUrlQueryParamValue(str) {
  QUERY_PARAM_VALUE_RE.lastIndex = 0;
  var match = QUERY_PARAM_VALUE_RE.exec(str);
  return match ? match[0] : '';
}
var UrlParser = (function() {
  function UrlParser(remaining) {
    this.remaining = remaining;
  }
  UrlParser.prototype.peekStartsWith = function(str) {
    return this.remaining.startsWith(str);
  };
  UrlParser.prototype.capture = function(str) {
    if (!this.remaining.startsWith(str)) {
      throw new Error("Expected \"" + str + "\".");
    }
    this.remaining = this.remaining.substring(str.length);
  };
  UrlParser.prototype.parseRootSegment = function() {
    if (this.remaining === '' || this.remaining === '/') {
      return new url_tree_1.UrlSegment([], {});
    } else {
      return new url_tree_1.UrlSegment([], this.parseSegmentChildren());
    }
  };
  UrlParser.prototype.parseSegmentChildren = function() {
    if (this.remaining.length == 0) {
      return {};
    }
    if (this.peekStartsWith('/')) {
      this.capture('/');
    }
    var paths = [this.parsePathWithParams()];
    while (this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(')) {
      this.capture('/');
      paths.push(this.parsePathWithParams());
    }
    var children = {};
    if (this.peekStartsWith('/(')) {
      this.capture('/');
      children = this.parseParens(true);
    }
    var res = {};
    if (this.peekStartsWith('(')) {
      res = this.parseParens(false);
    }
    res[shared_1.PRIMARY_OUTLET] = new url_tree_1.UrlSegment(paths, children);
    return res;
  };
  UrlParser.prototype.parsePathWithParams = function() {
    var path = matchPathWithParams(this.remaining);
    this.capture(path);
    var matrixParams = {};
    if (this.peekStartsWith(';')) {
      matrixParams = this.parseMatrixParams();
    }
    return new url_tree_1.UrlPathWithParams(path, matrixParams);
  };
  UrlParser.prototype.parseQueryParams = function() {
    var params = {};
    if (this.peekStartsWith('?')) {
      this.capture('?');
      this.parseQueryParam(params);
      while (this.remaining.length > 0 && this.peekStartsWith('&')) {
        this.capture('&');
        this.parseQueryParam(params);
      }
    }
    return params;
  };
  UrlParser.prototype.parseFragment = function() {
    if (this.peekStartsWith('#')) {
      return this.remaining.substring(1);
    } else {
      return null;
    }
  };
  UrlParser.prototype.parseMatrixParams = function() {
    var params = {};
    while (this.remaining.length > 0 && this.peekStartsWith(';')) {
      this.capture(';');
      this.parseParam(params);
    }
    return params;
  };
  UrlParser.prototype.parseParam = function(params) {
    var key = matchPathWithParams(this.remaining);
    if (!key) {
      return;
    }
    this.capture(key);
    var value = 'true';
    if (this.peekStartsWith('=')) {
      this.capture('=');
      var valueMatch = matchPathWithParams(this.remaining);
      if (valueMatch) {
        value = valueMatch;
        this.capture(value);
      }
    }
    params[key] = value;
  };
  UrlParser.prototype.parseQueryParam = function(params) {
    var key = matchQueryParams(this.remaining);
    if (!key) {
      return;
    }
    this.capture(key);
    var value = 'true';
    if (this.peekStartsWith('=')) {
      this.capture('=');
      var valueMatch = matchUrlQueryParamValue(this.remaining);
      if (valueMatch) {
        value = valueMatch;
        this.capture(value);
      }
    }
    params[key] = value;
  };
  UrlParser.prototype.parseParens = function(allowPrimary) {
    var segments = {};
    this.capture('(');
    while (!this.peekStartsWith(')') && this.remaining.length > 0) {
      var path = matchPathWithParams(this.remaining);
      var outletName = void 0;
      if (path.indexOf(':') > -1) {
        outletName = path.substr(0, path.indexOf(':'));
        this.capture(outletName);
        this.capture(':');
      } else if (allowPrimary) {
        outletName = shared_1.PRIMARY_OUTLET;
      }
      var children = this.parseSegmentChildren();
      segments[outletName] = Object.keys(children).length === 1 ? children[shared_1.PRIMARY_OUTLET] : new url_tree_1.UrlSegment([], children);
      if (this.peekStartsWith('//')) {
        this.capture('//');
      }
    }
    this.capture(')');
    return segments;
  };
  return UrlParser;
}());
