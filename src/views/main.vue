<template>
    <div>Current health check: {{health}}</div>
</template>

<script>

import _ from 'lodash';

export default {
    props: [''],
    data: function () {
        return {
            health: ''
        };
    },
    computed: {},
    watch: {},
    methods: {},
    beforeCreate: function () { },
    created: function () { },
    beforeMount: function () { },
    mounted: async function () {

        this.health = (await this.$http.get('/health')).data;


    },
    beforeUpdate: function () { },
    updated: function () { },
    beforeDestroy: function () { },
    destroyed: function () { },
}
</script>

<style lang="less" scoped rel="stylesheet/less">

</style>