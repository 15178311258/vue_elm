<template>
    <div class="ratingselect">
        <div class="ratingselect-type">
            <span class="ratingselect-block ratingselect-all" :class="{'ratingselect-active':selectType===2}" @click="selectRatings(2,$event)">{{desc.all}}<span class="ratingselect-count">{{ratings.length}}</span></span>
            <span class="ratingselect-block ratingselect-positive" :class="{'ratingselect-active':selectType===0}" @click="selectRatings(0,$event)">{{desc.positive}}<span class="ratingselect-count">{{positives.length}}</span></span>
            <span class="ratingselect-block ratingselect-negative" :class="{'ratingselect-active':selectType===1}" @click="selectRatings(1,$event)">{{desc.negative}}<span class="ratingselect-count">{{negatives.length}}</span></span>
        </div>
        <div class="ratingselect-switch" @click="toggleContent($event)">
            <span class="icon-check_circle" :class="{'ratingselect-switch-on':!onlyContent}"></span>
            <span class="ratingselect-switch-text">只看评论内容</span>
        </div>
    </div>
</template>
<script>
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        props: {
            ratings: {
                type: Array,
                default () { //注意类型是array function default是函数 用return返回
                    return []
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: true
            },
            desc: {
                type: Object,
                default () {
                    return {
                        all: "全部",
                        positive: "满意",
                        negative: "不满意"
                    }
                }
            }
        },
        computed: {
            positives() { //计算所有position评论
               return this.ratings.filter((rating)=>{
                   return rating.rateType===POSITIVE;
               })
            },
            negatives() {
                return this.ratings.filter((rating) => {
                    return rating.rateType === NEGATIVE;
                })
            }
        },
        methods: {
            selectRatings(type, e) {
                if (!e._constructed) {
                    return;
                }
                this.$emit("childSelect", type); //通知父组件更改数据 
            },
            toggleContent(e) {
                if (!e._constructed) {
                    return;
                }
                this.$emit("childOnlyContent", !this.onlyContent);

            }
        }

    }
</script>
<style>
    .ratingselect-type {
        padding: 18px 0;
        margin: 0 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    
    .ratingselect-block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        color: rgb(77, 85, 93);
        font-size: 12px;
        border-radius: 1px;
    }
    
    .ratingselect-all {
        background-color: rgba(0, 160, 220, 0.2);
    }
    
    .ratingselect-positive {
        background-color: rgba(0, 160, 220, 0.2);
    }
    
    .ratingselect-negative {
        background-color: rgba(77, 85, 93, 0.2);
    }
    
    .ratingselect-count {
        margin-left: 3px;
        -webkit-text-size-adjust: none;
        transform: scale(0.8);
        font-size: 10px;
    }
    
    .ratingselect-all.ratingselect-active,
    .ratingselect-positive.ratingselect-active {
        color: #fff;
        background-color: rgb(0, 160, 220);
    }
    
    .ratingselect-negative.ratingselect-active {
        color: #fff;
        background-color: rgb(77, 85, 93);
    }
    
    .ratingselect-switch {
        padding: 12px 18px;
        line-height: 24px;
        color: rgb(147, 153, 159);
        font-size: 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    
    .icon-check_circle {
        color: rgb(147, 153, 159);
        font-size: 24px;
    }
    
    .ratingselect-switch-on {
        color: #00c850;
    }
    
    .ratingselect-switch-text {
        vertical-align: top;
    }
</style>