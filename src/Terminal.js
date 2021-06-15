import Color from './Color'
import TerminalDOM from './TerminalDOM'
import TerminalBuffer from './TerminalBuffer'
import Utils from './Utils'

class Terminal {
  constructor(initialState = {}) {
    this._renderFn = null
    this._dom = new TerminalDOM
    this._commands = {
      _error: ({ writenl }) =>
        writenl('Unknown command.', Color.red),
      clear: ({ state }) =>
        state._commandStream = ''
    }
    this._state = Utils.createState(
      initialState, this._render.bind(this))
    this._dom.attachInputHandler(
      this._handleInput.bind(this))
  }
  
  async _handleInput(command, args) {
    if (!this._commands[command]) {
      return this._handleInput('_error',
        { command, ...args })
    }
    const buffer = new TerminalBuffer
    await this._commands[command]({
      command, args,
      state: this._state,
      write: buffer.write,
      writenl: buffer.writenl
    })
    this._state._commandStream += buffer.toString()
  }
  
  _render() {
    const buffer = new TerminalBuffer
    this._renderFn({
      write: buffer.write,
      writenl: buffer.writenl,
      state: this._state
    })
    buffer.write(this._state._commandStream)
    this._dom.render(buffer.toString())
  }
  
  render(renderFn) {
    this._renderFn = renderFn;
    this._render()
  }
  
  on(command, handler) {
    this._commands[command] = handler
  }
  
  attachTo(parentNode) {
    this._dom.attachTo(parentNode)
  }
}

export default Terminal
