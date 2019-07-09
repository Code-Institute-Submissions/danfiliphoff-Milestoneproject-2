/*väntar med att skapa graf tills data är laddat*/
queue()
    .defer(d3.csv, "data/payroll.data.csv")
    .await(makeGraphs);
    
/*skapar graf och hämtar data*/
function makeGraphs(error, payrollData) {
    var ndx = crossfilter(payrollData);
    var type_dim = ndx.dimension(function(d) { return d["Type"]; });
    var total_cost_pie_chart = type_dim.group().reduceSum(dc.pluck('Sum'));
    
    /*for ( of )
    if
    else if
    else if*/
    
    dc.pieChart('#total-cost-pie-chart')
        .height(330)
        .radius(90)
        .transitionDuration(1500)
        .dimension(type_dim)
        .group(total_cost_pie_chart);
        
    dc.renderAll();

}