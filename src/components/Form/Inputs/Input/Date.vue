<script>
    import Text from './Text';
    export default {
        name: 'date-input',
        mixins: [Text],
        data() {
            return {
                type: 'date'
            }
        }
    }
</script>