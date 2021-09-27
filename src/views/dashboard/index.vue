<template>
  <div>
    <statistic-card />
    <alarm-trend />
    <a-row style="marginTop:20px">
      <a-col :span="13">
        <request-top />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import statisticCard from './statisticCard'
import alarmTrend from './alarmTrend'
import requestTop from './requestTop';

export default {
  name: "Dashboard",
  components: { statisticCard, alarmTrend, requestTop }
};
</script>
