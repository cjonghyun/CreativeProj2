/*jquery.js*/
var APIKEY = "5ada51d453098152d4a449d329ff2679";//When we get one
var stock_data = [];
var stock_labels = [];
var stock_symbol = "";
var old_chart=null;
function createHistory(symbol="TSLA"){
	//var symbol = "TSLA";//TSLA, GOOGL, AMZN
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
        stock_symbol = symbol;
        history(data);
        
        drawHistoryChart();
        
	    }
	  });
}

function createChart(){
//Chart shows the high a particular company (see &symbols in the url) had during the day
    var blue = '#0000ff'; var light_blue = '#32aaff'; var dark_blue = '#030072';
	var urlQuote ='http://marketdata.websol.barchart.com/getQuote.jsonp?apikey='+APIKEY+'&symbols=TSLA,GOOGL,AMZN';
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
    
    $("#stockId").keyup(function(event){
        if(event.keyCode == 13){
            $("#buttonSubmit").click();
        }    
    }    
  )
    
  });

function searchStock(){
    var stockInput = $("#stockId");
    
    createHistory(stockInput.val()); 
}
//This is for creating the history

function drawHistoryChart(){
    if(old_chart != null){
        old_chart.labels = stock_labels;
        old_chart.data.datasets[0].data = stock_data;
        old_chart.data.datasets[0].label = stock_symbol;
        old_chart.update();
    }
    else{
        var chart = new Chart(document.getElementById("historyChart"), {
            type: 'bar',
            showTooltips: false,
            data: {
            labels: stock_labels,
            datasets: [{             
                data: stock_data,
                label: stock_symbol,
                borderColor: "#3e95cd",
                fill: false
                }
            ]
            },
            options: {
            title: {
                display: true,
                text: 'Stock Price'
            }
            }
        });
        old_chart = chart;
    }
}

//Parse the data for the chart
//Quote parsing data
function history(data){
    var close = []
    var tradingDay = []
    if(data.results == null){
        stock_symbol ="Wrong Symbol";
        stock_data = [];
        stock_labels = [];
        return;
    }
    var bound = data.results.length;    
	//Want only a few values from the set of 253
    bound = bound / 23; 	
    var i = 0;
    for(j = 0; j < bound; j++){    
        close.push(data.results[j].close)
        tradingDay.push(data.results[j].tradingDay)
        i += 23;
        if(i > data.results.length)
            break;
        //quoteChart.data.datasets.data.push(data.results[j].high);
        //quoteChart.data.labels.push(data.results[j].tradingDay);
    }
    console.log(close);
    console.log(tradingDay);
    stock_data = close;
    stock_labels = tradingDay;    
};


