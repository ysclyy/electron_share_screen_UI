const electron = require('electron')
const ipcRenderer = electron.ipcRenderer
const desktopCapturer = electron.desktopCapturer

desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
  if (error) throw error;
  try {
    selectSource(sources, null, null);  
  } catch (error) {
    alert(error);
  }
})

var selectSource = function(sources, onSuccess, onFailure) {
  var screens = "";
  var domBox = document.getElementById('agora-box');

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

      domBox.appendChild(item);
    }
  })
}

document.getElementById('cancel').onclick = function() {
  ipcRenderer.send('closeWin');
}