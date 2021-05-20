[Terminal]

This is a simple terminal application for the web, intended to display useful information when integrated with other applications.

[How to use it]

// Create some state.
const state = {
  name: ''
}

function App(text) {
  // Create a component function.
  text('Hello World!', 'blue')
  text(
    state.name
    ? `Nice to meet you, ${state.name}`
    : 'I do not know your name yet.'
  )
}

// Instantiate the terminal.
const terminal = new Terminal({
  placeholder: 'Try some command here!'
})

// Render the component.
terminal.render(App)

// Listen to commands inputs.
terminal.on('hello', args => {
  const [name] = args
  state.name = name
})
