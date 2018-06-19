export const cookies = {
        setCookie: function(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        },

        getCookie: function(name) {
            if (0 < document.cookie.length) {
                var k = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                return (null === k)
                    ? ''
                    : k[2];
            }
            return null;
        }
    },
    // 0: sessionStorage 1: localStorage
    localCache = {
        ss: window.sessionStorage,
        ls: window.localStorage,

        getItem(key, type = 0) {
            try {
                return JSON.parse(this[
                    type
                        ? 'ls'
                        : 'ss'
                ].getItem(key))
            } catch (err) {
                return null
            }
        },
        setItem(key, val, type = 0) {
            this[
                type
                    ? 'ls'
                    : 'ss'
            ].setItem(key, JSON.stringify(val));
            return this;
        },
        clear(type = 0) {
            this[
                type
                    ? 'ls'
                    : 'ss'
            ].clear()
        },
        keys(type = 0) {
            return this[
                type
                    ? 'ls'
                    : 'ss'
            ].keys()
        },
        removeItem(key, type = 0) {
            const data = this.getItem(key);
            this[
                type
                    ? 'ls'
                    : 'ss'
            ].removeItem(key);
            return data;
        }
    }
