<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
        <div class="tab-item">
            <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab-item">
           <router-link to="/seller">商家</router-link>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
    import header from "./components/header/header"
    const ERR_OK = 0;

    export default {
        data() {
            return {
                seller: {}
            }
        },
        created() {
            this.axios.get("/api/seller").then((response) => {
                // response = JSON.parse(response)==response.json()
                if (response.data.erron === ERR_OK) {
                    this.seller = response.data.data
                }
            }).then((error) => {
                // console.log(error)
            })
        },
        components: {
            "v-header": header
        }

    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import '../static/css/init.css';
    /* @import './common/stylus/mixin.styl';*/
    
    .tab {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
    }
    
    .tab-item {
        flex: 1;
        text-align: center;
        position: relative;
    }
    
    .tab-item::after {
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        content: '';
    }
    
    .tab-item a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93)
    }
    
    .tab-item .tab-active {
        color: rgb(240, 20, 20)
    }
</style>