$(document).ready(function () {
  var userType = $("#userType").val();

  $.ajax({
    type: "POST",
    url: "/Home/HomePageForDisabledMethod",
    // data:{},
    dataType: "JSON"
  })
  .done(function (result) {
    var today = "deneme";
    var isim = "gamze";
    var comment = "merhaba bu deneme amacli comment";
    var postDetails = result.MessageList;
    $('#commentsForDisabledPost').empty();
    result = result.MessageList;

    var f = $('<div class="col-md-10 col-md-offset-1">' +
  '<div class="box box-widget" style="border:none; position: relative;     margin-bottom: 20px;" >' +
    '<div class="box-header with-border" style="border-bottom: 1px solid #f4f4f4">' +
    '<div class="user-block">' +
    '<span class="username" style="font-size: 16px; font-weight:600;">' +
    '<a href="#">' + result[0][5] + '</a>' +
    '</span>' + '<span class="description" style="color:#999; font-size:13px;">' + result[0][2] +
    '</span>' + '</div></div>' +
    '<div class="box-body" style="border-top-left-radius: 0; border-top-right-radius: 0; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding: 10px;" >' +
                '<div><p style="margin:0 0 10px 15px;">' +
                result[0][1] + '</p>' +
                '<input type="hidden" id="postIdDisabled" value="' + result[0][0]+'">'+
   '</div></div></div></div>'
   );
    $('#commentsForDisabledPost').append(f);
    for (var i = 0; i < result.length; i++) {

      var e = $('<div class="col-md-10 col-md-offset-1">' +
        '<div class="box-footer box-comments" style="    background: floralwhite;     border-top-left-radius: 0; border-top-right-radius: 0; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border-top: 1px solid #f4f4f4; padding: 10px;">' +
        '<div class="box-comment" style="padding: 8px 0; border-bottom: 1px solid #eee;">' +
        '<div class="comment-text">' +
        '<span class="username" style="display: block; font-weight: 600; margin-left:20px; color: #337ab7;">' + result[i][6]+
         '<span class="text-muted pull-right" style="font-weight: 400; font-size: 12px;">' + result[i][3] + '</span></span>' +
         '<span class="comment" style="margin-left:20px;">' +result[i][4] +
         '</span></div>'
        + '</div></div></div>');
      $('#commentsForDisabledPost').append(e);

    }

  })
  .fail(function (result) {

  })
});