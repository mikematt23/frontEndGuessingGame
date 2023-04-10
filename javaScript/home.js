const userName = document.getElementById('userName')
const level = document.getElementById('level')
const lives = document.getElementById('lives')
const data = sessionStorage.getItem('user')
const logOut = document.getElementById('logOut')
const startGameButton = document.getElementById('startGameButton')



const dataFetch = async ()=>{
  const response = await fetch("https://restapi-production-b64d.up.railway.app/user",{
    method:'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      user: data
    })
  })
  let user = await response.json()
  console.log(user[0][0])
  userName.innerText = user[0][0].usersName
  level.innerText = user[0][0].level
  lives.innerText = user[0][0].lives
}

dataFetch()
logOut.addEventListener('click',()=>{
   sessionStorage.clear()
   window.location.pathname = '../index.html'
})
startGameButton.addEventListener('click',()=>{
  window.location.pathname = '../html/level1.html'
})