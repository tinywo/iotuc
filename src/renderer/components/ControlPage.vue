<style scoped>

</style>

<template>
    <div>
        <Breadcrumb :style="{'height':'40px','line-height': '40px','padding-left':' 20px'}">
            <BreadcrumbItem to="/control">
                <Icon type="ios-switch" size="20"></Icon>
                系统控制
            </BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "ControlPage"
    }
</script>