const data = sessionStorage.getItem('user')
const remaininglives = sessionStorage.getItem('lives')
const number = Math.floor(Math.random()*100)
const guess = document.getElementById('guess')
const answer = document.getElementById('answer')
const guessButton = document.getElementById('guessButton')
const message = document.getElementById('message')
const lives = document.getElementById('lives')
const logOut = document.getElementById('logOut')

answer.innerText = number
lives.innerText = remaininglives

const update = async ()=>{
  const updateLives = await fetch("https://restapi-production-b64d.up.railway.app/updateUserLives",{
    method:'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      user: data,
      live: remaininglives
    })
  })
}
update()
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
  user = await response.json()
  return user[0][0]
}


guessButton.addEventListener('click',async ()=>{
  if(guess.value === ''){
    message.innerText = "Enter a number"
    return
  }
  if(guess.value == number){
    const updateLives = await fetch("https://restapi-production-b64d.up.railway.app/updateUserLevel",{
      method:'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        user: data,
        level: 2
      })
    })
    window.location.pathname = "../html/home.html"
    return
  }
  message.innerText = 'wrong'
  const user = await dataFetch()
  console.log(user.lives)
  const updateLives = await fetch("https://restapi-production-b64d.up.railway.app/updateUserLives",{
    method:'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      user: data,
      live: user.lives -1
    })
  })
  lives.innerText = user.lives -1
})
logOut.addEventListener('click',()=>{
  sessionStorage.clear()
  window.location.pathname = '../index.html'
})