<template>
    <div>
        <transition name="move">
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <div class="food-header">
                    <img :src="food.image" class="food-header-img"> 
                    <div class="food-back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="food-introduce">
                    <h1 class="food-introduce-title">{{food.name}}</h1>
                    <div class="food-introduce-details">
                        <span class="food-introduce-seller">月售{{food.sellCount}}份</span>
                        <span class="food-introduce-rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="food-price">
                        <span class="food-nowprice">&yen;{{food.price}}</span>
                        <s><span v-show="food.oldPrice" class="food-oldPrice">&yen;{{food.oldPrice}}</span></s>
                    </div>
                   <transition name="addcart">
                       <div class="food-addcart" v-show="!food.count||food.count===0" @click.stop.prevent="addFirst($event)">加入购物车</div>
                   </transition>
                    <div class="food-cartcontrol-wrapper">
                        <v-cartcontrol :food="food"></v-cartcontrol>
                    </div>
                </div>
                <v-splitbar v-show="food.info"></v-splitbar>
                <div class="food-info" v-show="food.info">
                    <h1 class="food-info-title">商品信息</h1>
                    <div class="food-info-text">{{food.info}}</div>
                </div>
                <v-splitbar v-show="food.info"></v-splitbar>
                <div class="food-ratingselect">
                    <h1 class="food-ratingselect-title">商品评价</h1>
                    <v-ratingselect :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc" @childSelect="selectBtn" @childOnlyContent="selectOnlyContent"></v-ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings  && food.ratings.length">
                            <li class="rating-item" v-for="rating in food.ratings" v-show="needShow(rating.rateType,rating.text)">
                                <div class="rating-info">
                                    <div class="rating-time">{{rating.rateTime | formatDate}}</div>
                                    <p class="rating-content">
                                        <span :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType===0}"></span>
                                        <span class="rating-content-text">{{rating.text}}</span>
                                     </p>
                                </div>
                                <div class="rating-user">
                                    <span class="rating-user-name">{{rating.username}}</span>
                                    <img :src="rating.avatar" class="rating-avatar">
                                </div>
                            </li>
                        </ul>
                        <div class="rating-no" v-show="!food.ratings || !food.ratings.length ">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>
<script>
    import BScroll from 'better-scroll';
    import Vue from 'vue';
    import {formatDate} from 'common/js/date.js';
    import cartcontrol from "components/cartcontrol/cartcontrol";
    import splitbar from "components/splitbar/splitbar";
    import ratingselect from "components/ratingselect/ratingselect";
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: false,
                desc: {
                    all: "全部",
                    positive: "推荐",
                    negative: "吐槽"
                }

            }
        },
        filters:{
            formatDate(time){
                let date=new Date(time);
                return formatDate(date, "yyyy-MM-dd hh:mm")
            }
        },
        methods: {
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
            show() {
                this.showFlag = true;
                this.selectType = ALL;
                this.onlyContent = true;
                this.$nextTick(() => { //设置滚动事件
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true
                        })
                    } else {
                        this.scroll.refresh();
                    }
                })
            },
            hide() {
                this.showFlag = false;
            },
            addFirst(e) { //增加至购物车
                if (!e._constructed) {
                    return;
                }
                Vue.set(this.food, "count", 1)
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
        },
        components: {
            "v-cartcontrol": cartcontrol,
            "v-splitbar": splitbar,
            "v-ratingselect": ratingselect
        }
    }
</script>
<style>
    .food {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        width: 100%;
        background-color: #fff;
        z-index: 30;
    }
    
    .move-enter-active,
    .move-leave {
        transition: all .8s ease;
        transform: translate3d(0, 0, 0)
    }
    
    .move-enter,
    .move-leave-active {
        transition: all .8s ease;
        transform: translate3d(100%, 0, 0)
    }
    
    .food-header {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 0;
        padding-top: 100%;
    }
    
    .food-header-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .food-back {
        position: absolute;
        top: 10px;
        left: 0;
        padding: 10px;
    }
    
    .icon-arrow_lift {
        color: #fff;
        font-size: 20px;
    }
    
    .food-introduce {
        position: relative;
        padding: 18px;
        /*border-bottom: 1px solid rgba(7, 17, 27, 0.1)*/
    }
    
    .food-introduce-title {
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
        font-weight: bold;
    }
    
    .food-introduce-details {
        margin: 8px 0 12px;
        color: rgb(147, 153, 159);
        font-size: 12px;
    }
    
    .food-addcart {
        /*-webkit-text-size-adjust: none;*/
        position: absolute;
        right: 18px;
        bottom: 18px;
        padding: 6px 12px;
        line-height: 24px;
        color: #fff;
        font-size: 12px;
        border-radius: 12px;
        background-color: rgb(0, 160, 220);
        z-index: 10;
    }
    
    .food-cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 18px;
    }
    
    .addcart-enter,
    .addcart-leave-active {
        transition: all 0.5s;
        opacity: 0;
    }
    
    .addcart-enter-active,
    .addcart-leave {
        opacity: 1;
    }
    
    .food-info {
        padding: 18px;
    }
    
    .food-info-title {
        color: rgb(7, 17, 27);
        font-size: 14px;
    }
    
    .food-info-text {
        margin-top: 6px;
        padding: 0 8px;
        color: rgb(77, 85, 93);
        font-size: 12px;
        font-weight: 200;
    }
    
    .food-ratingselect {
        padding-top: 18px;
    }
    
    .food-ratingselect-title {
        margin-left: 18px;
        color: rgb(7, 17, 27);
        font-size: 14px;
    }
    
    .rating-item {
        display: flex;
        margin: 0 18px;
        padding: 16px 0 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    }
    
    .rating-info {
        flex: 1;
    }
    
    .rating-time {
        color: rgb(147, 153, 159);
        font-size: 10px;
        line-height: 12px;
    }
    
    .icon-thumb_down,
    .icon-thumb_up {
        color: rgb(147, 153, 159);
        font-size: 12px;
        line-height: 24px;
    }
    
    .icon-thumb_up {
        color: rgb(0, 160, 220);
    }
    
    .rating-content-text {
        margin-left: 2px;
        color: rgb(7, 17, 27);
        font-size: 12px;
        line-height: 16px;
    }
    
    .rating-user {
        flex: 0 0 70px;
    }
    
    .rating-user-name {
        color: rgb(147, 153, 159);
        font-size: 10px;
        line-height: 12px;
        vertical-align: top;
    }
    
    .rating-avatar {
        margin-left: 6px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        vertical-align: top;
    }
    
    .rating-no {
        padding: 16px 18px;
        font-size: 12px;
        color: rgb(147, 153, 159);
    }
</style>