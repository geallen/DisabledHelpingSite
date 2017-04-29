$(document).ready(function () {
  var userType = $("#userType").val();
  var userId1 = $("#hdnSession").data('value');
  var userId2 = $("#userId").val();
  $.ajax({
    type: "POST",
    url: "/Home/HomePage",
    // data:{},
    dataType: "JSON"
  })
  .done(function (result) {
    var comment = "  Show Comments";
    var report = "  Report This Post";
    var markPost = "  Mark As Helped";
    var aText = "aText";
    var helperNumber = " comments - ";
    var reports = " reports - ";
    var helps = " helps";
    var addList = "Add This To My List"
    $('#roww1').empty();
    result = result.MessageList
    uzunluk = result.length;
    for (var i = 0; i < result.length; i++) {
      var e = $('<div class="col-md-10 col-md-offset-1">' +
      '<div class="box box-widget" style="border:none; position: relative;     margin-bottom: 20px;" >' +
        '<div class="box-header with-border" style="border-bottom: 1px solid #f4f4f4">' +
        '<div class="user-block">' +
        '<span class="username" style="font-size: 16px; font-weight:600;">'+
        '<a href="#">' + result[i][3] + '</a>' +
        '</span>' +
        '<span class="pull-right text-muted" style="float: right!important; color:#777;">' +
         '<button type="button" title="' + addList + '" id="addListButton' + i + '"' + 'class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModal" data-postId=' + result[i][0] + ' style="background:white; color:#444; margin-left: 5px; margin-bottom: 5px; border-color:#ddd;" onclick="addMyList(' + result[i][0] + ')">' +
        '<i class="fa fa-plus-square" style="display: inline-block; font: normal normal normal 18px FontAwesome; color:deepskyblue; text-rendering: auto;    -webkit-font-smoothing: antialiased;"></i></button>' + '</span>' +
        '<span class="description" style="color:#999; font-size:13px;">' + result[i][2] +
        '</span>' +'</div></div>' +
        '<div class="box-body" style="border-top-left-radius: 0; border-top-right-radius: 0; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; padding: 10px;" >' +
                    '<div><p style="margin:0 0 10px 15px;">' +
                    result[i][1] +'</p>'+
        '<button type="button" id="commentButton' + i + '"' + 'class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModal" data-postId=' + result[i][0] + ' style="background:#f4f4f4; color:#444; margin-left: 5px; margin-bottom: 5px; border-color:#ddd;" onclick="myf(' + result[i][0] + ')">' +
        '<i class="fa fa-comments" style="display: inline-block; font: normal normal normal 14px/1 FontAwesome;     font-size: inherit; text-rendering: auto;    -webkit-font-smoothing: antialiased;"></i>' +
         comment + '</button><a href="#" hidden>' + aText+'</a>'+
         '<button type="button" id="reportButton' + i + '"' + 'class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModal" data-postId=' + result[i][0] + ' style="background:#f4f4f4; color:#444; margin-left: 5px; margin-bottom: 5px; border-color:#ddd;" onclick="reportFunction(' + result[i][0] + ')">' +
      '<i class="fa fa-exclamation-triangle" style="display: inline-block; font: normal normal normal 14px/1 FontAwesome;     font-size: inherit; text-rendering: auto;    -webkit-font-smoothing: antialiased;"></i>' +
       report + '</button>'+
       '<button type="button" id="helpedButton' + i + '"' + 'class="btn btn-default btn-xs" data-toggle="modal" data-target="#myModal" data-postId=' + result[i][0] + ' style="background:#f4f4f4; color:#444; margin-left: 5px; margin-bottom: 5px; border-color:#ddd;" onclick="markFunction(' + result[i][0] + ')">' +
      '<i class="fa fa-check" style="display: inline-block; font: normal normal normal 14px/1 FontAwesome;     font-size: inherit; text-rendering: auto;    -webkit-font-smoothing: antialiased;"></i>' +
       markPost + '</button>' +
       '<span class="pull-right text-muted" style="float: right!important; color:#777;">' + result[i][4]+ helperNumber + result[i][5] + reports+ result[i][6]+ helps + '</span>' +
       '</div></div></div>');

      $('#roww1').append(e);
      e.attr('id', 'myid' + i);
     // var buttonId = document.getElementById('reportButton' + i);
      var reportbuttonId = 'reportButton' + i;
      var helpedbuttonId = 'helpedButton' + i;
      var addListButtonId = 'addListButton' + i;
      unclickableReport(result[i][0], reportbuttonId, userId2);
      unclickableMark(result[i][0], helpedbuttonId, userId2);
      unclickableAddList(result[i][0], addListButtonId, userId2);
    }

    //unclickableReport(postId);
    var modaltxt = "modal Metni";
    var closetxt = "Close";
    function abc() {
      alert("Hello");
    }

  })
  .fail(function (result) {

  })


});
function unclickableAddList(postID, buttonId, userId) {
  //alert(postID + buttonId);
  $.ajax({
    type: "POST",
    url: "/Home/UnclickableAddList",
    // data:{},
    dataType: "JSON"
  })
 .done(function (result) {
   // alert("done");
   result = result.MessageList;
   for (var i = 0; i < result.length; i++) {
     if (result[i][1] == userId && result[i][2] == postID) {
       document.getElementById(buttonId).disabled = true;
     }
   }
 })
 .fail(function (result) {
   console.log(result);
 })
}
function unclickableReport(postID, buttonId, userId) {
  //alert(postID + buttonId);
  $.ajax({
    type: "POST",
    url: "/Home/UnclickableReportButton",
    // data:{},
    dataType: "JSON"
  })
 .done(function (result) {
   // alert("done");
   result = result.MessageList;
   for (var i = 0; i < result.length; i++) {
     if (result[i][1] == userId && result[i][2] == postID) {
       document.getElementById(buttonId).disabled = true;
     }
   }
 })
 .fail(function (result){
   console.log(result);
 })
}
function unclickableMark(postID, buttonId, userId) {
  //alert(postID + buttonId);
  $.ajax({
    type: "POST",
    url: "/Home/UnclickableHelpButton",
    // data:{},
    dataType: "JSON"
  })
 .done(function (result) {
   // alert("done");
   result = result.MessageList;
   for (var i = 0; i < result.length; i++) {
     if (result[i][1] == userId && result[i][2] == postID) {
       document.getElementById(buttonId).disabled = true;
     }
   }
 })
 .fail(function (result) {
   console.log(result);
 })
}