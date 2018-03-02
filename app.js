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
var colorScale = d3.scaleOrdinal()
                   .domain(months)
                   .range(d3.schemeCategory20);
                   
d3.select('svg')
    .attr('width', width)
    .attr('height', height)
  .append('g')
    .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')')
    .classed('chart', true);

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
             .sort((a,b) =>{
                 if(a.monthNum > b.monthNum){
                  return 1;
                }else if(a.monthNum < b.monthNum){
                  return -1;
                }else{
                  return a.births - b.births;
                }})
             (yearData);

  var path = d3.arc()
             .outerRadius(width / 2 - 10)
             .innerRadius(width / 4)
              .padAngle(.01)
             .cornerRadius(20);

  var update = d3.select('.chart')
                  .selectAll('.arc')
                  .data(arcs);

  update.exit().remove();

  update
      .enter()
    .append('path')
      .classed('arc', true)
    .merge(update)
      .attr('fill', d => colorScale(d.data.month))
      .attr('stroke', 'black')
      .attr('d', path);

}