# use-chat-scroll

_by Vytenis Urbonavičius_

**UNDER DEVELOPMENT - NOT WORKING WELL YET**

_use-chat-scroll_ is a React hook for chat-like scroll behavior of HTML elements.

Main features:

- When scroll is at the bottom of container, it would stay there whenever new data is added.
- When scrolling up, it provides infinite scroll behavior.

You can use **useChatScroll** for getting both features or **useStickyScroll** to only keep scroll at the bottom when new data is added to scrollable HTML element.

---

## Installation

```
npm install --save use-chat-scroll
```

---

## Usage

Below examples use **TypeScript**. However, you can use plain **JavaScript** as well by skipping type declarations and writing everything else same as in examples.

Typical usage of full chat scroll behavior:

```typescript
import {useChatScroll} from 'use-chat-scroll'

const YourFunctionalReactComponent: React.FC = (data: any[], loadMoreCb: ILoadMoreCb) => {
  const containerRef = useRef<React.MutableRefObject<HTMLDivElement>>()
  useChatScroll(containerRef, data, loadMoreCb)

  return (
    <div ref={containerRef} style={{height: 100, width: 100, overflow: 'auto'}}>
      {data.map(item => (
        // ...
      ))}
    </div>
  )
}
```

If you only need to keep scroll at the bottom without infinite scroll behavior:

```typescript
import {useStickyScroll} from 'use-chat-scroll'

const YourFunctionalReactComponent: React.FC = (data: any[]) => {
  const containerRef = useRef<React.MutableRefObject<HTMLDivElement>>()
  useStickyScroll(containerRef, data)

  return (
    <div ref={containerRef} style={{height: 100, width: 100, overflow: 'auto'}}>
      {data.map(item => (
        // ...
      ))}
    </div>
  )
}
```

**Important!**

_loadMoreCb_ is called whenever additional data chunk/page needs to be loaded. It is very important to ensure that this callback does not issue a request if end of data is reached. Otherwise target server will be spammed with multiple useless requests. It is also a responsibility of consumer of the hook to determine what is already loaded and what should be loaded at the moment of calling the callback.

_loadMoreCb_ needs to accept an argument _beforeRender_. This argument is a callback which should be called immediately after server responds with a new chunk/page of data but before this data is handled by some state management library or React itself.

## Supported Configuration

It is possible to customize behavior of _useChatScroll_. This is done by passing additional object argument when calling the hook:

```typescript
useChatScroll(ref, data, loadCb, options)
```

Options is an object with the following structure (below example contains default values). All keys are optional.

```typescript
const options = {

  /**
   * Options for reverse infinite scroll behavior.
   */
  reverseInfiniteScroll: {

    /**
     * Defines how close to the top user needs to scroll in order to invoke gathering of additional data.
     */
    scrollThreshold: {

      /**
       * Defines how threshold is calculated.
       */
      type: EScrollThresholdType.fraction,

      /**
       * Threshold value.
       */
      value: 0.3,

    },

    /**
     * Defines whether infinite scroll behavior is enabled initially.
     */
    enabled: true,

  },

  /**
   * Options for sticky scroll behavior.
   */
  stickyScroll: {

    /**
     * Defines whether sticky scroll behavior is enabled initially.
     */
    enabled: true.

  },
}
```

## Additional Documentation

You can find more details about the hook in a generated documentation under "./docs" folder of the node module.
