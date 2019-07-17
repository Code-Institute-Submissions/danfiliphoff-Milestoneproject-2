/*steg: 
1. skapa HTML.
2. skapa function
3.lägg till function under make graph*/

/*väntar med att skapa graf tills data är laddat*/
queue()
    .defer(d3.csv, "data/total.cost.csv")
    .await(makeGraphs);
    
function makeGraphs(error, totalCost){
   var ndx=crossfilter(totalCost);
   makePie(ndx);
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