$.ajax({
    type: "POST",
    url: "/Mail/ShowServersForTest",
    dataType: "JSON"
})
   .done(function (result) {
       var newSelect = document.createElement('select');
       var selectHTML = "";
       var choices = result.MessageList;
       for (i = 0; i < choices.length; i = i + 1) {
           var opEl = document.createElement("option");
           opEl.value = choices[i][1];
           opEl.textContent = choices[i][0];
           document.getElementById('menu1').appendChild(opEl);

       }
       $("#menu1").selectpicker("refresh");

       $("#mailgonder").click(function () {
           $('#myModal1').modal('show');
           var serverId = $('#menu1 :selected').val();
           var kime = $("#kime").val();
           var konu = $("#konu").val();
           var mesaj = $("#mesaj").val();
           $.ajax({
               type: "POST",
               url: "/Mail/MailTestEt",
               data: {
                   serverId: serverId,
                   kime: kime,
                   konu: konu,
                   mesaj: mesaj
               },
               dataType: "JSON"
           })
    .done(function (result) {
        $('#myModal1').modal('hide');
        var choices = result.MessageList;
        var dialog1 = new BootstrapDialog({
            title: window.localization.Succesful,
            message: window.localization.SuccesfulMailSending,
            buttons: [
            {
                label: 'Close',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }]
        });
        var dialog2 = new BootstrapDialog({
            title: window.localization.Unsuccesful,
            message: window.localization.UnsuccesfulMailSending,
            buttons: [
            {
                label: 'Close',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }]
        });


        if (choices == $("#mesaj").val()) {
            dialog1.open();
           
        }
        else {
            dialog2.open();
        }
    })
      .fail(function (result) {
          $('#myModal1').modal('hide');
          var dialog3 = new BootstrapDialog({
              title: window.localization.Unsuccesful,
              message: window.localization.UnsuccesfulMailSending,
              buttons: [
              {
                  label: 'Close',
                  action: function (dialogItself) {
                      dialogItself.close();
                  }
              }]
          });
          dialog3.open();
          

      });

       });
   });


