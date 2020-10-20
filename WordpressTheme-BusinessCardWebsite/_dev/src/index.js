'use strict'

import './style/vendor.scss';
import './style/index.scss';

import 'jquery';
import Burger from 'dk_nav-burger';
import {setEventDelay, setDelay} from 'dk_lib';
import 'slick-carousel/slick/slick.min.js';
import 'lightgallery'

const config = {};

document.addEventListener('DOMContentLoaded', ()=>{

  //определение Touch свойства
  
  config.touch = ( ('ontouchstart' in window || ( window.DocumentTouch && document instanceof DocumentTouch) ) ) ? true : false;
  if ( !config.touch ) {
    console.log('событие touch недоступно');
    $('body')[0].dataset.touch = "false"
  } else console.log('событие touch доступно');
  
  // бургер меню

  const el_nav = document.querySelector('#nav-burger');
  new Burger(el_nav, {
    breakpoint:700, 
    classListOpenAnimate: 'slideOpenRight',
    classListCloseAnimate: 'slideCloseRight',
  });

  // плавный переход по якорям

  function toScroll(el, daley = 500) {
    let targetScrollOffset;
    if ( typeof el === 'number' ) {
      targetScrollOffset = el;
    }
    else {
      if (el.jquery === undefined) {
        if (!el) {
          console.log(`нет элемента`);
          return;
        }
        el = $(el);
      } else {
        if (!el[0]) {
          console.log(`нет элемента`);
          return;
        }
      }
      targetScrollOffset = el.offset().top;
    }
    $('html, body').animate({scrollTop: targetScrollOffset}, daley);
  }

  $('a[href^="#"]').on('click', function(event) {
    event.preventDefault();
    let target = $(this).attr("href");
    toScroll(target);
  });

  // ui arrow up

  const el_uiArrow = document.querySelector('#ui__arrow-up');
  let el_hover = false;

  function showUiArrow(el, daley = 1500) {
    let offset = window.pageYOffset;
    if ( !el.classList.contains('ui_show') && (window.pageYOffset > window.innerHeight * 2)) {
      el.classList.add('ui_show');
      let offset = window.pageYOffset;
      let timer = setTimeout( function showAndHide() {
        if (offset !== window.pageYOffset || el_hover) {
          offset = window.pageYOffset;
          timer = setTimeout(showAndHide, daley)
        } else {
          el.classList.remove('ui_show');
        }
      }, daley);
    }
  }

  let handler = setEventDelay(null, ()=>showUiArrow(el_uiArrow, 3500), 250)
  document.addEventListener('scroll', handler);
  el_uiArrow.addEventListener('mouseenter', (e)=>{
    if (e.target === el_uiArrow) el_hover = true;
  });
  el_uiArrow.addEventListener('mouseleave', (e)=>{
    if (e.target === el_uiArrow) el_hover = false;
  });

  // cards

  if (document.querySelector('.cards')) {

    let el_form = $('#form_advice');
    let el_form_offset = el_form.offset().top;

    let config = {
      classElement: 'cards__item',
      classDummy: 'cards__dummy_border',
      classTitle: 'cards__title',
      classTitleOpen: 'cards__title_open',
      classTextStore: 'cards__text-group p',
      element: null,
      title: null,
      daleyTransform: 150,
      daleyOpacity: 50,
      switch: false
    }
    
    function getOffset(el) {
      if (el.jquery !== undefined) el = el[0];
      let width = (+getComputedStyle(el.parentElement).width.slice(0,-2));
      let height = (+getComputedStyle(el.parentElement).height.slice(0,-2));
      // let borderWidth = (+getComputedStyle(el).borderWidth.slice(0,-2));
      return {
        height: height,
        width: width,
        top: ( height
        - (+getComputedStyle(el).height.slice(0,-2)) ) / 2,
        left: ( width
        - (+getComputedStyle(el).width.slice(0,-2)) ) / 2
      }
    }

    class Card {
      constructor(el, opt){
        this.opt = {
          classDummy: 'cards__dummy_border',
          classTitle: 'cards__title',
          classTitleOpen: 'cards__title_open',
          classTextStore: 'cards__text-group p',
          titleParam: null,
          daleyTransform: 150,
          daleyOpacity: 50
        };
        this.switch = false;
        this.el = el;
        this.title = el.querySelector(`.${this.opt.classTitle}`);
        this.storage = this.title.textContent.trim();
        this.dummy = $('<div>').addClass(this.opt.classDummy);
      }

      show(){
        this.switch = true;
        let titleParam = getOffset(this.title);
        this.dummy.css({
          'transition-duration': `${this.opt.daleyTransform}ms`,
          'top': `${titleParam.top}px`,
          'bottom': `${titleParam.top}px`,
          'left': `${titleParam.left}px`,
          'right': `${titleParam.left}px`,
        });
        this.title.style.transitionDuration = `${this.opt.daleyOpacity}ms`;
        this.title.parentElement.append(this.dummy[0]);
        this.title.style.opacity = 0;
        this.title.classList.add(this.opt.classTitleOpen);
        setDelay(true, this.opt.daleyOpacity)
        .then( ()=>{
          this.title.textContent = this.el.querySelector(`.${this.opt.classTextStore}`).textContent;
          this.dummy.css({
            'top': getComputedStyle(this.title.parentElement)['padding-top'],
            'bottom': getComputedStyle(this.title.parentElement)['padding-bottom'],
            'left': getComputedStyle(this.title.parentElement)['padding-left'],
            'right': getComputedStyle(this.title.parentElement)['padding-right'],
          });
          return setDelay(true, this.opt.daleyTransform)
        })
        .then( ()=>{
          this.title.style.opacity = 1;
        })
      }

      hide() {
        this.switch = false;
        this.title.style.opacity = 0;
        setDelay(true, this.opt.daleyOpacity)
        .then( ()=>{
          this.title.textContent = this.storage;
          return setDelay(true, 10)
        })
        .then( ()=>{
          let titleParam = getOffset(this.title);
          this.dummy.css({
            'top': `${titleParam.top}px`,
            'bottom': `${titleParam.top}px`,
            'left': `${titleParam.left}px`,
            'right': `${titleParam.left}px`,
          });
          return setDelay(true, this.opt.daleyTransform)
        })
        .then( ()=>{
          this.title.style.opacity = 1;
          return setDelay(true, this.opt.daleyOpacity)
        })
        .then( ()=>{
          this.title.classList.remove(this.opt.classTitleOpen);
          this.dummy.remove();
        })
      }
    }

    class CardController{
      constructor(selector){

        this.storage = [];
        this.current = null;
        this.href = null;

        $('.' + selector).each( (i, el) => {
          this.storage.push(new Card(el));
        })
        
        document.addEventListener('click', (e)=>{
          let target = e.target.closest(`.${config.classElement}`);
          if (target) {// если карта
            e.preventDefault();
            this.href = e.target.href || this.href;
            console.log(this.href);

            let card = this.storage.find((item, index) =>{
              return item.el === target;
            })

            if (this.current === card){
              if (this.current.switch) {
                this.current.hide();
                // toScroll(el_form_offset);
                location.href=this.href;
              } else {
                this.current.show();
              }
            } else {
              if (this.current && this.current.switch) this.current.hide();
              this.current = card;
              if (!card.switch) card.show();
            }

          } else {
              if (this.current && this.current.switch) this.current.hide();
          }
        })
      }
    }

    new CardController(config.classElement);

  }

})

$(document).ready(()=>{
  const $_slider = $('[data-type="slider"]');
  const $_slideCont = $('[data-type="image-cont"]');
  
  // slider

  function setSlider() {
  
    function setTopStyle(e, slick, el){
      function getOffsetTop(el) {
        let offsetTopSum = 0;
        if (el !== $_slider[0]) {
          offsetTopSum += el.offsetTop + getOffsetTop(el.offsetParent);
        }
        return offsetTopSum;
      }
      const $_arrow = $('.slick-arrow');
      let top = Math.floor(getOffsetTop($_slideCont[0]) + $_slideCont[0].offsetHeight / 2) + 'px';
      $_arrow.css('top', top);
    }
  
    function Handlers() {
      setTopStyle();
      if ( !config.touch ) $(config.adaptiveElements, $_slider).attr('data-touch', "false");
    }
  
    $_slider.on('setPosition', Handlers);
    
    $_slider.slick({
      slidesToShow: 3,
      dots: true,
      arrows: true,
      autoplay: false,
      infinite: false,
      autoplaySpeed: 2000,
      prevArrow: '<button id="prev" type="button" class="slider__arrow slider__arrow_back"></button>',
      nextArrow: '<button id="next" type="button" class="slider__arrow slider__arrow_forward"></button>',
      dotsClass: 'slider__dots',
      responsive: [
        {
          breakpoint: 1275,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 790,
          settings: {
            slidesToShow: 1,
            arrows: false
          }
        }
      ]
    })
  }

  $_slider.lightGallery({
    selector: '.slider__image-link',
    addClass: 'slider__gallery'
  });
    
  setTimeout( setSlider, 100 );

  console.log('setSlider');
})