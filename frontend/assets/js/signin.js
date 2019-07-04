const signForm = (e) => {
  e.preventDefault();
  const userEmail = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;

  const url = 'https://blogsystemci.herokuapp.com/api/v1/auth/signin/';

  const signInData = {
    email: userEmail,
    password: userPassword,
  };
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signInData),
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 'success') {
        localStorage.setItem('token', body.data.token);
        document.getElementById('errorlog').innerHTML = body.message;
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 3000);
      } else {
        document.getElementById('errorlog').innerHTML = body.error;
      }
    });
};
const signBtn = document.getElementById('loginBtn');
signBtn.addEventListener('click', signForm);
