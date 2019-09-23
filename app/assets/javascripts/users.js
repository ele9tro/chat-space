$(document).on('turbolinks:load', function(){
  function appendUserName(user){
    var html = `<div class="chat-group-user clearfix addmember">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }"  data-user-name="${ user.name }">追加</a>
                </div>`
    return html;
  }
  function appendErrMsgToHTML(){
    var error_html = `<div class="chat-group-user clearfix addmember">
                  <p class="chat-group-user__name">一致するユーザーはありません</p>
                  </div>`
    return error_html;
  }
  function selectUserName(user_id, user_name) {
      var remove_html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                          <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                          <p class='chat-group-user__name'>${ user_name }</p>
                          <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                        </div>`
    return remove_html;
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
    type: 'GET',
    url: '/users',
    data: { keyword: input },
    dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          var html = appendUserName(user);
          $('#user-search-result').append(html);
        });
      }
      else {
        var errorMsgHtml = appendErrMsgToHTML();
        $('#user-search-result').append(errorMsgHtml);
      }
    });
  })
  $("#user-search-result").on("click", ".user-search-add", function () {
    var user_id = $(this).attr("data-user-id");
    var user_name = $(this).attr("data-user-name");
    var remove_html = selectUserName(user_id, user_name);
    $('#user-search-remove').append(remove_html);
    $(this).parent().remove();
    
  })
  $("#chat-group-users").on("click", ".user-search-remove", function () {
    $(this).parent().remove();
  })
})