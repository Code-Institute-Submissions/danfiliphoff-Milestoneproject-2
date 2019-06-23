queue()
    .defer(d3.csv, "data/payroll.data.csv")
    .await(makeGraphs);
    
function makeGraphs(error, payrollData) {

}