/*! HTML_CodeSniffer - v2.0.1 - 2014-08-07 09:20:53 */
var HTMLCS_Section508_Sniffs_A = {
    register: function() {
        return [ "img", "input", "area", "object", "applet", "bgsound", "audio" ];
    },
    process: function(a, b) {
        if (a === b) {
            this.addNullAltTextResults(b);
            this.addMediaAlternativesResults(b);
        } else {
            var c = a.nodeName.toLowerCase();
            if (c === "object" || c === "bgsound" || c === "audio") {
                HTMLCS.addMessage(HTMLCS.NOTICE, a, "For multimedia containing audio only, ensure an alternative is available, such as a full text transcript.", "Audio");
            }
        }
    },
    testNullAltText: function(a) {
        var b = {
            img: {
                generalAlt: [],
                missingAlt: [],
                ignored: [],
                nullAltWithTitle: [],
                emptyAltInLink: []
            },
            inputImage: {
                generalAlt: [],
                missingAlt: []
            },
            area: {
                generalAlt: [],
                missingAlt: []
            }
        };
        elements = a.querySelectorAll('img, area, input[type="image"]');
        for (var c = 0; c < elements.length; c++) {
            var d = elements[c];
            var e = d.nodeName.toLowerCase();
            var f = false;
            var g = false;
            var h = false;
            if (d.parentNode.nodeName.toLowerCase() === "a") {
                var i = this._getPreviousSiblingElement(d, null);
                var j = this._getNextSiblingElement(d, null);
                if (i === null && j === null) {
                    var k = d.parentNode.textContent;
                    if (d.parentNode.textContent !== undefined) {
                        var k = d.parentNode.textContent;
                    } else {
                        var k = d.parentNode.innerText;
                    }
                    if (HTMLCS.util.isStringEmpty(k) === true) {
                        f = true;
                    }
                }
            }
            if (d.hasAttribute("alt") === false) {
                g = true;
            } else if (!d.getAttribute("alt") || HTMLCS.util.isStringEmpty(d.getAttribute("alt")) === true) {
                h = true;
            }
            switch (e) {
              case "img":
                if (f === true && (g === true || h === true)) {
                    b.img.emptyAltInLink.push(d.parentNode);
                } else if (g === true) {
                    b.img.missingAlt.push(d);
                } else if (h === true) {
                    if (d.hasAttribute("title") === true && HTMLCS.util.isStringEmpty(d.getAttribute("title")) === false) {
                        b.img.nullAltWithTitle.push(d);
                    } else {
                        b.img.ignored.push(d);
                    }
                } else {
                    b.img.generalAlt.push(d);
                }
                break;

              case "input":
                if (g === true || h === true) {
                    b.inputImage.missingAlt.push(d);
                } else {
                    b.inputImage.generalAlt.push(d);
                }
                break;

              case "area":
                if (g === true || h === true) {
                    b.area.missingAlt.push(d);
                } else {
                    b.inputImage.generalAlt.push(d);
                }
                break;

              default:
                break;
            }
        }
        return b;
    },
    addNullAltTextResults: function(a) {
        var b = this.testNullAltText(a);
        for (var c = 0; c < b.img.emptyAltInLink.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.img.emptyAltInLink[c], "Img element is the only content of the link, but is missing alt text. The alt text should describe the purpose of the link.", "Img.EmptyAltInLink");
        }
        for (var c = 0; c < b.img.nullAltWithTitle.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.img.nullAltWithTitle[c], "Img element with empty alt text must have absent or empty title attribute.", "Img.NullAltWithTitle");
        }
        for (var c = 0; c < b.img.ignored.length; c++) {
            HTMLCS.addMessage(HTMLCS.WARNING, b.img.ignored[c], "Img element is marked so that it is ignored by Assistive Technology.", "Img.Ignored");
        }
        for (var c = 0; c < b.img.missingAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.img.missingAlt[c], "Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.", "Img.MissingAlt");
        }
        for (var c = 0; c < b.img.generalAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b.img.generalAlt[c], "Ensure that the img element's alt text serves the same purpose and presents the same information as the image.", "Img.GeneralAlt");
        }
        for (var c = 0; c < b.inputImage.missingAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.inputImage.missingAlt[c], "Image submit button missing an alt attribute. Specify a text alternative that describes the button's function, using the alt attribute.", "InputImage.MissingAlt");
        }
        for (var c = 0; c < b.inputImage.generalAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b.inputImage.generalAlt[c], "Ensure that the image submit button's alt text identifies the purpose of the button.", "InputImage.GeneralAlt");
        }
        for (var c = 0; c < b.area.missingAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.area.missingAlt[c], "Area element in an image map missing an alt attribute. Each area element must have a text alternative that describes the function of the image map area.", "Area.MissingAlt");
        }
        for (var c = 0; c < b.area.generalAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b.area.generalAlt[c], "Ensure that the area element's text alternative serves the same purpose as the part of image map image it references.", "Area.GeneralAlt");
        }
    },
    testMediaTextAlternatives: function(a) {
        var b = {
            object: {
                missingBody: [],
                generalAlt: []
            },
            applet: {
                missingBody: [],
                missingAlt: [],
                generalAlt: []
            }
        };
        var c = a.querySelectorAll("object");
        for (var d = 0; d < c.length; d++) {
            var e = c[d];
            var f = e.nodeName.toLowerCase();
            var g = e.querySelector("object");
            if (g === null) {
                var h = HTMLCS.util.getElementTextContent(e, true);
                if (h === "") {
                    b.object.missingBody.push(e);
                } else {
                    b.object.generalAlt.push(e);
                }
            }
        }
        var c = a.querySelectorAll("applet");
        for (var d = 0; d < c.length; d++) {
            var g = e.querySelector("object");
            var i = false;
            if (g === null) {
                var h = HTMLCS.util.getElementTextContent(e, true);
                if (HTMLCS.util.isStringEmpty(h) === true) {
                    b.applet.missingBody.push(e);
                    i = true;
                }
            }
            var j = e.getAttribute("alt") || "";
            if (HTMLCS.util.isStringEmpty(j) === true) {
                b.applet.missingAlt.push(e);
                i = true;
            }
            if (i === false) {
                b.applet.generalAlt.push(e);
            }
        }
        return b;
    },
    addMediaAlternativesResults: function(a) {
        var b = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_1_1_1_1.testMediaTextAlternatives(a);
        for (var c = 0; c < b.object.missingBody.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.object.missingBody[c], "Object elements must contain a text alternative after all other alternatives are exhausted.", "Object.MissingBody");
        }
        for (var c = 0; c < b.object.generalAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b.object.generalAlt[c], "Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.", "Object.GeneralAlt");
        }
        for (var c = 0; c < b.applet.missingBody.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.applet.missingBody[c], "Applet elements must contain a text alternative in the element's body, for browsers without support for the applet element.", "Applet.MissingBody");
        }
        for (var c = 0; c < b.applet.missingAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.applet.missingAlt[c], "Applet elements must contain an alt attribute, to provide a text alternative to browsers supporting the element but are unable to load the applet.", "Applet.MissingAlt");
        }
        for (var c = 0; c < b.applet.generalAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b.applet.generalAlt[c], "Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.", "Applet.GeneralAlt");
        }
    }
};

var HTMLCS_Section508_Sniffs_B = {
    register: function() {
        return [ "object", "applet", "embed", "video" ];
    },
    process: function(a, b) {
        var c = a.nodeName.toLowerCase();
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "For multimedia containing video, ensure a synchronised audio description or text alternative for the video portion is provided.", "Video");
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "For multimedia containing synchronised audio and video, ensure synchronised captions are provided for the audio portion.", "Captions");
    }
};

var HTMLCS_Section508_Sniffs_C = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Ensure that any information conveyed using colour alone is also available without colour, such as through context or markup.", "Colour");
    }
};

var HTMLCS_Section508_Sniffs_D = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        if (a === b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Ensure that content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.", "Linearised");
            this.testPresentationMarkup(b);
            this.testHeadingOrder(b);
            var c = b.querySelectorAll('script, link[rel="stylesheet"]');
            if (c.length > 0) {
                HTMLCS.addMessage(HTMLCS.NOTICE, b, 'If content is hidden and made visible using scripting (such as "click to expand" sections), ensure this content is readable when scripts and style sheets are disabled.', "HiddenText");
            }
        }
    },
    testPresentationMarkup: function(a) {
        var b = a.querySelectorAll("b, i, u, s, strike, tt, big, small, center, font");
        for (var c = 0; c < b.length; c++) {
            var d = "PresMarkup." + b[c].nodeName.substr(0, 1).toUpperCase() + b[c].nodeName.substr(1).toLowerCase();
            HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.", d);
        }
        var b = a.querySelectorAll("*[align]");
        for (var c = 0; c < b.length; c++) {
            var d = "PresMarkup.AlignAttr";
            HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.", d);
        }
    },
    testHeadingOrder: function(a) {
        var b = 0;
        var c = a.querySelectorAll("h1, h2, h3, h4, h5, h6");
        for (var d = 0; d < c.length; d++) {
            var e = parseInt(c[d].nodeName.substr(1, 1));
            if (e - b > 1) {
                var f = "should be an h" + (b + 1) + " to be properly nested";
                if (b === 0) {
                    f = "appears to be the primary document heading, so should be an h1 element";
                }
                HTMLCS.addMessage(HTMLCS.ERROR, c[d], "The heading structure is not logically nested. This h" + e + " element " + f + ".", "HeadingOrder");
            }
            b = e;
        }
    }
};

var HTMLCS_Section508_Sniffs_G = {
    register: function() {
        return [ "table" ];
    },
    process: function(a, b) {
        if (HTMLCS.util.isLayoutTable(a) === true) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "This table has no headers. If this is a data table, ensure row and column headers are identified using th elements.", "TableHeaders");
        }
    }
};

var HTMLCS_Section508_Sniffs_H = {
    register: function() {
        return [ "table" ];
    },
    process: function(a, b) {
        var c = HTMLCS.util.testTableHeaders(a);
        for (var d = 0; d < c.wrongHeaders.length; d++) {
            HTMLCS.addMessage(HTMLCS.ERROR, c.wrongHeaders[d].element, 'Incorrect headers attribute on this td element. Expected "' + c.wrongHeaders[d].expected + '" but found "' + c.wrongHeaders[d].actual + '"', "IncorrectHeadersAttr");
        }
        if (c.required === true && c.allowScope === false) {
            if (c.used === false) {
                HTMLCS.addMessage(HTMLCS.ERROR, a, "The relationship between td elements and their associated th elements is not defined. As this table has multiple levels of th elements, you must use the headers attribute on td elements.", "MissingHeadersAttrs");
            } else {
                if (c.missingThId.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all th elements in this table contain an id attribute. These cells should contain ids so that they may be referenced by td elements' headers attributes.", "MissingHeaderIds");
                }
                if (c.missingTd.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all td elements in this table contain a headers attribute. Each headers attribute should list the ids of all th elements associated with that cell.", "IncompleteHeadersAttrs");
                }
            }
        }
    }
};

var HTMLCS_Section508_Sniffs_I = {
    register: function() {
        return [ "frame", "iframe", "object" ];
    },
    process: function(a, b) {
        var c = a.nodeName.toLowerCase();
        var d = a.hasAttribute("title");
        var e = true;
        if (d === true) {
            e = HTMLCS.util.isStringEmpty(a.getAttribute("title"));
        }
        if (e === true) {
            HTMLCS.addMessage(HTMLCS.ERROR, b, "This " + c + " element is missing title text. Frames should be titled with text that facilitates frame identification and navigation.", "Frames");
        }
    }
};

var HTMLCS_Section508_Sniffs_J = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that no component of the content flickers at a rate of greater than 2 and less than 55 times per second.", "Flicker");
    }
};

var HTMLCS_Section508_Sniffs_K = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "If this page cannot be made compliant, a text-only page with equivalent information or functionality should be provided. The alternative page needs to be updated in line with this page's content.", "AltVersion");
    }
};

var HTMLCS_Section508_Sniffs_L = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        if (a === b) {
            this.addProcessLinksMessages(b);
            this.testKeyboard(b);
        }
    },
    addProcessLinksMessages: function(a) {
        var b = this.processLinks(a);
        for (var c = 0; c < b.emptyNoId.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.emptyNoId[c], "Anchor element found with no link content and no name and/or ID attribute.", "EmptyAnchorNoId");
        }
        for (var c = 0; c < b.placeholder.length; c++) {
            HTMLCS.addMessage(HTMLCS.WARNING, b.placeholder[c], "Anchor element found with link content, but no href, ID, or name attribute has been supplied.", "PlaceholderAnchor");
        }
        for (var c = 0; c < b.noContent.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.noContent[c], "Anchor element found with a valid href attribute, but no link content has been supplied.", "NoContentAnchor");
        }
    },
    processLinks: function(a) {
        var b = {
            empty: [],
            emptyWithName: [],
            emptyNoId: [],
            noHref: [],
            placeholder: [],
            noContent: []
        };
        var c = a.querySelectorAll("a");
        for (var d = 0; d < c.length; d++) {
            var e = c[d];
            var f = false;
            var g = false;
            var h = HTMLCS.util.getElementTextContent(e);
            if (e.hasAttribute("title") === true && /^\s*$/.test(e.getAttribute("title")) === false) {
                f = true;
            } else if (/^\s*$/.test(h) === false) {
                f = true;
            }
            if (e.hasAttribute("href") === true && /^\s*$/.test(e.getAttribute("href")) === false) {
                g = true;
            }
            if (g === false) {
                if (/^\s*$/.test(h) === true) {
                    if (e.hasAttribute("id") === true) {
                        b.empty.push(e);
                    } else if (e.hasAttribute("name") === true) {
                        b.emptyWithName.push(e);
                    } else {
                        b.emptyNoId.push(e);
                    }
                } else {
                    if (e.hasAttribute("id") === true || e.hasAttribute("name") === true) {
                        b.noHref.push(e);
                    } else {
                        b.placeholder.push(e);
                    }
                }
            } else {
                if (/^\s*$/.test(h) === true) {
                    if (e.querySelectorAll("img").length === 0) {
                        b.noContent.push(e);
                    }
                }
            }
        }
        return b;
    },
    testKeyboard: function(a) {
        var b = a.querySelectorAll("*[ondblclick]");
        for (var c = 0; c < b.length; c++) {
            HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Ensure the functionality provided by double-clicking on this element is available through the keyboard.", "DblClick");
        }
        var d = a.querySelectorAll("*[onmouseover]");
        for (var c = 0; c < d.length; c++) {
            HTMLCS.addMessage(HTMLCS.WARNING, d[c], "Ensure the functionality provided by mousing over this element is available through the keyboard; for instance, using the focus event.", "MouseOver");
        }
        var e = a.querySelectorAll("*[onmouseout]");
        for (var c = 0; c < e.length; c++) {
            HTMLCS.addMessage(HTMLCS.WARNING, e[c], "Ensure the functionality provided by mousing out of this element is available through the keyboard; for instance, using the blur event.", "MouseOut");
        }
        var f = a.querySelectorAll("*[onmousemove]");
        for (var c = 0; c < f.length; c++) {
            HTMLCS.addMessage(HTMLCS.WARNING, f[c], "Ensure the functionality provided by moving the mouse on this element is available through the keyboard.", "MouseMove");
        }
        var g = a.querySelectorAll("*[onmousedown]");
        for (var c = 0; c < g.length; c++) {
            HTMLCS.addMessage(HTMLCS.WARNING, g[c], "Ensure the functionality provided by mousing down on this element is available through the keyboard; for instance, using the keydown event.", "MouseDown");
        }
        var h = a.querySelectorAll("*[onmouseup]");
        for (var c = 0; c < h.length; c++) {
            HTMLCS.addMessage(HTMLCS.WARNING, h[c], "Ensure the functionality provided by mousing up on this element is available through the keyboard; for instance, using the keyup event.", "MouseUp");
        }
    }
};

var HTMLCS_Section508_Sniffs_M = {
    register: function() {
        return [ "object", "applet", "bgsound", "embed", "audio", "video" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "If external media requires a plugin or application to view, ensure a link is provided to a plugin or application that complies with Section 508 accessibility requirements for applications.", "PluginLink");
    }
};

var HTMLCS_Section508_Sniffs_N = {
    register: function() {
        return [ "form" ];
    },
    process: function(a, b) {
        var c = a.nodeName.toLowerCase();
        if (c === "form") {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "If an input error is automatically detected in this form, check that the item(s) in error are identified and the error(s) are described to the user in text.", "Errors");
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that descriptive labels or instructions (including for required fields) are provided for user input in this form.", "Labels");
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "Ensure that this form can be navigated using the keyboard and other accessibility tools.", "KeyboardNav");
        }
    }
};

var HTMLCS_Section508_Sniffs_O = {
    register: function() {
        return [ "_top", "a", "area" ];
    },
    process: function(a, b) {
        if (a === b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.", "SkipLinks");
        } else {
            if (a.hasAttribute("href") === true) {
                var c = a.getAttribute("href");
                c = HTMLCS.util.trim(c);
                if (c.length > 1 && c.charAt(0) === "#") {
                    var d = c.substr(1);
                    try {
                        var e = b;
                        if (e.ownerDocument) {
                            e = e.ownerDocument;
                        }
                        var f = e.getElementById(d);
                        if (f === null) {
                            f = e.querySelector('a[name="' + d + '"]');
                        }
                        if (f === null || HTMLCS.util.contains(b, f) === false) {
                            if (HTMLCS.isFullDoc(b) === true || b.nodeName.toLowerCase() === "body") {
                                HTMLCS.addMessage(HTMLCS.ERROR, a, 'This link points to a named anchor "' + d + '" within the document, but no anchor exists with that name.', "NoSuchID");
                            } else {
                                HTMLCS.addMessage(HTMLCS.WARNING, a, 'This link points to a named anchor "' + d + '" within the document, but no anchor exists with that name in the fragment tested.', "NoSuchIDFragment");
                            }
                        }
                    } catch (g) {}
                }
            }
        }
    }
};

var HTMLCS_Section508_Sniffs_P = {
    register: function() {
        return [ "_top", "meta" ];
    },
    process: function(a, b) {
        if (a === b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "If a timed response is required on this page, alert the user and provide sufficient time to allow them to indicate that more time is required.", "TimeLimit");
        } else {
            if (a.hasAttribute("http-equiv") === true) {
                if (String(a.getAttribute("http-equiv")).toLowerCase() === "refresh") {
                    if (/^[1-9]\d*/.test(a.getAttribute("content").toLowerCase()) === true) {
                        if (/url=/.test(a.getAttribute("content").toLowerCase()) === true) {
                            HTMLCS.addMessage(HTMLCS.ERROR, a, "Meta refresh tag used to redirect to another page, with a time limit that is not zero. Users cannot control this time limit.", "MetaRedirect");
                        } else {
                            HTMLCS.addMessage(HTMLCS.ERROR, a, "Meta refresh tag used to refresh the current page. Users cannot control the time limit for this refresh.", "MetaRefresh");
                        }
                    }
                }
            }
        }
    }
};

window.HTMLCS_Section508 = {
    name: "Section508",
    description: "U.S. Section 508 Standard",
    sniffs: [ "A", "B", "C", "D", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P" ],
    getMsgInfo: function(a) {
        var b = a.split(".", 3);
        var c = b[1].toLowerCase();
        var d = [ [ "Section", "1194.22 (" + c + ")" ] ];
        return d;
    }
};

window.HTMLCS_WCAG2A = {
    name: "WCAG2A",
    description: "Web Content Accessibility Guidelines (WCAG) 2.0 A",
    sniffs: [ {
        standard: "WCAG2AAA",
        include: [ "Principle1.Guideline1_1.1_1_1", "Principle1.Guideline1_2.1_2_1", "Principle1.Guideline1_2.1_2_2", "Principle1.Guideline1_2.1_2_3", "Principle1.Guideline1_3.1_3_1", "Principle1.Guideline1_3.1_3_1_A", "Principle1.Guideline1_3.1_3_2", "Principle1.Guideline1_3.1_3_3", "Principle1.Guideline1_4.1_4_1", "Principle1.Guideline1_4.1_4_2", "Principle2.Guideline2_1.2_1_1", "Principle2.Guideline2_1.2_1_2", "Principle2.Guideline2_2.2_2_1", "Principle2.Guideline2_2.2_2_2", "Principle2.Guideline2_3.2_3_1", "Principle2.Guideline2_4.2_4_1", "Principle2.Guideline2_4.2_4_2", "Principle2.Guideline2_4.2_4_3", "Principle2.Guideline2_4.2_4_4", "Principle3.Guideline3_1.3_1_1", "Principle3.Guideline3_2.3_2_1", "Principle3.Guideline3_2.3_2_2", "Principle3.Guideline3_3.3_3_1", "Principle3.Guideline3_3.3_3_2", "Principle4.Guideline4_1.4_1_1", "Principle4.Guideline4_1.4_1_2" ]
    } ],
    getMsgInfo: function(a) {
        return HTMLCS_WCAG2AAA.getMsgInfo(a);
    }
};

window.HTMLCS_WCAG2AA = {
    name: "WCAG2AA",
    description: "Web Content Accessibility Guidelines (WCAG) 2.0 AA",
    sniffs: [ {
        standard: "WCAG2AAA",
        include: [ "Principle1.Guideline1_1.1_1_1", "Principle1.Guideline1_2.1_2_1", "Principle1.Guideline1_2.1_2_2", "Principle1.Guideline1_2.1_2_4", "Principle1.Guideline1_2.1_2_5", "Principle1.Guideline1_3.1_3_1", "Principle1.Guideline1_3.1_3_1_A", "Principle1.Guideline1_3.1_3_2", "Principle1.Guideline1_3.1_3_3", "Principle1.Guideline1_4.1_4_1", "Principle1.Guideline1_4.1_4_2", "Principle1.Guideline1_4.1_4_3", "Principle1.Guideline1_4.1_4_3_F24", "Principle1.Guideline1_4.1_4_3_Contrast", "Principle1.Guideline1_4.1_4_4", "Principle1.Guideline1_4.1_4_5", "Principle2.Guideline2_1.2_1_1", "Principle2.Guideline2_1.2_1_2", "Principle2.Guideline2_2.2_2_1", "Principle2.Guideline2_2.2_2_2", "Principle2.Guideline2_3.2_3_1", "Principle2.Guideline2_4.2_4_1", "Principle2.Guideline2_4.2_4_2", "Principle2.Guideline2_4.2_4_3", "Principle2.Guideline2_4.2_4_4", "Principle2.Guideline2_4.2_4_5", "Principle2.Guideline2_4.2_4_6", "Principle2.Guideline2_4.2_4_7", "Principle3.Guideline3_1.3_1_1", "Principle3.Guideline3_1.3_1_2", "Principle3.Guideline3_2.3_2_1", "Principle3.Guideline3_2.3_2_2", "Principle3.Guideline3_2.3_2_3", "Principle3.Guideline3_2.3_2_4", "Principle3.Guideline3_3.3_3_1", "Principle3.Guideline3_3.3_3_2", "Principle3.Guideline3_3.3_3_3", "Principle3.Guideline3_3.3_3_4", "Principle4.Guideline4_1.4_1_1", "Principle4.Guideline4_1.4_1_2" ]
    } ],
    getMsgInfo: function(a) {
        return HTMLCS_WCAG2AAA.getMsgInfo(a);
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_1_1_1_1 = {
    register: function() {
        return [ "_top", "img" ];
    },
    process: function(a, b) {
        if (a === b) {
            this.addNullAltTextResults(b);
            this.addMediaAlternativesResults(b);
        } else {
            var c = a.nodeName.toLowerCase();
            switch (c) {
              case "img":
                this.testLinkStutter(a);
                this.testLongdesc(a);
                break;
            }
        }
    },
    addNullAltTextResults: function(a) {
        var b = this.testNullAltText(a);
        for (var c = 0; c < b.img.emptyAltInLink.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.img.emptyAltInLink[c], "Img element is the only content of the link, but is missing alt text. The alt text should describe the purpose of the link.", "H30.2");
        }
        for (var c = 0; c < b.img.nullAltWithTitle.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.img.nullAltWithTitle[c], "Img element with empty alt text must have absent or empty title attribute.", "H67.1");
        }
        for (var c = 0; c < b.img.ignored.length; c++) {
            HTMLCS.addMessage(HTMLCS.WARNING, b.img.ignored[c], "Img element is marked so that it is ignored by Assistive Technology.", "H67.2");
        }
        for (var c = 0; c < b.img.missingAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.img.missingAlt[c], "Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.", "H37");
        }
        for (var c = 0; c < b.img.generalAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b.img.generalAlt[c], "Ensure that the img element's alt text serves the same purpose and presents the same information as the image.", "G94.Image");
        }
        for (var c = 0; c < b.inputImage.missingAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.inputImage.missingAlt[c], "Image submit button missing an alt attribute. Specify a text alternative that describes the button's function, using the alt attribute.", "H36");
        }
        for (var c = 0; c < b.inputImage.generalAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b.inputImage.generalAlt[c], "Ensure that the image submit button's alt text identifies the purpose of the button.", "G94.Button");
        }
        for (var c = 0; c < b.area.missingAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.area.missingAlt[c], "Area element in an image map missing an alt attribute. Each area element must have a text alternative that describes the function of the image map area.", "H24");
        }
        for (var c = 0; c < b.area.generalAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b.area.generalAlt[c], "Ensure that the area element's text alternative serves the same purpose as the part of image map image it references.", "H24.2");
        }
    },
    testNullAltText: function(a) {
        var b = {
            img: {
                generalAlt: [],
                missingAlt: [],
                ignored: [],
                nullAltWithTitle: [],
                emptyAltInLink: []
            },
            inputImage: {
                generalAlt: [],
                missingAlt: []
            },
            area: {
                generalAlt: [],
                missingAlt: []
            }
        };
        elements = a.querySelectorAll('img, area, input[type="image"]');
        for (var c = 0; c < elements.length; c++) {
            var d = elements[c];
            var e = d.nodeName.toLowerCase();
            var f = false;
            var g = false;
            var h = false;
            if (d.parentNode.nodeName.toLowerCase() === "a") {
                var i = this._getPreviousSiblingElement(d, null);
                var j = this._getNextSiblingElement(d, null);
                if (i === null && j === null) {
                    var k = d.parentNode.textContent;
                    if (d.parentNode.textContent !== undefined) {
                        var k = d.parentNode.textContent;
                    } else {
                        var k = d.parentNode.innerText;
                    }
                    if (HTMLCS.util.isStringEmpty(k) === true) {
                        f = true;
                    }
                }
            }
            if (d.hasAttribute("alt") === false) {
                g = true;
            } else if (!d.getAttribute("alt") || HTMLCS.util.isStringEmpty(d.getAttribute("alt")) === true) {
                h = true;
            }
            switch (e) {
              case "img":
                if (f === true && (g === true || h === true)) {
                    b.img.emptyAltInLink.push(d.parentNode);
                } else if (g === true) {
                    b.img.missingAlt.push(d);
                } else if (h === true) {
                    if (d.hasAttribute("title") === true && HTMLCS.util.isStringEmpty(d.getAttribute("title")) === false) {
                        b.img.nullAltWithTitle.push(d);
                    } else {
                        b.img.ignored.push(d);
                    }
                } else {
                    b.img.generalAlt.push(d);
                }
                break;

              case "input":
                if (g === true || h === true) {
                    b.inputImage.missingAlt.push(d);
                } else {
                    b.inputImage.generalAlt.push(d);
                }
                break;

              case "area":
                if (g === true || h === true) {
                    b.area.missingAlt.push(d);
                } else {
                    b.inputImage.generalAlt.push(d);
                }
                break;

              default:
                break;
            }
        }
        return b;
    },
    testLongdesc: function(a) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.", "G73,G74");
    },
    testLinkStutter: function(a) {
        if (a.parentNode.nodeName.toLowerCase() === "a") {
            var b = a.parentNode;
            var c = {
                anchor: {
                    href: b.getAttribute("href"),
                    text: HTMLCS.util.getElementTextContent(b, false),
                    alt: this._getLinkAltText(b)
                }
            };
            if (c.anchor.alt === null) {
                c.anchor.alt = "";
            }
            if (c.anchor.alt !== null && c.anchor.alt !== "") {
                if (HTMLCS.util.trim(c.anchor.alt).toLowerCase() === HTMLCS.util.trim(c.anchor.text).toLowerCase()) {
                    HTMLCS.addMessage(HTMLCS.ERROR, a, "Img element inside a link must not use alt text that duplicates the text content of the link.", "H2.EG5");
                }
            }
            if (c.anchor.text === "") {
                var d = this._getPreviousSiblingElement(b, "a", true);
                var e = this._getNextSiblingElement(b, "a", true);
                if (d !== null) {
                    c.previous = {
                        href: d.getAttribute("href"),
                        text: HTMLCS.util.getElementTextContent(d, false),
                        alt: this._getLinkAltText(d)
                    };
                    if (c.previous.alt === null) {
                        c.previous.alt = "";
                    }
                }
                if (e !== null) {
                    c.next = {
                        href: e.getAttribute("href"),
                        text: HTMLCS.util.getElementTextContent(e, false),
                        alt: this._getLinkAltText(e)
                    };
                    if (c.next.alt === null) {
                        c.next.alt = "";
                    }
                }
                if (c.next && c.next.href !== "" && c.next.href !== null && c.anchor.href === c.next.href) {
                    if (c.next.text !== "" && c.anchor.alt === "") {
                        HTMLCS.addMessage(HTMLCS.ERROR, a, "Img element inside a link has empty or missing alt text when a link beside it contains link text. Consider combining the links.", "H2.EG4");
                    } else if (c.next.text.toLowerCase() === c.anchor.alt.toLowerCase()) {
                        HTMLCS.addMessage(HTMLCS.ERROR, a, "Img element inside a link must not use alt text that duplicates the content of a text link beside it.", "H2.EG3");
                    }
                }
                if (c.previous && c.previous.href !== "" && c.previous.href !== null && c.anchor.href === c.previous.href) {
                    if (c.previous.text !== "" && c.anchor.alt === "") {
                        HTMLCS.addMessage(HTMLCS.ERROR, a, "Img element inside a link has empty or missing alt text when a link beside it contains link text. Consider combining the links.", "H2.EG4");
                    } else if (c.previous.text.toLowerCase() === c.anchor.alt.toLowerCase()) {
                        HTMLCS.addMessage(HTMLCS.ERROR, a, "Img element inside a link must not use alt text that duplicates the content of a text link beside it.", "H2.EG3");
                    }
                }
            }
        }
    },
    addMediaAlternativesResults: function(a) {
        var b = this.testMediaTextAlternatives(a);
        for (var c = 0; c < b.object.missingBody.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.object.missingBody[c], "Object elements must contain a text alternative after all other alternatives are exhausted.", "H53");
        }
        for (var c = 0; c < b.object.generalAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b.object.generalAlt[c], "Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.", "G94,G92.Object");
        }
        for (var c = 0; c < b.applet.missingBody.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.applet.missingBody[c], "Applet elements must contain a text alternative in the element's body, for browsers without support for the applet element.", "H35.3");
        }
        for (var c = 0; c < b.applet.missingAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.applet.missingAlt[c], "Applet elements must contain an alt attribute, to provide a text alternative to browsers supporting the element but are unable to load the applet.", "H35.2");
        }
        for (var c = 0; c < b.applet.generalAlt.length; c++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b.applet.generalAlt[c], "Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.", "G94,G92.Applet");
        }
    },
    testMediaTextAlternatives: function(a) {
        var b = {
            object: {
                missingBody: [],
                generalAlt: []
            },
            applet: {
                missingBody: [],
                missingAlt: [],
                generalAlt: []
            }
        };
        var c = a.querySelectorAll("object");
        for (var d = 0; d < c.length; d++) {
            var e = c[d];
            var f = e.nodeName.toLowerCase();
            var g = e.querySelector("object");
            if (g === null) {
                var h = HTMLCS.util.getElementTextContent(e, true);
                if (h === "") {
                    b.object.missingBody.push(e);
                } else {
                    b.object.generalAlt.push(e);
                }
            }
        }
        var c = a.querySelectorAll("applet");
        for (var d = 0; d < c.length; d++) {
            var g = e.querySelector("object");
            var i = false;
            if (g === null) {
                var h = HTMLCS.util.getElementTextContent(e, true);
                if (HTMLCS.util.isStringEmpty(h) === true) {
                    b.applet.missingBody.push(e);
                    i = true;
                }
            }
            var j = e.getAttribute("alt") || "";
            if (HTMLCS.util.isStringEmpty(j) === true) {
                b.applet.missingAlt.push(e);
                i = true;
            }
            if (i === false) {
                b.applet.generalAlt.push(e);
            }
        }
        return b;
    },
    _getLinkAltText: function(a) {
        var a = a.cloneNode(true);
        var b = [];
        for (var c = 0; c < a.childNodes.length; c++) {
            b.push(a.childNodes[c]);
        }
        var d = null;
        while (b.length > 0) {
            var e = b.shift();
            if (e.nodeType === 1) {
                if (e.nodeName.toLowerCase() === "img") {
                    if (e.hasAttribute("alt") === true) {
                        d = e.getAttribute("alt");
                        if (!d) {
                            d = "";
                        } else {
                            d = d.replace(/^\s+|\s+$/g, "");
                        }
                        break;
                    }
                }
            }
        }
        return d;
    },
    _getPreviousSiblingElement: function(a, b, c) {
        if (b === undefined) {
            b = null;
        }
        if (c === undefined) {
            c = false;
        }
        var d = a.previousSibling;
        while (d !== null) {
            if (d.nodeType === 3) {
                if (HTMLCS.util.isStringEmpty(d.nodeValue) === false && c === true) {
                    d = null;
                    break;
                }
            } else if (d.nodeType === 1) {
                if (b === null || d.nodeName.toLowerCase() === b) {
                    break;
                } else if (c === true) {
                    d = null;
                    break;
                }
                break;
            }
            d = d.previousSibling;
        }
        return d;
    },
    _getNextSiblingElement: function(a, b, c) {
        if (b === undefined) {
            b = null;
        }
        if (c === undefined) {
            c = false;
        }
        var d = a.nextSibling;
        while (d !== null) {
            if (d.nodeType === 3) {
                if (HTMLCS.util.isStringEmpty(d.nodeValue) === false && c === true) {
                    d = null;
                    break;
                }
            } else if (d.nodeType === 1) {
                if (b === null || d.nodeName.toLowerCase() === b) {
                    break;
                } else if (c === true) {
                    d = null;
                    break;
                }
                break;
            }
            d = d.nextSibling;
        }
        return d;
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_1 = {
    register: function() {
        return [ "object", "embed", "applet", "bgsound", "audio", "video" ];
    },
    process: function(a, b) {
        var c = a.nodeName.toLowerCase();
        if (c !== "video") {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains pre-recorded audio only, and is not provided as an alternative for text content, check that an alternative text version is available.", "G158");
        }
        if (c !== "bgsound" && c !== "audio") {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains pre-recorded video only, and is not provided as an alternative for text content, check that an alternative text version is available, or an audio track is provided that presents equivalent information.", "G159,G166");
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_2 = {
    register: function() {
        return [ "object", "embed", "applet", "video" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains pre-recorded synchronised media and is not provided as an alternative for text content, check that captions are provided for audio content.", "G87,G93");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_3 = {
    register: function() {
        return [ "object", "embed", "applet", "video" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains pre-recorded synchronised media and is not provided as an alternative for text content, check that an audio description of its video, and/or an alternative text version of the content is provided.", "G69,G78,G173,G8");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_4 = {
    register: function() {
        return [ "object", "embed", "applet", "video" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains synchronised media, check that captions are provided for live audio content.", "G9,G87,G93");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_5 = {
    register: function() {
        return [ "object", "embed", "applet", "video" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains pre-recorded synchronised media, check that an audio description is provided for its video content.", "G78,G173,G8");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_6 = {
    register: function() {
        return [ "object", "embed", "applet", "video" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains pre-recorded synchronised media, check that a sign language interpretation is provided for its audio.", "G54,G81");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_7 = {
    register: function() {
        return [ "object", "embed", "applet", "video" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains synchronised media, and where pauses in foreground audio is not sufficient to allow audio descriptions to convey the sense of pre-recorded video, check that an extended audio description is provided, either through scripting or an alternate version.", "G8");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_8 = {
    register: function() {
        return [ "object", "embed", "applet", "video" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains pre-recorded synchronised media or video-only content, check that an alternative text version of the content is provided.", "G69,G159");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_9 = {
    register: function() {
        return [ "object", "embed", "applet", "bgsound", "audio" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this embedded object contains live audio-only content, check that an alternative text version of the content is provided.", "G150,G151,G157");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1 = {
    _labelNames: null,
    register: function() {
        return [ "_top", "p", "div", "input", "select", "textarea", "button", "table", "fieldset", "form", "h1", "h2", "h3", "h4", "h5", "h6" ];
    },
    process: function(a, b) {
        var c = a.nodeName.toLowerCase();
        if (a === b) {
            this.testPresentationMarkup(b);
            this.testEmptyDupeLabelForAttrs(b);
        } else {
            switch (c) {
              case "input":
              case "textarea":
              case "button":
                this.testLabelsOnInputs(a, b);
                break;

              case "form":
                this.testRequiredFieldsets(a);
                break;

              case "select":
                this.testLabelsOnInputs(a, b);
                this.testOptgroup(a);
                break;

              case "p":
              case "div":
                this.testNonSemanticHeading(a);
                this.testListsWithBreaks(a);
                this.testUnstructuredNavLinks(a);
                break;

              case "table":
                this.testGeneralTable(a);
                this.testTableHeaders(a);
                this.testTableCaptionSummary(a);
                break;

              case "fieldset":
                this.testFieldsetLegend(a);
                break;

              case "h1":
              case "h2":
              case "h3":
              case "h4":
              case "h5":
              case "h6":
                this.testEmptyHeading(a);
                break;
            }
        }
    },
    testEmptyDupeLabelForAttrs: function(a) {
        this._labelNames = {};
        var b = a.getElementsByTagName("label");
        for (var c = 0; c < b.length; c++) {
            if (b[c].hasAttribute("for") === true && b[c].getAttribute("for") !== "") {
                var d = b[c].getAttribute("for");
                if (this._labelNames[d] && this._labelNames[d] !== null) {
                    this._labelNames[d] = null;
                } else {
                    this._labelNames[d] = b[c];
                    if (a.ownerDocument) {
                        var e = a.ownerDocument.getElementById(d);
                    } else {
                        var e = a.getElementById(d);
                    }
                    if (e === null) {
                        var f = HTMLCS.ERROR;
                        var g = 'This label\'s "for" attribute contains an ID that does not exist in the document.';
                        var h = "H44.NonExistent";
                        if (HTMLCS.isFullDoc(a) === true || a.nodeName.toLowerCase() === "body") {
                            f = HTMLCS.WARNING;
                            g = 'This label\'s "for" attribute contains an ID that does not exist in the document fragment.';
                            var h = "H44.NonExistentFragment";
                        }
                        HTMLCS.addMessage(f, b[c], g, h);
                    } else {
                        var i = e.nodeName.toLowerCase();
                        if (i !== "input" && i !== "select" && i !== "textarea") {
                            HTMLCS.addMessage(HTMLCS.ERROR, b[c], 'This label\'s "for" attribute contains an ID that points to an element that is not a form control.', "H44.NotFormControl");
                        }
                    }
                }
            } else {
                HTMLCS.addMessage(HTMLCS.ERROR, b[c], 'Label found without a "for" attribute, and therefore not explicitly associated with a form control.', "H44.NoForAttr");
            }
        }
    },
    testLabelsOnInputs: function(a, b) {
        var c = a.nodeName.toLowerCase();
        var d = c;
        if (d === "input") {
            if (a.hasAttribute("type") === true) {
                d = a.getAttribute("type");
            } else {
                d = "text";
            }
        }
        var e = false;
        if (/^(submit|reset|image|hidden|button)$/.test(d.toLowerCase()) === true) {
            e = true;
        }
        this._labelNames = {};
        var f = b.getElementsByTagName("label");
        for (var g = 0; g < f.length; g++) {
            if (f[g].hasAttribute("for") === true) {
                var h = f[g].getAttribute("for");
                this._labelNames[h] = f[g];
            }
        }
        if (a.hasAttribute("id") === false && e === false) {
            if (a.hasAttribute("title") === true) {
                if (/^\s*$/.test(a.getAttribute("title")) === true) {
                    HTMLCS.addMessage(HTMLCS.ERROR, a, "Form control without a label contains an empty title attribute. The title attribute should identify the purpose of the control.", "H65.3");
                }
            } else {
                HTMLCS.addMessage(HTMLCS.ERROR, a, "Form control does not have an ID, therefore it cannot have an explicit label.", "H44.NoId");
            }
        } else {
            var i = a.getAttribute("id");
            if (!this._labelNames[i]) {
                if (e === false) {
                    if (a.hasAttribute("title") === true) {
                        if (/^\s*$/.test(a.getAttribute("title")) === true) {
                            HTMLCS.addMessage(HTMLCS.ERROR, a, "Form control without a label contains an empty title attribute. The title attribute should identify the purpose of the control.", "H65.3");
                        } else {
                            HTMLCS.addMessage(HTMLCS.WARNING, a, "Check that the title attribute identifies the purpose of the control, and that a label element is not appropriate.", "H65");
                        }
                    } else {
                        HTMLCS.addMessage(HTMLCS.ERROR, a, "Form control does not have an explicit label or title attribute, identifying the purpose of the control.", "H44.2");
                    }
                }
            } else {
                if (e === true) {
                    HTMLCS.addMessage(HTMLCS.ERROR, a, "Label element should not be used for this type of form control.", "H44.NoLabelAllowed");
                } else {
                    var j = false;
                    if (/^(checkbox|radio)$/.test(d) === true) {
                        j = true;
                    }
                    if (a.compareDocumentPosition) {
                        var k = a.compareDocumentPosition(this._labelNames[i]);
                        if ((k & 2) === 2) {
                            var l = 1;
                        } else if ((k & 4) === 4) {
                            var l = -1;
                        }
                    } else if (a.sourceIndex) {
                        var l = a.sourceIndex - this._labelNames[i].sourceIndex;
                    }
                    if (j === true && l > 0) {
                        HTMLCS.addMessage(HTMLCS.ERROR, a, "The label element for this control should be placed after this element.", "H44.1.After");
                    } else if (j === false && l < 0) {
                        HTMLCS.addMessage(HTMLCS.ERROR, a, "The label element for this control should be placed before this element.", "H44.1.Before");
                    }
                }
            }
        }
    },
    testPresentationMarkup: function(a) {
        var b = a.querySelectorAll("b, i, u, s, strike, tt, big, small, center, font");
        for (var c = 0; c < b.length; c++) {
            var d = "H49." + b[c].nodeName.substr(0, 1).toUpperCase() + b[c].nodeName.substr(1).toLowerCase();
            HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.", d);
        }
        var b = a.querySelectorAll("*[align]");
        for (var c = 0; c < b.length; c++) {
            var d = "H49.AlignAttr";
            HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.", d);
        }
    },
    testNonSemanticHeading: function(a) {
        var b = a.nodeName.toLowerCase();
        if (b === "p" || b === "div") {
            var c = a.childNodes;
            if (c.length === 1 && c[0].nodeType === 1) {
                var d = c[0].nodeName.toLowerCase();
                if (/^(strong|em|b|i|u)$/.test(d) === true) {
                    HTMLCS.addMessage(HTMLCS.WARNING, a, "Heading markup should be used if this content is intended as a heading.", "H42");
                }
            }
        }
    },
    testTableHeaders: function(a) {
        var b = HTMLCS.util.testTableHeaders(a);
        var c = this._testTableScopeAttrs(a);
        for (var d = 0; d < c.invalid.length; d++) {
            HTMLCS.addMessage(HTMLCS.ERROR, c.invalid[d], "Table cell has an invalid scope attribute. Valid values are row, col, rowgroup, or colgroup.", "H63.3");
        }
        for (var d = 0; d < c.obsoleteTd.length; d++) {
            HTMLCS.addMessage(HTMLCS.WARNING, c.obsoleteTd[d], "Scope attributes on td elements that act as headings for other elements are obsolete in HTML5. Use a th element instead.", "H63.2");
        }
        if (b.allowScope === true) {
            if (c.missing.length === 0) {
                b.required === false;
            }
        } else {
            if (c.used === true) {
                HTMLCS.addMessage(HTMLCS.WARNING, a, "Scope attributes on th elements are ambiguous in a table with multiple levels of headings. Use the headers attribute on td elements instead.", "H43.ScopeAmbiguous");
                c = null;
            }
        }
        for (var d = 0; d < b.wrongHeaders.length; d++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.wrongHeaders[d].element, 'Incorrect headers attribute on this td element. Expected "' + b.wrongHeaders[d].expected + '" but found "' + b.wrongHeaders[d].actual + '"', "H43.IncorrectAttr");
        }
        if (b.required === true && b.allowScope === false) {
            if (b.used === false) {
                HTMLCS.addMessage(HTMLCS.ERROR, a, "The relationship between td elements and their associated th elements is not defined. As this table has multiple levels of th elements, you must use the headers attribute on td elements.", "H43.HeadersRequired");
            } else {
                if (b.missingThId.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all th elements in this table contain an id attribute. These cells should contain ids so that they may be referenced by td elements' headers attributes.", "H43.MissingHeaderIds");
                }
                if (b.missingTd.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all td elements in this table contain a headers attribute. Each headers attribute should list the ids of all th elements associated with that cell.", "H43.MissingHeadersAttrs");
                }
            }
        }
        if (b.required === true && b.allowScope === true && b.correct === false && c.correct === false) {
            if (c.used === false && b.used === false) {
                HTMLCS.addMessage(HTMLCS.ERROR, a, "The relationship between td elements and their associated th elements is not defined. Use either the scope attribute on th elements, or the headers attribute on td elements.", "H43,H63");
            } else if (c.used === false && (b.missingThId.length > 0 || b.missingTd.length > 0)) {
                if (b.missingThId.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all th elements in this table contain an id attribute. These cells should contain ids so that they may be referenced by td elements' headers attributes.", "H43.MissingHeaderIds");
                }
                if (b.missingTd.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all td elements in this table contain a headers attribute. Each headers attribute should list the ids of all th elements associated with that cell.", "H43.MissingHeadersAttrs");
                }
            } else if (c.missing.length > 0 && b.used === false) {
                HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all th elements in this table have a scope attribute. These cells should contain a scope attribute to identify their association with td elements.", "H63.1");
            } else if (c.missing.length > 0 && (b.missingThId.length > 0 || b.missingTd.length > 0)) {
                HTMLCS.addMessage(HTMLCS.ERROR, a, "The relationship between td elements and their associated th elements is not defined. Use either the scope attribute on th elements, or the headers attribute on td elements.", "H43,H63");
            }
        }
    },
    _testTableScopeAttrs: function(a) {
        var b = {
            th: a.getElementsByTagName("th"),
            td: a.getElementsByTagName("td")
        };
        var c = {
            used: false,
            correct: true,
            missing: [],
            invalid: [],
            obsoleteTd: []
        };
        for (var d in b) {
            for (var e = 0; e < b[d].length; e++) {
                element = b[d][e];
                var f = "";
                if (element.hasAttribute("scope") === true) {
                    c.used = true;
                    if (element.getAttribute("scope")) {
                        f = element.getAttribute("scope");
                    }
                }
                if (element.nodeName.toLowerCase() === "th") {
                    if (/^\s*$/.test(f) === true) {
                        c.correct = false;
                        c.missing.push(element);
                    } else if (/^(row|col|rowgroup|colgroup)$/.test(f) === false) {
                        c.correct = false;
                        c.invalid.push(element);
                    }
                } else {
                    if (f !== "") {
                        c.obsoleteTd.push(element);
                        if (/^(row|col|rowgroup|colgroup)$/.test(f) === false) {
                            c.correct = false;
                            c.invalid.push(element);
                        }
                    }
                }
            }
        }
        return c;
    },
    testTableCaptionSummary: function(a) {
        var b = a.getAttribute("summary") || "";
        var c = a.getElementsByTagName("caption");
        var d = "";
        if (c.length > 0) {
            d = c[0].innerHTML.replace(/^\s*(.*?)\s*$/g, "$1");
        }
        b = b.replace(/^\s*(.*?)\s*$/g, "$1");
        if (b !== "") {
            if (HTMLCS.util.isLayoutTable(a) === true) {
                HTMLCS.addMessage(HTMLCS.ERROR, a, "This table appears to be used for layout, but contains a summary attribute. Layout tables must not contain summary attributes, or if supplied, must be empty.", "H73.3.LayoutTable");
            } else {
                if (d === b) {
                    HTMLCS.addMessage(HTMLCS.ERROR, a, "If this table is a data table, and both a summary attribute and a caption element are present, the summary should not duplicate the caption.", "H39,H73.4");
                }
                HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this table is a data table, check that the summary attribute describes the table's organization or explains how to use the table.", "H73.3.Check");
            }
        } else {
            if (HTMLCS.util.isLayoutTable(a) === false) {
                HTMLCS.addMessage(HTMLCS.WARNING, a, "If this table is a data table, consider using the summary attribute of the table element to give an overview of this table.", "H73.3.NoSummary");
            }
        }
        if (d !== "") {
            if (HTMLCS.util.isLayoutTable(a) === true) {
                HTMLCS.addMessage(HTMLCS.ERROR, a, "This table appears to be used for layout, but contains a caption element. Layout tables must not contain captions.", "H39.3.LayoutTable");
            } else {
                HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this table is a data table, check that the caption element accurately describes this table.", "H39.3.Check");
            }
        } else {
            if (HTMLCS.util.isLayoutTable(a) === false) {
                HTMLCS.addMessage(HTMLCS.WARNING, a, "If this table is a data table, consider using a caption element to the table element to identify this table.", "H39.3.NoCaption");
            }
        }
    },
    testFieldsetLegend: function(a) {
        var b = a.querySelector("legend");
        if (b === null || b.parentNode !== a) {
            HTMLCS.addMessage(HTMLCS.ERROR, a, "Fieldset does not contain a legend element. All fieldsets should contain a legend element that describes a description of the field group.", "H71.NoLegend");
        }
    },
    testOptgroup: function(a) {
        var b = a.querySelector("optgroup");
        if (b === null) {
            HTMLCS.addMessage(HTMLCS.WARNING, a, "If this selection list contains groups of related options, they should be grouped with optgroup.", "H85.2");
        }
    },
    testRequiredFieldsets: function(a) {
        var b = a.querySelectorAll("input[type=radio], input[type=checkbox]");
        var c = {};
        for (var d = 0; d < b.length; d++) {
            var e = b[d];
            if (e.hasAttribute("name") === true) {
                var f = e.getAttribute("name");
                var g = e.parentNode;
                while (g.nodeName.toLowerCase() !== "fieldset" && g !== null && g !== a) {
                    g = g.parentNode;
                }
                if (g.nodeName.toLowerCase() !== "fieldset") {
                    g = null;
                }
            }
            if (c[f] === undefined) {
                c[f] = g;
            } else if (g === null || g !== c[f]) {
                HTMLCS.addMessage(HTMLCS.WARNING, a, "If these radio buttons or check boxes require a further group-level description, they should be contained within a fieldset element.", "H71.SameName");
                break;
            }
        }
    },
    testListsWithBreaks: function(a) {
        var b = a.querySelector("br");
        var c = [];
        if (b !== null) {
            var d = [];
            for (var e = 0; e < a.childNodes.length; e++) {
                d.push(a.childNodes[e]);
            }
            var f = [];
            while (d.length > 0) {
                var g = d.shift();
                if (g.nodeType === 1) {
                    if (g.nodeName.toLowerCase() === "br") {
                        c.push(f.join(" ").replace(/^\s*(.*?)\s*$/g, "$1"));
                        f = [];
                    } else {
                        for (var e = g.childNodes.length - 1; e >= 0; --e) {
                            d.unshift(g.childNodes[e]);
                        }
                    }
                } else if (g.nodeType === 3) {
                    f.push(g.nodeValue);
                }
            }
            if (f.length > 0) {
                c.push(f.join(" ").replace(/^\s*(.*?)\s*$/g, "$1"));
            }
            for (var e = 0; e < c.length; e++) {
                if (/^[\-*]\s+/.test(c[0]) === true) {
                    HTMLCS.addMessage(HTMLCS.WARNING, a, "Content appears to have the visual appearance of a bulleted list. It may be appropriate to mark this content up using a ul element.", "H48.1");
                    break;
                }
                if (/^\d+[:\/\-.]?\s+/.test(c[0]) === true) {
                    HTMLCS.addMessage(HTMLCS.WARNING, a, "Content appears to have the visual appearance of a numbered list. It may be appropriate to mark this content up using an ol element.", "H48.2");
                    break;
                }
            }
        }
    },
    testHeadingOrder: function(a, b) {
        var c = 0;
        var d = a.querySelectorAll("h1, h2, h3, h4, h5, h6");
        for (var e = 0; e < d.length; e++) {
            var f = parseInt(d[e].nodeName.substr(1, 1));
            if (f - c > 1) {
                var g = "should be an h" + (c + 1) + " to be properly nested";
                if (c === 0) {
                    g = "appears to be the primary document heading, so should be an h1 element";
                }
                HTMLCS.addMessage(b, d[e], "The heading structure is not logically nested. This h" + f + " element " + g + ".", "G141");
            }
            c = f;
        }
    },
    testEmptyHeading: function(a) {
        var b = a.textContent;
        if (b === undefined) {
            b = a.innerText;
        }
        if (/^\s*$/.test(b) === true) {
            HTMLCS.addMessage(HTMLCS.ERROR, a, "Heading tag found with no content. Text that is not intended as a heading should not be marked up with heading tags.", "H42.2");
        }
    },
    testUnstructuredNavLinks: function(a) {
        var b = a.nodeName.toLowerCase();
        var c = 0;
        var d = a.childNodes;
        for (var e = 0; e < d.length; e++) {
            if (d[e].nodeType === 1 && d[e].nodeName.toLowerCase() === "a") {
                c++;
                if (c > 1) {
                    break;
                }
            }
        }
        if (c > 1) {
            var f = a.parentNode;
            while (f !== null && f.nodeName.toLowerCase() !== "ul" && f.nodeName.toLowerCase() !== "ol") {
                f = f.parentNode;
            }
            if (f === null) {
                HTMLCS.addMessage(HTMLCS.WARNING, a, "If this element contains a navigation section, it is recommended that it be marked up as a list.", "H48");
            }
        }
    },
    testGeneralTable: function(a) {
        if (HTMLCS.util.isLayoutTable(a) === true) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "This table appears to be a layout table. If it is meant to instead be a data table, ensure header cells are identified using th elements.", "LayoutTable");
        } else {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "This table appears to be a data table. If it is meant to instead be a layout table, ensure there are no th elements, and no summary or caption.", "DataTable");
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1_A = {
    _labelNames: null,
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        var c = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1;
        if (a === b) {
            c.testHeadingOrder(b, HTMLCS.WARNING);
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1_AAA = {
    _labelNames: null,
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        var c = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_1;
        if (a === b) {
            c.testHeadingOrder(b, HTMLCS.ERROR);
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_2 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that the content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.", "G57");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_3 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Where instructions are provided for understanding the content, do not rely on sensory characteristics alone (such as shape, size or location) to describe objects.", "G96");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_1 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that any information conveyed using colour alone is also available in text, or through other visual cues.", "G14,G182");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_2 = {
    register: function() {
        return [ "object", "embed", "applet", "bgsound", "audio", "video" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "If this element contains audio that plays automatically for longer than 3 seconds, check that there is the ability to pause, stop or mute the audio.", "F23");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        if (a === b) {
            var c = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_Contrast.testContrastRatio(b, 4.5, 3);
            for (var d = 0; d < c.length; d++) {
                var a = c[d].element;
                var e = 2;
                var f = Math.round(c[d].value * Math.pow(10, e)) / Math.pow(10, e);
                var g = c[d].required;
                var h = c[d].recommendation;
                var i = c[d].hasBgImage || false;
                var j = c[d].bgColour || false;
                while (g === f) {
                    e++;
                    f = Math.round(c[d].value * Math.pow(10, e)) / Math.pow(10, e);
                }
                if (g === 4.5) {
                    var k = "G18";
                } else if (g === 3) {
                    var k = "G145";
                }
                var l = [];
                if (h) {
                    if (h.fore.from !== h.fore.to) {
                        l.push("text colour to " + h.fore.to);
                    }
                    if (h.back.from !== h.back.to) {
                        l.push("background to " + h.back.to);
                    }
                }
                if (l.length > 0) {
                    l = " Recommendation: change " + l.join(", ") + ".";
                }
                if (j && j.indexOf("rgba") === 0) {
                    k += ".Alpha";
                    HTMLCS.addMessage(HTMLCS.WARNING, a, "This element's text is placed on a background that has an alpha transparency. Ensure the contrast ratio between the text and background color are at least " + g + ":1.", k);
                } else if (i === true) {
                    k += ".BgImage";
                    HTMLCS.addMessage(HTMLCS.WARNING, a, "This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least " + g + ":1.", k);
                } else {
                    k += ".Fail";
                    HTMLCS.addMessage(HTMLCS.ERROR, a, "This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least " + g + ":1, but text in this element has a contrast ratio of " + f + ":1." + l, k);
                }
            }
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_Contrast = {
    testContrastRatio: function(a, b, c) {
        var d = new Date();
        var e = 0;
        var f = 0;
        var g = [];
        if (!a.ownerDocument) {
            var h = [ a.getElementsByTagName("body")[0] ];
        } else {
            var h = [ a ];
        }
        while (h.length > 0) {
            var i = h.shift();
            if (i.nodeType === 1 && HTMLCS.util.isHidden(i) === false) {
                var j = false;
                for (var k = 0; k < i.childNodes.length; k++) {
                    if (i.childNodes[k].nodeType === 1) {
                        h.push(i.childNodes[k]);
                    } else if (i.childNodes[k].nodeType === 3) {
                        if (HTMLCS.util.trim(i.childNodes[k].nodeValue) !== "") {
                            j = true;
                        }
                    }
                }
                if (j === true) {
                    var l = HTMLCS.util.style(i);
                    if (l) {
                        var m = l.backgroundColor;
                        var n = false;
                        if (l.backgroundImage !== "none") {
                            n = true;
                        }
                        var o = i.parentNode;
                        var p = parseInt(l.fontSize, 10) * (72 / 96);
                        var q = 18;
                        if (l.fontWeight === "bold" || parseInt(l.fontWeight, 10) >= 600) {
                            var q = 14;
                        }
                        var r = b;
                        if (p >= q) {
                            r = c;
                        }
                        while (m === "transparent" || m === "rgba(0, 0, 0, 0)") {
                            if (!o || !o.ownerDocument) {
                                break;
                            }
                            var s = HTMLCS.util.style(o);
                            var m = s.backgroundColor;
                            if (s.backgroundImage !== "none") {
                                n = true;
                            }
                            o = o.parentNode;
                        }
                        if (n === true) {
                            g.push({
                                element: i,
                                colour: l.color,
                                bgColour: undefined,
                                value: undefined,
                                required: r,
                                hasBgImage: true
                            });
                            continue;
                        } else if (m === "transparent" || m === "rgba(0, 0, 0, 0)") {
                            continue;
                        }
                        var t = HTMLCS.util.contrastRatio(m, l.color);
                        if (t < r) {
                            var u = this.recommendColour(m, l.color, r);
                            g.push({
                                element: i,
                                colour: l.color,
                                bgColour: m,
                                value: t,
                                required: r,
                                recommendation: u
                            });
                        }
                    }
                }
            }
        }
        return g;
    },
    recommendColour: function(a, b, c) {
        var b = HTMLCS.util.RGBtoColourStr(HTMLCS.util.colourStrToRGB(b));
        var a = HTMLCS.util.RGBtoColourStr(HTMLCS.util.colourStrToRGB(a));
        var d = HTMLCS.util.contrastRatio(b, a);
        var e = Math.abs(HTMLCS.util.relativeLum(b) - .5);
        var f = Math.abs(HTMLCS.util.relativeLum(a) - .5);
        var g = null;
        if (d < c) {
            var h = 1 + 1 / 400;
            if (e <= f) {
                var i = "back";
                var j = a;
                if (HTMLCS.util.relativeLum(a) < .5) {
                    var h = 1 / h;
                }
            } else {
                var i = "fore";
                var j = b;
                if (HTMLCS.util.relativeLum(b) < .5) {
                    var h = 1 / h;
                }
            }
            var k = HTMLCS.util.sRGBtoHSV(j);
            var l = k.saturation * k.value;
            var m = b;
            var n = a;
            var o = false;
            var p = 0;
            while (d < c) {
                if (j === "#fff" || j === "#000") {
                    if (o === true) {
                        if (i === "fore") {
                            var q = n;
                            var r = 1;
                            while (n === q) {
                                var n = this.multiplyColour(n, Math.pow(1 / h, r));
                                r++;
                            }
                        } else {
                            var s = m;
                            var r = 1;
                            while (m === s) {
                                var m = this.multiplyColour(m, Math.pow(1 / h, r));
                                r++;
                            }
                        }
                    } else {
                        m = b;
                        n = a;
                        h = 1 / h;
                        if (i === "fore") {
                            i = "back";
                            var k = a;
                        } else {
                            i = "fore";
                            var k = b;
                        }
                        k = HTMLCS.util.sRGBtoHSV(k);
                        l = k.saturation * k.value;
                        o = true;
                    }
                }
                p++;
                var j = HTMLCS.util.HSVtosRGB(k);
                var j = this.multiplyColour(j, Math.pow(h, p));
                if (i === "fore") {
                    var m = j;
                } else {
                    var n = j;
                }
                var d = HTMLCS.util.contrastRatio(m, n);
            }
            g = {
                fore: {
                    from: b,
                    to: m
                },
                back: {
                    from: a,
                    to: n
                }
            };
        }
        return g;
    },
    multiplyColour: function(a, b) {
        var c = HTMLCS.util.sRGBtoHSV(a);
        var d = c.saturation * c.value;
        if (c.value === 0) {
            c.value = 1 / 255;
        }
        c.value = c.value * b;
        if (c.value === 0) {
            c.saturation = 0;
        } else {
            c.saturation = d / c.value;
        }
        c.value = Math.min(1, c.value);
        c.saturation = Math.min(1, c.saturation);
        var e = HTMLCS.util.RGBtoColourStr(HTMLCS.util.HSVtosRGB(c));
        return e;
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_F24 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        var c = b.querySelectorAll("*");
        for (var d = 0; d < c.length; d++) {
            this.testColourComboFail(c[d]);
        }
    },
    testColourComboFail: function(a) {
        var b = a.hasAttribute("color");
        b = b || a.hasAttribute("link");
        b = b || a.hasAttribute("vlink");
        b = b || a.hasAttribute("alink");
        var c = a.hasAttribute("bgcolor");
        if (a.style) {
            var d = a.style.color;
            var e = a.style.background;
            if (d !== "" && d !== "auto") {
                b = true;
            }
            if (e !== "" && e !== "auto") {
                c = true;
            }
        }
        if (c !== b) {
            if (c === true) {
                HTMLCS.addMessage(HTMLCS.WARNING, a, "Check that this element has an inherited foreground colour to complement the corresponding inline background colour or image.", "F24.BGColour");
            } else {
                HTMLCS.addMessage(HTMLCS.WARNING, a, "Check that this element has an inherited background colour or image to complement the corresponding inline foreground colour.", "F24.FGColour");
            }
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_4 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that text can be resized without assistive technology up to 200 percent without loss of content or functionality.", "G142");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_5 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        var c = b.querySelector("img");
        if (c !== null) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "If the technologies being used can achieve the visual presentation, check that text is used to convey information rather than images of text, except when the image of text is essential to the information being conveyed, or can be visually customised to the user's requirements.", "G140,C22,C30.AALevel");
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_6 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        if (a === b) {
            var c = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_3_Contrast.testContrastRatio(b, 7, 4.5);
            for (var d = 0; d < c.length; d++) {
                var a = c[d].element;
                var e = 2;
                var f = Math.round(c[d].value * Math.pow(10, e)) / Math.pow(10, e);
                var g = c[d].required;
                var h = c[d].recommendation;
                var i = c[d].hasBgImage || false;
                while (g === f) {
                    e++;
                    f = Math.round(c[d].value * Math.pow(10, e)) / Math.pow(10, e);
                }
                if (g === 4.5) {
                    var j = "G18";
                } else if (g === 7) {
                    var j = "G17";
                }
                var k = [];
                if (h) {
                    if (h.fore.from !== h.fore.to) {
                        k.push("text colour to " + h.fore.to);
                    }
                    if (h.back.from !== h.back.to) {
                        k.push("background to " + h.back.to);
                    }
                }
                if (k.length > 0) {
                    k = " Recommendation: change " + k.join(", ") + ".";
                }
                if (i === true) {
                    j += ".BgImage";
                    HTMLCS.addMessage(HTMLCS.WARNING, a, "This element's text is placed on a background image. Ensure the contrast ratio between the text and all covered parts of the image are at least " + g + ":1.", j);
                } else {
                    j += ".Fail";
                    HTMLCS.addMessage(HTMLCS.ERROR, a, "This element has insufficient contrast at this conformance level. Expected a contrast ratio of at least " + g + ":1, but text in this element has a contrast ratio of " + f + ":1." + k, j);
                }
            }
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_7 = {
    register: function() {
        return [ "object", "embed", "applet", "bgsound", "audio" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "For pre-recorded audio-only content in this element that is primarily speech (such as narration), any background sounds should be muteable, or be at least 20 dB (or about 4 times) quieter than the speech.", "G56");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_8 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that a mechanism is available for the user to select foreground and background colours for blocks of text, either through the Web page or the browser.", "G148,G156,G175");
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that a mechanism exists to reduce the width of a block of text to no more than 80 characters (or 40 in Chinese, Japanese or Korean script).", "H87,C20");
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that blocks of text are not fully justified - that is, to both left and right edges - or a mechanism exists to remove full justification.", "C19,G172,G169");
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that line spacing in blocks of text are at least 150% in paragraphs, and paragraph spacing is at least 1.5 times the line spacing, or that a mechanism is available to achieve this.", "G188,C21");
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that text can be resized without assistive technology up to 200 percent without requiring the user to scroll horizontally on a full-screen window.", "H87,G146,C26");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_9 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        var c = b.querySelector("img");
        if (c !== null) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.", "G140,C22,C30.NoException");
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_1_2_1_1 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        if (a === b) {
            var c = b.querySelectorAll("*[ondblclick]");
            for (var d = 0; d < c.length; d++) {
                HTMLCS.addMessage(HTMLCS.WARNING, c[d], "Ensure the functionality provided by double-clicking on this element is available through the keyboard.", "SCR20.DblClick");
            }
            var e = b.querySelectorAll("*[onmouseover]");
            for (var d = 0; d < e.length; d++) {
                HTMLCS.addMessage(HTMLCS.WARNING, e[d], "Ensure the functionality provided by mousing over this element is available through the keyboard; for instance, using the focus event.", "SCR20.MouseOver");
            }
            var f = b.querySelectorAll("*[onmouseout]");
            for (var d = 0; d < f.length; d++) {
                HTMLCS.addMessage(HTMLCS.WARNING, f[d], "Ensure the functionality provided by mousing out of this element is available through the keyboard; for instance, using the blur event.", "SCR20.MouseOut");
            }
            var g = b.querySelectorAll("*[onmousemove]");
            for (var d = 0; d < g.length; d++) {
                HTMLCS.addMessage(HTMLCS.WARNING, g[d], "Ensure the functionality provided by moving the mouse on this element is available through the keyboard.", "SCR20.MouseMove");
            }
            var h = b.querySelectorAll("*[onmousedown]");
            for (var d = 0; d < h.length; d++) {
                HTMLCS.addMessage(HTMLCS.WARNING, h[d], "Ensure the functionality provided by mousing down on this element is available through the keyboard; for instance, using the keydown event.", "SCR20.MouseDown");
            }
            var i = b.querySelectorAll("*[onmouseup]");
            for (var d = 0; d < i.length; d++) {
                HTMLCS.addMessage(HTMLCS.WARNING, i[d], "Ensure the functionality provided by mousing up on this element is available through the keyboard; for instance, using the keyup event.", "SCR20.MouseUp");
            }
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_1_2_1_2 = {
    register: function() {
        return [ "object", "applet", "embed" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.WARNING, a, "Check that this applet or plugin provides the ability to move the focus away from itself when using the keyboard.", "F10");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_1 = {
    register: function() {
        return [ "meta" ];
    },
    process: function(a, b) {
        if (a.hasAttribute("http-equiv") === true) {
            if (String(a.getAttribute("http-equiv")).toLowerCase() === "refresh") {
                if (/^[1-9]\d*/.test(a.getAttribute("content").toLowerCase()) === true) {
                    if (/url=/.test(a.getAttribute("content").toLowerCase()) === true) {
                        HTMLCS.addMessage(HTMLCS.ERROR, a, "Meta refresh tag used to redirect to another page, with a time limit that is not zero. Users cannot control this time limit.", "F40.2");
                    } else {
                        HTMLCS.addMessage(HTMLCS.ERROR, a, "Meta refresh tag used to refresh the current page. Users cannot control the time limit for this refresh.", "F41.2");
                    }
                }
            }
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_2 = {
    register: function() {
        return [ "_top", "blink" ];
    },
    process: function(a, b) {
        if (a === b) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.", "SCR33,SCR22,G187,G152,G186,G191");
            var c = b.querySelectorAll("*");
            for (var d = 0; d < c.length; d++) {
                var e = HTMLCS.util.style(c[d]);
                if (e) {
                    if (/blink/.test(e["text-decoration"]) === true) {
                        HTMLCS.addMessage(HTMLCS.WARNING, c[d], "Ensure there is a mechanism available to stop this blinking element in less than five seconds.", "F4");
                    }
                }
            }
        } else if (a.nodeName.toLowerCase() === "blink") {
            HTMLCS.addMessage(HTMLCS.ERROR, a, "Blink elements cannot satisfy the requirement that blinking information can be stopped within five seconds.", "F47");
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_3 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.", "G5");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_4 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that all interruptions (including updates to content) can be postponed or suppressed by the user, except interruptions involving an emergency.", "SCR14");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_5 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this Web page is part of a set of Web pages with an inactivity time limit, check that an authenticated user can continue the activity without loss of data after re-authenticating.", "G105,G181");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_3_2_3_1 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that no component of the content flashes more than three times in any 1-second period, or that the size of any flashing area is sufficiently small.", "G19,G176");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_3_2_3_2 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that no component of the content flashes more than three times in any 1-second period.", "G19");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_1 = {
    register: function() {
        return [ "iframe", "a", "area", "_top" ];
    },
    process: function(a, b) {
        if (a === b) {
            this.testGenericBypassMsg(b);
        } else {
            var c = a.nodeName.toLowerCase();
            switch (c) {
              case "iframe":
                this.testIframeTitle(a);
                break;

              case "a":
              case "area":
                this.testSameDocFragmentLinks(a, b);
                break;
            }
        }
    },
    testIframeTitle: function(a) {
        var b = a.nodeName.toLowerCase();
        if (b === "iframe") {
            var c = false;
            if (a.hasAttribute("title") === true) {
                if (a.getAttribute("title") && /^\s+$/.test(a.getAttribute("title")) === false) {
                    c = true;
                }
            }
            if (c === false) {
                HTMLCS.addMessage(HTMLCS.ERROR, a, "Iframe element requires a non-empty title attribute that identifies the frame.", "H64.1");
            } else {
                HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that the title attribute of this element contains text that identifies the frame.", "H64.2");
            }
        }
    },
    testGenericBypassMsg: function(a) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.", "G1,G123,G124,H69");
    },
    testSameDocFragmentLinks: function(a, b) {
        if (a.hasAttribute("href") === true) {
            var c = a.getAttribute("href");
            c = HTMLCS.util.trim(c);
            if (c.length > 1 && c.charAt(0) === "#") {
                var d = c.substr(1);
                try {
                    var e = b;
                    if (e.ownerDocument) {
                        e = e.ownerDocument;
                    }
                    var f = e.getElementById(d);
                    if (f === null) {
                        f = e.querySelector('a[name="' + d + '"]');
                    }
                    if (f === null || HTMLCS.util.contains(b, f) === false) {
                        if (HTMLCS.isFullDoc(b) === true || b.nodeName.toLowerCase() === "body") {
                            HTMLCS.addMessage(HTMLCS.ERROR, a, 'This link points to a named anchor "' + d + '" within the document, but no anchor exists with that name.', "G1,G123,G124.NoSuchID");
                        } else {
                            HTMLCS.addMessage(HTMLCS.WARNING, a, 'This link points to a named anchor "' + d + '" within the document, but no anchor exists with that name in the fragment tested.', "G1,G123,G124.NoSuchIDFragment");
                        }
                    }
                } catch (g) {}
            }
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_2 = {
    register: function() {
        return [ "html" ];
    },
    process: function(a, b) {
        var c = a.childNodes;
        var d = null;
        for (var e = 0; e < c.length; e++) {
            if (c[e].nodeName.toLowerCase() === "head") {
                d = c[e];
                break;
            }
        }
        if (d === null) {
            HTMLCS.addMessage(HTMLCS.ERROR, a, "There is no head section in which to place a descriptive title element.", "H25.1.NoHeadEl");
        } else {
            var c = d.childNodes;
            var f = null;
            for (var e = 0; e < c.length; e++) {
                if (c[e].nodeName.toLowerCase() === "title") {
                    f = c[e];
                    break;
                }
            }
            if (f === null) {
                HTMLCS.addMessage(HTMLCS.ERROR, d, "A title should be provided for the document, using a non-empty title element in the head section.", "H25.1.NoTitleEl");
            } else {
                if (/^\s*$/.test(f.innerHTML) === true) {
                    HTMLCS.addMessage(HTMLCS.ERROR, f, "The title element in the head section should be non-empty.", "H25.1.EmptyTitle");
                } else {
                    HTMLCS.addMessage(HTMLCS.NOTICE, f, "Check that the title element describes the document.", "H25.2");
                }
            }
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_3 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        if (a === b) {
            var c = b.querySelector("*[tabindex]");
            if (c) {
                HTMLCS.addMessage(HTMLCS.NOTICE, a, "If tabindex is used, check that the tab order specified by the tabindex attributes follows relationships in the content.", "H4.2");
            }
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_4 = {
    register: function() {
        return [ "a" ];
    },
    process: function(a, b) {
        if (a.hasAttribute("title") === true) {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that the link text combined with programmatically determined link context, or its title attribute, identifies the purpose of the link.", "H77,H78,H79,H80,H81,H33");
        } else {
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that the link text combined with programmatically determined link context identifies the purpose of the link.", "H77,H78,H79,H80,H81");
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_5 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.", "G125,G64,G63,G161,G126,G185");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_6 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that headings and labels describe topic or purpose.", "G130,G131");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_7 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        var c = b.querySelector("input, textarea, button, select, a");
        if (c !== null) {
            HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that there is at least one mode of operation where the keyboard focus indicator can be visually located on user interface controls.", "G149,G165,G195,C15,SCR31");
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_8 = {
    register: function() {
        return [ "link" ];
    },
    process: function(a, b) {
        var c = a.parentNode.nodeName.toLowerCase();
        if (c !== "head") {
            HTMLCS.addMessage(HTMLCS.ERROR, a, "Link elements can only be located in the head section of the document.", "H59.1");
        }
        if (a.hasAttribute("rel") === false || !a.getAttribute("rel") || /^\s*$/.test(a.getAttribute("rel")) === true) {
            HTMLCS.addMessage(HTMLCS.ERROR, a, "Link element is missing a non-empty rel attribute identifying the link type.", "H59.2a");
        }
        if (a.hasAttribute("href") === false || !a.getAttribute("href") || /^\s*$/.test(a.getAttribute("href")) === true) {
            HTMLCS.addMessage(HTMLCS.ERROR, a, "Link element is missing a non-empty href attribute pointing to the resource being linked.", "H59.2b");
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_9 = {
    register: function() {
        return [ "a" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that text of the link describes the purpose of the link.", "H30");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_1 = {
    register: function() {
        return [ "html" ];
    },
    process: function(a, b) {
        if (a.hasAttribute("lang") === false && a.hasAttribute("xml:lang") === false) {
            HTMLCS.addMessage(HTMLCS.ERROR, a, "The html element should have a lang or xml:lang attribute which describes the language of the document.", "H57.2");
        } else {
            if (a.hasAttribute("lang") === true) {
                var c = a.getAttribute("lang");
                if (this.isValidLanguageTag(c) === false) {
                    HTMLCS.addMessage(HTMLCS.ERROR, b, "The language specified in the lang attribute of the document element does not appear to be well-formed.", "H57.3.Lang");
                }
            }
            if (a.hasAttribute("xml:lang") === true) {
                var c = a.getAttribute("xml:lang");
                if (this.isValidLanguageTag(c) === false) {
                    HTMLCS.addMessage(HTMLCS.ERROR, b, "The language specified in the xml:lang attribute of the document element does not appear to be well-formed.", "H57.3.XmlLang");
                }
            }
        }
    },
    isValidLanguageTag: function(a) {
        var b = "^([ix](-[a-z0-9]{1,8})+)$|";
        b += "^[a-z]{2,8}";
        b += "(-[a-z]{3}){0,3}";
        b += "(-[a-z]{4})?";
        b += "(-[a-z]{2}|-[0-9]{3})?";
        b += "(-[0-9][a-z0-9]{3}|-[a-z0-9]{5,8})*";
        b += "(-[a-wy-z0-9](-[a-z0-9]{2,8})+)*";
        b += "(-x(-[a-z0-9]{1,8})+)?$";
        var c = new RegExp(b, "i");
        var d = true;
        if (c.test(a) === false) {
            d = false;
        }
        return d;
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_2 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Ensure that any change in language is marked using the lang and/or xml:lang attribute on an element, as appropriate.", "H58");
        var c = HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_1;
        var d = b.querySelectorAll("*[lang]");
        for (var e = 0; e <= d.length; e++) {
            if (e === d.length) {
                var f = b;
            } else {
                var f = d[e];
            }
            if (!f.documentElement && f.nodeName.toLowerCase() !== "html") {
                if (f.hasAttribute("lang") === true) {
                    var g = f.getAttribute("lang");
                    if (c.isValidLanguageTag(g) === false) {
                        HTMLCS.addMessage(HTMLCS.ERROR, f, "The language specified in the lang attribute of this element does not appear to be well-formed.", "H58.1.Lang");
                    }
                }
                if (f.hasAttribute("xml:lang") === true) {
                    var g = f.getAttribute("xml:lang");
                    if (c.isValidLanguageTag(g) === false) {
                        HTMLCS.addMessage(HTMLCS.ERROR, f, "The language specified in the xml:lang attribute of this element does not appear to be well-formed.", "H58.1.XmlLang");
                    }
                }
            }
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_3 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that there is a mechanism available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.", "H40,H54,H60,G62,G70");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_4 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that a mechanism for identifying the expanded form or meaning of abbreviations is available.", "G102,G55,G62,H28,G97");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_5 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Where the content requires reading ability more advanced than the lower secondary education level, supplemental content or an alternative version should be provided.", "G86,G103,G79,G153,G160");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_1_3_1_6 = {
    register: function() {
        return [ "ruby" ];
    },
    process: function(a, b) {
        var c = a.querySelectorAll("rb");
        var d = a.querySelectorAll("rt");
        if (d.length === 0) {
            if (c.length === 0) {
                HTMLCS.addMessage(HTMLCS.ERROR, a, "Ruby element does not contain an rt element containing pronunciation information for its body text.", "H62.1.HTML5");
            } else {
                HTMLCS.addMessage(HTMLCS.ERROR, a, "Ruby element does not contain an rt element containing pronunciation information for the text inside the rb element.", "H62.1.XHTML11");
            }
        }
        var e = a.querySelectorAll("rp");
        if (e.length === 0) {
            HTMLCS.addMessage(HTMLCS.ERROR, a, "Ruby element does not contain rp elements, which provide extra punctuation to browsers not supporting ruby text.", "H62.2");
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_1 = {
    register: function() {
        return [ "input", "textarea", "button", "select" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that a change of context does not occur when this input field receives focus.", "G107");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_2 = {
    register: function() {
        return [ "form" ];
    },
    process: function(a, b) {
        var c = a.nodeName.toLowerCase();
        if (c === "form") {
            this.checkFormSubmitButton(a);
        }
    },
    checkFormSubmitButton: function(a) {
        var b = a.querySelector("input[type=submit], input[type=image], button[type=submit]");
        if (b === null) {
            HTMLCS.addMessage(HTMLCS.ERROR, a, 'Form does not contain a submit button (input type="submit", input type="image", or button type="submit").', "H32.2");
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_3 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that navigational mechanisms that are repeated on multiple Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.", "G61");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_4 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that components that have the same functionality within this Web page are identified consistently in the set of Web pages to which it belongs.", "G197");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_2_3_2_5 = {
    register: function() {
        return [ "a" ];
    },
    process: function(a, b) {
        var c = a.nodeName.toLowerCase();
        if (c === "a") {
            this.checkNewWindowTarget(a);
        }
    },
    checkNewWindowTarget: function(a) {
        var b = a.hasAttribute("target");
        if (b === true) {
            var c = a.getAttribute("target") || "";
            if (c === "_blank" && /new window/i.test(a.innerHTML) === false) {
                HTMLCS.addMessage(HTMLCS.WARNING, a, "Check that this link's link text contains information indicating that the link will open in a new window.", "H83.3");
            }
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_1 = {
    register: function() {
        return [ "form" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "If an input error is automatically detected in this form, check that the item(s) in error are identified and the error(s) are described to the user in text.", "G83,G84,G85");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_2 = {
    register: function() {
        return [ "form" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that descriptive labels or instructions (including for required fields) are provided for user input in this form.", "G131,G89,G184,H90");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_3 = {
    register: function() {
        return [ "form" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that this form provides suggested corrections to errors in user input, unless it would jeopardize the security or purpose of the content.", "G177");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_4 = {
    register: function() {
        return [ "form" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "If this form would bind a user to a financial or legal commitment, modify/delete user-controllable data, or submit test responses, ensure that submissions are either reversible, checked for input errors, and/or confirmed by the user.", "G98,G99,G155,G164,G168.LegalForms");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_5 = {
    register: function() {
        return [ "form" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that context-sensitive help is available for this form, at a Web-page and/or control level.", "G71,G184,G193");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_6 = {
    register: function() {
        return [ "form" ];
    },
    process: function(a, b) {
        HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that submissions to this form are either reversible, checked for input errors, and/or confirmed by the user.", "G98,G99,G155,G164,G168.AllForms");
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle4_Guideline4_1_4_1_1 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        if (a === b) {
            var c = b.querySelectorAll("*[id]");
            var d = {};
            for (var e = 0; e < c.length; e++) {
                var f = c[e].getAttribute("id");
                if (d[f] !== undefined) {
                    HTMLCS.addMessage(HTMLCS.ERROR, c[e], 'Duplicate id attribute value "' + f + '" found on the web page.', "F77");
                } else {
                    d[f] = true;
                }
            }
        }
    }
};

var HTMLCS_WCAG2AAA_Sniffs_Principle4_Guideline4_1_4_1_2 = {
    register: function() {
        return [ "_top" ];
    },
    process: function(a, b) {
        if (a === b) {
            var c = this.processFormControls(b);
            for (var d = 0; d < c.length; d++) {
                HTMLCS.addMessage(HTMLCS.ERROR, c[d].element, c[d].msg, "H91." + c[d].subcode);
            }
            this.addProcessLinksMessages(b);
        }
    },
    addProcessLinksMessages: function(a) {
        var b = this.processLinks(a);
        for (var c = 0; c < b.empty.length; c++) {
            HTMLCS.addMessage(HTMLCS.WARNING, b.empty[c], "Anchor element found with an ID but without a href or link text. Consider moving its ID to a parent or nearby element.", "H91.A.Empty");
        }
        for (var c = 0; c < b.emptyWithName.length; c++) {
            HTMLCS.addMessage(HTMLCS.WARNING, b.emptyWithName[c], "Anchor element found with a name attribute but without a href or link text. Consider moving the name attribute to become an ID of a parent or nearby element.", "H91.A.EmptyWithName");
        }
        for (var c = 0; c < b.emptyNoId.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.emptyNoId[c], "Anchor element found with no link content and no name and/or ID attribute.", "H91.A.EmptyNoId");
        }
        for (var c = 0; c < b.noHref.length; c++) {
            HTMLCS.addMessage(HTMLCS.WARNING, b.noHref[c], "Anchor elements should not be used for defining in-page link targets. If not using the ID for other purposes (such as CSS or scripting), consider moving it to a parent element.", "H91.A.NoHref");
        }
        for (var c = 0; c < b.placeholder.length; c++) {
            HTMLCS.addMessage(HTMLCS.WARNING, b.placeholder[c], "Anchor element found with link content, but no href, ID or name attribute has been supplied.", "H91.A.Placeholder");
        }
        for (var c = 0; c < b.noContent.length; c++) {
            HTMLCS.addMessage(HTMLCS.ERROR, b.noContent[c], "Anchor element found with a valid href attribute, but no link content has been supplied.", "H91.A.NoContent");
        }
    },
    processLinks: function(a) {
        var b = {
            empty: [],
            emptyWithName: [],
            emptyNoId: [],
            noHref: [],
            placeholder: [],
            noContent: []
        };
        var c = a.querySelectorAll("a");
        for (var d = 0; d < c.length; d++) {
            var e = c[d];
            var f = false;
            var g = false;
            var h = HTMLCS.util.getElementTextContent(e);
            if (e.hasAttribute("title") === true && /^\s*$/.test(e.getAttribute("title")) === false) {
                f = true;
            } else if (/^\s*$/.test(h) === false) {
                f = true;
            }
            if (e.hasAttribute("href") === true && /^\s*$/.test(e.getAttribute("href")) === false) {
                g = true;
            }
            if (g === false) {
                if (/^\s*$/.test(h) === true) {
                    if (e.hasAttribute("id") === true) {
                        b.empty.push(e);
                    } else if (e.hasAttribute("name") === true) {
                        b.emptyWithName.push(e);
                    } else {
                        b.emptyNoId.push(e);
                    }
                } else {
                    if (e.hasAttribute("id") === true || e.hasAttribute("name") === true) {
                        b.noHref.push(e);
                    } else {
                        b.placeholder.push(e);
                    }
                }
            } else {
                if (f === false) {
                    if (e.querySelectorAll("img").length === 0) {
                        b.noContent.push(e);
                    }
                }
            }
        }
        return b;
    },
    processFormControls: function(a) {
        var b = a.querySelectorAll("button, fieldset, input, select, textarea");
        var c = [];
        var d = {
            button: [ "@title", "_content" ],
            fieldset: [ "legend" ],
            input_button: [ "@value" ],
            input_text: [ "label", "@title" ],
            input_file: [ "label", "@title" ],
            input_password: [ "label", "@title" ],
            input_checkbox: [ "label", "@title" ],
            input_radio: [ "label", "@title" ],
            input_image: [ "@alt", "@title" ],
            select: [ "label", "@title" ],
            textarea: [ "label", "@title" ]
        };
        var e = {
            select: "option_selected"
        };
        for (var f = 0; f < b.length; f++) {
            var g = b[f];
            var h = g.nodeName.toLowerCase();
            var i = g.nodeName.substr(0, 1).toUpperCase() + g.nodeName.substr(1).toLowerCase();
            if (h === "input") {
                if (g.hasAttribute("type") === false) {
                    h += "_text";
                } else {
                    h += "_" + g.getAttribute("type").toLowerCase();
                }
                if (h === "input_submit" || h === "input_reset") {
                    h = "input_button";
                }
                var i = "Input" + h.substr(6, 1).toUpperCase() + h.substr(7).toLowerCase();
            }
            var j = d[h];
            var k = e[h];
            if (j) {
                for (var l = 0; l < d[h].length; l++) {
                    var j = d[h][l];
                    if (j === "_content") {
                        var m = HTMLCS.util.getElementTextContent(g);
                        if (/^\s*$/.test(m) === false) {
                            break;
                        }
                    } else if (j === "label") {
                        if (g.hasAttribute("id") && /^\s*$/.test(g.getAttribute("id")) === false) {
                            if (/^\-?[A-Za-z][A-Za-z0-9\-_]*$/.test(g.getAttribute("id")) === true) {
                                var n = a.querySelector("label[for=" + g.getAttribute("id") + "]");
                                if (n !== null) {
                                    break;
                                }
                            } else {
                                var o = a.getElementsByTagName("label");
                                var p = false;
                                for (var q = 0; q < o.length; q++) {
                                    if (o[q].hasAttribute("for") === true && o[q].getAttribute("for") === g.getAttribute("id")) {
                                        p = true;
                                        break;
                                    }
                                }
                                if (p === true) {
                                    break;
                                }
                            }
                        }
                    } else if (j.charAt(0) === "@") {
                        j = j.substr(1, j.length);
                        if (g.hasAttribute(j) === true && /^\s*$/.test(g.getAttribute(j)) === false) {
                            break;
                        }
                    } else {
                        var r = g.querySelector(j);
                        if (r !== null) {
                            var m = HTMLCS.util.getElementTextContent(r);
                            if (/^\s*$/.test(m) === false) {
                                break;
                            }
                        }
                    }
                }
                if (l === d[h].length) {
                    var s = h + " element";
                    if (h.substr(0, 6) === "input_") {
                        s = h.substr(6) + " input element";
                    }
                    var t = d[h].slice(0, d[h].length);
                    for (var u = 0; u < t.length; u++) {
                        if (t[u] === "_content") {
                            t[u] = "element content";
                        } else if (t[u].charAt(0) === "@") {
                            t[u] = t[u].substr(1) + " attribute";
                        } else {
                            t[u] = t[u] + " element";
                        }
                    }
                    var v = "This " + s + " does not have a name available to an accessibility API. Valid names are: " + t.join(", ") + ".";
                    c.push({
                        element: g,
                        msg: v,
                        subcode: i + ".Name"
                    });
                }
            }
            var k = e[h];
            var w = false;
            if (k === undefined) {
                w = true;
            } else if (k === "_content") {
                var m = HTMLCS.util.getElementTextContent(g);
                if (/^\s*$/.test(m) === false) {
                    w = true;
                }
            } else if (k === "option_selected") {
                if (g.hasAttribute("multiple") === false) {
                    var x = g.querySelector("option[selected]");
                    if (x !== null) {
                        w = true;
                    }
                } else {
                    w = true;
                }
            } else if (k.charAt(0) === "@") {
                k = k.substr(1, k.length);
                if (g.hasAttribute(k) === true) {
                    w = true;
                }
            }
            if (w === false) {
                var s = h + " element";
                if (h.substr(0, 6) === "input_") {
                    s = h.substr(6) + " input element";
                }
                var y = "";
                if (k === "_content") {
                    y = "by adding content to the element";
                } else if (k === "option_selected") {
                    y = 'by adding a "selected" attribute to one of its options';
                } else if (k.charAt(0) === "@") {
                    y = "using the " + k + " attribute";
                } else {
                    y = "using the " + k + " element";
                }
                var v = "This " + s + " does not have a value available to an accessibility API. Add one " + y + ".";
                c.push({
                    element: g,
                    msg: v,
                    subcode: i + ".Value"
                });
            }
        }
        return c;
    }
};

window.HTMLCS_WCAG2AAA = {
    name: "WCAG2AAA",
    description: "Web Content Accessibility Guidelines (WCAG) 2.0 AAA",
    sniffs: [ "Principle1.Guideline1_1.1_1_1", "Principle1.Guideline1_2.1_2_1", "Principle1.Guideline1_2.1_2_2", "Principle1.Guideline1_2.1_2_4", "Principle1.Guideline1_2.1_2_5", "Principle1.Guideline1_2.1_2_6", "Principle1.Guideline1_2.1_2_7", "Principle1.Guideline1_2.1_2_8", "Principle1.Guideline1_2.1_2_9", "Principle1.Guideline1_3.1_3_1", "Principle1.Guideline1_3.1_3_1_AAA", "Principle1.Guideline1_3.1_3_2", "Principle1.Guideline1_3.1_3_3", "Principle1.Guideline1_4.1_4_1", "Principle1.Guideline1_4.1_4_2", "Principle1.Guideline1_4.1_4_3_F24", "Principle1.Guideline1_4.1_4_3_Contrast", "Principle1.Guideline1_4.1_4_6", "Principle1.Guideline1_4.1_4_7", "Principle1.Guideline1_4.1_4_8", "Principle1.Guideline1_4.1_4_9", "Principle2.Guideline2_1.2_1_1", "Principle2.Guideline2_1.2_1_2", "Principle2.Guideline2_2.2_2_2", "Principle2.Guideline2_2.2_2_3", "Principle2.Guideline2_2.2_2_4", "Principle2.Guideline2_2.2_2_5", "Principle2.Guideline2_3.2_3_2", "Principle2.Guideline2_4.2_4_1", "Principle2.Guideline2_4.2_4_2", "Principle2.Guideline2_4.2_4_3", "Principle2.Guideline2_4.2_4_5", "Principle2.Guideline2_4.2_4_6", "Principle2.Guideline2_4.2_4_7", "Principle2.Guideline2_4.2_4_8", "Principle2.Guideline2_4.2_4_9", "Principle3.Guideline3_1.3_1_1", "Principle3.Guideline3_1.3_1_2", "Principle3.Guideline3_1.3_1_3", "Principle3.Guideline3_1.3_1_4", "Principle3.Guideline3_1.3_1_5", "Principle3.Guideline3_1.3_1_6", "Principle3.Guideline3_2.3_2_1", "Principle3.Guideline3_2.3_2_2", "Principle3.Guideline3_2.3_2_3", "Principle3.Guideline3_2.3_2_4", "Principle3.Guideline3_2.3_2_5", "Principle3.Guideline3_3.3_3_1", "Principle3.Guideline3_3.3_3_2", "Principle3.Guideline3_3.3_3_3", "Principle3.Guideline3_3.3_3_5", "Principle3.Guideline3_3.3_3_6", "Principle4.Guideline4_1.4_1_1", "Principle4.Guideline4_1.4_1_2" ],
    getMsgInfo: function(a) {
        var b = {
            Principle1: {
                name: "Perceivable",
                link: "http://www.w3.org/TR/WCAG20/#perceivable"
            },
            Principle2: {
                name: "Operable",
                link: "http://www.w3.org/TR/WCAG20/#operable"
            },
            Principle3: {
                name: "Understandable",
                link: "http://www.w3.org/TR/WCAG20/#understandable"
            },
            Principle4: {
                name: "Robust",
                link: "http://www.w3.org/TR/WCAG20/#robust"
            }
        };
        var c = a.split(".", 5);
        var d = c[1];
        var e = c[4].split(",");
        var f = [];
        for (var g = 0; g < e.length; g++) {
            e[g] = e[g].split(".");
            f.push('<a href="http://www.w3.org/TR/WCAG20-TECHS/' + e[g][0] + '" target="_blank">' + e[g][0] + "</a>");
        }
        var h = [ '<a href="', b[d].link, '" target="_blank">', b[d].name, "</a>" ].join("");
        var i = [ [ "Principle", h ], [ "Techniques", f.join(" ") ] ];
        return i;
    }
};

var HTMLCS = new function() {
    var a = {};
    var b = [];
    var c = {};
    var d = null;
    var e = null;
    var f = [];
    var g = {};
    this.ERROR = 1;
    this.WARNING = 2;
    this.NOTICE = 3;
    this.process = function(e, f, g) {
        a = {};
        b = [];
        c = {};
        d = null;
        if (!f) {
            return false;
        }
        if (a[p(e)]) {
            HTMLCS.run(g, f);
        } else {
            this.loadStandard(e, function() {
                HTMLCS.run(g, f);
            });
        }
    };
    this.loadStandard = function(a, b) {
        if (!a) {
            return false;
        }
        j(a, function() {
            d = a;
            b.call(this);
        });
    };
    this.run = function(a, b) {
        var c = null;
        var d = false;
        if (typeof b === "string") {
            d = true;
            var e = document.createElement("iframe");
            e.style.display = "none";
            e = document.body.insertBefore(e, null);
            if (e.contentDocument) {
                c = e.contentDocument;
            } else if (c.contentWindow) {
                c = e.contentWindow.document;
            }
            e.load = function() {
                this.onreadystatechange = null;
                this.onload = null;
                if (HTMLCS.isFullDoc(b) === false) {
                    c = c.getElementsByTagName("body")[0];
                    var d = c.getElementsByTagName("div")[0];
                    if (d && d.id === "__HTMLCS-source-wrap") {
                        d.id = "";
                        c = d;
                    }
                }
                var e = t(c);
                e.unshift(c);
                h(e, c, a);
            };
            e.onreadystatechange = function() {
                if (/^(complete|loaded)$/.test(this.readyState) === true) {
                    this.onreadystatechange = null;
                    this.load();
                }
            };
            e.onload = e.load;
            if (HTMLCS.isFullDoc(b) === false && b.indexOf("<body") === -1) {
                c.write('<div id="__HTMLCS-source-wrap">' + b + "</div>");
            } else {
                c.write(b);
            }
            c.close();
        } else {
            c = b;
        }
        if (!c) {
            a.call(this);
            return;
        }
        a = a || function() {};
        f = [];
        var g = t(c);
        g.unshift(c);
        if (d === false) {
            h(g, c, a);
        }
    };
    this.isFullDoc = function(a) {
        var b = false;
        if (typeof a === "string") {
            if (a.toLowerCase().indexOf("<html") !== -1) {
                b = true;
            } else if (a.toLowerCase().indexOf("<head") !== -1 && a.toLowerCase().indexOf("<body") !== -1) {
                b = true;
            }
        } else {
            if (a.nodeName.toLowerCase() === "html" || a.documentElement) {
                b = true;
            }
        }
        return b;
    };
    this.addMessage = function(a, b, c, d, e) {
        d = r(d);
        f.push({
            type: a,
            element: b,
            msg: g[d] || c,
            code: d,
            data: e
        });
    };
    this.getMessages = function() {
        return f.concat([]);
    };
    var h = function(a, b, d) {
        var e = [];
        while (a.length > 0) {
            var g = a.shift();
            if (g === b) {
                var h = "_top";
            } else {
                var h = g.tagName.toLowerCase();
            }
            for (var j = 0; j < e.length; ) {
                if (g === e[j].element) {
                    f.push(e[j]);
                    e.splice(j, 1);
                } else {
                    j++;
                }
            }
            if (c[h] && c[h].length > 0) {
                i(g, c[h].concat([]), b);
                if (h === "_top") {
                    e = f;
                    f = [];
                }
            }
        }
        if (d instanceof Function === true) {
            d.call(this);
        }
    };
    var i = function(a, b, c, d) {
        while (b.length > 0) {
            var f = b.shift();
            e = f;
            if (f.useCallback === true) {
                f.process(a, c, function() {
                    i(a, b, c);
                    b = [];
                });
            } else {
                f.process(a, c);
            }
        }
        if (d instanceof Function === true) {
            d.call(this);
        }
    };
    var j = function(a, b, c) {
        if (a.indexOf("http") !== 0) {
            a = p(a);
        }
        var d = a.split("/");
        var e = window["HTMLCS_" + d[d.length - 2]];
        if (e) {
            k(a, b, c);
        } else {
            s(a, function() {
                k(a, b, c);
            });
        }
    };
    var k = function(b, c, d) {
        var e = b.split("/");
        var f = window["HTMLCS_" + e[e.length - 2]];
        var g = {};
        for (var h in f) {
            if (f.hasOwnProperty(h) === true) {
                g[h] = f[h];
            }
        }
        if (!g) {
            return false;
        }
        a[b] = g;
        if (d) {
            if (d.include && d.include.length > 0) {
                g.sniffs = d.include;
            } else if (d.exclude) {
                for (var i = 0; i < d.exclude.length; i++) {
                    var j = g.sniffs.find(d.exclude[i]);
                    if (j >= 0) {
                        g.sniffs.splice(j, 1);
                    }
                }
            }
        }
        var k = g.sniffs.slice(0, g.sniffs.length);
        l(b, k, c);
    };
    var l = function(a, b, c) {
        if (b.length === 0) {
            c.call(this);
            return;
        }
        var d = b.shift();
        m(a, d, function() {
            l(a, b, c);
        });
    };
    var m = function(a, b, c) {
        if (typeof b === "string") {
            var d = q(a, b);
            var e = function() {
                n(a, b);
                c.call(this);
            };
            if (d) {
                e();
            } else {
                s(o(a, b), e);
            }
        } else {
            j(b.standard, function() {
                if (b.messages) {
                    for (var a in b.messages) {
                        g[a] = b.messages[a];
                    }
                }
                c.call(this);
            }, {
                exclude: b.exclude,
                include: b.include
            });
        }
    };
    var n = function(a, d) {
        var e = q(a, d);
        if (!e) {
            return false;
        }
        if (e.register) {
            var f = e.register();
        }
        if (f && f.length > 0) {
            for (var g = 0; g < f.length; g++) {
                if (!c[f[g]]) {
                    c[f[g]] = [];
                }
                c[f[g]].push(e);
            }
        }
        b.push(e);
    };
    var o = function(a, b) {
        var c = a.split("/");
        c.pop();
        var d = c.join("/") + "/Sniffs/" + b.replace(/\./g, "/") + ".js";
        return d;
    };
    var p = function(a) {
        var b = document.getElementsByTagName("script");
        var c = null;
        for (var d = 0; d < b.length; d++) {
            if (b[d].src) {
                if (b[d].src.match(/HTMLCS\.js/)) {
                    c = b[d].src.replace(/HTMLCS\.js/, "");
                    break;
                }
            }
        }
        return c + "Standards/" + a + "/ruleset.js";
    };
    var q = function(b, c) {
        var d = "HTMLCS_";
        d += a[b].name + "_Sniffs_";
        d += c.split(".").join("_");
        if (!window[d]) {
            return null;
        }
        window[d]._name = c;
        return window[d];
    };
    var r = function(a) {
        a = d + "." + e._name + "." + a;
        return a;
    };
    var s = function(a, b) {
        var c = document.createElement("script");
        c.onload = function() {
            c.onload = null;
            c.onreadystatechange = null;
            b.call(this);
        };
        c.onreadystatechange = function() {
            if (/^(complete|loaded)$/.test(this.readyState) === true) {
                c.onreadystatechange = null;
                c.onload();
            }
        };
        c.src = a;
        if (document.head) {
            document.head.appendChild(c);
        } else {
            document.getElementsByTagName("head")[0].appendChild(c);
        }
    };
    var t = function(a) {
        a = a || document;
        var b = a.getElementsByTagName("*");
        var c = [];
        for (var d = 0; d < b.length; d++) {
            c.push(b[d]);
        }
        return c;
    };
    this.util = new function() {
        this.trim = function(a) {
            return a.replace(/^\s*(.*)\s*$/g, "$1");
        };
        this.isStringEmpty = function(a) {
            if (typeof a !== "string") {
                return true;
            }
            var b = true;
            if (a.indexOf(String.fromCharCode(160)) !== -1) {
                b = false;
            } else if (/^\s*$/.test(a) === false) {
                b = false;
            }
            return b;
        };
        this.getElementWindow = function(a) {
            if (a.ownerDocument) {
                var b = a.ownerDocument;
            } else {
                var b = a;
            }
            var c = null;
            if (b.defaultView) {
                c = b.defaultView;
            } else {
                c = b.parentWindow;
            }
            return c;
        };
        this.style = function(a) {
            var b = null;
            var c = this.getElementWindow(a);
            if (a.currentStyle) {
                b = a.currentStyle;
            } else if (c.getComputedStyle) {
                b = c.getComputedStyle(a, null);
            }
            return b;
        };
        this.isHidden = function(a) {
            var b = false;
            var c = this.style(a);
            if (c !== null) {
                if (c.visibility === "hidden" || c.display === "none") {
                    b = true;
                }
                if (parseInt(c.left, 10) + parseInt(c.width, 10) < 0) {
                    b = true;
                }
                if (parseInt(c.top, 10) + parseInt(c.height, 10) < 0) {
                    b = true;
                }
            }
            return b;
        };
        this.isInDocument = function(a) {
            var b = a.parentNode;
            while (b && b.ownerDocument) {
                b = b.parentNode;
            }
            if (b === null) {
                return false;
            }
            return true;
        };
        this.contains = function(a, b) {
            var c = false;
            if (a !== b) {
                if (!a.ownerDocument) {
                    if (b.ownerDocument && b.ownerDocument === a) {
                        c = true;
                    }
                } else {
                    if (a.contains && a.contains(b) === true) {
                        c = true;
                    } else if (a.compareDocumentPosition && (a.compareDocumentPosition(b) & 16) > 0) {
                        c = true;
                    }
                }
            }
            return c;
        };
        this.isLayoutTable = function(a) {
            var b = a.querySelector("th");
            if (b === null) {
                return true;
            }
            return false;
        };
        this.contrastRatio = function(a, b) {
            var c = (.05 + this.relativeLum(a)) / (.05 + this.relativeLum(b));
            if (c < 1) {
                c = 1 / c;
            }
            return c;
        };
        this.relativeLum = function(a) {
            if (a.charAt) {
                var a = this.colourStrToRGB(a);
            }
            var b = {};
            for (var c in a) {
                if (a[c] <= .03928) {
                    b[c] = a[c] / 12.92;
                } else {
                    b[c] = Math.pow((a[c] + .055) / 1.055, 2.4);
                }
            }
            var d = b.red * .2126 + b.green * .7152 + b.blue * .0722;
            return d;
        };
        this.colourStrToRGB = function(a) {
            a = a.toLowerCase();
            if (a.substring(0, 3) === "rgb") {
                var b = /^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)([^)]*)\)$/.exec(a);
                a = {
                    red: b[1] / 255,
                    green: b[2] / 255,
                    blue: b[3] / 255
                };
            } else {
                if (a.charAt(0) === "#") {
                    a = a.substr(1);
                }
                if (a.length === 3) {
                    a = a.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3");
                }
                a = {
                    red: parseInt(a.substr(0, 2), 16) / 255,
                    green: parseInt(a.substr(2, 2), 16) / 255,
                    blue: parseInt(a.substr(4, 2), 16) / 255
                };
            }
            return a;
        };
        this.RGBtoColourStr = function(a) {
            colourStr = "#";
            a.red = Math.round(a.red * 255);
            a.green = Math.round(a.green * 255);
            a.blue = Math.round(a.blue * 255);
            if (a.red % 17 === 0 && a.green % 17 === 0 && a.blue % 17 === 0) {
                colourStr += (a.red / 17).toString(16);
                colourStr += (a.green / 17).toString(16);
                colourStr += (a.blue / 17).toString(16);
            } else {
                if (a.red < 16) {
                    colourStr += "0";
                }
                colourStr += a.red.toString(16);
                if (a.green < 16) {
                    colourStr += "0";
                }
                colourStr += a.green.toString(16);
                if (a.blue < 16) {
                    colourStr += "0";
                }
                colourStr += a.blue.toString(16);
            }
            return colourStr;
        };
        this.sRGBtoHSV = function(a) {
            if (a.charAt) {
                a = this.colourStrToRGB(a);
            }
            var b = {
                hue: 0,
                saturation: 0,
                value: 0
            };
            var c = Math.max(a.red, a.green, a.blue);
            var d = Math.min(a.red, a.green, a.blue);
            var e = c - d;
            if (e === 0) {
                b.value = a.red;
            } else {
                b.value = c;
                if (c === a.red) {
                    b.hue = (a.green - a.blue) / e;
                } else if (c === a.green) {
                    b.hue = 2 + (a.blue - a.red) / e;
                } else {
                    b.hue = 4 + (a.red - a.green) / e;
                }
                b.hue = b.hue * 60;
                if (b.hue >= 360) {
                    b.hue -= 360;
                }
                b.saturation = e / b.value;
            }
            return b;
        };
        this.HSVtosRGB = function(a) {
            var b = {
                red: 0,
                green: 0,
                blue: 0
            };
            if (a.saturation === 0) {
                b.red = a.value;
                b.green = a.value;
                b.blue = a.value;
            } else {
                var c = a.value * a.saturation;
                var d = a.value - c;
                var e = a.hue / 60;
                var f = e - 2 * Math.floor(e / 2);
                var g = c * (1 - Math.abs(f - 1));
                switch (Math.floor(e)) {
                  case 0:
                    b.red = c;
                    b.green = g;
                    break;

                  case 1:
                    b.green = c;
                    b.red = g;
                    break;

                  case 2:
                    b.green = c;
                    b.blue = g;
                    break;

                  case 3:
                    b.blue = c;
                    b.green = g;
                    break;

                  case 4:
                    b.blue = c;
                    b.red = g;
                    break;

                  case 5:
                    b.red = c;
                    b.blue = g;
                    break;
                }
                b.red = b.red + d;
                b.green = b.green + d;
                b.blue = b.blue + d;
            }
            return b;
        };
        this.getElementTextContent = function(a, b) {
            if (b === undefined) {
                b = true;
            }
            var a = a.cloneNode(true);
            var c = [];
            for (var d = 0; d < a.childNodes.length; d++) {
                c.push(a.childNodes[d]);
            }
            var e = [];
            while (c.length > 0) {
                var f = c.shift();
                if (f.nodeType === 1) {
                    if (f.nodeName.toLowerCase() === "img") {
                        if (b === true && f.hasAttribute("alt") === true) {
                            e.push(f.getAttribute("alt"));
                        }
                    } else {
                        for (var d = 0; d < f.childNodes.length; d++) {
                            c.push(f.childNodes[d]);
                        }
                    }
                } else if (f.nodeType === 3) {
                    e.push(f.nodeValue);
                }
            }
            e = e.join("").replace(/^\s+|\s+$/g, "");
            return e;
        };
        this.testTableHeaders = function(a) {
            var b = {
                required: true,
                used: false,
                correct: true,
                allowScope: true,
                missingThId: [],
                missingTd: [],
                wrongHeaders: []
            };
            var c = a.getElementsByTagName("tr");
            var d = {};
            var e = [];
            var f = {
                rows: [],
                cols: []
            };
            var g = {
                rows: 0,
                cols: 0
            };
            var h = false;
            for (var i = 0; i < c.length; i++) {
                var j = c[i];
                var k = 0;
                for (var l = 0; l < j.childNodes.length; l++) {
                    var m = j.childNodes[l];
                    if (m.nodeType === 1) {
                        if (e[i]) {
                            while (e[i][0] === k) {
                                e[i].shift();
                                k++;
                            }
                        }
                        var n = m.nodeName.toLowerCase();
                        var o = Number(m.getAttribute("rowspan")) || 1;
                        var p = Number(m.getAttribute("colspan")) || 1;
                        if (o > 1) {
                            for (var q = i + 1; q < i + o; q++) {
                                if (!e[q]) {
                                    e[q] = [];
                                }
                                for (var r = k; r < k + p; r++) {
                                    e[q].push(r);
                                }
                            }
                        }
                        if (n === "th") {
                            var s = m.getAttribute("id") || "";
                            if (s === "") {
                                b.correct = false;
                                b.missingThId.push(m);
                            }
                            if (o > 1 && p > 1) {
                                b.allowScope = false;
                            } else if (b.allowScope === true) {
                                if (f.cols[k] === undefined) {
                                    f.cols[k] = 0;
                                }
                                if (f.rows[i] === undefined) {
                                    f.rows[i] = 0;
                                }
                                f.rows[i] += p;
                                f.cols[k] += o;
                            }
                        } else if (n === "td") {
                            if (m.hasAttribute("headers") === true && /^\s*$/.test(m.getAttribute("headers")) === false) {
                                b.used = true;
                            }
                        }
                        k += p;
                    }
                }
            }
            for (var q = 0; q < f.rows.length; q++) {
                if (f.rows[q] > 1) {
                    g.rows++;
                }
            }
            for (var q = 0; q < f.cols.length; q++) {
                if (f.cols[q] > 1) {
                    g.cols++;
                }
            }
            if (g.rows > 1 || g.cols > 1) {
                b.allowScope = false;
            } else if (b.allowScope === true && (g.rows === 0 || g.cols === 0)) {
                b.required = false;
            }
            var t = HTMLCS.util.getCellHeaders(a);
            for (var q = 0; q < t.length; q++) {
                var m = t[q].cell;
                var u = t[q].headers;
                if (m.hasAttribute("headers") === false) {
                    b.correct = false;
                    b.missingTd.push(m);
                } else {
                    var v = (m.getAttribute("headers") || "").split(/\s+/);
                    if (v.length === 0) {
                        b.correct = false;
                        b.missingTd.push(m);
                    } else {
                        v = " " + v.sort().join(" ") + " ";
                        v = v.replace(/\s+/g, " ").replace(/(\w+\s)\1+/g, "$1").replace(/^\s*(.*?)\s*$/g, "$1");
                        if (u !== v) {
                            b.correct = false;
                            var w = {
                                element: m,
                                expected: u,
                                actual: m.getAttribute("headers") || ""
                            };
                            b.wrongHeaders.push(w);
                        }
                    }
                }
            }
            return b;
        };
        this.getCellHeaders = function(a) {
            if (typeof a !== "object") {
                return null;
            } else if (a.nodeName.toLowerCase() !== "table") {
                return null;
            }
            var b = a.getElementsByTagName("tr");
            var c = [];
            var d = {
                rows: {},
                cols: {}
            };
            var e = [];
            var f = [ "th", "td" ];
            for (var g = 0; g < f.length; g++) {
                var h = f[g];
                for (var i = 0; i < b.length; i++) {
                    var j = b[i];
                    var k = 0;
                    for (var l = 0; l < j.childNodes.length; l++) {
                        var m = j.childNodes[l];
                        if (m.nodeType === 1) {
                            if (c[i]) {
                                while (c[i][0] === k) {
                                    c[i].shift();
                                    k++;
                                }
                            }
                            var n = m.nodeName.toLowerCase();
                            var o = Number(m.getAttribute("rowspan")) || 1;
                            var p = Number(m.getAttribute("colspan")) || 1;
                            if (o > 1) {
                                for (var q = i + 1; q < i + o; q++) {
                                    if (!c[q]) {
                                        c[q] = [];
                                    }
                                    for (var r = k; r < k + p; r++) {
                                        c[q].push(r);
                                    }
                                }
                            }
                            if (n === h) {
                                if (n === "th") {
                                    var s = m.getAttribute("id") || "";
                                    for (var q = i; q < i + o; q++) {
                                        d.rows[q] = d.rows[q] || {
                                            first: k,
                                            ids: []
                                        };
                                        d.rows[q].ids.push(s);
                                    }
                                    for (var q = k; q < k + p; q++) {
                                        d.cols[q] = d.cols[q] || {
                                            first: i,
                                            ids: []
                                        };
                                        d.cols[q].ids.push(s);
                                    }
                                } else if (n === "td") {
                                    var t = [];
                                    for (var q = i; q < i + o; q++) {
                                        for (var r = k; r < k + p; r++) {
                                            if (d.rows[q] && r >= d.rows[q].first) {
                                                t = t.concat(d.rows[q].ids);
                                            }
                                            if (d.cols[r] && q >= d.cols[r].first) {
                                                t = t.concat(d.cols[r].ids);
                                            }
                                        }
                                    }
                                    if (t.length > 0) {
                                        t = " " + t.sort().join(" ") + " ";
                                        t = t.replace(/\s+/g, " ").replace(/(\w+\s)\1+/g, "$1").replace(/^\s*(.*?)\s*$/g, "$1");
                                        e.push({
                                            cell: m,
                                            headers: t
                                        });
                                    }
                                }
                            }
                            k += p;
                        }
                    }
                }
            }
            return e;
        };
    }();
}();

var HTMLCSAuditor = new function() {
    var a = "HTMLCS-";
    var b = "";
    var c = "";
    var d = [];
    var e = {};
    var f = null;
    var g = [];
    var h = 1;
    var j = null;
    var k = this;
    this.pointerContainer = null;
    function l(a) {
        return a >= 0 && a < 10 ? "0" + a : a + "";
    }
    function m() {
        var a = new Date();
        var b = [ [ l(a.getDate()), l(a.getMonth() + 1), a.getFullYear() ].join("/"), [ l(a.getHours()), l(a.getMinutes()) ].join(":"), a.getHours() >= 12 ? "PM" : "AM" ].join(" ");
        return b;
    }
    var n = function(b, c, d, e) {
        var g = f.createElement("div");
        g.id = b;
        g.className = a + "button";
        g.setAttribute("title", d);
        var h = f.createElement("span");
        h.className = a + "button-icon " + a + "button-" + c;
        g.appendChild(h);
        var i = f.createTextNode(String.fromCharCode(160));
        g.appendChild(i);
        if (e instanceof Function === true) {
            g.onclick = function() {
                if (/disabled/.test(g.className) === false) {
                    e(g);
                }
            };
        }
        return g;
    };
    var o = function(b, c, d, e, g) {
        if (d === undefined) {
            d = false;
        }
        var h = f.createElement("label");
        var i = "";
        h.className = a + "checkbox";
        i += '<span class="' + a + 'checkbox-switch">';
        i += '<span class="' + a + 'checkbox-slider"></span>';
        i += '<input id="' + b + '" type="checkbox"';
        if (d === true) {
            i += ' checked="checked"';
            h.className += " active";
        }
        if (e === true) {
            i += ' disabled="disabled"';
            h.className += " disabled";
        }
        i += ' title="' + c + '" /></span>';
        h.innerHTML = i;
        var j = h.getElementsByTagName("input")[0];
        h.onclick = function(a) {
            if (e === false) {
                j.checked = !j.checked;
                if (j.checked === true) {
                    h.className += " active";
                } else {
                    h.className = h.className.replace("active", "");
                }
                if (g instanceof Function === true) {
                    g(j);
                }
            }
            return false;
        };
        return h;
    };
    var p = function(b, c, d, e) {
        if (e === undefined) {
            e = false;
        }
        var g = f.createElement("label");
        g.className = a + "radio";
        var h = '<span class="' + a + 'radio-title">' + d + "</span>";
        h += '<span class="' + a + 'radio-switch">';
        h += '<span class="' + a + 'radio-slider"></span>';
        h += '<input type="radio" name="' + a + b + '" ';
        h += 'class="' + a + 'radiobtn"';
        h += 'value="' + c + '"';
        if (e === true) {
            h += ' checked="true"';
        }
        h += " /></span>";
        g.innerHTML = h;
        return g;
    };
    var q = function(b, c) {
        var d = f.createElement("div");
        d.className = a + "header";
        d.innerHTML = "HTML_CodeSniffer by Squiz";
        d.setAttribute("title", "Using standard " + b);
        var e = false;
        var g = 0;
        var h = 0;
        var i = 0;
        var j = 0;
        d.onmousedown = function(a) {
            a = a || window.event;
            console.log("dragging 1");
            window.dragHandle = c;
            window.mouseX = a.clientX;
            window.mouseY = a.clientY;
            return false;
        };
        f.onmousemove = function(a) {
            r(a);
        };
        f.onmouseup = function(a) {
            window.dragHandle = undefined;
        };
        var l = f.createElement("div");
        l.className = a + "close";
        l.setAttribute("title", "Close");
        l.onmousedown = function() {
            k.close.call(k);
        };
        d.appendChild(l);
        return d;
    };
    var r = function(a) {
        a = a || window.event;
        if (window.dragHandle !== undefined) {
            var b = window.dragHandle;
            console.log("dragging");
            var c = window.mouseX;
            var d = window.mouseY;
            var e = b.offsetTop;
            var f = b.offsetLeft;
            if (d < a.clientY) {
                e += a.clientY - d;
                b.style.top = e + "px";
            } else if (d > a.clientY) {
                e -= d - a.clientY;
                b.style.top = e + "px";
            }
            if (c < a.clientX) {
                f += a.clientX - c;
                b.style.left = f + "px";
            } else if (c > a.clientX) {
                f -= c - a.clientX;
                b.style.left = f + "px";
            }
            window.mouseX = a.clientX;
            window.mouseY = a.clientY;
        }
    };
    var s = function(b, g, h) {
        var i = f.createElement("div");
        i.className = a + "summary";
        var j = f.createElement("div");
        j.className = a + "summary-left";
        i.appendChild(j);
        var l = f.createElement("div");
        l.className = a + "summary-right";
        i.appendChild(l);
        var m = [];
        var n = ', &#160;<span class="' + a + 'divider"></span>';
        if (b > 0) {
            var o = "Errors";
            if (b === 1) {
                o = "Error";
            }
            m.push("<strong>" + b + "</strong> " + o);
        }
        if (g > 0) {
            var o = "Warnings";
            if (g === 1) {
                o = "Warning";
            }
            m.push("<strong>" + g + "</strong> " + o);
        }
        if (h > 0) {
            var o = "Notices";
            if (h === 1) {
                o = "Notice";
            }
            m.push("<strong>" + h + "</strong> " + o);
        }
        var p = f.createElement("ol");
        p.className = a + "lineage";
        var q = f.createElement("li");
        q.className = a + "lineage-item";
        var r = f.createElement("a");
        r.className = a + "lineage-link";
        r.href = "javascript:";
        var s = f.createElement("span");
        s.innerHTML = "Home";
        r.appendChild(s);
        r.onmousedown = function() {
            k.run(c, d, e);
        };
        var t = f.createElement("li");
        t.className = a + "lineage-item";
        t.innerHTML = m.join(n);
        q.appendChild(r);
        p.appendChild(q);
        p.appendChild(t);
        j.appendChild(p);
        l.appendChild(f.createTextNode(String.fromCharCode(160)));
        return i;
    };
    var t = function(b, h) {
        var i = f.createElement("div");
        i.className = a + "summary-detail";
        var j = f.createElement("div");
        j.className = a + "summary-left";
        var l = f.createElement("div");
        l.className = a + "summary-right";
        var m = f.createElement("ol");
        m.className = a + "lineage";
        var o = f.createElement("li");
        o.className = a + "lineage-item";
        var p = f.createElement("a");
        p.className = a + "lineage-link";
        p.href = "javascript:";
        var q = f.createElement("span");
        q.innerHTML = "Home";
        p.appendChild(q);
        p.onmousedown = function() {
            k.run(c, d, e);
        };
        var r = f.createElement("li");
        r.className = a + "lineage-item";
        var s = f.createElement("a");
        s.className = a + "lineage-link";
        s.href = "javascript:";
        s.innerHTML = "Report";
        s.setAttribute("title", "Back to Report");
        s.onmousedown = function() {
            var a = f.querySelectorAll(".HTMLCS-inner-wrapper")[0];
            a.style.marginLeft = "0px";
            a.style.maxHeight = null;
            i.style.display = "none";
            var b = f.querySelectorAll(".HTMLCS-summary")[0];
            b.style.display = "block";
        };
        var u = f.createElement("li");
        u.className = a + "lineage-item";
        u.innerHTML = "Issue " + b + " of " + h;
        o.appendChild(p);
        r.appendChild(s);
        m.appendChild(o);
        m.appendChild(r);
        m.appendChild(u);
        j.appendChild(m);
        var v = f.createElement("div");
        v.className = a + "button-group";
        var w = n(a + "button-previous-issue", "previous", "Previous Issue", function(a) {
            var c = Number(b) - 1;
            if (c >= 1) {
                y(c - 1);
                wrapper = i.parentNode;
                var d = t(c, h);
                wrapper.replaceChild(d, i);
                d.style.display = "block";
                var e = f.querySelectorAll(".HTMLCS-issue-detail-list")[0];
                e.firstChild.style.marginLeft = parseInt(e.firstChild.style.marginLeft, 10) + 300 + "px";
                C(c - 1);
            }
        });
        var x = n(a + "button-next-issue", "next", "Next Issue", function(a) {
            var c = Number(b) + 1;
            if (c <= g.length) {
                y(c - 1);
                wrapper = i.parentNode;
                var d = t(c, h);
                wrapper.replaceChild(d, i);
                d.style.display = "block";
                var e = f.querySelectorAll(".HTMLCS-issue-detail-list")[0];
                e.firstChild.style.marginLeft = parseInt(e.firstChild.style.marginLeft, 10) - 300 + "px";
                C(c - 1);
            }
        });
        if (b === 1) {
            w.className += " disabled";
        }
        if (b === h) {
            x.className += " disabled";
        }
        v.appendChild(w);
        v.appendChild(x);
        l.appendChild(v);
        i.appendChild(j);
        i.appendChild(l);
        return i;
    };
    var u = function(b) {
        var c = Math.ceil(b.length / 5) * 300;
        var d = f.createElement("div");
        d.id = a + "issues";
        d.className = a + "details";
        d.setAttribute("style", "width: " + c + "px");
        var e = f.createElement("ol");
        e.className = a + "issue-list";
        e.setAttribute("style", "margin-left: 0");
        for (var g = 0; g < b.length; g++) {
            if (g > 0 && g % 5 === 0) {
                d.appendChild(e);
                var e = f.createElement("ol");
                e.className = a + "issue-list";
            }
            var h = x(g, b[g]);
            e.appendChild(h);
        }
        d.appendChild(e);
        return d;
    };
    var v = function(b) {
        var c = b.length * 300;
        var d = f.createElement("div");
        d.id = a + "issues-detail";
        d.className = a + "details";
        d.setAttribute("style", "width: " + c + "px");
        var e = f.createElement("ol");
        e.className = a + "issue-detail-list";
        e.setAttribute("style", "margin-left: 0");
        for (var g = 0; g < b.length; g++) {
            var h = z(g, b[g]);
            e.appendChild(h);
        }
        d.appendChild(e);
        return d;
    };
    var w = function() {
        var b = f.createElement("div");
        b.className = a + "settings";
        var h = f.createElement("div");
        h.id = a + "settings-use-standard";
        var i = f.createElement("label");
        i.innerHTML = "Standards:";
        i.setAttribute("for", a + "settings-use-standard-select");
        var j = f.createElement("select");
        j.id = a + "settings-use-standard-select";
        j.innerHTML = "";
        var l = HTMLCSAuditor.getStandardList();
        for (var m = 0; m < l.length; m++) {
            var n = l[m];
            var p = f.createElement("option");
            p.value = n;
            p.innerHTML = window["HTMLCS_" + n].name;
            if (n === c) {
                p.selected = true;
            }
            j.appendChild(p);
            j.onchange = function() {
                c = this.options[this.selectedIndex].value;
                k.run(c, d, e);
            };
        }
        var q = f.createElement("div");
        q.id = a + "settings-issue-count";
        var r = f.createElement("div");
        r.id = a + "settings-issue-count-help";
        r.innerHTML = "Select the types of issues to include in the report";
        var s = f.createElement("div");
        s.id = a + "settings-view-report";
        s.innerHTML = "View Report";
        s.onclick = function() {
            if (/disabled/.test(this.className) === false) {
                e.show = {
                    error: f.getElementById(a + "include-error").checked,
                    warning: f.getElementById(a + "include-warning").checked,
                    notice: f.getElementById(a + "include-notice").checked
                };
                var b = f.getElementById(a + "wrapper");
                var d = k.build(c, g, e);
                if (e.parentElement) {
                    e.parentElement.replaceChild(d, b);
                } else {
                    d.style.left = b.style.left;
                    d.style.top = b.style.top;
                    f.body.replaceChild(d, b);
                }
                if (e.listUpdateCallback) {
                    e.listUpdateCallback.call(this, g);
                }
            }
        };
        var t = f.getElementById(a + "wrapper");
        var u = k.countIssues(g);
        if (e.show === undefined && g.length > 0) {
            e.show = {
                error: true,
                warning: true,
                notice: false
            };
            if (u.error === 0 && u.warning === 0) {
                e.show.notice = true;
            }
        }
        for (var v in u) {
            var w = u[v];
            var x = f.createElement("div");
            x.className = a + "issue-tile " + a + v.toLowerCase();
            var y = f.createElement("div");
            y.className = "HTMLCS-tile-text";
            var z = "<strong>" + w + "</strong> " + v.substr(0, 1).toUpperCase() + v.substr(1);
            if (w !== 1) {
                z += "s";
            }
            y.innerHTML = z;
            if (e.show === undefined) {
                var A = false;
                var B = true;
            } else {
                var A = e.show[v];
                var B = false;
                if (w === 0) {
                    A = false;
                    B = true;
                }
            }
            var C = o(a + "include-" + v, "Toggle display of " + v + " messages", A, B, function(b) {
                var c = false;
                if (f.getElementById(a + "include-error").disabled === false) {
                    e.show.error = f.getElementById(a + "include-error").checked;
                    c = c || e.show.error;
                }
                if (f.getElementById(a + "include-warning").disabled === false) {
                    e.show.warning = f.getElementById(a + "include-warning").checked;
                    c = c || e.show.warning;
                }
                if (f.getElementById(a + "include-notice").disabled === false) {
                    e.show.notice = f.getElementById(a + "include-notice").checked;
                    c = c || e.show.notice;
                }
                if (c === true) {
                    s.className = s.className.replace(/ disabled/g, "");
                } else {
                    s.className += " disabled";
                }
            });
            x.appendChild(y);
            x.appendChild(C);
            q.appendChild(x);
        }
        if (e.show !== undefined) {
            var D = e.show.error || e.show.warning || e.show.notice;
            if (D === false) {
                s.className += " disabled";
            }
        } else {
            s.className += " disabled";
        }
        h.appendChild(i);
        h.appendChild(j);
        b.appendChild(h);
        b.appendChild(q);
        b.appendChild(r);
        b.appendChild(s);
        return b;
    };
    var x = function(b, c) {
        var d = "";
        var e = "";
        var h = "";
        switch (c.type) {
          case HTMLCS.ERROR:
            e = "Error";
            break;

          case HTMLCS.WARNING:
            e = "Warning";
            break;

          case HTMLCS.NOTICE:
            e = "Notice";
            break;

          default:
            break;
        }
        var h = e.toLowerCase();
        var i = c.msg;
        if (i.length > 115) {
            i = i.substr(0, 115) + "...";
        }
        var d = f.createElement("li");
        d.id = a + "msg-" + b;
        var j = f.createElement("span");
        j.className = a + "issue-type " + a + h;
        j.setAttribute("title", e);
        d.appendChild(j);
        var k = f.createElement("span");
        k.className = a + "issue-title";
        k.innerHTML = i;
        d.appendChild(k);
        d.onclick = function() {
            var b = this.id.replace(new RegExp(a + "msg-"), "");
            y(b);
            var c = f.querySelectorAll(".HTMLCS-issue-detail-list")[0];
            c.className += " " + a + "transition-disabled";
            c.firstChild.style.marginLeft = b * -300 + "px";
            C(b);
            setTimeout(function() {
                c.className = c.className.replace(new RegExp(" " + a + "transition-disabled"), "");
            }, 500);
            var d = f.querySelectorAll(".HTMLCS-inner-wrapper")[0];
            d.style.marginLeft = "-300px";
            d.style.maxHeight = "15em";
            summary = f.querySelectorAll(".HTMLCS-summary-detail")[0];
            var e = t(parseInt(b) + 1, g.length);
            summary.parentNode.replaceChild(e, summary);
            e.style.display = "block";
            var h = f.querySelectorAll(".HTMLCS-summary")[0];
            h.style.display = "none";
        };
        return d;
    };
    var y = function(b) {
        var c = f.querySelectorAll(".HTMLCS-issue-detail-list")[0];
        var d = c.getElementsByTagName("li");
        for (var g = 0; g < d.length; g++) {
            d[g].className = d[g].className.replace(new RegExp(" " + a + "current"), "");
        }
        var h = f.getElementById("HTMLCS-msg-detail-" + b);
        h.className += " " + a + "current";
        if (e.showIssueCallback) {
            e.showIssueCallback.call(this, b);
        }
    };
    var z = function(b, d, g) {
        if (g === undefined) {
            g = c;
        }
        var h = "";
        switch (d.type) {
          case HTMLCS.ERROR:
            h = "Error";
            break;

          case HTMLCS.WARNING:
            h = "Warning";
            break;

          case HTMLCS.NOTICE:
            h = "Notice";
            break;

          default:
            break;
        }
        var i = a + h.toLowerCase();
        var j = HTMLCS.util.getElementWindow(f)["HTMLCS_" + g];
        var l = [];
        if (j.getMsgInfo) {
            l = j.getMsgInfo(d.code);
        }
        var m = f.createElement("li");
        m.id = a + "msg-detail-" + b;
        var o = f.createElement("div");
        o.className = a + "issue-details";
        var p = f.createElement("span");
        p.className = a + "issue-type " + i;
        p.setAttribute("title", h);
        var q = f.createElement("div");
        q.className = a + "issue-title";
        q.innerHTML = d.msg;
        var r = f.createElement("div");
        r.className = a + "issue-wcag-ref";
        var s = "";
        for (var t = 0; t < l.length; t++) {
            s += "<em>" + l[t][0] + ":</em> " + l[t][1] + "<br/>";
        }
        r.innerHTML = s;
        o.appendChild(p);
        o.appendChild(q);
        o.appendChild(r);
        m.appendChild(o);
        if (F.isPointable(d.element) === false) {
            var u = f.createElement("div");
            u.className = a + "issue-source";
            m.appendChild(u);
            var v = f.createElement("div");
            v.className = a + "issue-source-inner-u2p";
            var w = "Unable to point to the element associated with this issue.";
            if (d.element.ownerDocument === null) {
                w = "Unable to point to this issue, as it relates to the entire document.";
            } else {
                var x = d.element.ownerDocument.getElementsByTagName("body")[0];
                if (HTMLCS.util.isInDocument(d.element) === false) {
                    w += "Unable to point to this element as it has been removed from the document since the report was generated.";
                } else if (HTMLCS.util.contains(x, d.element) === false) {
                    w = "Unable to point to this element because it is located outside the document's body element.";
                } else {
                    w += "Unable to point to this element because it is hidden from view, or does not have a visual representation.";
                }
            }
            if (v.textContent !== undefined) {
                v.textContent = w;
            } else {
                v.innerText = w;
            }
            u.appendChild(v);
        }
        if (e.customIssueSource) {
            var u = f.createElement("div");
            u.className = a + "issue-source";
            m.appendChild(u);
            e.customIssueSource.call(this, b, d, g, u, o);
        } else {
            var u = f.createElement("div");
            u.className = a + "issue-source";
            var y = f.createElement("div");
            y.className = a + "issue-source-header";
            var z = f.createElement("strong");
            z.innerHTML = "Code Snippet";
            var A = n(a + "button-point-to-element-" + b, "pointer", "Point to Element", function() {
                k.pointToElement(d.element);
            });
            y.appendChild(z);
            y.appendChild(A);
            u.appendChild(y);
            if (d.element.outerHTML) {
                var B = "";
                var C = "";
                if (d.element.innerHTML.length > 31) {
                    var D = d.element.outerHTML.replace(d.element.innerHTML, d.element.innerHTML.substr(0, 31) + "...");
                } else {
                    var D = d.element.outerHTML;
                }
                var E = d.element.previousSibling;
                while (B.length <= 31) {
                    if (E === null) {
                        break;
                    } else {
                        if (E.nodeType === 1) {
                            B = E.outerHTML;
                        } else if (E.nodeType === 3) {
                            if (E.textContent !== undefined) {
                                B = E.textContent + B;
                            } else {
                                B = E.nodeValue + B;
                            }
                        }
                        if (B.length > 31) {
                            B = "..." + B.substr(B.length - 31);
                        }
                    }
                    E = E.previousSibling;
                }
                var G = d.element.nextSibling;
                while (C.length <= 31) {
                    if (G === null) {
                        break;
                    } else {
                        if (G.nodeType === 1) {
                            C += G.outerHTML;
                        } else if (G.nodeType === 3) {
                            if (G.textContent !== undefined) {
                                C += G.textContent;
                            } else {
                                C += G.nodeValue;
                            }
                        }
                        if (C.length > 31) {
                            C = C.substr(0, 31) + "...";
                        }
                    }
                    G = G.nextSibling;
                }
                var v = f.createElement("div");
                v.className = a + "issue-source-inner";
                var H = f.createElement("strong");
                if (H.textContent !== undefined) {
                    H.textContent = D;
                } else {
                    H.innerText = D;
                }
                v.appendChild(f.createTextNode(B));
                v.appendChild(H);
                v.appendChild(f.createTextNode(C));
                u.appendChild(v);
            } else {
                var v = f.createElement("div");
                v.className = a + "issue-source-not-supported";
                var I = "The code snippet functionality is not supported in this browser.";
                v.appendChild(f.createTextNode(I));
                u.appendChild(v);
            }
            m.appendChild(u);
        }
        return m;
    };
    var A = function(b, c) {
        var d = f.createElement("div");
        d.className = a + "navigation";
        var e = f.createElement("span");
        e.className = a + "nav-button " + a + "previous";
        e.innerHTML = String.fromCharCode(160);
        if (b === 1) {
            e.className += " " + a + "disabled";
        }
        d.appendChild(e);
        var g = f.createElement("span");
        g.className = a + "page-number";
        g.innerHTML = "Page " + b + " of " + c;
        d.appendChild(g);
        var i = f.createElement("span");
        i.className = a + "nav-button " + a + "next";
        i.innerHTML = String.fromCharCode(160);
        if (b === c) {
            i.className += " " + a + "disabled";
        }
        d.appendChild(i);
        if (c > 0) {
            var j = f.createElement("span");
            j.className = a + "nav-button " + a + "report";
            j.innerHTML = "All";
            d.appendChild(j);
            console.log("Report span added");
            j.onclick = function() {
                B();
            };
        }
        e.onclick = function() {
            if (h > 1) {
                h--;
                if (h === 1) {
                    e.className += " " + a + "disabled";
                }
            }
            if (c > 1) {
                i.className = i.className.replace(new RegExp(" " + a + "disabled"), "");
            }
            g.innerHTML = "";
            g.appendChild(document.createTextNode("Page " + h + " of " + c));
            var b = f.querySelectorAll(".HTMLCS-issue-list")[0];
            b.style.marginLeft = (h - 1) * -300 + "px";
        };
        i.onclick = function() {
            if (h < c) {
                h++;
                if (h === c) {
                    i.className += " " + a + "disabled";
                }
            }
            if (c > 1) {
                e.className = e.className.replace(new RegExp(" " + a + "disabled"), "");
            }
            g.innerHTML = "";
            g.appendChild(document.createTextNode("Page " + h + " of " + c));
            var b = f.querySelectorAll(".HTMLCS-issue-list")[0];
            b.style.marginLeft = (h - 1) * -300 + "px";
        };
        return d;
    };
    function B() {
        if (document.getElementById("HTMLCS-report-window-header") !== null) return;
        var a = '<div title="blah" class="HTMLCS-header" id="HTMLCS-report-window-header">Full Issue List<div title="Close" class="HTMLCS-close" onClick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)"></div></div>';
        var b = document.createElement("div");
        b.id = "HTMLCS-report-window";
        b.innerHTML = a + '<br /><div id="HTMLCS-report-window-content"></div>';
        document.body.appendChild(b);
        var c = {};
        var d = document.body.getElementsByClassName("HTMLCS-issue-details");
        var e = '<h1>Accessibility Issue List</h1><div class="summary">' + "<strong>Location</strong>: " + window.location.href + "<br /><strong>Date</strong>:  " + m() + "</div>";
        for (var f = 0; f < d.length; f++) {
            var g = d[f];
            var h = g.getElementsByClassName("HTMLCS-issue-title")[0].innerHTML;
            var i = g.parentNode.getElementsByClassName("HTMLCS-issue-source");
            var j = i[i.length - 1].getElementsByClassName("HTMLCS-issue-source-inner")[0].innerHTML + "<p />";
            if (!(h in c)) {
                c[h] = [];
            }
            console.log("adding: " + j);
            c[h].push(j);
        }
        for (var k in c) {
            e += '<div class="issue"><span class="title">' + k + "</span>" + '<span class="count"> Count: ' + c[k].length + "</span> ";
            for (var l = 0; l < c[k].length; l++) {
                e += '<div class="issue-code">' + (l + 1) + '. <span class="sample">' + c[k][l].replace(/<p \/>/g, "").trim() + "</span></div>";
            }
            e += "</div>";
        }
        document.getElementById("HTMLCS-report-window-content").innerHTML = e;
        b.onmousemove = function(a) {
            r(a);
        };
        var a = document.getElementById("HTMLCS-report-window-header");
        a.onmousedown = function(a) {
            a = a || window.event;
            console.log("dragging 2");
            window.dragHandle = b;
            dragging = true;
            window.mouseX = a.clientX;
            window.mouseY = a.clientY;
            return false;
        };
    }
    var C = function(b) {
        var c = g[Number(b)];
        if (!c.element) {
            return;
        }
        var d = f.getElementById(a + "button-point-to-element-" + b);
        F.container = k.pointerContainer || f.getElementById("HTMLCS-wrapper");
        if (F.isPointable(c.element) === false) {
            var e = F.getPointer(c.element);
            if (F.pointer) {
                e.className += " HTMLCS-pointer-hidden";
            }
            if (d) {
                d.className += " disabled";
            }
        } else {
            if (d) {
                d.className = d.className.replace(" disabled", "");
            }
            F.pointTo(c.element);
        }
    };
    var D = function(a, b) {
        if (a.length === 0) {
            b.call(this);
            return;
        }
        var c = a.shift();
        HTMLCS.loadStandard(c, function() {
            D(a, b);
        });
    };
    var E = function(a, b) {
        var c = document.createElement("script");
        c.onload = function() {
            c.onload = null;
            c.onreadystatechange = null;
            if (b instanceof Function === true) {
                b.call(this);
            }
        };
        c.onreadystatechange = function() {
            if (/^(complete|loaded)$/.test(this.readyState) === true) {
                c.onreadystatechange = null;
                c.onload();
            }
        };
        c.src = a;
        if (document.head) {
            document.head.appendChild(c);
        } else {
            document.getElementsByTagName("head")[0].appendChild(c);
        }
    };
    this.getIssue = function(a) {
        return g[a];
    };
    this.countIssues = function(a) {
        var b = {
            error: 0,
            warning: 0,
            notice: 0
        };
        for (var c = 0; c < a.length; c++) {
            switch (a[c].type) {
              case HTMLCS.ERROR:
                b.error++;
                break;

              case HTMLCS.WARNING:
                b.warning++;
                break;

              case HTMLCS.NOTICE:
                b.notice++;
                break;
            }
        }
        return b;
    };
    this.build = function(b, c, d) {
        var h = null;
        if (f) {
            var h = f.getElementById(a + "wrapper");
        }
        var i = 0;
        var j = 0;
        var k = 0;
        for (var l = 0; l < c.length; l++) {
            var m = false;
            switch (c[l].type) {
              case HTMLCS.ERROR:
                if (e.show.error === false) {
                    m = true;
                } else {
                    i++;
                }
                break;

              case HTMLCS.WARNING:
                if (e.show.warning === false) {
                    m = true;
                } else {
                    j++;
                }
                break;

              case HTMLCS.NOTICE:
                if (e.show.notice === false) {
                    m = true;
                } else {
                    k++;
                }
                break;
            }
            if (m === true) {
                c.splice(l, 1);
                l--;
            }
        }
        g = c;
        var n = "";
        var o = "";
        var p = "";
        for (var l = 0; l < c.length; l++) {
            if (l % 5 === 0) {
                o += '<ol class="HTMLCS-issue-list"';
                if (l === 0) {
                    o += 'style="margin-left: 0em"';
                }
                o += ">";
            }
            o += x(l, c[l]);
            if (l % 5 === 4 || l === c.length - 1) {
                o += "</ol>";
            }
            p += z(l, c[l], b);
        }
        var r = l * 300;
        var h = f.createElement("div");
        h.id = a + "wrapper";
        h.className = "showing-issue-list";
        if (e.noHeader !== true) {
            var w = q(b, h);
            h.appendChild(w);
        }
        var y = s(i, j, k);
        var B = t(1, c.length);
        var C = f.createElement("div");
        C.id = a + "issues-wrapper";
        C.className = a + "inner-wrapper";
        var D = u(c);
        C.appendChild(D);
        var E = Math.ceil(c.length / 5);
        var F = A(1, E);
        C.appendChild(F);
        var G = f.createElement("div");
        G.className = a + "outer-wrapper";
        G.appendChild(C);
        var C = f.createElement("div");
        C.id = a + "issues-detail-wrapper";
        C.className = a + "inner-wrapper";
        var H = v(c);
        C.appendChild(H);
        G.appendChild(C);
        h.appendChild(y);
        h.appendChild(B);
        h.appendChild(G);
        return h;
    };
    this.buildSummaryPage = function() {
        var b = f.createElement("div");
        b.id = a + "wrapper";
        b.className = "showing-settings";
        if (e.noHeader !== true) {
            var d = q(c, b);
            b.appendChild(d);
        }
        var g = w();
        b.appendChild(g);
        return b;
    };
    this.changeScreen = function(c) {
        var d = f.getElementById(a + "wrapper");
        d.className = d.className.replace(new RegExp("showing-" + b), "");
        d.className += " showing-" + c;
        d.className = d.className.replace(/\s+/, " ");
        b = c;
    };
    this.includeCss = function(a, b) {
        if (e.includeCss === false) {
            return;
        }
        if (b === undefined) {
            b = f;
        }
        var c = b.querySelector("head");
        var d = c.getElementsByTagName("link");
        var g = false;
        for (var h = 0; h < d.length; h++) {
            if (new RegExp(a + ".css").test(d[h].getAttribute("href")) === true) {
                g = true;
                break;
            }
        }
        if (g === false) {
            var i = b.createElement("link");
            i.rel = "stylesheet";
            i.type = "text/css";
            i.href = e.path + a + ".css";
            c.appendChild(i);
        }
    };
    this.getStandardList = function() {
        var a = /^HTMLCS_[^_]+$/;
        var b = [];
        for (i in window) {
            if (a.test(i) === true) {
                var c = window[i];
                if (c.sniffs && c.name) {
                    b.push(i.substr(7));
                }
            }
        }
        return b;
    };
    this.run = function(i, j, l) {
        var m = this.getStandardList();
        var n = [];
        for (var o = 0; o < m.length; o++) {
            if (!window["HTMLCS_" + m[o]]) {
                n.push(m[o]);
            }
        }
        if (n.length > 0) {
            D(n, function() {
                k.run(i, j, l);
            });
            return;
        }
        if (j === null || j === undefined) {
            j = [];
            if (document.querySelectorAll("frameset").length === 0) {
                j.push(document);
            }
            if (window.frames.length > 0) {
                for (var o = 0; o < window.frames.length; o++) {
                    try {
                        j.push(window.frames[o].document);
                    } catch (p) {}
                }
            }
        } else if (j.nodeName) {
            if (j.nodeName.toLowerCase() === "input") {
                if (j.hasAttribute("type") === false) {
                    j = j.value;
                } else {
                    var q = j.getAttribute("type").toLowerCase();
                    if (q === "text") {
                        j = j.value;
                    }
                }
            } else if (j.nodeName.toLowerCase() === "textarea") {
                j = j.value;
            }
        }
        if (j instanceof Array === false) {
            j = [ j ];
        }
        if (l === undefined) {
            l = {};
        }
        c = i;
        d = j;
        e = l;
        h = 1;
        b = "";
        g = [];
        var r = null;
        if (e.parentElement) {
            r = e.parentElement;
        } else if (window.frames.length > 0) {
            var s = -1;
            var t = null;
            for (var o = 0; o < window.frames.length; o++) {
                try {
                    if (window.frames[o].frameElement.nodeName.toLowerCase() === "frame") {
                        if (window.frames[o].document) {
                            var u = window.frames[o].innerWidth * window.frames[o].innerHeight;
                            if (u > s) {
                                s = u;
                                t = window.frames[o].document.body;
                            }
                        }
                    }
                } catch (p) {}
            }
            if (t === null) {
                r = document.body;
            } else {
                r = t;
            }
        } else {
            r = document.body;
        }
        f = r;
        if (f.ownerDocument) {
            f = f.ownerDocument;
        }
        if (!e.path) {
            e.path = "./";
        }
        if (e.includeCss === undefined) {
            e.includeCss = true;
        }
        if (e.ignoreMsgCodes === undefined) {
            e.ignoreMsgCodes = [];
        }
        this.includeCss("HTMLCS");
        var v = f.getElementById(a + "wrapper");
        var w = false;
        var x = k.buildSummaryPage();
        x.className += " HTMLCS-processing";
        if (v) {
            x.style.left = v.style.left;
            x.style.top = v.style.top;
            r.replaceChild(x, v);
        } else {
            if (e.openCallback) {
                e.openCallback.call(this);
            }
            w = true;
            r.appendChild(x);
        }
        var y = function() {
            for (var b = 0; b < g.length; b++) {
                var c = false;
                if (x) {
                    if (x === g[b].element) {
                        c = true;
                    } else if (g[b].element.documentElement) {
                        c = false;
                    } else if (x.contains && x.contains(g[b].element) === true) {
                        c = true;
                    } else if (x.compareDocumentPosition && (x.compareDocumentPosition(g[b].element) & 16) > 0) {
                        c = true;
                    }
                }
                for (var d = 0; d < l.ignoreMsgCodes.length; d++) {
                    if (new RegExp(l.ignoreMsgCodes[d]).test(g[b].code) === true) {
                        c = true;
                        break;
                    }
                }
                if (c === true) {
                    g.splice(b, 1);
                    b--;
                }
            }
            if (e.runCallback) {
                var h = e.runCallback.call(this, g);
                if (h instanceof Array === true) {
                    g = h;
                }
            }
            setTimeout(function() {
                var b = f.getElementById(a + "wrapper");
                var c = k.buildSummaryPage();
                c.style.left = b.style.left;
                c.style.top = b.style.top;
                r.replaceChild(c, b);
            }, 400);
        };
        var z = function(a, b) {
            var c = b.shift();
            while (!c) {
                if (b.length === 0) {
                    y();
                    return;
                } else {
                    c = b.shift();
                }
            }
            HTMLCS.process(a, c, function() {
                g = g.concat(HTMLCS.getMessages());
                if (b.length === 0) {
                    y();
                } else {
                    z(a, b);
                }
            });
        };
        z(i, d.concat([]));
    };
    this.versionCheck = function(b) {
        if (b && b.currentVersion !== null) {
            if (b.newVersion > b.currentVersion) {
                var c = f.createElement("div");
                c.id = a + "settings-updated-notification";
                f.documentElement.querySelector(".HTMLCS-settings").appendChild(c);
                var d = "HTML_CodeSniffer has been updated to version " + b.newVersion + ".";
                d += ' <a href="http://squizlabs.github.io/HTML_CodeSniffer/patches/' + b.newVersion + '">View the changelog</a>';
                c.innerHTML = d;
            }
        }
    };
    this.close = function() {
        if (f) {
            var a = f.getElementById("HTMLCS-wrapper");
            if (a) {
                var b = F.getPointer(a);
                if (b && b.parentNode) {
                    b.parentNode.removeChild(b);
                }
                a.parentNode.removeChild(a);
                if (e.closeCallback) {
                    g = e.closeCallback.call(this);
                }
            }
        }
    };
    this.pointToElement = function(a) {
        F.container = k.pointerContainer || f.getElementById("HTMLCS-wrapper");
        F.pointTo(a);
    };
    this.getCurrentStandard = function() {
        return c;
    };
    var F = {
        pointerDim: {},
        container: null,
        getBoundingRectangle: function(a) {
            if (!a) {
                return null;
            }
            var b = this.getElementCoords(a);
            var c = this.getElementDimensions(a);
            var d = {
                x1: b.x,
                y1: b.y,
                x2: b.x + c.width,
                y2: b.y + c.height
            };
            return d;
        },
        getElementDimensions: function(a) {
            var b = {
                width: a.offsetWidth,
                height: a.offsetHeight
            };
            return b;
        },
        getElementCoords: function(a, b) {
            var c = 0;
            var d = 0;
            var e = HTMLCS.util.getElementWindow(a);
            if (b === true) {
                var f = e.top;
            } else {
                var f = e;
            }
            while (true) {
                do {
                    c += a.offsetLeft;
                    d += a.offsetTop;
                } while (a = a.offsetParent);
                if (e === f) {
                    break;
                } else {
                    a = e.frameElement;
                    e = e.parent;
                    if (a.nodeName.toLowerCase() === "frame") {
                        break;
                    }
                }
            }
            return {
                x: c,
                y: d
            };
        },
        getWindowDimensions: function(a) {
            var b = HTMLCS.util.getElementWindow(a);
            var c = a.ownerDocument;
            var d = 0;
            var e = 0;
            if (b.innerWidth) {
                d = b.innerWidth;
                e = b.innerHeight;
                var f = this.getScrollbarWidth(a);
                if (c.documentElement.scrollHeight > e) {
                    if (typeof f === "number") {
                        d -= f;
                    }
                }
                if (c.body.scrollWidth > d) {
                    if (typeof f === "number") {
                        e -= f;
                    }
                }
            } else if (c.documentElement && (c.documentElement.clientWidth || c.documentElement.clientHeight)) {
                d = c.documentElement.clientWidth;
                e = c.documentElement.clientHeight;
            } else if (c.body && (c.body.clientWidth || c.body.clientHeight)) {
                d = c.body.clientWidth;
                e = c.body.clientHeight;
            }
            var g = {
                width: d,
                height: e
            };
            return g;
        },
        getScrollbarWidth: function(a) {
            if (j !== null) {
                return j;
            }
            doc = a.ownerDocument;
            var b = null;
            var c = null;
            var d = 0;
            var e = 0;
            b = doc.createElement("div");
            b.style.position = "absolute";
            b.style.top = "-1000px";
            b.style.left = "-1000px";
            b.style.width = "100px";
            b.style.height = "50px";
            b.style.overflow = "hidden";
            c = doc.createElement("div");
            c.style.width = "100%";
            c.style.height = "200px";
            b.appendChild(c);
            f.body.appendChild(b);
            d = c.offsetWidth;
            b.style.overflow = "auto";
            e = c.offsetWidth;
            doc.body.removeChild(doc.body.lastChild);
            var g = d - e;
            j = g;
            return g;
        },
        getScrollCoords: function(a) {
            var b = HTMLCS.util.getElementWindow(a);
            doc = a.ownerDocument;
            var c = 0;
            var d = 0;
            if (b.pageYOffset) {
                c = b.pageXOffset;
                d = b.pageYOffset;
            } else if (doc.body && (doc.body.scrollLeft || doc.body.scrollTop)) {
                c = doc.body.scrollLeft;
                d = doc.body.scrollTop;
            } else {
                c = doc.documentElement.scrollLeft;
                d = doc.documentElement.scrollTop;
            }
            var e = {
                x: c,
                y: d
            };
            return e;
        },
        isPointable: function(a) {
            if (a.ownerDocument === null) {
                return false;
            }
            var b = a.parentNode;
            while (b && b.ownerDocument) {
                b = b.parentNode;
            }
            if (b === null) {
                return false;
            }
            if (HTMLCS.util.isHidden(a) === true) {
                return false;
            }
            if (this.getPointerDirection(a) === null) {
                return false;
            }
            return true;
        },
        getPointerDirection: function(a) {
            var b = null;
            var c = this.getBoundingRectangle(a);
            var d = this.getPointer(a);
            var e = a.ownerDocument;
            d.className = d.className.replace("HTMLCS-pointer-hidden", "");
            d.className += " HTMLCS-pointer-hidden-block";
            this.pointerDim.height = 62;
            this.pointerDim.width = 62;
            var f = 20;
            var g = this.getWindowDimensions(a);
            var h = HTMLCS.util.getElementWindow(a);
            var i = Math.max(0, Math.min(c.y1 - 100, e.documentElement.offsetHeight - g.height));
            if (c.y1 - this.pointerDim.height - f > i) {
                b = "down";
            } else if (c.y2 + this.pointerDim.height < g.height - i) {
                b = "up";
            } else if (c.x2 + this.pointerDim.width < g.width) {
                b = "left";
            } else if (c.x1 - this.pointerDim.width > 0) {
                b = "right";
            }
            d.className = d.className.replace("HTMLCS-pointer-hidden-block", "");
            d.className += " HTMLCS-pointer-hidden";
            return b;
        },
        pointTo: function(a) {
            if (a.ownerDocument) {
                var b = a.ownerDocument;
            } else {
                var b = a;
            }
            var c = b.getElementById("HTMLCS-pointer");
            if (c) {
                c.parentNode.removeChild(c);
            }
            if (this.isPointable(a) === false) {
                return;
            }
            var d = HTMLCS.util.getElementWindow(a).top;
            var e = this.getWindowDimensions(d.document.documentElement);
            var f = this.getPointerDirection(a);
            var g = this.getPointer(a);
            g.className = g.className.replace("HTMLCS-pointer-hidden-block", "");
            if (f === null) {
                g.className += " HTMLCS-pointer-hidden";
            } else {
                var h = false;
                if (HTMLCS.util.style(a).position === "fixed") {
                    var h = true;
                }
                var i = a.parentNode;
                while (i.ownerDocument) {
                    if (HTMLCS.util.style(i).position === "fixed") {
                        h = true;
                        break;
                    }
                    i = i.parentNode;
                }
                if (h === true) {
                    g.style.position = "fixed";
                } else {
                    g.style.position = "absolute";
                    var j = this.getElementCoords(a, true);
                    var k = HTMLCS.util.getElementWindow(a);
                    var l = Math.max(j.y - 100, 0);
                    while (l >= 0) {
                        k.scrollTo(0, l);
                        var m = this.getScrollCoords(k.document.documentElement);
                        l -= m.y;
                        l = Math.max(l, 0);
                        if (k === d) {
                            break;
                        } else {
                            k = k.parent;
                        }
                    }
                }
                this.showPointer(a, f);
            }
        },
        getPointer: function(a) {
            try {
                var b = a.ownerDocument;
                HTMLCSAuditor.includeCss("HTMLCS", b);
                var c = "HTMLCS";
                var d = b.getElementById(c + "-pointer");
                if (!d) {
                    d = b.createElement("div");
                    d.id = c + "-pointer";
                    d.className = c + "-pointer " + c + "-pointer-hidden";
                    b.body.appendChild(d);
                }
            } catch (e) {}
            return d;
        },
        showPointer: function(a, b) {
            var c = "HTMLCS";
            var d = this.getPointer(a);
            this._removeDirectionClasses(d);
            d.className += " " + c + "-pointer-" + b;
            d.className = d.className.replace(c + "-pointer-hidden", "");
            var e = this.getBoundingRectangle(a);
            var f = 0;
            var g = 0;
            var h = 20;
            switch (b) {
              case "up":
                h = -h;
                f = e.y2;
                if (e.x2 - e.x1 < 250) {
                    g = this.getRectMidPnt(e) - this.pointerDim.width / 2;
                } else {
                    g = e.x1;
                }
                break;

              case "down":
              default:
                f = e.y1 - this.pointerDim.height;
                if (e.x2 - e.x1 < 250) {
                    g = this.getRectMidPnt(e) - this.pointerDim.width / 2;
                } else {
                    g = e.x1;
                }
                break;

              case "left":
                g = e.x2;
                f = this.getRectMidPnt(e, true) - this.pointerDim.height / 2;
                break;

              case "right":
                h = -h;
                g = e.x1 - this.pointerDim.width;
                f = this.getRectMidPnt(e, true) - this.pointerDim.height / 2;
                break;
            }
            var i = this.getScrollCoords(a);
            d.style.top = f + "px";
            d.style.left = g + "px";
            var j = this.getBoundingRectangle(this.container);
            e = this.getBoundingRectangle(d);
            var k = 20;
            var l = null;
            var m = e.x1 + (e.x2 - e.x1) / 2;
            var n = e.y1 + (e.y2 - e.y1) / 2;
            if (HTMLCS.util.style(d).position !== "fixed") {
                n -= i.y;
            }
            if (j.x1 <= m && j.x2 >= m && j.y1 <= n && j.y2 >= n) {
                var o = this;
                this.container.className += " HTMLCS-translucent";
                setTimeout(function() {
                    o.container.className = o.container.className.replace("HTMLCS-translucent", "");
                }, 4e3);
            }
            this.bounce(d, function() {
                setTimeout(function() {
                    if (d.parentNode) {
                        d.parentNode.removeChild(d);
                    }
                }, 1500);
            }, b);
        },
        bounce: function(a, b, c) {
            var d = c;
            var e = 0;
            var f = "";
            var g = 0;
            var h = 30;
            var i = 5;
            switch (c) {
              case "up":
                d = c + "-op";
                g = h;

              case "down":
                f = "top";
                break;

              case "left":
                d = c + "-op";
                g = h;

              case "right":
                f = "left";
                break;
            }
            e = Number(a.style[f].replace("px", "")) + g;
            var j = e;
            var k = e - h;
            var l = 0;
            var m = setInterval(function() {
                if (d === c) {
                    j--;
                    a.style[f] = j + "px";
                    if (j < k) {
                        d = c + "-op";
                        if (l === i && g !== 0) {
                            clearInterval(m);
                            b.call(this);
                            return;
                        }
                    }
                } else {
                    j++;
                    a.style[f] = j + "px";
                    if (j >= e) {
                        d = c;
                        l++;
                        if (l === i && g === 0) {
                            clearInterval(m);
                            b.call(this);
                            return;
                        }
                    }
                }
            }, 10);
        },
        getRectMidPnt: function(a, b) {
            var c = 0;
            if (b === true) {
                c = a.y1 + (a.y2 - a.y1) / 2;
            } else {
                c = a.x1 + (a.x2 - a.x1) / 2;
            }
            return c;
        },
        _removeDirectionClasses: function(a) {
            var b = "HTMLCS";
            var c = [ "down", "up", "left", "right" ];
            var d = c.length;
            for (var e = 0; e < d; e++) {
                a.className = a.className.replace(b + "-pointer-" + c[e], "");
            }
        }
    };
}();