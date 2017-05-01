
window.onload = function () {
    $('#myModal').modal('show');
    var today = new Date();
    var todayNow = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var todayStart = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " 00:00:00";
    $.ajax({
        type: "POST",
        url: "/Mail/ShowServers",
        dataType: "JSON"
    })
    .done(function (result) {
        $.ajax({
            type: "POST",
            url: "/Home/Dashboard",
            data:{
                dayStart: todayStart,
                dayEnd: todayNow
            },
            dataType: "JSON"
        })
            .done(function (result) {
                $('#myModal').modal('hide');
                var reports = result.MessageList;
                document.getElementById("dailyMailCount").innerHTML = reports[0][0];
                document.getElementById("dailySmsCount").innerHTML = reports[0][1];
                var userTypeId = document.getElementById('hdnSession1').value;

                if (userTypeId == 1) {
                    document.getElementById("dailySmsAmount").innerHTML = parseFloat(Math.round(reports[0][2] * 100) / 100).toFixed(2);
                }
                else {
                    var smsAmount = document.getElementById("smsTutar");
                    smsAmount.style.display = 'none';
                }
            
            })
                .fail(function (a, b, c) {
                    $('#myModal').modal('hide');
                    alert("HATAAA!");
                })
    })
    .fail(function (a, b, c) {
        $('#myModal').modal('hide');
        alert("HATAAA!");
    })
    }
