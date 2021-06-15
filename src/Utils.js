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
  
  appendTo(target, ...children) {
    children.forEach(child =>
      target.appendChild(child))
  }
})

export default Utils
