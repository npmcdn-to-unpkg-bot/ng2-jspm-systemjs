/* */ 
"format cjs";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from './router_state';
import { PRIMARY_OUTLET } from './shared';
import { mapChildrenIntoArray } from './url_tree';
import { last, merge } from './utils/collection';
import { TreeNode } from './utils/tree';
class NoMatch {
    constructor(segment = null) {
        this.segment = segment;
    }
}
export function recognize(rootComponentType, config, urlTree, url) {
    try {
        const children = processSegment(config, urlTree.root, PRIMARY_OUTLET);
        const root = new ActivatedRouteSnapshot([], {}, PRIMARY_OUTLET, rootComponentType, null, urlTree.root, -1);
        const rootNode = new TreeNode(root, children);
        return of(new RouterStateSnapshot(url, rootNode, urlTree.queryParams, urlTree.fragment));
    }
    catch (e) {
        if (e instanceof NoMatch) {
            return new Observable((obs) => obs.error(new Error(`Cannot match any routes: '${e.segment}'`)));
        }
        else {
            return new Observable((obs) => obs.error(e));
        }
    }
}
function processSegment(config, segment, outlet) {
    if (segment.pathsWithParams.length === 0 && Object.keys(segment.children).length > 0) {
        return processSegmentChildren(config, segment);
    }
    else {
        return [processPathsWithParams(config, segment, 0, segment.pathsWithParams, outlet)];
    }
}
function processSegmentChildren(config, segment) {
    const children = mapChildrenIntoArray(segment, (child, childOutlet) => processSegment(config, child, childOutlet));
    checkOutletNameUniqueness(children);
    sortActivatedRouteSnapshots(children);
    return children;
}
function sortActivatedRouteSnapshots(nodes) {
    nodes.sort((a, b) => {
        if (a.value.outlet === PRIMARY_OUTLET)
            return -1;
        if (b.value.outlet === PRIMARY_OUTLET)
            return 1;
        return a.value.outlet.localeCompare(b.value.outlet);
    });
}
function processPathsWithParams(config, segment, pathIndex, paths, outlet) {
    for (let r of config) {
        try {
            return processPathsWithParamsAgainstRoute(r, segment, pathIndex, paths, outlet);
        }
        catch (e) {
            if (!(e instanceof NoMatch))
                throw e;
        }
    }
    throw new NoMatch(segment);
}
function processPathsWithParamsAgainstRoute(route, segment, pathIndex, paths, outlet) {
    if (route.redirectTo)
        throw new NoMatch();
    if ((route.outlet ? route.outlet : PRIMARY_OUTLET) !== outlet)
        throw new NoMatch();
    if (route.path === '**') {
        const params = paths.length > 0 ? last(paths).parameters : {};
        const snapshot = new ActivatedRouteSnapshot(paths, params, outlet, route.component, route, segment, -1);
        return new TreeNode(snapshot, []);
    }
    const { consumedPaths, parameters, lastChild } = match(segment, route, paths);
    const snapshot = new ActivatedRouteSnapshot(consumedPaths, parameters, outlet, route.component, route, segment, pathIndex + lastChild - 1);
    const slicedPath = paths.slice(lastChild);
    const childConfig = route.children ? route.children : [];
    if (childConfig.length === 0 && slicedPath.length === 0) {
        return new TreeNode(snapshot, []);
    }
    else if (slicedPath.length === 0 && Object.keys(segment.children).length > 0) {
        const children = processSegmentChildren(childConfig, segment);
        return new TreeNode(snapshot, children);
    }
    else {
        const child = processPathsWithParams(childConfig, segment, pathIndex + lastChild, slicedPath, PRIMARY_OUTLET);
        return new TreeNode(snapshot, [child]);
    }
}
function match(segment, route, paths) {
    if (route.path === '') {
        if (route.terminal && (Object.keys(segment.children).length > 0 || paths.length > 0)) {
            throw new NoMatch();
        }
        else {
            return { consumedPaths: [], lastChild: 0, parameters: {} };
        }
    }
    const path = route.path;
    const parts = path.split('/');
    const posParameters = {};
    const consumedPaths = [];
    let currentIndex = 0;
    for (let i = 0; i < parts.length; ++i) {
        if (currentIndex >= paths.length)
            throw new NoMatch();
        const current = paths[currentIndex];
        const p = parts[i];
        const isPosParam = p.startsWith(':');
        if (!isPosParam && p !== current.path)
            throw new NoMatch();
        if (isPosParam) {
            posParameters[p.substring(1)] = current.path;
        }
        consumedPaths.push(current);
        currentIndex++;
    }
    if (route.terminal && (Object.keys(segment.children).length > 0 || currentIndex < paths.length)) {
        throw new NoMatch();
    }
    const parameters = merge(posParameters, consumedPaths[consumedPaths.length - 1].parameters);
    return { consumedPaths, lastChild: currentIndex, parameters };
}
function checkOutletNameUniqueness(nodes) {
    const names = {};
    nodes.forEach(n => {
        let routeWithSameOutletName = names[n.value.outlet];
        if (routeWithSameOutletName) {
            const p = routeWithSameOutletName.url.map(s => s.toString()).join('/');
            const c = n.value.url.map(s => s.toString()).join('/');
            throw new Error(`Two segments cannot have the same outlet name: '${p}' and '${c}'.`);
        }
        names[n.value.outlet] = n.value;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb2duaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlY29nbml6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FDTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQjtPQUVuQyxFQUFDLEVBQUUsRUFBRSxNQUFNLG9CQUFvQjtPQUcvQixFQUFDLHNCQUFzQixFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCO09BQ25FLEVBQUMsY0FBYyxFQUFDLE1BQU0sVUFBVTtPQUNoQyxFQUF5QyxvQkFBb0IsRUFBQyxNQUFNLFlBQVk7T0FDaEYsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLE1BQU0sb0JBQW9CO09BQ3ZDLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYztBQUVyQztJQUNFLFlBQW1CLE9BQU8sR0FBZSxJQUFJO1FBQTFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO0lBQUcsQ0FBQztBQUNuRCxDQUFDO0FBRUQsMEJBQ0ksaUJBQXVCLEVBQUUsTUFBb0IsRUFBRSxPQUFnQixFQUMvRCxHQUFXO0lBQ2IsSUFBSSxDQUFDO1FBQ0gsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sSUFBSSxHQUFHLElBQUksc0JBQXNCLENBQ25DLEVBQUUsRUFBRSxFQUFFLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQXlCLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0RSxNQUFNLENBQUMsRUFBRSxDQUFFLElBQUksbUJBQW1CLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzVGLENBQUU7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QUFHLENBQUMsQ0FBQztZQUN2RCxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RixDQUFDO1FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHtPYnNlcnZlcn0gZnJvbSAncnhqcy9PYnNlcnZlcic7XG5pbXBvcnQge29mIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL29mJztcblxuaW1wb3J0IHtSb3V0ZSwgUm91dGVyQ29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3R9IGZyb20gJy4vcm91dGVyX3N0YXRlJztcbmltcG9ydCB7UFJJTUFSWV9PVVRMRVR9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7VXJsUGF0aFdpdGhQYXJhbXMsIFVybFNlZ21lbnQsIFVybFRyZWUsIG1hcENoaWxkcmVuSW50b0FycmF5fSBmcm9tICcuL3VybF90cmVlJztcbmltcG9ydCB7bGFzdCwgbWVyZ2V9IGZyb20gJy4vdXRpbHMvY29sbGVjdGlvbic7XG5pbXBvcnQge1RyZWVOb2RlfSBmcm9tICcuL3V0aWxzL3RyZWUnO1xuXG5jbGFzcyBOb01hdGNoIHtcbiAgY29uc3RydWN0b3IocHVibGljIHNlZ21lbnQ6IFVybFNlZ21lbnQgPSBudWxsKSB7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVjb2duaXplKFxuICAgIHJvb3RDb21wb25lbnRUeXBlOiBUeXBlLCBjb25maWc6IFJvdXRlckNvbmZpZywgdXJsVHJlZTogVXJsVHJlZSxcbiAgICB1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8Um91dGVyU3RhdGVTbmFwc2hvdD4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gcHJvY2Vzc1NlZ21lbnQoY29uZmlnLCB1cmxUcmVlLnJvb3QsIFBSSU1BUllfT1VUTEVUKTtcbiAgICBjb25zdCByb290ID0gbmV3IEFjdGl2YXRlZFJvdXRlU25hcHNob3QoXG4gICAgICAgIFtdLCB7fSwgUFJJTUFSWV9PVVRMRVQsIHJvb3RDb21wb25lbnRUeXBlLCBudWxsLCB1cmxUcmVlLnJvb3QsIC0xKTtcbiAgICBjb25zdCByb290Tm9kZSA9IG5ldyBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90Pihyb290LCBjaGlsZHJlbik7XG4gICAgcmV0dXJuIG9mIChuZXcgUm91dGVyU3RhdGVTbmFwc2hvdCh1cmwsIHJvb3ROb2RlLCB1cmxUcmVlLnF1ZXJ5UGFyYW1zLCB1cmxUcmVlLmZyYWdtZW50KSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIE5vTWF0Y2gpIHtcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxSb3V0ZXJTdGF0ZVNuYXBzaG90PihcbiAgICAgICAgICAob2JzOiBPYnNlcnZlcjxSb3V0ZXJTdGF0ZVNuYXBzaG90PikgPT5cbiAgICAgICAgICAgICAgb2JzLmVycm9yKG5ldyBFcnJvcihgQ2Fubm90IG1hdGNoIGFueSByb3V0ZXM6ICcke2Uuc2VnbWVudH0nYCkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFJvdXRlclN0YXRlU25hcHNob3Q+KFxuICAgICAgICAgIChvYnM6IE9ic2VydmVyPFJvdXRlclN0YXRlU25hcHNob3Q+KSA9PiBvYnMuZXJyb3IoZSkpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzU2VnbWVudChcbiAgICBjb25maWc6IFJvdXRlW10sIHNlZ21lbnQ6IFVybFNlZ21lbnQsIG91dGxldDogc3RyaW5nKTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD5bXSB7XG4gIGlmIChzZWdtZW50LnBhdGhzV2l0aFBhcmFtcy5sZW5ndGggPT09IDAgJiYgT2JqZWN0LmtleXMoc2VnbWVudC5jaGlsZHJlbikubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwcm9jZXNzU2VnbWVudENoaWxkcmVuKGNvbmZpZywgc2VnbWVudCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtwcm9jZXNzUGF0aHNXaXRoUGFyYW1zKGNvbmZpZywgc2VnbWVudCwgMCwgc2VnbWVudC5wYXRoc1dpdGhQYXJhbXMsIG91dGxldCldO1xuICB9XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NTZWdtZW50Q2hpbGRyZW4oXG4gICAgY29uZmlnOiBSb3V0ZVtdLCBzZWdtZW50OiBVcmxTZWdtZW50KTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD5bXSB7XG4gIGNvbnN0IGNoaWxkcmVuID0gbWFwQ2hpbGRyZW5JbnRvQXJyYXkoXG4gICAgICBzZWdtZW50LCAoY2hpbGQsIGNoaWxkT3V0bGV0KSA9PiBwcm9jZXNzU2VnbWVudChjb25maWcsIGNoaWxkLCBjaGlsZE91dGxldCkpO1xuICBjaGVja091dGxldE5hbWVVbmlxdWVuZXNzKGNoaWxkcmVuKTtcbiAgc29ydEFjdGl2YXRlZFJvdXRlU25hcHNob3RzKGNoaWxkcmVuKTtcbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG5mdW5jdGlvbiBzb3J0QWN0aXZhdGVkUm91dGVTbmFwc2hvdHMobm9kZXM6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+W10pOiB2b2lkIHtcbiAgbm9kZXMuc29ydCgoYSwgYikgPT4ge1xuICAgIGlmIChhLnZhbHVlLm91dGxldCA9PT0gUFJJTUFSWV9PVVRMRVQpIHJldHVybiAtMTtcbiAgICBpZiAoYi52YWx1ZS5vdXRsZXQgPT09IFBSSU1BUllfT1VUTEVUKSByZXR1cm4gMTtcbiAgICByZXR1cm4gYS52YWx1ZS5vdXRsZXQubG9jYWxlQ29tcGFyZShiLnZhbHVlLm91dGxldCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzUGF0aHNXaXRoUGFyYW1zKFxuICAgIGNvbmZpZzogUm91dGVbXSwgc2VnbWVudDogVXJsU2VnbWVudCwgcGF0aEluZGV4OiBudW1iZXIsIHBhdGhzOiBVcmxQYXRoV2l0aFBhcmFtc1tdLFxuICAgIG91dGxldDogc3RyaW5nKTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD4ge1xuICBmb3IgKGxldCByIG9mIGNvbmZpZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gcHJvY2Vzc1BhdGhzV2l0aFBhcmFtc0FnYWluc3RSb3V0ZShyLCBzZWdtZW50LCBwYXRoSW5kZXgsIHBhdGhzLCBvdXRsZXQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBOb01hdGNoKSkgdGhyb3cgZTtcbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IE5vTWF0Y2goc2VnbWVudCk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NQYXRoc1dpdGhQYXJhbXNBZ2FpbnN0Um91dGUoXG4gICAgcm91dGU6IFJvdXRlLCBzZWdtZW50OiBVcmxTZWdtZW50LCBwYXRoSW5kZXg6IG51bWJlciwgcGF0aHM6IFVybFBhdGhXaXRoUGFyYW1zW10sXG4gICAgb3V0bGV0OiBzdHJpbmcpOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PiB7XG4gIGlmIChyb3V0ZS5yZWRpcmVjdFRvKSB0aHJvdyBuZXcgTm9NYXRjaCgpO1xuICBpZiAoKHJvdXRlLm91dGxldCA/IHJvdXRlLm91dGxldCA6IFBSSU1BUllfT1VUTEVUKSAhPT0gb3V0bGV0KSB0aHJvdyBuZXcgTm9NYXRjaCgpO1xuXG4gIGlmIChyb3V0ZS5wYXRoID09PSAnKionKSB7XG4gICAgY29uc3QgcGFyYW1zID0gcGF0aHMubGVuZ3RoID4gMCA/IGxhc3QocGF0aHMpLnBhcmFtZXRlcnMgOiB7fTtcbiAgICBjb25zdCBzbmFwc2hvdCA9XG4gICAgICAgIG5ldyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KHBhdGhzLCBwYXJhbXMsIG91dGxldCwgcm91dGUuY29tcG9uZW50LCByb3V0ZSwgc2VnbWVudCwgLTEpO1xuICAgIHJldHVybiBuZXcgVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD4oc25hcHNob3QsIFtdKTtcbiAgfVxuXG4gIGNvbnN0IHtjb25zdW1lZFBhdGhzLCBwYXJhbWV0ZXJzLCBsYXN0Q2hpbGR9ID0gbWF0Y2goc2VnbWVudCwgcm91dGUsIHBhdGhzKTtcblxuICBjb25zdCBzbmFwc2hvdCA9IG5ldyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KFxuICAgICAgY29uc3VtZWRQYXRocywgcGFyYW1ldGVycywgb3V0bGV0LCByb3V0ZS5jb21wb25lbnQsIHJvdXRlLCBzZWdtZW50LFxuICAgICAgcGF0aEluZGV4ICsgbGFzdENoaWxkIC0gMSk7XG4gIGNvbnN0IHNsaWNlZFBhdGggPSBwYXRocy5zbGljZShsYXN0Q2hpbGQpO1xuICBjb25zdCBjaGlsZENvbmZpZyA9IHJvdXRlLmNoaWxkcmVuID8gcm91dGUuY2hpbGRyZW4gOiBbXTtcblxuICBpZiAoY2hpbGRDb25maWcubGVuZ3RoID09PSAwICYmIHNsaWNlZFBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PihzbmFwc2hvdCwgW10pO1xuXG4gICAgLy8gVE9ETzogY2hlY2sgdGhhdCB0aGUgcmlnaHQgc2VnbWVudCBpcyBwcmVzZW50XG4gIH0gZWxzZSBpZiAoc2xpY2VkUGF0aC5sZW5ndGggPT09IDAgJiYgT2JqZWN0LmtleXMoc2VnbWVudC5jaGlsZHJlbikubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gcHJvY2Vzc1NlZ21lbnRDaGlsZHJlbihjaGlsZENvbmZpZywgc2VnbWVudCk7XG4gICAgcmV0dXJuIG5ldyBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PihzbmFwc2hvdCwgY2hpbGRyZW4pO1xuXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgY2hpbGQgPSBwcm9jZXNzUGF0aHNXaXRoUGFyYW1zKFxuICAgICAgICBjaGlsZENvbmZpZywgc2VnbWVudCwgcGF0aEluZGV4ICsgbGFzdENoaWxkLCBzbGljZWRQYXRoLCBQUklNQVJZX09VVExFVCk7XG4gICAgcmV0dXJuIG5ldyBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PihzbmFwc2hvdCwgW2NoaWxkXSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF0Y2goc2VnbWVudDogVXJsU2VnbWVudCwgcm91dGU6IFJvdXRlLCBwYXRoczogVXJsUGF0aFdpdGhQYXJhbXNbXSkge1xuICBpZiAocm91dGUucGF0aCA9PT0gJycpIHtcbiAgICBpZiAocm91dGUudGVybWluYWwgJiYgKE9iamVjdC5rZXlzKHNlZ21lbnQuY2hpbGRyZW4pLmxlbmd0aCA+IDAgfHwgcGF0aHMubGVuZ3RoID4gMCkpIHtcbiAgICAgIHRocm93IG5ldyBOb01hdGNoKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7Y29uc3VtZWRQYXRoczogW10sIGxhc3RDaGlsZDogMCwgcGFyYW1ldGVyczoge319O1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBhdGggPSByb3V0ZS5wYXRoO1xuICBjb25zdCBwYXJ0cyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgY29uc3QgcG9zUGFyYW1ldGVyczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgY29uc3QgY29uc3VtZWRQYXRoczogVXJsUGF0aFdpdGhQYXJhbXNbXSA9IFtdO1xuXG4gIGxldCBjdXJyZW50SW5kZXggPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoY3VycmVudEluZGV4ID49IHBhdGhzLmxlbmd0aCkgdGhyb3cgbmV3IE5vTWF0Y2goKTtcbiAgICBjb25zdCBjdXJyZW50ID0gcGF0aHNbY3VycmVudEluZGV4XTtcblxuICAgIGNvbnN0IHAgPSBwYXJ0c1tpXTtcbiAgICBjb25zdCBpc1Bvc1BhcmFtID0gcC5zdGFydHNXaXRoKCc6Jyk7XG5cbiAgICBpZiAoIWlzUG9zUGFyYW0gJiYgcCAhPT0gY3VycmVudC5wYXRoKSB0aHJvdyBuZXcgTm9NYXRjaCgpO1xuICAgIGlmIChpc1Bvc1BhcmFtKSB7XG4gICAgICBwb3NQYXJhbWV0ZXJzW3Auc3Vic3RyaW5nKDEpXSA9IGN1cnJlbnQucGF0aDtcbiAgICB9XG4gICAgY29uc3VtZWRQYXRocy5wdXNoKGN1cnJlbnQpO1xuICAgIGN1cnJlbnRJbmRleCsrO1xuICB9XG5cbiAgaWYgKHJvdXRlLnRlcm1pbmFsICYmIChPYmplY3Qua2V5cyhzZWdtZW50LmNoaWxkcmVuKS5sZW5ndGggPiAwIHx8IGN1cnJlbnRJbmRleCA8IHBhdGhzLmxlbmd0aCkpIHtcbiAgICB0aHJvdyBuZXcgTm9NYXRjaCgpO1xuICB9XG5cbiAgY29uc3QgcGFyYW1ldGVycyA9IG1lcmdlKHBvc1BhcmFtZXRlcnMsIGNvbnN1bWVkUGF0aHNbY29uc3VtZWRQYXRocy5sZW5ndGggLSAxXS5wYXJhbWV0ZXJzKTtcbiAgcmV0dXJuIHtjb25zdW1lZFBhdGhzLCBsYXN0Q2hpbGQ6IGN1cnJlbnRJbmRleCwgcGFyYW1ldGVyc307XG59XG5cbmZ1bmN0aW9uIGNoZWNrT3V0bGV0TmFtZVVuaXF1ZW5lc3Mobm9kZXM6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+W10pOiB2b2lkIHtcbiAgY29uc3QgbmFtZXM6IHtbazogc3RyaW5nXTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdH0gPSB7fTtcbiAgbm9kZXMuZm9yRWFjaChuID0+IHtcbiAgICBsZXQgcm91dGVXaXRoU2FtZU91dGxldE5hbWUgPSBuYW1lc1tuLnZhbHVlLm91dGxldF07XG4gICAgaWYgKHJvdXRlV2l0aFNhbWVPdXRsZXROYW1lKSB7XG4gICAgICBjb25zdCBwID0gcm91dGVXaXRoU2FtZU91dGxldE5hbWUudXJsLm1hcChzID0+IHMudG9TdHJpbmcoKSkuam9pbignLycpO1xuICAgICAgY29uc3QgYyA9IG4udmFsdWUudXJsLm1hcChzID0+IHMudG9TdHJpbmcoKSkuam9pbignLycpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUd28gc2VnbWVudHMgY2Fubm90IGhhdmUgdGhlIHNhbWUgb3V0bGV0IG5hbWU6ICcke3B9JyBhbmQgJyR7Y30nLmApO1xuICAgIH1cbiAgICBuYW1lc1tuLnZhbHVlLm91dGxldF0gPSBuLnZhbHVlO1xuICB9KTtcbn0iXX0=