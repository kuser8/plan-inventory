var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a;
const t$1 = globalThis, e$2 = t$1.ShadowRoot && (void 0 === t$1.ShadyCSS || t$1.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$3 = /* @__PURE__ */ new WeakMap();
let n$2 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$2 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$3.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$3.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$2 = (t2) => new n$2("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), i$3 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$2(o2, t2, s$2);
}, S$1 = (s2, o2) => {
  if (e$2) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$1.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$2 = e$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$2(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$2, defineProperty: e$1, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$1, getOwnPropertySymbols: o$2, getPrototypeOf: n$1 } = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$1 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f$1 = (t2, s2) => !i$2(t2, s2), b$1 = { attribute: true, type: String, converter: u$1, reflect: false, useDefault: false, hasChanged: f$1 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$1.litPropertyMetadata ?? (a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$1 = class y extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = b$1) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), h2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== h2 && e$1(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const { get: e2, set: r2 } = h$1(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2 == null ? void 0 : e2.call(this);
      r2 == null ? void 0 : r2.call(this, s3), this.requestUpdate(t2, h2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t2 = n$1(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...r$1(t3), ...o$2(t3)];
      for (const i2 of s2) this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i2] of s2) this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i2.unshift(c$2(s3));
    } else void 0 !== s2 && i2.push(c$2(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t2.hostConnected) == null ? void 0 : _a2.call(t2));
  }
  removeController(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys()) this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostConnected) == null ? void 0 : _a3.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostDisconnected) == null ? void 0 : _a3.call(t2);
    });
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$ET(t2, s2) {
    var _a2;
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const h2 = (void 0 !== ((_a2 = i2.converter) == null ? void 0 : _a2.toAttribute) ? i2.converter : u$1).toAttribute(s2, i2.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a2, _b;
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u$1;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? ((_b = this._$Ej) == null ? void 0 : _b.get(e2)) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2, e2 = false, h2) {
    var _a2;
    if (void 0 !== t2) {
      const r2 = this.constructor;
      if (false === e2 && (h2 = this[t2]), i2 ?? (i2 = r2.getPropertyOptions(t2)), !((i2.hasChanged ?? f$1)(h2, s2) || i2.useDefault && i2.reflect && h2 === ((_a2 = this._$Ej) == null ? void 0 : _a2.get(t2)) && !this.hasAttribute(r2._$Eu(t2, i2)))) return;
      this.C(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i2, reflect: e2, wrapped: h2 }, r2) {
    i2 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i2 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i2] of t3) {
        const { wrapped: t4 } = i2, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i2, e2);
      }
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
        var _a3;
        return (_a3 = t3.hostUpdate) == null ? void 0 : _a3.call(t3);
      }), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t2 = false, this._$EM(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
      var _a3;
      return (_a3 = t3.hostUpdated) == null ? void 0 : _a3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t3) => this._$ET(t3, this[t3]))), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1 == null ? void 0 : p$1({ ReactiveElement: y$1 }), (a$1.reactiveElementVersions ?? (a$1.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis, i$1 = (t2) => t2, s$1 = t.trustedTypes, e = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h = "$lit$", o$1 = `lit$${Math.random().toFixed(9).slice(2)}$`, n2 = "?" + o$1, r = `<${n2}>`, l = document, c = () => l.createComment(""), a = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u = Array.isArray, d = (t2) => u(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), f = "[ 	\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), b = x(1), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l.createTreeWalker(l, 129);
function V(t2, i2) {
  if (!u(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e ? e.createHTML(i2) : i2;
}
const N = (t2, i2) => {
  const s2 = t2.length - 1, e2 = [];
  let n3, l2 = 2 === i2 ? "<svg>" : 3 === i2 ? "<math>" : "", c2 = v;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p) : void 0 !== u2[3] && (c2 = p) : c2 === p ? ">" === u2[0] ? (c2 = n3 ?? v, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p : c2 === _ || c2 === m ? c2 = v : (c2 = p, n3 = void 0);
    const x2 = c2 === p && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v ? s3 + r : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h + s3.slice(d2) + o$1 + x2) : s3 + o$1 + (-2 === d2 ? i3 : x2);
  }
  return [V(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : 3 === i2 ? "</math>" : "")), e2];
};
class S {
  constructor({ strings: t2, _$litType$: i2 }, e2) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = N(t2, i2);
    if (this.el = S.createElement(f2, e2), P.currentNode = this.el.content, 2 === i2 || 3 === i2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h)) {
          const i3 = v2[a2++], s2 = r2.getAttribute(t3).split(o$1), e3 = /([.?@])?(.*)/.exec(i3);
          d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I : "?" === e3[1] ? L : "@" === e3[1] ? z : H }), r2.removeAttribute(t3);
        } else t3.startsWith(o$1) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
        if (y2.test(r2.tagName)) {
          const t3 = r2.textContent.split(o$1), i3 = t3.length - 1;
          if (i3 > 0) {
            r2.textContent = s$1 ? s$1.emptyScript : "";
            for (let s2 = 0; s2 < i3; s2++) r2.append(t3[s2], c()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t3[i3], c());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n2) d2.push({ type: 2, index: l2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(o$1, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$1.length - 1;
      }
      l2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function M(t2, i2, s2 = t2, e2) {
  var _a2, _b;
  if (i2 === E) return i2;
  let h2 = void 0 !== e2 ? (_a2 = s2._$Co) == null ? void 0 : _a2[e2] : s2._$Cl;
  const o2 = a(i2) ? void 0 : i2._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = M(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
class R {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? l).importNode(i2, true);
    P.currentNode = e2;
    let h2 = P.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i3;
        2 === r2.type ? i3 = new k(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i3 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i3 = new Z(h2, this, t2)), this._$AV.push(i3), r2 = s2[++n3];
      }
      o2 !== (r2 == null ? void 0 : r2.index) && (h2 = P.nextNode(), o2++);
    }
    return P.currentNode = l, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class k {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = M(this, t2, i2), a(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(l.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a2;
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2) this._$AH.p(i2);
    else {
      const t3 = new R(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = C.get(t2.strings);
    return void 0 === i2 && C.set(t2.strings, i2 = new S(t2)), i2;
  }
  k(t2) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i2.length ? i2.push(s2 = new k(this.O(c()), this.O(c()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, s2) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, s2); t2 !== this._$AB; ) {
      const s3 = i$1(t2).nextSibling;
      i$1(t2).remove(), t2 = s3;
    }
  }
  setConnected(t2) {
    var _a2;
    void 0 === this._$AM && (this._$Cv = t2, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t2));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = M(this, t2, i2, 0), o2 = !a(t2) || t2 !== this._$AH && t2 !== E, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = M(this, e3[s2 + n3], i2, n3), r2 === E && (r2 = this._$AH[n3]), o2 || (o2 = !a(r2) || r2 !== this._$AH[n3]), r2 === A ? t2 = A : t2 !== A && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== A);
  }
}
class z extends H {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = M(this, t2, i2, 0) ?? A) === E) return;
    const s2 = this._$AH, e2 = t2 === A && s2 !== A || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== A && (s2 === A || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    M(this, t2);
  }
}
const B = t.litHtmlPolyfillSupport;
B == null ? void 0 : B(S, k), (t.litHtmlVersions ?? (t.litHtmlVersions = [])).push("3.3.3");
const D = (t2, i2, s2) => {
  const e2 = (s2 == null ? void 0 : s2.renderBefore) ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e2._$litPart$ = h2 = new k(i2.insertBefore(c(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s = globalThis;
class i extends y$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t2 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = D(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(false);
  }
  render() {
    return E;
  }
}
i._$litElement$ = true, i["finalized"] = true, (_a = s.litElementHydrateSupport) == null ? void 0 : _a.call(s, { LitElement: i });
const o = s.litElementPolyfillSupport;
o == null ? void 0 : o({ LitElement: i });
(s.litElementVersions ?? (s.litElementVersions = [])).push("4.2.2");
const sharedStyles = i$3`
  :host {
    display: block;
    color: var(--primary-text-color);
    background: var(--card-background-color, #fff);
    font-family: var(--paper-font-body1_-_font-family, inherit);
  }

  ha-card {
    padding: 16px;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 1.2em;
    font-weight: 500;
    margin-bottom: 12px;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .row.wrap {
    flex-wrap: wrap;
  }

  .muted {
    color: var(--secondary-text-color);
    font-size: 0.9em;
  }

  input[type='text'],
  input[type='number'],
  input[type='date'],
  select,
  textarea {
    font: inherit;
    color: var(--primary-text-color);
    background: var(--card-background-color, #fff);
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 6px;
    padding: 6px 8px;
    box-sizing: border-box;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: var(--primary-color, #03a9f4);
  }

  label {
    font-size: 0.85em;
    color: var(--secondary-text-color);
    display: block;
    margin-bottom: 2px;
  }

  button,
  .btn {
    font: inherit;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    padding: 6px 12px;
    background: var(--secondary-background-color, #f0f0f0);
    color: var(--primary-text-color);
  }

  button:disabled,
  .btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .btn-primary {
    background: var(--primary-color, #03a9f4);
    color: var(--text-primary-color, #fff);
  }

  .btn-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border-radius: 50%;
    background: var(--secondary-background-color, #f0f0f0);
  }

  .btn-icon ha-icon {
    --mdc-icon-size: 20px;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 10px;
    border-radius: 999px;
    font-size: 0.8em;
    background: var(--secondary-background-color, #f0f0f0);
    color: var(--primary-text-color);
    cursor: pointer;
    user-select: none;
  }

  .chip.active {
    background: var(--primary-color, #03a9f4);
    color: var(--text-primary-color, #fff);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 1px 8px;
    border-radius: 999px;
    font-size: 0.75em;
    font-weight: 500;
    white-space: nowrap;
  }

  .badge-warning {
    background: color-mix(in srgb, var(--warning-color, #ff9800) 18%, transparent);
    color: var(--warning-color, #ff9800);
  }

  .badge-error {
    background: color-mix(in srgb, var(--error-color, #f44336) 18%, transparent);
    color: var(--error-color, #f44336);
  }

  .badge-success {
    background: color-mix(in srgb, var(--success-color, #4caf50) 18%, transparent);
    color: var(--success-color, #4caf50);
  }

  .divider {
    border: none;
    border-top: 1px solid var(--divider-color, #e0e0e0);
    margin: 8px 0;
  }

  .empty-state {
    text-align: center;
    color: var(--secondary-text-color);
    padding: 24px 8px;
  }

  .error-text {
    color: var(--error-color, #f44336);
    font-size: 0.85em;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--divider-color, #e0e0e0);
    border-radius: 4px;
  }
`;
const COMMON = {
  searchByName: "Поиск по названию",
  lowStock: "Мало",
  expiringSoon: "Истекает",
  loading: "Загрузка…",
  noItems: "Ничего не найдено"
};
function registerCard({ tag, elementClass, editorTag, editorClass, cardConfig }) {
  if (!customElements.get(tag)) {
    customElements.define(tag, elementClass);
  }
  if (editorTag && editorClass && !customElements.get(editorTag)) {
    customElements.define(editorTag, editorClass);
  }
  window.customCards = window.customCards || [];
  const existing = window.customCards.find((card) => card.type === cardConfig.type);
  if (!existing) {
    window.customCards.push(cardConfig);
  }
}
const DOMAIN = "simple_inventory";
const STRUCTURE_DOMAIN = "simple_inventory_structure";
const SERVICES = {
  INCREMENT_ITEM: "increment_item",
  DECREMENT_ITEM: "decrement_item"
};
const WS_COMMANDS = {
  LIST_ITEMS: `${DOMAIN}/list_items`,
  SUBSCRIBE: `${DOMAIN}/subscribe`,
  GET_STRUCTURE: `${STRUCTURE_DOMAIN}/get_structure`,
  SUBSCRIBE_STRUCTURE: `${STRUCTURE_DOMAIN}/subscribe_structure`
};
const LEVEL = {
  ROOM: 0,
  FURNITURE: 1,
  SHELF: 2
};
const LEVEL_LABELS_RU = {
  [LEVEL.ROOM]: "Комната",
  [LEVEL.FURNITURE]: "Мебель",
  [LEVEL.SHELF]: "Полка/ящик"
};
function childrenOf(nodes, level, parentId) {
  return nodes.filter((n3) => n3.level === level && n3.parent === (parentId ?? null)).sort((a2, b2) => a2.name.localeCompare(b2.name, "ru"));
}
function structureToTree(nodes) {
  const build = (level, parentId) => childrenOf(nodes, level, parentId).map((node) => ({
    ...node,
    children: level < 2 ? build(level + 1, node.id) : []
  }));
  return build(0, null);
}
function matchLocationToNodes(nodes, location, parsePathFn) {
  const segments = parsePathFn(location);
  const ids = [null, null, null];
  let parentId = null;
  for (let level = 0; level < segments.length; level++) {
    const match = childrenOf(
      nodes,
      /** @type {0|1|2} */
      level,
      parentId
    ).find(
      (n3) => n3.name === segments[level]
    );
    if (!match) break;
    ids[level] = match.id;
    parentId = match.id;
  }
  return ids;
}
function cleanServiceData(obj) {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === void 0 || value === null || value === "") continue;
    out[key] = value;
  }
  return out;
}
function listInventories(hass) {
  if (!hass || !hass.states) return [];
  const seen = /* @__PURE__ */ new Map();
  for (const [entityId, state] of Object.entries(hass.states)) {
    if (!entityId.startsWith("sensor.") || !entityId.includes("inventory")) continue;
    const inventoryId = state.attributes && state.attributes.inventory_id;
    if (!inventoryId || seen.has(inventoryId)) continue;
    const friendlyName = state.attributes && state.attributes.friendly_name || inventoryId;
    seen.set(inventoryId, {
      inventory_id: inventoryId,
      name: friendlyName.replace(/\s+Inventory$/i, ""),
      entity_id: entityId
    });
  }
  return Array.from(seen.values()).sort((a2, b2) => a2.name.localeCompare(b2.name, "ru"));
}
async function fetchAllItems(hass) {
  const inventories = listInventories(hass);
  const perInventory = await Promise.all(
    inventories.map(async (inv) => {
      const result = await hass.callWS({
        type: WS_COMMANDS.LIST_ITEMS,
        inventory_id: inv.inventory_id
      });
      return (result.items || []).map((item) => ({
        ...item,
        inventory_id: inv.inventory_id,
        inventory_name: inv.name
      }));
    })
  );
  return perInventory.flat();
}
async function callIncrementItem(hass, data) {
  return hass.callService(DOMAIN, SERVICES.INCREMENT_ITEM, cleanServiceData(data));
}
async function callDecrementItem(hass, data) {
  return hass.callService(DOMAIN, SERVICES.DECREMENT_ITEM, cleanServiceData(data));
}
function subscribeItemsGlobal(hass, callback) {
  return hass.connection.subscribeMessage(() => callback(), { type: WS_COMMANDS.SUBSCRIBE });
}
async function loadStructure(hass) {
  const result = await hass.callWS({ type: WS_COMMANDS.GET_STRUCTURE });
  return result.structure;
}
function subscribeStructure(hass, callback) {
  return hass.connection.subscribeMessage((message) => callback(message.structure), {
    type: WS_COMMANDS.SUBSCRIBE_STRUCTURE
  });
}
function isLowStock(item) {
  const threshold = Number(item.auto_add_to_list_quantity || 0);
  const quantity = Number(item.quantity || 0);
  return threshold > 0 && quantity <= threshold;
}
function daysUntilExpiry(item) {
  if (!item.expiry_date) return null;
  const expiry = /* @__PURE__ */ new Date(`${item.expiry_date}T00:00:00`);
  if (Number.isNaN(expiry.getTime())) return null;
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const msPerDay = 24 * 60 * 60 * 1e3;
  return Math.round((expiry.getTime() - today.getTime()) / msPerDay);
}
function isExpiringSoon(item) {
  if (Number(item.quantity || 0) <= 0) return false;
  const days = daysUntilExpiry(item);
  if (days === null) return false;
  const alertDays = Number(item.expiry_alert_days || 0);
  return days <= alertDays;
}
function formatQuantity(item) {
  const qty = Number(item.quantity || 0);
  const rounded = Math.round(qty * 100) / 100;
  const unit = item.unit ? ` ${item.unit}` : "";
  return `${rounded}${unit}`;
}
function locationText(item) {
  if (item.location) return item.location;
  if (Array.isArray(item.locations) && item.locations.length) return item.locations[0];
  return "";
}
class InventoryItemRow extends i {
  _emit(type) {
    this.dispatchEvent(new CustomEvent(type, { detail: { item: this.item }, bubbles: true, composed: true }));
  }
  render() {
    const item = this.item;
    if (!item) return b``;
    const low = isLowStock(item);
    const expiring = isExpiringSoon(item);
    const days = daysUntilExpiry(item);
    const loc = locationText(item);
    return b`
      <div class="item-row">
        <div class="item-main">
          <div class="item-name">${item.name}</div>
          <div class="item-meta">
            ${item.category ? b`<span>${item.category}</span>` : ""}
            ${this.showLocation !== false && loc ? b`<span>${loc}</span>` : ""}
            ${low ? b`<span class="badge badge-warning">${COMMON.lowStock}</span>` : ""}
            ${expiring ? b`<span class="badge badge-error"
                  >${COMMON.expiringSoon}${days !== null ? b` (${days} дн.)` : ""}</span
                >` : ""}
          </div>
        </div>
        <div class="quantity">${formatQuantity(item)}</div>
        <div class="row">
          <button class="btn-icon" @click=${() => this._emit("decrement")} title="−" aria-label="Уменьшить">−</button>
          <button class="btn-icon" @click=${() => this._emit("increment")} title="+" aria-label="Увеличить">+</button>
        </div>
      </div>
    `;
  }
}
__publicField(InventoryItemRow, "properties", {
  item: { type: Object },
  showLocation: { type: Boolean, attribute: "show-location" }
});
__publicField(InventoryItemRow, "styles", [
  sharedStyles,
  i$3`
      :host {
        display: block;
      }
      .item-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 4px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      .item-main {
        flex: 1;
        min-width: 0;
      }
      .item-name {
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .item-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
        margin-top: 2px;
        color: var(--secondary-text-color);
        font-size: 0.85em;
      }
      .quantity {
        min-width: 64px;
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
    `
]);
if (!customElements.get("inventory-item-row")) {
  customElements.define("inventory-item-row", InventoryItemRow);
}
const STR = {
  cardTitle: "Инвентарь: обзор",
  tabPlaces: "Места",
  tabCategories: "Категории",
  noLocation: "Без места",
  noCategory: "Без категории"
};
function parsePath(location) {
  if (!location || typeof location !== "string") return [];
  return location.split("/").map((segment) => segment.trim()).filter((segment) => segment.length > 0).slice(0, 3);
}
function resolveItemLocation(item) {
  if (item.location) return item.location;
  if (Array.isArray(item.locations) && item.locations.length) return item.locations[0];
  return "";
}
function filterItems(items, { search, lowOnly, expiringOnly } = {}) {
  const q = (search || "").trim().toLowerCase();
  return (items || []).filter((item) => {
    if (q && !String(item.name || "").toLowerCase().includes(q)) return false;
    if (lowOnly && !isLowStock(item)) return false;
    if (expiringOnly && !isExpiringSoon(item)) return false;
    return true;
  });
}
function bucketItemsByNode(items, nodes) {
  const byNode = /* @__PURE__ */ new Map();
  const noLocation = [];
  for (const item of items) {
    const locStr = resolveItemLocation(item);
    const [roomId, furnitureId, shelfId] = matchLocationToNodes(nodes, locStr, parsePath);
    const deepest = shelfId || furnitureId || roomId || null;
    if (deepest) {
      if (!byNode.has(deepest)) byNode.set(deepest, []);
      byNode.get(deepest).push(item);
    } else {
      noLocation.push(item);
    }
  }
  return { byNode, noLocation };
}
function countStats(items) {
  let low = 0;
  let expiring = 0;
  for (const item of items) {
    if (isLowStock(item)) low++;
    if (isExpiringSoon(item)) expiring++;
  }
  return { total: items.length, low, expiring };
}
function annotateTree(tree, byNode, { showEmpty, hasActiveFilter }) {
  return (tree || []).map((node) => annotateNode(node, byNode, { showEmpty, hasActiveFilter }));
}
function annotateNode(node, byNode, opts) {
  const ownItems = byNode.get(node.id) || [];
  const children = (node.children || []).map((child) => annotateNode(child, byNode, opts));
  const subtreeItems = ownItems.concat(...children.map((c2) => c2.subtreeItems));
  const stats = countStats(subtreeItems);
  const visible = stats.total > 0 || !opts.hasActiveFilter && !!opts.showEmpty;
  return { ...node, ownItems, children, subtreeItems, ...stats, visible };
}
function buildCategoryGroups(items) {
  const map = /* @__PURE__ */ new Map();
  for (const item of items) {
    const cat = item.category && item.category.trim() ? item.category.trim() : null;
    const key = cat || "__none__";
    if (!map.has(key)) {
      map.set(key, { key, label: cat || STR.noCategory, items: [] });
    }
    map.get(key).items.push(item);
  }
  const groups = Array.from(map.values());
  groups.sort((a2, b2) => {
    if (a2.key === "__none__") return 1;
    if (b2.key === "__none__") return -1;
    return a2.label.localeCompare(b2.label, "ru");
  });
  return groups.map((group) => ({ ...group, ...countStats(group.items) }));
}
const DEFAULT_CONFIG = {
  default_tab: "places",
  show_empty_locations: true,
  collapsed_by_default: false
};
class InventoryViewCard extends i {
  constructor() {
    super();
    this._items = void 0;
    this._structure = void 0;
    this._tab = "places";
    this._search = "";
    this._lowOnly = false;
    this._expiringOnly = false;
    this._collapseOverrides = /* @__PURE__ */ new Set();
    this._pending = /* @__PURE__ */ new Set();
    this._config = { ...DEFAULT_CONFIG };
    this._hass = null;
    this._unsubItemsPromise = null;
    this._unsubStructurePromise = null;
  }
  setConfig(config) {
    this._config = { ...DEFAULT_CONFIG, ...config || {} };
    this._tab = this._config.default_tab === "categories" ? "categories" : "places";
  }
  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (first) this._init();
  }
  get hass() {
    return this._hass;
  }
  async _init() {
    try {
      const [items, structure] = await Promise.all([
        fetchAllItems(this._hass),
        loadStructure(this._hass)
      ]);
      this._items = items;
      this._structure = structure;
    } catch (err) {
      console.error("inventory-view-card: init failed", err);
      this._items = [];
      this._structure = { version: 1, nodes: [] };
    }
    this._unsubItemsPromise = subscribeItemsGlobal(this._hass, () => this._refetchItems());
    this._unsubStructurePromise = subscribeStructure(this._hass, (structure) => {
      this._structure = structure;
    });
  }
  async _refetchItems() {
    if (!this._hass) return;
    try {
      this._items = await fetchAllItems(this._hass);
    } catch (err) {
      console.error("inventory-view-card: refetch failed", err);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubItemsPromise) {
      this._unsubItemsPromise.then((unsub) => unsub && unsub()).catch(() => {
      });
    }
    if (this._unsubStructurePromise) {
      this._unsubStructurePromise.then((unsub) => unsub && unsub()).catch(() => {
      });
    }
  }
  getCardSize() {
    return 10;
  }
  static getStubConfig() {
    return {};
  }
  _setTab(tab) {
    this._tab = tab;
  }
  _onSearchInput(e2) {
    this._search = e2.target.value;
  }
  _toggleLow() {
    this._lowOnly = !this._lowOnly;
  }
  _toggleExpiring() {
    this._expiringOnly = !this._expiringOnly;
  }
  _filterState() {
    return { search: this._search, lowOnly: this._lowOnly, expiringOnly: this._expiringOnly };
  }
  _hasActiveFilter() {
    return !!(this._search && this._search.trim()) || this._lowOnly || this._expiringOnly;
  }
  _isCollapsed(key) {
    const def = !!this._config.collapsed_by_default;
    return this._collapseOverrides.has(key) ? !def : def;
  }
  _toggleCollapse(key) {
    const next = new Set(this._collapseOverrides);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    this._collapseOverrides = next;
  }
  _keyFor(item) {
    return `${item.inventory_id}::${item.name}`;
  }
  async _onIncrement(e2) {
    e2.stopPropagation();
    await this._callQuantity(e2.detail.item, callIncrementItem);
  }
  async _onDecrement(e2) {
    e2.stopPropagation();
    await this._callQuantity(e2.detail.item, callDecrementItem);
  }
  async _callQuantity(item, fn) {
    if (!item || !this._hass) return;
    const key = this._keyFor(item);
    if (this._pending.has(key)) return;
    const next = new Set(this._pending);
    next.add(key);
    this._pending = next;
    try {
      await fn(this._hass, { inventory_id: item.inventory_id, name: item.name, amount: 1 });
    } catch (err) {
      console.error("inventory-view-card: quantity update failed", err);
    } finally {
      const done = new Set(this._pending);
      done.delete(key);
      this._pending = done;
    }
  }
  _renderCounters(stats) {
    return b`
      <span class="badge">${stats.total}</span>
      ${stats.low ? b`<span class="badge badge-warning">${stats.low} ${COMMON.lowStock}</span>` : ""}
      ${stats.expiring ? b`<span class="badge badge-error">${stats.expiring} ${COMMON.expiringSoon}</span>` : ""}
    `;
  }
  _renderGroupHeader(key, name, level, stats) {
    const collapsed = this._isCollapsed(key);
    return b`
      <div class="group-header" @click=${() => this._toggleCollapse(key)}>
        <span class="chevron">${collapsed ? "▸" : "▾"}</span>
        <span class="group-name">${name}</span>
        ${level !== void 0 ? b`<span class="muted group-level">${level}</span>` : ""}
        ${this._renderCounters(stats)}
      </div>
    `;
  }
  _renderItemRow(item, showLocation) {
    const inFlight = this._pending.has(this._keyFor(item));
    return b`
      <div class="row-wrap ${inFlight ? "in-flight" : ""}">
        <inventory-item-row .item=${item} .showLocation=${showLocation}></inventory-item-row>
      </div>
    `;
  }
  _renderPlaceNode(node, depth) {
    const key = `struct:${node.id}`;
    const collapsed = this._isCollapsed(key);
    const visibleChildren = node.children.filter((c2) => c2.visible);
    return b`
      <div class="group ${depth > 0 ? "indent" : ""}">
        ${this._renderGroupHeader(key, node.name, LEVEL_LABELS_RU[node.level], node)}
        ${!collapsed ? b`
              <div class="group-body">
                ${node.ownItems.map((item) => this._renderItemRow(item, false))}
                ${visibleChildren.map((c2) => this._renderPlaceNode(c2, depth + 1))}
              </div>
            ` : ""}
      </div>
    `;
  }
  _renderPlacesTab() {
    const filtered = filterItems(this._items, this._filterState());
    const { byNode, noLocation } = bucketItemsByNode(filtered, this._structure.nodes || []);
    const hasActiveFilter = this._hasActiveFilter();
    const tree = structureToTree(this._structure.nodes || []);
    const annotated = annotateTree(tree, byNode, {
      showEmpty: this._config.show_empty_locations,
      hasActiveFilter
    });
    const visibleRoots = annotated.filter((n3) => n3.visible);
    const hasNoLocation = noLocation.length > 0;
    if (visibleRoots.length === 0 && !hasNoLocation) {
      return b`<div class="empty-state">${COMMON.noItems}</div>`;
    }
    const noLocKey = "no-location";
    const noLocCollapsed = this._isCollapsed(noLocKey);
    const noLocStats = countStats(noLocation);
    return b`
      <div class="tree">
        ${visibleRoots.map((n3) => this._renderPlaceNode(n3, 0))}
        ${hasNoLocation ? b`
              <div class="group">
                ${this._renderGroupHeader(noLocKey, STR.noLocation, void 0, noLocStats)}
                ${!noLocCollapsed ? b`<div class="group-body">
                      ${noLocation.map((item) => this._renderItemRow(item, true))}
                    </div>` : ""}
              </div>
            ` : ""}
      </div>
    `;
  }
  _renderCategoriesTab() {
    const filtered = filterItems(this._items, this._filterState());
    const groups = buildCategoryGroups(filtered);
    if (groups.length === 0) {
      return b`<div class="empty-state">${COMMON.noItems}</div>`;
    }
    return b`
      <div class="tree">
        ${groups.map((group) => {
      const key = `cat:${group.key}`;
      const collapsed = this._isCollapsed(key);
      return b`
            <div class="group">
              ${this._renderGroupHeader(key, group.label, void 0, group)}
              ${!collapsed ? b`<div class="group-body">
                    ${group.items.map((item) => this._renderItemRow(item, true))}
                  </div>` : ""}
            </div>
          `;
    })}
      </div>
    `;
  }
  render() {
    if (!this._hass) return b``;
    const loading = this._items === void 0 || this._structure === void 0;
    return b`
      <ha-card @increment=${this._onIncrement} @decrement=${this._onDecrement}>
        <div class="card-header">${STR.cardTitle}</div>
        <div class="row wrap tabs">
          <span class="chip ${this._tab === "places" ? "active" : ""}" @click=${() => this._setTab("places")}
            >${STR.tabPlaces}</span
          >
          <span
            class="chip ${this._tab === "categories" ? "active" : ""}"
            @click=${() => this._setTab("categories")}
            >${STR.tabCategories}</span
          >
        </div>
        <div class="row wrap filters">
          <input
            type="text"
            placeholder=${COMMON.searchByName}
            .value=${this._search}
            @input=${this._onSearchInput}
          />
          <span class="chip ${this._lowOnly ? "active" : ""}" @click=${() => this._toggleLow()}
            >${COMMON.lowStock}</span
          >
          <span class="chip ${this._expiringOnly ? "active" : ""}" @click=${() => this._toggleExpiring()}
            >${COMMON.expiringSoon}</span
          >
        </div>
        <hr class="divider" />
        ${loading ? b`<div class="empty-state">${COMMON.loading}</div>` : this._tab === "places" ? this._renderPlacesTab() : this._renderCategoriesTab()}
      </ha-card>
    `;
  }
}
__publicField(InventoryViewCard, "properties", {
  _items: { state: true },
  _structure: { state: true },
  _tab: { state: true },
  _search: { state: true },
  _lowOnly: { state: true },
  _expiringOnly: { state: true },
  _collapseOverrides: { state: true },
  _pending: { state: true }
});
__publicField(InventoryViewCard, "styles", [
  sharedStyles,
  i$3`
      .tabs {
        margin-bottom: 8px;
      }
      .filters {
        margin-bottom: 8px;
      }
      .filters input[type='text'] {
        flex: 1;
        min-width: 120px;
      }
      .tree {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .group-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 4px;
        cursor: pointer;
        border-radius: 6px;
      }
      .group-header:hover {
        background: var(--secondary-background-color, #f0f0f0);
      }
      .chevron {
        width: 14px;
        flex: none;
        text-align: center;
        color: var(--secondary-text-color);
      }
      .group-name {
        font-weight: 500;
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .group-level {
        flex: none;
      }
      .group-body {
        display: flex;
        flex-direction: column;
      }
      .indent {
        margin-left: 20px;
      }
      .row-wrap.in-flight {
        opacity: 0.55;
        pointer-events: none;
      }
    `
]);
registerCard({
  tag: "inventory-view-card",
  elementClass: InventoryViewCard,
  cardConfig: {
    type: "inventory-view-card",
    name: "Inventory: Просмотр по местам и категориям",
    description: "Дерево Комната → Мебель → Полка и группировка по категориям, со счётчиками и сворачиванием",
    preview: true
  }
});
