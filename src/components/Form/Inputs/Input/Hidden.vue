<script>
    import Text from './Text';
    export default {
        name: 'hidden-input',
        mixins: [Text],
        data() {
            return {
                type: 'hidden'
            }
        }
    }
</script>