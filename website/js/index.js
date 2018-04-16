
var weight_data = [
 {'date': 0, 'mailw': 2.2536259817106883, 'spamw': 1.4556202090608381},
 {'date': 1, 'mailw': 0.069872258979461588, 'spamw': 0.068335112447289306},
 {'date': 2, 'mailw': 1.8194455595325627, 'spamw': 1.6790628068217603},
 {'date': 3, 'mailw': 0.38413217561339963, 'spamw': 0.23131365455005148},
 {'date': 4, 'mailw': 1.1043062082144757, 'spamw': 0.93856157052959543},
 {'date': 5, 'mailw': 0.79583188000209315, 'spamw': 0.45874240281445378},
 {'date': 6, 'mailw': 1.8484373928455193, 'spamw': 1.7870674837574727},
 {'date': 7, 'mailw': 0.68014058318189241, 'spamw': 0.52063521840962601},
 {'date': 8, 'mailw': 0.043319976817938088, 'spamw': 0.040581038773306703},
 {'date': 9, 'mailw': 0.64631117571086449, 'spamw': 0.59450075142675118},
 {'date': 10, 'mailw': 0.040965537017205955, 'spamw': 0.040647296456998772},
 {'date': 11, 'mailw': 0.13716643552024632, 'spamw': 0.1215291722099431},
 {'date': 12, 'mailw': 0.64643347999670442, 'spamw': 0.57517171392876976},
 {'date': 13, 'mailw': 0.84763246402548909, 'spamw': 0.84347779916374355},
 {'date': 14, 'mailw': 2.2137289974134275, 'spamw': 1.8594150307775228},
 {'date': 15, 'mailw': 0.84965379528629792, 'spamw': 0.68392012070124164},
 {'date': 16, 'mailw': 0.70236116231147205, 'spamw': 0.42888931308756345},
 {'date': 17, 'mailw': 1.0263938645549691, 'spamw': 0.52541067052187396},
 {'date': 18, 'mailw': 0.43869359884378156, 'spamw': 0.27335679689827713},
 {'date': 19, 'mailw': 0.20274772941033736, 'spamw': 0.18741135582176752},
 {'date': 20, 'mailw': 0.29674800810006463, 'spamw': 0.251915861877822},
 {'date': 21, 'mailw': 0.71982004546234502, 'spamw': 0.68762001544481832},
 {'date': 22, 'mailw': 2.5025967376370111, 'spamw': 1.3066018298506619},
 {'date': 23, 'mailw': 1.5493380010728934, 'spamw': 0.90467435963085985},
 {'date': 24, 'mailw': 2.7486162563255441, 'spamw': 1.7043211833045462},
 {'date': 25, 'mailw': 0.83582556034423738, 'spamw': 0.72400439476614087},
 {'date': 26, 'mailw': 2.0718466374549278, 'spamw': 1.5600017132326987},
 {'date': 27, 'mailw': 1.739458547861402, 'spamw': 1.2758140616011484},
 {'date': 28, 'mailw': 2.6917823980651145, 'spamw': 1.6804863331975446},
 {'date': 29, 'mailw': 0.45462127369679273, 'spamw': 0.33714138226552404}];

var margin = {left: 50, top: 5};

var barWidth = 20,
    groupspace = 10,
    labelHeight = 50,
    chart_height = 400 + margin.top;
var chart_width = (1 * barWidth + groupspace) * weight_data.length + margin.left;

var y_scale = d3.scaleLinear()
    .range([chart_height, 0])
    .domain([0, 100]);

var y_axis = d3.axisLeft(y_scale);

var fmtNum = d3.format(".2f");

var chart = d3.select(".chart")
    .attr("width", chart_width)
    .attr("height", chart_height + labelHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var bars = chart.selectAll("g")
  .data(weight_data)
  .enter().append("g")
  .attr("transform", function(d, i) {
    return "translate(" + i * (barWidth * 1 + groupspace) + ", " + 0 + ")";
  });

bars.append("rect")
  .attr("class", "mail")
  .attr("width", barWidth - 1)
  .attr("y", function(d) { return y_scale(100 * d.spamw / d.mailw); })
  .attr("height", function(d) { return chart_height - y_scale(100 * d.spamw / d.mailw); })
  .on("mousemove",function(d, i) {
    var that = this;
    hoverGroup.attr("transform",function() {
      return "translate("+(i*(barWidth+groupspace)-(barWidth/2)+d3.mouse(that)[0])+
        ","+(y_scale(100 * d.spamw / d.mailw))+")";
    });
  })
  .on("mouseout",function(d, i) {
    d3.select(this)
    .classed("active", false);
    hoverGroup.style("visibility","hidden");
  })
  .on("mouseover",function(d, i) {
    d3.select(this)
    .classed("active", true);
    hoverText.text(fmtNum(100 * d.spamw / d.mailw) + "%");
    hoverGroup.style("visibility","visible");
  });
bars.append("text")
  .attr("class", "label")
  .attr("y", chart_height + labelHeight/5)
  .attr("x", (barWidth / 2)-5)
  .attr("dy", ".35em")
  .text(function(d) { return d.date; });

var hoverGroup = chart.append("g").style("visibility","hidden");

hoverGroup.append("rect")
.attr("x",0)
.attr("y",0)
.attr("width", barWidth+30)
.attr("height", barWidth+30)
.attr("fill","rgb(100,100,100)");

var hoverText = hoverGroup
  .append("text")
  .attr("class", "hoverText")
  .attr("x",(barWidth/2)-5)
  .attr("y",5 + (barWidth+30)/2);

chart.append("g")
  .attr("transform", function(d) {
    return "translate("+ -5 + "," + 0 + ")"; })
  .call(y_axis);

// text label for the x axis
chart.append("text")
  .attr("class", "axisLabel")
  .attr("transform",
        "translate(" + (chart_width/2) + " ," +
                       (chart_height + (labelHeight - labelHeight/3) + margin.top) + ")")
  .style("text-anchor", "middle")
  .text("Day");

chart.append("text")
  .attr("class", "axisLabel")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x",0 - (chart_height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Percent");


var h_line = d3.select(".chart")
  .append("g")
   //.attr("transform", "translate(0, "+y_scale(y_pos)+")")
  .append("line")
  .attr("x2", chart_width)
  .style("stroke", "#2ecc71")
  .style("stroke-width", "5px")
  .style("visibility","hidden");

chart
  .on("mousemove",function(d, i) {
    var that = this;
    h_line.attr("transform",function() {
      return "translate(0,"+ d3.mouse(that)[1] +")";
    });
  })
  .on("mouseout",function(d, i) {
    // Remove the line
    //hoverGroup.style("visibility","hidden");
    h_line.style("visibility","hidden");
  })
  .on("mouseover",function(d, i) {
    h_line.style("visibility","visible");
  });

