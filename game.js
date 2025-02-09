
    async function updateMokePoints() {
        
        let username = localStorage.getItem("username"); // Retrieve logged-in user's email



        try {
            let settings = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache",
                }};
      
            alert("updateMokePoints");
            console.log(APIforpoints.replace("xxx",username));
            // Step 1: Fetch the user's account data from RestDB
            response = await fetch(APIforpoints.replace("xxx",username), settings);
            user = await response.json();
                    
            alert("User");
           
            let newMokePoints = (user[0].mokepoints || 0) + 100; // Add 100 points
            console.log(user);
            console.log(JSON.stringify({ mokepoints: newMokePoints }))
            // Step 2: Send a PATCH request to update the user's MokePoints
            let updateResponse = await fetch(APIaccounts + "/" + user[0]._id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                },

                body: JSON.stringify({ mokepoints: newMokePoints })
                
            });

            if (updateResponse.ok) {
                alert(`Level Completed! Gained 100 MokePoints! Total: ${newMokePoints}`);
                window.location.href = 'index.html'; // Redirect after update
            } else {
                alert("Error updating MokePoints. Please try again.");
                //window.location.href = 'index.html'; // Redirect after update
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Failed to update MokePoints.");
            //window.location.href = 'index.html'; // Redirect after update
        }
    }