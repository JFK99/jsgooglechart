// jsgooglechart.js is a tiny helper to generate google charts<br/>
// It Requires [jQuery](http://jquery.com/)
// ###How to use it:###
//     myChart = new Stat(   
//                  urlToFetch (string), 
//                  params (string), 
//                  TypeOfChart (string), 
//                  locationToInjectTheChart (string));
//     myChart.fetch(); 

//####Example:
//#####Using Ajax call to get your data
//     comboChart = new Stat(   
//                  "api/mydata", 
//                  "start_date=10%2F02%2F2012&end_date=10%2F17%2F2012", 
//                  "ComboChart", 
//                  "conversions");
//     comboChart.fetch(); 

//#####Data generated in your template (See the demo)
//     comboChart = new Stat(   
//                  "", 
//                  "", 
//                  "PieChart", 
//                  "target");
//     piechart.drawVisualization(myData);

function Stat(url, postData, chartType, domTarget){
    this.url       = url;
    this.postData  = postData;
    this.chartType = chartType;
    this.domTarget = domTarget;
    return this;
}


Stat.prototype = {
    // Helper function to handle ajax call<br/>
    // Strongly inspired by [disqus / gargoyle](http://bit.ly/ROVSQ3)
    api: function (url, params, succ) {
        $.ajax({
            url: url,
            type: "POST",
            data: params,
            dataType: "json",
            success: function (resp) {
                if (resp.success) {
                    succ(resp);
                } else {
                    alert(resp.data);
                }
            },
            failure: function() {
                throw new Error("Internal Error.")

            }
        });
    },
    
    // 1. Fetch data from the server as JSON syntax, 
    // 2. Call `drawVisualization`
    fetch: function(){
        var _this = this;
        this.api(this.url, this.postData, function(JSONdata){
            _this.drawVisualization(JSONdata);
        }); 
    },
    
    // Draw the chart and inject into the dom location specified
    // at the instanciation time `domTarget`
    drawVisualization: function(JSONdata){
        var JSONObject = JSONdata.data.chart.data;
        var data       = new google.visualization.DataTable(JSONObject, 0.5);
        var chart      = new google.visualization[this.chartType](target);
        chart.draw(data, JSONdata.data.chart.options);
    },
    
}
// ### Example of expected JSON data
// <pre><code>
/*
{
   "data":{
      "chart":{
         "data":{
            "rows":[
               {
                  "c":[
                     {
                        "f":"No",
                        "v":"No"
                     },
                     {
                        "f":860,
                        "v":860
                     }
                  ]
               },
               {
                  "c":[
                     {
                        "f":"Yes",
                        "v":"Yes"
                     },
                     {
                        "f":4500,
                        "v":4500
                     }
                  ]
               }
            ],
            "cols":[
               {
                  "pattern":"",
                  "type":"string",
                  "id":"",
                  "label":"State"
               },
               {
                  "pattern":"",
                  "type":"string",
                  "id":"",
                  "label":"Count"
               }
            ]
         },
         "options":{
            "title":"Is Godzilla stronger than Biollante?",
            "width":"550",
            "height":"340",
            "backgroundColor":"transparent",
            "is3D":true,
            "legend":{
               "textStyle":{
                  "color":"gray",
                  "fontName":"Open Sans",
                  "fontSize":"14"
               },
               "position":"bottom"
            },
            "slices":[
               {
                  "color":"#d7d7d7"
               },
               {
                  "color":"#235e7c"
               },
               {
                  "color":"#2b2b3b"
               },
               {
                  "color":"#97a5bb"
               },
               {
                  "color":"#bfd8f5"
               }
            ],
            "animation":{
               "duration":"1000"
            },
            "titleTextStyle":{
               "color":"#8b948c",
               "fontName":"Open Sans",
               "fontSize":"20"
            },
            "tooltip":{
               "textStyle":{
                  "color":"gray"
               },
               "showColorCode":true
            }
         }
      }
   },
   "success":true
}
*/
//</code></pre>



