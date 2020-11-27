# use-chat-scroll

_by Vytenis Urbonavičius_

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

Usage example of full chat scroll behavior with React hooks for data state management:

```typescript
import {useChatScroll, useDataLoader} from 'use-chat-scroll'

const loadAdditionalData = () => [ /* Additional data */ ]

const YourFunctionalReactComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([])
  const containerRef = useRef<React.MutableRefObject<HTMLDivElement>>()
  const loader = useDataLoader(loadAdditionalData, data, setData)
  useChatScroll(containerRef, data, loader)

  return (
    <div ref={containerRef} style={{height: "400px", width: "100%", overflow: 'auto'}}>
      {data.map(item => (
        // ...
      ))}
    </div>
  )
}
```

In case you would notice that scroll is not properly adjusted when loading additional data, make sure that setting _scrollTop_ attribute to scrollable HTML element works. Sometimes browsers have issues when height is set using percentage. This is not considered to be a hook-related issue.

Note that even if _loadAdditionalData_ would be defined inside a functional component, it would not be able to properly use state variables such as _data_. If such data would need to be passed, use optional fourth argument of _useDataLoader_ hook. Array passed there would become accessible as arguments in _loadAdditionalData_.

If you would be using a state management library such as _Redux_ with thunk actions, you would not need to be using _useDataLoader_. In such case your action should accept _beforeRender_ callback and would become a _loader_ itself. _beforeRender_ callback should be invoked immediately after gathering data but before updating state.

If you only need to keep scroll at the bottom without infinite scroll behavior:

```typescript
import {useStickyScroll} from 'use-chat-scroll'

const YourFunctionalReactComponent: React.FC = (data: any[]) => {
  const containerRef = useRef<React.MutableRefObject<HTMLDivElement>>()
  useStickyScroll(containerRef, data)

  return (
    <div ref={containerRef} style={{height: "400px", width: "100%", overflow: 'auto'}}>
      {data.map(item => (
        // ...
      ))}
    </div>
  )
}
```

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
