/*
 * Copyright (C) 2012 Ideaviate AB
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all 
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN 
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var Calculator = function () {
    var a = this, b = 0, e;
    a.display = ko.observable("0");
    a.isShowingResult = ko.observable(!1);
    a.number = function (b, e) {
        var d = e.target.innerText;
        a.isShowingResult() && (a.clearDisplay(), a.isShowingResult(!1));
        "." == d && -1 < a.display().indexOf(".") || (d = "0" === a.display() && "." != d ? d : a.display() + d, a.display(d))
    };
    a.operator = function (c, f) {
        var d = f.target.innerText;
        if (!a.isShowingResult()) {
            switch (e) {
                case "+":
                    b += parseFloat(a.display(), 10);
                    break;
                case "-":
                    b -= parseFloat(a.display(), 10);
                    break;
                case "x":
                    b *= parseFloat(a.display(), 10);
                    break;
                case "\u00f7":
                    b /= parseFloat(a.display(), 10);
                    break;
                default:
                    b = parseFloat(a.display(), 10)
            }
        }
        e && a.display(b);
        e = "=" === d ? null : d;
        a.isShowingResult(!0)
    };
    a.negate = function () {
        if (!(a.isShowingResult() || "0" === a.display())) {
            var b = "-" === a.display().substr(0, 1) ? a.display().substr(1) : "-" + a.display();
            a.display(b)
        }
    };
    a.backspace = function () {
        a.isShowingResult() || (1 < a.display().length ? a.display(a.display().substr(0, a.display().length - 1)) : a.clearDisplay())
    };
    a.clear = function () {
        e = null;
        a.clearDisplay();
        b = 0
    };
    a.clearDisplay = function () {
        a.display("0")
    }
};
ko.applyBindings(new Calculator);
(function () {
    var a = { 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9", 106: "x", 107: "+", 109: "-", 110: ".", 111: "\u00f7", 8: "backspace", 13: "=", 46: "c", 67: "c" }, b = function (b) {
        if (b.keyCode in a) {
            var c = document.getElementById("calculator-button-" + a[b.keyCode]);
            c.className.match(/(\s|^)active(\s|$)/) || (c.className += " active");
            setTimeout(function () {
                c.className.match(/(\s|^)active(\s|$)/) && (c.className = c.className.replace(/(\s|^)active(\s|$)/, " "))
            }, 100);
            document.createEvent ? (b = document.createEvent("HTMLEvents"), b.initEvent("click", !0, !0), c.dispatchEvent(b)) : (b = document.createEventObject(), c.fireEvent("onclick", b))
        }
    };
    document.addEventListener ? document.addEventListener("keyup", b, !1) : document.attachEvent && document.attachEvent("keyup", b)
})();
