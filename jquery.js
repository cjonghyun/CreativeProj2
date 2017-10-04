/*jquery.js*/
var APIKEY = "5ada51d453098152d4a449d329ff2679";//When we get one
$(document).ready(function(){
var symbol = "TSLA";//TSLA, GOOGL, AMZN
var type = "daily";
var startDate = "20161004000000"
//Place JQ here
var urlHistory ='http://marketdata.websol.barchart.com/getHistory.jsonp?apikey='+APIKEY+'&symbol='+symbol+'&type='+type+'&startDate='+startDate
var urlQuote ='http://marketdata.websol.barchart.com/getQuote.jsonp?apikey='+APIKEY+'&symbols=TSLA,GOOGL,AMZN'
$.ajax({
    url : urlQuote,
    crossDomain: true,
    dataType : "jsonp",
    success : function(data) {
	$("#progress_quote").slideUp();
      console.log(data);
    }
  });
  });
var quoteChart = new Chart($("#quoteChart"), {
        type: "bar",
        data: {
	    labels: [],
            datasets: [{
                data: [],
                labels: ["TSLA","GOOGL","AMZN"],
                backgroundColor:[ 
                    "rgba(255, 99, 132, .5)",
                    "rgba(0,255,0, .5)",
                    "rgba(0,0,255, .5)",
                ],
                borderColor:[
                    "rgba(255, 99, 132, 1)",
                    "rgba(0,255,0, 1)",
                    "rgba(0,0,255, 1)",
                ], 
                borderWidth: 1 
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero:true
                    }
                }],
                xAxes:[{
                    display: true
                }]
            }
        }
    });
var quote = function(data){
    var high = []
    var name = []
        for(j = 0; j < data.results.length; j++){
            high.push(data.results[i].high)
            name.push(data.results[i].name)
        }
        quoteChart.data.datasets.data = high;
    //quoteChart.data.labels = name;
    quoteChart.update();
};

