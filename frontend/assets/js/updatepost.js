const getId = () => {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const postId = url.searchParams.get('id');
  return postId;
};
const postId = getId();

const updatePostForm = (e) => {
  e.preventDefault();
  const aTitle = document.getElementById('title').value;
  const aDescription = document.getElementById('description').value;
  const aTag = document.getElementById('tag').value;
  const aCategory = document.getElementById('category').value;
  const aImages = document.getElementById('images').value;

  const url = `https://blogsystemci.herokuapp.com/api/v1/posts/${postId}`;

  let userToken = '';
  if (localStorage.getItem('token')) {
    userToken = localStorage.getItem('token');
  } else {
    window.location.href = 'signin.html';
  }

  const updatePostData = {
    title: aTitle,
    descriptions: aDescription,
    category: aCategory,
    tag: aTag,
    images: aImages,
  };
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': userToken,
    },
    body: JSON.stringify(updatePostData),
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 200) {
        document.getElementById('errorlog').innerHTML = body.data.message;
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 2000);
      } else {
        document.getElementById('errorlog').innerHTML = body.error;
      }
    });
};
const updatePostBtn = document.getElementById('updatePostBtn');
updatePostBtn.addEventListener('click', updatePostForm);
