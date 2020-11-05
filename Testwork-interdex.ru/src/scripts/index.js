import '../styles/vendor.scss';
import '../styles/index.scss';
import { SliderSystem } from './sliderSystem'
import { Validator } from './dk_validator';
import { PopUp } from './dk_popup';
import { DroplistsSystem } from './dk_dropDownList';
import { setEventDelay, animHandler, replaceClass, wait, disabledOuterTab } from './dk_lib';
import { systemScroll } from './dk_toggleHideScroll';
import { animResizeCont } from './dk_animate';
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

SimpleBar.removeObserver()

const scroll = systemScroll;

const MEDIA_MOBILE = 768 - 1

const SLIDER_SYSTEM_OPTIONS_MAIN = {
  size: 4,
  animateDecorator: animResizeCont,
  classHandlerItem: 'handler-sort__item',
  slick: {
    infinite: false,
    zIndex: 5,
    arrows: true,
    accessibility: true,
    draggable: true,
    centerMode: false,
  },
  responsive: [
    {
      breakpoint: MEDIA_MOBILE,
      settings: {
        size: 1
      },
      slick: {
        arrows: false,
        accessibility: false,
        centerMode: true,
      },
    },
    {
      breakpoint: 575,
      settings: "unwrap"
    }
  ]
}

const SLIDER_SYSTEM_OPTIONS_SECONDARY = {
  size: 2,
  slick: {
    infinite: false,
    zIndex: 5,
    arrows: false,
    accessibility: true,
    draggable: true,
    centerMode: false,
  },
  responsive: [
    {
      breakpoint: MEDIA_MOBILE,
      settings: {
        size: 1
      },
      slick: {
        accessibility: false,
        centerMode: true,
        centerPadding: '39px',
      },
    }
  ]
}

function menuInit(setting={}) {
  const $menu = setting.menu || $('[data-type="slide-menu-container"]').eq(0)
  const $content_container_scroll = $('.menu__container-scroll', $menu)
  const $content = setting.content || $('[data-type="slide-menu-content"]', $menu)
  const $btn = setting.btn || $('.menu__btn-nav', $menu)
  const classOpen = setting.classOpen || 'menu_open';
  scroll.add($menu);
  let disabledOuterTabInit

  async function animate(){
    if (!$menu.hasClass(classOpen)) {
      $menu.addClass(classOpen)
      replaceClass($menu, 'visible', 'invisible')
      $btn.addClass('btn-nav_open');
      scroll.hide();
      await animHandler($content, () => replaceClass($content, 'slideCloseRight', 'slideOpenRight'))
      if (!disabledOuterTabInit) disabledOuterTabInit = disabledOuterTab($menu)
      disabledOuterTabInit(true)
    } else {
      replaceClass($menu, 'visible', 'invisible', true)
      $btn.removeClass('btn-nav_open')
      $content.removeClass('slideOpenRight')
      await animHandler($content, () => replaceClass($content, 'slideCloseRight', 'slideOpenRight', true))
      $menu.removeClass(classOpen)
      scroll.show();
      disabledOuterTabInit(false)
    }
  }

  $btn.click( wait(animate) )

  return {
      $menu,
      $content_container_scroll,
      $content,
      $button: $btn,
      classOpen
  }
}

function formInit(setting={}) {
  const $form = $("#form");

  const FORM_OPTIONS = {
    options: {
      accentSelector: '', // элемент, которому добавляются классы валидации. По умолчанию - поле.
      accentSelector: '',
      messageElement: 'span',
      messageClass: 'form__message',
      messageAnimShowClass:'',
      messageAnimHideClass:'',
      errorClass: 'accent',
      validClass: 'success',
    },
    rules: {// список именованных наборов правил
      name: {// именованный набор правил
        required: {// правило
          value: true,
          message: 'Укажите своё имя'
        }
      },
      place: {
        required: {
          value: true,
          message: 'Укажите континент, страну или город'
        }
      },
      phone: {
        pattern: {
          value: /\+7\s\(\d{3}\)\s\d{3}-\d{4}/,
          message: 'невалидный номер',
          mask: '+7 (999) 999-9999'
        }
      },
      email: {
        required: true,
        pattern: {
          value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
          message: 'невалидный адрес e-mail'
        }
      },
      "cb-consent": {
        checked: true,
        options: {
          message: false,
          parentSelector: ".form__container-checkbox-small",
          errorClass: 'form__label_checkbox-small_accent',
          validClass: 'success',
          accentSelector: '.form__label_checkbox-small',
        }
      }
    },
  }

  const validator = new Validator($form, FORM_OPTIONS);
  validator.form.on('submit', (e) => e.preventDefault())
  const cb_consent = $('#cb-consent');

  cb_consent.on('click', (e) => {
    e.preventDefault()
    popupConfirmation.show()
  })  

  
  //create popup confirmation
  const popupConfirmation = new PopUp({hideOnClick: false});
  popupConfirmation.$popupButtonYes = $('<button class="popup__btn btn btn_yellow">согласен</button>')
  popupConfirmation.$popupButtonNo = $('<button class="popup__btn btn btn_yellow">не согласен</button>')
  const $popup_text = $(`
    <p class="popup__text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima blanditiis deserunt consectetur accusantium ullam vero quibusdam modi a alias sed? Enim reiciendis autem hic vero neque quia, porro quibusdam eum.
    </p>
  `)
  const $popup_group_row = $('<div class="popup__group-row"></div>')
  $popup_group_row.append(popupConfirmation.$popupButtonYes)
  $popup_group_row.append(popupConfirmation.$popupButtonNo)
  popupConfirmation.append($popup_text)
  popupConfirmation.append($popup_group_row)
  popupConfirmation.$popupButtonYes.on('click', (e) => onClickPopupHandler(e, true))
  popupConfirmation.$popupButtonNo.on('click', (e) => onClickPopupHandler(e, false))

  function onClickPopupHandler(e, flag) {
    let field = validator.getField(cb_consent[0])
    field.change = true
    field.element.checked = Boolean(flag)
    validator.validate()
    popupConfirmation.hide()
  }

  const popupSubmit = new PopUp();
  const handler = ()=>{ 
    if (validator.validate()) {
      popupSubmit.show();
      popupSubmit.insert(`<div class="popup__loader load"></div>`)
      const message = `
      <p class="popup__message">Данные успешно выведены в консоль</p>
      <div class="popup__ok ok"></div>
      `
      setTimeout( ()=>popupSubmit.insert(message), 1000, message )
    }
  }
  validator.submit.on('click', setEventDelay(null, handler, 1000, true) )
}

async function getJsonData() {
  const url = window.location.origin + window.location.pathname + 'data/countries.json';
  let response = await fetch(url);

  if (response.ok) {
    let json = await response.json();
    return json
  } else {
    console.log("Ошибка HTTP: " + response.status);
  }
}

function createSlide(data, type = 'main', className = ''){
  const {image, price, teg, title, route, description, accent} = data
  let $image, $price, $teg, $title, $route, $description, $accent;
  const $slide = $(`<div class="slider__slide" data-slide></div>`)
  if (className) $slide.addClass(className)
  const $imageContSize = $(`<div class="slider__image-cont-size"></div>`)
  $slide.append($imageContSize)
  const $imageContPosition = $(`<div class="slider__image-cont-position"></div>`)
  $imageContSize.append($imageContPosition)
  if (image) {
    $image = $(`<img src="${image}" alt="${title}" class="slider__image"></img>`)
    $imageContPosition.append($image)
  }
  if (price) {
    $price = $(`<span class="slider__price">${price}<span class="icon-rub"></span></span>`)
    $imageContPosition.append($price)
  }
  if (teg) {
    $teg = $(`<p class="slider__teg" data-tag>${teg}</p>`)
    $slide.append($teg)
  }
  if (title) {
    $title = $(`<h3 class="slider__title">${title}</h3>`)
    $slide.append($title)
  }
  if (route && type === 'main') {
    $route = $(`<p class="slider__route">${route}</p>`)
    $slide.append($route)
  }
  if (description && type === 'main') {
    $description = $(`<p class="slider__description">${description}</p>`)
    $slide.append($description)
  }
  if (accent && type === 'main') {
    $accent = $(`<span class="slider__accent">${accent}</span>`)
    $slide.append($accent)
  }
  return $slide

    // <div class="slider__slide" data-slide>
    //   <div class="slider__image-cont-size">
    //     <div class="slider__image-cont-position">
    //       <img src="${image}" alt="${title}" class="slider__image">
    //       <span class="slider__price">${price}</span>
    //     </div>
    //   </div>
    //   <p class="slider__teg" data-tag>${teg}</p>
    //   <h3 class="slider__title">${title}</h3>
    //   <p class="slider__route">${route}</p>
    //   <p class="slider__description">${description}</p>
    //   <span class="slider__accent">${accent}</span>
    // </div>
}

function pushSlides(data, count=1, options) {
  const {$containerContent, $button} = options
  const subarrays = [];
  let counter = 0;
  for (let i = 0; i < Math.ceil(data.length/count); i++){
    subarrays[i] = data.slice( i*count, i*count + count );
  }

  function executor() {
    if (subarrays[counter]) {
      subarrays[counter].forEach( data => {
        let $slide = createSlide(data, 'main')
        $containerContent.append($slide)
      })
      if (!subarrays[counter + 1]) $button.addClass('disabled')
      counter++
    }
  }
  return executor
}

jQuery( ()=>{

  // слайдеры
  const data = getJsonData()
    .then( data => {
      const slidesMain = []
      const $sliderMain = $('#slider-main');
      SLIDER_SYSTEM_OPTIONS_MAIN.$handlerCont = $('#handler-sort');
      const slidesSecondary = []
      const $sliderSecondary = $('#slider-secondary');

      $sliderMain.parent('[data-type="container-resize"]').css({'height': 300, 'overflow': 'hidden'})
      data.forEach( slideData => {
        const slide = createSlide(slideData, 'main')
        slidesMain.push(slide)
        $sliderMain.append(slide)
      })
      $sliderMain.parent('.load').removeClass('load')

      $sliderSecondary.parent('[data-type="container-resize"]').css({'height': 300, 'overflow': 'hidden'})
      data.forEach( slideData => {
        const slide = createSlide(slideData, 'secondary')
        slidesSecondary.push(slide)
        $sliderSecondary.append(slide)
      })
      $sliderSecondary.parent('.load').removeClass('load')
    
      const sliderSystemMain = new SliderSystem($sliderMain, SLIDER_SYSTEM_OPTIONS_MAIN);
      const sliderSystemSecondary = new SliderSystem($sliderSecondary, SLIDER_SYSTEM_OPTIONS_SECONDARY);
      

      const $mobileButton = $('#load-more')
      const $mobileContainer = $('#content-mobile')
      let addSlides = pushSlides(data, 3, 
        { $containerContent: $mobileContainer,
          $button: $mobileButton
        })
      addSlides = animResizeCont(addSlides, $mobileContainer)
      addSlides()
      $mobileContainer.parent('.load').removeClass('load')
      $mobileButton.on('click', addSlides)
    })
    .catch( err => console.error(err) )

  // форма
  formInit();

  // меню
  const menu = menuInit();
  menu.simplebar = new SimpleBar(menu.$content_container_scroll[0], {autoHide: false})

  // drop-down-list
  window.dropdownSystem = new DroplistsSystem($('.menu__form-menu'), 
    { 
      options: {
        $expandWidthToElement: $('.form-menu').eq(0),
        $expandHeightToElement: $('.menu__link-tel').eq(0),
      }
    }
  );
  
  dropdownSystem.droplists.forEach( (item, index) => {
    item.simplebar = new SimpleBar(item.$listContainerScroll[0], 
    {
      autoHide: false,
      classNames: {
        scrollbar: 'drop-down__scrollbar'
      }
    })
  })

})