

let allVillas = [];


/* LOAD VILLAS */

async function loadVillas(){

    const response =
    await fetch(
        "http://localhost:3000/villas"
    );

    const villas =
    await response.json();

    allVillas = villas;

    showVillas(villas);

}

loadVillas();



/* SHOW VILLAS */

function showVillas(villas){

    const productGrid =
    document.getElementById(
        "productGrid"
    );

    let data = "";

    for(let i = 0; i < villas.length; i++){

        data += `

        <div class="card">

            <img src="${villas[i].image}">

            <div class="card-content">

                <h3>${villas[i].name}</h3>

                <p>₹ ${villas[i].price}</p>

                <p>⭐ ${villas[i].rating}</p>

                <p>${villas[i].reviews} Reviews</p>

                <button
                onclick="bookNow('${villas[i].id}')">

                    Book Now

                </button>

            </div>

        </div>

        `;

    }

    productGrid.innerHTML = data;

}



/* BOOK NOW */

async function bookNow(villaId){

    const user =
    JSON.parse(
        localStorage.getItem(
            "loggedUser"
        )    
    );

    if(!user){

        alert(
            "Please Login First"
        );

        return;

    }

    let villa;

    for(let i = 0; i < allVillas.length; i++){

        if(allVillas[i].id == villaId){

            villa = allVillas[i];

        }

    }

    const bookingDate =
    new Date().toLocaleDateString();

    await fetch(

        "http://localhost:3000/bookings",

        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                userName:user.name,
                userEmail:user.email,
                villaName:villa.name,
                villaPrice:villa.price,
                bookingDate:bookingDate

            })

        }

    );

    alert(
        "Villa Booked Successfully"
    );

}



/* SEARCH */

const searchBtn =
document.getElementById(
    "searchBtn"
);

searchBtn.addEventListener(

    "click",

    function(){

        const value =
        document.getElementById(
            "searchInput"
        ).value.toLowerCase();

        let filtered = [];

        for(let i = 0; i < allVillas.length; i++){

            if(
                allVillas[i].name
                .toLowerCase()
                .includes(value)
            ){

                filtered.push(
                    allVillas[i]
                );

            }

        }

        showVillas(filtered);

    }

);



/* SIDEBAR */

const sidebar =
document.getElementById(
    "sidebar"
);

const menuBtn =
document.getElementById(
    "menuBtn"
);

const closeBtn =
document.getElementById(
    "closeBtn"
);

menuBtn.addEventListener(

    "click",

    function(){

        sidebar.classList.add(
            "active"
        );

    }

);

closeBtn.addEventListener(

    "click",

    function(){

        sidebar.classList.remove(
            "active"
        );

    }

);



/* EXPLORE BUTTON */

const exploreBtn =
document.getElementById(
    "exploreBtn"
);

exploreBtn.addEventListener(

    "click",

    function(){

        document.querySelector(
            ".products"
        ).scrollIntoView({

            behavior:"smooth"

        });

        showVillas(allVillas);

    }

);



/* SIGNUP POPUP */

const signupPopup =
document.getElementById(
    "signupPopup"
);

function openSignup(){

    signupPopup.style.display =
    "flex";

}

function closeSignup(){

    signupPopup.style.display =
    "none";

}



/* LOGIN POPUP */

const loginPopup =
document.getElementById(
    "loginPopup"
);

function openLogin(){

    loginPopup.style.display =
    "flex";

}

function closeLogin(){

    loginPopup.style.display =
    "none";

}



/* SIGNUP USER */

async function signupUser(){

    const name =
    document.getElementById(
        "signupName"
    ).value;

    const email =
    document.getElementById(
        "signupEmail"
    ).value;

    const password =
    document.getElementById(
        "signupPassword"
    ).value;

    await fetch(

        "http://localhost:3000/users",

        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                name:name,
                email:email,
                password:password

            })

        }

    );

    alert(
        "Signup Successful"
    );

    closeSignup();

    openLogin();

}



/* LOGIN USER */

async function loginUser(){

    const email =
    document.getElementById(
        "loginEmail"
    ).value;

    const password =
    document.getElementById(
        "loginPassword"
    ).value;

    const response =
    await fetch(
        "http://localhost:3000/users"
    );

    const users =
    await response.json();

    let validUser = null;

    for(let i = 0; i < users.length; i++){

        if(

            users[i].email == email &&

            users[i].password == password

        ){

            validUser = users[i];

        }

    }

    if(validUser){

        localStorage.setItem(

            "loggedUser",

            JSON.stringify(validUser)

        );

        alert(
            "Login Successful"
        );

        closeLogin();

    }

    else{

        alert(
            "Invalid Email or Password"
        );

    }

}



/* PROFILE */

const profilePopup =
document.getElementById(
    "profilePopup"
);

function openProfile(){

    const user =
    JSON.parse(
        localStorage.getItem(
            "loggedUser"
        )
    );

    if(!user){

        alert(
            "Please Login First"
        );

        return;

    }

    profilePopup.style.display =
    "flex";

    document.getElementById(
        "profileName"
    ).innerText = user.name;

    document.getElementById(
        "profileData"
    ).innerHTML = `

        <p>Email : ${user.email}</p>

    `;

}

function closeProfile(){

    profilePopup.style.display =
    "none";

}



/* LOGOUT */

function logoutUser(){

    localStorage.removeItem(
        "loggedUser"
    );

    alert(
        "Logout Successful"
    );

    location.reload();

}



/* SIDEBAR CLOSE */

const sidebarLinks =
document.querySelectorAll(
    ".sidebar a"
);

for(let i = 0; i < sidebarLinks.length; i++){

    sidebarLinks[i].addEventListener( 

        "click",

        function(){

            sidebar.classList.remove(
                "active"
            );

        }

    );

}    