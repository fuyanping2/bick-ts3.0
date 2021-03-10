<template>
  <!-- 工单详情 -->
  <div class="table">
    <div class="table-head">
        <div class="thead thead1"><span class="glabfont">处置事项</span></div>
        <!-- <div class="thead thead2"><span class="glabfont">时间</span></div> -->
        <div class="thead thead3"><span class="glabfont">地点</span></div>
        <div class="thead thead4"><span class="glabfont">派单部门</span></div>
        <!-- <div class="thead thead5"><span class="glabfont">处理要求</span></div> -->
        <div class="thead thead6"><span class="glabfont">接收单位</span></div>
        <div class="thead thead7"><span class="glabfont">处理状态</span></div>
    </div>
    <div class="tablebody">
        <div class="swiper-container righttable" id="swipertable"  @mouseenter="on_bot_enter" @mouseleave="on_bot_leave">
            <div class="swiper-wrapper">
                <div class="swiper-slide"
                    v-for="(iteam,index) in findVisible"
                    :key="index">
                <div class="allData" @click="showMsg(iteam.sheetCode)">
                    <div class="table-foncom table-foncom1"><span class="glabfont">{{iteam.type}}</span></div>
                    <!-- <div class="table-foncom table-foncom2"><span class="glabfont">{{iteam.dispatchTime}}</span></div> -->
                    <div class="table-foncom table-foncom3"><span class="glabfont">{{iteam.handleAddr.replace("上海市浦东新区","")}}</span></div>
                    <div class="table-foncom table-foncom4"><span class="glabfont">{{iteam.name}}</span></div>
                    <!-- <div class="table-foncom table-foncom5"><span class="glabfont">{{iteam.method}}</span></div> -->
                     <div class="table-foncom table-foncom6"><span class="glabfont">{{iteam.dispatchReceive}}</span></div>
                    <div class="table-foncom table-foncom7">
                      <!-- <span class="glabfont">
                      {{iteam.status}}</span> -->
                      <div class="process-line">
                        <div class="statusline">
                          <div :style="{width:iteam.myindex*numList+'%'}" class="statusline-two"></div>
                          <div class="statuscicle"
                              v-for="(item,index) in handleStatusList"
                              :key="index">
                            <div :style="{left:numList*index+'%'}"
                                class="ciclsa glabfont"
                                :class="iteam.status==item.status||(index<iteam.myindex||index==iteam.myindex)?'ciclsa ciclsa3':'ciclsa'"></div>
                            <el-popover
                              placement="top-start"
                              popper-class="myLIst"
                              v-if="(index<iteam.myindex||index==iteam.myindex)"
                              trigger="hover">
                              <div>
                                  <div>{{(item.status=="发现"||item.status=="推送")?iteam.dispatchTime:item.status=="接收"?iteam.readTime:iteam.dealEndTime}} {{item.status}}</div>
                                  <div>{{iteam.type}}</div>
                              </div>
                              <div slot="reference" :style="{left:numList*index+'%'}"
                            :class="iteam.status==item.status?'nameList namebjy glabfont':'nameList glabfont'">{{item.status}}</div>
                            </el-popover>
                            <div v-if="(index>iteam.myindex)" :style="{left:numList*index+'%'}"
                            :class="iteam.status==item.status?'nameList namebjy glabfont':'nameList glabfont'">{{item.status}}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                </div>

                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
  import API from '@/api/index.ts';
  import Swiper from "swiper";
  import moment from 'moment';
  moment.locale('zh-cn');
  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component({
      components: {
      }
    })
  export default class centerBottom extends Vue {
    private swipertable:any | null=null;
    // 工单数据
    private workOrderDisposeData: any = {};
    private workOrderObjData: any = {};
    private nameindex :  string="推送";
    private numList: number =100/3;
    private findVisible: any =[];
    private handleStatusList: any =[
      {
        status:"发现"
      },
      {
        status:"推送"
      },
      {
        status:"接收"
      },
      {
        status:"反馈"
      }
    ];
    
    public created() {
        this.getWorkData();
      
    }
    public mounted() {
    }

    private initsatable(): void {
      setTimeout(()=>{
        this.swipertable = new Swiper("#swipertable", {
            loop: true, // 循环模式选项
            autoplay: {
              delay: 5000, // 切换时间
              disableOnInteraction: false
            },
            direction: 'vertical',
            slidesPerView: 2,
            slidesPerGroup: 2,
            mousewheel: true,
            observer: true, // 修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        });

      },300)
      
    }


    private on_bot_enter(): void {
        this.swipertable.autoplay.stop()
    }
    private on_bot_leave(): void {
        this.swipertable.autoplay.start()
    }

    public getWorkData(): void {
    // 昨天
      API.getRightTable().then(
        (res: any): void => {
          // 时间倒序
          res.forEach((itam:any)=>{
            this.handleStatusList.forEach((item:any,index:number)=>{
              if(itam.status==item.status){
                itam.myindex=index
              }
            })
          })
          this.findVisible=res
          this.$nextTick(() => {
             this.initsatable();
           });
        }
      );
    }



    public showMsg(code:any): void {
        const startTime: string = moment().format('YYYY-MM-DD');
        API.getAreaIdAndDate(startTime, startTime).then(
        (res: any): void => {
          res.data.forEach((item: any) => {
            if(item.sheetCode==code){
                console.log(item)
                this.$store.state.workeObj=item.sheetCode
            }
          })
        },
      );
    }
   
  }
</script>
<style lang="scss" scoped>
.table{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    span{
      font-size:vw(10);
    }
    .table-head{
        width: 100%;
        height: vh(18.3);
        line-height: vh(18.3);
        color:#ffffff;
        // background:rgba(12,58,111,0.2);
        box-shadow: rgba(12,58,111,0.6) 0 0 vw(10) vw(4) inset;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          color:#65C6FC;
        }
        .thead {
          text-align: center;
          height: 100%;
        }
        .thead1 {
            width:10%;
        }
        .thead2 {
            width:25%;
        }
        .thead3 {
          width:30%;
        }
         .thead4 {
            width:15%;
        }
        .thead5 {
          width:10%;
        }
         .thead6 {
            width:10%;
        }
        .thead7 {
          width:35%;
        }
    }
    .tablebody{
        width:100%;
        height:vh(76);
        border:1px solid rgba(9,28,93,1);
        overflow:hidden;
         span{
          color:#ffffff;
          font-size:vw(10);
        }
        .righttable{
            width:100%;
            height:vh(76);
            color:#BDD3FF;
            overflow:hidden;
            // .swiper-wrapper{
            //   width:100%;
            //   height:100%;
            //   overflow:hidden;
            // }
            .swiper-slide {
                width: 100%;
                height: vh(38) !important;
                .allData{
                    width: 100%;
                    height: vh(38);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom:1px solid rgba(9,28,93,1);
                    cursor:pointer;
                    .table-foncom{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        box-sizing:border-box;
                        padding:vh(0) 0;
                    }
                    .table-foncom1{
                        width: 10%;
                    }
                    .table-foncom2{
                        width: 25%;
                    }
                    .table-foncom3{
                        width: 30%;
                    }
                    .table-foncom4{
                        width: 15%;
                    }
                    .table-foncom5{
                        width:10%;
                        
                    }
                    .table-foncom6{
                        width: 10%;
                    }
                    .table-foncom7{
                        width: 35%;
                        box-sizing:border-box;
                        padding:vw(4) 0;
                        padding-top:vh(16);
                        .process-line{
                           width: 82%;
                          height: 100%;
                          display: flex;
                          align-items: center;
                          .statusline{
                            width: 100%;
                            height: vw(3);
                            background: rgba(255, 255, 255, 0.5);
                            box-sizing: border-box;
                            position: relative;
                            .statusline-two {
                              position: absolute;
                              left: 0;
                              top: 0;
                              height: 100%;
                              background: rgba(60, 175, 255, 1);
                            }
                            .statuscicle {
                              .nameList {
                                position: absolute;
                                top: vw(-34);
                                font-size: vw(9);
                                margin-left: vw(-26);
                                width: vw(52);
                                height: vh(26);
                                line-height: vh(20);
                              }
                              .namebjy {
                                width:vw(42);
                                height:vw(16);
                                background: url("../../../../assets/image/process/qp.png");
                                background-size: 100% 100%;
                                text-align: center;
                                color:#ffffff;
                                font-size:vw(8);
                                line-height: vh(8);
                                margin-left: vw(-23);
                                margin-top:vh(4);
                              }
                              .ciclsa {
                                position: absolute;
                                top: vw(-3);
                                width: vw(10);
                                height: vw(10);
                                background: url("../../../../assets/image/process/1@3x.png");
                                background-size: 100% 100%;
                                margin-left: vw(-8);
                                cursor: pointer;
                              }
                              .ciclsa3 {
                                background: url("../../../../assets/image/process/3@3x.png");
                                background-size: 100% 100%;
                              }
                              
                            }
                          }
                        }
                    }
                    
                }
            }
        }
    }
    

}

</style>
