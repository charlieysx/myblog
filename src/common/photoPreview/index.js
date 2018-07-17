import PreviewComponent from './photoPreview.vue'
var $vm = null
export default {
  install: function (Vue) {
    var PhotoPreview = Vue.extend(PreviewComponent)
    if (!$vm) {
      $vm = new PhotoPreview({ el: document.createElement('div') })
      document.body.appendChild($vm.$el)
    }
    const photoPreview = {
      open: function (index, list, params) {
        $vm.open(index, list, params)
      },
      close: function () {
        $vm.close()
      }
    }
    Vue.photoPreview = Vue.prototype.$photoPreview = photoPreview
  }
}
