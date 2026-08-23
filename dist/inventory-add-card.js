var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a;
const t$2 = globalThis, e$4 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$3 = Symbol(), o$5 = /* @__PURE__ */ new WeakMap();
let n$4 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$3) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$4 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$5.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$5.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$4 = (t2) => new n$4("string" == typeof t2 ? t2 : t2 + "", void 0, s$3), i$4 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$4(o2, t2, s$3);
}, S$1 = (s2, o2) => {
  if (e$4) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$2.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$3 = e$4 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$4(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$3, defineProperty: e$3, getOwnPropertyDescriptor: h$3, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$4, getPrototypeOf: n$3 } = Object, a$1 = globalThis, c$2 = a$1.trustedTypes, l$1 = c$2 ? c$2.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
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
  let i3 = t2;
  switch (s2) {
    case Boolean:
      i3 = null !== t2;
      break;
    case Number:
      i3 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i3 = JSON.parse(t2);
      } catch (t3) {
        i3 = null;
      }
  }
  return i3;
} }, f$2 = (t2, s2) => !i$3(t2, s2), b$1 = { attribute: true, type: String, converter: u$1, reflect: false, useDefault: false, hasChanged: f$2 };
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
      const i3 = Symbol(), h2 = this.getPropertyDescriptor(t2, i3, s2);
      void 0 !== h2 && e$3(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i3) {
    const { get: e2, set: r2 } = h$3(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2 == null ? void 0 : e2.call(this);
      r2 == null ? void 0 : r2.call(this, s3), this.requestUpdate(t2, h2, i3);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t2 = n$3(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...r$3(t3), ...o$4(t3)];
      for (const i3 of s2) this.createProperty(i3, t3[i3]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i3] of s2) this.elementProperties.set(t3, i3);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i3 = this._$Eu(t3, s2);
      void 0 !== i3 && this._$Eh.set(i3, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i3 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i3.unshift(c$3(s3));
    } else void 0 !== s2 && i3.push(c$3(s2));
    return i3;
  }
  static _$Eu(t2, s2) {
    const i3 = s2.attribute;
    return false === i3 ? void 0 : "string" == typeof i3 ? i3 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
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
    for (const i3 of s2.keys()) this.hasOwnProperty(i3) && (t2.set(i3, this[i3]), delete this[i3]);
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
  attributeChangedCallback(t2, s2, i3) {
    this._$AK(t2, i3);
  }
  _$ET(t2, s2) {
    var _a2;
    const i3 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i3);
    if (void 0 !== e2 && true === i3.reflect) {
      const h2 = (void 0 !== ((_a2 = i3.converter) == null ? void 0 : _a2.toAttribute) ? i3.converter : u$1).toAttribute(s2, i3.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a2, _b;
    const i3 = this.constructor, e2 = i3._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i3.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u$1;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? ((_b = this._$Ej) == null ? void 0 : _b.get(e2)) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i3, e2 = false, h2) {
    var _a2;
    if (void 0 !== t2) {
      const r2 = this.constructor;
      if (false === e2 && (h2 = this[t2]), i3 ?? (i3 = r2.getPropertyOptions(t2)), !((i3.hasChanged ?? f$2)(h2, s2) || i3.useDefault && i3.reflect && h2 === ((_a2 = this._$Ej) == null ? void 0 : _a2.get(t2)) && !this.hasAttribute(r2._$Eu(t2, i3)))) return;
      this.C(t2, s2, i3);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i3, reflect: e2, wrapped: h2 }, r2) {
    i3 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i3 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
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
      if (t3.size > 0) for (const [s3, i3] of t3) {
        const { wrapped: t4 } = i3, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i3, e2);
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
const t$1 = globalThis, i$2 = (t2) => t2, s$2 = t$1.trustedTypes, e$2 = s$2 ? s$2.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h$2 = "$lit$", o$3 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$2 = "?" + o$3, r$2 = `<${n$2}>`, l = document, c$1 = () => l.createComment(""), a = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u = Array.isArray, d = (t2) => u(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), f$1 = "[ 	\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${f$1}(?:([^\\s"'>=/]+)(${f$1}*=${f$1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t2) => (i3, ...s2) => ({ _$litType$: t2, strings: i3, values: s2 }), b = x(1), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l.createTreeWalker(l, 129);
function V(t2, i3) {
  if (!u(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e$2 ? e$2.createHTML(i3) : i3;
}
const N = (t2, i3) => {
  const s2 = t2.length - 1, e2 = [];
  let n3, l2 = 2 === i3 ? "<svg>" : 3 === i3 ? "<math>" : "", c2 = v;
  for (let i4 = 0; i4 < s2; i4++) {
    const s3 = t2[i4];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p) : void 0 !== u2[3] && (c2 = p) : c2 === p ? ">" === u2[0] ? (c2 = n3 ?? v, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p : c2 === _ || c2 === m ? c2 = v : (c2 = p, n3 = void 0);
    const x2 = c2 === p && t2[i4 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v ? s3 + r$2 : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h$2 + s3.slice(d2) + o$3 + x2) : s3 + o$3 + (-2 === d2 ? i4 : x2);
  }
  return [V(t2, l2 + (t2[s2] || "<?>") + (2 === i3 ? "</svg>" : 3 === i3 ? "</math>" : "")), e2];
};
class S {
  constructor({ strings: t2, _$litType$: i3 }, e2) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = N(t2, i3);
    if (this.el = S.createElement(f2, e2), P.currentNode = this.el.content, 2 === i3 || 3 === i3) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h$2)) {
          const i4 = v2[a2++], s2 = r2.getAttribute(t3).split(o$3), e3 = /([.?@])?(.*)/.exec(i4);
          d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I : "?" === e3[1] ? L : "@" === e3[1] ? z : H }), r2.removeAttribute(t3);
        } else t3.startsWith(o$3) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
        if (y2.test(r2.tagName)) {
          const t3 = r2.textContent.split(o$3), i4 = t3.length - 1;
          if (i4 > 0) {
            r2.textContent = s$2 ? s$2.emptyScript : "";
            for (let s2 = 0; s2 < i4; s2++) r2.append(t3[s2], c$1()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t3[i4], c$1());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n$2) d2.push({ type: 2, index: l2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(o$3, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$3.length - 1;
      }
      l2++;
    }
  }
  static createElement(t2, i3) {
    const s2 = l.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function M(t2, i3, s2 = t2, e2) {
  var _a2, _b;
  if (i3 === E) return i3;
  let h2 = void 0 !== e2 ? (_a2 = s2._$Co) == null ? void 0 : _a2[e2] : s2._$Cl;
  const o2 = a(i3) ? void 0 : i3._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i3 = M(t2, h2._$AS(t2, i3.values), h2, e2)), i3;
}
class R {
  constructor(t2, i3) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i3 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? l).importNode(i3, true);
    P.currentNode = e2;
    let h2 = P.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i4;
        2 === r2.type ? i4 = new k(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i4 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i4 = new Z(h2, this, t2)), this._$AV.push(i4), r2 = s2[++n3];
      }
      o2 !== (r2 == null ? void 0 : r2.index) && (h2 = P.nextNode(), o2++);
    }
    return P.currentNode = l, e2;
  }
  p(t2) {
    let i3 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i3), i3 += s2.strings.length - 2) : s2._$AI(t2[i3])), i3++;
  }
}
class k {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t2, i3, s2, e2) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i3, this._$AM = s2, this.options = e2, this._$Cv = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i3 = this._$AM;
    return void 0 !== i3 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i3.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i3 = this) {
    t2 = M(this, t2, i3), a(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
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
    const { values: i3, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2) this._$AH.p(i3);
    else {
      const t3 = new R(e2, this), s3 = t3.u(this.options);
      t3.p(i3), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i3 = C.get(t2.strings);
    return void 0 === i3 && C.set(t2.strings, i3 = new S(t2)), i3;
  }
  k(t2) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i3.length ? i3.push(s2 = new k(this.O(c$1()), this.O(c$1()), this, this.options)) : s2 = i3[e2], s2._$AI(h2), e2++;
    e2 < i3.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i3.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, s2) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, s2); t2 !== this._$AB; ) {
      const s3 = i$2(t2).nextSibling;
      i$2(t2).remove(), t2 = s3;
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
  constructor(t2, i3, s2, e2, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i3, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t2, i3 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = M(this, t2, i3, 0), o2 = !a(t2) || t2 !== this._$AH && t2 !== E, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = M(this, e3[s2 + n3], i3, n3), r2 === E && (r2 = this._$AH[n3]), o2 || (o2 = !a(r2) || r2 !== this._$AH[n3]), r2 === A ? t2 = A : t2 !== A && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
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
  constructor(t2, i3, s2, e2, h2) {
    super(t2, i3, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i3 = this) {
    if ((t2 = M(this, t2, i3, 0) ?? A) === E) return;
    const s2 = this._$AH, e2 = t2 === A && s2 !== A || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== A && (s2 === A || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i3, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    M(this, t2);
  }
}
const B = t$1.litHtmlPolyfillSupport;
B == null ? void 0 : B(S, k), (t$1.litHtmlVersions ?? (t$1.litHtmlVersions = [])).push("3.3.3");
const D = (t2, i3, s2) => {
  const e2 = (s2 == null ? void 0 : s2.renderBefore) ?? i3;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e2._$litPart$ = h2 = new k(i3.insertBefore(c$1(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s$1 = globalThis;
let i$1 = class i extends y$1 {
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
};
i$1._$litElement$ = true, i$1["finalized"] = true, (_a = s$1.litElementHydrateSupport) == null ? void 0 : _a.call(s$1, { LitElement: i$1 });
const o$2 = s$1.litElementPolyfillSupport;
o$2 == null ? void 0 : o$2({ LitElement: i$1 });
(s$1.litElementVersions ?? (s$1.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const r$1 = (o2) => void 0 === o2.strings;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { CHILD: 2 }, e$1 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i2 {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i3) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i3;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s = (i3, t2) => {
  var _a2;
  const e2 = i3._$AN;
  if (void 0 === e2) return false;
  for (const i4 of e2) (_a2 = i4._$AO) == null ? void 0 : _a2.call(i4, t2, false), s(i4, t2);
  return true;
}, o$1 = (i3) => {
  let t2, e2;
  do {
    if (void 0 === (t2 = i3._$AM)) break;
    e2 = t2._$AN, e2.delete(i3), i3 = t2;
  } while (0 === (e2 == null ? void 0 : e2.size));
}, r = (i3) => {
  for (let t2; t2 = i3._$AM; i3 = t2) {
    let e2 = t2._$AN;
    if (void 0 === e2) t2._$AN = e2 = /* @__PURE__ */ new Set();
    else if (e2.has(i3)) break;
    e2.add(i3), c(t2);
  }
};
function h$1(i3) {
  void 0 !== this._$AN ? (o$1(this), this._$AM = i3, r(this)) : this._$AM = i3;
}
function n$1(i3, t2 = false, e2 = 0) {
  const r2 = this._$AH, h2 = this._$AN;
  if (void 0 !== h2 && 0 !== h2.size) if (t2) if (Array.isArray(r2)) for (let i4 = e2; i4 < r2.length; i4++) s(r2[i4], false), o$1(r2[i4]);
  else null != r2 && (s(r2, false), o$1(r2));
  else s(this, i3);
}
const c = (i3) => {
  i3.type == t.CHILD && (i3._$AP ?? (i3._$AP = n$1), i3._$AQ ?? (i3._$AQ = h$1));
};
class f extends i2 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i3, t2, e2) {
    super._$AT(i3, t2, e2), r(this), this.isConnected = i3._$AU;
  }
  _$AO(i3, t2 = true) {
    var _a2, _b;
    i3 !== this.isConnected && (this.isConnected = i3, i3 ? (_a2 = this.reconnected) == null ? void 0 : _a2.call(this) : (_b = this.disconnected) == null ? void 0 : _b.call(this)), t2 && (s(this, i3), o$1(this));
  }
  setValue(t2) {
    if (r$1(this._$Ct)) this._$Ct._$AI(t2, this);
    else {
      const i3 = [...this._$Ct._$AH];
      i3[this._$Ci] = t2, this._$Ct._$AI(i3, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = () => new h();
class h {
}
const o = /* @__PURE__ */ new WeakMap(), n2 = e$1(class extends f {
  render(i3) {
    return A;
  }
  update(i3, [s2]) {
    var _a2;
    const e2 = s2 !== this.G;
    return e2 && this.rt(void 0), (e2 || this.lt !== this.ct) && (this.G = s2, this.ht = (_a2 = i3.options) == null ? void 0 : _a2.host, this.rt(this.ct = i3.element)), A;
  }
  rt(t2) {
    if (void 0 !== this.G) if (this.isConnected || (t2 = void 0), "function" == typeof this.G) {
      const i3 = this.ht ?? globalThis;
      let s2 = o.get(i3);
      void 0 === s2 && (s2 = /* @__PURE__ */ new WeakMap(), o.set(i3, s2)), void 0 !== s2.get(this.G) && this.G.call(this.ht, void 0), s2.set(this.G, t2), void 0 !== t2 && this.G.call(this.ht, t2);
    } else this.G.value = t2;
  }
  get lt() {
    var _a2, _b;
    return "function" == typeof this.G ? (_a2 = o.get(this.ht ?? globalThis)) == null ? void 0 : _a2.get(this.G) : (_b = this.G) == null ? void 0 : _b.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
const DOMAIN = "simple_inventory";
const STRUCTURE_DOMAIN = "simple_inventory_structure";
const PATH_SEP = " / ";
const SERVICES = {
  ADD_ITEM: "add_item"
};
const WS_COMMANDS = {
  LIST_ITEMS: `${DOMAIN}/list_items`,
  GET_STRUCTURE: `${STRUCTURE_DOMAIN}/get_structure`,
  SUBSCRIBE_STRUCTURE: `${STRUCTURE_DOMAIN}/subscribe_structure`
};
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
async function callAddItem(hass, data) {
  return hass.callService(DOMAIN, SERVICES.ADD_ITEM, cleanServiceData(data));
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
function parsePath(location) {
  if (!location || typeof location !== "string") return [];
  return location.split("/").map((segment) => segment.trim()).filter((segment) => segment.length > 0).slice(0, 3);
}
function buildPath(segments) {
  return (segments || []).map((segment) => segment == null ? "" : String(segment).trim()).filter((segment) => segment.length > 0).join(PATH_SEP);
}
function nodeById(nodes, id) {
  return nodes.find((n3) => n3.id === id) || null;
}
function childrenOf(nodes, level, parentId) {
  return nodes.filter((n3) => n3.level === level && n3.parent === (parentId ?? null)).sort((a2, b2) => a2.name.localeCompare(b2.name, "ru"));
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
const sharedStyles = i$4`
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
  category: "Категория",
  room: "Комната",
  furniture: "Мебель",
  shelf: "Полка/ящик",
  quantity: "Количество",
  unit: "Единица",
  barcode: "Штрихкод",
  expiryDate: "Срок годности",
  price: "Цена",
  description: "Описание",
  inventory: "Инвентарь",
  add: "Добавить",
  errorGeneric: "Произошла ошибка"
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
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var quagga_min = { exports: {} };
(function(module, exports) {
  !function(t2, e2) {
    module.exports = e2();
  }(window, function() {
    return function(t2) {
      var e2 = {};
      function r2(n3) {
        if (e2[n3]) return e2[n3].exports;
        var o2 = e2[n3] = { i: n3, l: false, exports: {} };
        return t2[n3].call(o2.exports, o2, o2.exports, r2), o2.l = true, o2.exports;
      }
      return r2.m = t2, r2.c = e2, r2.d = function(t3, e3, n3) {
        r2.o(t3, e3) || Object.defineProperty(t3, e3, { enumerable: true, get: n3 });
      }, r2.r = function(t3) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t3, "__esModule", { value: true });
      }, r2.t = function(t3, e3) {
        if (1 & e3 && (t3 = r2(t3)), 8 & e3) return t3;
        if (4 & e3 && "object" == typeof t3 && t3 && t3.__esModule) return t3;
        var n3 = /* @__PURE__ */ Object.create(null);
        if (r2.r(n3), Object.defineProperty(n3, "default", { enumerable: true, value: t3 }), 2 & e3 && "string" != typeof t3) for (var o2 in t3) r2.d(n3, o2, (function(e4) {
          return t3[e4];
        }).bind(null, o2));
        return n3;
      }, r2.n = function(t3) {
        var e3 = t3 && t3.__esModule ? function() {
          return t3.default;
        } : function() {
          return t3;
        };
        return r2.d(e3, "a", e3), e3;
      }, r2.o = function(t3, e3) {
        return Object.prototype.hasOwnProperty.call(t3, e3);
      }, r2.p = "/", r2(r2.s = 90);
    }([function(t2, e2, r2) {
      var n3 = r2(68);
      t2.exports = function(t3, e3, r3) {
        return (e3 = n3(e3)) in t3 ? Object.defineProperty(t3, e3, { value: r3, enumerable: true, configurable: true, writable: true }) : t3[e3] = r3, t3;
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2) {
      function r2(e3) {
        return t2.exports = r2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
          return t3.__proto__ || Object.getPrototypeOf(t3);
        }, t2.exports.__esModule = true, t2.exports.default = t2.exports, r2(e3);
      }
      t2.exports = r2, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2) {
      t2.exports = function(t3, e3) {
        if (!(t3 instanceof e3)) throw new TypeError("Cannot call a class as a function");
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(68);
      function o2(t3, e3) {
        for (var r3 = 0; r3 < e3.length; r3++) {
          var o3 = e3[r3];
          o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t3, n3(o3.key), o3);
        }
      }
      t2.exports = function(t3, e3, r3) {
        return e3 && o2(t3.prototype, e3), r3 && o2(t3, r3), Object.defineProperty(t3, "prototype", { writable: false }), t3;
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(9).default, o2 = r2(150);
      t2.exports = function(t3, e3) {
        if (e3 && ("object" == n3(e3) || "function" == typeof e3)) return e3;
        if (void 0 !== e3) throw new TypeError("Derived constructors may only return object or undefined");
        return o2(t3);
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(38);
      t2.exports = function(t3, e3) {
        if ("function" != typeof e3 && null !== e3) throw new TypeError("Super expression must either be null or a function");
        t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && n3(t3, e3);
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(146)();
      t2.exports = n3;
      try {
        regeneratorRuntime = n3;
      } catch (t3) {
        "object" == typeof globalThis ? globalThis.regeneratorRuntime = n3 : Function("r", "regeneratorRuntime = r")(n3);
      }
    }, function(t2, e2) {
      function r2(t3, e3, r3, n3, o2, i3, a2) {
        try {
          var u2 = t3[i3](a2), c2 = u2.value;
        } catch (t4) {
          return void r3(t4);
        }
        u2.done ? e3(c2) : Promise.resolve(c2).then(n3, o2);
      }
      t2.exports = function(t3) {
        return function() {
          var e3 = this, n3 = arguments;
          return new Promise(function(o2, i3) {
            var a2 = t3.apply(e3, n3);
            function u2(t4) {
              r2(a2, o2, i3, u2, c2, "next", t4);
            }
            function c2(t4) {
              r2(a2, o2, i3, u2, c2, "throw", t4);
            }
            u2(void 0);
          });
        };
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(46), o2 = "object" == typeof self && self && self.Object === Object && self, i3 = n3 || o2 || Function("return this")();
      t2.exports = i3;
    }, function(t2, e2) {
      function r2(e3) {
        return t2.exports = r2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
          return typeof t3;
        } : function(t3) {
          return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
        }, t2.exports.__esModule = true, t2.exports.default = t2.exports, r2(e3);
      }
      t2.exports = r2, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2) {
      t2.exports = function(t3) {
        var e3 = typeof t3;
        return null != t3 && ("object" == e3 || "function" == e3);
      };
    }, function(t2, e2) {
      t2.exports = function(t3) {
        return null != t3 && "object" == typeof t3;
      };
    }, function(t2, e2) {
      var r2 = Array.isArray;
      t2.exports = r2;
    }, function(t2, e2, r2) {
      var n3 = r2(151);
      function o2() {
        return t2.exports = o2 = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(t3, e3, r3) {
          var o3 = n3(t3, e3);
          if (o3) {
            var i3 = Object.getOwnPropertyDescriptor(o3, e3);
            return i3.get ? i3.get.call(arguments.length < 3 ? t3 : r3) : i3.value;
          }
        }, t2.exports.__esModule = true, t2.exports.default = t2.exports, o2.apply(null, arguments);
      }
      t2.exports = o2, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(102), o2 = r2(108);
      t2.exports = function(t3, e3) {
        var r3 = o2(t3, e3);
        return n3(r3) ? r3 : void 0;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(91), o2 = r2(134)(function(t3, e3, r3) {
        n3(t3, e3, r3);
      });
      t2.exports = o2;
    }, function(t2, e2, r2) {
      var n3 = r2(152), o2 = r2(153), i3 = r2(66), a2 = r2(154);
      t2.exports = function(t3) {
        return n3(t3) || o2(t3) || i3(t3) || a2();
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(19), o2 = r2(104), i3 = r2(105), a2 = n3 ? n3.toStringTag : void 0;
      t2.exports = function(t3) {
        return null == t3 ? void 0 === t3 ? "[object Undefined]" : "[object Null]" : a2 && a2 in Object(t3) ? o2(t3) : i3(t3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(60), o2 = r2(29);
      t2.exports = function(t3, e3, r3, i3) {
        var a2 = !r3;
        r3 || (r3 = {});
        for (var u2 = -1, c2 = e3.length; ++u2 < c2; ) {
          var s2 = e3[u2], f2 = i3 ? i3(r3[s2], t3[s2], s2, r3, t3) : void 0;
          void 0 === f2 && (f2 = t3[s2]), a2 ? o2(r3, s2, f2) : n3(r3, s2, f2);
        }
        return r3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(8).Symbol;
      t2.exports = n3;
    }, function(t2, e2, r2) {
      var n3 = r2(61), o2 = r2(132), i3 = r2(26);
      t2.exports = function(t3) {
        return i3(t3) ? n3(t3, true) : o2(t3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(92), o2 = r2(93), i3 = r2(94), a2 = r2(95), u2 = r2(96);
      function c2(t3) {
        var e3 = -1, r3 = null == t3 ? 0 : t3.length;
        for (this.clear(); ++e3 < r3; ) {
          var n4 = t3[e3];
          this.set(n4[0], n4[1]);
        }
      }
      c2.prototype.clear = n3, c2.prototype.delete = o2, c2.prototype.get = i3, c2.prototype.has = a2, c2.prototype.set = u2, t2.exports = c2;
    }, function(t2, e2, r2) {
      var n3 = r2(23);
      t2.exports = function(t3, e3) {
        for (var r3 = t3.length; r3--; ) if (n3(t3[r3][0], e3)) return r3;
        return -1;
      };
    }, function(t2, e2) {
      t2.exports = function(t3, e3) {
        return t3 === e3 || t3 != t3 && e3 != e3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(14)(Object, "create");
      t2.exports = n3;
    }, function(t2, e2, r2) {
      var n3 = r2(117);
      t2.exports = function(t3, e3) {
        var r3 = t3.__data__;
        return n3(e3) ? r3["string" == typeof e3 ? "string" : "hash"] : r3.map;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(28), o2 = r2(56);
      t2.exports = function(t3) {
        return null != t3 && o2(t3.length) && !n3(t3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(14)(r2(8), "Map");
      t2.exports = n3;
    }, function(t2, e2, r2) {
      var n3 = r2(17), o2 = r2(10);
      t2.exports = function(t3) {
        if (!o2(t3)) return false;
        var e3 = n3(t3);
        return "[object Function]" == e3 || "[object GeneratorFunction]" == e3 || "[object AsyncFunction]" == e3 || "[object Proxy]" == e3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(50);
      t2.exports = function(t3, e3, r3) {
        "__proto__" == e3 && n3 ? n3(t3, e3, { configurable: true, enumerable: true, value: r3, writable: true }) : t3[e3] = r3;
      };
    }, function(t2, e2) {
      t2.exports = function(t3) {
        return t3.webpackPolyfill || (t3.deprecate = function() {
        }, t3.paths = [], t3.children || (t3.children = []), Object.defineProperty(t3, "loaded", { enumerable: true, get: function() {
          return t3.l;
        } }), Object.defineProperty(t3, "id", { enumerable: true, get: function() {
          return t3.i;
        } }), t3.webpackPolyfill = 1), t3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(124);
      t2.exports = function(t3) {
        var e3 = new t3.constructor(t3.byteLength);
        return new n3(e3).set(new n3(t3)), e3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(55)(Object.getPrototypeOf, Object);
      t2.exports = n3;
    }, function(t2, e2) {
      var r2 = Object.prototype;
      t2.exports = function(t3) {
        var e3 = t3 && t3.constructor;
        return t3 === ("function" == typeof e3 && e3.prototype || r2);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(126), o2 = r2(11), i3 = Object.prototype, a2 = i3.hasOwnProperty, u2 = i3.propertyIsEnumerable, c2 = n3(/* @__PURE__ */ function() {
        return arguments;
      }()) ? n3 : function(t3) {
        return o2(t3) && a2.call(t3, "callee") && !u2.call(t3, "callee");
      };
      t2.exports = c2;
    }, function(t2, e2, r2) {
      (function(t3) {
        var n3 = r2(8), o2 = r2(128), i3 = e2 && !e2.nodeType && e2, a2 = i3 && "object" == typeof t3 && t3 && !t3.nodeType && t3, u2 = a2 && a2.exports === i3 ? n3.Buffer : void 0, c2 = (u2 ? u2.isBuffer : void 0) || o2;
        t3.exports = c2;
      }).call(this, r2(30)(t2));
    }, function(t2, e2) {
      t2.exports = function(t3) {
        return function(e3) {
          return t3(e3);
        };
      };
    }, function(t2, e2, r2) {
      (function(t3) {
        var n3 = r2(46), o2 = e2 && !e2.nodeType && e2, i3 = o2 && "object" == typeof t3 && t3 && !t3.nodeType && t3, a2 = i3 && i3.exports === o2 && n3.process, u2 = function() {
          try {
            var t4 = i3 && i3.require && i3.require("util").types;
            return t4 || a2 && a2.binding && a2.binding("util");
          } catch (t5) {
          }
        }();
        t3.exports = u2;
      }).call(this, r2(30)(t2));
    }, function(t2, e2) {
      function r2(e3, n3) {
        return t2.exports = r2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e4) {
          return t3.__proto__ = e4, t3;
        }, t2.exports.__esModule = true, t2.exports.default = t2.exports, r2(e3, n3);
      }
      t2.exports = r2, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(61), o2 = r2(159), i3 = r2(26);
      t2.exports = function(t3) {
        return i3(t3) ? n3(t3) : o2(t3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(163), o2 = r2(75), i3 = Object.prototype.propertyIsEnumerable, a2 = Object.getOwnPropertySymbols, u2 = a2 ? function(t3) {
        return null == t3 ? [] : (t3 = Object(t3), n3(a2(t3), function(e3) {
          return i3.call(t3, e3);
        }));
      } : o2;
      t2.exports = u2;
    }, function(t2, e2) {
      t2.exports = function(t3, e3) {
        for (var r2 = -1, n3 = e3.length, o2 = t3.length; ++r2 < n3; ) t3[o2 + r2] = e3[r2];
        return t3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(166), o2 = r2(27), i3 = r2(167), a2 = r2(168), u2 = r2(169), c2 = r2(17), s2 = r2(47), f2 = s2(n3), l2 = s2(o2), d2 = s2(i3), h2 = s2(a2), v2 = s2(u2), p2 = c2;
      (n3 && "[object DataView]" != p2(new n3(new ArrayBuffer(1))) || o2 && "[object Map]" != p2(new o2()) || i3 && "[object Promise]" != p2(i3.resolve()) || a2 && "[object Set]" != p2(new a2()) || u2 && "[object WeakMap]" != p2(new u2())) && (p2 = function(t3) {
        var e3 = c2(t3), r3 = "[object Object]" == e3 ? t3.constructor : void 0, n4 = r3 ? s2(r3) : "";
        if (n4) switch (n4) {
          case f2:
            return "[object DataView]";
          case l2:
            return "[object Map]";
          case d2:
            return "[object Promise]";
          case h2:
            return "[object Set]";
          case v2:
            return "[object WeakMap]";
        }
        return e3;
      }), t2.exports = p2;
    }, function(t2, e2, r2) {
      var n3 = r2(12), o2 = r2(180), i3 = r2(181), a2 = r2(184);
      t2.exports = function(t3, e3) {
        return n3(t3) ? t3 : o2(t3, e3) ? [t3] : i3(a2(t3));
      };
    }, function(t2, e2, r2) {
      var n3 = r2(17), o2 = r2(11);
      t2.exports = function(t3) {
        return "symbol" == typeof t3 || o2(t3) && "[object Symbol]" == n3(t3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(21), o2 = r2(97), i3 = r2(98), a2 = r2(99), u2 = r2(100), c2 = r2(101);
      function s2(t3) {
        var e3 = this.__data__ = new n3(t3);
        this.size = e3.size;
      }
      s2.prototype.clear = o2, s2.prototype.delete = i3, s2.prototype.get = a2, s2.prototype.has = u2, s2.prototype.set = c2, t2.exports = s2;
    }, function(t2, e2, r2) {
      (function(e3) {
        var r3 = "object" == typeof e3 && e3 && e3.Object === Object && e3;
        t2.exports = r3;
      }).call(this, r2(103));
    }, function(t2, e2) {
      var r2 = Function.prototype.toString;
      t2.exports = function(t3) {
        if (null != t3) {
          try {
            return r2.call(t3);
          } catch (t4) {
          }
          try {
            return t3 + "";
          } catch (t4) {
          }
        }
        return "";
      };
    }, function(t2, e2, r2) {
      var n3 = r2(109), o2 = r2(116), i3 = r2(118), a2 = r2(119), u2 = r2(120);
      function c2(t3) {
        var e3 = -1, r3 = null == t3 ? 0 : t3.length;
        for (this.clear(); ++e3 < r3; ) {
          var n4 = t3[e3];
          this.set(n4[0], n4[1]);
        }
      }
      c2.prototype.clear = n3, c2.prototype.delete = o2, c2.prototype.get = i3, c2.prototype.has = a2, c2.prototype.set = u2, t2.exports = c2;
    }, function(t2, e2, r2) {
      var n3 = r2(29), o2 = r2(23);
      t2.exports = function(t3, e3, r3) {
        (void 0 !== r3 && !o2(t3[e3], r3) || void 0 === r3 && !(e3 in t3)) && n3(t3, e3, r3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(14), o2 = function() {
        try {
          var t3 = n3(Object, "defineProperty");
          return t3({}, "", {}), t3;
        } catch (t4) {
        }
      }();
      t2.exports = o2;
    }, function(t2, e2, r2) {
      (function(t3) {
        var n3 = r2(8), o2 = e2 && !e2.nodeType && e2, i3 = o2 && "object" == typeof t3 && t3 && !t3.nodeType && t3, a2 = i3 && i3.exports === o2 ? n3.Buffer : void 0, u2 = a2 ? a2.allocUnsafe : void 0;
        t3.exports = function(t4, e3) {
          if (e3) return t4.slice();
          var r3 = t4.length, n4 = u2 ? u2(r3) : new t4.constructor(r3);
          return t4.copy(n4), n4;
        };
      }).call(this, r2(30)(t2));
    }, function(t2, e2, r2) {
      var n3 = r2(31);
      t2.exports = function(t3, e3) {
        var r3 = e3 ? n3(t3.buffer) : t3.buffer;
        return new t3.constructor(r3, t3.byteOffset, t3.length);
      };
    }, function(t2, e2) {
      t2.exports = function(t3, e3) {
        var r2 = -1, n3 = t3.length;
        for (e3 || (e3 = Array(n3)); ++r2 < n3; ) e3[r2] = t3[r2];
        return e3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(125), o2 = r2(32), i3 = r2(33);
      t2.exports = function(t3) {
        return "function" != typeof t3.constructor || i3(t3) ? {} : n3(o2(t3));
      };
    }, function(t2, e2) {
      t2.exports = function(t3, e3) {
        return function(r2) {
          return t3(e3(r2));
        };
      };
    }, function(t2, e2) {
      t2.exports = function(t3) {
        return "number" == typeof t3 && t3 > -1 && t3 % 1 == 0 && t3 <= 9007199254740991;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(17), o2 = r2(32), i3 = r2(11), a2 = Function.prototype, u2 = Object.prototype, c2 = a2.toString, s2 = u2.hasOwnProperty, f2 = c2.call(Object);
      t2.exports = function(t3) {
        if (!i3(t3) || "[object Object]" != n3(t3)) return false;
        var e3 = o2(t3);
        if (null === e3) return true;
        var r3 = s2.call(e3, "constructor") && e3.constructor;
        return "function" == typeof r3 && r3 instanceof r3 && c2.call(r3) == f2;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(129), o2 = r2(36), i3 = r2(37), a2 = i3 && i3.isTypedArray, u2 = a2 ? o2(a2) : n3;
      t2.exports = u2;
    }, function(t2, e2) {
      t2.exports = function(t3, e3) {
        if (("constructor" !== e3 || "function" != typeof t3[e3]) && "__proto__" != e3) return t3[e3];
      };
    }, function(t2, e2, r2) {
      var n3 = r2(29), o2 = r2(23), i3 = Object.prototype.hasOwnProperty;
      t2.exports = function(t3, e3, r3) {
        var a2 = t3[e3];
        i3.call(t3, e3) && o2(a2, r3) && (void 0 !== r3 || e3 in t3) || n3(t3, e3, r3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(131), o2 = r2(34), i3 = r2(12), a2 = r2(35), u2 = r2(62), c2 = r2(58), s2 = Object.prototype.hasOwnProperty;
      t2.exports = function(t3, e3) {
        var r3 = i3(t3), f2 = !r3 && o2(t3), l2 = !r3 && !f2 && a2(t3), d2 = !r3 && !f2 && !l2 && c2(t3), h2 = r3 || f2 || l2 || d2, v2 = h2 ? n3(t3.length, String) : [], p2 = v2.length;
        for (var y3 in t3) !e3 && !s2.call(t3, y3) || h2 && ("length" == y3 || l2 && ("offset" == y3 || "parent" == y3) || d2 && ("buffer" == y3 || "byteLength" == y3 || "byteOffset" == y3) || u2(y3, p2)) || v2.push(y3);
        return v2;
      };
    }, function(t2, e2) {
      var r2 = /^(?:0|[1-9]\d*)$/;
      t2.exports = function(t3, e3) {
        var n3 = typeof t3;
        return !!(e3 = null == e3 ? 9007199254740991 : e3) && ("number" == n3 || "symbol" != n3 && r2.test(t3)) && t3 > -1 && t3 % 1 == 0 && t3 < e3;
      };
    }, function(t2, e2) {
      t2.exports = function(t3) {
        return t3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(136), o2 = Math.max;
      t2.exports = function(t3, e3, r3) {
        return e3 = o2(void 0 === e3 ? t3.length - 1 : e3, 0), function() {
          for (var i3 = arguments, a2 = -1, u2 = o2(i3.length - e3, 0), c2 = Array(u2); ++a2 < u2; ) c2[a2] = i3[e3 + a2];
          a2 = -1;
          for (var s2 = Array(e3 + 1); ++a2 < e3; ) s2[a2] = i3[a2];
          return s2[e3] = r3(c2), n3(t3, this, s2);
        };
      };
    }, function(t2, e2, r2) {
      var n3 = r2(137), o2 = r2(139)(n3);
      t2.exports = o2;
    }, function(t2, e2, r2) {
      var n3 = r2(67);
      t2.exports = function(t3, e3) {
        if (t3) {
          if ("string" == typeof t3) return n3(t3, e3);
          var r3 = {}.toString.call(t3).slice(8, -1);
          return "Object" === r3 && t3.constructor && (r3 = t3.constructor.name), "Map" === r3 || "Set" === r3 ? Array.from(t3) : "Arguments" === r3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r3) ? n3(t3, e3) : void 0;
        }
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2) {
      t2.exports = function(t3, e3) {
        (null == e3 || e3 > t3.length) && (e3 = t3.length);
        for (var r2 = 0, n3 = Array(e3); r2 < e3; r2++) n3[r2] = t3[r2];
        return n3;
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(9).default, o2 = r2(145);
      t2.exports = function(t3) {
        var e3 = o2(t3, "string");
        return "symbol" == n3(e3) ? e3 : e3 + "";
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2) {
      t2.exports = function(t3, e3) {
        this.v = t3, this.k = e3;
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(71);
      function o2() {
        /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
        var e3, r3, i3 = "function" == typeof Symbol ? Symbol : {}, a2 = i3.iterator || "@@iterator", u2 = i3.toStringTag || "@@toStringTag";
        function c2(t3, o3, i4, a3) {
          var u3 = o3 && o3.prototype instanceof f2 ? o3 : f2, c3 = Object.create(u3.prototype);
          return n3(c3, "_invoke", function(t4, n4, o4) {
            var i5, a4, u4, c4 = 0, f3 = o4 || [], l3 = false, d3 = { p: 0, n: 0, v: e3, a: h3, f: h3.bind(e3, 4), d: function(t5, r4) {
              return i5 = t5, a4 = 0, u4 = e3, d3.n = r4, s2;
            } };
            function h3(t5, n5) {
              for (a4 = t5, u4 = n5, r3 = 0; !l3 && c4 && !o5 && r3 < f3.length; r3++) {
                var o5, i6 = f3[r3], h4 = d3.p, v3 = i6[2];
                t5 > 3 ? (o5 = v3 === n5) && (u4 = i6[(a4 = i6[4]) ? 5 : (a4 = 3, 3)], i6[4] = i6[5] = e3) : i6[0] <= h4 && ((o5 = t5 < 2 && h4 < i6[1]) ? (a4 = 0, d3.v = n5, d3.n = i6[1]) : h4 < v3 && (o5 = t5 < 3 || i6[0] > n5 || n5 > v3) && (i6[4] = t5, i6[5] = n5, d3.n = v3, a4 = 0));
              }
              if (o5 || t5 > 1) return s2;
              throw l3 = true, n5;
            }
            return function(o5, f4, v3) {
              if (c4 > 1) throw TypeError("Generator is already running");
              for (l3 && 1 === f4 && h3(f4, v3), a4 = f4, u4 = v3; (r3 = a4 < 2 ? e3 : u4) || !l3; ) {
                i5 || (a4 ? a4 < 3 ? (a4 > 1 && (d3.n = -1), h3(a4, u4)) : d3.n = u4 : d3.v = u4);
                try {
                  if (c4 = 2, i5) {
                    if (a4 || (o5 = "next"), r3 = i5[o5]) {
                      if (!(r3 = r3.call(i5, u4))) throw TypeError("iterator result is not an object");
                      if (!r3.done) return r3;
                      u4 = r3.value, a4 < 2 && (a4 = 0);
                    } else 1 === a4 && (r3 = i5.return) && r3.call(i5), a4 < 2 && (u4 = TypeError("The iterator does not provide a '" + o5 + "' method"), a4 = 1);
                    i5 = e3;
                  } else if ((r3 = (l3 = d3.n < 0) ? u4 : t4.call(n4, d3)) !== s2) break;
                } catch (t5) {
                  i5 = e3, a4 = 1, u4 = t5;
                } finally {
                  c4 = 1;
                }
              }
              return { value: r3, done: l3 };
            };
          }(t3, i4, a3), true), c3;
        }
        var s2 = {};
        function f2() {
        }
        function l2() {
        }
        function d2() {
        }
        r3 = Object.getPrototypeOf;
        var h2 = [][a2] ? r3(r3([][a2]())) : (n3(r3 = {}, a2, function() {
          return this;
        }), r3), v2 = d2.prototype = f2.prototype = Object.create(h2);
        function p2(t3) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(t3, d2) : (t3.__proto__ = d2, n3(t3, u2, "GeneratorFunction")), t3.prototype = Object.create(v2), t3;
        }
        return l2.prototype = d2, n3(v2, "constructor", d2), n3(d2, "constructor", l2), l2.displayName = "GeneratorFunction", n3(d2, u2, "GeneratorFunction"), n3(v2), n3(v2, u2, "Generator"), n3(v2, a2, function() {
          return this;
        }), n3(v2, "toString", function() {
          return "[object Generator]";
        }), (t2.exports = o2 = function() {
          return { w: c2, m: p2 };
        }, t2.exports.__esModule = true, t2.exports.default = t2.exports)();
      }
      t2.exports = o2, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2) {
      function r2(e3, n3, o2, i3) {
        var a2 = Object.defineProperty;
        try {
          a2({}, "", {});
        } catch (e4) {
          a2 = 0;
        }
        t2.exports = r2 = function(t3, e4, n4, o3) {
          function i4(e5, n5) {
            r2(t3, e5, function(t4) {
              return this._invoke(e5, n5, t4);
            });
          }
          e4 ? a2 ? a2(t3, e4, { value: n4, enumerable: !o3, configurable: !o3, writable: !o3 }) : t3[e4] = n4 : (i4("next", 0), i4("throw", 1), i4("return", 2));
        }, t2.exports.__esModule = true, t2.exports.default = t2.exports, r2(e3, n3, o2, i3);
      }
      t2.exports = r2, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(70), o2 = r2(73);
      t2.exports = function(t3, e3, r3, i3, a2) {
        return new o2(n3().w(t3, e3, r3, i3), a2 || Promise);
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(69), o2 = r2(71);
      t2.exports = function t3(e3, r3) {
        function i3(t4, o3, a3, u2) {
          try {
            var c2 = e3[t4](o3), s2 = c2.value;
            return s2 instanceof n3 ? r3.resolve(s2.v).then(function(t5) {
              i3("next", t5, a3, u2);
            }, function(t5) {
              i3("throw", t5, a3, u2);
            }) : r3.resolve(s2).then(function(t5) {
              c2.value = t5, a3(c2);
            }, function(t5) {
              return i3("throw", t5, a3, u2);
            });
          } catch (t5) {
            u2(t5);
          }
        }
        var a2;
        this.next || (o2(t3.prototype), o2(t3.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function() {
          return this;
        })), o2(this, "_invoke", function(t4, e4, n4) {
          function o3() {
            return new r3(function(e5, r4) {
              i3(t4, n4, e5, r4);
            });
          }
          return a2 = a2 ? a2.then(o3, o3) : o3();
        }, true);
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2) {
      t2.exports = function(t3, e3) {
        for (var r2 = -1, n3 = null == t3 ? 0 : t3.length, o2 = Array(n3); ++r2 < n3; ) o2[r2] = e3(t3[r2], r2, t3);
        return o2;
      };
    }, function(t2, e2) {
      t2.exports = function() {
        return [];
      };
    }, function(t2, e2, r2) {
      var n3 = r2(41), o2 = r2(32), i3 = r2(40), a2 = r2(75), u2 = Object.getOwnPropertySymbols ? function(t3) {
        for (var e3 = []; t3; ) n3(e3, i3(t3)), t3 = o2(t3);
        return e3;
      } : a2;
      t2.exports = u2;
    }, function(t2, e2, r2) {
      var n3 = r2(41), o2 = r2(12);
      t2.exports = function(t3, e3, r3) {
        var i3 = e3(t3);
        return o2(t3) ? i3 : n3(i3, r3(t3));
      };
    }, function(t2, e2, r2) {
      var n3 = r2(77), o2 = r2(76), i3 = r2(20);
      t2.exports = function(t3) {
        return n3(t3, i3, o2);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(44);
      t2.exports = function(t3) {
        if ("string" == typeof t3 || n3(t3)) return t3;
        var e3 = t3 + "";
        return "0" == e3 && 1 / t3 == -1 / 0 ? "-0" : e3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(142), o2 = r2(143), i3 = r2(66), a2 = r2(144);
      t2.exports = function(t3, e3) {
        return n3(t3) || o2(t3, e3) || i3(t3, e3) || a2();
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(155);
      t2.exports = function(t3, e3) {
        if (null == t3) return {};
        var r3, o2, i3 = n3(t3, e3);
        if (Object.getOwnPropertySymbols) {
          var a2 = Object.getOwnPropertySymbols(t3);
          for (o2 = 0; o2 < a2.length; o2++) r3 = a2[o2], -1 === e3.indexOf(r3) && {}.propertyIsEnumerable.call(t3, r3) && (i3[r3] = t3[r3]);
        }
        return i3;
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(74), o2 = r2(156), i3 = r2(179), a2 = r2(43), u2 = r2(18), c2 = r2(190), s2 = r2(191), f2 = r2(78), l2 = s2(function(t3, e3) {
        var r3 = {};
        if (null == t3) return r3;
        var s3 = false;
        e3 = n3(e3, function(e4) {
          return e4 = a2(e4, t3), s3 || (s3 = e4.length > 1), e4;
        }), u2(t3, f2(t3), r3), s3 && (r3 = o2(r3, 7, c2));
        for (var l3 = e3.length; l3--; ) i3(r3, e3[l3]);
        return r3;
      });
      t2.exports = l2;
    }, function(t2, e2, r2) {
      var n3 = r2(1), o2 = r2(38), i3 = r2(195), a2 = r2(196);
      function u2(e3) {
        var r3 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
        return t2.exports = u2 = function(t3) {
          if (null === t3 || !i3(t3)) return t3;
          if ("function" != typeof t3) throw new TypeError("Super expression must either be null or a function");
          if (void 0 !== r3) {
            if (r3.has(t3)) return r3.get(t3);
            r3.set(t3, e4);
          }
          function e4() {
            return a2(t3, arguments, n3(this).constructor);
          }
          return e4.prototype = Object.create(t3.prototype, { constructor: { value: e4, enumerable: false, writable: true, configurable: true } }), o2(e4, t3);
        }, t2.exports.__esModule = true, t2.exports.default = t2.exports, u2(e3);
      }
      t2.exports = u2, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, , , , , , , function(t2, e2, r2) {
      t2.exports = r2(198);
    }, function(t2, e2, r2) {
      var n3 = r2(45), o2 = r2(49), i3 = r2(121), a2 = r2(123), u2 = r2(10), c2 = r2(20), s2 = r2(59);
      t2.exports = function t3(e3, r3, f2, l2, d2) {
        e3 !== r3 && i3(r3, function(i4, c3) {
          if (d2 || (d2 = new n3()), u2(i4)) a2(e3, r3, c3, f2, t3, l2, d2);
          else {
            var h2 = l2 ? l2(s2(e3, c3), i4, c3 + "", e3, r3, d2) : void 0;
            void 0 === h2 && (h2 = i4), o2(e3, c3, h2);
          }
        }, c2);
      };
    }, function(t2, e2) {
      t2.exports = function() {
        this.__data__ = [], this.size = 0;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(22), o2 = Array.prototype.splice;
      t2.exports = function(t3) {
        var e3 = this.__data__, r3 = n3(e3, t3);
        return !(r3 < 0) && (r3 == e3.length - 1 ? e3.pop() : o2.call(e3, r3, 1), --this.size, true);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(22);
      t2.exports = function(t3) {
        var e3 = this.__data__, r3 = n3(e3, t3);
        return r3 < 0 ? void 0 : e3[r3][1];
      };
    }, function(t2, e2, r2) {
      var n3 = r2(22);
      t2.exports = function(t3) {
        return n3(this.__data__, t3) > -1;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(22);
      t2.exports = function(t3, e3) {
        var r3 = this.__data__, o2 = n3(r3, t3);
        return o2 < 0 ? (++this.size, r3.push([t3, e3])) : r3[o2][1] = e3, this;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(21);
      t2.exports = function() {
        this.__data__ = new n3(), this.size = 0;
      };
    }, function(t2, e2) {
      t2.exports = function(t3) {
        var e3 = this.__data__, r2 = e3.delete(t3);
        return this.size = e3.size, r2;
      };
    }, function(t2, e2) {
      t2.exports = function(t3) {
        return this.__data__.get(t3);
      };
    }, function(t2, e2) {
      t2.exports = function(t3) {
        return this.__data__.has(t3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(21), o2 = r2(27), i3 = r2(48);
      t2.exports = function(t3, e3) {
        var r3 = this.__data__;
        if (r3 instanceof n3) {
          var a2 = r3.__data__;
          if (!o2 || a2.length < 199) return a2.push([t3, e3]), this.size = ++r3.size, this;
          r3 = this.__data__ = new i3(a2);
        }
        return r3.set(t3, e3), this.size = r3.size, this;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(28), o2 = r2(106), i3 = r2(10), a2 = r2(47), u2 = /^\[object .+?Constructor\]$/, c2 = Function.prototype, s2 = Object.prototype, f2 = c2.toString, l2 = s2.hasOwnProperty, d2 = RegExp("^" + f2.call(l2).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      t2.exports = function(t3) {
        return !(!i3(t3) || o2(t3)) && (n3(t3) ? d2 : u2).test(a2(t3));
      };
    }, function(t2, e2) {
      var r2;
      r2 = /* @__PURE__ */ function() {
        return this;
      }();
      try {
        r2 = r2 || new Function("return this")();
      } catch (t3) {
        "object" == typeof window && (r2 = window);
      }
      t2.exports = r2;
    }, function(t2, e2, r2) {
      var n3 = r2(19), o2 = Object.prototype, i3 = o2.hasOwnProperty, a2 = o2.toString, u2 = n3 ? n3.toStringTag : void 0;
      t2.exports = function(t3) {
        var e3 = i3.call(t3, u2), r3 = t3[u2];
        try {
          t3[u2] = void 0;
          var n4 = true;
        } catch (t4) {
        }
        var o3 = a2.call(t3);
        return n4 && (e3 ? t3[u2] = r3 : delete t3[u2]), o3;
      };
    }, function(t2, e2) {
      var r2 = Object.prototype.toString;
      t2.exports = function(t3) {
        return r2.call(t3);
      };
    }, function(t2, e2, r2) {
      var n3, o2 = r2(107), i3 = (n3 = /[^.]+$/.exec(o2 && o2.keys && o2.keys.IE_PROTO || "")) ? "Symbol(src)_1." + n3 : "";
      t2.exports = function(t3) {
        return !!i3 && i3 in t3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(8)["__core-js_shared__"];
      t2.exports = n3;
    }, function(t2, e2) {
      t2.exports = function(t3, e3) {
        return null == t3 ? void 0 : t3[e3];
      };
    }, function(t2, e2, r2) {
      var n3 = r2(110), o2 = r2(21), i3 = r2(27);
      t2.exports = function() {
        this.size = 0, this.__data__ = { hash: new n3(), map: new (i3 || o2)(), string: new n3() };
      };
    }, function(t2, e2, r2) {
      var n3 = r2(111), o2 = r2(112), i3 = r2(113), a2 = r2(114), u2 = r2(115);
      function c2(t3) {
        var e3 = -1, r3 = null == t3 ? 0 : t3.length;
        for (this.clear(); ++e3 < r3; ) {
          var n4 = t3[e3];
          this.set(n4[0], n4[1]);
        }
      }
      c2.prototype.clear = n3, c2.prototype.delete = o2, c2.prototype.get = i3, c2.prototype.has = a2, c2.prototype.set = u2, t2.exports = c2;
    }, function(t2, e2, r2) {
      var n3 = r2(24);
      t2.exports = function() {
        this.__data__ = n3 ? n3(null) : {}, this.size = 0;
      };
    }, function(t2, e2) {
      t2.exports = function(t3) {
        var e3 = this.has(t3) && delete this.__data__[t3];
        return this.size -= e3 ? 1 : 0, e3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(24), o2 = Object.prototype.hasOwnProperty;
      t2.exports = function(t3) {
        var e3 = this.__data__;
        if (n3) {
          var r3 = e3[t3];
          return "__lodash_hash_undefined__" === r3 ? void 0 : r3;
        }
        return o2.call(e3, t3) ? e3[t3] : void 0;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(24), o2 = Object.prototype.hasOwnProperty;
      t2.exports = function(t3) {
        var e3 = this.__data__;
        return n3 ? void 0 !== e3[t3] : o2.call(e3, t3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(24);
      t2.exports = function(t3, e3) {
        var r3 = this.__data__;
        return this.size += this.has(t3) ? 0 : 1, r3[t3] = n3 && void 0 === e3 ? "__lodash_hash_undefined__" : e3, this;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(25);
      t2.exports = function(t3) {
        var e3 = n3(this, t3).delete(t3);
        return this.size -= e3 ? 1 : 0, e3;
      };
    }, function(t2, e2) {
      t2.exports = function(t3) {
        var e3 = typeof t3;
        return "string" == e3 || "number" == e3 || "symbol" == e3 || "boolean" == e3 ? "__proto__" !== t3 : null === t3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(25);
      t2.exports = function(t3) {
        return n3(this, t3).get(t3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(25);
      t2.exports = function(t3) {
        return n3(this, t3).has(t3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(25);
      t2.exports = function(t3, e3) {
        var r3 = n3(this, t3), o2 = r3.size;
        return r3.set(t3, e3), this.size += r3.size == o2 ? 0 : 1, this;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(122)();
      t2.exports = n3;
    }, function(t2, e2) {
      t2.exports = function(t3) {
        return function(e3, r2, n3) {
          for (var o2 = -1, i3 = Object(e3), a2 = n3(e3), u2 = a2.length; u2--; ) {
            var c2 = a2[t3 ? u2 : ++o2];
            if (false === r2(i3[c2], c2, i3)) break;
          }
          return e3;
        };
      };
    }, function(t2, e2, r2) {
      var n3 = r2(49), o2 = r2(51), i3 = r2(52), a2 = r2(53), u2 = r2(54), c2 = r2(34), s2 = r2(12), f2 = r2(127), l2 = r2(35), d2 = r2(28), h2 = r2(10), v2 = r2(57), p2 = r2(58), y3 = r2(59), g2 = r2(130);
      t2.exports = function(t3, e3, r3, x2, b2, _2, m2) {
        var w = y3(t3, r3), O = y3(e3, r3), M2 = m2.get(O);
        if (M2) n3(t3, r3, M2);
        else {
          var C2 = _2 ? _2(w, O, r3 + "", t3, e3, m2) : void 0, R2 = void 0 === C2;
          if (R2) {
            var S2 = s2(O), A2 = !S2 && l2(O), E2 = !S2 && !A2 && p2(O);
            C2 = O, S2 || A2 || E2 ? s2(w) ? C2 = w : f2(w) ? C2 = a2(w) : A2 ? (R2 = false, C2 = o2(O, true)) : E2 ? (R2 = false, C2 = i3(O, true)) : C2 = [] : v2(O) || c2(O) ? (C2 = w, c2(w) ? C2 = g2(w) : h2(w) && !d2(w) || (C2 = u2(O))) : R2 = false;
          }
          R2 && (m2.set(O, C2), b2(C2, O, x2, _2, m2), m2.delete(O)), n3(t3, r3, C2);
        }
      };
    }, function(t2, e2, r2) {
      var n3 = r2(8).Uint8Array;
      t2.exports = n3;
    }, function(t2, e2, r2) {
      var n3 = r2(10), o2 = Object.create, i3 = /* @__PURE__ */ function() {
        function t3() {
        }
        return function(e3) {
          if (!n3(e3)) return {};
          if (o2) return o2(e3);
          t3.prototype = e3;
          var r3 = new t3();
          return t3.prototype = void 0, r3;
        };
      }();
      t2.exports = i3;
    }, function(t2, e2, r2) {
      var n3 = r2(17), o2 = r2(11);
      t2.exports = function(t3) {
        return o2(t3) && "[object Arguments]" == n3(t3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(26), o2 = r2(11);
      t2.exports = function(t3) {
        return o2(t3) && n3(t3);
      };
    }, function(t2, e2) {
      t2.exports = function() {
        return false;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(17), o2 = r2(56), i3 = r2(11), a2 = {};
      a2["[object Float32Array]"] = a2["[object Float64Array]"] = a2["[object Int8Array]"] = a2["[object Int16Array]"] = a2["[object Int32Array]"] = a2["[object Uint8Array]"] = a2["[object Uint8ClampedArray]"] = a2["[object Uint16Array]"] = a2["[object Uint32Array]"] = true, a2["[object Arguments]"] = a2["[object Array]"] = a2["[object ArrayBuffer]"] = a2["[object Boolean]"] = a2["[object DataView]"] = a2["[object Date]"] = a2["[object Error]"] = a2["[object Function]"] = a2["[object Map]"] = a2["[object Number]"] = a2["[object Object]"] = a2["[object RegExp]"] = a2["[object Set]"] = a2["[object String]"] = a2["[object WeakMap]"] = false, t2.exports = function(t3) {
        return i3(t3) && o2(t3.length) && !!a2[n3(t3)];
      };
    }, function(t2, e2, r2) {
      var n3 = r2(18), o2 = r2(20);
      t2.exports = function(t3) {
        return n3(t3, o2(t3));
      };
    }, function(t2, e2) {
      t2.exports = function(t3, e3) {
        for (var r2 = -1, n3 = Array(t3); ++r2 < t3; ) n3[r2] = e3(r2);
        return n3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(10), o2 = r2(33), i3 = r2(133), a2 = Object.prototype.hasOwnProperty;
      t2.exports = function(t3) {
        if (!n3(t3)) return i3(t3);
        var e3 = o2(t3), r3 = [];
        for (var u2 in t3) ("constructor" != u2 || !e3 && a2.call(t3, u2)) && r3.push(u2);
        return r3;
      };
    }, function(t2, e2) {
      t2.exports = function(t3) {
        var e3 = [];
        if (null != t3) for (var r2 in Object(t3)) e3.push(r2);
        return e3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(135), o2 = r2(140);
      t2.exports = function(t3) {
        return n3(function(e3, r3) {
          var n4 = -1, i3 = r3.length, a2 = i3 > 1 ? r3[i3 - 1] : void 0, u2 = i3 > 2 ? r3[2] : void 0;
          for (a2 = t3.length > 3 && "function" == typeof a2 ? (i3--, a2) : void 0, u2 && o2(r3[0], r3[1], u2) && (a2 = i3 < 3 ? void 0 : a2, i3 = 1), e3 = Object(e3); ++n4 < i3; ) {
            var c2 = r3[n4];
            c2 && t3(e3, c2, n4, a2);
          }
          return e3;
        });
      };
    }, function(t2, e2, r2) {
      var n3 = r2(63), o2 = r2(64), i3 = r2(65);
      t2.exports = function(t3, e3) {
        return i3(o2(t3, e3, n3), t3 + "");
      };
    }, function(t2, e2) {
      t2.exports = function(t3, e3, r2) {
        switch (r2.length) {
          case 0:
            return t3.call(e3);
          case 1:
            return t3.call(e3, r2[0]);
          case 2:
            return t3.call(e3, r2[0], r2[1]);
          case 3:
            return t3.call(e3, r2[0], r2[1], r2[2]);
        }
        return t3.apply(e3, r2);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(138), o2 = r2(50), i3 = r2(63), a2 = o2 ? function(t3, e3) {
        return o2(t3, "toString", { configurable: true, enumerable: false, value: n3(e3), writable: true });
      } : i3;
      t2.exports = a2;
    }, function(t2, e2) {
      t2.exports = function(t3) {
        return function() {
          return t3;
        };
      };
    }, function(t2, e2) {
      var r2 = Date.now;
      t2.exports = function(t3) {
        var e3 = 0, n3 = 0;
        return function() {
          var o2 = r2(), i3 = 16 - (o2 - n3);
          if (n3 = o2, i3 > 0) {
            if (++e3 >= 800) return arguments[0];
          } else e3 = 0;
          return t3.apply(void 0, arguments);
        };
      };
    }, function(t2, e2, r2) {
      var n3 = r2(23), o2 = r2(26), i3 = r2(62), a2 = r2(10);
      t2.exports = function(t3, e3, r3) {
        if (!a2(r3)) return false;
        var u2 = typeof e3;
        return !!("number" == u2 ? o2(r3) && i3(e3, r3.length) : "string" == u2 && e3 in r3) && n3(r3[e3], t3);
      };
    }, function(t2, e2) {
      "undefined" != typeof window && (window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t3) {
        window.setTimeout(t3, 1e3 / 60);
      })), "function" != typeof Math.imul && (Math.imul = function(t3, e3) {
        var r2 = 65535 & t3, n3 = 65535 & e3;
        return r2 * n3 + ((t3 >>> 16 & 65535) * n3 + r2 * (e3 >>> 16 & 65535) << 16 >>> 0) | 0;
      }), "function" != typeof Object.assign && (Object.assign = function(t3) {
        if (null === t3) throw new TypeError("Cannot convert undefined or null to object");
        for (var e3 = Object(t3), r2 = 1; r2 < arguments.length; r2++) {
          var n3 = arguments[r2];
          if (null !== n3) for (var o2 in n3) Object.prototype.hasOwnProperty.call(n3, o2) && (e3[o2] = n3[o2]);
        }
        return e3;
      });
    }, function(t2, e2) {
      t2.exports = function(t3) {
        if (Array.isArray(t3)) return t3;
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2) {
      t2.exports = function(t3, e3) {
        var r2 = null == t3 ? null : "undefined" != typeof Symbol && t3[Symbol.iterator] || t3["@@iterator"];
        if (null != r2) {
          var n3, o2, i3, a2, u2 = [], c2 = true, s2 = false;
          try {
            if (i3 = (r2 = r2.call(t3)).next, 0 === e3) {
              if (Object(r2) !== r2) return;
              c2 = false;
            } else for (; !(c2 = (n3 = i3.call(r2)).done) && (u2.push(n3.value), u2.length !== e3); c2 = true) ;
          } catch (t4) {
            s2 = true, o2 = t4;
          } finally {
            try {
              if (!c2 && null != r2.return && (a2 = r2.return(), Object(a2) !== a2)) return;
            } finally {
              if (s2) throw o2;
            }
          }
          return u2;
        }
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2) {
      t2.exports = function() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(9).default;
      t2.exports = function(t3, e3) {
        if ("object" != n3(t3) || !t3) return t3;
        var r3 = t3[Symbol.toPrimitive];
        if (void 0 !== r3) {
          var o2 = r3.call(t3, e3 || "default");
          if ("object" != n3(o2)) return o2;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === e3 ? String : Number)(t3);
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(69), o2 = r2(70), i3 = r2(147), a2 = r2(72), u2 = r2(73), c2 = r2(148), s2 = r2(149);
      function f2() {
        var e3 = o2(), r3 = e3.m(f2), l2 = (Object.getPrototypeOf ? Object.getPrototypeOf(r3) : r3.__proto__).constructor;
        function d2(t3) {
          var e4 = "function" == typeof t3 && t3.constructor;
          return !!e4 && (e4 === l2 || "GeneratorFunction" === (e4.displayName || e4.name));
        }
        var h2 = { throw: 1, return: 2, break: 3, continue: 3 };
        function v2(t3) {
          var e4, r4;
          return function(n4) {
            e4 || (e4 = { stop: function() {
              return r4(n4.a, 2);
            }, catch: function() {
              return n4.v;
            }, abrupt: function(t4, e5) {
              return r4(n4.a, h2[t4], e5);
            }, delegateYield: function(t4, o3, i4) {
              return e4.resultName = o3, r4(n4.d, s2(t4), i4);
            }, finish: function(t4) {
              return r4(n4.f, t4);
            } }, r4 = function(t4, r5, o3) {
              n4.p = e4.prev, n4.n = e4.next;
              try {
                return t4(r5, o3);
              } finally {
                e4.next = n4.n;
              }
            }), e4.resultName && (e4[e4.resultName] = n4.v, e4.resultName = void 0), e4.sent = n4.v, e4.next = n4.n;
            try {
              return t3.call(this, e4);
            } finally {
              n4.p = e4.prev, n4.n = e4.next;
            }
          };
        }
        return (t2.exports = f2 = function() {
          return { wrap: function(t3, r4, n4, o3) {
            return e3.w(v2(t3), r4, n4, o3 && o3.reverse());
          }, isGeneratorFunction: d2, mark: e3.m, awrap: function(t3, e4) {
            return new n3(t3, e4);
          }, AsyncIterator: u2, async: function(t3, e4, r4, n4, o3) {
            return (d2(e4) ? a2 : i3)(v2(t3), e4, r4, n4, o3);
          }, keys: c2, values: s2 };
        }, t2.exports.__esModule = true, t2.exports.default = t2.exports)();
      }
      t2.exports = f2, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(72);
      t2.exports = function(t3, e3, r3, o2, i3) {
        var a2 = n3(t3, e3, r3, o2, i3);
        return a2.next().then(function(t4) {
          return t4.done ? t4.value : a2.next();
        });
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2) {
      t2.exports = function(t3) {
        var e3 = Object(t3), r2 = [];
        for (var n3 in e3) r2.unshift(n3);
        return function t4() {
          for (; r2.length; ) if ((n3 = r2.pop()) in e3) return t4.value = n3, t4.done = false, t4;
          return t4.done = true, t4;
        };
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(9).default;
      t2.exports = function(t3) {
        if (null != t3) {
          var e3 = t3["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r3 = 0;
          if (e3) return e3.call(t3);
          if ("function" == typeof t3.next) return t3;
          if (!isNaN(t3.length)) return { next: function() {
            return t3 && r3 >= t3.length && (t3 = void 0), { value: t3 && t3[r3++], done: !t3 };
          } };
        }
        throw new TypeError(n3(t3) + " is not iterable");
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2) {
      t2.exports = function(t3) {
        if (void 0 === t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t3;
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(1);
      t2.exports = function(t3, e3) {
        for (; !{}.hasOwnProperty.call(t3, e3) && null !== (t3 = n3(t3)); ) ;
        return t3;
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(67);
      t2.exports = function(t3) {
        if (Array.isArray(t3)) return n3(t3);
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2) {
      t2.exports = function(t3) {
        if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"]) return Array.from(t3);
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2) {
      t2.exports = function() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2) {
      t2.exports = function(t3, e3) {
        if (null == t3) return {};
        var r2 = {};
        for (var n3 in t3) if ({}.hasOwnProperty.call(t3, n3)) {
          if (-1 !== e3.indexOf(n3)) continue;
          r2[n3] = t3[n3];
        }
        return r2;
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(45), o2 = r2(157), i3 = r2(60), a2 = r2(158), u2 = r2(161), c2 = r2(51), s2 = r2(53), f2 = r2(162), l2 = r2(164), d2 = r2(165), h2 = r2(78), v2 = r2(42), p2 = r2(170), y3 = r2(171), g2 = r2(54), x2 = r2(12), b2 = r2(35), _2 = r2(175), m2 = r2(10), w = r2(177), O = r2(39), M2 = r2(20), C2 = {};
      C2["[object Arguments]"] = C2["[object Array]"] = C2["[object ArrayBuffer]"] = C2["[object DataView]"] = C2["[object Boolean]"] = C2["[object Date]"] = C2["[object Float32Array]"] = C2["[object Float64Array]"] = C2["[object Int8Array]"] = C2["[object Int16Array]"] = C2["[object Int32Array]"] = C2["[object Map]"] = C2["[object Number]"] = C2["[object Object]"] = C2["[object RegExp]"] = C2["[object Set]"] = C2["[object String]"] = C2["[object Symbol]"] = C2["[object Uint8Array]"] = C2["[object Uint8ClampedArray]"] = C2["[object Uint16Array]"] = C2["[object Uint32Array]"] = true, C2["[object Error]"] = C2["[object Function]"] = C2["[object WeakMap]"] = false, t2.exports = function t3(e3, r3, R2, S2, A2, E2) {
        var k2, j = 1 & r3, P2 = 2 & r3, D2 = 4 & r3;
        if (R2 && (k2 = A2 ? R2(e3, S2, A2, E2) : R2(e3)), void 0 !== k2) return k2;
        if (!m2(e3)) return e3;
        var T = x2(e3);
        if (T) {
          if (k2 = p2(e3), !j) return s2(e3, k2);
        } else {
          var I2 = v2(e3), z2 = "[object Function]" == I2 || "[object GeneratorFunction]" == I2;
          if (b2(e3)) return c2(e3, j);
          if ("[object Object]" == I2 || "[object Arguments]" == I2 || z2 && !A2) {
            if (k2 = P2 || z2 ? {} : g2(e3), !j) return P2 ? l2(e3, u2(k2, e3)) : f2(e3, a2(k2, e3));
          } else {
            if (!C2[I2]) return A2 ? e3 : {};
            k2 = y3(e3, I2, j);
          }
        }
        E2 || (E2 = new n3());
        var U = E2.get(e3);
        if (U) return U;
        E2.set(e3, k2), w(e3) ? e3.forEach(function(n4) {
          k2.add(t3(n4, r3, R2, n4, e3, E2));
        }) : _2(e3) && e3.forEach(function(n4, o3) {
          k2.set(o3, t3(n4, r3, R2, o3, e3, E2));
        });
        var N2 = T ? void 0 : (D2 ? P2 ? h2 : d2 : P2 ? M2 : O)(e3);
        return o2(N2 || e3, function(n4, o3) {
          N2 && (n4 = e3[o3 = n4]), i3(k2, o3, t3(n4, r3, R2, o3, e3, E2));
        }), k2;
      };
    }, function(t2, e2) {
      t2.exports = function(t3, e3) {
        for (var r2 = -1, n3 = null == t3 ? 0 : t3.length; ++r2 < n3 && false !== e3(t3[r2], r2, t3); ) ;
        return t3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(18), o2 = r2(39);
      t2.exports = function(t3, e3) {
        return t3 && n3(e3, o2(e3), t3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(33), o2 = r2(160), i3 = Object.prototype.hasOwnProperty;
      t2.exports = function(t3) {
        if (!n3(t3)) return o2(t3);
        var e3 = [];
        for (var r3 in Object(t3)) i3.call(t3, r3) && "constructor" != r3 && e3.push(r3);
        return e3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(55)(Object.keys, Object);
      t2.exports = n3;
    }, function(t2, e2, r2) {
      var n3 = r2(18), o2 = r2(20);
      t2.exports = function(t3, e3) {
        return t3 && n3(e3, o2(e3), t3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(18), o2 = r2(40);
      t2.exports = function(t3, e3) {
        return n3(t3, o2(t3), e3);
      };
    }, function(t2, e2) {
      t2.exports = function(t3, e3) {
        for (var r2 = -1, n3 = null == t3 ? 0 : t3.length, o2 = 0, i3 = []; ++r2 < n3; ) {
          var a2 = t3[r2];
          e3(a2, r2, t3) && (i3[o2++] = a2);
        }
        return i3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(18), o2 = r2(76);
      t2.exports = function(t3, e3) {
        return n3(t3, o2(t3), e3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(77), o2 = r2(40), i3 = r2(39);
      t2.exports = function(t3) {
        return n3(t3, i3, o2);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(14)(r2(8), "DataView");
      t2.exports = n3;
    }, function(t2, e2, r2) {
      var n3 = r2(14)(r2(8), "Promise");
      t2.exports = n3;
    }, function(t2, e2, r2) {
      var n3 = r2(14)(r2(8), "Set");
      t2.exports = n3;
    }, function(t2, e2, r2) {
      var n3 = r2(14)(r2(8), "WeakMap");
      t2.exports = n3;
    }, function(t2, e2) {
      var r2 = Object.prototype.hasOwnProperty;
      t2.exports = function(t3) {
        var e3 = t3.length, n3 = new t3.constructor(e3);
        return e3 && "string" == typeof t3[0] && r2.call(t3, "index") && (n3.index = t3.index, n3.input = t3.input), n3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(31), o2 = r2(172), i3 = r2(173), a2 = r2(174), u2 = r2(52);
      t2.exports = function(t3, e3, r3) {
        var c2 = t3.constructor;
        switch (e3) {
          case "[object ArrayBuffer]":
            return n3(t3);
          case "[object Boolean]":
          case "[object Date]":
            return new c2(+t3);
          case "[object DataView]":
            return o2(t3, r3);
          case "[object Float32Array]":
          case "[object Float64Array]":
          case "[object Int8Array]":
          case "[object Int16Array]":
          case "[object Int32Array]":
          case "[object Uint8Array]":
          case "[object Uint8ClampedArray]":
          case "[object Uint16Array]":
          case "[object Uint32Array]":
            return u2(t3, r3);
          case "[object Map]":
            return new c2();
          case "[object Number]":
          case "[object String]":
            return new c2(t3);
          case "[object RegExp]":
            return i3(t3);
          case "[object Set]":
            return new c2();
          case "[object Symbol]":
            return a2(t3);
        }
      };
    }, function(t2, e2, r2) {
      var n3 = r2(31);
      t2.exports = function(t3, e3) {
        var r3 = e3 ? n3(t3.buffer) : t3.buffer;
        return new t3.constructor(r3, t3.byteOffset, t3.byteLength);
      };
    }, function(t2, e2) {
      var r2 = /\w*$/;
      t2.exports = function(t3) {
        var e3 = new t3.constructor(t3.source, r2.exec(t3));
        return e3.lastIndex = t3.lastIndex, e3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(19), o2 = n3 ? n3.prototype : void 0, i3 = o2 ? o2.valueOf : void 0;
      t2.exports = function(t3) {
        return i3 ? Object(i3.call(t3)) : {};
      };
    }, function(t2, e2, r2) {
      var n3 = r2(176), o2 = r2(36), i3 = r2(37), a2 = i3 && i3.isMap, u2 = a2 ? o2(a2) : n3;
      t2.exports = u2;
    }, function(t2, e2, r2) {
      var n3 = r2(42), o2 = r2(11);
      t2.exports = function(t3) {
        return o2(t3) && "[object Map]" == n3(t3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(178), o2 = r2(36), i3 = r2(37), a2 = i3 && i3.isSet, u2 = a2 ? o2(a2) : n3;
      t2.exports = u2;
    }, function(t2, e2, r2) {
      var n3 = r2(42), o2 = r2(11);
      t2.exports = function(t3) {
        return o2(t3) && "[object Set]" == n3(t3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(43), o2 = r2(186), i3 = r2(187), a2 = r2(79);
      t2.exports = function(t3, e3) {
        return e3 = n3(e3, t3), null == (t3 = i3(t3, e3)) || delete t3[a2(o2(e3))];
      };
    }, function(t2, e2, r2) {
      var n3 = r2(12), o2 = r2(44), i3 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, a2 = /^\w*$/;
      t2.exports = function(t3, e3) {
        if (n3(t3)) return false;
        var r3 = typeof t3;
        return !("number" != r3 && "symbol" != r3 && "boolean" != r3 && null != t3 && !o2(t3)) || (a2.test(t3) || !i3.test(t3) || null != e3 && t3 in Object(e3));
      };
    }, function(t2, e2, r2) {
      var n3 = r2(182), o2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, i3 = /\\(\\)?/g, a2 = n3(function(t3) {
        var e3 = [];
        return 46 === t3.charCodeAt(0) && e3.push(""), t3.replace(o2, function(t4, r3, n4, o3) {
          e3.push(n4 ? o3.replace(i3, "$1") : r3 || t4);
        }), e3;
      });
      t2.exports = a2;
    }, function(t2, e2, r2) {
      var n3 = r2(183);
      t2.exports = function(t3) {
        var e3 = n3(t3, function(t4) {
          return 500 === r3.size && r3.clear(), t4;
        }), r3 = e3.cache;
        return e3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(48);
      function o2(t3, e3) {
        if ("function" != typeof t3 || null != e3 && "function" != typeof e3) throw new TypeError("Expected a function");
        var r3 = function() {
          var n4 = arguments, o3 = e3 ? e3.apply(this, n4) : n4[0], i3 = r3.cache;
          if (i3.has(o3)) return i3.get(o3);
          var a2 = t3.apply(this, n4);
          return r3.cache = i3.set(o3, a2) || i3, a2;
        };
        return r3.cache = new (o2.Cache || n3)(), r3;
      }
      o2.Cache = n3, t2.exports = o2;
    }, function(t2, e2, r2) {
      var n3 = r2(185);
      t2.exports = function(t3) {
        return null == t3 ? "" : n3(t3);
      };
    }, function(t2, e2, r2) {
      var n3 = r2(19), o2 = r2(74), i3 = r2(12), a2 = r2(44), u2 = n3 ? n3.prototype : void 0, c2 = u2 ? u2.toString : void 0;
      t2.exports = function t3(e3) {
        if ("string" == typeof e3) return e3;
        if (i3(e3)) return o2(e3, t3) + "";
        if (a2(e3)) return c2 ? c2.call(e3) : "";
        var r3 = e3 + "";
        return "0" == r3 && 1 / e3 == -1 / 0 ? "-0" : r3;
      };
    }, function(t2, e2) {
      t2.exports = function(t3) {
        var e3 = null == t3 ? 0 : t3.length;
        return e3 ? t3[e3 - 1] : void 0;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(188), o2 = r2(189);
      t2.exports = function(t3, e3) {
        return e3.length < 2 ? t3 : n3(t3, o2(e3, 0, -1));
      };
    }, function(t2, e2, r2) {
      var n3 = r2(43), o2 = r2(79);
      t2.exports = function(t3, e3) {
        for (var r3 = 0, i3 = (e3 = n3(e3, t3)).length; null != t3 && r3 < i3; ) t3 = t3[o2(e3[r3++])];
        return r3 && r3 == i3 ? t3 : void 0;
      };
    }, function(t2, e2) {
      t2.exports = function(t3, e3, r2) {
        var n3 = -1, o2 = t3.length;
        e3 < 0 && (e3 = -e3 > o2 ? 0 : o2 + e3), (r2 = r2 > o2 ? o2 : r2) < 0 && (r2 += o2), o2 = e3 > r2 ? 0 : r2 - e3 >>> 0, e3 >>>= 0;
        for (var i3 = Array(o2); ++n3 < o2; ) i3[n3] = t3[n3 + e3];
        return i3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(57);
      t2.exports = function(t3) {
        return n3(t3) ? void 0 : t3;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(192), o2 = r2(64), i3 = r2(65);
      t2.exports = function(t3) {
        return i3(o2(t3, void 0, n3), t3 + "");
      };
    }, function(t2, e2, r2) {
      var n3 = r2(193);
      t2.exports = function(t3) {
        return (null == t3 ? 0 : t3.length) ? n3(t3, 1) : [];
      };
    }, function(t2, e2, r2) {
      var n3 = r2(41), o2 = r2(194);
      t2.exports = function t3(e3, r3, i3, a2, u2) {
        var c2 = -1, s2 = e3.length;
        for (i3 || (i3 = o2), u2 || (u2 = []); ++c2 < s2; ) {
          var f2 = e3[c2];
          r3 > 0 && i3(f2) ? r3 > 1 ? t3(f2, r3 - 1, i3, a2, u2) : n3(u2, f2) : a2 || (u2[u2.length] = f2);
        }
        return u2;
      };
    }, function(t2, e2, r2) {
      var n3 = r2(19), o2 = r2(34), i3 = r2(12), a2 = n3 ? n3.isConcatSpreadable : void 0;
      t2.exports = function(t3) {
        return i3(t3) || o2(t3) || !!(a2 && t3 && t3[a2]);
      };
    }, function(t2, e2) {
      t2.exports = function(t3) {
        try {
          return -1 !== Function.toString.call(t3).indexOf("[native code]");
        } catch (e3) {
          return "function" == typeof t3;
        }
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      var n3 = r2(197), o2 = r2(38);
      t2.exports = function(t3, e3, r3) {
        if (n3()) return Reflect.construct.apply(null, arguments);
        var i3 = [null];
        i3.push.apply(i3, e3);
        var a2 = new (t3.bind.apply(t3, i3))();
        return r3 && o2(a2, r3.prototype), a2;
      }, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2) {
      function r2() {
        try {
          var e3 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
        } catch (e4) {
        }
        return (t2.exports = r2 = function() {
          return !!e3;
        }, t2.exports.__esModule = true, t2.exports.default = t2.exports)();
      }
      t2.exports = r2, t2.exports.__esModule = true, t2.exports.default = t2.exports;
    }, function(t2, e2, r2) {
      r2.r(e2), r2.d(e2, "BarcodeDecoder", function() {
        return Sn;
      }), r2.d(e2, "Readers", function() {
        return a2;
      }), r2.d(e2, "CameraAccess", function() {
        return Jn;
      }), r2.d(e2, "ImageDebug", function() {
        return rr;
      }), r2.d(e2, "ImageWrapper", function() {
        return Ze;
      }), r2.d(e2, "ResultCollector", function() {
        return to;
      });
      var n3 = {};
      r2.r(n3), r2.d(n3, "create", function() {
        return w;
      }), r2.d(n3, "clone", function() {
        return O;
      }), r2.d(n3, "copy", function() {
        return M2;
      }), r2.d(n3, "identity", function() {
        return C2;
      }), r2.d(n3, "fromValues", function() {
        return R2;
      }), r2.d(n3, "set", function() {
        return S2;
      }), r2.d(n3, "transpose", function() {
        return A2;
      }), r2.d(n3, "invert", function() {
        return E2;
      }), r2.d(n3, "adjoint", function() {
        return k2;
      }), r2.d(n3, "determinant", function() {
        return j;
      }), r2.d(n3, "multiply", function() {
        return P2;
      }), r2.d(n3, "rotate", function() {
        return D2;
      }), r2.d(n3, "scale", function() {
        return T;
      }), r2.d(n3, "fromRotation", function() {
        return I2;
      }), r2.d(n3, "fromScaling", function() {
        return z2;
      }), r2.d(n3, "str", function() {
        return U;
      }), r2.d(n3, "frob", function() {
        return N2;
      }), r2.d(n3, "LDU", function() {
        return W;
      }), r2.d(n3, "add", function() {
        return F;
      }), r2.d(n3, "subtract", function() {
        return B2;
      }), r2.d(n3, "exactEquals", function() {
        return L2;
      }), r2.d(n3, "equals", function() {
        return V2;
      }), r2.d(n3, "multiplyScalar", function() {
        return q;
      }), r2.d(n3, "multiplyScalarAndAdd", function() {
        return G;
      }), r2.d(n3, "mul", function() {
        return H2;
      }), r2.d(n3, "sub", function() {
        return X;
      });
      var o2 = {};
      r2.r(o2), r2.d(o2, "create", function() {
        return Q;
      }), r2.d(o2, "clone", function() {
        return $2;
      }), r2.d(o2, "fromValues", function() {
        return Y;
      }), r2.d(o2, "copy", function() {
        return Z2;
      }), r2.d(o2, "set", function() {
        return K;
      }), r2.d(o2, "add", function() {
        return J;
      }), r2.d(o2, "subtract", function() {
        return tt;
      }), r2.d(o2, "multiply", function() {
        return et;
      }), r2.d(o2, "divide", function() {
        return rt;
      }), r2.d(o2, "ceil", function() {
        return nt;
      }), r2.d(o2, "floor", function() {
        return ot;
      }), r2.d(o2, "min", function() {
        return it;
      }), r2.d(o2, "max", function() {
        return at;
      }), r2.d(o2, "round", function() {
        return ut;
      }), r2.d(o2, "scale", function() {
        return ct;
      }), r2.d(o2, "scaleAndAdd", function() {
        return st;
      }), r2.d(o2, "distance", function() {
        return ft;
      }), r2.d(o2, "squaredDistance", function() {
        return lt;
      }), r2.d(o2, "length", function() {
        return dt;
      }), r2.d(o2, "squaredLength", function() {
        return ht;
      }), r2.d(o2, "negate", function() {
        return vt;
      }), r2.d(o2, "inverse", function() {
        return pt;
      }), r2.d(o2, "normalize", function() {
        return yt;
      }), r2.d(o2, "dot", function() {
        return gt;
      }), r2.d(o2, "cross", function() {
        return xt;
      }), r2.d(o2, "lerp", function() {
        return bt;
      }), r2.d(o2, "random", function() {
        return _t;
      }), r2.d(o2, "transformMat2", function() {
        return mt;
      }), r2.d(o2, "transformMat2d", function() {
        return wt;
      }), r2.d(o2, "transformMat3", function() {
        return Ot;
      }), r2.d(o2, "transformMat4", function() {
        return Mt;
      }), r2.d(o2, "rotate", function() {
        return Ct;
      }), r2.d(o2, "angle", function() {
        return Rt;
      }), r2.d(o2, "signedAngle", function() {
        return St;
      }), r2.d(o2, "zero", function() {
        return At;
      }), r2.d(o2, "str", function() {
        return Et;
      }), r2.d(o2, "exactEquals", function() {
        return kt;
      }), r2.d(o2, "equals", function() {
        return jt;
      }), r2.d(o2, "len", function() {
        return Dt;
      }), r2.d(o2, "sub", function() {
        return Tt;
      }), r2.d(o2, "mul", function() {
        return It;
      }), r2.d(o2, "div", function() {
        return zt;
      }), r2.d(o2, "dist", function() {
        return Ut;
      }), r2.d(o2, "sqrDist", function() {
        return Nt;
      }), r2.d(o2, "sqrLen", function() {
        return Wt;
      }), r2.d(o2, "forEach", function() {
        return Ft;
      });
      var i3 = {};
      r2.r(i3), r2.d(i3, "create", function() {
        return Bt;
      }), r2.d(i3, "clone", function() {
        return Lt;
      }), r2.d(i3, "length", function() {
        return Vt;
      }), r2.d(i3, "fromValues", function() {
        return qt;
      }), r2.d(i3, "copy", function() {
        return Gt;
      }), r2.d(i3, "set", function() {
        return Ht;
      }), r2.d(i3, "add", function() {
        return Xt;
      }), r2.d(i3, "subtract", function() {
        return Qt;
      }), r2.d(i3, "multiply", function() {
        return $t;
      }), r2.d(i3, "divide", function() {
        return Yt;
      }), r2.d(i3, "ceil", function() {
        return Zt;
      }), r2.d(i3, "floor", function() {
        return Kt;
      }), r2.d(i3, "min", function() {
        return Jt;
      }), r2.d(i3, "max", function() {
        return te;
      }), r2.d(i3, "round", function() {
        return ee;
      }), r2.d(i3, "scale", function() {
        return re;
      }), r2.d(i3, "scaleAndAdd", function() {
        return ne;
      }), r2.d(i3, "distance", function() {
        return oe;
      }), r2.d(i3, "squaredDistance", function() {
        return ie;
      }), r2.d(i3, "squaredLength", function() {
        return ae;
      }), r2.d(i3, "negate", function() {
        return ue;
      }), r2.d(i3, "inverse", function() {
        return ce;
      }), r2.d(i3, "normalize", function() {
        return se;
      }), r2.d(i3, "dot", function() {
        return fe;
      }), r2.d(i3, "cross", function() {
        return le;
      }), r2.d(i3, "lerp", function() {
        return de;
      }), r2.d(i3, "slerp", function() {
        return he;
      }), r2.d(i3, "hermite", function() {
        return ve;
      }), r2.d(i3, "bezier", function() {
        return pe;
      }), r2.d(i3, "random", function() {
        return ye;
      }), r2.d(i3, "transformMat4", function() {
        return ge;
      }), r2.d(i3, "transformMat3", function() {
        return xe;
      }), r2.d(i3, "transformQuat", function() {
        return be;
      }), r2.d(i3, "rotateX", function() {
        return _e;
      }), r2.d(i3, "rotateY", function() {
        return me;
      }), r2.d(i3, "rotateZ", function() {
        return we;
      }), r2.d(i3, "angle", function() {
        return Oe;
      }), r2.d(i3, "zero", function() {
        return Me;
      }), r2.d(i3, "str", function() {
        return Ce;
      }), r2.d(i3, "exactEquals", function() {
        return Re;
      }), r2.d(i3, "equals", function() {
        return Se;
      }), r2.d(i3, "sub", function() {
        return Ae;
      }), r2.d(i3, "mul", function() {
        return Ee;
      }), r2.d(i3, "div", function() {
        return ke;
      }), r2.d(i3, "dist", function() {
        return je;
      }), r2.d(i3, "sqrDist", function() {
        return Pe;
      }), r2.d(i3, "len", function() {
        return De;
      }), r2.d(i3, "sqrLen", function() {
        return Te;
      }), r2.d(i3, "forEach", function() {
        return Ie;
      });
      var a2 = {};
      r2.r(a2), r2.d(a2, "BarcodeReader", function() {
        return lr;
      }), r2.d(a2, "TwoOfFiveReader", function() {
        return gr;
      }), r2.d(a2, "NewCodabarReader", function() {
        return wr;
      }), r2.d(a2, "Code128Reader", function() {
        return Mr;
      }), r2.d(a2, "Code32Reader", function() {
        return Ir;
      }), r2.d(a2, "Code39Reader", function() {
        return Pr;
      }), r2.d(a2, "Code39VINReader", function() {
        return Wr;
      }), r2.d(a2, "Code93Reader", function() {
        return Vr;
      }), r2.d(a2, "EAN2Reader", function() {
        return tn;
      }), r2.d(a2, "EAN5Reader", function() {
        return nn;
      }), r2.d(a2, "EAN8Reader", function() {
        return an;
      }), r2.d(a2, "EANReader", function() {
        return Kr;
      }), r2.d(a2, "I2of5Reader", function() {
        return cn;
      }), r2.d(a2, "PharmacodeReader", function() {
        return vn;
      }), r2.d(a2, "UPCEReader", function() {
        return xn;
      }), r2.d(a2, "UPCReader", function() {
        return _n;
      });
      var u2 = r2(9), c2 = r2.n(u2), s2 = r2(15), f2 = r2.n(s2), l2 = (r2(141), r2(80)), d2 = r2.n(l2), h2 = r2(2), v2 = r2.n(h2), p2 = r2(3), y3 = r2.n(p2), g2 = r2(0), x2 = r2.n(g2), b2 = "undefined" != typeof Float32Array ? Float32Array : Array, _2 = Math.random;
      function m2(t3) {
        return t3 >= 0 ? Math.round(t3) : t3 % 0.5 == 0 ? Math.floor(t3) : Math.round(t3);
      }
      function w() {
        var t3 = new b2(4);
        return b2 != Float32Array && (t3[1] = 0, t3[2] = 0), t3[0] = 1, t3[3] = 1, t3;
      }
      function O(t3) {
        var e3 = new b2(4);
        return e3[0] = t3[0], e3[1] = t3[1], e3[2] = t3[2], e3[3] = t3[3], e3;
      }
      function M2(t3, e3) {
        return t3[0] = e3[0], t3[1] = e3[1], t3[2] = e3[2], t3[3] = e3[3], t3;
      }
      function C2(t3) {
        return t3[0] = 1, t3[1] = 0, t3[2] = 0, t3[3] = 1, t3;
      }
      function R2(t3, e3, r3, n4) {
        var o3 = new b2(4);
        return o3[0] = t3, o3[1] = e3, o3[2] = r3, o3[3] = n4, o3;
      }
      function S2(t3, e3, r3, n4, o3) {
        return t3[0] = e3, t3[1] = r3, t3[2] = n4, t3[3] = o3, t3;
      }
      function A2(t3, e3) {
        if (t3 === e3) {
          var r3 = e3[1];
          t3[1] = e3[2], t3[2] = r3;
        } else t3[0] = e3[0], t3[1] = e3[2], t3[2] = e3[1], t3[3] = e3[3];
        return t3;
      }
      function E2(t3, e3) {
        var r3 = e3[0], n4 = e3[1], o3 = e3[2], i4 = e3[3], a3 = r3 * i4 - o3 * n4;
        return a3 ? (a3 = 1 / a3, t3[0] = i4 * a3, t3[1] = -n4 * a3, t3[2] = -o3 * a3, t3[3] = r3 * a3, t3) : null;
      }
      function k2(t3, e3) {
        var r3 = e3[0];
        return t3[0] = e3[3], t3[1] = -e3[1], t3[2] = -e3[2], t3[3] = r3, t3;
      }
      function j(t3) {
        return t3[0] * t3[3] - t3[2] * t3[1];
      }
      function P2(t3, e3, r3) {
        var n4 = e3[0], o3 = e3[1], i4 = e3[2], a3 = e3[3], u3 = r3[0], c3 = r3[1], s3 = r3[2], f3 = r3[3];
        return t3[0] = n4 * u3 + i4 * c3, t3[1] = o3 * u3 + a3 * c3, t3[2] = n4 * s3 + i4 * f3, t3[3] = o3 * s3 + a3 * f3, t3;
      }
      function D2(t3, e3, r3) {
        var n4 = e3[0], o3 = e3[1], i4 = e3[2], a3 = e3[3], u3 = Math.sin(r3), c3 = Math.cos(r3);
        return t3[0] = n4 * c3 + i4 * u3, t3[1] = o3 * c3 + a3 * u3, t3[2] = n4 * -u3 + i4 * c3, t3[3] = o3 * -u3 + a3 * c3, t3;
      }
      function T(t3, e3, r3) {
        var n4 = e3[0], o3 = e3[1], i4 = e3[2], a3 = e3[3], u3 = r3[0], c3 = r3[1];
        return t3[0] = n4 * u3, t3[1] = o3 * u3, t3[2] = i4 * c3, t3[3] = a3 * c3, t3;
      }
      function I2(t3, e3) {
        var r3 = Math.sin(e3), n4 = Math.cos(e3);
        return t3[0] = n4, t3[1] = r3, t3[2] = -r3, t3[3] = n4, t3;
      }
      function z2(t3, e3) {
        return t3[0] = e3[0], t3[1] = 0, t3[2] = 0, t3[3] = e3[1], t3;
      }
      function U(t3) {
        return "mat2(" + t3[0] + ", " + t3[1] + ", " + t3[2] + ", " + t3[3] + ")";
      }
      function N2(t3) {
        return Math.sqrt(t3[0] * t3[0] + t3[1] * t3[1] + t3[2] * t3[2] + t3[3] * t3[3]);
      }
      function W(t3, e3, r3, n4) {
        return t3[2] = n4[2] / n4[0], r3[0] = n4[0], r3[1] = n4[1], r3[3] = n4[3] - t3[2] * r3[1], [t3, e3, r3];
      }
      function F(t3, e3, r3) {
        return t3[0] = e3[0] + r3[0], t3[1] = e3[1] + r3[1], t3[2] = e3[2] + r3[2], t3[3] = e3[3] + r3[3], t3;
      }
      function B2(t3, e3, r3) {
        return t3[0] = e3[0] - r3[0], t3[1] = e3[1] - r3[1], t3[2] = e3[2] - r3[2], t3[3] = e3[3] - r3[3], t3;
      }
      function L2(t3, e3) {
        return t3[0] === e3[0] && t3[1] === e3[1] && t3[2] === e3[2] && t3[3] === e3[3];
      }
      function V2(t3, e3) {
        var r3 = t3[0], n4 = t3[1], o3 = t3[2], i4 = t3[3], a3 = e3[0], u3 = e3[1], c3 = e3[2], s3 = e3[3];
        return Math.abs(r3 - a3) <= 1e-6 * Math.max(1, Math.abs(r3), Math.abs(a3)) && Math.abs(n4 - u3) <= 1e-6 * Math.max(1, Math.abs(n4), Math.abs(u3)) && Math.abs(o3 - c3) <= 1e-6 * Math.max(1, Math.abs(o3), Math.abs(c3)) && Math.abs(i4 - s3) <= 1e-6 * Math.max(1, Math.abs(i4), Math.abs(s3));
      }
      function q(t3, e3, r3) {
        return t3[0] = e3[0] * r3, t3[1] = e3[1] * r3, t3[2] = e3[2] * r3, t3[3] = e3[3] * r3, t3;
      }
      function G(t3, e3, r3, n4) {
        return t3[0] = e3[0] + r3[0] * n4, t3[1] = e3[1] + r3[1] * n4, t3[2] = e3[2] + r3[2] * n4, t3[3] = e3[3] + r3[3] * n4, t3;
      }
      var H2 = P2, X = B2;
      function Q() {
        var t3 = new b2(2);
        return b2 != Float32Array && (t3[0] = 0, t3[1] = 0), t3;
      }
      function $2(t3) {
        var e3 = new b2(2);
        return e3[0] = t3[0], e3[1] = t3[1], e3;
      }
      function Y(t3, e3) {
        var r3 = new b2(2);
        return r3[0] = t3, r3[1] = e3, r3;
      }
      function Z2(t3, e3) {
        return t3[0] = e3[0], t3[1] = e3[1], t3;
      }
      function K(t3, e3, r3) {
        return t3[0] = e3, t3[1] = r3, t3;
      }
      function J(t3, e3, r3) {
        return t3[0] = e3[0] + r3[0], t3[1] = e3[1] + r3[1], t3;
      }
      function tt(t3, e3, r3) {
        return t3[0] = e3[0] - r3[0], t3[1] = e3[1] - r3[1], t3;
      }
      function et(t3, e3, r3) {
        return t3[0] = e3[0] * r3[0], t3[1] = e3[1] * r3[1], t3;
      }
      function rt(t3, e3, r3) {
        return t3[0] = e3[0] / r3[0], t3[1] = e3[1] / r3[1], t3;
      }
      function nt(t3, e3) {
        return t3[0] = Math.ceil(e3[0]), t3[1] = Math.ceil(e3[1]), t3;
      }
      function ot(t3, e3) {
        return t3[0] = Math.floor(e3[0]), t3[1] = Math.floor(e3[1]), t3;
      }
      function it(t3, e3, r3) {
        return t3[0] = Math.min(e3[0], r3[0]), t3[1] = Math.min(e3[1], r3[1]), t3;
      }
      function at(t3, e3, r3) {
        return t3[0] = Math.max(e3[0], r3[0]), t3[1] = Math.max(e3[1], r3[1]), t3;
      }
      function ut(t3, e3) {
        return t3[0] = m2(e3[0]), t3[1] = m2(e3[1]), t3;
      }
      function ct(t3, e3, r3) {
        return t3[0] = e3[0] * r3, t3[1] = e3[1] * r3, t3;
      }
      function st(t3, e3, r3, n4) {
        return t3[0] = e3[0] + r3[0] * n4, t3[1] = e3[1] + r3[1] * n4, t3;
      }
      function ft(t3, e3) {
        var r3 = e3[0] - t3[0], n4 = e3[1] - t3[1];
        return Math.sqrt(r3 * r3 + n4 * n4);
      }
      function lt(t3, e3) {
        var r3 = e3[0] - t3[0], n4 = e3[1] - t3[1];
        return r3 * r3 + n4 * n4;
      }
      function dt(t3) {
        var e3 = t3[0], r3 = t3[1];
        return Math.sqrt(e3 * e3 + r3 * r3);
      }
      function ht(t3) {
        var e3 = t3[0], r3 = t3[1];
        return e3 * e3 + r3 * r3;
      }
      function vt(t3, e3) {
        return t3[0] = -e3[0], t3[1] = -e3[1], t3;
      }
      function pt(t3, e3) {
        return t3[0] = 1 / e3[0], t3[1] = 1 / e3[1], t3;
      }
      function yt(t3, e3) {
        var r3 = e3[0], n4 = e3[1], o3 = r3 * r3 + n4 * n4;
        return o3 > 0 && (o3 = 1 / Math.sqrt(o3)), t3[0] = e3[0] * o3, t3[1] = e3[1] * o3, t3;
      }
      function gt(t3, e3) {
        return t3[0] * e3[0] + t3[1] * e3[1];
      }
      function xt(t3, e3, r3) {
        var n4 = e3[0] * r3[1] - e3[1] * r3[0];
        return t3[0] = t3[1] = 0, t3[2] = n4, t3;
      }
      function bt(t3, e3, r3, n4) {
        var o3 = e3[0], i4 = e3[1];
        return t3[0] = o3 + n4 * (r3[0] - o3), t3[1] = i4 + n4 * (r3[1] - i4), t3;
      }
      function _t(t3, e3) {
        e3 = void 0 === e3 ? 1 : e3;
        var r3 = 2 * _2() * Math.PI;
        return t3[0] = Math.cos(r3) * e3, t3[1] = Math.sin(r3) * e3, t3;
      }
      function mt(t3, e3, r3) {
        var n4 = e3[0], o3 = e3[1];
        return t3[0] = r3[0] * n4 + r3[2] * o3, t3[1] = r3[1] * n4 + r3[3] * o3, t3;
      }
      function wt(t3, e3, r3) {
        var n4 = e3[0], o3 = e3[1];
        return t3[0] = r3[0] * n4 + r3[2] * o3 + r3[4], t3[1] = r3[1] * n4 + r3[3] * o3 + r3[5], t3;
      }
      function Ot(t3, e3, r3) {
        var n4 = e3[0], o3 = e3[1];
        return t3[0] = r3[0] * n4 + r3[3] * o3 + r3[6], t3[1] = r3[1] * n4 + r3[4] * o3 + r3[7], t3;
      }
      function Mt(t3, e3, r3) {
        var n4 = e3[0], o3 = e3[1];
        return t3[0] = r3[0] * n4 + r3[4] * o3 + r3[12], t3[1] = r3[1] * n4 + r3[5] * o3 + r3[13], t3;
      }
      function Ct(t3, e3, r3, n4) {
        var o3 = e3[0] - r3[0], i4 = e3[1] - r3[1], a3 = Math.sin(n4), u3 = Math.cos(n4);
        return t3[0] = o3 * u3 - i4 * a3 + r3[0], t3[1] = o3 * a3 + i4 * u3 + r3[1], t3;
      }
      function Rt(t3, e3) {
        var r3 = t3[0], n4 = t3[1], o3 = e3[0], i4 = e3[1];
        return Math.abs(Math.atan2(n4 * o3 - r3 * i4, r3 * o3 + n4 * i4));
      }
      function St(t3, e3) {
        var r3 = t3[0], n4 = t3[1], o3 = e3[0], i4 = e3[1];
        return Math.atan2(r3 * i4 - n4 * o3, r3 * o3 + n4 * i4);
      }
      function At(t3) {
        return t3[0] = 0, t3[1] = 0, t3;
      }
      function Et(t3) {
        return "vec2(" + t3[0] + ", " + t3[1] + ")";
      }
      function kt(t3, e3) {
        return t3[0] === e3[0] && t3[1] === e3[1];
      }
      function jt(t3, e3) {
        var r3 = t3[0], n4 = t3[1], o3 = e3[0], i4 = e3[1];
        return Math.abs(r3 - o3) <= 1e-6 * Math.max(1, Math.abs(r3), Math.abs(o3)) && Math.abs(n4 - i4) <= 1e-6 * Math.max(1, Math.abs(n4), Math.abs(i4));
      }
      var Pt, Dt = dt, Tt = tt, It = et, zt = rt, Ut = ft, Nt = lt, Wt = ht, Ft = (Pt = Q(), function(t3, e3, r3, n4, o3, i4) {
        var a3, u3;
        for (e3 || (e3 = 2), r3 || (r3 = 0), u3 = n4 ? Math.min(n4 * e3 + r3, t3.length) : t3.length, a3 = r3; a3 < u3; a3 += e3) Pt[0] = t3[a3], Pt[1] = t3[a3 + 1], o3(Pt, Pt, i4), t3[a3] = Pt[0], t3[a3 + 1] = Pt[1];
        return t3;
      });
      function Bt() {
        var t3 = new b2(3);
        return b2 != Float32Array && (t3[0] = 0, t3[1] = 0, t3[2] = 0), t3;
      }
      function Lt(t3) {
        var e3 = new b2(3);
        return e3[0] = t3[0], e3[1] = t3[1], e3[2] = t3[2], e3;
      }
      function Vt(t3) {
        var e3 = t3[0], r3 = t3[1], n4 = t3[2];
        return Math.sqrt(e3 * e3 + r3 * r3 + n4 * n4);
      }
      function qt(t3, e3, r3) {
        var n4 = new b2(3);
        return n4[0] = t3, n4[1] = e3, n4[2] = r3, n4;
      }
      function Gt(t3, e3) {
        return t3[0] = e3[0], t3[1] = e3[1], t3[2] = e3[2], t3;
      }
      function Ht(t3, e3, r3, n4) {
        return t3[0] = e3, t3[1] = r3, t3[2] = n4, t3;
      }
      function Xt(t3, e3, r3) {
        return t3[0] = e3[0] + r3[0], t3[1] = e3[1] + r3[1], t3[2] = e3[2] + r3[2], t3;
      }
      function Qt(t3, e3, r3) {
        return t3[0] = e3[0] - r3[0], t3[1] = e3[1] - r3[1], t3[2] = e3[2] - r3[2], t3;
      }
      function $t(t3, e3, r3) {
        return t3[0] = e3[0] * r3[0], t3[1] = e3[1] * r3[1], t3[2] = e3[2] * r3[2], t3;
      }
      function Yt(t3, e3, r3) {
        return t3[0] = e3[0] / r3[0], t3[1] = e3[1] / r3[1], t3[2] = e3[2] / r3[2], t3;
      }
      function Zt(t3, e3) {
        return t3[0] = Math.ceil(e3[0]), t3[1] = Math.ceil(e3[1]), t3[2] = Math.ceil(e3[2]), t3;
      }
      function Kt(t3, e3) {
        return t3[0] = Math.floor(e3[0]), t3[1] = Math.floor(e3[1]), t3[2] = Math.floor(e3[2]), t3;
      }
      function Jt(t3, e3, r3) {
        return t3[0] = Math.min(e3[0], r3[0]), t3[1] = Math.min(e3[1], r3[1]), t3[2] = Math.min(e3[2], r3[2]), t3;
      }
      function te(t3, e3, r3) {
        return t3[0] = Math.max(e3[0], r3[0]), t3[1] = Math.max(e3[1], r3[1]), t3[2] = Math.max(e3[2], r3[2]), t3;
      }
      function ee(t3, e3) {
        return t3[0] = m2(e3[0]), t3[1] = m2(e3[1]), t3[2] = m2(e3[2]), t3;
      }
      function re(t3, e3, r3) {
        return t3[0] = e3[0] * r3, t3[1] = e3[1] * r3, t3[2] = e3[2] * r3, t3;
      }
      function ne(t3, e3, r3, n4) {
        return t3[0] = e3[0] + r3[0] * n4, t3[1] = e3[1] + r3[1] * n4, t3[2] = e3[2] + r3[2] * n4, t3;
      }
      function oe(t3, e3) {
        var r3 = e3[0] - t3[0], n4 = e3[1] - t3[1], o3 = e3[2] - t3[2];
        return Math.sqrt(r3 * r3 + n4 * n4 + o3 * o3);
      }
      function ie(t3, e3) {
        var r3 = e3[0] - t3[0], n4 = e3[1] - t3[1], o3 = e3[2] - t3[2];
        return r3 * r3 + n4 * n4 + o3 * o3;
      }
      function ae(t3) {
        var e3 = t3[0], r3 = t3[1], n4 = t3[2];
        return e3 * e3 + r3 * r3 + n4 * n4;
      }
      function ue(t3, e3) {
        return t3[0] = -e3[0], t3[1] = -e3[1], t3[2] = -e3[2], t3;
      }
      function ce(t3, e3) {
        return t3[0] = 1 / e3[0], t3[1] = 1 / e3[1], t3[2] = 1 / e3[2], t3;
      }
      function se(t3, e3) {
        var r3 = e3[0], n4 = e3[1], o3 = e3[2], i4 = r3 * r3 + n4 * n4 + o3 * o3;
        return i4 > 0 && (i4 = 1 / Math.sqrt(i4)), t3[0] = e3[0] * i4, t3[1] = e3[1] * i4, t3[2] = e3[2] * i4, t3;
      }
      function fe(t3, e3) {
        return t3[0] * e3[0] + t3[1] * e3[1] + t3[2] * e3[2];
      }
      function le(t3, e3, r3) {
        var n4 = e3[0], o3 = e3[1], i4 = e3[2], a3 = r3[0], u3 = r3[1], c3 = r3[2];
        return t3[0] = o3 * c3 - i4 * u3, t3[1] = i4 * a3 - n4 * c3, t3[2] = n4 * u3 - o3 * a3, t3;
      }
      function de(t3, e3, r3, n4) {
        var o3 = e3[0], i4 = e3[1], a3 = e3[2];
        return t3[0] = o3 + n4 * (r3[0] - o3), t3[1] = i4 + n4 * (r3[1] - i4), t3[2] = a3 + n4 * (r3[2] - a3), t3;
      }
      function he(t3, e3, r3, n4) {
        var o3 = Math.acos(Math.min(Math.max(fe(e3, r3), -1), 1)), i4 = Math.sin(o3), a3 = Math.sin((1 - n4) * o3) / i4, u3 = Math.sin(n4 * o3) / i4;
        return t3[0] = a3 * e3[0] + u3 * r3[0], t3[1] = a3 * e3[1] + u3 * r3[1], t3[2] = a3 * e3[2] + u3 * r3[2], t3;
      }
      function ve(t3, e3, r3, n4, o3, i4) {
        var a3 = i4 * i4, u3 = a3 * (2 * i4 - 3) + 1, c3 = a3 * (i4 - 2) + i4, s3 = a3 * (i4 - 1), f3 = a3 * (3 - 2 * i4);
        return t3[0] = e3[0] * u3 + r3[0] * c3 + n4[0] * s3 + o3[0] * f3, t3[1] = e3[1] * u3 + r3[1] * c3 + n4[1] * s3 + o3[1] * f3, t3[2] = e3[2] * u3 + r3[2] * c3 + n4[2] * s3 + o3[2] * f3, t3;
      }
      function pe(t3, e3, r3, n4, o3, i4) {
        var a3 = 1 - i4, u3 = a3 * a3, c3 = i4 * i4, s3 = u3 * a3, f3 = 3 * i4 * u3, l3 = 3 * c3 * a3, d3 = c3 * i4;
        return t3[0] = e3[0] * s3 + r3[0] * f3 + n4[0] * l3 + o3[0] * d3, t3[1] = e3[1] * s3 + r3[1] * f3 + n4[1] * l3 + o3[1] * d3, t3[2] = e3[2] * s3 + r3[2] * f3 + n4[2] * l3 + o3[2] * d3, t3;
      }
      function ye(t3, e3) {
        e3 = void 0 === e3 ? 1 : e3;
        var r3 = 2 * _2() * Math.PI, n4 = 2 * _2() - 1, o3 = Math.sqrt(1 - n4 * n4) * e3;
        return t3[0] = Math.cos(r3) * o3, t3[1] = Math.sin(r3) * o3, t3[2] = n4 * e3, t3;
      }
      function ge(t3, e3, r3) {
        var n4 = e3[0], o3 = e3[1], i4 = e3[2], a3 = r3[3] * n4 + r3[7] * o3 + r3[11] * i4 + r3[15];
        return a3 = a3 || 1, t3[0] = (r3[0] * n4 + r3[4] * o3 + r3[8] * i4 + r3[12]) / a3, t3[1] = (r3[1] * n4 + r3[5] * o3 + r3[9] * i4 + r3[13]) / a3, t3[2] = (r3[2] * n4 + r3[6] * o3 + r3[10] * i4 + r3[14]) / a3, t3;
      }
      function xe(t3, e3, r3) {
        var n4 = e3[0], o3 = e3[1], i4 = e3[2];
        return t3[0] = n4 * r3[0] + o3 * r3[3] + i4 * r3[6], t3[1] = n4 * r3[1] + o3 * r3[4] + i4 * r3[7], t3[2] = n4 * r3[2] + o3 * r3[5] + i4 * r3[8], t3;
      }
      function be(t3, e3, r3) {
        var n4 = r3[0], o3 = r3[1], i4 = r3[2], a3 = r3[3], u3 = e3[0], c3 = e3[1], s3 = e3[2], f3 = o3 * s3 - i4 * c3, l3 = i4 * u3 - n4 * s3, d3 = n4 * c3 - o3 * u3;
        return f3 += f3, l3 += l3, d3 += d3, t3[0] = u3 + a3 * f3 + o3 * d3 - i4 * l3, t3[1] = c3 + a3 * l3 + i4 * f3 - n4 * d3, t3[2] = s3 + a3 * d3 + n4 * l3 - o3 * f3, t3;
      }
      function _e(t3, e3, r3, n4) {
        var o3 = [], i4 = [];
        return o3[0] = e3[0] - r3[0], o3[1] = e3[1] - r3[1], o3[2] = e3[2] - r3[2], i4[0] = o3[0], i4[1] = o3[1] * Math.cos(n4) - o3[2] * Math.sin(n4), i4[2] = o3[1] * Math.sin(n4) + o3[2] * Math.cos(n4), t3[0] = i4[0] + r3[0], t3[1] = i4[1] + r3[1], t3[2] = i4[2] + r3[2], t3;
      }
      function me(t3, e3, r3, n4) {
        var o3 = [], i4 = [];
        return o3[0] = e3[0] - r3[0], o3[1] = e3[1] - r3[1], o3[2] = e3[2] - r3[2], i4[0] = o3[2] * Math.sin(n4) + o3[0] * Math.cos(n4), i4[1] = o3[1], i4[2] = o3[2] * Math.cos(n4) - o3[0] * Math.sin(n4), t3[0] = i4[0] + r3[0], t3[1] = i4[1] + r3[1], t3[2] = i4[2] + r3[2], t3;
      }
      function we(t3, e3, r3, n4) {
        var o3 = [], i4 = [];
        return o3[0] = e3[0] - r3[0], o3[1] = e3[1] - r3[1], o3[2] = e3[2] - r3[2], i4[0] = o3[0] * Math.cos(n4) - o3[1] * Math.sin(n4), i4[1] = o3[0] * Math.sin(n4) + o3[1] * Math.cos(n4), i4[2] = o3[2], t3[0] = i4[0] + r3[0], t3[1] = i4[1] + r3[1], t3[2] = i4[2] + r3[2], t3;
      }
      function Oe(t3, e3) {
        var r3 = t3[0], n4 = t3[1], o3 = t3[2], i4 = e3[0], a3 = e3[1], u3 = e3[2], c3 = Math.sqrt((r3 * r3 + n4 * n4 + o3 * o3) * (i4 * i4 + a3 * a3 + u3 * u3)), s3 = c3 && fe(t3, e3) / c3;
        return Math.acos(Math.min(Math.max(s3, -1), 1));
      }
      function Me(t3) {
        return t3[0] = 0, t3[1] = 0, t3[2] = 0, t3;
      }
      function Ce(t3) {
        return "vec3(" + t3[0] + ", " + t3[1] + ", " + t3[2] + ")";
      }
      function Re(t3, e3) {
        return t3[0] === e3[0] && t3[1] === e3[1] && t3[2] === e3[2];
      }
      function Se(t3, e3) {
        var r3 = t3[0], n4 = t3[1], o3 = t3[2], i4 = e3[0], a3 = e3[1], u3 = e3[2];
        return Math.abs(r3 - i4) <= 1e-6 * Math.max(1, Math.abs(r3), Math.abs(i4)) && Math.abs(n4 - a3) <= 1e-6 * Math.max(1, Math.abs(n4), Math.abs(a3)) && Math.abs(o3 - u3) <= 1e-6 * Math.max(1, Math.abs(o3), Math.abs(u3));
      }
      var Ae = Qt, Ee = $t, ke = Yt, je = oe, Pe = ie, De = Vt, Te = ae, Ie = function() {
        var t3 = Bt();
        return function(e3, r3, n4, o3, i4, a3) {
          var u3, c3;
          for (r3 || (r3 = 3), n4 || (n4 = 0), c3 = o3 ? Math.min(o3 * r3 + n4, e3.length) : e3.length, u3 = n4; u3 < c3; u3 += r3) t3[0] = e3[u3], t3[1] = e3[u3 + 1], t3[2] = e3[u3 + 2], i4(t3, t3, a3), e3[u3] = t3[0], e3[u3 + 1] = t3[1], e3[u3 + 2] = t3[2];
          return e3;
        };
      }(), ze = function(t3, e3) {
        t3.fill(e3);
      }, Ue = function(t3) {
        for (var e3 = 0, r3 = 0; r3 < t3.length; r3++) t3[r3] > t3[e3] && (e3 = r3);
        return e3;
      }, Ne = function(t3) {
        for (var e3 = t3.length, r3 = 0; e3--; ) r3 += t3[e3];
        return r3;
      }, We = function(t3, e3) {
        var r3 = [], n4 = { rad: 0, vec: o2.clone([0, 0]) }, i4 = {};
        function a3(t4) {
          i4[t4.id] = t4, r3.push(t4);
        }
        function u3() {
          var t4, e4 = 0;
          for (t4 = 0; t4 < r3.length; t4++) e4 += r3[t4].rad;
          n4.rad = e4 / r3.length, n4.vec = o2.clone([Math.cos(n4.rad), Math.sin(n4.rad)]);
        }
        return a3(t3), u3(), { add: function(t4) {
          i4[t4.id] || (a3(t4), u3());
        }, fits: function(t4) {
          return Math.abs(o2.dot(t4.point.vec, n4.vec)) > e3;
        }, getPoints: function() {
          return r3;
        }, getCenter: function() {
          return n4;
        } };
      }, Fe = function(t3, e3, r3) {
        return { rad: t3[r3], point: t3, id: e3 };
      };
      function Be(t3, e3) {
        return { x: t3, y: e3, toVec2: function() {
          return o2.clone([this.x, this.y]);
        }, toVec3: function() {
          return i3.clone([this.x, this.y, 1]);
        }, round: function() {
          return this.x = this.x > 0 ? Math.floor(this.x + 0.5) : Math.floor(this.x - 0.5), this.y = this.y > 0 ? Math.floor(this.y + 0.5) : Math.floor(this.y - 0.5), this;
        } };
      }
      function Le(t3, e3) {
        e3 || (e3 = 8);
        for (var r3 = t3.data, n4 = r3.length, o3 = 8 - e3, i4 = new Int32Array(1 << e3); n4--; ) i4[r3[n4] >> o3]++;
        return i4;
      }
      function Ve(t3, e3) {
        var r3 = function(t4) {
          var e4, r4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 8, n4 = 8 - r4;
          function o3(t5, r5) {
            for (var n5 = 0, o4 = t5; o4 <= r5; o4++) n5 += e4[o4];
            return n5;
          }
          function i4(t5, r5) {
            for (var n5 = 0, o4 = t5; o4 <= r5; o4++) n5 += o4 * e4[o4];
            return n5;
          }
          function a3() {
            var n5, a4, u4, c3, s3 = [0], f3 = (1 << r4) - 1;
            e4 = Le(t4, r4);
            for (var l3 = 1; l3 < f3; l3++) 0 === (u4 = (n5 = o3(0, l3)) * (a4 = o3(l3 + 1, f3))) && (u4 = 1), c3 = i4(0, l3) * a4 - i4(l3 + 1, f3) * n5, s3[l3] = c3 * c3 / u4;
            return Ue(s3);
          }
          var u3 = a3();
          return u3 << n4;
        }(t3);
        return function(t4, e4, r4) {
          r4 || (r4 = t4);
          for (var n4 = t4.data, o3 = n4.length, i4 = r4.data; o3--; ) i4[o3] = n4[o3] < e4 ? 1 : 0;
        }(t3, r3, e3), r3;
      }
      function qe(t3, e3, r3) {
        var n4 = t3.length / 4 | 0;
        if (r3 && true === r3.singleChannel) for (var o3 = 0; o3 < n4; o3++) {
          var i4 = t3[4 * o3 + 3];
          e3[o3] = 0 === i4 ? 255 : t3[4 * o3 + 0];
        }
        else for (var a3 = 0; a3 < n4; a3++) {
          var u3 = t3[4 * a3 + 3];
          e3[a3] = 0 === u3 ? 255 : 0.299 * t3[4 * a3 + 0] + 0.587 * t3[4 * a3 + 1] + 0.114 * t3[4 * a3 + 2];
        }
      }
      function Ge(t3) {
        var e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [0, 0, 0], r3 = t3[0], n4 = t3[1], o3 = t3[2], i4 = o3 * n4, a3 = i4 * (1 - Math.abs(r3 / 60 % 2 - 1)), u3 = o3 - i4, c3 = 0, s3 = 0, f3 = 0;
        return r3 < 60 ? (c3 = i4, s3 = a3) : r3 < 120 ? (c3 = a3, s3 = i4) : r3 < 180 ? (s3 = i4, f3 = a3) : r3 < 240 ? (s3 = a3, f3 = i4) : r3 < 300 ? (c3 = a3, f3 = i4) : r3 < 360 && (c3 = i4, f3 = a3), e3[0] = 255 * (c3 + u3) | 0, e3[1] = 255 * (s3 + u3) | 0, e3[2] = 255 * (f3 + u3) | 0, e3;
      }
      function He(t3) {
        if (!Number.isFinite(t3) || t3 < 1) return [];
        for (var e3 = [], r3 = [], n4 = Math.sqrt(t3), o3 = 1; o3 <= n4; o3++) t3 % o3 == 0 && (r3.push(o3), o3 !== t3 / o3 && e3.unshift(Math.floor(t3 / o3)));
        return r3.concat(e3);
      }
      function Xe(t3, e3) {
        var r3, n4 = He(e3.x), o3 = He(e3.y), i4 = Math.max(e3.x, e3.y), a3 = function(t4, e4) {
          for (var r4 = 0, n5 = 0, o4 = []; r4 < t4.length && n5 < e4.length; ) t4[r4] === e4[n5] ? (o4.push(t4[r4]), r4++, n5++) : t4[r4] > e4[n5] ? n5++ : r4++;
          return o4;
        }(n4, o3), u3 = [8, 10, 15, 20, 32, 60, 80], c3 = { "x-small": 5, small: 4, medium: 3, large: 2, "x-large": 1 }, s3 = c3[t3] || c3.medium, f3 = u3[s3], l3 = Math.floor(i4 / f3);
        function d3(t4) {
          for (var e4 = 0, r4 = t4[Math.floor(t4.length / 2)]; e4 < t4.length - 1 && t4[e4] < l3; ) e4++;
          return e4 > 0 && (r4 = Math.abs(t4[e4] - l3) > Math.abs(t4[e4 - 1] - l3) ? t4[e4 - 1] : t4[e4]), l3 / r4 < u3[s3 + 1] / u3[s3] && l3 / r4 > u3[s3 - 1] / u3[s3] ? { x: r4, y: r4 } : null;
        }
        return (r3 = d3(a3)) || (r3 = d3(He(i4))) || (r3 = d3(He(l3 * f3))), r3 || (r3 = { x: Math.max(1, e3.x), y: Math.max(1, e3.y) }), r3;
      }
      var Qe = { top: function(t3, e3) {
        return "%" === t3.unit ? Math.floor(e3.height * (t3.value / 100)) : null;
      }, right: function(t3, e3) {
        return "%" === t3.unit ? Math.floor(e3.width - e3.width * (t3.value / 100)) : null;
      }, bottom: function(t3, e3) {
        return "%" === t3.unit ? Math.floor(e3.height - e3.height * (t3.value / 100)) : null;
      }, left: function(t3, e3) {
        return "%" === t3.unit ? Math.floor(e3.width * (t3.value / 100)) : null;
      } };
      function $e(t3, e3, r3) {
        var n4 = { width: t3, height: e3 }, o3 = Object.keys(r3).reduce(function(t4, e4) {
          if (!Qe[e4]) return t4;
          var o4 = function(t5) {
            return { value: parseFloat(t5), unit: (t5.indexOf("%"), t5.length, "%") };
          }(r3[e4]), i4 = Qe[e4](o4, n4);
          return t4[e4] = i4, t4;
        }, {});
        return { sx: o3.left, sy: o3.top, sw: o3.right - o3.left, sh: o3.bottom - o3.top };
      }
      function Ye(t3) {
        if (t3 < 0) throw new Error("expected positive number, received ".concat(t3));
      }
      var Ze = function() {
        return y3()(function t3(e3, r3) {
          var n4 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Uint8Array, o3 = arguments.length > 3 ? arguments[3] : void 0;
          v2()(this, t3), x2()(this, "data", void 0), x2()(this, "size", void 0), x2()(this, "indexMapping", void 0), r3 ? this.data = r3 : (this.data = new n4(e3.x * e3.y), o3 && ze(this.data, 0)), this.size = e3;
        }, [{ key: "inImageWithBorder", value: function(t3) {
          var e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
          return Ye(e3), t3.x >= 0 && t3.y >= 0 && t3.x < this.size.x + 2 * e3 && t3.y < this.size.y + 2 * e3;
        } }, { key: "subImageAsCopy", value: function(t3, e3) {
          Ye(e3.x), Ye(e3.y);
          for (var r3 = t3.size, n4 = r3.x, o3 = r3.y, i4 = 0; i4 < n4; i4++) for (var a3 = 0; a3 < o3; a3++) t3.data[a3 * n4 + i4] = this.data[(e3.y + a3) * this.size.x + e3.x + i4];
          return t3;
        } }, { key: "get", value: function(t3, e3) {
          return this.data[e3 * this.size.x + t3];
        } }, { key: "getSafe", value: function(t3, e3) {
          if (!this.indexMapping) {
            this.indexMapping = { x: [], y: [] };
            for (var r3 = 0; r3 < this.size.x; r3++) this.indexMapping.x[r3] = r3, this.indexMapping.x[r3 + this.size.x] = r3;
            for (var n4 = 0; n4 < this.size.y; n4++) this.indexMapping.y[n4] = n4, this.indexMapping.y[n4 + this.size.y] = n4;
          }
          return this.data[this.indexMapping.y[e3 + this.size.y] * this.size.x + this.indexMapping.x[t3 + this.size.x]];
        } }, { key: "set", value: function(t3, e3, r3) {
          return this.data[e3 * this.size.x + t3] = r3, delete this.indexMapping, this;
        } }, { key: "zeroBorder", value: function() {
          for (var t3 = this.size, e3 = t3.x, r3 = t3.y, n4 = 0; n4 < e3; n4++) this.data[n4] = this.data[(r3 - 1) * e3 + n4] = 0;
          for (var o3 = 1; o3 < r3 - 1; o3++) this.data[o3 * e3] = this.data[o3 * e3 + (e3 - 1)] = 0;
          return delete this.indexMapping, this;
        } }, { key: "moments", value: function(t3) {
          var e3, r3, n4, i4, a3, u3, c3, s3, f3, l3, d3 = this.data, h3 = this.size.y, v3 = this.size.x, p3 = [], y4 = [], g3 = Math.PI, x3 = g3 / 4;
          if (t3 <= 0) return y4;
          for (a3 = 0; a3 < t3; a3++) p3[a3] = { m00: 0, m01: 0, m10: 0, m11: 0, m02: 0, m20: 0, theta: 0, rad: 0 };
          for (r3 = 0; r3 < h3; r3++) for (i4 = r3 * r3, e3 = 0; e3 < v3; e3++) (n4 = d3[r3 * v3 + e3]) > 0 && ((u3 = p3[n4 - 1]).m00 += 1, u3.m01 += r3, u3.m10 += e3, u3.m11 += e3 * r3, u3.m02 += i4, u3.m20 += e3 * e3);
          for (a3 = 0; a3 < t3; a3++) u3 = p3[a3], isNaN(u3.m00) || 0 === u3.m00 || (s3 = u3.m10 / u3.m00, f3 = u3.m01 / u3.m00, c3 = u3.m11 / u3.m00 - s3 * f3, l3 = (u3.m02 / u3.m00 - f3 * f3 - (u3.m20 / u3.m00 - s3 * s3)) / (2 * c3), l3 = 0.5 * Math.atan(l3) + (c3 >= 0 ? x3 : -x3) + g3, u3.theta = (180 * l3 / g3 + 90) % 180 - 90, u3.theta < 0 && (u3.theta += 180), u3.rad = l3 > g3 ? l3 - g3 : l3, u3.vec = o2.clone([Math.cos(l3), Math.sin(l3)]), y4.push(u3));
          return y4;
        } }, { key: "getAsRGBA", value: function() {
          for (var t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, e3 = new Uint8ClampedArray(4 * this.size.x * this.size.y), r3 = 0; r3 < this.size.y; r3++) for (var n4 = 0; n4 < this.size.x; n4++) {
            var o3 = r3 * this.size.x + n4, i4 = this.get(n4, r3) * t3;
            e3[4 * o3 + 0] = i4, e3[4 * o3 + 1] = i4, e3[4 * o3 + 2] = i4, e3[4 * o3 + 3] = 255;
          }
          return e3;
        } }, { key: "show", value: function(t3) {
          var e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
          console.warn("* imagewrapper show getcontext 2d");
          var r3 = t3.getContext("2d");
          if (!r3) throw new Error("Unable to get canvas context");
          var n4 = r3.getImageData(0, 0, t3.width, t3.height), o3 = this.getAsRGBA(e3);
          t3.width = this.size.x, t3.height = this.size.y;
          var i4 = new ImageData(o3, n4.width, n4.height);
          r3.putImageData(i4, 0, 0);
        } }, { key: "overlay", value: function(t3, e3, r3) {
          var n4 = e3 < 0 || e3 > 360 ? 360 : e3, o3 = [0, 1, 1], i4 = [0, 0, 0], a3 = [255, 255, 255], u3 = [0, 0, 0];
          console.warn("* imagewrapper overlay getcontext 2d");
          var c3 = t3.getContext("2d");
          if (!c3) throw new Error("Unable to get canvas context");
          for (var s3 = c3.getImageData(r3.x, r3.y, this.size.x, this.size.y), f3 = s3.data, l3 = this.data.length; l3--; ) {
            o3[0] = this.data[l3] * n4;
            var h3 = 4 * l3, v3 = o3[0] <= 0 ? a3 : o3[0] >= 360 ? u3 : Ge(o3, i4), p3 = d2()(v3, 3);
            f3[h3] = p3[0], f3[h3 + 1] = p3[1], f3[h3 + 2] = p3[2], f3[h3 + 3] = 255;
          }
          c3.putImageData(s3, r3.x, r3.y);
        } }]);
      }(), Ke = r2(7), Je = r2.n(Ke), tr = r2(6), er = r2.n(tr), rr = { drawRect: function(t3, e3, r3, n4) {
        r3.strokeStyle = n4.color, r3.fillStyle = n4.color, r3.lineWidth = n4.lineWidth || 1, r3.beginPath(), r3.strokeRect(t3.x, t3.y, e3.x, e3.y);
      }, drawPath: function(t3, e3, r3, n4) {
        r3.strokeStyle = n4.color, r3.fillStyle = n4.color, r3.lineWidth = n4.lineWidth, r3.beginPath(), r3.moveTo(t3[0][e3.x], t3[0][e3.y]);
        for (var o3 = 1; o3 < t3.length; o3++) r3.lineTo(t3[o3][e3.x], t3[o3][e3.y]);
        r3.closePath(), r3.stroke();
      }, drawImage: function(t3, e3, r3) {
        var n4 = r3.getImageData(0, 0, e3.x, e3.y), o3 = n4.data, i4 = o3.length, a3 = t3.length;
        if (i4 / a3 != 4) return false;
        for (; a3--; ) {
          var u3 = t3[a3];
          o3[--i4] = 255, o3[--i4] = u3, o3[--i4] = u3, o3[--i4] = u3;
        }
        return r3.putImageData(n4, 0, 0), true;
      } }, nr = r2(4), or = r2.n(nr), ir = r2(1), ar = r2.n(ir), ur = r2(5), cr = r2.n(ur), sr = function(t3) {
        return t3[t3.Forward = 1] = "Forward", t3[t3.Reverse = -1] = "Reverse", t3;
      }({}), fr = function() {
        return y3()(function t3(e3, r3) {
          v2()(this, t3), x2()(this, "_row", []), x2()(this, "config", {}), x2()(this, "supplements", []), x2()(this, "SINGLE_CODE_ERROR", 0), x2()(this, "FORMAT", "unknown"), x2()(this, "CONFIG_KEYS", {}), this._row = [], this.config = e3 || {}, r3 && (this.supplements = r3);
        }, [{ key: "_nextUnset", value: function(t3) {
          for (var e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r3 = e3; r3 < t3.length; r3++) if (!t3[r3]) return r3;
          return t3.length;
        } }, { key: "_matchPattern", value: function(t3, e3) {
          for (var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.SINGLE_CODE_ERROR || 1, n4 = 0, o3 = 0, i4 = 0, a3 = 0, u3 = 0, c3 = 0, s3 = 0, f3 = 0; f3 < t3.length; f3++) i4 += t3[f3], a3 += e3[f3];
          if (i4 < a3) return Number.MAX_VALUE;
          r3 *= u3 = i4 / a3;
          for (var l3 = 0; l3 < t3.length; l3++) {
            if (c3 = t3[l3], s3 = e3[l3] * u3, (o3 = Math.abs(c3 - s3) / s3) > r3) return Number.MAX_VALUE;
            n4 += o3;
          }
          return n4 / a3;
        } }, { key: "_nextSet", value: function(t3) {
          for (var e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r3 = e3; r3 < t3.length; r3++) if (t3[r3]) return r3;
          return t3.length;
        } }, { key: "_correctBars", value: function(t3, e3, r3) {
          for (var n4 = r3.length, o3 = 0; n4--; ) (o3 = t3[r3[n4]] * (1 - (1 - e3) / 2)) > 1 && (t3[r3[n4]] = o3);
        } }, { key: "decodePattern", value: function(t3) {
          this._row = t3;
          var e3 = this.decode();
          return null === e3 ? (this._row.reverse(), (e3 = this.decode()) && (e3.direction = sr.Reverse, e3.start = this._row.length - e3.start, e3.end = this._row.length - e3.end)) : e3.direction = sr.Forward, e3 && (e3.format = this.FORMAT), e3;
        } }, { key: "_matchRange", value: function(t3, e3, r3) {
          var n4;
          for (n4 = t3 = t3 < 0 ? 0 : t3; n4 < e3; n4++) if (this._row[n4] !== r3) return false;
          return true;
        } }, { key: "_fillCounters", value: function() {
          var t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._nextUnset(this._row), e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this._row.length, r3 = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], n4 = [], o3 = 0;
          n4[o3] = 0;
          for (var i4 = t3; i4 < e3; i4++) this._row[i4] ^ (r3 ? 1 : 0) ? n4[o3]++ : (n4[++o3] = 1, r3 = !r3);
          return n4;
        } }, { key: "_toCounters", value: function(t3, e3) {
          var r3 = e3.length, n4 = this._row.length, o3 = !this._row[t3], i4 = 0;
          ze(e3, 0);
          for (var a3 = t3; a3 < n4; a3++) if (this._row[a3] ^ (o3 ? 1 : 0)) e3[i4]++;
          else {
            if (++i4 === r3) break;
            e3[i4] = 1, o3 = !o3;
          }
          return e3;
        } }, { key: "decodeImage", value: function(t3) {
          return null;
        } }], [{ key: "Exception", get: function() {
          return { StartNotFoundException: "Start-Info was not found!", CodeNotFoundException: "Code could not be found!", PatternNotFoundException: "Pattern could not be found!" };
        } }]);
      }();
      x2()(fr, "adjacentLineValidationMatches", 0);
      var lr = fr;
      function dr(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      var hr = [3, 1, 3, 1, 1, 1], vr = [3, 1, 1, 1, 3], pr = [[1, 1, 3, 3, 1], [3, 1, 1, 1, 3], [1, 3, 1, 1, 3], [3, 3, 1, 1, 1], [1, 1, 3, 1, 3], [3, 1, 3, 1, 1], [1, 3, 3, 1, 1], [1, 1, 1, 3, 3], [3, 1, 1, 3, 1], [1, 3, 1, 3, 1]], yr = hr.reduce(function(t3, e3) {
        return t3 + e3;
      }, 0), gr = function(t3) {
        function e3() {
          var t4;
          v2()(this, e3);
          for (var r3 = arguments.length, n4 = new Array(r3), o3 = 0; o3 < r3; o3++) n4[o3] = arguments[o3];
          return t4 = dr(this, e3, [].concat(n4)), x2()(t4, "barSpaceRatio", [1, 1]), x2()(t4, "FORMAT", "2of5"), x2()(t4, "SINGLE_CODE_ERROR", 0.78), x2()(t4, "AVG_CODE_ERROR", 0.3), t4;
        }
        return cr()(e3, t3), y3()(e3, [{ key: "_findPattern", value: function(t4, e4) {
          var r3 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], n4 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], o3 = [], i4 = 0, a3 = { error: Number.MAX_VALUE, code: -1, start: 0, end: 0 }, u3 = 0, c3 = 0, s3 = this.AVG_CODE_ERROR;
          e4 || (e4 = this._nextSet(this._row));
          for (var f3 = 0; f3 < t4.length; f3++) o3[f3] = 0;
          for (var l3 = e4; l3 < this._row.length; l3++) if (this._row[l3] ^ (r3 ? 1 : 0)) o3[i4]++;
          else {
            if (i4 === o3.length - 1) {
              u3 = 0;
              for (var d3 = 0; d3 < o3.length; d3++) u3 += o3[d3];
              if ((c3 = this._matchPattern(o3, t4)) < s3) return a3.error = c3, a3.start = l3 - u3, a3.end = l3, a3;
              if (!n4) return null;
              for (var h3 = 0; h3 < o3.length - 2; h3++) o3[h3] = o3[h3 + 2];
              o3[o3.length - 2] = 0, o3[o3.length - 1] = 0, i4--;
            } else i4++;
            o3[i4] = 1, r3 = !r3;
          }
          return null;
        } }, { key: "_findStart", value: function() {
          for (var t4 = null, e4 = this._nextSet(this._row), r3 = 1, n4 = 0; !t4; ) {
            if (!(t4 = this._findPattern(hr, e4, false, true))) return null;
            if (r3 = Math.floor((t4.end - t4.start) / yr), (n4 = t4.start - 5 * r3) >= 0 && this._matchRange(n4, t4.start, 0)) return t4;
            e4 = t4.end, t4 = null;
          }
          return t4;
        } }, { key: "_verifyTrailingWhitespace", value: function(t4) {
          var e4 = t4.end + (t4.end - t4.start) / 2;
          return e4 < this._row.length && this._matchRange(t4.end, e4, 0) ? t4 : null;
        } }, { key: "_findEnd", value: function() {
          this._row.reverse();
          var t4 = this._nextSet(this._row), e4 = this._findPattern(vr, t4, false, true);
          if (this._row.reverse(), null === e4) return null;
          var r3 = e4.start;
          return e4.start = this._row.length - e4.end, e4.end = this._row.length - r3, null !== e4 ? this._verifyTrailingWhitespace(e4) : null;
        } }, { key: "_verifyCounterLength", value: function(t4) {
          return t4.length % 10 == 0;
        } }, { key: "_decodeCode", value: function(t4) {
          for (var e4 = this.AVG_CODE_ERROR, r3 = { error: Number.MAX_VALUE, code: -1, start: 0, end: 0 }, n4 = 0; n4 < pr.length; n4++) {
            var o3 = this._matchPattern(t4, pr[n4]);
            o3 < r3.error && (r3.code = n4, r3.error = o3);
          }
          return r3.error < e4 ? r3 : null;
        } }, { key: "_decodePayload", value: function(t4, e4, r3) {
          for (var n4 = 0, o3 = t4.length, i4 = [0, 0, 0, 0, 0], a3 = null; n4 < o3; ) {
            for (var u3 = 0; u3 < 5; u3++) i4[u3] = t4[n4] * this.barSpaceRatio[0], n4 += 2;
            if (!(a3 = this._decodeCode(i4))) return null;
            e4.push("".concat(a3.code)), r3.push(a3);
          }
          return a3;
        } }, { key: "decode", value: function(t4, e4) {
          var r3 = this._findStart();
          if (!r3) return null;
          var n4 = this._findEnd();
          if (!n4) return null;
          var o3 = this._fillCounters(r3.end, n4.start, false);
          if (!this._verifyCounterLength(o3)) return null;
          var i4 = [];
          i4.push(r3);
          var a3 = [];
          return this._decodePayload(o3, a3, i4) ? a3.length < 5 ? null : (i4.push(n4), { code: a3.join(""), start: r3.start, end: n4.end, startInfo: r3, decodedCodes: i4, format: this.FORMAT }) : null;
        } }]);
      }(lr);
      function xr(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      var br = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 45, 36, 58, 47, 46, 43, 65, 66, 67, 68], _r = [3, 6, 9, 96, 18, 66, 33, 36, 48, 72, 12, 24, 69, 81, 84, 21, 26, 41, 11, 14], mr = [26, 41, 11, 14], wr = function(t3) {
        function e3() {
          var t4;
          v2()(this, e3);
          for (var r3 = arguments.length, n4 = new Array(r3), o3 = 0; o3 < r3; o3++) n4[o3] = arguments[o3];
          return t4 = xr(this, e3, [].concat(n4)), x2()(t4, "_counters", []), x2()(t4, "FORMAT", "codabar"), t4;
        }
        return cr()(e3, t3), y3()(e3, [{ key: "_computeAlternatingThreshold", value: function(t4, e4) {
          for (var r3 = Number.MAX_VALUE, n4 = 0, o3 = 0, i4 = t4; i4 < e4; i4 += 2) (o3 = this._counters[i4]) > n4 && (n4 = o3), o3 < r3 && (r3 = o3);
          return (r3 + n4) / 2 | 0;
        } }, { key: "_toPattern", value: function(t4) {
          var e4 = t4 + 7;
          if (e4 > this._counters.length) return -1;
          for (var r3 = this._computeAlternatingThreshold(t4, e4), n4 = this._computeAlternatingThreshold(t4 + 1, e4), o3 = 64, i4 = 0, a3 = 0, u3 = 0; u3 < 7; u3++) i4 = 0 == (1 & u3) ? r3 : n4, this._counters[t4 + u3] > i4 && (a3 |= o3), o3 >>= 1;
          return a3;
        } }, { key: "_isStartEnd", value: function(t4) {
          for (var e4 = 0; e4 < mr.length; e4++) if (mr[e4] === t4) return true;
          return false;
        } }, { key: "_sumCounters", value: function(t4, e4) {
          for (var r3 = 0, n4 = t4; n4 < e4; n4++) r3 += this._counters[n4];
          return r3;
        } }, { key: "_findStart", value: function() {
          for (var t4 = this._nextUnset(this._row), e4 = 1; e4 < this._counters.length; e4++) {
            var r3 = this._toPattern(e4);
            if (-1 !== r3 && this._isStartEnd(r3)) return { start: t4 += this._sumCounters(0, e4), end: t4 + this._sumCounters(e4, e4 + 8), startCounter: e4, endCounter: e4 + 8 };
          }
          return null;
        } }, { key: "_patternToChar", value: function(t4) {
          for (var e4 = 0; e4 < _r.length; e4++) if (_r[e4] === t4) return String.fromCharCode(br[e4]);
          return null;
        } }, { key: "_calculatePatternLength", value: function(t4) {
          for (var e4 = 0, r3 = t4; r3 < t4 + 7; r3++) e4 += this._counters[r3];
          return e4;
        } }, { key: "_verifyWhitespace", value: function(t4, e4) {
          return (t4 - 1 <= 0 || this._counters[t4 - 1] >= this._calculatePatternLength(t4) / 2) && (e4 + 8 >= this._counters.length || this._counters[e4 + 7] >= this._calculatePatternLength(e4) / 2);
        } }, { key: "_charToPattern", value: function(t4) {
          for (var e4 = t4.charCodeAt(0), r3 = 0; r3 < br.length; r3++) if (br[r3] === e4) return _r[r3];
          return 0;
        } }, { key: "_thresholdResultPattern", value: function(t4, e4) {
          for (var r3, n4 = { space: { narrow: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE }, wide: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE } }, bar: { narrow: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE }, wide: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE } } }, o3 = e4, i4 = 0; i4 < t4.length; i4++) {
            r3 = this._charToPattern(t4[i4]);
            for (var a3 = 6; a3 >= 0; a3--) {
              var u3 = 2 == (1 & a3) ? n4.bar : n4.space, c3 = 1 == (1 & r3) ? u3.wide : u3.narrow;
              c3.size += this._counters[o3 + a3], c3.counts++, r3 >>= 1;
            }
            o3 += 8;
          }
          return ["space", "bar"].forEach(function(t5) {
            var e5 = n4[t5];
            e5.wide.min = Math.floor((e5.narrow.size / e5.narrow.counts + e5.wide.size / e5.wide.counts) / 2), e5.narrow.max = Math.ceil(e5.wide.min), e5.wide.max = Math.ceil((2 * e5.wide.size + 1.5) / e5.wide.counts);
          }), n4;
        } }, { key: "_validateResult", value: function(t4, e4) {
          for (var r3, n4 = this._thresholdResultPattern(t4, e4), o3 = e4, i4 = 0; i4 < t4.length; i4++) {
            r3 = this._charToPattern(t4[i4]);
            for (var a3 = 6; a3 >= 0; a3--) {
              var u3 = 0 == (1 & a3) ? n4.bar : n4.space, c3 = 1 == (1 & r3) ? u3.wide : u3.narrow, s3 = this._counters[o3 + a3];
              if (s3 < c3.min || s3 > c3.max) return false;
              r3 >>= 1;
            }
            o3 += 8;
          }
          return true;
        } }, { key: "decode", value: function(t4, e4) {
          if (this._counters = this._fillCounters(), !(e4 = this._findStart())) return null;
          var r3, n4 = e4.startCounter, o3 = [];
          do {
            if ((r3 = this._toPattern(n4)) < 0) return null;
            var i4 = this._patternToChar(r3);
            if (null === i4) return null;
            if (o3.push(i4), n4 += 8, o3.length > 1 && this._isStartEnd(r3)) break;
          } while (n4 < this._counters.length);
          if (o3.length - 2 < 4 || !this._isStartEnd(r3)) return null;
          if (!this._verifyWhitespace(e4.startCounter, n4 - 8)) return null;
          if (!this._validateResult(o3, e4.startCounter)) return null;
          n4 = n4 > this._counters.length ? this._counters.length : n4;
          var a3 = e4.start + this._sumCounters(e4.startCounter, n4 - 8);
          return { code: o3.join(""), start: e4.start, end: a3, startInfo: e4, decodedCodes: o3, format: this.FORMAT };
        } }]);
      }(lr);
      function Or(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      var Mr = function(t3) {
        function e3() {
          var t4;
          v2()(this, e3);
          for (var r3 = arguments.length, n4 = new Array(r3), o3 = 0; o3 < r3; o3++) n4[o3] = arguments[o3];
          return t4 = Or(this, e3, [].concat(n4)), x2()(t4, "CODE_SHIFT", 98), x2()(t4, "CODE_C", 99), x2()(t4, "CODE_B", 100), x2()(t4, "CODE_A", 101), x2()(t4, "FNC1", 102), x2()(t4, "START_CODE_A", 103), x2()(t4, "START_CODE_B", 104), x2()(t4, "START_CODE_C", 105), x2()(t4, "STOP_CODE", 106), x2()(t4, "FNC1_CHAR", String.fromCharCode(29)), x2()(t4, "CODE_PATTERN", [[2, 1, 2, 2, 2, 2], [2, 2, 2, 1, 2, 2], [2, 2, 2, 2, 2, 1], [1, 2, 1, 2, 2, 3], [1, 2, 1, 3, 2, 2], [1, 3, 1, 2, 2, 2], [1, 2, 2, 2, 1, 3], [1, 2, 2, 3, 1, 2], [1, 3, 2, 2, 1, 2], [2, 2, 1, 2, 1, 3], [2, 2, 1, 3, 1, 2], [2, 3, 1, 2, 1, 2], [1, 1, 2, 2, 3, 2], [1, 2, 2, 1, 3, 2], [1, 2, 2, 2, 3, 1], [1, 1, 3, 2, 2, 2], [1, 2, 3, 1, 2, 2], [1, 2, 3, 2, 2, 1], [2, 2, 3, 2, 1, 1], [2, 2, 1, 1, 3, 2], [2, 2, 1, 2, 3, 1], [2, 1, 3, 2, 1, 2], [2, 2, 3, 1, 1, 2], [3, 1, 2, 1, 3, 1], [3, 1, 1, 2, 2, 2], [3, 2, 1, 1, 2, 2], [3, 2, 1, 2, 2, 1], [3, 1, 2, 2, 1, 2], [3, 2, 2, 1, 1, 2], [3, 2, 2, 2, 1, 1], [2, 1, 2, 1, 2, 3], [2, 1, 2, 3, 2, 1], [2, 3, 2, 1, 2, 1], [1, 1, 1, 3, 2, 3], [1, 3, 1, 1, 2, 3], [1, 3, 1, 3, 2, 1], [1, 1, 2, 3, 1, 3], [1, 3, 2, 1, 1, 3], [1, 3, 2, 3, 1, 1], [2, 1, 1, 3, 1, 3], [2, 3, 1, 1, 1, 3], [2, 3, 1, 3, 1, 1], [1, 1, 2, 1, 3, 3], [1, 1, 2, 3, 3, 1], [1, 3, 2, 1, 3, 1], [1, 1, 3, 1, 2, 3], [1, 1, 3, 3, 2, 1], [1, 3, 3, 1, 2, 1], [3, 1, 3, 1, 2, 1], [2, 1, 1, 3, 3, 1], [2, 3, 1, 1, 3, 1], [2, 1, 3, 1, 1, 3], [2, 1, 3, 3, 1, 1], [2, 1, 3, 1, 3, 1], [3, 1, 1, 1, 2, 3], [3, 1, 1, 3, 2, 1], [3, 3, 1, 1, 2, 1], [3, 1, 2, 1, 1, 3], [3, 1, 2, 3, 1, 1], [3, 3, 2, 1, 1, 1], [3, 1, 4, 1, 1, 1], [2, 2, 1, 4, 1, 1], [4, 3, 1, 1, 1, 1], [1, 1, 1, 2, 2, 4], [1, 1, 1, 4, 2, 2], [1, 2, 1, 1, 2, 4], [1, 2, 1, 4, 2, 1], [1, 4, 1, 1, 2, 2], [1, 4, 1, 2, 2, 1], [1, 1, 2, 2, 1, 4], [1, 1, 2, 4, 1, 2], [1, 2, 2, 1, 1, 4], [1, 2, 2, 4, 1, 1], [1, 4, 2, 1, 1, 2], [1, 4, 2, 2, 1, 1], [2, 4, 1, 2, 1, 1], [2, 2, 1, 1, 1, 4], [4, 1, 3, 1, 1, 1], [2, 4, 1, 1, 1, 2], [1, 3, 4, 1, 1, 1], [1, 1, 1, 2, 4, 2], [1, 2, 1, 1, 4, 2], [1, 2, 1, 2, 4, 1], [1, 1, 4, 2, 1, 2], [1, 2, 4, 1, 1, 2], [1, 2, 4, 2, 1, 1], [4, 1, 1, 2, 1, 2], [4, 2, 1, 1, 1, 2], [4, 2, 1, 2, 1, 1], [2, 1, 2, 1, 4, 1], [2, 1, 4, 1, 2, 1], [4, 1, 2, 1, 2, 1], [1, 1, 1, 1, 4, 3], [1, 1, 1, 3, 4, 1], [1, 3, 1, 1, 4, 1], [1, 1, 4, 1, 1, 3], [1, 1, 4, 3, 1, 1], [4, 1, 1, 1, 1, 3], [4, 1, 1, 3, 1, 1], [1, 1, 3, 1, 4, 1], [1, 1, 4, 1, 3, 1], [3, 1, 1, 1, 4, 1], [4, 1, 1, 1, 3, 1], [2, 1, 1, 4, 1, 2], [2, 1, 1, 2, 1, 4], [2, 1, 1, 2, 3, 2], [2, 3, 3, 1, 1, 1, 2]]), x2()(t4, "SINGLE_CODE_ERROR", 0.64), x2()(t4, "AVG_CODE_ERROR", 0.3), x2()(t4, "FORMAT", "code_128"), x2()(t4, "MODULE_INDICES", { bar: [0, 2, 4], space: [1, 3, 5] }), t4;
        }
        return cr()(e3, t3), y3()(e3, [{ key: "_decodeCode", value: function(t4, e4) {
          for (var r3 = { error: Number.MAX_VALUE, code: -1, start: t4, end: t4, correction: { bar: 1, space: 1 } }, n4 = [0, 0, 0, 0, 0, 0], o3 = t4, i4 = !this._row[o3], a3 = 0, u3 = o3; u3 < this._row.length; u3++) if (this._row[u3] ^ (i4 ? 1 : 0)) n4[a3]++;
          else {
            if (a3 === n4.length - 1) {
              e4 && this._correct(n4, e4);
              for (var c3 = 0; c3 < this.CODE_PATTERN.length; c3++) {
                var s3 = this._matchPattern(n4, this.CODE_PATTERN[c3]);
                s3 < r3.error && (r3.code = c3, r3.error = s3);
              }
              return r3.end = u3, -1 === r3.code || r3.error > this.AVG_CODE_ERROR ? null : (this.CODE_PATTERN[r3.code] && (r3.correction.bar = this.calculateCorrection(this.CODE_PATTERN[r3.code], n4, this.MODULE_INDICES.bar), r3.correction.space = this.calculateCorrection(this.CODE_PATTERN[r3.code], n4, this.MODULE_INDICES.space)), r3);
            }
            n4[++a3] = 1, i4 = !i4;
          }
          return null;
        } }, { key: "_correct", value: function(t4, e4) {
          this._correctBars(t4, e4.bar, this.MODULE_INDICES.bar), this._correctBars(t4, e4.space, this.MODULE_INDICES.space);
        } }, { key: "_findStart", value: function() {
          for (var t4 = [0, 0, 0, 0, 0, 0], e4 = this._nextSet(this._row), r3 = { error: Number.MAX_VALUE, code: -1, start: 0, end: 0, correction: { bar: 1, space: 1 } }, n4 = false, o3 = 0, i4 = e4; i4 < this._row.length; i4++) if (this._row[i4] ^ (n4 ? 1 : 0)) t4[o3]++;
          else {
            if (o3 === t4.length - 1) {
              for (var a3 = t4.reduce(function(t5, e5) {
                return t5 + e5;
              }, 0), u3 = this.START_CODE_A; u3 <= this.START_CODE_C; u3++) {
                var c3 = this._matchPattern(t4, this.CODE_PATTERN[u3]);
                c3 < r3.error && (r3.code = u3, r3.error = c3);
              }
              if (r3.error < this.AVG_CODE_ERROR) return r3.start = i4 - a3, r3.end = i4, r3.correction.bar = this.calculateCorrection(this.CODE_PATTERN[r3.code], t4, this.MODULE_INDICES.bar), r3.correction.space = this.calculateCorrection(this.CODE_PATTERN[r3.code], t4, this.MODULE_INDICES.space), r3;
              for (var s3 = 0; s3 < 4; s3++) t4[s3] = t4[s3 + 2];
              t4[4] = 0, t4[5] = 0, o3--;
            } else o3++;
            t4[o3] = 1, n4 = !n4;
          }
          return null;
        } }, { key: "decode", value: function(t4, e4) {
          var r3 = this, n4 = this._findStart();
          if (null === n4) return null;
          var o3 = { code: n4.code, start: n4.start, end: n4.end, correction: { bar: n4.correction.bar, space: n4.correction.space } }, i4 = [];
          i4.push(o3);
          for (var a3 = o3.code, u3 = function(t5) {
            switch (t5) {
              case r3.START_CODE_A:
                return r3.CODE_A;
              case r3.START_CODE_B:
                return r3.CODE_B;
              case r3.START_CODE_C:
                return r3.CODE_C;
              default:
                return null;
            }
          }(o3.code), c3 = false, s3 = false, f3 = s3, l3 = true, d3 = 0, h3 = [], v3 = []; !c3; ) {
            if (f3 = s3, s3 = false, null !== (o3 = this._decodeCode(o3.end, o3.correction))) switch (o3.code !== this.STOP_CODE && (l3 = true), o3.code !== this.STOP_CODE && (h3.push(o3.code), a3 += ++d3 * o3.code), i4.push(o3), u3) {
              case this.CODE_A:
                if (o3.code < 64) v3.push(String.fromCharCode(32 + o3.code));
                else if (o3.code < 96) v3.push(String.fromCharCode(o3.code - 64));
                else switch (o3.code !== this.STOP_CODE && (l3 = false), o3.code) {
                  case this.CODE_SHIFT:
                    s3 = true, u3 = this.CODE_B;
                    break;
                  case this.CODE_B:
                    u3 = this.CODE_B;
                    break;
                  case this.CODE_C:
                    u3 = this.CODE_C;
                    break;
                  case this.FNC1:
                    v3.push(this.FNC1_CHAR);
                    break;
                  case this.STOP_CODE:
                    c3 = true;
                }
                break;
              case this.CODE_B:
                if (o3.code < 96) v3.push(String.fromCharCode(32 + o3.code));
                else switch (o3.code !== this.STOP_CODE && (l3 = false), o3.code) {
                  case this.CODE_SHIFT:
                    s3 = true, u3 = this.CODE_A;
                    break;
                  case this.CODE_A:
                    u3 = this.CODE_A;
                    break;
                  case this.CODE_C:
                    u3 = this.CODE_C;
                    break;
                  case this.FNC1:
                    v3.push(this.FNC1_CHAR);
                    break;
                  case this.STOP_CODE:
                    c3 = true;
                }
                break;
              case this.CODE_C:
                if (o3.code < 100) v3.push(o3.code < 10 ? "0" + o3.code : o3.code);
                else switch (o3.code !== this.STOP_CODE && (l3 = false), o3.code) {
                  case this.CODE_A:
                    u3 = this.CODE_A;
                    break;
                  case this.CODE_B:
                    u3 = this.CODE_B;
                    break;
                  case this.FNC1:
                    v3.push(this.FNC1_CHAR);
                    break;
                  case this.STOP_CODE:
                    c3 = true;
                }
            }
            else c3 = true;
            f3 && (u3 = u3 === this.CODE_A ? this.CODE_B : this.CODE_A);
          }
          return null === o3 ? null : (o3.end = this._nextUnset(this._row, o3.end), this._verifyTrailingWhitespace(o3) ? (a3 -= d3 * h3[h3.length - 1]) % 103 !== h3[h3.length - 1] ? null : v3.length ? (l3 && v3.splice(v3.length - 1, 1), { code: v3.join(""), start: n4.start, end: o3.end, codeset: u3, startInfo: n4, decodedCodes: i4, endInfo: o3, format: this.FORMAT }) : null : null);
        } }, { key: "_verifyTrailingWhitespace", value: function(t4) {
          var e4;
          return (e4 = t4.end + (t4.end - t4.start) / 2) < this._row.length && this._matchRange(t4.end, e4, 0) ? t4 : null;
        } }, { key: "calculateCorrection", value: function(t4, e4, r3) {
          for (var n4 = r3.length, o3 = 0, i4 = 0; n4--; ) i4 += t4[r3[n4]], o3 += e4[r3[n4]];
          return i4 / o3;
        } }]);
      }(lr), Cr = r2(13), Rr = r2.n(Cr), Sr = r2(16), Ar = r2.n(Sr);
      function Er(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      var kr = new Uint16Array(Ar()("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. *$/+%").map(function(t3) {
        return t3.charCodeAt(0);
      })), jr = new Uint16Array([52, 289, 97, 352, 49, 304, 112, 37, 292, 100, 265, 73, 328, 25, 280, 88, 13, 268, 76, 28, 259, 67, 322, 19, 274, 82, 7, 262, 70, 22, 385, 193, 448, 145, 400, 208, 133, 388, 196, 148, 168, 162, 138, 42]), Pr = function(t3) {
        function e3() {
          var t4;
          v2()(this, e3);
          for (var r3 = arguments.length, n4 = new Array(r3), o3 = 0; o3 < r3; o3++) n4[o3] = arguments[o3];
          return t4 = Er(this, e3, [].concat(n4)), x2()(t4, "FORMAT", "code_39"), t4;
        }
        return cr()(e3, t3), y3()(e3, [{ key: "_findStart", value: function() {
          for (var t4 = this._nextSet(this._row), e4 = t4, r3 = new Uint16Array([0, 0, 0, 0, 0, 0, 0, 0, 0]), n4 = 0, o3 = false, i4 = t4; i4 < this._row.length; i4++) if (this._row[i4] ^ (o3 ? 1 : 0)) r3[n4]++;
          else {
            if (n4 === r3.length - 1) {
              if (148 === this._toPattern(r3)) {
                var a3 = Math.floor(Math.max(0, e4 - (i4 - e4) / 4));
                if (this._matchRange(a3, e4, 0)) return { start: e4, end: i4 };
              }
              e4 += r3[0] + r3[1];
              for (var u3 = 0; u3 < 7; u3++) r3[u3] = r3[u3 + 2];
              r3[7] = 0, r3[8] = 0, n4--;
            } else n4++;
            r3[n4] = 1, o3 = !o3;
          }
          return null;
        } }, { key: "_toPattern", value: function(t4) {
          for (var e4 = t4.length, r3 = 0, n4 = e4, o3 = 0; n4 > 3; ) {
            r3 = this._findNextWidth(t4, r3), n4 = 0;
            for (var i4 = 0, a3 = 0; a3 < e4; a3++) t4[a3] > r3 && (i4 |= 1 << e4 - 1 - a3, n4++, o3 += t4[a3]);
            if (3 === n4) {
              for (var u3 = 0; u3 < e4 && n4 > 0; u3++) if (t4[u3] > r3 && (n4--, 2 * t4[u3] >= o3)) return -1;
              return i4;
            }
          }
          return -1;
        } }, { key: "_findNextWidth", value: function(t4, e4) {
          for (var r3 = Number.MAX_VALUE, n4 = 0; n4 < t4.length; n4++) t4[n4] < r3 && t4[n4] > e4 && (r3 = t4[n4]);
          return r3;
        } }, { key: "_patternToChar", value: function(t4) {
          for (var e4 = 0; e4 < jr.length; e4++) if (jr[e4] === t4) return String.fromCharCode(kr[e4]);
          return null;
        } }, { key: "_verifyTrailingWhitespace", value: function(t4, e4, r3) {
          var n4 = Ne(r3);
          return 3 * (e4 - t4 - n4) >= n4;
        } }, { key: "decode", value: function() {
          var t4 = new Uint16Array([0, 0, 0, 0, 0, 0, 0, 0, 0]), e4 = [], r3 = this._findStart();
          if (!r3) return null;
          var n4, o3, i4 = this._nextSet(this._row, r3.end);
          do {
            t4 = this._toCounters(i4, t4);
            var a3 = this._toPattern(t4);
            if (a3 < 0) return null;
            if (null === (n4 = this._patternToChar(a3))) return null;
            e4.push(n4), o3 = i4, i4 += Ne(t4), i4 = this._nextSet(this._row, i4);
          } while ("*" !== n4);
          return e4.pop(), e4.length && this._verifyTrailingWhitespace(o3, i4, t4) ? { code: e4.join(""), start: r3.start, end: i4, startInfo: r3, decodedCodes: e4, format: this.FORMAT } : null;
        } }]);
      }(lr);
      function Dr(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      var Tr = /[AEIO]/g, Ir = function(t3) {
        function e3() {
          var t4;
          v2()(this, e3);
          for (var r3 = arguments.length, n4 = new Array(r3), o3 = 0; o3 < r3; o3++) n4[o3] = arguments[o3];
          return t4 = Dr(this, e3, [].concat(n4)), x2()(t4, "FORMAT", "code_32_reader"), t4;
        }
        return cr()(e3, t3), y3()(e3, [{ key: "_decodeCode32", value: function(t4) {
          if (/[^0-9BCDFGHJKLMNPQRSTUVWXYZ]/.test(t4)) return null;
          for (var e4 = 0, r3 = 0; r3 < t4.length; r3++) e4 = 32 * e4 + "0123456789BCDFGHJKLMNPQRSTUVWXYZ".indexOf(t4[r3]);
          var n4 = "".concat(e4);
          return n4.length < 9 && (n4 = ("000000000" + n4).slice(-9)), "A" + n4;
        } }, { key: "_checkChecksum", value: function(t4) {
          return !!t4;
        } }, { key: "decode", value: function() {
          var t4, r3, n4, o3, i4, a3 = (t4 = e3, r3 = "decode", n4 = this, o3 = 3, i4 = Rr()(ar()(1 & o3 ? t4.prototype : t4), r3, n4), 2 & o3 && "function" == typeof i4 ? function(t5) {
            return i4.apply(n4, t5);
          } : i4)([]);
          if (!a3) return null;
          var u3 = a3.code;
          if (!u3) return null;
          if (u3 = u3.replace(Tr, ""), !this._checkChecksum(u3)) return null;
          var c3 = this._decodeCode32(u3);
          return c3 ? (a3.code = c3, a3) : null;
        } }]);
      }(Pr);
      function zr(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      var Ur = /[IOQ]/g, Nr = /[A-Z0-9]{17}/, Wr = function(t3) {
        function e3() {
          var t4;
          v2()(this, e3);
          for (var r3 = arguments.length, n4 = new Array(r3), o3 = 0; o3 < r3; o3++) n4[o3] = arguments[o3];
          return t4 = zr(this, e3, [].concat(n4)), x2()(t4, "FORMAT", "code_39_vin"), t4;
        }
        return cr()(e3, t3), y3()(e3, [{ key: "_checkChecksum", value: function(t4) {
          return !!t4;
        } }, { key: "decode", value: function() {
          var t4, r3, n4, o3, i4, a3 = (t4 = e3, r3 = "decode", n4 = this, o3 = 3, i4 = Rr()(ar()(1 & o3 ? t4.prototype : t4), r3, n4), 2 & o3 && "function" == typeof i4 ? function(t5) {
            return i4.apply(n4, t5);
          } : i4)([]);
          if (!a3) return null;
          var u3 = a3.code;
          return u3 && (u3 = u3.replace(Ur, "")).match(Nr) && this._checkChecksum(u3) ? (a3.code = u3, a3) : null;
        } }]);
      }(Pr);
      function Fr(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      var Br = new Uint16Array(Ar()("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%abcd*").map(function(t3) {
        return t3.charCodeAt(0);
      })), Lr = new Uint16Array([276, 328, 324, 322, 296, 292, 290, 336, 274, 266, 424, 420, 418, 404, 402, 394, 360, 356, 354, 308, 282, 344, 332, 326, 300, 278, 436, 434, 428, 422, 406, 410, 364, 358, 310, 314, 302, 468, 466, 458, 366, 374, 430, 294, 474, 470, 306, 350]), Vr = function(t3) {
        function e3() {
          var t4;
          v2()(this, e3);
          for (var r3 = arguments.length, n4 = new Array(r3), o3 = 0; o3 < r3; o3++) n4[o3] = arguments[o3];
          return t4 = Fr(this, e3, [].concat(n4)), x2()(t4, "FORMAT", "code_93"), t4;
        }
        return cr()(e3, t3), y3()(e3, [{ key: "_patternToChar", value: function(t4) {
          for (var e4 = 0; e4 < Lr.length; e4++) if (Lr[e4] === t4) return String.fromCharCode(Br[e4]);
          return null;
        } }, { key: "_toPattern", value: function(t4) {
          for (var e4 = t4.length, r3 = t4.reduce(function(t5, e5) {
            return t5 + e5;
          }, 0), n4 = 0, o3 = 0; o3 < e4; o3++) {
            var i4 = Math.round(9 * t4[o3] / r3);
            if (i4 < 1 || i4 > 4) return -1;
            if (0 == (1 & o3)) for (var a3 = 0; a3 < i4; a3++) n4 = n4 << 1 | 1;
            else n4 <<= i4;
          }
          return n4;
        } }, { key: "_findStart", value: function() {
          for (var t4 = this._nextSet(this._row), e4 = t4, r3 = new Uint16Array([0, 0, 0, 0, 0, 0]), n4 = 0, o3 = false, i4 = t4; i4 < this._row.length; i4++) if (this._row[i4] ^ (o3 ? 1 : 0)) r3[n4]++;
          else {
            if (n4 === r3.length - 1) {
              if (350 === this._toPattern(r3)) {
                var a3 = Math.floor(Math.max(0, e4 - (i4 - e4) / 4));
                if (this._matchRange(a3, e4, 0)) return { start: e4, end: i4 };
              }
              e4 += r3[0] + r3[1];
              for (var u3 = 0; u3 < 4; u3++) r3[u3] = r3[u3 + 2];
              r3[4] = 0, r3[5] = 0, n4--;
            } else n4++;
            r3[n4] = 1, o3 = !o3;
          }
          return null;
        } }, { key: "_verifyEnd", value: function(t4, e4) {
          return !(t4 === e4 || !this._row[e4]);
        } }, { key: "_decodeExtended", value: function(t4) {
          for (var e4 = t4.length, r3 = [], n4 = 0; n4 < e4; n4++) {
            var o3 = t4[n4];
            if (o3 >= "a" && o3 <= "d") {
              if (n4 > e4 - 2) return null;
              var i4 = t4[++n4], a3 = i4.charCodeAt(0), u3 = void 0;
              switch (o3) {
                case "a":
                  if (!(i4 >= "A" && i4 <= "Z")) return null;
                  u3 = String.fromCharCode(a3 - 64);
                  break;
                case "b":
                  if (i4 >= "A" && i4 <= "E") u3 = String.fromCharCode(a3 - 38);
                  else if (i4 >= "F" && i4 <= "J") u3 = String.fromCharCode(a3 - 11);
                  else if (i4 >= "K" && i4 <= "O") u3 = String.fromCharCode(a3 + 16);
                  else if (i4 >= "P" && i4 <= "S") u3 = String.fromCharCode(a3 + 43);
                  else {
                    if (!(i4 >= "T" && i4 <= "Z")) return null;
                    u3 = String.fromCharCode(127);
                  }
                  break;
                case "c":
                  if (i4 >= "A" && i4 <= "O") u3 = String.fromCharCode(a3 - 32);
                  else {
                    if ("Z" !== i4) return null;
                    u3 = ":";
                  }
                  break;
                case "d":
                  if (!(i4 >= "A" && i4 <= "Z")) return null;
                  u3 = String.fromCharCode(a3 + 32);
                  break;
                default:
                  return console.warn("* code_93_reader _decodeExtended hit default case, this may be an error", u3), null;
              }
              r3.push(u3);
            } else r3.push(o3);
          }
          return r3;
        } }, { key: "_matchCheckChar", value: function(t4, e4, r3) {
          var n4 = t4.slice(0, e4), o3 = n4.length, i4 = n4.reduce(function(t5, e5, n5) {
            return t5 + ((-1 * n5 + (o3 - 1)) % r3 + 1) * Br.indexOf(e5.charCodeAt(0));
          }, 0);
          return Br[i4 % 47] === t4[e4].charCodeAt(0);
        } }, { key: "_verifyChecksums", value: function(t4) {
          return this._matchCheckChar(t4, t4.length - 2, 20) && this._matchCheckChar(t4, t4.length - 1, 15);
        } }, { key: "decode", value: function(t4, e4) {
          if (!(e4 = this._findStart())) return null;
          var r3, n4, o3 = new Uint16Array([0, 0, 0, 0, 0, 0]), i4 = [], a3 = this._nextSet(this._row, e4.end);
          do {
            o3 = this._toCounters(a3, o3);
            var u3 = this._toPattern(o3);
            if (u3 < 0) return null;
            if (null === (n4 = this._patternToChar(u3))) return null;
            i4.push(n4), r3 = a3, a3 += Ne(o3), a3 = this._nextSet(this._row, a3);
          } while ("*" !== n4);
          return i4.pop(), i4.length && this._verifyEnd(r3, a3) && this._verifyChecksums(i4) ? (i4 = i4.slice(0, i4.length - 2), null === (i4 = this._decodeExtended(i4)) ? null : { code: i4.join(""), start: e4.start, end: a3, startInfo: e4, decodedCodes: i4, format: this.FORMAT }) : null;
        } }]);
      }(lr);
      function qr(t3, e3) {
        var r3 = Object.keys(t3);
        if (Object.getOwnPropertySymbols) {
          var n4 = Object.getOwnPropertySymbols(t3);
          e3 && (n4 = n4.filter(function(e4) {
            return Object.getOwnPropertyDescriptor(t3, e4).enumerable;
          })), r3.push.apply(r3, n4);
        }
        return r3;
      }
      function Gr(t3) {
        for (var e3 = 1; e3 < arguments.length; e3++) {
          var r3 = null != arguments[e3] ? arguments[e3] : {};
          e3 % 2 ? qr(Object(r3), true).forEach(function(e4) {
            x2()(t3, e4, r3[e4]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r3)) : qr(Object(r3)).forEach(function(e4) {
            Object.defineProperty(t3, e4, Object.getOwnPropertyDescriptor(r3, e4));
          });
        }
        return t3;
      }
      function Hr(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      var Xr = [1, 1, 1], Qr = [1, 1, 1, 1, 1], $r = [1, 1, 2], Yr = [[3, 2, 1, 1], [2, 2, 2, 1], [2, 1, 2, 2], [1, 4, 1, 1], [1, 1, 3, 2], [1, 2, 3, 1], [1, 1, 1, 4], [1, 3, 1, 2], [1, 2, 1, 3], [3, 1, 1, 2], [1, 1, 2, 3], [1, 2, 2, 2], [2, 2, 1, 2], [1, 1, 4, 1], [2, 3, 1, 1], [1, 3, 2, 1], [4, 1, 1, 1], [2, 1, 3, 1], [3, 1, 2, 1], [2, 1, 1, 3]], Zr = [0, 11, 13, 14, 19, 25, 28, 21, 22, 26], Kr = function(t3) {
        function e3(t4, r3) {
          var n4;
          return v2()(this, e3), n4 = Hr(this, e3, [f2()({ supplements: [] }, t4), r3]), x2()(n4, "FORMAT", "ean_13"), x2()(n4, "SINGLE_CODE_ERROR", 0.7), x2()(n4, "STOP_PATTERN", [1, 1, 1]), n4;
        }
        return cr()(e3, t3), y3()(e3, [{ key: "_findPattern", value: function(t4, e4, r3, n4) {
          var o3 = new Array(t4.length).fill(0), i4 = { error: Number.MAX_VALUE, start: 0, end: 0 }, a3 = 0;
          e4 || (e4 = this._nextSet(this._row));
          for (var u3 = false, c3 = e4; c3 < this._row.length; c3++) if (this._row[c3] ^ (r3 ? 1 : 0)) o3[a3] += 1;
          else {
            if (a3 === o3.length - 1) {
              var s3 = this._matchPattern(o3, t4);
              if (s3 < 0.48 && i4.error && s3 < i4.error) return u3 = true, i4.error = s3, i4.start = c3 - o3.reduce(function(t5, e5) {
                return t5 + e5;
              }, 0), i4.end = c3, i4;
              if (n4) {
                for (var f3 = 0; f3 < o3.length - 2; f3++) o3[f3] = o3[f3 + 2];
                o3[o3.length - 2] = 0, o3[o3.length - 1] = 0, a3--;
              }
            } else a3++;
            o3[a3] = 1, r3 = !r3;
          }
          return u3 ? i4 : null;
        } }, { key: "_decodeCode", value: function(t4, e4) {
          var r3 = [0, 0, 0, 0], n4 = t4, o3 = { error: Number.MAX_VALUE, code: -1, start: t4, end: t4 }, i4 = !this._row[n4], a3 = 0;
          e4 || (e4 = Yr.length);
          for (var u3 = n4; u3 < this._row.length; u3++) if (this._row[u3] ^ (i4 ? 1 : 0)) r3[a3]++;
          else {
            if (a3 === r3.length - 1) {
              for (var c3 = 0; c3 < e4; c3++) {
                var s3 = this._matchPattern(r3, Yr[c3]);
                o3.end = u3, s3 < o3.error && (o3.code = c3, o3.error = s3);
              }
              return o3.error > 0.48 ? null : o3;
            }
            r3[++a3] = 1, i4 = !i4;
          }
          return null;
        } }, { key: "_findStart", value: function() {
          for (var t4 = this._nextSet(this._row), e4 = null; !e4; ) {
            if (!(e4 = this._findPattern(Xr, t4, false, true))) return null;
            var r3 = e4.start - (e4.end - e4.start);
            if (r3 >= 0 && this._matchRange(r3, e4.start, 0)) return e4;
            t4 = e4.end, e4 = null;
          }
          return null;
        } }, { key: "_calculateFirstDigit", value: function(t4) {
          for (var e4 = 0; e4 < Zr.length; e4++) if (t4 === Zr[e4]) return e4;
          return null;
        } }, { key: "_decodePayload", value: function(t4, e4, r3) {
          for (var n4 = Gr({}, t4), o3 = 0, i4 = 0; i4 < 6; i4++) {
            if (!(n4 = this._decodeCode(n4.end))) return null;
            n4.code >= 10 ? (n4.code -= 10, o3 |= 1 << 5 - i4) : o3 |= 0 << 5 - i4, e4.push(n4.code), r3.push(n4);
          }
          var a3 = this._calculateFirstDigit(o3);
          if (null === a3) return null;
          e4.unshift(a3);
          var u3 = this._findPattern(Qr, n4.end, true, false);
          if (null === u3 || !u3.end) return null;
          r3.push(u3);
          for (var c3 = 0; c3 < 6; c3++) {
            if (!(u3 = this._decodeCode(u3.end, 10))) return null;
            r3.push(u3), e4.push(u3.code);
          }
          return u3;
        } }, { key: "_verifyTrailingWhitespace", value: function(t4) {
          var e4 = t4.end + (t4.end - t4.start);
          return e4 < this._row.length && this._matchRange(t4.end, e4, 0) ? t4 : null;
        } }, { key: "_findEnd", value: function(t4, e4) {
          var r3 = this._findPattern(this.STOP_PATTERN, t4, e4, false);
          return null !== r3 ? this._verifyTrailingWhitespace(r3) : null;
        } }, { key: "_checksum", value: function(t4) {
          for (var e4 = 0, r3 = t4.length - 2; r3 >= 0; r3 -= 2) e4 += t4[r3];
          e4 *= 3;
          for (var n4 = t4.length - 1; n4 >= 0; n4 -= 2) e4 += t4[n4];
          return e4 % 10 == 0;
        } }, { key: "_decodeExtensions", value: function(t4) {
          var e4 = this._nextSet(this._row, t4), r3 = this._findPattern($r, e4, false, false);
          if (null === r3) return null;
          for (var n4 = 0; n4 < this.supplements.length; n4++) try {
            var o3 = this.supplements[n4].decode(this._row, r3.end);
            if (null !== o3) return { code: o3.code, start: e4, startInfo: r3, end: o3.end, decodedCodes: o3.decodedCodes, format: this.supplements[n4].FORMAT };
          } catch (t5) {
            console.error("* decodeExtensions error in ", this.supplements[n4], ": ", t5);
          }
          return null;
        } }, { key: "decode", value: function(t4, e4) {
          var r3 = new Array(), n4 = new Array(), o3 = {}, i4 = this._findStart();
          if (!i4) return null;
          var a3 = { start: i4.start, end: i4.end };
          if (n4.push(a3), !(a3 = this._decodePayload(a3, r3, n4))) return null;
          if (!(a3 = this._findEnd(a3.end, false))) return null;
          if (n4.push(a3), !this._checksum(r3)) return null;
          if (this.supplements.length > 0) {
            var u3 = this._decodeExtensions(a3.end);
            if (!u3) return null;
            if (!u3.decodedCodes) return null;
            var c3 = u3.decodedCodes[u3.decodedCodes.length - 1], s3 = { start: c3.start + ((c3.end - c3.start) / 2 | 0), end: c3.end };
            if (!this._verifyTrailingWhitespace(s3)) return null;
            o3 = { supplement: u3, code: r3.join("") + u3.code };
          }
          return Gr(Gr({ code: r3.join(""), start: i4.start, end: a3.end, startInfo: i4, decodedCodes: n4 }, o3), {}, { format: this.FORMAT });
        } }]);
      }(lr);
      function Jr(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      var tn = function(t3) {
        function e3() {
          var t4;
          v2()(this, e3);
          for (var r3 = arguments.length, n4 = new Array(r3), o3 = 0; o3 < r3; o3++) n4[o3] = arguments[o3];
          return t4 = Jr(this, e3, [].concat(n4)), x2()(t4, "FORMAT", "ean_2"), t4;
        }
        return cr()(e3, t3), y3()(e3, [{ key: "decode", value: function(t4, e4) {
          t4 && (this._row = t4);
          var r3 = 0, n4 = e4, o3 = this._row.length, i4 = [], a3 = [], u3 = null;
          if (void 0 === n4) return null;
          for (var c3 = 0; c3 < 2 && n4 < o3; c3++) {
            if (!(u3 = this._decodeCode(n4))) return null;
            a3.push(u3), i4.push(u3.code % 10), u3.code >= 10 && (r3 |= 1 << 1 - c3), 1 !== c3 && (n4 = this._nextSet(this._row, u3.end), n4 = this._nextUnset(this._row, n4));
          }
          if (2 !== i4.length || parseInt(i4.join("")) % 4 !== r3) return null;
          var s3 = this._findStart();
          return { code: i4.join(""), decodedCodes: a3, end: u3.end, format: this.FORMAT, startInfo: s3, start: s3.start };
        } }]);
      }(Kr);
      function en(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      var rn = [24, 20, 18, 17, 12, 6, 3, 10, 9, 5];
      var nn = function(t3) {
        function e3() {
          var t4;
          v2()(this, e3);
          for (var r3 = arguments.length, n4 = new Array(r3), o3 = 0; o3 < r3; o3++) n4[o3] = arguments[o3];
          return t4 = en(this, e3, [].concat(n4)), x2()(t4, "FORMAT", "ean_5"), t4;
        }
        return cr()(e3, t3), y3()(e3, [{ key: "decode", value: function(t4, e4) {
          if (void 0 === e4) return null;
          t4 && (this._row = t4);
          for (var r3 = 0, n4 = e4, o3 = this._row.length, i4 = null, a3 = [], u3 = [], c3 = 0; c3 < 5 && n4 < o3; c3++) {
            if (!(i4 = this._decodeCode(n4))) return null;
            u3.push(i4), a3.push(i4.code % 10), i4.code >= 10 && (r3 |= 1 << 4 - c3), 4 !== c3 && (n4 = this._nextSet(this._row, i4.end), n4 = this._nextUnset(this._row, n4));
          }
          if (5 !== a3.length) return null;
          if (function(t5) {
            for (var e5 = t5.length, r4 = 0, n5 = e5 - 2; n5 >= 0; n5 -= 2) r4 += t5[n5];
            r4 *= 3;
            for (var o4 = e5 - 1; o4 >= 0; o4 -= 2) r4 += t5[o4];
            return (r4 *= 3) % 10;
          }(a3) !== function(t5) {
            for (var e5 = 0; e5 < 10; e5++) if (t5 === rn[e5]) return e5;
            return null;
          }(r3)) return null;
          var s3 = this._findStart();
          return { code: a3.join(""), decodedCodes: u3, end: i4.end, format: this.FORMAT, startInfo: s3, start: s3.start };
        } }]);
      }(Kr);
      function on(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      var an = function(t3) {
        function e3() {
          var t4;
          v2()(this, e3);
          for (var r3 = arguments.length, n4 = new Array(r3), o3 = 0; o3 < r3; o3++) n4[o3] = arguments[o3];
          return t4 = on(this, e3, [].concat(n4)), x2()(t4, "FORMAT", "ean_8"), t4;
        }
        return cr()(e3, t3), y3()(e3, [{ key: "_decodePayload", value: function(t4, e4, r3) {
          for (var n4 = t4, o3 = 0; o3 < 4; o3++) {
            if (!(n4 = this._decodeCode(n4.end, 10))) return null;
            e4.push(n4.code), r3.push(n4);
          }
          if (null === (n4 = this._findPattern(Qr, n4.end, true, false))) return null;
          r3.push(n4);
          for (var i4 = 0; i4 < 4; i4++) {
            if (!(n4 = this._decodeCode(n4.end, 10))) return null;
            r3.push(n4), e4.push(n4.code);
          }
          return n4;
        } }]);
      }(Kr);
      function un(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      var cn = function(t3) {
        function e3(t4) {
          var r3;
          return v2()(this, e3), r3 = un(this, e3, [f2()({ normalizeBarSpaceWidth: false }, t4)]), x2()(r3, "barSpaceRatio", [1, 1]), x2()(r3, "SINGLE_CODE_ERROR", 0.78), x2()(r3, "AVG_CODE_ERROR", 0.38), x2()(r3, "START_PATTERN", [1, 1, 1, 1]), x2()(r3, "STOP_PATTERN", [1, 1, 3]), x2()(r3, "CODE_PATTERN", [[1, 1, 3, 3, 1], [3, 1, 1, 1, 3], [1, 3, 1, 1, 3], [3, 3, 1, 1, 1], [1, 1, 3, 1, 3], [3, 1, 3, 1, 1], [1, 3, 3, 1, 1], [1, 1, 1, 3, 3], [3, 1, 1, 3, 1], [1, 3, 1, 3, 1]]), x2()(r3, "MAX_CORRECTION_FACTOR", 5), x2()(r3, "FORMAT", "i2of5"), t4.normalizeBarSpaceWidth && (r3.SINGLE_CODE_ERROR = 0.38, r3.AVG_CODE_ERROR = 0.09), r3.config = t4, or()(r3, r3);
        }
        return cr()(e3, t3), y3()(e3, [{ key: "_matchPattern", value: function(t4, r3) {
          if (this.config.normalizeBarSpaceWidth) {
            for (var n4 = [0, 0], o3 = [0, 0], i4 = [0, 0], a3 = this.MAX_CORRECTION_FACTOR, u3 = 1 / a3, c3 = 0; c3 < t4.length; c3++) n4[c3 % 2] += t4[c3], o3[c3 % 2] += r3[c3];
            i4[0] = o3[0] / n4[0], i4[1] = o3[1] / n4[1], i4[0] = Math.max(Math.min(i4[0], a3), u3), i4[1] = Math.max(Math.min(i4[1], a3), u3), this.barSpaceRatio = i4;
            for (var s3 = 0; s3 < t4.length; s3++) t4[s3] *= this.barSpaceRatio[s3 % 2];
          }
          return (f3 = e3, l3 = "_matchPattern", d3 = this, h3 = 3, v3 = Rr()(ar()(1 & h3 ? f3.prototype : f3), l3, d3), 2 & h3 && "function" == typeof v3 ? function(t5) {
            return v3.apply(d3, t5);
          } : v3)([t4, r3]);
          var f3, l3, d3, h3, v3;
        } }, { key: "_findPattern", value: function(t4, e4) {
          var r3 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], n4 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], o3 = new Array(t4.length).fill(0), i4 = 0, a3 = { error: Number.MAX_VALUE, start: 0, end: 0 }, u3 = this.AVG_CODE_ERROR;
          r3 = r3 || false, n4 = n4 || false, e4 || (e4 = this._nextSet(this._row));
          for (var c3 = e4; c3 < this._row.length; c3++) if (this._row[c3] ^ (r3 ? 1 : 0)) o3[i4]++;
          else {
            if (i4 === o3.length - 1) {
              var s3 = o3.reduce(function(t5, e5) {
                return t5 + e5;
              }, 0), f3 = this._matchPattern(o3, t4);
              if (f3 < u3) return a3.error = f3, a3.start = c3 - s3, a3.end = c3, a3;
              if (!n4) return null;
              for (var l3 = 0; l3 < o3.length - 2; l3++) o3[l3] = o3[l3 + 2];
              o3[o3.length - 2] = 0, o3[o3.length - 1] = 0, i4--;
            } else i4++;
            o3[i4] = 1, r3 = !r3;
          }
          return null;
        } }, { key: "_findStart", value: function() {
          for (var t4 = 0, e4 = this._nextSet(this._row), r3 = null, n4 = 1; !r3; ) {
            if (!(r3 = this._findPattern(this.START_PATTERN, e4, false, true))) return null;
            if (n4 = Math.floor((r3.end - r3.start) / 4), (t4 = r3.start - 10 * n4) >= 0 && this._matchRange(t4, r3.start, 0)) return r3;
            e4 = r3.end, r3 = null;
          }
          return null;
        } }, { key: "_verifyTrailingWhitespace", value: function(t4) {
          var e4 = t4.end + (t4.end - t4.start) / 2;
          return e4 < this._row.length && this._matchRange(t4.end, e4, 0) ? t4 : null;
        } }, { key: "_findEnd", value: function() {
          this._row.reverse();
          var t4 = this._findPattern(this.STOP_PATTERN);
          if (this._row.reverse(), null === t4) return null;
          var e4 = t4.start;
          return t4.start = this._row.length - t4.end, t4.end = this._row.length - e4, null !== t4 ? this._verifyTrailingWhitespace(t4) : null;
        } }, { key: "_decodePair", value: function(t4) {
          for (var e4 = [], r3 = 0; r3 < t4.length; r3++) {
            var n4 = this._decodeCode(t4[r3]);
            if (!n4) return null;
            e4.push(n4);
          }
          return e4;
        } }, { key: "_decodeCode", value: function(t4) {
          for (var e4 = this.AVG_CODE_ERROR, r3 = { error: Number.MAX_VALUE, code: -1, start: 0, end: 0 }, n4 = 0; n4 < this.CODE_PATTERN.length; n4++) {
            var o3 = this._matchPattern(t4, this.CODE_PATTERN[n4]);
            o3 < r3.error && (r3.code = n4, r3.error = o3);
          }
          return r3.error < e4 ? r3 : null;
        } }, { key: "_decodePayload", value: function(t4, e4, r3) {
          for (var n4 = 0, o3 = t4.length, i4 = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], a3 = null; n4 < o3; ) {
            for (var u3 = 0; u3 < 5; u3++) i4[0][u3] = t4[n4] * this.barSpaceRatio[0], i4[1][u3] = t4[n4 + 1] * this.barSpaceRatio[1], n4 += 2;
            if (!(a3 = this._decodePair(i4))) return null;
            for (var c3 = 0; c3 < a3.length; c3++) e4.push(a3[c3].code + ""), r3.push(a3[c3]);
          }
          return a3;
        } }, { key: "_verifyCounterLength", value: function(t4) {
          return t4.length % 10 == 0;
        } }, { key: "decode", value: function(t4, e4) {
          var r3 = new Array(), n4 = new Array(), o3 = this._findStart();
          if (!o3) return null;
          n4.push(o3);
          var i4 = this._findEnd();
          if (!i4) return null;
          var a3 = this._fillCounters(o3.end, i4.start, false);
          return this._verifyCounterLength(a3) && this._decodePayload(a3, r3, n4) ? r3.length % 2 != 0 || r3.length < 6 ? null : (n4.push(i4), { code: r3.join(""), start: o3.start, end: i4.end, startInfo: o3, decodedCodes: n4, format: this.FORMAT }) : null;
        } }]);
      }(lr);
      function sn(t3, e3) {
        var r3 = "undefined" != typeof Symbol && t3[Symbol.iterator] || t3["@@iterator"];
        if (!r3) {
          if (Array.isArray(t3) || (r3 = function(t4, e4) {
            if (t4) {
              if ("string" == typeof t4) return fn(t4, e4);
              var r4 = {}.toString.call(t4).slice(8, -1);
              return "Object" === r4 && t4.constructor && (r4 = t4.constructor.name), "Map" === r4 || "Set" === r4 ? Array.from(t4) : "Arguments" === r4 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r4) ? fn(t4, e4) : void 0;
            }
          }(t3)) || e3) {
            r3 && (t3 = r3);
            var n4 = 0, o3 = function() {
            };
            return { s: o3, n: function() {
              return n4 >= t3.length ? { done: true } : { done: false, value: t3[n4++] };
            }, e: function(t4) {
              throw t4;
            }, f: o3 };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var i4, a3 = true, u3 = false;
        return { s: function() {
          r3 = r3.call(t3);
        }, n: function() {
          var t4 = r3.next();
          return a3 = t4.done, t4;
        }, e: function(t4) {
          u3 = true, i4 = t4;
        }, f: function() {
          try {
            a3 || null == r3.return || r3.return();
          } finally {
            if (u3) throw i4;
          }
        } };
      }
      function fn(t3, e3) {
        (null == e3 || e3 > t3.length) && (e3 = t3.length);
        for (var r3 = 0, n4 = Array(e3); r3 < e3; r3++) n4[r3] = t3[r3];
        return n4;
      }
      function ln(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      var dn = [2, 2.5, 3], hn = function(t3) {
        function e3() {
          var t4, r3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return v2()(this, e3), t4 = ln(this, e3, [r3]), x2()(t4, "FORMAT", "pharmacode"), x2()(t4, "SINGLE_CODE_ERROR", 0.7), x2()(t4, "AVG_CODE_ERROR", 0.48), t4;
        }
        return cr()(e3, t3), y3()(e3, [{ key: "_findStart", value: function() {
          for (var t4 = 0; t4 < this._row.length; ) {
            var e4 = this._nextSet(this._row, t4);
            if (e4 >= this._row.length) return null;
            for (var r3 = e4; r3 < this._row.length && this._row[r3]; ) r3++;
            var n4 = r3 - e4;
            if (n4 < 5) t4 = r3 + 1;
            else {
              var o3 = e4 - Math.max(2 * n4, 20);
              if (o3 < 0) t4 = r3 + 1;
              else if (this._matchRange(o3, e4, 0)) {
                var i4 = Math.max(10 * n4, 50), a3 = this._nextSet(this._row, r3);
                if (a3 >= this._row.length) t4 = r3 + 1;
                else {
                  if (!(a3 - r3 > i4)) return { start: e4, end: r3 };
                  t4 = r3 + 1;
                }
              } else t4 = r3 + 1;
            }
          }
          return null;
        } }, { key: "_smoothBarWidths", value: function(t4) {
          if (t4.length <= 2) return t4;
          for (var e4 = t4.slice(), r3 = 1; r3 < e4.length - 1; r3++) {
            var n4 = e4[r3 - 1], o3 = e4[r3], i4 = [n4, o3, e4[r3 + 1]].sort(function(t5, e5) {
              return t5 - e5;
            })[1], a3 = Math.abs(o3 - i4);
            a3 > 0 && a3 <= 3 && (e4[r3] = i4);
          }
          return e4;
        } }, { key: "_extractBarsAndSpaces", value: function(t4) {
          for (var e4 = [], r3 = [], n4 = t4, o3 = 0, i4 = false; n4 < this._row.length && this._row[n4]; ) o3++, n4++;
          if (0 === o3) return null;
          for (e4.push(o3), o3 = 0; n4 < this._row.length && !this._row[n4]; ) o3++, n4++;
          if (0 === o3 || n4 >= this._row.length) return null;
          r3.push(o3);
          for (var a3 = 6 * (e4[0] < r3[0] ? e4[0] : 0.8 * r3[0]), u3 = 2.5 * r3[0]; n4 < this._row.length && e4.length < 16; ) {
            for (o3 = 0; n4 < this._row.length && this._row[n4]; ) o3++, n4++;
            if (0 === o3) break;
            e4.push(o3), o3 = 0;
            for (var c3 = n4; n4 < this._row.length && !this._row[n4]; ) o3++, n4++;
            if (0 === o3) break;
            if (o3 >= a3) {
              i4 = true, n4 = c3;
              break;
            }
            if (e4.length >= 2 && o3 >= u3) {
              i4 = true, n4 = c3;
              break;
            }
            if (n4 >= this._row.length) {
              i4 = true, n4 = c3;
              break;
            }
            if (r3.push(o3), r3.length >= 2) u3 = 2 * (r3.reduce(function(t5, e5) {
              return t5 + e5;
            }, 0) / r3.length);
          }
          return i4 ? e4.length < 2 || e4.length > 16 || r3.length !== e4.length - 1 ? null : this._validateSpaces(r3) && this._validateBarSizeCount(e4) ? { bars: this._smoothBarWidths(e4), spaces: r3, end: n4 } : null : null;
        } }, { key: "_validateBarSizeCount", value: function(t4) {
          if (0 === t4.length) return false;
          var e4, r3 = [], n4 = sn(t4);
          try {
            for (n4.s(); !(e4 = n4.n()).done; ) {
              var o3, i4 = e4.value, a3 = false, u3 = sn(r3);
              try {
                for (u3.s(); !(o3 = u3.n()).done; ) {
                  var c3 = o3.value, s3 = c3.reduce(function(t5, e5) {
                    return t5 + e5;
                  }, 0) / c3.length;
                  if (Math.abs(i4 - s3) <= 0.35 * s3) {
                    c3.push(i4), a3 = true;
                    break;
                  }
                }
              } catch (t5) {
                u3.e(t5);
              } finally {
                u3.f();
              }
              a3 || r3.push([i4]);
            }
          } catch (t5) {
            n4.e(t5);
          } finally {
            n4.f();
          }
          return !(r3.length > 2);
        } }, { key: "_validateSpaces", value: function(t4) {
          if (0 === t4.length) return true;
          var e4 = t4.reduce(function(t5, e5) {
            return t5 + e5;
          }, 0) / t4.length;
          if (0 === e4) return false;
          var r3 = t4.reduce(function(t5, r4) {
            return t5 + Math.pow(r4 - e4, 2);
          }, 0) / t4.length;
          return Math.sqrt(r3) / e4 <= 0.35;
        } }, { key: "_validateBarRatios", value: function(t4, e4) {
          var r3 = t4.reduce(function(t5, e5) {
            return t5 + e5;
          }, 0) / t4.length, n4 = t4.reduce(function(t5, e5) {
            return t5 + Math.abs(e5 - r3);
          }, 0) / t4.length;
          if ((0 === r3 ? 0 : n4 / r3) <= 0.1) {
            var o3 = e4.length > 0 ? e4.reduce(function(t5, e5) {
              return t5 + e5;
            }, 0) / e4.length : 0;
            if (o3 > 0) {
              if (o3 / r3 < 0.7) return { narrowWidth: r3 / 2.5, wideRatio: 2.5 };
            }
            return { narrowWidth: r3, wideRatio: 2 };
          }
          var i4 = Array.from(new Set(t4.slice().sort(function(t5, e5) {
            return t5 - e5;
          })));
          if (i4.length < 2) return { narrowWidth: t4.reduce(function(t5, e5) {
            return t5 + e5;
          }, 0) / t4.length, wideRatio: 2 };
          for (var a3 = [], u3 = 0; u3 < i4.length - 1; u3++) {
            var c3, s3 = (i4[u3] + i4[u3 + 1]) / 2, f3 = [], l3 = [], d3 = sn(t4);
            try {
              for (d3.s(); !(c3 = d3.n()).done; ) {
                var h3 = c3.value;
                h3 < s3 ? f3.push(h3) : l3.push(h3);
              }
            } catch (t5) {
              d3.e(t5);
            } finally {
              d3.f();
            }
            if (0 !== f3.length && 0 !== l3.length) {
              for (var v3 = f3.reduce(function(t5, e5) {
                return t5 + e5;
              }, 0) / f3.length, p3 = l3.reduce(function(t5, e5) {
                return t5 + e5;
              }, 0) / l3.length, y4 = p3 / v3, g3 = dn[0], x3 = Math.abs(y4 - g3), b3 = 0, _3 = dn; b3 < _3.length; b3++) {
                var m3 = _3[b3], w2 = Math.abs(y4 - m3);
                w2 < x3 && (x3 = w2, g3 = m3);
              }
              a3.push({ threshold: s3, narrowBars: f3, wideBars: l3, avgN: v3, avgW: p3, ratio: y4, ratioDiff: x3, matchedRatio: g3 });
            }
          }
          a3.sort(function(t5, e5) {
            return t5.ratioDiff - e5.ratioDiff;
          });
          for (var O2 = 0, M3 = a3; O2 < M3.length; O2++) {
            var C3 = M3[O2], R3 = 0.05 * C3.matchedRatio;
            if (!(Math.abs(C3.ratio - C3.matchedRatio) > R3)) {
              var S3, A3 = 0.15 * C3.avgN, E3 = 0.15 * C3.avgW, k3 = true, j2 = sn(C3.narrowBars);
              try {
                for (j2.s(); !(S3 = j2.n()).done; ) {
                  var P3 = S3.value;
                  if (Math.abs(P3 - C3.avgN) > A3) {
                    k3 = false;
                    break;
                  }
                }
              } catch (t5) {
                j2.e(t5);
              } finally {
                j2.f();
              }
              if (k3) {
                var D3, T2 = sn(C3.wideBars);
                try {
                  for (T2.s(); !(D3 = T2.n()).done; ) {
                    var I3 = D3.value;
                    if (Math.abs(I3 - C3.avgW) > E3) {
                      k3 = false;
                      break;
                    }
                  }
                } catch (t5) {
                  T2.e(t5);
                } finally {
                  T2.f();
                }
                if (k3) return { narrowWidth: C3.avgN, wideRatio: C3.matchedRatio };
              }
            }
          }
          return null;
        } }, { key: "_validatePeriodicity", value: function(t4, e4) {
          if (t4.length > 0) {
            var r3 = t4.reduce(function(t5, e5) {
              return t5 + e5;
            }, 0) / t4.length, n4 = t4.reduce(function(t5, e5) {
              return t5 + Math.pow(e5 - r3, 2);
            }, 0) / t4.length, o3 = Math.sqrt(n4);
            if ((0 !== r3 ? o3 / r3 : 0) > 0.65) return false;
          }
          if (e4.length > 0) {
            var i4 = e4.reduce(function(t5, e5) {
              return t5 + e5;
            }, 0) / e4.length, a3 = e4.reduce(function(t5, e5) {
              return t5 + Math.pow(e5 - i4, 2);
            }, 0) / e4.length, u3 = Math.sqrt(a3);
            if ((0 !== i4 ? u3 / i4 : 0) > 0.55) return false;
          }
          return true;
        } }, { key: "_validateQuietZones", value: function(t4, e4, r3) {
          var n4 = 1 * e4;
          if (t4.start >= 2 && t4.start < n4) return false;
          var o3 = this._row.length - r3;
          return o3 < 6 || !(o3 < n4);
        } }, { key: "_decodeBars", value: function(t4, e4) {
          for (var r3 = 1.6 * (null != e4 ? e4 : Math.min.apply(Math, Ar()(t4))), n4 = 0, o3 = t4.slice().reverse(), i4 = 0; i4 < o3.length; i4++) {
            n4 += o3[i4] > r3 ? Math.pow(2, i4 + 1) : Math.pow(2, i4);
          }
          for (var a3 = "", u3 = o3.length - 1; u3 >= 0; u3--) a3 += o3[u3] > r3 ? "W" : "N";
          return { value: n4, pattern: a3 };
        } }, { key: "_verifyTrailingWhitespace", value: function(t4, e4) {
          var r3 = Math.min(t4 + 2 * e4, this._row.length);
          return this._matchRange(t4, r3, 0);
        } }, { key: "_validatePatternConsistency", value: function(t4, e4) {
          for (var r3 = t4.start, n4 = 0, o3 = 0, i4 = 0, a3 = [-2, -1, 1, 2]; i4 < a3.length; i4++) {
            var u3 = r3 + a3[i4];
            if (!(u3 < 0 || u3 >= this._row.length)) {
              o3++;
              var c3 = this._extractBarsAndSpaces(u3);
              if (c3 && c3.bars.length === e4.length) {
                for (var s3 = true, f3 = 0; f3 < e4.length; f3++) {
                  if (Math.abs(c3.bars[f3] - e4[f3]) / Math.max(e4[f3], 1) > 0.25) {
                    s3 = false;
                    break;
                  }
                }
                s3 && n4++;
              }
            }
          }
          return o3 > 0 && n4 >= 0.5 * o3;
        } }, { key: "decode", value: function(t4, e4) {
          var r3 = this._findStart();
          if (!r3) return null;
          if (r3.start > 0.5 * this._row.length) return null;
          var n4 = this._extractBarsAndSpaces(r3.start);
          if (!n4) return null;
          var o3 = n4.bars, i4 = n4.spaces, a3 = n4.end;
          if (o3.reduce(function(t5, e5) {
            return t5 + e5;
          }, 0) + i4.reduce(function(t5, e5) {
            return t5 + e5;
          }, 0) < 20) return null;
          if (this._row.length - a3 < 0) return null;
          if (!this._validateSpaces(i4)) return null;
          if (!this._validatePeriodicity(o3, i4)) return null;
          if (!this._validatePatternConsistency(r3, o3)) return null;
          var u3 = this._validateBarRatios(o3, i4);
          if (!u3) return null;
          if (!this._validateQuietZones(r3, u3.narrowWidth, a3)) return null;
          var c3 = this._decodeBars(o3, u3.narrowWidth);
          if (!c3) return null;
          var s3 = c3.value;
          if (s3 < 3 || s3 > 131070) return null;
          var f3 = o3.reduce(function(t5, e5) {
            return t5 + e5;
          }, 0) / o3.length;
          this._verifyTrailingWhitespace(a3, f3);
          var l3 = o3.map(function(t5, e5) {
            return { code: t5 > 1.6 * Math.min.apply(Math, Ar()(o3)) ? 1 : 0, start: 0, end: 0, error: 0 };
          });
          return { code: s3.toString(), start: r3.start, end: a3, startInfo: r3, decodedCodes: l3, pattern: c3.pattern, format: this.FORMAT };
        } }]);
      }(lr);
      x2()(hn, "adjacentLineValidationMatches", 1);
      var vn = hn;
      function pn(t3, e3) {
        var r3 = Object.keys(t3);
        if (Object.getOwnPropertySymbols) {
          var n4 = Object.getOwnPropertySymbols(t3);
          e3 && (n4 = n4.filter(function(e4) {
            return Object.getOwnPropertyDescriptor(t3, e4).enumerable;
          })), r3.push.apply(r3, n4);
        }
        return r3;
      }
      function yn(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      function gn(t3, e3, r3, n4) {
        var o3 = Rr()(ar()(t3.prototype), e3, r3);
        return 2 & n4 && "function" == typeof o3 ? function(t4) {
          return o3.apply(r3, t4);
        } : o3;
      }
      var xn = function(t3) {
        function e3() {
          var t4;
          v2()(this, e3);
          for (var r3 = arguments.length, n4 = new Array(r3), o3 = 0; o3 < r3; o3++) n4[o3] = arguments[o3];
          return t4 = yn(this, e3, [].concat(n4)), x2()(t4, "CODE_FREQUENCY", [[56, 52, 50, 49, 44, 38, 35, 42, 41, 37], [7, 11, 13, 14, 19, 25, 28, 21, 22, 26]]), x2()(t4, "STOP_PATTERN", [1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7]), x2()(t4, "FORMAT", "upc_e"), t4;
        }
        return cr()(e3, t3), y3()(e3, [{ key: "_decodePayload", value: function(t4, e4, r3) {
          for (var n4 = function(t5) {
            for (var e5 = 1; e5 < arguments.length; e5++) {
              var r4 = null != arguments[e5] ? arguments[e5] : {};
              e5 % 2 ? pn(Object(r4), true).forEach(function(e6) {
                x2()(t5, e6, r4[e6]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(r4)) : pn(Object(r4)).forEach(function(e6) {
                Object.defineProperty(t5, e6, Object.getOwnPropertyDescriptor(r4, e6));
              });
            }
            return t5;
          }({}, t4), o3 = 0, i4 = 0; i4 < 6; i4++) {
            if (!(n4 = this._decodeCode(n4.end))) return null;
            n4.code >= 10 && (n4.code = n4.code - 10, o3 |= 1 << 5 - i4), e4.push(n4.code), r3.push(n4);
          }
          return this._determineParity(o3, e4) ? n4 : null;
        } }, { key: "_determineParity", value: function(t4, e4) {
          for (var r3 = 0; r3 < this.CODE_FREQUENCY.length; r3++) for (var n4 = 0; n4 < this.CODE_FREQUENCY[r3].length; n4++) if (t4 === this.CODE_FREQUENCY[r3][n4]) return e4.unshift(r3), e4.push(n4), true;
          return false;
        } }, { key: "_convertToUPCA", value: function(t4) {
          var e4 = [t4[0]], r3 = t4[t4.length - 2];
          return (e4 = r3 <= 2 ? e4.concat(t4.slice(1, 3)).concat([r3, 0, 0, 0, 0]).concat(t4.slice(3, 6)) : 3 === r3 ? e4.concat(t4.slice(1, 4)).concat([0, 0, 0, 0, 0]).concat(t4.slice(4, 6)) : 4 === r3 ? e4.concat(t4.slice(1, 5)).concat([0, 0, 0, 0, 0, t4[5]]) : e4.concat(t4.slice(1, 6)).concat([0, 0, 0, 0, r3])).push(t4[t4.length - 1]), e4;
        } }, { key: "_checksum", value: function(t4) {
          return gn(e3, "_checksum", this, 3)([this._convertToUPCA(t4)]);
        } }, { key: "_findEnd", value: function(t4, r3) {
          return gn(e3, "_findEnd", this, 3)([t4, true]);
        } }, { key: "_verifyTrailingWhitespace", value: function(t4) {
          var e4 = t4.end + (t4.end - t4.start) / 2;
          return e4 < this._row.length && this._matchRange(t4.end, e4, 0) ? t4 : null;
        } }]);
      }(Kr);
      function bn(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      var _n = function(t3) {
        function e3() {
          var t4;
          v2()(this, e3);
          for (var r3 = arguments.length, n4 = new Array(r3), o3 = 0; o3 < r3; o3++) n4[o3] = arguments[o3];
          return t4 = bn(this, e3, [].concat(n4)), x2()(t4, "FORMAT", "upc_a"), t4;
        }
        return cr()(e3, t3), y3()(e3, [{ key: "decode", value: function(t4, e4) {
          var r3 = Kr.prototype.decode.call(this);
          return r3 && r3.code && 13 === r3.code.length && "0" === r3.code.charAt(0) ? (r3.code = r3.code.substring(1), r3) : null;
        } }]);
      }(Kr), mn = {}, wn = { UP: 1, DOWN: -1 };
      mn.getBarcodeLine = function(t3, e3, r3) {
        var n4, o3, i4, a3, u3, c3 = 0 | e3.x, s3 = 0 | e3.y, f3 = 0 | r3.x, l3 = 0 | r3.y, d3 = Math.abs(l3 - s3) > Math.abs(f3 - c3), h3 = [], v3 = t3.data, p3 = t3.size.x, y4 = 255, g3 = 0;
        function x3(t4, e4) {
          u3 = v3[e4 * p3 + t4], y4 = u3 < y4 ? u3 : y4, g3 = u3 > g3 ? u3 : g3, h3.push(u3);
        }
        d3 && (i4 = c3, c3 = s3, s3 = i4, i4 = f3, f3 = l3, l3 = i4), c3 > f3 && (i4 = c3, c3 = f3, f3 = i4, i4 = s3, s3 = l3, l3 = i4);
        var b3 = f3 - c3, _3 = Math.abs(l3 - s3);
        n4 = b3 / 2 | 0, o3 = s3;
        var m3 = s3 < l3 ? 1 : -1;
        for (a3 = c3; a3 < f3; a3++) d3 ? x3(o3, a3) : x3(a3, o3), (n4 -= _3) < 0 && (o3 += m3, n4 += b3);
        return { line: h3, min: y4, max: g3 };
      }, mn.toBinaryLine = function(t3) {
        var e3, r3, n4, o3, i4, a3, u3 = t3.min, c3 = t3.max, s3 = t3.line, f3 = u3 + (c3 - u3) / 2, l3 = [], d3 = (c3 - u3) / 12, h3 = -d3;
        for (n4 = s3[0] > f3 ? wn.UP : wn.DOWN, l3.push({ pos: 0, val: s3[0] }), i4 = 0; i4 < s3.length - 2; i4++) n4 !== (o3 = (e3 = s3[i4 + 1] - s3[i4]) + (r3 = s3[i4 + 2] - s3[i4 + 1]) < h3 && s3[i4 + 1] < 1.5 * f3 ? wn.DOWN : e3 + r3 > d3 && s3[i4 + 1] > 0.5 * f3 ? wn.UP : n4) && (l3.push({ pos: i4, val: s3[i4] }), n4 = o3);
        for (l3.push({ pos: s3.length, val: s3[s3.length - 1] }), a3 = l3[0].pos; a3 < l3[1].pos; a3++) s3[a3] = s3[a3] > f3 ? 0 : 1;
        for (i4 = 1; i4 < l3.length - 1; i4++) for (d3 = l3[i4 + 1].val > l3[i4].val ? l3[i4].val + (l3[i4 + 1].val - l3[i4].val) / 3 * 2 | 0 : l3[i4 + 1].val + (l3[i4].val - l3[i4 + 1].val) / 3 | 0, a3 = l3[i4].pos; a3 < l3[i4 + 1].pos; a3++) s3[a3] = s3[a3] > d3 ? 0 : 1;
        return { line: s3, threshold: d3 };
      }, mn.debug = { printFrequency: function(t3, e3) {
        var r3, n4 = e3.getContext("2d");
        for (e3.width = t3.length, e3.height = 256, n4.beginPath(), n4.strokeStyle = "blue", r3 = 0; r3 < t3.length; r3++) n4.moveTo(r3, 255), n4.lineTo(r3, 255 - t3[r3]);
        n4.stroke(), n4.closePath();
      }, printPattern: function(t3, e3) {
        var r3, n4 = e3.getContext("2d");
        for (e3.width = t3.length, n4.fillColor = "black", r3 = 0; r3 < t3.length; r3++) 1 === t3[r3] && n4.fillRect(r3, 0, 1, 100);
      } };
      var On = mn;
      function Mn(t3, e3) {
        var r3 = "undefined" != typeof Symbol && t3[Symbol.iterator] || t3["@@iterator"];
        if (!r3) {
          if (Array.isArray(t3) || (r3 = function(t4, e4) {
            if (t4) {
              if ("string" == typeof t4) return Cn(t4, e4);
              var r4 = {}.toString.call(t4).slice(8, -1);
              return "Object" === r4 && t4.constructor && (r4 = t4.constructor.name), "Map" === r4 || "Set" === r4 ? Array.from(t4) : "Arguments" === r4 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r4) ? Cn(t4, e4) : void 0;
            }
          }(t3)) || e3) {
            r3 && (t3 = r3);
            var n4 = 0, o3 = function() {
            };
            return { s: o3, n: function() {
              return n4 >= t3.length ? { done: true } : { done: false, value: t3[n4++] };
            }, e: function(t4) {
              throw t4;
            }, f: o3 };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var i4, a3 = true, u3 = false;
        return { s: function() {
          r3 = r3.call(t3);
        }, n: function() {
          var t4 = r3.next();
          return a3 = t4.done, t4;
        }, e: function(t4) {
          u3 = true, i4 = t4;
        }, f: function() {
          try {
            a3 || null == r3.return || r3.return();
          } finally {
            if (u3) throw i4;
          }
        } };
      }
      function Cn(t3, e3) {
        (null == e3 || e3 > t3.length) && (e3 = t3.length);
        for (var r3 = 0, n4 = Array(e3); r3 < e3; r3++) n4[r3] = t3[r3];
        return n4;
      }
      var Rn = { code_128_reader: Mr, ean_reader: Kr, ean_5_reader: nn, ean_2_reader: tn, ean_8_reader: an, code_39_reader: Pr, code_39_vin_reader: Wr, codabar_reader: wr, upc_reader: _n, upc_e_reader: xn, i2of5_reader: cn, "2of5_reader": gr, code_93_reader: Vr, code_32_reader: Ir, pharmacode_reader: vn }, Sn = { registerReader: function(t3, e3) {
        Rn[t3] = e3;
      }, create: function(t3, e3) {
        var n4 = [];
        function o3() {
          t3.readers.forEach(function(t4) {
            var e4, r3 = {}, o4 = [];
            "object" === c2()(t4) ? (e4 = t4.format, r3 = t4.config) : "string" == typeof t4 && (e4 = t4), r3.supplements && (o4 = r3.supplements.map(function(t5) {
              return new Rn[t5]();
            }));
            try {
              var i5 = new Rn[e4](r3, o4);
              n4.push(i5);
            } catch (t5) {
              throw console.error("* Error constructing reader ", e4, t5), t5;
            }
          });
        }
        function i4(t4) {
          var r3, o4 = null, i5 = On.getBarcodeLine(e3, t4[0], t4[1]);
          On.toBinaryLine(i5);
          var a4 = -1;
          for (r3 = 0; r3 < n4.length && null === o4; r3++) "function" == typeof n4[r3].setImageWrapper && n4[r3].setImageWrapper(e3), null !== (o4 = n4[r3].decodePattern(i5.line)) && (a4 = r3);
          return null === o4 || a4 >= 0 && n4[a4] instanceof vn && !function(t5, e4, r4, n5) {
            var o5 = Math.round(t5[1].y), i6 = e4.start, a5 = r4.constructor, u4 = a5 && a5.adjacentLineValidationMatches || 0;
            if (u4 <= 0) return true;
            for (var c3 = 0, s4 = false, f3 = 0, l3 = [1, 2, 3]; f3 < l3.length; f3++) {
              var d3 = l3[f3];
              if (s4) break;
              for (var h3 = 0, v3 = [-1, 1]; h3 < v3.length; h3++) {
                var p3 = v3[h3];
                if (s4) break;
                var y4 = o5 + d3 * p3;
                if (!(y4 < 0 || y4 >= n5.size.y)) {
                  var g3 = { x: t5[0].x, y: y4 }, x3 = { x: t5[1].x, y: y4 };
                  try {
                    var b3 = On.getBarcodeLine(n5, g3, x3);
                    On.toBinaryLine(b3), r4._row = b3.line;
                    var _3 = r4._findStart();
                    if (null !== _3 && _3.start === i6 && ++c3 >= u4) {
                      s4 = true;
                      break;
                    }
                  } catch (t6) {
                  }
                }
              }
            }
            return c3 >= u4;
          }(t4, o4, n4[a4], e3) ? null : { codeResult: o4, barcodeLine: i5 };
        }
        function a3(t4) {
          return u3.apply(this, arguments);
        }
        function u3() {
          return (u3 = Je()(er.a.mark(function t4(e4) {
            var r3, o4, i5, a4, u4;
            return er.a.wrap(function(t5) {
              for (; ; ) switch (t5.prev = t5.next) {
                case 0:
                  r3 = null, o4 = Mn(n4), t5.prev = 1, o4.s();
                case 2:
                  if ((i5 = o4.n()).done) {
                    t5.next = 5;
                    break;
                  }
                  if (!(a4 = i5.value).decodeImage) {
                    t5.next = 4;
                    break;
                  }
                  return t5.next = 3, a4.decodeImage(e4);
                case 3:
                  if (!(r3 = t5.sent)) {
                    t5.next = 4;
                    break;
                  }
                  return t5.abrupt("continue", 5);
                case 4:
                  t5.next = 2;
                  break;
                case 5:
                  t5.next = 7;
                  break;
                case 6:
                  t5.prev = 6, u4 = t5.catch(1), o4.e(u4);
                case 7:
                  return t5.prev = 7, o4.f(), t5.finish(7);
                case 8:
                  return t5.abrupt("return", r3);
                case 9:
                case "end":
                  return t5.stop();
              }
            }, t4, null, [[1, 6, 7, 8]]);
          }))).apply(this, arguments);
        }
        function s3(t4) {
          var n5, o4;
          var a4 = function(t5) {
            return Math.sqrt(Math.pow(Math.abs(t5[1].y - t5[0].y), 2) + Math.pow(Math.abs(t5[1].x - t5[0].x), 2));
          }(n5 = function(t5) {
            return [{ x: (t5[1][0] - t5[0][0]) / 2 + t5[0][0], y: (t5[1][1] - t5[0][1]) / 2 + t5[0][1] }, { x: (t5[3][0] - t5[2][0]) / 2 + t5[2][0], y: (t5[3][1] - t5[2][1]) / 2 + t5[2][1] }];
          }(t4)), u4 = Math.atan2(n5[1].y - n5[0].y, n5[1].x - n5[0].x);
          return null === (n5 = function(t5, r3, n6) {
            function o5(e4) {
              var n7 = e4 * Math.sin(r3), o6 = e4 * Math.cos(r3);
              t5[0].y -= n7, t5[0].x -= o6, t5[1].y += n7, t5[1].x += o6;
            }
            for (o5(n6); n6 > 1 && (!e3.inImageWithBorder(t5[0]) || !e3.inImageWithBorder(t5[1])); ) o5(-(n6 -= Math.ceil(n6 / 2)));
            return t5;
          }(n5, u4, Math.floor(0.1 * a4))) ? null : (null === (o4 = i4(n5)) && (o4 = function(t5, e4, r3) {
            var n6, o5, a5, u5 = Math.sqrt(Math.pow(t5[1][0] - t5[0][0], 2) + Math.pow(t5[1][1] - t5[0][1], 2)), c3 = null, s4 = Math.sin(r3), f3 = Math.cos(r3);
            for (n6 = 1; n6 < 16 && null === c3; n6++) a5 = { y: (o5 = u5 / 16 * n6 * (n6 % 2 == 0 ? -1 : 1)) * s4, x: o5 * f3 }, e4[0].y += a5.x, e4[0].x -= a5.y, e4[1].y += a5.x, e4[1].x -= a5.y, c3 = i4(e4);
            return c3;
          }(t4, n5, u4)), null === o4 ? null : { codeResult: o4.codeResult, line: n5, angle: u4, pattern: o4.barcodeLine.line, threshold: o4.barcodeLine.threshold });
        }
        return o3(), { decodeFromBoundingBox: function(t4) {
          return s3(t4);
        }, decodeFromBoundingBoxes: function(e4) {
          var r3, n5, o4 = [], i5 = t3.multiple;
          for (r3 = 0; r3 < e4.length; r3++) {
            var a4 = e4[r3];
            if ((n5 = s3(a4) || {}).box = a4, i5) o4.push(n5);
            else if (n5.codeResult) return n5;
          }
          return { barcodes: o4 };
        }, decodeFromImage: function(t4) {
          return Je()(er.a.mark(function e4() {
            var r3;
            return er.a.wrap(function(e5) {
              for (; ; ) switch (e5.prev = e5.next) {
                case 0:
                  return e5.next = 1, a3(t4);
                case 1:
                  return r3 = e5.sent, e5.abrupt("return", r3);
                case 2:
                case "end":
                  return e5.stop();
              }
            }, e4);
          }))();
        }, registerReader: function(t4, e4) {
          if (Rn[t4]) throw new Error("cannot register existing reader", t4);
          Rn[t4] = e4;
        }, setReaders: function(e4) {
          t3.readers = e4, n4.length = 0, o3();
        } };
      } }, An = /* @__PURE__ */ function() {
        var t3 = {};
        function e3(e4) {
          return t3[e4] || (t3[e4] = { subscribers: [] }), t3[e4];
        }
        function r3(t4, e4) {
          t4.async ? setTimeout(function() {
            t4.callback(e4);
          }, 4) : t4.callback(e4);
        }
        function n4(t4, r4, n5) {
          var o3;
          if ("function" == typeof r4) o3 = { callback: r4, async: n5 };
          else if (!(o3 = r4).callback) throw new Error("Callback was not specified on options");
          e3(t4).subscribers.push(o3);
        }
        return { subscribe: function(t4, e4, r4) {
          return n4(t4, e4, r4);
        }, publish: function(t4, n5) {
          var o3 = e3(t4), i4 = o3.subscribers;
          i4.filter(function(t5) {
            return !!t5.once;
          }).forEach(function(t5) {
            r3(t5, n5);
          }), o3.subscribers = i4.filter(function(t5) {
            return !t5.once;
          }), o3.subscribers.forEach(function(t5) {
            r3(t5, n5);
          });
        }, once: function(t4, e4) {
          var r4 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          n4(t4, { callback: e4, async: r4, once: true });
        }, unsubscribe: function(r4, n5) {
          if (r4) {
            var o3 = e3(r4);
            o3.subscribers = o3 && n5 ? o3.subscribers.filter(function(t4) {
              return t4.callback !== n5;
            }) : [];
          } else t3 = {};
        } };
      }(), En = r2(81), kn = r2.n(En), jn = r2(82), Pn = r2.n(jn), Dn = r2(83);
      function Tn(t3, e3, r3) {
        return e3 = ar()(e3), or()(t3, function() {
          try {
            var t4 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch (t5) {
          }
          return /* @__PURE__ */ function() {
            return !!t4;
          }();
        }() ? Reflect.construct(e3, r3 || [], ar()(t3).constructor) : e3.apply(t3, r3));
      }
      var In = function(t3) {
        function e3(t4, r3) {
          var n4;
          return v2()(this, e3), n4 = Tn(this, e3, [t4]), x2()(n4, "code", void 0), n4.code = r3, Object.setPrototypeOf(n4, e3.prototype), n4;
        }
        return cr()(e3, t3), y3()(e3, [{ key: "toJSON", value: function() {
          return { name: this.name, message: this.message, code: this.code };
        } }]);
      }(r2.n(Dn)()(Error)), zn = "This may mean that the user has declined camera access, or the browser does not support media APIs. If you are running in iOS, you must use Safari.";
      function Un() {
        try {
          return navigator.mediaDevices.enumerateDevices();
        } catch (e3) {
          var t3 = new In("enumerateDevices is not defined. ".concat(zn), -1);
          return Promise.reject(t3);
        }
      }
      function Nn(t3) {
        try {
          return navigator.mediaDevices.getUserMedia(t3);
        } catch (t4) {
          var e3 = new In("getUserMedia is not defined. ".concat(zn), -1);
          return Promise.reject(e3);
        }
      }
      var Wn, Fn = ["deviceId"];
      function Bn(t3, e3) {
        var r3 = Object.keys(t3);
        if (Object.getOwnPropertySymbols) {
          var n4 = Object.getOwnPropertySymbols(t3);
          e3 && (n4 = n4.filter(function(e4) {
            return Object.getOwnPropertyDescriptor(t3, e4).enumerable;
          })), r3.push.apply(r3, n4);
        }
        return r3;
      }
      function Ln(t3) {
        for (var e3 = 1; e3 < arguments.length; e3++) {
          var r3 = null != arguments[e3] ? arguments[e3] : {};
          e3 % 2 ? Bn(Object(r3), true).forEach(function(e4) {
            x2()(t3, e4, r3[e4]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r3)) : Bn(Object(r3)).forEach(function(e4) {
            Object.defineProperty(t3, e4, Object.getOwnPropertyDescriptor(r3, e4));
          });
        }
        return t3;
      }
      function Vn(t3, e3) {
        var r3 = "undefined" != typeof Symbol && t3[Symbol.iterator] || t3["@@iterator"];
        if (!r3) {
          if (Array.isArray(t3) || (r3 = function(t4, e4) {
            if (t4) {
              if ("string" == typeof t4) return qn(t4, e4);
              var r4 = {}.toString.call(t4).slice(8, -1);
              return "Object" === r4 && t4.constructor && (r4 = t4.constructor.name), "Map" === r4 || "Set" === r4 ? Array.from(t4) : "Arguments" === r4 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r4) ? qn(t4, e4) : void 0;
            }
          }(t3)) || e3) {
            r3 && (t3 = r3);
            var n4 = 0, o3 = function() {
            };
            return { s: o3, n: function() {
              return n4 >= t3.length ? { done: true } : { done: false, value: t3[n4++] };
            }, e: function(t4) {
              throw t4;
            }, f: o3 };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var i4, a3 = true, u3 = false;
        return { s: function() {
          r3 = r3.call(t3);
        }, n: function() {
          var t4 = r3.next();
          return a3 = t4.done, t4;
        }, e: function(t4) {
          u3 = true, i4 = t4;
        }, f: function() {
          try {
            a3 || null == r3.return || r3.return();
          } finally {
            if (u3) throw i4;
          }
        } };
      }
      function qn(t3, e3) {
        (null == e3 || e3 > t3.length) && (e3 = t3.length);
        for (var r3 = 0, n4 = Array(e3); r3 < e3; r3++) n4[r3] = t3[r3];
        return n4;
      }
      function Gn(t3) {
        return new Promise(function(e3, r3) {
          var n4 = 10;
          !function o3() {
            n4 > 0 ? t3.videoWidth > 10 && t3.videoHeight > 10 ? e3() : window.setTimeout(o3, 500) : r3(new In("Unable to play video stream. Is webcam working?", -1)), n4--;
          }();
        });
      }
      function Hn(t3, e3) {
        return Xn.apply(this, arguments);
      }
      function Xn() {
        return (Xn = Je()(er.a.mark(function t3(e3, r3) {
          var n4;
          return er.a.wrap(function(t4) {
            for (; ; ) switch (t4.prev = t4.next) {
              case 0:
                return t4.next = 1, Nn(r3);
              case 1:
                if (n4 = t4.sent, Wn = n4, !e3) {
                  t4.next = 2;
                  break;
                }
                return e3.setAttribute("autoplay", "true"), e3.setAttribute("muted", "true"), e3.setAttribute("playsinline", "true"), e3.srcObject = n4, e3.addEventListener("loadedmetadata", function() {
                  e3.play().catch(function(t5) {
                    console.warn("* Error while trying to play video stream:", t5);
                  });
                }), t4.abrupt("return", Gn(e3));
              case 2:
                return t4.abrupt("return", Promise.resolve());
              case 3:
              case "end":
                return t4.stop();
            }
          }, t3);
        }))).apply(this, arguments);
      }
      function Qn(t3) {
        var e3 = Pn()(t3, ["facing", "minAspectRatio", "maxAspectRatio"]);
        return void 0 !== t3.minAspectRatio && t3.minAspectRatio > 0 && (e3.aspectRatio = t3.minAspectRatio, console.log("WARNING: Constraint 'minAspectRatio' is deprecated; Use 'aspectRatio' instead")), void 0 !== t3.facing && (e3.facingMode = t3.facing, console.log("WARNING: Constraint 'facing' is deprecated. Use 'facingMode' instead'")), e3;
      }
      function $n() {
        var t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e3 = Qn(t3);
        return e3 && e3.deviceId && e3.facingMode && delete e3.facingMode, Promise.resolve({ audio: false, video: e3 });
      }
      function Yn() {
        return (Yn = Je()(er.a.mark(function t3(e3) {
          var r3, n4, o3, i4, a3, u3, c3, s3, f3, l3;
          return er.a.wrap(function(t4) {
            for (; ; ) switch (t4.prev = t4.next) {
              case 0:
                return t4.next = 1, Un();
              case 1:
                if (r3 = t4.sent, n4 = r3.filter(function(t5) {
                  return "videoinput" === t5.kind;
                }), e3) {
                  t4.next = 2;
                  break;
                }
                return t4.abrupt("return", n4);
              case 2:
                o3 = [], i4 = Qn(e3), i4.deviceId, a3 = kn()(i4, Fn), u3 = Vn(n4), t4.prev = 3, u3.s();
              case 4:
                if ((c3 = u3.n()).done) {
                  t4.next = 9;
                  break;
                }
                return s3 = c3.value, t4.prev = 5, f3 = { audio: false, video: Ln(Ln({}, a3), {}, { deviceId: { exact: s3.deviceId } }) }, t4.next = 6, Nn(f3);
              case 6:
                t4.sent.getTracks().forEach(function(t5) {
                  return t5.stop();
                }), o3.push(s3), t4.next = 8;
                break;
              case 7:
                t4.prev = 7, t4.catch(5);
              case 8:
                t4.next = 4;
                break;
              case 9:
                t4.next = 11;
                break;
              case 10:
                t4.prev = 10, l3 = t4.catch(3), u3.e(l3);
              case 11:
                return t4.prev = 11, u3.f(), t4.finish(11);
              case 12:
                return t4.abrupt("return", o3);
              case 13:
              case "end":
                return t4.stop();
            }
          }, t3, null, [[3, 10, 11, 12], [5, 7]]);
        }))).apply(this, arguments);
      }
      function Zn() {
        if (!Wn) return null;
        var t3 = Wn.getVideoTracks();
        return t3 && null != t3 && t3.length ? t3[0] : null;
      }
      var Kn = { requestedVideoElement: null, request: function(t3, e3) {
        return Je()(er.a.mark(function r3() {
          var n4;
          return er.a.wrap(function(r4) {
            for (; ; ) switch (r4.prev = r4.next) {
              case 0:
                return Kn.requestedVideoElement = t3, r4.next = 1, $n(e3);
              case 1:
                return n4 = r4.sent, r4.abrupt("return", Hn(t3, n4));
              case 2:
              case "end":
                return r4.stop();
            }
          }, r3);
        }))();
      }, release: function() {
        var t3 = Wn && Wn.getVideoTracks();
        return null !== Kn.requestedVideoElement && Kn.requestedVideoElement.pause(), new Promise(function(e3) {
          setTimeout(function() {
            t3 && t3.length && t3.forEach(function(t4) {
              return t4.stop();
            }), Wn = null, Kn.requestedVideoElement = null, e3();
          }, 0);
        });
      }, enumerateVideoDevices: function(t3) {
        return Yn.apply(this, arguments);
      }, getActiveStream: function() {
        var t3;
        return null !== (t3 = Wn) && void 0 !== t3 ? t3 : null;
      }, getActiveStreamLabel: function() {
        var t3 = Zn();
        return t3 ? t3.label : "";
      }, getActiveTrack: Zn, disableTorch: function() {
        return Je()(er.a.mark(function t3() {
          var e3, r3;
          return er.a.wrap(function(t4) {
            for (; ; ) switch (t4.prev = t4.next) {
              case 0:
                if (!(e3 = Zn())) {
                  t4.next = 4;
                  break;
                }
                return t4.prev = 1, t4.next = 2, e3.applyConstraints({ advanced: [{ torch: false }] });
              case 2:
                t4.next = 4;
                break;
              case 3:
                throw t4.prev = 3, (r3 = t4.catch(1)) instanceof OverconstrainedError && console.warn("quagga2/CameraAccess: Torch not supported on this device"), r3;
              case 4:
              case "end":
                return t4.stop();
            }
          }, t3, null, [[1, 3]]);
        }))();
      }, enableTorch: function() {
        return Je()(er.a.mark(function t3() {
          var e3, r3;
          return er.a.wrap(function(t4) {
            for (; ; ) switch (t4.prev = t4.next) {
              case 0:
                if (!(e3 = Zn())) {
                  t4.next = 4;
                  break;
                }
                return t4.prev = 1, t4.next = 2, e3.applyConstraints({ advanced: [{ torch: true }] });
              case 2:
                t4.next = 4;
                break;
              case 3:
                throw t4.prev = 3, (r3 = t4.catch(1)) instanceof OverconstrainedError && console.warn("quagga2/CameraAccess: Torch not supported on this device"), r3;
              case 4:
              case "end":
                return t4.stop();
            }
          }, t3, null, [[1, 3]]);
        }))();
      } }, Jn = Kn;
      var to = { create: function(t3) {
        var e3, r3 = document.createElement("canvas"), n4 = r3.getContext("2d", { willReadFrequently: !!t3.willReadFrequently }), o3 = [], i4 = null !== (e3 = t3.capacity) && void 0 !== e3 ? e3 : 20, a3 = true === t3.capture;
        function u3(e4) {
          return !!i4 && e4 && !function(t4, e5) {
            return e5 && e5.some(function(e6) {
              return Object.keys(e6).every(function(r4) {
                return e6[r4] === t4[r4];
              });
            });
          }(e4, t3.blacklist) && function(t4, e5) {
            return "function" != typeof e5 || e5(t4);
          }(e4, t3.filter);
        }
        return { addResult: function(t4, e4, c3) {
          var s3 = {};
          u3(c3) && (i4--, s3.codeResult = c3, a3 && (r3.width = e4.x, r3.height = e4.y, rr.drawImage(t4, e4, n4), s3.frame = r3.toDataURL()), o3.push(s3));
        }, getResults: function() {
          return o3;
        } };
      } }, eo = { inputStream: { type: "LiveStream", constraints: { width: 640, height: 480, facingMode: "environment" }, area: { top: "0%", right: "0%", left: "0%", bottom: "0%" }, singleChannel: false }, locate: true, canvas: { createOverlay: true }, decoder: { readers: ["code_128_reader"] }, locator: { halfSample: true, patchSize: "medium" } }, ro = Math.PI / 180;
      var no = {};
      no.create = function(t3, e3) {
        var r3, n4 = {}, o3 = t3.getConfig(), i4 = Be(t3.getRealWidth(), t3.getRealHeight()), a3 = t3.getCanvasSize(), u3 = Be(t3.getWidth(), t3.getHeight()), c3 = t3.getTopRight(), s3 = c3.x, f3 = c3.y, l3 = null, d3 = null, h3 = o3.willReadFrequently;
        function v3(t4, e4, r4, n5, o4) {
          var i5 = Math.floor(n5), a4 = Math.floor(o4), u4 = Math.min(i5 + 1, e4 - 1), c4 = Math.min(a4 + 1, r4 - 1), s4 = n5 - i5, f4 = o4 - a4;
          return (t4[a4 * e4 + i5] * (1 - s4) + t4[a4 * e4 + u4] * s4) * (1 - f4) + (t4[c4 * e4 + i5] * (1 - s4) + t4[c4 * e4 + u4] * s4) * f4;
        }
        return (r3 = e3 || document.createElement("canvas")).width = a3.x, r3.height = a3.y, l3 = r3.getContext("2d", { willReadFrequently: !!h3 }), d3 = new Uint8Array(u3.x * u3.y), n4.attachData = function(t4) {
          d3 = t4;
        }, n4.getData = function() {
          return d3;
        }, n4.grab = function() {
          var e4 = o3.halfSample, n5 = t3.getFrame(), c4 = n5, h4 = 0;
          if (c4) {
            if (function(t4, e5, r4) {
              t4.width !== e5.x && (t4.width = e5.x), t4.height !== e5.y && (t4.height = e5.y);
            }(r3, a3, o3.debug), "ImageStream" === o3.type && (c4 = n5.img, n5.tags && n5.tags.orientation)) switch (n5.tags.orientation) {
              case 6:
                h4 = 90 * ro;
                break;
              case 8:
                h4 = -90 * ro;
            }
            if (0 !== h4 ? (l3.translate(a3.x / 2, a3.y / 2), l3.rotate(h4), l3.drawImage(c4, -a3.y / 2, -a3.x / 2, a3.y, a3.x), l3.rotate(-h4), l3.translate(-a3.x / 2, -a3.y / 2)) : l3.drawImage(c4, 0, 0, a3.x, a3.y), e4) {
              !function(t4, e5, r4) {
                for (var n6, o4 = 0, i5 = e5.x, a4 = Math.floor(t4.length / 4), u4 = e5.x / 2, c5 = 0, s4 = e5.x; i5 < a4; ) {
                  for (n6 = 0; n6 < u4; n6++) r4[c5] = (0.299 * t4[4 * o4 + 0] + 0.587 * t4[4 * o4 + 1] + 0.114 * t4[4 * o4 + 2] + (0.299 * t4[4 * (o4 + 1) + 0] + 0.587 * t4[4 * (o4 + 1) + 1] + 0.114 * t4[4 * (o4 + 1) + 2]) + (0.299 * t4[4 * i5 + 0] + 0.587 * t4[4 * i5 + 1] + 0.114 * t4[4 * i5 + 2]) + (0.299 * t4[4 * (i5 + 1) + 0] + 0.587 * t4[4 * (i5 + 1) + 1] + 0.114 * t4[4 * (i5 + 1) + 2])) / 4, c5++, o4 += 2, i5 += 2;
                  o4 += s4, i5 += s4;
                }
              }(l3.getImageData(s3, f3, u3.x, u3.y).data, u3, d3);
            } else {
              var p3 = document.createElement("canvas");
              p3.width = i4.x, p3.height = i4.y;
              var y4 = p3.getContext("2d");
              0 !== h4 ? (y4.translate(i4.x / 2, i4.y / 2), y4.rotate(h4), y4.drawImage(c4, -i4.y / 2, -i4.x / 2, i4.y, i4.x)) : y4.drawImage(c4, 0, 0, i4.x, i4.y);
              var g3 = y4.getImageData(0, 0, i4.x, i4.y).data, x3 = new Uint8Array(i4.x * i4.y);
              qe(g3, x3, o3);
              for (var b3 = new Uint8Array(a3.x * a3.y), _3 = i4.x / a3.x, m3 = i4.y / a3.y, w2 = 0; w2 < a3.y; w2++) for (var O2 = 0; O2 < a3.x; O2++) {
                var M3 = O2 * _3, C3 = w2 * m3;
                b3[w2 * a3.x + O2] = 0 | v3(x3, i4.x, i4.y, M3, C3);
              }
              for (var R3 = 0; R3 < u3.y; R3++) for (var S3 = 0; S3 < u3.x; S3++) {
                var A3 = (R3 + f3) * a3.x + (S3 + s3);
                d3[R3 * u3.x + S3] = b3[A3];
              }
            }
            return true;
          }
          return false;
        }, n4.getSize = function() {
          return u3;
        }, n4;
      };
      var oo = no, io = { 274: "orientation" }, ao = Object.keys(io).map(function(t3) {
        return io[t3];
      });
      function uo(t3) {
        return new Promise(function(e3) {
          var r3 = new FileReader();
          r3.onload = function(t4) {
            return e3(t4.target.result);
          }, r3.readAsArrayBuffer(t3);
        });
      }
      function co(t3) {
        return new Promise(function(e3, r3) {
          var n4 = new XMLHttpRequest();
          n4.open("GET", t3, true), n4.responseType = "blob", n4.onreadystatechange = function() {
            n4.readyState !== XMLHttpRequest.DONE || 200 !== n4.status && 0 !== n4.status || e3(this.response);
          }, n4.onerror = r3, n4.send();
        });
      }
      function so(t3) {
        var e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ao, r3 = new DataView(t3), n4 = t3.byteLength, o3 = e3.reduce(function(t4, e4) {
          var r4 = Object.keys(io).filter(function(t5) {
            return io[t5] === e4;
          })[0];
          return r4 && (t4[r4] = e4), t4;
        }, {}), i4 = 2;
        if (255 !== r3.getUint8(0) || 216 !== r3.getUint8(1)) return false;
        for (; i4 < n4; ) {
          if (255 !== r3.getUint8(i4)) return false;
          if (225 === r3.getUint8(i4 + 1)) return fo(r3, i4 + 4, o3);
          i4 += 2 + r3.getUint16(i4 + 2);
        }
        return false;
      }
      function fo(t3, e3, r3) {
        if ("Exif" !== function(t4, e4, r4) {
          for (var n5 = "", o4 = e4; o4 < e4 + r4; o4++) n5 += String.fromCharCode(t4.getUint8(o4));
          return n5;
        }(t3, e3, 4)) return false;
        var n4, o3 = e3 + 6;
        if (18761 === t3.getUint16(o3)) n4 = false;
        else {
          if (19789 !== t3.getUint16(o3)) return false;
          n4 = true;
        }
        if (42 !== t3.getUint16(o3 + 2, !n4)) return false;
        var i4 = t3.getUint32(o3 + 4, !n4);
        return !(i4 < 8) && function(t4, e4, r4, n5, o4) {
          for (var i5 = t4.getUint16(r4, !o4), a3 = {}, u3 = 0; u3 < i5; u3++) {
            var c3 = r4 + 12 * u3 + 2, s3 = n5[t4.getUint16(c3, !o4)];
            s3 && (a3[s3] = lo(t4, c3, e4, r4, o4));
          }
          return a3;
        }(t3, o3, o3 + i4, r3, n4);
      }
      function lo(t3, e3, r3, n4, o3) {
        var i4 = t3.getUint16(e3 + 2, !o3), a3 = t3.getUint32(e3 + 4, !o3);
        switch (i4) {
          case 3:
            if (1 === a3) return t3.getUint16(e3 + 8, !o3);
        }
        return null;
      }
      function ho(t3, e3) {
        return "".concat(t3, "image-").concat(e3.toString().padStart(3, "0"), ".jpg");
      }
      var vo = {};
      function po(t3, e3) {
        t3.onload = function() {
          e3.loaded(this);
        }, t3.onerror = function() {
          e3.loaded(this);
        };
      }
      vo.load = function(t3, e3, r3, n4, o3, i4) {
        var a3, u3, c3, s3 = new Array(n4), f3 = new Array(s3.length);
        if (false === o3) s3[0] = t3;
        else for (a3 = 0; a3 < s3.length; a3++) c3 = r3 + a3, s3[a3] = ho(t3, c3);
        for (f3.notLoaded = [], f3.addImage = function(t4) {
          f3.notLoaded.push(t4);
        }, f3.loaded = function(r4) {
          for (var n5 = f3.notLoaded, i5 = 0; i5 < n5.length; i5++) if (n5[i5] === r4) {
            n5.splice(i5, 1);
            for (var a4 = 0; a4 < s3.length; a4++) {
              var u4 = encodeURI(s3[a4].substr(s3[a4].lastIndexOf("/")));
              if (-1 !== r4.src.lastIndexOf(u4)) {
                f3[a4] = { img: r4 };
                break;
              }
            }
            break;
          }
          0 === n5.length && (false === o3 ? function(t4) {
            var e4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ao;
            return /^blob:/i.test(t4) ? co(t4).then(uo).then(function(t5) {
              return so(t5, e4);
            }) : Promise.resolve(null);
          }(t3, ["orientation"]).then(function(t4) {
            f3[0].tags = t4, e3(f3);
          }).catch(function(t4) {
            console.log(t4), e3(f3);
          }) : e3(f3));
        }, a3 = 0; a3 < s3.length; a3++) u3 = new Image(), f3.addImage(u3), po(u3, f3), u3.src = s3[a3];
      };
      var yo = vo, go = { createVideoStream: function(t3) {
        console.warn("**** InputStreamBrowser createVideoStream");
        var e3, r3, n4 = null, o3 = ["canrecord", "ended"], i4 = {}, a3 = { x: 0, y: 0, type: "Point" }, u3 = { x: 0, y: 0, type: "XYSize" };
        var c3 = { getRealWidth: function() {
          return t3.videoWidth;
        }, getRealHeight: function() {
          return t3.videoHeight;
        }, getWidth: function() {
          return e3;
        }, getHeight: function() {
          return r3;
        }, setWidth: function(t4) {
          e3 = t4;
        }, setHeight: function(t4) {
          r3 = t4;
        }, setInputStream: function(t4) {
          n4 = t4, this.setAttribute("src", void 0 !== t4.src ? t4.src : "");
        }, ended: function() {
          return t3.ended;
        }, getConfig: function() {
          return n4;
        }, setAttribute: function(e4, r4) {
          t3 && t3.setAttribute(e4, r4);
        }, pause: function() {
          t3.pause();
        }, play: function() {
          t3.play();
        }, setCurrentTime: function(t4) {
          var e4;
          "LiveStream" !== (null === (e4 = n4) || void 0 === e4 ? void 0 : e4.type) && this.setAttribute("currentTime", t4.toString());
        }, addEventListener: function(e4, r4, n5) {
          -1 !== o3.indexOf(e4) ? (i4[e4] || (i4[e4] = []), i4[e4].push(r4)) : t3.addEventListener(e4, r4, n5);
        }, clearEventHandlers: function() {
          o3.forEach(function(e4) {
            var r4 = i4[e4];
            r4 && r4.length > 0 && r4.forEach(function(r5) {
              t3.removeEventListener(e4, r5);
            });
          });
        }, trigger: function(o4, a4) {
          var s3, f3, l3, d3, h3, v3 = i4[o4];
          if ("canrecord" === o4 && (d3 = t3.videoWidth, h3 = t3.videoHeight, e3 = null !== (f3 = n4) && void 0 !== f3 && f3.size ? d3 / h3 > 1 ? n4.size : Math.floor(d3 / h3 * n4.size) : d3, r3 = null !== (l3 = n4) && void 0 !== l3 && l3.size ? d3 / h3 > 1 ? Math.floor(h3 / d3 * n4.size) : n4.size : h3, u3.x = e3, u3.y = r3), v3 && v3.length > 0) for (s3 = 0; s3 < v3.length; s3++) v3[s3].apply(c3, a4);
        }, setTopRight: function(t4) {
          a3.x = t4.x, a3.y = t4.y;
        }, getTopRight: function() {
          return a3;
        }, setCanvasSize: function(t4) {
          u3.x = t4.x, u3.y = t4.y;
        }, getCanvasSize: function() {
          return u3;
        }, getFrame: function() {
          return t3;
        } };
        return c3;
      }, createLiveStream: function(t3) {
        console.warn("**** InputStreamBrowser createLiveStream"), t3 && t3.setAttribute("autoplay", "true");
        var e3 = go.createVideoStream(t3);
        return e3.ended = function() {
          return false;
        }, e3;
      }, createImageStream: function() {
        var t3, e3, r3 = null, n4 = 0, o3 = 0, i4 = 0, a3 = true, u3 = false, c3 = null, s3 = 0, f3 = null, l3 = false, d3 = ["canrecord", "ended"], h3 = {}, v3 = { x: 0, y: 0, type: "Point" }, p3 = { x: 0, y: 0, type: "XYSize" };
        function y4(t4, e4) {
          var r4, n5 = h3[t4];
          if (n5 && n5.length > 0) for (r4 = 0; r4 < n5.length; r4++) n5[r4].apply(g3, e4);
        }
        var g3 = { trigger: y4, getWidth: function() {
          return t3;
        }, getHeight: function() {
          return e3;
        }, setWidth: function(e4) {
          t3 = e4;
        }, setHeight: function(t4) {
          e3 = t4;
        }, getRealWidth: function() {
          return n4;
        }, getRealHeight: function() {
          return o3;
        }, setInputStream: function(a4) {
          var l4;
          r3 = a4, false === a4.sequence ? (f3 = a4.src, s3 = 1) : (f3 = a4.src, s3 = a4.length), u3 = false, yo.load(f3, function(a5) {
            var s4, f4;
            if (c3 = a5, a5[0].tags && a5[0].tags.orientation) switch (a5[0].tags.orientation) {
              case 6:
              case 8:
                n4 = a5[0].img.height, o3 = a5[0].img.width;
                break;
              default:
                n4 = a5[0].img.width, o3 = a5[0].img.height;
            }
            else n4 = a5[0].img.width, o3 = a5[0].img.height;
            t3 = null !== (s4 = r3) && void 0 !== s4 && s4.size ? n4 / o3 > 1 ? r3.size : Math.floor(n4 / o3 * r3.size) : n4, e3 = null !== (f4 = r3) && void 0 !== f4 && f4.size ? n4 / o3 > 1 ? Math.floor(o3 / n4 * r3.size) : r3.size : o3, p3.x = t3, p3.y = e3, u3 = true, i4 = 0, setTimeout(function() {
              y4("canrecord", []);
            }, 0);
          }, 1, s3, null === (l4 = r3) || void 0 === l4 ? void 0 : l4.sequence, r3);
        }, ended: function() {
          return l3;
        }, setAttribute: function() {
        }, getConfig: function() {
          return r3;
        }, pause: function() {
          a3 = true;
        }, play: function() {
          a3 = false;
        }, setCurrentTime: function(t4) {
          i4 = t4;
        }, addEventListener: function(t4, e4) {
          -1 !== d3.indexOf(t4) && (h3[t4] || (h3[t4] = []), h3[t4].push(e4));
        }, clearEventHandlers: function() {
          Object.keys(h3).forEach(function(t4) {
            return delete h3[t4];
          });
        }, setTopRight: function(t4) {
          v3.x = t4.x, v3.y = t4.y;
        }, getTopRight: function() {
          return v3;
        }, setCanvasSize: function(t4) {
          p3.x = t4.x, p3.y = t4.y;
        }, getCanvasSize: function() {
          return p3;
        }, getFrame: function() {
          var t4, e4;
          if (!u3) return null;
          a3 || (t4 = null === (e4 = c3) || void 0 === e4 ? void 0 : e4[i4], i4 < s3 - 1 ? i4++ : setTimeout(function() {
            l3 = true, y4("ended", []);
          }, 0));
          return t4;
        } };
        return g3;
      } }, xo = go, bo = { searchDirections: [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]], create: function(t3, e3) {
        var r3, n4 = t3.data, o3 = e3.data, i4 = this.searchDirections, a3 = t3.size.x;
        function u3(t4, e4, u4, c4) {
          var s3, f3, l3;
          for (s3 = 0; s3 < i4.length; s3++) {
            if (f3 = t4.cy + i4[t4.dir][0], l3 = t4.cx + i4[t4.dir][1], n4[r3 = f3 * a3 + l3] === e4 && (0 === o3[r3] || o3[r3] === u4)) return o3[r3] = u4, t4.cy = f3, t4.cx = l3, true;
            0 === o3[r3] && (o3[r3] = c4), t4.dir = (t4.dir + 1) % 8;
          }
          return false;
        }
        function c3(t4, e4, r4) {
          return { dir: r4, x: t4, y: e4, next: null, prev: null };
        }
        return { trace: function(t4, e4, r4, n5) {
          return u3(t4, e4, r4, n5);
        }, contourTracing: function(e4, r4, n5, o4, i5) {
          return function(e5, r5, n6, o5, i6) {
            var a4, s3, f3, l3 = null, d3 = { cx: r5, cy: e5, dir: 0 };
            if (u3(d3, o5, n6, i6)) {
              a4 = l3 = c3(r5, e5, d3.dir), f3 = d3.dir, (s3 = c3(d3.cx, d3.cy, 0)).prev = a4, a4.next = s3, s3.next = null, a4 = s3;
              var h3 = t3.size.x * t3.size.y, v3 = 0;
              do {
                d3.dir = (d3.dir + 6) % 8, u3(d3, o5, n6, i6), f3 !== d3.dir ? (a4.dir = d3.dir, (s3 = c3(d3.cx, d3.cy, 0)).prev = a4, a4.next = s3, s3.next = null, a4 = s3) : (a4.dir = f3, a4.x = d3.cx, a4.y = d3.cy), f3 = d3.dir;
              } while ((d3.cx !== r5 || d3.cy !== e5) && ++v3 < h3);
              l3.prev = a4.prev, a4.prev.next = l3;
            }
            return l3;
          }(e4, r4, n5, o4, i5);
        } };
      } }, _o = { createContour2D: function() {
        return { dir: null, index: null, firstVertex: null, insideContours: null, nextpeer: null, prevpeer: null };
      }, CONTOUR_DIR: { CW_DIR: 0, CCW_DIR: 1, UNKNOWN_DIR: 2 }, DIR: { OUTSIDE_EDGE: -32767, INSIDE_EDGE: -32766 }, create: function(t3, e3) {
        var r3 = t3.data, n4 = e3.data, o3 = t3.size.x, i4 = t3.size.y, a3 = bo.create(t3, e3);
        return { rasterize: function(t4) {
          var e4, u3, c3, s3, f3, l3, d3, h3, v3, p3, y4, g3, x3 = [], b3 = 0;
          for (g3 = 0; g3 < 400; g3++) x3[g3] = 0;
          for (x3[0] = r3[0], v3 = null, l3 = 1; l3 < i4 - 1; l3++) for (s3 = 0, u3 = x3[0], f3 = 1; f3 < o3 - 1; f3++) if (0 === n4[y4 = l3 * o3 + f3]) if ((e4 = r3[y4]) !== u3) {
            if (0 === s3) x3[c3 = b3 + 1] = e4, u3 = e4, null !== (d3 = a3.contourTracing(l3, f3, c3, e4, _o.DIR.OUTSIDE_EDGE)) && (b3++, s3 = c3, (h3 = _o.createContour2D()).dir = _o.CONTOUR_DIR.CW_DIR, h3.index = s3, h3.firstVertex = d3, h3.nextpeer = v3, h3.insideContours = null, null !== v3 && (v3.prevpeer = h3), v3 = h3);
            else if (null !== (d3 = a3.contourTracing(l3, f3, _o.DIR.INSIDE_EDGE, e4, s3))) {
              for ((h3 = _o.createContour2D()).firstVertex = d3, h3.insideContours = null, h3.dir = 0 === t4 ? _o.CONTOUR_DIR.CCW_DIR : _o.CONTOUR_DIR.CW_DIR, h3.index = t4, p3 = v3; null !== p3 && p3.index !== s3; ) p3 = p3.nextpeer;
              null !== p3 && (h3.nextpeer = p3.insideContours, null !== p3.insideContours && (p3.insideContours.prevpeer = h3), p3.insideContours = h3);
            }
          } else n4[y4] = s3;
          else n4[y4] === _o.DIR.OUTSIDE_EDGE || n4[y4] === _o.DIR.INSIDE_EDGE ? (s3 = 0, u3 = n4[y4] === _o.DIR.INSIDE_EDGE ? r3[y4] : x3[0]) : u3 = x3[s3 = n4[y4]];
          for (p3 = v3; null !== p3; ) p3.index = t4, p3 = p3.nextpeer;
          return { cc: v3, count: b3 };
        }, debug: { drawContour: function(t4, e4) {
          var r4, n5, o4, i5 = t4.getContext("2d"), a4 = e4;
          for (i5.strokeStyle = "red", i5.fillStyle = "red", i5.lineWidth = 1, r4 = null !== a4 ? a4.insideContours : null; null !== a4; ) {
            switch (null !== r4 ? (n5 = r4, r4 = r4.nextpeer) : (n5 = a4, r4 = null !== (a4 = a4.nextpeer) ? a4.insideContours : null), n5.dir) {
              case _o.CONTOUR_DIR.CW_DIR:
                i5.strokeStyle = "red";
                break;
              case _o.CONTOUR_DIR.CCW_DIR:
                i5.strokeStyle = "blue";
                break;
              case _o.CONTOUR_DIR.UNKNOWN_DIR:
                i5.strokeStyle = "green";
            }
            o4 = n5.firstVertex, i5.beginPath(), i5.moveTo(o4.x, o4.y);
            do {
              o4 = o4.next, i5.lineTo(o4.x, o4.y);
            } while (o4 !== n5.firstVertex);
            i5.stroke();
          }
        } } };
      } }, mo = _o;
      /* @preserve ASM END */
      var wo, Oo, Mo, Co, Ro, So, Ao, Eo, ko, jo, Po, Do, To = (
        /* @preserve ASM BEGIN */
        function(t3, e3, r3) {
          ;
          var n4 = new t3.Uint8Array(r3), o3 = e3.size | 0, i4 = t3.Math.imul;
          function a3(t4, e4) {
            t4 = t4 | 0;
            e4 = e4 | 0;
            var r4 = 0;
            var i5 = 0;
            var a4 = 0;
            var u4 = 0;
            var c4 = 0;
            var s4 = 0;
            var f4 = 0;
            var l4 = 0;
            for (r4 = 1; (r4 | 0) < (o3 - 1 | 0); r4 = r4 + 1 | 0) {
              l4 = l4 + o3 | 0;
              for (i5 = 1; (i5 | 0) < (o3 - 1 | 0); i5 = i5 + 1 | 0) {
                u4 = l4 - o3 | 0;
                c4 = l4 + o3 | 0;
                s4 = i5 - 1 | 0;
                f4 = i5 + 1 | 0;
                a4 = (n4[t4 + u4 + s4 | 0] | 0) + (n4[t4 + u4 + f4 | 0] | 0) + (n4[t4 + l4 + i5 | 0] | 0) + (n4[t4 + c4 + s4 | 0] | 0) + (n4[t4 + c4 + f4 | 0] | 0) | 0;
                if ((a4 | 0) == (5 | 0)) {
                  n4[e4 + l4 + i5 | 0] = 1;
                } else {
                  n4[e4 + l4 + i5 | 0] = 0;
                }
              }
            }
          }
          function u3(t4, e4, r4) {
            t4 = t4 | 0;
            e4 = e4 | 0;
            r4 = r4 | 0;
            var a4 = 0;
            a4 = i4(o3, o3) | 0;
            while ((a4 | 0) > 0) {
              a4 = a4 - 1 | 0;
              n4[r4 + a4 | 0] = (n4[t4 + a4 | 0] | 0) - (n4[e4 + a4 | 0] | 0) | 0;
            }
          }
          function c3(t4, e4, r4) {
            t4 = t4 | 0;
            e4 = e4 | 0;
            r4 = r4 | 0;
            var a4 = 0;
            a4 = i4(o3, o3) | 0;
            while ((a4 | 0) > 0) {
              a4 = a4 - 1 | 0;
              n4[r4 + a4 | 0] = n4[t4 + a4 | 0] | 0 | (n4[e4 + a4 | 0] | 0) | 0;
            }
          }
          function s3(t4) {
            t4 = t4 | 0;
            var e4 = 0;
            var r4 = 0;
            r4 = i4(o3, o3) | 0;
            while ((r4 | 0) > 0) {
              r4 = r4 - 1 | 0;
              e4 = (e4 | 0) + (n4[t4 + r4 | 0] | 0) | 0;
            }
            return e4 | 0;
          }
          function f3(t4, e4) {
            t4 = t4 | 0;
            e4 = e4 | 0;
            var r4 = 0;
            r4 = i4(o3, o3) | 0;
            while ((r4 | 0) > 0) {
              r4 = r4 - 1 | 0;
              n4[t4 + r4 | 0] = e4;
            }
          }
          function l3(t4, e4) {
            t4 = t4 | 0;
            e4 = e4 | 0;
            var r4 = 0;
            var i5 = 0;
            var a4 = 0;
            var u4 = 0;
            var c4 = 0;
            var s4 = 0;
            var f4 = 0;
            var l4 = 0;
            for (r4 = 1; (r4 | 0) < (o3 - 1 | 0); r4 = r4 + 1 | 0) {
              l4 = l4 + o3 | 0;
              for (i5 = 1; (i5 | 0) < (o3 - 1 | 0); i5 = i5 + 1 | 0) {
                u4 = l4 - o3 | 0;
                c4 = l4 + o3 | 0;
                s4 = i5 - 1 | 0;
                f4 = i5 + 1 | 0;
                a4 = (n4[t4 + u4 + s4 | 0] | 0) + (n4[t4 + u4 + f4 | 0] | 0) + (n4[t4 + l4 + i5 | 0] | 0) + (n4[t4 + c4 + s4 | 0] | 0) + (n4[t4 + c4 + f4 | 0] | 0) | 0;
                if ((a4 | 0) > (0 | 0)) {
                  n4[e4 + l4 + i5 | 0] = 1;
                } else {
                  n4[e4 + l4 + i5 | 0] = 0;
                }
              }
            }
          }
          function d3(t4, e4) {
            t4 = t4 | 0;
            e4 = e4 | 0;
            var r4 = 0;
            r4 = i4(o3, o3) | 0;
            while ((r4 | 0) > 0) {
              r4 = r4 - 1 | 0;
              n4[e4 + r4 | 0] = n4[t4 + r4 | 0] | 0;
            }
          }
          function h3(t4) {
            t4 = t4 | 0;
            var e4 = 0;
            var r4 = 0;
            for (e4 = 0; (e4 | 0) < (o3 - 1 | 0); e4 = e4 + 1 | 0) {
              n4[t4 + e4 | 0] = 0;
              n4[t4 + r4 | 0] = 0;
              r4 = r4 + o3 - 1 | 0;
              n4[t4 + r4 | 0] = 0;
              r4 = r4 + 1 | 0;
            }
            for (e4 = 0; (e4 | 0) < (o3 | 0); e4 = e4 + 1 | 0) {
              n4[t4 + r4 | 0] = 0;
              r4 = r4 + 1 | 0;
            }
          }
          function v3() {
            var t4 = 0;
            var e4 = 0;
            var r4 = 0;
            var n5 = 0;
            var v4 = 0;
            var p3 = 0;
            e4 = i4(o3, o3) | 0;
            r4 = e4 + e4 | 0;
            n5 = r4 + e4 | 0;
            f3(n5, 0);
            h3(t4);
            do {
              a3(t4, e4);
              l3(e4, r4);
              u3(t4, r4, r4);
              c3(n5, r4, n5);
              d3(e4, t4);
              v4 = s3(t4) | 0;
              p3 = (v4 | 0) == 0 | 0;
            } while (!p3);
          }
          return { skeletonize: v3 };
        }
      ), Io = { ctx: { binary: null }, dom: { binary: null } }, zo = { x: 0, y: 0 };
      function Uo(t3) {
        var e3, r3, i4, a3, u3, c3, s3, f3 = ko.size.x, l3 = ko.size.y, d3 = -ko.size.x, h3 = -ko.size.y;
        for (e3 = 0, r3 = 0; r3 < t3.length; r3++) e3 += (a3 = t3[r3]).rad;
        for ((e3 = (180 * (e3 /= t3.length) / Math.PI + 90) % 180 - 90) < 0 && (e3 += 180), e3 = (180 - e3) * Math.PI / 180, u3 = n3.copy(n3.create(), [Math.cos(e3), Math.sin(e3), -Math.sin(e3), Math.cos(e3)]), r3 = 0; r3 < t3.length; r3++) {
          for (a3 = t3[r3], i4 = 0; i4 < 4; i4++) o2.transformMat2(a3.box[i4], a3.box[i4], u3);
        }
        for (r3 = 0; r3 < t3.length; r3++) for (a3 = t3[r3], i4 = 0; i4 < 4; i4++) a3.box[i4][0] < f3 && (f3 = a3.box[i4][0]), a3.box[i4][0] > d3 && (d3 = a3.box[i4][0]), a3.box[i4][1] < l3 && (l3 = a3.box[i4][1]), a3.box[i4][1] > h3 && (h3 = a3.box[i4][1]);
        for (c3 = [[f3, l3], [d3, l3], [d3, h3], [f3, h3]], s3 = wo.halfSample ? 2 : 1, u3 = n3.invert(u3, u3), i4 = 0; i4 < 4; i4++) o2.transformMat2(c3[i4], c3[i4], u3);
        for (i4 = 0; i4 < 4; i4++) o2.scale(c3[i4], c3[i4], s3);
        return c3;
      }
      function No(t3) {
        var e3 = function(t4, e4, r4) {
          var n5, o4, i4, a3, u3 = 0, c3 = 0, s3 = [];
          for (n5 = 0; n5 < e4; n5++) s3[n5] = { score: 0, item: null };
          for (n5 = 0; n5 < t4.length; n5++) if ((o4 = r4.apply(this, [t4[n5]])) > c3) for ((i4 = s3[u3]).score = o4, i4.item = t4[n5], c3 = Number.MAX_VALUE, a3 = 0; a3 < e4; a3++) s3[a3].score < c3 && (c3 = s3[a3].score, u3 = a3);
          return s3;
        }(function(t4, e4, r4) {
          var n5, o4, i4, a3, u3 = [];
          function c3(t5) {
            var e5 = false;
            for (o4 = 0; o4 < u3.length; o4++) (i4 = u3[o4]).fits(t5) && (i4.add(t5), e5 = true);
            return e5;
          }
          for (r4 || (r4 = "rad"), n5 = 0; n5 < t4.length; n5++) c3(a3 = Fe(t4[n5], n5, r4)) || u3.push(We(a3, e4));
          return u3;
        }(t3, 0.9), 1, function(t4) {
          return t4.getPoints().length;
        }), r3 = [], n4 = [];
        if (1 === e3.length) {
          r3 = e3[0].item.getPoints();
          for (var o3 = 0; o3 < r3.length; o3++) n4.push(r3[o3].point);
        }
        return n4;
      }
      function Wo(t3, e3) {
        ko.subImageAsCopy(Co, Be(t3, e3)), Do.skeletonize();
      }
      function Fo(t3, e3, r3, n4) {
        var i4, a3, u3, c3, s3 = [], f3 = [], l3 = Math.ceil(jo.x / 3);
        if (t3.length >= 2) {
          for (i4 = 0; i4 < t3.length; i4++) t3[i4].m00 > l3 && s3.push(t3[i4]);
          if (s3.length >= 2) {
            for (u3 = No(s3), a3 = 0, i4 = 0; i4 < u3.length; i4++) {
              var d3, h3;
              a3 += null !== (d3 = null === (h3 = u3[i4]) || void 0 === h3 ? void 0 : h3.rad) && void 0 !== d3 ? d3 : 0;
            }
            u3.length > 1 && u3.length >= s3.length / 4 * 3 && u3.length > t3.length / 4 && (a3 /= u3.length, c3 = { index: e3[1] * zo.x + e3[0], pos: { x: r3, y: n4 }, box: [o2.clone([r3, n4]), o2.clone([r3 + Co.size.x, n4]), o2.clone([r3 + Co.size.x, n4 + Co.size.y]), o2.clone([r3, n4 + Co.size.y])], moments: u3, rad: a3, vec: o2.clone([Math.cos(a3), Math.sin(a3)]) }, f3.push(c3));
          }
        }
        return f3;
      }
      var Bo = function(t3, e3) {
        wo = e3, Po = t3, function() {
          Oo = wo.halfSample ? new Ze({ x: Po.size.x / 2 | 0, y: Po.size.y / 2 | 0 }) : Po, jo = Xe(wo.patchSize, Oo.size), zo.x = Oo.size.x / jo.x | 0, zo.y = Oo.size.y / jo.y | 0, ko = new Ze(Oo.size, void 0, Uint8Array, false), Ro = new Ze(jo, void 0, Array, true);
          var t4 = jo.x * jo.y * 4, e4 = Math.max(65536, Math.pow(2, Math.ceil(Math.log2(t4)))), r3 = new ArrayBuffer(e4);
          Co = new Ze(jo, new Uint8Array(r3, 0, jo.x * jo.y)), Mo = new Ze(jo, new Uint8Array(r3, jo.x * jo.y * 3, jo.x * jo.y), void 0, true), Do = To({ Math, Uint8Array }, { size: jo.x }, r3), Eo = new Ze({ x: Oo.size.x / Co.size.x | 0, y: Oo.size.y / Co.size.y | 0 }, void 0, Array, true), So = new Ze(Eo.size, void 0, void 0, true), Ao = new Ze(Eo.size, void 0, Int32Array, true);
        }(), function() {
          if (!wo.useWorker && "undefined" != typeof document) {
            Io.dom.binary = document.createElement("canvas"), Io.dom.binary.className = "binaryBuffer";
            var t4 = !!wo.willReadFrequently;
            Io.ctx.binary = Io.dom.binary.getContext("2d", { willReadFrequently: t4 }), Io.dom.binary.width = ko.size.x, Io.dom.binary.height = ko.size.y;
          }
        }();
      }, Lo = function() {
        wo.halfSample && function(t4, e4) {
          for (var r4 = t4.data, n4 = t4.size.x, o3 = e4.data, i4 = 0, a3 = n4, u3 = r4.length, c3 = n4 / 2, s3 = 0; a3 < u3; ) {
            for (var f3 = 0; f3 < c3; f3++) o3[s3] = Math.floor((r4[i4] + r4[i4 + 1] + r4[a3] + r4[a3 + 1]) / 4), s3++, i4 += 2, a3 += 2;
            i4 += n4, a3 += n4;
          }
        }(Po, Oo), Ve(Oo, ko), ko.zeroBorder();
        var t3 = function() {
          var t4, e4, r4, n4, o3, i4, a3 = [];
          for (t4 = 0; t4 < zo.x; t4++) for (e4 = 0; e4 < zo.y; e4++) Wo(r4 = Co.size.x * t4, n4 = Co.size.y * e4), Mo.zeroBorder(), ze(Ro.data, 0), i4 = mo.create(Mo, Ro).rasterize(0), o3 = Ro.moments(i4.count), a3 = a3.concat(Fo(o3, [t4, e4], r4, n4));
          return a3;
        }();
        if (t3.length < zo.x * zo.y * 0.05) return null;
        var e3 = function(t4) {
          var e4, r4, n4 = 0, i4 = 0;
          function a3() {
            var t5;
            for (t5 = 0; t5 < Ao.data.length; t5++) if (0 === Ao.data[t5] && 1 === So.data[t5]) return t5;
            return Ao.data.length;
          }
          function u3(t5) {
            var e5, r5, i5, a4, c3, s3 = t5 % Ao.size.x, f3 = t5 / Ao.size.x | 0;
            if (t5 < Ao.data.length) for (i5 = Eo.data[t5], Ao.data[t5] = n4, c3 = 0; c3 < bo.searchDirections.length; c3++) r5 = f3 + bo.searchDirections[c3][0], e5 = s3 + bo.searchDirections[c3][1], a4 = r5 * Ao.size.x + e5, 0 !== So.data[a4] ? 0 === Ao.data[a4] && Math.abs(o2.dot(Eo.data[a4].vec, i5.vec)) > 0.95 && u3(a4) : Ao.data[a4] = Number.MAX_VALUE;
          }
          for (ze(So.data, 0), ze(Ao.data, 0), ze(Eo.data, null), e4 = 0; e4 < t4.length; e4++) r4 = t4[e4], Eo.data[r4.index] = r4, So.data[r4.index] = 1;
          for (So.zeroBorder(); (i4 = a3()) < Ao.data.length; ) n4++, u3(i4);
          return n4;
        }(t3);
        if (e3 < 1) return null;
        var r3 = function(t4) {
          var e4, r4, n4 = [];
          for (e4 = 0; e4 < t4; e4++) n4.push(0);
          for (r4 = Ao.data.length; r4--; ) Ao.data[r4] > 0 && n4[Ao.data[r4] - 1]++;
          return (n4 = n4.map(function(t5, e5) {
            return { val: t5, label: e5 + 1 };
          })).sort(function(t5, e5) {
            return e5.val - t5.val;
          }), n4.filter(function(t5) {
            return t5.val >= 5;
          });
        }(e3);
        return 0 === r3.length ? null : function(t4, e4) {
          var r4, n4, o3, i4, a3 = [], u3 = [];
          for (r4 = 0; r4 < t4.length; r4++) {
            for (n4 = Ao.data.length, a3.length = 0; n4--; ) Ao.data[n4] === t4[r4].label && (o3 = Eo.data[n4], a3.push(o3));
            (i4 = Uo(a3)) && u3.push(i4);
          }
          return u3;
        }(r3);
      }, Vo = function(t3, e3) {
        var r3, n4, o3 = t3.getWidth(), i4 = t3.getHeight(), a3 = e3.halfSample ? 0.5 : 1;
        t3.getConfig().area && (n4 = $e(o3, i4, t3.getConfig().area), t3.setTopRight({ x: n4.sx, y: n4.sy }), t3.setCanvasSize({ x: o3, y: i4 }), o3 = n4.sw, i4 = n4.sh);
        var u3 = { x: Math.floor(o3 * a3), y: Math.floor(i4 * a3) };
        if (r3 = Xe(e3.patchSize, u3), t3.setWidth(Math.max(Math.floor(Math.floor(u3.x / r3.x) * (1 / a3) * r3.x), r3.x)), t3.setHeight(Math.max(Math.floor(Math.floor(u3.y / r3.y) * (1 / a3) * r3.y), r3.y)), t3.getWidth() % r3.x == 0 && t3.getHeight() % r3.y == 0) return true;
        throw new Error("Image dimensions do not comply with the current settings: Width (".concat(o3, " )and height (").concat(i4, ") must a multiple of ").concat(r3.x));
      }, qo = y3()(function t3() {
        v2()(this, t3), x2()(this, "config", void 0), x2()(this, "inputStream", void 0), x2()(this, "framegrabber", void 0), x2()(this, "inputImageWrapper", void 0), x2()(this, "stopped", false), x2()(this, "initAborted", false), x2()(this, "boxSize", void 0), x2()(this, "resultCollector", void 0), x2()(this, "decoder", void 0), x2()(this, "workerPool", []), x2()(this, "onUIThread", true), x2()(this, "canvasContainer", new Ho());
      }), Go = y3()(function t3() {
        v2()(this, t3), x2()(this, "image", void 0), x2()(this, "overlay", void 0);
      }), Ho = y3()(function t3() {
        v2()(this, t3), x2()(this, "ctx", void 0), x2()(this, "dom", void 0), this.ctx = new Go(), this.dom = new Go();
      });
      function Xo(t3) {
        if ("undefined" == typeof document) return null;
        if (t3 instanceof HTMLElement && t3.nodeName && 1 === t3.nodeType) return t3;
        var e3 = "string" == typeof t3 ? t3 : "#interactive.viewport";
        return document.querySelector(e3);
      }
      function Qo(t3, e3, r3) {
        var n4 = function(t4, e4) {
          var r4 = document.querySelector(t4);
          return r4 || ((r4 = document.createElement("canvas")).className = e4), r4;
        }(t3, e3);
        var o3 = n4.getContext("2d", { willReadFrequently: r3.willReadFrequently });
        return { canvas: n4, context: o3 };
      }
      function $o(t3) {
        var e3, r3, n4, o3, i4, a3, u3, c3, s3, f3, l3 = Xo(null == t3 || null === (e3 = t3.config) || void 0 === e3 || null === (r3 = e3.inputStream) || void 0 === r3 ? void 0 : r3.target), d3 = null == t3 || null === (n4 = t3.config) || void 0 === n4 || null === (o3 = n4.inputStream) || void 0 === o3 ? void 0 : o3.type;
        if (!d3) return null;
        var h3 = false !== (null == t3 || null === (i4 = t3.config) || void 0 === i4 || null === (a3 = i4.canvas) || void 0 === a3 ? void 0 : a3.createOverlay), v3 = function(t4, e4) {
          var r4 = e4.willReadFrequently, n5 = e4.createOverlay;
          if ("undefined" != typeof document) {
            var i5 = Qo("canvas.imgBuffer", "imgBuffer", { willReadFrequently: r4 });
            i5.canvas.width = t4.x, i5.canvas.height = t4.y;
            var a4 = { canvas: null, context: null };
            if (n5) {
              var u4 = Qo("canvas.drawingBuffer", "drawingBuffer", { willReadFrequently: r4 });
              u4.canvas.width = t4.x, u4.canvas.height = t4.y, a4 = u4;
            }
            return { dom: { image: i5.canvas, overlay: a4.canvas }, ctx: { image: i5.context, overlay: a4.context } };
          }
          return null;
        }(t3.inputStream.getCanvasSize(), { willReadFrequently: !(null == t3 || null === (u3 = t3.config) || void 0 === u3 || null === (c3 = u3.inputStream) || void 0 === c3 || !c3.willReadFrequently), createOverlay: h3, debug: null == t3 || null === (s3 = t3.config) || void 0 === s3 || null === (f3 = s3.locator) || void 0 === f3 ? void 0 : f3.debug });
        if (!v3) return { dom: { image: null, overlay: null }, ctx: { image: null, overlay: null } };
        var p3 = v3.dom;
        return "undefined" != typeof document && l3 && ("ImageStream" !== d3 || l3.contains(p3.image) || l3.appendChild(p3.image), p3.overlay && !l3.contains(p3.overlay) && l3.appendChild(p3.overlay)), v3;
      }
      function Yo(t3, e3) {
        var r3 = Object.keys(t3);
        if (Object.getOwnPropertySymbols) {
          var n4 = Object.getOwnPropertySymbols(t3);
          e3 && (n4 = n4.filter(function(e4) {
            return Object.getOwnPropertyDescriptor(t3, e4).enumerable;
          })), r3.push.apply(r3, n4);
        }
        return r3;
      }
      function Zo(t3) {
        for (var e3 = 1; e3 < arguments.length; e3++) {
          var r3 = null != arguments[e3] ? arguments[e3] : {};
          e3 % 2 ? Yo(Object(r3), true).forEach(function(e4) {
            x2()(t3, e4, r3[e4]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r3)) : Yo(Object(r3)).forEach(function(e4) {
            Object.defineProperty(t3, e4, Object.getOwnPropertyDescriptor(r3, e4));
          });
        }
        return t3;
      }
      var Ko = [];
      function Jo(t3) {
        return Zo(Zo({}, t3), {}, { inputStream: Zo(Zo({}, t3.inputStream), {}, { target: null }) });
      }
      function ti(t3) {
        if (t3) {
          var e3 = t3().default;
          if (!e3) return void self.postMessage({ event: "error", message: "Quagga could not be created" });
        }
        var r3;
        function n4(t4) {
          self.postMessage({ event: "processed", imageData: r3.data, result: t4 }, [r3.data.buffer]);
        }
        function o3() {
          self.postMessage({ event: "initialized", imageData: r3.data }, [r3.data.buffer]);
        }
        self.onmessage = function(t4) {
          if ("init" === t4.data.cmd) {
            var i4 = t4.data.config;
            i4.numOfWorkers = 0, r3 = new e3.ImageWrapper({ x: t4.data.size.x, y: t4.data.size.y }, new Uint8Array(t4.data.imageData)), e3.init(i4, o3, r3), e3.onProcessed(n4);
          } else "process" === t4.data.cmd ? (r3.data = new Uint8Array(t4.data.imageData), e3.start()) : "setReaders" === t4.data.cmd ? e3.setReaders(t4.data.readers) : "registerReader" === t4.data.cmd && e3.registerReader(t4.data.name, t4.data.reader);
        };
      }
      function ei(t3, e3, r3) {
        var n4, o3, i4 = ("undefined" != typeof __factorySource__ && (o3 = __factorySource__), n4 = new Blob(["(" + ti.toString() + ")(" + o3 + ");"], { type: "text/javascript" }), window.URL.createObjectURL(n4)), a3 = { worker: new Worker(i4), imageData: new Uint8Array(e3.getWidth() * e3.getHeight()), busy: true };
        a3.worker.onmessage = function(t4) {
          "initialized" === t4.data.event ? (URL.revokeObjectURL(i4), a3.busy = false, a3.imageData = new Uint8Array(t4.data.imageData), r3(a3)) : "processed" === t4.data.event ? (a3.imageData = new Uint8Array(t4.data.imageData), a3.busy = false, "undefined" != typeof publishResult && publishResult(t4.data.result, a3.imageData)) : t4.data.event;
        }, a3.worker.postMessage({ cmd: "init", size: { x: e3.getWidth(), y: e3.getHeight() }, imageData: a3.imageData, config: Jo(t3) }, [a3.imageData.buffer]);
      }
      function ri(t3, e3, r3, n4) {
        var o3 = t3 - Ko.length;
        if (0 === o3 && n4) n4();
        else if (o3 < 0) {
          Ko.slice(o3).forEach(function(t4) {
            t4.worker.terminate();
          }), Ko = Ko.slice(0, o3), n4 && n4();
        } else {
          var i4 = function(e4) {
            Ko.push(e4), Ko.length >= t3 && n4 && n4();
          };
          if (e3) for (var a3 = 0; a3 < o3; a3++) ei(e3, r3, i4);
        }
      }
      function ni(t3, e3, r3) {
        for (var n4 = t3.length; n4--; ) t3[n4][0] += e3, t3[n4][1] += r3;
      }
      function oi(t3, e3, r3) {
        t3[0].x += e3, t3[0].y += r3, t3[1].x += e3, t3[1].y += r3;
      }
      var ii = function() {
        return y3()(function t4() {
          var e4 = this;
          v2()(this, t4), x2()(this, "context", new qo()), x2()(this, "canRecord", function(t5) {
            var r3;
            e4.context.initAborted ? t5(new Error("Initialization was aborted")) : e4.context.config ? e4.context.inputStream ? (Vo(e4.context.inputStream, null === (r3 = e4.context.config) || void 0 === r3 ? void 0 : r3.locator), e4.initCanvas(), e4.context.framegrabber = oo.create(e4.context.inputStream, e4.context.canvasContainer.dom.image), void 0 === e4.context.config.numOfWorkers && (e4.context.config.numOfWorkers = 0), ri(e4.context.config.numOfWorkers, e4.context.config, e4.context.inputStream, function() {
              var r4;
              0 === (null === (r4 = e4.context.config) || void 0 === r4 ? void 0 : r4.numOfWorkers) && e4.initializeData(), e4.ready(t5);
            })) : t5(new Error("Input stream not initialized")) : t5(new Error("Configuration not initialized"));
          }), x2()(this, "update", function() {
            if (e4.context.onUIThread) {
              var t5, r3 = (o3 = e4.context.framegrabber, Ko.length ? !!(i4 = Ko.filter(function(t6) {
                return !t6.busy;
              })[0]) && (o3.attachData(i4.imageData), o3.grab() && (i4.busy = true, i4.worker.postMessage({ cmd: "process", imageData: i4.imageData }, [i4.imageData.buffer])), true) : null);
              if (!r3) e4.context.framegrabber.attachData(null === (t5 = e4.context.inputImageWrapper) || void 0 === t5 ? void 0 : t5.data), e4.context.framegrabber.grab() && (r3 || e4.locateAndDecode());
            } else {
              var n4;
              e4.context.framegrabber.attachData(null === (n4 = e4.context.inputImageWrapper) || void 0 === n4 ? void 0 : n4.data), e4.context.framegrabber.grab(), e4.locateAndDecode();
            }
            var o3, i4;
          }), x2()(this, "_cachedStyleValues", void 0), x2()(this, "_resolvedStyle", void 0);
        }, [{ key: "initBuffers", value: function(t4) {
          if (this.context.config) {
            var e4 = function(t5, e5, r4) {
              var n5 = e5 || new Ze({ x: t5.getWidth(), y: t5.getHeight(), type: "XYSize" }), i4 = [o2.clone([0, 0]), o2.clone([0, n5.size.y]), o2.clone([n5.size.x, n5.size.y]), o2.clone([n5.size.x, 0])];
              return Bo(n5, r4), { inputImageWrapper: n5, boxSize: i4 };
            }(this.context.inputStream, t4, this.context.config.locator), r3 = e4.inputImageWrapper, n4 = e4.boxSize;
            this.context.inputImageWrapper = r3, this.context.boxSize = n4;
          }
        } }, { key: "initializeData", value: function(t4) {
          this.context.config && (this.initBuffers(t4), this.context.decoder = Sn.create(this.context.config.decoder, this.context.inputImageWrapper));
        } }, { key: "getViewPort", value: function() {
          return this.context.config && this.context.config.inputStream ? Xo(this.context.config.inputStream.target) : null;
        } }, { key: "ready", value: function(t4) {
          this.context.inputStream.play(), t4();
        } }, { key: "initCanvas", value: function() {
          var t4 = $o(this.context);
          if (t4) {
            var e4 = t4.ctx, r3 = t4.dom;
            this.context.canvasContainer.dom.image = r3.image, this.context.canvasContainer.dom.overlay = r3.overlay, this.context.canvasContainer.ctx.image = e4.image, this.context.canvasContainer.ctx.overlay = e4.overlay;
          }
        } }, { key: "initInputStream", value: function(t4) {
          if (this.context.config && this.context.config.inputStream) {
            var e4 = this.context.config.inputStream, r3 = e4.type, n4 = e4.constraints, o3 = function() {
              var t5 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "LiveStream", e5 = arguments.length > 1 ? arguments[1] : void 0, r4 = arguments.length > 2 ? arguments[2] : void 0;
              switch (t5) {
                case "VideoStream":
                  var n5 = document.createElement("video");
                  return { video: n5, inputStream: r4.createVideoStream(n5) };
                case "ImageStream":
                  return { inputStream: r4.createImageStream() };
                case "LiveStream":
                  var o4 = null;
                  return e5 && ((o4 = e5.querySelector("video")) || (o4 = document.createElement("video"), e5.appendChild(o4))), { video: o4, inputStream: r4.createLiveStream(o4) };
                default:
                  return console.error("* setupInputStream invalid type ".concat(t5)), { video: null, inputStream: null };
              }
            }(r3, this.getViewPort(), xo), i4 = o3.video, a3 = o3.inputStream;
            "LiveStream" === r3 && i4 && Jn.request(i4, n4).then(function() {
              return a3.trigger("canrecord");
            }).catch(function(e5) {
              return t4(e5);
            }), a3 && (a3.setAttribute("preload", "auto"), a3.setInputStream(this.context.config.inputStream), a3.addEventListener("canrecord", this.canRecord.bind(void 0, t4))), this.context.inputStream = a3;
          }
        } }, { key: "getBoundingBoxes", value: function() {
          var t4;
          return null !== (t4 = this.context.config) && void 0 !== t4 && t4.locate ? Lo() : [[o2.clone(this.context.boxSize[0]), o2.clone(this.context.boxSize[1]), o2.clone(this.context.boxSize[2]), o2.clone(this.context.boxSize[3])]];
        } }, { key: "transformResult", value: function(t4) {
          var e4 = this, r3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /* @__PURE__ */ new Set(), n4 = this.context.inputStream.getTopRight(), o3 = n4.x, i4 = n4.y;
          if ((0 !== o3 || 0 !== i4) && (t4.barcodes && t4.barcodes.forEach(function(t5) {
            return e4.transformResult(t5, r3);
          }), t4.line && 2 === t4.line.length && oi(t4.line, o3, i4), t4.box && !r3.has(t4.box) && (ni(t4.box, o3, i4), r3.add(t4.box)), t4.boxes && t4.boxes.length > 0)) for (var a3 = 0; a3 < t4.boxes.length; a3++) r3.has(t4.boxes[a3]) || (ni(t4.boxes[a3], o3, i4), r3.add(t4.boxes[a3]));
        } }, { key: "addResult", value: function(t4, e4) {
          var r3 = this;
          e4 && this.context.resultCollector && (t4.barcodes ? t4.barcodes.filter(function(t5) {
            return t5.codeResult;
          }).forEach(function(t5) {
            return r3.addResult(t5, e4);
          }) : t4.codeResult && this.context.resultCollector.addResult(e4, this.context.inputStream.getCanvasSize(), t4.codeResult));
        } }, { key: "hasCodeResult", value: function(t4) {
          return !(!t4 || !(t4.barcodes ? t4.barcodes.some(function(t5) {
            return t5.codeResult;
          }) : t4.codeResult));
        } }, { key: "publishResult", value: function() {
          var t4, e4, r3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n4 = arguments.length > 1 ? arguments[1] : void 0, o3 = r3;
          r3 && this.context.onUIThread && (this.transformResult(r3), this.addResult(r3, n4), o3 = (null == r3 || null === (e4 = r3.barcodes) || void 0 === e4 ? void 0 : e4.length) > 0 ? r3.barcodes : r3);
          An.publish("processed", o3), this.hasCodeResult(r3) && An.publish("detected", o3);
          var i4 = this.context.config;
          i4 && false === i4.locate && null !== (t4 = i4.inputStream) && void 0 !== t4 && t4.area && this.drawScannerArea();
        } }, { key: "locateAndDecode", value: (e3 = Je()(er.a.mark(function t4() {
          var e4, r3, n4, o3, i4, a3;
          return er.a.wrap(function(t5) {
            for (; ; ) switch (t5.prev = t5.next) {
              case 0:
                if (!(e4 = this.getBoundingBoxes())) {
                  t5.next = 3;
                  break;
                }
                return t5.next = 1, this.context.decoder.decodeFromBoundingBoxes(e4);
              case 1:
                if (a3 = t5.sent) {
                  t5.next = 2;
                  break;
                }
                a3 = {};
              case 2:
                (n4 = a3).boxes = e4, this.publishResult(n4, null === (r3 = this.context.inputImageWrapper) || void 0 === r3 ? void 0 : r3.data), t5.next = 5;
                break;
              case 3:
                return t5.next = 4, this.context.decoder.decodeFromImage(this.context.inputImageWrapper);
              case 4:
                (o3 = t5.sent) ? this.publishResult(o3, null === (i4 = this.context.inputImageWrapper) || void 0 === i4 ? void 0 : i4.data) : this.publishResult();
              case 5:
              case "end":
                return t5.stop();
            }
          }, t4, this);
        })), function() {
          return e3.apply(this, arguments);
        }) }, { key: "startContinuousUpdate", value: function() {
          var t4, e4 = this, r3 = null, n4 = 1e3 / ((null === (t4 = this.context.config) || void 0 === t4 ? void 0 : t4.frequency) || 60);
          this.context.stopped = false;
          var o3 = this.context, i4 = function(t5) {
            r3 = r3 || t5, o3.stopped || (t5 >= r3 && (r3 += n4, e4.update()), window.requestAnimationFrame(i4));
          };
          i4(performance.now());
        } }, { key: "start", value: function() {
          var t4, e4;
          this.context.onUIThread && "LiveStream" === (null === (t4 = this.context.config) || void 0 === t4 || null === (e4 = t4.inputStream) || void 0 === e4 ? void 0 : e4.type) ? this.startContinuousUpdate() : this.update();
        } }, { key: "stop", value: (t3 = Je()(er.a.mark(function t4() {
          var e4, r3;
          return er.a.wrap(function(t5) {
            for (; ; ) switch (t5.prev = t5.next) {
              case 0:
                if (this.context.stopped = true, this.context.framegrabber || (this.context.initAborted = true), ri(0), null === (e4 = this.context.config) || void 0 === e4 || !e4.inputStream || "LiveStream" !== this.context.config.inputStream.type) {
                  t5.next = 2;
                  break;
                }
                return t5.next = 1, Jn.release();
              case 1:
                null === (r3 = this.context.inputStream) || void 0 === r3 || r3.clearEventHandlers();
              case 2:
              case "end":
                return t5.stop();
            }
          }, t4, this);
        })), function() {
          return t3.apply(this, arguments);
        }) }, { key: "setReaders", value: function(t4) {
          this.context.decoder && this.context.decoder.setReaders(t4), function(t5) {
            Ko.forEach(function(e4) {
              return e4.worker.postMessage({ cmd: "setReaders", readers: t5 });
            });
          }(t4);
        } }, { key: "registerReader", value: function(t4, e4) {
          Sn.registerReader(t4, e4), this.context.decoder && this.context.decoder.registerReader(t4, e4), function(t5, e5) {
            Ko.forEach(function(r3) {
              return r3.worker.postMessage({ cmd: "registerReader", name: t5, reader: e5 });
            });
          }(t4, e4);
        } }, { key: "drawScannerArea", value: function() {
          var t4, e4, r3, n4 = null === (t4 = this.context.config) || void 0 === t4 || null === (e4 = t4.inputStream) || void 0 === e4 ? void 0 : e4.area;
          if (n4) {
            var o3 = this.context.canvasContainer.ctx.overlay;
            if (o3) {
              if (false === (null === (r3 = this.context.config) || void 0 === r3 ? void 0 : r3.locate)) {
                if ((void 0 !== n4.borderColor && "" !== n4.borderColor || void 0 !== n4.borderWidth && n4.borderWidth > 0 || void 0 !== n4.backgroundColor && "" !== n4.backgroundColor) && this.context.boxSize) {
                  var i4 = this.context.inputStream.getTopRight(), a3 = i4.x, u3 = i4.y, c3 = this.context.boxSize, s3 = c3[0], f3 = c3[1], l3 = c3[3], d3 = s3[0] + a3, h3 = s3[1] + u3, v3 = l3[0] - s3[0], p3 = f3[1] - s3[1];
                  if (!this._cachedStyleValues || this._cachedStyleValues.borderColor !== n4.borderColor || this._cachedStyleValues.borderWidth !== n4.borderWidth || this._cachedStyleValues.backgroundColor !== n4.backgroundColor) {
                    var y4, g3;
                    this._cachedStyleValues = { borderColor: n4.borderColor, borderWidth: n4.borderWidth, backgroundColor: n4.backgroundColor };
                    var x3 = void 0 !== n4.borderColor || void 0 !== n4.borderWidth, b3 = null !== (y4 = n4.borderColor) && void 0 !== y4 ? y4 : "rgba(0, 255, 0, 0.5)", _3 = x3 ? null !== (g3 = n4.borderWidth) && void 0 !== g3 ? g3 : 2 : 0, m3 = n4.backgroundColor;
                    this._resolvedStyle = { color: b3, width: _3, bg: m3 };
                  }
                  var w2 = this._resolvedStyle;
                  w2.bg && (o3.fillStyle = w2.bg, o3.fillRect(d3, h3, v3, p3)), w2.width > 0 && (o3.strokeStyle = w2.color, o3.lineWidth = w2.width, o3.strokeRect(d3, h3, v3, p3));
                }
              }
            }
          }
        } }]);
        var t3, e3;
      }(), ai = new ii(), ui = ai.context, ci = { init: function(t3, e3, r3) {
        var n4, o3 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ai;
        return e3 || (n4 = new Promise(function(t4, r4) {
          e3 = function(e4) {
            e4 ? r4(e4) : t4();
          };
        })), o3.context.initAborted = false, o3.context.config = f2()({}, eo, t3), o3.context.config.numOfWorkers > 0 && (o3.context.config.numOfWorkers = 0), r3 ? (o3.context.onUIThread = false, o3.initializeData(r3), e3 && e3()) : o3.initInputStream(e3), n4;
      }, start: function(t3, e3) {
        var r3;
        if (t3) return e3 || (r3 = new Promise(function(t4, r4) {
          e3 = function(e4) {
            e4 ? r4(e4) : t4();
          };
        })), this.init(t3, function(t4) {
          if (t4) e3(t4);
          else try {
            ai.start(), e3();
          } catch (t5) {
            e3(t5);
          }
        }), r3;
        if (!ui.framegrabber) throw new Error("start() was called before init() completed. Call init() first, or call start(config) to combine init and start.");
        return ai.start();
      }, stop: function() {
        return ai.stop();
      }, pause: function() {
        ui.stopped = true;
      }, onDetected: function(t3) {
        t3 && ("function" == typeof t3 || "object" === c2()(t3) && t3.callback) ? An.subscribe("detected", t3) : console.trace("* warning: Quagga.onDetected called with invalid callback, ignoring");
      }, offDetected: function(t3) {
        An.unsubscribe("detected", t3);
      }, onProcessed: function(t3) {
        t3 && ("function" == typeof t3 || "object" === c2()(t3) && t3.callback) ? An.subscribe("processed", t3) : console.trace("* warning: Quagga.onProcessed called with invalid callback, ignoring");
      }, offProcessed: function(t3) {
        An.unsubscribe("processed", t3);
      }, setReaders: function(t3) {
        t3 ? ai.setReaders(t3) : console.trace("* warning: Quagga.setReaders called with no readers, ignoring");
      }, registerReader: function(t3, e3) {
        t3 ? e3 ? ai.registerReader(t3, e3) : console.trace("* warning: Quagga.registerReader called with no reader, ignoring") : console.trace("* warning: Quagga.registerReader called with no name, ignoring");
      }, registerResultCollector: function(t3) {
        t3 && "function" == typeof t3.addResult && (ui.resultCollector = t3);
      }, get canvas() {
        return ui.canvasContainer;
      }, drawScannerArea: function() {
        return ai.drawScannerArea();
      }, decodeSingle: function(t3, e3) {
        var r3 = this, n4 = new ii();
        return (t3 = f2()({ inputStream: { type: "ImageStream", sequence: false, size: 800, src: t3.src }, numOfWorkers: 1, locator: { halfSample: false } }, t3)).numOfWorkers > 0 && (t3.numOfWorkers = 0), t3.numOfWorkers > 0 && ("undefined" == typeof Blob || "undefined" == typeof Worker) && (console.warn("* no Worker and/or Blob support - forcing numOfWorkers to 0"), t3.numOfWorkers = 0), new Promise(function(o3, i4) {
          try {
            r3.init(t3, function() {
              ui.canvasContainer = n4.context.canvasContainer, An.once("processed", function(t4) {
                n4.stop(), e3 && e3.call(null, t4), o3(t4);
              }, true), n4.start();
            }, null, n4);
          } catch (t4) {
            i4(t4);
          }
        });
      }, get default() {
        return ci;
      }, Readers: a2, CameraAccess: Jn, ImageDebug: rr, ImageWrapper: Ze, ResultCollector: to };
      e2.default = ci;
    }]).default;
  });
})(quagga_min);
var quagga_minExports = quagga_min.exports;
const Quagga = /* @__PURE__ */ getDefaultExportFromCjs(quagga_minExports);
let active = false;
function startScanner(targetElement, onDetected) {
  if (active) {
    Quagga.stop();
    Quagga.offDetected();
    active = false;
  }
  targetElement.innerHTML = "";
  return new Promise((resolve) => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: targetElement,
          constraints: { facingMode: "environment" }
        },
        decoder: {
          readers: ["ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader", "code_128_reader"]
        },
        locate: true,
        frequency: 10
      },
      (err) => {
        if (err) {
          const message = err.message || "";
          if (message.includes("Permission") || message.includes("permission") || message.includes("NotAllowedError")) {
            resolve("permission_denied");
          } else {
            resolve("not_available");
          }
          return;
        }
        Quagga.offDetected();
        Quagga.onDetected((result) => {
          const codeResult = result && result.codeResult;
          if (!codeResult || !codeResult.code) return;
          const errors = (codeResult.decodedCodes || []).filter((d2) => typeof d2.error === "number").map((d2) => d2.error);
          if (errors.length > 0) {
            const avgError = errors.reduce((sum, e2) => sum + e2, 0) / errors.length;
            if (avgError >= 0.2) return;
          }
          onDetected(codeResult.code);
        });
        Quagga.start();
        active = true;
        resolve(null);
      }
    );
  });
}
function stopScanner() {
  if (active) {
    Quagga.stop();
    Quagga.offDetected();
    active = false;
  }
}
function isLiveScanAvailable() {
  return typeof navigator !== "undefined" && !!navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function";
}
class InventoryLocationCascade extends i$1 {
  constructor() {
    super();
    this.nodes = [];
    this.value = [null, null, null];
    this.allOptionLabel = null;
  }
  _placeholderFor(level) {
    if (this.allOptionLabel !== null && this.allOptionLabel !== void 0) {
      return this.allOptionLabel;
    }
    return level === 0 ? "— не выбрано —" : "— любая —";
  }
  _onChange(level, event) {
    const id = event.target.value || null;
    const next = [...this.value];
    next[level] = id;
    for (let l2 = level + 1; l2 < 3; l2++) next[l2] = null;
    this.value = next;
    this.dispatchEvent(new CustomEvent("value-changed", { detail: { value: next } }));
  }
  render() {
    const roomId = this.value[0] || null;
    const furnitureId = this.value[1] || null;
    const shelfId = this.value[2] || null;
    const rooms = childrenOf(this.nodes, 0, null);
    const furniture = roomId ? childrenOf(this.nodes, 1, roomId) : [];
    const shelves = furnitureId ? childrenOf(this.nodes, 2, furnitureId) : [];
    return b`
      <div class="cascade">
        <div>
          <label>${COMMON.room}</label>
          <select .value=${roomId || ""} @change=${(e2) => this._onChange(0, e2)}>
            <option value="">${this._placeholderFor(0)}</option>
            ${rooms.map((n3) => b`<option value=${n3.id}>${n3.name}</option>`)}
          </select>
        </div>
        <div>
          <label>${COMMON.furniture}</label>
          <select
            .value=${furnitureId || ""}
            @change=${(e2) => this._onChange(1, e2)}
            ?disabled=${!roomId || furniture.length === 0}
          >
            <option value="">${this._placeholderFor(1)}</option>
            ${furniture.map((n3) => b`<option value=${n3.id}>${n3.name}</option>`)}
          </select>
        </div>
        <div>
          <label>${COMMON.shelf}</label>
          <select
            .value=${shelfId || ""}
            @change=${(e2) => this._onChange(2, e2)}
            ?disabled=${!furnitureId || shelves.length === 0}
          >
            <option value="">${this._placeholderFor(2)}</option>
            ${shelves.map((n3) => b`<option value=${n3.id}>${n3.name}</option>`)}
          </select>
        </div>
      </div>
    `;
  }
}
__publicField(InventoryLocationCascade, "properties", {
  nodes: { type: Array },
  value: { type: Array },
  allOptionLabel: { type: String, attribute: "all-option-label" }
});
__publicField(InventoryLocationCascade, "styles", [
  sharedStyles,
  i$4`
      :host {
        display: block;
      }
      .cascade {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }
      select {
        width: 100%;
      }
    `
]);
if (!customElements.get("inventory-location-cascade")) {
  customElements.define("inventory-location-cascade", InventoryLocationCascade);
}
const STR = {
  cardTitleDefault: "Добавить предмет",
  name: "Название",
  namePlaceholder: "Например: Молоко",
  categoryPlaceholder: "Например: Продукты",
  expiryAlertDays: "Оповещать за (дней)",
  location: "Место хранения",
  locationNotSet: "не задано",
  inventoryLabel: "Инвентарь",
  inventoryPlaceholder: "— выберите инвентарь —",
  scanStart: "Сканировать камерой",
  scanStop: "Остановить сканирование",
  scanPermissionDenied: "Нет доступа к камере",
  scanNotAvailable: "Сканер недоступен на этом устройстве",
  addedPrefix: "Добавлено:",
  nameRequired: "Введите название предмета",
  quantityInvalid: "Количество не может быть отрицательным",
  inventoryRequired: "Выберите инвентарь",
  saving: "Сохранение…",
  noInventories: "Не найдено ни одного инвентаря"
};
function emptyForm() {
  return {
    name: "",
    inventory_id: "",
    quantity: "",
    unit: "",
    category: "",
    barcode: "",
    price: "",
    expiry_date: "",
    expiry_alert_days: "",
    description: ""
  };
}
class InventoryAddCard extends i$1 {
  constructor() {
    super();
    this._config = {};
    this._structure = [];
    this._inventories = [];
    this._categories = [];
    this._form = emptyForm();
    this._locationValue = [null, null, null];
    this._saving = false;
    this._error = null;
    this._success = null;
    this._scanning = false;
    this._scanError = null;
    this._unsubStructure = null;
    this._scannerTargetRef = e();
    this._nameInputRef = e();
  }
  setConfig(config) {
    this._config = config || {};
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
      const structure = await loadStructure(this._hass);
      this._structure = structure && structure.nodes || [];
    } catch (err) {
      this._structure = [];
    }
    try {
      this._unsubStructure = await subscribeStructure(this._hass, (structure) => {
        this._structure = structure && structure.nodes || [];
      });
    } catch (err) {
    }
    this._inventories = listInventories(this._hass);
    const defaultInventoryId = this._config.default_inventory_id;
    let inventoryId = "";
    if (defaultInventoryId && this._inventories.some((inv) => inv.inventory_id === defaultInventoryId)) {
      inventoryId = defaultInventoryId;
    } else if (this._inventories.length === 1) {
      inventoryId = this._inventories[0].inventory_id;
    }
    this._form = { ...this._form, inventory_id: inventoryId };
    if (this._config.default_location) {
      this._locationValue = matchLocationToNodes(this._structure, this._config.default_location, parsePath);
    }
    try {
      const items = await fetchAllItems(this._hass);
      const cats = /* @__PURE__ */ new Set();
      for (const item of items) {
        if (item.category) cats.add(item.category);
      }
      this._categories = Array.from(cats).sort((a2, b2) => a2.localeCompare(b2, "ru"));
    } catch (err) {
      this._categories = [];
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubStructure) {
      this._unsubStructure();
      this._unsubStructure = null;
    }
    if (this._scanning) {
      stopScanner();
      this._scanning = false;
    }
  }
  getCardSize() {
    return 6;
  }
  static getStubConfig() {
    return {};
  }
  _isFieldVisible(key) {
    const fields = this._config.fields;
    if (!Array.isArray(fields) || fields.length === 0) return true;
    return fields.includes(key);
  }
  _updateField(key, value) {
    this._form = { ...this._form, [key]: value };
  }
  _onLocationChange(e2) {
    this._locationValue = e2.detail.value;
  }
  _locationNames() {
    return this._locationValue.map((id) => {
      var _a2;
      return id ? ((_a2 = nodeById(this._structure, id)) == null ? void 0 : _a2.name) ?? "" : "";
    });
  }
  async _toggleScanner() {
    if (this._scanning) {
      stopScanner();
      this._scanning = false;
      return;
    }
    this._scanError = null;
    this._scanning = true;
    await this.updateComplete;
    const target = this._scannerTargetRef.value;
    if (!target) {
      this._scanning = false;
      return;
    }
    const result = await startScanner(target, (code) => {
      this._updateField("barcode", String(code));
      stopScanner();
      this._scanning = false;
    });
    if (result === "permission_denied") {
      this._scanError = STR.scanPermissionDenied;
      this._scanning = false;
    } else if (result === "not_available") {
      this._scanError = STR.scanNotAvailable;
      this._scanning = false;
    }
  }
  _focusNameField() {
    const input = this._nameInputRef.value;
    if (input) input.focus();
  }
  async _onSubmit(e2) {
    e2.preventDefault();
    this._error = null;
    this._success = null;
    const name = (this._form.name || "").trim();
    if (!name) {
      this._error = STR.nameRequired;
      return;
    }
    const inventoryId = this._form.inventory_id;
    if (!inventoryId) {
      this._error = STR.inventoryRequired;
      return;
    }
    let quantity;
    if (this._form.quantity !== "" && this._form.quantity != null) {
      quantity = Number(this._form.quantity);
      if (Number.isNaN(quantity) || quantity < 0) {
        this._error = STR.quantityInvalid;
        return;
      }
    }
    let price;
    if (this._form.price !== "" && this._form.price != null) {
      price = Number(this._form.price);
      if (Number.isNaN(price) || price < 0) {
        this._error = STR.quantityInvalid;
        return;
      }
    }
    let expiryAlertDays;
    if (this._form.expiry_alert_days !== "" && this._form.expiry_alert_days != null) {
      expiryAlertDays = Number(this._form.expiry_alert_days);
      if (Number.isNaN(expiryAlertDays) || expiryAlertDays < 0) {
        this._error = STR.quantityInvalid;
        return;
      }
    }
    const location = buildPath(this._locationNames());
    const data = {
      inventory_id: inventoryId,
      name,
      quantity,
      unit: this._form.unit || void 0,
      category: this._form.category || void 0,
      // barcode stays an opaque string end-to-end — never Number(...) it,
      // or leading zeros would be silently dropped.
      barcode: this._form.barcode || void 0,
      location: location || void 0,
      price,
      expiry_date: this._form.expiry_date || void 0,
      expiry_alert_days: expiryAlertDays,
      description: this._form.description || void 0
    };
    this._saving = true;
    try {
      await callAddItem(this._hass, data);
      this._success = `${STR.addedPrefix} ${name}`;
      if (data.category && !this._categories.includes(data.category)) {
        this._categories = [...this._categories, data.category].sort((a2, b2) => a2.localeCompare(b2, "ru"));
      }
      this._form = { ...emptyForm(), inventory_id: inventoryId };
      await this.updateComplete;
      this._focusNameField();
    } catch (err) {
      this._error = err && err.message || COMMON.errorGeneric;
    } finally {
      this._saving = false;
    }
  }
  _renderCategoryField() {
    if (!this._isFieldVisible("category")) return "";
    return b`
      <div>
        <label>${COMMON.category}</label>
        <input
          type="text"
          list="add-card-category-list"
          .value=${this._form.category}
          placeholder=${STR.categoryPlaceholder}
          @input=${(e2) => this._updateField("category", e2.target.value)}
        />
        <datalist id="add-card-category-list">
          ${this._categories.map((c2) => b`<option value=${c2}></option>`)}
        </datalist>
      </div>
    `;
  }
  _renderBarcodeField() {
    if (!this._isFieldVisible("barcode")) return "";
    const canScan = isLiveScanAvailable();
    return b`
      <div class="field-full">
        <label>${COMMON.barcode}</label>
        <div class="barcode-row">
          <div>
            <input
              type="text"
              .value=${this._form.barcode}
              @input=${(e2) => this._updateField("barcode", e2.target.value)}
            />
          </div>
          ${canScan ? b`
                <button type="button" class="btn" @click=${this._toggleScanner}>
                  ${this._scanning ? STR.scanStop : STR.scanStart}
                </button>
              ` : ""}
        </div>
        ${this._scanError ? b`<div class="error-text">${this._scanError}</div>` : ""}
        ${this._scanning ? b`<div class="scanner-target" ${n2(this._scannerTargetRef)}></div>` : ""}
      </div>
    `;
  }
  _renderLocationField() {
    if (!this._isFieldVisible("location")) return "";
    const preview = buildPath(this._locationNames());
    return b`
      <div class="field-full location-block">
        <label>${STR.location}</label>
        <inventory-location-cascade
          .nodes=${this._structure}
          .value=${this._locationValue}
          @value-changed=${this._onLocationChange}
        ></inventory-location-cascade>
        <div class="muted location-preview">
          ${STR.location}: ${preview || STR.locationNotSet}
        </div>
      </div>
    `;
  }
  render() {
    const title = this._config.title ?? STR.cardTitleDefault;
    return b`
      <ha-card>
        ${title ? b`<div class="card-header">${title}</div>` : ""}
        <form @submit=${this._onSubmit}>
          <div class="fields">
            <div class="field-full">
              <label>${STR.name} *</label>
              <input
                type="text"
                required
                ${n2(this._nameInputRef)}
                .value=${this._form.name}
                placeholder=${STR.namePlaceholder}
                @input=${(e2) => this._updateField("name", e2.target.value)}
              />
            </div>

            <div class="field-full">
              <label>${COMMON.inventory} *</label>
              <select
                required
                .value=${this._form.inventory_id}
                @change=${(e2) => this._updateField("inventory_id", e2.target.value)}
              >
                <option value="">${STR.inventoryPlaceholder}</option>
                ${this._inventories.map(
      (inv) => b`<option value=${inv.inventory_id}>${inv.name}</option>`
    )}
              </select>
              ${this._inventories.length === 0 ? b`<div class="muted">${STR.noInventories}</div>` : ""}
            </div>

            ${this._isFieldVisible("quantity") ? b`
                  <div>
                    <label>${COMMON.quantity}</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      .value=${this._form.quantity}
                      @input=${(e2) => this._updateField("quantity", e2.target.value)}
                    />
                  </div>
                ` : ""}
            ${this._isFieldVisible("unit") ? b`
                  <div>
                    <label>${COMMON.unit}</label>
                    <input
                      type="text"
                      .value=${this._form.unit}
                      @input=${(e2) => this._updateField("unit", e2.target.value)}
                    />
                  </div>
                ` : ""}
            ${this._renderCategoryField()}
            ${this._isFieldVisible("price") ? b`
                  <div>
                    <label>${COMMON.price}</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      .value=${this._form.price}
                      @input=${(e2) => this._updateField("price", e2.target.value)}
                    />
                  </div>
                ` : ""}
            ${this._isFieldVisible("expiry_date") ? b`
                  <div>
                    <label>${COMMON.expiryDate}</label>
                    <input
                      type="date"
                      .value=${this._form.expiry_date}
                      @input=${(e2) => this._updateField("expiry_date", e2.target.value)}
                    />
                  </div>
                ` : ""}
            ${this._isFieldVisible("expiry_alert_days") ? b`
                  <div>
                    <label>${STR.expiryAlertDays}</label>
                    <input
                      type="number"
                      min="0"
                      max="365"
                      step="1"
                      .value=${this._form.expiry_alert_days}
                      @input=${(e2) => this._updateField("expiry_alert_days", e2.target.value)}
                    />
                  </div>
                ` : ""}
            ${this._renderBarcodeField()}
            ${this._isFieldVisible("description") ? b`
                  <div class="field-full">
                    <label>${COMMON.description}</label>
                    <textarea
                      rows="2"
                      .value=${this._form.description}
                      @input=${(e2) => this._updateField("description", e2.target.value)}
                    ></textarea>
                  </div>
                ` : ""}
            ${this._renderLocationField()}
          </div>

          ${this._error ? b`<div class="error-text">${this._error}</div>` : ""}
          ${this._success ? b`<div class="success-text">${this._success}</div>` : ""}

          <div class="row actions">
            <button type="submit" class="btn btn-primary" ?disabled=${this._saving}>
              ${this._saving ? STR.saving : COMMON.add}
            </button>
          </div>
        </form>
      </ha-card>
    `;
  }
}
__publicField(InventoryAddCard, "properties", {
  _structure: { state: true },
  _inventories: { state: true },
  _categories: { state: true },
  _form: { state: true },
  _locationValue: { state: true },
  _saving: { state: true },
  _error: { state: true },
  _success: { state: true },
  _scanning: { state: true },
  _scanError: { state: true }
});
__publicField(InventoryAddCard, "styles", [
  sharedStyles,
  i$4`
      .fields {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 10px;
      }
      .field-full {
        grid-column: 1 / -1;
      }
      .location-block {
        margin-top: 4px;
      }
      .location-preview {
        margin-top: 4px;
      }
      .scanner-target {
        width: 100%;
        max-width: 320px;
        min-height: 160px;
        background: #000;
        border-radius: 6px;
        overflow: hidden;
        margin-top: 6px;
      }
      .scanner-target video,
      .scanner-target canvas {
        width: 100%;
        display: block;
      }
      .barcode-row {
        display: flex;
        gap: 8px;
        align-items: flex-end;
      }
      .barcode-row > div:first-child {
        flex: 1;
      }
      .success-text {
        color: var(--success-color, #4caf50);
        font-size: 0.9em;
      }
      .actions {
        margin-top: 14px;
      }
    `
]);
registerCard({
  tag: "inventory-add-card",
  elementClass: InventoryAddCard,
  cardConfig: {
    type: "inventory-add-card",
    name: "Inventory: Добавление товара",
    description: "Форма добавления предмета с каскадным выбором места (Комната → Мебель → Полка)",
    preview: true
  }
});
