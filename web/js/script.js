"use strict";

var rownum = 0;
var waittime = 2;

function onEnter() {
    if (event.keyCode === 13) {
        addItem();
    }
}

function addItem() {
    let item = document.getElementById("item");
    appendRow(item.value);
    item.value = "";
}

eel.expose(appendRow);
function appendRow(item) {
    let table = document.getElementById("itemtable");
    let newRow = document.createElement("tr");
    newRow.setAttribute("id", `row-${rownum}`);
    
    let checktd = document.createElement("td");
    let checkbox = document.createElement("img");
    checkbox.setAttribute("src", "img/uncheckedbox.png");
    checkbox.setAttribute("class", "clickable centered");
    checkbox.setAttribute("id", `checkbox-${rownum}`);
    checkbox.setAttribute("onclick", `removeRow(${rownum})`);
    checktd.appendChild(checkbox);
    newRow.appendChild(checktd);

    let itemtd = document.createElement("td");
    itemtd.innerHTML = item;
    newRow.appendChild(itemtd);
    table.appendChild(newRow);

    eel.listAppend(item, rownum);
    rownum++;
}

function removeRow(rowNumber) {
    let row = document.getElementById(`row-${rowNumber}`);
    let checkbox = document.getElementById(`checkbox-${rowNumber}`);
    checkbox.setAttribute("src", "img/checkedbox.png");
    checkbox.removeAttribute("onclick");
    eel.listRemove(rowNumber);
    
    setTimeout(function() {
        row.parentNode.removeChild(row);
    }, waittime * 1000);
}

window.addEventListener("load", function() {
    eel.loadList();
});
