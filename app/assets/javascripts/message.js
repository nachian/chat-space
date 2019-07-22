$(function() {
    function buildPost(message){
    message.image ? insertImage =`<img src='${message.image}'> </img>`:insertImage = ``;
        var html = `<div class="contents__messages__box" data-id="${message.id}">
                        <div class="contents__messages__box__name">
                            ${message.name}
                        </div>
                        <div class="contents__messages__box__date">
                            ${message.created_at}
                        </div>
                        <div class="contents__messages__box__lower">
                        <p class="contents__messages__box__lower__content">
                            ${message.content}
                        </p>
                            ${insertImage}  
                        </div>
                    </div>`
        return html;
    }
    
    $('.new_message').on('submit', function(e){
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
          $('.new_message')[0].reset();
          $('.contents__messages').animate({scrollTop: $(".contents__messages")[0].scrollHeight}, 1500);
          $('.submit-btn').attr('disabled', false);
          $('.submit-btn').removeAttr('data-disable-with')
        })
        .fail(function(){
            alert('メッセージが送信されませんでした。');
        });
    });

        var reloadMessages = function() {
            if (window.location.pathname.match(/\/groups\/\d+\/messages/)){
                console.log(window.location.pathname)
                last_message_id = $('.contents__messages__box:last').data('id')
                group_id = $('.contents__messages__box:last').data('group-id')
                console.log(group_id)
                $.ajax({
                url: `/groups/${group_id}/api/messages`,
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
        setInterval(reloadMessages, 5000);
    
});