$(document).ready(function () {
  var dialog1 = new BootstrapDialog({
    title: "SUCCESSFUL",
    message: "You succesfully registered to system.",

    buttons: [
    {
      label: 'Close',
      action: function (dialogItself) {
        dialogItself.close();
      }
    }]
  });
  var dialog2 = new BootstrapDialog({
    title: "ERROR",
    message: "Something went wrong.Try again later.",

    buttons: [
    {
      label: 'Close',
      action: function (dialogItself) {
        dialogItself.close();
      }
    }]
  });
  $("#registerButton").submit(function (e) {
    e.preventDefault();


    var name = $("#name").val();
    var surname = $("#surname").val();
    var username = $("#username").val();
    var password = $("#password").val();
    var userType = $("#userType").val();
    var story;
    if ($("#story").val() == "") {
      story = "Empty";
    } else {
      story = $("#story").val();
    }

    $.ajax({
      type: "POST",
      url: "/Account/RegisterOperations",
      data: {
        name: name,
        surname: surname,
        username: username,
        password: password,
        userType: userType,
        story: story
      },
      dataType: "Json",
      success: function (msg) {
        dialog1.open();
        if (dialog1.opened == true) {
          var url3 = "/Account/Login";
          window.location.href = url3;
        }
      },
      error: function (msg) {
        dialog2.open();
      }
    });
  });
});