// script.js
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;

    fetch(`https://api.github.com/search/users?q=${searchInput}`, {
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then(response => response.json())
    .then(data => {
        displaySearchResults(data.items);
    })
    .catch(error => console.error('Error:', error));
});

function displaySearchResults(users) {
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" style="width: 50px; height: 50px;">
            <a href="${user.html_url}" target="_blank">${user.login}</a>
            <button onclick="fetchRepositories('${user.login}')">View Repos</button>
        `;
        searchResultsDiv.appendChild(userDiv);
    });
}

function fetchRepositories(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then(response => response.json())
    .then(data => {
        displayRepositories(data);
    })
    .catch(error => console.error('Error:', error));
}

function displayRepositories(repositories) {
    // Display repositories on the page
}
