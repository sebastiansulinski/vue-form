<script>
    import Text from './Text';
    export default {
        name: 'number-input',
        mixins: [Text],
        data() {
            return {
                type: 'number'
            }
        }
    }
</script>