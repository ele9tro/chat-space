$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var html = `<div class="message">
    <div class="message__upper-info">
    <div class="message__upper-info__talker">
    ${message.user_name}
    </div>
    <div class="message__upper-info__date">
    ${message.created_at}
    </div>
    </div>
    <div class="message__text">
    <p class="message__text__content">
    ${message.content}
    </p>
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
});