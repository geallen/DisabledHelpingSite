﻿function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var today = new Date();
var todayNow = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var todayStart = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " 00:00:00";
var table1 = $("#mailraportsTable").DataTable({
    destroy: true,
    columns: [
        { "width": "10%" },
            { "width": "12%" },
            { "width": "15%" },
            { "width": "15%" },
            { "width": "46%" },
            { "width": "2%" },
    ],
    dom: 'Bfrtip',
    buttons: [
 {
     extend: 'excelHtml5',
     filename: window.localization.MailExcel
 }],
    language: window.dataTables_language
});

$.ajax({
    type: "POST",
    url: "/Mail/ShowServers",
    dataType: "JSON"
})
.done(function (result) {
    document.getElementById('datetime1').value = todayStart;
    document.getElementById('datetime2').value = todayNow;
    var newSelect = document.createElement('select');
    var selectHTML = "";
    var choices = result.MessageList;
    for (i = 0; i < choices.length; i = i + 1) {
        var opEl = document.createElement("option");
        opEl.value = choices[i][0];

        opEl.textContent = choices[i][1];

        document.getElementById('menu1').appendChild(opEl);

    }
    $("#menu1").selectpicker("refresh");

   

    $("#raporGetirButton").click(function () {

        if ($("#datetime1").val() > $("#datetime2").val()) {
            var t1 = $("#datetime1").val();
            var t2 = $("#datetime2").val();
            var dialog = new BootstrapDialog({
                title: 'Hata',
               
                message: window.localization.date_error_message,
                buttons: [
                {
                    
                    label: window.localization.close_message,
                    action: function (dialogItself) {
                        dialogItself.close();
                    }
                }]
            });


            dialog.open();
        }
        else if ($("#datetime1").val() < $("#datetime2").val()) {
            $('#myModal').modal('show');


            if (parseInt($('#menu1 :selected').val()) === -1) {

                $.ajax({
                    type: "POST",
                    url: "/Mail/MailForAllServers",
                    data: {
                        date_begin: $("#datetime1").val(),
                        date_end: $("#datetime2").val(),
                        serverId: $('#menu1 :selected').val()

                    },
                    dataType: "JSON"
                })
          .done(function (result) {
              $('#myModal').modal('hide');
              var devices = result.MessageList;
              var tableRows = [];

              table1.clear().draw();
              var totalreceiverNumber2 = 0;

              for (var i = 0; i < devices.length; i++) {
                  var trEl = document.createElement("tr");
                  tdEl = document.createElement("td");
                  tdEl2 = document.createElement("td");
                  tdEl3 = document.createElement("td");
                  tdEl4 = document.createElement("td");
                  tdEl5 = document.createElement("td");
                  tdEl6 = document.createElement("td");
                  tdEl.textContent = moment.utc(devices[i][0]).add(moment().utcOffset(), "minute").format('DD-MM-YYYY HH:mm:ss');
                  tdEl2.textContent = devices[i][1];

                  var receiverNumber = 0;
                  var receiverNumber1 = 0;
                  var receiverNumber2 = 0;
                  var senders = devices[i][2];

                  receiverNumber = (((devices[i][2]).match(new RegExp(",", "g")) || []).length) + 1;
                  receiverNumber1 = receiverNumber1 + receiverNumber;
                  receiverNumber1 += (((devices[i][2]).match(new RegExp(";", "g")) || []).length);

                  if (senders.slice(-1) <= 'z' && senders.slice(-1) >= 'a') {
                      receiverNumber2 = receiverNumber1;
                  }
                  else {
                      receiverNumber2 = receiverNumber1 - 1;
                  }

                  devices[i][2] = devices[i][2].replace(/^[, ]+|[, ]+$|[, ]+/g, " ").trim();
                  var a = devices[i][2].replace(/^[, ]+|[, ]+$|[, ]+/g, " ").trim();
                  devices[i][2] = a.replace(/^[; ]+|[; ]+$|[; ]+/g, " ").trim();
                  tdEl3.textContent = devices[i][2];
                  tdEl4.textContent = devices[i][3];
                  tdEl5.textContent = devices[i][4];

                  tdEl6.textContent = devices[i][5];
                  totalreceiverNumber2 += devices[i][5];
                  trEl.appendChild(tdEl);
                  trEl.appendChild(tdEl2);
                  trEl.appendChild(tdEl3);
                  trEl.appendChild(tdEl4);
                  trEl.appendChild(tdEl5);
                  trEl.appendChild(tdEl6);
                  table1.row.add(trEl);
              }
              table1.draw();
              $("#mailraportsTable_filter span").empty();
              $("#mailraportsTable_filter").prepend("<span style='margin-left:200px; margin-right: 350px;'>" + window.localization.total_receiver_count + "" + totalreceiverNumber2 + "</span>");

          })
              .fail(function (a, b, c) {
               
              });

            } else {
                var serverID = $('#menu1 :selected').val();

                $.ajax({
                    type: "POST",
                    url: "/Mail/MailForAllServers",
                    data: {

                        date_begin: $("#datetime1").val(),
                        date_end: $("#datetime2").val(),
                        serverId: serverID
                    },
                    dataType: "JSON"
                })
       .done(function (result) {
           $('#myModal').modal('hide');
           var devices = result.MessageList;
           var tableRows = [];

           table1.clear().draw();
           var totalreceiverNumber3 = 0;

           for (var i = 0; i < devices.length; i++) {
               var trEl = document.createElement("tr"),
               tdEl = document.createElement("td"),
               tdEl2 = document.createElement("td"),
               tdEl3 = document.createElement("td");
               tdEl4 = document.createElement("td");
               tdEl5 = document.createElement("td");
               tdEl6 = document.createElement("td");
               tdEl.textContent = moment.utc(devices[i][0]).add(moment().utcOffset(), "minute").format('DD-MM-YYYY HH:mm:ss');
               tdEl2.textContent = devices[i][1];


               var receiverNumber = 0;
               var receiverNumber1 = 0;
               var receiverNumber2 = 0;
               var senders = devices[i][2];

               receiverNumber = (((devices[i][2]).match(new RegExp(",", "g")) || []).length) + 1;
               receiverNumber1 = receiverNumber1 + receiverNumber;
               receiverNumber1 += (((devices[i][2]).match(new RegExp(";", "g")) || []).length);

               if (senders.slice(-1) <= 'z' && senders.slice(-1) >= 'a') {
                   receiverNumber2 = receiverNumber1;
               }
               else {
                   receiverNumber2 = receiverNumber1 - 1;
               }

               devices[i][2] = devices[i][2].replace(/^[, ]+|[, ]+$|[, ]+/g, " ").trim();
               var a = devices[i][2].replace(/^[, ]+|[, ]+$|[, ]+/g, " ").trim();
               devices[i][2] = a.replace(/^[; ]+|[; ]+$|[; ]+/g, " ").trim();
               tdEl3.textContent = devices[i][2];
               tdEl4.textContent = devices[i][3];
               tdEl5.textContent = devices[i][4];

               tdEl6.textContent = devices[i][5];
               totalreceiverNumber3 += devices[i][5];
               trEl.appendChild(tdEl);
               trEl.appendChild(tdEl2);
               trEl.appendChild(tdEl3);
               trEl.appendChild(tdEl4);
               trEl.appendChild(tdEl5);
               trEl.appendChild(tdEl6);
               table1.row.add(trEl);
             
           }
           table1.draw();
        
           $("#mailraportsTable_filter span").empty();
           $("#mailraportsTable_filter").prepend("<span style='margin-left:200px; margin-right: 350px;'> " + window.localization.total_receiver_count + "" + totalreceiverNumber3 + "</span>");
          

       })
           .fail(function (a, b, c) {
              
           });

            }
        }
    });

})
.fail(function () {
   
});

