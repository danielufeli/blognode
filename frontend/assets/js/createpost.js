const createPostForm = (e) => {
  e.preventDefault();
  const aTitle = document.getElementById('title').value;
  const aDescription = document.getElementById('description').value;
  const aTag = document.getElementById('tag').value;
  const aCategory = document.getElementById('category').value;
  const aImages = document.getElementById('images').value;

  const url = 'https://blogsystemci.herokuapp.com/api/v1/posts';

  let userToken = '';
  if (localStorage.getItem('token')) {
    userToken = localStorage.getItem('token');
  } else {
    window.location.href = 'signin.html';
  }

  const createPostData = {
    title: aTitle,
    descriptions: aDescription,
    category: aCategory,
    tag: aTag,
    images: aImages,
  };
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': userToken,
    },
    body: JSON.stringify(createPostData),
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 201) {
        document.getElementById('errorlog').innerHTML = body.data.message;
        setTimeout(() => { window.location.reload(); }, 2000);
      } else {
        document.getElementById('errorlog').innerHTML = body.error;
      }
    });
};
const createPostBtn = document.getElementById('createPostBtn');
createPostBtn.addEventListener('click', createPostForm);
