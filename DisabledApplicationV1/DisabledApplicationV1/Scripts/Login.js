$(document).ready(function () {
  $("#loginButton").submit(function (e) {
    e.preventDefault();

    var username = $("#username").val();
    var password = $("#password").val();
    var userType = $("#userType").val();

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
    .done(function (result){
      //alert("oldu");
      if (userType == 1) {
        var url1 = "/Home/HomeForHelper";
        // var userimagePath = devices[0][4];
        window.location.href = url1;
      }
      if (userType == 2) {
        var url2 = "/Home/HomePageForDisabled";
        window.location.href = url2;
      }
    })
    .fail(function (result) {
      alert("hata");
    })

  });
});