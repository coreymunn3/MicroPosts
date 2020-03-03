import {http} from './http';
import {ui} from './UI';

// get posts on DOM load
document.addEventListener('DOMContentLoaded',getPosts)

// Listen for add post
document.querySelector('.post-submit').addEventListener('click',submitPost);

// Listen for remove post
document.querySelector('#posts').addEventListener('click',deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click',enableEdit);

// Listen for cancel edit
document.querySelector('.card-form').addEventListener('click',cancelEdit);

// Event Functions
function getPosts(){
  http.get('http://localhost:3000/posts')
    .then( data => ui.showPosts(data))
    .catch( err => console.log(err));
}

function submitPost(){
  let title = ui.titleInput.value;
  let body = ui.bodyInput.value;
  let id = ui.idInput.value;

  const data = {
    title,
    body
  }
  // validate input
  if(title === '' || body ===''){
    ui.showAlert('Please fill in all fields!','alert alert-danger')
  }
  else {
    // check for id
    if(id === ''){ // then we are in add state
      // create post
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        console.log(data)
        ui.showAlert('Post Added', 'alert alert-success');
        ui.clearInputs();
        getPosts();
      })
      .catch(err => console.log(err));
    }
    else { // we are in edit state, need to update the post
      // create post
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        console.log(data)
        ui.showAlert('Post Updated', 'alert alert-success');
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err));
    }
  }
}
// delete post
function deletePost(e){
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete')){

    const id = e.target.parentElement.dataset.id
    console.log(e.target, id)

    if(confirm('Are you Sure?')){
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(res => {
          ui.showAlert('Post Removed','alert alert-success');
          getPosts();
          console.log(res);
        })
        .catch(err => console.log(err))
    }
  }
}
// enable edit
function enableEdit(e){
  e.preventDefault();
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    
    const data = {
      id,
      title,
      body
    }
    // fill the form with this post
    ui.fillForm(data);
  }
}
function cancelEdit(e){
  if(e.target.classList.contains('cancel')){
    ui.changeFormState('add');
  }
  e.preventDefault()
}