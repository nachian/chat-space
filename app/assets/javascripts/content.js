$(function(){
    function buildPost(message){
    if (message.image) ? insertImage = '' :insertImage = `<img src="${message.image}">`;
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
          $('#messge_content')[0].reset();
          $('.contents__messages').animate({scrollTop: $(".contents__messages")[0].scrollHeight}, 1500);
          $('.submit-btn').attr('disabled', false);
          $('.submit-btn').removeAttr('data-disable-with')
        })
        .fail(function(){
            
            alert('メッセージが送信されませんでした。');
        });
    });
});