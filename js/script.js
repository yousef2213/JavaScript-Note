const addAction = document.querySelector(".add-action");
const showAction = document.querySelector(".show-action");
const input = document.querySelector(".add-item-input");
const register = document.querySelector(".add-item-btn");
const list = document.querySelector(".items-list");
const clear = document.querySelector(".show-item-btn");

register.addEventListener("click", addItem);
document.addEventListener("DOMContentLoaded", displayItem);
clear.addEventListener("click", removeItem)

function addItem()
{
    let value = input.value;
    if(value == "")
    {
        action(addAction,"Please Add Your Item",false);
    }else{
        action(addAction, value +' Added To The List', true);
        createItem(value);
        updata(value);
    }
}
// action
function action(element, text, value){
    if(value === true){
        element.classList.add("success");
        element.innerText = text;
        input.value = '';
        setTimeout(function(){
            element.classList.remove("success");
        }, 3000)
    }
        else{
            element.classList.add("alert");
            element.innerText = text;
            input.value = '';
            setTimeout(function(){
                element.classList.remove("alert");
            }, 3000)
        
    }
}

// Create Div
function createItem(value) {
    let parent = document.createElement("div");
    parent.classList.add("items-item");
    parent.innerHTML = '<h4 class="your-items">'+value+'</h4><a href="#" class="items-link"><i class="far fa-trash-alt"></i></a>'

    list.appendChild(parent);
}
// Updata Project
function updata(value){
    let data; // This Array empty
    let exit = localStorage.getItem("FullData"); //this variables is LocalStorge
    
   if(exit)
   {
       data = JSON.parse(localStorage.getItem("FullData"));
   }
   else
   {
       data = [];
   }
    data.push(value);
    localStorage.setItem("FullData", JSON.stringify(data)) // اعمل لوكل سترنج اسمها full data بعدين القيمة بتاعتها هيا الداتا اللي انا عملتها فوق
}
// Display Item
function displayItem() {
    let exit = localStorage.getItem("FullData");
    
    if(exit)
    {
        let storageItem = JSON.parse(localStorage.getItem("FullData"));
        
        storageItem.forEach(function (value){
            createItem(value)
        });
    }
}
// Remove item
function removeItem(){

    localStorage.removeItem('FullData');

    let item = document.querySelectorAll(".items-item");
    
    if(item.length>0)
    {
        action(showAction,"All Item Delet",false);
        item.forEach(function(element){
            list.removeChild(element)
        })
    }
    else{
        action(showAction,"No more Items",true);
    }
}