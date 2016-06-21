/* */ 
"format cjs";
export function shallowEqual(a, b) {
    const k1 = Object.keys(a);
    const k2 = Object.keys(b);
    if (k1.length != k2.length) {
        return false;
    }
    let key;
    for (let i = 0; i < k1.length; i++) {
        key = k1[i];
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
export function flatten(a) {
    const target = [];
    for (let i = 0; i < a.length; ++i) {
        for (let j = 0; j < a[i].length; ++j) {
            target.push(a[i][j]);
        }
    }
    return target;
}
export function first(a) {
    return a.length > 0 ? a[0] : null;
}
export function last(a) {
    return a.length > 0 ? a[a.length - 1] : null;
}
export function and(bools) {
    return bools.reduce((a, b) => a && b, true);
}
export function merge(m1, m2) {
    var m = {};
    for (var attr in m1) {
        if (m1.hasOwnProperty(attr)) {
            m[attr] = m1[attr];
        }
    }
    for (var attr in m2) {
        if (m2.hasOwnProperty(attr)) {
            m[attr] = m2[attr];
        }
    }
    return m;
}
export function forEach(map, callback) {
    for (var prop in map) {
        if (map.hasOwnProperty(prop)) {
            callback(map[prop], prop);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZCQUE2QixDQUFxQixFQUFFLENBQXFCO0lBQ3ZFLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0QsSUFBSSxHQUFXLENBQUM7SUFDaEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDbkMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsd0JBQTJCLENBQVE7SUFDakMsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO0lBQ3ZCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxzQkFBeUIsQ0FBTTtJQUM3QixNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNwQyxDQUFDO0FBRUQscUJBQXdCLENBQU07SUFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUMvQyxDQUFDO0FBRUQsb0JBQW9CLEtBQWdCO0lBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFRCxzQkFBeUIsRUFBc0IsRUFBRSxFQUFzQjtJQUNyRSxJQUFJLENBQUMsR0FBdUIsRUFBRSxDQUFDO0lBRS9CLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDO0lBQ0gsQ0FBQztJQUVELEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsd0JBQ0ksR0FBdUIsRUFBRSxRQUFxQztJQUNoRSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dFcXVhbChhOiB7W3g6IHN0cmluZ106IGFueX0sIGI6IHtbeDogc3RyaW5nXTogYW55fSk6IGJvb2xlYW4ge1xuICBjb25zdCBrMSA9IE9iamVjdC5rZXlzKGEpO1xuICBjb25zdCBrMiA9IE9iamVjdC5rZXlzKGIpO1xuICBpZiAoazEubGVuZ3RoICE9IGsyLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBsZXQga2V5OiBzdHJpbmc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgazEubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBrMVtpXTtcbiAgICBpZiAoYVtrZXldICE9PSBiW2tleV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuPFQ+KGE6IFRbXVtdKTogVFtdIHtcbiAgY29uc3QgdGFyZ2V0OiBUW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBhW2ldLmxlbmd0aDsgKytqKSB7XG4gICAgICB0YXJnZXQucHVzaChhW2ldW2pdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0PFQ+KGE6IFRbXSk6IFQge1xuICByZXR1cm4gYS5sZW5ndGggPiAwID8gYVswXSA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXN0PFQ+KGE6IFRbXSk6IFQge1xuICByZXR1cm4gYS5sZW5ndGggPiAwID8gYVthLmxlbmd0aCAtIDFdIDogbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuZChib29sczogYm9vbGVhbltdKTogYm9vbGVhbiB7XG4gIHJldHVybiBib29scy5yZWR1Y2UoKGEsIGIpID0+IGEgJiYgYiwgdHJ1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZTxWPihtMToge1trZXk6IHN0cmluZ106IFZ9LCBtMjoge1trZXk6IHN0cmluZ106IFZ9KToge1trZXk6IHN0cmluZ106IFZ9IHtcbiAgdmFyIG06IHtba2V5OiBzdHJpbmddOiBWfSA9IHt9O1xuXG4gIGZvciAodmFyIGF0dHIgaW4gbTEpIHtcbiAgICBpZiAobTEuaGFzT3duUHJvcGVydHkoYXR0cikpIHtcbiAgICAgIG1bYXR0cl0gPSBtMVthdHRyXTtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBhdHRyIGluIG0yKSB7XG4gICAgaWYgKG0yLmhhc093blByb3BlcnR5KGF0dHIpKSB7XG4gICAgICBtW2F0dHJdID0gbTJbYXR0cl07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoPEssIFY+KFxuICAgIG1hcDoge1trZXk6IHN0cmluZ106IFZ9LCBjYWxsYmFjazogLyooViwgSykgPT4gdm9pZCovIEZ1bmN0aW9uKTogdm9pZCB7XG4gIGZvciAodmFyIHByb3AgaW4gbWFwKSB7XG4gICAgaWYgKG1hcC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgY2FsbGJhY2sobWFwW3Byb3BdLCBwcm9wKTtcbiAgICB9XG4gIH1cbn0iXX0=