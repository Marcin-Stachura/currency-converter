{
    var my_image = new Image();
    my_image.src = "images/switchgreen.jpg";
    my_image.src = "images/switchyellow.jpg";


    const valueAmount1Element = document.querySelector(".calculator__valueAmount1");
    const valueAmount2Element = document.querySelector(".calculator__valueAmount2");
    const valueType1Element = document.querySelector(".calculator__valueType1");
    const valueType2Element = document.querySelector(".calculator__valueType2");
    const calcButton = document.querySelector(".calculator__button");
    const calcTextResult = document.querySelector(".calculator__textResult");


    const welcome = () => {
        console.log("Siemanko!");
    }

    const changeTypes = () => {
        event.preventDefault();
        const currencyType = valueType1Element.value;
        valueType1Element.value = valueType2Element.value;
        valueType2Element.value = currencyType;
    };

    const displayGreenCard = () => {
        calcButton.innerHTML = `<img width=30
    src="images/switchgreen.jpg" alt="change">`;
    };

    const displayYellowCard = () => {
        calcButton.innerHTML = `<img width=30
        src="images/switchyellow.jpg" alt="change">`;
    };


    const calcTextResultNone = () => {
        calcTextResult.innerHTML = ``;
    };


    const calcTextResultShown = () => {
        calcTextResult.innerHTML = `Wymieniając <strong>${+valueAmount1Element.value} ${valueType1Element.value}</strong>,<br> otrzymasz <strong>${+valueAmount2Element.value} ${valueType2Element.value}</strong>.`;
    };


    const calculateChange = () => {
        {
            let currency;
            const PLN = 1;
            const USD = 3.99;
            const EUR = 4.46;
            switch (valueType1Element.value) {
                case "PLN":
                    currency = PLN;
                    break;
                case "EUR":
                    currency = EUR;
                    break;
                case "USD":
                    currency = USD;
                    break;
            }

            switch (valueType2Element.value) {
                case "PLN":
                    currency /= PLN;
                    break;
                case "EUR":
                    currency /= EUR;
                    break;
                case "USD":
                    currency /= USD;
                    break;
            }
            valueAmount2Element.value = (+valueAmount1Element.value * currency).toFixed(2);
            calcTextResultShown();
        }
    };


    const updateResult = () => {
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

    const init = () => {
        welcome();

        valueAmount1Element.addEventListener("input", updateResult);

        valueType1Element.addEventListener("input", updateResult);

        valueType2Element.addEventListener("input", updateResult);

        calcButton.addEventListener("mousemove", displayYellowCard);

        calcButton.addEventListener("mouseout", displayGreenCard);

        calcButton.addEventListener("click", () => {
            changeTypes();
            updateResult();
        });
    }

    init();
}