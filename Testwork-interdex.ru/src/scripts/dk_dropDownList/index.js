import { animHandler, replaceClass, wait, log } from '../dk_lib'

function getPosToParent($children, $parent) {
  let posElem = $children.offset()
  let posParent = $parent.offset();
  return {
    top: posParent.top - posElem.top,
    left: posParent.left - posElem.left,
    parentWidth: $parent.width()
  }
}

export class DroplistsSystem { // use jquery

  /* 

  <div class="drop-down">
    <button class="drop-down__button">label||options.title</button>
    <div class="drop-down__list-container-position">
      <div class="drop-down__list-container-scroll">
        <dl class="drop-down__list">
          <dt class="drop-down__title">title</dt>
          <dd class="drop-down__item">text</dd>
        </dl>
      </div>
    </div>
  </div>

    this.droplists = [
      {
        $input,
        $label,
        $container,
        $button,
        $listContainerPosition,
        $listContainerScroll,
        $list,
        status = 'close' | 'open' | 'changes'
      }
    ]

    dropdownSystem = {
      droplists: [
        {
          $input,
          $label,
          $container,
          $button,
          $listContainerPosition,
          $listContainerScroll,
          $list,
          status = 'close' | 'open' | 'changes'
        }
      ],
      open()
      close()
      closeAll()
      getOpenItems()
      setTitle()
    }
    
  */
  
  constructor($container, settings={options: {}}){

    if (!$container.jquery) $container = $($container);

    const OPTIONS_DEFAULT = {
      class_container_open: 'drop-down_open',
      class_container_scroll: 'drop-down_scroll',
      class_container: 'drop-down',
      class_button: 'drop-down__button',
      class_list_container_position: 'drop-down__list-container-position',
      class_list_container_scroll: 'drop-down__list-container-scroll',
      class_list: 'drop-down__list',
      class_title: 'drop-down__title',
      class_item: 'drop-down__item',
      class_item_selected: 'drop-down__item_selected',
      class_hide: 'hide',
      title: 'Заглавие',
      $expandWidthToElement: null,
      $expandHeightToElement: null,
      initiateStatus: 'close'
    }

    function get$Node(any) {
      if (!any) return null
      any = $(any).eq(0)
      return (any.length) ? any : null
    }

    function normalizeOptions(settings, OPTIONS_DEFAULT) {
      let {options, individualOptions} = settings
      options.$expandWidthToElement = get$Node(options.$expandWidthToElement)
      options.$expandHeightToElement = get$Node(options.$expandHeightToElement)

      if (individualOptions) {
        individualOptions.map( item => {
          item.$element = get$Node(item.$element)
          if (item.$element[0].tagName.toLowerCase() !== 'select') item.$element = $('select', item.$element).eq(0)
          if (item.options.$expandWidthToElement) item.options.$expandWidthToElement = get$Node(item.options.$expandWidthToElement)
          if (item.options.$expandHeightToElement) item.options.$expandHeightToElement = get$Node(item.options.$expandHeightToElement)
        })
      }
      options = {...OPTIONS_DEFAULT, ...options}
      return {...settings, options, individualOptions}
    }

    settings = normalizeOptions(settings, OPTIONS_DEFAULT)

    this.droplists = []
    this.status = settings.status || 'close';
    this.multiple = false;
    this.options = settings.options;

    if ($container[0].tagName.toLowerCase() !== "select") {
      const $inputs = $("select", $container);
      if (!$inputs.length) {
        log('элементы select не найдены', 'DroplistsSystem: init')
        return false
      } else {
        $inputs.each( (index, input) => this.droplists.push(initSelect(input, settings)) )
      }
    } else {
      this.droplists.push(initSelect($container, settings))
    }

    this.droplists.forEach( ( droplist, index ) => {
      droplist.$input.addClass('hide').attr('tabindex', -1).attr('aria-hidden', 'true');
      droplist?.$label.addClass('hide');
      droplist.index = index;
      createDroplist(droplist).insertAfter(droplist.$input)
      if (droplist.options.initiateStatus === "open") {
        this.open(droplist)
      } else {
        droplist.status = "close"
      }
    })

    $(document).on('click', e => openCloseSwitchHandler(e) )

    //functions

    function initSelect(input, settings) {
      const {options: globalOptions, individualOptions} = settings
      const $input = $(input);
      const id = $input.attr('id')
      const findElement = individualOptions ? individualOptions.find( item => input === item.$element[0]) : null

      const options = findElement ? {...globalOptions, ...findElement.options} : globalOptions
      let $label = $input.siblings(`[for="${id}"]`).eq(0)

      if (!$label.length)  {
        const elParent = $input.parent()
        if (elParent[0].tagName.toLowerCase === 'label') {
          $label = elParent;
        }
      }
      if (!$label.length) {
        $label = $(`[for="${id}"]`).eq(0);
      }
      if (!$label.length) {
        $label = null;
      }

      return {
        $input,
        $label,
        options,
        status: ''
      }
    }

    function createDroplist(droplist) {
      const options = droplist.options
      const $container = $(`<div class="${options.class_container}" data-index="${droplist.index}"></div>`)
      const labelText = (droplist.$label) ? droplist.$label.text() : options.title
      const $button = $(`<button class="${options.class_button}">${labelText}</button>`).attr('tabindex', -1)
      const $listContainerPosition = $(`<div class="${options.class_list_container_position}"></div>`).attr('tabindex', 0)
      const $listContainerScroll = $(`<div class="${options.class_list_container_scroll}"></div>`)
      const listType = ( $('optgroup', droplist.$input).length ) ? 'dl' : 'ul';
      const $list = $(`<${listType} class="${options.class_list}"></${listType}>`)
      const items = []

      function createListItem(node, type='li') {
        return (
          $(`<${type}
          class="${options.class_item} ${(node.hasAttribute('selected')) ? options.class_item_selected : ''}"
          data-value="${node.value}"
          tabindex="-1">
            ${node.textContent.trim()}
          </${type}>`)
        )
      }

      droplist.$input.children().each( (index, node) => {
        let $itemsCollection = null
        if (listType === 'dl') {
          if ( node.tagName.toLowerCase() === 'optgroup' ) {
            $itemsCollection = $(`<dt class="${options.class_title}">${node.getAttribute('label')}</dt>`)
            $(node).children().each( (index, node) => {
              let $item = createListItem(node, listType)
              items.push($item[0])
              $itemsCollection = $itemsCollection.add($item)
            })
          } else {
            $itemsCollection = createListItem(node, listType)
            items.push($itemsCollection[0])
          }
        }
        else {
          $itemsCollection = createListItem(node, listType)
          items.push($itemsCollection[0])
        }
        $list.append($itemsCollection)
      })
      $listContainerScroll.append($list)
      $listContainerPosition.append($listContainerScroll)
      $container.append($button)
      $container.append($listContainerPosition)

      droplist.$container = $container
      droplist.$button = $button
      droplist.$listContainerPosition = $listContainerPosition
      droplist.$listContainerScroll = $listContainerScroll
      droplist.$list = $list
      droplist.items = items
      droplist.$input.attr('multiple') ? droplist.multiple = 'multiple' : null
      droplist.currentNodeIndex = 0
      droplist.previousNodeIndex = 0

      $list.on('click', e => onClickHandler(e.target))
      $listContainerPosition.on('keyup', e => onKeyupHandler(e))
      $listContainerPosition.on('keydown', e => onKeydownHandler(e))
      $button.on('click', e => e.target.nextElementSibling.focus())
      $listContainerPosition.on('focusout', e => onFocusoutHandler(e))

      return $container
    }

    //handlers

    const openCloseSwitchHandler = (e) => {
      if (!this.multiple) {

        if (e.target.classList.contains(this.options.class_button)) {
          this.closeAll()
          let droplist = this.getCurrentDroplist(e.target)
          if (droplist && droplist.status === 'close') this.open(droplist)
        } else {
          this.closeAll()
        }
      }
    }

    const onClickHandler = (node) => {
      if (node.hasAttribute('data-value')) {
        let droplist = this.getCurrentDroplist(node)

        if (!droplist.multiple) {
          let currentIndex = droplist.items.findIndex( item => item === node )
          let otherItems = [...droplist.items.slice(0, currentIndex), ...droplist.items.slice(currentIndex+1, )]
          otherItems.forEach( item => {
            replaceClass(item, droplist.options.class_item_selected, '')
          })
        }
  
        node.classList.toggle(droplist.options.class_item_selected)
        let status = node.classList.contains(droplist.options.class_item_selected)
        for (let option of droplist.$input[0].options) {
          if (option.value === node.getAttribute('data-value')) {
            option.selected = status
          }
        }
        
        let newTitle = status ? node.textContent : null
        this.setTitle(droplist, newTitle)
        if (!droplist.multiple) {          
          droplist.$listContainerPosition[0].focus()
          this.close(droplist)
        }
      }
    }

    const onKeyupHandler = (e) => { 
      let $focused = $(':focus');
      let droplist = this.getCurrentDroplist($focused[0]);
      if (e.which === 32) {
        e.preventDefault()
        if (droplist.status === 'close') {
          this.open(droplist)
        } else {
          onClickHandler(droplist.items[droplist.currentNodeIndex])
        }
      }
    }

    const onKeydownHandler = (e) => { 
      let droplist = this.getCurrentDroplist($(':focus')[0]);
      if (e.which === 32) {
        e.preventDefault()
      }
      if (e.which === 40) {
        e.preventDefault()
        if (droplist.status === 'open') {
          moveToWard(droplist, true)
        }
      }
      if (e.which === 38) {
        e.preventDefault()
        if (droplist.status === 'open') {
          moveToWard(droplist, false)
        }
      }
    }

    const onFocusoutHandler = (e) => {
      if ( !($.contains(e.target, e.relatedTarget) || e.relatedTarget?.classList.contains(this.options.class_item)) ) {
        this.close(this.getCurrentDroplist(e.target))
      }
    }

    //handlers helps

    const moveToWard = (droplist, direction = true) => {// direction = true(forward) || false(backward)

      let condition = direction ? droplist.items.length - 1 : 0
      if (droplist.currentNodeIndex === condition) {
        return
      }
      droplist.previousNodeIndex = droplist.currentNodeIndex
      direction ? droplist.currentNodeIndex++ : droplist.currentNodeIndex--
      droplist.items[droplist.currentNodeIndex].focus()
    }

    // const getScrollPosition = (droplist) => {// прокрутить, если элемент выходит за границы контейнера
    //   let list = droplist.$list
    //   let node = list.parentElement
    //   while (node.parentElement.offsetHeight >= list.offsetHeight || !node.parentElement.classList.contains(droplist.options.class_container)) {
    //     node = node.parentElement
    //   }
    //   return node
    // }
  }

  async _close(droplist) {
    if (droplist.status === 'close' || droplist.status === 'changes') return
    droplist.status = 'changes'
    let {$container, $button, $listContainerPosition, $list} = droplist
    let {class_container_scroll, class_container_open, $expandWidthToElement} = droplist.options
    let {left, parentWidth:width} = getPosToParent($container, $expandWidthToElement)
    let animWidth = ( left !== 0 || width !== $container.outerWidth() )
    $button.css({'z-index': ''})
    $listContainerPosition.css({'z-index': ''})
    $container.removeClass(`${class_container_scroll}`)
    $list.css('opacity', '')
    await animHandler( $listContainerPosition, ($el)=>$el.css( {'height': '','padding-bottom': ''} ) );
    if (animWidth) {
      $listContainerPosition.css({'left': '', 'width': ''})
      await animHandler( $button, ()=>$button.css({'left': '', 'width': ''}) );
    }
    $container.removeClass(`${class_container_open}`);
    droplist.status = 'close'
    return droplist.status
  }

  async _open(droplist) {
    if (droplist.status === 'open' || droplist.status === 'changes') return
    droplist.status = 'changes'
    let maxHeight = "";
    let {$container, $button, $listContainerPosition, $list} = droplist
    let {class_container_scroll, class_container_open, $expandWidthToElement, $expandHeightToElement} = droplist.options
    if ($expandHeightToElement.length) {
      maxHeight = getPosToParent($container, $expandHeightToElement).top
    }
    let {left, parentWidth:width} = getPosToParent($container, $expandWidthToElement)
    let animWidth = ( left !== 0 || width !== $container.outerWidth() )

    if ( !$container.hasClass(`${class_container_open}`) ) {
      $container.addClass(`${class_container_open}`);

      $button.css({'z-index': +$button.css('z-index') + 2})
      $listContainerPosition.css({'z-index': +$listContainerPosition.css('z-index') + 2})
      if (animWidth) {
        $button.css({left, width})
        await animHandler( $listContainerPosition, ($el)=>$el.css({left, width}) );
      }
      $list.css('opacity', 1)
      const height = +$list.outerHeight() + +$button.outerHeight() + 30
      await animHandler( $listContainerPosition, ($el)=>$el.css(
        {
          'height': height,
          'max-height': maxHeight,
          'padding-bottom': 30,
        }
      ));
      if (height > maxHeight) $container.addClass(`${class_container_scroll}`)
    }
    droplist.status = 'open'
    return droplist.status
  }

  setTitle(droplist, title) {
    if (!title) title = droplist.options.title
    droplist.$button.text(title)
  }

  getCurrentDroplist(childrenNode) {
    let currentContainer = childrenNode.closest('[data-index]')
    let droplist = this.droplists[+currentContainer.getAttribute('data-index')]
    return droplist
  }

  getOpenItems() {
    return this.droplists.filter( droplist => {
      return droplist.status === 'open'
    })
  }

  async closeAll() {
    if (this.status === 'changes' || this.status === 'close') return
    const itemsOpened = this.getOpenItems();
    itemsOpened.forEach( droplist => this.close(droplist))
  }

  async close(indexOrDropdownlist) {
    if (!this.multiple && this.status === 'changes') return
    let droplist = (typeof indexOrDropdownlist === 'number') ? this.droplists[indexOrDropdownlist] : indexOrDropdownlist
    this.status = 'changes';
    this._close(droplist)
    !this.getOpenItems().length ? this.status = 'close' : this.status = 'open';
  }

  async open(indexOrDropdownlist) {
    if (!this.multiple && this.status === 'changes') return
    let droplist = (typeof indexOrDropdownlist === 'number') ? this.droplists[indexOrDropdownlist] : indexOrDropdownlist
    this.status = 'changes';
    this._open(droplist)
    this.status = 'open';
  }

}