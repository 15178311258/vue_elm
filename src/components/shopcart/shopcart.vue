<template>
    <div>
        <div class="shopcart">
            <div class="shopcart-content" @click="toggleList">
            <div class="shopcart-content-left">
                <div class="shopcart-logo-wrapper">
                    <div class="shopcart-logo" :class="{'high-light':totalCount>0}">
                        <i class="icon-shopping_cart" :class="{'high-light':totalCount>0}"></i>
                    </div>
                    <div class="shopcart-count" v-show="totalCount>0">
                        {{totalCount}}
                    </div>
                    </div>
                    <div class="shopcart-price" :class="{'high-light-price':totalPrice>0}">
                        &yen;{{totalPrice}}
                    </div>
                    <div class="shopcart-desc">另需要配送费&yen;<span>{{deliveryPrice}}</span>元
                    </div>
                
            </div>
            <div class="shopcart-content-right" :class="payClass" @click.stop.prevent="pay">
                <div class="shopcart-minPrice">{{payDesc}}</div>
            </div> 
            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header clear-fix">
                        <h1 class="list-title clear-left">购物车</h1>
                        <span class="list-empty clear-right" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listcontent">
                        <ul>
                            <li class="list-food clear-fix" v-for="food in selectFoods">
                                <span class="shopcart-food-name clear-left">{{food.name}}</span>
                                <div class="cartcontrol-wrapper clear-right">
                                    <v-cartcontrol :food="food"></v-cartcontrol>
                                </div>
                                <div class="shopcart-food-price clear-right">
                                &yen;<span class="food-price-text">{{food.price*food.count}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="list-mask">
            <div class="list-mask" v-show="listShow" @click="hideListmask" v-if="listShow"></div>
        </transition>
    </div>
</template>
<script type="text/javascript">
    import BScroll from 'better-scroll';
    import cartcontrol from "components/cartcontrol/cartcontrol";
    export default {
        props: {
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            },
            selectFoods: { //购物车选择商品
                type: Array,
                default () {
                    return []
                }
            }
        },
        data() {
            return {
                fold: true //默认折叠
            }
        },
        methods: {
            toggleList() { //点击列表出现或隐藏
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            empty() { //清空购物车
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                })
            },
            hideListmask() { //遮罩层关闭
                this.fold = true;
            },
            pay() {
                if (this.totalPrice < this.minPrice) {
                    return;
                }
                window.alert(`支付${this.totalPrice}元`)
            }
        },
        computed: {
            totalPrice() { //计算购物车总价
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count
                })
                return total;
            },
            totalCount() { //购物车数量
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                })
                return count;
            },
            payDesc() { //不同价格‘结算’不同状态
                if (this.totalPrice === 0) {
                    return `¥${this.minPrice}元起送`
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return `还差¥${diff}元起送`
                } else {
                    return '去结算'
                }
            },
            payClass() { //结算样式
                if (this.totalPrice >= this.minPrice) {
                    return "pay-enough"
                } else {
                    return "pay-not-enough"
                }
            },
            listShow() { //购物列表折叠或打开
                if (!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if (show) { //滚动点击事件
                    this.$nextTick(() => {
                        if (!this.scroll) { //不存在时
                            console.log(this.$refs)
                            this.scroll = new BScroll(this.$refs.listcontent, {
                                click: true
                            })
                        } else {
                            this.scroll.refresh(); //重新刷新加载
                        }
                    })
                }

                return show;
            }
        },
        components: {
            "v-cartcontrol": cartcontrol
        }
    };
</script>
<style type="text/css">
    .shopcart {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        height: 48px;
    }
    
    .shopcart-content {
        display: flex;
        background-color: #141d27;
    }
    
    .shopcart-content-left {
        flex: 1;
    }
    
    .shopcart-logo-wrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        vertical-align: top;
        box-sizing: border-box;
        border-radius: 50%;
        background-color: #141d27;
    }
    
    .shopcart-logo {
        width: 100%;
        height: 100%;
        line-height: 44px;
        border-radius: 50%;
        background-color: #2b343c;
        text-align: center;
    }
    
    .icon-shopping_cart {
        color: #80858a;
        font-size: 24px;
    }
    
    .high-light {
        color: #fff;
        background-color: rgb(0, 160, 220)
    }
    
    .shopcart-price {
        display: inline-block;
        color: rgba(255, 255, 255, 0.4);
        font-size: 16px;
        margin-top: 12px;
        padding-right: 12px;
        line-height: 24px;
        font-weight: 700;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .high-light-price {
        color: #fff;
    }
    
    .shopcart-desc {
        display: inline-block;
        margin: 12px 0 0 10px;
        color: rgba(255, 255, 255, 0.4);
        font-size: 12px;
        line-height: 24px;
    }
    
    .shopcart-count {
        position: absolute;
        right: 0;
        top: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        color: #fff;
        font-size: 10px;
        font-weight: 700;
        border-radius: 16px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        background-color: rgb(240, 20, 20);
    }
    
    .shopcart-content-right {
        flex: 0 0 105px;
        width: 105px;
        line-height: 48px;
        color: rgba(255, 255, 255, 0.4);
        font-size: 12px;
        font-weight: 700;
        text-align: center;
        background-color: #2b333b;
    }
    
    .pay-enough {
        color: #fff;
        background-color: #00b43c;
    }
    
    .shopcart-list {
        position: absolute;
        left: 0;
        /* top: 0;*/
        bottom: 48px;
        width: 100%;
        z-index: -1;
    }
    
    .fold-enter-active,
    .fold-leave-active {
        transition: all 1s;
    }
    
    .fold-enter,
    .fold-leave-active {
        transform: translate3d(0, 100%, 0);
        /* transform: translate3d(0, 0, 0);*/
    }
    
    .list-header {
        padding: 0 18px;
        color: rgb(7, 17, 27);
        font-size: 14px;
        font-weight: 200;
        line-height: 40px;
        background-color: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    }
    
    .list-empty {
        color: rgb(0, 160, 220);
    }
    
    .list-content {
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background-color: #fff;
    }
    
    .list-food {
        padding: 12px 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    }
    
    .shopcart-food-name {
        color: rgb(7, 17, 27);
        line-height: 24px;
        font-size: 14px;
    }
    
    .shopcart-food-price {
        color: rgb(240, 20, 20);
        line-height: 24px;
        font-size: 12px;
    }
    
    .food-price-text {
        margin-right: 4px;
        font-size: 14px;
        font-weight: bold;
    }
    
    .list-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 40;
        background: rgba(7, 17, 27, 0.6);
        -webkit-backdrop-filter: blur(10px);
    }
    
    .list-mask-enter-active,
    .list-mask-leave {
        transition: all .8s ease;
        opacity: 1;
    }
    
    .list-mask-enter,
    .list-mask-leave-active {
        opacity: 0;
        background: rgba(7, 17, 27, 0)
    }
</style>