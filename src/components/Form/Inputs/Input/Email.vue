<script>
    import Text from './Text'

    export default {
        name: 'email-input',
        mixins: [Text],
        data() {
            return {
                type: 'email'
            }
        }
    }
</script>