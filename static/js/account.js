/*steg: 
1. skapa HTML.
2. skapa function
3.lägg till function under make graph*/

/*väntar med att skapa graf tills data är laddat*/
queue()
    .defer(d3.csv, "data/account.csv")
    .await(makeAccountDataGraphs);
    

function makeAccountDataGraphs(error, account){
    
    /*var parseDate = d3.time.format("%Y-%m-%d").parse;
        account.forEach(function(d){
            d.PaymentDate = parseDate(d.PaymentDate);
        });*/

    
   var ndx=crossfilter(account);
   cost_per_account(ndx);
   cost_per_type(ndx);
   dc.renderAll();
}


function cost_per_account(ndx) {
    var cost_per_account_dim = ndx.dimension(dc.pluck("Account"));
    var cost_per_account_group = cost_per_account_dim.group().reduceSum(dc.pluck('Sum'));

    dc.pieChart('#cost-per-account')
        .height(1000)
        .radius(200)
        .innerRadius(100)
        .transitionDuration(1500)
        .dimension(cost_per_account_dim)
        .group(cost_per_account_group)
        .legend(dc.legend()
            .x(400)
            .y(10)
            .itemHeight(13)
            .gap(5)
            /*why is d.value inte integer? varför är det en string? konverterar
            legendText allt till strings? om jag komenterar ut legend text visat
            den ju alla konton*/
            .legendText(function(d) {return d.key + " " + d.value + " " + "KR (" 
            +  Math.round((d.value/(8129071/100))*100)/100 + "%)"})
            )
            
        .renderLabel(false);
}

/*ska visa kostnad för varje löneart*/
function cost_per_type(ndx){
    var cost_per_type_dimension = ndx.dimension(dc.pluck("Type"));
    var cost_per_type_group = cost_per_type_dimension.group().reduceSum(dc.pluck('Sum'));
    
    
     dc.barChart('#Cost-Per-Type')
            .width(1500)
            .height(800)
            .margins({top: 10, left: 80, right: 1, bottom: 50})
            .dimension(cost_per_type_dimension)
            .group(cost_per_type_group)
            .transitionDuration(500)
            .renderLabel(true)/*gets total label for whole bar*/
            .elasticX(true)
            .xAxisPadding(10)
            .gap(15)
            .centerBar(true)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .elasticY(true)
            .xAxisLabel("Gender")
            .yAxis().ticks(20);
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