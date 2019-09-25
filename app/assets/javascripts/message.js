$(function() {
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img  = message.image.url ? `${ message.image.url }` : "";
    var html = `<div class="message" data-id="${message.id}"> 
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-meesage">
              <p class="lower-message__content">
                ${content}
              </p>
              <img class= "lower-message__image" src=${img} >
            </div>
          </div>`
        return html;
}
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url ,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $( '.submit-btn').prop( "disabled", false );
      $('form')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした');
    });
  })
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {last_id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = buildHTML(message); 
      $('.messages').append(insertHTML);
      });
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      // alert('自動更新に失敗しました');
    });
  }
  setInterval(reloadMessages, 5000);
  });