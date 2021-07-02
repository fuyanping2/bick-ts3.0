<template>
  <div class="left-bottom">
    <div class="sign-box">
      <borderBlock :msg="msgconcat">
        <div class="sign1">
          <span class="tit glabfont" style="color:#ffffff">运营量(辆)</span>
          <span class="num glabfont" style="color: rgba(19, 178, 254, 1)">
            {{
            parseFloat(signsData.streetBicycleNum[1]) +
            parseFloat(signsData.streetBicycleNum[2])+
            parseFloat(signsData.streetBicycleNum[0])
            }}
          </span>
        </div>
        <div class="sign1">
          <span class="tit glabfont" style="color:#ffffff">活跃量(辆)</span>
          <span style="color: #1ee5ae" class="num glabfont">
            {{
            parseFloat(signsData.companyActiveNum[1]) +
            parseFloat(signsData.companyActiveNum[2])+
            parseFloat(signsData.companyActiveNum[0])
            }}
          </span>
        </div>
        <div class="sign1">
          <span class="tit glabfont" style="color:#ffffff">总活跃率</span>
          <span
            style="color: rgba(90, 235, 244, 1)"
            class="num glabfont"
            v-if="signsData.sumActiveRate"
          >
            {{
            (
            ((parseFloat(signsData.companyActiveNum[1]) +
            parseFloat(signsData.companyActiveNum[2]) +
            parseFloat(signsData.companyActiveNum[0])) /
            (parseFloat(signsData.streetBicycleNum[1]) +
            parseFloat(signsData.streetBicycleNum[2]) +
            parseFloat(signsData.streetBicycleNum[0]))) *
            100
            ).toFixed(2) + '%'
            }}
          </span>
        </div>
      </borderBlock>
      <div class="sign-top">
        <div class="sign-top-left"></div>
        <div class="sign3">
          <div class="sign3-left">
            <div class="moboke">
              <img src="../../../../../assets/image/07mobike@3x.png" />
              <span style="color: #f9b436" class="tit glabfont">美团</span>
            </div>
            <div class="sign3-wrapper">
              <div class="titnum">
                <span class="tit glabfont">运营量(辆)</span>
                <span
                  class="num glabfont"
                  style="color: rgba(19, 178, 254, 1)"
                >{{ signsData.streetBicycleNum[1] }}</span>
              </div>
              <div class="titnum">
                <span class="tit glabfont">活跃量(辆)</span>
                <span style="color: #1ee5ae" class="num glabfont">
                  {{
                  signsData.companyActiveNum[1]
                  }}
                </span>
              </div>
              <div class="titnum">
                <span class="tit glabfont">活跃率</span>
                <span
                  style="color: rgba(90, 235, 244, 1)"
                  class="num glabfont"
                  v-if="
                    signsData.companyActiveRate &&
                    signsData.companyActiveRate[1]
                  "
                >
                  {{
                  (signsData.companyActiveRate[1] * 100).toFixed(2) + '%'
                  }}
                </span>
              </div>
            </div>
          </div>
          <div class="sign3-left sign3-right">
            <div class="moboke">
              <img src="../../../../../assets/image/03hellobike@3x.png" />
              <span style="color: #11a6ff" class="tit glabfont">哈啰</span>
            </div>
            <div class="sign3-wrapper">
              <span class="titnum">
                <span class="tit glabfont">运营量(辆)</span>
                <span
                  class="num glabfont"
                  style="color: rgba(19, 178, 254, 1)"
                >{{ signsData.streetBicycleNum[2] }}</span>
              </span>
              <div class="titnum">
                <span class="tit glabfont">活跃量(辆)</span>
                <span style="color: #1ee5ae" class="num glabfont">
                  {{
                  signsData.companyActiveNum[2]
                  }}
                </span>
              </div>
              <div class="titnum">
                <span class="tit glabfont">活跃率</span>
                <span
                  style="color: rgba(90, 235, 244, 1)"
                  class="num glabfont"
                  v-if="
                    signsData.companyActiveRate &&
                    signsData.companyActiveRate[2]
                  "
                >
                  {{
                  (signsData.companyActiveRate[2] * 100).toFixed(2) + '%'
                  }}
                </span>
              </div>
            </div>
          </div>
          <div class="sign3-left sign3-right">
            <div class="moboke">
              <img src="../../../../../assets/image/qingju.png" />
              <span style="color: #6DE3DC" class="tit glabfont">青桔</span>
            </div>
            <div class="sign3-wrapper">
              <span class="titnum">
                <span class="tit glabfont">运营量(辆)</span>
                <span
                  class="num glabfont"
                  style="color: rgba(19, 178, 254, 1)"
                >{{ signsData.streetBicycleNum[0] }}</span>
              </span>
              <div class="titnum">
                <span class="tit glabfont">活跃量(辆)</span>
                <span style="color: #1ee5ae" class="num glabfont">
                  {{
                  signsData.companyActiveNum[0]
                  }}
                </span>
              </div>
              <div class="titnum">
                <span class="tit glabfont">活跃率</span>
                <span
                  style="color: rgba(90, 235, 244, 1)"
                  class="num glabfont"
                  v-if="
                    signsData.companyActiveRate &&
                    signsData.companyActiveRate[0]
                  "
                >
                  {{
                  (signsData.companyActiveRate[0] * 100).toFixed(2) + '%'
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sign-bottom"></div>
    </div>
    <div class="peak-box">
      <div class="peak-ech" id="peak"></div>
    </div>
    <div class="morning-top">
      <div class="moring" v-if="morningTop">
        <borderBlock :msg="msgmoring"></borderBlock>
        <div class="line-box">
          <rank-block
            :rank-data="morningTop"
            :gradient-ramp="['#E9795B', '#FF9A85']"
            block-tit
            font-color="#FF9A85"
          ></rank-block>
        </div>
      </div>
      <div class="moring evening">
        <borderBlock :msg="msgevening"></borderBlock>
        <div class="line-box">
          <rank-block
            :rank-data="eveningTop"
            :gradient-ramp="['#F79A2C', '#F4CF71']"
            block-tit
            font-color="#F1901D"
          ></rank-block>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import borderBlock from "@/component/borderBlock/index.vue";
import rankBlock from "@/component/rankBlock3/index.vue";
import Echart from "./myEcharts";
import moment from "moment";
import API from "@/api/index";
const echareData = require("./echaredata.json");
import { refinedCal, cloneObj } from "@/libs/util.ts";
moment.locale("zh-cn");
let MyEchartleft: any = null; // 自定义echarts
@Component({
  components: {
    borderBlock,
    rankBlock
  }
})
export default class leftTop extends Vue {
  private msgconcat: string = "运行体征";
  private msgmoring: string = "早高峰区域TOP10";
  private msgevening: string = "晚高峰区域TOP10";
  private signsData: any = {};
  private activeRange: Array<{}> = [];
  // 早高峰排名数据
  private morningTop: Array<{}> = [];
  // 晚高峰排名数据
  private eveningTop: Array<{}> = [];
  private shudata: any = {
    name: "数量(辆)",
    el: "peak",
    x: [],
    line: [
      {
        name: "总数",
        type: "line",
        stack: "总量",
        symbolSize: 8,
        itemStyle: {
          lineStyle: {
            width: 8 //折线宽度
          }
        },
        data: []
      },
      {
        name: "活跃数",
        type: "line",
        symbolSize: 8,
        stack: "总量1",
        data: []
      }
    ],
    color: ["#FFDB5C", "#1EE5AE"]
  };
  public created() {
    this.getleftEchart();
    this.getPeakRanking();
  }
  public mounted() {}

  // 运行体征 获取数据
  private getleftEchart(): void {
    API.getActiveNum().then((res: any): void => {
      this.signsData = cloneObj(res);
      console.log(res)
      this.signsData.yearNum.forEach((iteam: any) => {
        this.shudata.x.push(iteam.createTime);

        this.shudata.line[1].data.push(iteam.activeNum);
        this.shudata.line[0].data.push(iteam.streetNum);
      });
      // const echData: any=this.shudata
      console.log(this.shudata);
      this.$nextTick(function() {
        MyEchartleft = new Echart();
        MyEchartleft.echartsOption(this.shudata);
      });
    });
    this.getPeakRanking();
  }
  // 早晚高峰 获取数据
  private getPeakRanking(): void {
    // 昨天
    const yesterday = moment()
      .subtract(1, "days")
      .format("YYYY-MM-DD");

    // const yesterday = "2019-03-22";

    // 重点区域 早高峰
    const morningStartTime = yesterday + " 08:30:00";
    const morningEndTime = yesterday + " 09:30:00";
    API.getPeak(morningStartTime, morningEndTime).then((res: any): void => {
      this.disPeak(res.data, 1);
    });

    // 重点区域 晚高峰
    const eveningStartTime = yesterday + " 17:30:00";
    const eveningEndTime = yesterday + " 18:30:00";
    API.getPeak(eveningStartTime, eveningEndTime).then((res: any): void => {
      this.disPeak(res.data, 2);
    });
  }

  // 处理早晚高峰数据
  private disPeak(data: Array<{}>, type: number): void {
    // TOP10
    const topData: any[] = data.slice(0, 10);

    // 最大数
    const maxBikeNum: string | number = topData[0].bicycleNum;

    // 比例计算
    let percentage: string | number = "";

    const typeData: Array<{}> = topData.map(
      (item: any, index: number): object => {
        percentage = refinedCal(`(${item.bicycleNum}/${maxBikeNum})*100`, 2);

        item.percentage = percentage + "%";
        item.index = index + 1;
        item.name = item.regionName;
        (item.img = require(`@img/gtop/${index + 1}@2x.png`)),
          (item.describe = item.bicycleNum + "辆");

        return item;
      }
    );

    if (type === 1) {
      this.morningTop = typeData;
    } else {
      this.eveningTop = typeData;
    }

    console.log(typeData);
  }
}
</script>
<style lang="scss" scoped>
.left-bottom {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: vh(8) vw(8);
  padding-bottom: vh(0);
  .sign1 {
    box-sizing: border-box;
    // padding: vh(6) vw(7);
    padding-left: vw(12);
    display: flex;
    align-items: center;
    span {
      text-align: left;
    }
    .tit {
      color: rgba(255, 255, 255, 1);
      font-size: vw(8);
      padding-right: vw(6);
    }
    .num {
      color: rgba(255, 219, 92, 1);
      font-size: vw(18);
    }
  }
  .sign-box {
    display: flex;
    flex-direction: column;

    .sign-top {
      width: 100%;
      height: vh(56);
      display: flex;
      box-sizing: border-box;
      margin: vh(6.1) vw(0);
      display: flex;
      justify-content: space-between;
      .sign-top-left {
        display: flex;
        justify-content: flex-start;
        box-sizing: border-box;
        background: rgba(12, 58, 111, 1);
        border-radius: 0px vw(9) vw(9) vw(9);

        .sign2 {
          margin-left: vw(11.5);
        }
      }

      .sign1 {
        box-sizing: border-box;
        padding: vh(6) vw(14);
        padding-right: vw(25);
        background: rgba(12, 58, 111, 1);
        border-radius: 0px vw(9) vw(9) vw(9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
          text-align: left;
        }
        .tit {
          color: rgba(255, 255, 255, 1);
          font-size: vw(8);
        }
        .num {
          margin-top: vh(5);
          color: rgba(255, 219, 92, 1);
          font-size: vw(21);
        }
      }
      .sign2 {
        margin-left: vw(11.5);
      }
      .sign3 {
        box-sizing: border-box;
        padding: vh(3.2) vw(10) vh(3.2) vw(10);
        border: vw(1) solid rgba(12, 58, 111, 1);
        border-radius: 0px vw(9) vw(9) vw(9);
        margin-left: vw(11.4);
        display: flex;
        background: rgba(12, 58, 111, 1);
        justify-content: space-between;
        flex: 1;
        .sign3-left {
          display: flex;
          align-items: center;
          flex: 1;
          justify-content: center;
          .sign3-wrapper {
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: center;
            .titnum {
              display: flex;

              justify-content: space-between;
              align-items: center;
              // flex-direction: column;
              margin-left: vw(6);
              margin-bottom: vh(4);
              span {
                text-align: left;
              }
              .tit {
                color: rgba(255, 255, 255, 1);
                font-size: vw(10);
              }
              .num {
                margin-top: vh(1);
                margin-left: vw(4);
                color: rgba(255, 219, 92, 1);
                font-size: vw(13);
              }
            }
            img {
              width: vw(23);
              height: vh(23);
              margin-right: vw(4);
            }
          }
          .moboke {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: vw(10);
            margin-right: vw(8);
            .tit {
              margin-top: vh(4);
            }
          }
          img {
            width: vw(23);
            height: vh(23);
            margin-right: vw(4);
          }
        }
        .sign3-right {
          // margin-left: vw(9);
          box-sizing: border-box;
          padding-left: vw(9);
          border-left: vw(1) solid #12559A;
        }
      }
    }
  }
  .peak-box {
    width: 100%;
    height: vh(140);
    .peak-ech {
      width: 100%;
      height: 100%;
    }
  }
  .morning-top {
    flex: 1;
    display: flex;
    margin-top: vh(6);
    .moring {
      flex: 1;
      display: flex;
      flex-direction: column;
      .line-box {
        flex: 1;
        margin-top: vh(4);
      }
    }
    .evening {
      margin-left: vw(30);
    }
  }
}
</style>

