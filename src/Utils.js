const Utils = Object.freeze({
  createElement(tagName, className) {
    const element = document.createElement(tagName)
    element.className = className
    return element
  },
  
  createElementString(tagName, className, content) {
    const openTag = `<${tagName} class="${className}">`
    const closeTag = `</${tagName}>`
    return openTag + content + closeTag
  },

  createState(initialState, onchange) {
    const state = {
      ...initialState,
      _commandStream: ''
    }
    const handler = {
      set: (obj, prop, value) => {
        obj[prop] = value
        onchange()
        return true
      }
    }
    return new Proxy(state, handler)
  },
  
  appendTo(target, ...children) {
    children.forEach(child =>
      target.appendChild(child))
  }
})

export default Utils
