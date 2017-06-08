<template>
    <div class="cartcontrol">
        <transition name="slide-fade">
            <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)"></div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
        
    </div>
</template>
<script>
    import Vue from 'vue';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        created() {
            // console.log(this.food)
        },
        methods: {
            addCart(e) {
                if (!e._constructed) { //浏览器事件时 e._constructed:false;自定义事件时 true
                    return; //不阻止会执行两次
                }
                if (!this.food.count) {
                    Vue.set(this.food, "count", 1);
                } else {
                    this.food.count++;
                }
                this.$emit('increment', event.target); // 子组件通过 $emit触发父组件的方法 increment 
            },
            decreaseCart(e) {
                if (!e._constructed) { //浏览器事件时 e._constructed:false;自定义事件时 true
                    return; //不阻止会执行两次
                }
                if (this.food.count) {
                    this.food.count--;
                }
            }
        }
    }
</script>
<style>
    .cart-decrease,
    .cart-add {
        display: inline-block;
        padding: 0 6px;
        line-height: 24px;
        color: rgb(0, 160, 220);
        font-size: 24px;
        vertical-align: middle;
    }
    
    .cart-count {
        display: inline-block;
        line-height: 24px;
        color: rgb(147, 153, 159);
        font-size: 12px;
    }
    
    .slide-fade-enter-active,
    .slide-fade-leave-active {
        transform: rotate(0);
        transition: all .8s ease;
    }
    
    .slide-fade-enter,
    .slide-fade-leave-active {
        opacity: 0;
        transform: rotate(180deg);
        transform: translateX(24px);
    }
</style>