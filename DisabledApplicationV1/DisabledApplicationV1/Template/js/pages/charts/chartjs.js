var config = null;
$(function () {
    
});

function chart() {
    new Chart(document.getElementById("bar_chart").getContext("2d"), config);
}

function getChartJs(type) {
    return $.ajax({
        type: "POST",
        url: "/Home/FillChart",
        dataType: "JSON"
    })
    .done(function (result) {
        var datas = result.MessageList;
        
        var ad = 0;
        var ad1 = 0;
        var ad2 = 0;
        //console.log(datas)
        var ab1 = [];
        var ab2 = [];
        var dates = [];
        var totalSmsAmount = [];
        //ad = moment.utc(datas[0]).add(moment().utcOffset(), "minute").format('DD-MM-YYYY');
        for (var i = 0; i < datas.length; i++) {
            dates.push(moment.utc(datas[i][0]).add(moment().utcOffset(), "minute").format('DD-MM-YYYY'));
            ab1.push(datas[i][1]);
       //     console.log(moment.utc(datas[i][0]).add(1, 'days').format('DD-MM-YYYY'));
            ab2.push(datas[i][2]);
            totalSmsAmount.push(datas[i][3].toFixed(2));
            
        }
        dates.push("");
        ab1.push(0);
        ab2.push(0);

       
        
        if (type === 'bar') {

            config = {
                type: 'bar',
                data: {
                    labels: dates,
                    datasets: [{
                        label: window.localization.labelMail,
                        data: ab1,
                        backgroundColor: 'rgba(0, 188, 212, 0.8)'
                    }, {
                        label: window.localization.labelSms,
                        data: ab2,
                        backgroundColor: 'rgba(233, 30, 99, 0.8)'
                    },
                    {
                        label: window.localization.labelSmsAmount,
                        data: totalSmsAmount,
                        backgroundColor: 'rgba(30,233,164)'
                    }]
                },
                options: {
                    responsive: true,
                    legend: false
                }
            }

        
        }
        
    })
.fail(function (a, b, c) {
    //  alert("HATAAA!");
    return config;
})
    //  return config;
}

$.when(getChartJs('bar')).then(function () {
    return chart();
})