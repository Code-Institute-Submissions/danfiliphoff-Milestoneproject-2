queue()
    .defer(d3.csv, "data/payroll.data.csv")
    .await(makeGraphs);
    
function makeGraphs(error, payrollData) {
    var ndx = crossfilter(payrollData);
    
    var name_dim = ndx.dimension(dc.pluck('Type'));
    var total_cost_pie_chart =name_dim.group().reduceSum(dc.pluck('Sum'));
    
    dc.pieChart('#total-cost-pie-chart')
        .height(330)
        .radius(90)
        .transitionDuration(1500)
        .dimension(name_dim)
        .group(total_cost_pie_chart);
        
    dc.renderAll();

}