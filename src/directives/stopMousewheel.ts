import { App } from 'vue'

const install = (app: App) => {
  app.directive('stopMousewheel', {
    updated: function (el: HTMLElement) {
      el.addEventListener('mousewheel', () => {
        const elem: any = el.tagName === 'INPUT' ? el : el.querySelector('input')
        elem.blur()
      })
    },
  })
}

export default install
