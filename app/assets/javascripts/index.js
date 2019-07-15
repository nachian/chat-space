$(function(){
    var user_list = $("#user-search-result");
    var member_list = $("#member-search-result");
    function appendUsers(user){
        var html = `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">
                            ${user.name}
                        </p>
                        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                        </a>
                    </div>`
        user_list.append(html);
    }

    function appendErrorMsgHTML(msg){
        var html = `<div class="chat-group-user clearfix">
                        <p class="chat-group-user__name">
                            ${msg}
                        </p>
                    </div>`
        user_list.append(html);
    }

    function appendMembers(name, user_id){
        var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                        <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                        <p class='chat-group-user__name'>${name}</p>
                        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                    </div>`
        member_list.append(html);
    }

    $(".chat-group-form__input").on("keyup", function(){
        var input = $("#user-search-field").val();

        $.ajax({
            type: 'GET',
            url: '/users',
            data: {keyword: input},
            dataType: 'json'
        })
        .done(function(users){
            $("#user-search-result").empty();
            if (users.length !== 0) {
                users.forEach(function(user){
                appendUsers(user);
                });
            }
            else{
                appendErrorMsgHTML("一致するユーザーはありません")
            }
        })
        .fail(function(){
                alert('ユーザー検索に失敗しました');
        })

    });

    $(document).on("click", ".user-search-add", function(){
        var name = $(this).data("user-name");
        var user_id = $(this).data("user-id");
        $(this).parent().remove();
        appendMembers(name, user_id);
    });

    $(document).on("click",".user-search-remove", function(){
        $(this).parent().remove();
    })
    

});
