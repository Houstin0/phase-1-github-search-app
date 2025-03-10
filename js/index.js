//fetch GITHUB User
function fetchGHUsers(searchValue){
  console.log(searchValue);
  fetch(`https://api.github.com/users/${searchValue}`, {
      method: 'GET', 
      headers: {
          'content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
      }
  })
  .then(res => res.json())
  .then(user => {
      console.log(user);
      if (user.message == 'Not Found'){
          alert (`Sorry! User ${searchValue} does not exist`)
      }else{   
          createUserCard(user)
      }  
  })
}

//Create Card for found user
function createUserCard(userDetails){
  const userCardDiv = document.createElement('div')
  const userMainDIv = document.getElementById('articles')
  userMainDIv.append(userCardDiv)
  userCardDiv.innerHTML = `
  <div class="article-wrapper">
      <div id="imgContainer">
          <img id='userImg' src="${userDetails.avatar_url}" alt="" />
      </div>
      <div class="article-body">
          <h2>${userDetails.name}</h2>
          <p>${userDetails.bio}</p>
      <div id="fDiv">
          <a class="fLinks" href="${userDetails.followers_url}">Followers: ${userDetails.followers}</a>
          <a class="fLinks" href="${userDetails.following_url}">Following: ${userDetails.following}</a>
      </div>
      <div id="repoLinkDiv">
          <a id="repoLink" href="${userDetails.html_url}">GitHub Account</a>
      </div>
      </div>
  </div>`
}

//fetch GITHUB Repos
function fetchGHRepos(searchValue){
  fetch(`https://api.github.com/users/${searchValue}/repos`, {
      method: 'GET', 
      headers: {
          'content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
      }
  })
  .then(res => res.json())
  .then(repos => {
      if(repos.length > 0){
           for (let repo of repos){
          console.log(repo);
          createRepoCard(repo)
      }
      }else{
          alert(`No repositories found for ${searchValue}`)
          
          
      }
     

  })
}

//create card for displaying Repo
function createRepoCard(repo){
  const repoCardDiv = document.createElement('div')
  repoCardDiv.setAttribute('id','GHRepoCard')
  const repoMainDIv = document.getElementById('userRepos')
  repoMainDIv.append(repoCardDiv)
  
  repoCardDiv.innerHTML = `
      <h1 id="repoName">${repo.name}</h1>
      <p id="repoLanguage">Language: ${repo.language}</p>
      <a id="ghRepoUrl" href="${repo.html_url}" >GitHub Repo</a>
      <p>Date Created ${repo.created_at}</p>`
}


//display results
document.addEventListener('DOMContentLoaded',()=>{
  const searchUserButton = document.getElementById('searchUsername')
  const searchUserRepoButton = document.getElementById('searchUserRepo')

  searchUserButton.addEventListener('click', (e)=>{
    e.preventDefault()
    const searchInputValue = document.getElementById('search').value
    fetchGHUsers(searchInputValue)
    searchInputValue = ''
  })

  searchUserRepoButton.addEventListener('click', (e)=>{
    e.preventDefault()
    const repoSearchValue = document.getElementById('search').value
    fetchGHRepos(repoSearchValue)
})
})