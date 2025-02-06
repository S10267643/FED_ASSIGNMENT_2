


//signup 
document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "67a057fa417fee624eb30f33";

//[STEP 1]: Create our submit form listener
document.getElementById("acct_submit").addEventListener("click", function (e) {
    // Prevent default action of the button 
    e.preventDefault();

    //[STEP 2]: Let's retrieve form data
    // For now, we assume all information is valid
    // You are to do your own data validation
    let username = document.getElementById("acct_name").value;
    let email = document.getElementById("acct_email").value;
    let password = document.getElementById("acct_password").value;


    if (!email || !password ) {
        alert("Email and Password fields cannot be empty!");
        return;}

    /* Check password length and if it contains at least one number*/
    if (password.length < 8 || password.length > 20 || !/\d/.test(password)) {
        alert("Password must be between 8 and 20 characters long and include at least one number.");
        return; }

    for (let i of jsondata) {
        if (i.email === email) {
        alert("This email has been registered!");
        return;}}

    //[STEP 3]: Get form values when the user clicks on send
    // Adapted from restdb API
    let jsondata = {
      "email": email,
      "username": username,
      "password": password
    };

    //[STEP 4]: Create our AJAX settings. Take note of API key
    let settings = {
      method: "POST", //[cher] we will use post to send info
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(jsondata),
      beforeSend: function () {
        //@TODO use loading bar instead
        // Disable our button or show loading bar
        document.getElementById("acct_submit").disabled = true;
        // Clear our form using the form ID and triggering its reset feature
        
      }
    }

    //[STEP 5]: Send our AJAX request over to the DB and print response of the RESTDB storage to console.
    fetch("https://mokesell-536e.restdb.io/rest/accounts", settings)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.getElementById("acct_submit").disabled = false;
        document.getElementById("signup").reset();
      });
      
  });//end click 
});



//login
document.addEventListener("DOMContentLoaded", function(){
    APIKEY="67a057fa417fee624eb30f33";
    
    let loginForm = document.getElementById("login")
    login.addEventListener("submit", async function (event){
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
         }};
     try{                   
      let search = await fetch("https://mokesell-536e.restdb.io/rest/accounts  ", settings)
      
      const jsondata = await search.json();
        let check = false;
          for(let i of jsondata){
            if(i.email===email && i.password===password){
                alert("Log in successful. Welcome to MokeSell!")
               check=true;
               
            localStorage.setItem("email",i.email)
            localStorage.setItem("password",i.password)
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