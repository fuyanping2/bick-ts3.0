<template>
  <div class="right-bottom">
    <!-- 弹框 -->
    <div class="myimg" v-if="isshowimg">
      <img class="rolesimg1" src="../../../../../assets/image/role5.png" />
      <div
        class="info-close iconfont iconguanbi"
        @click="isshowimg = false"
      ></div>
    </div>

    <!-- 弹框 -->
    <div class="maypad" style="border: 1px solid rgba(18, 85, 154, 1)">
      <borderBlock :msg="msgvide3"></borderBlock>
      <div class="concentrated-car">
        <div
          class="rloes-box3"
          style="border-right: 1px solid #0c3a6f; margin-top: 1vh"
        >
          <span class="ljnum glabfont">车辆数</span>
          <div class="scrollnumsa">
          <!-- <div class="scrollnumsa" @click="$store.state.isimg = 7"> -->
            <scroll-num :datanum="allnum2" :mycolor="mycolor"></scroll-num>
          </div>
          <span class="ljnum glabfont">起</span>
        </div>
        <div class="rloes-box2" style="border-right: 1px solid #0c3a6f">
          <div
            class="glabfont ljnum"
            style="width: 100%; color: #ffffff; text-align: center"
          >
            输入车辆数(辆)
          </div>
          <div class="num-box">
            <div class="rloes-box3">
            <!-- <div class="rloes-box3" @click="$store.state.isimg = 10"> -->
              <span style="color: #ffffff" class="ljnum glabfont">上月</span>
              <span class="scrollnumsa glabfont">843</span>
            </div>
            <div class="rloes-box3" @click="$store.state.isimg = 11">
              <span style="color: #ffffff" class="ljnum glabfont"
                >今年累计</span
              >
              <span class="scrollnumsa glabfont">843</span>
            </div>
          </div>
        </div>
        <div class="rloes-box2">
          <div
            class="ljnum glabfont"
            style="width: 100%; color: #ffffff; text-align: center"
          >
            返还车辆数(辆)
          </div>
          <div class="num-box">
            <div class="rloes-box3">
              <span style="color: #ffffff" class="ljnum glabfont">上月</span>
              <span class="scrollnumsa glabfont">0</span>
            </div>
             <div class="rloes-box3">
            <!-- <div class="rloes-box3" @click="$store.state.isimg = 12"> -->
              <span style="color: #ffffff" class="ljnum glabfont"
                >今年累计</span
              >
              <span class="scrollnumsa glabfont">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="maypad maypad1" style="border: 1px solid rgba(18, 85, 154, 1)">
      <div class="header-top">
        <borderBlock :msg="msgconcat1"></borderBlock>
        <div class="pfroles" @click="$store.state.isimg = 1">
          <span class="glabfont">评分规则</span>
        </div>
        <div class="pfroles" @click="$store.state.isimg = 6">
          <span class="glabfont">额度调控</span>
        </div>
      </div>

      <div class="echartbox">
        <div class="echart1">
          <div class="echartone" id="company"></div>
        </div>
        <div class="right-list">
          <span class="gont1 glabfont">企业工单处置昨日得分</span>
          <div class="fractionBox">
            <div class="imgfraction1">
              <!-- <waterPond :score="score1" :imgBg="imgBg1" :borderColor="borderColor1"></waterPond> -->
              <div class="border-top"></div>
              <span class="fonsinum1 glabfont">{{ score1 }}</span>
              <span class="fonsinum2 glabfont">分</span>
              <div class="rank-barIn" :style="{ height: score1 + '%' }"></div>
            </div>
            <div class="imgfraction1 imgfraction2">
              <!-- <waterPond :score="score2" :imgBg="imgBg2" :borderColor="borderColor2"></waterPond> -->
              <div class="border-top"></div>
              <div class="rank-barIn1" :style="{ height: score2 + '%' }"></div>
              <span class="fonsinum1 glabfont">{{ score2 }}</span>
              <span class="fonsinum2 glabfont">分</span>
            </div>
            <div class="imgfraction1 imgfraction2">
              <div class="border-top"></div>
              <div class="rank-barIn2" :style="{ height: score3 + '%' }"></div>
              <span class="fonsinum1 glabfont">{{ score3 }}</span>
              <span class="fonsinum2 glabfont">分</span>
            </div>
          </div>
          <div class="numde">
            <span class="gont2 glabfont">美团</span>
            <span class="gont2 glabfont">哈啰</span>
            <span class="gont2 glabfont">青桔</span>
          </div>
        </div>
      </div>
      <borderBlock :msg="msgvide1" style="margin-top: 2vh"></borderBlock>
      <div class="tableboxwork">
        <div class="left-ech" id="echLef"></div>
        <div style="width:50%">
          <div class="fv glabfont">企业投诉占比(近一年)</div>
          <div class="workOrderBox">
            <div class="workOrderBox-item">
              <div class="echart-content" id="disContainer1"></div>
              <div class="name-text glabfont" style="color: #f9b436">
                美团:{{mudata2[1].receiveCount}}
              </div>
            </div>
            <div class="workOrderBox-item">
              <div class="echart-content" id="disContainer2"></div>
              <div class="name-text glabfont" style="color: #29b2ee">
                哈啰:{{mudata2[0].receiveCount}}
              </div>
            </div>
            <div class="workOrderBox-item">
              <div class="echart-content" id="disContainer3"></div>
              <div class="name-text glabfont" style="color:#73E6DF">
                青桔:{{mudata2[2].receiveCount}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import borderBlock from '@/component/borderBlock/index.vue'
import waterPond from '@/component/waterLevelPond/index.vue'
import scrollNum from '@/component/scrollnum/index.vue'
// import echartsLiquidfill from 'echarts-liquidfill'
import echarts from 'echarts'
import Echart2 from './myEchart1'
import Echartsa from './myEcharts'
import API from '@/api/index'
let MyEchart3: any = null // 自定义echarts
let MyEchart4: any = null // 自定义echarts
@Component({
  components: {
    borderBlock,
    scrollNum,
    waterPond,
  },
})
export default class rightTop extends Vue {
  private companydata: any = {
    el: 'company',
    x: [],
    data1: [],
    data2: [],
  }
  private mudata: any = []
  private mudata1: any = []
  private mudata2: any = [
    {
      receiveCount:0
    },
    {
      receiveCount:0
    },
    {
      receiveCount:0
    }
  ]
  // private allnum2: any = [5,3,2,7,2];
  private allnum2: any = [8, 6, 1, 0, 1]
  private mycolor: string = '#13B2FE'
  private rihtBoxData: any = {
    el: 'disContainer1',
    value: 0,
    name: '1',
    unVal: 0,
    color: ['#f9b436', '#4F505D'],
  }
  private rihtBoxData1: any = {
    el: 'disContainer2',
    value: 44.6,
    name: '1',
    unVal: 55.4,
    color: ['#70A7E0', '#4F505D'],
  }
    private rihtBoxData2: any = {
    el: 'disContainer3',
    value: 0,
    name: '1',
    unVal: 100,
    color: ['#73E6DF', '#4F505D'],
  }
  private score1: number = 0
  private score2: number = 0
  private score3: number = 0
  private msgconcat1: string = '企业工单处置得分 (历史7天)'
  private msgvide3: string = '集中停放'
  private isshowimg: boolean = false
  private isshowimg1: boolean = false
  private msgvide1: string = '市民热线投诉统计'
  private imgBg1: any = null
  private imgBg2: any = null
  private town1: any = null
  private company1: any = null
  private borderColor1: string = ''
  private borderColor2: string = ''

  public mounted() {
    this.initEcharts1()

    this.$nextTick(function () {
      this.getnumEchart()

      this.borderColor1 = '#FFC955'
      this.borderColor2 = '#36D7FF'
      this.imgBg1 = require('../../../../../assets/water.png')
      this.imgBg2 = require('../../../../../assets/water2.png')
    })
  }

  private getnumEchart(): void {
    MyEchart4 = new Echartsa()
    
    
  }
  public created() {
    this.getScoreEchart()
  }

  // 初始化
  public initEcharts1(): void {
    const town1: any = document.querySelector('#echLef')
    this.town1 = echarts.init(town1)
    window.addEventListener('resize', () => {
      this.town1.resize()
    })
  }

  // 评分
  private getScoreEchart(): void {
    API.getBicyCleScore().then((res: any): void => {
      this.score1 = res.avg[0].avgScore
      this.score2 = res.avg[1].avgScore
      if(res.avg[2]){
        this.score3 = res.avg[2].avgScore
      }
      res.result.forEach((iteam: any) => {
        this.companydata.x.push(iteam.createTime)
        this.companydata.data1.push(iteam.list[0].score)
        this.companydata.data2.push(iteam.list[1].score)
      })
      // this.mudata = this.companydata.x
      
      MyEchart3 = new Echart2()
      MyEchart3.echartsOption1(this.companydata)
    })

    API.getRightNum().then((res: any): void => {
      
      
      res.list.forEach((itam: any) => {
        this.mudata.push(itam.day)
        this.mudata1.push(itam.num)
      })
      this.echartsOption3()


      let datacompaby=JSON.parse(res.company)
      this.mudata2=datacompaby
      console.log(datacompaby)
      let num1=(((this.mudata2[1].receiveCount)/((this.mudata2[1].receiveCount)+(this.mudata2[0].receiveCount)+(this.mudata2[2].receiveCount)))*100).toFixed(1)
      let num2=(((this.mudata2[0].receiveCount)/((this.mudata2[1].receiveCount)+(this.mudata2[0].receiveCount)+(this.mudata2[2].receiveCount)))*100).toFixed(1)
      let num3=(((this.mudata2[2].receiveCount)/((this.mudata2[1].receiveCount)+(this.mudata2[0].receiveCount)+(this.mudata2[2].receiveCount)))*100).toFixed(1)
      this.rihtBoxData.value=num1
      this.rihtBoxData.unVal=100-this.rihtBoxData.value
      this.rihtBoxData1.value=num2
      this.rihtBoxData1.unVal=100-this.rihtBoxData1.value
      this.rihtBoxData2.value=num3
      this.rihtBoxData2.unVal=100-this.rihtBoxData2.value
      MyEchart4.echartsOption(this.rihtBoxData)
      MyEchart4.echartsOption(this.rihtBoxData1)
      MyEchart4.echartsOption(this.rihtBoxData2)
    })
  }

  public echartsOption3(): void {
    const option: any = {
      color: ['#FF5AC3'],
      grid: {
        top: '11',
        bottom: '25',
        right: '28',
        left: '44',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        show: true,
        right: '8',
        textStyle: {
          color: '#C3CAD9',
          fontSize: 20, //更改坐标轴文字大小
        },
      },
      textStyle: {
        color: '#C3CAD9',
        fontSize: 20, //更改坐标轴文字大小
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,

        nameTextStyle: {
          verticalAlign: 'bottom',
          color: '#C3CAD9',
          fontSize: 16,
        },
        axisLabel: {
          show: true,
          fontSize: 20, //调整数值改变倾斜的幅度（范围-90到90）
        },
        axisLine: {
          lineStyle: {
            color: '#12559A',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#657CA8'],
            opacity: 0.1,
          },
        },
        data: this.mudata,
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#12559A',
          },
        },
        // max: 240,
        axisLabel: {
          show: true,
          fontSize: 20, //调整数值改变倾斜的幅度（范围-90到90）
        },
        axisTick: {
          show: false,
        },
        nameTextStyle: {
          color: '#C3CAD9',
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#12559A'],
            opacity: 0.1,
          },
        },
        minInterval: 1,
      },
      series: [
        {
          data: this.mudata1,
          type: 'line',
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(225,72,225,0.6)',
              },
              {
                offset: 1,
                color: 'rgba(0,0,0,0)',
              },
            ]),
          },
        },
      ],
    }
    // setTimeout((this as any)[params.el].setOption(option), 500);
    this.town1.setOption(option, true)
  }
}
</script>
<style scoped lang="scss">
.right-bottom {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  position: relative;
  overflow: hidden;
  .maypad {
    box-sizing: border-box;
    padding: vh(8) vw(8);
  }
  .maypad1 {
    margin-top: vh(5);
  }

  .myimg {
    position: absolute;
    z-index: 60;
    left: 0;
    top: vh(-600);
    .rolesimg1 {
      width: vw(548.57);
      height: vh(297.143);
    }
    .info-close {
      position: absolute;
      z-index: 10;
      right: vw(6);
      top: vh(6);
      cursor: pointer;
    }
  }

  .header-top {
    display: flex;
    justify-content: flex-start;
    .pfroles {
      margin-left: vw(10);
      width: vw(48);
      height: vh(16);
      cursor: pointer;
      background: rgba(0, 228, 255, 0.1);
      border: 1px solid rgba(0, 228, 255, 1);
      border-radius: 2px;
      font-size: vw(10);
      line-height: vh(16);
    }
  }
  .echartbox {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: vh(85);
    margin-top: vh(5);
    .echart1 {
      width: 60%;
      height: 100%;
      .echartone {
        width: 100%;
        height: 100%;
      }
    }
    .right-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .fractionBox {
        display: flex;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        padding: 0 vw(5);
        position: relative;

        .borfon {
          position: absolute;
          width: 100%;
          height: vh(1);
          left: 0;
          top: vh(12);
          font-size: vw(14);
        }
        .imgfraction1 {
          width: vw(50.8);
          height: vh(50.9);
          border-radius: 50%;
          border: vw(1) solid #ffc955;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: vh(11);
          margin-bottom: vh(5);
          position: relative;
          overflow: hidden;
          .border-top {
            position: absolute;
            width: 100%;
            height: vw(1);
            left: 0;
            top: 40%;
            border-bottom: vw(1) dashed red;
            z-index: 20;
          }
          .rank-barIn {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: linear-gradient(to bottom, #ffae00 0%, #ffae00 100%);
          }
          .rank-barIn1 {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: linear-gradient(to bottom, #36d7ff 0%, #003cb7 100%);
          }
          .rank-barIn2 {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background: linear-gradient(to bottom, #73E6DF 0%, #00B0A4 100%);
          }
          .fonsinum1 {
            font-size: vw(21);
            z-index: 30;
            color: rgba(255, 255, 255, 1);
            margin-top: vh(18);
          }
          .fonsinum2 {
            font-size: vw(10);
            z-index: 40;
            color: rgba(255, 255, 255, 1);
            margin-top: vh(18);
          }
        }
        .imgfraction2 {
          margin-left: vw(6);
          border: vw(1) solid #36d7ff;
        }
      }
      .numde {
        display: flex;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        padding: 0 vw(35);
      }
      span {
        color: #ffffff;
      }
      img {
        width: vw(100);
        height: vh(50);
        margin: vh(5) 0;
      }
      .gont1 {
        font-size: vw(11);
      }
      .gont2 {
        font-size: vw(10);
      }
    }
    // margin-top:vh(18);
  }
  .tableboxwork {
    width: 100%;
    height: vh(90);
    margin-top: vh(6);
    display: flex;
    justify-content: space-between;
    .fv {
      font-size: vw(11);
      color: #ffffff;
      text-align: center;
    }
    .left-ech {
      width: 70%;
      height: 100%;
    }
    .workOrderBox {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .echart-content {
        width: vw(60);
        height: vh(56);
        div {
          // height:100% !important;
        }
      }
      .name-text {
        font-size: vw(10);
        color: #c3cad9;
        text-align: center;
        margin-top: vh(10);
      }
    }
  }
  .concentrated-car {
    display: flex;
    box-sizing: border-box;
    padding: vh(2) 0;
    .rloes-box3 {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;

      .ljnum {
        font-size: vw(10);
        color: #65c6fc;
      }
      .scrollnumsa {
        color: #5aebf4;
      }
    }
    .num-box {
      display: flex;
      margin-top: vh(6);
      width: 100%;
      justify-content: space-between;
    }
    .rloes-box2 {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      .ljnum {
        font-size: vw(10);
        color: #65c6fc;
      }
    }
  }
}
</style>
