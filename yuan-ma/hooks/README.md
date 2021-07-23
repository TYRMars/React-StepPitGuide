---
description: Hooks 源码
---

# Hooks

## ReactHooks入口

所有ReactHooks入口文件

{% code title="packages\\react\\src\\ReactHooks.js" %}
```javascript
export function useState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

export function useReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
): [S, Dispatch<A>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}

export function useRef<T>(initialValue: T): {|current: T|} {
  const dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}

export function useEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null,
): void {
  const dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, deps);
}

export function useLayoutEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void | null,
): void {
  const dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, deps);
}

export function useCallback<T>(
  callback: T,
  deps: Array<mixed> | void | null,
): T {
  const dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, deps);
}

export function useMemo<T>(
  create: () => T,
  deps: Array<mixed> | void | null,
): T {
  const dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, deps);
}

export function useImperativeHandle<T>(
  ref: {|current: T | null|} | ((inst: T | null) => mixed) | null | void,
  create: () => T,
  deps: Array<mixed> | void | null,
): void {
  const dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, deps);
}
```
{% endcode %}

resolveDispatcher\(\) 返回的是 ReactCurrentDispatcher.current，所以如 useState 其实就是 ReactCurrentDispatcher.current.useState。

## ReactCurrentDispatcher

```javascript
import type {Dispatcher} from 'react-reconciler/src/ReactFiberHooks';

const ReactCurrentDispatcher = {
  current: (null: null | Dispatcher),
}
```

## Hooks类型定义

### Hook

React 的 Hooks 是一个单向链表

{% code title="packages\\react-reconciler\\src\\ReactFiberHooks.js" %}
```javascript
export type Hook = {|
  memoizedState: any, // 指向当前渲染节点 Fiber, 上一次完整更新之后的最终状态值
  baseState: any, // 初始化 initialState， 已经每次 dispatch 之后 newState
  baseQueue: Update<any, any> | null, // 当前需要更新的 Update ，每次更新完之后，会赋值上一个 update，方便 react 在渲染错误的边缘，数据回溯
  queue: UpdateQueue<any, any> | null, // 缓存的更新队列，存储多次更新行为
  next: Hook | null, // link 到下一个 hooks，通过 next 串联每一 hooks
|};
```
{% endcode %}

### Update & UpdateQueue

```javascript
type Update<S, A> = {|
  lane: Lane, // 优先级，之前使用的 expirationTime: ExpirationTime
  action: A,
  eagerReducer: ((S, A) => S) | null,
  eagerState: S | null,
  next: Update<S, A>, // link 下一个 Update
|};

type UpdateQueue<S, A> = {|
  pending: Update<S, A> | null,
  interleaved: Update<S, A> | null,
  lanes: Lanes,
  dispatch: (A => mixed) | null,
  lastRenderedReducer: ((S, A) => S) | null,
  lastRenderedState: S | null,
|};
```

### HooksDispatcherOnMount & HooksDispatcherOnUpdate 

还有两个 Dispatch 的类型定义需要关注一下，一个是首次加载时的 HooksDispatcherOnMount，另一个是更新时的 HooksDispatcherOnUpdate。

{% code title="packages\\react-reconciler\\src\\ReactFiberHooks.js" %}
```javascript
const HooksDispatcherOnMount: Dispatcher = {
  readContext,

  useCallback: mountCallback,
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: mountImperativeHandle,
  useLayoutEffect: mountLayoutEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState,
  useDebugValue: mountDebugValue,
  useDeferredValue: mountDeferredValue,
  useTransition: mountTransition,
  useMutableSource: mountMutableSource,
  useOpaqueIdentifier: mountOpaqueIdentifier,

  unstable_isNewReconciler: enableNewReconciler,
};

const HooksDispatcherOnUpdate: Dispatcher = {
  readContext,

  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: updateState,
  useDebugValue: updateDebugValue,
  useDeferredValue: updateDeferredValue,
  useTransition: updateTransition,
  useMutableSource: updateMutableSource,
  useOpaqueIdentifier: updateOpaqueIdentifier,

  unstable_isNewReconciler: enableNewReconciler,
};
```
{% endcode %}

## 首次渲染

React Fiber 会从 packages/react-reconciler/src/ReactFiberBeginWork.js 中的 beginWork\(\) 开始执行，对于 Function Component，其走以下逻辑加载或更新组件：

{% code title="packages\\react-reconciler\\src\\ReactFiberBeginWork.js " %}
```javascript
function beginWork() {
  //....
    case FunctionComponent: {
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultProps(Component, unresolvedProps);
      return updateFunctionComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderLanes,
      );
    }
  //...
}
```
{% endcode %}

### updateFunctionComponent

{% code title="packages\\react-reconciler\\src\\ReactFiberBeginWork.js" %}
```javascript
// 更新函数组件
function updateFunctionComponent(
  current,
  workInProgress,
  Component,
  nextProps: any,
  renderLanes,
) {
  if (__DEV__) {
    if (workInProgress.type !== workInProgress.elementType) {
      // Lazy component props can't be validated in createElement
      // because they're only guaranteed to be resolved here.
      const innerPropTypes = Component.propTypes;
      if (innerPropTypes) {
        checkPropTypes(
          innerPropTypes,
          nextProps, // Resolved props
          'prop',
          getComponentName(Component),
        );
      }
    }
  }

  // context 获取
  let context;
  if (!disableLegacyContext) {
    const unmaskedContext = getUnmaskedContext(workInProgress, Component, true);
    context = getMaskedContext(workInProgress, unmaskedContext);
  }

  let nextChildren;
  prepareToReadContext(workInProgress, renderLanes);
  if (__DEV__) {
    ReactCurrentOwner.current = workInProgress;
    setIsRendering(true);
    nextChildren = renderWithHooks(
      current,
      workInProgress,
      Component,
      nextProps,
      context,
      renderLanes,
    );
    if (
      debugRenderPhaseSideEffectsForStrictMode &&
      workInProgress.mode & StrictMode
    ) {
      disableLogs();
      try {
        nextChildren = renderWithHooks(
          current,
          workInProgress,
          Component,
          nextProps,
          context,
          renderLanes,
        );
      } finally {
        reenableLogs();
      }
    }
    setIsRendering(false);
  } else {
    nextChildren = renderWithHooks(
      current,
      workInProgress,
      Component,
      nextProps,
      context,
      renderLanes,
    );
  }

  if (current !== null && !didReceiveUpdate) {
    bailoutHooks(current, workInProgress, renderLanes); //跳过hooks更新
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  }

  // React DevTools reads this flag.
  workInProgress.flags |= PerformedWork;
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}

//跳过hooks更新
export function bailoutHooks(
  current: Fiber,
  workInProgress: Fiber,
  lanes: Lanes,
) {
  workInProgress.updateQueue = current.updateQueue;
  if (__DEV__ && enableDoubleInvokingEffects) {
    workInProgress.flags &= ~(
      MountPassiveDevEffect |
      PassiveEffect |
      MountLayoutDevEffect |
      UpdateEffect
    );
  } else {
    workInProgress.flags &= ~(PassiveEffect | UpdateEffect);
  }
  current.lanes = removeLanes(current.lanes, lanes);
}
```
{% endcode %}

###  renderWithHooks

React Hooks 的渲染核心入口是 renderWithHooks。

{% code title="packages\\react-reconciler\\src\\ReactFiberHooks.js" %}
```javascript
export function renderWithHooks<Props, SecondArg>(
  current: Fiber | null,
  workInProgress: Fiber,
  Component: (p: Props, arg: SecondArg) => any,
  props: Props,
  secondArg: SecondArg,
  nextRenderLanes: Lanes,
): any {
  renderLanes = nextRenderLanes;
  currentlyRenderingFiber = workInProgress;

  if (__DEV__) {
    hookTypesDev =
      current !== null
        ? ((current._debugHookTypes: any): Array<HookType>)
        : null;
    hookTypesUpdateIndexDev = -1;
    // Used for hot reloading:
    ignorePreviousDependencies =
      current !== null && current.type !== workInProgress.type;
  }

  // 上一次渲染的时候的 state
  workInProgress.memoizedState = null;
  // 该 Fiber 对应的组件产生的 update 会存放在这个队列里面。
  workInProgress.updateQueue = null;
  workInProgress.lanes = NoLanes;

  // The following should have already been reset
  // currentHook = null;
  // workInProgressHook = null;

  // didScheduleRenderPhaseUpdate = false;

  // TODO Warn if no hooks are used at all during mount, then some are used during update.
  // Currently we will identify the update render as a mount because memoizedState === null.
  // This is tricky because it's valid for certain types of components (e.g. React.lazy)

  // Using memoizedState to differentiate between mount/update only works if at least one stateful hook is used.
  // Non-stateful hooks (e.g. context) don't get added to memoizedState,
  // so memoizedState would be null during updates and mounts.
  if (__DEV__) {
    if (current !== null && current.memoizedState !== null) {
      ReactCurrentDispatcher.current = HooksDispatcherOnUpdateInDEV;
    } else if (hookTypesDev !== null) {
      // This dispatcher handles an edge case where a component is updating,
      // but no stateful hooks have been used.
      // We want to match the production code behavior (which will use HooksDispatcherOnMount),
      // but with the extra DEV validation to ensure hooks ordering hasn't changed.
      // This dispatcher does that.
      ReactCurrentDispatcher.current = HooksDispatcherOnMountWithHookTypesInDEV;
    } else {
      ReactCurrentDispatcher.current = HooksDispatcherOnMountInDEV;
    }
  } else {
    // 用来存放 useState、useEffect 等 hook 函数的对象
    // 对于第一个渲染的是 HooksDispatcherOnMount
    // 之后的是 HooksDispatcherOnUpdate
    ReactCurrentDispatcher.current =
      current === null || current.memoizedState === null
        ? HooksDispatcherOnMount
        : HooksDispatcherOnUpdate;
  }

  // 执行我们写的 function，执行完毕后，返回 children
  // 第二个参数就是 context
  let children = Component(props, secondArg);

  // Check if there was a render phase update
  // 当有更新要渲染时
  if (didScheduleRenderPhaseUpdateDuringThisPass) {
    // Keep rendering in a loop for as long as render phase updates continue to
    // be scheduled. Use a counter to prevent infinite loops.
    // 只要渲染阶段更新继续，就保持循环渲染
    // 使用计数器防止这里无限循环
    let numberOfReRenders: number = 0;
    do {
      didScheduleRenderPhaseUpdateDuringThisPass = false;
      invariant(
        numberOfReRenders < RE_RENDER_LIMIT,
        'Too many re-renders. React limits the number of renders to prevent ' +
          'an infinite loop.',
      );

      numberOfReRenders += 1;
      if (__DEV__) {
        // Even when hot reloading, allow dependencies to stabilize
        // after first render to prevent infinite render phase updates.
        ignorePreviousDependencies = false;
      }

      // Start over from the beginning of the list
      currentHook = null;
      workInProgressHook = null;

      workInProgress.updateQueue = null;

      if (__DEV__) {
        // Also validate hook order for cascading updates.
        hookTypesUpdateIndexDev = -1;
      }

      ReactCurrentDispatcher.current = __DEV__
        ? HooksDispatcherOnRerenderInDEV
        : HooksDispatcherOnRerender;

      // 重新渲染
      children = Component(props, secondArg);
    } while (didScheduleRenderPhaseUpdateDuringThisPass);
  }

  // 我们可以假设前一个调度器始终是这个调度器，因为我们在渲染阶段开始时设置它并且没有重入。
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;

  if (__DEV__) {
    workInProgress._debugHookTypes = hookTypesDev;
  }

  // This check uses currentHook so that it works the same in DEV and prod bundles.
  // hookTypesDev could catch more cases (e.g. context) but only in DEV bundles.
  const didRenderTooFewHooks =
    currentHook !== null && currentHook.next !== null;

  // 重置全局变量
  renderLanes = NoLanes;
  currentlyRenderingFiber = (null: any);

  currentHook = null;
  workInProgressHook = null;

  if (__DEV__) {
    currentHookNameInDev = null;
    hookTypesDev = null;
    hookTypesUpdateIndexDev = -1;
  }

  didScheduleRenderPhaseUpdate = false;

  invariant(
    !didRenderTooFewHooks,
    'Rendered fewer hooks than expected. This may be caused by an accidental ' +
      'early return statement.',
  );

  return children;
}
```
{% endcode %}

renderWithHooks 包括三个部分，首先是赋值 4.1 中提到的 ReactCurrentDispatcher.current，后续是做 didScheduleRenderPhaseUpdate 以及一些初始化的工作。核心是第一部分，我们来看看：

```javascript
nextCurrentHook = current !== null ? current.memoizedState : null;

ReactCurrentDispatcher.current =
    nextCurrentHook === null
      ? HooksDispatcherOnMount
      : HooksDispatcherOnUpdate;
```

如果当前 Fiber 为空，就认为是首次加载，ReactCurrentDispatcher.current.useState 将赋值成 HooksDispatcherOnMount.useState，否则赋值 HooksDispatcherOnUpdate.useState。根据 4.2 中的类型定义，即首次加载时，useState = ReactCurrentDispatcher.current.useState = HooksDispatcherOnMount.useState = mountState；更新时 useState = ReactCurrentDispatcher.current.useState = HooksDispatcherOnUpdate.useState = updateState。

### dispatchAction

{% code title="packages\\react-reconciler\\src\\ReactFiberHooks.js" %}
```javascript
// fiber 就是当前 functionComponent 的 Fiber 对象
// queue 是首次渲染的时候 new 的一个对象，用于存放后续的 dispatchAction 的 action
// action 就是我们写的比如setCount(count + 1)
function dispatchAction<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A,
) {
  if (__DEV__) {
    if (typeof arguments[3] === 'function') {
      console.error(
        "State updates from the useState() and useReducer() Hooks don't support the " +
          'second callback argument. To execute a side effect after ' +
          'rendering, declare it in the component body with useEffect().',
      );
    }
  }

  // eventTime是当前触发更新的时间戳
  const eventTime = requestEventTime();
  // 获取Fiber的lane 优先级
  const lane = requestUpdateLane(fiber);

  const update: Update<S, A> = {
    lane,
    action,
    eagerReducer: null,
    eagerState: null,
    next: (null: any),
  };

  // Append the update to the end of the list.
  const pending = queue.pending;
  if (pending === null) {
    // This is the first update. Create a circular list.
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;

  const alternate = fiber.alternate; // old Fiber
  if (
    fiber === currentlyRenderingFiber ||
    (alternate !== null && alternate === currentlyRenderingFiber)
  ) {
    // This is a render phase update. Stash it in a lazily-created map of
    // queue -> linked list of updates. After this render pass, we'll restart
    // and apply the stashed updates on top of the work-in-progress hook.
    didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
  } else {
    if (
      fiber.lanes === NoLanes &&
      (alternate === null || alternate.lanes === NoLanes)
    ) {
      // The queue is currently empty, which means we can eagerly compute the
      // next state before entering the render phase. If the new state is the
      // same as the current state, we may be able to bail out entirely.
      const lastRenderedReducer = queue.lastRenderedReducer;
      if (lastRenderedReducer !== null) {
        let prevDispatcher;
        try {
          const currentState: S = (queue.lastRenderedState: any);
          const eagerState = lastRenderedReducer(currentState, action);
          // Stash the eagerly computed state, and the reducer used to compute
          // it, on the update object. If the reducer hasn't changed by the
          // time we enter the render phase, then the eager state can be used
          // without calling the reducer again.
          update.eagerReducer = lastRenderedReducer;
          update.eagerState = eagerState;
          if (is(eagerState, currentState)) {
            // Fast path. We can bail out without scheduling React to re-render.
            // It's still possible that we'll need to rebase this update later,
            // if the component re-renders for a different reason and by that
            // time the reducer has changed.
            return;
          }
        } catch (error) {
          // Suppress the error. It will throw again in the render phase.
        }
      }
    }
    scheduleUpdateOnFiber(fiber, lane, eventTime);
  }

  if (enableSchedulingProfiler) {
    markStateUpdateScheduled(fiber, lane);
  }
}

```
{% endcode %}

{% code title="packages\\react-reconciler\\src\\ReactFiberHooks.js" %}
```javascript
function mountWorkInProgressHook(): Hook {
  const hook: Hook = {
    memoizedState: null,

    baseState: null,
    baseQueue: null,
    queue: null,

    next: null,
  };

  if (workInProgressHook === null) {
    // This is the first hook in the list
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // Append to the end of the list
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}
```
{% endcode %}

![](../../.gitbook/assets/image%20%284%29.png)

## 更新

{% code title="packages\\react-reconciler\\src\\ReactFiberHooks.new.js" %}
```javascript
function updateWorkInProgressHook(): Hook {
  // This function is used both for updates and for re-renders triggered by a
  // render phase update. It assumes there is either a current hook we can
  // clone, or a work-in-progress hook from a previous render pass that we can
  // use as a base. When we reach the end of the base list, we must switch to
  // the dispatcher used for mounts.
  // 此函数用于更新和由渲染阶段更新触发的重新渲染。
  // 假设有一个我们可以克隆的当前钩子，或者一个我们可以用作基础的来自先前渲染通道的正在进行中的钩子。
  // 当我们到达基本列表的末尾时，我们必须切换到用于挂载的调度程序。
  let nextCurrentHook: null | Hook;
  if (currentHook === null) {
    const current = currentlyRenderingFiber.alternate;
    if (current !== null) {
      nextCurrentHook = current.memoizedState;
    } else {
      nextCurrentHook = null;
    }
  } else {
    nextCurrentHook = currentHook.next;
  }

  let nextWorkInProgressHook: null | Hook;
  if (workInProgressHook === null) {
    nextWorkInProgressHook = currentlyRenderingFiber.memoizedState;
  } else {
    nextWorkInProgressHook = workInProgressHook.next;
  }

  if (nextWorkInProgressHook !== null) {
    // There's already a work-in-progress. Reuse it.
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook.next;

    currentHook = nextCurrentHook;
  } else {
    // Clone from the current hook.

    invariant(
      nextCurrentHook !== null,
      'Rendered more hooks than during the previous render.',
    );
    currentHook = nextCurrentHook;

    const newHook: Hook = {
      memoizedState: currentHook.memoizedState,

      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,

      next: null,
    };

    if (workInProgressHook === null) {
      // This is the first hook in the list.
      currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
    } else {
      // Append to the end of the list.
      workInProgressHook = workInProgressHook.next = newHook;
    }
  }
  return workInProgressHook;
}
```
{% endcode %}

{% hint style="info" %}
参考文档

1. [React Hooks 源码解析（3）：useState](https://me.ursb.me/archives/useState.html)😃 
{% endhint %}

