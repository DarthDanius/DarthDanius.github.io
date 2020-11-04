export async function animHandler($el, ...cls) {// animHandler( element || $element, 'className' || ['className'] || function)
  return new Promise((resolve) => {
    const el = ($el.jquery === undefined) ? $el : $el[0]
    el.onanimationend = (e) => resolve(e);
    el.ontransitionend = (e) => resolve(e);
    if (typeof cls[0] === 'function') {
      cls[0]($el);
    } else {
      cls.forEach( (i)=>{el.classList.add(i)});
    }
    setTimeout(()=> { return resolve(true) }, 5000)
  })
};

export function touchAvailable(setDataTouch = false) {
  const touch = ( ('ontouchstart' in window || ( window.DocumentTouch && document instanceof DocumentTouch) ) ) ? true : false;
  if ( setDataTouch ) {
    if ( !touch ) {
      console.log('событие touch недоступно');
      $('body')[0].dataset.touch = "false"
    } else console.log('событие touch доступно');
  }
  return touch;
}

export function replaceClass(el, replaceableClass, replacementClass, revers=false) {
  if (!el) return
  if (el.jquery) el = el[0];
  if (revers) [replaceableClass, replacementClass] = [replacementClass, replaceableClass]
  if (replaceableClass !== '') el.classList.remove(replaceableClass);
  if (replacementClass !== '') el.classList.add(replacementClass);
}

export function setEventDelay(arg, f, ms, init=false, ...args) { // задержка для функции. init = true выполнить функцию до установки таймера.
  let timer = null;
  function eventToArgs(e, args){
    const argsLength = args.length
    if (argsLength <= args.length) {
      args[0] = e
    } else {
      args.unshift(e)
    }
  }
  function executor(e) {

    if (!timer) {
      if (init) {
        timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
        }, ms, e);
        eventToArgs(e, args)
        f(arg, ...args);
      }
      else {
        timer = setTimeout(
          function() {
            clearTimeout(timer);
            timer = null;
            eventToArgs(e, args)
            f(arg, ...args);
          },
          ms,
          e
        )
      }
    }
  }

  return executor
}

export function setDelay(response, ms) {
  return new Promise((resolve) => {
    setTimeout( (r) => resolve(r), ms, response);
  })
};

export function wait(f, ...args){
  let wait;
  return async function() {
    if (wait === undefined) wait = false
    if (!wait) {
      wait = true
      await f(...args)
      wait = false
    }
  }
}

export function log(content, message = null) {
  if (!message) message = String(content);
  console.info(message)
  console.log(content)
}

export const DATA_SET_NOT_FOCUS = 'data-not-focus'
export const FOCUSABLE_ELEMENTS_SELECTOR = `
  a[href]:not([tabindex='-1']):not([${DATA_SET_NOT_FOCUS}]),
  area[href]:not([tabindex='-1']):not([${DATA_SET_NOT_FOCUS}]),
  input:not([disabled]):not([tabindex='-1']):not([${DATA_SET_NOT_FOCUS}]),
  select:not([disabled]):not([tabindex='-1']):not([${DATA_SET_NOT_FOCUS}]),
  textarea:not([disabled]):not([tabindex='-1']):not([${DATA_SET_NOT_FOCUS}]),
  button:not([disabled]):not([tabindex='-1']):not([${DATA_SET_NOT_FOCUS}]),
  iframe:not([tabindex='-1']):not([${DATA_SET_NOT_FOCUS}]),
  [tabindex]:not([tabindex='-1']):not([${DATA_SET_NOT_FOCUS}]),
  [contentEditable=true]:not([tabindex='-1']):not([${DATA_SET_NOT_FOCUS}])
`

export function getFocusableElements($node) {
  if (!$node.jquery) $node = $($node)
  return $(FOCUSABLE_ELEMENTS_SELECTOR, $node)
}

export function disabledOuterTab($node) {
  if (!$node.jquery) $node = $($node)
  let focusableElements = getFocusableElements($node)
  if (!focusableElements.length) focusableElements.push($node[0])
  let currentIndex = 0
  let lastIndex = focusableElements.length - 1
  let init = false
  let previousFocus
  let focusable = $node.is(FOCUSABLE_ELEMENTS_SELECTOR)

  function next() {
    (currentIndex === lastIndex) ? currentIndex = 0 : ++currentIndex
    focusableElements[currentIndex].focus()
    return focusableElements[currentIndex]
  }

  function previous() {
    (currentIndex === 0) ? currentIndex = lastIndex : --currentIndex
    focusableElements[currentIndex].focus()
    return focusableElements[currentIndex]
  }

  function keydownHandler(e) {
    if (!e.repeat && !e.shiftKey && e.code === 'Tab') {
      e.preventDefault()
      $(':focus')[0] ? next() : focusableElements[currentIndex].focus()
    }
    if (!e.repeat && e.shiftKey && e.code === 'Tab') {
      e.preventDefault()
      $(':focus')[0] ? previous() : focusableElements[currentIndex].focus()
    }
  }

  function clickHandler(e) {
    let index = focusableElements.index(e.target)
    if (index !== -1) {
      currentIndex = index
    }  
  }

  return function disabledOuterTabExecutor(condition = true){
    if (condition && !init) {
      if ( !focusable ) $node.attr('tabindex', 0)
      previousFocus = $(':focus')[0]
      previousFocus?.blur()
      init = true
      $(document).on('keydown', keydownHandler)
      $(document).on('mouseup', clickHandler)
    } else if (!condition && init) {
      if ( !focusable ) $node.removeAttr('tabindex', 0)
      init = false
      $(document).off('keydown', keydownHandler)
      $(document).off('mouseup', clickHandler)
      previousFocus?.focus()
    }
    return focusableElements
  }
}