document.addEventListener("DOMContentLoaded", function(){
    APIKEY="67a057fa417fee624eb30f33";
    let loginForm = document.getElementById("login")
    
  login.addEventListener("submit",  async  function (event){
   event.preventDefault();
   let email = document.getElementById("email").value
   let password = document.getElementById("password").value
        if (!email || !password) {
        alert("Email and Password cannot be empty!");
        return;
    }
    let settings = {
        method:"GET",
        headers:{
           "Content-Type": "application/json",
           "x-apikey": APIKEY,
           "Cache-Control": "no-cache",
           
        }
     };
      try{let search = await fetch("https://mokesell-536e.restdb.io/rest/accounts  ", settings)
     
      const data = await search.json();
        let check = false;
         for(let i of data){
            if(i.email===email && i.password===password){
                alert("Log in successful. Welcome to FindSell!")   
                check=true;
              
                localStorage.setItem("email",i.email)
                localStorage.setItem("password",i.password)
            
               
                break;
            }
        }
         if(!check){
            alert("Invalid email or password, try again.")
         }
      }     catch(error){
       alert("Error Occurred during login. Please try again",error)
    }
    })
})
g