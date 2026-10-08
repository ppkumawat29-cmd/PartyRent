function updateChart(type) {

    let newData = [];
    let label = "";

    if (type === "orders") {
        label = "Orders";
        newData = [12, 19, 8, 15, 20, 25];
    }

    if (type === "users") {   
        label = "Users";
        newData = [5, 10, 20, 30, 40, 60];
    }

    if (type === "revenue") {
        label = "Revenue";
        newData = [100, 300, 200, 500, 400, 700];
    }

    
    myChart.data.datasets[0].label = label;
    myChart.data.datasets[0].data = newData;

    myChart.update();

   
    document.querySelectorAll(".graph-controls button")
    .forEach(btn => btn.classList.remove("active"));

    event.target.classList.add("active");
}


function adminLogin(){

    const email =
    document.getElementById("adminEmail").value;

    const password =
    document.getElementById("adminPassword").value;

    if(

        email === "pv@gmail.com"

        &&

        password === "pv24"

    ){

        document.getElementById(
            "adminLogin"
        ).style.display = "none";

        document.getElementById(
            "dashboard"
        ).style.display = "block";

        loadDashboard();
        showSection("dashboard");

    }

    else{

        alert(
            "Invalid Admin Login"
        );

    }

}
function showSection(section) {

    
    document.querySelector(".cards").style.display = "none";
    document.querySelector(".graphs").style.display = "none";
    document.querySelector(".booking-table").style.display = "none";
    document.getElementById("usersSection").style.display = "none";
    document.getElementById("villaSection").style.display = "none";


    if (section === "dashboard") {
        document.querySelector(".cards").style.display = "grid";
        document.querySelector(".graphs").style.display = "grid";
        document.querySelector(".booking-table").style.display = "block";
    }

    if (section === "users") {
        document.getElementById("usersSection").style.display = "block";
    }

    if (section === "villas") {
        document.getElementById("villaSection").style.display = "block";
    }
    
    document.querySelector(".sidebar").classList.remove("active");
    document.querySelector(".main").classList.remove("full");
}



loadVillas();

async function loadVillas(){

    const api =
    await fetch(
        "http://localhost:3000/villas"
    );

    const villas =
    await api.json();

    const villaData =
    document.getElementById(
        "villaData"
    );

    villaData.innerHTML = "";

    villas.forEach((villa)=>{

        villaData.innerHTML += `

            <tr>

                <td>

                    <img src="${villa.image}">

                </td>

                <td>

                    ${villa.name}

                </td>

                <td>

                    ${villa.price}

                </td>

                <td>

                    ${villa.rating}

                </td>

                <td>

                    ${villa.reviews}

                </td>

                <td>

                    <button
                    class="edit-btn"
                    onclick="editVilla(${villa.id})">

                        Edit

                    </button>

                    <button
                    class="delete-btn"
                    onclick="deleteVilla('${villa.id}')">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}



async function addVilla(){

    const name =
    document.getElementById(
        "villaName"
    ).value;

    const price =
    document.getElementById(
        "villaPrice"
    ).value;

    const rating =
    document.getElementById(
        "villaRating"
    ).value;

    const reviews =
    document.getElementById(
        "villaReviews"
    ).value;

    const image =
    document.getElementById(
        "villaImage"
    ).value;

    // Validation

    if(

        name === "" ||

        price === "" ||

        rating === "" ||

        reviews === "" ||

        image === ""

    ){

        alert(
            "Please Fill All Details"
        );

        return;

    }

    await fetch(

        "http://localhost:3000/villas",

        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                name:name,
                price:price,
                rating:rating,
                reviews:reviews,
                image:image

            })

        }

    )

    .then(()=>{

        alert(
            "Villa Added Successfully"
        );

        // Clear Inputs

        document.getElementById(
            "villaName"
        ).value = "";

        document.getElementById(
            "villaPrice"
        ).value = "";

        document.getElementById(
            "villaRating"
        ).value = "";

        document.getElementById(
            "villaReviews"
        ).value = "";

        document.getElementById(
            "villaImage"
        ).value = "";

        loadVillas();

    });

}



async function deleteVilla(id) {

    console.log("Deleting villa id:", id);

    if (!id) {
        alert("ID not found!");
        return;
    }

    const confirmDelete = confirm("Are you sure?");

    if (!confirmDelete) return;

    try {
        const res = await fetch(`http://localhost:3000/villas/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            throw new Error("Delete failed");
        }

        alert("Villa deleted successfully!");
        loadVillas();

    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
}



async function editVilla(id){

    const newName =
    prompt(
        "Enter New Villa Name"
    );

    if(newName == null){

        return;

    }

    await fetch(

        `http://localhost:3000/villas/${id}`,

        {

            method:"PATCH",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                name:newName

            })

        }

    );

    alert(
        "Villa Updated Successfully"
    );

    loadVillas();

}
let myChart;


async function loadDashboard(){

   

    const userApi =
    await fetch(
        "http://localhost:3000/users"
    );

    const users =
    await userApi.json();

    document.getElementById(
        "usersCount"
    ).innerText = users.length;

    

const usersData =
document.getElementById(
    "usersData"
);

usersData.innerHTML = "";

users.forEach((user,index)=>{

    usersData.innerHTML += `

        <tr>

            <td>
                ${index + 1}
            </td>

            <td>
                ${user.name}
            </td>

            <td>
                ${user.email}
            </td>

            <td>
                ${user.mobile}
            </td>

            <td>
                ${user.address}
            </td>

        </tr>

    `;

});

   

    const bookingApi =
    await fetch(
        "http://localhost:3000/bookings"
    );

    const bookings =
    await bookingApi.json();

    document.getElementById(
        "ordersCount"
    ).innerText = bookings.length;

    

    const bookingData =
    document.getElementById(
        "bookingData"
    );

    bookingData.innerHTML = "";

    bookings.forEach((item)=>{

        bookingData.innerHTML += `

            <tr>

                <td>
                    ${item.userName}
                </td>

                <td>
                    ${item.userEmail}
                </td>

                <td>
                    ${item.villaName}
                </td>

                <td>
                    ${item.villaPrice}
                </td>

                <td>
                    ${item.bookingDate}
                </td>

            </tr>

        `;

    });

    
const ctx = document.getElementById("barChart");

myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            label: "Orders",
            data: [12, 19, 8, 15, 20, 25],
            backgroundColor: "#7c3aed"
        }]
    }
});


    new Chart(

        document.getElementById(
            "pieChart"
        ),

        {

            type:"pie",

            data:{

                labels:[
                    "Pool Villa",
                    "Luxury Villa",
                    "Party House",
                    "Beach Villa"
                ],

                datasets:[{

                    data:[
                        30,
                        25,
                        20,
                        25
                    ],

                    backgroundColor:[
                        "#7c3aed",
                        "#2563eb",
                        "#16a34a",
                        "#ea580c"
                    ]

                }]

            }

        }

    );

    

    new Chart(

        document.getElementById(
            "lineChart"
        ),

        {

            type:"line",

            data:{

                labels:[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun"
                ],

                datasets:[{

                    label:"Users",

                    data:[
                        5,
                        12,
                        18,
                        22,
                        35,
                        50
                    ],

                    borderColor:"#7c3aed",

                    backgroundColor:
                    "rgba(124,58,237,0.2)",

                    fill:true,

                    tension:0.4

                }]

            }

        }

    );

    
    new Chart(

        document.getElementById(
            "doughnutChart"
        ),

        {

            type:"doughnut",

            data:{

                labels:[
                    "Bookings",
                    "Premium",
                    "Ads",
                    "Events"
                ],

                datasets:[{

                    data:[
                        45,
                        25,
                        15,
                        15
                    ],

                    backgroundColor:[
                        "#7c3aed",
                        "#2563eb",
                        "#16a34a",
                        "#ea580c"
                    ]

                }]

            }

        }

    );

}


window.addEventListener("focus", ()=>{

    const bookingUpdate =
    localStorage.getItem(
        "newBooking"
    );

    if(bookingUpdate === "true"){

        

        document.getElementById(
            "bookingData"
        ).innerHTML = "";

        document.getElementById(
            "usersData"
        ).innerHTML = "";

        

        loadDashboard();

        

        localStorage.removeItem(
            "newBooking"
        );

    }

});


function toggleSidebar(){

    const sidebar =
    document.querySelector(
        ".sidebar"
    );

    const main =
    document.querySelector(
        ".main"
    );

    sidebar.classList.toggle(
        "active"
    );

    main.classList.toggle(
        "full"
    );

}


function logoutAdmin(){

    const confirmLogout =
    confirm(
        "Are you sure you want to logout?"
    );

    if(confirmLogout){

        location.reload();

    }

}