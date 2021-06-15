# terminal

This is a simple terminal application for the web, intended to display useful information when integrated with other applications.

## Usage

```javascript
import { Background, Color, Terminal } from '../dist/Terminal.js'

// Create a terminal instance.
// For styling, grab the `./test/Terminal.css` file.
const terminal = new Terminal({
  // Provide some state to it.
  // (The renderer just watches this object for changes.)
  count: 0
})

// Render the fixed text of the terminal.
terminal.render(({ state, write, writenl }) => {
  write('Hello World!')
  writenl(`The current count is ${state.count}!`, Color.blue)
  writenl('Try the ')
  write('count', Background.white)
  write(' command!')
})

// Add comands to the terminal.
terminal.on('count', ({ args, state }) => {
  state.count += (Number(args[0]) || 1)
})

// Attach it to an element.
terminal.attachTo(document.body)
```