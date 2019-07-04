let userToken = '';
if (localStorage.getItem('token')) {
  userToken = localStorage.getItem('token');
} else {
  window.location.href = 'signin.html';
}

const getallposts = () => {
  const url = 'https://blogsystemci.herokuapp.com/api/v1/posts';

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': userToken,
    },
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 200) {
        let result = '';
        body.data[0].forEach((posts) => {
          const fDate = moment(posts.createdon).format('dddd MMM YYYY HH:mm:ss');
          result += `<li>
          <div>
          <p>
          <img src="https://via.placeholder.com/50.png/09f/fff" alt=""><br>
            <strong>Title: ${posts.title}<br></strong>
            Description: ${posts.descriptions}<br>
            Category: ${posts.category}<br>
            TAG: ${posts.tag}<br>
            Date Posted: ${fDate}<br>
            <a href="posts.html?id=${posts.id}" data-post="${posts.id}"><button class="button_1" >View Details</button></a>
            <a href="updatepost.html?id=${posts.id}" data-post"${posts.id}"><button class="button_1" >Update Post</button></a>
            <hr>
          </p>
          </div>
        </li>`;
        });
        document.getElementById('posts').innerHTML = result;
      } else {
        document.getElementById('errorlog').innerHTML = body.error;
      }
    });
};

getallposts();
