/*steg: 
1. skapa HTML.
2. skapa function
3.lägg till function under make graph*/

/*väntar med att skapa graf tills data är laddat*/
queue()
    .defer(d3.csv, "data/total.cost.csv")
    .await(makeGraphs);
    
function makeGraphs(error, totalCost){
    
    var dateFormatSpecifier = "%Y-%m-%d"; 
    var dateFormat = d3.time.format(dateFormatSpecifier); 
    var dateFormatParser = d3.timeParse(dateFormatSpecifier); 
    var numberFormat = d3.format('.2f'); 

    totalCost.forEach(function(d) { 
        d.Sum = parseInt(d.Sum, 10); /*intiger vs string*/ 
        d.dd = dateFormatParser(d.date); 
        d.month = d3.timeMonth(d.dd); 
        d.close = +d.close; 
        d.open = +d.open; 

    }); 

    console.log(dateFormatParser); 
    
   var ndx=crossfilter(totalCost);
   makePie(ndx);
   makeTotalLineGraph(ndx);
   dc.renderAll();
}
    
    
/*skapar graf och hämtar data*/
function makePie(ndx) {
    var type_dim = ndx.dimension(function(d) { return d["Type"]; });
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

function makeTotalLineGraph(ndx) {  
    var payment_date_dim = ndx.dimension(function(d) { return d["PaymentDate"]; });  
    var total_spend_per_date = payment_date_dim.group().reduceSum(dc.pluck('Sum'));  
  
    dc.TotalLineGraph('#total-cost-line-graph')  
        .width(1000)  
        .height(300)  
        .dimension(payment_date_dim)  
        .group(total_spend_per_date)  
        .transitionDuration(500)  
        .x(d3.time.scale().domain([minDate,maxDate]))  
        .xAxisLabel("Month")  
        .yAxis().ticks(4);  
}  