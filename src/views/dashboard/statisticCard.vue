<template>
    <div class="gutter-example">
        <a-row :gutter="16" class="row-class">
            <a-col class="gutter-row" :span="6">
                <a-card :loading="loading">
                    <a-statistic title="应用"  suffix="个" >
                        <a href="/deploy/app" slot="formatter">{{ res.app }}</a>
                    </a-statistic>
                </a-card>
            </a-col>
            <a-col class="gutter-row" :span="6">
                <a-card :loading="loading">
                    <a-statistic title="主机" suffix="台">
                        <a href="/host" slot="formatter">{{ res.host }}</a>
                    </a-statistic>
                </a-card>
            </a-col>

            <a-col class="gutter-row" :span="6">
                <a-card :loading="loading">
                    <a-statistic title="任务" suffix="个">
                        <a href="/schedule" slot="formatter">{{ res.task }}</a>
                    </a-statistic>
                </a-card>
            </a-col>

            <a-col class="gutter-row" :span="6">
                <a-card :loading="loading">
                    <a-statistic title="监控" suffix="个">
                        <a href="/monitor" slot="formatter">{{ res.detection }}</a>
                    </a-statistic>
                </a-card>
            </a-col>


        </a-row>
    </div>
</template>

<script>
import request from '@/utils/request'

export default {
    name: "statisticCard",
    beforeMount() {
        request.get('/api/v1/home/statistic')
        .then(res => this.res = res)
        .finally(() => this.loading = false)
    },
    data() {
        return {
            res: [],
            loading: true
        }
    },
    methods: {
    }
}
</script>

<style scoped>
.gutter-example >>> .ant-row > div {
  background: transparent;
  border: 0;
}
.row-class {
    margin-top: 20px;
    margin-right: 20px;
    margin-left: 20px;
    margin-bottom: 20px;
    
}
.gutter-box {
  background: #00a0e9;
  padding: 5px 0;
}
</style>