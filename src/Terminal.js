import { appendToBody, appendTo, createElement, equals, hasAttribute, removeAttribute, setAttribute, startRenderLoop, update, when, write } from './utils'

class Terminal {
  constructor(config = {}) {
    // Setup the internal elements.
    this.root = createElement('div', 'root')
    this.input = createElement('input', 'input')
    this.inputWrapper = createElement('div', 'inputWrapper')
    this.registeredCommands = {
      __unknown__() {}
    }

    // DOM handling.
    setAttribute(
      this.input,
      'placeholder',
      config.placeholder
      || 'Type a command here...'
    )
    appendTo(this.inputWrapper, this.input)
    appendToBody(this.root)
    appendToBody(this.inputWrapper)
    when(this.input, 'keydown', this._handleKeydownEvent.bind(this))
  }

  render(component) {
    // The main render function, it accepts a component and will
    // render it every requested frame when something changes.
    startRenderLoop(() => {
      const buffer = write()
      component(buffer)
      if (equals(this.root, buffer.value)) {
        // We will do nothing if nothing has changed.
        return
      }
      update(this.root, buffer.value)
    })
  }

  on(command, handler) {
    // Watch for commands input.
    this.registeredCommands[command] = handler
  }

  async _handleKeydownEvent(e) {
    // Iternally we should handle input events.
    if (e.key !== 'Enter' || hasAttribute(e.target, 'disabled')) {
      // We will only handle enters here (for now?).
      return
    }
    const plain = e.target.value
    const args = plain.split(' ')
    const command = args.shift()
    setAttribute(e.target, 'disabled')
    if (!this.registeredCommands[command]) {
      this.registeredCommands.__unknown__(command, plain)
    } else {
      const handler = this.registeredCommands[command]
      await handler(args, plain)
    }
    removeAttribute(e.target, 'disabled')
    e.target.value = ''
    e.target.focus()
  }
}

export default Terminal
