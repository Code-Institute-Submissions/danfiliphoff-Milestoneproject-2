/*steg: 
1. skapa HTML.
2. skapa function
3.lägg till function under make graph*/

/*väntar med att skapa graf tills data är laddat*/
queue()
    .defer(d3.csv, "data/total.cost.csv")
    .await(makeGraphs);
    
function makeGraphs(error, totalCost){
    
    var parseDate = d3.time.format("%Y-%m-%d").parse;
        totalCost.forEach(function(d){
            d.PaymentDate = parseDate(d.PaymentDate);
        });

    
   var ndx=crossfilter(totalCost);
   makePie(ndx);
   TotalLineGraph(ndx);
   StackedBarChartTotalCost(ndx);
   dc.renderAll();
}
    
    
/*skapar graf och hämtar data*/
function StackedBarChartTotalCost(ndx){
    var payment_date_dim = ndx.dimension(dc.pluck("PaymentDate"));
    
    var NettpayByMonth = payment_date_dim.group().reduceSum(function (d) {
            if (d.Type === 'Nettpay') {
                return +d.Sum;
            } else {
                return 0;
            }
        });
    
    var TaxesByMonth = payment_date_dim.group().reduceSum(function (d) {
            if (d.Type === 'Taxes') {
                return +d.Sum;
            } else {
                return 0;
            }
        });
        
    var SocialSecurityFeesByMonth = payment_date_dim.group().reduceSum(function (d) {
            if (d.Type === 'Social Security Fees') {
                return +d.Sum;
            } else {
                return 0;
            }
        });
    
  /*  var StackedBarChart = dc.barChart("#total-cost-stacked-bar-chart");*/
   
    dc.barChart('#total-cost-stacked-bar-chart')
            .width(500)
            .height(500)
            .dimension(payment_date_dim)
            .group(NettpayByMonth, "Nettpay")
            .stack(TaxesByMonth, "Taxes")
            .stack(SocialSecurityFeesByMonth, "Socia")
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .legend(dc.legend().x(420).y(0).itemHeight(15).gap(5));
        
    
}


function TotalLineGraph(ndx) {  
    var payment_date_dim = ndx.dimension(dc.pluck("PaymentDate"));  
    var total_spend_per_date = payment_date_dim.group().reduceSum(dc.pluck('Sum'));
    
    var minDate = payment_date_dim.bottom(1)[0].PaymentDate;
    var maxDate = payment_date_dim.top(1)[0].PaymentDate;
  
    dc.lineChart('#total-cost-line-graph')  
        .width(1000)  
        .height(300)  
        .margins({top: 10, right: 150, bottom: 30, left: 150})
        .dimension(payment_date_dim)  
        .group(total_spend_per_date)  
        .transitionDuration(500)  
        .x(d3.time.scale().domain([minDate,maxDate]))  
        .xAxisLabel("Month")  
        .yAxis().ticks(8);
}  



function makePie(ndx) {
    var type_dim = ndx.dimension(dc.pluck("Type"));
    var total_cost_pie_chart = type_dim.group().reduceSum(dc.pluck('Sum'));

    dc.pieChart('#total-cost-pie-chart')
        .height(1000)
        .radius(200)
        .innerRadius(100)
        .transitionDuration(1500)
        .dimension(type_dim)
        .group(total_cost_pie_chart)
        .externalLabels(50)
        /*8129071: har summerat ihopp för hand vill hitta kod som summerar ihopp åt mig. 
        *100)/100 i slutet av formeln är för att få med 2 decimal tecken i procenten
        */
        .label(function(d){return d.key + " " + d.value + " " + "KR (" +  Math.round((d.value/(8129071/100))*100)/100 + "%)"})
        .renderLabel(true);
}

