/* */ 
"use strict";
var Tree = (function () {
    function Tree(root) {
        this._root = root;
    }
    Object.defineProperty(Tree.prototype, "root", {
        get: function () { return this._root.value; },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.parent = function (t) {
        var p = this.pathFromRoot(t);
        return p.length > 1 ? p[p.length - 2] : null;
    };
    Tree.prototype.children = function (t) {
        var n = findNode(t, this._root);
        return n ? n.children.map(function (t) { return t.value; }) : [];
    };
    Tree.prototype.firstChild = function (t) {
        var n = findNode(t, this._root);
        return n && n.children.length > 0 ? n.children[0].value : null;
    };
    Tree.prototype.siblings = function (t) {
        var p = findPath(t, this._root, []);
        if (p.length < 2)
            return [];
        var c = p[p.length - 2].children.map(function (c) { return c.value; });
        return c.filter(function (cc) { return cc !== t; });
    };
    Tree.prototype.pathFromRoot = function (t) { return findPath(t, this._root, []).map(function (s) { return s.value; }); };
    Tree.prototype.contains = function (tree) { return contains(this._root, tree._root); };
    return Tree;
}());
exports.Tree = Tree;
function findNode(expected, c) {
    if (expected === c.value)
        return c;
    for (var _i = 0, _a = c.children; _i < _a.length; _i++) {
        var cc = _a[_i];
        var r = findNode(expected, cc);
        if (r)
            return r;
    }
    return null;
}
function findPath(expected, c, collected) {
    collected.push(c);
    if (expected === c.value)
        return collected;
    for (var _i = 0, _a = c.children; _i < _a.length; _i++) {
        var cc = _a[_i];
        var cloned = collected.slice(0);
        var r = findPath(expected, cc, cloned);
        if (r)
            return r;
    }
    return [];
}
function contains(tree, subtree) {
    if (tree.value !== subtree.value)
        return false;
    var _loop_1 = function(subtreeNode) {
        var s = tree.children.filter(function (child) { return child.value === subtreeNode.value; });
        if (s.length === 0)
            return { value: false };
        if (!contains(s[0], subtreeNode))
            return { value: false };
    };
    for (var _i = 0, _a = subtree.children; _i < _a.length; _i++) {
        var subtreeNode = _a[_i];
        var state_1 = _loop_1(subtreeNode);
        if (typeof state_1 === "object") return state_1.value;
    }
    return true;
}
var TreeNode = (function () {
    function TreeNode(value, children) {
        this.value = value;
        this.children = children;
    }
    TreeNode.prototype.toString = function () { return "TreeNode(" + this.value + ")"; };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy90cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQUlFLGNBQVksSUFBaUI7UUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUFDLENBQUM7SUFFckQsc0JBQUksc0JBQUk7YUFBUixjQUFnQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUUxQyxxQkFBTSxHQUFOLFVBQU8sQ0FBSTtRQUNULElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUMvQyxDQUFDO0lBRUQsdUJBQVEsR0FBUixVQUFTLENBQUk7UUFDWCxJQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELHlCQUFVLEdBQVYsVUFBVyxDQUFJO1FBQ2IsSUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2pFLENBQUM7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SyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7UUFDM0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7WUFBQyxnQkFBTyxLQUFLLEdBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQUMsZ0JBQU8sS0FBSyxHQUFDOztJQUhqRCxHQUFHLENBQUMsQ0FBb0IsVUFBZ0IsRUFBaEIsS0FBQSxPQUFPLENBQUMsUUFBUSxFQUFoQixjQUFnQixFQUFoQixJQUFnQixDQUFDO1FBQXBDLElBQUksV0FBVyxTQUFBOzs7S0FJbkI7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVEO0lBQ0Usa0JBQW1CLEtBQVEsRUFBUyxRQUF1QjtRQUF4QyxVQUFLLEdBQUwsS0FBSyxDQUFHO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBZTtJQUFHLENBQUM7SUFFL0QsMkJBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsY0FBWSxJQUFJLENBQUMsS0FBSyxNQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFELGVBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLGdCQUFRLFdBSXBCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVHJlZTxUPiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3Jvb3Q6IFRyZWVOb2RlPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKHJvb3Q6IFRyZWVOb2RlPFQ+KSB7IHRoaXMuX3Jvb3QgPSByb290OyB9XG5cbiAgZ2V0IHJvb3QoKTogVCB7IHJldHVybiB0aGlzLl9yb290LnZhbHVlOyB9XG5cbiAgcGFyZW50KHQ6IFQpOiBUIHtcbiAgICBjb25zdCBwID0gdGhpcy5wYXRoRnJvbVJvb3QodCk7XG4gICAgcmV0dXJuIHAubGVuZ3RoID4gMSA/IHBbcC5sZW5ndGggLSAyXSA6IG51bGw7XG4gIH1cblxuICBjaGlsZHJlbih0OiBUKTogVFtdIHtcbiAgICBjb25zdCBuID0gZmluZE5vZGUodCwgdGhpcy5fcm9vdCk7XG4gICAgcmV0dXJuIG4gPyBuLmNoaWxkcmVuLm1hcCh0ID0+IHQudmFsdWUpIDogW107XG4gIH1cblxuICBmaXJzdENoaWxkKHQ6IFQpOiBUIHtcbiAgICBjb25zdCBuID0gZmluZE5vZGUodCwgdGhpcy5fcm9vdCk7XG4gICAgcmV0dXJuIG4gJiYgbi5jaGlsZHJlbi5sZW5ndGggPiAwID8gbi5jaGlsZHJlblswXS52YWx1ZSA6IG51bGw7XG4gIH1cblxuICBzaWJsaW5ncyh0OiBUKTogVFtdIHtcbiAgICBjb25zdCBwID0gZmluZFBhdGgodCwgdGhpcy5fcm9vdCwgW10pO1xuICAgIGlmIChwLmxlbmd0aCA8IDIpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IGMgPSBwW3AubGVuZ3RoIC0gMl0uY2hpbGRyZW4ubWFwKGMgPT4gYy52YWx1ZSk7XG4gICAgcmV0dXJuIGMuZmlsdGVyKGNjID0+IGNjICE9PSB0KTtcbiAgfVxuXG4gIHBhdGhGcm9tUm9vdCh0OiBUKTogVFtdIHsgcmV0dXJuIGZpbmRQYXRoKHQsIHRoaXMuX3Jvb3QsIFtdKS5tYXAocyA9PiBzLnZhbHVlKTsgfVxuXG4gIGNvbnRhaW5zKHRyZWU6IFRyZWU8VD4pOiBib29sZWFuIHsgcmV0dXJuIGNvbnRhaW5zKHRoaXMuX3Jvb3QsIHRyZWUuX3Jvb3QpOyB9XG59XG5cbmZ1bmN0aW9uIGZpbmROb2RlPFQ+KGV4cGVjdGVkOiBULCBjOiBUcmVlTm9kZTxUPik6IFRyZWVOb2RlPFQ+IHtcbiAgaWYgKGV4cGVjdGVkID09PSBjLnZhbHVlKSByZXR1cm4gYztcbiAgZm9yIChsZXQgY2Mgb2YgYy5jaGlsZHJlbikge1xuICAgIGNvbnN0IHIgPSBmaW5kTm9kZShleHBlY3RlZCwgY2MpO1xuICAgIGlmIChyKSByZXR1cm4gcjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZmluZFBhdGg8VD4oZXhwZWN0ZWQ6IFQsIGM6IFRyZWVOb2RlPFQ+LCBjb2xsZWN0ZWQ6IFRyZWVOb2RlPFQ+W10pOiBUcmVlTm9kZTxUPltdIHtcbiAgY29sbGVjdGVkLnB1c2goYyk7XG4gIGlmIChleHBlY3RlZCA9PT0gYy52YWx1ZSkgcmV0dXJuIGNvbGxlY3RlZDtcblxuICBmb3IgKGxldCBjYyBvZiBjLmNoaWxkcmVuKSB7XG4gICAgY29uc3QgY2xvbmVkID0gY29sbGVjdGVkLnNsaWNlKDApO1xuICAgIGNvbnN0IHIgPSBmaW5kUGF0aChleHBlY3RlZCwgY2MsIGNsb25lZCk7XG4gICAgaWYgKHIpIHJldHVybiByO1xuICB9XG5cbiAgcmV0dXJuIFtdO1xufVxuXG5mdW5jdGlvbiBjb250YWluczxUPih0cmVlOiBUcmVlTm9kZTxUPiwgc3VidHJlZTogVHJlZU5vZGU8VD4pOiBib29sZWFuIHtcbiAgaWYgKHRyZWUudmFsdWUgIT09IHN1YnRyZWUudmFsdWUpIHJldHVybiBmYWxzZTtcblxuICBmb3IgKGxldCBzdWJ0cmVlTm9kZSBvZiBzdWJ0cmVlLmNoaWxkcmVuKSB7XG4gICAgY29uc3QgcyA9IHRyZWUuY2hpbGRyZW4uZmlsdGVyKGNoaWxkID0+IGNoaWxkLnZhbHVlID09PSBzdWJ0cmVlTm9kZS52YWx1ZSk7XG4gICAgaWYgKHMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjb250YWlucyhzWzBdLCBzdWJ0cmVlTm9kZSkpIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgY2xhc3MgVHJlZU5vZGU8VD4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IFQsIHB1YmxpYyBjaGlsZHJlbjogVHJlZU5vZGU8VD5bXSkge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYFRyZWVOb2RlKCR7dGhpcy52YWx1ZX0pYDsgfVxufSJdfQ==