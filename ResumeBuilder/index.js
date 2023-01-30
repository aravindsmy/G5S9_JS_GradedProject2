// function to predefined user to the local storage
function pushUserstoLocalStorage() {
    
    // function variables
    var allUsers = new Array();
    user1 = new Object();
    user2 = new Object();
    const msg = "Successful";

    // try catch method to check whether the user already logged or not.
    try {
        var checkLogin = sessionStorage.getItem("login");
        if ( checkLogin === msg ){
            window.history.forward(); // function to restrict from going back to the login page
        }
    } catch (error) {
        console.log(error);
    }

    // constructing user1 object
    user1 = {
        name: "Aravind",
        password: btoa("Anil"), // password with the encryption
    };

    // constructing user2 object
    user2 = {
        name: "Anil",
        password: btoa("Reddy")
    };

    // pushing users to the array element
    allUsers.push(user1);
    allUsers.push(user2);

    // pushing users to the local storage
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
}

// Login function
function Login() {

    let allUsers = JSON.parse(localStorage.getItem("allUsers")); // get user objects from the local storage

    const hash = Object.fromEntries( allUsers.map((e) => [e.name, e.password])); // creating object from the users array

    // get value from DOM nodes
    var username = document.getElementById("uname").value;
    var password = document.getElementById("psw").value;
    let flag = false;
    
    // loop function to check the credentials
    for ( let key in hash ) {
        if ( key === username && atob(hash[key]) === password ) {
            alert("login Successful");
            flag = true;
            sessionStorage.setItem("login", "Successful");
            window.location.href = "./src/resume-viewer.html";
            break;
        } else {
            flag = false;
        }
    }

    if ( !flag ) {
        alert("invalid Username/Password !");
    }
}