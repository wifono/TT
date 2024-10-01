const da = (function () {
    const t = document.createElement('link').relList
    return t && t.supports && t.supports('modulepreload') ? 'modulepreload' : 'preload'
  })(),
  Vo = {},
  ha = '/',
  Hn = function (t, n) {
    return !n || n.length === 0
      ? t()
      : Promise.all(
          n.map((r) => {
            if (((r = `${ha}${r}`), r in Vo)) return
            Vo[r] = !0
            const o = r.endsWith('.css'),
              s = o ? '[rel="stylesheet"]' : ''
            if (document.querySelector(`link[href="${r}"]${s}`)) return
            const i = document.createElement('link')
            if (
              ((i.rel = o ? 'stylesheet' : da),
              o || ((i.as = 'script'), (i.crossOrigin = '')),
              (i.href = r),
              document.head.appendChild(i),
              o)
            )
              return new Promise((a, l) => {
                i.addEventListener('load', a),
                  i.addEventListener('error', () => l(new Error(`Unable to preload CSS for ${r}`)))
              })
          })
        ).then(() => t())
  }
/**
 * @vue/shared v3.4.31
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function fo(e, t) {
  const n = new Set(e.split(','))
  return t ? (r) => n.has(r.toLowerCase()) : (r) => n.has(r)
}
const ue = {},
  Dt = [],
  ke = () => {},
  pa = () => !1,
  or = (e) =>
    e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  ho = (e) => e.startsWith('onUpdate:'),
  he = Object.assign,
  po = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  ga = Object.prototype.hasOwnProperty,
  ee = (e, t) => ga.call(e, t),
  U = Array.isArray,
  an = (e) => sr(e) === '[object Map]',
  ma = (e) => sr(e) === '[object Set]',
  Q = (e) => typeof e == 'function',
  pe = (e) => typeof e == 'string',
  Qt = (e) => typeof e == 'symbol',
  de = (e) => e !== null && typeof e == 'object',
  bi = (e) => (de(e) || Q(e)) && Q(e.then) && Q(e.catch),
  va = Object.prototype.toString,
  sr = (e) => va.call(e),
  _a = (e) => sr(e).slice(8, -1),
  ya = (e) => sr(e) === '[object Object]',
  go = (e) => pe(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  cn = fo(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  ir = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  ba = /-(\w)/g,
  Ge = ir((e) => e.replace(ba, (t, n) => (n ? n.toUpperCase() : ''))),
  wa = /\B([A-Z])/g,
  Yt = ir((e) => e.replace(wa, '-$1').toLowerCase()),
  lr = ir((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  yr = ir((e) => (e ? `on${lr(e)}` : '')),
  gt = (e, t) => !Object.is(e, t),
  br = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t)
  },
  wi = (e, t, n, r = !1) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, writable: r, value: n })
  },
  xa = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  },
  Ea = (e) => {
    const t = pe(e) ? Number(e) : NaN
    return isNaN(t) ? e : t
  }
let Ko
const xi = () =>
  Ko ||
  (Ko =
    typeof globalThis != 'undefined'
      ? globalThis
      : typeof self != 'undefined'
        ? self
        : typeof window != 'undefined'
          ? window
          : typeof global != 'undefined'
            ? global
            : {})
function mo(e) {
  if (U(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        o = pe(r) ? Ra(r) : mo(r)
      if (o) for (const s in o) t[s] = o[s]
    }
    return t
  } else if (pe(e) || de(e)) return e
}
const Ca = /;(?![^(]*\))/g,
  Sa = /:([^]+)/,
  Pa = /\/\*[^]*?\*\//g
function Ra(e) {
  const t = {}
  return (
    e
      .replace(Pa, '')
      .split(Ca)
      .forEach((n) => {
        if (n) {
          const r = n.split(Sa)
          r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
      }),
    t
  )
}
function vo(e) {
  let t = ''
  if (pe(e)) t = e
  else if (U(e))
    for (let n = 0; n < e.length; n++) {
      const r = vo(e[n])
      r && (t += r + ' ')
    }
  else if (de(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const Ta = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  La = fo(Ta)
function Ei(e) {
  return !!e || e === ''
}
/**
 * @vue/reactivity v3.4.31
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Ne
class Ci {
  constructor(t = !1) {
    ;(this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ne),
      !t && Ne && (this.index = (Ne.scopes || (Ne.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(t) {
    if (this._active) {
      const n = Ne
      try {
        return (Ne = this), t()
      } finally {
        Ne = n
      }
    }
  }
  on() {
    Ne = this
  }
  off() {
    Ne = this.parent
  }
  stop(t) {
    if (this._active) {
      let n, r
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop()
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]()
      if (this.scopes) for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0)
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop()
        o && o !== this && ((this.parent.scopes[this.index] = o), (o.index = this.index))
      }
      ;(this.parent = void 0), (this._active = !1)
    }
  }
}
function ka(e) {
  return new Ci(e)
}
function Aa(e, t = Ne) {
  t && t.active && t.effects.push(e)
}
function Oa() {
  return Ne
}
let Tt
class _o {
  constructor(t, n, r, o) {
    ;(this.fn = t),
      (this.trigger = n),
      (this.scheduler = r),
      (this.active = !0),
      (this.deps = []),
      (this._dirtyLevel = 4),
      (this._trackId = 0),
      (this._runnings = 0),
      (this._shouldSchedule = !1),
      (this._depsLength = 0),
      Aa(this, o)
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      ;(this._dirtyLevel = 1), vt()
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t]
        if (n.computed && ($a(n.computed), this._dirtyLevel >= 4)) break
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), _t()
    }
    return this._dirtyLevel >= 4
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0
  }
  run() {
    if (((this._dirtyLevel = 0), !this.active)) return this.fn()
    let t = ht,
      n = Tt
    try {
      return (ht = !0), (Tt = this), this._runnings++, Uo(this), this.fn()
    } finally {
      Wo(this), this._runnings--, (Tt = n), (ht = t)
    }
  }
  stop() {
    this.active && (Uo(this), Wo(this), this.onStop && this.onStop(), (this.active = !1))
  }
}
function $a(e) {
  return e.value
}
function Uo(e) {
  e._trackId++, (e._depsLength = 0)
}
function Wo(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++) Si(e.deps[t], e)
    e.deps.length = e._depsLength
  }
}
function Si(e, t) {
  const n = e.get(t)
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup())
}
let ht = !0,
  Hr = 0
const Pi = []
function vt() {
  Pi.push(ht), (ht = !1)
}
function _t() {
  const e = Pi.pop()
  ht = e === void 0 ? !0 : e
}
function yo() {
  Hr++
}
function bo() {
  for (Hr--; !Hr && Dr.length; ) Dr.shift()()
}
function Ri(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId)
    const r = e.deps[e._depsLength]
    r !== t ? (r && Si(r, e), (e.deps[e._depsLength++] = t)) : e._depsLength++
  }
}
const Dr = []
function Ti(e, t, n) {
  yo()
  for (const r of e.keys()) {
    let o
    r._dirtyLevel < t &&
      (o != null ? o : (o = e.get(r) === r._trackId)) &&
      (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0), (r._dirtyLevel = t)),
      r._shouldSchedule &&
        (o != null ? o : (o = e.get(r) === r._trackId)) &&
        (r.trigger(),
        (!r._runnings || r.allowRecurse) &&
          r._dirtyLevel !== 2 &&
          ((r._shouldSchedule = !1), r.scheduler && Dr.push(r.scheduler)))
  }
  bo()
}
const Li = (e, t) => {
    const n = new Map()
    return (n.cleanup = e), (n.computed = t), n
  },
  zr = new WeakMap(),
  Lt = Symbol(''),
  Vr = Symbol('')
function Re(e, t, n) {
  if (ht && Tt) {
    let r = zr.get(e)
    r || zr.set(e, (r = new Map()))
    let o = r.get(n)
    o || r.set(n, (o = Li(() => r.delete(n)))), Ri(Tt, o)
  }
}
function Ze(e, t, n, r, o, s) {
  const i = zr.get(e)
  if (!i) return
  let a = []
  if (t === 'clear') a = [...i.values()]
  else if (n === 'length' && U(e)) {
    const l = Number(r)
    i.forEach((c, u) => {
      ;(u === 'length' || (!Qt(u) && u >= l)) && a.push(c)
    })
  } else
    switch ((n !== void 0 && a.push(i.get(n)), t)) {
      case 'add':
        U(e) ? go(n) && a.push(i.get('length')) : (a.push(i.get(Lt)), an(e) && a.push(i.get(Vr)))
        break
      case 'delete':
        U(e) || (a.push(i.get(Lt)), an(e) && a.push(i.get(Vr)))
        break
      case 'set':
        an(e) && a.push(i.get(Lt))
        break
    }
  yo()
  for (const l of a) l && Ti(l, 4)
  bo()
}
const Ma = fo('__proto__,__v_isRef,__isVue'),
  ki = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(Qt)
  ),
  Go = Ia()
function Ia() {
  const e = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...n) {
        const r = ne(this)
        for (let s = 0, i = this.length; s < i; s++) Re(r, 'get', s + '')
        const o = r[t](...n)
        return o === -1 || o === !1 ? r[t](...n.map(ne)) : o
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...n) {
        vt(), yo()
        const r = ne(this)[t].apply(this, n)
        return bo(), _t(), r
      }
    }),
    e
  )
}
function qa(e) {
  Qt(e) || (e = String(e))
  const t = ne(this)
  return Re(t, 'has', e), t.hasOwnProperty(e)
}
class Ai {
  constructor(t = !1, n = !1) {
    ;(this._isReadonly = t), (this._isShallow = n)
  }
  get(t, n, r) {
    const o = this._isReadonly,
      s = this._isShallow
    if (n === '__v_isReactive') return !o
    if (n === '__v_isReadonly') return o
    if (n === '__v_isShallow') return s
    if (n === '__v_raw')
      return r === (o ? (s ? Qa : Ii) : s ? Mi : $i).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(r)
        ? t
        : void 0
    const i = U(t)
    if (!o) {
      if (i && ee(Go, n)) return Reflect.get(Go, n, r)
      if (n === 'hasOwnProperty') return qa
    }
    const a = Reflect.get(t, n, r)
    return (Qt(n) ? ki.has(n) : Ma(n)) || (o || Re(t, 'get', n), s)
      ? a
      : Te(a)
        ? i && go(n)
          ? a
          : a.value
        : de(a)
          ? o
            ? Ni(a)
            : Xt(a)
          : a
  }
}
class Oi extends Ai {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, n, r, o) {
    let s = t[n]
    if (!this._isShallow) {
      const l = vn(s)
      if ((!Yn(r) && !vn(r) && ((s = ne(s)), (r = ne(r))), !U(t) && Te(s) && !Te(r)))
        return l ? !1 : ((s.value = r), !0)
    }
    const i = U(t) && go(n) ? Number(n) < t.length : ee(t, n),
      a = Reflect.set(t, n, r, o)
    return t === ne(o) && (i ? gt(r, s) && Ze(t, 'set', n, r) : Ze(t, 'add', n, r)), a
  }
  deleteProperty(t, n) {
    const r = ee(t, n)
    t[n]
    const o = Reflect.deleteProperty(t, n)
    return o && r && Ze(t, 'delete', n, void 0), o
  }
  has(t, n) {
    const r = Reflect.has(t, n)
    return (!Qt(n) || !ki.has(n)) && Re(t, 'has', n), r
  }
  ownKeys(t) {
    return Re(t, 'iterate', U(t) ? 'length' : Lt), Reflect.ownKeys(t)
  }
}
class Na extends Ai {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, n) {
    return !0
  }
  deleteProperty(t, n) {
    return !0
  }
}
const ja = new Oi(),
  Fa = new Na(),
  Ba = new Oi(!0)
const wo = (e) => e,
  ar = (e) => Reflect.getPrototypeOf(e)
function An(e, t, n = !1, r = !1) {
  e = e.__v_raw
  const o = ne(e),
    s = ne(t)
  n || (gt(t, s) && Re(o, 'get', t), Re(o, 'get', s))
  const { has: i } = ar(o),
    a = r ? wo : n ? Co : _n
  if (i.call(o, t)) return a(e.get(t))
  if (i.call(o, s)) return a(e.get(s))
  e !== o && e.get(t)
}
function On(e, t = !1) {
  const n = this.__v_raw,
    r = ne(n),
    o = ne(e)
  return t || (gt(e, o) && Re(r, 'has', e), Re(r, 'has', o)), e === o ? n.has(e) : n.has(e) || n.has(o)
}
function $n(e, t = !1) {
  return (e = e.__v_raw), !t && Re(ne(e), 'iterate', Lt), Reflect.get(e, 'size', e)
}
function Qo(e) {
  e = ne(e)
  const t = ne(this)
  return ar(t).has.call(t, e) || (t.add(e), Ze(t, 'add', e, e)), this
}
function Yo(e, t) {
  t = ne(t)
  const n = ne(this),
    { has: r, get: o } = ar(n)
  let s = r.call(n, e)
  s || ((e = ne(e)), (s = r.call(n, e)))
  const i = o.call(n, e)
  return n.set(e, t), s ? gt(t, i) && Ze(n, 'set', e, t) : Ze(n, 'add', e, t), this
}
function Xo(e) {
  const t = ne(this),
    { has: n, get: r } = ar(t)
  let o = n.call(t, e)
  o || ((e = ne(e)), (o = n.call(t, e))), r && r.call(t, e)
  const s = t.delete(e)
  return o && Ze(t, 'delete', e, void 0), s
}
function Jo() {
  const e = ne(this),
    t = e.size !== 0,
    n = e.clear()
  return t && Ze(e, 'clear', void 0, void 0), n
}
function Mn(e, t) {
  return function (r, o) {
    const s = this,
      i = s.__v_raw,
      a = ne(i),
      l = t ? wo : e ? Co : _n
    return !e && Re(a, 'iterate', Lt), i.forEach((c, u) => r.call(o, l(c), l(u), s))
  }
}
function In(e, t, n) {
  return function (...r) {
    const o = this.__v_raw,
      s = ne(o),
      i = an(s),
      a = e === 'entries' || (e === Symbol.iterator && i),
      l = e === 'keys' && i,
      c = o[e](...r),
      u = n ? wo : t ? Co : _n
    return (
      !t && Re(s, 'iterate', l ? Vr : Lt),
      {
        next() {
          const { value: h, done: d } = c.next()
          return d ? { value: h, done: d } : { value: a ? [u(h[0]), u(h[1])] : u(h), done: d }
        },
        [Symbol.iterator]() {
          return this
        }
      }
    )
  }
}
function rt(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this
  }
}
function Ha() {
  const e = {
      get(s) {
        return An(this, s)
      },
      get size() {
        return $n(this)
      },
      has: On,
      add: Qo,
      set: Yo,
      delete: Xo,
      clear: Jo,
      forEach: Mn(!1, !1)
    },
    t = {
      get(s) {
        return An(this, s, !1, !0)
      },
      get size() {
        return $n(this)
      },
      has: On,
      add: Qo,
      set: Yo,
      delete: Xo,
      clear: Jo,
      forEach: Mn(!1, !0)
    },
    n = {
      get(s) {
        return An(this, s, !0)
      },
      get size() {
        return $n(this, !0)
      },
      has(s) {
        return On.call(this, s, !0)
      },
      add: rt('add'),
      set: rt('set'),
      delete: rt('delete'),
      clear: rt('clear'),
      forEach: Mn(!0, !1)
    },
    r = {
      get(s) {
        return An(this, s, !0, !0)
      },
      get size() {
        return $n(this, !0)
      },
      has(s) {
        return On.call(this, s, !0)
      },
      add: rt('add'),
      set: rt('set'),
      delete: rt('delete'),
      clear: rt('clear'),
      forEach: Mn(!0, !0)
    }
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((s) => {
      ;(e[s] = In(s, !1, !1)), (n[s] = In(s, !0, !1)), (t[s] = In(s, !1, !0)), (r[s] = In(s, !0, !0))
    }),
    [e, n, t, r]
  )
}
const [Da, za, Va, Ka] = Ha()
function xo(e, t) {
  const n = t ? (e ? Ka : Va) : e ? za : Da
  return (r, o, s) =>
    o === '__v_isReactive'
      ? !e
      : o === '__v_isReadonly'
        ? e
        : o === '__v_raw'
          ? r
          : Reflect.get(ee(n, o) && o in r ? n : r, o, s)
}
const Ua = { get: xo(!1, !1) },
  Wa = { get: xo(!1, !0) },
  Ga = { get: xo(!0, !1) }
const $i = new WeakMap(),
  Mi = new WeakMap(),
  Ii = new WeakMap(),
  Qa = new WeakMap()
function Ya(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
    default:
      return 0
  }
}
function Xa(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ya(_a(e))
}
function Xt(e) {
  return vn(e) ? e : Eo(e, !1, ja, Ua, $i)
}
function qi(e) {
  return Eo(e, !1, Ba, Wa, Mi)
}
function Ni(e) {
  return Eo(e, !0, Fa, Ga, Ii)
}
function Eo(e, t, n, r, o) {
  if (!de(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const s = o.get(e)
  if (s) return s
  const i = Xa(e)
  if (i === 0) return e
  const a = new Proxy(e, i === 2 ? r : n)
  return o.set(e, a), a
}
function un(e) {
  return vn(e) ? un(e.__v_raw) : !!(e && e.__v_isReactive)
}
function vn(e) {
  return !!(e && e.__v_isReadonly)
}
function Yn(e) {
  return !!(e && e.__v_isShallow)
}
function ji(e) {
  return e ? !!e.__v_raw : !1
}
function ne(e) {
  const t = e && e.__v_raw
  return t ? ne(t) : e
}
function Jt(e) {
  return Object.isExtensible(e) && wi(e, '__v_skip', !0), e
}
const _n = (e) => (de(e) ? Xt(e) : e),
  Co = (e) => (de(e) ? Ni(e) : e)
class Fi {
  constructor(t, n, r, o) {
    ;(this.getter = t),
      (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this.effect = new _o(
        () => t(this._value),
        () => Dn(this, this.effect._dirtyLevel === 2 ? 2 : 3)
      )),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = r)
  }
  get value() {
    const t = ne(this)
    return (
      (!t._cacheable || t.effect.dirty) && gt(t._value, (t._value = t.effect.run())) && Dn(t, 4),
      Bi(t),
      t.effect._dirtyLevel >= 2 && Dn(t, 2),
      t._value
    )
  }
  set value(t) {
    this._setter(t)
  }
  get _dirty() {
    return this.effect.dirty
  }
  set _dirty(t) {
    this.effect.dirty = t
  }
}
function Ja(e, t, n = !1) {
  let r, o
  const s = Q(e)
  return s ? ((r = e), (o = ke)) : ((r = e.get), (o = e.set)), new Fi(r, o, s || !o, n)
}
function Bi(e) {
  var t
  ht &&
    Tt &&
    ((e = ne(e)),
    Ri(Tt, (t = e.dep) != null ? t : (e.dep = Li(() => (e.dep = void 0), e instanceof Fi ? e : void 0))))
}
function Dn(e, t = 4, n, r) {
  e = ne(e)
  const o = e.dep
  o && Ti(o, t)
}
function Te(e) {
  return !!(e && e.__v_isRef === !0)
}
function Vt(e) {
  return Hi(e, !1)
}
function Za(e) {
  return Hi(e, !0)
}
function Hi(e, t) {
  return Te(e) ? e : new ec(e, t)
}
class ec {
  constructor(t, n) {
    ;(this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : ne(t)),
      (this._value = n ? t : _n(t))
  }
  get value() {
    return Bi(this), this._value
  }
  set value(t) {
    const n = this.__v_isShallow || Yn(t) || vn(t)
    ;(t = n ? t : ne(t)),
      gt(t, this._rawValue) &&
        (this._rawValue, (this._rawValue = t), (this._value = n ? t : _n(t)), Dn(this, 4))
  }
}
function kt(e) {
  return Te(e) ? e.value : e
}
const tc = {
  get: (e, t, n) => kt(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t]
    return Te(o) && !Te(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, r)
  }
}
function Di(e) {
  return un(e) ? e : new Proxy(e, tc)
}
/**
 * @vue/runtime-core v3.4.31
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function pt(e, t, n, r) {
  try {
    return r ? e(...r) : e()
  } catch (o) {
    cr(o, t, n)
  }
}
function Me(e, t, n, r) {
  if (Q(e)) {
    const o = pt(e, t, n, r)
    return (
      o &&
        bi(o) &&
        o.catch((s) => {
          cr(s, t, n)
        }),
      o
    )
  }
  if (U(e)) {
    const o = []
    for (let s = 0; s < e.length; s++) o.push(Me(e[s], t, n, r))
    return o
  }
}
function cr(e, t, n, r = !0) {
  const o = t ? t.vnode : null
  if (t) {
    let s = t.parent
    const i = t.proxy,
      a = `https://vuejs.org/error-reference/#runtime-${n}`
    for (; s; ) {
      const c = s.ec
      if (c) {
        for (let u = 0; u < c.length; u++) if (c[u](e, i, a) === !1) return
      }
      s = s.parent
    }
    const l = t.appContext.config.errorHandler
    if (l) {
      vt(), pt(l, null, 10, [e, i, a]), _t()
      return
    }
  }
  nc(e, n, o, r)
}
function nc(e, t, n, r = !0) {
  console.error(e)
}
let yn = !1,
  Kr = !1
const be = []
let We = 0
const zt = []
let lt = null,
  St = 0
const zi = Promise.resolve()
let So = null
function Vi(e) {
  const t = So || zi
  return e ? t.then(this ? e.bind(this) : e) : t
}
function rc(e) {
  let t = We + 1,
    n = be.length
  for (; t < n; ) {
    const r = (t + n) >>> 1,
      o = be[r],
      s = bn(o)
    s < e || (s === e && o.pre) ? (t = r + 1) : (n = r)
  }
  return t
}
function Po(e) {
  ;(!be.length || !be.includes(e, yn && e.allowRecurse ? We + 1 : We)) &&
    (e.id == null ? be.push(e) : be.splice(rc(e.id), 0, e), Ki())
}
function Ki() {
  !yn && !Kr && ((Kr = !0), (So = zi.then(Wi)))
}
function oc(e) {
  const t = be.indexOf(e)
  t > We && be.splice(t, 1)
}
function sc(e) {
  U(e) ? zt.push(...e) : (!lt || !lt.includes(e, e.allowRecurse ? St + 1 : St)) && zt.push(e), Ki()
}
function Zo(e, t, n = yn ? We + 1 : 0) {
  for (; n < be.length; n++) {
    const r = be[n]
    if (r && r.pre) {
      if (e && r.id !== e.uid) continue
      be.splice(n, 1), n--, r()
    }
  }
}
function Ui(e) {
  if (zt.length) {
    const t = [...new Set(zt)].sort((n, r) => bn(n) - bn(r))
    if (((zt.length = 0), lt)) {
      lt.push(...t)
      return
    }
    for (lt = t, St = 0; St < lt.length; St++) {
      const n = lt[St]
      n.active !== !1 && n()
    }
    ;(lt = null), (St = 0)
  }
}
const bn = (e) => (e.id == null ? 1 / 0 : e.id),
  ic = (e, t) => {
    const n = bn(e) - bn(t)
    if (n === 0) {
      if (e.pre && !t.pre) return -1
      if (t.pre && !e.pre) return 1
    }
    return n
  }
function Wi(e) {
  ;(Kr = !1), (yn = !0), be.sort(ic)
  const t = ke
  try {
    for (We = 0; We < be.length; We++) {
      const n = be[We]
      n && n.active !== !1 && pt(n, null, 14)
    }
  } finally {
    ;(We = 0), (be.length = 0), Ui(), (yn = !1), (So = null), (be.length || zt.length) && Wi()
  }
}
function lc(e, t, ...n) {
  if (e.isUnmounted) return
  const r = e.vnode.props || ue
  let o = n
  const s = t.startsWith('update:'),
    i = s && t.slice(7)
  if (i && i in r) {
    const u = `${i === 'modelValue' ? 'model' : i}Modifiers`,
      { number: h, trim: d } = r[u] || ue
    d && (o = n.map((g) => (pe(g) ? g.trim() : g))), h && (o = n.map(xa))
  }
  let a,
    l = r[(a = yr(t))] || r[(a = yr(Ge(t)))]
  !l && s && (l = r[(a = yr(Yt(t)))]), l && Me(l, e, 6, o)
  const c = r[a + 'Once']
  if (c) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[a]) return
    ;(e.emitted[a] = !0), Me(c, e, 6, o)
  }
}
function Gi(e, t, n = !1) {
  const r = t.emitsCache,
    o = r.get(e)
  if (o !== void 0) return o
  const s = e.emits
  let i = {},
    a = !1
  if (!Q(e)) {
    const l = (c) => {
      const u = Gi(c, t, !0)
      u && ((a = !0), he(i, u))
    }
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l)
  }
  return !s && !a
    ? (de(e) && r.set(e, null), null)
    : (U(s) ? s.forEach((l) => (i[l] = null)) : he(i, s), de(e) && r.set(e, i), i)
}
function ur(e, t) {
  return !e || !or(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, Yt(t)) || ee(e, t))
}
let Pe = null,
  Qi = null
function Xn(e) {
  const t = Pe
  return (Pe = e), (Qi = (e && e.type.__scopeId) || null), t
}
function ac(e, t = Pe, n) {
  if (!t || e._n) return e
  const r = (...o) => {
    r._d && ps(-1)
    const s = Xn(t)
    let i
    try {
      i = e(...o)
    } finally {
      Xn(s), r._d && ps(1)
    }
    return i
  }
  return (r._n = !0), (r._c = !0), (r._d = !0), r
}
function wr(e) {
  const {
      type: t,
      vnode: n,
      proxy: r,
      withProxy: o,
      propsOptions: [s],
      slots: i,
      attrs: a,
      emit: l,
      render: c,
      renderCache: u,
      props: h,
      data: d,
      setupState: g,
      ctx: b,
      inheritAttrs: E
    } = e,
    P = Xn(e)
  let I, q
  try {
    if (n.shapeFlag & 4) {
      const V = o || r,
        j = V
      ;(I = Ue(c.call(j, V, u, h, g, d, b))), (q = a)
    } else {
      const V = t
      ;(I = Ue(V.length > 1 ? V(h, { attrs: a, slots: i, emit: l }) : V(h, null))), (q = t.props ? a : cc(a))
    }
  } catch (V) {
    ;(pn.length = 0), cr(V, e, 1), (I = Ae(Be))
  }
  let k = I
  if (q && E !== !1) {
    const V = Object.keys(q),
      { shapeFlag: j } = k
    V.length && j & 7 && (s && V.some(ho) && (q = uc(q, s)), (k = mt(k, q, !1, !0)))
  }
  return (
    n.dirs && ((k = mt(k, null, !1, !0)), (k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (k.transition = n.transition),
    (I = k),
    Xn(P),
    I
  )
}
const cc = (e) => {
    let t
    for (const n in e) (n === 'class' || n === 'style' || or(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  uc = (e, t) => {
    const n = {}
    for (const r in e) (!ho(r) || !(r.slice(9) in t)) && (n[r] = e[r])
    return n
  }
function fc(e, t, n) {
  const { props: r, children: o, component: s } = e,
    { props: i, children: a, patchFlag: l } = t,
    c = s.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && l >= 0) {
    if (l & 1024) return !0
    if (l & 16) return r ? es(r, i, c) : !!i
    if (l & 8) {
      const u = t.dynamicProps
      for (let h = 0; h < u.length; h++) {
        const d = u[h]
        if (i[d] !== r[d] && !ur(c, d)) return !0
      }
    }
  } else return (o || a) && (!a || !a.$stable) ? !0 : r === i ? !1 : r ? (i ? es(r, i, c) : !0) : !!i
  return !1
}
function es(e, t, n) {
  const r = Object.keys(t)
  if (r.length !== Object.keys(e).length) return !0
  for (let o = 0; o < r.length; o++) {
    const s = r[o]
    if (t[s] !== e[s] && !ur(n, s)) return !0
  }
  return !1
}
function dc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree
    if ((r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e))
      ((e = t.vnode).el = n), (t = t.parent)
    else break
  }
}
const Yi = 'components'
function hc(e, t) {
  return gc(Yi, e, !0, t) || e
}
const pc = Symbol.for('v-ndc')
function gc(e, t, n = !0, r = !1) {
  const o = Pe || ve
  if (o) {
    const s = o.type
    if (e === Yi) {
      const a = du(s, !1)
      if (a && (a === t || a === Ge(t) || a === lr(Ge(t)))) return s
    }
    const i = ts(o[e] || s[e], t) || ts(o.appContext[e], t)
    return !i && r ? s : i
  }
}
function ts(e, t) {
  return e && (e[t] || e[Ge(t)] || e[lr(Ge(t))])
}
const mc = (e) => e.__isSuspense
function vc(e, t) {
  t && t.pendingBranch ? (U(e) ? t.effects.push(...e) : t.effects.push(e)) : sc(e)
}
function fr(e, t, n = ve, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...i) => {
          vt()
          const a = Rn(n),
            l = Me(t, n, e, i)
          return a(), _t(), l
        })
    return r ? o.unshift(s) : o.push(s), s
  }
}
const tt =
    (e) =>
    (t, n = ve) => {
      ;(!pr || e === 'sp') && fr(e, (...r) => t(...r), n)
    },
  _c = tt('bm'),
  Ro = tt('m'),
  yc = tt('bu'),
  Xi = tt('u'),
  To = tt('bum'),
  Ji = tt('um'),
  bc = tt('sp'),
  wc = tt('rtg'),
  xc = tt('rtc')
function Ec(e, t = ve) {
  fr('ec', e, t)
}
function Zi(e, t) {
  if (Pe === null) return e
  const n = gr(Pe),
    r = e.dirs || (e.dirs = [])
  for (let o = 0; o < t.length; o++) {
    let [s, i, a, l = ue] = t[o]
    s &&
      (Q(s) && (s = { mounted: s, updated: s }),
      s.deep && dt(i),
      r.push({ dir: s, instance: n, value: i, oldValue: void 0, arg: a, modifiers: l }))
  }
  return e
}
function yt(e, t, n, r) {
  const o = e.dirs,
    s = t && t.dirs
  for (let i = 0; i < o.length; i++) {
    const a = o[i]
    s && (a.oldValue = s[i].value)
    let l = a.dir[r]
    l && (vt(), Me(l, n, 8, [e.el, a, e, t]), _t())
  }
}
/*! #__NO_SIDE_EFFECTS__ */ function Lo(e, t) {
  return Q(e) ? (() => he({ name: e.name }, t, { setup: e }))() : e
}
const zn = (e) => !!e.type.__asyncLoader,
  Ur = (e) => (e ? (xl(e) ? gr(e) : Ur(e.parent)) : null),
  fn = he(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ur(e.parent),
    $root: (e) => Ur(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ko(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        ;(e.effect.dirty = !0), Po(e.update)
      }),
    $nextTick: (e) => e.n || (e.n = Vi.bind(e.proxy)),
    $watch: (e) => zc.bind(e)
  }),
  xr = (e, t) => e !== ue && !e.__isScriptSetup && ee(e, t),
  Cc = {
    get({ _: e }, t) {
      if (t === '__v_skip') return !0
      const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: a, appContext: l } = e
      let c
      if (t[0] !== '$') {
        const g = i[t]
        if (g !== void 0)
          switch (g) {
            case 1:
              return r[t]
            case 2:
              return o[t]
            case 4:
              return n[t]
            case 3:
              return s[t]
          }
        else {
          if (xr(r, t)) return (i[t] = 1), r[t]
          if (o !== ue && ee(o, t)) return (i[t] = 2), o[t]
          if ((c = e.propsOptions[0]) && ee(c, t)) return (i[t] = 3), s[t]
          if (n !== ue && ee(n, t)) return (i[t] = 4), n[t]
          Wr && (i[t] = 0)
        }
      }
      const u = fn[t]
      let h, d
      if (u) return t === '$attrs' && Re(e.attrs, 'get', ''), u(e)
      if ((h = a.__cssModules) && (h = h[t])) return h
      if (n !== ue && ee(n, t)) return (i[t] = 4), n[t]
      if (((d = l.config.globalProperties), ee(d, t))) return d[t]
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: o, ctx: s } = e
      return xr(o, t)
        ? ((o[t] = n), !0)
        : r !== ue && ee(r, t)
          ? ((r[t] = n), !0)
          : ee(e.props, t) || (t[0] === '$' && t.slice(1) in e)
            ? !1
            : ((s[t] = n), !0)
    },
    has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: s } }, i) {
      let a
      return (
        !!n[i] ||
        (e !== ue && ee(e, i)) ||
        xr(t, i) ||
        ((a = s[0]) && ee(a, i)) ||
        ee(r, i) ||
        ee(fn, i) ||
        ee(o.config.globalProperties, i)
      )
    },
    defineProperty(e, t, n) {
      return (
        n.get != null ? (e._.accessCache[t] = 0) : ee(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    }
  }
function ns(e) {
  return U(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e
}
let Wr = !0
function Sc(e) {
  const t = ko(e),
    n = e.proxy,
    r = e.ctx
  ;(Wr = !1), t.beforeCreate && rs(t.beforeCreate, e, 'bc')
  const {
    data: o,
    computed: s,
    methods: i,
    watch: a,
    provide: l,
    inject: c,
    created: u,
    beforeMount: h,
    mounted: d,
    beforeUpdate: g,
    updated: b,
    activated: E,
    deactivated: P,
    beforeDestroy: I,
    beforeUnmount: q,
    destroyed: k,
    unmounted: V,
    render: j,
    renderTracked: L,
    renderTriggered: z,
    errorCaptured: J,
    serverPrefetch: F,
    expose: Y,
    inheritAttrs: G,
    components: M,
    directives: Z,
    filters: A
  } = t
  if ((c && Pc(c, r, null), i))
    for (const le in i) {
      const re = i[le]
      Q(re) && (r[le] = re.bind(n))
    }
  if (o) {
    const le = o.call(n, n)
    de(le) && (e.data = Xt(le))
  }
  if (((Wr = !0), s))
    for (const le in s) {
      const re = s[le],
        Qe = Q(re) ? re.bind(n, n) : Q(re.get) ? re.get.bind(n, n) : ke,
        nt = !Q(re) && Q(re.set) ? re.set.bind(n) : ke,
        ze = K({ get: Qe, set: nt })
      Object.defineProperty(r, le, {
        enumerable: !0,
        configurable: !0,
        get: () => ze.value,
        set: (Ee) => (ze.value = Ee)
      })
    }
  if (a) for (const le in a) el(a[le], r, n, le)
  if (l) {
    const le = Q(l) ? l.call(n) : l
    Reflect.ownKeys(le).forEach((re) => {
      Vn(re, le[re])
    })
  }
  u && rs(u, e, 'c')
  function ae(le, re) {
    U(re) ? re.forEach((Qe) => le(Qe.bind(n))) : re && le(re.bind(n))
  }
  if (
    (ae(_c, h),
    ae(Ro, d),
    ae(yc, g),
    ae(Xi, b),
    ae(Vc, E),
    ae(Kc, P),
    ae(Ec, J),
    ae(xc, L),
    ae(wc, z),
    ae(To, q),
    ae(Ji, V),
    ae(bc, F),
    U(Y))
  )
    if (Y.length) {
      const le = e.exposed || (e.exposed = {})
      Y.forEach((re) => {
        Object.defineProperty(le, re, { get: () => n[re], set: (Qe) => (n[re] = Qe) })
      })
    } else e.exposed || (e.exposed = {})
  j && e.render === ke && (e.render = j),
    G != null && (e.inheritAttrs = G),
    M && (e.components = M),
    Z && (e.directives = Z)
}
function Pc(e, t, n = ke) {
  U(e) && (e = Gr(e))
  for (const r in e) {
    const o = e[r]
    let s
    de(o) ? ('default' in o ? (s = et(o.from || r, o.default, !0)) : (s = et(o.from || r))) : (s = et(o)),
      Te(s)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => s.value,
            set: (i) => (s.value = i)
          })
        : (t[r] = s)
  }
}
function rs(e, t, n) {
  Me(U(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function el(e, t, n, r) {
  const o = r.includes('.') ? dl(n, r) : () => n[r]
  if (pe(e)) {
    const s = t[e]
    Q(s) && Kn(o, s)
  } else if (Q(e)) Kn(o, e.bind(n))
  else if (de(e))
    if (U(e)) e.forEach((s) => el(s, t, n, r))
    else {
      const s = Q(e.handler) ? e.handler.bind(n) : t[e.handler]
      Q(s) && Kn(o, s, e)
    }
}
function ko(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: o,
      optionsCache: s,
      config: { optionMergeStrategies: i }
    } = e.appContext,
    a = s.get(t)
  let l
  return (
    a
      ? (l = a)
      : !o.length && !n && !r
        ? (l = t)
        : ((l = {}), o.length && o.forEach((c) => Jn(l, c, i, !0)), Jn(l, t, i)),
    de(t) && s.set(t, l),
    l
  )
}
function Jn(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t
  s && Jn(e, s, n, !0), o && o.forEach((i) => Jn(e, i, n, !0))
  for (const i in t)
    if (!(r && i === 'expose')) {
      const a = Rc[i] || (n && n[i])
      e[i] = a ? a(e[i], t[i]) : t[i]
    }
  return e
}
const Rc = {
  data: os,
  props: ss,
  emits: ss,
  methods: on,
  computed: on,
  beforeCreate: xe,
  created: xe,
  beforeMount: xe,
  mounted: xe,
  beforeUpdate: xe,
  updated: xe,
  beforeDestroy: xe,
  beforeUnmount: xe,
  destroyed: xe,
  unmounted: xe,
  activated: xe,
  deactivated: xe,
  errorCaptured: xe,
  serverPrefetch: xe,
  components: on,
  directives: on,
  watch: Lc,
  provide: os,
  inject: Tc
}
function os(e, t) {
  return t
    ? e
      ? function () {
          return he(Q(e) ? e.call(this, this) : e, Q(t) ? t.call(this, this) : t)
        }
      : t
    : e
}
function Tc(e, t) {
  return on(Gr(e), Gr(t))
}
function Gr(e) {
  if (U(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function xe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function on(e, t) {
  return e ? he(Object.create(null), e, t) : t
}
function ss(e, t) {
  return e
    ? U(e) && U(t)
      ? [...new Set([...e, ...t])]
      : he(Object.create(null), ns(e), ns(t != null ? t : {}))
    : t
}
function Lc(e, t) {
  if (!e) return t
  if (!t) return e
  const n = he(Object.create(null), e)
  for (const r in t) n[r] = xe(e[r], t[r])
  return n
}
function tl() {
  return {
    app: null,
    config: {
      isNativeTag: pa,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  }
}
let kc = 0
function Ac(e, t) {
  return function (r, o = null) {
    Q(r) || (r = he({}, r)), o != null && !de(o) && (o = null)
    const s = tl(),
      i = new WeakSet()
    let a = !1
    const l = (s.app = {
      _uid: kc++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: pu,
      get config() {
        return s.config
      },
      set config(c) {},
      use(c, ...u) {
        return (
          i.has(c) || (c && Q(c.install) ? (i.add(c), c.install(l, ...u)) : Q(c) && (i.add(c), c(l, ...u))), l
        )
      },
      mixin(c) {
        return s.mixins.includes(c) || s.mixins.push(c), l
      },
      component(c, u) {
        return u ? ((s.components[c] = u), l) : s.components[c]
      },
      directive(c, u) {
        return u ? ((s.directives[c] = u), l) : s.directives[c]
      },
      mount(c, u, h) {
        if (!a) {
          const d = Ae(r, o)
          return (
            (d.appContext = s),
            h === !0 ? (h = 'svg') : h === !1 && (h = void 0),
            u && t ? t(d, c) : e(d, c, h),
            (a = !0),
            (l._container = c),
            (c.__vue_app__ = l),
            gr(d.component)
          )
        }
      },
      unmount() {
        a && (e(null, l._container), delete l._container.__vue_app__)
      },
      provide(c, u) {
        return (s.provides[c] = u), l
      },
      runWithContext(c) {
        const u = dn
        dn = l
        try {
          return c()
        } finally {
          dn = u
        }
      }
    })
    return l
  }
}
let dn = null
function Vn(e, t) {
  if (ve) {
    let n = ve.provides
    const r = ve.parent && ve.parent.provides
    r === n && (n = ve.provides = Object.create(r)), (n[e] = t)
  }
}
function et(e, t, n = !1) {
  const r = ve || Pe
  if (r || dn) {
    const o = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : dn._context.provides
    if (o && e in o) return o[e]
    if (arguments.length > 1) return n && Q(t) ? t.call(r && r.proxy) : t
  }
}
const nl = {},
  rl = () => Object.create(nl),
  ol = (e) => Object.getPrototypeOf(e) === nl
function Oc(e, t, n, r = !1) {
  const o = {},
    s = rl()
  ;(e.propsDefaults = Object.create(null)), sl(e, t, o, s)
  for (const i in e.propsOptions[0]) i in o || (o[i] = void 0)
  n ? (e.props = r ? o : qi(o)) : e.type.props ? (e.props = o) : (e.props = s), (e.attrs = s)
}
function $c(e, t, n, r) {
  const {
      props: o,
      attrs: s,
      vnode: { patchFlag: i }
    } = e,
    a = ne(o),
    [l] = e.propsOptions
  let c = !1
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const u = e.vnode.dynamicProps
      for (let h = 0; h < u.length; h++) {
        let d = u[h]
        if (ur(e.emitsOptions, d)) continue
        const g = t[d]
        if (l)
          if (ee(s, d)) g !== s[d] && ((s[d] = g), (c = !0))
          else {
            const b = Ge(d)
            o[b] = Qr(l, a, b, g, e, !1)
          }
        else g !== s[d] && ((s[d] = g), (c = !0))
      }
    }
  } else {
    sl(e, t, o, s) && (c = !0)
    let u
    for (const h in a)
      (!t || (!ee(t, h) && ((u = Yt(h)) === h || !ee(t, u)))) &&
        (l ? n && (n[h] !== void 0 || n[u] !== void 0) && (o[h] = Qr(l, a, h, void 0, e, !0)) : delete o[h])
    if (s !== a) for (const h in s) (!t || (!ee(t, h) && !0)) && (delete s[h], (c = !0))
  }
  c && Ze(e.attrs, 'set', '')
}
function sl(e, t, n, r) {
  const [o, s] = e.propsOptions
  let i = !1,
    a
  if (t)
    for (let l in t) {
      if (cn(l)) continue
      const c = t[l]
      let u
      o && ee(o, (u = Ge(l)))
        ? !s || !s.includes(u)
          ? (n[u] = c)
          : ((a || (a = {}))[u] = c)
        : ur(e.emitsOptions, l) || ((!(l in r) || c !== r[l]) && ((r[l] = c), (i = !0)))
    }
  if (s) {
    const l = ne(n),
      c = a || ue
    for (let u = 0; u < s.length; u++) {
      const h = s[u]
      n[h] = Qr(o, l, h, c[h], e, !ee(c, h))
    }
  }
  return i
}
function Qr(e, t, n, r, o, s) {
  const i = e[n]
  if (i != null) {
    const a = ee(i, 'default')
    if (a && r === void 0) {
      const l = i.default
      if (i.type !== Function && !i.skipFactory && Q(l)) {
        const { propsDefaults: c } = o
        if (n in c) r = c[n]
        else {
          const u = Rn(o)
          ;(r = c[n] = l.call(null, t)), u()
        }
      } else r = l
    }
    i[0] && (s && !a ? (r = !1) : i[1] && (r === '' || r === Yt(n)) && (r = !0))
  }
  return r
}
function il(e, t, n = !1) {
  const r = t.propsCache,
    o = r.get(e)
  if (o) return o
  const s = e.props,
    i = {},
    a = []
  let l = !1
  if (!Q(e)) {
    const u = (h) => {
      l = !0
      const [d, g] = il(h, t, !0)
      he(i, d), g && a.push(...g)
    }
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u)
  }
  if (!s && !l) return de(e) && r.set(e, Dt), Dt
  if (U(s))
    for (let u = 0; u < s.length; u++) {
      const h = Ge(s[u])
      is(h) && (i[h] = ue)
    }
  else if (s)
    for (const u in s) {
      const h = Ge(u)
      if (is(h)) {
        const d = s[u],
          g = (i[h] = U(d) || Q(d) ? { type: d } : he({}, d))
        if (g) {
          const b = cs(Boolean, g.type),
            E = cs(String, g.type)
          ;(g[0] = b > -1), (g[1] = E < 0 || b < E), (b > -1 || ee(g, 'default')) && a.push(h)
        }
      }
    }
  const c = [i, a]
  return de(e) && r.set(e, c), c
}
function is(e) {
  return e[0] !== '$' && !cn(e)
}
function ls(e) {
  return e === null
    ? 'null'
    : typeof e == 'function'
      ? e.name || ''
      : (typeof e == 'object' && e.constructor && e.constructor.name) || ''
}
function as(e, t) {
  return ls(e) === ls(t)
}
function cs(e, t) {
  return U(t) ? t.findIndex((n) => as(n, e)) : Q(t) && as(t, e) ? 0 : -1
}
const ll = (e) => e[0] === '_' || e === '$stable',
  Ao = (e) => (U(e) ? e.map(Ue) : [Ue(e)]),
  Mc = (e, t, n) => {
    if (t._n) return t
    const r = ac((...o) => Ao(t(...o)), n)
    return (r._c = !1), r
  },
  al = (e, t, n) => {
    const r = e._ctx
    for (const o in e) {
      if (ll(o)) continue
      const s = e[o]
      if (Q(s)) t[o] = Mc(o, s, r)
      else if (s != null) {
        const i = Ao(s)
        t[o] = () => i
      }
    }
  },
  cl = (e, t) => {
    const n = Ao(t)
    e.slots.default = () => n
  },
  Ic = (e, t) => {
    const n = (e.slots = rl())
    if (e.vnode.shapeFlag & 32) {
      const r = t._
      r ? (he(n, t), wi(n, '_', r, !0)) : al(t, n)
    } else t && cl(e, t)
  },
  qc = (e, t, n) => {
    const { vnode: r, slots: o } = e
    let s = !0,
      i = ue
    if (r.shapeFlag & 32) {
      const a = t._
      a ? (n && a === 1 ? (s = !1) : (he(o, t), !n && a === 1 && delete o._)) : ((s = !t.$stable), al(t, o)),
        (i = t)
    } else t && (cl(e, t), (i = { default: 1 }))
    if (s) for (const a in o) !ll(a) && i[a] == null && delete o[a]
  }
function Yr(e, t, n, r, o = !1) {
  if (U(e)) {
    e.forEach((d, g) => Yr(d, t && (U(t) ? t[g] : t), n, r, o))
    return
  }
  if (zn(r) && !o) return
  const s = r.shapeFlag & 4 ? gr(r.component) : r.el,
    i = o ? null : s,
    { i: a, r: l } = e,
    c = t && t.r,
    u = a.refs === ue ? (a.refs = {}) : a.refs,
    h = a.setupState
  if (
    (c != null && c !== l && (pe(c) ? ((u[c] = null), ee(h, c) && (h[c] = null)) : Te(c) && (c.value = null)),
    Q(l))
  )
    pt(l, a, 12, [i, u])
  else {
    const d = pe(l),
      g = Te(l)
    if (d || g) {
      const b = () => {
        if (e.f) {
          const E = d ? (ee(h, l) ? h[l] : u[l]) : l.value
          o
            ? U(E) && po(E, s)
            : U(E)
              ? E.includes(s) || E.push(s)
              : d
                ? ((u[l] = [s]), ee(h, l) && (h[l] = u[l]))
                : ((l.value = [s]), e.k && (u[e.k] = l.value))
        } else d ? ((u[l] = i), ee(h, l) && (h[l] = i)) : g && ((l.value = i), e.k && (u[e.k] = i))
      }
      i ? ((b.id = -1), Ce(b, n)) : b()
    }
  }
}
const Ce = vc
function Nc(e) {
  return jc(e)
}
function jc(e, t) {
  const n = xi()
  n.__VUE__ = !0
  const {
      insert: r,
      remove: o,
      patchProp: s,
      createElement: i,
      createText: a,
      createComment: l,
      setText: c,
      setElementText: u,
      parentNode: h,
      nextSibling: d,
      setScopeId: g = ke,
      insertStaticContent: b
    } = e,
    E = (f, p, m, y = null, v = null, C = null, R = void 0, x = null, S = !!p.dynamicChildren) => {
      if (f === p) return
      f && !Pt(f, p) && ((y = _(f)), Ee(f, v, C, !0), (f = null)),
        p.patchFlag === -2 && ((S = !1), (p.dynamicChildren = null))
      const { type: w, ref: $, shapeFlag: H } = p
      switch (w) {
        case hr:
          P(f, p, m, y)
          break
        case Be:
          I(f, p, m, y)
          break
        case Sr:
          f == null && q(p, m, y, R)
          break
        case Fe:
          M(f, p, m, y, v, C, R, x, S)
          break
        default:
          H & 1
            ? j(f, p, m, y, v, C, R, x, S)
            : H & 6
              ? Z(f, p, m, y, v, C, R, x, S)
              : (H & 64 || H & 128) && w.process(f, p, m, y, v, C, R, x, S, N)
      }
      $ != null && v && Yr($, f && f.ref, C, p || f, !p)
    },
    P = (f, p, m, y) => {
      if (f == null) r((p.el = a(p.children)), m, y)
      else {
        const v = (p.el = f.el)
        p.children !== f.children && c(v, p.children)
      }
    },
    I = (f, p, m, y) => {
      f == null ? r((p.el = l(p.children || '')), m, y) : (p.el = f.el)
    },
    q = (f, p, m, y) => {
      ;[f.el, f.anchor] = b(f.children, p, m, y, f.el, f.anchor)
    },
    k = ({ el: f, anchor: p }, m, y) => {
      let v
      for (; f && f !== p; ) (v = d(f)), r(f, m, y), (f = v)
      r(p, m, y)
    },
    V = ({ el: f, anchor: p }) => {
      let m
      for (; f && f !== p; ) (m = d(f)), o(f), (f = m)
      o(p)
    },
    j = (f, p, m, y, v, C, R, x, S) => {
      p.type === 'svg' ? (R = 'svg') : p.type === 'math' && (R = 'mathml'),
        f == null ? L(p, m, y, v, C, R, x, S) : F(f, p, v, C, R, x, S)
    },
    L = (f, p, m, y, v, C, R, x) => {
      let S, w
      const { props: $, shapeFlag: H, transition: B, dirs: W } = f
      if (
        ((S = f.el = i(f.type, C, $ && $.is, $)),
        H & 8 ? u(S, f.children) : H & 16 && J(f.children, S, null, y, v, Er(f, C), R, x),
        W && yt(f, null, y, 'created'),
        z(S, f, f.scopeId, R, y),
        $)
      ) {
        for (const ce in $) ce !== 'value' && !cn(ce) && s(S, ce, null, $[ce], C, f.children, y, v, _e)
        'value' in $ && s(S, 'value', null, $.value, C), (w = $.onVnodeBeforeMount) && Ke(w, y, f)
      }
      W && yt(f, null, y, 'beforeMount')
      const X = Fc(v, B)
      X && B.beforeEnter(S),
        r(S, p, m),
        ((w = $ && $.onVnodeMounted) || X || W) &&
          Ce(() => {
            w && Ke(w, y, f), X && B.enter(S), W && yt(f, null, y, 'mounted')
          }, v)
    },
    z = (f, p, m, y, v) => {
      if ((m && g(f, m), y)) for (let C = 0; C < y.length; C++) g(f, y[C])
      if (v) {
        let C = v.subTree
        if (p === C) {
          const R = v.vnode
          z(f, R, R.scopeId, R.slotScopeIds, v.parent)
        }
      }
    },
    J = (f, p, m, y, v, C, R, x, S = 0) => {
      for (let w = S; w < f.length; w++) {
        const $ = (f[w] = x ? ct(f[w]) : Ue(f[w]))
        E(null, $, p, m, y, v, C, R, x)
      }
    },
    F = (f, p, m, y, v, C, R) => {
      const x = (p.el = f.el)
      let { patchFlag: S, dynamicChildren: w, dirs: $ } = p
      S |= f.patchFlag & 16
      const H = f.props || ue,
        B = p.props || ue
      let W
      if (
        (m && bt(m, !1),
        (W = B.onVnodeBeforeUpdate) && Ke(W, m, p, f),
        $ && yt(p, f, m, 'beforeUpdate'),
        m && bt(m, !0),
        w ? Y(f.dynamicChildren, w, x, m, y, Er(p, v), C) : R || re(f, p, x, null, m, y, Er(p, v), C, !1),
        S > 0)
      ) {
        if (S & 16) G(x, p, H, B, m, y, v)
        else if (
          (S & 2 && H.class !== B.class && s(x, 'class', null, B.class, v),
          S & 4 && s(x, 'style', H.style, B.style, v),
          S & 8)
        ) {
          const X = p.dynamicProps
          for (let ce = 0; ce < X.length; ce++) {
            const se = X[ce],
              ge = H[se],
              Ie = B[se]
            ;(Ie !== ge || se === 'value') && s(x, se, ge, Ie, v, f.children, m, y, _e)
          }
        }
        S & 1 && f.children !== p.children && u(x, p.children)
      } else !R && w == null && G(x, p, H, B, m, y, v)
      ;((W = B.onVnodeUpdated) || $) &&
        Ce(() => {
          W && Ke(W, m, p, f), $ && yt(p, f, m, 'updated')
        }, y)
    },
    Y = (f, p, m, y, v, C, R) => {
      for (let x = 0; x < p.length; x++) {
        const S = f[x],
          w = p[x],
          $ = S.el && (S.type === Fe || !Pt(S, w) || S.shapeFlag & 70) ? h(S.el) : m
        E(S, w, $, null, y, v, C, R, !0)
      }
    },
    G = (f, p, m, y, v, C, R) => {
      if (m !== y) {
        if (m !== ue) for (const x in m) !cn(x) && !(x in y) && s(f, x, m[x], null, R, p.children, v, C, _e)
        for (const x in y) {
          if (cn(x)) continue
          const S = y[x],
            w = m[x]
          S !== w && x !== 'value' && s(f, x, w, S, R, p.children, v, C, _e)
        }
        'value' in y && s(f, 'value', m.value, y.value, R)
      }
    },
    M = (f, p, m, y, v, C, R, x, S) => {
      const w = (p.el = f ? f.el : a('')),
        $ = (p.anchor = f ? f.anchor : a(''))
      let { patchFlag: H, dynamicChildren: B, slotScopeIds: W } = p
      W && (x = x ? x.concat(W) : W),
        f == null
          ? (r(w, m, y), r($, m, y), J(p.children || [], m, $, v, C, R, x, S))
          : H > 0 && H & 64 && B && f.dynamicChildren
            ? (Y(f.dynamicChildren, B, m, v, C, R, x),
              (p.key != null || (v && p === v.subTree)) && Oo(f, p, !0))
            : re(f, p, m, $, v, C, R, x, S)
    },
    Z = (f, p, m, y, v, C, R, x, S) => {
      ;(p.slotScopeIds = x),
        f == null ? (p.shapeFlag & 512 ? v.ctx.activate(p, m, y, R, S) : A(p, m, y, v, C, R, S)) : te(f, p, S)
    },
    A = (f, p, m, y, v, C, R) => {
      const x = (f.component = lu(f, y, v))
      if ((dr(f) && (x.ctx.renderer = N), au(x), x.asyncDep)) {
        if ((v && v.registerDep(x, ae, R), !f.el)) {
          const S = (x.subTree = Ae(Be))
          I(null, S, p, m)
        }
      } else ae(x, f, p, m, v, C, R)
    },
    te = (f, p, m) => {
      const y = (p.component = f.component)
      if (fc(f, p, m))
        if (y.asyncDep && !y.asyncResolved) {
          le(y, p, m)
          return
        } else (y.next = p), oc(y.update), (y.effect.dirty = !0), y.update()
      else (p.el = f.el), (y.vnode = p)
    },
    ae = (f, p, m, y, v, C, R) => {
      const x = () => {
          if (f.isMounted) {
            let { next: $, bu: H, u: B, parent: W, vnode: X } = f
            {
              const It = ul(f)
              if (It) {
                $ && (($.el = X.el), le(f, $, R)),
                  It.asyncDep.then(() => {
                    f.isUnmounted || x()
                  })
                return
              }
            }
            let ce = $,
              se
            bt(f, !1),
              $ ? (($.el = X.el), le(f, $, R)) : ($ = X),
              H && br(H),
              (se = $.props && $.props.onVnodeBeforeUpdate) && Ke(se, W, $, X),
              bt(f, !0)
            const ge = wr(f),
              Ie = f.subTree
            ;(f.subTree = ge),
              E(Ie, ge, h(Ie.el), _(Ie), f, v, C),
              ($.el = ge.el),
              ce === null && dc(f, ge.el),
              B && Ce(B, v),
              (se = $.props && $.props.onVnodeUpdated) && Ce(() => Ke(se, W, $, X), v)
          } else {
            let $
            const { el: H, props: B } = p,
              { bm: W, m: X, parent: ce } = f,
              se = zn(p)
            if (
              (bt(f, !1),
              W && br(W),
              !se && ($ = B && B.onVnodeBeforeMount) && Ke($, ce, p),
              bt(f, !0),
              H && fe)
            ) {
              const ge = () => {
                ;(f.subTree = wr(f)), fe(H, f.subTree, f, v, null)
              }
              se ? p.type.__asyncLoader().then(() => !f.isUnmounted && ge()) : ge()
            } else {
              const ge = (f.subTree = wr(f))
              E(null, ge, m, y, f, v, C), (p.el = ge.el)
            }
            if ((X && Ce(X, v), !se && ($ = B && B.onVnodeMounted))) {
              const ge = p
              Ce(() => Ke($, ce, ge), v)
            }
            ;(p.shapeFlag & 256 || (ce && zn(ce.vnode) && ce.vnode.shapeFlag & 256)) && f.a && Ce(f.a, v),
              (f.isMounted = !0),
              (p = m = y = null)
          }
        },
        S = (f.effect = new _o(x, ke, () => Po(w), f.scope)),
        w = (f.update = () => {
          S.dirty && S.run()
        })
      ;(w.id = f.uid), bt(f, !0), w()
    },
    le = (f, p, m) => {
      p.component = f
      const y = f.vnode.props
      ;(f.vnode = p), (f.next = null), $c(f, p.props, y, m), qc(f, p.children, m), vt(), Zo(f), _t()
    },
    re = (f, p, m, y, v, C, R, x, S = !1) => {
      const w = f && f.children,
        $ = f ? f.shapeFlag : 0,
        H = p.children,
        { patchFlag: B, shapeFlag: W } = p
      if (B > 0) {
        if (B & 128) {
          nt(w, H, m, y, v, C, R, x, S)
          return
        } else if (B & 256) {
          Qe(w, H, m, y, v, C, R, x, S)
          return
        }
      }
      W & 8
        ? ($ & 16 && _e(w, v, C), H !== w && u(m, H))
        : $ & 16
          ? W & 16
            ? nt(w, H, m, y, v, C, R, x, S)
            : _e(w, v, C, !0)
          : ($ & 8 && u(m, ''), W & 16 && J(H, m, y, v, C, R, x, S))
    },
    Qe = (f, p, m, y, v, C, R, x, S) => {
      ;(f = f || Dt), (p = p || Dt)
      const w = f.length,
        $ = p.length,
        H = Math.min(w, $)
      let B
      for (B = 0; B < H; B++) {
        const W = (p[B] = S ? ct(p[B]) : Ue(p[B]))
        E(f[B], W, m, null, v, C, R, x, S)
      }
      w > $ ? _e(f, v, C, !0, !1, H) : J(p, m, y, v, C, R, x, S, H)
    },
    nt = (f, p, m, y, v, C, R, x, S) => {
      let w = 0
      const $ = p.length
      let H = f.length - 1,
        B = $ - 1
      for (; w <= H && w <= B; ) {
        const W = f[w],
          X = (p[w] = S ? ct(p[w]) : Ue(p[w]))
        if (Pt(W, X)) E(W, X, m, null, v, C, R, x, S)
        else break
        w++
      }
      for (; w <= H && w <= B; ) {
        const W = f[H],
          X = (p[B] = S ? ct(p[B]) : Ue(p[B]))
        if (Pt(W, X)) E(W, X, m, null, v, C, R, x, S)
        else break
        H--, B--
      }
      if (w > H) {
        if (w <= B) {
          const W = B + 1,
            X = W < $ ? p[W].el : y
          for (; w <= B; ) E(null, (p[w] = S ? ct(p[w]) : Ue(p[w])), m, X, v, C, R, x, S), w++
        }
      } else if (w > B) for (; w <= H; ) Ee(f[w], v, C, !0), w++
      else {
        const W = w,
          X = w,
          ce = new Map()
        for (w = X; w <= B; w++) {
          const Le = (p[w] = S ? ct(p[w]) : Ue(p[w]))
          Le.key != null && ce.set(Le.key, w)
        }
        let se,
          ge = 0
        const Ie = B - X + 1
        let It = !1,
          Ho = 0
        const Zt = new Array(Ie)
        for (w = 0; w < Ie; w++) Zt[w] = 0
        for (w = W; w <= H; w++) {
          const Le = f[w]
          if (ge >= Ie) {
            Ee(Le, v, C, !0)
            continue
          }
          let Ve
          if (Le.key != null) Ve = ce.get(Le.key)
          else
            for (se = X; se <= B; se++)
              if (Zt[se - X] === 0 && Pt(Le, p[se])) {
                Ve = se
                break
              }
          Ve === void 0
            ? Ee(Le, v, C, !0)
            : ((Zt[Ve - X] = w + 1),
              Ve >= Ho ? (Ho = Ve) : (It = !0),
              E(Le, p[Ve], m, null, v, C, R, x, S),
              ge++)
        }
        const Do = It ? Bc(Zt) : Dt
        for (se = Do.length - 1, w = Ie - 1; w >= 0; w--) {
          const Le = X + w,
            Ve = p[Le],
            zo = Le + 1 < $ ? p[Le + 1].el : y
          Zt[w] === 0
            ? E(null, Ve, m, zo, v, C, R, x, S)
            : It && (se < 0 || w !== Do[se] ? ze(Ve, m, zo, 2) : se--)
        }
      }
    },
    ze = (f, p, m, y, v = null) => {
      const { el: C, type: R, transition: x, children: S, shapeFlag: w } = f
      if (w & 6) {
        ze(f.component.subTree, p, m, y)
        return
      }
      if (w & 128) {
        f.suspense.move(p, m, y)
        return
      }
      if (w & 64) {
        R.move(f, p, m, N)
        return
      }
      if (R === Fe) {
        r(C, p, m)
        for (let H = 0; H < S.length; H++) ze(S[H], p, m, y)
        r(f.anchor, p, m)
        return
      }
      if (R === Sr) {
        k(f, p, m)
        return
      }
      if (y !== 2 && w & 1 && x)
        if (y === 0) x.beforeEnter(C), r(C, p, m), Ce(() => x.enter(C), v)
        else {
          const { leave: H, delayLeave: B, afterLeave: W } = x,
            X = () => r(C, p, m),
            ce = () => {
              H(C, () => {
                X(), W && W()
              })
            }
          B ? B(C, X, ce) : ce()
        }
      else r(C, p, m)
    },
    Ee = (f, p, m, y = !1, v = !1) => {
      const {
        type: C,
        props: R,
        ref: x,
        children: S,
        dynamicChildren: w,
        shapeFlag: $,
        patchFlag: H,
        dirs: B,
        memoIndex: W
      } = f
      if (
        (H === -2 && (v = !1),
        x != null && Yr(x, null, m, f, !0),
        W != null && (p.renderCache[W] = void 0),
        $ & 256)
      ) {
        p.ctx.deactivate(f)
        return
      }
      const X = $ & 1 && B,
        ce = !zn(f)
      let se
      if ((ce && (se = R && R.onVnodeBeforeUnmount) && Ke(se, p, f), $ & 6)) kn(f.component, m, y)
      else {
        if ($ & 128) {
          f.suspense.unmount(m, y)
          return
        }
        X && yt(f, null, p, 'beforeUnmount'),
          $ & 64
            ? f.type.remove(f, p, m, N, y)
            : w && (C !== Fe || (H > 0 && H & 64))
              ? _e(w, p, m, !1, !0)
              : ((C === Fe && H & 384) || (!v && $ & 16)) && _e(S, p, m),
          y && $t(f)
      }
      ;((ce && (se = R && R.onVnodeUnmounted)) || X) &&
        Ce(() => {
          se && Ke(se, p, f), X && yt(f, null, p, 'unmounted')
        }, m)
    },
    $t = (f) => {
      const { type: p, el: m, anchor: y, transition: v } = f
      if (p === Fe) {
        Mt(m, y)
        return
      }
      if (p === Sr) {
        V(f)
        return
      }
      const C = () => {
        o(m), v && !v.persisted && v.afterLeave && v.afterLeave()
      }
      if (f.shapeFlag & 1 && v && !v.persisted) {
        const { leave: R, delayLeave: x } = v,
          S = () => R(m, C)
        x ? x(f.el, C, S) : S()
      } else C()
    },
    Mt = (f, p) => {
      let m
      for (; f !== p; ) (m = d(f)), o(f), (f = m)
      o(p)
    },
    kn = (f, p, m) => {
      const { bum: y, scope: v, update: C, subTree: R, um: x, m: S, a: w } = f
      us(S),
        us(w),
        y && br(y),
        v.stop(),
        C && ((C.active = !1), Ee(R, f, p, m)),
        x && Ce(x, p),
        Ce(() => {
          f.isUnmounted = !0
        }, p),
        p &&
          p.pendingBranch &&
          !p.isUnmounted &&
          f.asyncDep &&
          !f.asyncResolved &&
          f.suspenseId === p.pendingId &&
          (p.deps--, p.deps === 0 && p.resolve())
    },
    _e = (f, p, m, y = !1, v = !1, C = 0) => {
      for (let R = C; R < f.length; R++) Ee(f[R], p, m, y, v)
    },
    _ = (f) =>
      f.shapeFlag & 6 ? _(f.component.subTree) : f.shapeFlag & 128 ? f.suspense.next() : d(f.anchor || f.el)
  let O = !1
  const T = (f, p, m) => {
      f == null ? p._vnode && Ee(p._vnode, null, null, !0) : E(p._vnode || null, f, p, null, null, null, m),
        O || ((O = !0), Zo(), Ui(), (O = !1)),
        (p._vnode = f)
    },
    N = { p: E, um: Ee, m: ze, r: $t, mt: A, mc: J, pc: re, pbc: Y, n: _, o: e }
  let oe, fe
  return t && ([oe, fe] = t(N)), { render: T, hydrate: oe, createApp: Ac(T, oe) }
}
function Er({ type: e, props: t }, n) {
  return (n === 'svg' && e === 'foreignObject') ||
    (n === 'mathml' && e === 'annotation-xml' && t && t.encoding && t.encoding.includes('html'))
    ? void 0
    : n
}
function bt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n
}
function Fc(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted
}
function Oo(e, t, n = !1) {
  const r = e.children,
    o = t.children
  if (U(r) && U(o))
    for (let s = 0; s < r.length; s++) {
      const i = r[s]
      let a = o[s]
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) && ((a = o[s] = ct(o[s])), (a.el = i.el)),
        !n && a.patchFlag !== -2 && Oo(i, a)),
        a.type === hr && (a.el = i.el)
    }
}
function Bc(e) {
  const t = e.slice(),
    n = [0]
  let r, o, s, i, a
  const l = e.length
  for (r = 0; r < l; r++) {
    const c = e[r]
    if (c !== 0) {
      if (((o = n[n.length - 1]), e[o] < c)) {
        ;(t[r] = o), n.push(r)
        continue
      }
      for (s = 0, i = n.length - 1; s < i; ) (a = (s + i) >> 1), e[n[a]] < c ? (s = a + 1) : (i = a)
      c < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), (n[s] = r))
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; ) (n[s] = i), (i = t[i])
  return n
}
function ul(e) {
  const t = e.subTree.component
  if (t) return t.asyncDep && !t.asyncResolved ? t : ul(t)
}
function us(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].active = !1
}
const Hc = Symbol.for('v-scx'),
  Dc = () => et(Hc),
  qn = {}
function Kn(e, t, n) {
  return fl(e, t, n)
}
function fl(e, t, { immediate: n, deep: r, flush: o, once: s, onTrack: i, onTrigger: a } = ue) {
  if (t && s) {
    const L = t
    t = (...z) => {
      L(...z), j()
    }
  }
  const l = ve,
    c = (L) => (r === !0 ? L : dt(L, r === !1 ? 1 : void 0))
  let u,
    h = !1,
    d = !1
  if (
    (Te(e)
      ? ((u = () => e.value), (h = Yn(e)))
      : un(e)
        ? ((u = () => c(e)), (h = !0))
        : U(e)
          ? ((d = !0),
            (h = e.some((L) => un(L) || Yn(L))),
            (u = () =>
              e.map((L) => {
                if (Te(L)) return L.value
                if (un(L)) return c(L)
                if (Q(L)) return pt(L, l, 2)
              })))
          : Q(e)
            ? t
              ? (u = () => pt(e, l, 2))
              : (u = () => (g && g(), Me(e, l, 3, [b])))
            : (u = ke),
    t && r)
  ) {
    const L = u
    u = () => dt(L())
  }
  let g,
    b = (L) => {
      g = k.onStop = () => {
        pt(L, l, 4), (g = k.onStop = void 0)
      }
    },
    E
  if (pr)
    if (((b = ke), t ? n && Me(t, l, 3, [u(), d ? [] : void 0, b]) : u(), o === 'sync')) {
      const L = Dc()
      E = L.__watcherHandles || (L.__watcherHandles = [])
    } else return ke
  let P = d ? new Array(e.length).fill(qn) : qn
  const I = () => {
    if (!(!k.active || !k.dirty))
      if (t) {
        const L = k.run()
        ;(r || h || (d ? L.some((z, J) => gt(z, P[J])) : gt(L, P))) &&
          (g && g(), Me(t, l, 3, [L, P === qn ? void 0 : d && P[0] === qn ? [] : P, b]), (P = L))
      } else k.run()
  }
  I.allowRecurse = !!t
  let q
  o === 'sync'
    ? (q = I)
    : o === 'post'
      ? (q = () => Ce(I, l && l.suspense))
      : ((I.pre = !0), l && (I.id = l.uid), (q = () => Po(I)))
  const k = new _o(u, ke, q),
    V = Oa(),
    j = () => {
      k.stop(), V && po(V.effects, k)
    }
  return (
    t ? (n ? I() : (P = k.run())) : o === 'post' ? Ce(k.run.bind(k), l && l.suspense) : k.run(),
    E && E.push(j),
    j
  )
}
function zc(e, t, n) {
  const r = this.proxy,
    o = pe(e) ? (e.includes('.') ? dl(r, e) : () => r[e]) : e.bind(r, r)
  let s
  Q(t) ? (s = t) : ((s = t.handler), (n = t))
  const i = Rn(this),
    a = fl(o, s.bind(r), n)
  return i(), a
}
function dl(e, t) {
  const n = t.split('.')
  return () => {
    let r = e
    for (let o = 0; o < n.length && r; o++) r = r[n[o]]
    return r
  }
}
function dt(e, t = 1 / 0, n) {
  if (t <= 0 || !de(e) || e.__v_skip || ((n = n || new Set()), n.has(e))) return e
  if ((n.add(e), t--, Te(e))) dt(e.value, t, n)
  else if (U(e)) for (let r = 0; r < e.length; r++) dt(e[r], t, n)
  else if (ma(e) || an(e))
    e.forEach((r) => {
      dt(r, t, n)
    })
  else if (ya(e)) {
    for (const r in e) dt(e[r], t, n)
    for (const r of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, r) && dt(e[r], t, n)
  }
  return e
}
const dr = (e) => e.type.__isKeepAlive
function Vc(e, t) {
  hl(e, 'a', t)
}
function Kc(e, t) {
  hl(e, 'da', t)
}
function hl(e, t, n = ve) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n
      for (; o; ) {
        if (o.isDeactivated) return
        o = o.parent
      }
      return e()
    })
  if ((fr(t, r, n), n)) {
    let o = n.parent
    for (; o && o.parent; ) dr(o.parent.vnode) && Uc(r, t, n, o), (o = o.parent)
  }
}
function Uc(e, t, n, r) {
  const o = fr(t, e, r, !0)
  Ji(() => {
    po(r[t], o)
  }, n)
}
const at = Symbol('_leaveCb'),
  Nn = Symbol('_enterCb')
function pl() {
  const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() }
  return (
    Ro(() => {
      e.isMounted = !0
    }),
    To(() => {
      e.isUnmounting = !0
    }),
    e
  )
}
const Oe = [Function, Array],
  gl = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Oe,
    onEnter: Oe,
    onAfterEnter: Oe,
    onEnterCancelled: Oe,
    onBeforeLeave: Oe,
    onLeave: Oe,
    onAfterLeave: Oe,
    onLeaveCancelled: Oe,
    onBeforeAppear: Oe,
    onAppear: Oe,
    onAfterAppear: Oe,
    onAppearCancelled: Oe
  },
  ml = (e) => {
    const t = e.subTree
    return t.component ? ml(t.component) : t
  },
  Wc = {
    name: 'BaseTransition',
    props: gl,
    setup(e, { slots: t }) {
      const n = Pn(),
        r = pl()
      return () => {
        const o = t.default && $o(t.default(), !0)
        if (!o || !o.length) return
        let s = o[0]
        if (o.length > 1) {
          for (const d of o)
            if (d.type !== Be) {
              s = d
              break
            }
        }
        const i = ne(e),
          { mode: a } = i
        if (r.isLeaving) return Cr(s)
        const l = fs(s)
        if (!l) return Cr(s)
        let c = wn(l, i, r, n, (d) => (c = d))
        Kt(l, c)
        const u = n.subTree,
          h = u && fs(u)
        if (h && h.type !== Be && !Pt(l, h) && ml(n).type !== Be) {
          const d = wn(h, i, r, n)
          if ((Kt(h, d), a === 'out-in' && l.type !== Be))
            return (
              (r.isLeaving = !0),
              (d.afterLeave = () => {
                ;(r.isLeaving = !1), n.update.active !== !1 && ((n.effect.dirty = !0), n.update())
              }),
              Cr(s)
            )
          a === 'in-out' &&
            l.type !== Be &&
            (d.delayLeave = (g, b, E) => {
              const P = vl(r, h)
              ;(P[String(h.key)] = h),
                (g[at] = () => {
                  b(), (g[at] = void 0), delete c.delayedLeave
                }),
                (c.delayedLeave = E)
            })
        }
        return s
      }
    }
  },
  Gc = Wc
function vl(e, t) {
  const { leavingVNodes: n } = e
  let r = n.get(t.type)
  return r || ((r = Object.create(null)), n.set(t.type, r)), r
}
function wn(e, t, n, r, o) {
  const {
      appear: s,
      mode: i,
      persisted: a = !1,
      onBeforeEnter: l,
      onEnter: c,
      onAfterEnter: u,
      onEnterCancelled: h,
      onBeforeLeave: d,
      onLeave: g,
      onAfterLeave: b,
      onLeaveCancelled: E,
      onBeforeAppear: P,
      onAppear: I,
      onAfterAppear: q,
      onAppearCancelled: k
    } = t,
    V = String(e.key),
    j = vl(n, e),
    L = (F, Y) => {
      F && Me(F, r, 9, Y)
    },
    z = (F, Y) => {
      const G = Y[1]
      L(F, Y), U(F) ? F.every((M) => M.length <= 1) && G() : F.length <= 1 && G()
    },
    J = {
      mode: i,
      persisted: a,
      beforeEnter(F) {
        let Y = l
        if (!n.isMounted)
          if (s) Y = P || l
          else return
        F[at] && F[at](!0)
        const G = j[V]
        G && Pt(e, G) && G.el[at] && G.el[at](), L(Y, [F])
      },
      enter(F) {
        let Y = c,
          G = u,
          M = h
        if (!n.isMounted)
          if (s) (Y = I || c), (G = q || u), (M = k || h)
          else return
        let Z = !1
        const A = (F[Nn] = (te) => {
          Z || ((Z = !0), te ? L(M, [F]) : L(G, [F]), J.delayedLeave && J.delayedLeave(), (F[Nn] = void 0))
        })
        Y ? z(Y, [F, A]) : A()
      },
      leave(F, Y) {
        const G = String(e.key)
        if ((F[Nn] && F[Nn](!0), n.isUnmounting)) return Y()
        L(d, [F])
        let M = !1
        const Z = (F[at] = (A) => {
          M || ((M = !0), Y(), A ? L(E, [F]) : L(b, [F]), (F[at] = void 0), j[G] === e && delete j[G])
        })
        ;(j[G] = e), g ? z(g, [F, Z]) : Z()
      },
      clone(F) {
        const Y = wn(F, t, n, r, o)
        return o && o(Y), Y
      }
    }
  return J
}
function Cr(e) {
  if (dr(e)) return (e = mt(e)), (e.children = null), e
}
function fs(e) {
  if (!dr(e)) return e
  const { shapeFlag: t, children: n } = e
  if (n) {
    if (t & 16) return n[0]
    if (t & 32 && Q(n.default)) return n.default()
  }
}
function Kt(e, t) {
  e.shapeFlag & 6 && e.component
    ? Kt(e.component.subTree, t)
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)), (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t)
}
function $o(e, t = !1, n) {
  let r = [],
    o = 0
  for (let s = 0; s < e.length; s++) {
    let i = e[s]
    const a = n == null ? i.key : String(n) + String(i.key != null ? i.key : s)
    i.type === Fe
      ? (i.patchFlag & 128 && o++, (r = r.concat($o(i.children, t, a))))
      : (t || i.type !== Be) && r.push(a != null ? mt(i, { key: a }) : i)
  }
  if (o > 1) for (let s = 0; s < r.length; s++) r[s].patchFlag = -2
  return r
}
const Qc = (e) => e.__isTeleport,
  hn = (e) => e && (e.disabled || e.disabled === ''),
  ds = (e) => typeof SVGElement != 'undefined' && e instanceof SVGElement,
  hs = (e) => typeof MathMLElement == 'function' && e instanceof MathMLElement,
  Xr = (e, t) => {
    const n = e && e.to
    return pe(n) ? (t ? t(n) : null) : n
  },
  Yc = {
    name: 'Teleport',
    __isTeleport: !0,
    process(e, t, n, r, o, s, i, a, l, c) {
      const {
          mc: u,
          pc: h,
          pbc: d,
          o: { insert: g, querySelector: b, createText: E, createComment: P }
        } = c,
        I = hn(t.props)
      let { shapeFlag: q, children: k, dynamicChildren: V } = t
      if (e == null) {
        const j = (t.el = E('')),
          L = (t.anchor = E(''))
        g(j, n, r), g(L, n, r)
        const z = (t.target = Xr(t.props, b)),
          J = (t.targetAnchor = E(''))
        z && (g(J, z), i === 'svg' || ds(z) ? (i = 'svg') : (i === 'mathml' || hs(z)) && (i = 'mathml'))
        const F = (Y, G) => {
          q & 16 && u(k, Y, G, o, s, i, a, l)
        }
        I ? F(n, L) : z && F(z, J)
      } else {
        t.el = e.el
        const j = (t.anchor = e.anchor),
          L = (t.target = e.target),
          z = (t.targetAnchor = e.targetAnchor),
          J = hn(e.props),
          F = J ? n : L,
          Y = J ? j : z
        if (
          (i === 'svg' || ds(L) ? (i = 'svg') : (i === 'mathml' || hs(L)) && (i = 'mathml'),
          V ? (d(e.dynamicChildren, V, F, o, s, i, a), Oo(e, t, !0)) : l || h(e, t, F, Y, o, s, i, a, !1),
          I)
        )
          J ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : jn(t, n, j, c, 1)
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const G = (t.target = Xr(t.props, b))
          G && jn(t, G, null, c, 0)
        } else J && jn(t, L, z, c, 1)
      }
      _l(t)
    },
    remove(e, t, n, { um: r, o: { remove: o } }, s) {
      const { shapeFlag: i, children: a, anchor: l, targetAnchor: c, target: u, props: h } = e
      if ((u && o(c), s && o(l), i & 16)) {
        const d = s || !hn(h)
        for (let g = 0; g < a.length; g++) {
          const b = a[g]
          r(b, t, n, d, !!b.dynamicChildren)
        }
      }
    },
    move: jn,
    hydrate: Xc
  }
function jn(e, t, n, { o: { insert: r }, m: o }, s = 2) {
  s === 0 && r(e.targetAnchor, t, n)
  const { el: i, anchor: a, shapeFlag: l, children: c, props: u } = e,
    h = s === 2
  if ((h && r(i, t, n), (!h || hn(u)) && l & 16)) for (let d = 0; d < c.length; d++) o(c[d], t, n, 2)
  h && r(a, t, n)
}
function Xc(e, t, n, r, o, s, { o: { nextSibling: i, parentNode: a, querySelector: l } }, c) {
  const u = (t.target = Xr(t.props, l))
  if (u) {
    const h = u._lpa || u.firstChild
    if (t.shapeFlag & 16)
      if (hn(t.props)) (t.anchor = c(i(e), t, a(e), n, r, o, s)), (t.targetAnchor = h)
      else {
        t.anchor = i(e)
        let d = h
        for (; d; )
          if (((d = i(d)), d && d.nodeType === 8 && d.data === 'teleport anchor')) {
            ;(t.targetAnchor = d), (u._lpa = t.targetAnchor && i(t.targetAnchor))
            break
          }
        c(h, t, u, n, r, o, s)
      }
    _l(t)
  }
  return t.anchor && i(t.anchor)
}
const kh = Yc
function _l(e) {
  const t = e.ctx
  if (t && t.ut) {
    let n = e.children[0].el
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute('data-v-owner', t.uid), (n = n.nextSibling)
    t.ut()
  }
}
const Fe = Symbol.for('v-fgt'),
  hr = Symbol.for('v-txt'),
  Be = Symbol.for('v-cmt'),
  Sr = Symbol.for('v-stc'),
  pn = []
let He = null
function Jc(e = !1) {
  pn.push((He = e ? null : []))
}
function Zc() {
  pn.pop(), (He = pn[pn.length - 1] || null)
}
let xn = 1
function ps(e) {
  xn += e
}
function yl(e) {
  return (e.dynamicChildren = xn > 0 ? He || Dt : null), Zc(), xn > 0 && He && He.push(e), e
}
function Ah(e, t, n, r, o, s) {
  return yl(wl(e, t, n, r, o, s, !0))
}
function eu(e, t, n, r, o) {
  return yl(Ae(e, t, n, r, o, !0))
}
function Jr(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function Pt(e, t) {
  return e.type === t.type && e.key === t.key
}
const bl = ({ key: e }) => (e != null ? e : null),
  Un = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null ? (pe(e) || Te(e) || Q(e) ? { i: Pe, r: e, k: t, f: !!n } : e) : null
  )
function wl(e, t = null, n = null, r = 0, o = null, s = e === Fe ? 0 : 1, i = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && bl(t),
    ref: t && Un(t),
    scopeId: Qi,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Pe
  }
  return (
    a ? (Mo(l, n), s & 128 && e.normalize(l)) : n && (l.shapeFlag |= pe(n) ? 8 : 16),
    xn > 0 && !i && He && (l.patchFlag > 0 || s & 6) && l.patchFlag !== 32 && He.push(l),
    l
  )
}
const Ae = tu
function tu(e, t = null, n = null, r = 0, o = null, s = !1) {
  if (((!e || e === pc) && (e = Be), Jr(e))) {
    const a = mt(e, t, !0)
    return (
      n && Mo(a, n),
      xn > 0 && !s && He && (a.shapeFlag & 6 ? (He[He.indexOf(e)] = a) : He.push(a)),
      (a.patchFlag = -2),
      a
    )
  }
  if ((hu(e) && (e = e.__vccOpts), t)) {
    t = nu(t)
    let { class: a, style: l } = t
    a && !pe(a) && (t.class = vo(a)), de(l) && (ji(l) && !U(l) && (l = he({}, l)), (t.style = mo(l)))
  }
  const i = pe(e) ? 1 : mc(e) ? 128 : Qc(e) ? 64 : de(e) ? 4 : Q(e) ? 2 : 0
  return wl(e, t, n, r, o, i, s, !0)
}
function nu(e) {
  return e ? (ji(e) || ol(e) ? he({}, e) : e) : null
}
function mt(e, t, n = !1, r = !1) {
  const { props: o, ref: s, patchFlag: i, children: a, transition: l } = e,
    c = t ? ou(o || {}, t) : o,
    u = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: c,
      key: c && bl(c),
      ref: t && t.ref ? (n && s ? (U(s) ? s.concat(Un(t)) : [s, Un(t)]) : Un(t)) : s,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: a,
      target: e.target,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Fe ? (i === -1 ? 16 : i | 16) : i,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: l,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && mt(e.ssContent),
      ssFallback: e.ssFallback && mt(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce
    }
  return l && r && Kt(u, l.clone(u)), u
}
function ru(e = ' ', t = 0) {
  return Ae(hr, null, e, t)
}
function Ue(e) {
  return e == null || typeof e == 'boolean'
    ? Ae(Be)
    : U(e)
      ? Ae(Fe, null, e.slice())
      : typeof e == 'object'
        ? ct(e)
        : Ae(hr, null, String(e))
}
function ct(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : mt(e)
}
function Mo(e, t) {
  let n = 0
  const { shapeFlag: r } = e
  if (t == null) t = null
  else if (U(t)) n = 16
  else if (typeof t == 'object')
    if (r & 65) {
      const o = t.default
      o && (o._c && (o._d = !1), Mo(e, o()), o._c && (o._d = !0))
      return
    } else {
      n = 32
      const o = t._
      !o && !ol(t)
        ? (t._ctx = Pe)
        : o === 3 && Pe && (Pe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    Q(t)
      ? ((t = { default: t, _ctx: Pe }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [ru(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function ou(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const r = e[n]
    for (const o in r)
      if (o === 'class') t.class !== r.class && (t.class = vo([t.class, r.class]))
      else if (o === 'style') t.style = mo([t.style, r.style])
      else if (or(o)) {
        const s = t[o],
          i = r[o]
        i && s !== i && !(U(s) && s.includes(i)) && (t[o] = s ? [].concat(s, i) : i)
      } else o !== '' && (t[o] = r[o])
  }
  return t
}
function Ke(e, t, n, r = null) {
  Me(e, t, 7, [n, r])
}
const su = tl()
let iu = 0
function lu(e, t, n) {
  const r = e.type,
    o = (t ? t.appContext : e.appContext) || su,
    s = {
      uid: iu++,
      vnode: e,
      type: r,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Ci(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: il(r, o),
      emitsOptions: Gi(r, o),
      emit: null,
      emitted: null,
      propsDefaults: ue,
      inheritAttrs: r.inheritAttrs,
      ctx: ue,
      data: ue,
      props: ue,
      attrs: ue,
      slots: ue,
      refs: ue,
      setupState: ue,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    }
  return (s.ctx = { _: s }), (s.root = t ? t.root : s), (s.emit = lc.bind(null, s)), e.ce && e.ce(s), s
}
let ve = null
const Pn = () => ve || Pe
let Zn, Zr
{
  const e = xi(),
    t = (n, r) => {
      let o
      return (
        (o = e[n]) || (o = e[n] = []),
        o.push(r),
        (s) => {
          o.length > 1 ? o.forEach((i) => i(s)) : o[0](s)
        }
      )
    }
  ;(Zn = t('__VUE_INSTANCE_SETTERS__', (n) => (ve = n))), (Zr = t('__VUE_SSR_SETTERS__', (n) => (pr = n)))
}
const Rn = (e) => {
    const t = ve
    return (
      Zn(e),
      e.scope.on(),
      () => {
        e.scope.off(), Zn(t)
      }
    )
  },
  gs = () => {
    ve && ve.scope.off(), Zn(null)
  }
function xl(e) {
  return e.vnode.shapeFlag & 4
}
let pr = !1
function au(e, t = !1) {
  t && Zr(t)
  const { props: n, children: r } = e.vnode,
    o = xl(e)
  Oc(e, n, o, t), Ic(e, r)
  const s = o ? cu(e, t) : void 0
  return t && Zr(!1), s
}
function cu(e, t) {
  const n = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Cc))
  const { setup: r } = n
  if (r) {
    const o = (e.setupContext = r.length > 1 ? fu(e) : null),
      s = Rn(e)
    vt()
    const i = pt(r, e, 0, [e.props, o])
    if ((_t(), s(), bi(i))) {
      if ((i.then(gs, gs), t))
        return i
          .then((a) => {
            ms(e, a, t)
          })
          .catch((a) => {
            cr(a, e, 0)
          })
      e.asyncDep = i
    } else ms(e, i, t)
  } else El(e, t)
}
function ms(e, t, n) {
  Q(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : de(t) && (e.setupState = Di(t)),
    El(e, n)
}
let vs
function El(e, t, n) {
  const r = e.type
  if (!e.render) {
    if (!t && vs && !r.render) {
      const o = r.template || ko(e).template
      if (o) {
        const { isCustomElement: s, compilerOptions: i } = e.appContext.config,
          { delimiters: a, compilerOptions: l } = r,
          c = he(he({ isCustomElement: s, delimiters: a }, i), l)
        r.render = vs(o, c)
      }
    }
    e.render = r.render || ke
  }
  {
    const o = Rn(e)
    vt()
    try {
      Sc(e)
    } finally {
      _t(), o()
    }
  }
}
const uu = {
  get(e, t) {
    return Re(e, 'get', ''), e[t]
  }
}
function fu(e) {
  const t = (n) => {
    e.exposed = n || {}
  }
  return { attrs: new Proxy(e.attrs, uu), slots: e.slots, emit: e.emit, expose: t }
}
function gr(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(Di(Jt(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n]
            if (n in fn) return fn[n](e)
          },
          has(t, n) {
            return n in t || n in fn
          }
        }))
    : e.proxy
}
function du(e, t = !0) {
  return Q(e) ? e.displayName || e.name : e.name || (t && e.__name)
}
function hu(e) {
  return Q(e) && '__vccOpts' in e
}
const K = (e, t) => Ja(e, t, pr)
function D(e, t, n) {
  const r = arguments.length
  return r === 2
    ? de(t) && !U(t)
      ? Jr(t)
        ? Ae(e, null, [t])
        : Ae(e, t)
      : Ae(e, null, t)
    : (r > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : r === 3 && Jr(n) && (n = [n]), Ae(e, t, n))
}
const pu = '3.4.31'
/**
 * @vue/runtime-dom v3.4.31
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const gu = 'http://www.w3.org/2000/svg',
  mu = 'http://www.w3.org/1998/Math/MathML',
  Je = typeof document != 'undefined' ? document : null,
  _s = Je && Je.createElement('template'),
  vu = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, r) => {
      const o =
        t === 'svg'
          ? Je.createElementNS(gu, e)
          : t === 'mathml'
            ? Je.createElementNS(mu, e)
            : n
              ? Je.createElement(e, { is: n })
              : Je.createElement(e)
      return e === 'select' && r && r.multiple != null && o.setAttribute('multiple', r.multiple), o
    },
    createText: (e) => Je.createTextNode(e),
    createComment: (e) => Je.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Je.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    insertStaticContent(e, t, n, r, o, s) {
      const i = n ? n.previousSibling : t.lastChild
      if (o && (o === s || o.nextSibling))
        for (; t.insertBefore(o.cloneNode(!0), n), !(o === s || !(o = o.nextSibling)); );
      else {
        _s.innerHTML = r === 'svg' ? `<svg>${e}</svg>` : r === 'mathml' ? `<math>${e}</math>` : e
        const a = _s.content
        if (r === 'svg' || r === 'mathml') {
          const l = a.firstChild
          for (; l.firstChild; ) a.appendChild(l.firstChild)
          a.removeChild(l)
        }
        t.insertBefore(a, n)
      }
      return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
  },
  ot = 'transition',
  en = 'animation',
  Ut = Symbol('_vtc'),
  mr = (e, { slots: t }) => D(Gc, Sl(e), t)
mr.displayName = 'Transition'
const Cl = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  },
  _u = (mr.props = he({}, gl, Cl)),
  wt = (e, t = []) => {
    U(e) ? e.forEach((n) => n(...t)) : e && e(...t)
  },
  ys = (e) => (e ? (U(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1)
function Sl(e) {
  const t = {}
  for (const M in e) M in Cl || (t[M] = e[M])
  if (e.css === !1) return t
  const {
      name: n = 'v',
      type: r,
      duration: o,
      enterFromClass: s = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: a = `${n}-enter-to`,
      appearFromClass: l = s,
      appearActiveClass: c = i,
      appearToClass: u = a,
      leaveFromClass: h = `${n}-leave-from`,
      leaveActiveClass: d = `${n}-leave-active`,
      leaveToClass: g = `${n}-leave-to`
    } = e,
    b = yu(o),
    E = b && b[0],
    P = b && b[1],
    {
      onBeforeEnter: I,
      onEnter: q,
      onEnterCancelled: k,
      onLeave: V,
      onLeaveCancelled: j,
      onBeforeAppear: L = I,
      onAppear: z = q,
      onAppearCancelled: J = k
    } = t,
    F = (M, Z, A) => {
      it(M, Z ? u : a), it(M, Z ? c : i), A && A()
    },
    Y = (M, Z) => {
      ;(M._isLeaving = !1), it(M, h), it(M, g), it(M, d), Z && Z()
    },
    G = (M) => (Z, A) => {
      const te = M ? z : q,
        ae = () => F(Z, M, A)
      wt(te, [Z, ae]),
        bs(() => {
          it(Z, M ? l : s), Xe(Z, M ? u : a), ys(te) || ws(Z, r, E, ae)
        })
    }
  return he(t, {
    onBeforeEnter(M) {
      wt(I, [M]), Xe(M, s), Xe(M, i)
    },
    onBeforeAppear(M) {
      wt(L, [M]), Xe(M, l), Xe(M, c)
    },
    onEnter: G(!1),
    onAppear: G(!0),
    onLeave(M, Z) {
      M._isLeaving = !0
      const A = () => Y(M, Z)
      Xe(M, h),
        Xe(M, d),
        Rl(),
        bs(() => {
          !M._isLeaving || (it(M, h), Xe(M, g), ys(V) || ws(M, r, P, A))
        }),
        wt(V, [M, A])
    },
    onEnterCancelled(M) {
      F(M, !1), wt(k, [M])
    },
    onAppearCancelled(M) {
      F(M, !0), wt(J, [M])
    },
    onLeaveCancelled(M) {
      Y(M), wt(j, [M])
    }
  })
}
function yu(e) {
  if (e == null) return null
  if (de(e)) return [Pr(e.enter), Pr(e.leave)]
  {
    const t = Pr(e)
    return [t, t]
  }
}
function Pr(e) {
  return Ea(e)
}
function Xe(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[Ut] || (e[Ut] = new Set())).add(t)
}
function it(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r))
  const n = e[Ut]
  n && (n.delete(t), n.size || (e[Ut] = void 0))
}
function bs(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e)
  })
}
let bu = 0
function ws(e, t, n, r) {
  const o = (e._endId = ++bu),
    s = () => {
      o === e._endId && r()
    }
  if (n) return setTimeout(s, n)
  const { type: i, timeout: a, propCount: l } = Pl(e, t)
  if (!i) return r()
  const c = i + 'end'
  let u = 0
  const h = () => {
      e.removeEventListener(c, d), s()
    },
    d = (g) => {
      g.target === e && ++u >= l && h()
    }
  setTimeout(() => {
    u < l && h()
  }, a + 1),
    e.addEventListener(c, d)
}
function Pl(e, t) {
  const n = window.getComputedStyle(e),
    r = (b) => (n[b] || '').split(', '),
    o = r(`${ot}Delay`),
    s = r(`${ot}Duration`),
    i = xs(o, s),
    a = r(`${en}Delay`),
    l = r(`${en}Duration`),
    c = xs(a, l)
  let u = null,
    h = 0,
    d = 0
  t === ot
    ? i > 0 && ((u = ot), (h = i), (d = s.length))
    : t === en
      ? c > 0 && ((u = en), (h = c), (d = l.length))
      : ((h = Math.max(i, c)),
        (u = h > 0 ? (i > c ? ot : en) : null),
        (d = u ? (u === ot ? s.length : l.length) : 0))
  const g = u === ot && /\b(transform|all)(,|$)/.test(r(`${ot}Property`).toString())
  return { type: u, timeout: h, propCount: d, hasTransform: g }
}
function xs(e, t) {
  for (; e.length < t.length; ) e = e.concat(e)
  return Math.max(...t.map((n, r) => Es(n) + Es(e[r])))
}
function Es(e) {
  return e === 'auto' ? 0 : Number(e.slice(0, -1).replace(',', '.')) * 1e3
}
function Rl() {
  return document.body.offsetHeight
}
function wu(e, t, n) {
  const r = e[Ut]
  r && (t = (t ? [t, ...r] : [...r]).join(' ')),
    t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t)
}
const Cs = Symbol('_vod'),
  xu = Symbol('_vsh'),
  Eu = Symbol(''),
  Cu = /(^|;)\s*display\s*:/
function Su(e, t, n) {
  const r = e.style,
    o = pe(n)
  let s = !1
  if (n && !o) {
    if (t)
      if (pe(t))
        for (const i of t.split(';')) {
          const a = i.slice(0, i.indexOf(':')).trim()
          n[a] == null && Wn(r, a, '')
        }
      else for (const i in t) n[i] == null && Wn(r, i, '')
    for (const i in n) i === 'display' && (s = !0), Wn(r, i, n[i])
  } else if (o) {
    if (t !== n) {
      const i = r[Eu]
      i && (n += ';' + i), (r.cssText = n), (s = Cu.test(n))
    }
  } else t && e.removeAttribute('style')
  Cs in e && ((e[Cs] = s ? r.display : ''), e[xu] && (r.display = 'none'))
}
const Ss = /\s*!important$/
function Wn(e, t, n) {
  if (U(n)) n.forEach((r) => Wn(e, t, r))
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n)
  else {
    const r = Pu(e, t)
    Ss.test(n) ? e.setProperty(Yt(r), n.replace(Ss, ''), 'important') : (e[r] = n)
  }
}
const Ps = ['Webkit', 'Moz', 'ms'],
  Rr = {}
function Pu(e, t) {
  const n = Rr[t]
  if (n) return n
  let r = Ge(t)
  if (r !== 'filter' && r in e) return (Rr[t] = r)
  r = lr(r)
  for (let o = 0; o < Ps.length; o++) {
    const s = Ps[o] + r
    if (s in e) return (Rr[t] = s)
  }
  return t
}
const Rs = 'http://www.w3.org/1999/xlink'
function Ts(e, t, n, r, o, s = La(t)) {
  r && t.startsWith('xlink:')
    ? n == null
      ? e.removeAttributeNS(Rs, t.slice(6, t.length))
      : e.setAttributeNS(Rs, t, n)
    : n == null || (s && !Ei(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, s ? '' : Qt(n) ? String(n) : n)
}
function Ru(e, t, n, r, o, s, i) {
  if (t === 'innerHTML' || t === 'textContent') {
    r && i(r, o, s), (e[t] = n == null ? '' : n)
    return
  }
  const a = e.tagName
  if (t === 'value' && a !== 'PROGRESS' && !a.includes('-')) {
    const c = a === 'OPTION' ? e.getAttribute('value') || '' : e.value,
      u = n == null ? '' : String(n)
    ;(c !== u || !('_value' in e)) && (e.value = u), n == null && e.removeAttribute(t), (e._value = n)
    return
  }
  let l = !1
  if (n === '' || n == null) {
    const c = typeof e[t]
    c === 'boolean'
      ? (n = Ei(n))
      : n == null && c === 'string'
        ? ((n = ''), (l = !0))
        : c === 'number' && ((n = 0), (l = !0))
  }
  try {
    e[t] = n
  } catch {}
  l && e.removeAttribute(t)
}
function Tu(e, t, n, r) {
  e.addEventListener(t, n, r)
}
function Lu(e, t, n, r) {
  e.removeEventListener(t, n, r)
}
const Ls = Symbol('_vei')
function ku(e, t, n, r, o = null) {
  const s = e[Ls] || (e[Ls] = {}),
    i = s[t]
  if (r && i) i.value = r
  else {
    const [a, l] = Au(t)
    if (r) {
      const c = (s[t] = Mu(r, o))
      Tu(e, a, c, l)
    } else i && (Lu(e, a, i, l), (s[t] = void 0))
  }
}
const ks = /(?:Once|Passive|Capture)$/
function Au(e) {
  let t
  if (ks.test(e)) {
    t = {}
    let r
    for (; (r = e.match(ks)); ) (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0)
  }
  return [e[2] === ':' ? e.slice(3) : Yt(e.slice(2)), t]
}
let Tr = 0
const Ou = Promise.resolve(),
  $u = () => Tr || (Ou.then(() => (Tr = 0)), (Tr = Date.now()))
function Mu(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now()
    else if (r._vts <= n.attached) return
    Me(Iu(r, n.value), t, 5, [r])
  }
  return (n.value = e), (n.attached = $u()), n
}
function Iu(e, t) {
  if (U(t)) {
    const n = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0)
      }),
      t.map((r) => (o) => !o._stopped && r && r(o))
    )
  } else return t
}
const As = (e) =>
    e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
  qu = (e, t, n, r, o, s, i, a, l) => {
    const c = o === 'svg'
    t === 'class'
      ? wu(e, r, c)
      : t === 'style'
        ? Su(e, n, r)
        : or(t)
          ? ho(t) || ku(e, t, n, r, i)
          : (t[0] === '.' ? ((t = t.slice(1)), !0) : t[0] === '^' ? ((t = t.slice(1)), !1) : Nu(e, t, r, c))
            ? (Ru(e, t, r, s, i, a, l),
              !e.tagName.includes('-') &&
                (t === 'value' || t === 'checked' || t === 'selected') &&
                Ts(e, t, r, c, i, t !== 'value'))
            : (t === 'true-value' ? (e._trueValue = r) : t === 'false-value' && (e._falseValue = r),
              Ts(e, t, r, c))
  }
function Nu(e, t, n, r) {
  if (r) return !!(t === 'innerHTML' || t === 'textContent' || (t in e && As(t) && Q(n)))
  if (
    t === 'spellcheck' ||
    t === 'draggable' ||
    t === 'translate' ||
    t === 'form' ||
    (t === 'list' && e.tagName === 'INPUT') ||
    (t === 'type' && e.tagName === 'TEXTAREA')
  )
    return !1
  if (t === 'width' || t === 'height') {
    const o = e.tagName
    if (o === 'IMG' || o === 'VIDEO' || o === 'CANVAS' || o === 'SOURCE') return !1
  }
  return As(t) && pe(n) ? !1 : t in e
}
const Tl = new WeakMap(),
  Ll = new WeakMap(),
  er = Symbol('_moveCb'),
  Os = Symbol('_enterCb'),
  kl = {
    name: 'TransitionGroup',
    props: he({}, _u, { tag: String, moveClass: String }),
    setup(e, { slots: t }) {
      const n = Pn(),
        r = pl()
      let o, s
      return (
        Xi(() => {
          if (!o.length) return
          const i = e.moveClass || `${e.name || 'v'}-move`
          if (!zu(o[0].el, n.vnode.el, i)) return
          o.forEach(Bu), o.forEach(Hu)
          const a = o.filter(Du)
          Rl(),
            a.forEach((l) => {
              const c = l.el,
                u = c.style
              Xe(c, i), (u.transform = u.webkitTransform = u.transitionDuration = '')
              const h = (c[er] = (d) => {
                ;(d && d.target !== c) ||
                  ((!d || /transform$/.test(d.propertyName)) &&
                    (c.removeEventListener('transitionend', h), (c[er] = null), it(c, i)))
              })
              c.addEventListener('transitionend', h)
            })
        }),
        () => {
          const i = ne(e),
            a = Sl(i)
          let l = i.tag || Fe
          if (((o = []), s))
            for (let c = 0; c < s.length; c++) {
              const u = s[c]
              u.el &&
                u.el instanceof Element &&
                (o.push(u), Kt(u, wn(u, a, r, n)), Tl.set(u, u.el.getBoundingClientRect()))
            }
          s = t.default ? $o(t.default()) : []
          for (let c = 0; c < s.length; c++) {
            const u = s[c]
            u.key != null && Kt(u, wn(u, a, r, n))
          }
          return Ae(l, null, s)
        }
      )
    }
  },
  ju = (e) => delete e.mode
kl.props
const Fu = kl
function Bu(e) {
  const t = e.el
  t[er] && t[er](), t[Os] && t[Os]()
}
function Hu(e) {
  Ll.set(e, e.el.getBoundingClientRect())
}
function Du(e) {
  const t = Tl.get(e),
    n = Ll.get(e),
    r = t.left - n.left,
    o = t.top - n.top
  if (r || o) {
    const s = e.el.style
    return (s.transform = s.webkitTransform = `translate(${r}px,${o}px)`), (s.transitionDuration = '0s'), e
  }
}
function zu(e, t, n) {
  const r = e.cloneNode(),
    o = e[Ut]
  o &&
    o.forEach((a) => {
      a.split(/\s+/).forEach((l) => l && r.classList.remove(l))
    }),
    n.split(/\s+/).forEach((a) => a && r.classList.add(a)),
    (r.style.display = 'none')
  const s = t.nodeType === 1 ? t : t.parentNode
  s.appendChild(r)
  const { hasTransform: i } = Pl(r)
  return s.removeChild(r), i
}
const Vu = he({ patchProp: qu }, vu)
let $s
function Ku() {
  return $s || ($s = Nc(Vu))
}
const Al = (...e) => {
  const t = Ku().createApp(...e),
    { mount: n } = t
  return (
    (t.mount = (r) => {
      const o = Wu(r)
      if (!o) return
      const s = t._component
      !Q(s) && !s.render && !s.template && (s.template = o.innerHTML), (o.innerHTML = '')
      const i = n(o, !1, Uu(o))
      return o instanceof Element && (o.removeAttribute('v-cloak'), o.setAttribute('data-v-app', '')), i
    }),
    t
  )
}
function Uu(e) {
  if (e instanceof SVGElement) return 'svg'
  if (typeof MathMLElement == 'function' && e instanceof MathMLElement) return 'mathml'
}
function Wu(e) {
  return pe(e) ? document.querySelector(e) : e
}
function vr(e, t, n, r) {
  return Object.defineProperty(e, t, { get: n, set: r, enumerable: !0 }), e
}
function Oh(e, t) {
  for (const n in t) vr(e, n, t[n])
  return e
}
const At = Vt(!1)
let eo
function Gu(e, t) {
  const n =
    /(edg|edge|edga|edgios)\/([\w.]+)/.exec(e) ||
    /(opr)[\/]([\w.]+)/.exec(e) ||
    /(vivaldi)[\/]([\w.]+)/.exec(e) ||
    /(chrome|crios)[\/]([\w.]+)/.exec(e) ||
    /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) ||
    /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(e) ||
    /(firefox|fxios)[\/]([\w.]+)/.exec(e) ||
    /(webkit)[\/]([\w.]+)/.exec(e) ||
    /(opera)(?:.*version|)[\/]([\w.]+)/.exec(e) ||
    []
  return { browser: n[5] || n[3] || n[1] || '', version: n[4] || n[2] || '0', platform: t[0] || '' }
}
function Qu(e) {
  return (
    /(ipad)/.exec(e) ||
    /(ipod)/.exec(e) ||
    /(windows phone)/.exec(e) ||
    /(iphone)/.exec(e) ||
    /(kindle)/.exec(e) ||
    /(silk)/.exec(e) ||
    /(android)/.exec(e) ||
    /(win)/.exec(e) ||
    /(mac)/.exec(e) ||
    /(linux)/.exec(e) ||
    /(cros)/.exec(e) ||
    /(playbook)/.exec(e) ||
    /(bb)/.exec(e) ||
    /(blackberry)/.exec(e) ||
    []
  )
}
const Ol = 'ontouchstart' in window || window.navigator.maxTouchPoints > 0
function Yu(e) {
  const t = e.toLowerCase(),
    n = Qu(t),
    r = Gu(t, n),
    o = {}
  r.browser && ((o[r.browser] = !0), (o.version = r.version), (o.versionNumber = parseInt(r.version, 10))),
    r.platform && (o[r.platform] = !0)
  const s =
    o.android ||
    o.ios ||
    o.bb ||
    o.blackberry ||
    o.ipad ||
    o.iphone ||
    o.ipod ||
    o.kindle ||
    o.playbook ||
    o.silk ||
    o['windows phone']
  if (
    (s === !0 || t.indexOf('mobile') !== -1 ? (o.mobile = !0) : (o.desktop = !0),
    o['windows phone'] && ((o.winphone = !0), delete o['windows phone']),
    o.edga || o.edgios || o.edg
      ? ((o.edge = !0), (r.browser = 'edge'))
      : o.crios
        ? ((o.chrome = !0), (r.browser = 'chrome'))
        : o.fxios && ((o.firefox = !0), (r.browser = 'firefox')),
    (o.ipod || o.ipad || o.iphone) && (o.ios = !0),
    o.vivaldi && ((r.browser = 'vivaldi'), (o.vivaldi = !0)),
    (o.chrome || o.opr || o.safari || o.vivaldi || (o.mobile === !0 && o.ios !== !0 && s !== !0)) &&
      (o.webkit = !0),
    o.opr && ((r.browser = 'opera'), (o.opera = !0)),
    o.safari &&
      (o.blackberry || o.bb
        ? ((r.browser = 'blackberry'), (o.blackberry = !0))
        : o.playbook
          ? ((r.browser = 'playbook'), (o.playbook = !0))
          : o.android
            ? ((r.browser = 'android'), (o.android = !0))
            : o.kindle
              ? ((r.browser = 'kindle'), (o.kindle = !0))
              : o.silk && ((r.browser = 'silk'), (o.silk = !0))),
    (o.name = r.browser),
    (o.platform = r.platform),
    t.indexOf('electron') !== -1)
  )
    o.electron = !0
  else if (document.location.href.indexOf('-extension://') !== -1) o.bex = !0
  else {
    if (
      (window.Capacitor !== void 0
        ? ((o.capacitor = !0), (o.nativeMobile = !0), (o.nativeMobileWrapper = 'capacitor'))
        : (window._cordovaNative !== void 0 || window.cordova !== void 0) &&
          ((o.cordova = !0), (o.nativeMobile = !0), (o.nativeMobileWrapper = 'cordova')),
      At.value === !0 && (eo = { is: { ...o } }),
      Ol === !0 &&
        o.mac === !0 &&
        ((o.desktop === !0 && o.safari === !0) ||
          (o.nativeMobile === !0 && o.android !== !0 && o.ios !== !0 && o.ipad !== !0)))
    ) {
      delete o.mac, delete o.desktop
      const i = Math.min(window.innerHeight, window.innerWidth) > 414 ? 'ipad' : 'iphone'
      Object.assign(o, { mobile: !0, ios: !0, platform: i, [i]: !0 })
    }
    o.mobile !== !0 &&
      window.navigator.userAgentData &&
      window.navigator.userAgentData.mobile &&
      (delete o.desktop, (o.mobile = !0))
  }
  return o
}
const Ms = navigator.userAgent || navigator.vendor || window.opera,
  Xu = { has: { touch: !1, webStorage: !1 }, within: { iframe: !1 } },
  we = { userAgent: Ms, is: Yu(Ms), has: { touch: Ol }, within: { iframe: window.self !== window.top } },
  to = {
    install(e) {
      const { $q: t } = e
      At.value === !0
        ? (e.onSSRHydrated.push(() => {
            Object.assign(t.platform, we), (At.value = !1)
          }),
          (t.platform = Xt(this)))
        : (t.platform = this)
    }
  }
{
  let e
  vr(we.has, 'webStorage', () => {
    if (e !== void 0) return e
    try {
      if (window.localStorage) return (e = !0), !0
    } catch {}
    return (e = !1), !1
  }),
    Object.assign(to, we),
    At.value === !0 && (Object.assign(to, eo, Xu), (eo = null))
}
function Tn(e) {
  return Jt(Lo(e))
}
function Ju(e) {
  return Jt(e)
}
const Ln = (e, t) => {
    const n = Xt(e)
    for (const r in e)
      vr(
        t,
        r,
        () => n[r],
        (o) => {
          n[r] = o
        }
      )
    return t
  },
  Se = { hasPassive: !1, passiveCapture: !0, notPassiveCapture: !0 }
try {
  const e = Object.defineProperty({}, 'passive', {
    get() {
      Object.assign(Se, {
        hasPassive: !0,
        passive: { passive: !0 },
        notPassive: { passive: !1 },
        passiveCapture: { passive: !0, capture: !0 },
        notPassiveCapture: { passive: !1, capture: !0 }
      })
    }
  })
  window.addEventListener('qtest', null, e), window.removeEventListener('qtest', null, e)
} catch {}
function En() {}
function $h(e) {
  return e.button === 0
}
function Zu(e) {
  return (
    e.touches && e.touches[0]
      ? (e = e.touches[0])
      : e.changedTouches && e.changedTouches[0]
        ? (e = e.changedTouches[0])
        : e.targetTouches && e.targetTouches[0] && (e = e.targetTouches[0]),
    { top: e.clientY, left: e.clientX }
  )
}
function ef(e) {
  if (e.path) return e.path
  if (e.composedPath) return e.composedPath()
  const t = []
  let n = e.target
  for (; n; ) {
    if ((t.push(n), n.tagName === 'HTML')) return t.push(document), t.push(window), t
    n = n.parentElement
  }
}
function $l(e) {
  e.stopPropagation()
}
function no(e) {
  e.cancelable !== !1 && e.preventDefault()
}
function Ct(e) {
  e.cancelable !== !1 && e.preventDefault(), e.stopPropagation()
}
function Mh(e, t) {
  if (e === void 0 || (t === !0 && e.__dragPrevented === !0)) return
  const n =
    t === !0
      ? (r) => {
          ;(r.__dragPrevented = !0), r.addEventListener('dragstart', no, Se.notPassiveCapture)
        }
      : (r) => {
          delete r.__dragPrevented, r.removeEventListener('dragstart', no, Se.notPassiveCapture)
        }
  e.querySelectorAll('a, img').forEach(n)
}
function tf(e, t, n) {
  const r = `__q_${t}_evt`
  ;(e[r] = e[r] !== void 0 ? e[r].concat(n) : n),
    n.forEach((o) => {
      o[0].addEventListener(o[1], e[o[2]], Se[o[3]])
    })
}
function nf(e, t) {
  const n = `__q_${t}_evt`
  e[n] !== void 0 &&
    (e[n].forEach((r) => {
      r[0].removeEventListener(r[1], e[r[2]], Se[r[3]])
    }),
    (e[n] = void 0))
}
function rf(e, t = 250, n) {
  let r = null
  function o() {
    const s = arguments,
      i = () => {
        ;(r = null), n !== !0 && e.apply(this, s)
      }
    r !== null ? clearTimeout(r) : n === !0 && e.apply(this, s), (r = setTimeout(i, t))
  }
  return (
    (o.cancel = () => {
      r !== null && clearTimeout(r)
    }),
    o
  )
}
const Lr = ['sm', 'md', 'lg', 'xl'],
  { passive: Is } = Se
var of = Ln(
  {
    width: 0,
    height: 0,
    name: 'xs',
    sizes: { sm: 600, md: 1024, lg: 1440, xl: 1920 },
    lt: { sm: !0, md: !0, lg: !0, xl: !0 },
    gt: { xs: !1, sm: !1, md: !1, lg: !1 },
    xs: !0,
    sm: !1,
    md: !1,
    lg: !1,
    xl: !1
  },
  {
    setSizes: En,
    setDebounce: En,
    install({ $q: e, onSSRHydrated: t }) {
      if (((e.screen = this), this.__installed === !0)) {
        e.config.screen !== void 0 &&
          (e.config.screen.bodyClasses === !1
            ? document.body.classList.remove(`screen--${this.name}`)
            : this.__update(!0))
        return
      }
      const { visualViewport: n } = window,
        r = n || window,
        o = document.scrollingElement || document.documentElement,
        s =
          n === void 0 || we.is.mobile === !0
            ? () => [Math.max(window.innerWidth, o.clientWidth), Math.max(window.innerHeight, o.clientHeight)]
            : () => [
                n.width * n.scale + window.innerWidth - o.clientWidth,
                n.height * n.scale + window.innerHeight - o.clientHeight
              ],
        i = e.config.screen !== void 0 && e.config.screen.bodyClasses === !0
      this.__update = (h) => {
        const [d, g] = s()
        if ((g !== this.height && (this.height = g), d !== this.width)) this.width = d
        else if (h !== !0) return
        let b = this.sizes
        ;(this.gt.xs = d >= b.sm),
          (this.gt.sm = d >= b.md),
          (this.gt.md = d >= b.lg),
          (this.gt.lg = d >= b.xl),
          (this.lt.sm = d < b.sm),
          (this.lt.md = d < b.md),
          (this.lt.lg = d < b.lg),
          (this.lt.xl = d < b.xl),
          (this.xs = this.lt.sm),
          (this.sm = this.gt.xs === !0 && this.lt.md === !0),
          (this.md = this.gt.sm === !0 && this.lt.lg === !0),
          (this.lg = this.gt.md === !0 && this.lt.xl === !0),
          (this.xl = this.gt.lg),
          (b =
            (this.xs === !0 && 'xs') ||
            (this.sm === !0 && 'sm') ||
            (this.md === !0 && 'md') ||
            (this.lg === !0 && 'lg') ||
            'xl'),
          b !== this.name &&
            (i === !0 &&
              (document.body.classList.remove(`screen--${this.name}`),
              document.body.classList.add(`screen--${b}`)),
            (this.name = b))
      }
      let a,
        l = {},
        c = 16
      ;(this.setSizes = (h) => {
        Lr.forEach((d) => {
          h[d] !== void 0 && (l[d] = h[d])
        })
      }),
        (this.setDebounce = (h) => {
          c = h
        })
      const u = () => {
        const h = getComputedStyle(document.body)
        h.getPropertyValue('--q-size-sm') &&
          Lr.forEach((d) => {
            this.sizes[d] = parseInt(h.getPropertyValue(`--q-size-${d}`), 10)
          }),
          (this.setSizes = (d) => {
            Lr.forEach((g) => {
              d[g] && (this.sizes[g] = d[g])
            }),
              this.__update(!0)
          }),
          (this.setDebounce = (d) => {
            a !== void 0 && r.removeEventListener('resize', a, Is),
              (a = d > 0 ? rf(this.__update, d) : this.__update),
              r.addEventListener('resize', a, Is)
          }),
          this.setDebounce(c),
          Object.keys(l).length !== 0 ? (this.setSizes(l), (l = void 0)) : this.__update(),
          i === !0 && this.name === 'xs' && document.body.classList.add('screen--xs')
      }
      At.value === !0 ? t.push(u) : u()
    }
  }
)
const ye = Ln(
  { isActive: !1, mode: !1 },
  {
    __media: void 0,
    set(e) {
      ;(ye.mode = e),
        e === 'auto'
          ? (ye.__media === void 0 &&
              ((ye.__media = window.matchMedia('(prefers-color-scheme: dark)')),
              (ye.__updateMedia = () => {
                ye.set('auto')
              }),
              ye.__media.addListener(ye.__updateMedia)),
            (e = ye.__media.matches))
          : ye.__media !== void 0 && (ye.__media.removeListener(ye.__updateMedia), (ye.__media = void 0)),
        (ye.isActive = e === !0),
        document.body.classList.remove(`body--${e === !0 ? 'light' : 'dark'}`),
        document.body.classList.add(`body--${e === !0 ? 'dark' : 'light'}`)
    },
    toggle() {
      ye.set(ye.isActive === !1)
    },
    install({ $q: e, ssrContext: t }) {
      const { dark: n } = e.config
      ;(e.dark = this), this.__installed !== !0 && this.set(n !== void 0 ? n : !1)
    }
  }
)
function sf(e, t, n = document.body) {
  if (typeof e != 'string') throw new TypeError('Expected a string as propName')
  if (typeof t != 'string') throw new TypeError('Expected a string as value')
  if (!(n instanceof Element)) throw new TypeError('Expected a DOM element')
  n.style.setProperty(`--q-${e}`, t)
}
let Ml = !1
function lf(e) {
  Ml = e.isComposing === !0
}
function af(e) {
  return Ml === !0 || e !== Object(e) || e.isComposing === !0 || e.qKeyEvent === !0
}
function ro(e, t) {
  return af(e) === !0 ? !1 : [].concat(t).includes(e.keyCode)
}
function Il(e) {
  if (e.ios === !0) return 'ios'
  if (e.android === !0) return 'android'
}
function cf({ is: e, has: t, within: n }, r) {
  const o = [e.desktop === !0 ? 'desktop' : 'mobile', `${t.touch === !1 ? 'no-' : ''}touch`]
  if (e.mobile === !0) {
    const s = Il(e)
    s !== void 0 && o.push('platform-' + s)
  }
  if (e.nativeMobile === !0) {
    const s = e.nativeMobileWrapper
    o.push(s),
      o.push('native-mobile'),
      e.ios === !0 && (r[s] === void 0 || r[s].iosStatusBarPadding !== !1) && o.push('q-ios-padding')
  } else e.electron === !0 ? o.push('electron') : e.bex === !0 && o.push('bex')
  return n.iframe === !0 && o.push('within-iframe'), o
}
function uf() {
  const { is: e } = we,
    t = document.body.className,
    n = new Set(t.replace(/ {2}/g, ' ').split(' '))
  if (e.nativeMobile !== !0 && e.electron !== !0 && e.bex !== !0) {
    if (e.desktop === !0)
      n.delete('mobile'), n.delete('platform-ios'), n.delete('platform-android'), n.add('desktop')
    else if (e.mobile === !0) {
      n.delete('desktop'), n.add('mobile'), n.delete('platform-ios'), n.delete('platform-android')
      const o = Il(e)
      o !== void 0 && n.add(`platform-${o}`)
    }
  }
  we.has.touch === !0 && (n.delete('no-touch'), n.add('touch')),
    we.within.iframe === !0 && n.add('within-iframe')
  const r = Array.from(n).join(' ')
  t !== r && (document.body.className = r)
}
function ff(e) {
  for (const t in e) sf(t, e[t])
}
var df = {
  install(e) {
    if (this.__installed !== !0) {
      if (At.value === !0) uf()
      else {
        const { $q: t } = e
        t.config.brand !== void 0 && ff(t.config.brand)
        const n = cf(we, t.config)
        document.body.classList.add.apply(document.body.classList, n)
      }
      we.is.ios === !0 && document.body.addEventListener('touchstart', En),
        window.addEventListener('keydown', lf, !0)
    }
  }
}
const ql = () => !0
function hf(e) {
  return typeof e == 'string' && e !== '' && e !== '/' && e !== '#/'
}
function pf(e) {
  return (
    e.startsWith('#') === !0 && (e = e.substring(1)),
    e.startsWith('/') === !1 && (e = '/' + e),
    e.endsWith('/') === !0 && (e = e.substring(0, e.length - 1)),
    '#' + e
  )
}
function gf(e) {
  if (e.backButtonExit === !1) return () => !1
  if (e.backButtonExit === '*') return ql
  const t = ['#/']
  return (
    Array.isArray(e.backButtonExit) === !0 && t.push(...e.backButtonExit.filter(hf).map(pf)),
    () => t.includes(window.location.hash)
  )
}
var mf = {
    __history: [],
    add: En,
    remove: En,
    install({ $q: e }) {
      if (this.__installed === !0) return
      const { cordova: t, capacitor: n } = we.is
      if (t !== !0 && n !== !0) return
      const r = e.config[t === !0 ? 'cordova' : 'capacitor']
      if (
        (r !== void 0 && r.backButton === !1) ||
        (n === !0 && (window.Capacitor === void 0 || window.Capacitor.Plugins.App === void 0))
      )
        return
      ;(this.add = (i) => {
        i.condition === void 0 && (i.condition = ql), this.__history.push(i)
      }),
        (this.remove = (i) => {
          const a = this.__history.indexOf(i)
          a >= 0 && this.__history.splice(a, 1)
        })
      const o = gf(Object.assign({ backButtonExit: !0 }, r)),
        s = () => {
          if (this.__history.length) {
            const i = this.__history[this.__history.length - 1]
            i.condition() === !0 && (this.__history.pop(), i.handler())
          } else o() === !0 ? navigator.app.exitApp() : window.history.back()
        }
      t === !0
        ? document.addEventListener('deviceready', () => {
            document.addEventListener('backbutton', s, !1)
          })
        : window.Capacitor.Plugins.App.addListener('backButton', s)
    }
  },
  qs = {
    isoName: 'en-US',
    nativeName: 'English (US)',
    label: {
      clear: 'Clear',
      ok: 'OK',
      cancel: 'Cancel',
      close: 'Close',
      set: 'Set',
      select: 'Select',
      reset: 'Reset',
      remove: 'Remove',
      update: 'Update',
      create: 'Create',
      search: 'Search',
      filter: 'Filter',
      refresh: 'Refresh',
      expand: (e) => (e ? `Expand "${e}"` : 'Expand'),
      collapse: (e) => (e ? `Collapse "${e}"` : 'Collapse')
    },
    date: {
      days: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
      daysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
      months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
        '_'
      ),
      monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
      firstDayOfWeek: 0,
      format24h: !1,
      pluralDay: 'days'
    },
    table: {
      noData: 'No data available',
      noResults: 'No matching records found',
      loading: 'Loading...',
      selectedRecords: (e) => (e === 1 ? '1 record selected.' : (e === 0 ? 'No' : e) + ' records selected.'),
      recordsPerPage: 'Records per page:',
      allRows: 'All',
      pagination: (e, t, n) => e + '-' + t + ' of ' + n,
      columns: 'Columns'
    },
    editor: {
      url: 'URL',
      bold: 'Bold',
      italic: 'Italic',
      strikethrough: 'Strikethrough',
      underline: 'Underline',
      unorderedList: 'Unordered List',
      orderedList: 'Ordered List',
      subscript: 'Subscript',
      superscript: 'Superscript',
      hyperlink: 'Hyperlink',
      toggleFullscreen: 'Toggle Fullscreen',
      quote: 'Quote',
      left: 'Left align',
      center: 'Center align',
      right: 'Right align',
      justify: 'Justify align',
      print: 'Print',
      outdent: 'Decrease indentation',
      indent: 'Increase indentation',
      removeFormat: 'Remove formatting',
      formatting: 'Formatting',
      fontSize: 'Font Size',
      align: 'Align',
      hr: 'Insert Horizontal Rule',
      undo: 'Undo',
      redo: 'Redo',
      heading1: 'Heading 1',
      heading2: 'Heading 2',
      heading3: 'Heading 3',
      heading4: 'Heading 4',
      heading5: 'Heading 5',
      heading6: 'Heading 6',
      paragraph: 'Paragraph',
      code: 'Code',
      size1: 'Very small',
      size2: 'A bit small',
      size3: 'Normal',
      size4: 'Medium-large',
      size5: 'Big',
      size6: 'Very big',
      size7: 'Maximum',
      defaultFont: 'Default Font',
      viewSource: 'View Source'
    },
    tree: { noNodes: 'No nodes available', noResults: 'No matching nodes found' }
  }
function Ns() {
  const e =
    Array.isArray(navigator.languages) === !0 && navigator.languages.length !== 0
      ? navigator.languages[0]
      : navigator.language
  if (typeof e == 'string')
    return e
      .split(/[-_]/)
      .map((t, n) =>
        n === 0
          ? t.toLowerCase()
          : n > 1 || t.length < 4
            ? t.toUpperCase()
            : t[0].toUpperCase() + t.slice(1).toLowerCase()
      )
      .join('-')
}
const ut = Ln(
  { __qLang: {} },
  {
    getLocale: Ns,
    set(e = qs, t) {
      const n = { ...e, rtl: e.rtl === !0, getLocale: Ns }
      {
        if (((n.set = ut.set), ut.__langConfig === void 0 || ut.__langConfig.noHtmlAttrs !== !0)) {
          const r = document.documentElement
          r.setAttribute('dir', n.rtl === !0 ? 'rtl' : 'ltr'), r.setAttribute('lang', n.isoName)
        }
        Object.assign(ut.__qLang, n)
      }
    },
    install({ $q: e, lang: t, ssrContext: n }) {
      ;(e.lang = ut.__qLang),
        (ut.__langConfig = e.config.lang),
        this.__installed === !0
          ? t !== void 0 && this.set(t)
          : ((this.props = new Proxy(this.__qLang, {
              get() {
                return Reflect.get(...arguments)
              },
              ownKeys(r) {
                return Reflect.ownKeys(r).filter((o) => o !== 'set' && o !== 'getLocale')
              }
            })),
            this.set(t || qs))
    }
  }
)
var vf = {
  name: 'material-icons',
  type: { positive: 'check_circle', negative: 'warning', info: 'info', warning: 'priority_high' },
  arrow: {
    up: 'arrow_upward',
    right: 'arrow_forward',
    down: 'arrow_downward',
    left: 'arrow_back',
    dropdown: 'arrow_drop_down'
  },
  chevron: { left: 'chevron_left', right: 'chevron_right' },
  colorPicker: { spectrum: 'gradient', tune: 'tune', palette: 'style' },
  pullToRefresh: { icon: 'refresh' },
  carousel: {
    left: 'chevron_left',
    right: 'chevron_right',
    up: 'keyboard_arrow_up',
    down: 'keyboard_arrow_down',
    navigationIcon: 'lens'
  },
  chip: { remove: 'cancel', selected: 'check' },
  datetime: { arrowLeft: 'chevron_left', arrowRight: 'chevron_right', now: 'access_time', today: 'today' },
  editor: {
    bold: 'format_bold',
    italic: 'format_italic',
    strikethrough: 'strikethrough_s',
    underline: 'format_underlined',
    unorderedList: 'format_list_bulleted',
    orderedList: 'format_list_numbered',
    subscript: 'vertical_align_bottom',
    superscript: 'vertical_align_top',
    hyperlink: 'link',
    toggleFullscreen: 'fullscreen',
    quote: 'format_quote',
    left: 'format_align_left',
    center: 'format_align_center',
    right: 'format_align_right',
    justify: 'format_align_justify',
    print: 'print',
    outdent: 'format_indent_decrease',
    indent: 'format_indent_increase',
    removeFormat: 'format_clear',
    formatting: 'text_format',
    fontSize: 'format_size',
    align: 'format_align_left',
    hr: 'remove',
    undo: 'undo',
    redo: 'redo',
    heading: 'format_size',
    code: 'code',
    size: 'format_size',
    font: 'font_download',
    viewSource: 'code'
  },
  expansionItem: { icon: 'keyboard_arrow_down', denseIcon: 'arrow_drop_down' },
  fab: { icon: 'add', activeIcon: 'close' },
  field: { clear: 'cancel', error: 'error' },
  pagination: {
    first: 'first_page',
    prev: 'keyboard_arrow_left',
    next: 'keyboard_arrow_right',
    last: 'last_page'
  },
  rating: { icon: 'grade' },
  stepper: { done: 'check', active: 'edit', error: 'warning' },
  tabs: {
    left: 'chevron_left',
    right: 'chevron_right',
    up: 'keyboard_arrow_up',
    down: 'keyboard_arrow_down'
  },
  table: {
    arrowUp: 'arrow_upward',
    warning: 'warning',
    firstPage: 'first_page',
    prevPage: 'chevron_left',
    nextPage: 'chevron_right',
    lastPage: 'last_page'
  },
  tree: { icon: 'play_arrow' },
  uploader: {
    done: 'done',
    clear: 'clear',
    add: 'add_box',
    upload: 'cloud_upload',
    removeQueue: 'clear_all',
    removeUploaded: 'done_all'
  }
}
const tr = Ln(
    { iconMapFn: null, __qIconSet: {} },
    {
      set(e, t) {
        const n = { ...e }
        ;(n.set = tr.set), Object.assign(tr.__qIconSet, n)
      },
      install({ $q: e, iconSet: t, ssrContext: n }) {
        e.config.iconMapFn !== void 0 && (this.iconMapFn = e.config.iconMapFn),
          (e.iconSet = this.__qIconSet),
          vr(
            e,
            'iconMapFn',
            () => this.iconMapFn,
            (r) => {
              this.iconMapFn = r
            }
          ),
          this.__installed === !0
            ? t !== void 0 && this.set(t)
            : ((this.props = new Proxy(this.__qIconSet, {
                get() {
                  return Reflect.get(...arguments)
                },
                ownKeys(r) {
                  return Reflect.ownKeys(r).filter((o) => o !== 'set')
                }
              })),
              this.set(t || vf))
      }
    }
  ),
  _f = '_q_',
  Ih = '_q_l_',
  qh = '_q_pc_',
  Nh = '_q_fo_',
  jh = '_q_u_'
function Fh() {}
const nr = {}
let Nl = !1
function yf() {
  Nl = !0
}
function kr(e, t) {
  if (e === t) return !0
  if (e !== null && t !== null && typeof e == 'object' && typeof t == 'object') {
    if (e.constructor !== t.constructor) return !1
    let n, r
    if (e.constructor === Array) {
      if (((n = e.length), n !== t.length)) return !1
      for (r = n; r-- !== 0; ) if (kr(e[r], t[r]) !== !0) return !1
      return !0
    }
    if (e.constructor === Map) {
      if (e.size !== t.size) return !1
      let s = e.entries()
      for (r = s.next(); r.done !== !0; ) {
        if (t.has(r.value[0]) !== !0) return !1
        r = s.next()
      }
      for (s = e.entries(), r = s.next(); r.done !== !0; ) {
        if (kr(r.value[1], t.get(r.value[0])) !== !0) return !1
        r = s.next()
      }
      return !0
    }
    if (e.constructor === Set) {
      if (e.size !== t.size) return !1
      const s = e.entries()
      for (r = s.next(); r.done !== !0; ) {
        if (t.has(r.value[0]) !== !0) return !1
        r = s.next()
      }
      return !0
    }
    if (e.buffer != null && e.buffer.constructor === ArrayBuffer) {
      if (((n = e.length), n !== t.length)) return !1
      for (r = n; r-- !== 0; ) if (e[r] !== t[r]) return !1
      return !0
    }
    if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags
    if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf()
    if (e.toString !== Object.prototype.toString) return e.toString() === t.toString()
    const o = Object.keys(e).filter((s) => e[s] !== void 0)
    if (((n = o.length), n !== Object.keys(t).filter((s) => t[s] !== void 0).length)) return !1
    for (r = n; r-- !== 0; ) {
      const s = o[r]
      if (kr(e[s], t[s]) !== !0) return !1
    }
    return !0
  }
  return e !== e && t !== t
}
function Ot(e) {
  return e !== null && typeof e == 'object' && Array.isArray(e) !== !0
}
const js = [to, df, ye, of, mf, ut, tr]
function jl(e, t) {
  const n = Al(e)
  n.config.globalProperties = t.config.globalProperties
  const { reload: r, ...o } = t._context
  return Object.assign(n._context, o), n
}
function Fs(e, t) {
  t.forEach((n) => {
    n.install(e), (n.__installed = !0)
  })
}
function bf(e, t, n) {
  ;(e.config.globalProperties.$q = n.$q),
    e.provide(_f, n.$q),
    Fs(n, js),
    t.components !== void 0 &&
      Object.values(t.components).forEach((r) => {
        Ot(r) === !0 && r.name !== void 0 && e.component(r.name, r)
      }),
    t.directives !== void 0 &&
      Object.values(t.directives).forEach((r) => {
        Ot(r) === !0 && r.name !== void 0 && e.directive(r.name, r)
      }),
    t.plugins !== void 0 &&
      Fs(
        n,
        Object.values(t.plugins).filter((r) => typeof r.install == 'function' && js.includes(r) === !1)
      ),
    At.value === !0 &&
      (n.$q.onSSRHydrated = () => {
        n.onSSRHydrated.forEach((r) => {
          r()
        }),
          (n.$q.onSSRHydrated = () => {})
      })
}
var wf = function (e, t = {}) {
    const n = { version: '2.16.6' }
    Nl === !1
      ? (t.config !== void 0 && Object.assign(nr, t.config), (n.config = { ...nr }), yf())
      : (n.config = t.config || {}),
      bf(e, t, { parentApp: e, $q: n, lang: t.lang, iconSet: t.iconSet, onSSRHydrated: [] })
  },
  xf = { name: 'Quasar', version: '2.16.6', install: wf, lang: ut, iconSet: tr }
const Ef = Object.assign(
  { name: 'App' },
  {
    __name: 'App',
    setup(e) {
      return (t, n) => {
        const r = hc('router-view')
        return Jc(), eu(r)
      }
    }
  }
)
function Bh(e) {
  return e
}
var Cf = !1
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const Sf = Symbol()
var Bs
;(function (e) {
  ;(e.direct = 'direct'), (e.patchObject = 'patch object'), (e.patchFunction = 'patch function')
})(Bs || (Bs = {}))
function Pf() {
  const e = ka(!0),
    t = e.run(() => Vt({}))
  let n = [],
    r = []
  const o = Jt({
    install(s) {
      ;(o._a = s),
        s.provide(Sf, o),
        (s.config.globalProperties.$pinia = o),
        r.forEach((i) => n.push(i)),
        (r = [])
    },
    use(s) {
      return !this._a && !Cf ? r.push(s) : n.push(s), this
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t
  })
  return o
}
var Ar = () => Pf()
/*!
 * vue-router v4.4.0
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */ const Bt = typeof document != 'undefined'
function Rf(e) {
  return e.__esModule || e[Symbol.toStringTag] === 'Module'
}
const ie = Object.assign
function Or(e, t) {
  const n = {}
  for (const r in t) {
    const o = t[r]
    n[r] = De(o) ? o.map(e) : e(o)
  }
  return n
}
const gn = () => {},
  De = Array.isArray,
  Fl = /#/g,
  Tf = /&/g,
  Lf = /\//g,
  kf = /=/g,
  Af = /\?/g,
  Bl = /\+/g,
  Of = /%5B/g,
  $f = /%5D/g,
  Hl = /%5E/g,
  Mf = /%60/g,
  Dl = /%7B/g,
  If = /%7C/g,
  zl = /%7D/g,
  qf = /%20/g
function Io(e) {
  return encodeURI('' + e)
    .replace(If, '|')
    .replace(Of, '[')
    .replace($f, ']')
}
function Nf(e) {
  return Io(e).replace(Dl, '{').replace(zl, '}').replace(Hl, '^')
}
function oo(e) {
  return Io(e)
    .replace(Bl, '%2B')
    .replace(qf, '+')
    .replace(Fl, '%23')
    .replace(Tf, '%26')
    .replace(Mf, '`')
    .replace(Dl, '{')
    .replace(zl, '}')
    .replace(Hl, '^')
}
function jf(e) {
  return oo(e).replace(kf, '%3D')
}
function Ff(e) {
  return Io(e).replace(Fl, '%23').replace(Af, '%3F')
}
function Bf(e) {
  return e == null ? '' : Ff(e).replace(Lf, '%2F')
}
function Cn(e) {
  try {
    return decodeURIComponent('' + e)
  } catch {}
  return '' + e
}
const Hf = /\/$/,
  Df = (e) => e.replace(Hf, '')
function $r(e, t, n = '/') {
  let r,
    o = {},
    s = '',
    i = ''
  const a = t.indexOf('#')
  let l = t.indexOf('?')
  return (
    a < l && a >= 0 && (l = -1),
    l > -1 && ((r = t.slice(0, l)), (s = t.slice(l + 1, a > -1 ? a : t.length)), (o = e(s))),
    a > -1 && ((r = r || t.slice(0, a)), (i = t.slice(a, t.length))),
    (r = Uf(r != null ? r : t, n)),
    { fullPath: r + (s && '?') + s + i, path: r, query: o, hash: Cn(i) }
  )
}
function zf(e, t) {
  const n = t.query ? e(t.query) : ''
  return t.path + (n && '?') + n + (t.hash || '')
}
function Hs(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || '/'
}
function Vf(e, t, n) {
  const r = t.matched.length - 1,
    o = n.matched.length - 1
  return (
    r > -1 &&
    r === o &&
    Wt(t.matched[r], n.matched[o]) &&
    Vl(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  )
}
function Wt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}
function Vl(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1
  for (const n in e) if (!Kf(e[n], t[n])) return !1
  return !0
}
function Kf(e, t) {
  return De(e) ? Ds(e, t) : De(t) ? Ds(t, e) : e === t
}
function Ds(e, t) {
  return De(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t
}
function Uf(e, t) {
  if (e.startsWith('/')) return e
  if (!e) return t
  const n = t.split('/'),
    r = e.split('/'),
    o = r[r.length - 1]
  ;(o === '..' || o === '.') && r.push('')
  let s = n.length - 1,
    i,
    a
  for (i = 0; i < r.length; i++)
    if (((a = r[i]), a !== '.'))
      if (a === '..') s > 1 && s--
      else break
  return n.slice(0, s).join('/') + '/' + r.slice(i).join('/')
}
const st = {
  path: '/',
  name: void 0,
  params: {},
  query: {},
  hash: '',
  fullPath: '/',
  matched: [],
  meta: {},
  redirectedFrom: void 0
}
var Sn
;(function (e) {
  ;(e.pop = 'pop'), (e.push = 'push')
})(Sn || (Sn = {}))
var mn
;(function (e) {
  ;(e.back = 'back'), (e.forward = 'forward'), (e.unknown = '')
})(mn || (mn = {}))
function Wf(e) {
  if (!e)
    if (Bt) {
      const t = document.querySelector('base')
      ;(e = (t && t.getAttribute('href')) || '/'), (e = e.replace(/^\w+:\/\/[^\/]+/, ''))
    } else e = '/'
  return e[0] !== '/' && e[0] !== '#' && (e = '/' + e), Df(e)
}
const Gf = /^[^#]+#/
function Qf(e, t) {
  return e.replace(Gf, '#') + t
}
function Yf(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect()
  return { behavior: t.behavior, left: r.left - n.left - (t.left || 0), top: r.top - n.top - (t.top || 0) }
}
const _r = () => ({ left: window.scrollX, top: window.scrollY })
function Xf(e) {
  let t
  if ('el' in e) {
    const n = e.el,
      r = typeof n == 'string' && n.startsWith('#'),
      o = typeof n == 'string' ? (r ? document.getElementById(n.slice(1)) : document.querySelector(n)) : n
    if (!o) return
    t = Yf(o, e)
  } else t = e
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY)
}
function zs(e, t) {
  return (history.state ? history.state.position - t : -1) + e
}
const so = new Map()
function Jf(e, t) {
  so.set(e, t)
}
function Zf(e) {
  const t = so.get(e)
  return so.delete(e), t
}
let ed = () => location.protocol + '//' + location.host
function Kl(e, t) {
  const { pathname: n, search: r, hash: o } = t,
    s = e.indexOf('#')
  if (s > -1) {
    let a = o.includes(e.slice(s)) ? e.slice(s).length : 1,
      l = o.slice(a)
    return l[0] !== '/' && (l = '/' + l), Hs(l, '')
  }
  return Hs(n, e) + r + o
}
function td(e, t, n, r) {
  let o = [],
    s = [],
    i = null
  const a = ({ state: d }) => {
    const g = Kl(e, location),
      b = n.value,
      E = t.value
    let P = 0
    if (d) {
      if (((n.value = g), (t.value = d), i && i === b)) {
        i = null
        return
      }
      P = E ? d.position - E.position : 0
    } else r(g)
    o.forEach((I) => {
      I(n.value, b, { delta: P, type: Sn.pop, direction: P ? (P > 0 ? mn.forward : mn.back) : mn.unknown })
    })
  }
  function l() {
    i = n.value
  }
  function c(d) {
    o.push(d)
    const g = () => {
      const b = o.indexOf(d)
      b > -1 && o.splice(b, 1)
    }
    return s.push(g), g
  }
  function u() {
    const { history: d } = window
    !d.state || d.replaceState(ie({}, d.state, { scroll: _r() }), '')
  }
  function h() {
    for (const d of s) d()
    ;(s = []), window.removeEventListener('popstate', a), window.removeEventListener('beforeunload', u)
  }
  return (
    window.addEventListener('popstate', a),
    window.addEventListener('beforeunload', u, { passive: !0 }),
    { pauseListeners: l, listen: c, destroy: h }
  )
}
function Vs(e, t, n, r = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: o ? _r() : null
  }
}
function nd(e) {
  const { history: t, location: n } = window,
    r = { value: Kl(e, n) },
    o = { value: t.state }
  o.value ||
    s(
      r.value,
      { back: null, current: r.value, forward: null, position: t.length - 1, replaced: !0, scroll: null },
      !0
    )
  function s(l, c, u) {
    const h = e.indexOf('#'),
      d = h > -1 ? (n.host && document.querySelector('base') ? e : e.slice(h)) + l : ed() + e + l
    try {
      t[u ? 'replaceState' : 'pushState'](c, '', d), (o.value = c)
    } catch (g) {
      console.error(g), n[u ? 'replace' : 'assign'](d)
    }
  }
  function i(l, c) {
    const u = ie({}, t.state, Vs(o.value.back, l, o.value.forward, !0), c, { position: o.value.position })
    s(l, u, !0), (r.value = l)
  }
  function a(l, c) {
    const u = ie({}, o.value, t.state, { forward: l, scroll: _r() })
    s(u.current, u, !0)
    const h = ie({}, Vs(r.value, l, null), { position: u.position + 1 }, c)
    s(l, h, !1), (r.value = l)
  }
  return { location: r, state: o, push: a, replace: i }
}
function rd(e) {
  e = Wf(e)
  const t = nd(e),
    n = td(e, t.state, t.location, t.replace)
  function r(s, i = !0) {
    i || n.pauseListeners(), history.go(s)
  }
  const o = ie({ location: '', base: e, go: r, createHref: Qf.bind(null, e) }, t, n)
  return (
    Object.defineProperty(o, 'location', { enumerable: !0, get: () => t.location.value }),
    Object.defineProperty(o, 'state', { enumerable: !0, get: () => t.state.value }),
    o
  )
}
function od(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ''), e.includes('#') || (e += '#'), rd(e)
  )
}
function sd(e) {
  return typeof e == 'string' || (e && typeof e == 'object')
}
function Ul(e) {
  return typeof e == 'string' || typeof e == 'symbol'
}
const Wl = Symbol('')
var Ks
;(function (e) {
  ;(e[(e.aborted = 4)] = 'aborted'),
    (e[(e.cancelled = 8)] = 'cancelled'),
    (e[(e.duplicated = 16)] = 'duplicated')
})(Ks || (Ks = {}))
function Gt(e, t) {
  return ie(new Error(), { type: e, [Wl]: !0 }, t)
}
function Ye(e, t) {
  return e instanceof Error && Wl in e && (t == null || !!(e.type & t))
}
const Us = '[^/]+?',
  id = { sensitive: !1, strict: !1, start: !0, end: !0 },
  ld = /[.+*?^${}()[\]/\\]/g
function ad(e, t) {
  const n = ie({}, id, t),
    r = []
  let o = n.start ? '^' : ''
  const s = []
  for (const c of e) {
    const u = c.length ? [] : [90]
    n.strict && !c.length && (o += '/')
    for (let h = 0; h < c.length; h++) {
      const d = c[h]
      let g = 40 + (n.sensitive ? 0.25 : 0)
      if (d.type === 0) h || (o += '/'), (o += d.value.replace(ld, '\\$&')), (g += 40)
      else if (d.type === 1) {
        const { value: b, repeatable: E, optional: P, regexp: I } = d
        s.push({ name: b, repeatable: E, optional: P })
        const q = I || Us
        if (q !== Us) {
          g += 10
          try {
            new RegExp(`(${q})`)
          } catch (V) {
            throw new Error(`Invalid custom RegExp for param "${b}" (${q}): ` + V.message)
          }
        }
        let k = E ? `((?:${q})(?:/(?:${q}))*)` : `(${q})`
        h || (k = P && c.length < 2 ? `(?:/${k})` : '/' + k),
          P && (k += '?'),
          (o += k),
          (g += 20),
          P && (g += -8),
          E && (g += -20),
          q === '.*' && (g += -50)
      }
      u.push(g)
    }
    r.push(u)
  }
  if (n.strict && n.end) {
    const c = r.length - 1
    r[c][r[c].length - 1] += 0.7000000000000001
  }
  n.strict || (o += '/?'), n.end ? (o += '$') : n.strict && (o += '(?:/|$)')
  const i = new RegExp(o, n.sensitive ? '' : 'i')
  function a(c) {
    const u = c.match(i),
      h = {}
    if (!u) return null
    for (let d = 1; d < u.length; d++) {
      const g = u[d] || '',
        b = s[d - 1]
      h[b.name] = g && b.repeatable ? g.split('/') : g
    }
    return h
  }
  function l(c) {
    let u = '',
      h = !1
    for (const d of e) {
      ;(!h || !u.endsWith('/')) && (u += '/'), (h = !1)
      for (const g of d)
        if (g.type === 0) u += g.value
        else if (g.type === 1) {
          const { value: b, repeatable: E, optional: P } = g,
            I = b in c ? c[b] : ''
          if (De(I) && !E)
            throw new Error(`Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`)
          const q = De(I) ? I.join('/') : I
          if (!q)
            if (P) d.length < 2 && (u.endsWith('/') ? (u = u.slice(0, -1)) : (h = !0))
            else throw new Error(`Missing required param "${b}"`)
          u += q
        }
    }
    return u || '/'
  }
  return { re: i, score: r, keys: s, parse: a, stringify: l }
}
function cd(e, t) {
  let n = 0
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n]
    if (r) return r
    n++
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
      ? t.length === 1 && t[0] === 40 + 40
        ? 1
        : -1
      : 0
}
function Gl(e, t) {
  let n = 0
  const r = e.score,
    o = t.score
  for (; n < r.length && n < o.length; ) {
    const s = cd(r[n], o[n])
    if (s) return s
    n++
  }
  if (Math.abs(o.length - r.length) === 1) {
    if (Ws(r)) return 1
    if (Ws(o)) return -1
  }
  return o.length - r.length
}
function Ws(e) {
  const t = e[e.length - 1]
  return e.length > 0 && t[t.length - 1] < 0
}
const ud = { type: 0, value: '' },
  fd = /[a-zA-Z0-9_]/
function dd(e) {
  if (!e) return [[]]
  if (e === '/') return [[ud]]
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`)
  function t(g) {
    throw new Error(`ERR (${n})/"${c}": ${g}`)
  }
  let n = 0,
    r = n
  const o = []
  let s
  function i() {
    s && o.push(s), (s = [])
  }
  let a = 0,
    l,
    c = '',
    u = ''
  function h() {
    !c ||
      (n === 0
        ? s.push({ type: 0, value: c })
        : n === 1 || n === 2 || n === 3
          ? (s.length > 1 &&
              (l === '*' || l === '+') &&
              t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),
            s.push({
              type: 1,
              value: c,
              regexp: u,
              repeatable: l === '*' || l === '+',
              optional: l === '*' || l === '?'
            }))
          : t('Invalid state to consume buffer'),
      (c = ''))
  }
  function d() {
    c += l
  }
  for (; a < e.length; ) {
    if (((l = e[a++]), l === '\\' && n !== 2)) {
      ;(r = n), (n = 4)
      continue
    }
    switch (n) {
      case 0:
        l === '/' ? (c && h(), i()) : l === ':' ? (h(), (n = 1)) : d()
        break
      case 4:
        d(), (n = r)
        break
      case 1:
        l === '(' ? (n = 2) : fd.test(l) ? d() : (h(), (n = 0), l !== '*' && l !== '?' && l !== '+' && a--)
        break
      case 2:
        l === ')' ? (u[u.length - 1] == '\\' ? (u = u.slice(0, -1) + l) : (n = 3)) : (u += l)
        break
      case 3:
        h(), (n = 0), l !== '*' && l !== '?' && l !== '+' && a--, (u = '')
        break
      default:
        t('Unknown state')
        break
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${c}"`), h(), i(), o
}
function hd(e, t, n) {
  const r = ad(dd(e.path), n),
    o = ie(r, { record: e, parent: t, children: [], alias: [] })
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o
}
function pd(e, t) {
  const n = [],
    r = new Map()
  t = Ys({ strict: !1, end: !0, sensitive: !1 }, t)
  function o(h) {
    return r.get(h)
  }
  function s(h, d, g) {
    const b = !g,
      E = gd(h)
    E.aliasOf = g && g.record
    const P = Ys(t, h),
      I = [E]
    if ('alias' in h) {
      const V = typeof h.alias == 'string' ? [h.alias] : h.alias
      for (const j of V)
        I.push(
          ie({}, E, {
            components: g ? g.record.components : E.components,
            path: j,
            aliasOf: g ? g.record : E
          })
        )
    }
    let q, k
    for (const V of I) {
      const { path: j } = V
      if (d && j[0] !== '/') {
        const L = d.record.path,
          z = L[L.length - 1] === '/' ? '' : '/'
        V.path = d.record.path + (j && z + j)
      }
      if (
        ((q = hd(V, d, P)),
        g ? g.alias.push(q) : ((k = k || q), k !== q && k.alias.push(q), b && h.name && !Qs(q) && i(h.name)),
        Ql(q) && l(q),
        E.children)
      ) {
        const L = E.children
        for (let z = 0; z < L.length; z++) s(L[z], q, g && g.children[z])
      }
      g = g || q
    }
    return k
      ? () => {
          i(k)
        }
      : gn
  }
  function i(h) {
    if (Ul(h)) {
      const d = r.get(h)
      d && (r.delete(h), n.splice(n.indexOf(d), 1), d.children.forEach(i), d.alias.forEach(i))
    } else {
      const d = n.indexOf(h)
      d > -1 &&
        (n.splice(d, 1), h.record.name && r.delete(h.record.name), h.children.forEach(i), h.alias.forEach(i))
    }
  }
  function a() {
    return n
  }
  function l(h) {
    const d = _d(h, n)
    n.splice(d, 0, h), h.record.name && !Qs(h) && r.set(h.record.name, h)
  }
  function c(h, d) {
    let g,
      b = {},
      E,
      P
    if ('name' in h && h.name) {
      if (((g = r.get(h.name)), !g)) throw Gt(1, { location: h })
      ;(P = g.record.name),
        (b = ie(
          Gs(
            d.params,
            g.keys
              .filter((k) => !k.optional)
              .concat(g.parent ? g.parent.keys.filter((k) => k.optional) : [])
              .map((k) => k.name)
          ),
          h.params &&
            Gs(
              h.params,
              g.keys.map((k) => k.name)
            )
        )),
        (E = g.stringify(b))
    } else if (h.path != null)
      (E = h.path), (g = n.find((k) => k.re.test(E))), g && ((b = g.parse(E)), (P = g.record.name))
    else {
      if (((g = d.name ? r.get(d.name) : n.find((k) => k.re.test(d.path))), !g))
        throw Gt(1, { location: h, currentLocation: d })
      ;(P = g.record.name), (b = ie({}, d.params, h.params)), (E = g.stringify(b))
    }
    const I = []
    let q = g
    for (; q; ) I.unshift(q.record), (q = q.parent)
    return { name: P, path: E, params: b, matched: I, meta: vd(I) }
  }
  e.forEach((h) => s(h))
  function u() {
    ;(n.length = 0), r.clear()
  }
  return { addRoute: s, resolve: c, removeRoute: i, clearRoutes: u, getRoutes: a, getRecordMatcher: o }
}
function Gs(e, t) {
  const n = {}
  for (const r of t) r in e && (n[r] = e[r])
  return n
}
function gd(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: md(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components: 'components' in e ? e.components || null : e.component && { default: e.component }
  }
}
function md(e) {
  const t = {},
    n = e.props || !1
  if ('component' in e) t.default = n
  else for (const r in e.components) t[r] = typeof n == 'object' ? n[r] : n
  return t
}
function Qs(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0
    e = e.parent
  }
  return !1
}
function vd(e) {
  return e.reduce((t, n) => ie(t, n.meta), {})
}
function Ys(e, t) {
  const n = {}
  for (const r in e) n[r] = r in t ? t[r] : e[r]
  return n
}
function _d(e, t) {
  let n = 0,
    r = t.length
  for (; n !== r; ) {
    const s = (n + r) >> 1
    Gl(e, t[s]) < 0 ? (r = s) : (n = s + 1)
  }
  const o = yd(e)
  return o && (r = t.lastIndexOf(o, r - 1)), r
}
function yd(e) {
  let t = e
  for (; (t = t.parent); ) if (Ql(t) && Gl(e, t) === 0) return t
}
function Ql({ record: e }) {
  return !!(e.name || (e.components && Object.keys(e.components).length) || e.redirect)
}
function bd(e) {
  const t = {}
  if (e === '' || e === '?') return t
  const r = (e[0] === '?' ? e.slice(1) : e).split('&')
  for (let o = 0; o < r.length; ++o) {
    const s = r[o].replace(Bl, ' '),
      i = s.indexOf('='),
      a = Cn(i < 0 ? s : s.slice(0, i)),
      l = i < 0 ? null : Cn(s.slice(i + 1))
    if (a in t) {
      let c = t[a]
      De(c) || (c = t[a] = [c]), c.push(l)
    } else t[a] = l
  }
  return t
}
function Xs(e) {
  let t = ''
  for (let n in e) {
    const r = e[n]
    if (((n = jf(n)), r == null)) {
      r !== void 0 && (t += (t.length ? '&' : '') + n)
      continue
    }
    ;(De(r) ? r.map((s) => s && oo(s)) : [r && oo(r)]).forEach((s) => {
      s !== void 0 && ((t += (t.length ? '&' : '') + n), s != null && (t += '=' + s))
    })
  }
  return t
}
function wd(e) {
  const t = {}
  for (const n in e) {
    const r = e[n]
    r !== void 0 && (t[n] = De(r) ? r.map((o) => (o == null ? null : '' + o)) : r == null ? r : '' + r)
  }
  return t
}
const xd = Symbol(''),
  Js = Symbol(''),
  qo = Symbol(''),
  Yl = Symbol(''),
  io = Symbol('')
function tn() {
  let e = []
  function t(r) {
    return (
      e.push(r),
      () => {
        const o = e.indexOf(r)
        o > -1 && e.splice(o, 1)
      }
    )
  }
  function n() {
    e = []
  }
  return { add: t, list: () => e.slice(), reset: n }
}
function ft(e, t, n, r, o, s = (i) => i()) {
  const i = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || [])
  return () =>
    new Promise((a, l) => {
      const c = (d) => {
          d === !1
            ? l(Gt(4, { from: n, to: t }))
            : d instanceof Error
              ? l(d)
              : sd(d)
                ? l(Gt(2, { from: t, to: d }))
                : (i && r.enterCallbacks[o] === i && typeof d == 'function' && i.push(d), a())
        },
        u = s(() => e.call(r && r.instances[o], t, n, c))
      let h = Promise.resolve(u)
      e.length < 3 && (h = h.then(c)), h.catch((d) => l(d))
    })
}
function Mr(e, t, n, r, o = (s) => s()) {
  const s = []
  for (const i of e)
    for (const a in i.components) {
      let l = i.components[a]
      if (!(t !== 'beforeRouteEnter' && !i.instances[a]))
        if (Ed(l)) {
          const u = (l.__vccOpts || l)[t]
          u && s.push(ft(u, n, r, i, a, o))
        } else {
          let c = l()
          s.push(() =>
            c.then((u) => {
              if (!u) return Promise.reject(new Error(`Couldn't resolve component "${a}" at "${i.path}"`))
              const h = Rf(u) ? u.default : u
              i.components[a] = h
              const g = (h.__vccOpts || h)[t]
              return g && ft(g, n, r, i, a, o)()
            })
          )
        }
    }
  return s
}
function Ed(e) {
  return typeof e == 'object' || 'displayName' in e || 'props' in e || '__vccOpts' in e
}
function Zs(e) {
  const t = et(qo),
    n = et(Yl),
    r = K(() => {
      const l = kt(e.to)
      return t.resolve(l)
    }),
    o = K(() => {
      const { matched: l } = r.value,
        { length: c } = l,
        u = l[c - 1],
        h = n.matched
      if (!u || !h.length) return -1
      const d = h.findIndex(Wt.bind(null, u))
      if (d > -1) return d
      const g = ei(l[c - 2])
      return c > 1 && ei(u) === g && h[h.length - 1].path !== g ? h.findIndex(Wt.bind(null, l[c - 2])) : d
    }),
    s = K(() => o.value > -1 && Rd(n.params, r.value.params)),
    i = K(() => o.value > -1 && o.value === n.matched.length - 1 && Vl(n.params, r.value.params))
  function a(l = {}) {
    return Pd(l) ? t[kt(e.replace) ? 'replace' : 'push'](kt(e.to)).catch(gn) : Promise.resolve()
  }
  return { route: r, href: K(() => r.value.href), isActive: s, isExactActive: i, navigate: a }
}
const Cd = Lo({
    name: 'RouterLink',
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: 'page' }
    },
    useLink: Zs,
    setup(e, { slots: t }) {
      const n = Xt(Zs(e)),
        { options: r } = et(qo),
        o = K(() => ({
          [ti(e.activeClass, r.linkActiveClass, 'router-link-active')]: n.isActive,
          [ti(e.exactActiveClass, r.linkExactActiveClass, 'router-link-exact-active')]: n.isExactActive
        }))
      return () => {
        const s = t.default && t.default(n)
        return e.custom
          ? s
          : D(
              'a',
              {
                'aria-current': n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: o.value
              },
              s
            )
      }
    }
  }),
  Sd = Cd
function Pd(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute('target')
      if (/\b_blank\b/i.test(t)) return
    }
    return e.preventDefault && e.preventDefault(), !0
  }
}
function Rd(e, t) {
  for (const n in t) {
    const r = t[n],
      o = e[n]
    if (typeof r == 'string') {
      if (r !== o) return !1
    } else if (!De(o) || o.length !== r.length || r.some((s, i) => s !== o[i])) return !1
  }
  return !0
}
function ei(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : ''
}
const ti = (e, t, n) => (e != null ? e : t != null ? t : n),
  Td = Lo({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = et(io),
        o = K(() => e.route || r.value),
        s = et(Js, 0),
        i = K(() => {
          let c = kt(s)
          const { matched: u } = o.value
          let h
          for (; (h = u[c]) && !h.components; ) c++
          return c
        }),
        a = K(() => o.value.matched[i.value])
      Vn(
        Js,
        K(() => i.value + 1)
      ),
        Vn(xd, a),
        Vn(io, o)
      const l = Vt()
      return (
        Kn(
          () => [l.value, a.value, e.name],
          ([c, u, h], [d, g, b]) => {
            u &&
              ((u.instances[h] = c),
              g &&
                g !== u &&
                c &&
                c === d &&
                (u.leaveGuards.size || (u.leaveGuards = g.leaveGuards),
                u.updateGuards.size || (u.updateGuards = g.updateGuards))),
              c && u && (!g || !Wt(u, g) || !d) && (u.enterCallbacks[h] || []).forEach((E) => E(c))
          },
          { flush: 'post' }
        ),
        () => {
          const c = o.value,
            u = e.name,
            h = a.value,
            d = h && h.components[u]
          if (!d) return ni(n.default, { Component: d, route: c })
          const g = h.props[u],
            b = g ? (g === !0 ? c.params : typeof g == 'function' ? g(c) : g) : null,
            P = D(
              d,
              ie({}, b, t, {
                onVnodeUnmounted: (I) => {
                  I.component.isUnmounted && (h.instances[u] = null)
                },
                ref: l
              })
            )
          return ni(n.default, { Component: P, route: c }) || P
        }
      )
    }
  })
function ni(e, t) {
  if (!e) return null
  const n = e(t)
  return n.length === 1 ? n[0] : n
}
const Ld = Td
function kd(e) {
  const t = pd(e.routes, e),
    n = e.parseQuery || bd,
    r = e.stringifyQuery || Xs,
    o = e.history,
    s = tn(),
    i = tn(),
    a = tn(),
    l = Za(st)
  let c = st
  Bt && e.scrollBehavior && 'scrollRestoration' in history && (history.scrollRestoration = 'manual')
  const u = Or.bind(null, (_) => '' + _),
    h = Or.bind(null, Bf),
    d = Or.bind(null, Cn)
  function g(_, O) {
    let T, N
    return Ul(_) ? ((T = t.getRecordMatcher(_)), (N = O)) : (N = _), t.addRoute(N, T)
  }
  function b(_) {
    const O = t.getRecordMatcher(_)
    O && t.removeRoute(O)
  }
  function E() {
    return t.getRoutes().map((_) => _.record)
  }
  function P(_) {
    return !!t.getRecordMatcher(_)
  }
  function I(_, O) {
    if (((O = ie({}, O || l.value)), typeof _ == 'string')) {
      const p = $r(n, _, O.path),
        m = t.resolve({ path: p.path }, O),
        y = o.createHref(p.fullPath)
      return ie(p, m, { params: d(m.params), hash: Cn(p.hash), redirectedFrom: void 0, href: y })
    }
    let T
    if (_.path != null) T = ie({}, _, { path: $r(n, _.path, O.path).path })
    else {
      const p = ie({}, _.params)
      for (const m in p) p[m] == null && delete p[m]
      ;(T = ie({}, _, { params: h(p) })), (O.params = h(O.params))
    }
    const N = t.resolve(T, O),
      oe = _.hash || ''
    N.params = u(d(N.params))
    const fe = zf(r, ie({}, _, { hash: Nf(oe), path: N.path })),
      f = o.createHref(fe)
    return ie({ fullPath: fe, hash: oe, query: r === Xs ? wd(_.query) : _.query || {} }, N, {
      redirectedFrom: void 0,
      href: f
    })
  }
  function q(_) {
    return typeof _ == 'string' ? $r(n, _, l.value.path) : ie({}, _)
  }
  function k(_, O) {
    if (c !== _) return Gt(8, { from: O, to: _ })
  }
  function V(_) {
    return z(_)
  }
  function j(_) {
    return V(ie(q(_), { replace: !0 }))
  }
  function L(_) {
    const O = _.matched[_.matched.length - 1]
    if (O && O.redirect) {
      const { redirect: T } = O
      let N = typeof T == 'function' ? T(_) : T
      return (
        typeof N == 'string' &&
          ((N = N.includes('?') || N.includes('#') ? (N = q(N)) : { path: N }), (N.params = {})),
        ie({ query: _.query, hash: _.hash, params: N.path != null ? {} : _.params }, N)
      )
    }
  }
  function z(_, O) {
    const T = (c = I(_)),
      N = l.value,
      oe = _.state,
      fe = _.force,
      f = _.replace === !0,
      p = L(T)
    if (p)
      return z(
        ie(q(p), { state: typeof p == 'object' ? ie({}, oe, p.state) : oe, force: fe, replace: f }),
        O || T
      )
    const m = T
    m.redirectedFrom = O
    let y
    return (
      !fe && Vf(r, N, T) && ((y = Gt(16, { to: m, from: N })), ze(N, N, !0, !1)),
      (y ? Promise.resolve(y) : Y(m, N))
        .catch((v) => (Ye(v) ? (Ye(v, 2) ? v : nt(v)) : re(v, m, N)))
        .then((v) => {
          if (v) {
            if (Ye(v, 2))
              return z(
                ie({ replace: f }, q(v.to), {
                  state: typeof v.to == 'object' ? ie({}, oe, v.to.state) : oe,
                  force: fe
                }),
                O || m
              )
          } else v = M(m, N, !0, f, oe)
          return G(m, N, v), v
        })
    )
  }
  function J(_, O) {
    const T = k(_, O)
    return T ? Promise.reject(T) : Promise.resolve()
  }
  function F(_) {
    const O = Mt.values().next().value
    return O && typeof O.runWithContext == 'function' ? O.runWithContext(_) : _()
  }
  function Y(_, O) {
    let T
    const [N, oe, fe] = Ad(_, O)
    T = Mr(N.reverse(), 'beforeRouteLeave', _, O)
    for (const p of N)
      p.leaveGuards.forEach((m) => {
        T.push(ft(m, _, O))
      })
    const f = J.bind(null, _, O)
    return (
      T.push(f),
      _e(T)
        .then(() => {
          T = []
          for (const p of s.list()) T.push(ft(p, _, O))
          return T.push(f), _e(T)
        })
        .then(() => {
          T = Mr(oe, 'beforeRouteUpdate', _, O)
          for (const p of oe)
            p.updateGuards.forEach((m) => {
              T.push(ft(m, _, O))
            })
          return T.push(f), _e(T)
        })
        .then(() => {
          T = []
          for (const p of fe)
            if (p.beforeEnter)
              if (De(p.beforeEnter)) for (const m of p.beforeEnter) T.push(ft(m, _, O))
              else T.push(ft(p.beforeEnter, _, O))
          return T.push(f), _e(T)
        })
        .then(
          () => (
            _.matched.forEach((p) => (p.enterCallbacks = {})),
            (T = Mr(fe, 'beforeRouteEnter', _, O, F)),
            T.push(f),
            _e(T)
          )
        )
        .then(() => {
          T = []
          for (const p of i.list()) T.push(ft(p, _, O))
          return T.push(f), _e(T)
        })
        .catch((p) => (Ye(p, 8) ? p : Promise.reject(p)))
    )
  }
  function G(_, O, T) {
    a.list().forEach((N) => F(() => N(_, O, T)))
  }
  function M(_, O, T, N, oe) {
    const fe = k(_, O)
    if (fe) return fe
    const f = O === st,
      p = Bt ? history.state : {}
    T && (N || f ? o.replace(_.fullPath, ie({ scroll: f && p && p.scroll }, oe)) : o.push(_.fullPath, oe)),
      (l.value = _),
      ze(_, O, T, f),
      nt()
  }
  let Z
  function A() {
    Z ||
      (Z = o.listen((_, O, T) => {
        if (!kn.listening) return
        const N = I(_),
          oe = L(N)
        if (oe) {
          z(ie(oe, { replace: !0 }), N).catch(gn)
          return
        }
        c = N
        const fe = l.value
        Bt && Jf(zs(fe.fullPath, T.delta), _r()),
          Y(N, fe)
            .catch((f) =>
              Ye(f, 12)
                ? f
                : Ye(f, 2)
                  ? (z(f.to, N)
                      .then((p) => {
                        Ye(p, 20) && !T.delta && T.type === Sn.pop && o.go(-1, !1)
                      })
                      .catch(gn),
                    Promise.reject())
                  : (T.delta && o.go(-T.delta, !1), re(f, N, fe))
            )
            .then((f) => {
              ;(f = f || M(N, fe, !1)),
                f &&
                  (T.delta && !Ye(f, 8)
                    ? o.go(-T.delta, !1)
                    : T.type === Sn.pop && Ye(f, 20) && o.go(-1, !1)),
                G(N, fe, f)
            })
            .catch(gn)
      }))
  }
  let te = tn(),
    ae = tn(),
    le
  function re(_, O, T) {
    nt(_)
    const N = ae.list()
    return N.length ? N.forEach((oe) => oe(_, O, T)) : console.error(_), Promise.reject(_)
  }
  function Qe() {
    return le && l.value !== st
      ? Promise.resolve()
      : new Promise((_, O) => {
          te.add([_, O])
        })
  }
  function nt(_) {
    return le || ((le = !_), A(), te.list().forEach(([O, T]) => (_ ? T(_) : O())), te.reset()), _
  }
  function ze(_, O, T, N) {
    const { scrollBehavior: oe } = e
    if (!Bt || !oe) return Promise.resolve()
    const fe = (!T && Zf(zs(_.fullPath, 0))) || ((N || !T) && history.state && history.state.scroll) || null
    return Vi()
      .then(() => oe(_, O, fe))
      .then((f) => f && Xf(f))
      .catch((f) => re(f, _, O))
  }
  const Ee = (_) => o.go(_)
  let $t
  const Mt = new Set(),
    kn = {
      currentRoute: l,
      listening: !0,
      addRoute: g,
      removeRoute: b,
      clearRoutes: t.clearRoutes,
      hasRoute: P,
      getRoutes: E,
      resolve: I,
      options: e,
      push: V,
      replace: j,
      go: Ee,
      back: () => Ee(-1),
      forward: () => Ee(1),
      beforeEach: s.add,
      beforeResolve: i.add,
      afterEach: a.add,
      onError: ae.add,
      isReady: Qe,
      install(_) {
        const O = this
        _.component('RouterLink', Sd),
          _.component('RouterView', Ld),
          (_.config.globalProperties.$router = O),
          Object.defineProperty(_.config.globalProperties, '$route', { enumerable: !0, get: () => kt(l) }),
          Bt && !$t && l.value === st && (($t = !0), V(o.location).catch((oe) => {}))
        const T = {}
        for (const oe in st) Object.defineProperty(T, oe, { get: () => l.value[oe], enumerable: !0 })
        _.provide(qo, O), _.provide(Yl, qi(T)), _.provide(io, l)
        const N = _.unmount
        Mt.add(_),
          (_.unmount = function () {
            Mt.delete(_),
              Mt.size < 1 && ((c = st), Z && Z(), (Z = null), (l.value = st), ($t = !1), (le = !1)),
              N()
          })
      }
    }
  function _e(_) {
    return _.reduce((O, T) => O.then(() => F(T)), Promise.resolve())
  }
  return kn
}
function Ad(e, t) {
  const n = [],
    r = [],
    o = [],
    s = Math.max(t.matched.length, e.matched.length)
  for (let i = 0; i < s; i++) {
    const a = t.matched[i]
    a && (e.matched.find((c) => Wt(c, a)) ? r.push(a) : n.push(a))
    const l = e.matched[i]
    l && (t.matched.find((c) => Wt(c, l)) || o.push(l))
  }
  return [n, r, o]
}
const Od = [
  {
    path: '/',
    component: () =>
      Hn(
        () => import('./MainLayout.34eba0f2.js'),
        ['assets/MainLayout.34eba0f2.js', 'assets/QResizeObserver.b6230316.js']
      ),
    children: [
      {
        path: '',
        component: () =>
          Hn(
            () => import('./IndexPage.339c2f0c.js'),
            ['assets/IndexPage.339c2f0c.js', 'assets/QResizeObserver.b6230316.js', 'assets/axios.bf56c3c5.js']
          )
      }
    ]
  },
  { path: '/:catchAll(.*)*', component: () => Hn(() => import('./ErrorNotFound.4a3f91b4.js'), []) }
]
var Ir = function () {
  return kd({ scrollBehavior: () => ({ left: 0, top: 0 }), routes: Od, history: od('/') })
}
async function $d(e, t) {
  const n = e(Ef)
  n.use(xf, t)
  const r = typeof Ar == 'function' ? await Ar({}) : Ar
  n.use(r)
  const o = Jt(typeof Ir == 'function' ? await Ir({ store: r }) : Ir)
  return (
    r.use(({ store: s }) => {
      s.router = o
    }),
    { app: n, store: r, router: o }
  )
}
const lo = { xs: 18, sm: 24, md: 32, lg: 38, xl: 46 },
  No = { size: String }
function jo(e, t = lo) {
  return K(() => (e.size !== void 0 ? { fontSize: e.size in t ? `${t[e.size]}px` : e.size } : null))
}
function Md(e, t) {
  return (e !== void 0 && e()) || t
}
function Hh(e, t) {
  if (e !== void 0) {
    const n = e()
    if (n != null) return n.slice()
  }
  return t
}
function sn(e, t) {
  return e !== void 0 ? t.concat(e()) : t
}
function Id(e, t) {
  return e === void 0 ? t : t !== void 0 ? t.concat(e()) : e()
}
function Dh(e, t, n, r, o, s) {
  t.key = r + o
  const i = D(e, t, n)
  return o === !0 ? Zi(i, s()) : i
}
const ri = '0 0 24 24',
  oi = (e) => e,
  qr = (e) => `ionicons ${e}`,
  Xl = {
    'mdi-': (e) => `mdi ${e}`,
    'icon-': oi,
    'bt-': (e) => `bt ${e}`,
    'eva-': (e) => `eva ${e}`,
    'ion-md': qr,
    'ion-ios': qr,
    'ion-logo': qr,
    'iconfont ': oi,
    'ti-': (e) => `themify-icon ${e}`,
    'bi-': (e) => `bootstrap-icons ${e}`
  },
  Jl = { o_: '-outlined', r_: '-round', s_: '-sharp' },
  Zl = { sym_o_: '-outlined', sym_r_: '-rounded', sym_s_: '-sharp' },
  qd = new RegExp('^(' + Object.keys(Xl).join('|') + ')'),
  Nd = new RegExp('^(' + Object.keys(Jl).join('|') + ')'),
  si = new RegExp('^(' + Object.keys(Zl).join('|') + ')'),
  jd = /^[Mm]\s?[-+]?\.?\d/,
  Fd = /^img:/,
  Bd = /^svguse:/,
  Hd = /^ion-/,
  Dd = /^(fa-(sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /
var rr = Tn({
    name: 'QIcon',
    props: {
      ...No,
      tag: { type: String, default: 'i' },
      name: String,
      color: String,
      left: Boolean,
      right: Boolean
    },
    setup(e, { slots: t }) {
      const {
          proxy: { $q: n }
        } = Pn(),
        r = jo(e),
        o = K(
          () =>
            'q-icon' +
            (e.left === !0 ? ' on-left' : '') +
            (e.right === !0 ? ' on-right' : '') +
            (e.color !== void 0 ? ` text-${e.color}` : '')
        ),
        s = K(() => {
          let i,
            a = e.name
          if (a === 'none' || !a) return { none: !0 }
          if (n.iconMapFn !== null) {
            const u = n.iconMapFn(a)
            if (u !== void 0)
              if (u.icon !== void 0) {
                if (((a = u.icon), a === 'none' || !a)) return { none: !0 }
              } else return { cls: u.cls, content: u.content !== void 0 ? u.content : ' ' }
          }
          if (jd.test(a) === !0) {
            const [u, h = ri] = a.split('|')
            return {
              svg: !0,
              viewBox: h,
              nodes: u.split('&&').map((d) => {
                const [g, b, E] = d.split('@@')
                return D('path', { style: b, d: g, transform: E })
              })
            }
          }
          if (Fd.test(a) === !0) return { img: !0, src: a.substring(4) }
          if (Bd.test(a) === !0) {
            const [u, h = ri] = a.split('|')
            return { svguse: !0, src: u.substring(7), viewBox: h }
          }
          let l = ' '
          const c = a.match(qd)
          if (c !== null) i = Xl[c[1]](a)
          else if (Dd.test(a) === !0) i = a
          else if (Hd.test(a) === !0)
            i = `ionicons ion-${n.platform.is.ios === !0 ? 'ios' : 'md'}${a.substring(3)}`
          else if (si.test(a) === !0) {
            i = 'notranslate material-symbols'
            const u = a.match(si)
            u !== null && ((a = a.substring(6)), (i += Zl[u[1]])), (l = a)
          } else {
            i = 'notranslate material-icons'
            const u = a.match(Nd)
            u !== null && ((a = a.substring(2)), (i += Jl[u[1]])), (l = a)
          }
          return { cls: i, content: l }
        })
      return () => {
        const i = { class: o.value, style: r.value, 'aria-hidden': 'true', role: 'presentation' }
        return s.value.none === !0
          ? D(e.tag, i, Md(t.default))
          : s.value.img === !0
            ? D(e.tag, i, sn(t.default, [D('img', { src: s.value.src })]))
            : s.value.svg === !0
              ? D(
                  e.tag,
                  i,
                  sn(t.default, [D('svg', { viewBox: s.value.viewBox || '0 0 24 24' }, s.value.nodes)])
                )
              : s.value.svguse === !0
                ? D(
                    e.tag,
                    i,
                    sn(t.default, [
                      D('svg', { viewBox: s.value.viewBox }, [D('use', { 'xlink:href': s.value.src })])
                    ])
                  )
                : (s.value.cls !== void 0 && (i.class += ' ' + s.value.cls),
                  D(e.tag, i, sn(t.default, [s.value.content])))
      }
    }
  }),
  zd = Tn({
    name: 'QAvatar',
    props: {
      ...No,
      fontSize: String,
      color: String,
      textColor: String,
      icon: String,
      square: Boolean,
      rounded: Boolean
    },
    setup(e, { slots: t }) {
      const n = jo(e),
        r = K(
          () =>
            'q-avatar' +
            (e.color ? ` bg-${e.color}` : '') +
            (e.textColor ? ` text-${e.textColor} q-chip--colored` : '') +
            (e.square === !0 ? ' q-avatar--square' : e.rounded === !0 ? ' rounded-borders' : '')
        ),
        o = K(() => (e.fontSize ? { fontSize: e.fontSize } : null))
      return () => {
        const s = e.icon !== void 0 ? [D(rr, { name: e.icon })] : void 0
        return D('div', { class: r.value, style: n.value }, [
          D(
            'div',
            { class: 'q-avatar__content row flex-center overflow-hidden', style: o.value },
            Id(t.default, s)
          )
        ])
      }
    }
  })
const Vd = { size: { type: [String, Number], default: '1em' }, color: String }
function Kd(e) {
  return {
    cSize: K(() => (e.size in lo ? `${lo[e.size]}px` : e.size)),
    classes: K(() => 'q-spinner' + (e.color ? ` text-${e.color}` : ''))
  }
}
var Fo = Tn({
  name: 'QSpinner',
  props: { ...Vd, thickness: { type: Number, default: 5 } },
  setup(e) {
    const { cSize: t, classes: n } = Kd(e)
    return () =>
      D(
        'svg',
        { class: n.value + ' q-spinner-mat', width: t.value, height: t.value, viewBox: '25 25 50 50' },
        [
          D('circle', {
            class: 'path',
            cx: '50',
            cy: '50',
            r: '20',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': e.thickness,
            'stroke-miterlimit': '10'
          })
        ]
      )
  }
})
function ao(e, t) {
  const n = e.style
  for (const r in t) n[r] = t[r]
}
function Ud(e) {
  if (e == null) return
  if (typeof e == 'string')
    try {
      return document.querySelector(e) || void 0
    } catch {
      return
    }
  const t = kt(e)
  if (t) return t.$el || t
}
function zh(e, t) {
  if (e == null || e.contains(t) === !0) return !0
  for (let n = e.nextElementSibling; n !== null; n = n.nextElementSibling) if (n.contains(t)) return !0
  return !1
}
function Wd(e, t = 250) {
  let n = !1,
    r
  return function () {
    return (
      n === !1 &&
        ((n = !0),
        setTimeout(() => {
          n = !1
        }, t),
        (r = e.apply(this, arguments))),
      r
    )
  }
}
function ii(e, t, n, r) {
  n.modifiers.stop === !0 && $l(e)
  const o = n.modifiers.color
  let s = n.modifiers.center
  s = s === !0 || r === !0
  const i = document.createElement('span'),
    a = document.createElement('span'),
    l = Zu(e),
    { left: c, top: u, width: h, height: d } = t.getBoundingClientRect(),
    g = Math.sqrt(h * h + d * d),
    b = g / 2,
    E = `${(h - g) / 2}px`,
    P = s ? E : `${l.left - c - b}px`,
    I = `${(d - g) / 2}px`,
    q = s ? I : `${l.top - u - b}px`
  ;(a.className = 'q-ripple__inner'),
    ao(a, {
      height: `${g}px`,
      width: `${g}px`,
      transform: `translate3d(${P},${q},0) scale3d(.2,.2,1)`,
      opacity: 0
    }),
    (i.className = `q-ripple${o ? ' text-' + o : ''}`),
    i.setAttribute('dir', 'ltr'),
    i.appendChild(a),
    t.appendChild(i)
  const k = () => {
    i.remove(), clearTimeout(V)
  }
  n.abort.push(k)
  let V = setTimeout(() => {
    a.classList.add('q-ripple__inner--enter'),
      (a.style.transform = `translate3d(${E},${I},0) scale3d(1,1,1)`),
      (a.style.opacity = 0.2),
      (V = setTimeout(() => {
        a.classList.remove('q-ripple__inner--enter'),
          a.classList.add('q-ripple__inner--leave'),
          (a.style.opacity = 0),
          (V = setTimeout(() => {
            i.remove(), n.abort.splice(n.abort.indexOf(k), 1)
          }, 275))
      }, 250))
  }, 50)
}
function li(e, { modifiers: t, value: n, arg: r }) {
  const o = Object.assign({}, e.cfg.ripple, t, n)
  e.modifiers = {
    early: o.early === !0,
    stop: o.stop === !0,
    center: o.center === !0,
    color: o.color || r,
    keyCodes: [].concat(o.keyCodes || 13)
  }
}
var Gd = Ju({
  name: 'ripple',
  beforeMount(e, t) {
    const n = t.instance.$.appContext.config.globalProperties.$q.config || {}
    if (n.ripple === !1) return
    const r = {
      cfg: n,
      enabled: t.value !== !1,
      modifiers: {},
      abort: [],
      start(o) {
        r.enabled === !0 &&
          o.qSkipRipple !== !0 &&
          o.type === (r.modifiers.early === !0 ? 'pointerdown' : 'click') &&
          ii(o, e, r, o.qKeyEvent === !0)
      },
      keystart: Wd((o) => {
        r.enabled === !0 &&
          o.qSkipRipple !== !0 &&
          ro(o, r.modifiers.keyCodes) === !0 &&
          o.type === `key${r.modifiers.early === !0 ? 'down' : 'up'}` &&
          ii(o, e, r, !0)
      }, 300)
    }
    li(r, t),
      (e.__qripple = r),
      tf(r, 'main', [
        [e, 'pointerdown', 'start', 'passive'],
        [e, 'click', 'start', 'passive'],
        [e, 'keydown', 'keystart', 'passive'],
        [e, 'keyup', 'keystart', 'passive']
      ])
  },
  updated(e, t) {
    if (t.oldValue !== t.value) {
      const n = e.__qripple
      n !== void 0 &&
        ((n.enabled = t.value !== !1), n.enabled === !0 && Object(t.value) === t.value && li(n, t))
    }
  },
  beforeUnmount(e) {
    const t = e.__qripple
    t !== void 0 &&
      (t.abort.forEach((n) => {
        n()
      }),
      nf(t, 'main'),
      delete e._qripple)
  }
})
const ea = {
    left: 'start',
    center: 'center',
    right: 'end',
    between: 'between',
    around: 'around',
    evenly: 'evenly',
    stretch: 'stretch'
  },
  Qd = Object.keys(ea),
  Yd = { align: { type: String, validator: (e) => Qd.includes(e) } }
function Xd(e) {
  return K(() => {
    const t = e.align === void 0 ? (e.vertical === !0 ? 'stretch' : 'left') : e.align
    return `${e.vertical === !0 ? 'items' : 'justify'}-${ea[t]}`
  })
}
function Vh(e) {
  if (Object(e.$parent) === e.$parent) return e.$parent
  let { parent: t } = e.$
  for (; Object(t) === t; ) {
    if (Object(t.proxy) === t.proxy) return t.proxy
    t = t.parent
  }
}
function Jd(e) {
  return e.appContext.config.globalProperties.$router !== void 0
}
function Kh(e) {
  return e.isUnmounted === !0 || e.isDeactivated === !0
}
function ai(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : ''
}
function ci(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}
function Zd(e, t) {
  for (const n in t) {
    const r = t[n],
      o = e[n]
    if (typeof r == 'string') {
      if (r !== o) return !1
    } else if (Array.isArray(o) === !1 || o.length !== r.length || r.some((s, i) => s !== o[i])) return !1
  }
  return !0
}
function ui(e, t) {
  return Array.isArray(t) === !0
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t
}
function eh(e, t) {
  return Array.isArray(e) === !0 ? ui(e, t) : Array.isArray(t) === !0 ? ui(t, e) : e === t
}
function th(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1
  for (const n in e) if (eh(e[n], t[n]) === !1) return !1
  return !0
}
const ta = { to: [String, Object], replace: Boolean, href: String, target: String, disable: Boolean },
  Uh = {
    ...ta,
    exact: Boolean,
    activeClass: { type: String, default: 'q-router-link--active' },
    exactActiveClass: { type: String, default: 'q-router-link--exact-active' }
  }
function nh({ fallbackTag: e, useDisableForRouterLinkProps: t = !0 } = {}) {
  const n = Pn(),
    { props: r, proxy: o, emit: s } = n,
    i = Jd(n),
    a = K(() => r.disable !== !0 && r.href !== void 0),
    l = K(
      t === !0
        ? () =>
            i === !0 && r.disable !== !0 && a.value !== !0 && r.to !== void 0 && r.to !== null && r.to !== ''
        : () => i === !0 && a.value !== !0 && r.to !== void 0 && r.to !== null && r.to !== ''
    ),
    c = K(() => (l.value === !0 ? q(r.to) : null)),
    u = K(() => c.value !== null),
    h = K(() => a.value === !0 || u.value === !0),
    d = K(() => (r.type === 'a' || h.value === !0 ? 'a' : r.tag || e || 'div')),
    g = K(() =>
      a.value === !0
        ? { href: r.href, target: r.target }
        : u.value === !0
          ? { href: c.value.href, target: r.target }
          : {}
    ),
    b = K(() => {
      if (u.value === !1) return -1
      const { matched: j } = c.value,
        { length: L } = j,
        z = j[L - 1]
      if (z === void 0) return -1
      const J = o.$route.matched
      if (J.length === 0) return -1
      const F = J.findIndex(ci.bind(null, z))
      if (F !== -1) return F
      const Y = ai(j[L - 2])
      return L > 1 && ai(z) === Y && J[J.length - 1].path !== Y ? J.findIndex(ci.bind(null, j[L - 2])) : F
    }),
    E = K(() => u.value === !0 && b.value !== -1 && Zd(o.$route.params, c.value.params)),
    P = K(
      () => E.value === !0 && b.value === o.$route.matched.length - 1 && th(o.$route.params, c.value.params)
    ),
    I = K(() =>
      u.value === !0
        ? P.value === !0
          ? ` ${r.exactActiveClass} ${r.activeClass}`
          : r.exact === !0
            ? ''
            : E.value === !0
              ? ` ${r.activeClass}`
              : ''
        : ''
    )
  function q(j) {
    try {
      return o.$router.resolve(j)
    } catch {}
    return null
  }
  function k(j, { returnRouterError: L, to: z = r.to, replace: J = r.replace } = {}) {
    if (r.disable === !0) return j.preventDefault(), Promise.resolve(!1)
    if (
      j.metaKey ||
      j.altKey ||
      j.ctrlKey ||
      j.shiftKey ||
      (j.button !== void 0 && j.button !== 0) ||
      r.target === '_blank'
    )
      return Promise.resolve(!1)
    j.preventDefault()
    const F = o.$router[J === !0 ? 'replace' : 'push'](z)
    return L === !0 ? F : F.then(() => {}).catch(() => {})
  }
  function V(j) {
    if (u.value === !0) {
      const L = (z) => k(j, z)
      s('click', j, L), j.defaultPrevented !== !0 && L()
    } else s('click', j)
  }
  return {
    hasRouterLink: u,
    hasHrefLink: a,
    hasLink: h,
    linkTag: d,
    resolvedLink: c,
    linkIsActive: E,
    linkIsExactActive: P,
    linkClass: I,
    linkAttrs: g,
    getLink: q,
    navigateToRouterLink: k,
    navigateOnClick: V
  }
}
const fi = { none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  rh = { xs: 8, sm: 10, md: 14, lg: 20, xl: 24 },
  oh = ['button', 'submit', 'reset'],
  sh = /[^\s]\/[^\s]/,
  ih = ['flat', 'outline', 'push', 'unelevated']
function lh(e, t) {
  return e.flat === !0
    ? 'flat'
    : e.outline === !0
      ? 'outline'
      : e.push === !0
        ? 'push'
        : e.unelevated === !0
          ? 'unelevated'
          : t
}
const ah = {
    ...No,
    ...ta,
    type: { type: String, default: 'button' },
    label: [Number, String],
    icon: String,
    iconRight: String,
    ...ih.reduce((e, t) => (e[t] = Boolean) && e, {}),
    square: Boolean,
    rounded: Boolean,
    glossy: Boolean,
    size: String,
    fab: Boolean,
    fabMini: Boolean,
    padding: String,
    color: String,
    textColor: String,
    noCaps: Boolean,
    noWrap: Boolean,
    dense: Boolean,
    tabindex: [Number, String],
    ripple: { type: [Boolean, Object], default: !0 },
    align: { ...Yd.align, default: 'center' },
    stack: Boolean,
    stretch: Boolean,
    loading: { type: Boolean, default: null },
    disable: Boolean
  },
  ch = { ...ah, round: Boolean }
function uh(e) {
  const t = jo(e, rh),
    n = Xd(e),
    {
      hasRouterLink: r,
      hasLink: o,
      linkTag: s,
      linkAttrs: i,
      navigateOnClick: a
    } = nh({ fallbackTag: 'button' }),
    l = K(() => {
      const P = e.fab === !1 && e.fabMini === !1 ? t.value : {}
      return e.padding !== void 0
        ? Object.assign({}, P, {
            padding: e.padding
              .split(/\s+/)
              .map((I) => (I in fi ? fi[I] + 'px' : I))
              .join(' '),
            minWidth: '0',
            minHeight: '0'
          })
        : P
    }),
    c = K(() => e.rounded === !0 || e.fab === !0 || e.fabMini === !0),
    u = K(() => e.disable !== !0 && e.loading !== !0),
    h = K(() => (u.value === !0 ? e.tabindex || 0 : -1)),
    d = K(() => lh(e, 'standard')),
    g = K(() => {
      const P = { tabindex: h.value }
      return (
        o.value === !0 ? Object.assign(P, i.value) : oh.includes(e.type) === !0 && (P.type = e.type),
        s.value === 'a'
          ? (e.disable === !0 ? (P['aria-disabled'] = 'true') : P.href === void 0 && (P.role = 'button'),
            r.value !== !0 && sh.test(e.type) === !0 && (P.type = e.type))
          : e.disable === !0 && ((P.disabled = ''), (P['aria-disabled'] = 'true')),
        e.loading === !0 &&
          e.percentage !== void 0 &&
          Object.assign(P, {
            role: 'progressbar',
            'aria-valuemin': 0,
            'aria-valuemax': 100,
            'aria-valuenow': e.percentage
          }),
        P
      )
    }),
    b = K(() => {
      let P
      e.color !== void 0
        ? e.flat === !0 || e.outline === !0
          ? (P = `text-${e.textColor || e.color}`)
          : (P = `bg-${e.color} text-${e.textColor || 'white'}`)
        : e.textColor && (P = `text-${e.textColor}`)
      const I =
        e.round === !0
          ? 'round'
          : `rectangle${c.value === !0 ? ' q-btn--rounded' : e.square === !0 ? ' q-btn--square' : ''}`
      return (
        `q-btn--${d.value} q-btn--${I}` +
        (P !== void 0 ? ' ' + P : '') +
        (u.value === !0
          ? ' q-btn--actionable q-focusable q-hoverable'
          : e.disable === !0
            ? ' disabled'
            : '') +
        (e.fab === !0 ? ' q-btn--fab' : e.fabMini === !0 ? ' q-btn--fab-mini' : '') +
        (e.noCaps === !0 ? ' q-btn--no-uppercase' : '') +
        (e.dense === !0 ? ' q-btn--dense' : '') +
        (e.stretch === !0 ? ' no-border-radius self-stretch' : '') +
        (e.glossy === !0 ? ' glossy' : '') +
        (e.square ? ' q-btn--square' : '')
      )
    }),
    E = K(
      () =>
        n.value +
        (e.stack === !0 ? ' column' : ' row') +
        (e.noWrap === !0 ? ' no-wrap text-no-wrap' : '') +
        (e.loading === !0 ? ' q-btn__content--hidden' : '')
    )
  return {
    classes: b,
    style: l,
    innerClasses: E,
    attributes: g,
    hasLink: o,
    linkTag: s,
    navigateOnClick: a,
    isActionable: u
  }
}
const { passiveCapture: $e } = Se
let qt = null,
  Nt = null,
  jt = null
var fh = Tn({
  name: 'QBtn',
  props: { ...ch, percentage: Number, darkPercentage: Boolean, onTouchstart: [Function, Array] },
  emits: ['click', 'keydown', 'mousedown', 'keyup'],
  setup(e, { slots: t, emit: n }) {
    const { proxy: r } = Pn(),
      {
        classes: o,
        style: s,
        innerClasses: i,
        attributes: a,
        hasLink: l,
        linkTag: c,
        navigateOnClick: u,
        isActionable: h
      } = uh(e),
      d = Vt(null),
      g = Vt(null)
    let b = null,
      E,
      P = null
    const I = K(() => e.label !== void 0 && e.label !== null && e.label !== ''),
      q = K(() =>
        e.disable === !0 || e.ripple === !1
          ? !1
          : { keyCodes: l.value === !0 ? [13, 32] : [13], ...(e.ripple === !0 ? {} : e.ripple) }
      ),
      k = K(() => ({ center: e.round })),
      V = K(() => {
        const A = Math.max(0, Math.min(100, e.percentage))
        return A > 0 ? { transition: 'transform 0.6s', transform: `translateX(${A - 100}%)` } : {}
      }),
      j = K(() => {
        if (e.loading === !0) return { onMousedown: Z, onTouchstart: Z, onClick: Z, onKeydown: Z, onKeyup: Z }
        if (h.value === !0) {
          const A = { onClick: z, onKeydown: J, onMousedown: Y }
          if (r.$q.platform.has.touch === !0) {
            const te = e.onTouchstart !== void 0 ? '' : 'Passive'
            A[`onTouchstart${te}`] = F
          }
          return A
        }
        return { onClick: Ct }
      }),
      L = K(() => ({
        ref: d,
        class: 'q-btn q-btn-item non-selectable no-outline ' + o.value,
        style: s.value,
        ...a.value,
        ...j.value
      }))
    function z(A) {
      if (d.value !== null) {
        if (A !== void 0) {
          if (A.defaultPrevented === !0) return
          const te = document.activeElement
          if (
            e.type === 'submit' &&
            te !== document.body &&
            d.value.contains(te) === !1 &&
            te.contains(d.value) === !1
          ) {
            d.value.focus()
            const ae = () => {
              document.removeEventListener('keydown', Ct, !0),
                document.removeEventListener('keyup', ae, $e),
                d.value !== null && d.value.removeEventListener('blur', ae, $e)
            }
            document.addEventListener('keydown', Ct, !0),
              document.addEventListener('keyup', ae, $e),
              d.value.addEventListener('blur', ae, $e)
          }
        }
        u(A)
      }
    }
    function J(A) {
      d.value !== null &&
        (n('keydown', A),
        ro(A, [13, 32]) === !0 &&
          Nt !== d.value &&
          (Nt !== null && M(),
          A.defaultPrevented !== !0 &&
            (d.value.focus(),
            (Nt = d.value),
            d.value.classList.add('q-btn--active'),
            document.addEventListener('keyup', G, !0),
            d.value.addEventListener('blur', G, $e)),
          Ct(A)))
    }
    function F(A) {
      d.value !== null &&
        (n('touchstart', A),
        A.defaultPrevented !== !0 &&
          (qt !== d.value &&
            (qt !== null && M(),
            (qt = d.value),
            (b = A.target),
            b.addEventListener('touchcancel', G, $e),
            b.addEventListener('touchend', G, $e)),
          (E = !0),
          P !== null && clearTimeout(P),
          (P = setTimeout(() => {
            ;(P = null), (E = !1)
          }, 200))))
    }
    function Y(A) {
      d.value !== null &&
        ((A.qSkipRipple = E === !0),
        n('mousedown', A),
        A.defaultPrevented !== !0 &&
          jt !== d.value &&
          (jt !== null && M(),
          (jt = d.value),
          d.value.classList.add('q-btn--active'),
          document.addEventListener('mouseup', G, $e)))
    }
    function G(A) {
      if (d.value !== null && !(A !== void 0 && A.type === 'blur' && document.activeElement === d.value)) {
        if (A !== void 0 && A.type === 'keyup') {
          if (Nt === d.value && ro(A, [13, 32]) === !0) {
            const te = new MouseEvent('click', A)
            ;(te.qKeyEvent = !0),
              A.defaultPrevented === !0 && no(te),
              A.cancelBubble === !0 && $l(te),
              d.value.dispatchEvent(te),
              Ct(A),
              (A.qKeyEvent = !0)
          }
          n('keyup', A)
        }
        M()
      }
    }
    function M(A) {
      const te = g.value
      A !== !0 &&
        (qt === d.value || jt === d.value) &&
        te !== null &&
        te !== document.activeElement &&
        (te.setAttribute('tabindex', -1), te.focus()),
        qt === d.value &&
          (b !== null &&
            (b.removeEventListener('touchcancel', G, $e), b.removeEventListener('touchend', G, $e)),
          (qt = b = null)),
        jt === d.value && (document.removeEventListener('mouseup', G, $e), (jt = null)),
        Nt === d.value &&
          (document.removeEventListener('keyup', G, !0),
          d.value !== null && d.value.removeEventListener('blur', G, $e),
          (Nt = null)),
        d.value !== null && d.value.classList.remove('q-btn--active')
    }
    function Z(A) {
      Ct(A), (A.qSkipRipple = !0)
    }
    return (
      To(() => {
        M(!0)
      }),
      Object.assign(r, {
        click: (A) => {
          h.value === !0 && z(A)
        }
      }),
      () => {
        let A = []
        e.icon !== void 0 &&
          A.push(
            D(rr, {
              name: e.icon,
              left: e.stack !== !0 && I.value === !0,
              role: 'img',
              'aria-hidden': 'true'
            })
          ),
          I.value === !0 && A.push(D('span', { class: 'block' }, [e.label])),
          (A = sn(t.default, A)),
          e.iconRight !== void 0 &&
            e.round === !1 &&
            A.push(
              D(rr, {
                name: e.iconRight,
                right: e.stack !== !0 && I.value === !0,
                role: 'img',
                'aria-hidden': 'true'
              })
            )
        const te = [D('span', { class: 'q-focus-helper', ref: g })]
        return (
          e.loading === !0 &&
            e.percentage !== void 0 &&
            te.push(
              D(
                'span',
                {
                  class:
                    'q-btn__progress absolute-full overflow-hidden' +
                    (e.darkPercentage === !0 ? ' q-btn__progress--dark' : '')
                },
                [D('span', { class: 'q-btn__progress-indicator fit block', style: V.value })]
              )
            ),
          te.push(
            D('span', { class: 'q-btn__content text-center col items-center q-anchor--skip ' + i.value }, A)
          ),
          e.loading !== null &&
            te.push(
              D(mr, { name: 'q-transition--fade' }, () =>
                e.loading === !0
                  ? [
                      D(
                        'span',
                        { key: 'loading', class: 'absolute-full flex flex-center' },
                        t.loading !== void 0 ? t.loading() : [D(Fo)]
                      )
                    ]
                  : null
              )
            ),
          Zi(D(c.value, L.value, te), [[Gd, q.value, void 0, k.value]])
        )
      }
    )
  }
})
let dh = 1,
  hh = document.body
function na(e, t) {
  const n = document.createElement('div')
  if (((n.id = t !== void 0 ? `q-portal--${t}--${dh++}` : e), nr.globalNodes !== void 0)) {
    const r = nr.globalNodes.class
    r !== void 0 && (n.className = r)
  }
  return hh.appendChild(n), n
}
function ph(e) {
  e.remove()
}
let gh = 0
const Gn = {},
  Qn = {},
  je = {},
  ra = {},
  mh = /^\s*$/,
  oa = [],
  vh = [void 0, null, !0, !1, ''],
  Bo = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top', 'bottom', 'left', 'right', 'center'],
  _h = ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
  Ht = {
    positive: { icon: (e) => e.iconSet.type.positive, color: 'positive' },
    negative: { icon: (e) => e.iconSet.type.negative, color: 'negative' },
    warning: { icon: (e) => e.iconSet.type.warning, color: 'warning', textColor: 'dark' },
    info: { icon: (e) => e.iconSet.type.info, color: 'info' },
    ongoing: { group: !1, timeout: 0, spinner: !0, color: 'grey-8' }
  }
function sa(e, t, n) {
  if (!e) return nn('parameter required')
  let r
  const o = { textColor: 'white' }
  if (
    (e.ignoreDefaults !== !0 && Object.assign(o, Gn),
    Ot(e) === !1 && (o.type && Object.assign(o, Ht[o.type]), (e = { message: e })),
    Object.assign(o, Ht[e.type || o.type], e),
    typeof o.icon == 'function' && (o.icon = o.icon(t)),
    o.spinner ? (o.spinner === !0 && (o.spinner = Fo), (o.spinner = Jt(o.spinner))) : (o.spinner = !1),
    (o.meta = {
      hasMedia: Boolean(o.spinner !== !1 || o.icon || o.avatar),
      hasText: di(o.message) || di(o.caption)
    }),
    o.position)
  ) {
    if (Bo.includes(o.position) === !1) return nn('wrong position', e)
  } else o.position = 'bottom'
  if (vh.includes(o.timeout) === !0) o.timeout = 5e3
  else {
    const l = Number(o.timeout)
    if (isNaN(l) || l < 0) return nn('wrong timeout', e)
    o.timeout = Number.isFinite(l) ? l : 0
  }
  o.timeout === 0
    ? (o.progress = !1)
    : o.progress === !0 &&
      ((o.meta.progressClass = 'q-notification__progress' + (o.progressClass ? ` ${o.progressClass}` : '')),
      (o.meta.progressStyle = { animationDuration: `${o.timeout + 1e3}ms` }))
  const s = (Array.isArray(e.actions) === !0 ? e.actions : [])
      .concat(e.ignoreDefaults !== !0 && Array.isArray(Gn.actions) === !0 ? Gn.actions : [])
      .concat(Ht[e.type] !== void 0 && Array.isArray(Ht[e.type].actions) === !0 ? Ht[e.type].actions : []),
    { closeBtn: i } = o
  if (
    (i && s.push({ label: typeof i == 'string' ? i : t.lang.label.close }),
    (o.actions = s.map(({ handler: l, noDismiss: c, ...u }) => ({
      flat: !0,
      ...u,
      onClick:
        typeof l == 'function'
          ? () => {
              l(), c !== !0 && a()
            }
          : () => {
              a()
            }
    }))),
    o.multiLine === void 0 && (o.multiLine = o.actions.length > 1),
    Object.assign(o.meta, {
      class:
        `q-notification row items-stretch q-notification--${o.multiLine === !0 ? 'multi-line' : 'standard'}` +
        (o.color !== void 0 ? ` bg-${o.color}` : '') +
        (o.textColor !== void 0 ? ` text-${o.textColor}` : '') +
        (o.classes !== void 0 ? ` ${o.classes}` : ''),
      wrapperClass:
        'q-notification__wrapper col relative-position border-radius-inherit ' +
        (o.multiLine === !0 ? 'column no-wrap justify-center' : 'row items-center'),
      contentClass: 'q-notification__content row items-center' + (o.multiLine === !0 ? '' : ' col'),
      leftClass: o.meta.hasText === !0 ? 'additional' : 'single',
      attrs: { role: 'alert', ...o.attrs }
    }),
    o.group === !1
      ? ((o.group = void 0), (o.meta.group = void 0))
      : ((o.group === void 0 || o.group === !0) &&
          (o.group = [o.message, o.caption, o.multiline]
            .concat(o.actions.map((l) => `${l.label}*${l.icon}`))
            .join('|')),
        (o.meta.group = o.group + '|' + o.position)),
    o.actions.length === 0
      ? (o.actions = void 0)
      : (o.meta.actionsClass =
          'q-notification__actions row items-center ' +
          (o.multiLine === !0 ? 'justify-end' : 'col-auto') +
          (o.meta.hasMedia === !0 ? ' q-notification__actions--with-media' : '')),
    n !== void 0)
  ) {
    n.notif.meta.timer && (clearTimeout(n.notif.meta.timer), (n.notif.meta.timer = void 0)),
      (o.meta.uid = n.notif.meta.uid)
    const l = je[o.position].value.indexOf(n.notif)
    je[o.position].value[l] = o
  } else {
    const l = Qn[o.meta.group]
    if (l === void 0) {
      if (((o.meta.uid = gh++), (o.meta.badge = 1), ['left', 'right', 'center'].indexOf(o.position) !== -1))
        je[o.position].value.splice(Math.floor(je[o.position].value.length / 2), 0, o)
      else {
        const c = o.position.indexOf('top') !== -1 ? 'unshift' : 'push'
        je[o.position].value[c](o)
      }
      o.group !== void 0 && (Qn[o.meta.group] = o)
    } else {
      if (
        (l.meta.timer && (clearTimeout(l.meta.timer), (l.meta.timer = void 0)), o.badgePosition !== void 0)
      ) {
        if (_h.includes(o.badgePosition) === !1) return nn('wrong badgePosition', e)
      } else o.badgePosition = `top-${o.position.indexOf('left') !== -1 ? 'right' : 'left'}`
      ;(o.meta.uid = l.meta.uid),
        (o.meta.badge = l.meta.badge + 1),
        (o.meta.badgeClass =
          `q-notification__badge q-notification__badge--${o.badgePosition}` +
          (o.badgeColor !== void 0 ? ` bg-${o.badgeColor}` : '') +
          (o.badgeTextColor !== void 0 ? ` text-${o.badgeTextColor}` : '') +
          (o.badgeClass ? ` ${o.badgeClass}` : ''))
      const c = je[o.position].value.indexOf(l)
      je[o.position].value[c] = Qn[o.meta.group] = o
    }
  }
  const a = () => {
    yh(o), (r = void 0)
  }
  if (
    (o.timeout > 0 &&
      (o.meta.timer = setTimeout(() => {
        ;(o.meta.timer = void 0), a()
      }, o.timeout + 1e3)),
    o.group !== void 0)
  )
    return (l) => {
      l !== void 0 ? nn('trying to update a grouped one which is forbidden', e) : a()
    }
  if (((r = { dismiss: a, config: e, notif: o }), n !== void 0)) {
    Object.assign(n, r)
    return
  }
  return (l) => {
    if (r !== void 0)
      if (l === void 0) r.dismiss()
      else {
        const c = Object.assign({}, r.config, l, { group: !1, position: o.position })
        sa(c, t, r)
      }
  }
}
function yh(e) {
  e.meta.timer && (clearTimeout(e.meta.timer), (e.meta.timer = void 0))
  const t = je[e.position].value.indexOf(e)
  if (t !== -1) {
    e.group !== void 0 && delete Qn[e.meta.group]
    const n = oa['' + e.meta.uid]
    if (n) {
      const { width: r, height: o } = getComputedStyle(n)
      ;(n.style.left = `${n.offsetLeft}px`), (n.style.width = r), (n.style.height = o)
    }
    je[e.position].value.splice(t, 1), typeof e.onDismiss == 'function' && e.onDismiss()
  }
}
function di(e) {
  return e != null && mh.test(e) !== !0
}
function nn(e, t) {
  return console.error(`Notify: ${e}`, t), !1
}
function bh() {
  return Tn({
    name: 'QNotifications',
    devtools: { hide: !0 },
    setup() {
      return () =>
        D(
          'div',
          { class: 'q-notifications' },
          Bo.map((e) =>
            D(Fu, { key: e, class: ra[e], tag: 'div', name: `q-notification--${e}` }, () =>
              je[e].value.map((t) => {
                const n = t.meta,
                  r = []
                if (
                  (n.hasMedia === !0 &&
                    (t.spinner !== !1
                      ? r.push(
                          D(t.spinner, {
                            class: 'q-notification__spinner q-notification__spinner--' + n.leftClass,
                            color: t.spinnerColor,
                            size: t.spinnerSize
                          })
                        )
                      : t.icon
                        ? r.push(
                            D(rr, {
                              class: 'q-notification__icon q-notification__icon--' + n.leftClass,
                              name: t.icon,
                              color: t.iconColor,
                              size: t.iconSize,
                              role: 'img'
                            })
                          )
                        : t.avatar &&
                          r.push(
                            D(
                              zd,
                              { class: 'q-notification__avatar q-notification__avatar--' + n.leftClass },
                              () => D('img', { src: t.avatar, 'aria-hidden': 'true' })
                            )
                          )),
                  n.hasText === !0)
                ) {
                  let s
                  const i = { class: 'q-notification__message col' }
                  if (t.html === !0)
                    i.innerHTML = t.caption
                      ? `<div>${t.message}</div><div class="q-notification__caption">${t.caption}</div>`
                      : t.message
                  else {
                    const a = [t.message]
                    s = t.caption
                      ? [D('div', a), D('div', { class: 'q-notification__caption' }, [t.caption])]
                      : a
                  }
                  r.push(D('div', i, s))
                }
                const o = [D('div', { class: n.contentClass }, r)]
                return (
                  t.progress === !0 &&
                    o.push(
                      D('div', {
                        key: `${n.uid}|p|${n.badge}`,
                        class: n.progressClass,
                        style: n.progressStyle
                      })
                    ),
                  t.actions !== void 0 &&
                    o.push(
                      D(
                        'div',
                        { class: n.actionsClass },
                        t.actions.map((s) => D(fh, s))
                      )
                    ),
                  n.badge > 1 &&
                    o.push(
                      D(
                        'div',
                        { key: `${n.uid}|${n.badge}`, class: t.meta.badgeClass, style: t.badgeStyle },
                        [n.badge]
                      )
                    ),
                  D(
                    'div',
                    {
                      ref: (s) => {
                        oa['' + n.uid] = s
                      },
                      key: n.uid,
                      class: n.class,
                      ...n.attrs
                    },
                    [D('div', { class: n.wrapperClass }, o)]
                  )
                )
              })
            )
          )
        )
    }
  })
}
var wh = {
  setDefaults(e) {
    Ot(e) === !0 && Object.assign(Gn, e)
  },
  registerType(e, t) {
    Ot(t) === !0 && (Ht[e] = t)
  },
  install({ $q: e, parentApp: t }) {
    if (
      ((e.notify = this.create = (n) => sa(n, e)),
      (e.notify.setDefaults = this.setDefaults),
      (e.notify.registerType = this.registerType),
      e.config.notify !== void 0 && this.setDefaults(e.config.notify),
      this.__installed !== !0)
    ) {
      Bo.forEach((r) => {
        je[r] = Vt([])
        const o =
            ['left', 'center', 'right'].includes(r) === !0
              ? 'center'
              : r.indexOf('top') !== -1
                ? 'top'
                : 'bottom',
          s = r.indexOf('left') !== -1 ? 'start' : r.indexOf('right') !== -1 ? 'end' : 'center',
          i = ['left', 'right'].includes(r)
            ? `items-${r === 'left' ? 'start' : 'end'} justify-center`
            : r === 'center'
              ? 'flex-center'
              : `items-${s}`
        ra[r] = `q-notifications__list q-notifications__list--${o} fixed column no-wrap ${i}`
      })
      const n = na('q-notify')
      jl(bh(), t).mount(n)
    }
  }
}
const Wh = [Element, String],
  xh = [null, document, document.body, document.scrollingElement, document.documentElement]
function Gh(e, t) {
  let n = Ud(t)
  if (n === void 0) {
    if (e == null) return window
    n = e.closest('.scroll,.scroll-y,.overflow-auto')
  }
  return xh.includes(n) ? window : n
}
function ia(e) {
  return e === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : e.scrollTop
}
function la(e) {
  return e === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : e.scrollLeft
}
function aa(e, t, n = 0) {
  const r = arguments[3] === void 0 ? performance.now() : arguments[3],
    o = ia(e)
  if (n <= 0) {
    o !== t && co(e, t)
    return
  }
  requestAnimationFrame((s) => {
    const i = s - r,
      a = o + ((t - o) / Math.max(i, n)) * i
    co(e, a), a !== t && aa(e, t, n - i, s)
  })
}
function ca(e, t, n = 0) {
  const r = arguments[3] === void 0 ? performance.now() : arguments[3],
    o = la(e)
  if (n <= 0) {
    o !== t && uo(e, t)
    return
  }
  requestAnimationFrame((s) => {
    const i = s - r,
      a = o + ((t - o) / Math.max(i, n)) * i
    uo(e, a), a !== t && ca(e, t, n - i, s)
  })
}
function co(e, t) {
  if (e === window) {
    window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, t)
    return
  }
  e.scrollTop = t
}
function uo(e, t) {
  if (e === window) {
    window.scrollTo(t, window.pageYOffset || window.scrollY || document.body.scrollTop || 0)
    return
  }
  e.scrollLeft = t
}
function Qh(e, t, n) {
  if (n) {
    aa(e, t, n)
    return
  }
  co(e, t)
}
function Yh(e, t, n) {
  if (n) {
    ca(e, t, n)
    return
  }
  uo(e, t)
}
let Fn
function Xh() {
  if (Fn !== void 0) return Fn
  const e = document.createElement('p'),
    t = document.createElement('div')
  ao(e, { width: '100%', height: '200px' }),
    ao(t, {
      position: 'absolute',
      top: '0px',
      left: '0px',
      visibility: 'hidden',
      width: '200px',
      height: '150px',
      overflow: 'hidden'
    }),
    t.appendChild(e),
    document.body.appendChild(t)
  const n = e.offsetWidth
  t.style.overflow = 'scroll'
  let r = e.offsetWidth
  return n === r && (r = t.clientWidth), t.remove(), (Fn = n - r), Fn
}
function Eh(e, t = !0) {
  return !e || e.nodeType !== Node.ELEMENT_NODE
    ? !1
    : t
      ? e.scrollHeight > e.clientHeight &&
        (e.classList.contains('scroll') ||
          e.classList.contains('overflow-auto') ||
          ['auto', 'scroll'].includes(window.getComputedStyle(e)['overflow-y']))
      : e.scrollWidth > e.clientWidth &&
        (e.classList.contains('scroll') ||
          e.classList.contains('overflow-auto') ||
          ['auto', 'scroll'].includes(window.getComputedStyle(e)['overflow-x']))
}
let rn = 0,
  Nr,
  jr,
  ln,
  Fr = !1,
  hi,
  pi,
  gi,
  xt = null
function Ch(e) {
  Sh(e) && Ct(e)
}
function Sh(e) {
  if (e.target === document.body || e.target.classList.contains('q-layout__backdrop')) return !0
  const t = ef(e),
    n = e.shiftKey && !e.deltaX,
    r = !n && Math.abs(e.deltaX) <= Math.abs(e.deltaY),
    o = n || r ? e.deltaY : e.deltaX
  for (let s = 0; s < t.length; s++) {
    const i = t[s]
    if (Eh(i, r))
      return r
        ? o < 0 && i.scrollTop === 0
          ? !0
          : o > 0 && i.scrollTop + i.clientHeight === i.scrollHeight
        : o < 0 && i.scrollLeft === 0
          ? !0
          : o > 0 && i.scrollLeft + i.clientWidth === i.scrollWidth
  }
  return !0
}
function mi(e) {
  e.target === document && (document.scrollingElement.scrollTop = document.scrollingElement.scrollTop)
}
function Bn(e) {
  Fr !== !0 &&
    ((Fr = !0),
    requestAnimationFrame(() => {
      Fr = !1
      const { height: t } = e.target,
        { clientHeight: n, scrollTop: r } = document.scrollingElement
      ;(ln === void 0 || t !== window.innerHeight) &&
        ((ln = n - t), (document.scrollingElement.scrollTop = r)),
        r > ln && (document.scrollingElement.scrollTop -= Math.ceil((r - ln) / 8))
    }))
}
function vi(e) {
  const t = document.body,
    n = window.visualViewport !== void 0
  if (e === 'add') {
    const { overflowY: r, overflowX: o } = window.getComputedStyle(t)
    ;(Nr = la(window)),
      (jr = ia(window)),
      (hi = t.style.left),
      (pi = t.style.top),
      (gi = window.location.href),
      (t.style.left = `-${Nr}px`),
      (t.style.top = `-${jr}px`),
      o !== 'hidden' &&
        (o === 'scroll' || t.scrollWidth > window.innerWidth) &&
        t.classList.add('q-body--force-scrollbar-x'),
      r !== 'hidden' &&
        (r === 'scroll' || t.scrollHeight > window.innerHeight) &&
        t.classList.add('q-body--force-scrollbar-y'),
      t.classList.add('q-body--prevent-scroll'),
      (document.qScrollPrevented = !0),
      we.is.ios === !0 &&
        (n === !0
          ? (window.scrollTo(0, 0),
            window.visualViewport.addEventListener('resize', Bn, Se.passiveCapture),
            window.visualViewport.addEventListener('scroll', Bn, Se.passiveCapture),
            window.scrollTo(0, 0))
          : window.addEventListener('scroll', mi, Se.passiveCapture))
  }
  we.is.desktop === !0 && we.is.mac === !0 && window[`${e}EventListener`]('wheel', Ch, Se.notPassive),
    e === 'remove' &&
      (we.is.ios === !0 &&
        (n === !0
          ? (window.visualViewport.removeEventListener('resize', Bn, Se.passiveCapture),
            window.visualViewport.removeEventListener('scroll', Bn, Se.passiveCapture))
          : window.removeEventListener('scroll', mi, Se.passiveCapture)),
      t.classList.remove('q-body--prevent-scroll'),
      t.classList.remove('q-body--force-scrollbar-x'),
      t.classList.remove('q-body--force-scrollbar-y'),
      (document.qScrollPrevented = !1),
      (t.style.left = hi),
      (t.style.top = pi),
      window.location.href === gi && window.scrollTo(Nr, jr),
      (ln = void 0))
}
function _i(e) {
  let t = 'add'
  if (e === !0) {
    if ((rn++, xt !== null)) {
      clearTimeout(xt), (xt = null)
      return
    }
    if (rn > 1) return
  } else {
    if (rn === 0 || (rn--, rn > 0)) return
    if (((t = 'remove'), we.is.ios === !0 && we.is.nativeMobile === !0)) {
      xt !== null && clearTimeout(xt),
        (xt = setTimeout(() => {
          vi(t), (xt = null)
        }, 100))
      return
    }
  }
  vi(t)
}
let Ft,
  Br,
  yi = 0,
  Et = null,
  me = {},
  Rt = {}
const ua = {
    group: '__default_quasar_group__',
    delay: 0,
    message: !1,
    html: !1,
    spinnerSize: 80,
    spinnerColor: '',
    messageColor: '',
    backgroundColor: '',
    boxClass: '',
    spinner: Fo,
    customClass: ''
  },
  fa = { ...ua }
function Ph(e) {
  if (e && e.group !== void 0 && Rt[e.group] !== void 0) return Object.assign(Rt[e.group], e)
  const t = Ot(e) === !0 && e.ignoreDefaults === !0 ? { ...ua, ...e } : { ...fa, ...e }
  return (Rt[t.group] = t), t
}
const qe = Ln(
  { isActive: !1 },
  {
    show(e) {
      me = Ph(e)
      const { group: t } = me
      return (
        (qe.isActive = !0),
        Ft !== void 0
          ? ((me.uid = yi), Br.$forceUpdate())
          : ((me.uid = ++yi),
            Et !== null && clearTimeout(Et),
            (Et = setTimeout(() => {
              Et = null
              const n = na('q-loading')
              ;(Ft = jl(
                {
                  name: 'QLoading',
                  setup() {
                    Ro(() => {
                      _i(!0)
                    })
                    function r() {
                      qe.isActive !== !0 &&
                        Ft !== void 0 &&
                        (_i(!1), Ft.unmount(n), ph(n), (Ft = void 0), (Br = void 0))
                    }
                    function o() {
                      if (qe.isActive !== !0) return null
                      const s = [
                        D(me.spinner, {
                          class: 'q-loading__spinner',
                          color: me.spinnerColor,
                          size: me.spinnerSize
                        })
                      ]
                      return (
                        me.message &&
                          s.push(
                            D('div', {
                              class:
                                'q-loading__message' + (me.messageColor ? ` text-${me.messageColor}` : ''),
                              [me.html === !0 ? 'innerHTML' : 'textContent']: me.message
                            })
                          ),
                        D(
                          'div',
                          {
                            class: 'q-loading fullscreen flex flex-center z-max ' + me.customClass.trim(),
                            key: me.uid
                          },
                          [
                            D('div', {
                              class:
                                'q-loading__backdrop' +
                                (me.backgroundColor ? ` bg-${me.backgroundColor}` : '')
                            }),
                            D('div', { class: 'q-loading__box column items-center ' + me.boxClass }, s)
                          ]
                        )
                      )
                    }
                    return () => D(mr, { name: 'q-transition--fade', appear: !0, onAfterLeave: r }, o)
                  }
                },
                qe.__parentApp
              )),
                (Br = Ft.mount(n))
            }, me.delay))),
        (n) => {
          if (n === void 0 || Object(n) !== n) {
            qe.hide(t)
            return
          }
          qe.show({ ...n, group: t })
        }
      )
    },
    hide(e) {
      if (qe.isActive === !0) {
        if (e === void 0) Rt = {}
        else {
          if (Rt[e] === void 0) return
          {
            delete Rt[e]
            const t = Object.keys(Rt)
            if (t.length !== 0) {
              const n = t[t.length - 1]
              qe.show({ group: n })
              return
            }
          }
        }
        Et !== null && (clearTimeout(Et), (Et = null)), (qe.isActive = !1)
      }
    },
    setDefaults(e) {
      Ot(e) === !0 && Object.assign(fa, e)
    },
    install({ $q: e, parentApp: t }) {
      ;(e.loading = this),
        (qe.__parentApp = t),
        e.config.loading !== void 0 && this.setDefaults(e.config.loading)
    }
  }
)
var Rh = { config: {}, plugins: { Notify: wh, Loading: qe } }
const Th = '/'
async function Lh({ app: e, router: t, store: n }, r) {
  let o = !1
  const s = (l) => {
      try {
        return t.resolve(l).href
      } catch {}
      return Object(l) === l ? null : l
    },
    i = (l) => {
      if (((o = !0), typeof l == 'string' && /^https?:\/\//.test(l))) {
        window.location.href = l
        return
      }
      const c = s(l)
      c !== null && ((window.location.href = c), window.location.reload())
    },
    a = window.location.href.replace(window.location.origin, '')
  for (let l = 0; o === !1 && l < r.length; l++)
    try {
      await r[l]({ app: e, router: t, store: n, ssrContext: null, redirect: i, urlPath: a, publicPath: Th })
    } catch (c) {
      if (c && c.url) {
        i(c.url)
        return
      }
      console.error('[Quasar] boot error:', c)
      return
    }
  o !== !0 && (e.use(t), e.mount('#q-app'))
}
$d(Al, Rh).then((e) => {
  const [t, n] =
    Promise.allSettled !== void 0
      ? [
          'allSettled',
          (r) =>
            r.map((o) => {
              if (o.status === 'rejected') {
                console.error('[Quasar] boot error:', o.reason)
                return
              }
              return o.value.default
            })
        ]
      : ['all', (r) => r.map((o) => o.default)]
  return Promise[t]([
    Hn(() => import('./axios.235c811e.js'), ['assets/axios.235c811e.js', 'assets/axios.bf56c3c5.js'])
  ]).then((r) => {
    const o = n(r).filter((s) => typeof s == 'function')
    Lh(e, o)
  })
})
export {
  mr as $,
  En as A,
  Gh as B,
  Se as C,
  ia as D,
  la as E,
  Vi as F,
  No as G,
  jo as H,
  Id as I,
  $l as J,
  Ct as K,
  we as L,
  Kh as M,
  jh as N,
  Te as O,
  vr as P,
  Oh as Q,
  Fo as R,
  rr as S,
  fh as T,
  Ot as U,
  yc as V,
  Nh as W,
  rf as X,
  Kc as Y,
  Vc as Z,
  no as _,
  K as a,
  Dh as a0,
  Gd as a1,
  Uh as a2,
  nh as a3,
  ro as a4,
  Hh as a5,
  to as a6,
  tf as a7,
  nf as a8,
  Jd as a9,
  Vh as aa,
  kh as ab,
  na as ac,
  ph as ad,
  Zu as ae,
  zh as af,
  mf as ag,
  _i as ah,
  _c as ai,
  Xi as aj,
  kr as ak,
  af as al,
  Ju as am,
  $h as an,
  Mh as ao,
  Zi as ap,
  Qh as aq,
  Yh as ar,
  ru as as,
  wl as at,
  wh as au,
  qe as av,
  Ah as aw,
  Bh as b,
  Tn as c,
  Md as d,
  Fh as e,
  qh as f,
  Pn as g,
  D as h,
  et as i,
  At as j,
  Xh as k,
  Ih as l,
  Xt as m,
  sn as n,
  Ji as o,
  Vn as p,
  hc as q,
  Vt as r,
  Jc as s,
  eu as t,
  ac as u,
  Ae as v,
  Kn as w,
  Wh as x,
  Ro as y,
  To as z
}
