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
	//	$("#progress_history").slideUp();
		//history(data);
	      console.log(data);
	    }
	  });
}
function createChart(){

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
	console.log(n)
	console.log(o)
	
                var dataChart = new google.visualization.arrayToDataTable(o);
	
	console.log(dataChart)
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
  });

//Build the Quote chart


