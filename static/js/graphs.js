/*väntar med att skapa graf tills data är laddat*/
queue()
    .defer(d3.csv, "data/total.cost.csv")
    .await(makeGraphs);
    
/*skapar graf och hämtar data*/
function makeGraphs(error, totalCost) {
    var ndx = crossfilter(totalCost);
    var type_dim = ndx.dimension(function(d) { return d["Type"]; });
    var total_cost_pie_chart = type_dim.group().reduceSum(dc.pluck('Sum'));
    
    
    dc.pieChart('#total-cost-pie-chart')
        .height(500)
        .radius(450)
        .transitionDuration(1500)
        .dimension(type_dim)
        .group(total_cost_pie_chart);
        .label()
        
        
    dc.renderAll();

}