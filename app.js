var minYear = d3.min(birthData, d => d.year);
var maxYear = d3.max(birthData, d => d.year);
var width = 600;
var height = 600;
var yearData = birthData.filter(d => d.year === minYear);

var months = [];
for (var i = 0; i < birthData.length; i++) {
  var month = birthData[i].month;
  if (months.indexOf(month) === -1) {
    months.push(month);
  }
}
var seasons = [1,2,3,4];
var colors = [
  "#aec7e8", "#a7cfc9", "#9fd7a9", "#98df8a", "#bac78e", "#ddb092",
  "#ff9896", "#ffa48c", "#ffaf82", "#ffbb78", "#e4bf9d", "#c9c3c3"
];
var colorScale = d3.scaleOrdinal()
                   .domain(months)
                   .range(colors);

var quarterColors = ["#1f77b4", "#2ca02c", "#d62728", "#ff7f0e"];
                
d3.select('input')
  .property('min',minYear)
  .property('max',maxYear)
  .property('value',minYear)
  .on('input',function(){
    makeGraph(+d3.event.target.value);
  });
  
var svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);
    
  svg
  .append('g')
    .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')')
    .classed('chart', true);
    
  svg
  .append('g')
    .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')')
    .classed('inner-chart', true);

    svg
    .append('text')
    .classed('title',true)
    .attr('x',width/2)
    .attr('y',30)
    .attr('text-anchor','middle');

makeGraph(minYear);

function makeGraph(year){
  var yearData = birthData.filter(d => d.year === year);
  yearData.forEach(function(d){
   if(d.month === 'January'){  
      d.monthNum = 1;
   }else if(d.month === 'February'){  
      d.monthNum = 2;
   }else if(d.month === 'March'){  
      d.monthNum = 3;
   }else if(d.month === 'April'){  
      d.monthNum = 4;
   }else if(d.month === 'May'){  
      d.monthNum = 5;
   }else if(d.month === 'June'){  
      d.monthNum = 6;
   }else if(d.month === 'July'){  
      d.monthNum = 7;
   }else if(d.month === 'August'){  
      d.monthNum = 8;
   }else if(d.month === 'September'){  
      d.monthNum = 9;
   }else if(d.month === 'October'){  
      d.monthNum = 10;
   }else if(d.month === 'November'){  
      d.monthNum = 11;
   }else if(d.month === 'December'){  
      d.monthNum = 12;
   }
  });
  
  var arcs = d3.pie()
             .value(d => d.births)
             .sort((a,b) => a.monthNum > b.monthNum);
                
  var innearcs = d3.pie()
                    .value(d => d.births)
                    .sort((a,b) => a.quarter - b.quarter);
  var path = d3.arc()
             .outerRadius(width / 2 - 40)
             .innerRadius(width / 4)
              .padAngle(.01)
             .cornerRadius(20);
             
  var innerPath = d3.arc()
                .outerRadius(width / 4)
                .innerRadius(0)
                .padAngle(.01)
                .cornerRadius(20);

  var outer = d3.select('.chart')
                  .selectAll('.arc')
                  .data(arcs(yearData));
                  
  var inner = d3.select('.inner-chart')
                  .selectAll('.arc')
                  .data(innearcs(getQuarter(yearData)));
  
  outer.exit().remove();

  var entered = outer
                .enter();
    entered            
    .append('path')
      .classed('arc', true)
    .merge(outer)
      .attr('fill', d => colorScale(d.data.month))
      .attr('stroke', 'black')
      .attr('d', path);
    
  
  inner.exit().remove();

  inner
   .enter()            
    .append('path')
      .classed('arc', true)
    .merge(inner)
      .attr('fill', (d,i) => quarterColors[i])
      .attr('stroke', 'black')
      .attr('d', innerPath);
    
    d3.select('.title')
        .text('Birth by months and quarter for ' + year);
}

function getQuarter(data){
    var quartertallies = [0,1,2,3].map(n => ({quarter: n, births: 0}));
    data.forEach(d =>{
        var quarter = Math.floor((d.monthNum - 1)/3);
        quartertallies[quarter].births += d.births;
    });
    return quartertallies;
}