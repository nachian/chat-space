$(function(){
    function buildPost(message){
    message.image ? insertImage =`<img src='${message.image}'> </img>`:insertImage = ``;

        var html = `<div class="contents__messages__box">
                        <div class="contents__messages__box__name">
                            ${message.name}
                        </div>
                        <div class="contents__messages__box__date">
                            ${message.created_at}
                        </div>
                        <div class="contents__messages__box__lower">
                        <p class="contents__messages__box__lower__content">
                            ${message.body}
                        </p>
                            ${insertImage}  
                        </div>
                    </div>`
        return html;
    }
    
    $('#new_message').on('submit', function(e){
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr('action');
        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
        })
        .done(function(message){
          var html = buildPost(message);
          $('.contents__messages').append(html);
          $('#new_message')[0].reset();
          $('.contents__messages').animate({scrollTop: $(".contents__messages")[0].scrollHeight}, 1500);
          $('.submit-btn').attr('disabled', false);
          $('.submit-btn').removeAttr('data-disable-with')
        })
        .fail(function(){
            alert('メッセージが送信されませんでした。');
        });

        var reloadMessages = function() {
            if (window.location.href.match(/\/groups\/\d+\/messages/)){
                last_message_id = $('.contents__messages__box').data('id')
                $.ajax({
                url: 'api/messages',
                type: 'GET',
                dataType: 'json',
                data: { id: last_message_id }
                })
                .done(function(messages) {
                    var insertHTML = '';
                    messages.forEach(function (message){
                        insertHTML = buildPost(message);
                        $(".contents__messages").append(insertHTML);            
                    })
                    $('.contents__messages').animate({scrollTop: $('.contents__messages')[0].scrollHeight}, 'fast');
                })
                .fail(function() {
                    alert('自動更新に失敗しました');
                });
            }
        }
        setInterval(reloadMessages, 10000);
    });
});