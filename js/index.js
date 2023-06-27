const user=document.getElementById('search')
const submit=document.getElementById('submit')
const repo=document.getElementById('repos-list')
const userList=document.getElementById('user-list')
const container=document.getElementById('github-container')
const form=document.getElementById('github-form')
form.addEventListener('submit', (e) =>{
    e.preventDefault()
    console.log(user.value);
    fetchdata(user.value)

})

function fetchdata(userValue){
fetch(`https://api.github.com/users/${userValue}/repos`,
{
    headers: {
      Authorization: `Bearer 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`,
    },
  })
.then(Response =>Response.json())
.then (data => {
    console.log(data)   

     for (const item of data) {
       const


     }
    
});
}