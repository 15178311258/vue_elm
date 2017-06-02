<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <i class="icon" :class="classMap[seller.supports[0].type]"></i>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="support-count" v-if="seller.supports" @click="showDetails">
                <span class="support-count-num">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i> 
            </div>
        </div>
        <div class="bullentin-wrapper" @click="showDetails">
            <i class="icon-bullentin"></i>
            <span class="bullentin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right icon-bullentin-right"></i> 
        </div>
        <div class="header-background">
             <img width="100%" height="100%" :src="seller.avatar">
        </div>
        <transition name="fade">
            <div class="header-details" v-show="detailsShow">
                <div class="details-wrapper clearfix">
                    <div class="details-main">
                        <h1 class="details-name">{{seller.name}}</h1>
                        <div class="details-star">
                            <div class="star-wrapper">
                                <v-star :size="48" :score="seller.score"></v-star>
                            </div>
                        </div>
                        <div class="details-title">
                            <div class="title-line"></div>
                            <div class="title-text">优惠信息</div>
                            <div class="title-line"></div>
                        </div>
                        <ul class="details-supports" v-if="seller.supports">
                            <li class="supports-item" v-for="(item,index) in seller.supports">
                                <span class="supports-icon" :class="'supports-icon-'+classMap[seller.supports[index].type]"></span>
                                <span class="supports-text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="details-title">
                            <div class="title-line"></div>
                            <div class="title-text">商家公告</div>
                            <div class="title-line"></div>
                        </div>
                        <div class="details-bulletin">
                            <p class="bulletin-content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="details-close">
                    <i class="icon-close" @click="hideDetails"></i>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
    import star from "../star/star";
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        created() {
            this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"]
        },
        data() {
            return {
                detailsShow: false
            }
        },
        methods: {
            showDetails() {
                this.detailsShow = true;
            },
            hideDetails() {
                this.detailsShow = false;
            }
        },
        components: {
            "v-star": star
        }
    };
</script>

<style>
    /* @import "../../common/stylus/mixin.styl";*/
    /* @import "../../common/stylus/icon.styl";*/
    
    @import "../../common/stylus/icon.css";
    .header {
        position: relative;
        color: #fff;
        background: rgba(7, 17, 27, 0.5);
    }
    
    .content-wrapper {
        display: flex;
        padding: 24px 12px 18px 24px;
        font-size: 0;
        position: relative;
    }
    
    .avatar img {
        border-radius: 2px;
    }
    
    .content {
        margin-left: 16px;
    }
    
    .title {
        padding-top: 2px;
        padding-bottom: 8px;
    }
    
    .brand {
        display: inline-block;
        width: 30px;
        height: 18px;
        background: url("img/brand@2x.png") no-repeat;
        background-size: 100%;
    }
    
    .name {
        margin-left: 6px;
        line-height: 18px;
        font-size: 16px;
        font-weight: bold;
        vertical-align: top;
    }
    
    .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
        font-weight: 200;
    }
    
    .support {
        line-height: 12px;
        font-size: 12px;
        font-weight: 200;
    }
    
    .support .icon {
        width: 12px;
        height: 12px;
    }
    
    .decrease {
        background: url("img/decrease_1@2x.png") no-repeat;
        background-size: 100%;
    }
    
    .discount {
        background: url("img/discount_1@2x.png") no-repeat;
        background-size: 100%;
    }
    
    .special {
        background: url("img/special_1@2x.png") no-repeat;
        background-size: 100%;
    }
    
    .invoice {
        background: url("img/invoice_1@2x.png") no-repeat;
        background-size: 100%;
    }
    
    .guarantee {
        background: url("img/guarantee_1@2x.png") no-repeat;
        background-size: 100%;
    }
    
    .text {
        margin-left: 4px;
        vertical-align: middle;
    }
    
    .support-count {
        position: absolute;
        right: 12px;
        bottom: 18px;
        padding: 0 8px;
        line-height: 24px;
        color: #fff;
        font-size: 10px;
        font-weight: 200;
        border-radius: 14px;
        background-color: rgba(0, 0, 0, 0.2)
    }
    
    .support-count-num {
        vertical-align: middle;
    }
    
    .icon-keyboard_arrow_right {
        margin-left: 2px;
        font-size: 10px;
        line-height: 24px;
    }
    
    .bullentin-wrapper {
        position: relative;
        padding: 0 12px;
        line-height: 28px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .icon-bullentin {
        width: 22px;
        height: 12px;
        background: url(img/bulletin@2x.png) no-repeat;
        background-size: 100%;
        vertical-align: initial;
    }
    
    .bullentin-text {
        margin: 0 4px;
    }
    
    .icon-bullentin-right {
        position: absolute;
        right: 0;
        top: 2px;
        line-height: 28px;
    }
    
    .header-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px)
    }
    
    .header-details {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        z-index: 100;
        background-color: rgba(7, 17, 27, 0.8);
        -webkit-backdrop-filter: blur(10px);
    }
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .8s
    }
    
    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
    
    .details-wrapper {
        min-height: 100%;
        width: 100%;
    }
    
    .details-main {
        margin-top: 64px;
        padding-bottom: 64px;
    }
    
    .details-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        font-size: 32px;
        clear: both;
    }
    
    .details-name {
        line-height: 16px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
    }
    
    .details-title {
        display: flex;
        display: -webkit-flex;
        width: 80%;
        margin: 28px auto 24px;
    }
    
    .title-line {
        flex: 1;
        position: relative;
        top: -9px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .title-text {
        padding: 0 12px;
        font-weight: bold;
        font-size: 14px;
    }
    
    .star-wrapper {
        margin-top: 18px;
        padding: 2px 0;
        text-align: center;
    }
    
    .details-supports {
        width: 80%;
        margin: 0 auto;
    }
    
    .supports-item {
        padding: 0 12px;
        margin-bottom: 12px;
        font-size: 0;
    }
    
    .supports-item:last-child {
        margin-bottom: 0;
    }
    
    .supports-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: top;
    }
    
    .supports-icon-decrease {
        background: url(img/decrease_2@2x.png) no-repeat;
        background-size: 100%;
    }
    
    .supports-icon-guarantee {
        background: url(img/guarantee_2@2x.png) no-repeat;
        background-size: 100%;
    }
    
    .supports-icon-discount {
        background: url(img/discount_2@2x.png) no-repeat;
        background-size: 100%;
    }
    
    .supports-icon-invoice {
        background: url(img/invoice_2@2x.png) no-repeat;
        background-size: 100%;
    }
    
    .supports-icon-special {
        background: url(img/special_2@2x.png) no-repeat;
        background-size: 100%;
    }
    
    .supports-text {
        margin-left: 6px;
        line-height: 16px;
        font-size: 12px;
        font-weight: 200;
    }
    
    .details-bulletin {
        width: 80%;
        margin: 0 auto;
        padding: 0 12px;
    }
    
    .bulletin-content {
        line-height: 24px;
        font-size: 12px;
        font-weight: 200;
    }
</style>