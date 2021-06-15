import Utils from './Utils'

class TerminalDOM {
  constructor() {
    this._root = Utils.createElement('div', 'terminal-node')
    this._screen = Utils.createElement('div', 'terminal-screen')
    this._inputWrapper = Utils.createElement('span', 'terminal-input-wrapper')
    this._input = Utils.createElement('input', 'terminal-input')
    Utils.appendTo(this._inputWrapper, this._input)
    Utils.appendTo(this._root, this._screen, this._inputWrapper)
  }
  
  render(innerHTML) {
    this._screen.innerHTML = innerHTML
  }
  
  attachInputHandler(listener) {
    this._input.addEventListener('keydown', async e => {
      if (e.key !== 'Enter') {
        return
      }
      const parts = this._input.value.split(' ')
      const [command, ...args] = parts;
      this._input.disabled = true
      await listener(command, args)
      this._input.disabled = false
      this._input.value = ''
      this._input.focus()
    })
  }

  attachTo(parentNode) {
    Utils.appendTo(parentNode, this._root)
  }
}

export default TerminalDOM
