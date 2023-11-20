const registerBtn = document.querySelector("#registerbtn");

registerBtn.addEventListener("click", handleRegister);

function handleRegister(e) {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const userlast = document.querySelector("#userlast").value;
    const useremail = document.querySelector("#useremail").value;
    const userpassword = document.querySelector("#userpassword").value;
    const usercpass = document.querySelector("#usercpasss").value;

    const userObj = {
        username: username,
        userlast: userlast,
        useremail: useremail,
        userpassword: userpassword,
        usercpass: usercpass,
    };

    sendData(userObj);
}

function sendData(userObj) {
    const url = "http://localhost:4000/register";
    const options = {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            alert(data.message);
        })
        .catch((error) => {
            console.error("Error:", error);
            
            alert("An error occurred while registering. Please try again.");
        });
}


// const registerBtn = document.querySelector("#registerbtn");

// registerBtn.addEventListener("click", handleRegister);



// function handleRegister(e){

//     e.preventDefault();
//     const username = document.querySelector("#username").value;
//     const userlast =document.querySelector("#userlast").value;
//     const useremail = document.querySelector("#useremail").value;

//     const userpassword = document.querySelector("#userpassword").value;

//     const usercpass = document.querySelector("#usercpasss").value;

//     const userObj = {
//         username:username,
//         userlast:userlast,
//         useremail:useremail,
//         userpassword:userpassword,
//         usercpass:usercpass
        
//     }
//     sendData(userObj);
// }

// function sendData(userObj){

//     const url = "http://localhost:4000/register";
//     const options = {
//         method: "POST",
//         body: JSON.stringify(userObj),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }
    
//     fetch(url, options)
//     .then((response) =>{
//         return response.json();
//     })
//     .then((data) =>{
//        alert(data.message);
    
//     });
// }