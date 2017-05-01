$(document).ready(function () {
  var dialog = new BootstrapDialog({
    title: "Error",
    message: "You cannot leave empty Username, Password fields.",

    buttons: [
    {
      label: 'Close',
      action: function (dialogItself) {
        dialogItself.close();
      }
    }]
  });
  var loginError = new BootstrapDialog({
    title: "Error",
    message: "Your Username or Password invalid.",

    buttons: [
    {
      label: 'Close',
      action: function (dialogItself) {
        dialogItself.close();
      }
    }]
  });
  $("#loginButton").submit(function (e) {
    e.preventDefault();

    var username = $("#username").val();
    var password = $("#password").val();
    var userType = $("#userType").val();

    if (username == "" || password == "") {
      //alert("Username ve sifreyi girin");
      dialog.open();
    }
    else {
      $.ajax({
        type: "POST",
        url: "/Account/LoginOperations",
        data: {
          username: username,
          password: password,
          usertype: userType
        },
        dataType: "JSON"
      })
      .done(function (result) {
        //alert("oldu");
        console.log("oldu");
        console.log(result.Status);
        console.log(result.StatusCode);
        console.log(result);
        if (result.StatusCode == "War101") {
          loginError.open();
          $("#username").val('');
          $("#password").val('');

        } else {
          if (userType == 1) {
            var url1 = "/Home/HomeForHelper";
            // var userimagePath = devices[0][4];
            window.location.href = url1;
          }
          if (userType == 2) {
            var url2 = "/Home/HomePageForDisabled";
            window.location.href = url2;
          }
        }
      })
      .fail(function (result) {
        console.log(result + " fail");
        alert("hata");
      })
    }
  });
});