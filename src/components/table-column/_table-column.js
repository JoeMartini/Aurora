import dispatch from '../../mixins/_dispatch'

const AuTableColumn = Vue.extend({
  mixins: [dispatch],
  props: {
    label: String,
    attrName: String,
    isHead: Boolean,
    style: String,
    type: String, // '', checkbox
    autoWidth: Boolean,
    value: { // for checked rows
      type: Array,
      default: null
    }
  },
  computed: {
    model: {
      get () {
        return this.value || this.fakeValue
      },
      set (value) {
        if (this.value != null) {
          this.$emit('input', value)
        } else {
          this.fakeValue = value
        }
      }
    },
  },
  data () {
    return {
      fakeValue: []
    }
  },
  mounted () {
    this.dispatch('reset.column')
  },
  destroy () {
    this.dispatch('reset.column')
  },
  render (h) {
    return h('div')
  },
  methods: {
    getCheckRowPos (row) {
      return this.model.indexOf(row)
    },
    isCheckedRow (row) {
      return this.getCheckRowPos(row) > -1
    },
    addCheckedRow (row) {
      if (!this.isCheckedRow()) {
        this.model = this.model.concat(row)
      }
    },
    removeCheckedRow (row) {
      const pos = this.getCheckRowPos(row)
      var rows
      if (pos > -1) {
        rows = this.model.slice()
        rows.splice(pos, 1)
        this.model = rows
      }
    },
    toggleCheckedRow (row, isChecked) {
      if (!isChecked) {
        isChecked = !this.isCheckedRow(row)
      }

      if (isChecked) {
        this.addCheckedRow(row)
      } else {
        this.removeCheckedRow(row)
      }
    },
    getCheckedCount () {
      return this.model.length
    }
  }
})


Vue.component('au-table-column', AuTableColumn)

export default AuTableColumn
