$(document).ready(function () {
  
    var dialog = new BootstrapDialog({
      title: window.localization.Unsuccesful,
      message: window.localization.loginError,
        
        buttons: [
        {
            label: 'Close',
            action: function (dialogItself) {
                dialogItself.close();
            }
        }]
    });

    $("#sign_in").submit(function (e) {
        e.preventDefault();

        var username = $("#input_username").val();
        var password = $("#input_password").val();

        $.ajax({
            type: "POST",
            url: "/Home/Login",
            data: {
                username: $("#input_username").val(),
                password: $("#input_password").val()
            },
            dataType: "JSON"
        })
    .done(function (result) {
      
        var devices = result.MessageList;
        if (result.Status != true) {
            // $('#loginErrorModal').modal('show');
            dialog.open();
        }
        else if (result.StatusCode != "OK") {
            //$('#loginErrorModal').modal('show');
            dialog.open();
        }
        else if (result.MessageList.length != 1) {
            //  $('#loginErrorModal').modal('show');
            dialog.open();
        }
        else if (result.Status == true && result.StatusCode == "OK" && result.MessageList.length == 1) {
            var url3 = "/Home/DefaultPage";
           // var userimagePath = devices[0][4];
            window.location.href = url3;

        } else {
            //
        }

    })
    .fail(function (result) {
        

    })
    .always(function (res) {
        
    });

    });
});
