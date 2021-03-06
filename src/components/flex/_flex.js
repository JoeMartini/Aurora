const AuFlex = Vue.extend({
  template: require('./_flex.tpl'),
  props: {
    inline: Boolean,
    column: Boolean,
    wrap: [Boolean, String],
    justifyContent: {
      type: String,
      default: ''
    },
    alignItems: {
      type: String,
      default: ''
    },
    alignContent: {
      type: String,
      default: ''
    },
    gutter: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    styleObj () {
      const style = {}

      if (this.inline) {
        style['display'] = 'inline-flex'
      }

      if (this.column) {
        style['flex-direction'] = 'column'
      }

      if (this.wrap === true || this.wrap === '') {
        style['flex-wrap'] = 'wrap'
      } else if (this.wrap !== false) {
        style['flex-wrap'] = this.wrap
      }

      if (this.justifyContent) {
        style['justify-content'] = this.justifyContent
      }

      if (this.alignItems) {
        style['align-items'] = this.alignItems
      } else {
        if (!this.column) {
          style['align-items'] = 'center'
        }
      }

      if (this.alignContent) {
        style['align-content'] = this.alignContent
      }

      const gutter = parseFloat(this.gutter)
      if (gutter) {
        style['margin'] = -(gutter / 2) + 'px'
      }

      return style
    }
  }
})

Vue.component('au-flex', AuFlex)

export default AuFlex
