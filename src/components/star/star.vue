<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" :class="itemClass" class="class-item"></span>
    </div>
</template>
<script type="text/javascript">
    const LENGTH = 5;
    const CLS_ON = "star-on";
    const CLS_HALF = "star-half";
    const CLS_OFF = "star-off";
    export default {
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        computed: {
            starType() {
                return "star-" + this.size
            },
            itemClasses() {
                let result = [];
                let score = Math.floor(this.score * 2) / 2; //向下取整数
                let hasDecimal = score % 1 !== 0; //判断是否整数，有无半星
                let integer = Math.floor(score);
                for (let i = 0; i < integer; i++) {
                    result.push(CLS_ON)
                }
                if (hasDecimal) { //添加半星星
                    result.push(CLS_HALF)
                }
                while (result.length < LENGTH) { //灰星星补齐
                    result.push(CLS_OFF)
                }
                return result;
            }
        }
    }
</script>
<style>
    .star {
        font-size: 0;
    }
    
    .star-48 .class-item {
        display: inline-block;
        margin-right: 22px;
        width: 20px;
        height: 20px;
        background-size: 100%;
    }
    
    .star-36 .class-item {
        display: inline-block;
        margin-right: 6px;
        width: 15px;
        height: 15px;
        background-size: 100%;
    }
    
    .star-24 .class-item {
        display: inline-block;
        margin-right: 3px;
        width: 10px;
        height: 10px;
        background-size: 100%;
    }
    
    .class-item:last-child {
        margin-right: 0;
    }
    
    .star-on {
        background: url(img/star24_on@2x.png)no-repeat;
    }
    
    .star-half {
        background: url(img/star24_half@2x.png)no-repeat;
    }
    
    .star-off {
        background: url(img/star24_off@2x.png)no-repeat;
    }
</style>