import storejs from 'storejs'
let storage = {
    ...storejs,
    set: function (key, val, exp) {
        if (exp) storejs.set(key, { val, exp, time: new Date().getTime() })
        else storejs.set(key, val)
    },
    get: function (key) {
        if (storejs('?' + key)) {
            let info = storejs.get(key);
            if (storejs.get(key).exp) {
                if (new Date().getTime() - info.time - info.exp > 0) {
                    storejs.remove(key);
                    return undefined
                }
            }
        }
        return storejs.get(key);
    }
}

export default storage
