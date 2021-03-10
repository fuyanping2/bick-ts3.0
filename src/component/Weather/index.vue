<template>
  <div class="weather">
    <span class="temp glabfont">{{weatherData.high_temp}}℃</span>
    <img :src="weatherData.img">
    <span class="temp1 glabfont">{{weatherData.desc}}</span>
    <span class="temp1 temp3 glabfont" v-if="weatherData.api">AQI {{weatherData.api}}</span>
    <span class="temp glabfont" v-if="weatherData.wind">风力: {{weatherData.wind}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import API from '@/api/index.ts';

@Component
export default class Weather extends Vue {
  public weatherData: object = {};

  public created() {
    this.getWeather();
  }

  /**
   * 请求数据
   */
  public getWeather(): void {
    //加载天气查询插件
    AMap.plugin('AMap.Weather', ()=> {
        //创建天气查询实例
        var weather = new AMap.Weather();

        //执行实时天气信息查询
        weather.getLive('上海市', (err:any, data:any)=> {
            console.log(err, data);
            const desc = data.weather;
            const aqi=''
            this.weatherData = {
                aqi,
                img: require(`@img/weather/${desc}.png`),
                // img: `${process.env.BASE_URL}weather/${desc}.png`,
                low_temp: '',
                high_temp: data.temperature,
                wind: data.windDirection+'风'+data.windPower,
                desc,
              };
        });
    })
    // API.getWeather().then((res: any) => {
    //   if (res.message === 'success') {
    //     const aqi = res.data.en.quality ? res.data.en.quality : '良';
    //     const thisWeather = res.data.forcast[0];
    //     const timeType =
    //       new Date(res.data.update_time).getHours() < 17 ? 'day' : 'night';
    //     const desc = thisWeather[timeType].type;
    //     const wind = res.data.current_wind_orient+res.data.current_wind
    //     this.weatherData = {
    //       aqi,
    //       img: require(`@img/weather/${desc}.png`),
    //       low_temp: thisWeather.low_temp.slice(0, -1),
    //       high_temp: thisWeather.high_temp.slice(0, -1),
    //       wind,
    //       desc,
    //     };
    //   }
    // });

    
  }
}
</script>

<style lang="scss" scoped>
.weather {
  display: flex;
  color:rgba(101,198,252,1);
  align-items: center;
  .temp{
    @include vw2(font-size,16);
    
  }
  .temp1{
    @include vw2(font-size,15);
    font-family:Microsoft YaHei;
    margin-right: vh(16.29);
  }
  img{
    width: vw(26.29);
    height: vh(19.43);
    margin:0 vw(7) 0 vw(16.29);
  }
  .temp2,.temp3{
    margin-left: vw(17);
  }

 
}
</style>
