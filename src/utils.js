export function createElement(tagName, className) {
  const element = document.createElement(tagName)
  element.className = className
  return element
}

export function appendToBody(element) {
  appendTo(document.body, element)
}

export function appendTo(to, what) {
  to.appendChild(what)
}

export function setAttribute(element, attribute, value) {
  element.setAttribute(attribute, value || attribute)
}

export function removeAttribute(element, attribute) {
  element.removeAttribute(attribute)
}

export function hasAttribute(element, attribute) {
  return element.hasAttribute(attribute)
}

export function startRenderLoop(loopFunction) {
  const callback = () => {
    loopFunction()
    requestAnimationFrame(callback)
  }
  callback()
}

export function wrap(tagName, className, innerHTML) {
  const element = document.createElement(tagName)
  element.innerHTML = innerHTML
  element.className = className.join(' ')
  return element.outerHTML
}

export function equals(element, value) {
  return element.innerHTML === value
}

export function update(element, value) {
  element.innerHTML = value
}

export function when(element, event, handler) {
  element.addEventListener(event, handler)
}

export function write() {
  // Seems wrong but about right!
  const func = function (text, bgColor) {
    if (bgColor) {
      text = wrap('span', ['bg', bgColor], text)
    }
    func.value = (func.value || '') + text
  }
  return func
}

export function getHtml(text) {
  const wrapper = createElement('div')
  wrapper.innerHTML = text
  return wrapper.innerHTML
}
