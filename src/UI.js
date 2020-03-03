class UI {
  constructor (){
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.submit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  showPosts(posts){
    let output = ``;
    posts.forEach(post => {
      output += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id="${post.id}">
            <i class="fa fa-pencil"></i>
          </a>
          <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
        </div>
      </div>
      `;
    })
    this.post.innerHTML = output;
  }

  showAlert(message,style){
    // create div
    const div = document.createElement('div');
    // add classes
    div.className = style;
    // add message
    div.appendChild(document.createTextNode(message));
    // get parent 
    const container = document.querySelector('.postsContainer');
    // get post div
    const posts = document.querySelector('#posts');
    // insert
    container.insertBefore(div, posts);

    // timeout 
    setTimeout(()=>{
      this.clearAlert();
    },3000)
  }
  clearAlert(){
    const currentAlert = document.querySelector('.alert');

    if(currentAlert){
      currentAlert.remove();
    }
  }
  clearInputs(){
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }
  clearId(){
    this.idInput.value = '';
  }
  fillForm(data){
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id
    // change to edit state
    this.changeFormState('edit');
  }
  changeFormState(type){
    if(type === 'edit'){
      this.submit.textContent = 'Update Post'
      this.submit.className = 'post-submit btn btn-warning btn-block'

      // create cancel button & add classes / message
      const button = document.createElement('button');
      button.className = 'cancel btn btn-light btn-block mt-3';
      button.appendChild(document.createTextNode('Cancel'));
      console.log(button);
      // get parent
      const cardFrom = document.querySelector('.card-form');
      // insert button into parent
      cardFrom.appendChild(button);
    }
    else {
      this.submit.textContent = 'Post It'
      this.submit.className = 'post-submit btn btn-primary btn-block'
      // remove cancel button if it's there
      if(document.querySelector('.cancel')){
        document.querySelector('.cancel').remove()
      }
      // clear id input
      this.clearId();
      // clear text fields
      this.clearInputs();
    }
  }
}

export const ui = new UI();