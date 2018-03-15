const electron = require('electron')
const ipcRenderer = electron.ipcRenderer
const desktopCapturer = electron.desktopCapturer

var screens = document.getElementById('agora-screen');
var windows = document.getElementById('agora-window');

var screenSelect = document.getElementById('screen-select');
var windowSelect = document.getElementById('window-select');

screenSelect.onclick = function() {
  console.log('screenSelect')
  screens.style.display = "flex";
  windows.style.display = "none";
  windowSelect.removeAttribute('class','focus');
  screenSelect.setAttribute('class', 'focus');
}

windowSelect.onclick = function() {
  console.log('windowSelect');
  screens.style.display = "none";
  windows.style.display = "flex";
  screenSelect.removeAttribute('class','focus');
  windowSelect.setAttribute('class', 'focus');
}

desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
  if (error) throw error;
  try {
    selectSource(sources, null, null);  
  } catch (error) {
    alert(error);
  }
})

var selectSource = function(sources, onSuccess, onFailure) {

  sources.map(function(source) {
    if(source.id) {
      var item = document.createElement('div');
      item.setAttribute('class', 'agora-share-screen-item');
      item.onclick = function() {
        ipcRenderer.send('selectScreen', source.id);
      }
      
      item.innerHTML = 
        '<div class="agora-share-screen-img-wrap">' +
          '<img src='+source.thumbnail.toDataURL()+' />' +
        '</div>' +
        '<span>'+source.name+'</span>' ;

      ~source.id.indexOf('screen') ? screens.appendChild(item) : windows.appendChild(item)      
    }
  })
}

document.getElementById('cancel').onclick = function() {
  ipcRenderer.send('closeWin');
}