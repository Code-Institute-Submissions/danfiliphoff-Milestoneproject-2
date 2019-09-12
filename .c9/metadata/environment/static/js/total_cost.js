{"filter":false,"title":"total_cost.js","tooltip":"/static/js/total_cost.js","undoManager":{"mark":33,"position":33,"stack":[[{"start":{"row":0,"column":0},"end":{"row":5,"column":50},"action":"remove","lines":["/*steg: ","1. skapa HTML.","2. skapa function","3.lägg till function under make graph*/","","/*väntar med att skapa graf tills data är laddat*/"],"id":2}],[{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"remove","lines":["",""],"id":3}],[{"start":{"row":26,"column":12},"end":{"row":26,"column":16},"action":"remove","lines":["    "],"id":4}],[{"start":{"row":26,"column":12},"end":{"row":26,"column":13},"action":"insert","lines":[" "],"id":5},{"start":{"row":26,"column":13},"end":{"row":26,"column":14},"action":"insert","lines":[" "]},{"start":{"row":26,"column":14},"end":{"row":26,"column":15},"action":"insert","lines":[" "]}],[{"start":{"row":26,"column":15},"end":{"row":26,"column":16},"action":"insert","lines":[" "],"id":6}],[{"start":{"row":17,"column":0},"end":{"row":17,"column":4},"action":"remove","lines":["    "],"id":7}],[{"start":{"row":17,"column":0},"end":{"row":18,"column":0},"action":"insert","lines":["",""],"id":8},{"start":{"row":18,"column":0},"end":{"row":19,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":19,"column":0},"end":{"row":27,"column":1},"action":"insert","lines":["const heightValue = 300;","const widthValue = 600;","","// Create SVG and padding for the chart","const svg = d3","  .select(\"#chart\")","  .append(\"svg\")","  .attr(\"viewBox\", `0 0 ${widthValue} ${heightValue}`)",";"],"id":9}],[{"start":{"row":24,"column":16},"end":{"row":24,"column":17},"action":"remove","lines":["t"],"id":10},{"start":{"row":24,"column":15},"end":{"row":24,"column":16},"action":"remove","lines":["r"]},{"start":{"row":24,"column":14},"end":{"row":24,"column":15},"action":"remove","lines":["a"]},{"start":{"row":24,"column":13},"end":{"row":24,"column":14},"action":"remove","lines":["h"]},{"start":{"row":24,"column":12},"end":{"row":24,"column":13},"action":"remove","lines":["c"]},{"start":{"row":24,"column":11},"end":{"row":24,"column":12},"action":"remove","lines":["#"]}],[{"start":{"row":24,"column":11},"end":{"row":24,"column":40},"action":"insert","lines":["#total-cost-stacked-bar-chart"],"id":11}],[{"start":{"row":59,"column":0},"end":{"row":60,"column":24},"action":"remove","lines":["            .width(1500)","            .height(800)"],"id":12},{"start":{"row":58,"column":48},"end":{"row":59,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":65,"column":27},"end":{"row":66,"column":0},"action":"insert","lines":["",""],"id":13},{"start":{"row":66,"column":0},"end":{"row":66,"column":12},"action":"insert","lines":["            "]}],[{"start":{"row":66,"column":12},"end":{"row":66,"column":27},"action":"insert","lines":[".elasticX(true)"],"id":14}],[{"start":{"row":66,"column":20},"end":{"row":66,"column":21},"action":"remove","lines":["X"],"id":15}],[{"start":{"row":66,"column":20},"end":{"row":66,"column":21},"action":"insert","lines":["Y"],"id":16}],[{"start":{"row":72,"column":13},"end":{"row":72,"column":14},"action":"remove","lines":[" "],"id":17},{"start":{"row":72,"column":12},"end":{"row":72,"column":13},"action":"remove","lines":["*"]},{"start":{"row":72,"column":11},"end":{"row":72,"column":12},"action":"remove","lines":["/"]}],[{"start":{"row":72,"column":11},"end":{"row":72,"column":12},"action":"insert","lines":[" "],"id":18}],[{"start":{"row":19,"column":22},"end":{"row":19,"column":23},"action":"remove","lines":["0"],"id":19},{"start":{"row":19,"column":21},"end":{"row":19,"column":22},"action":"remove","lines":["0"]},{"start":{"row":19,"column":20},"end":{"row":19,"column":21},"action":"remove","lines":["3"]}],[{"start":{"row":19,"column":20},"end":{"row":19,"column":21},"action":"insert","lines":["1"],"id":20},{"start":{"row":19,"column":21},"end":{"row":19,"column":22},"action":"insert","lines":["5"]},{"start":{"row":19,"column":22},"end":{"row":19,"column":23},"action":"insert","lines":["0"]},{"start":{"row":19,"column":23},"end":{"row":19,"column":24},"action":"insert","lines":["0"]}],[{"start":{"row":20,"column":19},"end":{"row":20,"column":20},"action":"remove","lines":["6"],"id":21}],[{"start":{"row":20,"column":19},"end":{"row":20,"column":20},"action":"insert","lines":["8"],"id":22}],[{"start":{"row":66,"column":26},"end":{"row":66,"column":27},"action":"remove","lines":[")"],"id":23},{"start":{"row":66,"column":25},"end":{"row":66,"column":26},"action":"remove","lines":["e"]},{"start":{"row":66,"column":24},"end":{"row":66,"column":25},"action":"remove","lines":["u"]},{"start":{"row":66,"column":23},"end":{"row":66,"column":24},"action":"remove","lines":["r"]},{"start":{"row":66,"column":22},"end":{"row":66,"column":23},"action":"remove","lines":["t"]},{"start":{"row":66,"column":21},"end":{"row":66,"column":22},"action":"remove","lines":["("]},{"start":{"row":66,"column":20},"end":{"row":66,"column":21},"action":"remove","lines":["Y"]},{"start":{"row":66,"column":19},"end":{"row":66,"column":20},"action":"remove","lines":["c"]},{"start":{"row":66,"column":18},"end":{"row":66,"column":19},"action":"remove","lines":["i"]},{"start":{"row":66,"column":17},"end":{"row":66,"column":18},"action":"remove","lines":["t"]},{"start":{"row":66,"column":16},"end":{"row":66,"column":17},"action":"remove","lines":["s"]},{"start":{"row":66,"column":15},"end":{"row":66,"column":16},"action":"remove","lines":["a"]},{"start":{"row":66,"column":14},"end":{"row":66,"column":15},"action":"remove","lines":["l"]}],[{"start":{"row":66,"column":13},"end":{"row":66,"column":14},"action":"remove","lines":["e"],"id":24},{"start":{"row":66,"column":12},"end":{"row":66,"column":13},"action":"remove","lines":["."]},{"start":{"row":66,"column":8},"end":{"row":66,"column":12},"action":"remove","lines":["    "]},{"start":{"row":66,"column":4},"end":{"row":66,"column":8},"action":"remove","lines":["    "]},{"start":{"row":66,"column":0},"end":{"row":66,"column":4},"action":"remove","lines":["    "]},{"start":{"row":65,"column":27},"end":{"row":66,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":17,"column":0},"end":{"row":27,"column":1},"action":"remove","lines":["","","const heightValue = 1500;","const widthValue = 800;","","// Create SVG and padding for the chart","const svg = d3","  .select(\"#total-cost-stacked-bar-chart\")","  .append(\"svg\")","  .attr(\"viewBox\", `0 0 ${widthValue} ${heightValue}`)",";"],"id":25,"ignore":true},{"start":{"row":17,"column":0},"end":{"row":17,"column":4},"action":"insert","lines":["    "]},{"start":{"row":49,"column":0},"end":{"row":51,"column":0},"action":"insert","lines":["            .width(1500)","            .height(800)",""]},{"start":{"row":63,"column":11},"end":{"row":63,"column":13},"action":"insert","lines":["/*"]}],[{"start":{"row":16,"column":1},"end":{"row":17,"column":0},"action":"insert","lines":["",""],"id":26},{"start":{"row":17,"column":0},"end":{"row":18,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":18,"column":0},"end":{"row":27,"column":0},"action":"insert","lines":["const heightValue = 1500;","const widthValue = 800;","","// Create SVG and padding for the chart","const svg = d3","  .select(\"#total-cost-stacked-bar-chart\")","  .append(\"svg\")","  .attr(\"viewBox\", `0 0 ${widthValue} ${heightValue}`)",";",""],"id":27}],[{"start":{"row":60,"column":0},"end":{"row":61,"column":24},"action":"remove","lines":["            .width(1500)","            .height(800)"],"id":28},{"start":{"row":59,"column":48},"end":{"row":60,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":19,"column":21},"end":{"row":19,"column":22},"action":"remove","lines":["0"],"id":29},{"start":{"row":19,"column":20},"end":{"row":19,"column":21},"action":"remove","lines":["0"]},{"start":{"row":19,"column":19},"end":{"row":19,"column":20},"action":"remove","lines":["8"]}],[{"start":{"row":19,"column":19},"end":{"row":19,"column":20},"action":"insert","lines":["1"],"id":30},{"start":{"row":19,"column":20},"end":{"row":19,"column":21},"action":"insert","lines":["0"]},{"start":{"row":19,"column":21},"end":{"row":19,"column":22},"action":"insert","lines":["0"]},{"start":{"row":19,"column":22},"end":{"row":19,"column":23},"action":"insert","lines":["0"]}],[{"start":{"row":17,"column":0},"end":{"row":28,"column":0},"action":"remove","lines":["","const heightValue = 1500;","const widthValue = 1000;","","// Create SVG and padding for the chart","const svg = d3","  .select(\"#total-cost-stacked-bar-chart\")","  .append(\"svg\")","  .attr(\"viewBox\", `0 0 ${widthValue} ${heightValue}`)",";","",""],"id":31,"ignore":true},{"start":{"row":49,"column":0},"end":{"row":51,"column":0},"action":"insert","lines":["            .width(1500)","            .height(800)",""]}],[{"start":{"row":50,"column":24},"end":{"row":51,"column":0},"action":"insert","lines":["",""],"id":32},{"start":{"row":51,"column":0},"end":{"row":51,"column":12},"action":"insert","lines":["            "]},{"start":{"row":51,"column":12},"end":{"row":51,"column":13},"action":"insert","lines":["."]}],[{"start":{"row":51,"column":13},"end":{"row":51,"column":31},"action":"insert","lines":["useViewBoxResizing"],"id":33}],[{"start":{"row":51,"column":31},"end":{"row":51,"column":33},"action":"insert","lines":["()"],"id":34}],[{"start":{"row":51,"column":32},"end":{"row":51,"column":33},"action":"insert","lines":["t"],"id":35},{"start":{"row":51,"column":33},"end":{"row":51,"column":34},"action":"insert","lines":["r"]},{"start":{"row":51,"column":34},"end":{"row":51,"column":35},"action":"insert","lines":["u"]},{"start":{"row":51,"column":35},"end":{"row":51,"column":36},"action":"insert","lines":["e"]}]]},"ace":{"folds":[],"scrolltop":510,"scrollleft":0,"selection":{"start":{"row":51,"column":37},"end":{"row":51,"column":37},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":37,"state":"no_regex","mode":"ace/mode/javascript"}},"timestamp":1568289228200,"hash":"ddc535159a1d1c2110042f98867ac032287f12db"}