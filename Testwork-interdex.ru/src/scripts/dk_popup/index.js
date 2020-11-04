import { systemScroll } from '../dk_toggleHideScroll';
import { disabledOuterTab } from '../dk_lib';

export class PopUp{
  constructor( settings={} ){

    this.scroll = systemScroll
    this.previousFocus = null

    this.defaultsettings = {
      classContainer: 'popup__container',
      classWindow: 'popup__window',
      classVisible: 'visible',
      classHide: 'none',
      hideOnClick: true
    }

    this.settings = { ...this.defaultsettings, ...settings }

    this.$container = $(`<div class="${this.settings.classContainer} ${this.settings.classHide}"></div>`)
    this.$window = $(`<div class="${this.settings.classWindow}"></div>`)

    this.$container.append( this.$window )
    $('body').append( this.$container )
    this.$container[0].focus()
    if (this.settings.hideOnClick) {
      this.$container.on( 'click', () => this.hide() )
      this.$container.on( 'keyup', (e) => e.code === 'Space' && this.hide() )
    }
  }

  show() {
    this.$container.removeClass(`${this.settings.classHide}`)
    this.scroll.hide();
    if (!this.disabledOuterTabInit) this.disabledOuterTabInit = disabledOuterTab(this.$window)
    this.disabledOuterTabInit(true)
  }

  hide() {
    this.$container.addClass(`${this.settings.classHide}`)
    this.scroll.show()
    this.disabledOuterTabInit(false)
  }

  insert(html){
    this.$window.html(`${html}`)
  }

  append($el){
    this.$window.append($el)
  }
}