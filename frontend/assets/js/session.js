const session = () => {
  if (localStorage.getItem('token')) window.location.href = 'dashboard.html';
};
session();
