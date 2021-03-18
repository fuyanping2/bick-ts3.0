<template>
  <div class="center-content">
    <div class="center-top" id="mapContainer" ref="fullScreenTarget">
      <div class="workemag" v-if="isShowWorkOrderDispose">
        <div class="myWork">
          <div
            class="info-close iconfont iconguanbi"
            @click="isShowWorkOrderDispose = false"
          ></div>
          <div class="header-tit">
            <span class="glabfont">工单详情</span>
          </div>
          <div class="msgList" v-if="$store.state.isallyj">
            <span class="left-f glabfont">处置事项：</span>
            <span class="left-r glabfont">{{
              $store.state.isallyj == 2 || $store.state.isallyj == 5
                ? '区域预警'
                : $store.state.isallyj == 3 || $store.state.isallyj == 6
                ? '违规停放'
                : '总量报警'
            }}</span>
          </div>
          <div
            class="msgList"
            v-for="(item, index) in workOrderDisposeData.detailsTexts"
            :key="index"
          >
            <span class="left-f glabfont">{{ item.key }}：</span>
            <span class="left-r glabfont">{{ item.val }}</span>
          </div>
          <div class="msgList">
            <span class="left-f glabfont">状态：</span>
            <span class="left-r glabfont">{{
              $store.state.isallyj == 1 || $store.state.isallyj == 4
                ? '正在减量'
                : workOrderDisposeData.despatchStatus
            }}</span>
          </div>
          <div class="msgList qiehuan">
            <span class="left-f glabfont">处理单位：</span>
            <div class="left-r glabfont" v-if="!workOrderDisposeData.codets.includes('-JJWCYZX-')">
              <div
                style="margin-right: 6px"
                @click="
                  workOrderDisposeData.voList =
                    workOrderDisposeData.voList1[index]
                "
                v-for="(item, index) in workOrderDisposeData.voList1"
                :key="index"
              >
                <span :style="{ color: item.dealCompany == '美团' ? '#f9b436' :item.dealCompany == '哈啰'? '#11a6ff':'#4DC5BC' }">{{
                  item.dealCompany
                }}</span>
              </div>
              
            </div>
            <div class="left-r glabfont" v-else>{{workOrderDisposeData.dispatchs}}</div>
          </div>
          <div
            class="msgList"
            v-if="workOrderDisposeData.detailsImgs1.length > 0"
          >
            <span class="left-f glabfont">处理时间：</span>
            <span class="left-r glabfont">{{
              dateFormat(
                'Y-m-d H:M:S',
                new Date(workOrderDisposeData.voList.handleTime)
              )
            }}</span>
          </div>
          <div
            class="msgList"
            v-if="workOrderDisposeData.detailsImgs1.length > 0"
          >
            <span class="left-f glabfont">整理数：</span>
            <span class="left-r glabfont">{{
              workOrderDisposeData.voList.arrangeNum
            }}</span>
          </div>
          <div
            class="msgList"
            v-if="workOrderDisposeData.detailsImgs1.length > 0"
          >
            <span class="left-f glabfont">清运数：</span>
            <span class="left-r glabfont">{{
              workOrderDisposeData.voList.cleanNum
            }}</span>
          </div>
          <div
            class="msgList"
            v-if="workOrderDisposeData.detailsImgs1.length > 0"
          >
            <span class="left-f glabfont">处理前：</span>
            <div class="left-r">
              <div
                style="margin-right: 6px"
                v-for="(item, index) in workOrderDisposeData.voList
                  .dispatchBeforePhotoURLs"
                :key="index"
              >
                <!-- <el-image
                  style="width:40px; height:64px"
                  :src="item"
                  :preview-src-list="workOrderDisposeData.detailsImgs1"
                ></el-image> -->

                <el-popover placement="left" trigger="hover">
                  <img :src="'http://101.132.45.201:18088/' + item" />
                  <el-image
                    style="width: 40px; height: 64px"
                    :src="'http://101.132.45.201:18088/' + item"
                    slot="reference"
                  ></el-image>
                </el-popover>
              </div>
            </div>
          </div>
          <div
            class="msgList"
            v-if="workOrderDisposeData.detailsImgs2.length > 0"
          >
            <span class="left-f glabfont">处理后：</span>
            <div class="left-r">
              <div
                style="margin-right: 6px"
                v-for="(item, index) in workOrderDisposeData.voList
                  .dispatchAfterPhotoURLs"
                :key="index"
              >
                <!-- <el-image
                  style="width:40px; height:64px"
                  :src="item"
                  :preview-src-list="workOrderDisposeData.detailsImgs2"
                ></el-image> -->

                <el-popover placement="left" trigger="hover">
                  <img :src="'http://101.132.45.201:18088/' + item" />
                  <el-image
                    style="width: 40px; height: 64px"
                    :src="'http://101.132.45.201:18088/' + item"
                    slot="reference"
                  ></el-image>
                </el-popover>
              </div>
            </div>
          </div>
          <div
            class="msgList"
            v-if="workOrderDisposeData.detailsImgs3.length > 0"
          >
            <span class="left-f glabfont">派单照片：</span>
            <div class="left-r">
              <div
                style="margin-right: 6px"
                v-for="(item, index) in workOrderDisposeData.detailsImgs3"
                :key="index"
              >
                <el-popover placement="left" trigger="hover">
                  <img :src="item" />
                  <el-image
                    style="width: 40px; height: 64px"
                    :src="item"
                    slot="reference"
                  ></el-image>
                </el-popover>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 全屏按钮 S -->
      <div class="full-screen-btn" @click="fullScreen">
        <img src="../../../../assets/image/qunping.png" />
      </div>
      <!-- 全屏按钮 E -->
      <!-- 工单详情 S -->
      <div class="wokr-btn" @click="isshowtable = true">
        <span
          class="glabfont"
          style="
            border: 0.03vw solid #03f1fa;
            cursor: pointer;
            font-size: 0.1vw;
            color: #03f1fa;
            background: rgba(3, 241, 250, 0.15);
            padding: 0.1vh 0.3vw;
            padding-bottom: 0.3vh;
            border-radius: 0.2vw;
          "
          >工单列表</span
        >
      </div>
      <!-- <div class="wokr-btn" style="left:4.6vw" @click="isshowtable1=true">
        <span class="glabfont" style="border:0.03vw solid #03F1FA;cursor:pointer;font-size:0.1vw;color:#03F1FA;background:rgba(3,241,250,0.15);padding:0.1vh 0.3vw;padding-bottom:0.3vh;border-radius:0.2vw">派单规则</span>
      </div> -->
      <!-- <div class="wokr-btn" style="margin-left:4vw" v-if="imggz" @click="isshowimg=true">
        <span class="glabfont" style="border:0.03vw solid #03F1FA;cursor:pointer;font-size:0.1vw;color:#03F1FA;background:rgba(3,241,250,0.15);padding:0.1vh 0.3vw;padding-bottom:0.3vh;border-radius:0.2vw">街镇预警原则</span>
      </div> -->
      <div class="wokr-btn" style="top: 4.6vh" v-if="isshowimg">
        <img class="imgbox" src="../../../../assets/image/jieimg.png" />
        <div
          class="info-close iconfont iconguanbi"
          @click="isshowimg = false"
        ></div>
      </div>
      <!-- 工单详情 E -->
      <div class="mytable" v-if="isshowtable1">
        <div
          class="info-close iconfont iconguanbi"
          @click="isshowtable1 = false"
        ></div>
        <div class="tabscroll" style="width: 100%; padding: 4vh 0.3vw">
          <table cellspacing="0" cellpadding="0">
            <tr>
              <td><span class="glabfont">事项</span></td>
              <td style="width: 18%"><span class="glabfont">地点</span></td>
              <td><span class="glabfont">派单至</span></td>
              <td><span class="glabfont">派单及反馈渠道</span></td>
              <td><span class="glabfont">处置时限</span></td>
              <td><span class="glabfont">超时派单至</span></td>
              <td><span class="glabfont">派单及反馈渠道</span></td>
              <td><span class="glabfont">处置时限</span></td>
              <td style="width: 20%"><span class="glabfont">备注</span></td>
            </tr>
            <tr>
              <td rowspan="3"><span class="glabfont">违规停放</span></td>
              <td><span class="glabfont">禁非区</span></td>
              <td><span class="glabfont">企业</span></td>
              <td><span class="glabfont">app</span></td>
              <td><span class="glabfont">1小时</span></td>
              <td><span class="glabfont">区城运中心</span></td>
              <td><span class="glabfont">系统平台</span></td>
              <td><span class="glabfont">1小时</span></td>
              <td style="padding: 2.6vh 0">
                <span class="glabfont"
                  >区城运中心接单后派单至陆家嘴街道，街道处置后反馈至区城运中心，区城运中心再反馈至建交委</span
                >
              </td>
            </tr>
            <tr>
              <td><span class="glabfont">内环内5个街道及世博区域</span></td>
              <td><span class="glabfont">企业</span></td>
              <td><span class="glabfont">app</span></td>
              <td><span class="glabfont">1.5小时</span></td>
              <td><span class="glabfont">/</span></td>
              <td><span class="glabfont">/</span></td>
              <td><span class="glabfont">/</span></td>
              <td rowspan="3">
                <span class="glabfont"
                  >企业超时未处置按运维评分规则扣分，纳入企业年度考核。</span
                >
              </td>
            </tr>
            <tr>
              <td>
                <span class="glabfont">剩余7个街道及张江、金桥、北蔡</span>
              </td>
              <td><span class="glabfont">企业</span></td>
              <td><span class="glabfont">app</span></td>
              <td><span class="glabfont">2小时</span></td>
              <td><span class="glabfont">/</span></td>
              <td><span class="glabfont">/</span></td>
              <td><span class="glabfont">/</span></td>
            </tr>
            <tr>
              <td><span class="glabfont">区域预警</span></td>
              <td>
                <span class="glabfont"
                  >12个街道及北蔡、金桥、张江、世博区域</span
                >
              </td>
              <td><span class="glabfont">企业</span></td>
              <td><span class="glabfont">app</span></td>
              <td><span class="glabfont">1小时</span></td>
              <td><span class="glabfont">/</span></td>
              <td><span class="glabfont">/</span></td>
              <td><span class="glabfont">/</span></td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 表格的弹框 -->
      <div
        class="mytable"
        v-if="isshowtable"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <div
          class="info-close iconfont iconguanbi"
          @click="isshowtable = false"
        ></div>
        <div class="table-tot">
          <div class="glabfont">
            处置事项：{{
              $store.state.isallyj == 1 || $store.state.isallyj == 4
                ? '总量报警'
                : $store.state.isallyj == 2 || $store.state.isallyj == 5
                ? '区域预警'
                : '违规停放'
            }}
          </div>
          <div>
            <el-select
              size="small"
              style="width: 6vw"
              v-model="orderVale"
              @change="changeOrder"
              placeholder="请选择"
            >
              <el-option label="当年" :value="7"></el-option>
              <el-option label="本月" :value="3"></el-option>
              <el-option label="今日" :value="6"></el-option>
            </el-select>
          </div>
        </div>
        <div class="tabscroll">
          <table cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th>
                  <span class="glabfont">序号</span>
                </th>
                <th>
                  <span class="glabfont">{{
                    $store.state.isallyj == 2 || $store.state.isallyj == 5
                      ? '预警时间'
                      : '时间'
                  }}</span>
                </th>
                <th
                  v-if="$store.state.isallyj == 3 || $store.state.isallyj == 6"
                >
                  <span class="glabfont">地点</span>
                </th>
                <th
                  v-if="$store.state.isallyj == 2 || $store.state.isallyj == 5"
                >
                  <span class="glabfont">区域名称</span>
                </th>
                <th
                  v-if="$store.state.isallyj == 2 || $store.state.isallyj == 5"
                >
                  <span class="glabfont">预测车辆数</span>
                </th>
                <th
                  v-if="$store.state.isallyj == 2 || $store.state.isallyj == 5"
                >
                  <span class="glabfont">预警上限</span>
                </th>
                <th
                  v-if="$store.state.isallyj == 2 || $store.state.isallyj == 5"
                >
                  <span class="glabfont">需清运车辆数</span>
                </th>
                <th
                  v-if="
                    $store.state.isallyj == 2 ||
                    $store.state.isallyj == 5 ||
                    $store.state.isallyj == 3 ||
                    $store.state.isallyj == 6
                  "
                >
                  <span class="glabfont">接收单位</span>
                </th>
                <th
                  v-if="
                    $store.state.isallyj == 2 ||
                    $store.state.isallyj == 5 ||
                    $store.state.isallyj == 3 ||
                    $store.state.isallyj == 6
                  "
                >
                  <span class="glabfont">处置状态</span>
                </th>
                <th
                  v-if="
                    $store.state.isallyj == 2 ||
                    $store.state.isallyj == 5 ||
                    $store.state.isallyj == 3 ||
                    $store.state.isallyj == 6
                  "
                >
                  <span class="glabfont">处理结果</span>
                </th>
                <th
                  v-if="$store.state.isallyj == 1 || $store.state.isallyj == 4"
                >
                  <span class="glabfont">详情</span>
                </th>
                <th
                  v-if="$store.state.isallyj == 1 || $store.state.isallyj == 4"
                >
                  <span class="glabfont">超量企业</span>
                </th>
                <th
                  v-if="$store.state.isallyj == 1 || $store.state.isallyj == 4"
                >
                  <span class="glabfont">处置状态</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataTable" :key="index">
                <td>
                  <span class="glabfont">{{ index + 1 }}</span>
                </td>
                <td>
                  <span class="glabfont">{{ item.discoverTime }}</span>
                </td>
                <td
                  v-if="$store.state.isallyj == 3 || $store.state.isallyj == 6"
                >
                  <span class="glabfont">{{ item.name }}</span>
                </td>
                <td
                  v-if="$store.state.isallyj == 2 || $store.state.isallyj == 5"
                >
                  <span class="glabfont">{{ item.name }}</span>
                </td>
                <td
                  v-if="$store.state.isallyj == 2 || $store.state.isallyj == 5"
                >
                  <span class="glabfont">{{ item.predictNum }}</span>
                </td>
                <td
                  v-if="$store.state.isallyj == 2 || $store.state.isallyj == 5"
                >
                  <span class="glabfont">{{ item.maxNum }}</span>
                </td>
                <td
                  v-if="$store.state.isallyj == 2 || $store.state.isallyj == 5"
                >
                  <span class="glabfont">{{ item.cleanNum }}</span>
                </td>
                <td
                  v-if="
                    $store.state.isallyj == 2 ||
                    $store.state.isallyj == 5 ||
                    $store.state.isallyj == 3 ||
                    $store.state.isallyj == 6
                  "
                >
                  <span class="glabfont">{{ item.dispatchReceive }}</span>
                </td>
                <td
                  v-if="
                    $store.state.isallyj == 2 ||
                    $store.state.isallyj == 5 ||
                    $store.state.isallyj == 3 ||
                    $store.state.isallyj == 6
                  "
                >
                  <span class="glabfont">{{
                    item.status == 0
                      ? '未处理'
                      : item.status == 1
                      ? '处理中'
                      : item.status == 2
                      ? '已处理'
                      : item.status == 3
                      ? '重新派单'
                      : '已完成'
                  }}</span>
                </td>
                <td
                  v-if="
                    $store.state.isallyj == 2 ||
                    $store.state.isallyj == 5 ||
                    $store.state.isallyj == 3 ||
                    $store.state.isallyj == 6
                  "
                >
                  <span class="glabfont">{{ item.hdlDetail }}</span>
                </td>
                <td
                  v-if="$store.state.isallyj == 1 || $store.state.isallyj == 4"
                >
                  <span class="glabfont">{{ item.detail }}</span>
                </td>
                <td
                  v-if="$store.state.isallyj == 1 || $store.state.isallyj == 4"
                >
                  <span class="glabfont">{{ item.name }}</span>
                </td>
                <td
                  v-if="$store.state.isallyj == 1 || $store.state.isallyj == 4"
                >
                  <span class="glabfont">{{ item.hdlDetail }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 表格的弹框 -->

      <!-- 设置按钮 S -->
      <div class="setting-btn" @click="settingShow = !settingShow">
        <img
          src="../../../../assets/image/icon_display_pre@3x.png"
          draggable="false"
          v-if="settingShow"
        />
        <img
          src="../../../../assets/image/icon_display_nor@3x.png"
          draggable="false"
          v-else
        />
        <span class="glabfont" style="color: #333333">显示设置</span>
      </div>
      <!-- 设置按钮 E -->
      <!-- 设置内容 S -->
      <transition
        name="from-above-down"
        enter-active-class="animated fadeInRight"
        leave-active-class="animated fadeOutRight"
      >
        <div class="setting-content" v-show="settingShow">
          <!-- 企业 -->
          <!-- 企业 -->

          <!-- 设置项 -->
          <div class="setting-selects">
            <div
              class="selects-item"
              v-for="(item, index) in settingItemData"
              @click="selectSetItem(item)"
              :key="index"
            >
              <img
                src="@img/select_pre1.png"
                draggable="false"
                v-if="item.state"
              />
              <img src="@img/select_nor1.png" draggable="false" v-else />
              <span class="glabfont">{{ item.name }}</span>
            </div>
          </div>
          <!-- 设置项 -->
        </div>
      </transition>
      <!-- 设置内容 E -->

      <!-- 禁停区详情 S -->
      <transition name="fade">
        <forbid-info
          v-if="ForbidName !== ''"
          @close="ForbidName = ''"
          :params="ForbidData[ForbidName]"
        ></forbid-info>
      </transition>
      <!-- 禁停区详情 E -->

      <!-- 工单图例 S -->
      <transition name="fade">
        <div
          class="map-legend"
          @mouseleave="isShowLegendTab = false"
          v-if="isShowLegend"
        >
          <div
            class="legend-item"
            @click="showLegendTable(index)"
            v-for="(item, index) in legendData"
            :key="index"
          >
            <img :src="item.icon" />
            <span class="glabfont">{{ item.name }}</span>
          </div>

          <div class="workOrder-tab" v-show="isShowLegendTab">
            <div class="slide-box">
              <div class="tab-head">
                <div
                  :style="{ width: item.width + '%' }"
                  v-for="(item, index) in legendTabHead[selectLegend]"
                  :key="index"
                >
                  <span>{{ item.name }}</span>
                </div>
              </div>
              <div class="tab-body">
                <div
                  class="tab-item"
                  v-for="(item, index) in sheetWorkOrder[selectLegend]"
                  :key="index"
                >
                  <div
                    :style="{
                      width: legendTabHead[selectLegend][subindex].width + '%',
                    }"
                    v-for="(subItem, subindex) in item"
                    :key="subindex"
                  >
                    <span>{{ subItem }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!-- 工单图例 E -->

      <!-- 工单详情 S -->
      <transition name="fade">
        <!-- <div class="workOrder-details" >
        <div
          class="workOrder-details-close iconfont iconguanbi"
          @click="isShowWorkOrderDispose = false"
        ></div>
        <div class="details-status"><span class="glabfont">{{workOrderDisposeData.nowStatus}}</span></div>
        <div class="imgs">
          <slideshow
            v-if="isShowWorkOrderDispose"
            parendClassName="workOrder-details"
            :options="workOrderDisposeOptions"
          >
            <div
              class="swiper-slide"
              v-for="(item,index) in workOrderDisposeData.detailsImgs"
              :key="index"
            >
              <div class="img-item">
                <img :src="item.url">
                <div class="img-watermark"><span class="glabfont">{{item.text}}</span></div>
              </div>
            </div>
          </slideshow>
        </div>
        <div class="details-text">
          <p style="text-align:left;margin-bottom:0.5vh" v-for="(item,index) in workOrderDisposeData.detailsTexts" :key="index">
            <span class="glabfont">{{item.key}}：</span>
            <span class="glabfont">{{item.val}}</span>
          </p>
        </div>
        <div class="dispose-status"><span class="glabfont">{{workOrderDisposeData.despatchStatus}}</span></div>
        </div>-->
      </transition>
      <!-- 工单详情 E -->
    </div>

    <div class="center-bottom">
      <div class="class-right">
        <borderBlock :msg="msgconcat"></borderBlock>
        <div class="box-right">
          <div
            :class="innum == iteam.id ? 'box-bor box-bor1' : 'box-bor'"
            @click="showinde(iteam)"
            v-for="(iteam, index) in shudata"
            :key="iteam.id"
          >
            <span class="glabfont">{{ iteam.name }}</span>
          </div>
        </div>
        <div class="class-box">
          <span
            @click="isshowtable1 = true"
            class="glabfont"
            style="
              border: 0.03vw solid #03f1fa;
              cursor: pointer;
              font-size: 0.1vw;
              color: #03f1fa;
              background: rgba(3, 241, 250, 0.15);
              padding: 0.1vh 0.3vw;
              padding-bottom: 0.3vh;
              border-radius: 0.2vw;
            "
            >派单规则</span
          >
        </div>
      </div>
      <div class="tableox">
        <center-bottom v-if="innum == 1"></center-bottom>
        <tableBottom v-if="innum == 2"></tableBottom>
      </div>
      <!-- <center-bottom></center-bottom> -->
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" scoped src="./index.scss"></style>
