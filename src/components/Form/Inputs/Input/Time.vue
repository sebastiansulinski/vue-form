<script>
    import Text from './Text'

    export default {
        name: 'time-input',
        mixins: [Text],
        data() {
            return {
                type: 'time'
            }
        }
    }
</script>