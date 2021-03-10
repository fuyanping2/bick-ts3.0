<template>
  <div class="echarts">
      <leftBox></leftBox>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Watch } from "vue-property-decorator";
import leftBox from "../layout/components/left/components/lefttop.vue";
@Component({
  components: {
    leftBox
  }
})
export default class layout extends Vue {
  
  public mounted() {
  }
}
</script>
<style scoped lang="scss">
.echarts{
    width: 100%;
    height: 100%;
    background: #04194b;
    box-sizing: border-box;
    // padding-bottom: vh(30);
}
</style>
