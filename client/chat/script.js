const socket = io();

socket.on("connect", ()=>{
    const url = "http://localhost:4000/convo";
    fetch(url, {method: "GET"})
    .then((response)=>{
        return response.json();
    })
    .then((data) =>{
        data.forEach((item)=>{
            const { user_id } = JSON.parse(localStorage.getItem("user"));
           
            const li = document.createElement("LI");
            li.classList.add(`bot__output`);
            li.classList.add(`bot__output--standard`);
             if(user_id==item.user_id){
                li.className = "my-message";
                li.innerHTML = `<p>${item.message_text}</p>`;

            } else {
                
                li.className = "others-message";
                li.innerHTML = `<p>${item.message_text}</p>`;
            }

         
            document.querySelector("#chatlist").appendChild(li);
        });
    })
});
        
socket.on("chat", (messageObj)=>{
    const { user_id } = JSON.parse(localStorage.getItem("user"));
           
            const li = document.createElement("LI");
            li.classList.add(`bot__output`);
            li.classList.add(`bot__output--standard`);
             if(user_id==messageObj.user_id){
                li.className = "my-message";
                li.innerHTML = `<p>${messageObj.message_text}</p>`;

            } else {
                
                li.className = "others-message";
                li.innerHTML = `<p>${messageObj.message_text}</p>`;
            }

         
            document.querySelector("#chatlist").appendChild(li);
    // const li = document.createElement("LI");
    // li.classList.add(`bot__output`);
    // li.classList.add(`bot__output--standard`);
    
    // li.textContent = messageObj.message_text;

    // document.querySelector("#chatlist").appendChild(li);

//scroll to the bottom of chat window

});



const chatBox = document.querySelector("#chatbox");
const sendBtn = document.querySelector("#sendbtn");

chatBox.addEventListener("keydown", handleSend);
sendBtn.addEventListener("click", handleClick);

function handleSend(e){

    
    
}

function handleClick(e){
    e.preventDefault();

    const { user_id } = JSON.parse(localStorage.getItem("user"));

    const chatBoxContent = document.querySelector("#chatbox").value;
    const messageObj = {
        user_id: user_id,
        message_text: chatBoxContent
    }
    socket.emit("chat", messageObj);
    chatBox.value = "";
}