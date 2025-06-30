import { watch as ne, ref as A, onUnmounted as Fe, defineComponent as H, computed as P, nextTick as ye, shallowRef as R, createVNode as s, Transition as Ce, mergeProps as O, withDirectives as De, createTextVNode as Ee, vShow as Ie, Teleport as Le, isVNode as ze, createBlock as ce, openBlock as Z, unref as ue, normalizeClass as We, withCtx as Ve, createElementBlock as He, createCommentVNode as ve, renderSlot as Ue, resolveDynamicComponent as Xe, Fragment as Ke, render as be } from "vue";
import { Loader2 as Ye, X as _e, HelpCircle as he, AlertTriangle as ke, XCircle as qe, CheckCircle as Qe, Info as Ge } from "lucide-vue-next";
import { Button as Je } from "@/components/ui/button";
function Ze(e) {
  return typeof e == "string";
}
function Te(e) {
  return Array.isArray(e);
}
function et(e) {
  return e !== null && typeof e == "object" && !Te(e);
}
function T(...e) {
  const o = [];
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    if (n) {
      if (Ze(n))
        o.push(n);
      else if (Te(n))
        for (let a = 0; a < n.length; a++) {
          const r = T(n[a]);
          r && o.push(r);
        }
      else if (et(n))
        for (const a in n)
          n[a] && o.push(a);
    }
  }
  return o.join(" ");
}
const tt = (e) => {
  const o = e;
  return o.install = function(t) {
    t.component(o.displayName || o.name, e);
  }, e;
};
function S(e) {
  return { type: Object, default: e };
}
function x(e) {
  return { type: Boolean, default: e };
}
function we(e) {
  return { type: Function, default: e };
}
const ot = () => ({
  prefixCls: String,
  class: String,
  style: S(),
  rootClassName: String,
  visible: x(),
  destroyOnClose: x(),
  forceRender: x(),
  getContainer: {
    type: [String, Function, Boolean, Object],
    default: void 0
  },
  wrapClassName: String,
  wrapStyle: S(),
  zIndex: Number,
  mask: x(!0),
  maskClosable: x(!0),
  maskStyle: S(),
  maskProps: Object,
  keyboard: x(!0),
  title: [String, Object],
  footer: [String, Object],
  closable: x(!0),
  closeIcon: [String, Object],
  focusTriggerAfterClose: x(!0),
  width: [String, Number],
  height: [String, Number],
  centered: x(),
  transitionName: String,
  maskTransitionName: String,
  animation: String,
  maskAnimation: String,
  mousePosition: S(),
  onClose: we(),
  afterClose: we(),
  modalRender: Function
}), fe = (e, o) => {
  const t = { ...e };
  return Object.keys(o).forEach((n) => {
    const a = t[n];
    if (a)
      a.type || a.default ? a.default = o[n] : a.def ? a.def(o[n]) : t[n] = { type: a, default: o[n] };
    else
      throw new Error(`not have ${n} prop`);
  }), t;
};
function nt(e, o) {
  const t = { ...e };
  return o.forEach((n) => {
    delete t[n];
  }), t;
}
function lt() {
  if (typeof document > "u")
    return 0;
  const e = document.createElement("div");
  e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e);
  const o = e.offsetWidth - e.clientWidth;
  return document.body.removeChild(e), o;
}
function it() {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
}
class xe {
  static lockCount = 0;
  static originalBodyStyle = {};
  static lock() {
    if (this.lockCount === 0) {
      this.originalBodyStyle = {
        overflow: document.body.style.overflow,
        width: document.body.style.width,
        paddingRight: document.body.style.paddingRight
      };
      const o = lt(), t = it();
      if (document.body.style.overflow = "hidden", t && o > 0) {
        const n = parseInt(
          window.getComputedStyle(document.body).paddingRight || "0",
          10
        );
        document.body.style.paddingRight = `${n + o}px`;
      }
    }
    this.lockCount++;
  }
  static unlock() {
    this.lockCount = Math.max(0, this.lockCount - 1), this.lockCount === 0 && (document.body.style.overflow = this.originalBodyStyle.overflow || "", document.body.style.width = this.originalBodyStyle.width || "", document.body.style.paddingRight = this.originalBodyStyle.paddingRight || "");
  }
}
function st(e) {
  const o = A(!1), t = () => {
    !o.value && e() && (xe.lock(), o.value = !0);
  }, n = () => {
    o.value && (xe.unlock(), o.value = !1);
  };
  return Fe(() => {
    n();
  }), {
    lock: t,
    unlock: n,
    isLocked: o.value
  };
}
function at(e) {
  const { lock: o, unlock: t } = st(() => !0);
  return ne(
    e,
    (n) => {
      n ? o() : t();
    },
    { immediate: !0 }
  ), { lock: o, unlock: t };
}
function rt(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !ze(e);
}
const ct = /* @__PURE__ */ H({
  name: "SimpleDialog",
  inheritAttrs: !1,
  props: fe(ot(), {
    prefixCls: "simple-dialog",
    mask: !0,
    visible: !1,
    keyboard: !0,
    closable: !0,
    maskClosable: !0,
    destroyOnClose: !1,
    focusTriggerAfterClose: !0
  }),
  setup(e, {
    attrs: o,
    slots: t,
    emit: n
  }) {
    const a = A(), r = A(), u = A(e.visible), c = A();
    at(() => e.visible);
    const p = P(() => {
      const {
        width: l,
        height: m
      } = e, g = {};
      return l !== void 0 && (g.width = typeof l == "number" ? `${l}px` : l), m !== void 0 && (g.height = typeof m == "number" ? `${m}px` : m), c.value && (g.transformOrigin = c.value), g;
    });
    ne(() => e.visible, (l) => {
      l && (u.value = !0, ye(() => {
        a.value && a.value.focus();
      }));
    }, {
      immediate: !0
    });
    const i = (l) => {
      n("close", l);
    }, f = R(!1), d = R(), C = () => {
      clearTimeout(d.value), f.value = !0;
    }, v = () => {
      d.value = setTimeout(() => {
        f.value = !1;
      });
    }, k = (l) => {
      if (e.maskClosable)
        if (f.value)
          f.value = !1;
        else {
          const m = l.target, g = a.value === m, b = m?.getAttribute?.("tabindex") === "0" && m?.style?.outline === "none" && a.value?.contains(m);
          (g || b) && i(l);
        }
    }, U = (l) => {
      e.keyboard && l.key === "Escape" && (l.stopPropagation(), i());
    }, X = (l) => {
      u.value = !1, e.afterClose?.();
    }, F = (l) => {
      const m = l.getBoundingClientRect(), g = {
        left: m.left,
        top: m.top
      }, b = l.ownerDocument, B = b.defaultView || b.parentWindow, D = (E, I) => {
        let h = E[`page${I ? "Y" : "X"}Offset`];
        const $ = `scroll${I ? "Top" : "Left"}`;
        if (typeof h != "number") {
          const L = E.document;
          h = L.documentElement[$], typeof h != "number" && (h = L.body[$]);
        }
        return h;
      };
      return g.left += D(B), g.top += D(B, !0), g;
    }, K = () => {
      ye(() => {
        if (r.value) {
          const l = F(r.value);
          c.value = e.mousePosition ? `${e.mousePosition.x - l.left}px ${e.mousePosition.y - l.top}px` : "";
        }
      });
    }, w = () => {
      if (e.mousePosition && r.value) {
        const l = F(r.value), m = `${e.mousePosition.x - l.left}px ${e.mousePosition.y - l.top}px`;
        c.value !== m && (c.value = m);
      }
    }, N = P(() => {
      const {
        getContainer: l
      } = e;
      return l === !1 ? !1 : typeof l == "function" ? l() : typeof l == "string" ? document.querySelector(l) : document.body;
    });
    return () => {
      const {
        prefixCls: l,
        mask: m,
        visible: g,
        destroyOnClose: b,
        maskTransitionName: B,
        zIndex: D,
        wrapClassName: E,
        rootClassName: I,
        wrapStyle: h,
        closable: $,
        maskProps: L,
        maskStyle: q,
        transitionName: le,
        title: z = t.title?.(),
        footer: Q = t.footer?.(),
        closeIcon: ie = t.closeIcon?.(),
        width: pe,
        height: ge,
        centered: se,
        modalRender: W,
        mousePosition: M
      } = e, {
        style: ae,
        class: re
      } = o, G = t.modalRender || W, Y = m ? s(Ce, {
        name: B || "simple-fade",
        appear: !0
      }, {
        default: () => [g ? s("div", O({
          class: `${l}-mask`,
          style: {
            zIndex: D,
            ...q
          }
        }, L), null) : null]
      }) : null, Re = s("div", {
        tabindex: -1,
        onKeydown: U,
        class: T(`${l}-wrap`, E, {
          [`${l}-centered`]: !!se
        }),
        ref: a,
        onClick: k,
        style: {
          zIndex: D,
          ...h,
          display: u.value ? void 0 : "none"
        }
      }, [s(Ce, {
        name: le || "simple-zoom",
        appear: !0,
        onBeforeEnter: K,
        onBeforeLeave: w,
        onAfterLeave: () => X(!1)
      }, {
        default: () => [g || !b ? De(s("div", {
          ref: r,
          key: "dialog-element",
          role: "document",
          class: T(`${l}`, re),
          style: [p.value, ae],
          onMousedown: C,
          onMouseup: v
        }, [s("div", {
          tabindex: 0,
          style: {
            outline: "none"
          },
          onClick: (j) => {
            j.target === j.currentTarget && (j.stopPropagation(), e.maskClosable && i(j));
          }
        }, [(() => {
          const j = s("div", {
            class: `${l}-content`
          }, [$ && s("button", {
            type: "button",
            onClick: i,
            "aria-label": "Close",
            class: `${l}-close`
          }, [ie || s("span", {
            class: `${l}-close-x`
          }, [s("span", {
            class: `${l}-close-icon`
          }, [Ee("×")])])]), z && s("div", {
            class: `${l}-header`
          }, [s("div", {
            class: `${l}-title`
          }, [z])]), s("div", {
            class: `${l}-body`
          }, [t.default?.()]), Q && s("div", {
            class: `${l}-footer`
          }, [Q])]);
          return G ? G({
            originVNode: j
          }) : j;
        })()]), s("div", {
          tabindex: 0,
          style: {
            width: "0px",
            height: "0px",
            overflow: "hidden",
            outline: "none"
          }
        }, null)]), [[Ie, g]]) : null]
      })]), J = s("div", {
        class: T(`${l}-root`, I)
      }, [Y, Re]);
      return N.value === !1 ? J : s(Le, {
        to: N.value || document.body
      }, rt(J) ? J : {
        default: () => [J]
      });
    };
  }
}), ut = {
  key: 0,
  class: "inline-flex items-center justify-center w-4 h-4 mr-2"
}, te = /* @__PURE__ */ H({
  __name: "ButtonAdapter",
  props: {
    type: { default: "default" },
    danger: { type: Boolean, default: !1 },
    ghost: { type: Boolean, default: !1 },
    loading: { type: [Boolean, Object], default: !1 },
    disabled: { type: Boolean, default: !1 },
    block: { type: Boolean, default: !1 },
    htmlType: { default: "button" },
    href: {},
    target: {},
    title: {},
    icon: {}
  },
  emits: ["click", "mousedown"],
  setup(e, { emit: o }) {
    const t = e, n = o, a = P(() => t.danger ? "destructive" : t.ghost ? "ghost" : t.type === "link" ? "link" : t.type === "dashed" ? "outline" : t.type === "text" ? "ghost" : (t.type === "primary", "default")), r = P(() => {
      const i = t.loading;
      return typeof i == "object" && i !== null ? !0 : !!i;
    }), u = P(() => !!(t.icon || r.value)), c = (i) => {
      if (t.disabled || r.value) {
        i.preventDefault();
        return;
      }
      n("click", i);
    }, p = (i) => {
      n("mousedown", i);
    };
    return (i, f) => (Z(), ce(ue(Je), {
      as: i.href ? "a" : "button",
      variant: a.value,
      size: "default",
      class: We({ "w-full": i.block }),
      href: i.href,
      target: i.target,
      title: i.title,
      disabled: i.disabled || r.value,
      onClick: c,
      onMousedown: p
    }, {
      default: Ve(() => [
        u.value ? (Z(), He("span", ut, [
          r.value ? (Z(), ce(ue(Ye), {
            key: "loading",
            class: "h-4 w-4 animate-spin"
          })) : i.icon ? (Z(), ce(Xe(i.icon), {
            key: "icon",
            class: "h-4 w-4"
          })) : ve("", !0)
        ])) : ve("", !0),
        Ue(i.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "variant", "class", "href", "target", "title", "disabled"]));
  }
}), oe = (e, o, t) => t !== void 0 ? t : `${e}-${o}`;
function dt(e, o, t, n) {
  e.addEventListener && e.addEventListener(o, t, n);
}
function ft() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
let de = null;
const mt = (e) => {
  de = {
    x: e.pageX,
    y: e.pageY
  }, setTimeout(() => de = null, 100);
};
ft() && dt(document.documentElement, "click", mt, !0);
const me = () => de, pt = () => ({
  prefixCls: String,
  /** @deprecated Please use `open` instead. */
  visible: { type: Boolean, default: void 0 },
  open: { type: Boolean, default: void 0 },
  confirmLoading: { type: Boolean, default: void 0 },
  title: [String, Object],
  closable: { type: Boolean, default: void 0 },
  closeIcon: [String, Object],
  onOk: Function,
  onCancel: Function,
  "onUpdate:visible": Function,
  "onUpdate:open": Function,
  onChange: Function,
  afterClose: Function,
  centered: { type: Boolean, default: void 0 },
  width: [String, Number],
  footer: [String, Object],
  okText: [String, Object],
  okType: String,
  cancelText: [String, Object],
  icon: [String, Object],
  maskClosable: { type: Boolean, default: void 0 },
  forceRender: { type: Boolean, default: void 0 },
  okButtonProps: S(),
  cancelButtonProps: S(),
  destroyOnClose: { type: Boolean, default: void 0 },
  wrapClassName: String,
  maskTransitionName: String,
  transitionName: String,
  getContainer: {
    type: [String, Function, Boolean, Object],
    default: void 0
  },
  zIndex: Number,
  bodyStyle: S(),
  maskStyle: S(),
  mask: { type: Boolean, default: void 0 },
  keyboard: { type: Boolean, default: void 0 },
  wrapProps: Object,
  focusTriggerAfterClose: { type: Boolean, default: void 0 },
  modalRender: Function,
  mousePosition: S()
}), y = /* @__PURE__ */ H({
  name: "SimpleModal",
  inheritAttrs: !1,
  props: fe(pt(), {
    width: 520,
    confirmLoading: !1,
    okType: "primary"
  }),
  setup(e, {
    emit: o,
    slots: t,
    attrs: n
  }) {
    const a = e.prefixCls || "simple-modal", r = "simple-dialog", u = "simple", c = A(null);
    ne(() => e.open ?? e.visible, (d) => {
      d && (c.value = e.mousePosition ?? me());
    }, {
      immediate: !0
    });
    const p = (d) => {
      e.confirmLoading || (o("update:visible", !1), o("update:open", !1), o("cancel", d), o("change", !1));
    }, i = (d) => {
      o("ok", d);
    }, f = () => {
      const {
        okText: d = t.okText?.(),
        okType: C,
        cancelText: v = t.cancelText?.(),
        confirmLoading: k
      } = e;
      return s(Ke, null, [s(te, O({
        type: "dashed",
        onClick: p,
        disabled: k
      }, e.cancelButtonProps), {
        default: () => [v || "取消"]
      }), s(te, O({
        type: C === "danger" ? "primary" : C,
        danger: C === "danger",
        loading: k,
        onClick: i
      }, e.okButtonProps), {
        default: () => [d || "确定"]
      })]);
    };
    return () => {
      const {
        prefixCls: d,
        visible: C,
        open: v,
        wrapClassName: k,
        centered: U,
        getContainer: X,
        closeIcon: F = t.closeIcon?.(),
        focusTriggerAfterClose: K = !0,
        confirmLoading: w,
        maskClosable: N = !0,
        ...l
      } = e, m = T(k, {
        [`${a}-centered`]: !!U
      }), g = w ? !1 : N, b = w ? !1 : l.keyboard ?? !0, B = w ? !1 : l.closable ?? !0;
      return s(ct, O(l, n, {
        class: T(n.class),
        getContainer: X,
        prefixCls: r,
        wrapClassName: m,
        visible: v ?? C,
        onClose: p,
        focusTriggerAfterClose: K,
        maskClosable: g,
        keyboard: b,
        closable: B,
        transitionName: oe(u, "zoom", e.transitionName),
        maskTransitionName: oe(u, "fade", e.maskTransitionName),
        mousePosition: c.value,
        modalRender: e.modalRender
      }), {
        ...t,
        footer: t.footer || f,
        closeIcon: () => s("span", {
          class: `${a}-close-x`
        }, [F || s(_e, {
          class: `${a}-close-icon`,
          size: 16
        }, null)])
      });
    };
  }
});
function ee(e) {
  return typeof e == "function" ? e() : e;
}
const Be = /* @__PURE__ */ H({
  name: "ConfirmDialog",
  props: ["icon", "onCancel", "onOk", "close", "zIndex", "afterClose", "open", "keyboard", "centered", "getContainer", "maskStyle", "okButtonProps", "cancelButtonProps", "okType", "prefixCls", "okCancel", "width", "mask", "maskClosable", "okText", "cancelText", "autoFocusButton", "transitionName", "maskTransitionName", "type", "title", "content", "direction", "rootPrefixCls", "bodyStyle", "closeIcon", "modalRender", "focusTriggerAfterClose", "wrapClassName", "iconPrefixCls", "style", "mousePosition"],
  setup(e, {
    attrs: o
  }) {
    const t = A(!1), n = P(() => {
      const {
        icon: u,
        type: c
      } = e;
      return u ? ee(u) : {
        info: s(Ge, {
          class: "w-6 h-6"
        }, null),
        success: s(Qe, {
          class: "w-6 h-6"
        }, null),
        error: s(qe, {
          class: "w-6 h-6"
        }, null),
        warning: s(ke, {
          class: "w-6 h-6"
        }, null),
        warn: s(ke, {
          class: "w-6 h-6"
        }, null),
        confirm: s(he, {
          class: "w-6 h-6"
        }, null)
      }[c] || s(he, {
        class: "w-6 h-6 text-blue-500"
      }, null);
    }), a = P(() => {
      const {
        okCancel: u,
        type: c
      } = e;
      return u ?? c === "confirm";
    }), r = async (u) => {
      const {
        onOk: c,
        close: p
      } = e;
      if (c) {
        t.value = !0;
        try {
          await c(u) !== !1 && p?.({
            triggerCancel: !1
          }, u);
        } catch {
        } finally {
          t.value = !1;
        }
      } else
        p?.({
          triggerCancel: !1
        }, u);
    };
    return () => {
      const {
        icon: u,
        onCancel: c,
        onOk: p,
        close: i,
        zIndex: f,
        afterClose: d,
        open: C,
        keyboard: v,
        centered: k,
        getContainer: U,
        maskStyle: X,
        okButtonProps: F,
        cancelButtonProps: K,
        okType: w = "primary",
        prefixCls: N,
        width: l,
        mask: m = !0,
        maskClosable: g = !1,
        okText: b,
        cancelText: B,
        autoFocusButton: D = "ok",
        transitionName: E,
        maskTransitionName: I,
        type: h,
        title: $,
        content: L,
        rootPrefixCls: q,
        bodyStyle: le,
        closeIcon: z,
        modalRender: Q,
        focusTriggerAfterClose: ie,
        wrapClassName: pe,
        style: ge,
        mousePosition: se
      } = e, W = `${N}-confirm`, M = `${W}`, ae = n.value, re = a.value && s(te, O({
        type: "dashed",
        onClick: (Y) => {
          t.value || i?.({
            triggerCancel: !0
          }, Y);
        },
        disabled: t.value
      }, K), {
        default: () => [B || "取消"]
      }), G = s(te, O({
        type: w === "danger" ? "primary" : w,
        danger: w === "danger",
        loading: t.value,
        onClick: r
      }, F), {
        default: () => [b || (a.value ? "确定" : "知道了")]
      });
      return s(y, {
        prefixCls: N,
        class: T(W, `${W}-${h}`, o.class),
        wrapClassName: T({
          [`${W}-centered`]: !!k
        }, pe),
        onCancel: (Y) => {
          t.value || i?.({
            triggerCancel: !0
          }, Y);
        },
        open: C,
        title: "",
        footer: "",
        confirmLoading: t.value,
        transitionName: oe(q, "zoom", E),
        maskTransitionName: oe(q, "fade", I),
        mask: m,
        maskClosable: t.value ? !1 : g,
        maskStyle: X,
        style: ge,
        bodyStyle: le,
        width: l,
        zIndex: f,
        afterClose: d,
        keyboard: t.value ? !1 : v,
        centered: k,
        getContainer: U || void 0,
        closable: !1,
        closeIcon: typeof z == "function" ? z() : z,
        modalRender: Q,
        focusTriggerAfterClose: ie,
        mousePosition: se
      }, {
        default: () => [s("div", {
          class: `${M}-body-wrapper`
        }, [s("div", {
          class: T(`${M}-body`, `${M}-${h}`)
        }, [ee(ae), $ === void 0 ? null : s("span", {
          class: `${M}-title`
        }, [ee($)]), s("div", {
          class: `${M}-content`
        }, [ee(L)])]), s("div", {
          class: `${M}-btns`
        }, [re, G])])]
      });
    };
  }
});
function gt(e, o, t) {
  e && e.component && (Object.assign(e.component.props, o), e.component.update());
}
const V = [], _ = (e) => {
  const o = document.createDocumentFragment();
  let t = {
    ...nt(e, ["appContext"]),
    close: r,
    open: !0,
    mousePosition: me()
  }, n = null;
  function a(...i) {
    n && (be(null, o), n = null);
    const f = i.some((d) => d && d.triggerCancel);
    e.onCancel && f && e.onCancel(() => {
    }, ...i.slice(1));
    for (let d = 0; d < V.length; d++)
      if (V[d] === r) {
        V.splice(d, 1);
        break;
      }
  }
  function r(...i) {
    t = {
      ...t,
      open: !1,
      afterClose: () => {
        typeof e.afterClose == "function" && e.afterClose(), a.apply(this, i);
      }
    }, t.visible && delete t.visible, u(t);
  }
  function u(i) {
    typeof i == "function" ? t = i(t) : t = {
      ...t,
      ...i
    }, n && gt(n, t);
  }
  const c = (i) => {
    const f = "simple", d = i.prefixCls || `${f}-modal`;
    return s(Be, O(i, {
      rootPrefixCls: f,
      prefixCls: d,
      iconPrefixCls: "simple-icon",
      cancelText: i.cancelText || "取消"
    }), null);
  };
  function p(i) {
    const f = s(c, {
      ...i
    });
    return f.appContext = e.appContext || f.appContext, be(f, o), f;
  }
  return n = p(t), V.push(r), {
    destroy: r,
    update: u
  };
};
function Oe(e) {
  return {
    ...e,
    type: "warning"
  };
}
function Ne(e) {
  return {
    ...e,
    type: "info"
  };
}
function $e(e) {
  return {
    ...e,
    type: "success"
  };
}
function Me(e) {
  return {
    ...e,
    type: "error"
  };
}
function je(e) {
  return {
    ...e,
    type: "confirm"
  };
}
const yt = /* @__PURE__ */ H({
  name: "HookModal",
  inheritAttrs: !1,
  props: fe({
    config: Object,
    afterClose: Function,
    destroyAction: Function,
    open: {
      type: Boolean,
      default: void 0
    }
  }, {
    config: {}
  }),
  setup(e, {
    expose: o
  }) {
    const t = "simple", n = P(() => e.config.prefixCls || `${t}-modal`), a = "simple-icon", r = () => {
      e.afterClose();
    };
    return o({
      destroy: () => {
        e.destroyAction();
      },
      update: (p) => {
        Object.assign(e.config, p);
      }
    }), () => s(Be, O(e.config, {
      close: e.destroyAction,
      open: e.open,
      afterClose: r,
      rootPrefixCls: t,
      prefixCls: n.value,
      iconPrefixCls: a,
      mousePosition: e.config.mousePosition || me()
    }), null);
  }
});
let Se = 0;
const Ct = /* @__PURE__ */ H({
  name: "ElementsHolder",
  inheritAttrs: !1,
  setup(e, {
    expose: o
  }) {
    const t = R([]);
    return o({
      addModal: (a) => (t.value.push(a), t.value = t.value.slice(), () => {
        t.value = t.value.filter((r) => r !== a);
      })
    }), () => t.value.map((a) => a());
  }
});
function vt() {
  const e = R(), o = R([]);
  ne(e, () => {
    e.value && (o.value.forEach((a) => a()), o.value = []);
  }, {
    immediate: !0
  });
  const t = (a) => function(u) {
    Se += 1;
    const c = R(), p = R(!0);
    let i;
    const f = () => {
      const v = P(() => a(ue(u)));
      return s(yt, {
        key: `modal-${Se}`,
        config: v.value,
        ref: c,
        open: p.value,
        destroyAction: () => {
          p.value = !1;
        },
        afterClose: () => {
          i?.(), v.value.afterClose?.();
        }
      }, null);
    };
    return e.value ? i = e.value.addModal(f) : o.value.push(() => {
      i = e.value.addModal(f);
    }), {
      destroy: () => {
        c.value ? c.value.destroy() : p.value = !1;
      },
      update: (v) => {
        c.value && c.value.update(v);
      }
    };
  }, n = {
    info: t(Ne),
    success: t($e),
    error: t(Me),
    warning: t(Oe),
    confirm: t(je)
  };
  return n.warn = n.warning, [n, () => s(Ct, {
    ref: e
  }, null)];
}
function Ae(e) {
  return _(Oe(e));
}
y.useModal = vt;
y.info = function(o) {
  return _(Ne(o));
};
y.success = function(o) {
  return _($e(o));
};
y.error = function(o) {
  return _(Me(o));
};
y.warning = Ae;
y.warn = Ae;
y.confirm = function(o) {
  return _(je(o));
};
y.destroyAll = function() {
  for (; V.length; ) {
    const o = V.pop();
    o && o();
  }
};
y.install = function(e) {
  return e.component(y.name || "Modal", y), e;
};
const Pe = tt(y), wt = {
  Modal: Pe,
  install(e) {
    return e.use(Pe), e;
  }
};
export {
  Pe as Modal,
  wt as default,
  vt as useModal
};
