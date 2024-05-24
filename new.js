const BASE_URL = "https://api.currencyapi.com/v3/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns) {
  for(currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if(select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    
    select.append(newOption);
 }

 select.addEventListener("change", (evt) => {
  updateFlag(evt.target);
 });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  console.log(currCode);
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if(amtVal === "" || amtVal < 1) {
    amtVal = 1;
  amount.value = "1";
  } 

  //console.log(fromCurr.value,toCurr.value);
  const URL = `${BASE_URL}?base_currency=${fromCurr.value.toUpperCase()}&currencies=${toCurr.value.toUpperCase()}&apikey=cur_live_N3F6eYCpjDz7BEkdwVXgzR0NY28SsFW9Sv2mizVD`;
  let response = await fetch(URL);
  let result = await response.json();
  let rate = result.data[toCurr.value.toUpperCase()].value;

  let finalAmount = amtVal * rate;
  msg.innerText =`${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value} `
});
