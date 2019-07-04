const signUpForm = (e) => {
  e.preventDefault();
  const fiName = document.getElementById('fname').value;
  const laName = document.getElementById('lname').value;
  const userEmail = document.getElementById('email').value;
  const mobileNo = document.getElementById('mobileno').value;
  const userPassword = document.getElementById('password').value;
  const userPassword1 = document.getElementById('confirmpassword').value;

  const url = 'https://blogsystemci.herokuapp.com/api/v1/auth/signup/';

  const signUpData = {
    firstname: fiName,
    lastname: laName,
    email: userEmail,
    mobileno: mobileNo,
    password: userPassword,
    confirmPassword: userPassword1,
  };
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signUpData),
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 'success') {
        localStorage.setItem('token', body.data.token);
        document.getElementById('errorlog').innerHTML = body.message;
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 2000);
      } else {
        document.getElementById('errorlog').innerHTML = body.error;
      }
    });
};
const signupBtn = document.getElementById('signupBtn');
signupBtn.addEventListener('click', signUpForm);
