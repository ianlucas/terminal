import Terminal from '../dist/Terminal.js'

const state = {
  defects: [],
  console: ''
}

const SEVERITY_BG = {
  'LOW': 'green',
  'MEDIUM': 'yellow',
  'HIGH': 'red'
}

function createDefect() {
  return {
    id: Math.ceil(Math.random() * 999),
    severity: Object.keys(SEVERITY_BG)[Math.floor(Math.random() * 3)]
  }
}

setInterval(() => {
  const luck = Math.random() * 100
  if (luck <= 30) {
    // A random defect will be removed from the list.
    state.defects.splice(
      Math.floor(Math.random() * state.defects.length), 1
    )
  }
  if (luck <= 70) {
    // A new defect will be open! Run!
    state.defects.push(createDefect())
  }
  
  console.log(luck, state)
}, 5000)


function wait(time) {
  return new Promise(resolve => (
    setTimeout(resolve, time))
  )
}

function App(text) {
  text('Defects Monitor\n', 'white')
  text('Development Team\n')
  text('\n')
  
  if (!state.defects.length) {
    text('There are no defects at the moment!! 🎉', 'blue')
  } else {
    for (const defect of state.defects) {
      text(`Defect ${defect.id} `)
      text(defect.severity, SEVERITY_BG[defect.severity])
      text('\n')
    }
  }
  text(state.console)
}

function sendTypedConsole(typed) {

}

function sendConsole(typed, responseText) {
  state.console += `\n] ${typed}`
  if (responseText) {
    state.console += `\n${responseText}`
  }
}

const terminal = new Terminal

terminal.render(App)

terminal.on('clear', () => {
  state.console = ''
})

terminal.on('async', async (args, plain) => {
  const [time] = args
  if (!time) {
    return sendConsole(plain, 'Usage: async &lt;time&gt;\nWe will wait then print we waited. 🤡')
  }
  if (!time.match(/^\d+$/)) {
    return sendConsole(plain, 'Bad number.')
  }
  await wait(Number(time) * 1000)
  sendConsole(plain, `Waited for ${time} seconds.`)
})

terminal.on('version', (args, plain) => {
  sendConsole(plain, 'Version 1.0.0')
})

terminal.on('__unknown__', (command, plain) => {
  sendConsole(plain, (
    command !== ''
    ? 'Bad command.'
    : ''
  ))
})
