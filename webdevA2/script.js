const b1=document.querySelector("#b1");
const b2=document.querySelector("#b2");
const b3=document.querySelector("#b3");
const b4=document.querySelector("#b4");
var allpages=document.querySelectorAll(".page");

let currentpage = document.querySelector("#page1");
currentpage.classList.remove("slide-out");
currentpage.classList.add("active");

function hideall(){
    for(let pagepage of allpages){ //go through all subtopic pages
        pagepage.classList.add("slide-out"); //hide it
    }
}

function show(pgno){ //function to show selected page no
    hideall();
    const newpage=document.querySelector("#page"+pgno);
    newpage.style.display="block";
    if (currentpage == newpage) {
        currentpage.classList.remove("slide-out");
        return;
    }
    else if (currentpage) {
        currentpage.classList.remove("active");
        currentpage.classList.add("slide-out");
        currentpage.style.left = "100%";

        // Remove the slide-out class after animation
        setTimeout( function () {
        currentpage.classList.remove("slide-out");
        currentpage.style.left = "0";
        }, 500);
    }

    // Show new page
    newpage.classList.add("active");
    currentpage.style.display = "none";
    currentpage = newpage;
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
b1.addEventListener("click", function () {
show(1);
});
b2.addEventListener("click", function () {
show(2);
});
b3.addEventListener("click", function () {
show(3);
});
b4.addEventListener("click", function () {
show(4);
});
show(1);
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

////////////////////////
//////////GAME//////////
////////////////////////

const bs1=document.querySelector("#buystock1");
const bs2=document.querySelector("#buystock2");
const bs3=document.querySelector("#buystock3");
const bs4=document.querySelector("#buystock4");
const bs5=document.querySelector("#buystock5");

const ss1=document.querySelector("#sellstock1");
const ss2=document.querySelector("#sellstock2");
const ss3=document.querySelector("#sellstock3");
const ss4=document.querySelector("#sellstock4");
const ss5=document.querySelector("#sellstock5");

const nxt1=document.querySelector("#nextturn");
const res1=document.querySelector("#resetgame");

const kachingsound = new Audio("audio/kaching.mp3");

//ChatGPT my savior///
let text = document.getElementById("moneyamt").textContent; // "Current money: $1000"
let currentmoney = parseInt(text.replace(/[^\d]/g, ''));
console.log(currentmoney);

let currentstocks = [0, 0, 0, 0, 0];
let originalstockprices = [76, 30, 230, 120, 164];
let stockprices = [];
let stocknames = ["Alder Technologies", "Buckeye Develpment", "Chloroxylon Agriculture", "Karri Foresting", "Greenheart Defence"];
let newmoney = 0;
let dayspast = 0;

for (let i = 1; i < 6; i++) {
    let text = document.getElementById("stockprice"+i).textContent;
    let stockprice = parseInt(text.replace(/[^\d]/g, ''));
    stockprices.push(stockprice);
}
//////////////////////

///////  \\       //  ///////  ||\\    ||  ||||||||||
//        \\     //   //       || \\   ||      ||
///////    \\   //    ///////  ||  \\  ||      ||
//          \\ //     //       ||   \\ ||      ||
///////      \|/      ///////  ||    \\||      ||

let events = [
    {
        description: "Alder Technologies showcase new revolutionary phone, Alder Technologies + $60.",
        stockno: 0,
        affect: function(price) { return price + 60; },
    },
    {
        description: "Buckeye Devepment announces plans for new housing district, Buckeye Development + $30.",
        stockno: 1,
        affect: function(price) { return price + 30; },
    },
    {
        description: "Chloroxylon Agriculture develops new crossbread crop, Chloroxylon Agriculture + $50.",
        stockno: 2,
        affect: function(price) { return price + 50; },
    },
    {
        description: "Karri Foresting expands logging and replanting services, Karri Foresting + $20.",
        stockno: 3,
        affect: function(price) { return price + 20; },
    },
    {
        description: "Greenheart Defence develops new weapon, Greenheart Defence + $10",
        stockno: 4,
        affect: function(price) { return price + 10; },
    },
    {
        description: "War breaks out! Greenheart Defence is contracted for the war effort. Greenheart Defence + $100",
        stockno: 4,
        affect: function(price) { return price + 100; },
    },
    {
        description: "A great drought plagues the nation, Chloroxylon Agriculture's production tanks! Chloroxylon Agriculture * 0.50.",
        stockno: 2,
        affect: function(price) { return price * 0.50; },
    },
    {
        description: "Solar Flare! All technology ceases to work! All * 0.01",
        stockno: null,
        affect: function(price) { return price * 0.01; },
    },
    {
        description: "Housing bubble pops! Buckeye Development * 0.05.",
        stockno: 1,
        affect: function(price) { return price * 0.05; },
    },
    {
        description: "The world experiences a Great Recession! All * 0.30",
        stockno: null,
        affect: function(price) { return price * 0.30; },
    },
    {
        description: "The President impliments a New Deal. All * 1.20",
        stockno: null,
        affect: function(price) { return price * 1.20; },
    },
    {
        description: "Corruption Uncovered! All * 0.80",
        stockno: null,
        affect: function(price) { return price * 0.80; },
    },
    {
        description: "The Economy is AMAZING! All * 2.00",
        stockno: null,
        affect: function(price) { return price * 2.00; },
    },
    {
        description: "Government Stimulus Checks. All + $60",
        stockno: null,
        affect: function(price) { return price + 60; },
    },
    {
        description: "Great Fire of London. Buckeye Development + $30.",
        stockno: 1,
        affect: function(price) { return price + 30; },
    },
    {
        description: "Housing Loophole Patched. Buckeye Development * 0.10.",
        stockno: 1,
        affect: function(price) { return price * 0.10; },
    },
    {
        description: "Anti-War sentiment growing. Greenheart Defence - $60.",
        stockno: 4,
        affect: function(price) { return price - 60; },
    },
    {
        description: "Ore Mines Discovered! Alder Technologies + $60.",
        stockno: 0,
        affect: function(price) { return price + 60; },
    },
    {
        description: "An Orange Man decides to meddle in the economy. All - $600.",
        stockno: null,
        affect: function(price) { return price - 600; },
    },
    {
        description: "Famine in other countries! More exports of food are expected. Chloroxylon Agriculture + 200.",
        stockno: 2,
        affect: function(price) { return price + 200; },
    },
    {
        description: "New Trade Agreements formed. Chloroxylon Agriculture * 1.30.",
        stockno: 2,
        affect: function(price) { return price * 1.30; },
    },
];

//////////////////////
function updatemoney(newmoney) {
    document.getElementById("moneyamt").textContent = "Current Money: $"+newmoney;
    currentmoney = newmoney;
}

function updatestockamt() {
    for (let i = 1; i < 6; i++) {
        let text = document.getElementById("stockamt"+i).textContent;
        let stockamt = parseInt(text.replace(/[^\d]/g, ''));
        currentstocks[i-1] = stockamt;
    }
    console.log(currentstocks);
}

function buystock(stockname, stockno, currentstockno, stockprice){
    if (currentmoney >= stockprice) {
        document.getElementById("stockamt"+stockno).textContent = stockname+":"+(currentstockno+1);
        newmoney = currentmoney - stockprice;
        updatemoney(newmoney);
        updatestockamt();
    }
    else {
        alert("Not Enough Money");
    }
}

function sellstock(stockname, stockno, currentstockno, stockprice){
    let text = document.getElementById("stockamt"+stockno).textContent;
    let stockamt = parseInt(text.replace(/[^\d]/g, ''));
    if (stockamt > 0) {
        document.getElementById("stockamt"+stockno).textContent = stockname+":"+(currentstockno-1);
        newmoney = currentmoney + stockprice;
        updatemoney(newmoney);
        updatestockamt();
    }
    else {
        alert("Not Enough Stocks");
    }
}

// function updatestockprice(stockno, newstockprice) {
//     stockprices[stockno-1] = newstockprice
//     for (let i = 1; i < 6; i++) {
//         document.getElementById("stockprice"+i).textContent = stocknames[i-1]+": $"+stockprices[i-1]+"/share";
//     }
// }

function GetRandom(min,max) {
    //this will select a number between min and max
    return Math.round(Math.random() * (max - min)) + min;
}

function applyevent(events) {
    if (events.stockno !== null) {
        let index = events.stockno;
        stockprices[index] = Math.round(events.affect(stockprices[index]));
    } else {
        for (let i = 0; i < stockprices.length; i++) {
            stockprices[i] = Math.round(events.affect(stockprices[i]));
        }
    }
}

function newevents() {
    let eventid1 = GetRandom(0, events.length - 1);
    let eventid2;
    do {
        eventid2 = GetRandom(0, events.length - 1);
    } while (eventid2 === eventid1);
    let e1 = events[eventid1];
    let e2 = events[eventid2];
    applyevent(e1);
    document.getElementById("event1").textContent = e1.description;
    applyevent(e2);
    document.getElementById("event2").textContent = e2.description;
}

function resetgame() {
    currentstocks = [0, 0, 0, 0, 0];
    stockprices = [76, 30, 230, 120, 164];
    stocknames = ["Alder Technologies", "Buckeye Develpment", "Chloroxylon Agriculture", "Karri Foresting", "Greenheart Defence"];
    let money = 1000;
    dayspast = 0;
    document.getElementById("dayspast").textContent = "Days Past: "+dayspast;
    updatemoney(money);
    for (let i = 1; i < 6; i++) {
        document.getElementById("stockprice"+i).textContent = stocknames[i-1]+": $"+stockprices[i-1]+"/share";
        document.getElementById("stockamt"+i).textContent = stocknames[i-1]+": "+currentstocks[i-1];
    }
}

///
function getPercentageChange(original, current) {
    return ((current - original) / original) * 100;
}

function roundToSF(num, n) {
    if (num === 0) return 0;
    const d = Math.ceil(Math.log10(Math.abs(num)));
    const power = n - d;
    const magnitude = Math.pow(10, power);
    const shifted = Math.round(num * magnitude);
    return shifted / magnitude;
}
///

bs1.addEventListener("click", function () {
    buystock(stocknames[0], 1, currentstocks[0], stockprices[0]);
});
bs2.addEventListener("click", function () {
    buystock(stocknames[1], 2, currentstocks[1], stockprices[1]);
});
bs3.addEventListener("click", function () {
    buystock(stocknames[2], 3, currentstocks[2], stockprices[2]);
});
bs4.addEventListener("click", function () {
    buystock(stocknames[3], 4, currentstocks[3], stockprices[3]);
});
bs5.addEventListener("click", function () {
    buystock(stocknames[4], 5, currentstocks[4], stockprices[4]);
});

ss1.addEventListener("click", function () {
    sellstock(stocknames[0], 1, currentstocks[0], stockprices[0]);
});
ss2.addEventListener("click", function () {
    sellstock(stocknames[1], 2, currentstocks[1], stockprices[1]);
});
ss3.addEventListener("click", function () {
    sellstock(stocknames[2], 3, currentstocks[2], stockprices[2]);
});
ss4.addEventListener("click", function () {
    sellstock(stocknames[3], 4, currentstocks[3], stockprices[3]);
});
ss5.addEventListener("click", function () {
    sellstock(stocknames[4], 5, currentstocks[4], stockprices[4]);
});

nxt1.addEventListener("click", function () {
    newevents();
    for (let i = 1; i < 6; i++) {
        if (stockprices[i-1] <= 9) {
            stockprices[i-1] = 10;
        }
        document.getElementById("stockprice"+i).textContent = stocknames[i-1]+": $"+stockprices[i-1]+"/share";
    }
    for (let i = 0; i < originalstockprices.length; i++) {
        let change = getPercentageChange(originalstockprices[i], stockprices[i]);
        let roundedChange = roundToSF(change, 3);
        let elem = document.getElementById("stockfluc" + (i + 1));

        if (change >= 0) {
            elem.textContent = "+" + roundedChange + "%";
            elem.style.color = "green";
        } 
        else {
            elem.textContent = roundedChange + "%";
            elem.style.color = "red";
        }
    }
    dayspast++;
    document.getElementById("dayspast").textContent = "Months Past: "+(dayspast);
    if (dayspast == 31) {
        alert("The game has officially ended! You have earned: $"+currentmoney+" You can continue to play if you want.");
    }
    kachingsound.play();
});
res1.addEventListener("click", function () {
    resetgame();
});