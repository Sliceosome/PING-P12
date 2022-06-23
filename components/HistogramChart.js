import React, { Component } from 'react'
import Chart from 'react-google-charts'


const chartOptions = {
  title: 'AI Histogram',
  legend: { position: 'top', maxLines: 2 },
  colors: ['#5C3292', '#1A8763'],
  interpolateNulls: false,
}
function HistogramChart({L1, L2}) {
    var HistogramData=[['Students','Experts','','']];
    
    
    var size1=L1.length;
    var size2=L2.length;
    for (let i=0;i<size1;i++){
        var cellule=[L1[i],null,null,null];
        HistogramData.push(cellule);
    }
    for (let i=0;i<size2;i++){
        var cellule=[null,L2[i],null,null];
        HistogramData.push(cellule);
    }
    return (
      <div className="container mt-5">
        <h2>Test d'histogrammes</h2>
        <Chart
          width={'1000px'}
          height={'400px'}
          chartType="Histogram"
          loader={<div>Loading Chart</div>}
          data={HistogramData}
          options={chartOptions}
          rootProps={{ 'data-testid': '5' }}
        />
      </div>
    )

}
export default HistogramChart