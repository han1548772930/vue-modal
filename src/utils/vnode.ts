import type { VNode } from 'vue';

export function triggerVNodeUpdate(vnode: VNode, newProps: any, container: any) {
  if (vnode && vnode.component) {
    Object.assign(vnode.component.props, newProps);
    vnode.component.update();
  }
}
