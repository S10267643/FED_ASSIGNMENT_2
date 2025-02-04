
document.addEventListener("DOMContentLoaded", () => {
    const APIKEY = "67a057fa417fee624eb30f33";
    const signupForm = document.getElementById("signup");

    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const passwordConfirm = document.getElementById("confirm_password").value.trim();

        if (!email || !password || !passwordConfirm) {
            alert("Email and Password fields cannot be empty!");
            return;
        }

        /* Check password length and if it contains at least one number*/
        if (password.length < 8 || password.length > 20 || !/\d/.test(password)) {
            alert("Password must be between 8 and 20 characters long and include at least one number.");
            return;
        }

        if (password !== passwordConfirm) {
            alert("The passwords do not match!");
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

        function generateUniqueID() {
            return 'user_' + $;{Date.now()} + '_' + $;{Math.floor(Math.random() * 10000)};
        }

        const message = {
            "email": email,
            "passwd": password,
            'bio': 'unknown',
            'avatar': 'unknown',
            'name': 'unknown',
            usrid: generateUniqueID()
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

        try {
            const response = await fetch("https://mokesell-536e.restdb.io/rest/users  ", settings);

            if (!response.ok) {
                throw new Error(HTTP error! Status: ${response.status});
            }
            const result = await response.json();
            let userid = result._id;
            localStorage.setItem("userid", userid);
            alert("Sign Up successful!", result);

            window.location.assign("login.html");
        } catch (error) {
            console.error("Error occurred while signing up:", error);
            alert("An error occurred. Please try again.");
        }
    });
});
document.addEventListener("DOMContentLoaded", function(){
    APIKEY="67971683f9d2bb616f181e2b";
    
    
    let login = document.getElementById("login")
    login.addEventListener("submit",  async  function (event){
    event.preventDefault();
    let email = document.getElementById("email").value
    let passwd = document.getElementById("passwd").value
    
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
      let search = await fetch("https://assignmentfed-fb7a.restdb.io/rest/account", settings)
      
      const data = await search.json();
        let check = false;
         for(let i of data){
            if(i.email===email && i.passwd===passwd){
                alert("Log in successful. Welcome to FindSell!")
                check=true;
                localStorage.setItem("usrid",i.usrid)
                localStorage.setItem("usremail",i.email)
                localStorage.setItem("usrpasswd",i.passwd)
             
                window.location.assign("index2.html")
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

