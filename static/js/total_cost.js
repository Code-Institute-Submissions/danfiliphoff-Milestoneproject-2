queue()
    .defer(d3.csv, "data/total_cost.csv")
    .await(makeTotalCostGraps);
    
function makeTotalCostGraps(error, totalCost){
    
    var parseDate = d3.time.format("%Y-%m-%d").parse;
        totalCost.forEach(function(d){
            d.PaymentDate = parseDate(d.PaymentDate);
        });

    
   var ndx=crossfilter(totalCost);
   makePie(ndx);
   StackedBarChartTotalCost(ndx);
   dc.renderAll();
}
    


function StackedBarChartTotalCost(ndx){
    var payment_date_dim_bar = ndx.dimension(dc.pluck("PaymentDate"));
    var minDate = payment_date_dim_bar.bottom(1)[0].PaymentDate;
    var maxDate = payment_date_dim_bar.top(1)[0].PaymentDate;
    var NettpayByMonth = payment_date_dim_bar.group().reduceSum(function (d) {
            if (d.Type === 'Nettpay') {
                return +d.Sum;
            } else {
                return 0;
            }
        });
    
    var TaxesByMonth = payment_date_dim_bar.group().reduceSum(function (d) {
            if (d.Type === 'Taxes') {
                return +d.Sum;
            } else {
                return 0;
            }
        });
        
    var SocialSecurityFeesByMonth = payment_date_dim_bar.group().reduceSum(function (d) {
            if (d.Type === 'Social Security Fees') {
                return +d.Sum;
            } else {
                return 0;
            }
        });
   
    dc.barChart('#total-cost-stacked-bar-chart')
            .width(1500)
            .height(800)
            .margins({top: 10, left: 80, right: 1, bottom: 50})
            .dimension(payment_date_dim_bar)
            .group(NettpayByMonth, "Nettpay")
            .stack(TaxesByMonth, "Taxes")
            .stack(SocialSecurityFeesByMonth, "Sociala")
            .renderLabel(true)/*gets total label for whole bar*/
            .elasticX(true)
            .xAxisPadding(10)
            .gap(15)
            .centerBar(true)
            .x(d3.time.scale().domain([minDate,maxDate]))
            .xUnits(d3.time.months)
           /* .barPadding(0.3)/*adjusts with of each bar*/
            .on('renderlet', function (chart) {
                //Check if labels exist
                var gLabels = chart.select(".labels");
                if (gLabels.empty()){
                    gLabels = chart.select(".chart-body").append('g').classed('labels', true);
                }
            
                var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
                gLabelsData.exit().remove(); //Remove unused elements
                gLabelsData.enter().append("text"); //Add new elements
                gLabelsData
                .attr('text-anchor', 'middle')
                .attr('fill', 'black')
                .text(function(d){
                    text_object =  d3.select(d).datum().y
                    console.log(text_object)
                    return text_object
                })
                .attr('x', function(d){ 
                    return +d.getAttribute('x') + (d.getAttribute('width')/2); 
                })
                .attr('y', function(d){ return +d.getAttribute('y') + 15; })
                .attr('style', function(d){
                    if (+d.getAttribute('height') < 18) return "display:none";
                });
            
            });
}




function makePie(ndx) {
    var type_dim = ndx.dimension(dc.pluck("Type"));
    var total_cost_pie_chart = type_dim.group().reduceSum(dc.pluck('Sum'));
    

    dc.pieChart('#total-cost-pie-chart')
        .legend(dc.legend().x(400).y(10).itemHeight(13).gap(5))
        .height(1000)
        .radius(200)
        .innerRadius(100)
        .transitionDuration(1500)
        .dimension(type_dim)
        .group(total_cost_pie_chart)
        .legend(dc.legend()
            .x(140)
            .y(180)
            .itemHeight(13)
            .gap(9)
            .legendText(function(d){return d.name + " " + d.data + " " + "KR (" +  Math.round((d.data/(8129071/100))*100)/100 + "%)"}))
        .renderLabel(false)
        .ordinalColors(['#1f78b4', '#F88212', '#2EA122']);
}

