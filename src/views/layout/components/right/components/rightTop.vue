<template>
  <div class="right-top">
    <!-- 规则弹框 -->
    <div class="myimg" v-if="isshowimg">
      <img class="rolesimg1" v-if="gu1==1" src="../../../../../assets/image/bjroles.png" />
      <img class="rolesimg4" v-if="gu1==4" src="../../../../../assets/image/role5.png" />
      <img class="rolesimg5" v-if="gu1==5" src="../../../../../assets/image/role6.png" />
      <div v-if="gu1==3" class="mywg">
          <div class="glabfont tit">判断标准</div>
          <div class="tabscroll">
            <table cellspacing="0" cellpadding="0"> 
              <tr>
                <td ><span class="glabfont">序号</span></td>
                <td ><span class="glabfont">停放位置</span></td>
                <td ><span class="glabfont">发现途径</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">1</span></td>
                <td ><span class="glabfont">在禁非区内</span></td>
                <td ><span class="glabfont">GPS定位+电子围栏</span></td>
              </tr>
              <tr>
                <td><span class="glabfont">2</span></td>
                <td><span class="glabfont">在道路非机动车停放点（白框）外</span></td>
                <td><span class="glabfont">清扫车视频图像分析</span></td>
              </tr>
            </table>
          </div>
      </div>
      <div v-if="gu1==7" class="mywg">
          <div class="glabfont tit">集中停放车辆数(截止2020年8月底)</div>
          <div class="tabscroll">
            <table cellspacing="0" cellpadding="0"> 
              <tr>
                <td ><span class="glabfont">序号</span></td>
                <td ><span class="glabfont">停放位置</span></td>
                <td ><span class="glabfont">美团辆）</span></td>
                <td ><span class="glabfont">哈啰（辆）</span></td>
                <td ><span class="glabfont">其他（辆）</span></td>
                <td ><span class="glabfont">总计</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">1</span></td>
                <td ><span class="glabfont">三林停放点</span></td>
                <td ><span class="glabfont">32995辆</span></td>
                <td ><span class="glabfont">12321辆</span></td>
                <td ><span class="glabfont">13284辆</span></td>
                <td ><span class="glabfont">58600辆</span></td>
              </tr>
              <tr>
                <td><span class="glabfont">总计</span></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><span class="glabfont">58600辆</span></td>
              </tr>
            </table>
          </div>
      </div>
      <div v-if="gu1==10" class="mywg" style="width:29vw">
          <div class="glabfont tit">上月输入车辆数（7月）</div>
          <div class="tabscroll">
            <table cellspacing="0" cellpadding="0"> 
              <tr>
                <td style="padding:0" colspan="2"><div style="position:relative;width:100%;height:100%"><div style="margin-top:0;transform-origin:bottom center;position:absolute;left:0;top:0;transform:rotateZ(7deg) scale(1);width:100%;height:1px;background:rgba(50, 134, 217, 1)"></div><span style="position:absolute;left:10%;
                top:-0.6vh" class="glabfont">街镇</span><span style="position:absolute;right:10%;
                bottom:-0.2vh" class="glabfont">停放场地</span></div></td>
                <td ><span class="glabfont">三林停放点</span></td>
              
              </tr>
              <tr>
                <td ><span class="glabfont">1</span></td>
                <td ><span class="glabfont">花木</span></td>
                <td ><span class="glabfont">851辆</span></td>
               
              </tr>
              <tr>
                <td ><span class="glabfont">2</span></td>
                <td ><span class="glabfont">三林</span></td>
                <td ><span class="glabfont">1355辆</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">3</span></td>
                <td ><span class="glabfont">东明</span></td>
                <td ><span class="glabfont">344辆</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">4</span></td>
                <td ><span class="glabfont">北蔡</span></td>
                <td ><span class="glabfont">627辆</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">5</span></td>
                <td ><span class="glabfont">潍坊</span></td>
                <td ><span class="glabfont">1818辆</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">6</span></td>
                <td ><span class="glabfont">南码头</span></td>
                <td ><span class="glabfont">105辆</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">7</span></td>
                <td ><span class="glabfont">塘桥</span></td>
                <td ><span class="glabfont">669辆</span></td>
              </tr>
               <tr>
                <td ><span class="glabfont">8</span></td>
                <td ><span class="glabfont">张江</span></td>
                <td ><span class="glabfont">62辆</span></td>
              </tr>
               <tr>
                <td colspan="2"><span class="glabfont">合计</span></td>
                <td ><span class="glabfont">5831辆</span></td>
              </tr>
            </table>
          </div>
      </div>

      <div v-if="gu1==11" class="mywg" style="width:29vw">
          <div class="glabfont tit">今年累计输入车辆数（截止7月底）</div>
          <div class="tabscroll">
            <table cellspacing="0" cellpadding="0"> 
              <tr>
                <td style="padding:0" colspan="2"><div style="position:relative;width:100%;height:100%"><div style="margin-top:0;transform-origin:bottom center;position:absolute;left:0;top:0;transform:rotateZ(7deg) scale(1);width:100%;height:1px;background:rgba(50, 134, 217, 1)"></div><span style="position:absolute;left:10%;
                top:-0.6vh" class="glabfont">街镇</span><span style="position:absolute;right:10%;
                bottom:-0.2vh" class="glabfont">停放场地</span></div></td>
                <td ><span class="glabfont">三林停放点</span></td>
              
              </tr>
              <tr>
                <td ><span class="glabfont">1</span></td>
                <td ><span class="glabfont">潍坊</span></td>
                <td ><span class="glabfont">3127辆</span></td>
               
              </tr>
              <tr>
                <td ><span class="glabfont">2</span></td>
                <td ><span class="glabfont">三林</span></td>
                <td ><span class="glabfont">5211辆</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">3</span></td>
                <td ><span class="glabfont">张江</span></td>
                <td ><span class="glabfont">2724辆</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">4</span></td>
                <td ><span class="glabfont">花木</span></td>
                <td ><span class="glabfont">1605辆</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">5</span></td>
                <td ><span class="glabfont">北蔡</span></td>
                <td ><span class="glabfont">2615辆</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">6</span></td>
                <td ><span class="glabfont">陆家嘴</span></td>
                <td ><span class="glabfont">833辆</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">7</span></td>
                <td ><span class="glabfont">东明</span></td>
                <td ><span class="glabfont">1600辆</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">8</span></td>
                <td ><span class="glabfont">塘桥</span></td>
                <td ><span class="glabfont">3426辆</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">9</span></td>
                <td ><span class="glabfont">沪东</span></td>
                <td ><span class="glabfont">462辆</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">10</span></td>
                <td ><span class="glabfont">杨思</span></td>
                <td ><span class="glabfont">812辆</span></td>
              </tr>
               <tr>
                <td ><span class="glabfont">11</span></td>
                <td ><span class="glabfont">南码头</span></td>
                <td ><span class="glabfont">133辆</span></td>
              </tr>
               <tr>
                <td colspan="2"><span class="glabfont">合计</span></td>
                <td ><span class="glabfont">22548辆</span></td>
              </tr>
            </table>
          </div>
      </div>

      <div v-if="gu1==12" class="mywg">
          <div class="glabfont tit">今年累计返还车辆数</div>
          <div class="tabscroll">
            <table cellspacing="0" cellpadding="0"> 
              <tr>
                <td ><span class="glabfont">序号</span></td>
                <td ><span class="glabfont">停放位置</span></td>
                <td ><span class="glabfont">美团（辆）</span></td>
                <td ><span class="glabfont">哈啰（辆）</span></td>
                <td ><span class="glabfont">其他（辆）</span></td>
                <td ><span class="glabfont">总计</span></td>
              </tr>
              <tr>
                <td ><span class="glabfont">1</span></td>
                <td ><span class="glabfont">三林停放点</span></td>
                <td ><span class="glabfont"></span></td>
                <td ><span class="glabfont"></span></td>
                <td ><span class="glabfont"></span></td>
                <td ><span class="glabfont">5567</span></td>
              </tr>
              <tr>
                <td><span class="glabfont">总计</span></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><span class="glabfont">5567</span></td>
              </tr>
            </table>
          </div>
      </div>

      <div class="info-close iconfont iconguanbi" @click="isshowimg=false,$store.state.isimg=''"></div>
    </div>

    <!-- 规则弹框 -->
    <!-- 表格的弹框 -->
    <div class="mytable" v-if="isshowtable">
      <div class="info-close iconfont iconguanbi" @click="isshowtable=false"></div>
      <div class="table-tit">
        <span class="glabfont">{{(numxianshi==2||numxianshi==8)?"区域预警播报列表":numxianshi==6?"总量报警":"违规停放列表"}}</span>
      </div>
      <div class="tabscroll">
        <table cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th>
                <span class="glabfont">序号</span>
              </th>
              <th>
                <span class="glabfont">{{numxianshi==2?"预警时间":"报警时间"}}</span>
              </th>
              <th v-if="numxianshi!==6">
                <span class="glabfont">区域名称</span>
              </th>
              <th v-if="numxianshi==6">
                <span class="glabfont">超量企业</span>
              </th>
              <th v-if="numxianshi==2">
                <span class="glabfont">预测车辆数</span>
              </th>
              <th v-if="numxianshi==2">
                <span class="glabfont">预警上限</span>
              </th>
              <th v-if="numxianshi==2">
                <span class="glabfont">需清运车辆数</span>
              </th>
              <th v-if="numxianshi!==6">
                <span class="glabfont">处理结果</span>
              </th>
              <th>
                <span class="glabfont">详情</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in dataTable" :key="index">
              <td>
                <span class="glabfont">{{index+1}}</span>
              </td>
              <td>
                <span class="glabfont">{{item.discoverTime}}</span>
              </td>
              <td>
                <span class="glabfont">{{item.name}}</span>
              </td>
              <td v-if="numxianshi==2">
                <span class="glabfont">{{item.predictNum}}</span>
              </td>
              <td v-if="numxianshi==2">
                <span class="glabfont">{{item.maxNum}}</span>
              </td>
              <td v-if="numxianshi==2">
                <span class="glabfont">{{item.cleanNum}}</span>
              </td>
              <td v-if="numxianshi!==6">
                <span class="glabfont">{{item.hdlDetail}}</span>
              </td>
              <td>
                <span class="glabfont">{{item.detail}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 表格的弹框 -->
    <borderBlock :msg="msgconcat1"></borderBlock>
    <div class="roles">
      <!-- <div class="rloes-box1">
        <div class="left-role">
          <img class="lbimg" src="../../../../../assets/image/lb.png" />
          <span class="glabfont rolefont">总量报警</span>
        </div>
        <img class="gzimg" @click="isshowimg=true,gu1=1" src="../../../../../assets/image/gz1.png" />
      </div> -->
      <div class="rloes-box1">
        <div class="left-role">
          <img class="lbimg" src="../../../../../assets/image/lb.png" />
          <span class="glabfont rolefont">区域预警</span>
        </div>
        <img class="gzimg" @click="$store.state.isimg=2" src="../../../../../assets/image/gz2.png" />
      </div>
      <div class="rloes-box1" style="margin-left:0.6vw">
        <div class="left-role">
          <img class="lbimg" src="../../../../../assets/image/lb.png" />
          <span class="glabfont rolefont">违规停放</span>
        </div>
        <img class="gzimg" @click="isshowimg=true,gu1=3" src="../../../../../assets/image/gz3.png" />
      </div>
    </div>
    <div class="roles">
      <div style="flex:1;display:flex;justify-content: space-between;">
        <div class="rloes-box3" @click="showtableData(2)">
          <span class="ljnum glabfont">本月发现</span>
          <div class="scrollnumsa">
            <scroll-num :datanum="allnum2" :mycolor="mycolor"></scroll-num>
          </div>
          <span class="ljnum glabfont">起</span>
        </div>
        <div class="rloes-box3" @click="showtableData(5,give2)">
          <span class="ljnum glabfont">今日发现</span>
          <div class="scrollnumsa">
            <scroll-num :datanum="allnum5" :mycolor="mycolor1"></scroll-num>
          </div>
          <span class="ljnum glabfont">起</span>
        </div>
      </div>
      <div style="flex:1;display:flex;justify-content: space-between;">
        <div class="rloes-box3" @click="showtableData(3)">
          <span class="ljnum glabfont" >本月发现</span>
          <div class="scrollnumsa">
            <scroll-num :datanum="allnum3" :mycolor="mycolor"></scroll-num>
          </div>
          <span class="ljnum glabfont">起</span>
        </div>
        <div class="rloes-box3" @click="showtableData(6,give3)">
          <span class="ljnum glabfont">今日发现</span>
          <div class="scrollnumsa">
            <scroll-num :datanum="allnum6" :mycolor="mycolor1"></scroll-num>
          </div>
          <span class="ljnum glabfont">起</span>
        </div>
      </div>
      
    </div>
    <div class="cumulative">
      <!-- <div class="cumulativebox">
        <img src="../../../../../assets/image/bj.png" />
        <div class="yujing">
          <span v-if="allowList1.length==0" class="noyuData glabfont">暂无数据</span>
          <rank-block2
            :rank-data="allowList1"
            :gradient-ramp="['#6ad4ff','#5a60ff']"
            font-color="#20c0fe"
          ></rank-block2>
        </div>
      </div> -->
      <div class="cumulativebox">
        <img src="../../../../../assets/image/bj.png" />
        <div class="yujing">
          <span v-if="allowList2.length==0" class="glabfont">暂无数据</span>
          <rank-block2 :rank-data="allowList2"></rank-block2>
        </div>
      </div>
      <div class="cumulativebox">
        <img src="../../../../../assets/image/bj.png" />
        <div class="yujing">
          <span v-if="allowList3.length==0" class="glabfont">暂无数据</span>
          <rank-block2 :rank-data="allowList3"></rank-block2>
        </div>
      </div>
    </div>
    <div class="toplast">
      <borderBlock :msg="msgvide1"></borderBlock>
    </div>
    <div class="echartbox">
      <div class="echart1">
        <div class="echartone" id="town"></div>
      </div>
      <div class="right-list">
        <span class="gont1 glabfont">昨日街道发现排名</span>
        <!-- <img src="../../../../../assets/image/paiming.png"> -->
        <div class="font2 font3">
          <el-tooltip class="item" effect="light" :content="numbor1" placement="top-start">
            <img class="num1" src="../../../../../assets/image/n2.png" />
          </el-tooltip>
          <el-tooltip class="item" effect="light" :content="numbor2" placement="top-start">
            <img class="num2" src="../../../../../assets/image/n1.png" />
          </el-tooltip>
          <el-tooltip class="item" effect="light" :content="numbor3" placement="top-start">
            <img class="num3" src="../../../../../assets/image/n3.png" />
          </el-tooltip>
        </div>
        <div class="font2">
          <span class="gont2 glabfont">{{topnum1}}</span>
          <span class="gont2 glabfont">{{topnum2}}</span>
          <span class="gont2 glabfont">{{topnum3}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue,Watch } from "vue-property-decorator";
import borderBlock from "@/component/borderBlock/index.vue";
import scrollNum from "@/component/scrollnum/index.vue";
import rankBlock2 from "@/component/rankBlock2/index.vue";
import Echart from "./myEchart";
import moment from 'moment';
import { refinedCal, cloneObj } from "@/libs/util.ts";
import API from "@/api/index";

let MyEchart1: any = null; // 自定义echarts
@Component({
  components: {
    borderBlock,
    scrollNum,
    rankBlock2
  }
})
export default class rightTop extends Vue {
  private towndata: any = {
    el: "town",
    x: [],
    dataY: []
  };

  private numxianshi: number = 1;
  private gu1: number = 1;
  private give3: any = [];
  private give4: any = [];
  private give2: any = [];
  private allnum1: any = [0];
  private allnum2: any = [0];
  private allnum3: any = [0];
  private allnum4: any = [0];
  private allnum5: any = [0];
  private allnum6: any = [0];
  private isshowimg: boolean = false;
  private isshowtable: boolean = false;
  private threenum: any = [];
  private dataTable: any = [];
  private topnum1: string = "";
  private mycolor: string = "#1EE5AE";
  private mycolor1: string = "#FFC22F";
  private topnum2: string = "";
  private topnum3: string = "";
  private numbor1: string = "";
  private numbor2: string = "";
  private numbor3: string = "";

  private intelligentData: any = {};
  private allowList1: any = {};
  private allowList2: any = {};
  private allowList3: any = {};
  private allowList4: any = {};
  private msgconcat1: string = "智能发现";
  private msgvide1: string = "街道发现TOP10 (累计历史七天)";



@Watch("$store.state.isimg")
  public onchanged(val: any, oldVal: any) {
    if (val==1) {
      this.isshowimg=true
      this.gu1=4
    }
    if (val==7||val==10||val==11||val==12) {
      this.isshowimg=true
      this.gu1=val
    }
    // s
    if (val==6) {
      this.isshowimg=true
      this.gu1=5
    }
  }


  public mounted() {
    this.$nextTick(function() {
      this.getnumEchart();
    });
  }
  public created() {
    this.getThree();
    this.getIntelligentData();
  }

  // getIntelligent

  private getIntelligentData(): void {
    API.getIntelligent({
      type:'month'
    }).then((res: any): void => {
      this.intelligentData = res;
      const str1: string = String(this.intelligentData[0].monthNum);
      const str2: string = String(this.intelligentData[1].monthNum);
      // if(this.intelligentData[2].monthNum){

      // }
      const str3: string = String(this.intelligentData[2].monthNum);
      const str4: string = String(this.intelligentData[0].todayNum);
      const str5: string = String(this.intelligentData[1].todayNum);
      const str6: string = String(this.intelligentData[2].todayNum);
      this.allnum1 = str1.split("");
      this.allnum2 = str2.split("");
      this.allnum3 = str3.split("");
      this.allnum4 = str4.split("");
      this.allnum5 = str5.split("");
      this.allnum6 = str6.split("");
      //报警播报
      this.allowList4 = this.intelligentData[0].list;
      this.allowList1 = this.intelligentData[0].list;
      this.allowList2 = this.intelligentData[1].list;
      this.allowList3 = this.intelligentData[2].list;
      this.give2=this.intelligentData[1].sheetList.slice(0,this.intelligentData[1].todayNum)
      this.give3=this.intelligentData[2].sheetList
      this.allowList3.forEach((item: any, index: number) => {
        item.id = index + 1;
      });
      // this.intelligentData
      // this.allnum1=this.intelligentData
      // var array=nums.split("");
    });
  }

  // 格式累计这些数字
  // private FormatNumber(polygon: string): Array<[]> {

  // }

  private getThree(): void {
    API.getTownThree().then((res: any): void => {
      this.threenum = cloneObj(res);
      this.topnum1 = this.threenum[1].shortName;
      this.topnum2 = this.threenum[0].shortName;
      if(this.threenum[2]){
      this.topnum3 = this.threenum[2].shortName;
      }

      this.numbor1 = this.threenum[1].num;
      this.numbor2 = this.threenum[0].num;
      if(this.threenum[2]){
      this.numbor3 = this.threenum[2].num;
      }
      
    });
  }
  private showtableData(num: number,give:any): void {
    this.$store.state.isallyj=num
    if(give.length>0){
      this.$store.state.sheetArr = give.join(",");
    }
   
  }

  // private showtableData(num: number): void {

    //  if(num!==3){
      // this.isshowtable = true;
      // this.$store.state.sheetArr = "";
      // this.numxianshi = num;
      // this.dataTable=this.allowList3.slice(0,this.allnum6)
      
      // if(num==2){
      //   this.dataTable = this.allowList2.slice(0,this.intelligentData[1].todayNum);
      // }else{
      //   this.dataTable = data;
      // }

    // }
    // if(num==3){
      //  this.isshowtable = true;
      // this.$store.state.sheetArr = "";
      // this.numxianshi = num;
      // this.dataTable=this.allowList3.slice(0,this.intelligentData[2].todayNum)
    // }
    
    // if(give.length>0){
    //   this.$store.state.sheetArr = give.join(",");
    // }else{
    //   this.$store.state.sheetArr = "总量"
    //   this.$store.state.sheetAllD=this.allowList4
    // }
 
  // }

  // 活跃量 获取数据
  private getnumEchart(): void {
    API.getRightTown().then((res: any): void => {
      // for(let key in res){
      //   this.towndata.x.push(key)
      //   this.towndata.dataY.push(res[key].num)
      // }
      res.forEach((iteam: any) => {
        this.towndata.x.push(iteam.shortName);
        this.towndata.dataY.push(iteam.num);
      });
      MyEchart1 = new Echart();
      MyEchart1.echartsOption(this.towndata);
    });
  }
}
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
.right-top {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: vh(8) vw(8);
  padding-bottom: vh(4);
  position: relative;
  .mytable {
    position: absolute;
    z-index: 50;
    left: 0;
    top: vh(100);
    width: 100%;
    height: vh(440);
    background: rgba(12, 58, 111, 1);
    border: 1px solid rgba(50, 134, 217, 1);
    .info-close {
      position: absolute;
      z-index: 10;
      right: vw(6);
      top: vh(6);
      cursor: pointer;
    }
    .table-tit {
      font-size: vw(11);
      color: #fff;
      text-align: left;
      margin: vh(7.5);
    }
    .tabscroll {
      width: 100%;
      height: 90%;
      overflow: hidden;
      overflow-y: scroll;
      box-sizing: border-box;
      padding: vh(10) vw(16);
    }
    .tabscroll::-webkit-scrollbar {
      display: none; //Safari and Chrome
      -ms-overflow-style: none; //IE 10+
      overflow: -moz-scrollbars-none; //Firefox
      width: 0 !important;
    }
    table {
      width: 100%;
      color: #fff;
      font-size: vw(10);
      border: vw(1) solid rgba(50, 134, 217, 1);

      thead {
        th {
          padding: vh(7.5) vw(8);
          border: vw(1) solid rgba(50, 134, 217, 1);
          border-left: none;
        }
        box-shadow: rgba(12, 58, 111, 0.6) 0 0 vw(10) vw(4) inset;
      }
      tbody {
        td {
          padding: vh(7.5) vw(8);
          border: vw(1) solid rgba(50, 134, 217, 1);
          border-top: none;
          border-left: none;
        }
      }
    }
  }
  .myimg {
    position: absolute;
    z-index: 60;
    left: vw(8);
    top: vh(50);
    .mywg{
      background: #082e63;
      text-align: left;
      box-sizing: border-box;
      padding: vh(20);
      .tabscroll{

        table {
        width: 100%;
        color: #fff;
        
        border: vw(1) solid rgba(50, 134, 217, 1);
        border-bottom: none;
            border-right: none;
        td {
            padding: vh(7.5) vw(8);
            span{
            font-size: vw(15);
            
            }
            text-align: center;
            border: vw(1) solid rgba(50, 134, 217, 1);
            border-top: none;
            border-left: none;
          }
      }

        //  table {
        //     border: vw(1) solid rgba(50, 134, 217, 1);
            
        //   }
        
      }
      .tit{
        margin-bottom: vh(12);
      }
    }

    .rolesimg1 {
      width: vw(388.571);
      height: vh(111.43);
    }
    .rolesimg4 {
      width: vw(548.57);
      height: vh(297.143);
    }
    .rolesimg5 {
      width: vw(548.57);
      height: vh(477.143);
    }
    .rolesimg2 {
      width: vw(548.571);
      height: vh(477.143);
    }
    .rolesimg3 {
      width: vw(548.571);
      height: vh(213.714);
    }
    .info-close {
      position: absolute;
      z-index: 10;
      right: vw(6);
      top: vh(6);
      cursor: pointer;
    }
  }
  .roles {
    display: flex;
    justify-content: space-between;
    margin-top: vh(7.7);
    .rloes-box3{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 1;
      .ljnum {
        font-size: vw(10);
        color: #65c6fc;
      }
      
    }
    .rloes-box1 {
      display: flex;
      justify-content: space-between;
      // width: 50%;
      flex: 1;
      height: vh(19.4);
      background: rgba(12, 58, 111, 0.8);
      align-items: center;
      .left-role {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .lbimg {
          width: vw(12);
          height: vh(12);
          margin: 0 vw(4);
        }
        .rolefont {
          color: #65c6fc;
          font-size: vw(10);
        }
      }
      .gzimg {
        width: vw(57);
        height: vh(15);
        margin-right: vw(4);
      }
    }
  }
  .cumulative {
    display: flex;
    justify-content: space-between;
    margin-top: vh(2);
    align-items: center;
    .cumulativebox {
      background: transparent;
      display: flex;
      width: 50%;
      justify-content: flex-start;
      align-items: center;
      .scrollnumsa {
        // flex:1;
      }
      img {
        width: vw(46);
        height: vh(10);
        margin-right: vw(4);
      }
      .ljnum {
        font-size: vw(10);
        color: #65c6fc;
      }
      .yujing {
        display: flex;
        flex-direction: column;
        // width: vw(200);
        height: vh(23);
        justify-content: center;
        .noyuData {
          font-size: vw(10);
          text-align: left;
          line-height: vh(23);
        }
      }
    }
  }
  .toplast {
    margin-top: vh(2);
  }
  .echartbox {
    display: flex;
    justify-content: space-between;
    flex: 1;
    .echart1 {
      width: 70%;
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
      align-items: center;
      span {
        color: #ffffff;
      }
      img {
        width: vw(131);
        height: vh(58);
        // margin:vh(5) 0;
      }
      .gont1 {
        font-size: vw(11);
        margin-bottom: vh(16);
      }
      .font3 {
        align-items: flex-end;
      }
      .font2 {
        width: 100%;
        display: flex;
        box-sizing: border-box;
        padding: 0 vw(10);
        justify-content: space-between;
        margin-top: vh(10);
        .num1 {
          width: vw(41.43);
          height: vh(46.86);
        }
        .num2 {
          width: vw(48.57);
          height: vh(58.29);
        }
        .num3 {
          width: vw(41.143);
          height: vh(39.43);
        }
      }
      .gont2 {
        font-size: vw(10);
      }
    }
    // margin-top:vh(18);
  }
}
</style>
