var OPRF = (function (t) {
    var r = {};
    function o(e) {
        if (r[e]) return r[e].exports;
        var n = (r[e] = { i: e, l: !1, exports: {} });
        return t[e].call(n.exports, n, n.exports, o), (n.l = !0), n.exports;
    }
    return (
        (o.m = t),
        (o.c = r),
        (o.d = function (t, r, e) {
            o.o(t, r) ||
                Object.defineProperty(t, r, { enumerable: !0, get: e });
        }),
        (o.r = function (t) {
            "undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module",
                }),
                Object.defineProperty(t, "__esModule", { value: !0 });
        }),
        (o.t = function (t, r) {
            if ((1 & r && (t = o(t)), 8 & r)) return t;
            if (4 & r && "object" == typeof t && t && t.__esModule) return t;
            var e = Object.create(null);
            if (
                (o.r(e),
                Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: t,
                }),
                2 & r && "string" != typeof t)
            )
                for (var n in t)
                    o.d(
                        e,
                        n,
                        function (r) {
                            return t[r];
                        }.bind(null, n)
                    );
            return e;
        }),
        (o.n = function (t) {
            var r =
                t && t.__esModule
                    ? function () {
                          return t.default;
                      }
                    : function () {
                          return t;
                      };
            return o.d(r, "a", r), r;
        }),
        (o.o = function (t, r) {
            return Object.prototype.hasOwnProperty.call(t, r);
        }),
        (o.p = ""),
        o((o.s = 0))
    );
})([
    function (t, r, o) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
            (r.OPRFSlim = void 0);
        var e = (function () {
            function t(t) {
                (this.ready = null),
                    (this.sodium = null),
                    (this.ready = t.ready),
                    (this.sodium = t);
            }
            return (
                (t.prototype.hashToPoint = function (t) {
                    var r = this.sodium.crypto_generichash(
                        this.sodium.crypto_core_ristretto255_HASHBYTES,
                        this.sodium.from_string(t)
                    );
                    return this.sodium.crypto_core_ristretto255_from_hash(r);
                }),
                (t.prototype.generateRandomScalar = function () {
                    return this.sodium.crypto_core_ristretto255_scalar_random();
                }),
                (t.prototype.maskInput = function (t) {
                    if (t.length <= 0) throw new Error("Empty input string.");
                    var r = this.hashToPoint(t);
                    return this.maskPoint(r);
                }),
                (t.prototype.addPoints = function (t, r) {
                    return this.sodium.crypto_core_ristretto255_add(t, r);
                }),
                (t.prototype.subtractPoints = function (t, r) {
                    return this.sodium.crypto_core_ristretto255_sub(t, r);
                }),
                (t.prototype.maskPoint = function (t) {
                    var r = this.generateRandomScalar();
                    return { point: this.scalarMult(t, r), mask: r };
                }),
                (t.prototype.unmaskPoint = function (t, r) {
                    var o =
                        this.sodium.crypto_core_ristretto255_scalar_invert(r);
                    return this.scalarMult(t, o);
                }),
                (t.prototype.scalarMult = function (t, r) {
                    if (!this.isValidPoint(t))
                        throw new Error(
                            "Input is not a valid Ristretto255 point."
                        );
                    return this.sodium.crypto_scalarmult_ristretto255(r, t);
                }),
                (t.prototype.isValidPoint = function (t) {
                    return this.sodium.crypto_core_ristretto255_is_valid_point(
                        t
                    );
                }),
                (t.prototype.encodePoint = function (t, r) {
                    var o = "ASCII" === r ? 1 : 2;
                    if (t.length % o != 0)
                        throw new Error(
                            "point size does not align with encoding unit size, please use ASCII encoding!"
                        );
                    for (var e = [], n = 0; n < t.length; n += o)
                        (e[n] = "ASCII" === r ? t[n] : t[n] | (t[n + 1] << 8)),
                            (e[n] = String.fromCharCode(e[n]));
                    return e.join("");
                }),
                (t.prototype.decodePoint = function (t, r) {
                    for (var o = [], e = 0; e < t.length; e++) {
                        var n = t.charCodeAt(e),
                            i = [];
                        i.push(255 & n),
                            "ASCII" !== r && i.push(n >> 8),
                            o.push.apply(o, i);
                    }
                    return Uint8Array.from(o);
                }),
                t
            );
        })();
        r.OPRFSlim = e;
    },
]).OPRFSlim;
module.exports = OPRF;
