<script>
    import Text from './Text';
    export default {
        name: 'password-input',
        mixins: [Text],
        data() {
            return {
                type: 'password'
            }
        }
    }
</script>