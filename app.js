(function () {
  const apiUrl = 'https://api.github.com/users';
  const formDOM = document.forms.search;
  const usersDOM = document.getElementById('users');
  const loader = '<img src="./assets/images/loader.svg" alt="loader" class="loader">';

  function populate(items) {
    const html = items.map((item) => {
      if (item.login !== undefined) {
        return `
          <div class="user">
              <div>
                <img src="${item.avatar_url}" alt="item.name">
              </div>
              <div>
                <p><strong>GitHub username: ${item.login}</strong></p>
                <p>
                    Name: ${item.name}<br>
                    ${item.bio !== null ? item.bio : ''}
                </p>
                <p>Repos: ${item.public_repos}, Followers: ${item.followers}, Following: ${item.following}</p>
                <p>GitHub page: <a href="${item.html_url}" target="_blank">${item.html_url}</a></p>
              </div>
          </div>
      `;
      }
      return '<div class="user notfound">User was not found!</div>';
    }).join('');

    usersDOM.innerHTML = html;
  }

  async function getData(users) {
    try {
      const promises = users.map(user => fetch(`${apiUrl}/${user}`).then(data => data.json()));
      const people = await Promise.all(promises);
      populate(people);
    } catch (err) {
      console.error(err);
    }
  }

  formDOM.addEventListener('submit', (event) => {
    event.preventDefault();

    usersDOM.innerHTML = loader;

    const values = formDOM.searchUsers.value;

    if (values !== '') {
      const users = values.split(',').map(value => value.trim());
      getData(users);
    }
  });
}());
