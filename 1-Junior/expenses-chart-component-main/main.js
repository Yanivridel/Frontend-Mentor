let today = "wed";
const bars = document.getElementsByClassName("bar");

async function fetchJson(path) {
    try {
        const response = await fetch(path);
        return response.json();
    }
    catch(err) {
        console.log("Error fetching Data:", err);
    }
}

async function main() {
    const data = await fetchJson('./data.json');

    for(let i=0; i< data.length; i++) {
        if(data[i].day === today)
            bars[i].classList.add("today");
        bars[i].style.height = data[i].amount*3 + "px";

        const popUp = document.querySelector(`.${data[i].day} .pop-up-data`);
        popUp.textContent = "$" + data[i].amount;
    }

    console.log(data);  
}

main();