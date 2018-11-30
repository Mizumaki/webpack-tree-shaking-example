! function (e) {
  var n = {};

  function o(t) {
    if (n[t]) return n[t].exports;
    var r = n[t] = {
      i: t,
      l: !1,
      exports: {}
    };
    return e[t].call(r.exports, r, r.exports, o), r.l = !0, r.exports
  }
  o.m = e, o.c = n, o.d = function (e, n, t) {
    o.o(e, n) || Object.defineProperty(e, n, {
      enumerable: !0,
      get: t
    })
  }, o.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    })
  }, o.t = function (e, n) {
    if (1 & n && (e = o(e)), 8 & n) return e;
    if (4 & n && "object" == typeof e && e && e.__esModule) return e;
    var t = Object.create(null);
    if (o.r(t), Object.defineProperty(t, "default", {
        enumerable: !0,
        value: e
      }), 2 & n && "string" != typeof e)
      for (var r in e) o.d(t, r, function (n) {
        return e[n]
      }.bind(null, r));
    return t
  }, o.n = function (e) {
    var n = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return o.d(n, "a", n), n
  }, o.o = function (e, n) {
    return Object.prototype.hasOwnProperty.call(e, n)
  }, o.p = "", o(o.s = 0)
}([function (e, n, o) {
  "use strict";
  o.r(n);
  var t = {};
  o.r(t), o.d(t, "all3A", function () {
    return l
  }), o.d(t, "all3B", function () {
    return u
  });
  var r = function () {
      return console.log("soloA")
    },
    l = function () {
      return console.log("all3A")
    },
    u = function () {
      return console.log("all3B")
    },
    c = function () {
      return console.log("all4A")
    },
    f = function () {
      return console.log("objectA")
    },
    i = function () {
      return console.log("object2A")
    };
  r(), console.log("allA"), console.log("all2A"), r(), t.all3A(), c(), f(), i(), console.log("foo")
}]);