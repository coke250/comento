<template>
  <div id="app">
    <div class="header">
        <div class="header-container">
            <div class="title">[2021-03-09] 송효섭</div>
        </div>
    </div>
    <div class="section section-top">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
</style>
