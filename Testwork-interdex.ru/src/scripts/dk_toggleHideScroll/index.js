import {setEventDelay, touchAvailable} from '../dk_lib'

class Scroll {// use jquery, dk_lib

  constructor() {
    this.$body = $('body');
    this.$slidebarCap = $('<div class="system__slidebar" id="system-slidebar">');
    this.visible = true;// состояние системного scrollbar
    this.fullScreenElement = new Set()
    this.slidebarWidth = 0
    this.touchAvailable = touchAvailable()
    this.slidebarWidth = 0;
    this.$slidebarCap.css({
      'position': 'absolute',
      'height': '100vh',
      'top': 0
    });
    this.init = this.init.bind(this)
    this.init()

    window.addEventListener('resize', setEventDelay(null, this.init, 500))
  }

  init() {
    this.slidebarWidth = window.innerWidth - this.$body.width();
    this.$slidebarCap.css({
      'width': this.slidebarWidth,
      'right': -this.slidebarWidth
    });
  }


  hide() {// спрятать системный scrollbar
    if (this.visible) {
      this.visible = false;

      if (!this.touchAvailable) {
        this.$body.css({
          'padding-right': parseInt(this.$body.css('padding-right')) + this.slidebarWidth,
          'overflowY': 'hidden'
        });
        this.$body.append(this.$slidebarCap);

        this.fullScreenElement.forEach( (el) => {
          if (!el.jquery) el = $(el)
          el.css('padding-right', parseInt(el.css('padding-right')) + this.slidebarWidth);
        })
      } else {
        this.$body.css({'overflowY': 'hidden'});
      }

      return true;
    }
  }

  show() {// показать системный scrollbar
    if (!this.visible) {
      this.visible = true;

      if (!this.touchAvailable) {
        this.fullScreenElement.forEach( (el) => {
          if (!el.jquery) el = $(el)
          el.css('padding-right', '');
        })
        this.$slidebarCap.remove();
        this.$body.css({
          'padding-right': '',
          'overflowY': ''
        });
      } else {
        this.$body.css({'overflowY': ''});
      }

      return true;
    }
  }

  add(el) {
    this.fullScreenElement.add(el)
  }

  delete(el) {
    this.fullScreenElement.delete(el)
  }
}

export const systemScroll = new Scroll();
