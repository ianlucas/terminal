import Utils from './Utils'

class TerminalBuffer {
  constructor() {
    this._value = ''

    this.write = this.write.bind(this)
    this.writenl = this.writenl.bind(this)
  }
  
  write(string, config = {}) {
    let className = []
    if (config.backgroundColor)
      className.push(`terminal-bg-${config.backgroundColor}`)
    if (config.textColor)
      className.push(`terminal-tx-${config.textColor}`)
    this._value += Utils.createElementString(
      'span', className.join(' '), string)
  }
  
  writenl(string, config) {
    this.write('\n' + string, config)
  }
  
  toString() {
    return this._value
  }
}

export default TerminalBuffer
