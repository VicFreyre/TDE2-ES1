function showMessage(message) {
    const messageBox = document.getElementById('message-box');
    const messageText = document.getElementById('message-text');
    messageText.textContent = message;
    messageBox.style.display = 'flex';
}

const exchangeRates = {
    'BTC': { value: 350000, change: -4.50 },
    'ETH': { value: 17500, change: 2.10 },
    'SOL': { value: 350, change: 0.75 },
    'ADA': { value: 3.5, change: -1.20 }
};

const currencyButtons = document.querySelectorAll('.currency-button');
const inputTop = document.getElementById('input-top');
const inputBottom = document.getElementById('input-bottom');
const labelTopInput = document.getElementById('label-top-input');
const labelBottomInput = document.getElementById('label-bottom-input');
const prefixTopInput = document.getElementById('prefix-top-input');
const prefixBottomInput = document.getElementById('prefix-bottom-input');
const swapButton = document.getElementById('swap-button');
const currentCryptoIconDisplay = document.getElementById('current-crypto-icon-display');
const currentCryptoLabelDisplay = document.getElementById('current-crypto-label-display');
const currentCryptoPriceDisplay = document.getElementById('current-crypto-price');
const currentCryptoChangeDisplay = document.getElementById('current-crypto-change');
const currentCryptoDisplayContainer = document.getElementById('current-crypto-display-container');

const inputFieldsContainer = document.querySelector('.space-y-6.mb-8');
const brlInputBlock = document.getElementById('top-input-block');
const cryptoInputBlock = document.getElementById('bottom-input-block');
const swapButtonContainer = document.querySelector('.flex.justify-center.my-4');


let activeCurrency = 'BTC';
let isBRLOnTop = true;

const getCryptoIconSVG = (currency) => {
    const size = '24px';
    const color = 'currentColor';
    switch (currency) {
        case 'BTC':
            return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" style="fill:${color};">
                        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.293 13.293L13 16.586V10.414L16.293 13.707L16.293 13.293ZM11 13.586V16.586L7.707 13.293L11 10.414V13.586ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z" fill="currentColor"/>
                    </svg>`;
        case 'ETH':
            return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" style="fill:${color};">
                        <path d="M12 2L6 12L12 22L18 12L12 2ZM12 4.472L16.5 12L12 19.528L7.5 12L12 4.472Z" fill="currentColor"/>
                    </svg>`;
        case 'SOL':
            return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" style="fill:${color};">
                        <path d="M12 2L2 12L12 22L22 12L12 2ZM12 4.828L19.172 12L12 19.172L4.828 12L12 4.828Z" fill="currentColor"/>
                    </svg>`;
        case 'ADA':
            return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" style="fill:${color};">
                        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6ZM12 8C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8Z" fill="currentColor"/>
                    </svg>`;
        default:
            return '';
    }
};

const formatNumber = (num, currency = 'BRL') => {
    if (currency === 'BRL') {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    } else {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8
        }).format(num);
    }
};

const updateConversionAndDisplay = () => {
    const rate = exchangeRates[activeCurrency].value;

    let sourceInput, targetInput;
    let sourceValue, targetValue;

    if (isBRLOnTop) {
        sourceInput = inputTop;
        targetInput = inputBottom;
        sourceValue = parseFloat(sourceInput.value);

        if (!isNaN(sourceValue) && sourceValue > 0) {
            targetValue = (sourceValue / rate).toFixed(8);
        } else {
            targetValue = '';
        }
        targetInput.value = targetValue;

        labelTopInput.textContent = 'Valor em Real';
        labelBottomInput.textContent = 'Valor em Cripto';
        prefixTopInput.textContent = 'R$';
        prefixBottomInput.textContent = activeCurrency;

    } else {
        sourceInput = inputTop;
        targetInput = inputBottom;
        sourceValue = parseFloat(sourceInput.value);

        if (!isNaN(sourceValue) && sourceValue > 0) {
            targetValue = (sourceValue * rate).toFixed(2);
        } else {
            targetValue = '';
        }
        targetInput.value = targetValue;

        labelTopInput.textContent = 'Valor em Cripto';
        labelBottomInput.textContent = 'Valor em Real';
        prefixTopInput.textContent = activeCurrency;
        prefixBottomInput.textContent = 'R$';
    }

    currentCryptoIconDisplay.innerHTML = getCryptoIconSVG(activeCurrency);
    currentCryptoLabelDisplay.textContent = activeCurrency;

    currentCryptoDisplayContainer.classList.remove('crypto-display-btc', 'crypto-display-eth', 'crypto-display-sol', 'crypto-display-ada');
    currentCryptoDisplayContainer.classList.add(`crypto-display-${activeCurrency.toLowerCase()}`);


    currentCryptoPriceDisplay.textContent = formatNumber(exchangeRates[activeCurrency].value, 'BRL');

    const changeValue = exchangeRates[activeCurrency].change;
    currentCryptoChangeDisplay.textContent = `${changeValue > 0 ? '+' : ''}${changeValue.toFixed(2)}%`;
    currentCryptoChangeDisplay.classList.remove('text-red-400', 'text-green-400');
    currentCryptoChangeDisplay.classList.add(changeValue >= 0 ? 'text-green-400' : 'text-red-400');
};

currencyButtons.forEach(button => {
    button.addEventListener('click', () => {
        currencyButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        activeCurrency = button.dataset.currency;

        updateConversionAndDisplay();
    });
});

inputTop.addEventListener('input', () => {
    updateConversionAndDisplay();
});

inputBottom.addEventListener('input', () => {
    updateConversionAndDisplay();
});

swapButton.addEventListener('click', () => {
    isBRLOnTop = !isBRLOnTop;

    const tempValue = inputTop.value;
    inputTop.value = inputBottom.value;
    inputBottom.value = tempValue;

    updateConversionAndDisplay();
});

document.addEventListener('DOMContentLoaded', () => {
    updateConversionAndDisplay();
});
