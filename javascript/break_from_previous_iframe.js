
  if (window.location.href.indexOf('reload')==-1) {
    if(this != top){
      top.document.location.href = this.document.location.href;
    }
    window.location.replace(window.location.href+'?reload');
}