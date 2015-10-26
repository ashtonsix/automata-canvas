automata-canvas
===============
Performant React component for displaying 2d (nested) arrays.

`npm i automata-canvas`

Usage
=====

```
<Automata
  toColor={v => v ? 'blue' : 'white'}
  data={[
    [1, 1, 1, 0, 0],
    [0, 0, 1, 1, 0],
  ]}
/>
```
![example](./readmeExample.svg)

##### toColor :: (value, x, y) => color
