// относительный путь до libs
// промежуточный путь должен содержать '/' на конце

var pathFromLibs = window.location.href + 'libs';

if (window.paths) {
  pathFromLibs = window.paths.libs;
}

if (!window.Symbol) {
  getPolyfill('https://cdnjs.cloudflare.com/ajax/libs/core-js/2.6.11/core.min.js');
}

if (!window.fetch) {
  getPolyfill('https://cdn.jsdelivr.net/npm/whatwg-fetch@3.0/dist/fetch.umd.min.js');
}

if (!window.CSS || !window.CSS.supports) {
  getPolyfill(pathFromLibs + '/css-supports.js');
}

if (!window.CSS.supports('display', 'contents')) {
  console.error('display:contents не поддерживается')
}

if (!window.CSS.supports('display', 'grid')) {
  console.error('display:grid не поддерживается')
}

function getPolyfill(cdnUrl, async) {
  if (!async) async = false;
  // var resourceKey = cdnUrl.match(/(?<=\/)[^\/]+js$/);
  var resourceKey = cdnUrl.slice(cdnUrl.lastIndexOf('/')+1);
  var resource = localStorage.getItem(resourceKey)
  if (resource) {
    console.log(resourceKey + ' взят из localStorage');
    eval(resource);
  } else {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', cdnUrl, async);
    try {
      xhr.send();
      console.log(xhr.status);
      if (xhr.status === 404) {
        console.error('Ошибка '+xhr.status+': '+xhr.statusText + '\n' + cdnUrl + ' не найден');
      } else if (xhr.status !== 200) {
        console.error('Ошибка '+xhr.status+': '+xhr.statusText);
      } else {
        resource = xhr.response;
        localStorage.setItem(resourceKey, resource);
        console.log(resourceKey + ' добавлен в localStorage');
        eval(resource);
      }
    } catch(err) {
      console.error("Запрос не удался" + err.message);
    }
  }
}