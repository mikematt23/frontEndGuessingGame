const userName = document.getElementById('userName')
const email = document.getElementById("email")
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmPassword') 
const message = document.getElementById('message')
const button = document.getElementById('SignUpButton')

button.addEventListener('click',async()=>{
  if(password.value !== confirmPassword.value){
    message.innerText = "Passwords Does Not Match"
    message.style.display ="inline"
    return
  }
  const response = await fetch("https://restapi-production-b64d.up.railway.app/addUser",{
    method : 'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      user: userName.value,
      password: password.value,
      email: email.value
    })
  })
  let json =  await response.json()
  console.log(json.message)
  if(json.message === "already a users"){
    message.innerText = "Already A User"
    message.style.display ="inline"
    console.log(message)
  }
  if(json.message === "it is working"){
    window.location.pathname = "../index.html"
  }
})

