function preventGoingBack() {
    window.onbeforeunload = function(e) {
        var t = "Are you sure you want to leave? Data you have entered won't be saved";
        return e.returnValue = t, t
    }
}

function setupDeleteDeviceParent() {
    $(".deviceparent > .delete").click(function() {
        var e = $(".deviceparent").length;
        e > 2 && $(this).closest(".deviceparent").remove()
    })
}

function addDeviceParent(e) {
    preventGoingBack();
    var t = $(".screenshotparent:first").clone();
    $(".screenshotparent:last").before(t), t.find("img.screenshotholder").removeAttr("src"), t.find("p.textparent").text("Click to edit this text"), "undefined" != typeof e && t.find("img.screenshotholder").attr("src", e), dragAndDrop(), $(".deletebutton").click(function() {
        $(".screenshotparent:not(.add)").length > 1 && $(this).closest(".screenshotparent").remove()
    }), $("label.filelabel input").off("change"), $("label.filelabel input").change(fileInputChange)
}

function dragAndDrop() {
    $(".screenshotparent").unbind("drag dragstart dragend dragover dragenter dragleave drop"), $(document).on("drag dragstart dragend dragover dragenter dragleave drop", function(e) {
        e.preventDefault(), e.stopPropagation()
    }), $(".screenshotparent").on("dragover dragenter", function() {
        $(this).addClass("dragover")
    }).on("dragleave dragend drop", function() {
        $(this).removeClass("dragover")
    }).on("drop", function(e) {
        addImages(e.originalEvent.dataTransfer.files, $(this))
    })
}

function addImages(e, t) {
    preventGoingBack(), $(e).each(function(e, n) {
        var r = new FileReader;
        // r.addEventListener("load", function(n) {
        //     var r = n.target.result;
        //     0 !== e || t.hasClass("add") ? addDeviceParent(r) : t.find("img.screenshotholder").attr("src", r)
        // }, !1), r.readAsDataURL(n)
        var formData = new FormData();
        formData.append("userfile", n);
        $.ajax({
            url:"/upload/screenshot",
            data:formData,
            method:"POST",
            success:function(data){
              alert("saved");
              0 !== e || t.hasClass("add") ? addDeviceParent(r) : t.find("img.screenshotholder").attr("src", "/uploaded/"+data.filename)
            },
            processData: false,
            contentType: false

          });
    })
}

function fileInputChange() {
    addImages(this.files, $(this).closest(".screenshotparent"))
}

function hideAllToolbars() {
    $("#background1").addClass("hidden"), $("#backgroundcolor1").addClass("hidden"), $("#backgroundcolor2").addClass("hidden"), $("#backgroundcolor3").addClass("hidden"), $("#devicelist").addClass("hidden"), $("#fontparent").addClass("hidden"), $("#layoutparent").addClass("hidden"), $("#layoutsliderparent").addClass("hidden")
}

function escClick() {
    hideAllToolbars(), $("#mainmenu > span.selected").removeClass("selected"), $("#aboutwrapper").addClass("hidden"), $("#aboutbackground").addClass("hidden")
}

function aClick() {
    console.log("a")
}

function sClick() {
    console.log("s")
}

function dClick() {
    console.log("d")
}

function fClick() {
    console.log("f")
}

function toDataUrl(e, t, n) {
    void 0 === e && t("");
    var r = new Image;
    r.crossOrigin = "Anonymous", r.onload = function() {
        var e = document.createElement("CANVAS"),
            r = e.getContext("2d"),
            i;
        e.height = this.height, e.width = this.width, r.drawImage(this, 0, 0), i = e.toDataURL(n), t(i)
    }, r.src = e, (r.complete || void 0 === r.complete) && (r.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", r.src = e)
}

function takeScreenshots(e, t) {
    toDataUrl($("img.deviceholder").attr("src"), function(n) {
        var r = $("img.deviceholder").attr("src");
        $("img.deviceholder").attr("src", n), screenshotOneByOne(e, [], function(e) {
            t(e), void 0 !== r && $("img.deviceholder").attr("src", r)
        })
    })
}

function screenshotOneByOne(e, t, n) {
    var r = e[0];
    e.splice(0, 1), screenshotDiv(r, function(r) {
        var i = document.createElement("img");
        $(i).attr("src", r), t.push(i), e.length > 0 ? screenshotOneByOne(e, t, n) : n(t)
    })
}

function screenshotDiv(e, t) {
    const n = $(e),
        r = n.height(),
        i = n.width(),
        o = r > i,
        a = Math.max(r, i) / Math.min(r, i),
        s = Math.abs(a - 16 / 9) < .1,
        c = s ? 2208 : 2732,
        u = s ? 1242 : 2048,
        l = o ? u : c,
        d = o ? c : u,
        h = l / i,
        f = d / r;
    var p = document.createElement("canvas"),
        m = p.getContext("2d");
    p.width = l, p.height = d, p.style.width = i + "px", p.style.height = r + "px", m.scale(h, f), n.css({
        position: "fixed",
        left: 0,
        top: 0,
        margin: 0,
        transform: "none",
        border: "0px solid transparent",
        transition: "all 0s linear",
        overflow: "visible"
    })/*, $(".instruction").css("display", "none"),$(e).find('div.deviceparent').attr("style","")*/ ,html2canvas(e, {
        canvas: p,
        logging: !1
    }).then(function(e) {
        n.css({
            position: "",
            left: "",
            top: "",
            margin: "",
            transform: "",
            border: "",
            transition: "",
            overflow: ""
        }), $(".instruction").css("display", ""), t(e.toDataURL())
    })
}

function moveDraggersToMiddle(e) {
    var t = $("div.selc div.deviceparent").position().top,
        n = $("div.selc div.deviceparent").height() / 2,
        r = $("div.selc p.textparent").position().top,
        i = $("div.selc p.textparent").height() / 2,
        o = t + n,
        a = r + i,
        s = parseInt($("#scaledragger").css("top"), 10);
    const c = $(".slider").offset().top,
        u = $(".slider").height(),
        l = $(".screenshotparent").offset().top,
        d = $(".dragger").height(),
        h = l - c - d / 2;
    o += h, a += h;
    const f = 0,
        p = u - d;
    o = Math.max(f, Math.min(p, o)), a = Math.max(f, Math.min(p, a)), s = e ? "50%" : Math.max(f, Math.min(p, s)), $("#devicedragger").css("top", o), $("#textdragger").css("top", a), $("#scaledragger").css("top", s)
}

function handle_mousedown(e) {
    function t(e) {
        var t = e.pageY - dragging.pageY;
        if (dragging.changeScale) {
            $(dragging.elem).offset({
                top: dragging.offset.top + t
            });
            var n = $(dragging.elem).position().top,
                r = $(dragging.elem).offsetParent().height(),
                i = r / 2,
                o = (r - n) / i,
                o = (1 + o) / 2;
                var currentTransformVal = dragging.elementsToEffect.css("transform").slice(7,dragging.elementsToEffect.css("transform").length-1).split(",");
                currentTransformVal[0] = o;
                currentTransformVal[3] = o;
                console.log(currentTransformVal);

            //     var newTransVal = ""; 
            // dragging.elementsToEffect.css("transform", "scale(" + o + ")");
             dragging.elementsToEffect.css("transform", "matrix(" + currentTransformVal+")");

            // console.log(o);
            // console.log(dragging.elementsToEffect.css("transform"))

        } else dragging.elementsToEffect.offset({
            top: dragging.elementsToEffectOffset.top + t
        });
        moveDraggersToMiddle(!1)
    }

    function n(e) {
        $("body").off("mousemove", t).off("mouseup", n)
    }
    dragging.pageY = e.pageY, dragging.offset = $(this).offset(), dragging.elem = this, dragging.changeScale = !1, "devicedragger" === dragging.elem.id ? dragging.elementsToEffect = $(".screenshotparent.selc > .deviceparent") : "textdragger" === dragging.elem.id ? dragging.elementsToEffect = $("div.selc  p.textparent") : "scaledragger" === dragging.elem.id && (dragging.elementsToEffect = $(".screenshotparent.selc > .deviceparent"), dragging.changeScale = !0), dragging.elementsToEffectOffset = $(dragging.elementsToEffect[0]).offset(), $("body").on("mouseup", n).on("mousemove", t)
}

function backToEditing() {
    $("#previewwrapper").fadeTo(500, 0, function() {
        $("#previewwrapper").css("pointer-events", "none"), $("#mainwrapper").fadeTo(500, 1)
    })
}! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var t;
        "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), t.html2canvas = e()
    }
}(function() {
    var e, t, n;
    return function e(t, n, r) {
        function i(a, s) {
            if (!n[a]) {
                if (!t[a]) {
                    var c = "function" == typeof require && require;
                    if (!s && c) return c(a, !0);
                    if (o) return o(a, !0);
                    var u = new Error("Cannot find module '" + a + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var l = n[a] = {
                    exports: {}
                };
                t[a][0].call(l.exports, function(e) {
                    var n = t[a][1][e];
                    return i(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[a].exports
        }
        for (var o = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
        return i
    }({
        1: [function(t, n, r) {
            (function(t) {
                ! function(i) {
                    function o(e) {
                        throw RangeError(R[e])
                    }

                    function a(e, t) {
                        for (var n = e.length; n--;) e[n] = t(e[n]);
                        return e
                    }

                    function s(e, t) {
                        return a(e.split(N), t).join(".")
                    }

                    function c(e) {
                        for (var t = [], n = 0, r = e.length, i, o; n < r;) i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < r ? (o = e.charCodeAt(n++), 56320 == (64512 & o) ? t.push(((1023 & i) << 10) + (1023 & o) + 65536) : (t.push(i), n--)) : t.push(i);
                        return t
                    }

                    function u(e) {
                        return a(e, function(e) {
                            var t = "";
                            return e > 65535 && (e -= 65536, t += z(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += z(e)
                        }).join("")
                    }

                    function l(e) {
                        return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : _
                    }

                    function d(e, t) {
                        return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
                    }

                    function h(e, t, n) {
                        var r = 0;
                        for (e = n ? L(e / T) : e >> 1, e += L(e / t); e > B * C >> 1; r += _) e = L(e / B);
                        return L(r + (B + 1) * e / (e + E))
                    }

                    function f(e) {
                        var t = [],
                            n = e.length,
                            r, i = 0,
                            a = A,
                            s = S,
                            c, d, f, p, m, g, v, y, b;
                        for (c = e.lastIndexOf(I), c < 0 && (c = 0), d = 0; d < c; ++d) e.charCodeAt(d) >= 128 && o("not-basic"), t.push(e.charCodeAt(d));
                        for (f = c > 0 ? c + 1 : 0; f < n;) {
                            for (p = i, m = 1, g = _; f >= n && o("invalid-input"), v = l(e.charCodeAt(f++)), (v >= _ || v > L((x - i) / m)) && o("overflow"), i += v * m, y = g <= s ? k : g >= s + C ? C : g - s, !(v < y); g += _) b = _ - y, m > L(x / b) && o("overflow"), m *= b;
                            r = t.length + 1, s = h(i - p, r, 0 == p), L(i / r) > x - a && o("overflow"), a += L(i / r), i %= r, t.splice(i++, 0, a)
                        }
                        return u(t)
                    }

                    function p(e) {
                        var t, n, r, i, a, s, u, l, f, p, m, g = [],
                            v, y, b, w;
                        for (e = c(e), v = e.length, t = A, n = 0, a = S, s = 0; s < v; ++s) m = e[s], m < 128 && g.push(z(m));
                        for (r = i = g.length, i && g.push(I); r < v;) {
                            for (u = x, s = 0; s < v; ++s) m = e[s], m >= t && m < u && (u = m);
                            for (y = r + 1, u - t > L((x - n) / y) && o("overflow"), n += (u - t) * y, t = u, s = 0; s < v; ++s)
                                if (m = e[s], m < t && ++n > x && o("overflow"), m == t) {
                                    for (l = n, f = _; p = f <= a ? k : f >= a + C ? C : f - a, !(l < p); f += _) w = l - p, b = _ - p, g.push(z(d(p + w % b, 0))), l = L(w / b);
                                    g.push(z(d(l, 0))), a = h(n, y, r == i), n = 0, ++r
                                }++n, ++t
                        }
                        return g.join("")
                    }

                    function m(e) {
                        return s(e, function(e) {
                            return O.test(e) ? f(e.slice(4).toLowerCase()) : e
                        })
                    }

                    function g(e) {
                        return s(e, function(e) {
                            return D.test(e) ? "xn--" + p(e) : e
                        })
                    }
                    var v = "object" == typeof r && r,
                        y = "object" == typeof n && n && n.exports == v && n,
                        b = "object" == typeof t && t;
                    b.global !== b && b.window !== b || (i = b);
                    var w, x = 2147483647,
                        _ = 36,
                        k = 1,
                        C = 26,
                        E = 38,
                        T = 700,
                        S = 72,
                        A = 128,
                        I = "-",
                        O = /^xn--/,
                        D = /[^ -~]/,
                        N = /\x2E|\u3002|\uFF0E|\uFF61/g,
                        R = {
                            overflow: "Overflow: input needs wider integers to process",
                            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                            "invalid-input": "Invalid input"
                        },
                        B = _ - k,
                        L = Math.floor,
                        z = String.fromCharCode,
                        P;
                    if (w = {
                            version: "1.2.4",
                            ucs2: {
                                decode: c,
                                encode: u
                            },
                            decode: f,
                            encode: p,
                            toASCII: g,
                            toUnicode: m
                        }, "function" == typeof e && "object" == typeof e.amd && e.amd) e("punycode", function() {
                        return w
                    });
                    else if (v && !v.nodeType)
                        if (y) y.exports = w;
                        else
                            for (P in w) w.hasOwnProperty(P) && (v[P] = w[P]);
                    else i.punycode = w
                }(this)
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        2: [function(e, t, n) {
            function r(e, t, n) {
                !e.defaultView || t === e.defaultView.pageXOffset && n === e.defaultView.pageYOffset || e.defaultView.scrollTo(t, n)
            }

            function i(e, t) {
                try {
                    t && (t.width = e.width, t.height = e.height, t.getContext("2d").putImageData(e.getContext("2d").getImageData(0, 0, e.width, e.height), 0, 0))
                } catch (t) {
                    s("Unable to copy canvas content from", e, t)
                }
            }

            function o(e, t) {
                for (var n = 3 === e.nodeType ? document.createTextNode(e.nodeValue) : e.cloneNode(!1), r = e.firstChild; r;) t !== !0 && 1 === r.nodeType && "SCRIPT" === r.nodeName || n.appendChild(o(r, t)), r = r.nextSibling;
                return 1 === e.nodeType && (n._scrollTop = e.scrollTop, n._scrollLeft = e.scrollLeft, "CANVAS" === e.nodeName ? i(e, n) : "TEXTAREA" !== e.nodeName && "SELECT" !== e.nodeName || (n.value = e.value)), n
            }

            function a(e) {
                if (1 === e.nodeType) {
                    e.scrollTop = e._scrollTop, e.scrollLeft = e._scrollLeft;
                    for (var t = e.firstChild; t;) a(t), t = t.nextSibling
                }
            }
            var s = e("./log");
            t.exports = function(e, t, n, i, s, c, u) {
                var l = o(e.documentElement, s.javascriptEnabled),
                    d = t.createElement("iframe");
                return d.className = "html2canvas-container", d.style.visibility = "hidden", d.style.position = "fixed", d.style.left = "-10000px", d.style.top = "0px", d.style.border = "0", d.width = n, d.height = i, d.scrolling = "no", t.body.appendChild(d), new Promise(function(t) {
                    var n = d.contentWindow.document;
                    d.contentWindow.onload = d.onload = function() {
                        var e = setInterval(function() {
                            n.body.childNodes.length > 0 && (a(n.documentElement), clearInterval(e), "view" === s.type && (d.contentWindow.scrollTo(c, u), !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) || d.contentWindow.scrollY === u && d.contentWindow.scrollX === c || (n.documentElement.style.top = -u + "px", n.documentElement.style.left = -c + "px", n.documentElement.style.position = "absolute")), t(d))
                        }, 50)
                    }, n.open(), n.write("<!DOCTYPE html><html></html>"), r(e, c, u), n.replaceChild(n.adoptNode(l), n.documentElement), n.close()
                })
            }
        }, {
            "./log": 13
        }],
        3: [function(e, t, n) {
            function r(e) {
                this.r = 0, this.g = 0, this.b = 0, this.a = null;
                var t = this.fromArray(e) || this.namedColor(e) || this.rgb(e) || this.rgba(e) || this.hex6(e) || this.hex3(e)
            }
            r.prototype.darken = function(e) {
                var t = 1 - e;
                return new r([Math.round(this.r * t), Math.round(this.g * t), Math.round(this.b * t), this.a])
            }, r.prototype.isTransparent = function() {
                return 0 === this.a
            }, r.prototype.isBlack = function() {
                return 0 === this.r && 0 === this.g && 0 === this.b
            }, r.prototype.fromArray = function(e) {
                return Array.isArray(e) && (this.r = Math.min(e[0], 255), this.g = Math.min(e[1], 255), this.b = Math.min(e[2], 255), e.length > 3 && (this.a = e[3])), Array.isArray(e)
            };
            var i = /^#([a-f0-9]{3})$/i;
            r.prototype.hex3 = function(e) {
                var t = null;
                return null !== (t = e.match(i)) && (this.r = parseInt(t[1][0] + t[1][0], 16), this.g = parseInt(t[1][1] + t[1][1], 16), this.b = parseInt(t[1][2] + t[1][2], 16)), null !== t
            };
            var o = /^#([a-f0-9]{6})$/i;
            r.prototype.hex6 = function(e) {
                var t = null;
                return null !== (t = e.match(o)) && (this.r = parseInt(t[1].substring(0, 2), 16), this.g = parseInt(t[1].substring(2, 4), 16), this.b = parseInt(t[1].substring(4, 6), 16)), null !== t
            };
            var a = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
            r.prototype.rgb = function(e) {
                var t = null;
                return null !== (t = e.match(a)) && (this.r = Number(t[1]), this.g = Number(t[2]), this.b = Number(t[3])), null !== t
            };
            var s = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;
            r.prototype.rgba = function(e) {
                var t = null;
                return null !== (t = e.match(s)) && (this.r = Number(t[1]), this.g = Number(t[2]), this.b = Number(t[3]), this.a = Number(t[4])), null !== t
            }, r.prototype.toString = function() {
                return null !== this.a && 1 !== this.a ? "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" : "rgb(" + [this.r, this.g, this.b].join(",") + ")"
            }, r.prototype.namedColor = function(e) {
                e = e.toLowerCase();
                var t = c[e];
                if (t) this.r = t[0], this.g = t[1], this.b = t[2];
                else if ("transparent" === e) return this.r = this.g = this.b = this.a = 0, !0;
                return !!t
            }, r.prototype.isColor = !0;
            var c = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                rebeccapurple: [102, 51, 153],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50]
            };
            t.exports = r
        }, {}],
        4: [function(t, n, r) {
            function i(e, t) {
                var n = k++;
                if (t = t || {}, t.logging && (v.options.logging = !0, v.options.start = Date.now()), t.async = "undefined" == typeof t.async || t.async, t.allowTaint = "undefined" != typeof t.allowTaint && t.allowTaint, t.removeContainer = "undefined" == typeof t.removeContainer || t.removeContainer, t.javascriptEnabled = "undefined" != typeof t.javascriptEnabled && t.javascriptEnabled, t.imageTimeout = "undefined" == typeof t.imageTimeout ? 1e4 : t.imageTimeout, t.renderer = "function" == typeof t.renderer ? t.renderer : f, t.strict = !!t.strict, "string" == typeof e) {
                    if ("string" != typeof t.proxy) return Promise.reject("Proxy must be used when rendering url");
                    var r = null != t.width ? t.width : window.innerWidth,
                        i = null != t.height ? t.height : window.innerHeight;
                    return w(d(e), t.proxy, document, r, i, t).then(function(e) {
                        return a(e.contentWindow.document.documentElement, e, t, r, i)
                    })
                }
                var s = (void 0 === e ? [document.documentElement] : e.length ? e : [e])[0];
                return s.setAttribute(_ + n, n), o(s.ownerDocument, t, s.ownerDocument.defaultView.innerWidth, s.ownerDocument.defaultView.innerHeight, n).then(function(e) {
                    return "function" == typeof t.onrendered && (v("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"), t.onrendered(e)), e
                })
            }

            function o(e, t, n, r, i) {
                return b(e, e, n, r, t, e.defaultView.pageXOffset, e.defaultView.pageYOffset).then(function(o) {
                    v("Document cloned");
                    var s = _ + i,
                        c = "[" + s + "='" + i + "']";
                    e.querySelector(c).removeAttribute(s);
                    var u = o.contentWindow,
                        l = u.document.querySelector(c),
                        d = "function" == typeof t.onclone ? Promise.resolve(t.onclone(u.document)) : Promise.resolve(!0);
                    return d.then(function() {
                        return a(l, o, t, n, r)
                    })
                })
            }

            function a(e, t, n, r, i) {
                var o = t.contentWindow,
                    a = new h(o.document),
                    d = new p(n, a),
                    f = x(e),
                    g = "view" === n.type ? r : u(o.document),
                    y = "view" === n.type ? i : l(o.document),
                    b = new n.renderer(g, y, d, n, document),
                    w = new m(e, b, a, d, n);
                return w.ready.then(function() {
                    v("Finished rendering");
                    var r;
                    return r = "view" === n.type ? c(b.canvas, {
                        width: b.canvas.width,
                        height: b.canvas.height,
                        top: 0,
                        left: 0,
                        x: 0,
                        y: 0
                    }) : e === o.document.body || e === o.document.documentElement || null != n.canvas ? b.canvas : c(b.canvas, {
                        width: null != n.width ? n.width : f.width,
                        height: null != n.height ? n.height : f.height,
                        top: f.top,
                        left: f.left,
                        x: 0,
                        y: 0
                    }), s(t, n), r
                })
            }

            function s(e, t) {
                t.removeContainer && (e.parentNode.removeChild(e), v("Cleaned up container"))
            }

            function c(e, t) {
                var n = document.createElement("canvas"),
                    r = Math.min(e.width - 1, Math.max(0, t.left)),
                    i = Math.min(e.width, Math.max(1, t.left + t.width)),
                    o = Math.min(e.height - 1, Math.max(0, t.top)),
                    a = Math.min(e.height, Math.max(1, t.top + t.height));
                n.width = t.width, n.height = t.height;
                var s = i - r,
                    c = a - o;
                return v("Cropping canvas at:", "left:", t.left, "top:", t.top, "width:", s, "height:", c), v("Resulting crop with width", t.width, "and height", t.height, "with x", r, "and y", o), n.getContext("2d").drawImage(e, r, o, s, c, t.x, t.y, s, c), n
            }

            function u(e) {
                return Math.max(Math.max(e.body.scrollWidth, e.documentElement.scrollWidth), Math.max(e.body.offsetWidth, e.documentElement.offsetWidth), Math.max(e.body.clientWidth, e.documentElement.clientWidth))
            }

            function l(e) {
                return Math.max(Math.max(e.body.scrollHeight, e.documentElement.scrollHeight), Math.max(e.body.offsetHeight, e.documentElement.offsetHeight), Math.max(e.body.clientHeight, e.documentElement.clientHeight))
            }

            function d(e) {
                var t = document.createElement("a");
                return t.href = e, t.href = t.href, t
            }
            var h = t("./support"),
                f = t("./renderers/canvas"),
                p = t("./imageloader"),
                m = t("./nodeparser"),
                g = t("./nodecontainer"),
                v = t("./log"),
                y = t("./utils"),
                b = t("./clone"),
                w = t("./proxy").loadUrlDocument,
                x = y.getBounds,
                _ = "data-html2canvas-node",
                k = 0;
            i.CanvasRenderer = f, i.NodeContainer = g, i.log = v, i.utils = y;
            var C = "undefined" == typeof document || "function" != typeof Object.create || "function" != typeof document.createElement("canvas").getContext ? function() {
                return Promise.reject("No canvas support")
            } : i;
            n.exports = C, "function" == typeof e && e.amd && e("html2canvas", [], function() {
                return C
            })
        }, {
            "./clone": 2,
            "./imageloader": 11,
            "./log": 13,
            "./nodecontainer": 14,
            "./nodeparser": 15,
            "./proxy": 16,
            "./renderers/canvas": 20,
            "./support": 22,
            "./utils": 26
        }],
        5: [function(e, t, n) {
            function r(e) {
                if (this.src = e, i("DummyImageContainer for", e), !this.promise || !this.image) {
                    i("Initiating DummyImageContainer"), r.prototype.image = new Image;
                    var t = this.image;
                    r.prototype.promise = new Promise(function(e, n) {
                        t.onload = e, t.onerror = n, t.src = o(), t.complete === !0 && e(t)
                    })
                }
            }
            var i = e("./log"),
                o = e("./utils").smallImage;
            t.exports = r
        }, {
            "./log": 13,
            "./utils": 26
        }],
        6: [function(e, t, n) {
            function r(e, t) {
                var n = document.createElement("div"),
                    r = document.createElement("img"),
                    o = document.createElement("span"),
                    a = "Hidden Text",
                    s, c;
                n.style.visibility = "hidden", n.style.fontFamily = e, n.style.fontSize = t, n.style.margin = 0, n.style.padding = 0, document.body.appendChild(n), r.src = i(), r.width = 1, r.height = 1, r.style.margin = 0, r.style.padding = 0, r.style.verticalAlign = "baseline", o.style.fontFamily = e, o.style.fontSize = t, o.style.margin = 0, o.style.padding = 0, o.appendChild(document.createTextNode(a)), n.appendChild(o), n.appendChild(r), s = r.offsetTop - o.offsetTop + 1, n.removeChild(o), n.appendChild(document.createTextNode(a)), n.style.lineHeight = "normal", r.style.verticalAlign = "super", c = r.offsetTop - n.offsetTop + 1, document.body.removeChild(n), this.baseline = s, this.lineWidth = 1, this.middle = c
            }
            var i = e("./utils").smallImage;
            t.exports = r
        }, {
            "./utils": 26
        }],
        7: [function(e, t, n) {
            function r() {
                this.data = {}
            }
            var i = e("./font");
            r.prototype.getMetrics = function(e, t) {
                return void 0 === this.data[e + "-" + t] && (this.data[e + "-" + t] = new i(e, t)), this.data[e + "-" + t]
            }, t.exports = r
        }, {
            "./font": 6
        }],
        8: [function(e, t, n) {
            function r(t, n, r) {
                this.image = null, this.src = t;
                var i = this,
                    a = o(t);
                this.promise = (n ? new Promise(function(e) {
                    "about:blank" === t.contentWindow.document.URL || null == t.contentWindow.document.documentElement ? t.contentWindow.onload = t.onload = function() {
                        e(t)
                    } : e(t)
                }) : this.proxyLoad(r.proxy, a, r)).then(function(t) {
                    var n = e("./core");
                    return n(t.contentWindow.document.documentElement, {
                        type: "view",
                        width: t.width,
                        height: t.height,
                        proxy: r.proxy,
                        javascriptEnabled: r.javascriptEnabled,
                        removeContainer: r.removeContainer,
                        allowTaint: r.allowTaint,
                        imageTimeout: r.imageTimeout / 2
                    })
                }).then(function(e) {
                    return i.image = e
                })
            }
            var i = e("./utils"),
                o = i.getBounds,
                a = e("./proxy").loadUrlDocument;
            r.prototype.proxyLoad = function(e, t, n) {
                var r = this.src;
                return a(r.src, e, r.ownerDocument, t.width, t.height, n)
            }, t.exports = r
        }, {
            "./core": 4,
            "./proxy": 16,
            "./utils": 26
        }],
        9: [function(e, t, n) {
            function r(e) {
                this.src = e.value, this.colorStops = [], this.type = null, this.x0 = .5, this.y0 = .5, this.x1 = .5, this.y1 = .5, this.promise = Promise.resolve(!0)
            }
            r.TYPES = {
                LINEAR: 1,
                RADIAL: 2
            }, r.REGEXP_COLORSTOP = /^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i, t.exports = r
        }, {}],
        10: [function(e, t, n) {
            function r(e, t) {
                this.src = e, this.image = new Image;
                var n = this;
                this.tainted = null, this.promise = new Promise(function(r, i) {
                    n.image.onload = r, n.image.onerror = i, t && (n.image.crossOrigin = "anonymous"), n.image.src = e, n.image.complete === !0 && r(n.image)
                })
            }
            t.exports = r
        }, {}],
        11: [function(e, t, n) {
            function r(e, t) {
                this.link = null, this.options = e, this.support = t, this.origin = this.getOrigin(window.location.href)
            }
            var i = e("./log"),
                o = e("./imagecontainer"),
                a = e("./dummyimagecontainer"),
                s = e("./proxyimagecontainer"),
                c = e("./framecontainer"),
                u = e("./svgcontainer"),
                l = e("./svgnodecontainer"),
                d = e("./lineargradientcontainer"),
                h = e("./webkitgradientcontainer"),
                f = e("./utils").bind;
            r.prototype.findImages = function(e) {
                var t = [];
                return e.reduce(function(e, t) {
                    switch (t.node.nodeName) {
                        case "IMG":
                            return e.concat([{
                                args: [t.node.src],
                                method: "url"
                            }]);
                        case "svg":
                        case "IFRAME":
                            return e.concat([{
                                args: [t.node],
                                method: t.node.nodeName
                            }])
                    }
                    return e
                }, []).forEach(this.addImage(t, this.loadImage), this), t
            }, r.prototype.findBackgroundImage = function(e, t) {
                return t.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(e, this.loadImage), this), e
            }, r.prototype.addImage = function(e, t) {
                return function(n) {
                    n.args.forEach(function(r) {
                        this.imageExists(e, r) || (e.splice(0, 0, t.call(this, n)), i("Added image #" + e.length, "string" == typeof r ? r.substring(0, 100) : r))
                    }, this)
                }
            }, r.prototype.hasImageBackground = function(e) {
                return "none" !== e.method
            }, r.prototype.loadImage = function(e) {
                if ("url" === e.method) {
                    var t = e.args[0];
                    return !this.isSVG(t) || this.support.svg || this.options.allowTaint ? t.match(/data:image\/.*;base64,/i) ? new o(t.replace(/url\(['"]{0,}|['"]{0,}\)$/gi, ""), !1) : this.isSameOrigin(t) || this.options.allowTaint === !0 || this.isSVG(t) ? new o(t, !1) : this.support.cors && !this.options.allowTaint && this.options.useCORS ? new o(t, !0) : this.options.proxy ? new s(t, this.options.proxy) : new a(t) : new u(t)
                }
                return "linear-gradient" === e.method ? new d(e) : "gradient" === e.method ? new h(e) : "svg" === e.method ? new l(e.args[0], this.support.svg) : "IFRAME" === e.method ? new c(e.args[0], this.isSameOrigin(e.args[0].src), this.options) : new a(e)
            }, r.prototype.isSVG = function(e) {
                return "svg" === e.substring(e.length - 3).toLowerCase() || u.prototype.isInline(e)
            }, r.prototype.imageExists = function(e, t) {
                return e.some(function(e) {
                    return e.src === t
                })
            }, r.prototype.isSameOrigin = function(e) {
                return this.getOrigin(e) === this.origin
            }, r.prototype.getOrigin = function(e) {
                var t = this.link || (this.link = document.createElement("a"));
                return t.href = e, t.href = t.href, t.protocol + t.hostname + t.port
            }, r.prototype.getPromise = function(e) {
                return this.timeout(e, this.options.imageTimeout).catch(function() {
                    var t = new a(e.src);
                    return t.promise.then(function(t) {
                        e.image = t
                    })
                })
            }, r.prototype.get = function(e) {
                var t = null;
                return this.images.some(function(n) {
                    return (t = n).src === e
                }) ? t : null
            }, r.prototype.fetch = function(e) {
                return this.images = e.reduce(f(this.findBackgroundImage, this), this.findImages(e)), this.images.forEach(function(e, t) {
                    e.promise.then(function() {
                        i("Succesfully loaded image #" + (t + 1), e)
                    }, function(n) {
                        i("Failed loading image #" + (t + 1), e, n)
                    })
                }), this.ready = Promise.all(this.images.map(this.getPromise, this)), i("Finished searching images"), this
            }, r.prototype.timeout = function(e, t) {
                var n, r = Promise.race([e.promise, new Promise(function(r, o) {
                    n = setTimeout(function() {
                        i("Timed out loading image", e), o(e)
                    }, t)
                })]).then(function(e) {
                    return clearTimeout(n), e
                });
                return r.catch(function() {
                    clearTimeout(n)
                }), r
            }, t.exports = r
        }, {
            "./dummyimagecontainer": 5,
            "./framecontainer": 8,
            "./imagecontainer": 10,
            "./lineargradientcontainer": 12,
            "./log": 13,
            "./proxyimagecontainer": 17,
            "./svgcontainer": 23,
            "./svgnodecontainer": 24,
            "./utils": 26,
            "./webkitgradientcontainer": 27
        }],
        12: [function(e, t, n) {
            function r(e) {
                i.apply(this, arguments), this.type = i.TYPES.LINEAR;
                var t = r.REGEXP_DIRECTION.test(e.args[0]) || !i.REGEXP_COLORSTOP.test(e.args[0]);
                t ? e.args[0].split(/\s+/).reverse().forEach(function(e, t) {
                    switch (e) {
                        case "left":
                            this.x0 = 0, this.x1 = 1;
                            break;
                        case "top":
                            this.y0 = 0, this.y1 = 1;
                            break;
                        case "right":
                            this.x0 = 1, this.x1 = 0;
                            break;
                        case "bottom":
                            this.y0 = 1, this.y1 = 0;
                            break;
                        case "to":
                            var n = this.y0,
                                r = this.x0;
                            this.y0 = this.y1, this.x0 = this.x1, this.x1 = r, this.y1 = n;
                            break;
                        case "center":
                            break;
                        default:
                            var i = .01 * parseFloat(e, 10);
                            if (isNaN(i)) break;
                            0 === t ? (this.y0 = i, this.y1 = 1 - this.y0) : (this.x0 = i, this.x1 = 1 - this.x0)
                    }
                }, this) : (this.y0 = 0, this.y1 = 1), this.colorStops = e.args.slice(t ? 1 : 0).map(function(e) {
                    var t = e.match(i.REGEXP_COLORSTOP),
                        n = +t[2],
                        r = 0 === n ? "%" : t[3];
                    return {
                        color: new o(t[1]),
                        stop: "%" === r ? n / 100 : null
                    }
                }), null === this.colorStops[0].stop && (this.colorStops[0].stop = 0), null === this.colorStops[this.colorStops.length - 1].stop && (this.colorStops[this.colorStops.length - 1].stop = 1), this.colorStops.forEach(function(e, t) {
                    null === e.stop && this.colorStops.slice(t).some(function(n, r) {
                        return null !== n.stop && (e.stop = (n.stop - this.colorStops[t - 1].stop) / (r + 1) + this.colorStops[t - 1].stop, !0)
                    }, this)
                }, this)
            }
            var i = e("./gradientcontainer"),
                o = e("./color");
            r.prototype = Object.create(i.prototype), r.REGEXP_DIRECTION = /^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i, t.exports = r
        }, {
            "./color": 3,
            "./gradientcontainer": 9
        }],
        13: [function(e, t, n) {
            var r = function() {
                r.options.logging && window.console && window.console.log && Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [Date.now() - r.options.start + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)))
            };
            r.options = {
                logging: !1
            }, t.exports = r
        }, {}],
        14: [function(e, t, n) {
            function r(e, t) {
                this.node = e, this.parent = t, this.stack = null, this.bounds = null, this.borders = null, this.clip = [], this.backgroundClip = [], this.offsetBounds = null, this.visible = null, this.computedStyles = null, this.colors = {}, this.styles = {}, this.backgroundImages = null, this.transformData = null, this.transformMatrix = null, this.isPseudoElement = !1, this.opacity = null
            }

            function i(e) {
                var t = e.options[e.selectedIndex || 0];
                return t ? t.text || "" : ""
            }

            function o(e) {
                if (e && "matrix" === e[1]) return e[2].split(",").map(function(e) {
                    return parseFloat(e.trim())
                });
                if (e && "matrix3d" === e[1]) {
                    var t = e[2].split(",").map(function(e) {
                        return parseFloat(e.trim())
                    });
                    return [t[0], t[1], t[4], t[5], t[12], t[13]]
                }
            }

            function a(e) {
                return e.toString().indexOf("%") !== -1
            }

            function s(e) {
                return e.replace("px", "")
            }

            function c(e) {
                return parseFloat(e)
            }
            var u = e("./color"),
                l = e("./utils"),
                d = l.getBounds,
                h = l.parseBackgrounds,
                f = l.offsetBounds;
            r.prototype.cloneTo = function(e) {
                e.visible = this.visible, e.borders = this.borders, e.bounds = this.bounds, e.clip = this.clip, e.backgroundClip = this.backgroundClip, e.computedStyles = this.computedStyles, e.styles = this.styles, e.backgroundImages = this.backgroundImages, e.opacity = this.opacity
            }, r.prototype.getOpacity = function() {
                return null === this.opacity ? this.opacity = this.cssFloat("opacity") : this.opacity
            }, r.prototype.assignStack = function(e) {
                this.stack = e, e.children.push(this)
            }, r.prototype.isElementVisible = function() {
                return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : "none" !== this.css("display") && "hidden" !== this.css("visibility") && !this.node.hasAttribute("data-html2canvas-ignore") && ("INPUT" !== this.node.nodeName || "hidden" !== this.node.getAttribute("type"))
            }, r.prototype.css = function(e) {
                return this.computedStyles || (this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null)), this.styles[e] || (this.styles[e] = this.computedStyles[e])
            }, r.prototype.prefixedCss = function(e) {
                var t = ["webkit", "moz", "ms", "o"],
                    n = this.css(e);
                return void 0 === n && t.some(function(t) {
                    return n = this.css(t + e.substr(0, 1).toUpperCase() + e.substr(1)), void 0 !== n
                }, this), void 0 === n ? null : n
            }, r.prototype.computedStyle = function(e) {
                return this.node.ownerDocument.defaultView.getComputedStyle(this.node, e)
            }, r.prototype.cssInt = function(e) {
                var t = parseInt(this.css(e), 10);
                return isNaN(t) ? 0 : t
            }, r.prototype.color = function(e) {
                return this.colors[e] || (this.colors[e] = new u(this.css(e)))
            }, r.prototype.cssFloat = function(e) {
                var t = parseFloat(this.css(e));
                return isNaN(t) ? 0 : t
            }, r.prototype.fontWeight = function() {
                var e = this.css("fontWeight");
                switch (parseInt(e, 10)) {
                    case 401:
                        e = "bold";
                        break;
                    case 400:
                        e = "normal"
                }
                return e
            }, r.prototype.parseClip = function() {
                var e = this.css("clip").match(this.CLIP);
                return e ? {
                    top: parseInt(e[1], 10),
                    right: parseInt(e[2], 10),
                    bottom: parseInt(e[3], 10),
                    left: parseInt(e[4], 10)
                } : null
            }, r.prototype.parseBackgroundImages = function() {
                return this.backgroundImages || (this.backgroundImages = h(this.css("backgroundImage")))
            }, r.prototype.cssList = function(e, t) {
                var n = (this.css(e) || "").split(",");
                return n = n[t || 0] || n[0] || "auto", n = n.trim().split(" "), 1 === n.length && (n = [n[0], a(n[0]) ? "auto" : n[0]]), n
            }, r.prototype.parseBackgroundSize = function(e, t, n) {
                var r = this.cssList("backgroundSize", n),
                    i, o;
                if (a(r[0])) i = e.width * parseFloat(r[0]) / 100;
                else {
                    if (/contain|cover/.test(r[0])) {
                        var s = e.width / e.height,
                            c = t.width / t.height;
                        return s < c ^ "contain" === r[0] ? {
                            width: e.height * c,
                            height: e.height
                        } : {
                            width: e.width,
                            height: e.width / c
                        }
                    }
                    i = parseInt(r[0], 10)
                }
                return o = "auto" === r[0] && "auto" === r[1] ? t.height : "auto" === r[1] ? i / t.width * t.height : a(r[1]) ? e.height * parseFloat(r[1]) / 100 : parseInt(r[1], 10), "auto" === r[0] && (i = o / t.height * t.width), {
                    width: i,
                    height: o
                }
            }, r.prototype.parseBackgroundPosition = function(e, t, n, r) {
                var i = this.cssList("backgroundPosition", n),
                    o, s;
                return o = a(i[0]) ? (e.width - (r || t).width) * (parseFloat(i[0]) / 100) : parseInt(i[0], 10), s = "auto" === i[1] ? o / t.width * t.height : a(i[1]) ? (e.height - (r || t).height) * parseFloat(i[1]) / 100 : parseInt(i[1], 10),
                    "auto" === i[0] && (o = s / t.height * t.width), {
                        left: o,
                        top: s
                    }
            }, r.prototype.parseBackgroundRepeat = function(e) {
                return this.cssList("backgroundRepeat", e)[0]
            }, r.prototype.parseTextShadows = function() {
                var e = this.css("textShadow"),
                    t = [];
                if (e && "none" !== e)
                    for (var n = e.match(this.TEXT_SHADOW_PROPERTY), r = 0; n && r < n.length; r++) {
                        var i = n[r].match(this.TEXT_SHADOW_VALUES);
                        t.push({
                            color: new u(i[0]),
                            offsetX: i[1] ? parseFloat(i[1].replace("px", "")) : 0,
                            offsetY: i[2] ? parseFloat(i[2].replace("px", "")) : 0,
                            blur: i[3] ? i[3].replace("px", "") : 0
                        })
                    }
                return t
            }, r.prototype.parseTransform = function() {
                if (!this.transformData)
                    if (this.hasTransform()) {
                        var e = this.parseBounds(),
                            t = this.prefixedCss("transformOrigin").split(" ").map(s).map(c);
                        t[0] += e.left, t[1] += e.top, this.transformData = {
                            origin: t,
                            matrix: this.parseTransformMatrix()
                        }
                    } else this.transformData = {
                        origin: [0, 0],
                        matrix: [1, 0, 0, 1, 0, 0]
                    };
                return this.transformData
            }, r.prototype.parseTransformMatrix = function() {
                if (!this.transformMatrix) {
                    var e = this.prefixedCss("transform"),
                        t = e ? o(e.match(this.MATRIX_PROPERTY)) : null;
                    this.transformMatrix = t ? t : [1, 0, 0, 1, 0, 0]
                }
                return this.transformMatrix
            }, r.prototype.parseBounds = function() {
                return this.bounds || (this.bounds = this.hasTransform() ? f(this.node) : d(this.node))
            }, r.prototype.hasTransform = function() {
                return "1,0,0,1,0,0" !== this.parseTransformMatrix().join(",") || this.parent && this.parent.hasTransform()
            }, r.prototype.getValue = function() {
                var e = this.node.value || "";
                return "SELECT" === this.node.tagName ? e = i(this.node) : "password" === this.node.type && (e = Array(e.length + 1).join("•")), 0 === e.length ? this.node.placeholder || "" : e
            }, r.prototype.MATRIX_PROPERTY = /(matrix|matrix3d)\((.+)\)/, r.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g, r.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g, r.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/, t.exports = r
        }, {
            "./color": 3,
            "./utils": 26
        }],
        15: [function(e, t, n) {
            function r(e, t, n, r, i) {
                M("Starting NodeParser"), this.renderer = t, this.options = i, this.range = null, this.support = n, this.renderQueue = [], this.stack = new V(!0, 1, e.ownerDocument, null);
                var o = new H(e, null);
                if (i.background && t.rectangle(0, 0, t.width, t.height, new G(i.background)), e === e.ownerDocument.documentElement) {
                    var a = new H(o.color("backgroundColor").isTransparent() ? e.ownerDocument.body : e.ownerDocument.documentElement, null);
                    t.rectangle(0, 0, t.width, t.height, a.color("backgroundColor"))
                }
                o.visibile = o.isElementVisible(), this.createPseudoHideStyles(e.ownerDocument), this.disableAnimations(e.ownerDocument), this.nodes = L([o].concat(this.getChildren(o)).filter(function(e) {
                    return e.visible = e.isElementVisible()
                }).map(this.getPseudoElements, this)), this.fontMetrics = new Z, M("Fetched nodes, total:", this.nodes.length), M("Calculate overflow clips"), this.calculateOverflowClips(), M("Start fetching images"), this.images = r.fetch(this.nodes.filter(S)), this.ready = this.images.ready.then(Y(function() {
                    return M("Images loaded, starting parsing"), M("Creating stacking contexts"), this.createStackingContexts(), M("Sorting stacking contexts"), this.sortStackingContexts(this.stack), this.parse(this.stack), M("Render queue created with " + this.renderQueue.length + " items"), new Promise(Y(function(e) {
                        i.async ? "function" == typeof i.async ? i.async.call(this, this.renderQueue, e) : this.renderQueue.length > 0 ? (this.renderIndex = 0, this.asyncRenderer(this.renderQueue, e)) : e() : (this.renderQueue.forEach(this.paint, this), e())
                    }, this))
                }, this))
            }

            function i(e) {
                return e.parent && e.parent.clip.length
            }

            function o(e) {
                return e.replace(/(\-[a-z])/g, function(e) {
                    return e.toUpperCase().replace("-", "")
                })
            }

            function a() {}

            function s(e, t, n, r) {
                return e.map(function(i, o) {
                    if (i.width > 0) {
                        var a = t.left,
                            s = t.top,
                            c = t.width,
                            u = t.height - e[2].width;
                        switch (o) {
                            case 0:
                                u = e[0].width, i.args = d({
                                    c1: [a, s],
                                    c2: [a + c, s],
                                    c3: [a + c - e[1].width, s + u],
                                    c4: [a + e[3].width, s + u]
                                }, r[0], r[1], n.topLeftOuter, n.topLeftInner, n.topRightOuter, n.topRightInner);
                                break;
                            case 1:
                                a = t.left + t.width - e[1].width, c = e[1].width, i.args = d({
                                    c1: [a + c, s],
                                    c2: [a + c, s + u + e[2].width],
                                    c3: [a, s + u],
                                    c4: [a, s + e[0].width]
                                }, r[1], r[2], n.topRightOuter, n.topRightInner, n.bottomRightOuter, n.bottomRightInner);
                                break;
                            case 2:
                                s = s + t.height - e[2].width, u = e[2].width, i.args = d({
                                    c1: [a + c, s + u],
                                    c2: [a, s + u],
                                    c3: [a + e[3].width, s],
                                    c4: [a + c - e[3].width, s]
                                }, r[2], r[3], n.bottomRightOuter, n.bottomRightInner, n.bottomLeftOuter, n.bottomLeftInner);
                                break;
                            case 3:
                                c = e[3].width, i.args = d({
                                    c1: [a, s + u + e[2].width],
                                    c2: [a, s],
                                    c3: [a + c, s + e[0].width],
                                    c4: [a + c, s + u]
                                }, r[3], r[0], n.bottomLeftOuter, n.bottomLeftInner, n.topLeftOuter, n.topLeftInner)
                        }
                    }
                    return i
                })
            }

            function c(e, t, n, r) {
                var i = 4 * ((Math.sqrt(2) - 1) / 3),
                    o = n * i,
                    a = r * i,
                    s = e + n,
                    c = t + r;
                return {
                    topLeft: l({
                        x: e,
                        y: c
                    }, {
                        x: e,
                        y: c - a
                    }, {
                        x: s - o,
                        y: t
                    }, {
                        x: s,
                        y: t
                    }),
                    topRight: l({
                        x: e,
                        y: t
                    }, {
                        x: e + o,
                        y: t
                    }, {
                        x: s,
                        y: c - a
                    }, {
                        x: s,
                        y: c
                    }),
                    bottomRight: l({
                        x: s,
                        y: t
                    }, {
                        x: s,
                        y: t + a
                    }, {
                        x: e + o,
                        y: c
                    }, {
                        x: e,
                        y: c
                    }),
                    bottomLeft: l({
                        x: s,
                        y: c
                    }, {
                        x: s - o,
                        y: c
                    }, {
                        x: e,
                        y: t + a
                    }, {
                        x: e,
                        y: t
                    })
                }
            }

            function u(e, t, n) {
                var r = e.left,
                    i = e.top,
                    o = e.width,
                    a = e.height,
                    s = t[0][0] < o / 2 ? t[0][0] : o / 2,
                    u = t[0][1] < a / 2 ? t[0][1] : a / 2,
                    l = t[1][0] < o / 2 ? t[1][0] : o / 2,
                    d = t[1][1] < a / 2 ? t[1][1] : a / 2,
                    h = t[2][0] < o / 2 ? t[2][0] : o / 2,
                    f = t[2][1] < a / 2 ? t[2][1] : a / 2,
                    p = t[3][0] < o / 2 ? t[3][0] : o / 2,
                    m = t[3][1] < a / 2 ? t[3][1] : a / 2,
                    g = o - l,
                    v = a - f,
                    y = o - h,
                    b = a - m;
                return {
                    topLeftOuter: c(r, i, s, u).topLeft.subdivide(.5),
                    topLeftInner: c(r + n[3].width, i + n[0].width, Math.max(0, s - n[3].width), Math.max(0, u - n[0].width)).topLeft.subdivide(.5),
                    topRightOuter: c(r + g, i, l, d).topRight.subdivide(.5),
                    topRightInner: c(r + Math.min(g, o + n[3].width), i + n[0].width, g > o + n[3].width ? 0 : l - n[3].width, d - n[0].width).topRight.subdivide(.5),
                    bottomRightOuter: c(r + y, i + v, h, f).bottomRight.subdivide(.5),
                    bottomRightInner: c(r + Math.min(y, o - n[3].width), i + Math.min(v, a + n[0].width), Math.max(0, h - n[1].width), f - n[2].width).bottomRight.subdivide(.5),
                    bottomLeftOuter: c(r, i + b, p, m).bottomLeft.subdivide(.5),
                    bottomLeftInner: c(r + n[3].width, i + b, Math.max(0, p - n[3].width), m - n[2].width).bottomLeft.subdivide(.5)
                }
            }

            function l(e, t, n, r) {
                var i = function(e, t, n) {
                    return {
                        x: e.x + (t.x - e.x) * n,
                        y: e.y + (t.y - e.y) * n
                    }
                };
                return {
                    start: e,
                    startControl: t,
                    endControl: n,
                    end: r,
                    subdivide: function(o) {
                        var a = i(e, t, o),
                            s = i(t, n, o),
                            c = i(n, r, o),
                            u = i(a, s, o),
                            d = i(s, c, o),
                            h = i(u, d, o);
                        return [l(e, a, u, h), l(h, d, c, r)]
                    },
                    curveTo: function(e) {
                        e.push(["bezierCurve", t.x, t.y, n.x, n.y, r.x, r.y])
                    },
                    curveToReversed: function(r) {
                        r.push(["bezierCurve", n.x, n.y, t.x, t.y, e.x, e.y])
                    }
                }
            }

            function d(e, t, n, r, i, o, a) {
                var s = [];
                return t[0] > 0 || t[1] > 0 ? (s.push(["line", r[1].start.x, r[1].start.y]), r[1].curveTo(s)) : s.push(["line", e.c1[0], e.c1[1]]), n[0] > 0 || n[1] > 0 ? (s.push(["line", o[0].start.x, o[0].start.y]), o[0].curveTo(s), s.push(["line", a[0].end.x, a[0].end.y]), a[0].curveToReversed(s)) : (s.push(["line", e.c2[0], e.c2[1]]), s.push(["line", e.c3[0], e.c3[1]])), t[0] > 0 || t[1] > 0 ? (s.push(["line", i[1].end.x, i[1].end.y]), i[1].curveToReversed(s)) : s.push(["line", e.c4[0], e.c4[1]]), s
            }

            function h(e, t, n, r, i, o, a) {
                t[0] > 0 || t[1] > 0 ? (e.push(["line", r[0].start.x, r[0].start.y]), r[0].curveTo(e), r[1].curveTo(e)) : e.push(["line", o, a]), (n[0] > 0 || n[1] > 0) && e.push(["line", i[0].start.x, i[0].start.y])
            }

            function f(e) {
                return e.cssInt("zIndex") < 0
            }

            function p(e) {
                return e.cssInt("zIndex") > 0
            }

            function m(e) {
                return 0 === e.cssInt("zIndex")
            }

            function g(e) {
                return ["inline", "inline-block", "inline-table"].indexOf(e.css("display")) !== -1
            }

            function v(e) {
                return e instanceof V
            }

            function y(e) {
                return e.node.data.trim().length > 0
            }

            function b(e) {
                return /^(normal|none|0px)$/.test(e.parent.css("letterSpacing"))
            }

            function w(e) {
                return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(t) {
                    var n = e.css("border" + t + "Radius"),
                        r = n.split(" ");
                    return r.length <= 1 && (r[1] = r[0]), r.map(N)
                })
            }

            function x(e) {
                return e.nodeType === Node.TEXT_NODE || e.nodeType === Node.ELEMENT_NODE
            }

            function _(e) {
                var t = e.css("position"),
                    n = ["absolute", "relative", "fixed"].indexOf(t) !== -1 ? e.css("zIndex") : "auto";
                return "auto" !== n
            }

            function k(e) {
                return "static" !== e.css("position")
            }

            function C(e) {
                return "none" !== e.css("float")
            }

            function E(e) {
                return ["inline-block", "inline-table"].indexOf(e.css("display")) !== -1
            }

            function T(e) {
                var t = this;
                return function() {
                    return !e.apply(t, arguments)
                }
            }

            function S(e) {
                return e.node.nodeType === Node.ELEMENT_NODE
            }

            function A(e) {
                return e.isPseudoElement === !0
            }

            function I(e) {
                return e.node.nodeType === Node.TEXT_NODE
            }

            function O(e) {
                return function(t, n) {
                    return t.cssInt("zIndex") + e.indexOf(t) / e.length - (n.cssInt("zIndex") + e.indexOf(n) / e.length)
                }
            }

            function D(e) {
                return e.getOpacity() < 1
            }

            function N(e) {
                return parseInt(e, 10)
            }

            function R(e) {
                return e.width
            }

            function B(e) {
                return e.node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(e.node.nodeName) === -1
            }

            function L(e) {
                return [].concat.apply([], e)
            }

            function z(e) {
                var t = e.substr(0, 1);
                return t === e.substr(e.length - 1) && t.match(/'|"/) ? e.substr(1, e.length - 2) : e
            }

            function P(e) {
                for (var t = [], n = 0, r = !1, i; e.length;) j(e[n]) === r ? (i = e.splice(0, n), i.length && t.push(W.ucs2.encode(i)), r = !r, n = 0) : n++, n >= e.length && (i = e.splice(0, n), i.length && t.push(W.ucs2.encode(i)));
                return t
            }

            function j(e) {
                return [32, 13, 10, 9, 45].indexOf(e) !== -1
            }

            function F(e) {
                return /[^\u0000-\u00ff]/.test(e)
            }
            var M = e("./log"),
                W = e("punycode"),
                H = e("./nodecontainer"),
                U = e("./textcontainer"),
                q = e("./pseudoelementcontainer"),
                Z = e("./fontmetrics"),
                G = e("./color"),
                V = e("./stackingcontext"),
                X = e("./utils"),
                Y = X.bind,
                K = X.getBounds,
                Q = X.parseBackgrounds,
                J = X.offsetBounds;
            r.prototype.calculateOverflowClips = function() {
                this.nodes.forEach(function(e) {
                    if (S(e)) {
                        A(e) && e.appendToDOM(), e.borders = this.parseBorders(e);
                        var t = "hidden" === e.css("overflow") ? [e.borders.clip] : [],
                            n = e.parseClip();
                        n && ["absolute", "fixed"].indexOf(e.css("position")) !== -1 && t.push([
                            ["rect", e.bounds.left + n.left, e.bounds.top + n.top, n.right - n.left, n.bottom - n.top]
                        ]), e.clip = i(e) ? e.parent.clip.concat(t) : t, e.backgroundClip = "hidden" !== e.css("overflow") ? e.clip.concat([e.borders.clip]) : e.clip, A(e) && e.cleanDOM()
                    } else I(e) && (e.clip = i(e) ? e.parent.clip : []);
                    A(e) || (e.bounds = null)
                }, this)
            }, r.prototype.asyncRenderer = function(e, t, n) {
                n = n || Date.now(), this.paint(e[this.renderIndex++]), e.length === this.renderIndex ? t() : n + 20 > Date.now() ? this.asyncRenderer(e, t, n) : setTimeout(Y(function() {
                    this.asyncRenderer(e, t)
                }, this), 0)
            }, r.prototype.createPseudoHideStyles = function(e) {
                this.createStyles(e, "." + q.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }.' + q.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }')
            }, r.prototype.disableAnimations = function(e) {
                this.createStyles(e, "* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}")
            }, r.prototype.createStyles = function(e, t) {
                var n = e.createElement("style");
                n.innerHTML = t, e.body.appendChild(n)
            }, r.prototype.getPseudoElements = function(e) {
                var t = [
                    [e]
                ];
                if (e.node.nodeType === Node.ELEMENT_NODE) {
                    var n = this.getPseudoElement(e, ":before"),
                        r = this.getPseudoElement(e, ":after");
                    n && t.push(n), r && t.push(r)
                }
                return L(t)
            }, r.prototype.getPseudoElement = function(e, t) {
                var n = e.computedStyle(t);
                if (!n || !n.content || "none" === n.content || "-moz-alt-content" === n.content || "none" === n.display) return null;
                for (var r = z(n.content), i = "url" === r.substr(0, 3), a = document.createElement(i ? "img" : "html2canvaspseudoelement"), s = new q(a, e, t), c = n.length - 1; c >= 0; c--) {
                    var u = o(n.item(c));
                    a.style[u] = n[u]
                }
                if (a.className = q.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + q.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER, i) return a.src = Q(r)[0].args[0], [s];
                var l = document.createTextNode(r);
                return a.appendChild(l), [s, new U(l, s)]
            }, r.prototype.getChildren = function(e) {
                return L([].filter.call(e.node.childNodes, x).map(function(t) {
                    var n = [t.nodeType === Node.TEXT_NODE ? new U(t, e) : new H(t, e)].filter(B);
                    return t.nodeType === Node.ELEMENT_NODE && n.length && "TEXTAREA" !== t.tagName ? n[0].isElementVisible() ? n.concat(this.getChildren(n[0])) : [] : n
                }, this))
            }, r.prototype.newStackingContext = function(e, t) {
                var n = new V(t, e.getOpacity(), e.node, e.parent);
                e.cloneTo(n);
                var r = t ? n.getParentStack(this) : n.parent.stack;
                r.contexts.push(n), e.stack = n
            }, r.prototype.createStackingContexts = function() {
                this.nodes.forEach(function(e) {
                    S(e) && (this.isRootElement(e) || D(e) || _(e) || this.isBodyWithTransparentRoot(e) || e.hasTransform()) ? this.newStackingContext(e, !0) : S(e) && (k(e) && m(e) || E(e) || C(e)) ? this.newStackingContext(e, !1) : e.assignStack(e.parent.stack)
                }, this)
            }, r.prototype.isBodyWithTransparentRoot = function(e) {
                return "BODY" === e.node.nodeName && e.parent.color("backgroundColor").isTransparent()
            }, r.prototype.isRootElement = function(e) {
                return null === e.parent
            }, r.prototype.sortStackingContexts = function(e) {
                e.contexts.sort(O(e.contexts.slice(0))), e.contexts.forEach(this.sortStackingContexts, this)
            }, r.prototype.parseTextBounds = function(e) {
                return function(t, n, r) {
                    if ("none" !== e.parent.css("textDecoration").substr(0, 4) || 0 !== t.trim().length) {
                        if (this.support.rangeBounds && !e.parent.hasTransform()) {
                            var i = r.slice(0, n).join("").length;
                            return this.getRangeBounds(e.node, i, t.length)
                        }
                        if (e.node && "string" == typeof e.node.data) {
                            var o = e.node.splitText(t.length),
                                a = this.getWrapperBounds(e.node, e.parent.hasTransform());
                            return e.node = o, a
                        }
                    } else this.support.rangeBounds && !e.parent.hasTransform() || (e.node = e.node.splitText(t.length));
                    return {}
                }
            }, r.prototype.getWrapperBounds = function(e, t) {
                var n = e.ownerDocument.createElement("html2canvaswrapper"),
                    r = e.parentNode,
                    i = e.cloneNode(!0);
                n.appendChild(e.cloneNode(!0)), r.replaceChild(n, e);
                var o = t ? J(n) : K(n);
                return r.replaceChild(i, n), o
            }, r.prototype.getRangeBounds = function(e, t, n) {
                var r = this.range || (this.range = e.ownerDocument.createRange());
                return r.setStart(e, t), r.setEnd(e, t + n), r.getBoundingClientRect()
            }, r.prototype.parse = function(e) {
                var t = e.contexts.filter(f),
                    n = e.children.filter(S),
                    r = n.filter(T(C)),
                    i = r.filter(T(k)).filter(T(g)),
                    o = n.filter(T(k)).filter(C),
                    s = r.filter(T(k)).filter(g),
                    c = e.contexts.concat(r.filter(k)).filter(m),
                    u = e.children.filter(I).filter(y),
                    l = e.contexts.filter(p);
                t.concat(i).concat(o).concat(s).concat(c).concat(u).concat(l).forEach(function(e) {
                    this.renderQueue.push(e), v(e) && (this.parse(e), this.renderQueue.push(new a))
                }, this)
            }, r.prototype.paint = function(e) {
                try {
                    e instanceof a ? this.renderer.ctx.restore() : I(e) ? (A(e.parent) && e.parent.appendToDOM(), this.paintText(e), A(e.parent) && e.parent.cleanDOM()) : this.paintNode(e)
                } catch (e) {
                    if (M(e), this.options.strict) throw e
                }
            }, r.prototype.paintNode = function(e) {
                v(e) && (this.renderer.setOpacity(e.opacity), this.renderer.ctx.save(), e.hasTransform() && this.renderer.setTransform(e.parseTransform())), "INPUT" === e.node.nodeName && "checkbox" === e.node.type ? this.paintCheckbox(e) : "INPUT" === e.node.nodeName && "radio" === e.node.type ? this.paintRadio(e) : this.paintElement(e)
            }, r.prototype.paintElement = function(e) {
                var t = e.parseBounds();
                this.renderer.clip(e.backgroundClip, function() {
                    this.renderer.renderBackground(e, t, e.borders.borders.map(R))
                }, this), this.renderer.clip(e.clip, function() {
                    this.renderer.renderBorders(e.borders.borders)
                }, this), this.renderer.clip(e.backgroundClip, function() {
                    switch (e.node.nodeName) {
                        case "svg":
                        case "IFRAME":
                            var n = this.images.get(e.node);
                            n ? this.renderer.renderImage(e, t, e.borders, n) : M("Error loading <" + e.node.nodeName + ">", e.node);
                            break;
                        case "IMG":
                            var r = this.images.get(e.node.src);
                            r ? this.renderer.renderImage(e, t, e.borders, r) : M("Error loading <img>", e.node.src);
                            break;
                        case "CANVAS":
                            this.renderer.renderImage(e, t, e.borders, {
                                image: e.node
                            });
                            break;
                        case "SELECT":
                        case "INPUT":
                        case "TEXTAREA":
                            this.paintFormValue(e)
                    }
                }, this)
            }, r.prototype.paintCheckbox = function(e) {
                var t = e.parseBounds(),
                    n = Math.min(t.width, t.height),
                    r = {
                        width: n - 1,
                        height: n - 1,
                        top: t.top,
                        left: t.left
                    },
                    i = [3, 3],
                    o = [i, i, i, i],
                    a = [1, 1, 1, 1].map(function(e) {
                        return {
                            color: new G("#A5A5A5"),
                            width: e
                        }
                    }),
                    c = u(r, o, a);
                this.renderer.clip(e.backgroundClip, function() {
                    this.renderer.rectangle(r.left + 1, r.top + 1, r.width - 2, r.height - 2, new G("#DEDEDE")), this.renderer.renderBorders(s(a, r, c, o)), e.node.checked && (this.renderer.font(new G("#424242"), "normal", "normal", "bold", n - 3 + "px", "arial"), this.renderer.text("✔", r.left + n / 6, r.top + n - 1))
                }, this)
            }, r.prototype.paintRadio = function(e) {
                var t = e.parseBounds(),
                    n = Math.min(t.width, t.height) - 2;
                this.renderer.clip(e.backgroundClip, function() {
                    this.renderer.circleStroke(t.left + 1, t.top + 1, n, new G("#DEDEDE"), 1, new G("#A5A5A5")), e.node.checked && this.renderer.circle(Math.ceil(t.left + n / 4) + 1, Math.ceil(t.top + n / 4) + 1, Math.floor(n / 2), new G("#424242"))
                }, this)
            }, r.prototype.paintFormValue = function(e) {
                var t = e.getValue();
                if (t.length > 0) {
                    var n = e.node.ownerDocument,
                        r = n.createElement("html2canvaswrapper"),
                        i = ["lineHeight", "textAlign", "fontFamily", "fontWeight", "fontSize", "color", "paddingLeft", "paddingTop", "paddingRight", "paddingBottom", "width", "height", "borderLeftStyle", "borderTopStyle", "borderLeftWidth", "borderTopWidth", "boxSizing", "whiteSpace", "wordWrap"];
                    i.forEach(function(t) {
                        try {
                            r.style[t] = e.css(t)
                        } catch (e) {
                            M("html2canvas: Parse: Exception caught in renderFormValue: " + e.message)
                        }
                    });
                    var o = e.parseBounds();
                    r.style.position = "fixed", r.style.left = o.left + "px", r.style.top = o.top + "px", r.textContent = t, n.body.appendChild(r), this.paintText(new U(r.firstChild, e)), n.body.removeChild(r)
                }
            }, r.prototype.paintText = function(e) {
                e.applyTextTransform();
                var t = W.ucs2.decode(e.node.data),
                    n = this.options.letterRendering && !b(e) || F(e.node.data) ? t.map(function(e) {
                        return W.ucs2.encode([e])
                    }) : P(t),
                    r = e.parent.fontWeight(),
                    i = e.parent.css("fontSize"),
                    o = e.parent.css("fontFamily"),
                    a = e.parent.parseTextShadows();
                this.renderer.font(e.parent.color("color"), e.parent.css("fontStyle"), e.parent.css("fontVariant"), r, i, o), a.length ? this.renderer.fontShadow(a[0].color, a[0].offsetX, a[0].offsetY, a[0].blur) : this.renderer.clearShadow(), this.renderer.clip(e.parent.clip, function() {
                    n.map(this.parseTextBounds(e), this).forEach(function(t, r) {
                        t && (this.renderer.text(n[r], t.left, t.bottom), this.renderTextDecoration(e.parent, t, this.fontMetrics.getMetrics(o, i)))
                    }, this)
                }, this)
            }, r.prototype.renderTextDecoration = function(e, t, n) {
                switch (e.css("textDecoration").split(" ")[0]) {
                    case "underline":
                        this.renderer.rectangle(t.left, Math.round(t.top + n.baseline + n.lineWidth), t.width, 1, e.color("color"));
                        break;
                    case "overline":
                        this.renderer.rectangle(t.left, Math.round(t.top), t.width, 1, e.color("color"));
                        break;
                    case "line-through":
                        this.renderer.rectangle(t.left, Math.ceil(t.top + n.middle + n.lineWidth), t.width, 1, e.color("color"))
                }
            };
            var ee = {
                inset: [
                    ["darken", .6],
                    ["darken", .1],
                    ["darken", .1],
                    ["darken", .6]
                ]
            };
            r.prototype.parseBorders = function(e) {
                var t = e.parseBounds(),
                    n = w(e),
                    r = ["Top", "Right", "Bottom", "Left"].map(function(t, n) {
                        var r = e.css("border" + t + "Style"),
                            i = e.color("border" + t + "Color");
                        "inset" === r && i.isBlack() && (i = new G([255, 255, 255, i.a]));
                        var o = ee[r] ? ee[r][n] : null;
                        return {
                            width: e.cssInt("border" + t + "Width"),
                            color: o ? i[o[0]](o[1]) : i,
                            args: null
                        }
                    }),
                    i = u(t, n, r);
                return {
                    clip: this.parseBackgroundClip(e, i, r, n, t),
                    borders: s(r, t, i, n)
                }
            }, r.prototype.parseBackgroundClip = function(e, t, n, r, i) {
                var o = e.css("backgroundClip"),
                    a = [];
                switch (o) {
                    case "content-box":
                    case "padding-box":
                        h(a, r[0], r[1], t.topLeftInner, t.topRightInner, i.left + n[3].width, i.top + n[0].width), h(a, r[1], r[2], t.topRightInner, t.bottomRightInner, i.left + i.width - n[1].width, i.top + n[0].width), h(a, r[2], r[3], t.bottomRightInner, t.bottomLeftInner, i.left + i.width - n[1].width, i.top + i.height - n[2].width), h(a, r[3], r[0], t.bottomLeftInner, t.topLeftInner, i.left + n[3].width, i.top + i.height - n[2].width);
                        break;
                    default:
                        h(a, r[0], r[1], t.topLeftOuter, t.topRightOuter, i.left, i.top), h(a, r[1], r[2], t.topRightOuter, t.bottomRightOuter, i.left + i.width, i.top), h(a, r[2], r[3], t.bottomRightOuter, t.bottomLeftOuter, i.left + i.width, i.top + i.height), h(a, r[3], r[0], t.bottomLeftOuter, t.topLeftOuter, i.left, i.top + i.height)
                }
                return a
            }, t.exports = r
        }, {
            "./color": 3,
            "./fontmetrics": 7,
            "./log": 13,
            "./nodecontainer": 14,
            "./pseudoelementcontainer": 18,
            "./stackingcontext": 21,
            "./textcontainer": 25,
            "./utils": 26,
            punycode: 1
        }],
        16: [function(e, t, n) {
            function r(e, t, n) {
                var r = "withCredentials" in new XMLHttpRequest;
                if (!t) return Promise.reject("No proxy configured");
                var i = a(r),
                    c = s(t, e, i);
                return r ? l(c) : o(n, c, i).then(function(e) {
                    return p(e.content)
                })
            }

            function i(e, t, n) {
                var r = "crossOrigin" in new Image,
                    i = a(r),
                    c = s(t, e, i);
                return r ? Promise.resolve(c) : o(n, c, i).then(function(e) {
                    return "data:" + e.type + ";base64," + e.content
                })
            }

            function o(e, t, n) {
                return new Promise(function(r, i) {
                    var o = e.createElement("script"),
                        a = function() {
                            delete window.html2canvas.proxy[n], e.body.removeChild(o)
                        };
                    window.html2canvas.proxy[n] = function(e) {
                        a(), r(e)
                    }, o.src = t, o.onerror = function(e) {
                        a(), i(e)
                    }, e.body.appendChild(o)
                })
            }

            function a(e) {
                return e ? "" : "html2canvas_" + Date.now() + "_" + ++m + "_" + Math.round(1e5 * Math.random())
            }

            function s(e, t, n) {
                return e + "?url=" + encodeURIComponent(t) + (n.length ? "&callback=html2canvas.proxy." + n : "")
            }

            function c(e) {
                return function(t) {
                    var n = new DOMParser,
                        r;
                    try {
                        r = n.parseFromString(t, "text/html")
                    } catch (e) {
                        h("DOMParser not supported, falling back to createHTMLDocument"), r = document.implementation.createHTMLDocument("");
                        try {
                            r.open(), r.write(t), r.close()
                        } catch (e) {
                            h("createHTMLDocument write not supported, falling back to document.body.innerHTML"), r.body.innerHTML = t
                        }
                    }
                    var i = r.querySelector("base");
                    if (!i || !i.href.host) {
                        var o = r.createElement("base");
                        o.href = e, r.head.insertBefore(o, r.head.firstChild)
                    }
                    return r
                }
            }

            function u(e, t, n, i, o, a) {
                return new r(e, t, window.document).then(c(e)).then(function(e) {
                    return f(e, n, i, o, a, 0, 0)
                })
            }
            var l = e("./xhr"),
                d = e("./utils"),
                h = e("./log"),
                f = e("./clone"),
                p = d.decode64,
                m = 0;
            n.Proxy = r, n.ProxyURL = i, n.loadUrlDocument = u
        }, {
            "./clone": 2,
            "./log": 13,
            "./utils": 26,
            "./xhr": 28
        }],
        17: [function(e, t, n) {
            function r(e, t) {
                var n = document.createElement("a");
                n.href = e, e = n.href, this.src = e, this.image = new Image;
                var r = this;
                this.promise = new Promise(function(n, o) {
                    r.image.crossOrigin = "Anonymous", r.image.onload = n, r.image.onerror = o, new i(e, t, document).then(function(e) {
                        r.image.src = e
                    }).catch(o)
                })
            }
            var i = e("./proxy").ProxyURL;
            t.exports = r
        }, {
            "./proxy": 16
        }],
        18: [function(e, t, n) {
            function r(e, t, n) {
                i.call(this, e, t), this.isPseudoElement = !0, this.before = ":before" === n
            }
            var i = e("./nodecontainer");
            r.prototype.cloneTo = function(e) {
                r.prototype.cloneTo.call(this, e), e.isPseudoElement = !0, e.before = this.before
            }, r.prototype = Object.create(i.prototype), r.prototype.appendToDOM = function() {
                this.before ? this.parent.node.insertBefore(this.node, this.parent.node.firstChild) : this.parent.node.appendChild(this.node), this.parent.node.className += " " + this.getHideClass()
            }, r.prototype.cleanDOM = function() {
                this.node.parentNode.removeChild(this.node), this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "")
            }, r.prototype.getHideClass = function() {
                return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")]
            }, r.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before", r.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after", t.exports = r
        }, {
            "./nodecontainer": 14
        }],
        19: [function(e, t, n) {
            function r(e, t, n, r, i) {
                this.width = e, this.height = t, this.images = n, this.options = r, this.document = i
            }
            var i = e("./log");
            r.prototype.renderImage = function(e, t, n, r) {
                var i = e.cssInt("paddingLeft"),
                    o = e.cssInt("paddingTop"),
                    a = e.cssInt("paddingRight"),
                    s = e.cssInt("paddingBottom"),
                    c = n.borders,
                    u = t.width - (c[1].width + c[3].width + i + a),
                    l = t.height - (c[0].width + c[2].width + o + s);
                this.drawImage(r, 0, 0, r.image.width || u, r.image.height || l, t.left + i + c[3].width, t.top + o + c[0].width, u, l)
            }, r.prototype.renderBackground = function(e, t, n) {
                t.height > 0 && t.width > 0 && (this.renderBackgroundColor(e, t), this.renderBackgroundImage(e, t, n))
            }, r.prototype.renderBackgroundColor = function(e, t) {
                var n = e.color("backgroundColor");
                n.isTransparent() || this.rectangle(t.left, t.top, t.width, t.height, n)
            }, r.prototype.renderBorders = function(e) {
                e.forEach(this.renderBorder, this)
            }, r.prototype.renderBorder = function(e) {
                e.color.isTransparent() || null === e.args || this.drawShape(e.args, e.color)
            }, r.prototype.renderBackgroundImage = function(e, t, n) {
                var r = e.parseBackgroundImages();
                r.reverse().forEach(function(r, o, a) {
                    switch (r.method) {
                        case "url":
                            var s = this.images.get(r.args[0]);
                            s ? this.renderBackgroundRepeating(e, t, s, a.length - (o + 1), n) : i("Error loading background-image", r.args[0]);
                            break;
                        case "linear-gradient":
                        case "gradient":
                            var c = this.images.get(r.value);
                            c ? this.renderBackgroundGradient(c, t, n) : i("Error loading background-image", r.args[0]);
                            break;
                        case "none":
                            break;
                        default:
                            i("Unknown background-image type", r.args[0])
                    }
                }, this)
            }, r.prototype.renderBackgroundRepeating = function(e, t, n, r, i) {
                var o = e.parseBackgroundSize(t, n.image, r),
                    a = e.parseBackgroundPosition(t, n.image, r, o),
                    s = e.parseBackgroundRepeat(r);
                switch (s) {
                    case "repeat-x":
                    case "repeat no-repeat":
                        this.backgroundRepeatShape(n, a, o, t, t.left + i[3], t.top + a.top + i[0], 99999, o.height, i);
                        break;
                    case "repeat-y":
                    case "no-repeat repeat":
                        this.backgroundRepeatShape(n, a, o, t, t.left + a.left + i[3], t.top + i[0], o.width, 99999, i);
                        break;
                    case "no-repeat":
                        this.backgroundRepeatShape(n, a, o, t, t.left + a.left + i[3], t.top + a.top + i[0], o.width, o.height, i);
                        break;
                    default:
                        this.renderBackgroundRepeat(n, a, o, {
                            top: t.top,
                            left: t.left
                        }, i[3], i[0])
                }
            }, t.exports = r
        }, {
            "./log": 13
        }],
        20: [function(e, t, n) {
            function r(e, t) {
                o.apply(this, arguments), this.canvas = this.options.canvas || this.document.createElement("canvas"), this.options.canvas || (this.canvas.width = e, this.canvas.height = t), this.ctx = this.canvas.getContext("2d"), this.taintCtx = this.document.createElement("canvas").getContext("2d"), this.ctx.textBaseline = "bottom", this.variables = {}, s("Initialized CanvasRenderer with size", e, "x", t)
            }

            function i(e) {
                return e.length > 0
            }
            var o = e("../renderer"),
                a = e("../lineargradientcontainer"),
                s = e("../log");
            r.prototype = Object.create(o.prototype), r.prototype.setFillStyle = function(e) {
                return this.ctx.fillStyle = "object" == typeof e && e.isColor ? e.toString() : e, this.ctx
            }, r.prototype.rectangle = function(e, t, n, r, i) {
                this.setFillStyle(i).fillRect(e, t, n, r)
            }, r.prototype.circle = function(e, t, n, r) {
                this.setFillStyle(r), this.ctx.beginPath(), this.ctx.arc(e + n / 2, t + n / 2, n / 2, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.fill()
            }, r.prototype.circleStroke = function(e, t, n, r, i, o) {
                this.circle(e, t, n, r), this.ctx.strokeStyle = o.toString(), this.ctx.stroke()
            }, r.prototype.drawShape = function(e, t) {
                this.shape(e), this.setFillStyle(t).fill()
            }, r.prototype.taints = function(e) {
                if (null === e.tainted) {
                    this.taintCtx.drawImage(e.image, 0, 0);
                    try {
                        this.taintCtx.getImageData(0, 0, 1, 1), e.tainted = !1
                    } catch (t) {
                        this.taintCtx = document.createElement("canvas").getContext("2d"), e.tainted = !0
                    }
                }
                return e.tainted
            }, r.prototype.drawImage = function(e, t, n, r, i, o, a, s, c) {
                this.taints(e) && !this.options.allowTaint || this.ctx.drawImage(e.image, t, n, r, i, o, a, s, c)
            }, r.prototype.clip = function(e, t, n) {
                this.ctx.save(), e.filter(i).forEach(function(e) {
                    this.shape(e).clip()
                }, this), t.call(n), this.ctx.restore()
            }, r.prototype.shape = function(e) {
                return this.ctx.beginPath(), e.forEach(function(e, t) {
                    "rect" === e[0] ? this.ctx.rect.apply(this.ctx, e.slice(1)) : this.ctx[0 === t ? "moveTo" : e[0] + "To"].apply(this.ctx, e.slice(1))
                }, this), this.ctx.closePath(), this.ctx
            }, r.prototype.font = function(e, t, n, r, i, o) {
                this.setFillStyle(e).font = [t, n, r, i, o].join(" ").split(",")[0]
            }, r.prototype.fontShadow = function(e, t, n, r) {
                this.setVariable("shadowColor", e.toString()).setVariable("shadowOffsetY", t).setVariable("shadowOffsetX", n).setVariable("shadowBlur", r)
            }, r.prototype.clearShadow = function() {
                this.setVariable("shadowColor", "rgba(0,0,0,0)")
            }, r.prototype.setOpacity = function(e) {
                this.ctx.globalAlpha = e
            }, r.prototype.setTransform = function(e) {
                this.ctx.translate(e.origin[0], e.origin[1]), this.ctx.transform.apply(this.ctx, e.matrix), this.ctx.translate(-e.origin[0], -e.origin[1])
            }, r.prototype.setVariable = function(e, t) {
                return this.variables[e] !== t && (this.variables[e] = this.ctx[e] = t), this
            }, r.prototype.text = function(e, t, n) {
                this.ctx.fillText(e, t, n)
            }, r.prototype.backgroundRepeatShape = function(e, t, n, r, i, o, a, s, c) {
                var u = [
                    ["line", Math.round(i), Math.round(o)],
                    ["line", Math.round(i + a), Math.round(o)],
                    ["line", Math.round(i + a), Math.round(s + o)],
                    ["line", Math.round(i), Math.round(s + o)]
                ];
                this.clip([u], function() {
                    this.renderBackgroundRepeat(e, t, n, r, c[3], c[0])
                }, this)
            }, r.prototype.renderBackgroundRepeat = function(e, t, n, r, i, o) {
                var a = Math.round(r.left + t.left + i),
                    s = Math.round(r.top + t.top + o);
                this.setFillStyle(this.ctx.createPattern(this.resizeImage(e, n), "repeat")), this.ctx.translate(a, s), this.ctx.fill(), this.ctx.translate(-a, -s)
            }, r.prototype.renderBackgroundGradient = function(e, t) {
                if (e instanceof a) {
                    var n = this.ctx.createLinearGradient(t.left + t.width * e.x0, t.top + t.height * e.y0, t.left + t.width * e.x1, t.top + t.height * e.y1);
                    e.colorStops.forEach(function(e) {
                        n.addColorStop(e.stop, e.color.toString())
                    }), this.rectangle(t.left, t.top, t.width, t.height, n)
                }
            }, r.prototype.resizeImage = function(e, t) {
                var n = e.image;
                if (n.width === t.width && n.height === t.height) return n;
                var r, i = document.createElement("canvas");
                return i.width = t.width, i.height = t.height, r = i.getContext("2d"), r.drawImage(n, 0, 0, n.width, n.height, 0, 0, t.width, t.height), i
            }, t.exports = r
        }, {
            "../lineargradientcontainer": 12,
            "../log": 13,
            "../renderer": 19
        }],
        21: [function(e, t, n) {
            function r(e, t, n, r) {
                i.call(this, n, r), this.ownStacking = e, this.contexts = [], this.children = [], this.opacity = (this.parent ? this.parent.stack.opacity : 1) * t
            }
            var i = e("./nodecontainer");
            r.prototype = Object.create(i.prototype), r.prototype.getParentStack = function(e) {
                var t = this.parent ? this.parent.stack : null;
                return t ? t.ownStacking ? t : t.getParentStack(e) : e.stack
            }, t.exports = r
        }, {
            "./nodecontainer": 14
        }],
        22: [function(e, t, n) {
            function r(e) {
                this.rangeBounds = this.testRangeBounds(e), this.cors = this.testCORS(), this.svg = this.testSVG()
            }
            r.prototype.testRangeBounds = function(e) {
                var t, n, r, i, o = !1;
                return e.createRange && (t = e.createRange(), t.getBoundingClientRect && (n = e.createElement("boundtest"), n.style.height = "123px", n.style.display = "block", e.body.appendChild(n), t.selectNode(n), r = t.getBoundingClientRect(), i = r.height, 123 === i && (o = !0), e.body.removeChild(n))), o
            }, r.prototype.testCORS = function() {
                return "undefined" != typeof(new Image).crossOrigin
            }, r.prototype.testSVG = function() {
                var e = new Image,
                    t = document.createElement("canvas"),
                    n = t.getContext("2d");
                e.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
                try {
                    n.drawImage(e, 0, 0), t.toDataURL()
                } catch (e) {
                    return !1
                }
                return !0
            }, t.exports = r
        }, {}],
        23: [function(e, t, n) {
            function r(e) {
                this.src = e, this.image = null;
                var t = this;
                this.promise = this.hasFabric().then(function() {
                    return t.isInline(e) ? Promise.resolve(t.inlineFormatting(e)) : i(e)
                }).then(function(e) {
                    return new Promise(function(n) {
                        window.html2canvas.svg.fabric.loadSVGFromString(e, t.createCanvas.call(t, n))
                    })
                })
            }
            var i = e("./xhr"),
                o = e("./utils").decode64;
            r.prototype.hasFabric = function() {
                return window.html2canvas.svg && window.html2canvas.svg.fabric ? Promise.resolve() : Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg"))
            }, r.prototype.inlineFormatting = function(e) {
                return /^data:image\/svg\+xml;base64,/.test(e) ? this.decode64(this.removeContentType(e)) : this.removeContentType(e)
            }, r.prototype.removeContentType = function(e) {
                return e.replace(/^data:image\/svg\+xml(;base64)?,/, "")
            }, r.prototype.isInline = function(e) {
                return /^data:image\/svg\+xml/i.test(e)
            }, r.prototype.createCanvas = function(e) {
                var t = this;
                return function(n, r) {
                    var i = new window.html2canvas.svg.fabric.StaticCanvas("c");
                    t.image = i.lowerCanvasEl, i.setWidth(r.width).setHeight(r.height).add(window.html2canvas.svg.fabric.util.groupSVGElements(n, r)).renderAll(), e(i.lowerCanvasEl)
                }
            }, r.prototype.decode64 = function(e) {
                return "function" == typeof window.atob ? window.atob(e) : o(e)
            }, t.exports = r
        }, {
            "./utils": 26,
            "./xhr": 28
        }],
        24: [function(e, t, n) {
            function r(e, t) {
                this.src = e, this.image = null;
                var n = this;
                this.promise = t ? new Promise(function(t, r) {
                    n.image = new Image, n.image.onload = t, n.image.onerror = r, n.image.src = "data:image/svg+xml," + (new XMLSerializer).serializeToString(e), n.image.complete === !0 && t(n.image)
                }) : this.hasFabric().then(function() {
                    return new Promise(function(t) {
                        window.html2canvas.svg.fabric.parseSVGDocument(e, n.createCanvas.call(n, t))
                    })
                })
            }
            var i = e("./svgcontainer");
            r.prototype = Object.create(i.prototype), t.exports = r
        }, {
            "./svgcontainer": 23
        }],
        25: [function(e, t, n) {
            function r(e, t) {
                o.call(this, e, t)
            }

            function i(e, t, n) {
                if (e.length > 0) return t + n.toUpperCase()
            }
            var o = e("./nodecontainer");
            r.prototype = Object.create(o.prototype), r.prototype.applyTextTransform = function() {
                this.node.data = this.transform(this.parent.css("textTransform"))
            }, r.prototype.transform = function(e) {
                var t = this.node.data;
                switch (e) {
                    case "lowercase":
                        return t.toLowerCase();
                    case "capitalize":
                        return t.replace(/(^|\s|:|-|\(|\))([a-z])/g, i);
                    case "uppercase":
                        return t.toUpperCase();
                    default:
                        return t
                }
            }, t.exports = r
        }, {
            "./nodecontainer": 14
        }],
        26: [function(e, t, n) {
            n.smallImage = function e() {
                return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
            }, n.bind = function(e, t) {
                return function() {
                    return e.apply(t, arguments)
                }
            }, n.decode64 = function(e) {
                var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                    n = e.length,
                    r, i, o, a, s, c, u, l, d = "";
                for (r = 0; r < n; r += 4) i = t.indexOf(e[r]), o = t.indexOf(e[r + 1]), a = t.indexOf(e[r + 2]), s = t.indexOf(e[r + 3]), c = i << 2 | o >> 4, u = (15 & o) << 4 | a >> 2, l = (3 & a) << 6 | s, d += 64 === a ? String.fromCharCode(c) : 64 === s || s === -1 ? String.fromCharCode(c, u) : String.fromCharCode(c, u, l);
                return d
            }, n.getBounds = function(e) {
                if (e.getBoundingClientRect) {
                    var t = e.getBoundingClientRect(),
                        n = null == e.offsetWidth ? t.width : e.offsetWidth;
                    return {
                        top: Math.floor(t.top),
                        bottom: Math.floor(t.bottom || t.top + t.height),
                        right: Math.floor(t.left + n),
                        left: Math.floor(t.left),
                        width: n,
                        height: null == e.offsetHeight ? t.height : e.offsetHeight
                    }
                }
                return {}
            }, n.offsetBounds = function(e) {
                var t = e.offsetParent ? n.offsetBounds(e.offsetParent) : {
                    top: 0,
                    left: 0
                };
                return {
                    top: e.offsetTop + t.top,
                    bottom: e.offsetTop + e.offsetHeight + t.top,
                    right: e.offsetLeft + t.left + e.offsetWidth,
                    left: e.offsetLeft + t.left,
                    width: e.offsetWidth,
                    height: e.offsetHeight
                }
            }, n.parseBackgrounds = function(e) {
                var t = " \r\n\t",
                    n, r, i, o, a, s = [],
                    c = 0,
                    u = 0,
                    l, d, h = function() {
                        n && ('"' === r.substr(0, 1) && (r = r.substr(1, r.length - 2)), r && d.push(r), "-" === n.substr(0, 1) && (o = n.indexOf("-", 1) + 1) > 0 && (i = n.substr(0, o), n = n.substr(o)), s.push({
                            prefix: i,
                            method: n.toLowerCase(),
                            value: a,
                            args: d,
                            image: null
                        })), d = [], n = i = r = a = ""
                    };
                return d = [], n = i = r = a = "", e.split("").forEach(function(e) {
                    if (!(0 === c && t.indexOf(e) > -1)) {
                        switch (e) {
                            case '"':
                                l ? l === e && (l = null) : l = e;
                                break;
                            case "(":
                                if (l) break;
                                if (0 === c) return c = 1, void(a += e);
                                u++;
                                break;
                            case ")":
                                if (l) break;
                                if (1 === c) {
                                    if (0 === u) return c = 0, a += e, void h();
                                    u--
                                }
                                break;
                            case ",":
                                if (l) break;
                                if (0 === c) return void h();
                                if (1 === c && 0 === u && !n.match(/^url$/i)) return d.push(r), r = "", void(a += e)
                        }
                        a += e, 0 === c ? n += e : r += e
                    }
                }), h(), s
            }
        }, {}],
        27: [function(e, t, n) {
            function r(e) {
                i.apply(this, arguments), this.type = "linear" === e.args[0] ? i.TYPES.LINEAR : i.TYPES.RADIAL
            }
            var i = e("./gradientcontainer");
            r.prototype = Object.create(i.prototype), t.exports = r
        }, {
            "./gradientcontainer": 9
        }],
        28: [function(e, t, n) {
            function r(e) {
                return new Promise(function(t, n) {
                    var r = new XMLHttpRequest;
                    r.open("GET", e), r.onload = function() {
                        200 === r.status ? t(r.responseText) : n(new Error(r.statusText))
                    }, r.onerror = function() {
                        n(new Error("Network Error"))
                    }, r.send()
                })
            }
            t.exports = r
        }, {}]
    }, {}, [4])(4)
}), ! function(e, t, n) {
    function r(e, t) {
        return typeof e === t
    }

    function i() {
        var e, t, n, i, o, s, l;
        for (var d in a)
            if (a.hasOwnProperty(d)) {
                if (e = [], t = a[d], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
                    for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
                for (i = r(t.fn, "function") ? t.fn() : t.fn, o = 0; o < e.length; o++) s = e[o], l = s.split("."), 1 === l.length ? c[l[0]] = i : (!c[l[0]] || c[l[0]] instanceof Boolean || (c[l[0]] = new Boolean(c[l[0]])), c[l[0]][l[1]] = i), u.push((i ? "" : "no-") + l.join("-"))
            }
    }

    function o() {
        return "function" != typeof t.createElement ? t.createElement(arguments[0]) : d ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
    }
    var a = [],
        s = {
            _version: "3.3.1",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(e, t) {
                var n = this;
                setTimeout(function() {
                    t(n[e])
                }, 0)
            },
            addTest: function(e, t, n) {
                a.push({
                    name: e,
                    fn: t,
                    options: n
                })
            },
            addAsyncTest: function(e) {
                a.push({
                    name: null,
                    fn: e
                })
            }
        },
        c = function() {};
    c.prototype = s, c = new c;
    var u = [],
        l = t.documentElement,
        d = "svg" === l.nodeName.toLowerCase();
    c.addTest("adownload", !e.externalHost && "download" in o("a")), i(), delete s.addTest, delete s.addAsyncTest;
    for (var h = 0; h < c._q.length; h++) c._q[h]();
    e.Modernizr = c
}(window, document);
var saveAs = saveAs || function(e) {
    "use strict";
    if (!("undefined" == typeof e || "undefined" != typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent))) {
        var t = e.document,
            n = function() {
                return e.URL || e.webkitURL || e
            },
            r = t.createElementNS("http://www.w3.org/1999/xhtml", "a"),
            i = "download" in r,
            o = function(e) {
                var t = new MouseEvent("click");
                e.dispatchEvent(t)
            },
            a = /constructor/i.test(e.HTMLElement),
            s = /CriOS\/[\d]+/.test(navigator.userAgent),
            c = function(t) {
                (e.setImmediate || e.setTimeout)(function() {
                    throw t
                }, 0)
            },
            u = "application/octet-stream",
            l = 4e4,
            d = function(e) {
                var t = function() {
                    "string" == typeof e ? n().revokeObjectURL(e) : e.remove()
                };
                setTimeout(t, l)
            },
            h = function(e, t, n) {
                t = [].concat(t);
                for (var r = t.length; r--;) {
                    var i = e["on" + t[r]];
                    if ("function" == typeof i) try {
                        i.call(e, n || e)
                    } catch (e) {
                        c(e)
                    }
                }
            },
            f = function(e) {
                return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], {
                    type: e.type
                }) : e
            },
            p = function(t, c, l) {
                l || (t = f(t));
                var p = this,
                    m = t.type,
                    g = m === u,
                    v, y = function() {
                        h(p, "writestart progress write writeend".split(" "))
                    },
                    b = function() {
                        if ((s || g && a) && e.FileReader) {
                            var r = new FileReader;
                            return r.onloadend = function() {
                                var t = s ? r.result : r.result.replace(/^data:[^;]*;/, "data:attachment/file;"),
                                    n = e.open(t, "_blank");
                                n || (e.location.href = t), t = void 0, p.readyState = p.DONE, y()
                            }, r.readAsDataURL(t), void(p.readyState = p.INIT)
                        }
                        if (v || (v = n().createObjectURL(t)), g) e.location.href = v;
                        else {
                            var i = e.open(v, "_blank");
                            i || (e.location.href = v)
                        }
                        p.readyState = p.DONE, y(), d(v)
                    };
                return p.readyState = p.INIT, i ? (v = n().createObjectURL(t), void setTimeout(function() {
                    r.href = v, r.download = c, o(r), y(), d(v), p.readyState = p.DONE
                })) : void b()
            },
            m = p.prototype,
            g = function(e, t, n) {
                return new p(e, t || e.name || "download", n)
            };
        return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function(e, t, n) {
            return t = t || e.name || "download", n || (e = f(e)), navigator.msSaveOrOpenBlob(e, t)
        } : (m.abort = function() {}, m.readyState = m.INIT = 0, m.WRITING = 1, m.DONE = 2, m.error = m.onwritestart = m.onprogress = m.onwrite = m.onabort = m.onerror = m.onwriteend = null, g)
    }
}("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);
"undefined" != typeof module && module.exports ? module.exports.saveAs = saveAs : "undefined" != typeof define && null !== define && null !== define.amd && define([], function() {
    return saveAs
}), ! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.JSZip = e()
    }
}(function() {
    return function e(t, n, r) {
        function i(a, s) {
            if (!n[a]) {
                if (!t[a]) {
                    var c = "function" == typeof require && require;
                    if (!s && c) return c(a, !0);
                    if (o) return o(a, !0);
                    var u = new Error("Cannot find module '" + a + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var l = n[a] = {
                    exports: {}
                };
                t[a][0].call(l.exports, function(e) {
                    var n = t[a][1][e];
                    return i(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[a].exports
        }
        for (var o = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
        return i
    }({
        1: [function(e, t, n) {
            "use strict";
            var r = e("./utils"),
                i = e("./support"),
                o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            n.encode = function(e) {
                for (var t, n, i, a, s, c, u, l = [], d = 0, h = e.length, f = h, p = "string" !== r.getTypeOf(e); d < e.length;) f = h - d, p ? (t = e[d++], n = d < h ? e[d++] : 0, i = d < h ? e[d++] : 0) : (t = e.charCodeAt(d++), n = d < h ? e.charCodeAt(d++) : 0, i = d < h ? e.charCodeAt(d++) : 0), a = t >> 2, s = (3 & t) << 4 | n >> 4, c = f > 1 ? (15 & n) << 2 | i >> 6 : 64, u = f > 2 ? 63 & i : 64, l.push(o.charAt(a) + o.charAt(s) + o.charAt(c) + o.charAt(u));
                return l.join("")
            }, n.decode = function(e) {
                var t, n, r, a, s, c, u, l = 0,
                    d = 0,
                    h = "data:";
                if (e.substr(h.length) === h) throw new Error("Invalid base64 input, it looks like a data url.");
                e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                var f = 3 * e.length / 4;
                if (e.charAt(e.length - 1) === o.charAt(64) && f--, e.charAt(e.length - 2) === o.charAt(64) && f--, f % 1 !== 0) throw new Error("Invalid base64 input, bad content length.");
                var p;
                for (p = i.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); l < e.length;) a = o.indexOf(e.charAt(l++)), s = o.indexOf(e.charAt(l++)), c = o.indexOf(e.charAt(l++)), u = o.indexOf(e.charAt(l++)), t = a << 2 | s >> 4, n = (15 & s) << 4 | c >> 2, r = (3 & c) << 6 | u, p[d++] = t, 64 !== c && (p[d++] = n), 64 !== u && (p[d++] = r);
                return p
            }
        }, {
            "./support": 30,
            "./utils": 32
        }],
        2: [function(e, t, n) {
            "use strict";

            function r(e, t, n, r, i) {
                this.compressedSize = e, this.uncompressedSize = t, this.crc32 = n, this.compression = r, this.compressedContent = i
            }
            var i = e("./external"),
                o = e("./stream/DataWorker"),
                a = e("./stream/DataLengthProbe"),
                s = e("./stream/Crc32Probe"),
                a = e("./stream/DataLengthProbe");
            r.prototype = {
                getContentWorker: function() {
                    var e = new o(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),
                        t = this;
                    return e.on("end", function() {
                        if (this.streamInfo.data_length !== t.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch")
                    }), e
                },
                getCompressedWorker: function() {
                    return new o(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression)
                }
            }, r.createWorkerFrom = function(e, t, n) {
                return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(n)).pipe(new a("compressedSize")).withStreamInfo("compression", t)
            }, t.exports = r
        }, {
            "./external": 6,
            "./stream/Crc32Probe": 25,
            "./stream/DataLengthProbe": 26,
            "./stream/DataWorker": 27
        }],
        3: [function(e, t, n) {
            "use strict";
            var r = e("./stream/GenericWorker");
            n.STORE = {
                magic: "\0\0",
                compressWorker: function(e) {
                    return new r("STORE compression")
                },
                uncompressWorker: function() {
                    return new r("STORE decompression")
                }
            }, n.DEFLATE = e("./flate")
        }, {
            "./flate": 7,
            "./stream/GenericWorker": 28
        }],
        4: [function(e, t, n) {
            "use strict";

            function r() {
                for (var e, t = [], n = 0; n < 256; n++) {
                    e = n;
                    for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                    t[n] = e
                }
                return t
            }

            function i(e, t, n, r) {
                var i = s,
                    o = r + n;
                e ^= -1;
                for (var a = r; a < o; a++) e = e >>> 8 ^ i[255 & (e ^ t[a])];
                return e ^ -1
            }

            function o(e, t, n, r) {
                var i = s,
                    o = r + n;
                e ^= -1;
                for (var a = r; a < o; a++) e = e >>> 8 ^ i[255 & (e ^ t.charCodeAt(a))];
                return e ^ -1
            }
            var a = e("./utils"),
                s = r();
            t.exports = function(e, t) {
                if ("undefined" == typeof e || !e.length) return 0;
                var n = "string" !== a.getTypeOf(e);
                return n ? i(0 | t, e, e.length, 0) : o(0 | t, e, e.length, 0)
            }
        }, {
            "./utils": 32
        }],
        5: [function(e, t, n) {
            "use strict";
            n.base64 = !1, n.binary = !1, n.dir = !1, n.createFolders = !0, n.date = null, n.compression = null, n.compressionOptions = null, n.comment = null, n.unixPermissions = null, n.dosPermissions = null
        }, {}],
        6: [function(e, t, n) {
            "use strict";
            var r = null;
            r = "undefined" != typeof Promise ? Promise : e("lie"), t.exports = {
                Promise: r
            }
        }, {
            lie: 58
        }],
        7: [function(e, t, n) {
            "use strict";

            function r(e, t) {
                s.call(this, "FlateWorker/" + e), this._pako = new o[e]({
                    raw: !0,
                    level: t.level || -1
                }), this.meta = {};
                var n = this;
                this._pako.onData = function(e) {
                    n.push({
                        data: e,
                        meta: n.meta
                    })
                }
            }
            var i = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array,
                o = e("pako"),
                a = e("./utils"),
                s = e("./stream/GenericWorker"),
                c = i ? "uint8array" : "array";
            n.magic = "\b\0", a.inherits(r, s), r.prototype.processChunk = function(e) {
                this.meta = e.meta, this._pako.push(a.transformTo(c, e.data), !1)
            }, r.prototype.flush = function() {
                s.prototype.flush.call(this), this._pako.push([], !0)
            }, r.prototype.cleanUp = function() {
                s.prototype.cleanUp.call(this), this._pako = null
            }, n.compressWorker = function(e) {
                return new r("Deflate", e)
            }, n.uncompressWorker = function() {
                return new r("Inflate", {})
            }
        }, {
            "./stream/GenericWorker": 28,
            "./utils": 32,
            pako: 59
        }],
        8: [function(e, t, n) {
            "use strict";

            function r(e, t, n, r) {
                o.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t, this.zipPlatform = n, this.encodeFileName = r, this.streamFiles = e, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = []
            }
            var i = e("../utils"),
                o = e("../stream/GenericWorker"),
                a = e("../utf8"),
                s = e("../crc32"),
                c = e("../signature"),
                u = function(e, t) {
                    var n, r = "";
                    for (n = 0; n < t; n++) r += String.fromCharCode(255 & e), e >>>= 8;
                    return r
                },
                l = function(e, t) {
                    var n = e;
                    return e || (n = t ? 16893 : 33204), (65535 & n) << 16
                },
                d = function(e, t) {
                    return 63 & (e || 0)
                },
                h = function(e, t, n, r, o, h) {
                    var f, p, m = e.file,
                        g = e.compression,
                        v = h !== a.utf8encode,
                        y = i.transformTo("string", h(m.name)),
                        b = i.transformTo("string", a.utf8encode(m.name)),
                        w = m.comment,
                        x = i.transformTo("string", h(w)),
                        _ = i.transformTo("string", a.utf8encode(w)),
                        k = b.length !== m.name.length,
                        C = _.length !== w.length,
                        E = "",
                        T = "",
                        S = "",
                        A = m.dir,
                        I = m.date,
                        O = {
                            crc32: 0,
                            compressedSize: 0,
                            uncompressedSize: 0
                        };
                    t && !n || (O.crc32 = e.crc32, O.compressedSize = e.compressedSize, O.uncompressedSize = e.uncompressedSize);
                    var D = 0;
                    t && (D |= 8), v || !k && !C || (D |= 2048);
                    var N = 0,
                        R = 0;
                    A && (N |= 16), "UNIX" === o ? (R = 798, N |= l(m.unixPermissions, A)) : (R = 20, N |= d(m.dosPermissions, A)), f = I.getUTCHours(), f <<= 6, f |= I.getUTCMinutes(), f <<= 5, f |= I.getUTCSeconds() / 2, p = I.getUTCFullYear() - 1980, p <<= 4, p |= I.getUTCMonth() + 1, p <<= 5, p |= I.getUTCDate(), k && (T = u(1, 1) + u(s(y), 4) + b, E += "up" + u(T.length, 2) + T), C && (S = u(1, 1) + u(s(x), 4) + _, E += "uc" + u(S.length, 2) + S);
                    var B = "";
                    B += "\n\0", B += u(D, 2), B += g.magic, B += u(f, 2), B += u(p, 2), B += u(O.crc32, 4), B += u(O.compressedSize, 4), B += u(O.uncompressedSize, 4), B += u(y.length, 2), B += u(E.length, 2);
                    var L = c.LOCAL_FILE_HEADER + B + y + E,
                        z = c.CENTRAL_FILE_HEADER + u(R, 2) + B + u(x.length, 2) + "\0\0\0\0" + u(N, 4) + u(r, 4) + y + E + x;
                    return {
                        fileRecord: L,
                        dirRecord: z
                    }
                },
                f = function(e, t, n, r, o) {
                    var a = "",
                        s = i.transformTo("string", o(r));
                    return a = c.CENTRAL_DIRECTORY_END + "\0\0\0\0" + u(e, 2) + u(e, 2) + u(t, 4) + u(n, 4) + u(s.length, 2) + s
                },
                p = function(e) {
                    var t = "";
                    return t = c.DATA_DESCRIPTOR + u(e.crc32, 4) + u(e.compressedSize, 4) + u(e.uncompressedSize, 4)
                };
            i.inherits(r, o), r.prototype.push = function(e) {
                var t = e.meta.percent || 0,
                    n = this.entriesCount,
                    r = this._sources.length;
                this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, o.prototype.push.call(this, {
                    data: e.data,
                    meta: {
                        currentFile: this.currentFile,
                        percent: n ? (t + 100 * (n - r - 1)) / n : 100
                    }
                }))
            }, r.prototype.openedSource = function(e) {
                this.currentSourceOffset = this.bytesWritten, this.currentFile = e.file.name;
                var t = this.streamFiles && !e.file.dir;
                if (t) {
                    var n = h(e, t, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                    this.push({
                        data: n.fileRecord,
                        meta: {
                            percent: 0
                        }
                    })
                } else this.accumulate = !0
            }, r.prototype.closedSource = function(e) {
                this.accumulate = !1;
                var t = this.streamFiles && !e.file.dir,
                    n = h(e, t, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                if (this.dirRecords.push(n.dirRecord), t) this.push({
                    data: p(e),
                    meta: {
                        percent: 100
                    }
                });
                else
                    for (this.push({
                            data: n.fileRecord,
                            meta: {
                                percent: 0
                            }
                        }); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
                this.currentFile = null
            }, r.prototype.flush = function() {
                for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++) this.push({
                    data: this.dirRecords[t],
                    meta: {
                        percent: 100
                    }
                });
                var n = this.bytesWritten - e,
                    r = f(this.dirRecords.length, n, e, this.zipComment, this.encodeFileName);
                this.push({
                    data: r,
                    meta: {
                        percent: 100
                    }
                })
            }, r.prototype.prepareNextSource = function() {
                this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume()
            }, r.prototype.registerPrevious = function(e) {
                this._sources.push(e);
                var t = this;
                return e.on("data", function(e) {
                    t.processChunk(e)
                }), e.on("end", function() {
                    t.closedSource(t.previous.streamInfo), t._sources.length ? t.prepareNextSource() : t.end()
                }), e.on("error", function(e) {
                    t.error(e)
                }), this
            }, r.prototype.resume = function() {
                return !!o.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0))
            }, r.prototype.error = function(e) {
                var t = this._sources;
                if (!o.prototype.error.call(this, e)) return !1;
                for (var n = 0; n < t.length; n++) try {
                    t[n].error(e)
                } catch (e) {}
                return !0
            }, r.prototype.lock = function() {
                o.prototype.lock.call(this);
                for (var e = this._sources, t = 0; t < e.length; t++) e[t].lock()
            }, t.exports = r
        }, {
            "../crc32": 4,
            "../signature": 23,
            "../stream/GenericWorker": 28,
            "../utf8": 31,
            "../utils": 32
        }],
        9: [function(e, t, n) {
            "use strict";
            var r = e("../compressions"),
                i = e("./ZipFileWorker"),
                o = function(e, t) {
                    var n = e || t,
                        i = r[n];
                    if (!i) throw new Error(n + " is not a valid compression method !");
                    return i
                };
            n.generateWorker = function(e, t, n) {
                var r = new i(t.streamFiles, n, t.platform, t.encodeFileName),
                    a = 0;
                try {
                    e.forEach(function(e, n) {
                        a++;
                        var i = o(n.options.compression, t.compression),
                            s = n.options.compressionOptions || t.compressionOptions || {},
                            c = n.dir,
                            u = n.date;
                        n._compressWorker(i, s).withStreamInfo("file", {
                            name: e,
                            dir: c,
                            date: u,
                            comment: n.comment || "",
                            unixPermissions: n.unixPermissions,
                            dosPermissions: n.dosPermissions
                        }).pipe(r)
                    }), r.entriesCount = a
                } catch (e) {
                    r.error(e)
                }
                return r
            }
        }, {
            "../compressions": 3,
            "./ZipFileWorker": 8
        }],
        10: [function(e, t, n) {
            "use strict";

            function r() {
                if (!(this instanceof r)) return new r;
                if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
                this.files = {}, this.comment = null, this.root = "", this.clone = function() {
                    var e = new r;
                    for (var t in this) "function" != typeof this[t] && (e[t] = this[t]);
                    return e
                }
            }
            r.prototype = e("./object"), r.prototype.loadAsync = e("./load"), r.support = e("./support"), r.defaults = e("./defaults"), r.version = "3.1.2", r.loadAsync = function(e, t) {
                return (new r).loadAsync(e, t)
            }, r.external = e("./external"), t.exports = r
        }, {
            "./defaults": 5,
            "./external": 6,
            "./load": 11,
            "./object": 15,
            "./support": 30
        }],
        11: [function(e, t, n) {
            "use strict";

            function r(e) {
                return new o.Promise(function(t, n) {
                    var r = e.decompressed.getContentWorker().pipe(new c);
                    r.on("error", function(e) {
                        n(e)
                    }).on("end", function() {
                        r.streamInfo.crc32 !== e.decompressed.crc32 ? n(new Error("Corrupted zip : CRC32 mismatch")) : t()
                    }).resume()
                })
            }
            var i = e("./utils"),
                o = e("./external"),
                a = e("./utf8"),
                i = e("./utils"),
                s = e("./zipEntries"),
                c = e("./stream/Crc32Probe"),
                u = e("./nodejsUtils");
            t.exports = function(e, t) {
                var n = this;
                return t = i.extend(t || {}, {
                    base64: !1,
                    checkCRC32: !1,
                    optimizedBinaryString: !1,
                    createFolders: !1,
                    decodeFileName: a.utf8decode
                }), u.isNode && u.isStream(e) ? o.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : i.prepareContent("the loaded zip file", e, !0, t.optimizedBinaryString, t.base64).then(function(e) {
                    var n = new s(t);
                    return n.load(e), n
                }).then(function(e) {
                    var n = [o.Promise.resolve(e)],
                        i = e.files;
                    if (t.checkCRC32)
                        for (var a = 0; a < i.length; a++) n.push(r(i[a]));
                    return o.Promise.all(n)
                }).then(function(e) {
                    for (var r = e.shift(), i = r.files, o = 0; o < i.length; o++) {
                        var a = i[o];
                        n.file(a.fileNameStr, a.decompressed, {
                            binary: !0,
                            optimizedBinaryString: !0,
                            date: a.date,
                            dir: a.dir,
                            comment: a.fileCommentStr.length ? a.fileCommentStr : null,
                            unixPermissions: a.unixPermissions,
                            dosPermissions: a.dosPermissions,
                            createFolders: t.createFolders
                        })
                    }
                    return r.zipComment.length && (n.comment = r.zipComment), n
                })
            }
        }, {
            "./external": 6,
            "./nodejsUtils": 14,
            "./stream/Crc32Probe": 25,
            "./utf8": 31,
            "./utils": 32,
            "./zipEntries": 33
        }],
        12: [function(e, t, n) {
            "use strict";

            function r(e, t) {
                o.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = !1, this._bindStream(t)
            }
            var i = e("../utils"),
                o = e("../stream/GenericWorker");
            i.inherits(r, o), r.prototype._bindStream = function(e) {
                var t = this;
                this._stream = e, e.pause(), e.on("data", function(e) {
                    t.push({
                        data: e,
                        meta: {
                            percent: 0
                        }
                    })
                }).on("error", function(e) {
                    t.isPaused ? this.generatedError = e : t.error(e)
                }).on("end", function() {
                    t.isPaused ? t._upstreamEnded = !0 : t.end()
                })
            }, r.prototype.pause = function() {
                return !!o.prototype.pause.call(this) && (this._stream.pause(), !0)
            }, r.prototype.resume = function() {
                return !!o.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
            }, t.exports = r
        }, {
            "../stream/GenericWorker": 28,
            "../utils": 32
        }],
        13: [function(e, t, n) {
            "use strict";

            function r(e, t, n) {
                i.call(this, t), this._helper = e;
                var r = this;
                e.on("data", function(e, t) {
                    r.push(e) || r._helper.pause(), n && n(t)
                }).on("error", function(e) {
                    r.emit("error", e)
                }).on("end", function() {
                    r.push(null)
                })
            }
            var i = e("readable-stream").Readable,
                o = e("util");
            o.inherits(r, i), r.prototype._read = function() {
                this._helper.resume()
            }, t.exports = r
        }, {
            "readable-stream": 16,
            util: void 0
        }],
        14: [function(e, t, n) {
            "use strict";
            t.exports = {
                isNode: "undefined" != typeof Buffer,
                newBuffer: function(e, t) {
                    return new Buffer(e, t)
                },
                isBuffer: function(e) {
                    return Buffer.isBuffer(e)
                },
                isStream: function(e) {
                    return e && "function" == typeof e.on && "function" == typeof e.pause && "function" == typeof e.resume
                }
            }
        }, {}],
        15: [function(e, t, n) {
            "use strict";

            function r(e) {
                return "[object RegExp]" === Object.prototype.toString.call(e)
            }
            var i = e("./utf8"),
                o = e("./utils"),
                a = e("./stream/GenericWorker"),
                s = e("./stream/StreamHelper"),
                c = e("./defaults"),
                u = e("./compressedObject"),
                l = e("./zipObject"),
                d = e("./generate"),
                h = e("./nodejsUtils"),
                f = e("./nodejs/NodejsStreamInputAdapter"),
                p = function(e, t, n) {
                    var r, i = o.getTypeOf(t),
                        s = o.extend(n || {}, c);
                    s.date = s.date || new Date, null !== s.compression && (s.compression = s.compression.toUpperCase()), "string" == typeof s.unixPermissions && (s.unixPermissions = parseInt(s.unixPermissions, 8)), s.unixPermissions && 16384 & s.unixPermissions && (s.dir = !0), s.dosPermissions && 16 & s.dosPermissions && (s.dir = !0), s.dir && (e = g(e)), s.createFolders && (r = m(e)) && v.call(this, r, !0);
                    var d = "string" === i && s.binary === !1 && s.base64 === !1;
                    n && "undefined" != typeof n.binary || (s.binary = !d);
                    var p = t instanceof u && 0 === t.uncompressedSize;
                    (p || s.dir || !t || 0 === t.length) && (s.base64 = !1, s.binary = !0, t = "", s.compression = "STORE", i = "string");
                    var y = null;
                    y = t instanceof u || t instanceof a ? t : h.isNode && h.isStream(t) ? new f(e, t) : o.prepareContent(e, t, s.binary, s.optimizedBinaryString, s.base64);
                    var b = new l(e, y, s);
                    this.files[e] = b
                },
                m = function(e) {
                    "/" === e.slice(-1) && (e = e.substring(0, e.length - 1));
                    var t = e.lastIndexOf("/");
                    return t > 0 ? e.substring(0, t) : ""
                },
                g = function(e) {
                    return "/" !== e.slice(-1) && (e += "/"), e
                },
                v = function(e, t) {
                    return t = "undefined" != typeof t ? t : c.createFolders, e = g(e), this.files[e] || p.call(this, e, null, {
                        dir: !0,
                        createFolders: t
                    }), this.files[e]
                },
                y = {
                    load: function() {
                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                    },
                    forEach: function(e) {
                        var t, n, r;
                        for (t in this.files) this.files.hasOwnProperty(t) && (r = this.files[t], n = t.slice(this.root.length, t.length), n && t.slice(0, this.root.length) === this.root && e(n, r))
                    },
                    filter: function(e) {
                        var t = [];
                        return this.forEach(function(n, r) {
                            e(n, r) && t.push(r)
                        }), t
                    },
                    file: function(e, t, n) {
                        if (1 === arguments.length) {
                            if (r(e)) {
                                var i = e;
                                return this.filter(function(e, t) {
                                    return !t.dir && i.test(e)
                                })
                            }
                            var o = this.files[this.root + e];
                            return o && !o.dir ? o : null
                        }
                        return e = this.root + e, p.call(this, e, t, n), this
                    },
                    folder: function(e) {
                        if (!e) return this;
                        if (r(e)) return this.filter(function(t, n) {
                            return n.dir && e.test(t)
                        });
                        var t = this.root + e,
                            n = v.call(this, t),
                            i = this.clone();
                        return i.root = n.name, i
                    },
                    remove: function(e) {
                        e = this.root + e;
                        var t = this.files[e];
                        if (t || ("/" !== e.slice(-1) && (e += "/"), t = this.files[e]), t && !t.dir) delete this.files[e];
                        else
                            for (var n = this.filter(function(t, n) {
                                    return n.name.slice(0, e.length) === e
                                }), r = 0; r < n.length; r++) delete this.files[n[r].name];
                        return this
                    },
                    generate: function(e) {
                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                    },
                    generateInternalStream: function(e) {
                        var t, n = {};
                        try {
                            if (n = o.extend(e || {}, {
                                    streamFiles: !1,
                                    compression: "STORE",
                                    compressionOptions: null,
                                    type: "",
                                    platform: "DOS",
                                    comment: null,
                                    mimeType: "application/zip",
                                    encodeFileName: i.utf8encode
                                }), n.type = n.type.toLowerCase(), n.compression = n.compression.toUpperCase(), "binarystring" === n.type && (n.type = "string"), !n.type) throw new Error("No output type specified.");
                            o.checkSupport(n.type), "darwin" !== n.platform && "freebsd" !== n.platform && "linux" !== n.platform && "sunos" !== n.platform || (n.platform = "UNIX"), "win32" === n.platform && (n.platform = "DOS");
                            var r = n.comment || this.comment || "";
                            t = d.generateWorker(this, n, r)
                        } catch (e) {
                            t = new a("error"), t.error(e)
                        }
                        return new s(t, n.type || "string", n.mimeType)
                    },
                    generateAsync: function(e, t) {
                        return this.generateInternalStream(e).accumulate(t)
                    },
                    generateNodeStream: function(e, t) {
                        return e = e || {}, e.type || (e.type = "nodebuffer"), this.generateInternalStream(e).toNodejsStream(t)
                    }
                };
            t.exports = y
        }, {
            "./compressedObject": 2,
            "./defaults": 5,
            "./generate": 9,
            "./nodejs/NodejsStreamInputAdapter": 12,
            "./nodejsUtils": 14,
            "./stream/GenericWorker": 28,
            "./stream/StreamHelper": 29,
            "./utf8": 31,
            "./utils": 32,
            "./zipObject": 35
        }],
        16: [function(e, t, n) {
            t.exports = e("stream")
        }, {
            stream: void 0
        }],
        17: [function(e, t, n) {
            "use strict";

            function r(e) {
                i.call(this, e);
                for (var t = 0; t < this.data.length; t++) e[t] = 255 & e[t]
            }
            var i = e("./DataReader"),
                o = e("../utils");
            o.inherits(r, i), r.prototype.byteAt = function(e) {
                return this.data[this.zero + e]
            }, r.prototype.lastIndexOfSignature = function(e) {
                for (var t = e.charCodeAt(0), n = e.charCodeAt(1), r = e.charCodeAt(2), i = e.charCodeAt(3), o = this.length - 4; o >= 0; --o)
                    if (this.data[o] === t && this.data[o + 1] === n && this.data[o + 2] === r && this.data[o + 3] === i) return o - this.zero;
                return -1
            }, r.prototype.readAndCheckSignature = function(e) {
                var t = e.charCodeAt(0),
                    n = e.charCodeAt(1),
                    r = e.charCodeAt(2),
                    i = e.charCodeAt(3),
                    o = this.readData(4);
                return t === o[0] && n === o[1] && r === o[2] && i === o[3]
            }, r.prototype.readData = function(e) {
                if (this.checkOffset(e), 0 === e) return [];
                var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
                return this.index += e, t
            }, t.exports = r
        }, {
            "../utils": 32,
            "./DataReader": 18
        }],
        18: [function(e, t, n) {
            "use strict";

            function r(e) {
                this.data = e, this.length = e.length, this.index = 0, this.zero = 0
            }
            var i = e("../utils");
            r.prototype = {
                checkOffset: function(e) {
                    this.checkIndex(this.index + e)
                },
                checkIndex: function(e) {
                    if (this.length < this.zero + e || e < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?")
                },
                setIndex: function(e) {
                    this.checkIndex(e), this.index = e
                },
                skip: function(e) {
                    this.setIndex(this.index + e)
                },
                byteAt: function(e) {},
                readInt: function(e) {
                    var t, n = 0;
                    for (this.checkOffset(e), t = this.index + e - 1; t >= this.index; t--) n = (n << 8) + this.byteAt(t);
                    return this.index += e, n
                },
                readString: function(e) {
                    return i.transformTo("string", this.readData(e))
                },
                readData: function(e) {},
                lastIndexOfSignature: function(e) {},
                readAndCheckSignature: function(e) {},
                readDate: function() {
                    var e = this.readInt(4);
                    return new Date(Date.UTC((e >> 25 & 127) + 1980, (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (31 & e) << 1))
                }
            }, t.exports = r
        }, {
            "../utils": 32
        }],
        19: [function(e, t, n) {
            "use strict";

            function r(e) {
                i.call(this, e)
            }
            var i = e("./Uint8ArrayReader"),
                o = e("../utils");
            o.inherits(r, i), r.prototype.readData = function(e) {
                this.checkOffset(e);
                var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
                return this.index += e, t
            }, t.exports = r
        }, {
            "../utils": 32,
            "./Uint8ArrayReader": 21
        }],
        20: [function(e, t, n) {
            "use strict";

            function r(e) {
                i.call(this, e)
            }
            var i = e("./DataReader"),
                o = e("../utils");
            o.inherits(r, i), r.prototype.byteAt = function(e) {
                return this.data.charCodeAt(this.zero + e)
            }, r.prototype.lastIndexOfSignature = function(e) {
                return this.data.lastIndexOf(e) - this.zero
            }, r.prototype.readAndCheckSignature = function(e) {
                var t = this.readData(4);
                return e === t
            }, r.prototype.readData = function(e) {
                this.checkOffset(e);
                var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
                return this.index += e, t
            }, t.exports = r
        }, {
            "../utils": 32,
            "./DataReader": 18
        }],
        21: [function(e, t, n) {
            "use strict";

            function r(e) {
                i.call(this, e)
            }
            var i = e("./ArrayReader"),
                o = e("../utils");
            o.inherits(r, i), r.prototype.readData = function(e) {
                if (this.checkOffset(e), 0 === e) return new Uint8Array(0);
                var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
                return this.index += e, t
            }, t.exports = r
        }, {
            "../utils": 32,
            "./ArrayReader": 17
        }],
        22: [function(e, t, n) {
            "use strict";
            var r = e("../utils"),
                i = e("../support"),
                o = e("./ArrayReader"),
                a = e("./StringReader"),
                s = e("./NodeBufferReader"),
                c = e("./Uint8ArrayReader");
            t.exports = function(e) {
                var t = r.getTypeOf(e);
                return r.checkSupport(t), "string" !== t || i.uint8array ? "nodebuffer" === t ? new s(e) : i.uint8array ? new c(r.transformTo("uint8array", e)) : new o(r.transformTo("array", e)) : new a(e)
            }
        }, {
            "../support": 30,
            "../utils": 32,
            "./ArrayReader": 17,
            "./NodeBufferReader": 19,
            "./StringReader": 20,
            "./Uint8ArrayReader": 21
        }],
        23: [function(e, t, n) {
            "use strict";
            n.LOCAL_FILE_HEADER = "PK", n.CENTRAL_FILE_HEADER = "PK", n.CENTRAL_DIRECTORY_END = "PK", n.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", n.ZIP64_CENTRAL_DIRECTORY_END = "PK", n.DATA_DESCRIPTOR = "PK\b"
        }, {}],
        24: [function(e, t, n) {
            "use strict";

            function r(e) {
                i.call(this, "ConvertWorker to " + e), this.destType = e
            }
            var i = e("./GenericWorker"),
                o = e("../utils");
            o.inherits(r, i), r.prototype.processChunk = function(e) {
                this.push({
                    data: o.transformTo(this.destType, e.data),
                    meta: e.meta
                })
            }, t.exports = r
        }, {
            "../utils": 32,
            "./GenericWorker": 28
        }],
        25: [function(e, t, n) {
            "use strict";

            function r() {
                i.call(this, "Crc32Probe")
            }
            var i = e("./GenericWorker"),
                o = e("../crc32"),
                a = e("../utils");
            a.inherits(r, i), r.prototype.processChunk = function(e) {
                this.streamInfo.crc32 = o(e.data, this.streamInfo.crc32 || 0), this.push(e)
            }, t.exports = r
        }, {
            "../crc32": 4,
            "../utils": 32,
            "./GenericWorker": 28
        }],
        26: [function(e, t, n) {
            "use strict";

            function r(e) {
                o.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0)
            }
            var i = e("../utils"),
                o = e("./GenericWorker");
            i.inherits(r, o), r.prototype.processChunk = function(e) {
                if (e) {
                    var t = this.streamInfo[this.propName] || 0;
                    this.streamInfo[this.propName] = t + e.data.length
                }
                o.prototype.processChunk.call(this, e)
            }, t.exports = r
        }, {
            "../utils": 32,
            "./GenericWorker": 28
        }],
        27: [function(e, t, n) {
            "use strict";

            function r(e) {
                o.call(this, "DataWorker");
                var t = this;
                this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, e.then(function(e) {
                    t.dataIsReady = !0, t.data = e, t.max = e && e.length || 0, t.type = i.getTypeOf(e), t.isPaused || t._tickAndRepeat()
                }, function(e) {
                    t.error(e)
                })
            }
            var i = e("../utils"),
                o = e("./GenericWorker"),
                a = 16384;
            i.inherits(r, o), r.prototype.cleanUp = function() {
                o.prototype.cleanUp.call(this), this.data = null
            }, r.prototype.resume = function() {
                return !!o.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, i.delay(this._tickAndRepeat, [], this)), !0)
            }, r.prototype._tickAndRepeat = function() {
                this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (i.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0))
            }, r.prototype._tick = function() {
                if (this.isPaused || this.isFinished) return !1;
                var e = a,
                    t = null,
                    n = Math.min(this.max, this.index + e);
                if (this.index >= this.max) return this.end();
                switch (this.type) {
                    case "string":
                        t = this.data.substring(this.index, n);
                        break;
                    case "uint8array":
                        t = this.data.subarray(this.index, n);
                        break;
                    case "array":
                    case "nodebuffer":
                        t = this.data.slice(this.index, n)
                }
                return this.index = n, this.push({
                    data: t,
                    meta: {
                        percent: this.max ? this.index / this.max * 100 : 0
                    }
                })
            }, t.exports = r
        }, {
            "../utils": 32,
            "./GenericWorker": 28
        }],
        28: [function(e, t, n) {
            "use strict";

            function r(e) {
                this.name = e || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
                    data: [],
                    end: [],
                    error: []
                }, this.previous = null
            }
            r.prototype = {
                push: function(e) {
                    this.emit("data", e)
                },
                end: function() {
                    if (this.isFinished) return !1;
                    this.flush();
                    try {
                        this.emit("end"), this.cleanUp(), this.isFinished = !0
                    } catch (e) {
                        this.emit("error", e)
                    }
                    return !0
                },
                error: function(e) {
                    return !this.isFinished && (this.isPaused ? this.generatedError = e : (this.isFinished = !0, this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), !0)
                },
                on: function(e, t) {
                    return this._listeners[e].push(t), this
                },
                cleanUp: function() {
                    this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = []
                },
                emit: function(e, t) {
                    if (this._listeners[e])
                        for (var n = 0; n < this._listeners[e].length; n++) this._listeners[e][n].call(this, t)
                },
                pipe: function(e) {
                    return e.registerPrevious(this)
                },
                registerPrevious: function(e) {
                    if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                    this.streamInfo = e.streamInfo, this.mergeStreamInfo(), this.previous = e;
                    var t = this;
                    return e.on("data", function(e) {
                        t.processChunk(e)
                    }), e.on("end", function() {
                        t.end()
                    }), e.on("error", function(e) {
                        t.error(e)
                    }), this
                },
                pause: function() {
                    return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0)
                },
                resume: function() {
                    if (!this.isPaused || this.isFinished) return !1;
                    this.isPaused = !1;
                    var e = !1;
                    return this.generatedError && (this.error(this.generatedError), e = !0), this.previous && this.previous.resume(), !e
                },
                flush: function() {},
                processChunk: function(e) {
                    this.push(e)
                },
                withStreamInfo: function(e, t) {
                    return this.extraStreamInfo[e] = t, this.mergeStreamInfo(), this
                },
                mergeStreamInfo: function() {
                    for (var e in this.extraStreamInfo) this.extraStreamInfo.hasOwnProperty(e) && (this.streamInfo[e] = this.extraStreamInfo[e])
                },
                lock: function() {
                    if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                    this.isLocked = !0, this.previous && this.previous.lock()
                },
                toString: function() {
                    var e = "Worker " + this.name;
                    return this.previous ? this.previous + " -> " + e : e
                }
            }, t.exports = r
        }, {}],
        29: [function(e, t, n) {
            "use strict";

            function r(e, t, n) {
                switch (e) {
                    case "blob":
                        return s.newBlob(s.transformTo("arraybuffer", t), n);
                    case "base64":
                        return l.encode(t);
                    default:
                        return s.transformTo(e, t)
                }
            }

            function i(e, t) {
                var n, r = 0,
                    i = null,
                    o = 0;
                for (n = 0; n < t.length; n++) o += t[n].length;
                switch (e) {
                    case "string":
                        return t.join("");
                    case "array":
                        return Array.prototype.concat.apply([], t);
                    case "uint8array":
                        for (i = new Uint8Array(o), n = 0; n < t.length; n++) i.set(t[n], r), r += t[n].length;
                        return i;
                    case "nodebuffer":
                        return Buffer.concat(t);
                    default:
                        throw new Error("concat : unsupported type '" + e + "'")
                }
            }

            function o(e, t) {
                return new h.Promise(function(n, o) {
                    var a = [],
                        s = e._internalType,
                        c = e._outputType,
                        u = e._mimeType;
                    e.on("data", function(e, n) {
                        a.push(e), t && t(n)
                    }).on("error", function(e) {
                        a = [], o(e)
                    }).on("end", function() {
                        try {
                            var e = r(c, i(s, a), u);
                            n(e)
                        } catch (e) {
                            o(e)
                        }
                        a = []
                    }).resume()
                })
            }

            function a(e, t, n) {
                var r = t;
                switch (t) {
                    case "blob":
                    case "arraybuffer":
                        r = "uint8array";
                        break;
                    case "base64":
                        r = "string"
                }
                try {
                    this._internalType = r, this._outputType = t, this._mimeType = n, s.checkSupport(r), this._worker = e.pipe(new c(r)), e.lock()
                } catch (e) {
                    this._worker = new u("error"), this._worker.error(e)
                }
            }
            var s = e("../utils"),
                c = e("./ConvertWorker"),
                u = e("./GenericWorker"),
                l = e("../base64"),
                d = e("../support"),
                h = e("../external"),
                f = null;
            if (d.nodestream) try {
                f = e("../nodejs/NodejsStreamOutputAdapter")
            } catch (e) {}
            a.prototype = {
                accumulate: function(e) {
                    return o(this, e)
                },
                on: function(e, t) {
                    var n = this;
                    return "data" === e ? this._worker.on(e, function(e) {
                        t.call(n, e.data, e.meta)
                    }) : this._worker.on(e, function() {
                        s.delay(t, arguments, n)
                    }), this
                },
                resume: function() {
                    return s.delay(this._worker.resume, [], this._worker), this
                },
                pause: function() {
                    return this._worker.pause(), this
                },
                toNodejsStream: function(e) {
                    if (s.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
                    return new f(this, {
                        objectMode: "nodebuffer" !== this._outputType
                    }, e)
                }
            }, t.exports = a
        }, {
            "../base64": 1,
            "../external": 6,
            "../nodejs/NodejsStreamOutputAdapter": 13,
            "../support": 30,
            "../utils": 32,
            "./ConvertWorker": 24,
            "./GenericWorker": 28
        }],
        30: [function(e, t, n) {
            "use strict";
            if (n.base64 = !0, n.array = !0, n.string = !0, n.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, n.nodebuffer = "undefined" != typeof Buffer, n.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) n.blob = !1;
            else {
                var r = new ArrayBuffer(0);
                try {
                    n.blob = 0 === new Blob([r], {
                        type: "application/zip"
                    }).size
                } catch (e) {
                    try {
                        var i = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
                            o = new i;
                        o.append(r), n.blob = 0 === o.getBlob("application/zip").size
                    } catch (e) {
                        n.blob = !1
                    }
                }
            }
            try {
                n.nodestream = !!e("readable-stream").Readable
            } catch (e) {
                n.nodestream = !1
            }
        }, {
            "readable-stream": 16
        }],
        31: [function(e, t, n) {
            "use strict";

            function r() {
                c.call(this, "utf-8 decode"), this.leftOver = null
            }

            function i() {
                c.call(this, "utf-8 encode")
            }
            for (var o = e("./utils"), a = e("./support"), s = e("./nodejsUtils"), c = e("./stream/GenericWorker"), u = new Array(256), l = 0; l < 256; l++) u[l] = l >= 252 ? 6 : l >= 248 ? 5 : l >= 240 ? 4 : l >= 224 ? 3 : l >= 192 ? 2 : 1;
            u[254] = u[254] = 1;
            var d = function(e) {
                    var t, n, r, i, o, s = e.length,
                        c = 0;
                    for (i = 0; i < s; i++) n = e.charCodeAt(i), 55296 === (64512 & n) && i + 1 < s && (r = e.charCodeAt(i + 1), 56320 === (64512 & r) && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), c += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
                    for (t = a.uint8array ? new Uint8Array(c) : new Array(c), o = 0, i = 0; o < c; i++) n = e.charCodeAt(i), 55296 === (64512 & n) && i + 1 < s && (r = e.charCodeAt(i + 1), 56320 === (64512 & r) && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), n < 128 ? t[o++] = n : n < 2048 ? (t[o++] = 192 | n >>> 6, t[o++] = 128 | 63 & n) : n < 65536 ? (t[o++] = 224 | n >>> 12, t[o++] = 128 | n >>> 6 & 63, t[o++] = 128 | 63 & n) : (t[o++] = 240 | n >>> 18, t[o++] = 128 | n >>> 12 & 63, t[o++] = 128 | n >>> 6 & 63, t[o++] = 128 | 63 & n);
                    return t
                },
                h = function(e, t) {
                    var n;
                    for (t = t || e.length, t > e.length && (t = e.length), n = t - 1; n >= 0 && 128 === (192 & e[n]);) n--;
                    return n < 0 ? t : 0 === n ? t : n + u[e[n]] > t ? n : t
                },
                f = function(e) {
                    var t, n, r, i, a = e.length,
                        s = new Array(2 * a);
                    for (n = 0, t = 0; t < a;)
                        if (r = e[t++], r < 128) s[n++] = r;
                        else if (i = u[r], i > 4) s[n++] = 65533, t += i - 1;
                    else {
                        for (r &= 2 === i ? 31 : 3 === i ? 15 : 7; i > 1 && t < a;) r = r << 6 | 63 & e[t++], i--;
                        i > 1 ? s[n++] = 65533 : r < 65536 ? s[n++] = r : (r -= 65536, s[n++] = 55296 | r >> 10 & 1023, s[n++] = 56320 | 1023 & r)
                    }
                    return s.length !== n && (s.subarray ? s = s.subarray(0, n) : s.length = n), o.applyFromCharCode(s)
                };
            n.utf8encode = function(e) {
                return a.nodebuffer ? s.newBuffer(e, "utf-8") : d(e)
            }, n.utf8decode = function(e) {
                return a.nodebuffer ? o.transformTo("nodebuffer", e).toString("utf-8") : (e = o.transformTo(a.uint8array ? "uint8array" : "array", e), f(e))
            }, o.inherits(r, c), r.prototype.processChunk = function(e) {
                var t = o.transformTo(a.uint8array ? "uint8array" : "array", e.data);
                if (this.leftOver && this.leftOver.length) {
                    if (a.uint8array) {
                        var r = t;
                        t = new Uint8Array(r.length + this.leftOver.length), t.set(this.leftOver, 0), t.set(r, this.leftOver.length)
                    } else t = this.leftOver.concat(t);
                    this.leftOver = null
                }
                var i = h(t),
                    s = t;
                i !== t.length && (a.uint8array ? (s = t.subarray(0, i), this.leftOver = t.subarray(i, t.length)) : (s = t.slice(0, i), this.leftOver = t.slice(i, t.length))), this.push({
                    data: n.utf8decode(s),
                    meta: e.meta
                })
            }, r.prototype.flush = function() {
                this.leftOver && this.leftOver.length && (this.push({
                    data: n.utf8decode(this.leftOver),
                    meta: {}
                }), this.leftOver = null)
            }, n.Utf8DecodeWorker = r, o.inherits(i, c), i.prototype.processChunk = function(e) {
                this.push({
                    data: n.utf8encode(e.data),
                    meta: e.meta
                })
            }, n.Utf8EncodeWorker = i
        }, {
            "./nodejsUtils": 14,
            "./stream/GenericWorker": 28,
            "./support": 30,
            "./utils": 32
        }],
        32: [function(e, t, n) {
            "use strict";

            function r(e) {
                var t = null;
                return t = c.uint8array ? new Uint8Array(e.length) : new Array(e.length), o(e, t)
            }

            function i(e) {
                return e
            }

            function o(e, t) {
                for (var n = 0; n < e.length; ++n) t[n] = 255 & e.charCodeAt(n);
                return t
            }

            function a(e) {
                var t = 65536,
                    r = n.getTypeOf(e),
                    i = !0;
                if ("uint8array" === r ? i = f.applyCanBeUsed.uint8array : "nodebuffer" === r && (i = f.applyCanBeUsed.nodebuffer), i)
                    for (; t > 1;) try {
                        return f.stringifyByChunk(e, r, t)
                    } catch (e) {
                        t = Math.floor(t / 2)
                    }
                return f.stringifyByChar(e)
            }

            function s(e, t) {
                for (var n = 0; n < e.length; n++) t[n] = e[n];
                return t
            }
            var c = e("./support"),
                u = e("./base64"),
                l = e("./nodejsUtils"),
                d = e("core-js/library/fn/set-immediate"),
                h = e("./external");
            n.newBlob = function(e, t) {
                n.checkSupport("blob");
                try {
                    return new Blob([e], {
                        type: t
                    })
                } catch (n) {
                    try {
                        var r = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
                            i = new r;
                        return i.append(e), i.getBlob(t)
                    } catch (e) {
                        throw new Error("Bug : can't construct the Blob.")
                    }
                }
            };
            var f = {
                stringifyByChunk: function(e, t, n) {
                    var r = [],
                        i = 0,
                        o = e.length;
                    if (o <= n) return String.fromCharCode.apply(null, e);
                    for (; i < o;) "array" === t || "nodebuffer" === t ? r.push(String.fromCharCode.apply(null, e.slice(i, Math.min(i + n, o)))) : r.push(String.fromCharCode.apply(null, e.subarray(i, Math.min(i + n, o)))), i += n;
                    return r.join("")
                },
                stringifyByChar: function(e) {
                    for (var t = "", n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
                    return t
                },
                applyCanBeUsed: {
                    uint8array: function() {
                        try {
                            return c.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length
                        } catch (e) {
                            return !1
                        }
                    }(),
                    nodebuffer: function() {
                        try {
                            return c.nodebuffer && 1 === String.fromCharCode.apply(null, l.newBuffer(1)).length
                        } catch (e) {
                            return !1
                        }
                    }()
                }
            };
            n.applyFromCharCode = a;
            var p = {};
            p.string = {
                string: i,
                array: function(e) {
                    return o(e, new Array(e.length))
                },
                arraybuffer: function(e) {
                    return p.string.uint8array(e).buffer
                },
                uint8array: function(e) {
                    return o(e, new Uint8Array(e.length))
                },
                nodebuffer: function(e) {
                    return o(e, l.newBuffer(e.length))
                }
            }, p.array = {
                string: a,
                array: i,
                arraybuffer: function(e) {
                    return new Uint8Array(e).buffer
                },
                uint8array: function(e) {
                    return new Uint8Array(e)
                },
                nodebuffer: function(e) {
                    return l.newBuffer(e)
                }
            }, p.arraybuffer = {
                string: function(e) {
                    return a(new Uint8Array(e))
                },
                array: function(e) {
                    return s(new Uint8Array(e), new Array(e.byteLength))
                },
                arraybuffer: i,
                uint8array: function(e) {
                    return new Uint8Array(e)
                },
                nodebuffer: function(e) {
                    return l.newBuffer(new Uint8Array(e))
                }
            }, p.uint8array = {
                string: a,
                array: function(e) {
                    return s(e, new Array(e.length))
                },
                arraybuffer: function(e) {
                    return e.buffer
                },
                uint8array: i,
                nodebuffer: function(e) {
                    return l.newBuffer(e)
                }
            }, p.nodebuffer = {
                string: a,
                array: function(e) {
                    return s(e, new Array(e.length))
                },
                arraybuffer: function(e) {
                    return p.nodebuffer.uint8array(e).buffer
                },
                uint8array: function(e) {
                    return s(e, new Uint8Array(e.length))
                },
                nodebuffer: i
            }, n.transformTo = function(e, t) {
                if (t || (t = ""), !e) return t;
                n.checkSupport(e);
                var r = n.getTypeOf(t),
                    i = p[r][e](t);
                return i
            }, n.getTypeOf = function(e) {
                return "string" == typeof e ? "string" : "[object Array]" === Object.prototype.toString.call(e) ? "array" : c.nodebuffer && l.isBuffer(e) ? "nodebuffer" : c.uint8array && e instanceof Uint8Array ? "uint8array" : c.arraybuffer && e instanceof ArrayBuffer ? "arraybuffer" : void 0
            }, n.checkSupport = function(e) {
                var t = c[e.toLowerCase()];
                if (!t) throw new Error(e + " is not supported by this platform")
            }, n.MAX_VALUE_16BITS = 65535, n.MAX_VALUE_32BITS = -1, n.pretty = function(e) {
                var t, n, r = "";
                for (n = 0; n < (e || "").length; n++) t = e.charCodeAt(n), r += "\\x" + (t < 16 ? "0" : "") + t.toString(16).toUpperCase();
                return r
            }, n.delay = function(e, t, n) {
                d(function() {
                    e.apply(n || null, t || [])
                })
            }, n.inherits = function(e, t) {
                var n = function() {};
                n.prototype = t.prototype, e.prototype = new n
            }, n.extend = function() {
                var e, t, n = {};
                for (e = 0; e < arguments.length; e++)
                    for (t in arguments[e]) arguments[e].hasOwnProperty(t) && "undefined" == typeof n[t] && (n[t] = arguments[e][t]);
                return n
            }, n.prepareContent = function(e, t, i, o, a) {
                var s = h.Promise.resolve(t).then(function(e) {
                    return c.blob && e instanceof Blob && "undefined" != typeof FileReader ? new h.Promise(function(t, n) {
                        var r = new FileReader;
                        r.onload = function(e) {
                            t(e.target.result)
                        }, r.onerror = function(e) {
                            n(e.target.error)
                        }, r.readAsArrayBuffer(e)
                    }) : e
                });
                return s.then(function(t) {
                    var s = n.getTypeOf(t);
                    return s ? ("arraybuffer" === s ? t = n.transformTo("uint8array", t) : "string" === s && (a ? t = u.decode(t) : i && o !== !0 && (t = r(t))), t) : h.Promise.reject(new Error("The data of '" + e + "' is in an unsupported format !"))
                })
            }
        }, {
            "./base64": 1,
            "./external": 6,
            "./nodejsUtils": 14,
            "./support": 30,
            "core-js/library/fn/set-immediate": 36
        }],
        33: [function(e, t, n) {
            "use strict";

            function r(e) {
                this.files = [], this.loadOptions = e
            }
            var i = e("./reader/readerFor"),
                o = e("./utils"),
                a = e("./signature"),
                s = e("./zipEntry"),
                c = (e("./utf8"), e("./support"));
            r.prototype = {
                checkSignature: function(e) {
                    if (!this.reader.readAndCheckSignature(e)) {
                        this.reader.index -= 4;
                        var t = this.reader.readString(4);
                        throw new Error("Corrupted zip or bug : unexpected signature (" + o.pretty(t) + ", expected " + o.pretty(e) + ")")
                    }
                },
                isSignature: function(e, t) {
                    var n = this.reader.index;
                    this.reader.setIndex(e);
                    var r = this.reader.readString(4),
                        i = r === t;
                    return this.reader.setIndex(n), i
                },
                readBlockEndOfCentral: function() {
                    this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
                    var e = this.reader.readData(this.zipCommentLength),
                        t = c.uint8array ? "uint8array" : "array",
                        n = o.transformTo(t, e);
                    this.zipComment = this.loadOptions.decodeFileName(n)
                },
                readBlockZip64EndOfCentral: function() {
                    this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
                    for (var e, t, n, r = this.zip64EndOfCentralSize - 44, i = 0; i < r;) e = this.reader.readInt(2), t = this.reader.readInt(4), n = this.reader.readData(t), this.zip64ExtensibleData[e] = {
                        id: e,
                        length: t,
                        value: n
                    }
                },
                readBlockZip64EndOfCentralLocator: function() {
                    if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), this.disksCount > 1) throw new Error("Multi-volumes zip are not supported")
                },
                readLocalFiles: function() {
                    var e, t;
                    for (e = 0; e < this.files.length; e++) t = this.files[e], this.reader.setIndex(t.localHeaderOffset), this.checkSignature(a.LOCAL_FILE_HEADER), t.readLocalPart(this.reader), t.handleUTF8(), t.processAttributes()
                },
                readCentralDir: function() {
                    var e;
                    for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER);) e = new s({
                        zip64: this.zip64
                    }, this.loadOptions), e.readCentralPart(this.reader), this.files.push(e);
                    if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length)
                },
                readEndOfCentral: function() {
                    var e = this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);
                    if (e < 0) {
                        var t = !this.isSignature(0, a.LOCAL_FILE_HEADER);
                        throw t ? new Error("Can't find end of central directory : is this a zip file ? If it is, see http://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip : can't find end of central directory")
                    }
                    this.reader.setIndex(e);
                    var n = e;
                    if (this.checkSignature(a.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === o.MAX_VALUE_16BITS || this.diskWithCentralDirStart === o.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === o.MAX_VALUE_16BITS || this.centralDirRecords === o.MAX_VALUE_16BITS || this.centralDirSize === o.MAX_VALUE_32BITS || this.centralDirOffset === o.MAX_VALUE_32BITS) {
                        if (this.zip64 = !0, e = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR), e < 0) throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");
                        if (this.reader.setIndex(e), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, a.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip : can't find the ZIP64 end of central directory");
                        this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral()
                    }
                    var r = this.centralDirOffset + this.centralDirSize;
                    this.zip64 && (r += 20, r += 12 + this.zip64EndOfCentralSize);
                    var i = n - r;
                    if (i > 0) this.isSignature(n, a.CENTRAL_FILE_HEADER) || (this.reader.zero = i);
                    else if (i < 0) throw new Error("Corrupted zip: missing " + Math.abs(i) + " bytes.")
                },
                prepareReader: function(e) {
                    this.reader = i(e)
                },
                load: function(e) {
                    this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles()
                }
            }, t.exports = r
        }, {
            "./reader/readerFor": 22,
            "./signature": 23,
            "./support": 30,
            "./utf8": 31,
            "./utils": 32,
            "./zipEntry": 34
        }],
        34: [function(e, t, n) {
            "use strict";

            function r(e, t) {
                this.options = e, this.loadOptions = t
            }
            var i = e("./reader/readerFor"),
                o = e("./utils"),
                a = e("./compressedObject"),
                s = e("./crc32"),
                c = e("./utf8"),
                u = e("./compressions"),
                l = e("./support"),
                d = 0,
                h = 3,
                f = function(e) {
                    for (var t in u)
                        if (u.hasOwnProperty(t) && u[t].magic === e) return u[t];
                    return null
                };
            r.prototype = {
                isEncrypted: function() {
                    return 1 === (1 & this.bitFlag)
                },
                useUTF8: function() {
                    return 2048 === (2048 & this.bitFlag)
                },
                readLocalPart: function(e) {
                    var t, n;
                    if (e.skip(22), this.fileNameLength = e.readInt(2), n = e.readInt(2), this.fileName = e.readData(this.fileNameLength), e.skip(n), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize === -1 || uncompressedSize === -1)");
                    if (t = f(this.compressionMethod), null === t) throw new Error("Corrupted zip : compression " + o.pretty(this.compressionMethod) + " unknown (inner file : " + o.transformTo("string", this.fileName) + ")");
                    this.decompressed = new a(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize))
                },
                readCentralPart: function(e) {
                    this.versionMadeBy = e.readInt(2), e.skip(2), this.bitFlag = e.readInt(2), this.compressionMethod = e.readString(2), this.date = e.readDate(), this.crc32 = e.readInt(4), this.compressedSize = e.readInt(4), this.uncompressedSize = e.readInt(4);
                    var t = e.readInt(2);
                    if (this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
                    e.skip(t), this.readExtraFields(e), this.parseZIP64ExtraField(e), this.fileComment = e.readData(this.fileCommentLength)
                },
                processAttributes: function() {
                    this.unixPermissions = null, this.dosPermissions = null;
                    var e = this.versionMadeBy >> 8;
                    this.dir = !!(16 & this.externalFileAttributes), e === d && (this.dosPermissions = 63 & this.externalFileAttributes), e === h && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = !0)
                },
                parseZIP64ExtraField: function(e) {
                    if (this.extraFields[1]) {
                        var t = i(this.extraFields[1].value);
                        this.uncompressedSize === o.MAX_VALUE_32BITS && (this.uncompressedSize = t.readInt(8)), this.compressedSize === o.MAX_VALUE_32BITS && (this.compressedSize = t.readInt(8)), this.localHeaderOffset === o.MAX_VALUE_32BITS && (this.localHeaderOffset = t.readInt(8)), this.diskNumberStart === o.MAX_VALUE_32BITS && (this.diskNumberStart = t.readInt(4))
                    }
                },
                readExtraFields: function(e) {
                    var t, n, r, i = e.index + this.extraFieldsLength;
                    for (this.extraFields || (this.extraFields = {}); e.index < i;) t = e.readInt(2), n = e.readInt(2), r = e.readData(n), this.extraFields[t] = {
                        id: t,
                        length: n,
                        value: r
                    }
                },
                handleUTF8: function() {
                    var e = l.uint8array ? "uint8array" : "array";
                    if (this.useUTF8()) this.fileNameStr = c.utf8decode(this.fileName), this.fileCommentStr = c.utf8decode(this.fileComment);
                    else {
                        var t = this.findExtraFieldUnicodePath();
                        if (null !== t) this.fileNameStr = t;
                        else {
                            var n = o.transformTo(e, this.fileName);
                            this.fileNameStr = this.loadOptions.decodeFileName(n)
                        }
                        var r = this.findExtraFieldUnicodeComment();
                        if (null !== r) this.fileCommentStr = r;
                        else {
                            var i = o.transformTo(e, this.fileComment);
                            this.fileCommentStr = this.loadOptions.decodeFileName(i)
                        }
                    }
                },
                findExtraFieldUnicodePath: function() {
                    var e = this.extraFields[28789];
                    if (e) {
                        var t = i(e.value);
                        return 1 !== t.readInt(1) ? null : s(this.fileName) !== t.readInt(4) ? null : c.utf8decode(t.readData(e.length - 5))
                    }
                    return null
                },
                findExtraFieldUnicodeComment: function() {
                    var e = this.extraFields[25461];
                    if (e) {
                        var t = i(e.value);
                        return 1 !== t.readInt(1) ? null : s(this.fileComment) !== t.readInt(4) ? null : c.utf8decode(t.readData(e.length - 5))
                    }
                    return null
                }
            }, t.exports = r
        }, {
            "./compressedObject": 2,
            "./compressions": 3,
            "./crc32": 4,
            "./reader/readerFor": 22,
            "./support": 30,
            "./utf8": 31,
            "./utils": 32
        }],
        35: [function(e, t, n) {
            "use strict";
            var r = e("./stream/StreamHelper"),
                i = e("./stream/DataWorker"),
                o = e("./utf8"),
                a = e("./compressedObject"),
                s = e("./stream/GenericWorker"),
                c = function(e, t, n) {
                    this.name = e, this.dir = n.dir, this.date = n.date, this.comment = n.comment, this.unixPermissions = n.unixPermissions, this.dosPermissions = n.dosPermissions, this._data = t, this._dataBinary = n.binary, this.options = {
                        compression: n.compression,
                        compressionOptions: n.compressionOptions
                    }
                };
            c.prototype = {
                internalStream: function(e) {
                    var t = e.toLowerCase(),
                        n = "string" === t || "text" === t;
                    "binarystring" !== t && "text" !== t || (t = "string");
                    var i = this._decompressWorker(),
                        a = !this._dataBinary;
                    return a && !n && (i = i.pipe(new o.Utf8EncodeWorker)), !a && n && (i = i.pipe(new o.Utf8DecodeWorker)), new r(i, t, "")
                },
                async: function(e, t) {
                    return this.internalStream(e).accumulate(t)
                },
                nodeStream: function(e, t) {
                    return this.internalStream(e || "nodebuffer").toNodejsStream(t)
                },
                _compressWorker: function(e, t) {
                    if (this._data instanceof a && this._data.compression.magic === e.magic) return this._data.getCompressedWorker();
                    var n = this._decompressWorker();
                    return this._dataBinary || (n = n.pipe(new o.Utf8EncodeWorker)), a.createWorkerFrom(n, e, t)
                },
                _decompressWorker: function() {
                    return this._data instanceof a ? this._data.getContentWorker() : this._data instanceof s ? this._data : new i(this._data)
                }
            };
            for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function() {
                    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                }, d = 0; d < u.length; d++) c.prototype[u[d]] = l;
            t.exports = c
        }, {
            "./compressedObject": 2,
            "./stream/DataWorker": 27,
            "./stream/GenericWorker": 28,
            "./stream/StreamHelper": 29,
            "./utf8": 31
        }],
        36: [function(e, t, n) {
            e("../modules/web.immediate"), t.exports = e("../modules/_core").setImmediate
        }, {
            "../modules/_core": 40,
            "../modules/web.immediate": 56
        }],
        37: [function(e, t, n) {
            t.exports = function(e) {
                if ("function" != typeof e) throw TypeError(e + " is not a function!");
                return e
            }
        }, {}],
        38: [function(e, t, n) {
            var r = e("./_is-object");
            t.exports = function(e) {
                if (!r(e)) throw TypeError(e + " is not an object!");
                return e
            }
        }, {
            "./_is-object": 51
        }],
        39: [function(e, t, n) {
            var r = {}.toString;
            t.exports = function(e) {
                return r.call(e).slice(8, -1)
            }
        }, {}],
        40: [function(e, t, n) {
            var r = t.exports = {
                version: "2.3.0"
            };
            "number" == typeof __e && (__e = r)
        }, {}],
        41: [function(e, t, n) {
            var r = e("./_a-function");
            t.exports = function(e, t, n) {
                if (r(e), void 0 === t) return e;
                switch (n) {
                    case 1:
                        return function(n) {
                            return e.call(t, n)
                        };
                    case 2:
                        return function(n, r) {
                            return e.call(t, n, r)
                        };
                    case 3:
                        return function(n, r, i) {
                            return e.call(t, n, r, i)
                        }
                }
                return function() {
                    return e.apply(t, arguments)
                }
            }
        }, {
            "./_a-function": 37
        }],
        42: [function(e, t, n) {
            t.exports = !e("./_fails")(function() {
                return 7 != Object.defineProperty({}, "a", {
                    get: function() {
                        return 7
                    }
                }).a
            })
        }, {
            "./_fails": 45
        }],
        43: [function(e, t, n) {
            var r = e("./_is-object"),
                i = e("./_global").document,
                o = r(i) && r(i.createElement);
            t.exports = function(e) {
                return o ? i.createElement(e) : {}
            }
        }, {
            "./_global": 46,
            "./_is-object": 51
        }],
        44: [function(e, t, n) {
            var r = e("./_global"),
                i = e("./_core"),
                o = e("./_ctx"),
                a = e("./_hide"),
                s = "prototype",
                c = function(e, t, n) {
                    var u, l, d, h = e & c.F,
                        f = e & c.G,
                        p = e & c.S,
                        m = e & c.P,
                        g = e & c.B,
                        v = e & c.W,
                        y = f ? i : i[t] || (i[t] = {}),
                        b = y[s],
                        w = f ? r : p ? r[t] : (r[t] || {})[s];
                    f && (n = t);
                    for (u in n) l = !h && w && void 0 !== w[u], l && u in y || (d = l ? w[u] : n[u], y[u] = f && "function" != typeof w[u] ? n[u] : g && l ? o(d, r) : v && w[u] == d ? function(e) {
                        var t = function(t, n, r) {
                            if (this instanceof e) {
                                switch (arguments.length) {
                                    case 0:
                                        return new e;
                                    case 1:
                                        return new e(t);
                                    case 2:
                                        return new e(t, n)
                                }
                                return new e(t, n, r)
                            }
                            return e.apply(this, arguments)
                        };
                        return t[s] = e[s], t
                    }(d) : m && "function" == typeof d ? o(Function.call, d) : d, m && ((y.virtual || (y.virtual = {}))[u] = d, e & c.R && b && !b[u] && a(b, u, d)))
                };
            c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c
        }, {
            "./_core": 40,
            "./_ctx": 41,
            "./_global": 46,
            "./_hide": 47
        }],
        45: [function(e, t, n) {
            t.exports = function(e) {
                try {
                    return !!e()
                } catch (e) {
                    return !0
                }
            }
        }, {}],
        46: [function(e, t, n) {
            var r = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = r)
        }, {}],
        47: [function(e, t, n) {
            var r = e("./_object-dp"),
                i = e("./_property-desc");
            t.exports = e("./_descriptors") ? function(e, t, n) {
                return r.f(e, t, i(1, n))
            } : function(e, t, n) {
                return e[t] = n, e
            }
        }, {
            "./_descriptors": 42,
            "./_object-dp": 52,
            "./_property-desc": 53
        }],
        48: [function(e, t, n) {
            t.exports = e("./_global").document && document.documentElement
        }, {
            "./_global": 46
        }],
        49: [function(e, t, n) {
            t.exports = !e("./_descriptors") && !e("./_fails")(function() {
                return 7 != Object.defineProperty(e("./_dom-create")("div"), "a", {
                    get: function() {
                        return 7
                    }
                }).a
            })
        }, {
            "./_descriptors": 42,
            "./_dom-create": 43,
            "./_fails": 45
        }],
        50: [function(e, t, n) {
            t.exports = function(e, t, n) {
                var r = void 0 === n;
                switch (t.length) {
                    case 0:
                        return r ? e() : e.call(n);
                    case 1:
                        return r ? e(t[0]) : e.call(n, t[0]);
                    case 2:
                        return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);
                    case 3:
                        return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);
                    case 4:
                        return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3])
                }
                return e.apply(n, t)
            }
        }, {}],
        51: [function(e, t, n) {
            t.exports = function(e) {
                return "object" == typeof e ? null !== e : "function" == typeof e
            }
        }, {}],
        52: [function(e, t, n) {
            var r = e("./_an-object"),
                i = e("./_ie8-dom-define"),
                o = e("./_to-primitive"),
                a = Object.defineProperty;
            n.f = e("./_descriptors") ? Object.defineProperty : function(e, t, n) {
                if (r(e), t = o(t, !0), r(n), i) try {
                    return a(e, t, n)
                } catch (e) {}
                if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
                return "value" in n && (e[t] = n.value), e
            }
        }, {
            "./_an-object": 38,
            "./_descriptors": 42,
            "./_ie8-dom-define": 49,
            "./_to-primitive": 55
        }],
        53: [function(e, t, n) {
            t.exports = function(e, t) {
                return {
                    enumerable: !(1 & e),
                    configurable: !(2 & e),
                    writable: !(4 & e),
                    value: t
                }
            }
        }, {}],
        54: [function(e, t, n) {
            var r, i, o, a = e("./_ctx"),
                s = e("./_invoke"),
                c = e("./_html"),
                u = e("./_dom-create"),
                l = e("./_global"),
                d = l.process,
                h = l.setImmediate,
                f = l.clearImmediate,
                p = l.MessageChannel,
                m = 0,
                g = {},
                v = "onreadystatechange",
                y = function() {
                    var e = +this;
                    if (g.hasOwnProperty(e)) {
                        var t = g[e];
                        delete g[e], t()
                    }
                },
                b = function(e) {
                    y.call(e.data)
                };
            h && f || (h = function(e) {
                for (var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
                return g[++m] = function() {
                    s("function" == typeof e ? e : Function(e), t)
                }, r(m), m
            }, f = function(e) {
                delete g[e]
            }, "process" == e("./_cof")(d) ? r = function(e) {
                d.nextTick(a(y, e, 1))
            } : p ? (i = new p, o = i.port2, i.port1.onmessage = b, r = a(o.postMessage, o, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (r = function(e) {
                l.postMessage(e + "", "*")
            }, l.addEventListener("message", b, !1)) : r = v in u("script") ? function(e) {
                c.appendChild(u("script"))[v] = function() {
                    c.removeChild(this), y.call(e)
                }
            } : function(e) {
                setTimeout(a(y, e, 1), 0)
            }), t.exports = {
                set: h,
                clear: f
            }
        }, {
            "./_cof": 39,
            "./_ctx": 41,
            "./_dom-create": 43,
            "./_global": 46,
            "./_html": 48,
            "./_invoke": 50
        }],
        55: [function(e, t, n) {
            var r = e("./_is-object");
            t.exports = function(e, t) {
                if (!r(e)) return e;
                var n, i;
                if (t && "function" == typeof(n = e.toString) && !r(i = n.call(e))) return i;
                if ("function" == typeof(n = e.valueOf) && !r(i = n.call(e))) return i;
                if (!t && "function" == typeof(n = e.toString) && !r(i = n.call(e))) return i;
                throw TypeError("Can't convert object to primitive value")
            }
        }, {
            "./_is-object": 51
        }],
        56: [function(e, t, n) {
            var r = e("./_export"),
                i = e("./_task");
            r(r.G + r.B, {
                setImmediate: i.set,
                clearImmediate: i.clear
            })
        }, {
            "./_export": 44,
            "./_task": 54
        }],
        57: [function(e, t, n) {
            (function(e) {
                "use strict";

                function n() {
                    l = !0;
                    for (var e, t, n = d.length; n;) {
                        for (t = d, d = [], e = -1; ++e < n;) t[e]();
                        n = d.length
                    }
                    l = !1
                }

                function r(e) {
                    1 !== d.push(e) || l || i()
                }
                var i, o = e.MutationObserver || e.WebKitMutationObserver;
                if (o) {
                    var a = 0,
                        s = new o(n),
                        c = e.document.createTextNode("");
                    s.observe(c, {
                        characterData: !0
                    }), i = function() {
                        c.data = a = ++a % 2
                    }
                } else if (e.setImmediate || "undefined" == typeof e.MessageChannel) i = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
                    var t = e.document.createElement("script");
                    t.onreadystatechange = function() {
                        n(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null
                    }, e.document.documentElement.appendChild(t)
                } : function() {
                    setTimeout(n, 0)
                };
                else {
                    var u = new e.MessageChannel;
                    u.port1.onmessage = n, i = function() {
                        u.port2.postMessage(0)
                    }
                }
                var l, d = [];
                t.exports = r
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        58: [function(e, t, n) {
            "use strict";

            function r() {}

            function i(e) {
                if ("function" != typeof e) throw new TypeError("resolver must be a function");
                this.state = y, this.queue = [], this.outcome = void 0, e !== r && c(this, e)
            }

            function o(e, t, n) {
                this.promise = e, "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" == typeof n && (this.onRejected = n, this.callRejected = this.otherCallRejected)
            }

            function a(e, t, n) {
                p(function() {
                    var r;
                    try {
                        r = t(n)
                    } catch (t) {
                        return m.reject(e, t)
                    }
                    r === e ? m.reject(e, new TypeError("Cannot resolve promise with itself")) : m.resolve(e, r)
                })
            }

            function s(e) {
                var t = e && e.then;
                if (e && "object" == typeof e && "function" == typeof t) return function() {
                    t.apply(e, arguments)
                }
            }

            function c(e, t) {
                function n(t) {
                    o || (o = !0, m.reject(e, t))
                }

                function r(t) {
                    o || (o = !0, m.resolve(e, t))
                }

                function i() {
                    t(r, n)
                }
                var o = !1,
                    a = u(i);
                "error" === a.status && n(a.value)
            }

            function u(e, t) {
                var n = {};
                try {
                    n.value = e(t), n.status = "success"
                } catch (e) {
                    n.status = "error", n.value = e
                }
                return n
            }

            function l(e) {
                return e instanceof this ? e : m.resolve(new this(r), e)
            }

            function d(e) {
                var t = new this(r);
                return m.reject(t, e)
            }

            function h(e) {
                function t(e, t) {
                    function r(e) {
                        a[t] = e, ++s !== i || o || (o = !0, m.resolve(u, a))
                    }
                    n.resolve(e).then(r, function(e) {
                        o || (o = !0, m.reject(u, e))
                    })
                }
                var n = this;
                if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                var i = e.length,
                    o = !1;
                if (!i) return this.resolve([]);
                for (var a = new Array(i), s = 0, c = -1, u = new this(r); ++c < i;) t(e[c], c);
                return u
            }

            function f(e) {
                function t(e) {
                    n.resolve(e).then(function(e) {
                        o || (o = !0, m.resolve(s, e))
                    }, function(e) {
                        o || (o = !0, m.reject(s, e))
                    })
                }
                var n = this;
                if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
                var i = e.length,
                    o = !1;
                if (!i) return this.resolve([]);
                for (var a = -1, s = new this(r); ++a < i;) t(e[a]);
                return s
            }
            var p = e("immediate"),
                m = {},
                g = ["REJECTED"],
                v = ["FULFILLED"],
                y = ["PENDING"];
            t.exports = i, i.prototype.catch = function(e) {
                return this.then(null, e)
            }, i.prototype.then = function(e, t) {
                if ("function" != typeof e && this.state === v || "function" != typeof t && this.state === g) return this;
                var n = new this.constructor(r);
                if (this.state !== y) {
                    var i = this.state === v ? e : t;
                    a(n, i, this.outcome)
                } else this.queue.push(new o(n, e, t));
                return n
            }, o.prototype.callFulfilled = function(e) {
                m.resolve(this.promise, e)
            }, o.prototype.otherCallFulfilled = function(e) {
                a(this.promise, this.onFulfilled, e)
            }, o.prototype.callRejected = function(e) {
                m.reject(this.promise, e)
            }, o.prototype.otherCallRejected = function(e) {
                a(this.promise, this.onRejected, e)
            }, m.resolve = function(e, t) {
                var n = u(s, t);
                if ("error" === n.status) return m.reject(e, n.value);
                var r = n.value;
                if (r) c(e, r);
                else {
                    e.state = v, e.outcome = t;
                    for (var i = -1, o = e.queue.length; ++i < o;) e.queue[i].callFulfilled(t)
                }
                return e
            }, m.reject = function(e, t) {
                e.state = g, e.outcome = t;
                for (var n = -1, r = e.queue.length; ++n < r;) e.queue[n].callRejected(t);
                return e
            }, i.resolve = l, i.reject = d, i.all = h, i.race = f
        }, {
            immediate: 57
        }],
        59: [function(e, t, n) {
            "use strict";
            var r = e("./lib/utils/common").assign,
                i = e("./lib/deflate"),
                o = e("./lib/inflate"),
                a = e("./lib/zlib/constants"),
                s = {};
            r(s, i, o, a), t.exports = s
        }, {
            "./lib/deflate": 60,
            "./lib/inflate": 61,
            "./lib/utils/common": 62,
            "./lib/zlib/constants": 65
        }],
        60: [function(e, t, n) {
            "use strict";

            function r(e) {
                if (!(this instanceof r)) return new r(e);
                this.options = c.assign({
                    level: y,
                    method: w,
                    chunkSize: 16384,
                    windowBits: 15,
                    memLevel: 8,
                    strategy: b,
                    to: ""
                }, e || {});
                var t = this.options;
                t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new d, this.strm.avail_out = 0;
                var n = s.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
                if (n !== m) throw new Error(l[n]);
                if (t.header && s.deflateSetHeader(this.strm, t.header), t.dictionary) {
                    var i;
                    if (i = "string" == typeof t.dictionary ? u.string2buf(t.dictionary) : "[object ArrayBuffer]" === h.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary, n = s.deflateSetDictionary(this.strm, i), n !== m) throw new Error(l[n]);
                    this._dict_set = !0
                }
            }

            function i(e, t) {
                var n = new r(t);
                if (n.push(e, !0), n.err) throw n.msg;
                return n.result
            }

            function o(e, t) {
                return t = t || {}, t.raw = !0, i(e, t)
            }

            function a(e, t) {
                return t = t || {}, t.gzip = !0, i(e, t)
            }
            var s = e("./zlib/deflate"),
                c = e("./utils/common"),
                u = e("./utils/strings"),
                l = e("./zlib/messages"),
                d = e("./zlib/zstream"),
                h = Object.prototype.toString,
                f = 0,
                p = 4,
                m = 0,
                g = 1,
                v = 2,
                y = -1,
                b = 0,
                w = 8;
            r.prototype.push = function(e, t) {
                var n, r, i = this.strm,
                    o = this.options.chunkSize;
                if (this.ended) return !1;
                r = t === ~~t ? t : t === !0 ? p : f, "string" == typeof e ? i.input = u.string2buf(e) : "[object ArrayBuffer]" === h.call(e) ? i.input = new Uint8Array(e) : i.input = e, i.next_in = 0, i.avail_in = i.input.length;
                do {
                    if (0 === i.avail_out && (i.output = new c.Buf8(o), i.next_out = 0, i.avail_out = o), n = s.deflate(i, r), n !== g && n !== m) return this.onEnd(n), this.ended = !0, !1;
                    0 !== i.avail_out && (0 !== i.avail_in || r !== p && r !== v) || ("string" === this.options.to ? this.onData(u.buf2binstring(c.shrinkBuf(i.output, i.next_out))) : this.onData(c.shrinkBuf(i.output, i.next_out)))
                } while ((i.avail_in > 0 || 0 === i.avail_out) && n !== g);
                return r === p ? (n = s.deflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === m) : r !== v || (this.onEnd(m), i.avail_out = 0, !0)
            }, r.prototype.onData = function(e) {
                this.chunks.push(e)
            }, r.prototype.onEnd = function(e) {
                e === m && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = c.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
            }, n.Deflate = r, n.deflate = i, n.deflateRaw = o, n.gzip = a
        }, {
            "./utils/common": 62,
            "./utils/strings": 63,
            "./zlib/deflate": 67,
            "./zlib/messages": 72,
            "./zlib/zstream": 74
        }],
        61: [function(e, t, n) {
            "use strict";

            function r(e) {
                if (!(this instanceof r)) return new r(e);
                this.options = s.assign({
                    chunkSize: 16384,
                    windowBits: 0,
                    to: ""
                }, e || {});
                var t = this.options;
                t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && 0 === (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new d,
                    this.strm.avail_out = 0;
                var n = a.inflateInit2(this.strm, t.windowBits);
                if (n !== u.Z_OK) throw new Error(l[n]);
                this.header = new h, a.inflateGetHeader(this.strm, this.header)
            }

            function i(e, t) {
                var n = new r(t);
                if (n.push(e, !0), n.err) throw n.msg;
                return n.result
            }

            function o(e, t) {
                return t = t || {}, t.raw = !0, i(e, t)
            }
            var a = e("./zlib/inflate"),
                s = e("./utils/common"),
                c = e("./utils/strings"),
                u = e("./zlib/constants"),
                l = e("./zlib/messages"),
                d = e("./zlib/zstream"),
                h = e("./zlib/gzheader"),
                f = Object.prototype.toString;
            r.prototype.push = function(e, t) {
                var n, r, i, o, l, d, h = this.strm,
                    p = this.options.chunkSize,
                    m = this.options.dictionary,
                    g = !1;
                if (this.ended) return !1;
                r = t === ~~t ? t : t === !0 ? u.Z_FINISH : u.Z_NO_FLUSH, "string" == typeof e ? h.input = c.binstring2buf(e) : "[object ArrayBuffer]" === f.call(e) ? h.input = new Uint8Array(e) : h.input = e, h.next_in = 0, h.avail_in = h.input.length;
                do {
                    if (0 === h.avail_out && (h.output = new s.Buf8(p), h.next_out = 0, h.avail_out = p), n = a.inflate(h, u.Z_NO_FLUSH), n === u.Z_NEED_DICT && m && (d = "string" == typeof m ? c.string2buf(m) : "[object ArrayBuffer]" === f.call(m) ? new Uint8Array(m) : m, n = a.inflateSetDictionary(this.strm, d)), n === u.Z_BUF_ERROR && g === !0 && (n = u.Z_OK, g = !1), n !== u.Z_STREAM_END && n !== u.Z_OK) return this.onEnd(n), this.ended = !0, !1;
                    h.next_out && (0 !== h.avail_out && n !== u.Z_STREAM_END && (0 !== h.avail_in || r !== u.Z_FINISH && r !== u.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i = c.utf8border(h.output, h.next_out), o = h.next_out - i, l = c.buf2string(h.output, i), h.next_out = o, h.avail_out = p - o, o && s.arraySet(h.output, h.output, i, o, 0), this.onData(l)) : this.onData(s.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (g = !0)
                } while ((h.avail_in > 0 || 0 === h.avail_out) && n !== u.Z_STREAM_END);
                return n === u.Z_STREAM_END && (r = u.Z_FINISH), r === u.Z_FINISH ? (n = a.inflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === u.Z_OK) : r !== u.Z_SYNC_FLUSH || (this.onEnd(u.Z_OK), h.avail_out = 0, !0)
            }, r.prototype.onData = function(e) {
                this.chunks.push(e)
            }, r.prototype.onEnd = function(e) {
                e === u.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
            }, n.Inflate = r, n.inflate = i, n.inflateRaw = o, n.ungzip = i
        }, {
            "./utils/common": 62,
            "./utils/strings": 63,
            "./zlib/constants": 65,
            "./zlib/gzheader": 68,
            "./zlib/inflate": 70,
            "./zlib/messages": 72,
            "./zlib/zstream": 74
        }],
        62: [function(e, t, n) {
            "use strict";
            var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
            n.assign = function(e) {
                for (var t = Array.prototype.slice.call(arguments, 1); t.length;) {
                    var n = t.shift();
                    if (n) {
                        if ("object" != typeof n) throw new TypeError(n + "must be non-object");
                        for (var r in n) n.hasOwnProperty(r) && (e[r] = n[r])
                    }
                }
                return e
            }, n.shrinkBuf = function(e, t) {
                return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e)
            };
            var i = {
                    arraySet: function(e, t, n, r, i) {
                        if (t.subarray && e.subarray) return void e.set(t.subarray(n, n + r), i);
                        for (var o = 0; o < r; o++) e[i + o] = t[n + o]
                    },
                    flattenChunks: function(e) {
                        var t, n, r, i, o, a;
                        for (r = 0, t = 0, n = e.length; t < n; t++) r += e[t].length;
                        for (a = new Uint8Array(r), i = 0, t = 0, n = e.length; t < n; t++) o = e[t], a.set(o, i), i += o.length;
                        return a
                    }
                },
                o = {
                    arraySet: function(e, t, n, r, i) {
                        for (var o = 0; o < r; o++) e[i + o] = t[n + o]
                    },
                    flattenChunks: function(e) {
                        return [].concat.apply([], e)
                    }
                };
            n.setTyped = function(e) {
                e ? (n.Buf8 = Uint8Array, n.Buf16 = Uint16Array, n.Buf32 = Int32Array, n.assign(n, i)) : (n.Buf8 = Array, n.Buf16 = Array, n.Buf32 = Array, n.assign(n, o))
            }, n.setTyped(r)
        }, {}],
        63: [function(e, t, n) {
            "use strict";

            function r(e, t) {
                if (t < 65537 && (e.subarray && a || !e.subarray && o)) return String.fromCharCode.apply(null, i.shrinkBuf(e, t));
                for (var n = "", r = 0; r < t; r++) n += String.fromCharCode(e[r]);
                return n
            }
            var i = e("./common"),
                o = !0,
                a = !0;
            try {
                String.fromCharCode.apply(null, [0])
            } catch (e) {
                o = !1
            }
            try {
                String.fromCharCode.apply(null, new Uint8Array(1))
            } catch (e) {
                a = !1
            }
            for (var s = new i.Buf8(256), c = 0; c < 256; c++) s[c] = c >= 252 ? 6 : c >= 248 ? 5 : c >= 240 ? 4 : c >= 224 ? 3 : c >= 192 ? 2 : 1;
            s[254] = s[254] = 1, n.string2buf = function(e) {
                var t, n, r, o, a, s = e.length,
                    c = 0;
                for (o = 0; o < s; o++) n = e.charCodeAt(o), 55296 === (64512 & n) && o + 1 < s && (r = e.charCodeAt(o + 1), 56320 === (64512 & r) && (n = 65536 + (n - 55296 << 10) + (r - 56320), o++)), c += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
                for (t = new i.Buf8(c), a = 0, o = 0; a < c; o++) n = e.charCodeAt(o), 55296 === (64512 & n) && o + 1 < s && (r = e.charCodeAt(o + 1), 56320 === (64512 & r) && (n = 65536 + (n - 55296 << 10) + (r - 56320), o++)), n < 128 ? t[a++] = n : n < 2048 ? (t[a++] = 192 | n >>> 6, t[a++] = 128 | 63 & n) : n < 65536 ? (t[a++] = 224 | n >>> 12, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | 63 & n) : (t[a++] = 240 | n >>> 18, t[a++] = 128 | n >>> 12 & 63, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | 63 & n);
                return t
            }, n.buf2binstring = function(e) {
                return r(e, e.length)
            }, n.binstring2buf = function(e) {
                for (var t = new i.Buf8(e.length), n = 0, r = t.length; n < r; n++) t[n] = e.charCodeAt(n);
                return t
            }, n.buf2string = function(e, t) {
                var n, i, o, a, c = t || e.length,
                    u = new Array(2 * c);
                for (i = 0, n = 0; n < c;)
                    if (o = e[n++], o < 128) u[i++] = o;
                    else if (a = s[o], a > 4) u[i++] = 65533, n += a - 1;
                else {
                    for (o &= 2 === a ? 31 : 3 === a ? 15 : 7; a > 1 && n < c;) o = o << 6 | 63 & e[n++], a--;
                    a > 1 ? u[i++] = 65533 : o < 65536 ? u[i++] = o : (o -= 65536, u[i++] = 55296 | o >> 10 & 1023, u[i++] = 56320 | 1023 & o)
                }
                return r(u, i)
            }, n.utf8border = function(e, t) {
                var n;
                for (t = t || e.length, t > e.length && (t = e.length), n = t - 1; n >= 0 && 128 === (192 & e[n]);) n--;
                return n < 0 ? t : 0 === n ? t : n + s[e[n]] > t ? n : t
            }
        }, {
            "./common": 62
        }],
        64: [function(e, t, n) {
            "use strict";

            function r(e, t, n, r) {
                for (var i = 65535 & e | 0, o = e >>> 16 & 65535 | 0, a = 0; 0 !== n;) {
                    a = n > 2e3 ? 2e3 : n, n -= a;
                    do i = i + t[r++] | 0, o = o + i | 0; while (--a);
                    i %= 65521, o %= 65521
                }
                return i | o << 16 | 0
            }
            t.exports = r
        }, {}],
        65: [function(e, t, n) {
            "use strict";
            t.exports = {
                Z_NO_FLUSH: 0,
                Z_PARTIAL_FLUSH: 1,
                Z_SYNC_FLUSH: 2,
                Z_FULL_FLUSH: 3,
                Z_FINISH: 4,
                Z_BLOCK: 5,
                Z_TREES: 6,
                Z_OK: 0,
                Z_STREAM_END: 1,
                Z_NEED_DICT: 2,
                Z_ERRNO: -1,
                Z_STREAM_ERROR: -2,
                Z_DATA_ERROR: -3,
                Z_BUF_ERROR: -5,
                Z_NO_COMPRESSION: 0,
                Z_BEST_SPEED: 1,
                Z_BEST_COMPRESSION: 9,
                Z_DEFAULT_COMPRESSION: -1,
                Z_FILTERED: 1,
                Z_HUFFMAN_ONLY: 2,
                Z_RLE: 3,
                Z_FIXED: 4,
                Z_DEFAULT_STRATEGY: 0,
                Z_BINARY: 0,
                Z_TEXT: 1,
                Z_UNKNOWN: 2,
                Z_DEFLATED: 8
            }
        }, {}],
        66: [function(e, t, n) {
            "use strict";

            function r() {
                for (var e, t = [], n = 0; n < 256; n++) {
                    e = n;
                    for (var r = 0; r < 8; r++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                    t[n] = e
                }
                return t
            }

            function i(e, t, n, r) {
                var i = o,
                    a = r + n;
                e ^= -1;
                for (var s = r; s < a; s++) e = e >>> 8 ^ i[255 & (e ^ t[s])];
                return e ^ -1
            }
            var o = r();
            t.exports = i
        }, {}],
        67: [function(e, t, n) {
            "use strict";

            function r(e, t) {
                return e.msg = B[t], t
            }

            function i(e) {
                return (e << 1) - (e > 4 ? 9 : 0)
            }

            function o(e) {
                for (var t = e.length; --t >= 0;) e[t] = 0
            }

            function a(e) {
                var t = e.state,
                    n = t.pending;
                n > e.avail_out && (n = e.avail_out), 0 !== n && (O.arraySet(e.output, t.pending_buf, t.pending_out, n, e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, 0 === t.pending && (t.pending_out = 0))
            }

            function s(e, t) {
                D._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, a(e.strm)
            }

            function c(e, t) {
                e.pending_buf[e.pending++] = t
            }

            function u(e, t) {
                e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t
            }

            function l(e, t, n, r) {
                var i = e.avail_in;
                return i > r && (i = r), 0 === i ? 0 : (e.avail_in -= i, O.arraySet(t, e.input, e.next_in, i, n), 1 === e.state.wrap ? e.adler = N(e.adler, t, i, n) : 2 === e.state.wrap && (e.adler = R(e.adler, t, i, n)), e.next_in += i, e.total_in += i, i)
            }

            function d(e, t) {
                var n, r, i = e.max_chain_length,
                    o = e.strstart,
                    a = e.prev_length,
                    s = e.nice_match,
                    c = e.strstart > e.w_size - de ? e.strstart - (e.w_size - de) : 0,
                    u = e.window,
                    l = e.w_mask,
                    d = e.prev,
                    h = e.strstart + le,
                    f = u[o + a - 1],
                    p = u[o + a];
                e.prev_length >= e.good_match && (i >>= 2), s > e.lookahead && (s = e.lookahead);
                do
                    if (n = t, u[n + a] === p && u[n + a - 1] === f && u[n] === u[o] && u[++n] === u[o + 1]) {
                        o += 2, n++;
                        do; while (u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && o < h);
                        if (r = le - (h - o), o = h - le, r > a) {
                            if (e.match_start = t, a = r, r >= s) break;
                            f = u[o + a - 1], p = u[o + a]
                        }
                    }
                while ((t = d[t & l]) > c && 0 !== --i);
                return a <= e.lookahead ? a : e.lookahead
            }

            function h(e) {
                var t, n, r, i, o, a = e.w_size;
                do {
                    if (i = e.window_size - e.lookahead - e.strstart, e.strstart >= a + (a - de)) {
                        O.arraySet(e.window, e.window, a, a, 0), e.match_start -= a, e.strstart -= a, e.block_start -= a, n = e.hash_size, t = n;
                        do r = e.head[--t], e.head[t] = r >= a ? r - a : 0; while (--n);
                        n = a, t = n;
                        do r = e.prev[--t], e.prev[t] = r >= a ? r - a : 0; while (--n);
                        i += a
                    }
                    if (0 === e.strm.avail_in) break;
                    if (n = l(e.strm, e.window, e.strstart + e.lookahead, i), e.lookahead += n, e.lookahead + e.insert >= ue)
                        for (o = e.strstart - e.insert, e.ins_h = e.window[o], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + ue - 1]) & e.hash_mask, e.prev[o & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = o, o++, e.insert--, !(e.lookahead + e.insert < ue)););
                } while (e.lookahead < de && 0 !== e.strm.avail_in)
            }

            function f(e, t) {
                var n = 65535;
                for (n > e.pending_buf_size - 5 && (n = e.pending_buf_size - 5);;) {
                    if (e.lookahead <= 1) {
                        if (h(e), 0 === e.lookahead && t === L) return we;
                        if (0 === e.lookahead) break
                    }
                    e.strstart += e.lookahead, e.lookahead = 0;
                    var r = e.block_start + n;
                    if ((0 === e.strstart || e.strstart >= r) && (e.lookahead = e.strstart - r, e.strstart = r, s(e, !1), 0 === e.strm.avail_out)) return we;
                    if (e.strstart - e.block_start >= e.w_size - de && (s(e, !1), 0 === e.strm.avail_out)) return we
                }
                return e.insert = 0, t === j ? (s(e, !0), 0 === e.strm.avail_out ? _e : ke) : e.strstart > e.block_start && (s(e, !1), 0 === e.strm.avail_out) ? we : we
            }

            function p(e, t) {
                for (var n, r;;) {
                    if (e.lookahead < de) {
                        if (h(e), e.lookahead < de && t === L) return we;
                        if (0 === e.lookahead) break
                    }
                    if (n = 0, e.lookahead >= ue && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + ue - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 !== n && e.strstart - n <= e.w_size - de && (e.match_length = d(e, n)), e.match_length >= ue)
                        if (r = D._tr_tally(e, e.strstart - e.match_start, e.match_length - ue), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= ue) {
                            e.match_length--;
                            do e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + ue - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart; while (0 !== --e.match_length);
                            e.strstart++
                        } else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
                    else r = D._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
                    if (r && (s(e, !1), 0 === e.strm.avail_out)) return we
                }
                return e.insert = e.strstart < ue - 1 ? e.strstart : ue - 1, t === j ? (s(e, !0), 0 === e.strm.avail_out ? _e : ke) : e.last_lit && (s(e, !1), 0 === e.strm.avail_out) ? we : xe
            }

            function m(e, t) {
                for (var n, r, i;;) {
                    if (e.lookahead < de) {
                        if (h(e), e.lookahead < de && t === L) return we;
                        if (0 === e.lookahead) break
                    }
                    if (n = 0, e.lookahead >= ue && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + ue - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = ue - 1, 0 !== n && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - de && (e.match_length = d(e, n), e.match_length <= 5 && (e.strategy === G || e.match_length === ue && e.strstart - e.match_start > 4096) && (e.match_length = ue - 1)), e.prev_length >= ue && e.match_length <= e.prev_length) {
                        i = e.strstart + e.lookahead - ue, r = D._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - ue), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
                        do ++e.strstart <= i && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + ue - 1]) & e.hash_mask, n = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart); while (0 !== --e.prev_length);
                        if (e.match_available = 0, e.match_length = ue - 1, e.strstart++, r && (s(e, !1), 0 === e.strm.avail_out)) return we
                    } else if (e.match_available) {
                        if (r = D._tr_tally(e, 0, e.window[e.strstart - 1]), r && s(e, !1), e.strstart++, e.lookahead--, 0 === e.strm.avail_out) return we
                    } else e.match_available = 1, e.strstart++, e.lookahead--
                }
                return e.match_available && (r = D._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < ue - 1 ? e.strstart : ue - 1, t === j ? (s(e, !0), 0 === e.strm.avail_out ? _e : ke) : e.last_lit && (s(e, !1), 0 === e.strm.avail_out) ? we : xe
            }

            function g(e, t) {
                for (var n, r, i, o, a = e.window;;) {
                    if (e.lookahead <= le) {
                        if (h(e), e.lookahead <= le && t === L) return we;
                        if (0 === e.lookahead) break
                    }
                    if (e.match_length = 0, e.lookahead >= ue && e.strstart > 0 && (i = e.strstart - 1, r = a[i], r === a[++i] && r === a[++i] && r === a[++i])) {
                        o = e.strstart + le;
                        do; while (r === a[++i] && r === a[++i] && r === a[++i] && r === a[++i] && r === a[++i] && r === a[++i] && r === a[++i] && r === a[++i] && i < o);
                        e.match_length = le - (o - i), e.match_length > e.lookahead && (e.match_length = e.lookahead)
                    }
                    if (e.match_length >= ue ? (n = D._tr_tally(e, 1, e.match_length - ue), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (n = D._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), n && (s(e, !1), 0 === e.strm.avail_out)) return we
                }
                return e.insert = 0, t === j ? (s(e, !0), 0 === e.strm.avail_out ? _e : ke) : e.last_lit && (s(e, !1), 0 === e.strm.avail_out) ? we : xe
            }

            function v(e, t) {
                for (var n;;) {
                    if (0 === e.lookahead && (h(e), 0 === e.lookahead)) {
                        if (t === L) return we;
                        break
                    }
                    if (e.match_length = 0, n = D._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (s(e, !1), 0 === e.strm.avail_out)) return we
                }
                return e.insert = 0, t === j ? (s(e, !0), 0 === e.strm.avail_out ? _e : ke) : e.last_lit && (s(e, !1), 0 === e.strm.avail_out) ? we : xe
            }

            function y(e, t, n, r, i) {
                this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = r, this.func = i
            }

            function b(e) {
                e.window_size = 2 * e.w_size, o(e.head), e.max_lazy_match = I[e.level].max_lazy, e.good_match = I[e.level].good_length, e.nice_match = I[e.level].nice_length, e.max_chain_length = I[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = ue - 1, e.match_available = 0, e.ins_h = 0
            }

            function w() {
                this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = $, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new O.Buf16(2 * se), this.dyn_dtree = new O.Buf16(2 * (2 * oe + 1)), this.bl_tree = new O.Buf16(2 * (2 * ae + 1)), o(this.dyn_ltree), o(this.dyn_dtree), o(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new O.Buf16(ce + 1), this.heap = new O.Buf16(2 * ie + 1), o(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new O.Buf16(2 * ie + 1), o(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
            }

            function x(e) {
                var t;
                return e && e.state ? (e.total_in = e.total_out = 0, e.data_type = Q, t = e.state, t.pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? fe : ye, e.adler = 2 === t.wrap ? 0 : 1, t.last_flush = L, D._tr_init(t), M) : r(e, H)
            }

            function _(e) {
                var t = x(e);
                return t === M && b(e.state), t
            }

            function k(e, t) {
                return e && e.state ? 2 !== e.state.wrap ? H : (e.state.gzhead = t, M) : H
            }

            function C(e, t, n, i, o, a) {
                if (!e) return H;
                var s = 1;
                if (t === Z && (t = 6), i < 0 ? (s = 0, i = -i) : i > 15 && (s = 2, i -= 16), o < 1 || o > J || n !== $ || i < 8 || i > 15 || t < 0 || t > 9 || a < 0 || a > Y) return r(e, H);
                8 === i && (i = 9);
                var c = new w;
                return e.state = c, c.strm = e, c.wrap = s, c.gzhead = null, c.w_bits = i, c.w_size = 1 << c.w_bits, c.w_mask = c.w_size - 1, c.hash_bits = o + 7, c.hash_size = 1 << c.hash_bits, c.hash_mask = c.hash_size - 1, c.hash_shift = ~~((c.hash_bits + ue - 1) / ue), c.window = new O.Buf8(2 * c.w_size), c.head = new O.Buf16(c.hash_size), c.prev = new O.Buf16(c.w_size), c.lit_bufsize = 1 << o + 6, c.pending_buf_size = 4 * c.lit_bufsize, c.pending_buf = new O.Buf8(c.pending_buf_size), c.d_buf = 1 * c.lit_bufsize, c.l_buf = 3 * c.lit_bufsize, c.level = t, c.strategy = a, c.method = n, _(e)
            }

            function E(e, t) {
                return C(e, t, $, ee, te, K)
            }

            function T(e, t) {
                var n, s, l, d;
                if (!e || !e.state || t > F || t < 0) return e ? r(e, H) : H;
                if (s = e.state, !e.output || !e.input && 0 !== e.avail_in || s.status === be && t !== j) return r(e, 0 === e.avail_out ? q : H);
                if (s.strm = e, n = s.last_flush, s.last_flush = t, s.status === fe)
                    if (2 === s.wrap) e.adler = 0, c(s, 31), c(s, 139), c(s, 8), s.gzhead ? (c(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (s.gzhead.extra ? 4 : 0) + (s.gzhead.name ? 8 : 0) + (s.gzhead.comment ? 16 : 0)), c(s, 255 & s.gzhead.time), c(s, s.gzhead.time >> 8 & 255), c(s, s.gzhead.time >> 16 & 255), c(s, s.gzhead.time >> 24 & 255), c(s, 9 === s.level ? 2 : s.strategy >= V || s.level < 2 ? 4 : 0), c(s, 255 & s.gzhead.os), s.gzhead.extra && s.gzhead.extra.length && (c(s, 255 & s.gzhead.extra.length), c(s, s.gzhead.extra.length >> 8 & 255)), s.gzhead.hcrc && (e.adler = R(e.adler, s.pending_buf, s.pending, 0)), s.gzindex = 0, s.status = pe) : (c(s, 0), c(s, 0), c(s, 0), c(s, 0), c(s, 0), c(s, 9 === s.level ? 2 : s.strategy >= V || s.level < 2 ? 4 : 0), c(s, Ce), s.status = ye);
                    else {
                        var h = $ + (s.w_bits - 8 << 4) << 8,
                            f = -1;
                        f = s.strategy >= V || s.level < 2 ? 0 : s.level < 6 ? 1 : 6 === s.level ? 2 : 3, h |= f << 6, 0 !== s.strstart && (h |= he), h += 31 - h % 31, s.status = ye, u(s, h), 0 !== s.strstart && (u(s, e.adler >>> 16), u(s, 65535 & e.adler)), e.adler = 1
                    }
                if (s.status === pe)
                    if (s.gzhead.extra) {
                        for (l = s.pending; s.gzindex < (65535 & s.gzhead.extra.length) && (s.pending !== s.pending_buf_size || (s.gzhead.hcrc && s.pending > l && (e.adler = R(e.adler, s.pending_buf, s.pending - l, l)), a(e), l = s.pending, s.pending !== s.pending_buf_size));) c(s, 255 & s.gzhead.extra[s.gzindex]), s.gzindex++;
                        s.gzhead.hcrc && s.pending > l && (e.adler = R(e.adler, s.pending_buf, s.pending - l, l)), s.gzindex === s.gzhead.extra.length && (s.gzindex = 0, s.status = me)
                    } else s.status = me;
                if (s.status === me)
                    if (s.gzhead.name) {
                        l = s.pending;
                        do {
                            if (s.pending === s.pending_buf_size && (s.gzhead.hcrc && s.pending > l && (e.adler = R(e.adler, s.pending_buf, s.pending - l, l)), a(e), l = s.pending, s.pending === s.pending_buf_size)) {
                                d = 1;
                                break
                            }
                            d = s.gzindex < s.gzhead.name.length ? 255 & s.gzhead.name.charCodeAt(s.gzindex++) : 0, c(s, d)
                        } while (0 !== d);
                        s.gzhead.hcrc && s.pending > l && (e.adler = R(e.adler, s.pending_buf, s.pending - l, l)), 0 === d && (s.gzindex = 0, s.status = ge)
                    } else s.status = ge;
                if (s.status === ge)
                    if (s.gzhead.comment) {
                        l = s.pending;
                        do {
                            if (s.pending === s.pending_buf_size && (s.gzhead.hcrc && s.pending > l && (e.adler = R(e.adler, s.pending_buf, s.pending - l, l)), a(e), l = s.pending, s.pending === s.pending_buf_size)) {
                                d = 1;
                                break
                            }
                            d = s.gzindex < s.gzhead.comment.length ? 255 & s.gzhead.comment.charCodeAt(s.gzindex++) : 0, c(s, d)
                        } while (0 !== d);
                        s.gzhead.hcrc && s.pending > l && (e.adler = R(e.adler, s.pending_buf, s.pending - l, l)), 0 === d && (s.status = ve)
                    } else s.status = ve;
                if (s.status === ve && (s.gzhead.hcrc ? (s.pending + 2 > s.pending_buf_size && a(e), s.pending + 2 <= s.pending_buf_size && (c(s, 255 & e.adler), c(s, e.adler >> 8 & 255), e.adler = 0, s.status = ye)) : s.status = ye), 0 !== s.pending) {
                    if (a(e), 0 === e.avail_out) return s.last_flush = -1, M
                } else if (0 === e.avail_in && i(t) <= i(n) && t !== j) return r(e, q);
                if (s.status === be && 0 !== e.avail_in) return r(e, q);
                if (0 !== e.avail_in || 0 !== s.lookahead || t !== L && s.status !== be) {
                    var p = s.strategy === V ? v(s, t) : s.strategy === X ? g(s, t) : I[s.level].func(s, t);
                    if (p !== _e && p !== ke || (s.status = be), p === we || p === _e) return 0 === e.avail_out && (s.last_flush = -1), M;
                    if (p === xe && (t === z ? D._tr_align(s) : t !== F && (D._tr_stored_block(s, 0, 0, !1), t === P && (o(s.head), 0 === s.lookahead && (s.strstart = 0, s.block_start = 0, s.insert = 0))), a(e), 0 === e.avail_out)) return s.last_flush = -1, M
                }
                return t !== j ? M : s.wrap <= 0 ? W : (2 === s.wrap ? (c(s, 255 & e.adler), c(s, e.adler >> 8 & 255), c(s, e.adler >> 16 & 255), c(s, e.adler >> 24 & 255), c(s, 255 & e.total_in), c(s, e.total_in >> 8 & 255), c(s, e.total_in >> 16 & 255), c(s, e.total_in >> 24 & 255)) : (u(s, e.adler >>> 16), u(s, 65535 & e.adler)), a(e), s.wrap > 0 && (s.wrap = -s.wrap), 0 !== s.pending ? M : W)
            }

            function S(e) {
                var t;
                return e && e.state ? (t = e.state.status, t !== fe && t !== pe && t !== me && t !== ge && t !== ve && t !== ye && t !== be ? r(e, H) : (e.state = null, t === ye ? r(e, U) : M)) : H
            }

            function A(e, t) {
                var n, r, i, a, s, c, u, l, d = t.length;
                if (!e || !e.state) return H;
                if (n = e.state, a = n.wrap, 2 === a || 1 === a && n.status !== fe || n.lookahead) return H;
                for (1 === a && (e.adler = N(e.adler, t, d, 0)), n.wrap = 0, d >= n.w_size && (0 === a && (o(n.head), n.strstart = 0, n.block_start = 0, n.insert = 0), l = new O.Buf8(n.w_size), O.arraySet(l, t, d - n.w_size, n.w_size, 0), t = l, d = n.w_size), s = e.avail_in, c = e.next_in, u = e.input, e.avail_in = d, e.next_in = 0, e.input = t, h(n); n.lookahead >= ue;) {
                    r = n.strstart, i = n.lookahead - (ue - 1);
                    do n.ins_h = (n.ins_h << n.hash_shift ^ n.window[r + ue - 1]) & n.hash_mask, n.prev[r & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = r, r++; while (--i);
                    n.strstart = r, n.lookahead = ue - 1, h(n)
                }
                return n.strstart += n.lookahead, n.block_start = n.strstart, n.insert = n.lookahead, n.lookahead = 0, n.match_length = n.prev_length = ue - 1, n.match_available = 0, e.next_in = c, e.input = u, e.avail_in = s, n.wrap = a, M
            }
            var I, O = e("../utils/common"),
                D = e("./trees"),
                N = e("./adler32"),
                R = e("./crc32"),
                B = e("./messages"),
                L = 0,
                z = 1,
                P = 3,
                j = 4,
                F = 5,
                M = 0,
                W = 1,
                H = -2,
                U = -3,
                q = -5,
                Z = -1,
                G = 1,
                V = 2,
                X = 3,
                Y = 4,
                K = 0,
                Q = 2,
                $ = 8,
                J = 9,
                ee = 15,
                te = 8,
                ne = 29,
                re = 256,
                ie = re + 1 + ne,
                oe = 30,
                ae = 19,
                se = 2 * ie + 1,
                ce = 15,
                ue = 3,
                le = 258,
                de = le + ue + 1,
                he = 32,
                fe = 42,
                pe = 69,
                me = 73,
                ge = 91,
                ve = 103,
                ye = 113,
                be = 666,
                we = 1,
                xe = 2,
                _e = 3,
                ke = 4,
                Ce = 3;
            I = [new y(0, 0, 0, 0, f), new y(4, 4, 8, 4, p), new y(4, 5, 16, 8, p), new y(4, 6, 32, 32, p), new y(4, 4, 16, 16, m), new y(8, 16, 32, 32, m), new y(8, 16, 128, 128, m), new y(8, 32, 128, 256, m), new y(32, 128, 258, 1024, m), new y(32, 258, 258, 4096, m)], n.deflateInit = E, n.deflateInit2 = C, n.deflateReset = _, n.deflateResetKeep = x, n.deflateSetHeader = k, n.deflate = T, n.deflateEnd = S, n.deflateSetDictionary = A, n.deflateInfo = "pako deflate (from Nodeca project)"
        }, {
            "../utils/common": 62,
            "./adler32": 64,
            "./crc32": 66,
            "./messages": 72,
            "./trees": 73
        }],
        68: [function(e, t, n) {
            "use strict";

            function r() {
                this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
            }
            t.exports = r
        }, {}],
        69: [function(e, t, n) {
            "use strict";
            var r = 30,
                i = 12;
            t.exports = function(e, t) {
                var n, o, a, s, c, u, l, d, h, f, p, m, g, v, y, b, w, x, _, k, C, E, T, S, A;
                n = e.state, o = e.next_in, S = e.input, a = o + (e.avail_in - 5), s = e.next_out, A = e.output, c = s - (t - e.avail_out), u = s + (e.avail_out - 257), l = n.dmax, d = n.wsize, h = n.whave, f = n.wnext, p = n.window, m = n.hold, g = n.bits, v = n.lencode, y = n.distcode, b = (1 << n.lenbits) - 1, w = (1 << n.distbits) - 1;
                e: do {
                    g < 15 && (m += S[o++] << g, g += 8, m += S[o++] << g, g += 8), x = v[m & b];
                    t: for (;;) {
                        if (_ = x >>> 24, m >>>= _, g -= _, _ = x >>> 16 & 255, 0 === _) A[s++] = 65535 & x;
                        else {
                            if (!(16 & _)) {
                                if (0 === (64 & _)) {
                                    x = v[(65535 & x) + (m & (1 << _) - 1)];
                                    continue t
                                }
                                if (32 & _) {
                                    n.mode = i;
                                    break e
                                }
                                e.msg = "invalid literal/length code", n.mode = r;
                                break e
                            }
                            k = 65535 & x, _ &= 15, _ && (g < _ && (m += S[o++] << g, g += 8), k += m & (1 << _) - 1, m >>>= _, g -= _), g < 15 && (m += S[o++] << g, g += 8, m += S[o++] << g, g += 8), x = y[m & w];
                            n: for (;;) {
                                if (_ = x >>> 24, m >>>= _, g -= _, _ = x >>> 16 & 255, !(16 & _)) {
                                    if (0 === (64 & _)) {
                                        x = y[(65535 & x) + (m & (1 << _) - 1)];
                                        continue n
                                    }
                                    e.msg = "invalid distance code", n.mode = r;
                                    break e
                                }
                                if (C = 65535 & x, _ &= 15, g < _ && (m += S[o++] << g, g += 8, g < _ && (m += S[o++] << g, g += 8)), C += m & (1 << _) - 1, C > l) {
                                    e.msg = "invalid distance too far back", n.mode = r;
                                    break e
                                }
                                if (m >>>= _, g -= _, _ = s - c, C > _) {
                                    if (_ = C - _, _ > h && n.sane) {
                                        e.msg = "invalid distance too far back", n.mode = r;
                                        break e
                                    }
                                    if (E = 0, T = p, 0 === f) {
                                        if (E += d - _, _ < k) {
                                            k -= _;
                                            do A[s++] = p[E++]; while (--_);
                                            E = s - C, T = A
                                        }
                                    } else if (f < _) {
                                        if (E += d + f - _, _ -= f, _ < k) {
                                            k -= _;
                                            do A[s++] = p[E++]; while (--_);
                                            if (E = 0, f < k) {
                                                _ = f, k -= _;
                                                do A[s++] = p[E++]; while (--_);
                                                E = s - C, T = A
                                            }
                                        }
                                    } else if (E += f - _, _ < k) {
                                        k -= _;
                                        do A[s++] = p[E++]; while (--_);
                                        E = s - C, T = A
                                    }
                                    for (; k > 2;) A[s++] = T[E++], A[s++] = T[E++], A[s++] = T[E++], k -= 3;
                                    k && (A[s++] = T[E++], k > 1 && (A[s++] = T[E++]))
                                } else {
                                    E = s - C;
                                    do A[s++] = A[E++], A[s++] = A[E++], A[s++] = A[E++], k -= 3; while (k > 2);
                                    k && (A[s++] = A[E++], k > 1 && (A[s++] = A[E++]))
                                }
                                break
                            }
                        }
                        break
                    }
                } while (o < a && s < u);
                k = g >> 3, o -= k, g -= k << 3, m &= (1 << g) - 1, e.next_in = o, e.next_out = s, e.avail_in = o < a ? 5 + (a - o) : 5 - (o - a), e.avail_out = s < u ? 257 + (u - s) : 257 - (s - u), n.hold = m, n.bits = g
            }
        }, {}],
        70: [function(e, t, n) {
            "use strict";

            function r(e) {
                return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
            }

            function i() {
                this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new y.Buf16(320), this.work = new y.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
            }

            function o(e) {
                var t;
                return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = P, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new y.Buf32(me), t.distcode = t.distdyn = new y.Buf32(ge), t.sane = 1, t.back = -1, I) : N
            }

            function a(e) {
                var t;
                return e && e.state ? (t = e.state, t.wsize = 0, t.whave = 0, t.wnext = 0, o(e)) : N
            }

            function s(e, t) {
                var n, r;
                return e && e.state ? (r = e.state, t < 0 ? (n = 0, t = -t) : (n = (t >> 4) + 1, t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? N : (null !== r.window && r.wbits !== t && (r.window = null), r.wrap = n, r.wbits = t, a(e))) : N
            }

            function c(e, t) {
                var n, r;
                return e ? (r = new i, e.state = r, r.window = null, n = s(e, t), n !== I && (e.state = null), n) : N
            }

            function u(e) {
                return c(e, ye)
            }

            function l(e) {
                if (be) {
                    var t;
                    for (g = new y.Buf32(512), v = new y.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
                    for (; t < 256;) e.lens[t++] = 9;
                    for (; t < 280;) e.lens[t++] = 7;
                    for (; t < 288;) e.lens[t++] = 8;
                    for (_(C, e.lens, 0, 288, g, 0, e.work, {
                            bits: 9
                        }), t = 0; t < 32;) e.lens[t++] = 5;
                    _(E, e.lens, 0, 32, v, 0, e.work, {
                        bits: 5
                    }), be = !1
                }
                e.lencode = g, e.lenbits = 9, e.distcode = v, e.distbits = 5
            }

            function d(e, t, n, r) {
                var i, o = e.state;
                return null === o.window && (o.wsize = 1 << o.wbits, o.wnext = 0, o.whave = 0, o.window = new y.Buf8(o.wsize)), r >= o.wsize ? (y.arraySet(o.window, t, n - o.wsize, o.wsize, 0), o.wnext = 0, o.whave = o.wsize) : (i = o.wsize - o.wnext, i > r && (i = r), y.arraySet(o.window, t, n - r, i, o.wnext), r -= i, r ? (y.arraySet(o.window, t, n - r, r, 0), o.wnext = r, o.whave = o.wsize) : (o.wnext += i, o.wnext === o.wsize && (o.wnext = 0), o.whave < o.wsize && (o.whave += i))), 0
            }

            function h(e, t) {
                var n, i, o, a, s, c, u, h, f, p, m, g, v, me, ge, ve, ye, be, we, xe, _e, ke, Ce, Ee, Te = 0,
                    Se = new y.Buf8(4),
                    Ae = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return N;
                n = e.state, n.mode === X && (n.mode = Y), s = e.next_out, o = e.output, u = e.avail_out, a = e.next_in, i = e.input, c = e.avail_in, h = n.hold, f = n.bits, p = c, m = u, ke = I;
                e: for (;;) switch (n.mode) {
                    case P:
                        if (0 === n.wrap) {
                            n.mode = Y;
                            break
                        }
                        for (; f < 16;) {
                            if (0 === c) break e;
                            c--, h += i[a++] << f, f += 8
                        }
                        if (2 & n.wrap && 35615 === h) {
                            n.check = 0, Se[0] = 255 & h, Se[1] = h >>> 8 & 255, n.check = w(n.check, Se, 2, 0), h = 0, f = 0, n.mode = j;
                            break
                        }
                        if (n.flags = 0, n.head && (n.head.done = !1), !(1 & n.wrap) || (((255 & h) << 8) + (h >> 8)) % 31) {
                            e.msg = "incorrect header check", n.mode = he;
                            break
                        }
                        if ((15 & h) !== z) {
                            e.msg = "unknown compression method", n.mode = he;
                            break
                        }
                        if (h >>>= 4, f -= 4, _e = (15 & h) + 8, 0 === n.wbits) n.wbits = _e;
                        else if (_e > n.wbits) {
                            e.msg = "invalid window size", n.mode = he;
                            break
                        }
                        n.dmax = 1 << _e, e.adler = n.check = 1, n.mode = 512 & h ? G : X, h = 0, f = 0;
                        break;
                    case j:
                        for (; f < 16;) {
                            if (0 === c) break e;
                            c--, h += i[a++] << f, f += 8
                        }
                        if (n.flags = h, (255 & n.flags) !== z) {
                            e.msg = "unknown compression method", n.mode = he;
                            break
                        }
                        if (57344 & n.flags) {
                            e.msg = "unknown header flags set", n.mode = he;
                            break
                        }
                        n.head && (n.head.text = h >> 8 & 1), 512 & n.flags && (Se[0] = 255 & h, Se[1] = h >>> 8 & 255, n.check = w(n.check, Se, 2, 0)), h = 0, f = 0, n.mode = F;
                    case F:
                        for (; f < 32;) {
                            if (0 === c) break e;
                            c--, h += i[a++] << f, f += 8
                        }
                        n.head && (n.head.time = h), 512 & n.flags && (Se[0] = 255 & h, Se[1] = h >>> 8 & 255, Se[2] = h >>> 16 & 255, Se[3] = h >>> 24 & 255, n.check = w(n.check, Se, 4, 0)), h = 0, f = 0, n.mode = M;
                    case M:
                        for (; f < 16;) {
                            if (0 === c) break e;
                            c--, h += i[a++] << f, f += 8
                        }
                        n.head && (n.head.xflags = 255 & h, n.head.os = h >> 8), 512 & n.flags && (Se[0] = 255 & h, Se[1] = h >>> 8 & 255, n.check = w(n.check, Se, 2, 0)), h = 0, f = 0, n.mode = W;
                    case W:
                        if (1024 & n.flags) {
                            for (; f < 16;) {
                                if (0 === c) break e;
                                c--, h += i[a++] << f, f += 8
                            }
                            n.length = h, n.head && (n.head.extra_len = h), 512 & n.flags && (Se[0] = 255 & h, Se[1] = h >>> 8 & 255, n.check = w(n.check, Se, 2, 0)), h = 0, f = 0
                        } else n.head && (n.head.extra = null);
                        n.mode = H;
                    case H:
                        if (1024 & n.flags && (g = n.length, g > c && (g = c), g && (n.head && (_e = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Array(n.head.extra_len)), y.arraySet(n.head.extra, i, a, g, _e)), 512 & n.flags && (n.check = w(n.check, i, g, a)), c -= g, a += g, n.length -= g), n.length)) break e;
                        n.length = 0, n.mode = U;
                    case U:
                        if (2048 & n.flags) {
                            if (0 === c) break e;
                            g = 0;
                            do _e = i[a + g++], n.head && _e && n.length < 65536 && (n.head.name += String.fromCharCode(_e)); while (_e && g < c);
                            if (512 & n.flags && (n.check = w(n.check, i, g, a)), c -= g, a += g, _e) break e
                        } else n.head && (n.head.name = null);
                        n.length = 0, n.mode = q;
                    case q:
                        if (4096 & n.flags) {
                            if (0 === c) break e;
                            g = 0;
                            do _e = i[a + g++], n.head && _e && n.length < 65536 && (n.head.comment += String.fromCharCode(_e)); while (_e && g < c);
                            if (512 & n.flags && (n.check = w(n.check, i, g, a)), c -= g, a += g, _e) break e
                        } else n.head && (n.head.comment = null);
                        n.mode = Z;
                    case Z:
                        if (512 & n.flags) {
                            for (; f < 16;) {
                                if (0 === c) break e;
                                c--, h += i[a++] << f, f += 8
                            }
                            if (h !== (65535 & n.check)) {
                                e.msg = "header crc mismatch", n.mode = he;
                                break
                            }
                            h = 0, f = 0
                        }
                        n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), e.adler = n.check = 0, n.mode = X;
                        break;
                    case G:
                        for (; f < 32;) {
                            if (0 === c) break e;
                            c--, h += i[a++] << f, f += 8
                        }
                        e.adler = n.check = r(h), h = 0, f = 0, n.mode = V;
                    case V:
                        if (0 === n.havedict) return e.next_out = s, e.avail_out = u, e.next_in = a, e.avail_in = c, n.hold = h, n.bits = f, D;
                        e.adler = n.check = 1, n.mode = X;
                    case X:
                        if (t === S || t === A) break e;
                    case Y:
                        if (n.last) {
                            h >>>= 7 & f, f -= 7 & f, n.mode = ue;
                            break
                        }
                        for (; f < 3;) {
                            if (0 === c) break e;
                            c--, h += i[a++] << f, f += 8
                        }
                        switch (n.last = 1 & h, h >>>= 1, f -= 1, 3 & h) {
                            case 0:
                                n.mode = K;
                                break;
                            case 1:
                                if (l(n), n.mode = ne, t === A) {
                                    h >>>= 2, f -= 2;
                                    break e
                                }
                                break;
                            case 2:
                                n.mode = J;
                                break;
                            case 3:
                                e.msg = "invalid block type", n.mode = he
                        }
                        h >>>= 2, f -= 2;
                        break;
                    case K:
                        for (h >>>= 7 & f, f -= 7 & f; f < 32;) {
                            if (0 === c) break e;
                            c--, h += i[a++] << f, f += 8
                        }
                        if ((65535 & h) !== (h >>> 16 ^ 65535)) {
                            e.msg = "invalid stored block lengths", n.mode = he;
                            break
                        }
                        if (n.length = 65535 & h, h = 0, f = 0, n.mode = Q, t === A) break e;
                    case Q:
                        n.mode = $;
                    case $:
                        if (g = n.length) {
                            if (g > c && (g = c), g > u && (g = u), 0 === g) break e;
                            y.arraySet(o, i, a, g, s), c -= g, a += g, u -= g, s += g, n.length -= g;
                            break
                        }
                        n.mode = X;
                        break;
                    case J:
                        for (; f < 14;) {
                            if (0 === c) break e;
                            c--, h += i[a++] << f, f += 8
                        }
                        if (n.nlen = (31 & h) + 257, h >>>= 5, f -= 5, n.ndist = (31 & h) + 1, h >>>= 5, f -= 5, n.ncode = (15 & h) + 4, h >>>= 4, f -= 4, n.nlen > 286 || n.ndist > 30) {
                            e.msg = "too many length or distance symbols", n.mode = he;
                            break
                        }
                        n.have = 0, n.mode = ee;
                    case ee:
                        for (; n.have < n.ncode;) {
                            for (; f < 3;) {
                                if (0 === c) break e;
                                c--, h += i[a++] << f, f += 8
                            }
                            n.lens[Ae[n.have++]] = 7 & h, h >>>= 3, f -= 3
                        }
                        for (; n.have < 19;) n.lens[Ae[n.have++]] = 0;
                        if (n.lencode = n.lendyn, n.lenbits = 7, Ce = {
                                bits: n.lenbits
                            }, ke = _(k, n.lens, 0, 19, n.lencode, 0, n.work, Ce), n.lenbits = Ce.bits, ke) {
                            e.msg = "invalid code lengths set", n.mode = he;
                            break
                        }
                        n.have = 0, n.mode = te;
                    case te:
                        for (; n.have < n.nlen + n.ndist;) {
                            for (; Te = n.lencode[h & (1 << n.lenbits) - 1], ge = Te >>> 24, ve = Te >>> 16 & 255, ye = 65535 & Te, !(ge <= f);) {
                                if (0 === c) break e;
                                c--, h += i[a++] << f, f += 8
                            }
                            if (ye < 16) h >>>= ge, f -= ge, n.lens[n.have++] = ye;
                            else {
                                if (16 === ye) {
                                    for (Ee = ge + 2; f < Ee;) {
                                        if (0 === c) break e;
                                        c--, h += i[a++] << f, f += 8
                                    }
                                    if (h >>>= ge, f -= ge, 0 === n.have) {
                                        e.msg = "invalid bit length repeat", n.mode = he;
                                        break
                                    }
                                    _e = n.lens[n.have - 1], g = 3 + (3 & h), h >>>= 2, f -= 2
                                } else if (17 === ye) {
                                    for (Ee = ge + 3; f < Ee;) {
                                        if (0 === c) break e;
                                        c--, h += i[a++] << f, f += 8
                                    }
                                    h >>>= ge, f -= ge, _e = 0, g = 3 + (7 & h), h >>>= 3, f -= 3
                                } else {
                                    for (Ee = ge + 7; f < Ee;) {
                                        if (0 === c) break e;
                                        c--, h += i[a++] << f, f += 8
                                    }
                                    h >>>= ge, f -= ge, _e = 0, g = 11 + (127 & h), h >>>= 7, f -= 7
                                }
                                if (n.have + g > n.nlen + n.ndist) {
                                    e.msg = "invalid bit length repeat", n.mode = he;
                                    break
                                }
                                for (; g--;) n.lens[n.have++] = _e
                            }
                        }
                        if (n.mode === he) break;
                        if (0 === n.lens[256]) {
                            e.msg = "invalid code -- missing end-of-block", n.mode = he;
                            break
                        }
                        if (n.lenbits = 9, Ce = {
                                bits: n.lenbits
                            }, ke = _(C, n.lens, 0, n.nlen, n.lencode, 0, n.work, Ce), n.lenbits = Ce.bits, ke) {
                            e.msg = "invalid literal/lengths set", n.mode = he;
                            break
                        }
                        if (n.distbits = 6, n.distcode = n.distdyn, Ce = {
                                bits: n.distbits
                            }, ke = _(E, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, Ce), n.distbits = Ce.bits, ke) {
                            e.msg = "invalid distances set", n.mode = he;
                            break
                        }
                        if (n.mode = ne, t === A) break e;
                    case ne:
                        n.mode = re;
                    case re:
                        if (c >= 6 && u >= 258) {
                            e.next_out = s, e.avail_out = u, e.next_in = a, e.avail_in = c, n.hold = h, n.bits = f, x(e, m), s = e.next_out, o = e.output, u = e.avail_out, a = e.next_in, i = e.input, c = e.avail_in, h = n.hold, f = n.bits, n.mode === X && (n.back = -1);
                            break
                        }
                        for (n.back = 0; Te = n.lencode[h & (1 << n.lenbits) - 1], ge = Te >>> 24, ve = Te >>> 16 & 255, ye = 65535 & Te, !(ge <= f);) {
                            if (0 === c) break e;
                            c--, h += i[a++] << f, f += 8
                        }
                        if (ve && 0 === (240 & ve)) {
                            for (be = ge, we = ve, xe = ye; Te = n.lencode[xe + ((h & (1 << be + we) - 1) >> be)], ge = Te >>> 24, ve = Te >>> 16 & 255, ye = 65535 & Te, !(be + ge <= f);) {
                                if (0 === c) break e;
                                c--, h += i[a++] << f, f += 8
                            }
                            h >>>= be, f -= be, n.back += be
                        }
                        if (h >>>= ge, f -= ge, n.back += ge, n.length = ye, 0 === ve) {
                            n.mode = ce;
                            break
                        }
                        if (32 & ve) {
                            n.back = -1, n.mode = X;
                            break
                        }
                        if (64 & ve) {
                            e.msg = "invalid literal/length code", n.mode = he;
                            break
                        }
                        n.extra = 15 & ve, n.mode = ie;
                    case ie:
                        if (n.extra) {
                            for (Ee = n.extra; f < Ee;) {
                                if (0 === c) break e;
                                c--, h += i[a++] << f, f += 8
                            }
                            n.length += h & (1 << n.extra) - 1, h >>>= n.extra, f -= n.extra, n.back += n.extra
                        }
                        n.was = n.length, n.mode = oe;
                    case oe:
                        for (; Te = n.distcode[h & (1 << n.distbits) - 1], ge = Te >>> 24, ve = Te >>> 16 & 255, ye = 65535 & Te, !(ge <= f);) {
                            if (0 === c) break e;
                            c--, h += i[a++] << f, f += 8
                        }
                        if (0 === (240 & ve)) {
                            for (be = ge, we = ve, xe = ye; Te = n.distcode[xe + ((h & (1 << be + we) - 1) >> be)], ge = Te >>> 24, ve = Te >>> 16 & 255, ye = 65535 & Te, !(be + ge <= f);) {
                                if (0 === c) break e;
                                c--, h += i[a++] << f, f += 8
                            }
                            h >>>= be, f -= be, n.back += be
                        }
                        if (h >>>= ge, f -= ge, n.back += ge, 64 & ve) {
                            e.msg = "invalid distance code", n.mode = he;
                            break
                        }
                        n.offset = ye, n.extra = 15 & ve, n.mode = ae;
                    case ae:
                        if (n.extra) {
                            for (Ee = n.extra; f < Ee;) {
                                if (0 === c) break e;
                                c--, h += i[a++] << f, f += 8
                            }
                            n.offset += h & (1 << n.extra) - 1, h >>>= n.extra, f -= n.extra, n.back += n.extra
                        }
                        if (n.offset > n.dmax) {
                            e.msg = "invalid distance too far back", n.mode = he;
                            break
                        }
                        n.mode = se;
                    case se:
                        if (0 === u) break e;
                        if (g = m - u, n.offset > g) {
                            if (g = n.offset - g, g > n.whave && n.sane) {
                                e.msg = "invalid distance too far back", n.mode = he;
                                break
                            }
                            g > n.wnext ? (g -= n.wnext, v = n.wsize - g) : v = n.wnext - g,
                                g > n.length && (g = n.length), me = n.window
                        } else me = o, v = s - n.offset, g = n.length;
                        g > u && (g = u), u -= g, n.length -= g;
                        do o[s++] = me[v++]; while (--g);
                        0 === n.length && (n.mode = re);
                        break;
                    case ce:
                        if (0 === u) break e;
                        o[s++] = n.length, u--, n.mode = re;
                        break;
                    case ue:
                        if (n.wrap) {
                            for (; f < 32;) {
                                if (0 === c) break e;
                                c--, h |= i[a++] << f, f += 8
                            }
                            if (m -= u, e.total_out += m, n.total += m, m && (e.adler = n.check = n.flags ? w(n.check, o, m, s - m) : b(n.check, o, m, s - m)), m = u, (n.flags ? h : r(h)) !== n.check) {
                                e.msg = "incorrect data check", n.mode = he;
                                break
                            }
                            h = 0, f = 0
                        }
                        n.mode = le;
                    case le:
                        if (n.wrap && n.flags) {
                            for (; f < 32;) {
                                if (0 === c) break e;
                                c--, h += i[a++] << f, f += 8
                            }
                            if (h !== (4294967295 & n.total)) {
                                e.msg = "incorrect length check", n.mode = he;
                                break
                            }
                            h = 0, f = 0
                        }
                        n.mode = de;
                    case de:
                        ke = O;
                        break e;
                    case he:
                        ke = R;
                        break e;
                    case fe:
                        return B;
                    case pe:
                    default:
                        return N
                }
                return e.next_out = s, e.avail_out = u, e.next_in = a, e.avail_in = c, n.hold = h, n.bits = f, (n.wsize || m !== e.avail_out && n.mode < he && (n.mode < ue || t !== T)) && d(e, e.output, e.next_out, m - e.avail_out) ? (n.mode = fe, B) : (p -= e.avail_in, m -= e.avail_out, e.total_in += p, e.total_out += m, n.total += m, n.wrap && m && (e.adler = n.check = n.flags ? w(n.check, o, m, e.next_out - m) : b(n.check, o, m, e.next_out - m)), e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === X ? 128 : 0) + (n.mode === ne || n.mode === Q ? 256 : 0), (0 === p && 0 === m || t === T) && ke === I && (ke = L), ke)
            }

            function f(e) {
                if (!e || !e.state) return N;
                var t = e.state;
                return t.window && (t.window = null), e.state = null, I
            }

            function p(e, t) {
                var n;
                return e && e.state ? (n = e.state, 0 === (2 & n.wrap) ? N : (n.head = t, t.done = !1, I)) : N
            }

            function m(e, t) {
                var n, r, i, o = t.length;
                return e && e.state ? (n = e.state, 0 !== n.wrap && n.mode !== V ? N : n.mode === V && (r = 1, r = b(r, t, o, 0), r !== n.check) ? R : (i = d(e, t, o, o)) ? (n.mode = fe, B) : (n.havedict = 1, I)) : N
            }
            var g, v, y = e("../utils/common"),
                b = e("./adler32"),
                w = e("./crc32"),
                x = e("./inffast"),
                _ = e("./inftrees"),
                k = 0,
                C = 1,
                E = 2,
                T = 4,
                S = 5,
                A = 6,
                I = 0,
                O = 1,
                D = 2,
                N = -2,
                R = -3,
                B = -4,
                L = -5,
                z = 8,
                P = 1,
                j = 2,
                F = 3,
                M = 4,
                W = 5,
                H = 6,
                U = 7,
                q = 8,
                Z = 9,
                G = 10,
                V = 11,
                X = 12,
                Y = 13,
                K = 14,
                Q = 15,
                $ = 16,
                J = 17,
                ee = 18,
                te = 19,
                ne = 20,
                re = 21,
                ie = 22,
                oe = 23,
                ae = 24,
                se = 25,
                ce = 26,
                ue = 27,
                le = 28,
                de = 29,
                he = 30,
                fe = 31,
                pe = 32,
                me = 852,
                ge = 592,
                ve = 15,
                ye = ve,
                be = !0;
            n.inflateReset = a, n.inflateReset2 = s, n.inflateResetKeep = o, n.inflateInit = u, n.inflateInit2 = c, n.inflate = h, n.inflateEnd = f, n.inflateGetHeader = p, n.inflateSetDictionary = m, n.inflateInfo = "pako inflate (from Nodeca project)"
        }, {
            "../utils/common": 62,
            "./adler32": 64,
            "./crc32": 66,
            "./inffast": 69,
            "./inftrees": 71
        }],
        71: [function(e, t, n) {
            "use strict";
            var r = e("../utils/common"),
                i = 15,
                o = 852,
                a = 592,
                s = 0,
                c = 1,
                u = 2,
                l = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                d = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                h = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                f = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
            t.exports = function(e, t, n, p, m, g, v, y) {
                var b, w, x, _, k, C, E, T, S, A = y.bits,
                    I = 0,
                    O = 0,
                    D = 0,
                    N = 0,
                    R = 0,
                    B = 0,
                    L = 0,
                    z = 0,
                    P = 0,
                    j = 0,
                    F = null,
                    M = 0,
                    W = new r.Buf16(i + 1),
                    H = new r.Buf16(i + 1),
                    U = null,
                    q = 0;
                for (I = 0; I <= i; I++) W[I] = 0;
                for (O = 0; O < p; O++) W[t[n + O]]++;
                for (R = A, N = i; N >= 1 && 0 === W[N]; N--);
                if (R > N && (R = N), 0 === N) return m[g++] = 20971520, m[g++] = 20971520, y.bits = 1, 0;
                for (D = 1; D < N && 0 === W[D]; D++);
                for (R < D && (R = D), z = 1, I = 1; I <= i; I++)
                    if (z <<= 1, z -= W[I], z < 0) return -1;
                if (z > 0 && (e === s || 1 !== N)) return -1;
                for (H[1] = 0, I = 1; I < i; I++) H[I + 1] = H[I] + W[I];
                for (O = 0; O < p; O++) 0 !== t[n + O] && (v[H[t[n + O]]++] = O);
                if (e === s ? (F = U = v, C = 19) : e === c ? (F = l, M -= 257, U = d, q -= 257, C = 256) : (F = h, U = f, C = -1), j = 0, O = 0, I = D, k = g, B = R, L = 0, x = -1, P = 1 << R, _ = P - 1, e === c && P > o || e === u && P > a) return 1;
                for (var Z = 0;;) {
                    Z++, E = I - L, v[O] < C ? (T = 0, S = v[O]) : v[O] > C ? (T = U[q + v[O]], S = F[M + v[O]]) : (T = 96, S = 0), b = 1 << I - L, w = 1 << B, D = w;
                    do w -= b, m[k + (j >> L) + w] = E << 24 | T << 16 | S | 0; while (0 !== w);
                    for (b = 1 << I - 1; j & b;) b >>= 1;
                    if (0 !== b ? (j &= b - 1, j += b) : j = 0, O++, 0 === --W[I]) {
                        if (I === N) break;
                        I = t[n + v[O]]
                    }
                    if (I > R && (j & _) !== x) {
                        for (0 === L && (L = R), k += D, B = I - L, z = 1 << B; B + L < N && (z -= W[B + L], !(z <= 0));) B++, z <<= 1;
                        if (P += 1 << B, e === c && P > o || e === u && P > a) return 1;
                        x = j & _, m[x] = R << 24 | B << 16 | k - g | 0
                    }
                }
                return 0 !== j && (m[k + j] = I - L << 24 | 64 << 16 | 0), y.bits = R, 0
            }
        }, {
            "../utils/common": 62
        }],
        72: [function(e, t, n) {
            "use strict";
            t.exports = {
                2: "need dictionary",
                1: "stream end",
                0: "",
                "-1": "file error",
                "-2": "stream error",
                "-3": "data error",
                "-4": "insufficient memory",
                "-5": "buffer error",
                "-6": "incompatible version"
            }
        }, {}],
        73: [function(e, t, n) {
            "use strict";

            function r(e) {
                for (var t = e.length; --t >= 0;) e[t] = 0
            }

            function i(e, t, n, r, i) {
                this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = r, this.max_length = i, this.has_stree = e && e.length
            }

            function o(e, t) {
                this.dyn_tree = e, this.max_code = 0, this.stat_desc = t
            }

            function a(e) {
                return e < 256 ? ce[e] : ce[256 + (e >>> 7)]
            }

            function s(e, t) {
                e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255
            }

            function c(e, t, n) {
                e.bi_valid > Y - n ? (e.bi_buf |= t << e.bi_valid & 65535, s(e, e.bi_buf), e.bi_buf = t >> Y - e.bi_valid, e.bi_valid += n - Y) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n)
            }

            function u(e, t, n) {
                c(e, n[2 * t], n[2 * t + 1])
            }

            function l(e, t) {
                var n = 0;
                do n |= 1 & e, e >>>= 1, n <<= 1; while (--t > 0);
                return n >>> 1
            }

            function d(e) {
                16 === e.bi_valid ? (s(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8)
            }

            function h(e, t) {
                var n, r, i, o, a, s, c = t.dyn_tree,
                    u = t.max_code,
                    l = t.stat_desc.static_tree,
                    d = t.stat_desc.has_stree,
                    h = t.stat_desc.extra_bits,
                    f = t.stat_desc.extra_base,
                    p = t.stat_desc.max_length,
                    m = 0;
                for (o = 0; o <= X; o++) e.bl_count[o] = 0;
                for (c[2 * e.heap[e.heap_max] + 1] = 0, n = e.heap_max + 1; n < V; n++) r = e.heap[n], o = c[2 * c[2 * r + 1] + 1] + 1, o > p && (o = p, m++), c[2 * r + 1] = o, r > u || (e.bl_count[o]++, a = 0, r >= f && (a = h[r - f]), s = c[2 * r], e.opt_len += s * (o + a), d && (e.static_len += s * (l[2 * r + 1] + a)));
                if (0 !== m) {
                    do {
                        for (o = p - 1; 0 === e.bl_count[o];) o--;
                        e.bl_count[o]--, e.bl_count[o + 1] += 2, e.bl_count[p]--, m -= 2
                    } while (m > 0);
                    for (o = p; 0 !== o; o--)
                        for (r = e.bl_count[o]; 0 !== r;) i = e.heap[--n], i > u || (c[2 * i + 1] !== o && (e.opt_len += (o - c[2 * i + 1]) * c[2 * i], c[2 * i + 1] = o), r--)
                }
            }

            function f(e, t, n) {
                var r, i, o = new Array(X + 1),
                    a = 0;
                for (r = 1; r <= X; r++) o[r] = a = a + n[r - 1] << 1;
                for (i = 0; i <= t; i++) {
                    var s = e[2 * i + 1];
                    0 !== s && (e[2 * i] = l(o[s]++, s))
                }
            }

            function p() {
                var e, t, n, r, o, a = new Array(X + 1);
                for (n = 0, r = 0; r < H - 1; r++)
                    for (le[r] = n, e = 0; e < 1 << te[r]; e++) ue[n++] = r;
                for (ue[n - 1] = r, o = 0, r = 0; r < 16; r++)
                    for (de[r] = o, e = 0; e < 1 << ne[r]; e++) ce[o++] = r;
                for (o >>= 7; r < Z; r++)
                    for (de[r] = o << 7, e = 0; e < 1 << ne[r] - 7; e++) ce[256 + o++] = r;
                for (t = 0; t <= X; t++) a[t] = 0;
                for (e = 0; e <= 143;) ae[2 * e + 1] = 8, e++, a[8]++;
                for (; e <= 255;) ae[2 * e + 1] = 9, e++, a[9]++;
                for (; e <= 279;) ae[2 * e + 1] = 7, e++, a[7]++;
                for (; e <= 287;) ae[2 * e + 1] = 8, e++, a[8]++;
                for (f(ae, q + 1, a), e = 0; e < Z; e++) se[2 * e + 1] = 5, se[2 * e] = l(e, 5);
                he = new i(ae, te, U + 1, q, X), fe = new i(se, ne, 0, Z, X), pe = new i(new Array(0), re, 0, G, K)
            }

            function m(e) {
                var t;
                for (t = 0; t < q; t++) e.dyn_ltree[2 * t] = 0;
                for (t = 0; t < Z; t++) e.dyn_dtree[2 * t] = 0;
                for (t = 0; t < G; t++) e.bl_tree[2 * t] = 0;
                e.dyn_ltree[2 * Q] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0
            }

            function g(e) {
                e.bi_valid > 8 ? s(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0
            }

            function v(e, t, n, r) {
                g(e), r && (s(e, n), s(e, ~n)), N.arraySet(e.pending_buf, e.window, t, n, e.pending), e.pending += n
            }

            function y(e, t, n, r) {
                var i = 2 * t,
                    o = 2 * n;
                return e[i] < e[o] || e[i] === e[o] && r[t] <= r[n]
            }

            function b(e, t, n) {
                for (var r = e.heap[n], i = n << 1; i <= e.heap_len && (i < e.heap_len && y(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !y(t, r, e.heap[i], e.depth));) e.heap[n] = e.heap[i], n = i, i <<= 1;
                e.heap[n] = r
            }

            function w(e, t, n) {
                var r, i, o, s, l = 0;
                if (0 !== e.last_lit)
                    do r = e.pending_buf[e.d_buf + 2 * l] << 8 | e.pending_buf[e.d_buf + 2 * l + 1], i = e.pending_buf[e.l_buf + l], l++, 0 === r ? u(e, i, t) : (o = ue[i], u(e, o + U + 1, t), s = te[o], 0 !== s && (i -= le[o], c(e, i, s)), r--, o = a(r), u(e, o, n), s = ne[o], 0 !== s && (r -= de[o], c(e, r, s))); while (l < e.last_lit);
                u(e, Q, t)
            }

            function x(e, t) {
                var n, r, i, o = t.dyn_tree,
                    a = t.stat_desc.static_tree,
                    s = t.stat_desc.has_stree,
                    c = t.stat_desc.elems,
                    u = -1;
                for (e.heap_len = 0, e.heap_max = V, n = 0; n < c; n++) 0 !== o[2 * n] ? (e.heap[++e.heap_len] = u = n, e.depth[n] = 0) : o[2 * n + 1] = 0;
                for (; e.heap_len < 2;) i = e.heap[++e.heap_len] = u < 2 ? ++u : 0, o[2 * i] = 1, e.depth[i] = 0, e.opt_len--, s && (e.static_len -= a[2 * i + 1]);
                for (t.max_code = u, n = e.heap_len >> 1; n >= 1; n--) b(e, o, n);
                i = c;
                do n = e.heap[1], e.heap[1] = e.heap[e.heap_len--], b(e, o, 1), r = e.heap[1], e.heap[--e.heap_max] = n, e.heap[--e.heap_max] = r, o[2 * i] = o[2 * n] + o[2 * r], e.depth[i] = (e.depth[n] >= e.depth[r] ? e.depth[n] : e.depth[r]) + 1, o[2 * n + 1] = o[2 * r + 1] = i, e.heap[1] = i++, b(e, o, 1); while (e.heap_len >= 2);
                e.heap[--e.heap_max] = e.heap[1], h(e, t), f(o, u, e.bl_count)
            }

            function _(e, t, n) {
                var r, i, o = -1,
                    a = t[1],
                    s = 0,
                    c = 7,
                    u = 4;
                for (0 === a && (c = 138, u = 3), t[2 * (n + 1) + 1] = 65535, r = 0; r <= n; r++) i = a, a = t[2 * (r + 1) + 1], ++s < c && i === a || (s < u ? e.bl_tree[2 * i] += s : 0 !== i ? (i !== o && e.bl_tree[2 * i]++, e.bl_tree[2 * $]++) : s <= 10 ? e.bl_tree[2 * J]++ : e.bl_tree[2 * ee]++, s = 0, o = i, 0 === a ? (c = 138, u = 3) : i === a ? (c = 6, u = 3) : (c = 7, u = 4))
            }

            function k(e, t, n) {
                var r, i, o = -1,
                    a = t[1],
                    s = 0,
                    l = 7,
                    d = 4;
                for (0 === a && (l = 138, d = 3), r = 0; r <= n; r++)
                    if (i = a, a = t[2 * (r + 1) + 1], !(++s < l && i === a)) {
                        if (s < d) {
                            do u(e, i, e.bl_tree); while (0 !== --s)
                        } else 0 !== i ? (i !== o && (u(e, i, e.bl_tree), s--), u(e, $, e.bl_tree), c(e, s - 3, 2)) : s <= 10 ? (u(e, J, e.bl_tree), c(e, s - 3, 3)) : (u(e, ee, e.bl_tree), c(e, s - 11, 7));
                        s = 0, o = i, 0 === a ? (l = 138, d = 3) : i === a ? (l = 6, d = 3) : (l = 7, d = 4)
                    }
            }

            function C(e) {
                var t;
                for (_(e, e.dyn_ltree, e.l_desc.max_code), _(e, e.dyn_dtree, e.d_desc.max_code), x(e, e.bl_desc), t = G - 1; t >= 3 && 0 === e.bl_tree[2 * ie[t] + 1]; t--);
                return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t
            }

            function E(e, t, n, r) {
                var i;
                for (c(e, t - 257, 5), c(e, n - 1, 5), c(e, r - 4, 4), i = 0; i < r; i++) c(e, e.bl_tree[2 * ie[i] + 1], 3);
                k(e, e.dyn_ltree, t - 1), k(e, e.dyn_dtree, n - 1)
            }

            function T(e) {
                var t, n = 4093624447;
                for (t = 0; t <= 31; t++, n >>>= 1)
                    if (1 & n && 0 !== e.dyn_ltree[2 * t]) return B;
                if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return L;
                for (t = 32; t < U; t++)
                    if (0 !== e.dyn_ltree[2 * t]) return L;
                return B
            }

            function S(e) {
                me || (p(), me = !0), e.l_desc = new o(e.dyn_ltree, he), e.d_desc = new o(e.dyn_dtree, fe), e.bl_desc = new o(e.bl_tree, pe), e.bi_buf = 0, e.bi_valid = 0, m(e)
            }

            function A(e, t, n, r) {
                c(e, (P << 1) + (r ? 1 : 0), 3), v(e, t, n, !0)
            }

            function I(e) {
                c(e, j << 1, 3), u(e, Q, ae), d(e)
            }

            function O(e, t, n, r) {
                var i, o, a = 0;
                e.level > 0 ? (e.strm.data_type === z && (e.strm.data_type = T(e)), x(e, e.l_desc), x(e, e.d_desc), a = C(e), i = e.opt_len + 3 + 7 >>> 3, o = e.static_len + 3 + 7 >>> 3, o <= i && (i = o)) : i = o = n + 5, n + 4 <= i && t !== -1 ? A(e, t, n, r) : e.strategy === R || o === i ? (c(e, (j << 1) + (r ? 1 : 0), 3), w(e, ae, se)) : (c(e, (F << 1) + (r ? 1 : 0), 3), E(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, a + 1), w(e, e.dyn_ltree, e.dyn_dtree)), m(e), r && g(e)
            }

            function D(e, t, n) {
                return e.pending_buf[e.d_buf + 2 * e.last_lit] = t >>> 8 & 255, e.pending_buf[e.d_buf + 2 * e.last_lit + 1] = 255 & t, e.pending_buf[e.l_buf + e.last_lit] = 255 & n, e.last_lit++, 0 === t ? e.dyn_ltree[2 * n]++ : (e.matches++, t--, e.dyn_ltree[2 * (ue[n] + U + 1)]++, e.dyn_dtree[2 * a(t)]++), e.last_lit === e.lit_bufsize - 1
            }
            var N = e("../utils/common"),
                R = 4,
                B = 0,
                L = 1,
                z = 2,
                P = 0,
                j = 1,
                F = 2,
                M = 3,
                W = 258,
                H = 29,
                U = 256,
                q = U + 1 + H,
                Z = 30,
                G = 19,
                V = 2 * q + 1,
                X = 15,
                Y = 16,
                K = 7,
                Q = 256,
                $ = 16,
                J = 17,
                ee = 18,
                te = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                ne = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                re = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                ie = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                oe = 512,
                ae = new Array(2 * (q + 2));
            r(ae);
            var se = new Array(2 * Z);
            r(se);
            var ce = new Array(oe);
            r(ce);
            var ue = new Array(W - M + 1);
            r(ue);
            var le = new Array(H);
            r(le);
            var de = new Array(Z);
            r(de);
            var he, fe, pe, me = !1;
            n._tr_init = S, n._tr_stored_block = A, n._tr_flush_block = O, n._tr_tally = D, n._tr_align = I
        }, {
            "../utils/common": 62
        }],
        74: [function(e, t, n) {
            "use strict";

            function r() {
                this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
            }
            t.exports = r
        }, {}]
    }, {}, [10])(10)
});
var Detector = function() {
    function e(e) {
        var n = !1;
        for (var r in t) {
            o.style.fontFamily = e + "," + t[r], i.appendChild(o);
            var c = o.offsetWidth != a[t[r]] || o.offsetHeight != s[t[r]];
            i.removeChild(o), n = n || c
        }
        return n
    }
    var t = ["monospace", "sans-serif", "serif"],
        n = "mmmmmmmmmmlli",
        r = "72px",
        i = document.getElementsByTagName("body")[0],
        o = document.createElement("span");
    o.style.fontSize = r, o.innerHTML = n;
    var a = {},
        s = {};
    for (var c in t) o.style.fontFamily = t[c], i.appendChild(o), a[t[c]] = o.offsetWidth, s[t[c]] = o.offsetHeight, i.removeChild(o);
    this.detect = e
};
! function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";

    function n(e, t) {
        t = t || te;
        var n = t.createElement("script");
        n.text = e, t.head.appendChild(n).parentNode.removeChild(n)
    }

    function r(e) {
        var t = !!e && "length" in e && e.length,
            n = pe.type(e);
        return "function" !== n && !pe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function i(e, t, n) {
        return pe.isFunction(t) ? pe.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        }) : t.nodeType ? pe.grep(e, function(e) {
            return e === t !== n
        }) : "string" != typeof t ? pe.grep(e, function(e) {
            return ae.call(t, e) > -1 !== n
        }) : Ce.test(t) ? pe.filter(t, e, n) : (t = pe.filter(t, e), pe.grep(e, function(e) {
            return ae.call(t, e) > -1 !== n && 1 === e.nodeType
        }))
    }

    function o(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function a(e) {
        var t = {};
        return pe.each(e.match(Oe) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function s(e) {
        return e
    }

    function c(e) {
        throw e
    }

    function u(e, t, n) {
        var r;
        try {
            e && pe.isFunction(r = e.promise) ? r.call(e).done(t).fail(n) : e && pe.isFunction(r = e.then) ? r.call(e, t, n) : t.call(void 0, e)
        } catch (e) {
            n.call(void 0, e)
        }
    }

    function l() {
        te.removeEventListener("DOMContentLoaded", l), e.removeEventListener("load", l), pe.ready()
    }

    function d() {
        this.expando = pe.expando + d.uid++
    }

    function h(e) {
        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Pe.test(e) ? JSON.parse(e) : e)
    }

    function $(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(je, "-$&").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
                try {
                    n = h(n)
                } catch (e) {}
                ze.set(e, t, n)
            } else n = void 0;
        return n
    }

    function f(e, t, n, r) {
        var i, o = 1,
            a = 20,
            s = r ? function() {
                return r.cur()
            } : function() {
                return pe.css(e, t, "")
            },
            c = s(),
            u = n && n[3] || (pe.cssNumber[t] ? "" : "px"),
            l = (pe.cssNumber[t] || "px" !== u && +c) && $e.exec(pe.css(e, t));
        if (l && l[3] !== u) {
            u = u || l[3], n = n || [], l = +c || 1;
            do o = o || ".5", l /= o, pe.style(e, t, l + u); while (o !== (o = s() / c) && 1 !== o && --a)
        }
        return n && (l = +l || +c || 0, i = n[1] ? l + (n[1] + 1) * n[2] : +n[2], r && (r.unit = u, r.start = l, r.end = i)), i
    }

    function p(e) {
        var t, n = e.ownerDocument,
            r = e.nodeName,
            i = Ue[r];
        return i ? i : (t = n.body.appendChild(n.createElement(r)), i = pe.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), Ue[r] = i, i)
    }

    function m(e, t) {
        for (var n, r, i = [], o = 0, a = e.length; o < a; o++) r = e[o], r.style && (n = r.style.display, t ? ("none" === n && (i[o] = Le.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && We(r) && (i[o] = p(r))) : "none" !== n && (i[o] = "none", Le.set(r, "display", n)));
        for (o = 0; o < a; o++) null != i[o] && (e[o].style.display = i[o]);
        return e
    }

    function g(e, t) {
        var n;
        return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && pe.nodeName(e, t) ? pe.merge([e], n) : n
    }

    function v(e, t) {
        for (var n = 0, r = e.length; n < r; n++) Le.set(e[n], "globalEval", !t || Le.get(t[n], "globalEval"))
    }

    function y(e, t, n, r, i) {
        for (var o, a, s, c, u, l, d = t.createDocumentFragment(), h = [], f = 0, p = e.length; f < p; f++)
            if (o = e[f], o || 0 === o)
                if ("object" === pe.type(o)) pe.merge(h, o.nodeType ? [o] : o);
                else if (Xe.test(o)) {
            for (a = a || d.appendChild(t.createElement("div")), s = (Ze.exec(o) || ["", ""])[1].toLowerCase(), c = Ve[s] || Ve._default, a.innerHTML = c[1] + pe.htmlPrefilter(o) + c[2], l = c[0]; l--;) a = a.lastChild;
            pe.merge(h, a.childNodes), a = d.firstChild, a.textContent = ""
        } else h.push(t.createTextNode(o));
        for (d.textContent = "", f = 0; o = h[f++];)
            if (r && pe.inArray(o, r) > -1) i && i.push(o);
            else if (u = pe.contains(o.ownerDocument, o), a = g(d.appendChild(o), "script"), u && v(a), n)
            for (l = 0; o = a[l++];) Ge.test(o.type || "") && n.push(o);
        return d
    }

    function b() {
        return !0
    }

    function w() {
        return !1
    }

    function x() {
        try {
            return te.activeElement
        } catch (e) {}
    }

    function _(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            "string" != typeof n && (r = r || n, n = void 0);
            for (s in t) _(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), i === !1) i = w;
        else if (!i) return e;
        return 1 === o && (a = i, i = function(e) {
            return pe().off(e), a.apply(this, arguments)
        }, i.guid = a.guid || (a.guid = pe.guid++)), e.each(function() {
            pe.event.add(this, t, i, r, n)
        })
    }

    function k(e, t) {
        return pe.nodeName(e, "table") && pe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e : e
    }

    function C(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function E(e) {
        var t = rt.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function T(e, t) {
        var n, r, i, o, a, s, c, u;
        if (1 === t.nodeType) {
            if (Le.hasData(e) && (o = Le.access(e), a = Le.set(t, o), u = o.events)) {
                delete a.handle, a.events = {};
                for (i in u)
                    for (n = 0, r = u[i].length; n < r; n++) pe.event.add(t, i, u[i][n])
            }
            ze.hasData(e) && (s = ze.access(e), c = pe.extend({}, s), ze.set(t, c))
        }
    }

    function S(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && qe.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }

    function A(e, t, r, i) {
        t = ie.apply([], t);
        var o, a, s, c, u, l, d = 0,
            h = e.length,
            f = h - 1,
            p = t[0],
            m = pe.isFunction(p);
        if (m || h > 1 && "string" == typeof p && !he.checkClone && nt.test(p)) return e.each(function(n) {
            var o = e.eq(n);
            m && (t[0] = p.call(this, n, o.html())), A(o, t, r, i)
        });
        if (h && (o = y(t, e[0].ownerDocument, !1, e, i), a = o.firstChild, 1 === o.childNodes.length && (o = a), a || i)) {
            for (s = pe.map(g(o, "script"), C), c = s.length; d < h; d++) u = o, d !== f && (u = pe.clone(u, !0, !0), c && pe.merge(s, g(u, "script"))), r.call(e[d], u, d);
            if (c)
                for (l = s[s.length - 1].ownerDocument, pe.map(s, E), d = 0; d < c; d++) u = s[d], Ge.test(u.type || "") && !Le.access(u, "globalEval") && pe.contains(l, u) && (u.src ? pe._evalUrl && pe._evalUrl(u.src) : n(u.textContent.replace(it, ""), l))
        }
        return e
    }

    function I(e, t, n) {
        for (var r, i = t ? pe.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || pe.cleanData(g(r)), r.parentNode && (n && pe.contains(r.ownerDocument, r) && v(g(r, "script")), r.parentNode.removeChild(r));
        return e
    }

    function O(e, t, n) {
        var r, i, o, a, s = e.style;
        return n = n || st(e), n && (a = n.getPropertyValue(t) || n[t], "" !== a || pe.contains(e.ownerDocument, e) || (a = pe.style(e, t)), !he.pixelMarginRight() && at.test(a) && ot.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
    }

    function D(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function N(e) {
        if (e in ht) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = dt.length; n--;)
            if (e = dt[n] + t, e in ht) return e
    }

    function R(e, t, n) {
        var r = $e.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }

    function B(e, t, n, r, i) {
        var o, a = 0;
        for (o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0; o < 4; o += 2) "margin" === n && (a += pe.css(e, n + Me[o], !0, i)), r ? ("content" === n && (a -= pe.css(e, "padding" + Me[o], !0, i)), "margin" !== n && (a -= pe.css(e, "border" + Me[o] + "Width", !0, i))) : (a += pe.css(e, "padding" + Me[o], !0, i), "padding" !== n && (a += pe.css(e, "border" + Me[o] + "Width", !0, i)));
        return a
    }

    function L(e, t, n) {
        var r, i = !0,
            o = st(e),
            a = "border-box" === pe.css(e, "boxSizing", !1, o);
        if (e.getClientRects().length && (r = e.getBoundingClientRect()[t]), r <= 0 || null == r) {
            if (r = O(e, t, o), (r < 0 || null == r) && (r = e.style[t]), at.test(r)) return r;
            i = a && (he.boxSizingReliable() || r === e.style[t]), r = parseFloat(r) || 0
        }
        return r + B(e, t, n || (a ? "border" : "content"), i, o) + "px"
    }

    function z(e, t, n, r, i) {
        return new z.prototype.init(e, t, n, r, i)
    }

    function P() {
        pt && (e.requestAnimationFrame(P), pe.fx.tick())
    }

    function j() {
        return e.setTimeout(function() {
            ft = void 0
        }), ft = pe.now()
    }

    function F(e, t) {
        var n, r = 0,
            i = {
                height: e
            };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) n = Me[r], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function M(e, t, n) {
        for (var r, i = (U.tweeners[t] || []).concat(U.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e)) return r
    }

    function W(e, t, n) {
        var r, i, o, a, s, c, u, l, d = "width" in t || "height" in t,
            h = this,
            f = {},
            p = e.style,
            g = e.nodeType && We(e),
            v = Le.get(e, "fxshow");
        n.queue || (a = pe._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
            a.unqueued || s()
        }), a.unqueued++, h.always(function() {
            h.always(function() {
                a.unqueued--, pe.queue(e, "fx").length || a.empty.fire()
            })
        }));
        for (r in t)
            if (i = t[r], mt.test(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
                    if ("show" !== i || !v || void 0 === v[r]) continue;
                    g = !0
                }
                f[r] = v && v[r] || pe.style(e, r)
            }
        if (c = !pe.isEmptyObject(t), c || !pe.isEmptyObject(f)) {
            d && 1 === e.nodeType && (n.overflow = [p.overflow, p.overflowX, p.overflowY], u = v && v.display, null == u && (u = Le.get(e, "display")), l = pe.css(e, "display"), "none" === l && (u ? l = u : (m([e], !0), u = e.style.display || u, l = pe.css(e, "display"), m([e]))), ("inline" === l || "inline-block" === l && null != u) && "none" === pe.css(e, "float") && (c || (h.done(function() {
                p.display = u
            }), null == u && (l = p.display, u = "none" === l ? "" : l)), p.display = "inline-block")), n.overflow && (p.overflow = "hidden", h.always(function() {
                p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
            })), c = !1;
            for (r in f) c || (v ? "hidden" in v && (g = v.hidden) : v = Le.access(e, "fxshow", {
                display: u
            }), o && (v.hidden = !g), g && m([e], !0), h.done(function() {
                g || m([e]), Le.remove(e, "fxshow");
                for (r in f) pe.style(e, r, f[r])
            })), c = M(g ? v[r] : 0, r, h), r in v || (v[r] = c.start, g && (c.end = c.start, c.start = 0))
        }
    }

    function H(e, t) {
        var n, r, i, o, a;
        for (n in e)
            if (r = pe.camelCase(n), i = t[r], o = e[n], pe.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = pe.cssHooks[r], a && "expand" in a) {
                o = a.expand(o), delete e[r];
                for (n in o) n in e || (e[n] = o[n], t[n] = i)
            } else t[r] = i
    }

    function U(e, t, n) {
        var r, i, o = 0,
            a = U.prefilters.length,
            s = pe.Deferred().always(function() {
                delete c.elem
            }),
            c = function() {
                if (i) return !1;
                for (var t = ft || j(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, a = 0, c = u.tweens.length; a < c; a++) u.tweens[a].run(o);
                return s.notifyWith(e, [u, o, n]), o < 1 && c ? n : (s.resolveWith(e, [u]), !1)
            },
            u = s.promise({
                elem: e,
                props: pe.extend({}, t),
                opts: pe.extend(!0, {
                    specialEasing: {},
                    easing: pe.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: ft || j(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = pe.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? u.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; n < r; n++) u.tweens[n].run(1);
                    return t ? (s.notifyWith(e, [u, 1, 0]), s.resolveWith(e, [u, t])) : s.rejectWith(e, [u, t]), this
                }
            }),
            l = u.props;
        for (H(l, u.opts.specialEasing); o < a; o++)
            if (r = U.prefilters[o].call(u, e, l, u.opts)) return pe.isFunction(r.stop) && (pe._queueHooks(u.elem, u.opts.queue).stop = pe.proxy(r.stop, r)), r;
        return pe.map(l, M, u), pe.isFunction(u.opts.start) && u.opts.start.call(e, u), pe.fx.timer(pe.extend(c, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function q(e) {
        var t = e.match(Oe) || [];
        return t.join(" ")
    }

    function Z(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function G(e, t, n, r) {
        var i;
        if (pe.isArray(t)) pe.each(t, function(t, i) {
            n || Tt.test(e) ? r(e, i) : G(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== pe.type(t)) r(e, t);
        else
            for (i in t) G(e + "[" + i + "]", t[i], n, r)
    }

    function V(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
                o = t.toLowerCase().match(Oe) || [];
            if (pe.isFunction(n))
                for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function X(e, t, n, r) {
        function i(s) {
            var c;
            return o[s] = !0, pe.each(e[s] || [], function(e, s) {
                var u = s(t, n, r);
                return "string" != typeof u || a || o[u] ? a ? !(c = u) : void 0 : (t.dataTypes.unshift(u), i(u), !1)
            }), c
        }
        var o = {},
            a = e === jt;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }

    function Y(e, t) {
        var n, r, i = pe.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && pe.extend(!0, e, r), e
    }

    function K(e, t, n) {
        for (var r, i, o, a, s = e.contents, c = e.dataTypes;
            "*" === c[0];) c.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (i in s)
                if (s[i] && s[i].test(r)) {
                    c.unshift(i);
                    break
                }
        if (c[0] in n) o = c[0];
        else {
            for (i in n) {
                if (!c[0] || e.converters[i + " " + c[0]]) {
                    o = i;
                    break
                }
                a || (a = i)
            }
            o = o || a
        }
        if (o) return o !== c[0] && c.unshift(o), n[o]
    }

    function Q(e, t, n, r) {
        var i, o, a, s, c, u = {},
            l = e.dataTypes.slice();
        if (l[1])
            for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
        for (o = l.shift(); o;)
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !c && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), c = o, o = l.shift())
                if ("*" === o) o = c;
                else if ("*" !== c && c !== o) {
            if (a = u[c + " " + o] || u["* " + o], !a)
                for (i in u)
                    if (s = i.split(" "), s[1] === o && (a = u[c + " " + s[0]] || u["* " + s[0]])) {
                        a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], l.unshift(s[1]));
                        break
                    }
            if (a !== !0)
                if (a && e.throws) t = a(t);
                else try {
                    t = a(t)
                } catch (e) {
                    return {
                        state: "parsererror",
                        error: a ? e : "No conversion from " + c + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function J(e) {
        return pe.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }
    var ee = [],
        te = e.document,
        ne = Object.getPrototypeOf,
        re = ee.slice,
        ie = ee.concat,
        oe = ee.push,
        ae = ee.indexOf,
        se = {},
        ce = se.toString,
        ue = se.hasOwnProperty,
        le = ue.toString,
        de = le.call(Object),
        he = {},
        fe = "3.1.1",
        pe = function(e, t) {
            return new pe.fn.init(e, t)
        },
        me = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ge = /^-ms-/,
        ve = /-([a-z])/g,
        ye = function(e, t) {
            return t.toUpperCase()
        };
    pe.fn = pe.prototype = {
        jquery: fe,
        constructor: pe,
        length: 0,
        toArray: function() {
            return re.call(this)
        },
        get: function(e) {
            return null == e ? re.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = pe.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        each: function(e) {
            return pe.each(this, e)
        },
        map: function(e) {
            return this.pushStack(pe.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(re.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: oe,
        sort: ee.sort,
        splice: ee.splice
    }, pe.extend = pe.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {},
            s = 1,
            c = arguments.length,
            u = !1;
        for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" == typeof a || pe.isFunction(a) || (a = {}), s === c && (a = this, s--); s < c; s++)
            if (null != (e = arguments[s]))
                for (t in e) n = a[t], r = e[t], a !== r && (u && r && (pe.isPlainObject(r) || (i = pe.isArray(r))) ? (i ? (i = !1, o = n && pe.isArray(n) ? n : []) : o = n && pe.isPlainObject(n) ? n : {}, a[t] = pe.extend(u, o, r)) : void 0 !== r && (a[t] = r));
        return a
    }, pe.extend({
        expando: "jQuery" + (fe + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === pe.type(e)
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            var t = pe.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
        },
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== ce.call(e) || (t = ne(e)) && (n = ue.call(t, "constructor") && t.constructor, "function" != typeof n || le.call(n) !== de))
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? se[ce.call(e)] || "object" : typeof e
        },
        globalEval: function(e) {
            n(e)
        },
        camelCase: function(e) {
            return e.replace(ge, "ms-").replace(ve, ye)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t) {
            var n, i = 0;
            if (r(e))
                for (n = e.length; i < n && t.call(e[i], i, e[i]) !== !1; i++);
            else
                for (i in e)
                    if (t.call(e[i], i, e[i]) === !1) break; return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(me, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (r(Object(e)) ? pe.merge(n, "string" == typeof e ? [e] : e) : oe.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : ae.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            for (var r, i = [], o = 0, a = e.length, s = !n; o < a; o++) r = !t(e[o], o), r !== s && i.push(e[o]);
            return i
        },
        map: function(e, t, n) {
            var i, o, a = 0,
                s = [];
            if (r(e))
                for (i = e.length; a < i; a++) o = t(e[a], a, n), null != o && s.push(o);
            else
                for (a in e) o = t(e[a], a, n), null != o && s.push(o);
            return ie.apply([], s)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            if ("string" == typeof t && (n = e[t], t = e, e = n), pe.isFunction(e)) return r = re.call(arguments, 2), i = function() {
                return e.apply(t || this, r.concat(re.call(arguments)))
            }, i.guid = e.guid = e.guid || pe.guid++, i
        },
        now: Date.now,
        support: he
    }), "function" == typeof Symbol && (pe.fn[Symbol.iterator] = ee[Symbol.iterator]), pe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        se["[object " + t + "]"] = t.toLowerCase()
    });
    var be = function(e) {
        function t(e, t, n, r) {
            var i, o, a, s, c, u, l, h = t && t.ownerDocument,
                p = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== p && 9 !== p && 11 !== p) return n;
            if (!r && ((t ? t.ownerDocument || t : W) !== R && N(t), t = t || R, L)) {
                if (11 !== p && (c = ye.exec(e)))
                    if (i = c[1]) {
                        if (9 === p) {
                            if (!(a = t.getElementById(i))) return n;
                            if (a.id === i) return n.push(a), n
                        } else if (h && (a = h.getElementById(i)) && F(t, a) && a.id === i) return n.push(a), n
                    } else {
                        if (c[2]) return J.apply(n, t.getElementsByTagName(e)), n;
                        if ((i = c[3]) && _.getElementsByClassName && t.getElementsByClassName) return J.apply(n, t.getElementsByClassName(i)), n
                    }
                if (_.qsa && !G[e + " "] && (!z || !z.test(e))) {
                    if (1 !== p) h = t, l = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(xe, _e) : t.setAttribute("id", s = M), u = T(e), o = u.length; o--;) u[o] = "#" + s + " " + f(u[o]);
                        l = u.join(","), h = $.test(e) && d(t.parentNode) || t
                    }
                    if (l) try {
                        return J.apply(n, h.querySelectorAll(l)), n
                    } catch (e) {} finally {
                        s === M && t.removeAttribute("id")
                    }
                }
            }
            return A(e.replace(ce, "$1"), t, n, r)
        }

        function n() {
            function e(n, r) {
                return t.push(n + " ") > k.cacheLength && delete e[t.shift()], e[n + " "] = r
            }
            var t = [];
            return e
        }

        function r(e) {
            return e[M] = !0, e
        }

        function i(e) {
            var t = R.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function o(e, t) {
            for (var n = e.split("|"), r = n.length; r--;) k.attrHandle[n[r]] = t
        }

        function a(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r) return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function c(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function u(e) {
            return function(t) {
                return "form" in t ? t.parentNode && t.disabled === !1 ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Ce(t) === e : t.disabled === e : "label" in t && t.disabled === e
            }
        }

        function l(e) {
            return r(function(t) {
                return t = +t, r(function(n, r) {
                    for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function d(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function h() {}

        function f(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r
        }

        function p(e, t, n) {
            var r = t.dir,
                i = t.next,
                o = i || r,
                a = n && "parentNode" === o,
                s = U++;
            return t.first ? function(t, n, i) {
                for (; t = t[r];)
                    if (1 === t.nodeType || a) return e(t, n, i);
                return !1
            } : function(t, n, c) {
                var u, l, d, h = [H, s];
                if (c) {
                    for (; t = t[r];)
                        if ((1 === t.nodeType || a) && e(t, n, c)) return !0
                } else
                    for (; t = t[r];)
                        if (1 === t.nodeType || a)
                            if (d = t[M] || (t[M] = {}), l = d[t.uniqueID] || (d[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t;
                            else {
                                if ((u = l[o]) && u[0] === H && u[1] === s) return h[2] = u[2];
                                if (l[o] = h, h[2] = e(t, n, c)) return !0
                            } return !1
            }
        }

        function m(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var i = e.length; i--;)
                    if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function g(e, n, r) {
            for (var i = 0, o = n.length; i < o; i++) t(e, n[i], r);
            return r
        }

        function v(e, t, n, r, i) {
            for (var o, a = [], s = 0, c = e.length, u = null != t; s < c; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), u && t.push(s)));
            return a
        }

        function y(e, t, n, i, o, a) {
            return i && !i[M] && (i = y(i)), o && !o[M] && (o = y(o, a)), r(function(r, a, s, c) {
                var u, l, d, h = [],
                    f = [],
                    p = a.length,
                    m = r || g(t || "*", s.nodeType ? [s] : s, []),
                    y = !e || !r && t ? m : v(m, h, e, s, c),
                    b = n ? o || (r ? e : p || i) ? [] : a : y;
                if (n && n(y, b, s, c), i)
                    for (u = v(b, f), i(u, [], s, c), l = u.length; l--;)(d = u[l]) && (b[f[l]] = !(y[f[l]] = d));
                if (r) {
                    if (o || e) {
                        if (o) {
                            for (u = [], l = b.length; l--;)(d = b[l]) && u.push(y[l] = d);
                            o(null, b = [], u, c)
                        }
                        for (l = b.length; l--;)(d = b[l]) && (u = o ? te(r, d) : h[l]) > -1 && (r[u] = !(a[u] = d))
                    }
                } else b = v(b === a ? b.splice(p, b.length) : b), o ? o(null, a, b, c) : J.apply(a, b)
            })
        }

        function b(e) {
            for (var t, n, r, i = e.length, o = k.relative[e[0].type], a = o || k.relative[" "], s = o ? 1 : 0, c = p(function(e) {
                    return e === t
                }, a, !0), u = p(function(e) {
                    return te(t, e) > -1
                }, a, !0), l = [function(e, n, r) {
                    var i = !o && (r || n !== I) || ((t = n).nodeType ? c(e, n, r) : u(e, n, r));
                    return t = null, i
                }]; s < i; s++)
                if (n = k.relative[e[s].type]) l = [p(m(l), n)];
                else {
                    if (n = k.filter[e[s].type].apply(null, e[s].matches), n[M]) {
                        for (r = ++s; r < i && !k.relative[e[r].type]; r++);
                        return y(s > 1 && m(l), s > 1 && f(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(ce, "$1"), n, s < r && b(e.slice(s, r)), r < i && b(e = e.slice(r)), r < i && f(e))
                    }
                    l.push(n)
                }
            return m(l)
        }

        function w(e, n) {
            var i = n.length > 0,
                o = e.length > 0,
                a = function(r, a, s, c, u) {
                    var l, d, h, f = 0,
                        p = "0",
                        m = r && [],
                        g = [],
                        y = I,
                        b = r || o && k.find.TAG("*", u),
                        w = H += null == y ? 1 : Math.random() || .1,
                        x = b.length;
                    for (u && (I = a === R || a || u); p !== x && null != (l = b[p]); p++) {
                        if (o && l) {
                            for (d = 0, a || l.ownerDocument === R || (N(l), s = !L); h = e[d++];)
                                if (h(l, a || R, s)) {
                                    c.push(l);
                                    break
                                }
                            u && (H = w)
                        }
                        i && ((l = !h && l) && f--, r && m.push(l))
                    }
                    if (f += p, i && p !== f) {
                        for (d = 0; h = n[d++];) h(m, g, a, s);
                        if (r) {
                            if (f > 0)
                                for (; p--;) m[p] || g[p] || (g[p] = K.call(c));
                            g = v(g)
                        }
                        J.apply(c, g), u && !r && g.length > 0 && f + n.length > 1 && t.uniqueSort(c)
                    }
                    return u && (H = w, I = y), m
                };
            return i ? r(a) : a
        }
        var x, _, k, C, E, T, S, A, I, O, D, N, R, B, L, z, P, j, F, M = "sizzle" + 1 * new Date,
            W = e.document,
            H = 0,
            U = 0,
            q = n(),
            Z = n(),
            G = n(),
            V = function(e, t) {
                return e === t && (D = !0), 0
            },
            X = {}.hasOwnProperty,
            Y = [],
            K = Y.pop,
            Q = Y.push,
            J = Y.push,
            ee = Y.slice,
            te = function(e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t) return n;
                return -1
            },
            ne = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            re = "[\\x20\\t\\r\\n\\f]",
            ie = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            oe = "\\[" + re + "*(" + ie + ")(?:" + re + "*([*^$|!~]?=)" + re + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + re + "*\\]",
            ae = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
            se = new RegExp(re + "+", "g"),
            ce = new RegExp("^" + re + "+|((?:^|[^\\\\])(?:\\\\.)*)" + re + "+$", "g"),
            ue = new RegExp("^" + re + "*," + re + "*"),
            le = new RegExp("^" + re + "*([>+~]|" + re + ")" + re + "*"),
            de = new RegExp("=" + re + "*([^\\]'\"]*?)" + re + "*\\]", "g"),
            he = new RegExp(ae),
            fe = new RegExp("^" + ie + "$"),
            pe = {
                ID: new RegExp("^#(" + ie + ")"),
                CLASS: new RegExp("^\\.(" + ie + ")"),
                TAG: new RegExp("^(" + ie + "|[*])"),
                ATTR: new RegExp("^" + oe),
                PSEUDO: new RegExp("^" + ae),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + re + "*(even|odd|(([+-]|)(\\d*)n|)" + re + "*(?:([+-]|)" + re + "*(\\d+)|))" + re + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + ne + ")$", "i"),
                needsContext: new RegExp("^" + re + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + re + "*((?:-\\d)?\\d*)" + re + "*\\)|)(?=[^-]|$)", "i")
            },
            me = /^(?:input|select|textarea|button)$/i,
            ge = /^h\d$/i,
            ve = /^[^{]+\{\s*\[native \w/,
            ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            $ = /[+~]/,
            be = new RegExp("\\\\([\\da-f]{1,6}" + re + "?|(" + re + ")|.)", "ig"),
            we = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            xe = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            _e = function(e, t) {
                return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            },
            ke = function() {
                N()
            },
            Ce = p(function(e) {
                return e.disabled === !0 && ("form" in e || "label" in e)
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            J.apply(Y = ee.call(W.childNodes), W.childNodes), Y[W.childNodes.length].nodeType
        } catch (e) {
            J = {
                apply: Y.length ? function(e, t) {
                    Q.apply(e, ee.call(t))
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }
        _ = t.support = {}, E = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, N = t.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e : W;
            return r !== R && 9 === r.nodeType && r.documentElement ? (R = r, B = R.documentElement, L = !E(R), W !== R && (n = R.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", ke, !1) : n.attachEvent && n.attachEvent("onunload", ke)), _.attributes = i(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), _.getElementsByTagName = i(function(e) {
                return e.appendChild(R.createComment("")), !e.getElementsByTagName("*").length
            }), _.getElementsByClassName = ve.test(R.getElementsByClassName), _.getById = i(function(e) {
                return B.appendChild(e).id = M, !R.getElementsByName || !R.getElementsByName(M).length
            }), _.getById ? (k.filter.ID = function(e) {
                var t = e.replace(be, we);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }, k.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && L) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }) : (k.filter.ID = function(e) {
                var t = e.replace(be, we);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }, k.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && L) {
                    var n, r, i, o = t.getElementById(e);
                    if (o) {
                        if (n = o.getAttributeNode("id"), n && n.value === e) return [o];
                        for (i = t.getElementsByName(e), r = 0; o = i[r++];)
                            if (n = o.getAttributeNode("id"), n && n.value === e) return [o]
                    }
                    return []
                }
            }), k.find.TAG = _.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : _.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n, r = [],
                    i = 0,
                    o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }, k.find.CLASS = _.getElementsByClassName && function(e, t) {
                if ("undefined" != typeof t.getElementsByClassName && L) return t.getElementsByClassName(e)
            }, P = [], z = [], (_.qsa = ve.test(R.querySelectorAll)) && (i(function(e) {
                B.appendChild(e).innerHTML = "<a id='" + M + "'></a><select id='" + M + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && z.push("[*^$]=" + re + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || z.push("\\[" + re + "*(?:value|" + ne + ")"), e.querySelectorAll("[id~=" + M + "-]").length || z.push("~="), e.querySelectorAll(":checked").length || z.push(":checked"), e.querySelectorAll("a#" + M + "+*").length || z.push(".#.+[+~]")
            }), i(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = R.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && z.push("name" + re + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && z.push(":enabled", ":disabled"), B.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && z.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), z.push(",.*:")
            })), (_.matchesSelector = ve.test(j = B.matches || B.webkitMatchesSelector || B.mozMatchesSelector || B.oMatchesSelector || B.msMatchesSelector)) && i(function(e) {
                _.disconnectedMatch = j.call(e, "*"), j.call(e, "[s!='']:x"), P.push("!=", ae)
            }), z = z.length && new RegExp(z.join("|")), P = P.length && new RegExp(P.join("|")), t = ve.test(B.compareDocumentPosition), F = t || ve.test(B.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, V = t ? function(e, t) {
                if (e === t) return D = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !_.sortDetached && t.compareDocumentPosition(e) === n ? e === R || e.ownerDocument === W && F(W, e) ? -1 : t === R || t.ownerDocument === W && F(W, t) ? 1 : O ? te(O, e) - te(O, t) : 0 : 4 & n ? -1 : 1)
            } : function(e, t) {
                if (e === t) return D = !0, 0;
                var n, r = 0,
                    i = e.parentNode,
                    o = t.parentNode,
                    s = [e],
                    c = [t];
                if (!i || !o) return e === R ? -1 : t === R ? 1 : i ? -1 : o ? 1 : O ? te(O, e) - te(O, t) : 0;
                if (i === o) return a(e, t);
                for (n = e; n = n.parentNode;) s.unshift(n);
                for (n = t; n = n.parentNode;) c.unshift(n);
                for (; s[r] === c[r];) r++;
                return r ? a(s[r], c[r]) : s[r] === W ? -1 : c[r] === W ? 1 : 0
            }, R) : R
        }, t.matches = function(e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== R && N(e), n = n.replace(de, "='$1']"), _.matchesSelector && L && !G[n + " "] && (!P || !P.test(n)) && (!z || !z.test(n))) try {
                var r = j.call(e, n);
                if (r || _.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch (e) {}
            return t(n, R, null, [e]).length > 0
        }, t.contains = function(e, t) {
            return (e.ownerDocument || e) !== R && N(e), F(e, t)
        }, t.attr = function(e, t) {
            (e.ownerDocument || e) !== R && N(e);
            var n = k.attrHandle[t.toLowerCase()],
                r = n && X.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !L) : void 0;
            return void 0 !== r ? r : _.attributes || !L ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }, t.escape = function(e) {
            return (e + "").replace(xe, _e)
        }, t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function(e) {
            var t, n = [],
                r = 0,
                i = 0;
            if (D = !_.detectDuplicates, O = !_.sortStable && e.slice(0), e.sort(V), D) {
                for (; t = e[i++];) t === e[i] && (r = n.push(i));
                for (; r--;) e.splice(n[r], 1)
            }
            return O = null, e
        }, C = t.getText = function(e) {
            var t, n = "",
                r = 0,
                i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += C(e)
                } else if (3 === i || 4 === i) return e.nodeValue
            } else
                for (; t = e[r++];) n += C(t);
            return n
        }, k = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: pe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(be, we), e[3] = (e[3] || e[4] || e[5] || "").replace(be, we), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && he.test(n) && (t = T(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(be, we).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = q[e + " "];
                    return t || (t = new RegExp("(^|" + re + ")" + e + "(" + re + "|$)")) && q(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, r) {
                    return function(i) {
                        var o = t.attr(i, e);
                        return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(se, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3),
                        a = "last" !== e.slice(-4),
                        s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, c) {
                        var u, l, d, h, f, p, m = o !== a ? "nextSibling" : "previousSibling",
                            g = t.parentNode,
                            v = s && t.nodeName.toLowerCase(),
                            y = !c && !s,
                            b = !1;
                        if (g) {
                            if (o) {
                                for (; m;) {
                                    for (h = t; h = h[m];)
                                        if (s ? h.nodeName.toLowerCase() === v : 1 === h.nodeType) return !1;
                                    p = m = "only" === e && !p && "nextSibling"
                                }
                                return !0
                            }
                            if (p = [a ? g.firstChild : g.lastChild], a && y) {
                                for (h = g, d = h[M] || (h[M] = {}), l = d[h.uniqueID] || (d[h.uniqueID] = {}), u = l[e] || [], f = u[0] === H && u[1], b = f && u[2], h = f && g.childNodes[f]; h = ++f && h && h[m] || (b = f = 0) || p.pop();)
                                    if (1 === h.nodeType && ++b && h === t) {
                                        l[e] = [H, f, b];
                                        break
                                    }
                            } else if (y && (h = t, d = h[M] || (h[M] = {}), l = d[h.uniqueID] || (d[h.uniqueID] = {}), u = l[e] || [], f = u[0] === H && u[1], b = f), b === !1)
                                for (;
                                    (h = ++f && h && h[m] || (b = f = 0) || p.pop()) && ((s ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++b || (y && (d = h[M] || (h[M] = {}), l = d[h.uniqueID] || (d[h.uniqueID] = {}), l[e] = [H, b]), h !== t)););
                            return b -= i, b === r || b % r === 0 && b / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var i, o = k.pseudos[e] || k.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[M] ? o(n) : o.length > 1 ? (i = [e, e, "", n], k.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                        for (var r, i = o(e, n), a = i.length; a--;) r = te(e, i[a]), e[r] = !(t[r] = i[a])
                    }) : function(e) {
                        return o(e, 0, i)
                    }) : o
                }
            },
            pseudos: {
                not: r(function(e) {
                    var t = [],
                        n = [],
                        i = S(e.replace(ce, "$1"));
                    return i[M] ? r(function(e, t, n, r) {
                        for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, r, o) {
                        return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop()
                    }
                }),
                has: r(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: r(function(e) {
                    return e = e.replace(be, we),
                        function(t) {
                            return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
                        }
                }),
                lang: r(function(e) {
                    return fe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(be, we).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = L ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                            while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === B
                },
                focus: function(e) {
                    return e === R.activeElement && (!R.hasFocus || R.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: u(!1),
                disabled: u(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !k.pseudos.empty(e)
                },
                header: function(e) {
                    return ge.test(e.nodeName)
                },
                input: function(e) {
                    return me.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: l(function() {
                    return [0]
                }),
                last: l(function(e, t) {
                    return [t - 1]
                }),
                eq: l(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: l(function(e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e
                }),
                odd: l(function(e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e
                }),
                lt: l(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: l(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                    return e
                })
            }
        }, k.pseudos.nth = k.pseudos.eq;
        for (x in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) k.pseudos[x] = s(x);
        for (x in {
                submit: !0,
                reset: !0
            }) k.pseudos[x] = c(x);
        return h.prototype = k.filters = k.pseudos, k.setFilters = new h, T = t.tokenize = function(e, n) {
            var r, i, o, a, s, c, u, l = Z[e + " "];
            if (l) return n ? 0 : l.slice(0);
            for (s = e, c = [], u = k.preFilter; s;) {
                r && !(i = ue.exec(s)) || (i && (s = s.slice(i[0].length) || s), c.push(o = [])), r = !1, (i = le.exec(s)) && (r = i.shift(), o.push({
                    value: r,
                    type: i[0].replace(ce, " ")
                }), s = s.slice(r.length));
                for (a in k.filter) !(i = pe[a].exec(s)) || u[a] && !(i = u[a](i)) || (r = i.shift(), o.push({
                    value: r,
                    type: a,
                    matches: i
                }), s = s.slice(r.length));
                if (!r) break
            }
            return n ? s.length : s ? t.error(e) : Z(e, c).slice(0)
        }, S = t.compile = function(e, t) {
            var n, r = [],
                i = [],
                o = G[e + " "];
            if (!o) {
                for (t || (t = T(e)), n = t.length; n--;) o = b(t[n]), o[M] ? r.push(o) : i.push(o);
                o = G(e, w(i, r)), o.selector = e
            }
            return o
        }, A = t.select = function(e, t, n, r) {
            var i, o, a, s, c, u = "function" == typeof e && e,
                l = !r && T(e = u.selector || e);
            if (n = n || [], 1 === l.length) {
                if (o = l[0] = l[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && 9 === t.nodeType && L && k.relative[o[1].type]) {
                    if (t = (k.find.ID(a.matches[0].replace(be, we), t) || [])[0], !t) return n;
                    u && (t = t.parentNode), e = e.slice(o.shift().value.length)
                }
                for (i = pe.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !k.relative[s = a.type]);)
                    if ((c = k.find[s]) && (r = c(a.matches[0].replace(be, we), $.test(o[0].type) && d(t.parentNode) || t))) {
                        if (o.splice(i, 1), e = r.length && f(o), !e) return J.apply(n, r), n;
                        break
                    }
            }
            return (u || S(e, l))(r, t, !L, n, !t || $.test(e) && d(t.parentNode) || t), n
        }, _.sortStable = M.split("").sort(V).join("") === M, _.detectDuplicates = !!D, N(), _.sortDetached = i(function(e) {
            return 1 & e.compareDocumentPosition(R.createElement("fieldset"))
        }), i(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), _.attributes && i(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || o("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), i(function(e) {
            return null == e.getAttribute("disabled")
        }) || o(ne, function(e, t, n) {
            var r;
            if (!n) return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), t
    }(e);
    pe.find = be, pe.expr = be.selectors, pe.expr[":"] = pe.expr.pseudos, pe.uniqueSort = pe.unique = be.uniqueSort, pe.text = be.getText, pe.isXMLDoc = be.isXML, pe.contains = be.contains, pe.escapeSelector = be.escape;
    var we = function(e, t, n) {
            for (var r = [], i = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (i && pe(e).is(n)) break;
                    r.push(e)
                }
            return r
        },
        xe = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        _e = pe.expr.match.needsContext,
        ke = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
        Ce = /^.[^:#\[\.,]*$/;
    pe.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? pe.find.matchesSelector(r, e) ? [r] : [] : pe.find.matches(e, pe.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, pe.fn.extend({
        find: function(e) {
            var t, n, r = this.length,
                i = this;
            if ("string" != typeof e) return this.pushStack(pe(e).filter(function() {
                for (t = 0; t < r; t++)
                    if (pe.contains(i[t], this)) return !0
            }));
            for (n = this.pushStack([]), t = 0; t < r; t++) pe.find(e, i[t], n);
            return r > 1 ? pe.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(i(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(i(this, e || [], !0))
        },
        is: function(e) {
            return !!i(this, "string" == typeof e && _e.test(e) ? pe(e) : e || [], !1).length
        }
    });
    var Ee, Te = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
        Se = pe.fn.init = function(e, t, n) {
            var r, i;
            if (!e) return this;
            if (n = n || Ee, "string" == typeof e) {
                if (r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : Te.exec(e), !r || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (t = t instanceof pe ? t[0] : t, pe.merge(this, pe.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : te, !0)), ke.test(r[1]) && pe.isPlainObject(t))
                        for (r in t) pe.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this
                }
                return i = te.getElementById(r[2]), i && (this[0] = i, this.length = 1), this
            }
            return e.nodeType ? (this[0] = e, this.length = 1, this) : pe.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(pe) : pe.makeArray(e, this)
        };
    Se.prototype = pe.fn, Ee = pe(te);
    var Ae = /^(?:parents|prev(?:Until|All))/,
        Ie = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    pe.fn.extend({
        has: function(e) {
            var t = pe(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (pe.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                o = [],
                a = "string" != typeof e && pe(e);
            if (!_e.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && pe.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        }
            return this.pushStack(o.length > 1 ? pe.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? ae.call(pe(e), this[0]) : ae.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(pe.uniqueSort(pe.merge(this.get(), pe(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), pe.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return we(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return we(e, "parentNode", n)
        },
        next: function(e) {
            return o(e, "nextSibling")
        },
        prev: function(e) {
            return o(e, "previousSibling")
        },
        nextAll: function(e) {
            return we(e, "nextSibling")
        },
        prevAll: function(e) {
            return we(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return we(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return we(e, "previousSibling", n)
        },
        siblings: function(e) {
            return xe((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return xe(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || pe.merge([], e.childNodes)
        }
    }, function(e, t) {
        pe.fn[e] = function(n, r) {
            var i = pe.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = pe.filter(r, i)), this.length > 1 && (Ie[e] || pe.uniqueSort(i), Ae.test(e) && i.reverse()), this.pushStack(i)
        }
    });
    var Oe = /[^\x20\t\r\n\f]+/g;
    pe.Callbacks = function(e) {
        e = "string" == typeof e ? a(e) : pe.extend({}, e);
        var t, n, r, i, o = [],
            s = [],
            c = -1,
            u = function() {
                for (i = e.once, r = t = !0; s.length; c = -1)
                    for (n = s.shift(); ++c < o.length;) o[c].apply(n[0], n[1]) === !1 && e.stopOnFalse && (c = o.length, n = !1);
                e.memory || (n = !1), t = !1, i && (o = n ? [] : "")
            },
            l = {
                add: function() {
                    return o && (n && !t && (c = o.length - 1, s.push(n)), function t(n) {
                        pe.each(n, function(n, r) {
                            pe.isFunction(r) ? e.unique && l.has(r) || o.push(r) : r && r.length && "string" !== pe.type(r) && t(r)
                        })
                    }(arguments), n && !t && u()), this
                },
                remove: function() {
                    return pe.each(arguments, function(e, t) {
                        for (var n;
                            (n = pe.inArray(t, o, n)) > -1;) o.splice(n, 1), n <= c && c--
                    }), this
                },
                has: function(e) {
                    return e ? pe.inArray(e, o) > -1 : o.length > 0
                },
                empty: function() {
                    return o && (o = []), this
                },
                disable: function() {
                    return i = s = [], o = n = "", this
                },
                disabled: function() {
                    return !o
                },
                lock: function() {
                    return i = s = [], n || t || (o = n = ""), this
                },
                locked: function() {
                    return !!i
                },
                fireWith: function(e, n) {
                    return i || (n = n || [], n = [e, n.slice ? n.slice() : n], s.push(n), t || u()), this
                },
                fire: function() {
                    return l.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!r
                }
            };
        return l
    }, pe.extend({
        Deferred: function(t) {
            var n = [
                    ["notify", "progress", pe.Callbacks("memory"), pe.Callbacks("memory"), 2],
                    ["resolve", "done", pe.Callbacks("once memory"), pe.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", pe.Callbacks("once memory"), pe.Callbacks("once memory"), 1, "rejected"]
                ],
                r = "pending",
                i = {
                    state: function() {
                        return r
                    },
                    always: function() {
                        return o.done(arguments).fail(arguments), this
                    },
                    catch: function(e) {
                        return i.then(null, e)
                    },
                    pipe: function() {
                        var e = arguments;
                        return pe.Deferred(function(t) {
                            pe.each(n, function(n, r) {
                                var i = pe.isFunction(e[r[4]]) && e[r[4]];
                                o[r[1]](function() {
                                    var e = i && i.apply(this, arguments);
                                    e && pe.isFunction(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, i ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    then: function(t, r, i) {
                        function o(t, n, r, i) {
                            return function() {
                                var u = this,
                                    l = arguments,
                                    d = function() {
                                        var e, d;
                                        if (!(t < a)) {
                                            if (e = r.apply(u, l), e === n.promise()) throw new TypeError("Thenable self-resolution");
                                            d = e && ("object" == typeof e || "function" == typeof e) && e.then, pe.isFunction(d) ? i ? d.call(e, o(a, n, s, i), o(a, n, c, i)) : (a++, d.call(e, o(a, n, s, i), o(a, n, c, i), o(a, n, s, n.notifyWith))) : (r !== s && (u = void 0, l = [e]), (i || n.resolveWith)(u, l))
                                        }
                                    },
                                    h = i ? d : function() {
                                        try {
                                            d()
                                        } catch (e) {
                                            pe.Deferred.exceptionHook && pe.Deferred.exceptionHook(e, h.stackTrace), t + 1 >= a && (r !== c && (u = void 0, l = [e]), n.rejectWith(u, l))
                                        }
                                    };
                                t ? h() : (pe.Deferred.getStackHook && (h.stackTrace = pe.Deferred.getStackHook()), e.setTimeout(h))
                            }
                        }
                        var a = 0;
                        return pe.Deferred(function(e) {
                            n[0][3].add(o(0, e, pe.isFunction(i) ? i : s, e.notifyWith)), n[1][3].add(o(0, e, pe.isFunction(t) ? t : s)), n[2][3].add(o(0, e, pe.isFunction(r) ? r : c))
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? pe.extend(e, i) : i
                    }
                },
                o = {};
            return pe.each(n, function(e, t) {
                var a = t[2],
                    s = t[5];
                i[t[1]] = a.add, s && a.add(function() {
                    r = s
                }, n[3 - e][2].disable, n[0][2].lock), a.add(t[3].fire), o[t[0]] = function() {
                    return o[t[0] + "With"](this === o ? void 0 : this, arguments), this
                }, o[t[0] + "With"] = a.fireWith
            }), i.promise(o), t && t.call(o, o), o
        },
        when: function(e) {
            var t = arguments.length,
                n = t,
                r = Array(n),
                i = re.call(arguments),
                o = pe.Deferred(),
                a = function(e) {
                    return function(n) {
                        r[e] = this, i[e] = arguments.length > 1 ? re.call(arguments) : n, --t || o.resolveWith(r, i)
                    }
                };
            if (t <= 1 && (u(e, o.done(a(n)).resolve, o.reject), "pending" === o.state() || pe.isFunction(i[n] && i[n].then))) return o.then();
            for (; n--;) u(i[n], a(n), o.reject);
            return o.promise()
        }
    });
    var De = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    pe.Deferred.exceptionHook = function(t, n) {
        e.console && e.console.warn && t && De.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
    }, pe.readyException = function(t) {
        e.setTimeout(function() {
            throw t
        })
    };
    var Ne = pe.Deferred();
    pe.fn.ready = function(e) {
        return Ne.then(e).catch(function(e) {
            pe.readyException(e)
        }), this
    }, pe.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? pe.readyWait++ : pe.ready(!0)
        },
        ready: function(e) {
            (e === !0 ? --pe.readyWait : pe.isReady) || (pe.isReady = !0, e !== !0 && --pe.readyWait > 0 || Ne.resolveWith(te, [pe]))
        }
    }), pe.ready.then = Ne.then, "complete" === te.readyState || "loading" !== te.readyState && !te.documentElement.doScroll ? e.setTimeout(pe.ready) : (te.addEventListener("DOMContentLoaded", l), e.addEventListener("load", l));
    var Re = function(e, t, n, r, i, o, a) {
            var s = 0,
                c = e.length,
                u = null == n;
            if ("object" === pe.type(n)) {
                i = !0;
                for (s in n) Re(e, t, s, n[s], !0, o, a)
            } else if (void 0 !== r && (i = !0, pe.isFunction(r) || (a = !0), u && (a ? (t.call(e, r), t = null) : (u = t, t = function(e, t, n) {
                    return u.call(pe(e), n)
                })), t))
                for (; s < c; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : u ? t.call(e) : c ? t(e[0], n) : o
        },
        Be = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
    d.uid = 1, d.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, Be(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t) i[pe.camelCase(t)] = n;
            else
                for (r in t) i[pe.camelCase(r)] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][pe.camelCase(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    pe.isArray(t) ? t = t.map(pe.camelCase) : (t = pe.camelCase(t), t = t in r ? [t] : t.match(Oe) || []), n = t.length;
                    for (; n--;) delete r[t[n]]
                }(void 0 === t || pe.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !pe.isEmptyObject(t)
        }
    };
    var Le = new d,
        ze = new d,
        Pe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        je = /[A-Z]/g;
    pe.extend({
        hasData: function(e) {
            return ze.hasData(e) || Le.hasData(e)
        },
        data: function(e, t, n) {
            return ze.access(e, t, n)
        },
        removeData: function(e, t) {
            ze.remove(e, t)
        },
        _data: function(e, t, n) {
            return Le.access(e, t, n)
        },
        _removeData: function(e, t) {
            Le.remove(e, t)
        }
    }), pe.fn.extend({
        data: function(e, t) {
            var n, r, i, o = this[0],
                a = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (i = ze.get(o), 1 === o.nodeType && !Le.get(o, "hasDataAttrs"))) {
                    for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = pe.camelCase(r.slice(5)), $(o, r, i[r])));
                    Le.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function() {
                ze.set(this, e)
            }) : Re(this, function(t) {
                var n;
                if (o && void 0 === t) {
                    if (n = ze.get(o, e), void 0 !== n) return n;
                    if (n = $(o, e), void 0 !== n) return n
                } else this.each(function() {
                    ze.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                ze.remove(this, e)
            })
        }
    }), pe.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = Le.get(e, t), n && (!r || pe.isArray(n) ? r = Le.access(e, t, pe.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = pe.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = pe._queueHooks(e, t),
                a = function() {
                    pe.dequeue(e, t)
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return Le.get(e, n) || Le.access(e, n, {
                empty: pe.Callbacks("once memory").add(function() {
                    Le.remove(e, [t + "queue", n])
                })
            })
        }
    }), pe.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? pe.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = pe.queue(this, e, t);
                pe._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && pe.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                pe.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = pe.Deferred(),
                o = this,
                a = this.length,
                s = function() {
                    --r || i.resolveWith(o, [o])
                };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = Le.get(o[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var Fe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        $e = new RegExp("^(?:([+-])=|)(" + Fe + ")([a-z%]*)$", "i"),
        Me = ["Top", "Right", "Bottom", "Left"],
        We = function(e, t) {
            return e = t || e, "none" === e.style.display || "" === e.style.display && pe.contains(e.ownerDocument, e) && "none" === pe.css(e, "display")
        },
        He = function(e, t, n, r) {
            var i, o, a = {};
            for (o in t) a[o] = e.style[o], e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t) e.style[o] = a[o];
            return i
        },
        Ue = {};
    pe.fn.extend({
        show: function() {
            return m(this, !0)
        },
        hide: function() {
            return m(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                We(this) ? pe(this).show() : pe(this).hide()
            })
        }
    });
    var qe = /^(?:checkbox|radio)$/i,
        Ze = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        Ge = /^$|\/(?:java|ecma)script/i,
        Ve = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Ve.optgroup = Ve.option, Ve.tbody = Ve.tfoot = Ve.colgroup = Ve.caption = Ve.thead, Ve.th = Ve.td;
    var Xe = /<|&#?\w+;/;
    ! function() {
        var e = te.createDocumentFragment(),
            t = e.appendChild(te.createElement("div")),
            n = te.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), he.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", he.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var Ye = te.documentElement,
        Ke = /^key/,
        Qe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Je = /^([^.]*)(?:\.(.+)|)/;
    pe.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var o, a, s, c, u, l, d, h, f, p, m, g = Le.get(e);
            if (g)
                for (n.handler && (o = n, n = o.handler, i = o.selector), i && pe.find.matchesSelector(Ye, i), n.guid || (n.guid = pe.guid++), (c = g.events) || (c = g.events = {}), (a = g.handle) || (a = g.handle = function(t) {
                        return "undefined" != typeof pe && pe.event.triggered !== t.type ? pe.event.dispatch.apply(e, arguments) : void 0
                    }), t = (t || "").match(Oe) || [""], u = t.length; u--;) s = Je.exec(t[u]) || [], f = m = s[1], p = (s[2] || "").split(".").sort(), f && (d = pe.event.special[f] || {}, f = (i ? d.delegateType : d.bindType) || f, d = pe.event.special[f] || {}, l = pe.extend({
                    type: f,
                    origType: m,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && pe.expr.match.needsContext.test(i),
                    namespace: p.join(".")
                }, o), (h = c[f]) || (h = c[f] = [], h.delegateCount = 0, d.setup && d.setup.call(e, r, p, a) !== !1 || e.addEventListener && e.addEventListener(f, a)), d.add && (d.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), i ? h.splice(h.delegateCount++, 0, l) : h.push(l), pe.event.global[f] = !0)
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, c, u, l, d, h, f, p, m, g = Le.hasData(e) && Le.get(e);
            if (g && (c = g.events)) {
                for (t = (t || "").match(Oe) || [""], u = t.length; u--;)
                    if (s = Je.exec(t[u]) || [], f = m = s[1], p = (s[2] || "").split(".").sort(), f) {
                        for (d = pe.event.special[f] || {}, f = (r ? d.delegateType : d.bindType) || f, h = c[f] || [], s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = h.length; o--;) l = h[o], !i && m !== l.origType || n && n.guid !== l.guid || s && !s.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (h.splice(o, 1), l.selector && h.delegateCount--, d.remove && d.remove.call(e, l));
                        a && !h.length && (d.teardown && d.teardown.call(e, p, g.handle) !== !1 || pe.removeEvent(e, f, g.handle), delete c[f])
                    } else
                        for (f in c) pe.event.remove(e, f + t[u], n, r, !0);
                pe.isEmptyObject(c) && Le.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t = pe.event.fix(e),
                n, r, i, o, a, s, c = new Array(arguments.length),
                u = (Le.get(this, "events") || {})[t.type] || [],
                l = pe.event.special[t.type] || {};
            for (c[0] = t, n = 1; n < arguments.length; n++) c[n] = arguments[n];
            if (t.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, t) !== !1) {
                for (s = pe.event.handlers.call(this, t, u), n = 0;
                    (o = s[n++]) && !t.isPropagationStopped();)
                    for (t.currentTarget = o.elem, r = 0;
                        (a = o.handlers[r++]) && !t.isImmediatePropagationStopped();) t.rnamespace && !t.rnamespace.test(a.namespace) || (t.handleObj = a, t.data = a.data, i = ((pe.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, c), void 0 !== i && (t.result = i) === !1 && (t.preventDefault(), t.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, t), t.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a, s = [],
                c = t.delegateCount,
                u = e.target;
            if (c && u.nodeType && !("click" === e.type && e.button >= 1))
                for (; u !== this; u = u.parentNode || this)
                    if (1 === u.nodeType && ("click" !== e.type || u.disabled !== !0)) {
                        for (o = [], a = {}, n = 0; n < c; n++) r = t[n], i = r.selector + " ", void 0 === a[i] && (a[i] = r.needsContext ? pe(i, this).index(u) > -1 : pe.find(i, this, null, [u]).length), a[i] && o.push(r);
                        o.length && s.push({
                            elem: u,
                            handlers: o
                        })
                    }
            return u = this, c < t.length && s.push({
                elem: u,
                handlers: t.slice(c)
            }), s
        },
        addProp: function(e, t) {
            Object.defineProperty(pe.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: pe.isFunction(t) ? function() {
                    if (this.originalEvent) return t(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[e]
                },
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[pe.expando] ? e : new pe.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== x() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === x() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && pe.nodeName(this, "input")) return this.click(), !1
                },
                _default: function(e) {
                    return pe.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                }
            }
        }
    }, pe.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, pe.Event = function(e, t) {
        return this instanceof pe.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? b : w, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && pe.extend(this, t), this.timeStamp = e && e.timeStamp || pe.now(), void(this[pe.expando] = !0)) : new pe.Event(e, t)
    }, pe.Event.prototype = {
        constructor: pe.Event,
        isDefaultPrevented: w,
        isPropagationStopped: w,
        isImmediatePropagationStopped: w,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = b, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = b, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = b, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, pe.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && Ke.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Qe.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, pe.event.addProp), pe.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        pe.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    o = e.handleObj;
                return i && (i === r || pe.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), pe.fn.extend({
        on: function(e, t, n, r) {
            return _(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return _(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, pe(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = w), this.each(function() {
                pe.event.remove(this, e, n, t)
            })
        }
    });
    var et = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        tt = /<script|<style|<link/i,
        nt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rt = /^true\/(.*)/,
        it = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    pe.extend({
        htmlPrefilter: function(e) {
            return e.replace(et, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var r, i, o, a, s = e.cloneNode(!0),
                c = pe.contains(e.ownerDocument, e);
            if (!(he.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || pe.isXMLDoc(e)))
                for (a = g(s), o = g(e), r = 0, i = o.length; r < i; r++) S(o[r], a[r]);
            if (t)
                if (n)
                    for (o = o || g(e), a = a || g(s), r = 0, i = o.length; r < i; r++) T(o[r], a[r]);
                else T(e, s);
            return a = g(s, "script"), a.length > 0 && v(a, !c && g(e, "script")), s
        },
        cleanData: function(e) {
            for (var t, n, r, i = pe.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (Be(n)) {
                    if (t = n[Le.expando]) {
                        if (t.events)
                            for (r in t.events) i[r] ? pe.event.remove(n, r) : pe.removeEvent(n, r, t.handle);
                        n[Le.expando] = void 0
                    }
                    n[ze.expando] && (n[ze.expando] = void 0)
                }
        }
    }), pe.fn.extend({
        detach: function(e) {
            return I(this, e, !0)
        },
        remove: function(e) {
            return I(this, e)
        },
        text: function(e) {
            return Re(this, function(e) {
                return void 0 === e ? pe.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return A(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = k(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return A(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = k(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return A(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return A(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (pe.cleanData(g(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return pe.clone(this, e, t)
            })
        },
        html: function(e) {
            return Re(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !tt.test(e) && !Ve[(Ze.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = pe.htmlPrefilter(e);
                    try {
                        for (; n < r; n++) t = this[n] || {}, 1 === t.nodeType && (pe.cleanData(g(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return A(this, arguments, function(t) {
                var n = this.parentNode;
                pe.inArray(this, e) < 0 && (pe.cleanData(g(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), pe.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        pe.fn[e] = function(e) {
            for (var n, r = [], i = pe(e), o = i.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), pe(i[a])[t](n), oe.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var ot = /^margin/,
        at = new RegExp("^(" + Fe + ")(?!px)[a-z%]+$", "i"),
        st = function(t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e), n.getComputedStyle(t)
        };
    ! function() {
        function t() {
            if (s) {
                s.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", s.innerHTML = "", Ye.appendChild(a);
                var t = e.getComputedStyle(s);
                n = "1%" !== t.top, o = "2px" === t.marginLeft, r = "4px" === t.width, s.style.marginRight = "50%", i = "4px" === t.marginRight, Ye.removeChild(a), s = null
            }
        }
        var n, r, i, o, a = te.createElement("div"),
            s = te.createElement("div");
        s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", he.clearCloneStyle = "content-box" === s.style.backgroundClip, a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", a.appendChild(s), pe.extend(he, {
            pixelPosition: function() {
                return t(), n
            },
            boxSizingReliable: function() {
                return t(), r
            },
            pixelMarginRight: function() {
                return t(), i
            },
            reliableMarginLeft: function() {
                return t(), o
            }
        }))
    }();
    var ct = /^(none|table(?!-c[ea]).+)/,
        ut = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        lt = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        dt = ["Webkit", "Moz", "ms"],
        ht = te.createElement("div").style;
    pe.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = O(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: "cssFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = pe.camelCase(t),
                    c = e.style;
                return t = pe.cssProps[s] || (pe.cssProps[s] = N(s) || s), a = pe.cssHooks[t] || pe.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : c[t] : (o = typeof n, "string" === o && (i = $e.exec(n)) && i[1] && (n = f(e, t, i), o = "number"), void(null != n && n === n && ("number" === o && (n += i && i[3] || (pe.cssNumber[s] ? "" : "px")), he.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (c[t] = n))))
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = pe.camelCase(t);
            return t = pe.cssProps[s] || (pe.cssProps[s] = N(s) || s), a = pe.cssHooks[t] || pe.cssHooks[s], a && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = O(e, t, r)), "normal" === i && t in lt && (i = lt[t]), "" === n || n ? (o = parseFloat(i), n === !0 || isFinite(o) ? o || 0 : i) : i
        }
    }), pe.each(["height", "width"], function(e, t) {
        pe.cssHooks[t] = {
            get: function(e, n, r) {
                if (n) return !ct.test(pe.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? L(e, t, r) : He(e, ut, function() {
                    return L(e, t, r)
                })
            },
            set: function(e, n, r) {
                var i, o = r && st(e),
                    a = r && B(e, t, r, "border-box" === pe.css(e, "boxSizing", !1, o), o);
                return a && (i = $e.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = pe.css(e, t)), R(e, n, a)
            }
        }
    }), pe.cssHooks.marginLeft = D(he.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(O(e, "marginLeft")) || e.getBoundingClientRect().left - He(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px"
    }), pe.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        pe.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[e + Me[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, ot.test(e) || (pe.cssHooks[e + t].set = R)
    }), pe.fn.extend({
        css: function(e, t) {
            return Re(this, function(e, t, n) {
                var r, i, o = {},
                    a = 0;
                if (pe.isArray(t)) {
                    for (r = st(e), i = t.length; a < i; a++) o[t[a]] = pe.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? pe.style(e, t, n) : pe.css(e, t)
            }, e, t, arguments.length > 1)
        }
    }), pe.Tween = z, z.prototype = {
        constructor: z,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || pe.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (pe.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = z.propHooks[this.prop];
            return e && e.get ? e.get(this) : z.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = z.propHooks[this.prop];
            return this.options.duration ? this.pos = t = pe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : z.propHooks._default.set(this), this
        }
    }, z.prototype.init.prototype = z.prototype, z.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = pe.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
            },
            set: function(e) {
                pe.fx.step[e.prop] ? pe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[pe.cssProps[e.prop]] && !pe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : pe.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, z.propHooks.scrollTop = z.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, pe.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, pe.fx = z.prototype.init, pe.fx.step = {};
    var ft, pt, mt = /^(?:toggle|show|hide)$/,
        gt = /queueHooks$/;
    pe.Animation = pe.extend(U, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return f(n.elem, e, $e.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                pe.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(Oe);
                for (var n, r = 0, i = e.length; r < i; r++) n = e[r], U.tweeners[n] = U.tweeners[n] || [], U.tweeners[n].unshift(t)
            },
            prefilters: [W],
            prefilter: function(e, t) {
                t ? U.prefilters.unshift(e) : U.prefilters.push(e)
            }
        }), pe.speed = function(e, t, n) {
            var r = e && "object" == typeof e ? pe.extend({}, e) : {
                complete: n || !n && t || pe.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !pe.isFunction(t) && t
            };
            return pe.fx.off || te.hidden ? r.duration = 0 : "number" != typeof r.duration && (r.duration in pe.fx.speeds ? r.duration = pe.fx.speeds[r.duration] : r.duration = pe.fx.speeds._default), null != r.queue && r.queue !== !0 || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                pe.isFunction(r.old) && r.old.call(this), r.queue && pe.dequeue(this, r.queue)
            }, r
        }, pe.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter(We).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(e, t, n, r) {
                var i = pe.isEmptyObject(e),
                    o = pe.speed(t, n, r),
                    a = function() {
                        var t = U(this, pe.extend({}, e), o);
                        (i || Le.get(this, "finish")) && t.stop(!0)
                    };
                return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function(e, t, n) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        i = null != e && e + "queueHooks",
                        o = pe.timers,
                        a = Le.get(this);
                    if (i) a[i] && a[i].stop && r(a[i]);
                    else
                        for (i in a) a[i] && a[i].stop && gt.test(i) && r(a[i]);
                    for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                    !t && n || pe.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(function() {
                    var t, n = Le.get(this),
                        r = n[e + "queue"],
                        i = n[e + "queueHooks"],
                        o = pe.timers,
                        a = r ? r.length : 0;
                    for (n.finish = !0, pe.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }), pe.each(["toggle", "show", "hide"], function(e, t) {
            var n = pe.fn[t];
            pe.fn[t] = function(e, r, i) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(F(t, !0), e, r, i)
            }
        }), pe.each({
            slideDown: F("show"),
            slideUp: F("hide"),
            slideToggle: F("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            pe.fn[e] = function(e, n, r) {
                return this.animate(t, e, n, r)
            }
        }), pe.timers = [], pe.fx.tick = function() {
            var e, t = 0,
                n = pe.timers;
            for (ft = pe.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
            n.length || pe.fx.stop(), ft = void 0
        }, pe.fx.timer = function(e) {
            pe.timers.push(e), e() ? pe.fx.start() : pe.timers.pop()
        }, pe.fx.interval = 13, pe.fx.start = function() {
            pt || (pt = e.requestAnimationFrame ? e.requestAnimationFrame(P) : e.setInterval(pe.fx.tick, pe.fx.interval))
        }, pe.fx.stop = function() {
            e.cancelAnimationFrame ? e.cancelAnimationFrame(pt) : e.clearInterval(pt), pt = null
        }, pe.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, pe.fn.delay = function(t, n) {
            return t = pe.fx ? pe.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, r) {
                var i = e.setTimeout(n, t);
                r.stop = function() {
                    e.clearTimeout(i)
                }
            })
        },
        function() {
            var e = te.createElement("input"),
                t = te.createElement("select"),
                n = t.appendChild(te.createElement("option"));
            e.type = "checkbox", he.checkOn = "" !== e.value, he.optSelected = n.selected, e = te.createElement("input"), e.value = "t", e.type = "radio", he.radioValue = "t" === e.value
        }();
    var vt, yt = pe.expr.attrHandle;
    pe.fn.extend({
        attr: function(e, t) {
            return Re(this, pe.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                pe.removeAttr(this, e)
            })
        }
    }), pe.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? pe.prop(e, t, n) : (1 === o && pe.isXMLDoc(e) || (i = pe.attrHooks[t.toLowerCase()] || (pe.expr.match.bool.test(t) ? vt : void 0)), void 0 !== n ? null === n ? void pe.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : (r = pe.find.attr(e, t), null == r ? void 0 : r))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!he.radioValue && "radio" === t && pe.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0,
                i = t && t.match(Oe);
            if (i && 1 === e.nodeType)
                for (; n = i[r++];) e.removeAttribute(n)
        }
    }), vt = {
        set: function(e, t, n) {
            return t === !1 ? pe.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, pe.each(pe.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = yt[t] || pe.find.attr;
        yt[t] = function(e, t, r) {
            var i, o, a = t.toLowerCase();
            return r || (o = yt[a], yt[a] = i, i = null != n(e, t, r) ? a : null, yt[a] = o), i
        }
    });
    var bt = /^(?:input|select|textarea|button)$/i,
        wt = /^(?:a|area)$/i;
    pe.fn.extend({
        prop: function(e, t) {
            return Re(this, pe.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[pe.propFix[e] || e]
            })
        }
    }), pe.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && pe.isXMLDoc(e) || (t = pe.propFix[t] || t, i = pe.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = pe.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : bt.test(e.nodeName) || wt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), he.optSelected || (pe.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), pe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        pe.propFix[this.toLowerCase()] = this
    }), pe.fn.extend({
        addClass: function(e) {
            var t, n, r, i, o, a, s, c = 0;
            if (pe.isFunction(e)) return this.each(function(t) {
                pe(this).addClass(e.call(this, t, Z(this)))
            });
            if ("string" == typeof e && e)
                for (t = e.match(Oe) || []; n = this[c++];)
                    if (i = Z(n), r = 1 === n.nodeType && " " + q(i) + " ") {
                        for (a = 0; o = t[a++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        s = q(r), i !== s && n.setAttribute("class", s)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, a, s, c = 0;
            if (pe.isFunction(e)) return this.each(function(t) {
                pe(this).removeClass(e.call(this, t, Z(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof e && e)
                for (t = e.match(Oe) || []; n = this[c++];)
                    if (i = Z(n), r = 1 === n.nodeType && " " + q(i) + " ") {
                        for (a = 0; o = t[a++];)
                            for (; r.indexOf(" " + o + " ") > -1;) r = r.replace(" " + o + " ", " ");
                        s = q(r), i !== s && n.setAttribute("class", s)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : pe.isFunction(e) ? this.each(function(n) {
                pe(this).toggleClass(e.call(this, n, Z(this), t), t)
            }) : this.each(function() {
                var t, r, i, o;
                if ("string" === n)
                    for (r = 0, i = pe(this), o = e.match(Oe) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else void 0 !== e && "boolean" !== n || (t = Z(this), t && Le.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : Le.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++];)
                if (1 === n.nodeType && (" " + q(Z(n)) + " ").indexOf(t) > -1) return !0;
            return !1
        }
    });
    var xt = /\r/g;
    pe.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0];
            return arguments.length ? (r = pe.isFunction(e), this.each(function(n) {
                var i;
                1 === this.nodeType && (i = r ? e.call(this, n, pe(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : pe.isArray(i) && (i = pe.map(i, function(e) {
                    return null == e ? "" : e + ""
                })), t = pe.valHooks[this.type] || pe.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
            })) : i ? (t = pe.valHooks[i.type] || pe.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(xt, "") : null == n ? "" : n)) : void 0
        }
    }), pe.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = pe.find.attr(e, "value");
                    return null != t ? t : q(pe.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, i = e.options,
                        o = e.selectedIndex,
                        a = "select-one" === e.type,
                        s = a ? null : [],
                        c = a ? o + 1 : i.length;
                    for (r = o < 0 ? c : a ? o : 0; r < c; r++)
                        if (n = i[r], (n.selected || r === o) && !n.disabled && (!n.parentNode.disabled || !pe.nodeName(n.parentNode, "optgroup"))) {
                            if (t = pe(n).val(), a) return t;
                            s.push(t)
                        }
                    return s
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = pe.makeArray(t), a = i.length; a--;) r = i[a], (r.selected = pe.inArray(pe.valHooks.option.get(r), o) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), pe.each(["radio", "checkbox"], function() {
        pe.valHooks[this] = {
            set: function(e, t) {
                if (pe.isArray(t)) return e.checked = pe.inArray(pe(e).val(), t) > -1
            }
        }, he.checkOn || (pe.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var _t = /^(?:focusinfocus|focusoutblur)$/;
    pe.extend(pe.event, {
        trigger: function(t, n, r, i) {
            var o, a, s, c, u, l, d, h = [r || te],
                f = ue.call(t, "type") ? t.type : t,
                p = ue.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = s = r = r || te, 3 !== r.nodeType && 8 !== r.nodeType && !_t.test(f + pe.event.triggered) && (f.indexOf(".") > -1 && (p = f.split("."), f = p.shift(), p.sort()), u = f.indexOf(":") < 0 && "on" + f, t = t[pe.expando] ? t : new pe.Event(f, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = p.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : pe.makeArray(n, [t]), d = pe.event.special[f] || {}, i || !d.trigger || d.trigger.apply(r, n) !== !1)) {
                if (!i && !d.noBubble && !pe.isWindow(r)) {
                    for (c = d.delegateType || f, _t.test(c + f) || (a = a.parentNode); a; a = a.parentNode) h.push(a), s = a;
                    s === (r.ownerDocument || te) && h.push(s.defaultView || s.parentWindow || e)
                }
                for (o = 0;
                    (a = h[o++]) && !t.isPropagationStopped();) t.type = o > 1 ? c : d.bindType || f, l = (Le.get(a, "events") || {})[t.type] && Le.get(a, "handle"), l && l.apply(a, n), l = u && a[u], l && l.apply && Be(a) && (t.result = l.apply(a, n), t.result === !1 && t.preventDefault());
                return t.type = f, i || t.isDefaultPrevented() || d._default && d._default.apply(h.pop(), n) !== !1 || !Be(r) || u && pe.isFunction(r[f]) && !pe.isWindow(r) && (s = r[u], s && (r[u] = null), pe.event.triggered = f, r[f](), pe.event.triggered = void 0, s && (r[u] = s)), t.result
            }
        },
        simulate: function(e, t, n) {
            var r = pe.extend(new pe.Event, n, {
                type: e,
                isSimulated: !0
            });
            pe.event.trigger(r, null, t)
        }
    }), pe.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                pe.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return pe.event.trigger(e, t, n, !0)
        }
    }), pe.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
        pe.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), pe.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), he.focusin = "onfocusin" in e, he.focusin || pe.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            pe.event.simulate(t, e.target, pe.event.fix(e))
        };
        pe.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    i = Le.access(r, t);
                i || r.addEventListener(e, n, !0), Le.access(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    i = Le.access(r, t) - 1;
                i ? Le.access(r, t, i) : (r.removeEventListener(e, n, !0), Le.remove(r, t))
            }
        }
    });
    var kt = e.location,
        Ct = pe.now(),
        Et = /\?/;
    pe.parseXML = function(t) {
        var n;
        if (!t || "string" != typeof t) return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (e) {
            n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || pe.error("Invalid XML: " + t), n
    };
    var Tt = /\[\]$/,
        St = /\r?\n/g,
        At = /^(?:submit|button|image|reset|file)$/i,
        It = /^(?:input|select|textarea|keygen)/i;
    pe.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                var n = pe.isFunction(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (pe.isArray(e) || e.jquery && !pe.isPlainObject(e)) pe.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) G(n, e[n], t, i);
        return r.join("&")
    }, pe.fn.extend({
        serialize: function() {
            return pe.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = pe.prop(this, "elements");
                return e ? pe.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !pe(this).is(":disabled") && It.test(this.nodeName) && !At.test(e) && (this.checked || !qe.test(e))
            }).map(function(e, t) {
                var n = pe(this).val();
                return null == n ? null : pe.isArray(n) ? pe.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(St, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(St, "\r\n")
                }
            }).get()
        }
    });
    var Ot = /%20/g,
        Dt = /#.*$/,
        Nt = /([?&])_=[^&]*/,
        Rt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Bt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Lt = /^(?:GET|HEAD)$/,
        zt = /^\/\//,
        Pt = {},
        jt = {},
        Ft = "*/".concat("*"),
        $t = te.createElement("a");
    $t.href = kt.href, pe.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: kt.href,
            type: "GET",
            isLocal: Bt.test(kt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Ft,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": pe.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Y(Y(e, pe.ajaxSettings), t) : Y(pe.ajaxSettings, e)
        },
        ajaxPrefilter: V(Pt),
        ajaxTransport: V(jt),
        ajax: function(t, n) {
            function r(t, n, r, s) {
                var u, h, f, w, x, _ = n;
                l || (l = !0, c && e.clearTimeout(c), i = void 0, a = s || "", k.readyState = t > 0 ? 4 : 0, u = t >= 200 && t < 300 || 304 === t, r && (w = K(p, k, r)), w = Q(p, w, k, u), u ? (p.ifModified && (x = k.getResponseHeader("Last-Modified"), x && (pe.lastModified[o] = x), x = k.getResponseHeader("etag"), x && (pe.etag[o] = x)), 204 === t || "HEAD" === p.type ? _ = "nocontent" : 304 === t ? _ = "notmodified" : (_ = w.state, h = w.data, f = w.error, u = !f)) : (f = _, !t && _ || (_ = "error", t < 0 && (t = 0))), k.status = t, k.statusText = (n || _) + "", u ? v.resolveWith(m, [h, _, k]) : v.rejectWith(m, [k, _, f]), k.statusCode(b), b = void 0, d && g.trigger(u ? "ajaxSuccess" : "ajaxError", [k, p, u ? h : f]), y.fireWith(m, [k, _]), d && (g.trigger("ajaxComplete", [k, p]), --pe.active || pe.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var i, o, a, s, c, u, l, d, h, f, p = pe.ajaxSetup({}, n),
                m = p.context || p,
                g = p.context && (m.nodeType || m.jquery) ? pe(m) : pe.event,
                v = pe.Deferred(),
                y = pe.Callbacks("once memory"),
                b = p.statusCode || {},
                w = {},
                x = {},
                _ = "canceled",
                k = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (l) {
                            if (!s)
                                for (s = {}; t = Rt.exec(a);) s[t[1].toLowerCase()] = t[2];
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return l ? a : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == l && (e = x[e.toLowerCase()] = x[e.toLowerCase()] || e, w[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return null == l && (p.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (l) k.always(e[k.status]);
                            else
                                for (t in e) b[t] = [b[t], e[t]];
                        return this
                    },
                    abort: function(e) {
                        var t = e || _;
                        return i && i.abort(t), r(0, t), this
                    }
                };
            if (v.promise(k), p.url = ((t || p.url || kt.href) + "").replace(zt, kt.protocol + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = (p.dataType || "*").toLowerCase().match(Oe) || [""], null == p.crossDomain) {
                u = te.createElement("a");
                try {
                    u.href = p.url, u.href = u.href, p.crossDomain = $t.protocol + "//" + $t.host != u.protocol + "//" + u.host
                } catch (e) {
                    p.crossDomain = !0
                }
            }
            if (p.data && p.processData && "string" != typeof p.data && (p.data = pe.param(p.data, p.traditional)), X(Pt, p, n, k), l) return k;
            d = pe.event && p.global, d && 0 === pe.active++ && pe.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Lt.test(p.type), o = p.url.replace(Dt, ""), p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(Ot, "+")) : (f = p.url.slice(o.length), p.data && (o += (Et.test(o) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (o = o.replace(Nt, "$1"), f = (Et.test(o) ? "&" : "?") + "_=" + Ct++ + f), p.url = o + f), p.ifModified && (pe.lastModified[o] && k.setRequestHeader("If-Modified-Since", pe.lastModified[o]), pe.etag[o] && k.setRequestHeader("If-None-Match", pe.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && k.setRequestHeader("Content-Type", p.contentType), k.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Ft + "; q=0.01" : "") : p.accepts["*"]);
            for (h in p.headers) k.setRequestHeader(h, p.headers[h]);
            if (p.beforeSend && (p.beforeSend.call(m, k, p) === !1 || l)) return k.abort();
            if (_ = "abort", y.add(p.complete), k.done(p.success), k.fail(p.error), i = X(jt, p, n, k)) {
                if (k.readyState = 1, d && g.trigger("ajaxSend", [k, p]), l) return k;
                p.async && p.timeout > 0 && (c = e.setTimeout(function() {
                    k.abort("timeout")
                }, p.timeout));
                try {
                    l = !1, i.send(w, r)
                } catch (e) {
                    if (l) throw e;
                    r(-1, e)
                }
            } else r(-1, "No Transport");
            return k
        },
        getJSON: function(e, t, n) {
            return pe.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return pe.get(e, void 0, t, "script")
        }
    }), pe.each(["get", "post"], function(e, t) {
        pe[t] = function(e, n, r, i) {
            return pe.isFunction(n) && (i = i || r, r = n, n = void 0), pe.ajax(pe.extend({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            }, pe.isPlainObject(e) && e))
        }
    }), pe._evalUrl = function(e) {
        return pe.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
        })
    }, pe.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (pe.isFunction(e) && (e = e.call(this[0])), t = pe(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function(e) {
            return pe.isFunction(e) ? this.each(function(t) {
                pe(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = pe(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = pe.isFunction(e);
            return this.each(function(n) {
                pe(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                pe(this).replaceWith(this.childNodes)
            }), this
        }
    }), pe.expr.pseudos.hidden = function(e) {
        return !pe.expr.pseudos.visible(e)
    }, pe.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, pe.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    };
    var Mt = {
            0: 200,
            1223: 204
        },
        Wt = pe.ajaxSettings.xhr();
    he.cors = !!Wt && "withCredentials" in Wt, he.ajax = Wt = !!Wt, pe.ajaxTransport(function(t) {
        var n, r;
        if (he.cors || Wt && !t.crossDomain) return {
            send: function(i, o) {
                var a, s = t.xhr();
                if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (a in t.xhrFields) s[a] = t.xhrFields[a];
                t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                for (a in i) s.setRequestHeader(a, i[a]);
                n = function(e) {
                    return function() {
                        n && (n = r = s.onload = s.onerror = s.onabort = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Mt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                            binary: s.response
                        } : {
                            text: s.responseText
                        }, s.getAllResponseHeaders()))
                    }
                }, s.onload = n(), r = s.onerror = n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                    4 === s.readyState && e.setTimeout(function() {
                        n && r()
                    })
                }, n = n("abort");
                try {
                    s.send(t.hasContent && t.data || null)
                } catch (e) {
                    if (n) throw e
                }
            },
            abort: function() {
                n && n()
            }
        }
    }), pe.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }), pe.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return pe.globalEval(e), e
            }
        }
    }), pe.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), pe.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, i) {
                    t = pe("<script>").prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                    }), te.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var Ht = [],
        Ut = /(=)\?(?=&|$)|\?\?/;
    pe.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Ht.pop() || pe.expando + "_" + Ct++;
            return this[e] = !0, e
        }
    }), pe.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, o, a, s = t.jsonp !== !1 && (Ut.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ut.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0]) return i = t.jsonpCallback = pe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Ut, "$1" + i) : t.jsonp !== !1 && (t.url += (Et.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
            return a || pe.error(i + " was not called"), a[0]
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function() {
            a = arguments
        }, r.always(function() {
            void 0 === o ? pe(e).removeProp(i) : e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, Ht.push(i)), a && pe.isFunction(o) && o(a[0]), a = o = void 0
        }), "script"
    }), he.createHTMLDocument = function() {
        var e = te.implementation.createHTMLDocument("").body;
        return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
    }(), pe.parseHTML = function(e, t, n) {
        if ("string" != typeof e) return [];
        "boolean" == typeof t && (n = t, t = !1);
        var r, i, o;
        return t || (he.createHTMLDocument ? (t = te.implementation.createHTMLDocument(""), r = t.createElement("base"), r.href = te.location.href, t.head.appendChild(r)) : t = te), i = ke.exec(e), o = !n && [], i ? [t.createElement(i[1])] : (i = y([e], t, o), o && o.length && pe(o).remove(), pe.merge([], i.childNodes))
    }, pe.fn.load = function(e, t, n) {
        var r, i, o, a = this,
            s = e.indexOf(" ");
        return s > -1 && (r = q(e.slice(s)), e = e.slice(0, s)), pe.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && pe.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, a.html(r ? pe("<div>").append(pe.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }), this
    }, pe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        pe.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), pe.expr.pseudos.animated = function(e) {
        return pe.grep(pe.timers, function(t) {
            return e === t.elem
        }).length
    }, pe.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, c, u, l = pe.css(e, "position"),
                d = pe(e),
                h = {};
            "static" === l && (e.style.position = "relative"), s = d.offset(),
                o = pe.css(e, "top"), c = pe.css(e, "left"), u = ("absolute" === l || "fixed" === l) && (o + c).indexOf("auto") > -1, u ? (r = d.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(c) || 0), pe.isFunction(t) && (t = t.call(e, n, pe.extend({}, s))), null != t.top && (h.top = t.top - s.top + a), null != t.left && (h.left = t.left - s.left + i), "using" in t ? t.using.call(e, h) : d.css(h)
        }
    }, pe.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                pe.offset.setOffset(this, e, t)
            });
            var t, n, r, i, o = this[0];
            return o ? o.getClientRects().length ? (r = o.getBoundingClientRect(), r.width || r.height ? (i = o.ownerDocument, n = J(i), t = i.documentElement, {
                top: r.top + n.pageYOffset - t.clientTop,
                left: r.left + n.pageXOffset - t.clientLeft
            }) : r) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === pe.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), pe.nodeName(e[0], "html") || (r = e.offset()), r = {
                    top: r.top + pe.css(e[0], "borderTopWidth", !0),
                    left: r.left + pe.css(e[0], "borderLeftWidth", !0)
                }), {
                    top: t.top - r.top - pe.css(n, "marginTop", !0),
                    left: t.left - r.left - pe.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === pe.css(e, "position");) e = e.offsetParent;
                return e || Ye
            })
        }
    }), pe.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        pe.fn[e] = function(r) {
            return Re(this, function(e, r, i) {
                var o = J(e);
                return void 0 === i ? o ? o[t] : e[r] : void(o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i)
            }, e, r, arguments.length)
        }
    }), pe.each(["top", "left"], function(e, t) {
        pe.cssHooks[t] = D(he.pixelPosition, function(e, n) {
            if (n) return n = O(e, t), at.test(n) ? pe(e).position()[t] + "px" : n
        })
    }), pe.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        pe.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            pe.fn[r] = function(i, o) {
                var a = arguments.length && (n || "boolean" != typeof i),
                    s = n || (i === !0 || o === !0 ? "margin" : "border");
                return Re(this, function(t, n, i) {
                    var o;
                    return pe.isWindow(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? pe.css(t, n, s) : pe.style(t, n, i, s)
                }, t, a ? i : void 0, a)
            }
        })
    }), pe.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), pe.parseJSON = JSON.parse, "function" == typeof define && define.amd && define("jquery", [], function() {
        return pe
    });
    var qt = e.jQuery,
        Zt = e.$;
    return pe.noConflict = function(t) {
        return e.$ === pe && (e.$ = Zt), t && e.jQuery === pe && (e.jQuery = qt), pe
    }, t || (e.jQuery = e.$ = pe), pe
});
var dragging = {},
    currentScale = 1;
$(document).ready(function() {
    function e(e) {
        $("#showcase").empty(), $(".spinner").css("opacity", 1), $("#mainwrapper").fadeTo(500, 0, function() {
            $("#previewwrapper").fadeTo(500, 1, function() {
                $("#previewwrapper").css("pointer-events", "all");
                var t = $(".screenshotparent:not(.add)");
                takeScreenshots(t, function(t) {
                    e && history.pushState({
                        page: 1
                    }, null, "preview"), $(".spinner").fadeTo(400, 0, function() {
                        $(t).css({
                            opacity: 0,
                            "margin-top": 20
                        }), $("#showcase").append(t), $(t).animate({
                            opacity: 1,
                            "margin-top": 0
                        }, 500)
                    })
                })
            })
        })
    }

    function t(e) {
        i = e, $("#gradientbutton").hasClass("selected") ? n(o) : $(".screenshotparent:not(.add)").css({
            background: "",
            "background-color": e
        })
    }

    function n(e) {
        o = e, $(".screenshotparent:not(.add)").css("background", "linear-gradient(" + i + ", " + o + ")")
    }

    function r() {
        if (u !== s || c !== a) {
            u = s, c = a;
            var e = 0;
            e = a ? 500 * (s ? 9 / 16 : 16 / 9) : 500 * (s ? .75 : 4 / 3), $(".screenshotparent").css("width", e), s ? $("img.deviceholder").css({
                transform: "rotate(0deg)",
                "margin-top": 0
            }) : a ? $("img.deviceholder").css({
                transform: "rotate(90deg)",
                "margin-top": -155
            }) : $("img.deviceholder").css({
                transform: "rotate(90deg)",
                "margin-top": -30
            }), s ? $("img.deviceholder").css("width", "90%") : a ? $("img.deviceholder").css("width", "45%") : $("img.deviceholder").css("width", "60%");
            var t, n, r, i;
            a ? s ? (t = 30, n = 30, r = 62, i = 391) : (t = 137, n = 137, r = 78, i = 346) : s ? (t = 39, n = 39, r = 42, i = 394) : (t = 100, n = 100, r = 78, i = 350), $(".screenshotwrapper").css({
                left: t,
                right: n,
                top: r,
                height: i
            })

          

            /*
                    left: 30px;
    right: 30px;
    top: 13px;
    height: 419px;
    height: 440px;
            */
        }


    }
    $(".dragger").mousedown(handle_mousedown), $("label.filelabel input").change(fileInputChange), dragAndDrop(), $(document).keyup(function(e) {
            switch (e.keyCode) {
                case 27:
                    escClick();
                    break;
                case 49:
                    $("#backgroundbutton").click();
                    break;
                case 50:
                    $("#devicebutton").click();
                    break;
                case 51:
                    $("#fontbutton").click();
                    break;
                case 52:
                    $("#layoutbutton").click();
                    break;
                case 83:
                    sClick();
                    break;
                case 68:
                    dClick();
                    break;
                case 70:
                    fClick();
                    break;
                case 65:
                    aClick()
            }
        }), $("#backgroundbutton").click(function(e) {
            hideAllToolbars(), $(this).hasClass("selected") ? $(this).removeClass("selected") : ($("#background1").removeClass("hidden"), $("#solidbutton.selected, #gradientbutton.selected, #patternbutton.selected").removeClass("selected").click(), $("#mainmenu > span.selected").removeClass("selected"), $(this).addClass("selected"))
        }), $("#solidbutton").click(function() {
            hideAllToolbars(), $(this).hasClass("selected") ? ($(this).removeClass("selected"), $("#background1").removeClass("hidden")) : ($("#background1").removeClass("hidden"), $("#backgroundcolor1").removeClass("hidden"), $("#background1 > span.selected").removeClass("selected"), $(this).addClass("selected"), t(i), preventGoingBack())
        }), $("#gradientbutton").click(function() {
            hideAllToolbars(), $(this).hasClass("selected") ? ($(this).removeClass("selected"), $("#background1").removeClass("hidden")) : ($("#background1").removeClass("hidden"), $("#backgroundcolor1").removeClass("hidden"), $("#backgroundcolor2").removeClass("hidden"), $("#background1 > span.selected").removeClass("selected"), $(this).addClass("selected"), n(o), preventGoingBack())
        }), $("#devicebutton").click(function() {
            hideAllToolbars(), $(this).hasClass("selected") ? $(this).removeClass("selected") : ($("#devicelist").removeClass("hidden"), $("#mainmenu > span.selected").removeClass("selected"), $(this).addClass("selected"), preventGoingBack())
        }), $("#fontbutton").click(function() {
            hideAllToolbars(), $(this).hasClass("selected") ? $(this).removeClass("selected") : ($("#fontparent").removeClass("hidden"), $("#backgroundcolor3").removeClass("hidden"), $("#mainmenu > span.selected").removeClass("selected"), $(this).addClass("selected"), preventGoingBack())
        }), $("#layoutbutton").click(function() {
            if (hideAllToolbars(), $(this).hasClass("selected")) $(this).removeClass("selected");
            else {
                $("#layoutparent").removeClass("hidden"), $("#layoutsliderparent").removeClass("hidden"), $("#mainmenu > span.selected").removeClass("selected"), $(this).addClass("selected");
                const e = setInterval(function() {
                    moveDraggersToMiddle(!0)
                }, 10);
                setTimeout(function() {
                    clearInterval(e)
                }, 310), preventGoingBack()
            }
        }), window.addEventListener("popstate", function(t) {
            1 === t.state.page ? e(!1) : backToEditing()
        }), $("#previewbutton").click(function() {
            e(!0)
        }), history.replaceState({
            page: 0
        }, null, ""), $("#backtoediting").click(function() {
            history.back(), backToEditing()
        }), $("#aboutbutton").click(function() {
            $("#aboutwrapper").removeClass("hidden"), $("#aboutbackground").removeClass("hidden")
        }), $("#aboutbackground").click(function() {
            $("#aboutwrapper").addClass("hidden"), $("#aboutbackground").addClass("hidden")
        }),
        function() {
            var e = document.createElement("input");
            e.setAttribute("type", "color"), "text" === e.type && $("label.colorbox").hide()
        }(), $("#backgroundcolor1 > .colorbox").click(function() {
            var e = $(this).css("background-color");
            $("#backgroundcolor1 > .colorbox.selected").removeClass("selected"), $(this).addClass("selected"), t(e)
        }), $("#backgroundcolor2 > .colorbox").click(function() {
            var e = $(this).css("background-color");
            $("#backgroundcolor2 > .colorbox.selected").removeClass("selected"), $(this).addClass("selected"), n(e)
        }), $("#backgroundcolor3 > .colorbox").click(function() {
            var e = $(this).css("background-color");
            $("p.textparent").css("color", e), $("#backgroundcolor3 > .colorbox.selected").removeClass("selected"), $(this).addClass("selected")
        }), $("#backgroundcolor1 input").on("input change", function() {
            var e = this.value;
            $("#backgroundcolor1 label").removeClass("c1"), $("#backgroundcolor1 label").css({
                "background-color": e,
                border: "1px solid #eee",
                "box-sizing": "border-box"
            }), t(e)
        }), $("#backgroundcolor2 input").on("input change", function() {
            var e = this.value;
            $("#backgroundcolor2 label").removeClass("c1"), $("#backgroundcolor2 label").css({
                "background-color": e,
                border: "1px solid #eee",
                "box-sizing": "border-box"
            }), n(e)
        }), $("#backgroundcolor3 input").on("input change", function() {
            var e = this.value;
            $("#backgroundcolor3 label").removeClass("c1"), $("#backgroundcolor3 label").css({
                "background-color": e,
                border: "1px solid #eee",
                "box-sizing": "border-box"
            }), $("p.textparent").css("color", e)
        });
    var i, o, a = !0;
    $(".devicebox").click(function() {

        var e = $(this).css("background-image"),
            t = a;
        a = "none" == e ? $(this).hasClass("d11") : !e.includes("ipad"), t != a && $(".layout#l1").click();
        var n = a ? "16:9" : "4:3",
            i = 'DROP YOUR<br><div class="ratioclass">' + n + "</div> ASPECT RATIO<br>SCREENSHOT HERE";
             console.log(e),
        $(".instruction").html(i), "none" == e ? $("img.deviceholder").removeAttr("src") : (e = e.replace(/^url\(["']?/, "").replace(/["']?\)$/, ""), $("img.deviceholder").attr("src", e)), r()
        if(e.includes('iphonex')){
             $(".screenshotwrapper").css({
            left: 30,
            right: 30,
            top: 13,
            height: 479
           });
        }else if(e.includes('pixel')){
            $(".screenshotwrapper").css({
                left: 25,
                right: 27,
                top: 50,
                height: 408
               });
            
        }else if(e.includes('s8')){

            $(".screenshotwrapper").css({
                left: 22,
                right: 21,
                top: 26,
                height: 490
               });
            
        
        }else if(!e.includes('ipad')){

            $(".screenshotwrapper").attr('style',"");
        }  

    }), $(".plusminus").click(function() {
        var e = 0;
        e = $(this).hasClass("plus") ? -1 : 1;
        var t = parseInt($(".textparent").css("font-size"));
        t = t + e + "px", $(".textparent").css("font-size", t)
    }), $("#customfont > input").on("input", function() {
        var e = this.value,
            t = new Detector,
            n = "";
        t.detect(e) && e ? ($(".textparent").css("font-family", e), $("#customfont > input").css({
            "font-family": e,
            "border-color": "#2ecc71"
        }), $(".font.selected").removeClass("selected")) : $("#customfont > input").css({
            "border-color": "",
            "font-family": ""
        })
    }), $("#predefinedfonts > .font").click(function() {
        var e = window.getComputedStyle($(this)[0], ":before").getPropertyValue("font-family");
        $(".textparent").css("font-family", e), $("#customfont > input").css("border-color", ""), $(".font.selected").removeClass("selected"), $(this).addClass("selected")
    });
    var s = !0;
    $("#rotater").click(function() {
        s = !s;
        var e = 4 * (s ? 9 : 16),
            t = 4 * (s ? 16 : 9);
        $(this).css({
            width: e,
            height: t
        }), $(".layout#l1").click(), r()
    });
    var c = !0,
        u = !0;
    $(".layout").click(function() {
        $(".layout.selectedlayout").removeClass("selectedlayout"), $(this).addClass("selectedlayout");
        var e = 0,
            t = 1,
            n = 0,
            r = .95,
            i = "l1" === this.id,
            o = "l2" === this.id,
            c = "l3" === this.id;
        a ? s ? i ? (e = 5, n = 59) : o ? (t = 0, n = -7, r = .95) : (e = 440, n = -73) : i ? (e = 5, n = 30, r = 1.05) : o ? (t = 0, n = 0, r = 1.065) : (e = 435, n = -35, r = 1.05) : s ? i ? (e = 5, n = 67, r = 1) : o ? (t = 0, n = 11, r = 1.01) : (e = 445, n = -44, r = 1) : i ? (e = 5, n = 50, r = 1.131) : o ? (t = 0, n = -2, r = 1.131) : (e = 435, n = -58, r = 1.131), $(".screenshotparent.selc").find(".deviceparent").css({
            top: n,
            transform: "scale(" + r + ")"
        }), $(".screenshotparent.selc").find(".textparent").css({
            top: e,
            opacity: t
        }), currentScale = r, moveDraggersToMiddle()
    }), $(".screenshotparent.add").click(function() {
        addDeviceParent()
    }), $(".deletebutton").click(function() {
        $(".screenshotparent:not(.add)").length > 1 && $(this).closest(".screenshotparent").remove()
    }), $("#download").click(function() {
        if (console.log("oadisaoifjsoijf"), Modernizr.adownload) {
            var e = new JSZip;
            $("#showcase > img").each(function(t, n) {
                var r = n.src.split(",")[1];
                e.file("screenshot_" + (t + 1) + ".png", r, {
                    base64: !0
                })
            }), e.generateAsync({
                type: "blob"
            }).then(function(e) {
                saveAs(e, "screenshots.zip")
            })
        } else console.log("here", $("#showcase > img")), $("#showcase > img").each(function(e, t) {
            function n(e, t, n) {
                t = t || "", n = n || 512;
                for (var r = atob(e), i = [], o = 0; o < r.length; o += n) {
                    for (var a = r.slice(o, o + n), s = new Array(a.length), c = 0; c < a.length; c++) s[c] = a.charCodeAt(c);
                    var u = new Uint8Array(s);
                    i.push(u)
                }
                var l = new Blob(i, {
                    type: t
                });
                return l
            }
            console.log(e);
            var r = t.src.split(",")[1],
                i = n(r, "image/png");
            saveAs(i, "screenshot_" + e + ".png")
        })
    })
});