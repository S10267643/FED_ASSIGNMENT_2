
document.addEventListener("DOMContentLoaded", () => {
    const APIKEY = "67a057fa417fee624eb30f33";
    const signupForm = document.getElementById("signup");

    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const name= document.getElementById("name").value.trim();
        

        if (!email || !password ) {
            alert("Email and Password fields cannot be empty!");
            return;
        }

        /* Check password length and if it contains at least one number*/
        if (password.length < 8 || password.length > 20 || !/\d/.test(password)) {
            alert("Password must be between 8 and 20 characters long and include at least one number.");
            return;
        }

       

        const set = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache",
            },
        };
        const check = await fetch("https://mokesell-536e.restdb.io/rest/users  ", set);
        const data = await check.json();

        

        const message = {
            "UserEmail": email,
            "UserPassword": password,
            'UserName': name,
            
        };

        for (let i of data) {
            if (i.email === email) {
                alert("This email has been registered!");
                return;
            }
        }

        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify(message),
        };

        
    });
});
document.addEventListener("DOMContentLoaded", function(){
    APIKEY="67a057fa417fee624eb30f33";
    
    
    let loginForm = document.getElementById("login")
    login.addEventListener("submit",  async  function (event){
    event.preventDefault();
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    
    if (!email || !passwd) {
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
      try{                   
      let search = await fetch("https://mokesell-536e.restdb.io/rest/users ", settings)
      
      const data = await search.json();
        let check = false;
         for(let i of data){
            if(i.email===email && i.password===password){
                alert("Log in successful. Welcome to FindSell!")
                check=true;
               
                localStorage.setItem("UserEmail",i.email)
                localStorage.setItem("UserPassword",i.password)
             
                
                break;
            }
         }
         if(!check){
            alert("Invalid email or password, try again.")
         }
      }
    catch(error){
        alert("Error Occurred during login. Please try again",error)
    }
    })
})
