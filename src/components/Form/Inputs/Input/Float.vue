<script>
    import Text from './Text';
    export default {
        name: 'float-input',
        mixins: [Text],
        props: {
            decimals: {
                type: Number,
                default: 2
            },
            currentValue: {
                default: '0.00'
            },
        },
        data() {
            return {
                type: 'number'
            }
        },
        computed: {
            attributeBindings() {
                return {...{ step: '.01' }, ...this.inputBindings}
            }
        },
        methods: {
            mutate(value) {
                value = parseInt(value.replace(".", ""));

                value = !value ? '' : value.toString();

                if (value.length < 3) {
                    value = value.padStart(3, '0');
                }

                return value.substr(0, value.length - this.decimals) + "." + value.substr(value.length - this.decimals);
            }
        }
    }
</script>