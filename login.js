Villas

const houses = [

{
    id:1,
    name:"Royal Pool Villa",
    price:"12,000/night",
    rating:"4.9 ",
    reviews:"320 Reviews",
    image:"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop"
},

{
    id:2,
    name:"Ocean Breeze Villa",
    price:"18,000/night",
    rating:"4.8 ",
    reviews:"250 Reviews",
    image:"https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1200&auto=format&fit=crop"
},

{
    id:3,
    name:"Luxury Pool Villa",
    price:"15,500/night",
    rating:"4.7 ",
    reviews:"210 Reviews",
    image:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop"
},

{
    id:4,
    name:"Night Party House",
    price:"22,000/night",
    rating:"5.0 ",
    reviews:"450 Reviews",
    image:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
},
{
    id:5,
    name:"Skyline Luxury Villa",
    price:"20,000/night",
    rating:"4.9 ",
    reviews:"410 Reviews",
    image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
},

{
    id:6,
    name:"Palm Beach House",
    price:"16,500/night",
    rating:"4.8 ",
    reviews:"290 Reviews",
    image:"https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=1200&auto=format&fit=crop"
},

{
    id:7,
    name:"Moonlight Party Villa",
    price:"25,000/night",
    rating:"5.0 ",
    reviews:"510 Reviews",
    image:"https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop"
},

{
    id:8,
    name:"Royal Garden Villa",
    price:"18,500/night",
    rating:"4.7 ",
    reviews:"340 Reviews",
    image:"https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200&auto=format&fit=crop"
},

{
    id:9,
    name:"Sunset Pool House",
    price:"21,000/night",
    rating:"4.9 ",
    reviews:"470 Reviews",
    image:"https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200&auto=format&fit=crop"
},

{
    id:10,
    name:"Golden Palace Villa",
    price:"30,000/night",
    rating:"5.0 ",
    reviews:"620 Reviews",
    image:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200&auto=format&fit=crop"
},

{
    id:11,
    name:"Night Club Villa",
    price:"24,500/night",
    rating:"4.8 ",
    reviews:"390 Reviews",
    image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop"
},

{
    id:12,
    name:"Ocean Dream House",
    price:"19,000/night",
    rating:"4.9 ",
    reviews:"430 Reviews",
    image:"https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200&auto=format&fit=crop"
},

{
    id:13,
    name:"White Pearl Villa",
    price:"27,000/night",
    rating:"5.0 ",
    reviews:"580 Reviews",
    image:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
},
//jdjsn dsj 
{
    id:14,
    name:"Elite Party Mansion",
    price:"35,000/night",
    rating:"5.0 ",
    reviews:"720 Reviews",
    image:"https:.images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop"
}

];
async function bookNow(villaId){

    const user = JSON.parse(localStorage.getItem("loggedUser"));

    if(!user){
        alert("Please Login First");
        openLogin();
        return;
    } 

    const villa = allVillas.find(v => v.id == villaId);

    if(!villa){
        alert("Villa not found!");
        return;
    }

    const bookingDate = new Date().toLocaleDateString();

    await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userName: user.name,
            userEmail: user.email, 
            villaName: villa.name,
            villaPrice: villa.price,
            bookingDate: bookingDate
        })
    });

    alert("Villa Booked Successfully");

    localStorage.setItem("newBooking", "true");
}
let allVillas = [];

 
loadVillas();

async function loadVillas(){

    const response =
    await fetch(
        "http://localhost:3000/villas"
    );

    const villas =
    await response.json();

    allVillas = villas;

    displayProducts(villas);

}



function displayProducts(villas){

    const productGrid =
    document.getElementById(
        "productGrid"
    );

    productGrid.innerHTML = "";

    villas.forEach((villa)=>{

        productGrid.innerHTML += `

        <div class="card">

            <img src="${villa.image}">

            <div class="card-content">

                <h3>${villa.name}</h3>

                <p class="price">
                    ₹ ${villa.price}
                </p>

                <p class="rating">
                    ⭐ ${villa.rating}
                </p>

                <p class="review">
                    ${villa.reviews} Reviews
                </p>

                <button
                onclick="bookNow('${villa.id}')">

                    Book Now

                </button>

            </div>

        </div>

        `;

    });

}




const productGrid =
document.getElementById("productGrid");







const searchBtn =
document.getElementById(
    "searchBtn"
);

searchBtn.addEventListener(
    "click",

    ()=>{

        const value =
        document.getElementById(
            "searchInput"
        ).value.toLowerCase();

        const filtered = 
        allVillas.filter((villa)=>{

            return villa.name
            .toLowerCase()
            .includes(value);

        });

        displayProducts(filtered);

    }

);



const sidebar =
document.getElementById("sidebar");

const menuBtn =
document.getElementById("menuBtn");

const closeBtn =
document.getElementById("closeBtn");

menuBtn.addEventListener("click", ()=>{

    sidebar.classList.add("active");

});

closeBtn.addEventListener("click", ()=>{

    sidebar.classList.remove("active");

});



const exploreBtn =
document.getElementById("exploreBtn");

exploreBtn.addEventListener("click", ()=>{

    document.querySelector(".products")
    .scrollIntoView({

        behavior:"smooth"

    });

    displayProducts(houses);

});



async function bookNow(villaId){

   

    const user =
    JSON.parse(
        localStorage.getItem("loggedUser")
    );

    

    if(!user){

        alert("Please Login First");

        openLogin();

        return;

    }

    const villa =
allVillas.find((item)=>{

    return item.id == villaId;

});

    

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

    )

    .then(()=>{

        alert(
            "Villa Booked Successfully"
        );

        

        localStorage.setItem(
            "newBooking",
            "true"
        );

    })

    .catch(()=>{

        alert(
            "Booking Failed"
        );

    });

}



const signupPopup =
document.getElementById("signupPopup");

const loginPopup =
document.getElementById("loginPopup");

function openSignup(){

    signupPopup.style.display = "flex";

}

function closeSignup(){

    signupPopup.style.display = "none";

}

function openLogin(){

    loginPopup.style.display = "flex";

}

function closeLogin(){

    loginPopup.style.display = "none";

}



async function signupUser(){

    const name =
    document.getElementById("signupName").value;

    const email =
    document.getElementById("signupEmail").value;

    const mobile =
    document.getElementById("signupMobile").value;

    const password =
    document.getElementById("signupPassword").value;

    const confirmPassword =
    document.getElementById("confirmPassword").value;

    const address =
    document.getElementById("signupAddress").value;

    const image =
    document.getElementById("signupImage").value;

    

    if(
        name === "" ||
        email === "" ||
        mobile === "" ||
        password === "" ||
        confirmPassword === "" ||
        address === ""
    ){

        alert("Please fill all details");

        return;

    }

   

    if(password !== confirmPassword){

        alert("Passwords do not match");

        return;

    }

    
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
                mobile:mobile,
                password:password,
                address:address,
                image:image

            })

        }

    )

    .then(()=>{

        alert("Signup Successful");

        closeSignup();

        openLogin();

    })

    .catch(()=>{

        alert("Signup Failed");

    });

}



async function loginUser(){

    const email =
    document.getElementById("loginEmail").value;

    const password =
    document.getElementById("loginPassword").value;

    const api =
    await fetch(
        "http://localhost:3000/users"
    );

    const users =
    await api.json();

    const validUser =
    users.find((user)=>{

        return (

            user.email === email &&

            user.password === password

        );

    });

    if(validUser){


        localStorage.setItem(
            "loggedUser",
            JSON.stringify(validUser)
        );

        alert(
            "Welcome " + validUser.name
        );

        closeLogin();

    }

    else{

        alert(
            "Invalid Email or Password"
        );

    }

}



const profilePopup =
document.getElementById("profilePopup");

function openProfile(){

    const user =
    JSON.parse(
        localStorage.getItem("loggedUser")
    );

    if(!user){

        alert("Please Login First");

        return;

    }

    profilePopup.style.display = "flex";

    

    document.getElementById(
        "profileName"
    ).innerText = user.name;

    

    const profileData =
    document.getElementById("profileData");

    profileData.innerHTML = `

        <p>
            <strong>Email :</strong>
            ${user.email}
        </p>

        <p>
            <strong>Mobile :</strong>
            ${user.mobile}
        </p>

        <p>
            <strong>Address :</strong>
            ${user.address}
        </p>

    `;

}

function closeProfile(){

    profilePopup.style.display = "none";

}



function logoutUser(){

    const confirmLogout =
    confirm(
        "Are you sure you want to logout?"
    );

    if(confirmLogout){

        localStorage.removeItem(
            "loggedUser"
        );

        alert("Logout Successful");

        location.reload();

    }

}
const sidebarLinks = document.querySelectorAll(".sidebar a");

sidebarLinks.forEach(link => {
    link.addEventListener("click", () => {

        
        sidebar.classList.remove("active");

    });
});