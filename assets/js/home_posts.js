{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    console.log(newPost);
                    let container = $('#posts-list-container > ul');
                    console.log(container);
                    // newPost.appendTo($('#posts-list-container + ul'));
                    $('#posts-list-container > ul ').prepend(newPost);
                    deletePost($(` .delete-post-button`,newPost));
                },
                error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }
    // from above function we received the data: { post: post} for creating a post ( like content of text area of post)
    // console.log('hi')

    // method to create a post using DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">

        <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id }">X</a>
        </small>
        
         <textarea  cols="30" rows="3" readonly> ${post.content }  
            ${ post.user.name } 
        </textarea>

         <form action="/comments/create" method="POST">
            <input type="text" name="content"   placeholder = "Add comment... " required>
            <input type="hidden" name="post" value=" ${post._id } ">
            <input type="submit" value="Add">
         </form>
         
         <div class="post-comments-list">
            <ul id="post-comments-${post._id }">
            // body will be appendedTo when we add a comment
            </ul>
         </div>
         
    </li>
    `);
    }

    //deleting a post
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'), // it is called getting the value of href in a tag
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(err){
                    console.log(err.responseText);
                }
            })
        })
    }
    
createPost();
}