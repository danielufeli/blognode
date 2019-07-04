const getId = () => {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const postId = url.searchParams.get('id');
  return postId;
};
const postId = getId();

const deleteData = () => {
  const url = `https://blogsystemci.herokuapp.com/api/v1/posts/${postId}`;

  let userToken = '';
  if (localStorage.getItem('token')) {
    userToken = localStorage.getItem('token');
  } else {
    window.location.href = 'signin.html';
  }

  return fetch(url, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': userToken,
    },
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

const getpost = () => {
  const url = `https://blogsystemci.herokuapp.com/api/v1/posts/${postId}`;

  let userToken = '';
  if (localStorage.getItem('token')) {
    userToken = localStorage.getItem('token');
  } else {
    window.location.href = 'signin.html';
  }

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
        const fDate = moment(body.data[0].createdon).format('dddd MMM YYYY HH:mm:ss');
        result += `<li>
          <div>
          <p>
          <img src="https://via.placeholder.com/50.png/09f/fff" alt=""><br>
            <strong>Title: <br>${body.data[0].title}<br><br></strong>
            <strong>Description:</strong> <br> ${body.data[0].descriptions}<br><br>
            <strong>Category:</strong> <br>${body.data[0].category}<br><br>
            <strong>TAG:</strong> <br>${body.data[0].tag}<br><br>
            Date Posted:</strong> <br> ${fDate}<br>
            <a href="#" onclick="deleteData()"><button class="button_1" >Delete</button></a>
            <hr>
          </p>
          </div>
        </li>`;
        document.getElementById('posts').innerHTML = result;
      } else {
        document.getElementById('errorlog').innerHTML = body.error;
      }
    });
};

getpost();
