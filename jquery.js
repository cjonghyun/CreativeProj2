/*jquery.js*/
var APIKEY = "5ada51d453098152d4a449d329ff2679";//When we get one

function createHistory(){
	var symbol = "TSLA";//TSLA, GOOGL, AMZN
	var startDate = "20161004000000"
	var type = "daily";
	var urlHistory ='http://marketdata.websol.barchart.com/getHistory.jsonp?apikey='+APIKEY+'&symbol='+symbol+'&type='+type+'&startDate='+startDate
	$.ajax({
	    url : urlHistory,
	    crossDomain: true,
	    dataType : "jsonp",
	    success : function(data) {
		$("#progress_history").slideUp();
		//history(data);
	      console.log(data);
	    }
	  });
}

function createQuote(){
	var urlQuote ='http://marketdata.websol.barchart.com/getQuote.jsonp?apikey='+APIKEY+'&symbols=TSLA,GOOGL,AMZN'
	$.ajax({
	    url : urlQuote,
	    crossDomain: true,
	    dataType : "jsonp",
	    success : function(data) {
		$("#progress_quote").slideUp();
		quote(data);
	      console.log(data);
	    }
	  });

}

$(document).ready(function(){
	createQuote();
  });

//Build the Quote chart
var quoteChart = new Chart($("#quoteChart"), {
        type: "bar",
        data: {
               labels: ["TSLA","GOOGL","AMZN"],
            datasets: [{
		labe: 'data',
                data: [],
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

//Parse the data for the chart
//Quote parsing data
var quote = function(data){
    var high = []
    var name = []
        for(j = 0; j < data.results.length; j++){
            high.push(data.results[j].high)
            name.push(data.results[j].name)
            quoteChart.data.datasets.data.push(data.results[j].high);
            quoteChart.data.labels.push(data.results[j].name);
        }
    	    quoteChart.update();
};

