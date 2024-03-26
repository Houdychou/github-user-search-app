const form = document.querySelector('form');
const btn = document.querySelector('.btn');
const h1 = document.querySelector('h1');
const container = document.querySelector('.container');
const otherInfos = document.querySelector('.other-infos');
const input = document.querySelector('input');
const dark = document.querySelector('.dark');
const white = document.querySelector('.white');
const lightModeIcon = document.getElementById('LightMode');
const darkModeIcon = document.getElementById('Darkmode');
const body = document.querySelector('body');

const myHeaders = new Headers();


const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

function displayUserData(username) {
    fetch("https://api.github.com/users/" + username, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Utilisateur non trouvé');
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            picture(data);
        })
        .catch(error => console.error(error));
}

function picture(data) {
    container.classList.remove('hidden');

    const img = document.querySelector('img');
    img.src = data.avatar_url;

    const username = document.querySelector('.username');
    username.textContent = data.name;

    const login = document.querySelector('.id');
    login.textContent = "@" + data.login;

    const date = document.querySelector('.since');
    date.textContent = "joined at: " + data.created_at;

    const bio = document.querySelector('.txt p');
    bio.textContent = data.bio;

    const reposNum = document.querySelector('.repos-number');
    reposNum.textContent = data.public_repos;

    const followers = document.querySelector('.followers-number');
    followers.textContent = data.followers;

    const following = document.querySelector('.following-number');
    following.textContent = data.following;

    const localisation = document.querySelector('.city');
    if(data.location) {
        localisation.textContent = data.location;
    } else {
        localisation.textContent = "Not Available";
    }

    const url = document.querySelector('.url');
    url.textContent = data.html_url;

    const twitter = document.querySelector('.twitter');
    if (data.twitter_username) {
        twitter.textContent = data.twitter_username;
    } else {
        twitter.textContent = "Not available";
    }

    const building = document.querySelector('.building');
    if(data.company) {
        building.textContent = data.company;
    } else {
        building.textContent = "Not Available";
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.querySelector('input[name="username"]').value;
    displayUserData(username);
});

lightModeIcon.addEventListener('click', function () {
    body.classList.toggle('light-mode');
    container.classList.toggle('container-white');
    otherInfos.classList.toggle('other-infos-white');
    input.classList.toggle('input-white2');
    dark.classList.remove('hidden');
    white.classList.add('hidden');
});

darkModeIcon.addEventListener('click', function () {
    body.classList.remove('light-mode');
    container.classList.remove('container-white');
    otherInfos.classList.remove('other-infos-white');
    input.classList.remove('input-white2');
    dark.classList.add('hidden');
    white.classList.remove('hidden');
})
