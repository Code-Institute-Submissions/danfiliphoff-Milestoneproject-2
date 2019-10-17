/**
Loads data from CSV file and calls the function makeTotalCostGraps
once the CSV is loaded.
*/
queue()
    .defer(d3.csv, "data/total_cost.csv")
    .await(makeTotalCostGraps);

/**
Parses dates and then calls the graph functions and renders them.
*/
function makeTotalCostGraps(error, totalCost){

    var parseDate = d3.time.format("%Y-%m-%d").parse;
        totalCost.forEach(function(d){
            d.PaymentDate = parseDate(d.PaymentDate);
        });

   var ndx=crossfilter(totalCost);
   makePie(ndx);
   CostPerSoldRoomLineGraph(ndx);
   StackedBarChartTotalCost(ndx);
   dc.renderAll();
   addKr();
}

/**
Adds "KR" to the end of graph value labels on Y-axis
*/
function addKr() {
    $(".total-cost-stacked-bar-chart svg g g .axis,.y .tick text").each(function() {
        let newtext = $( this ).text() + " KR";
        $( this ).text(newtext);
    })
}

/**
Function for Pie chart.
 */
function makePie(ndx) {
    var type_dim = ndx.dimension(dc.pluck("Type"));
    var total_cost_pie_chart = type_dim.group().reduceSum(dc.pluck('Sum'));

    dc.pieChart('.total-cost-pie-chart')
        .height(350)
        .width(500)
        .radius(210)
        .useViewBoxResizing(true)
        .innerRadius(150)
        .transitionDuration(1500)
        .dimension(type_dim)
        .group(total_cost_pie_chart)
        .legend(dc.legend()
            .x(107)
            .y(150)
            .itemHeight(13)
            .gap(9)
            .legendText(function(d){return d.name + " " + d.data + " " + "KR (" +  Math.round((d.data/(8129071/100))*100)/100 + "%)"}))
        .renderLabel(false)
        .ordinalColors(['#1f78b4', '#F88212', '#2EA122']);
}

/**
Function for cost per sold room chart
 */
 function CostPerSoldRoomLineGraph(ndx){
    var cost_per_sold_room_dimension = ndx.dimension(dc.pluck("PaymentDate"));
    var avarage_cost_per_sold_room_group = cost_per_sold_room_dimension().reduce(
        function (p, v){
            p.count++;
            p.total += v.Sum;
            p.avarage = p.total / p.count;
            return p;
        },

        function(p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            } else {
                p.total -= v.Sum;
                p.average = p.total / p.count;
            }
            return p;
        },

        function () {
            return { count: 0, total: 0, avarage: 0};
        }


    );

/**
    var minDate = cost_per_sold_room_dimension.bottom(1)[0].PaymentDate;
    var maxDate = cost_per_sold_room_dimension.top(1)[0].PaymentDate;

    dc.lineChart('.cost-per-sold-room')
        .width(1000)
        .height(500)
        .useViewBoxResizing(true)
        .margins({top: 10, right: 150, bottom: 55, left: 150})
        .dimension(cost_per_sold_room_dimension)
        .elasticY(true)
        .group(total_cost_group)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate,maxDate]))
        .yAxis().ticks(15);
*/
 }


/**
Function for stacked bar chart.
 */
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

    dc.barChart('.total-cost-stacked-bar-chart')
            .width(1500)
            .height(800)
            .useViewBoxResizing(true)
            .margins({top: 10, left: 95, right: 1, bottom: 50})
            .dimension(payment_date_dim_bar)
            .transitionDuration(500)
            .group(NettpayByMonth, "Nettpay")
            .stack(TaxesByMonth, "Taxes")
            .stack(SocialSecurityFeesByMonth, "Sociala")
            .renderLabel(true)
            .elasticX(true)
            .xAxisPadding(10)
            .gap(15)
            .centerBar(true)
            .x(d3.time.scale().domain([minDate,maxDate]))
            .xUnits(d3.time.months)
            .y(d3.scale.linear().domain([0, 850000]))
            .on('renderlet', function (chart) {
                chart.selectAll("g.x text")
                    .attr('transform', "translate(-24,0)");
                var gLabels = chart.select(".labels");
                if (gLabels.empty()){
                    gLabels = chart.select(".chart-body").append('g').classed('labels', true);
                }
                var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
                gLabelsData.exit().remove();
                gLabelsData.enter().append("text");
                gLabelsData
                .attr('text-anchor', 'middle')
                .attr('fill', 'black')
                .text(function(d){
                    text_object =  d3.select(d).datum().y
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