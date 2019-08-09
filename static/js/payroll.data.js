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
   cost_per_account(ndx);
   dc.renderAll();
}
/*5031*/

function cost_per_account(ndx) {
   /* var cost_per_account_dim = ndx.dimension(dc.pluck("Account"));*/
    var cost_per_account_dim = ndx.dimension(function(d) {return d.Account > 0;});
    console.log(cost_per_account_dim);
    var cost_per_account_group = cost_per_account_dim.group().reduceSum(dc.pluck('Sum'));

    dc.pieChart('#cost-per-account')
        .height(1000)
        .radius(200)
        .innerRadius(100)
        .transitionDuration(1500)
        .dimension(cost_per_account_dim)
        .group(cost_per_account_group)
        .externalLabels(50)
        /*8129071: har summerat ihopp för hand vill hitta kod som summerar ihopp åt mig. 
        *100)/100 i slutet av formeln är för att få med 2 decimal tecken i procenten
        */
       /* .label(function(d){return d.key + " " + d.value + " " + "KR (" +  Math.round((d.value/(8129071/100))*100)/100 + "%)"})*/
        .renderLabel(true);
}



/*manipulera så den visar det jag vill
function GrossSalaryCostEffectivness(ndx) {  
    let payment_date_dim = ndx.dimension(dc.pluck("PaymentDate"));  
    add custom reducer?
   ( TOTAL -skatt-sociala-förmåner)/arbetade timmar
   jag behöver att koden hittar och adderar alla summor
   jag behöver att koden hittar och adderar alla arbetade timmar
   jag behöver att koden per månad delar summor/timmar
   
    
   

    let minDate = payment_date_dim.bottom(1)[0].PaymentDate;
    let maxDate = payment_date_dim.top(1)[0].PaymentDate;
  
    dc.barChart('#Gross-salary-cost-effectivness')  
        .width(1000)  
        .height(300)  
        .dimension(payment_date_dim)  
        .group(gross_salary_cost_effectivness)  
        .transitionDuration(500)  
        .x(d3.time.scale().domain([minDate,maxDate]))  
        .xAxisLabel("Month")  
        .yAxis().ticks(8);
}  */