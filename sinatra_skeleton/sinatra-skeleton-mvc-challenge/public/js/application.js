$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  bindListeners();
});
var bindListeners = function(){
  $(".item-container").on("click", ".completed", complete );
  $(".item-container").on("submit",".delete", remove);
  $("#new-item-form").on("submit", createItem);
  $(".item-container").on("click", ".edit-link", editItem);
  $(".item-container ").on("submit", ".edit-form", completeEdit)
}

var complete = function(e){
  e.preventDefault();
  var url = $(this).attr('href')
  var $theThis = $(this)
  $.ajax({
    method: 'get',
    url: url,
  }).done(function(response){
    $theThis.html(response)
  })
}

var remove = function(e){
  e.preventDefault();
  allInfo = ($(this).attr('action').split('/'));
  articleID = (allInfo[2])
  url = $(this).attr('action');
  $.ajax({
    method: "delete",
    url: url,
  }).done(function(response){
    $("#"+articleID).remove();
  })
}

var createItem = function(e){
  e.preventDefault();
  url = $(this).attr('action');
  data = $(this).serialize();
  $.ajax({
    method: "post",
    url: url,
    data: data,
    dataType: "JSON"
  }).done(function(response){
    var html = (response["html"])
    $(".item-container").append(html)
  })
}

var editItem = function(e){
  e.preventDefault();
  url = $(this).attr('href');
  $.ajax({
    method: "GET",
    url: url,
    dataType: "JSON"
  }).done(function(response){
    console.log(response)
    var html = (response["html"])
    var articleID = (response["id"])
    $("#"+articleID).append(html);
  })
}

var completeEdit = function(e){
  e.preventDefault();
  var $theThis = (this);
  var url = $(this).attr('action')
  var method = $(this).attr('method')
  var data = $(this).serialize();
  $.ajax({
    method: method,
    url: url,
    data: data,
    dataType: "JSON"
  }).done(function(response){
   var html = (response["html"])
   var articleID = (response["id"])
   $("#"+articleID).html(html)
  })
}
