const goal = 25;
let entries = [];
const entriesWrapper = document.querySelector('#entries');
document.querySelector('#target').innerText = goal;

function addNewEntry(newEntry) {
  // remove the first UL item, as we're about to add one to the end
  entriesWrapper.removeChild(entriesWrapper.firstElementChild);
  // create a <li> element and add the entered value from the form to it
  const listItem = document.createElement('li');
  const listValue = document.createTextNode(newEntry.toFixed(1));
  listItem.appendChild(listValue);
  // put the new entry at the end of the unordered list
  entriesWrapper.appendChild(listItem);
}

function reducer(total, currentValue) {
  return total + currentValue;
}

function calcTotal() {
  const totalvalue = entries.reduce(reducer).toFixed(1);
  document.getElementById('total').innerText = totalvalue;
  document.getElementById('progressTotal').innerText = totalvalue;
}

function calcAverage() {
  const average = (entries.reduce(reducer) / entries.length).toFixed(1);
  document.getElementById('average').innerText = average;
}

function weeklyHigh() {
  // the ... is the javascript spread operator, expanding the array into its values
  const high = Math.max(...entries);
  document.getElementById('high').innerText = high;
}

function calcGoal() {
  const totalvalue = entries.reduce(reducer).toFixed(1);
  const completedPercent = totalvalue / goal * 100;
  const progressCircle = document.querySelector('#progressCircle');
  if (completedPercent > 100) completedPercent === 100;
  // backticks allow insertion of variables inside ${}
  progressCircle.style.background = `conic-gradient(#70db70 ${completedPercent}%, #2d3740 ${completedPercent}% 100%)`;
}

function handleSubmit(event) {
  // stop the page reloading
  event.preventDefault();
  // get the entered value from the form
  const entry = Number(document.querySelector('#entry').value);
  // if null value, do nothing
  if (!entry) return;
  // clear the form 
  document.querySelector('form').reset();
  // push the entered value onto the end of the array
  entries.push(entry);
  // add it to the last 7 days unordered list
  addNewEntry(entry);
  calcTotal();
  calcAverage();
  weeklyHigh();
  calcGoal();
}

const form = document.querySelector('form').addEventListener('submit', handleSubmit);