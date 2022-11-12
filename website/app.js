/* Global Variables */
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const feelings = document.getElementById("feelings");
const content = document.querySelector("#content");
const zip = document.getElementById("zip");
const generate = document.getElementById("generate");

// Personal API Key for OpenWeatherMap API
const apiKey = "79507136dcf16377b6e098bc04cc8866&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", onGenerateClick);

/* Function called by event listener */
function onGenerateClick(event) {
    event.preventDefault();
    const api = `https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&appid=${apiKey}`;
    //promise chaining
    if (zip !== "" && zip.value.length == 5) {
        ApiData(api).then((data) => {
            post("/add", data).then(() => {
                get("/all").then((data) => {
                    updateUI(data);
                });
            });
        });
    } else {
        alert("Wrong zip code or fill all inputs");
    }
}

/* Function to GET Web API Data*/
const ApiData = async (api) => {
    const fetchApiData = await (await fetch(api)).json();
    //   console.log(fetchApiData.cod);
    if (fetchApiData.cod == 404 || fetchApiData.cod == 400) {
        console.log(fetchApiData.message);
    } else {
        try {
            const newData = {
                newDate,
                feelings: feelings.value,
                temp: fetchApiData.main.temp,
            };
            return newData;
        } catch (e) {
            console.error(e);
        }
    }
};

/* Function to POST data */
const post = async (url = "", data = {}) => {
    const res = await (
        await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
    ).json();
    try {
        return res;
    } catch (e) {
        console.error(e);
    }
};

/* Function to GET Project Data */
const get = async (url) => {
    const res = await (await fetch(url)).json();
    try {
        return res;
    } catch (e) {
        console.error(e);
    }
};

/* Function to update the interface */
const updateUI = async (data) => {
    const res = await data;
    if(res.newDate){
        document.querySelector('#error').style.display ="block";
    date.innerHTML=`Date: ${res.newDate}`;
    temp.innerHTML=`Temperature: ${res.temp}`;
    content.innerHTML=`Your feelings: ${res.feelings}`;
    document.querySelector('#error').style.display ="none";
    }
    else{
        document.querySelector('#error').style.display ="none";
        document.querySelector('#error').style.display ="block";
        document.querySelector('#error').innerHTML=res.message;
    }


};
