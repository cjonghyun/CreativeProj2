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
	      console.log(data);
		$("#progress_history").slideUp();
		history(data);
	    }
	  });
}

function createChart(){
//Chart shows the high a particular company (see &symbols in the url) had during the day
        var blue = '#0000ff'; var light_blue = '#32aaff'; var dark_blue = '#030072';
	var urlQuote ='http://marketdata.websol.barchart.com/getQuote.jsonp?apikey='+APIKEY+'&symbols=TSLA,GOOGL,AMZN'
        $.ajax({
	    url : urlQuote,
	    crossDomain: true,
	    dataType : "jsonp",
	    cache: false,
            async: true,
	    success : function(data) {
	      console.log(data);
		$("#progress_quote").slideUp();
                initialArray = new Array("Company Names")
                initialArray.push("high")
                initialArray.push({role: 'style'})
                var o = [initialArray];
                for(i = 0; i < data.results.length; i++){
			if(i < data.results.length){
                        n = new Array(data.results[i].name)
                        n.push(data.results[i].high)
                        n.push(light_blue)
                        o.push(n)
			}
                }
	
                var dataChart = new google.visualization.arrayToDataTable(o);
                var options = {
                        title: "Stock Quotes",
                        legend: { position: "none" },
                        hAxis: {
                          title: 'Company name'
                        },
                        bars: 'vertical'
                };
                var view = new google.visualization.DataView(dataChart);
                var chart = new google.charts.Bar(document.getElementById('quote_bar'));
                chart.draw(dataChart, options, view);
		}
        });
}


$(document).ready(function(){
	google.charts.load('current', {'packages':[ 'bar']});
    	google.charts.setOnLoadCallback(createChart);
	createHistory();
  });
//This is for creating the history
Chart.defaults.global.responsive = true;
var historyChart = new Chart($("#historyChart"), {
	responsive: true,
        type: "line",
        data: {
            labels: ["null","null"],
            datasets: [{
                data: [1,2,3],
		label: 'data',
		backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor:'rgba(255,99,132,1)',
                borderWidth: 1 
            }]
        },
	options: {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero:true
                    }
                }],
                xAxes:[{
                    display: true,
                    ticks: {
                        type: 'linear',
                        max: 0,
                        min: 0
                    }
                }]
            }
        }
    });

//Parse the data for the chart
//Quote parsing data
function history(data){
    var close = []
    var tradingDay = []
    var bound = data.results.length;
	//Want only a few values from the set of 253
    bound = bound / 23; 	
        for(j = 0; j < bound; j++){
	    var i = 0;
            close.push(data.results[i].close)
            tradingDay.push(data.results[i].tradingDay)
	    i += 23;
            //quoteChart.data.datasets.data.push(data.results[j].high);
            //quoteChart.data.labels.push(data.results[j].tradingDay);
        }
            historyChart.data.datasets[0].data = close;
            historyChart.data.labels = tradingDay;
    	    historyChart.update();
};


