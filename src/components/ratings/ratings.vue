<template>
    <div class="ratings" ref="ratings">
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
        <v-splitbar></v-splitbar>
        <v-ratingselect :ratings="ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc" @childSelect="selectBtn" @childOnlyContent="selectOnlyContent"></v-ratingselect>
        <div class="ratings-wrapper">
            <ul>
                <li v-for="rating in ratings" class="ratings-list" v-show="needShow(rating.rateType,rating.text)">
                    <div class="ratings-avatar"><img width="28" height="28" :src="rating.avatar"/></div>
                    <div class="ratings-content">
                        <h1 class="ratings-username">{{rating.username}}</h1>
                        <div class="ratings-star">
                            <v-star :size="24" :score="rating.score"></v-star>
                            <span class="ratings-delivery" v-show="rating.deliveryTime>0">{{rating.deliveryTime}}分钟到达</span>
                        </div>
                        <p class="ratings-text">{{rating.text}}</p>
                        <div class="ratings-recommmend" v-show="rating.recommend.length">
                            <i class="icon-thumb_up"></i>
                            <span class="ratings-recommmend-food" v-for="recfood in rating.recommend">{{recfood}}</span>
                        </div>
                        <div class="ratings-time">{{rating.rateTime | formatDate}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>   
</template>
<script type="text/javascript">
    import star from "components/star/star"
    import splitbar from "components/splitbar/splitbar";
    import ratingselect from "components/ratingselect/ratingselect";
    import {formatDate} from 'common/js/date.js';
    import BScroll from 'better-scroll';
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    const ERR_OK = 0;
    export default {
        props:{
            seller:{
                type:Object
            }
        },
        data(){
            return {
                ratings:[],
                selectType: ALL,
                onlyContent: true,
                desc: {
                        all: "全部",
                        positive: "满意",
                        negative: "不满意" 
                    }
                }
        },
        created(){
            this.axios.get('/api/ratings').then((response) => {
               // response = response.body;
                if (response.data.erron === ERR_OK) {
                    this.ratings = response.data.data;
                    this.$nextTick(() => { //设置滚动事件
                        this.scroll = new BScroll(this.$refs.ratings, {
                            click: true
                        })
                    })
                   
                }
            }).then((error)=>{
                // console.log(error)
            })
        },
         filters:{
            formatDate(time){
                let date=new Date(time);
                return formatDate(date, "yyyy-MM-dd hh:mm")
            }
        },
        components:{
            "v-star":star,
            "v-splitbar": splitbar,
            "v-ratingselect": ratingselect
        },
        methods:{
            selectBtn(type) {
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            selectOnlyContent(onlyContent) {
                this.onlyContent = onlyContent;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            needShow(type, text) { //选择评论内容
                if (!this.onlyContent && !text) { //仅读有内容的或者头评论文本的
                    return false
                }
                if (this.selectType === ALL) { //是否全选
                    return true
                } else { //否则根据选择展示内容
                    return type === this.selectType;
                }
            }
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    //overflow: hidden
    @media only screen and (min-width: 1200px)
        width: 50%
        left: 25%
    .overview
        display: flex
        padding: 18px 12px
        @media only screen and (max-width:320px)
            padding: 18px 10px
        .overview-left
            flex: 0 0 137px
            width: 137px
            padding: 6px 0
            text-align: center
            border-right: 1px solid rgba(7,17,27,0.1)
            @media only screen and (max-width:320px)
                flex:0 0 110px
                width:110px
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
            padding-left: 22px
            @media only screen and (max-width:320px)
                 padding-left:2px
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
                    @media only screen and (max-width:320px)
                        margin-right: 7px
                .service-score
                    line-height: 18px 
                    color:  rgb(255,153,0)
                    font-size: 12px
                    margin-left 12px
                    @media only screen and (max-width:320px)
                        padding-left:0px
                .time
                    line-height: 18px 
                    color: rgb(147,153,159)
                    font-size: 12px
    .ratings-wrapper
        padding: 0 18px
        .ratings-list
            display: flex
            padding: 18px 0;
            border-1px(rgba(7,17,27,0.1))
            .ratings-avatar 
                flex: 0 0 28px
                width: 28px;
                margin-right: 12px
                img 
                   border-radius: 50%
            .ratings-content
                position: relative
                flex: 1
                .ratings-username
                    font-size: 10px
                    line-height: 12px
                    color: rgb(7,17,27)
                .ratings-star
                    margin: 4px 0 6px
                    .star
                        display: inline-block
                        margin-right: 4px
                    .ratings-delivery
                        font-size: 10px
                        font-weight: 200
                        line-height: 12px
                        color: rgb(147,153,159)
                .ratings-text
                    margin-bottom: 8px
                    font-size: 12px
                    line-height: 18px
                    color: rgb(7,17,27)
                .ratings-recommmend
                    font-size: 0
                    line-height: 16px
                    .icon-thumb_up,.ratings-recommmend-food
                        display: inline-block
                        margin: 0 8px 4px 0
                        font-size: 9px
                     .icon-thumb_up
                        color: rgb(0,160,220)
                    .ratings-recommmend-food
                        padding: 0 6px
                        color: rgb(147,153,159)
                        border: 1px solid rgba(7,17,27,0.1)
                        border-radius: 1px
                .ratings-time
                    position: absolute
                    right: 0
                    top: 0
                    color: rgb(147,153,159)
                    font-size: 10px
                    font-weight: 200
                    line-height: 12px













    
</style>