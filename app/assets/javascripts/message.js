$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var text = message.content? `${ message.content }` : "";
    console.log(text)
    var image = message.image? `<img src= ${ message.image }>` : "";
    console.log(image)
    var html = `<div class="message" data-id="${message.id}"> 
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.created_at}
                    </p>
                    </div>
                  <div class="message__text">
                    <p class="message__text__content">
                      ${text}
                    </p>
                    <img class= "lower-message__image">
                      ${image}
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
    var url = location.href ;
    var last_message =$('.message:last').data("message-id");
    if (url.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          if (message.id > last_message){
          insertHTML = buildHTML(message); 
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          }
        })
      })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  }
};
  setInterval(reloadMessages, 5000);
  });