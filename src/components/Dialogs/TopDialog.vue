<template>
    <base-top-dialog
            :session-dialog="sessionDialog"
            v-slot:default="{
            overlay,
            visibleFor,
            message,
            clear,
            makeCall,
            processing
        }"
    >
        <div id="top-dialog" :class="{ [overlayCssClass]: overlay }">
            <div class="dialog alert" :class="{ [visibleCssClass]: visibleFor('alert') }" v-html="message"
                 @click="clear"></div>
            <div class="dialog warning" :class="{ [visibleCssClass]: visibleFor('warning') }" v-html="message"
                 @click="clear"></div>
            <div class="dialog confirm" :class="{ [visibleCssClass]: visibleFor('confirm') }">
                <p v-html="message"></p>
                <nav>
                    <span class="small button" v-if="!processing" @click="makeCall">YES</span>
                    <span class="small disabled button" v-if="processing"><i class="fas fa-spinner fa-spin fa-fw"></i> YES</span>
                    <span class="small success button" @click="clear">NO</span>
                </nav>
            </div>
        </div>
    </base-top-dialog>
</template>
<script>
    import BaseTopDialog from "./BaseTopDialog"

    export default {
        name: 'top-dialog',
        components: {BaseTopDialog},
        props: {
            sessionDialog: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            overlayCssClass: {
                type: String,
                default: 'overlay'
            },
            visibleCssClass: {
                type: String,
                default: 'active'
            }
        },
    }
</script>