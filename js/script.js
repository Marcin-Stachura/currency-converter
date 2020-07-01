{
    console.log("Siemanko!");


    var my_image = new Image();
    my_image.src = "images/switchgreen.jpg";
    my_image.src = "images/switchyellow.jpg";


    const valueAmount1Element = document.querySelector(".calculator__valueAmount1");
    const valueAmount2Element = document.querySelector(".calculator__valueAmount2");
    const valueType1Element = document.querySelector(".calculator__valueType1");
    const valueType2Element = document.querySelector(".calculator__valueType2");
    const calcButton = document.querySelector(".calculator__button");
    const calcTextResult = document.querySelector(".calculator__textResult");


    function changeTypes() {
        event.preventDefault();
        const bufferType = valueType1Element.value;
        valueType1Element.value = valueType2Element.value;
        valueType2Element.value = bufferType;
    };

    function greenCard() {
        calcButton.innerHTML = `<img width=30
    src="images/switchgreen.jpg" alt="change">`;
    };

    function yellowCard() {
        calcButton.innerHTML = `<img width=30
        src="images/switchyellow.jpg" alt="change">`;
    };


    function calcTextResultNone() {
        calcTextResult.innerHTML = ``;
    };


    function calcTextResultShown() {
        calcTextResult.innerHTML = `Wymieniając <strong>${+valueAmount1Element.value} ${valueType1Element.value}</strong>,<br> otrzymasz <strong>${+valueAmount2Element.value} ${valueType2Element.value}</strong>.`;
    };


    function calculateChange() {
        {
            let buffer;
            const PLN = 1;
            const USD = 3.99;
            const EUR = 4.46;
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


    function updateResult() {
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
        else if (+valueAmount1Element.value > 9999999) {
            valueAmount2Element.value = "nie liczę, za dużo :(";
            calcTextResultNone();
        }
        else if (+valueAmount1Element.value !== +((+valueAmount1Element.value).toFixed(2))) {
            valueAmount2Element.value = "2 miejsca po przecinku :)";
            calcTextResultNone();
        }
        else
            calculateChange();
    };


    valueAmount1Element.addEventListener("input", updateResult);

    valueType1Element.addEventListener("input", updateResult);

    valueType2Element.addEventListener("input", updateResult);

    calcButton.addEventListener("mousemove", yellowCard);

    calcButton.addEventListener("mouseout", greenCard);

    calcButton.addEventListener("click", () => {
        changeTypes();
        calculateChange();
    });
}