'use strict';

// import "normalize.css"
import '../style/index.scss';
const module = require('../modules/btn-counter')

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-type=btn-counter]').forEach( (i) => {
    new module.Counter(i);
  })
})
