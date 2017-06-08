<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuwrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu-item" :class="{'current-menu':currentIndex===index}" @click="selelctMenu(index,$event)">
                    <p class="menu-text">
                        <i v-show="item.type>0" class="menu-icon" :class="classMap[item.type]"></i>{{item.name}}
                    </p>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodswrapper">
            <ul>
                <li v-for="item in goods" class="food-classify food-list-hook">
                    <h1 class="food-classify-title">{{item.name}}</h1>
                    <ul>
                         <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
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
                                 <div class="cart-wrapper">
                                     <v-cartcontrol :food="food" @increment="incrementTotal"></v-cartcontrol>
                                 </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <v-shopcart  :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopcart"></v-shopcart>
        <v-food :food="selectedFood" ref="food"></v-food>
        </div>
</template>
<script type="text/javascript">
    import BScroll from 'better-scroll';
    import shopcart from "components/shopcart/shopcart";
    import cartcontrol from "components/cartcontrol/cartcontrol";
    import food from "components/food/food";
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
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            }
        },
        created() {
            this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
            this.axios.get("/api/goods").then((response) => {
                if (response.data.erron == ERR_OK) {
                    this.goods = response.data.data;
                    this.$nextTick(() => { //确保dom已经加载 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
                        this._initScroll();
                        this._calculateHeight();
                    })
                }
            }).then((error) => {
                //console.log(error)
            })
        },
        computed: {
            currentIndex() { //获得当前列表索引
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if ((this.scrollY >= height1 && this.scrollY < height2) || !height2) { //某一高度区间 且不是最后一个
                        return i;
                    }
                }
                return 0;
            },
            selectFoods() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    })
                })
                return foods;
            }
        },
        methods: {
            _initScroll() { //初始化滚动高度数据：引入 BScroll插件
                console.log(this.$refs)
                this.menuScroll = new BScroll(this.$refs.menuwrapper, {
                    click: true
                })
                this.foodsScroll = new BScroll(this.$refs.foodswrapper, {
                    click: true,
                    probeType: 3 //滚动实时监控位置:探针的效果
                })
                this.foodsScroll.on("scroll", (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                })
            },
            _calculateHeight() { //计算高度 与左边menu映射
                let foodList = this.$refs.foodswrapper.getElementsByClassName("food-list-hook"); //获得某一dom元素
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            selelctMenu(index, e) { //点击左侧menu
                if (!e._constructed) { //浏览器事件时 e._constructed:false;自定义事件时 true
                    return; //不阻止会执行两次
                }
                let foodList = this.$refs.foodswrapper.getElementsByClassName("food-list-hook");
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el, 300); //滚动效果
            },
            selectFood(food, e) { //点击每个食品 进入详情页
                if (!e._constructed) {
                    return;
                }
                this.selectedFood = food;
                this.$refs.food.show(); //父组件调用子组件方法：ref="food" ,this.$refs.food.show()直接调用
            },
            incrementTotal(target) {
                this.$refs.shopcart.drop(target);
            }
        },
        components: {
            "v-shopcart": shopcart,
            "v-cartcontrol": cartcontrol,
            "v-food": food
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
    
    .current-menu {
        position: relative;
        margin-top: -1px;
        font-weight: 700;
        background-color: #fff;
        z-index: 100;
    }
    
    .current-menu .menu-text {
        border-bottom: none;
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
        position: relative;
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
        color: rgb(240, 20, 20);
    }
    
    .food-oldPrice {
        margin-left: 4px;
        font-size: 10px;
    }
    
    .cart-wrapper {
        position: absolute;
        right: 0;
        bottom: 10px;
    }
    
    @media only screen and (min-width: 1200px) {
        .goods {
            width: 50%;
        }
    }
</style>