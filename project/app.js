
const data= {
    "info": "Central Bank of Myanmar",
    "description": "Official Website of Central Bank of Myanmar",
    "timestamp": "1611043200",
    "rates": {
    "MMK": "1",
    "USD": "1,332.8",
    "GBP": "1,812.5",
    "CAD": "1,046.2",
    "SEK": "159.46",
    "NOK": "155.78",
    "ILS": "411.85",
    "DKK": "217.05",
    "AUD": "1,026.9",
    "KWD": "4,395.1",
    "RUB": "18.056",
    "INR": "18.197",
    "BND": "1,002.0",
    "EUR": "1,614.7",
    "ZAR": "88.280",
    "NPR": "11.373",
    "CNY": "205.47",
    "CHF": "1,498.9",
    "THB": "44.345",
    "PKR": "8.2920",
    "KES": "12.094",
    "EGP": "84.892",
    "BDT": "15.718",
    "SAR": "355.30",
    "LAK": "14.308",
    "IDR": "9.4760",
    "KHR": "32.683",
    "SGD": "1,002.0",
    "LKR": "6.9147",
    "NZD": "949.40",
    "CZK": "61.788",
    "JPY": "1,281.7",
    "VND": "5.7771",
    "PHP": "27.732",
    "KRW": "120.74",
    "HKD": "171.93",
    "BRL": "251.65",
    "RSD": "13.684",
    "MYR": "329.09"
    }
    }
let selectBoxOneTag=document.getElementById('selectBoxOne');
let selectBoxTwoTag=document.getElementById('selectBoxTwo');
let exchangeAmountTag=document.getElementById('exchange-amount');
let resultTag=document.getElementById('result');
let calcBtnTag=document.getElementById('calc-btn');
let tableBodyTag=document.getElementsByClassName('table-body')[0];
let historyListTag=document.getElementsByClassName('historyList')[0];
let recordHistoryTag=document.getElementsByClassName('record-history')[0];
let clearHistoryBtn=document.getElementById('clearHistory');
let btnNightMode=document.getElementById('btn-night-mode');
let btnDayMode=document.getElementById('btn-day-mode');
let pageModeTag=document.getElementById('night-mode');
let btnMode=document.getElementById('btn-mode');
btnMode.classList.add('btn-dark');
btnNightMode.addEventListener('click', () => {
    btnMode.classList.remove('btn-dark')
    pageModeTag.classList.add('night-mode');
    btnMode.classList.add('btn-light');
    btnNightMode.style.display='none';
    btnDayMode.style.display='block';
});
btnDayMode.addEventListener('click', () => {
    btnMode.classList.remove('btn-light')
    pageModeTag.classList.remove('night-mode');
    btnMode.classList.add('btn-dark')
    btnDayMode.style.display='none';
    btnNightMode.style.display='block';
});
function removingComma (y) {
    return y.replace(',','');
};

function showFromList (x,y) {
    let optionTag=document.createElement('option');
    let textNode=document.createTextNode(x);
    optionTag.value= y
    // optionTag.classList.add('dropdown-item');
    optionTag.append(textNode);
   selectBoxOneTag.append(optionTag);
};
function store () {
    localStorage.setItem('record',historyListTag.innerHTML)
};
function showToList (x,y) {
    let optionTag=document.createElement('option');
    let textNode=document.createTextNode(x);
    optionTag.value= y
    // optionTag.classList.add('dropdown-item');
    optionTag.append(textNode);
    selectBoxTwoTag.append(optionTag);
}; 

for(x in data.rates){
   showFromList(x,removingComma(data.rates[x]))
   showToList(x,removingComma(data.rates[x]))
};
let num=0
calcBtnTag.addEventListener('click', () => {
    num++;
    if(num>0){
        recordHistoryTag.classList.add('collapse');
    }
    
    // get value
    let x = exchangeAmountTag.value;
    let y = selectBoxOneTag.value;
    let z = selectBoxTwoTag.value;
    let date = new Date().toLocaleTimeString();
    let fromCurrency= x + selectBoxOneTag.options[selectBoxOneTag.selectedIndex].innerText;
    let toCurrency= z + selectBoxTwoTag.options[selectBoxTwoTag.selectedIndex].innerText;
    if(x==0) return;
    // get process
    let result = (x * y)/z ;
    let finalResult=result.toFixed(2);


    // set UI

    resultTag.innerText =finalResult ;
    exchangeAmountTag.value = "";
    selectBoxOneTag.value = "";
    selectBoxTwoTag.value = "";
    let trTag=document.createElement('tr');
    let dataList=[date,fromCurrency,toCurrency,finalResult];
    dataList.map((el) => {
        let tdTag=document.createElement('td');
        tdTag.innerText = el ;
        trTag.append(tdTag);
    })
    tableBodyTag.append(trTag);
    store();

    // This is not working
    // if (localStorage.getItem('record')) {
    //     tableBodyTag.innerHTML=localStorage.getItem('record');
    // };
    exchangeAmountTag.focus();
  
});

clearHistoryBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

(function () {
    if(localStorage.getItem('record')){
        historyListTag.innerHTML=localStorage.getItem('record');
        recordHistoryTag.classList.add('collapse');
    }
})();

$(window).on('load',function(){
    $('.loader-container').fadeOut(500,function(){
      $(this).remove();
    })
 })

//  window.addEventListener('load',function () {
//      document.getElementById('loader-container').style.animation
//  })