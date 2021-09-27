import { withHooks, useState, useEffect } from 'vue-hooks';
import { Chart, Geom, Axis, Tooltip } from 'vue-bizcharts';
import moment from 'moment';
import request from '@/utils/request'
import styles from './index.module.css';

export default withHooks(h => {
    const [loading, setLoading] = useState(false);
    const [duration, setDuration] = useState([moment(), moment()]);
    const [range, setRange] = useState('day');
    const [res, setRes] = useState([])

    useEffect(() => {
        setLoading(true);
        const strDuration = duration.map(x => x.format('YYYY-MM-DD'))
        request.post('/api/v1/home/request', {duration: strDuration})
          .then(res => setRes(res))
          .finally(() => setLoading(false))
    }, [duration])

    function handleClick(val) {
        let duration = [];
        switch (val) {
          case 'day':
            setRange('day');
            duration = [moment(), moment()];
            break;
          case 'week':
            setRange('week');
            duration = [moment().weekday(0), moment().weekday(6)];
            break;
          case 'month':
            setRange('month');
            const s_date = moment().startOf('month')
            const e_date = moment().endOf('month')
            duration = [s_date, e_date];
            break;
          default:
            setRange('custom')
            duration = val
        }
        setDuration(duration)
      }
      
    return [
        <a-card loading={loading} title="发布申请Top10" extra={(
            <div style={{display: 'flex', alignItems: 'center'}}>
              <span class={range === 'day' ? styles.spanButtonActive : styles.spanButton}
                    onClick={() => handleClick('day')}>今日</span>
              <span class={range === 'week' ? styles.spanButtonActive : styles.spanButton}
                    onClick={() => handleClick('week')}>本周</span>
              <span class={range === 'month' ? styles.spanButtonActive : styles.spanButton}
                    onClick={() => handleClick('month')}>本月</span>
              <a-range-picker style={{width: 230}} value={duration} onChange={handleClick}/>
            </div>
          )}>
        <Chart height={300} data={res} padding={[10, 0, 30, 35]} scale={{count: {alias: '发布申请数量'}}} forceFit>
            <Axis name="name"/>
            <Axis name="count" title/>
            <Tooltip/>
            <Geom type="interval" position="name*count"/>
        </Chart>
        </a-card>
    ]
})