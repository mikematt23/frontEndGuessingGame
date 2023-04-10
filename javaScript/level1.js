const data = sessionStorage.getItem('user')
const number = Math.floor(Math.random()*10)

const guess = document.getElementById('guess')
const answer = document.getElementById('answer')
const guessButton = document.getElementById('guessButton')
const message = document.getElementById('message')
const lives = document.getElementById('lives')

answer.innerText = number

const reset = async ()=>{
  const updateLevel = await fetch("https://restapi-production-b64d.up.railway.app/updateUserLevel",{
    method:'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      user: data,
      level: 0
    })
  })
  const updateLives = await fetch("https://restapi-production-b64d.up.railway.app/updateUserLives",{
    method:'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      user: data,
      live: 4
    })
  })
}

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
  return user[0][0]
}

reset()

guessButton.addEventListener('click',async ()=>{
  const user = await dataFetch()
  if(guess.value === ''){
    message.innerText = "Enter a number"
    return
  }
  if(guess.value == number){
    const updateLevel = await fetch("https://restapi-production-b64d.up.railway.app/updateUserLevel",{
      method:'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        user: data,
        level: 1
      })
    })
    sessionStorage.setItem('lives',user.lives)
    window.location.pathname = "../html/level2.html"
    return
  }
  message.innerText = 'wrong'
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
