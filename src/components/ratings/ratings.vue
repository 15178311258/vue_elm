<template>
    <div class="ratings">
        <div class="overview">
            <div class="overview-left">
                <h1 class="score">{{seller.score}}</h1>
                <div class="text">商家评分</div>
                <div class="rank">高于周边商家{{seller.rankRate}}%</div>
             </div>
            <div class="overview-right">
                <div class="score-wrapper">
                    <span class="text">服务态度</span>
                    <v-star :size="36" :score="seller.serviceScore"></v-star>
                    <span class="service-score">{{seller.serviceScore}}<span>
                </div>
                 <div class="score-wrapper">
                    <span class="text">商品评分</span>
                    <v-star :size="36" :score="seller.foodScore"></v-star>
                      <span class="service-score">{{seller.foodScore}}<span>
                </div>
                 <div class="score-wrapper">
                    <span class="text">送达时间</span>
                   <span class="time">{{seller.deliveryTime}}分钟</span>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script type="text/javascript">
    import star from "components/star/star"
    export default {
        props:{
            seller:{
                type:Object
            }
        },
        components:{
           "v-star":star 
        }

    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
.ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
        display: flex
        padding: 18px
        .overview-left
            flex: 0 0 137px
            width: 137px
            padding: 6px 0
            text-align: center
            border-right: 1px solid rgba(7,17,27,0.1)
            .score
                color: rgb(255,153,0)
                font-size: 24px
                line-height: 28px
            .text
                margin: 6px 0 8px
                color: rgb(7,17,27)
                font-size: 12px
                line-height: 12px
            .rank
                margin-bottom: 6px
                color: rgb(147,153,159)
                font-size: 10px
                line-height: 10px
         .overview-right
            flex: 1  
            padding: 6px 0
            padding-left: 24px
            .score-wrapper
                display: flex
                align-items: center
                margin-bottom: 8px
                font-size: 0
                .text
                    margin-right: 12px
                    color: rgb(7,17,27)
                    font-size: 12px
                    line-height: 18px  
                .service-score
                    line-height: 18px 
                    color:  rgb(255,153,0)
                    font-size: 12px
                .time
                    line-height: 18px 
                    color: rgb(147,153,159)
                    font-size: 12px



</style>