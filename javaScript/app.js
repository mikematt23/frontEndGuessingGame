const button = document.getElementById("logInButton")
const userName = document.getElementById("userName")
const password = document.getElementById('password')
const message = document.getElementById('message')

button.addEventListener("click",async function(){
  if(userName.value === '' || password === ''){
    message.innerText = "Please Fill Out the Form to Continue"
    message.style.display ="inline"
    return
  }
  await fetch("https://restapi-production-b64d.up.railway.app/logIn",{
    method : "post",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body : JSON.stringify({
      user:userName.value,
      password:password.value
    })
  })
  .then(response => response.json())
  .then(async (json) => {
    if(json.message){
      message.innerText = "Password or UserName is Invaild"
      message.style.display ="inline"
      return console.log(json.message)
    }
    let user = json
    console.log(json)
    sessionStorage.setItem("user",json.usersName)
  
    window.location.pathname = "../html/home.html"
    return
  })
})




