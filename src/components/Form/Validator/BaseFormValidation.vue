<script>
    import Error from "./Error"

    export default {
        name: 'base-form-validation',
        props: {
            label: {
                type: String,
                required: false
            },
            name: {
                type: String,
                required: true
            },
            show: {
                type: Boolean,
                default: false
            },
            validation: {
                type: [Array, Object],
                default: () => []
            },
            error: {
                type: Object,
                default: () => new Error
            }
        },
        computed: {
            showLabel() {
                return this.label || this.show
            }
        },
        methods: {
            showErrorFor(rule) {
                return this.error.has(this.name, this.ruleOnly(rule))
            },
            ruleOnly(rule) {
                return rule.split(':')[0]
            }
        },
        render() {
            return this.$scopedSlots.default({
                showLabel: this.showLabel,
                showErrorFor: this.showErrorFor,
                ruleOnly: this.ruleOnly,
                validation: this.validation,
            })
        }
    }
</script>