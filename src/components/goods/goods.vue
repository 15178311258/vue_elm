<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuwrapper">
            <ul>
                <li v-for="item in goods" class="menu-item">
                    <p class="menu-text">
                        <i v-show="item.type>0" class="menu-icon" :class="classMap[item.type]"></i>{{item.name}}
                    </p>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodswrapper">
            <ul>
                <li v-for="item in goods" class="food-classify">
                    <h1 class="food-classify-title">{{item.name}}</h1>
                    <ul>
                         <li v-for="food in item.foods" class="food-item food-list-hook">
                             <div class="food-img">
                                 <img :src="food.image">
                             </div>
                             <div class="food-content">
                                 <h2 class="food-title">{{food.name}}</h2>
                                 <p class="food-description">{{food.description}}</p>
                                 <div class="food-extra">
                                     <span class="food-sellCount">月售{{food.sellCount}}份数</span>
                                     <span>好评率{{food.rating}}%</span>
                                 </div>
                                 <div class="food-price">
                                     <span class="food-nowprice">&yen;{{food.price}}</span>
                                    <s><span v-show="food.oldPrice" class="food-oldPrice">&yen;{{food.oldPrice}}</span></s> 
                                 </div>
                            </div>
                        </li>
                    </ul>

                </li>
            </ul>
        </div>
    </div>
    
</template>
<script type="text/javascript">
    import BScroll from 'better-scroll';
    const ERR_OK = 0;
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                listHeight: []
            }
        },
        created() {
            this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
            this.axios.get("/api/goods").then((response) => {
                if (response.data.erron == ERR_OK) {
                    this.goods = response.data.data;
                    console.log(this.goods);
                    this.$nextTick(() => { //在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
                        this._initScroll();
                        this._calculateHeight();
                    })
                }
            }).then((error) => {
                //console.log(error)
            })
        },
        methods: {
            _initScroll() { //初始化滚动高度数据：引入 BScroll插件
                console.log(this.$refs)
                console.log(this.$refs.foodswrapper)
                this.menuScroll = new BScroll(this.$refs.menuwrapper, {})
                this.foodsScroll = new BScroll(this.$refs.foodswrapper, {})
            },
            _calculateHeight() {

            }

        }
    };
</script>
<style type="text/css">
    .goods {
        display: flex;
        position: absolute;
        top: 174px;
        bottom: 46px;
        overflow: hidden;
    }
    
    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background-color: #f3f5f5;
    }
    
    .foods-wrapper {
        flex: 1;
    }
    
    .menu-item {
        display: table;
        width: 80px;
        height: 54px;
        padding: 0 12px;
        line-height: 14px;
    }
    
    .menu-text {
        display: table-cell;
        vertical-align: middle;
        color: rgb(12, 12, 20);
        font-size: 12px;
        font-weight: 200;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    }
    
    .menu-item:last-child .menu-text {
        border-bottom: none;
    }
    
    .menu-icon {
        width: 12px;
        height: 12px;
    }
    
    .decrease {
        background: url("img/decrease_3@2x.png") no-repeat;
        background-size: 100%;
    }
    
    .discount {
        background: url("img/discount_3@2x.png") no-repeat;
        background-size: 100%;
    }
    
    .special {
        background: url("img/special_3@2x.png") no-repeat;
        background-size: 100%;
    }
    
    .invoice {
        background: url("img/invoice_3@2x.png") no-repeat;
        background-size: 100%;
    }
    
    .guarantee {
        background: url("img/guarantee_3@2x.png") no-repeat;
        background-size: 100%;
    }
    
    .food-classify-title {
        padding-left: 12px;
        line-height: 26px;
        font-size: 12px;
        color: rgb(147, 153, 159);
        border-left: 2px solid #d9dde1;
        background-color: #f3f5f5;
    }
    
    .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    
    .food-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
    
    .food-img {
        flex: 0 0 57px;
        margin-right: 10px;
    }
    
    .food-img img {
        width: 57px;
        height: 57px;
    }
    
    .food-content {
        flex: 1;
    }
    
    .food-title {
        margin-top: 2px;
        color: rgb(7, 17, 27);
        font-size: 14px;
        line-height: 10px;
    }
    
    .food-description {
        margin: 8px 0;
        color: rgb(147, 153, 159);
        font-size: 10px;
        line-height: 10px;
    }
    
    .food-extra {
        color: rgb(147, 153, 159);
        font-size: 10px;
        line-height: 10px;
    }
    
    .food-sellCount {
        margin-right: 12px;
    }
    
    .food-price {
        margin-top: 4px;
        line-height: 24px;
        color: rgb(147, 153, 159);
        font-size: 14px;
        font-weight: 700;
    }
    
    .food-nowprice {
        color: rgb(240, 20, 20)
    }
    
    .food-oldPrice {
        margin-left: 4px;
        font-size: 10px;
    }
</style>