{
    //method to submit the form data using ajax for new comment
    let createComment = function(){
        let newCommentForm = $(`#new-comment-form`);
        newCommentForm.submit(function(e){
            e.preventDefault();
            
            console.log('haha aaya bda comment krne')
            $.ajax({
                type:'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    // console.log(data);
                    let newComment = newCommentDom(data.data.comment);
                    console.log(newComment);
                    let container = $('.post-comments-list > ul ');
                    console.log(container);
                    // newPost.appendTo($('#posts-list-container + ul'));
                    container.prepend(newComment);
                    
                },error: function(err){
                    console.log(err.responseText);
                }
            })
        })
    }

    let newCommentDom = function(comment){
        return $(`<li id="comment-${ comment._id}">
            <small >
                <a href="/comments/destroy/${comment._id }">X</a>
            </small>
            <p style = "display: inline-block">
                                 ${  comment.content  }                                                               
                <br>
                                 ${ comment.user.name  }                                                             
            </p>
        </li>`)
    }
    createComment();
}