$(document).ready(function () {
  var dialog = new BootstrapDialog({
    title: "Error",
    message: "You cannot leave empty Name, Surname, Username, Password fields.",

    buttons: [
    {
      label: 'Close',
      action: function (dialogItself) {
        dialogItself.close();
      }
    }]
  });
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
  var dialog3 = new BootstrapDialog({
    title: "ERROR",
    message: "This username already taken.Please try another username.",

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
    if (username == "" || name == "" || surname == "" || password == "") {
      dialog.open();
    }else{
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
        //console.log(msg);
        if (msg == "Error") {
          dialog3.open();
        } else {
          dialog1.open();
        }
      },
      error: function (msg) {
        dialog2.open();
      }
    });
      }
  });
});