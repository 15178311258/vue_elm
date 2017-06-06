<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="seller-overview">
                <h1 class="seller-title">{{seller.name}}</h1>
                <div class="seller-desc">
                    <v-star :size="36" :score="seller.score"></v-star>
                    <span class="seller-ratingcount">({{seller.ratingCount}})</span>
                    <span class="seller-sellcount">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="seller-remark">
                    <li class="seller-block">
                        <h2 class="seller-remark-title">起送价</h2>
                        <div class="seller-remark-content">
                            <span class="seller-remark-stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                     <li class="seller-block">
                        <h2 class="seller-remark-title">商家配送</h2>
                        <div class="seller-remark-content">
                            <span class="seller-remark-stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                     <li class="seller-block">
                        <h2 class="seller-remark-title">平均配送时间</h2>
                        <div class="seller-remark-content">
                            <span class="seller-remark-stress">{{seller.deliveryTime}}</span>元
                        </div>
                    </li>
                </ul>
                <div class="seller-favorite" @click="toggleFavorite($event)">
                    <span class="icon-favorite" :class="{'active':favorite}"></span>
                    <span class="favorite-text">{{favoriteText}}</span>
                </div>
            </div>
            <v-splitbar></v-splitbar>
            <div class="seller-bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <div class="seller-bulletin-content">{{seller.bulletin}}</div>
                </div>
                <ul class="seller-supports" v-if="seller.supports">
                    <li class="seller-supports-item" v-for="(item,index) in seller.supports">
                        <span class="seller-supports-icon" :class="'seller-supports-icon-'+classMap[seller.supports[index].type]"></span>
                        <span class="seller-supports-text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
            <v-splitbar></v-splitbar>
            <div class="seller-pic">
                <h1 class="pic-title">商家实景</h1>
                <div class="pic-wrapper" ref="picwrapper">
                    <ul class="pic-list" ref="piclist">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" width="120px" height="90px">
                        </li>
                    </ul>
                </div>
            </div>
            <v-splitbar></v-splitbar>
            <div class="seller-info">
                <h1 class="info-title">商家信息</h1>
                <ul class="info-list">
                    <li class="info-item" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import star from "components/star/star"
    import splitbar from "components/splitbar/splitbar"
    import BScroll from 'better-scroll';
    import {savaToLocal,loadFromlLocal} from 'common/js/store.js';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data(){
            return {
                favorite:(() => {//读取缓存中的数据
                    return loadFromlLocal(this.seller.id,"favorite",false)
                })()
            }
        },
        computed:{
            favoriteText(){
                return this.favorite ? '已收藏':'收藏'
            }
        },
        created() {
            this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"]
        },
        mounted(){
            this._initScroll();
            this._initPicScroll();
        },
        methods:{
            _initScroll(){//初始化滚动:BScroll使用的时候一定要确保dom被渲染了
                if(!this.scroll){
                    this.scroll=new BScroll(this.$refs.seller,{
                        click:true
                    })
                }else{
                    this.scroll.refresh();
                }
            },
            _initPicScroll(){//商家实景图片滚动
                if(this.seller.pics){
                    this.$nextTick(() => {
                        let picWidth=120;
                        let margin=6;
                        let width=(picWidth+margin)*this.seller.pics.length-margin;
                        this.$refs.piclist.style.width=width+'px';
                        if(!this.picScroll){
                             this.picScroll=new BScroll(this.$refs.picwrapper,{
                                scrollX: true,
                                eventPassthrough: 'vertical'
                            })
                        }else{
                             this.picScroll.refresh();
                        }
                    }) 
                }
            },
            toggleFavorite(event){//收藏商家
                if(!event._constructed){
                    return
                }
                this.favorite=!this.favorite
                savaToLocal(this.seller.id,"favorite",this.favorite);
            }
        },
        watch:{
            seller:{
                handler: function (val, oldVal) { 
                    this._initScroll();
                    this._initPicScroll();
                 },
                deep: true 
            }
        },
        components: {
            "v-star": star,
            "v-splitbar":splitbar
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl";
    @import "../../common/stylus/base.styl";
    .seller
        position: absolute
        top: 174px
        bottom: 0
        left: 0
        width: 100%
        overflow: hidden
        @media only screen and (min-width: 1200px)
            width: 50%
            left: 25%
        .seller-overview
            position: relative
            padding: 18px
            .seller-title
                margin-bottom: 8px
                font-size: 14px
                color: rgb(7,17,27)
                line-height: 14px
            .seller-desc
                padding-bottom: 18px
                max-height: 36px
                font-size: 0
                border-1px(rgba(7,17,27,0.1))
                .star 
                    display: inline-block
                    vertical-align: bottom
                .seller-ratingcount
                    margin: 0 12px 0 8px
                    font-size: 10px
                    color: rgb(77,85,93)
                    line-height: 18px
                .seller-sellcount
                    line-height: 18px
                    font-size: 10px
                    color: rgb(77,85,93)
            .seller-remark
                display: flex
                .seller-block
                    flex: 1
                    padding-top: 18px
                    text-align: center
                    border-right: 1px solid rgba(7,17,27,0.1)
                    &:last-child
                        border-right: none 
                    .seller-remark-title
                        margin-bottom: 4px
                        font-size: 10px
                        color: rgb(147,153,159)
                        line-height: 10px
                    .seller-remark-content
                        line-height: 24px
                        font-size: 10px
                        font-weight: 200
                        color: rgb(7,17,27)
                        .seller-remark-stress
                            font-size: 24px
            .seller-favorite
                position: absolute
                right: 18px
                top: 18px
                width: 36px
                text-align: center
                .icon-favorite
                    display: block
                    font-size: 24px
                    color: #d4d6d9
                    line-height: 24px
                    &.active
                        color: rgb(240,20,20)
                .favorite-text
                    font-size: 10px
                    color: rgb(77,85,93)
                    line-height: 10px
        .seller-bulletin
            padding: 18px 18px 0 18px
            .title
                margin-bottom: 8px;
                font-size: 14px;
                color: #07111b;
                line-height: 14px;
            .content-wrapper
                padding: 0 12px 16px
                border-1px(rgba(7,17,27,0.1))
                .seller-bulletin-content
                    font-size: 12px
                    font-weight: 200
                    color: rgb(240,20,0)
                    line-height: 24px
            .seller-supports-item
                padding: 16px 12px
                border-1px(rgba(7,17,27,0.1))
                &:last-child
                    border-none()
                .seller-supports-icon
                    display: inline-block
                    width: 16px
                    height: 16px
                    vertical-align: top
                    background-repeat: no-repeat
                    background-size: 100%
                    &.seller-supports-icon-decrease 
                        bg-image('img/decrease_4')
                    &.seller-supports-icon-discount 
                        bg-image('img/discount_4')
                    &.seller-supports-icon-guarantee 
                        bg-image('img/guarantee_4')
                    &.seller-supports-icon-invoice 
                        bg-image('img/invoice_4')
                    &.seller-supports-icon-special 
                        bg-image('img/special_4')
                .seller-supports-text
                    font-size: 12px
                    font-weight: 200
                    color: rgb(7,17,27)
                    line-height: 16px
                    vertical-align: top
        .seller-pic
            padding: 18px
            .pic-title
                margin-bottom: 12px;
                font-size: 14px;
                color: #07111b;
                line-height: 14px;
            .pic-wrapper
                width: 100%
                overflow: hidden
                white-space: nowrap
                .pic-list
                    font-size: 0
                    .pic-item
                        display: inline-block
                        margin-right: 6px
                        width: 120px
                        height: 90px
                        &:last-child
                            margin-right: 0
        .seller-info
            padding: 18px
            .info-title
                padding-bottom: 12px;
                font-size: 14px;
                color: #07111b;
                line-height: 14px;
                border-1px(rgba(7,17,27,0.1))
            .info-item
                padding: 16px 12px
                font-size: 12px
                font-weight: 200
                color: rgb(7,17,27)
                line-height: 16px
                border-1px(rgba(7,17,27,0.1))
                &:last-child
                    border-none()
</style>