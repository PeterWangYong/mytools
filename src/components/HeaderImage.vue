<template>
  <div>
    <div id="header-image"
         class="container">
      <img class="bg-image"
           :src="this.bgImageSrc"
           alt="image" />
      <div class="content">
        <div class="date">
          <div class="month">{{ date.month }}</div>
          <div class="split">
            <svg xmlns="http://www.w3.org/2000/svg"
                 version="1.1">
              <line x1="60"
                    y1="100"
                    x2="120"
                    y2="60"
                    style="stroke:white;stroke-width:2" />
            </svg>
          </div>
          <div class="day">{{ date.date }}</div>
          <div class="week">{{ date.week }}</div>
          <div class="term"
               v-if="date.term">{{ date.term }}</div>
          <div class="week-english">{{ date.week_english }}.</div>
          <div class="lunar">农历 {{ this.date.lunar }}</div>
          <div class="year">{{ date.year }}</div>
        </div>
        <div class="text">
          <div class="wrapper">
            <div class="first">
              <span>{{ this.text.first }}</span>
            </div>
            <div class="second">
              <span>{{ this.text.second }}</span>
            </div>
          </div>
        </div>
        <div class="sidebar">
          <div class="label">
            <p>{{ this.label }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="form">
      <el-input v-model="text.first"
                placeholder="第一句"></el-input>
      <el-input v-model="text.second"
                placeholder="第二句"></el-input>
      <el-button @click="handleDownload">下载</el-button>
    </div>
  </div>
</template>

<script>
import { getBgImage, getDate } from '@/api';
import html2canvas from 'html2canvas'
import Canvg from 'canvg'
export default {
  name: 'MyImage',
  data() {
    return {
      bgImageSrc: '',
      date: {
        year: '2021',
        month: '01',
        date: '05',
        week: '星期二',
        week_english: 'Tue',
        term: '小寒',
        lunar: '十一月廿二',
      },
      text: {
        first: '无丝竹之悦耳',
        second: '无案牍之劳形',
      },
      label: '皮特王同学',
    };
  },
  methods: {
    handleDownload() {
      html2canvas(document.querySelector('#header-image'), {
        useCORS: true,
      }).then(canvas => {
        // document.body.appendChild(canvas)
        const url = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.download = `${this.date.year}${this.date.month}${this.date.date}.jpg`
        a.href = url
        const event = new MouseEvent('click');
        a.dispatchEvent(event);
      })
    },
    svg2canvas() {
      let svgElem = document.querySelectorAll('#header-image svg')
      svgElem.forEach(async function (node) {
        //获取svg的父节点
        let parentNode = node.parentNode;
        //获取svg的html代码
        let svg = node.outerHTML.trim();
        //创建一个<canvas>，用于放置转换后的元素
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const v = await Canvg.from(ctx, svg)
        v.start()
        //删除svg元素
        parentNode.removeChild(node);
        //增加canvas元素
        parentNode.appendChild(canvas);
      })
    }
  },
  async mounted() {
    try {
      this.bgImageSrc = await getBgImage();
      this.date = await getDate();
      this.svg2canvas()
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Lora:400,500,700&display=swap')

.container
  width: 900px
  height: 383px
  position: relative
  font-family: 'Lora'

.form
  width: 900px

.content, .bg-image
  width: 100%
  height: 100%

.bg-image
  position: absolute
  z-index: -1

.content
  display: flex
  color: white
  position: relative

  .date
    width: 200px

    *
      position: absolute

    .month, .day
      font-size: 80px

    .month
      top: 30px
      left: 30px

    .split
      top: 50px

    .day
      top: 125px
      left: 65px

    .week, .term
      display: flex
      flex-direction: column
      justify-content: center
      text-align: center
      top: 50px
      left: 125px
      border: solid 1px #eee
      width: 20px
      height: 80px

    .term
      top: 120px
      left: 30px
      height: 50px

    .week-english
      top: 185px
      left: 160px

    .lunar
      top: 250px
      left: 30px
      font-size: 20px

    .year
      top: 300px
      left: 30px
      font-size: 20px

  .text
    flex: 1
    font-size: 30px
    display: flex
    justify-content: center

    .wrapper
      display: flex
      flex-direction: column
      justify-content: center

    .first
      align-self: flex-start

    .second
      margin-left: 100px
      margin-top: 20px

    .first, .second
      display: flex
      justify-content: center

      span
        display: inline-block
        border-bottom: solid 1px #eee
        padding: 0 20px

  .sidebar
    width: 200px

    .label
      display: flex
      height: 100%
      flex-direction: column
      justify-content: flex-end
      align-items: flex-end

      p
        padding-right: 20px
</style>
