/*steg: 
1. skapa HTML.
2. skapa function
3.lägg till function under make graph*/

/*väntar med att skapa graf tills data är laddat*/
queue()
    .defer(d3.csv, "data/payroll.data.csv")
    .await(makePayrollDataGraphs);

function makePayrollDataGraphs(error, payrollData){
    
    var parseDate = d3.time.format("%Y-%m-%d").parse;
        payrollData.forEach(function(d){
            d.PaymentDate = parseDate(d.PaymentDate);
        });

    
   var ndx=crossfilter(payrollData);
   GrossSalaryCostEffectivness(ndx);
   dc.renderAll();
}

/*manipulera så den visar det jag vill*/
function GrossSalaryCostEffectivness(ndx) {  
    let payment_date_dim = ndx.dimension(dc.pluck("PaymentDate"));  
    let total_spend_per_date = payment_date_dim.group().reduceSum(dc.pluck('Sum'));
    
    let minDate = payment_date_dim.bottom(1)[0].PaymentDate;
    let maxDate = payment_date_dim.top(1)[0].PaymentDate;
  
    dc.lineChart('#Gross-salary-cost-effectivness')  
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