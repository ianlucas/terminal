import { Terminal, Background, Color } from '../dist/Terminal.js'

const wait = timeout =>
  new Promise(resolve =>
    setTimeout(resolve, timeout))

const app = new Terminal({
  count: 0
})

app.render(({ write, writenl, state }) => {
  write('Hello World')
  writenl('Defect 10', Background.green)
  write(' Please take a look.')
  writenl(`The count is ${state.count}!`)
  console.log(state)
  write(state._commandStream)
})

app.on('count', ({ state }) => {
  state.count += 1
})

app.on('clear', ({ state }) => {
  state._commandStream = ''
})

app.on('fetch', async ({ state, writenl, write }) => {
  writenl('This will take a while.')
  await wait(10000)
  writenl('Done!', Color.green)
  state.count += 1
})

app.attachTo(document.body)
