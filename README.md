automata-canvas
===============
Performant React component for displaying 2d (nested) arrays.

`npm i automata-canvas`

Usage
=====

```
import Automata from 'automata-canvas'

<Automata
  data={[
    [1, 1, 1, 0, 0],
    [0, 0, 1, 1, 0],
  ]}
  toColor={v => v ? 'blue' : 'white'}
/>
```

<img src="https://cdn.rawgit.com/Demi-IO/automata-canvas/master/readmeExample.svg" alt="example" width="200px"/>

Or for an animated canvas:

```
import {AutomataRunner as Automata} from 'automata-canvas'

<Automata
  initialData={generateData()}
  toColor={v => v ? 'blue' : 'white'}
  tick={gameOfLife}
/>
```

API
===

### Base

##### `data    :: 2d array`
##### `toColor :: (value, x, y) => color`
##### `onClick :: (value, x, y) => sideEffect`

### Runner
`data` should be named `initialData`. `toColor` & `onClick` are not changed. These are additional arguments:

##### `onChange   :: (newValue, meta) => sideEffect`
You can also use the `data` & `meta` methods like so:

`<Automata {...{initialData, tick}} ref='auto'/>` & somewhere else: `this.refs.auto.data()`.

##### `tick       :: (value, meta) => (newValue | {data: newValue, meta})`
Return either the `newValue` or an object w/ the keys `data` & `meta`. `meta` is not shown & is for purposes like hiding, or caching parts of the data(see [Hashlife](https://en.wikipedia.org/wiki/Hashlife)).

##### `refreshRate :: msBetweenTicks`
##### `running     :: bool`
