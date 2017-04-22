var $now = moment();
var today = new Date();
var todayNow = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var todayStart = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " 00:00:00";

var table1 = $("#mailraportSumTable").DataTable({
  destroy: true,
  columns: [
    { "width": "50%" },
    { "width": "25%" },
    { "width": "25%" },

  ],
  dom: 'Bfrtip',
  buttons: [
 {
     extend: 'excelHtml5',
     filename: window.localization.MailSumExcel
 }
  ],
  language: window.dataTables_language
});
$.ajax({
    type: "POST",
    url: "/Mail/ShowSumMailReportsForAllServers",
    data: {
        serverId: -1,
        date_begin: todayStart,
        date_end: todayNow
    },
    dataType: "JSON"
})
    .done(function (result) {
        $('#myModal').modal('hide');
        document.getElementById('datetime1').value = todayStart;
        document.getElementById('datetime2').value = todayNow;

        var reports = result.MessageList;
        var tableRows = [];
       
        table1.clear().draw();
        for (var i = 0; i < reports.length; i++) {
            var trEl = document.createElement("tr");
            tdEl = document.createElement("td");
            tdEl2 = document.createElement("td");
            tdEl3 = document.createElement("td");

            tdEl.textContent = reports[i][0];
            tdEl2.textContent = reports[i][1];
            tdEl3.textContent = reports[i][2];
            trEl.appendChild(tdEl);
            trEl.appendChild(tdEl2);
            trEl.appendChild(tdEl3);
            table1.row.add(trEl);
        }
        table1.draw();
        $.ajax({
            type: "POST",
            url: "/Mail/ShowServers",
            dataType: "JSON"
        })
   .done(function (result) {
       var newSelect = document.createElement('select');
       var selectHTML = "";
       var choices = result.MessageList;
       for (i = 0; i < choices.length; i = i + 1) {
           var opEl = document.createElement("option");
           opEl.value = choices[i][0];
           opEl.textContent = choices[i][1];
           document.getElementById('menu2').appendChild(opEl);

       }
       $("#menu2").selectpicker("refresh");

       $("#raporGetirButton").click(function () {
           if ($("#datetime1").val() > $("#datetime2").val()) {
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
               // if ($('#menu2 :selected').text() == "Bütün Sunucular") {
               if (parseInt($('#menu2 :selected').val()) === -1) {


                   $.ajax({
                       type: "POST",
                       url: "/Mail/ShowSumMailReportsForAllServers",
                       data: {
                           serverId: -1,
                           date_begin: $("#datetime1").val(),
                           date_end: $("#datetime2").val()
                       },
                       dataType: "JSON"
                   })
             .done(function (result) {
                 $('#myModal').modal('hide');
                 var reports = result.MessageList;
                 var tableRows = [];
                 
                 table1.clear().draw();
                 for (var i = 0; i < reports.length; i++) {
                     var trEl = document.createElement("tr");
                     tdEl = document.createElement("td");
                     tdEl2 = document.createElement("td");
                     tdEl3 = document.createElement("td");

                     tdEl.textContent = reports[i][0];
                     tdEl2.textContent = reports[i][1];

                     trEl.appendChild(tdEl);
                     trEl.appendChild(tdEl2);
                     trEl.appendChild(tdEl3);
                     table1.row.add(trEl);
                 }
                 table1.draw();
             })
                 .fail(function (a, b, c) {
                    
                 });

               } else {
                   var serverID = $('#menu2 :selected').val();

                   $.ajax({
                       type: "POST",
                       url: "/Mail/ShowSumMailReportsForAllServers",
                       data: {
                           serverId: serverID,
                           date_begin: $("#datetime1").val(),
                           date_end: $("#datetime2").val()
                       }, 
                       dataType: "JSON"
                   })
          .done(function (result) {
              $('#myModal').modal('hide');
              var reports = result.MessageList;
              var tableRows = [];
             
              table1.clear().draw();
              for (var i = 0; i < reports.length; i++) {
                  var trEl = document.createElement("tr");
                  tdEl = document.createElement("td");
                  tdEl2 = document.createElement("td");
                  tdEl3 = document.createElement("td");
                  tdEl.textContent = reports[i][0];
                  tdEl2.textContent = reports[i][1];
                  tdEl3.textContent = reports[i][2];


                  trEl.appendChild(tdEl);
                  trEl.appendChild(tdEl2);

                  table1.row.add(trEl);

              }
              table1.draw();
              
          })
              .fail(function (a, b, c) {
                
              });

               }
           }
       });

   })
 .fail(function () {
   
 });


    })
        .fail(function (a, b, c) {
            
        });