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

        sStorage = {
                ss: window.sessionStorage,
                getItem(key) {
                        try {
                                return JSON.parse(this.ss.getItem(key))
                        } catch (err) {
                                return null
                        }
                },
                setItem(key, val) {
                        this.ss.setItem(key, JSON.stringify(val));
                        return this;
                },
                clear() {
                        this.ss.clear()
                },
                keys() {
                        return this.ss.keys()
                },
                removeItem(key) {
                        const data = this.getItem(key);
                        this.ss.removeItem(key);
                        return data;
                }
        }
