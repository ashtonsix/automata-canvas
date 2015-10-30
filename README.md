automata-canvas
===============
Performant React component for displaying 2d (nested) arrays.

`npm i automata-canvas`

Usage
=====

```
<Automata
  toColor={v => v ? 'blue' : 'white'}
  onClick={(e, x, y) => toggleValueAt(x, y)}
  data={[
    [1, 1, 1, 0, 0],
    [0, 0, 1, 1, 0],
  ]}
/>
```
![example](https://raw.githubusercontent.com/Demi-IO/automata-canvas/master/readmeExample.svg)

##### toColor :: (value, x, y) => color
##### onClick :: (value, x, y) => sideEffect
