console.log("Siemanko!")


var my_image = new Image();
my_image.src = "images/switchgreen.jpg";
my_image.src = "images/switchyellow.jpg";


let valueAmount1Element = document.querySelector(".calculator__valueAmount1");
let valueAmount2Element = document.querySelector(".calculator__valueAmount2");
let valueType1Element = document.querySelector(".calculator__valueType1");
let valueType2Element = document.querySelector(".calculator__valueType2");
let calcButton = document.querySelector(".calculator__button");
let calcTextResult = document.querySelector(".calculator__textResult");
let calcTextResultHidden = document.querySelector(".calculator__textResult--hidden");


let PLN = 1;
let USD = 3.99;
let EUR = 4.46;


function changeTypes() {
    event.preventDefault();
    let bufferType = valueType1Element.value;
    valueType1Element.value = valueType2Element.value;
    valueType2Element.value = bufferType;
};


function calcTextResultNone() {
    calcTextResult.innerHTML = ``;
}


function calcTextResultShown() {
    calcTextResult.innerHTML = `Wymieniając <strong>${+valueAmount1Element.value} ${valueType1Element.value}</strong>,<br> otrzymasz <strong>${+valueAmount2Element.value} ${valueType2Element.value}</strong>.`;
}


function calculateChange() {
    if ((+valueAmount1Element.value !== 0) && (valueType1Element.value === valueType2Element.value)) {
        valueAmount2Element.value = "ta sama waluta ziom";
        calcTextResultNone();
    }
    else if (isNaN(+valueAmount1Element.value)) {
        valueAmount2Element.value = "tylko cyferki pls";
        calcTextResultNone();
    }
    else if (+valueAmount1Element.value === 0) {
        valueAmount2Element.value = "";
        calcTextResultNone();
    }
    else if (+valueAmount1Element.value < 0) {
        valueAmount2Element.value = "ujemne piniondze??";
        calcTextResultNone();
    }
    else if (+valueAmount1Element.value > 10000000) {
        valueAmount2Element.value = "nie liczę, za dużo :(";
        calcTextResultNone();
    }
    else if (+valueAmount1Element.value !== +((+valueAmount1Element.value).toFixed(2))) {
        valueAmount2Element.value = "2 miejsca po przecinku :)";
        calcTextResultNone();
    }
    else {
        let buffer;
        switch (valueType1Element.value) {
            case "PLN":
                buffer = PLN;
                break;
            case "EUR":
                buffer = EUR;
                break;
            case "USD":
                buffer = USD;
                break;
        }

        switch (valueType2Element.value) {
            case "PLN":
                buffer /= PLN;
                break;
            case "EUR":
                buffer /= EUR;
                break;
            case "USD":
                buffer /= USD;
                break;
        }
        valueAmount2Element.value = (+valueAmount1Element.value * buffer).toFixed(2);
        calcTextResultShown();
    }
};


valueAmount1Element.addEventListener("input", () => {
    calculateChange();
});

valueType1Element.addEventListener("input", () => {
    calculateChange();
});

valueType2Element.addEventListener("input", () => {
    calculateChange();
});

calcButton.addEventListener("mousemove", () => {
    calcButton.innerHTML = `<img width=30
    src="images/switchyellow.jpg" alt="change">`;
});

calcButton.addEventListener("mouseout", () => {
    calcButton.innerHTML = `<img width=30
    src="images/switchgreen.jpg" alt="change">`;
});

calcButton.addEventListener("click", () => {
    changeTypes();
    calculateChange();
});


