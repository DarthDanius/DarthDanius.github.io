import {animHandler} from '../dk_lib'

export function animResizeCont(callback, $containerContent) {
  const $containerResize = $containerContent.parent('[data-type="container-resize"]')
  if (!$containerResize.length) return callback
  return async function executor() {
    $containerResize.css(
      {'height': $containerResize.height(),
      'overflow': 'hidden'}
      )
    // console.log(`animResizeCont_${callback.name}`)
    // console.log('overflow before', $containerResize.css('overflow'))
    callback.apply(this, arguments)
    const containerContentHeight = $containerContent.height() || 'auto'
    await animHandler( $containerResize, ($el) => $el.height(containerContentHeight) )
    $containerResize.css({'overflow': ''})
    // console.log('overflow after', $containerResize.css('overflow'))
  }
}
