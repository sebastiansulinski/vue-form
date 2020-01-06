<script>
    import Text from './Text'

    export default {
        name: 'datetime-input',
        mixins: [Text],
        data() {
            return {
                type: 'datetime'
            }
        }
    }
</script>