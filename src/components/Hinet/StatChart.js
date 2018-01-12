import React from 'react';
import {Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape} from 'bizcharts';
import DataSet from '@antv/data-set';

class StatChart extends React.Component {

  render() {
    const {data} = this.props;
    if (!(data.length)) return <div style={{lineHeight: 18, textAlign: 'center'}}>No data</div>;
    // const ds = new DataSet();
    // const dv = ds.createView().source(data);




    return (
      <div>
        <Chart height={500} width={700} forceFit data={data}>
          <Axis name="iteration"/>
          <Axis name="score"/>
          <Tooltip showTitle={false} itemTpl='<li data-index={index}><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>' />
          <Geom type='line'
                position='iteration*score'
                tooltip='iteration*score'
          />
        </Chart>
      </div>
    );
  }

}


export default StatChart;
