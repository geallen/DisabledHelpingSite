$(document).ready(function () {
  var userType = $("#userType").val();

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
    var reports = " reports";
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
        '</span>' +'<span class="description" style="color:#999; font-size:13px;">' + result[i][2] +
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
      '<i class="fa fa-plus-square" style="display: inline-block; font: normal normal normal 14px/1 FontAwesome;     font-size: inherit; text-rendering: auto;    -webkit-font-smoothing: antialiased;"></i>' +
       markPost + '</button>' +
       '<span class="pull-right text-muted" style="    float: right!important; color:#777;">' + result[i][4]+ helperNumber + result[i][5] + reports+ '</span>' +
       '</div></div></div>');
      //$('.myMenu ul li').hover(function () {
      //  $(this).children('ul').stop(true, false, true).slideToggle(300);
      //});
      $('#roww1').append(e);
      e.attr('id', 'myid' + i);
      //$('.myMenu ul li').hover(function () {
      //  $(this).children('ul').stop(true, false, true).slideToggle(300);
      //});
    }

    //for (var u = 0; u < uzunluk; u++) {
    //  document.getElementById('commentButton' + u).onclick = function () {
    //    alert(u);
    //  }
    //  alert(u);
    //}
    //$("#commentButton2").click(function () {
    //  //alert("aa");
    //  for (var u = 0; u < uzunluk; u++) {
    //    //document.getElementById('commentButton' + u).onclick = function () {
    //      alert(u);
    //    }
    //  });

    //$("'#commentButton'+ 0").click(function () {
    //  alert(") a bastin");
    //});

    //document.getElementById('commentButton'+0).onclick = function () {
    // // alert("0 a bastin");

    //}
    var modaltxt = "modal Metni";
    var closetxt = "Close";
    // for (var i = 0; i < result.length; i++){

    // $("#commentButton").click(function () {
    function abc() {
      alert("Hello");
    }
    //for (var j = 0 ; j < result.length; j++) {
    //  document.getElementById('commentButton' + j).onclick = function () {
    //    alert("tikladin "+ i);
    //    //var y = $('<div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog">' +
    //'<div class="modal-content">' +
    //  '<div class="modal-header">' +
    //    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
    //    '<h4 class="modal-title">Modal Header</h4>'+
    //  '</div><div class="modal-body"><p>'+
    //  modaltxt + '</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">'+
    //  closetxt+ '</button></div></div></div></div></div>'

    //  );

    //  var header = "This is my dynamic header";
    //  var content = "This is my dynamic content";
    //  var strSubmitFunc = "abc()";
    //  var btnText = "Just do it!";
    //  doModal('idMyModal', header, content, strSubmitFunc, btnText);
    //  function doModal(placementId, heading, formContent, strSubmitFunc, btnText) {
    //    html = '<div id="modalWindow" class="modal hide fade in" style="display:none;">';
    //    html += '<div class="modal-header">';
    //    html += '<a class="close" data-dismiss="modal">×</a>';
    //    html += '<h4>' + heading + '</h4>'
    //    html += '</div>';
    //    html += '<div class="modal-body">';
    //    html += '<p>';
    //    html += formContent;
    //    html += '</div>';
    //    html += '<div class="modal-footer">';
    //    if (btnText != '') {
    //      html += '<span class="btn btn-success"';
    //      html += ' onClick="' + strSubmitFunc + '">' + btnText;
    //      html += '</span>';
    //    }
    //    html += '<span class="btn" data-dismiss="modal">';
    //    html += 'Close';
    //    html += '</span>'; // close button
    //    html += '</div>';  // footer
    //    html += '</div>';  // modalWindow
    //    $("#" + placementId).html(html);
    //    $("#modalWindow").modal();
    //  }
    //  function hideModal() {
    //    // Using a very general selector - this is because $('#modalDiv').hide
    //    // will remove the modal window but not the mask
    //    $('.modal.in').modal('hide');
    //  }
    //   }
    //  }
  })
  .fail(function (result) {

  })
});