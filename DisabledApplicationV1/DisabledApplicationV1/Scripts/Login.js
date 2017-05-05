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
  var loginError2 = new BootstrapDialog({
    title: "Error",
    message: "You removed from the system because of reports about you",

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

        if (result.StatusCode == "War101") {
          loginError.open();
          $("#username").val('');
          $("#password").val('');

        } else {
          result = result.MessageList
          if (result[0][7] == 1) {
            loginError2.open();
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
        }
      })
      .fail(function (result) {
        console.log(result + " fail");
        alert("hata");
      })
    }
  });
});