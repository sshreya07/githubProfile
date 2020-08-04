document.querySelector('#result').style.display = 'none';
document.querySelector('#section2').style.display = 'none';
document.querySelector('#section3').style.display = 'none';

const uImg = document.getElementById('profilePic');
const uProfileName = document.getElementById('heading');
const uProfileLogin = document.getElementById('profileInput');
const uRepo = document.getElementById('Repo');
const uFollower = document.getElementById('follower');
const uFollowing = document.getElementById('following');
const uTopRepo = document.getElementById('repoResults'); 
const uDoJ = document.getElementById('DOJ');
const uLoc = document.getElementById('location');
const uCom = document.getElementById('company');
const uBio = document.getElementById('bio');
const uSortStar = document.getElementById('star');
const uSortFork = document.getElementById('fork');
const uSortSize = document.getElementById('size');

let data1 = 0;
let data2 = 0;
let data3 = 0;
let countStars1 = 0;
let countStars2 = 0;
let countStars3 = 0;
let noOfStars = [];
let repos = [];

document.getElementById('form1').addEventListener('submit', searchUser);
document.getElementById('profileInput').addEventListener('click', imgChange);

function searchUser(e){

    const user = document.querySelector('#username').value;

    console.log(user);

    fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`)
        .then(Response => {
            console.log(Response.status);
            if(!Response.ok){
                Error('not found');
            }
            return Response.json();
        })
        .then(user => {
            console.log(user);

            if(`${user.login}` === 'null' || `${user.login}` === 'undefined'){
                alert('Invalid User');

            }else{

                uImg.setAttribute("src", user.avatar_url);
                uProfileName.innerHTML = user.name;
                uProfileLogin.innerHTML = `@${user.login}`;
                uProfileLogin.style.fontSize = '25px';
                uProfileLogin.style.color = '#7fff00';
                if(`${user.company}` === 'null'){
                    uCom.style.display = 'none';                    
                }else{
                    uCom.innerHTML = `<span><i class="fa fa-building-o"></i></span>&ensp; ${user.company}`;
                }
                if(`${user.location}` === 'null'){
                    uLoc.style.display = 'none';                    
                }else{
                    uLoc.innerHTML = `<span><i class="fa fa-map-marker"></i></span>&ensp; ${user.location}`;
                }
                uDoJ.innerHTML = `<span><i class="fa fa-calendar"></i></span>&ensp; Joined ${new Date(user.created_at).toDateString()}`;
                if(`${user.bio}` === 'null'){
                    uBio.style.display = 'none';                    
                }else{
                    uBio.innerHTML = `<span><i class="fa fa-edit"></i></span>&ensp; ${user.bio}`;
                }
                uRepo.innerHTML = user.public_repos;
                uFollower.innerHTML = user.followers;
                uFollowing.innerHTML = user.following;

                document.querySelector('#result').style.display = 'block';
                document.querySelector('#section2').style.display = 'block';
                document.querySelector('#section3').style.display = 'block';
            
            }
        })
        .catch(err => console.log('something went wrong'));
        
    fetch(`https://api.github.com/users/${user}/repos`)
        .then(Response => {
            console.log(Response.status);
            if(!Response.ok){
                Error('not found');
            }
            return Response.json();
        })
        .then(user => {
            console.log(user);

            let output = '';

            user.forEach(data => {

                noOfStars.push(data.stargazers_count);
                repos.push(data.name);

                output += `<div class="row"> 
                <div class="col-md-6">
                <div class="card" id=#section2 style="color:gray;">
                <div class="card-content" style="padding:5px;">
                    <div class="card-title">
                        <h5 style="color: blue;">${data.name}</h5><br>
                        <small></small>
                    </div>
                    <div class="row" style="padding: 10px;">
                        <div><i class="fa fa-circle" style="color:orangered;"></i> ${data.language}</div>
                        <div><i class="fa fa-star-o"></i> ${data.stargazers_count}</div>
                        <div><i class="fa fa-code-fork"></i> ${data.forks_count}</div>
                        <div>Updated on ${new Date(data.updated_at).toDateString()}</div>
                        <div class="pull-right" style="float:right;">${data.size}Kb</div>
                    </div>  
                </div>
                </div><br>
                </div>
                </div>
                `;

                if(`${data.language}` === 'HTML'){
                    data1++;
                    if(`${data.stargazers_count}` !== 0){
                        countStars1 += data.stargazers_count;
                    }
                }else if(`${data.language}` === 'JavaScript'){
                    data2++;
                    if(`${data.stargazers_count}` !== 0){
                        countStars2 += data.stargazers_count;
                    }
                }else{
                    data3++;
                    if(`${data.stargazers_count}` !== 0){
                        countStars3 += data.stargazers_count;
                    }
                }

            });

            const ctx = document.getElementById('chart1').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['HTML','JavaScript', 'Others'],
                    datasets: [{
                        data: [ data1, data2, data3],
                        backgroundColor: [
                            '#dc143c',
                            'gold',
                            '#d3d3d3',
                        ],
                        borderColor: [
                            '#dc143c',
                            'gold',
                            '#d3d3d3',
                        ],
                        borderWidth: 1,
                        hoverBorderWidth: 3,
                        hoverBorderColor: [
                            '#dc143c',
                            'gold',
                            '#d3d3d3',
                        ]
                    }]
                },
                options: {
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor : 'black'
                        }
                    }
                }
            });

            const ctx2 = document.getElementById('chart2').getContext('2d');
            const myChart2 = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: repos,
                    datasets: [{
                        data: noOfStars,
                        backgroundColor: '#dc143c',
                        borderColor: '#d3d3d3',
                        borderWidth: 1,
                        hoverBorderWidth: 3,
                        hoverBorderColor: '#d3d3d3'       
                    }]
                },
                options: {
                    legend: {
                        display: false,
                        position: 'right',
                        labels: {
                            fontColor : 'black'
                        }
                    }
                }
            });

            const ctx3 = document.getElementById('chart3').getContext('2d');
            const myChart3 = new Chart(ctx3, {
                type: 'doughnut',
                data: {
                    labels: ['HTML', 'JavaScript', 'Others'],
                    datasets: [{
                        data: [countStars1, countStars2, countStars3],
                        backgroundColor: [
                            '#dc143c',
                            'gold',
                            '#d3d3d3'
                        ],
                        borderColor: [
                            '#dc143c',
                            'gold',
                            '#d3d3d3'
                        ],
                        borderWidth: 1,
                        hoverBorderWidth: 3,
                        hoverBorderColor: [
                            '#dc143c',
                            'gold',
                            '#d3d3d3'
                        ]
                    }]
                },
                options: {
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor : 'black'
                        }
                    }
                }
            });

            uTopRepo.innerHTML = output ;
        })
        .catch(err => console.log(err));

    e.preventDefault();
}

function imgChange(e){
    uImg.setAttribute("src", "Images/octocat.gif");

    e.preventDefault();
}