
export function parse(url:any, toLowerCase = true): any {
    var queryIndex = url.indexOf("?");
    if (!url) {
        return null;
    }
    var queryString = url;
    if (queryIndex != -1) {
        queryString = url.substr(queryIndex + 1);
    } else {
        return {};
    }    
    return resolve(queryString, toLowerCase);
}

export function resolve(search: string, toLowerCase = true): any{
    search=search.replace(/^\?/,"");

    var pairs = search.split('&');
    var queryObject = {};
    for (var pair of pairs) {
        if (pair === '') {
            continue;
        }
        var parts = pair.split(/=(.+)?/),
            key = toLowerCase ? parts[0].toLowerCase() : parts[0],
            value = parts[1] && decodeURIComponent(parts[1].replace(/\+/g, ' '));
        var existing = queryObject[key];
        if (existing) {
            if (toString.call(existing) =="[object Array]") {
                existing.push(value);
            } else {
                queryObject[key] = [existing, value];
            }
        } else {
            queryObject[key] = value;
        }
    }
    return queryObject;
}

export function stringify(obj){
    return $.param(obj);
}