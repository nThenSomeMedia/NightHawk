const galleryLinks = document.getElementById('links')

if (galleryLinks) {
  galleryLinks.onclick = function (event) {
    event = event || window.event

    const target = event.target || event.srcElement
    const link = target.src ? target.parentNode : target
    const options = { index: link, event: event }
    const links = this.getElementsByTagName('a')

    blueimp.Gallery(links, options)
  }
}