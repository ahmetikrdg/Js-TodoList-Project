const todoForm=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const elementLi=document.querySelector(".list-group");
const firstcardBody=document.querySelectorAll(".card-body")[0];
const secondcardBody=document.querySelectorAll(".card-body")[1];
const filterElement=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

Eventlisteners();
function Eventlisteners(e){
    todoForm.addEventListener("submit",run);
    document.addEventListener("DOMContentLoaded",loadAllTodoxToUI);
    secondcardBody.addEventListener("click",deleteTodox);
    filterElement.addEventListener("keyup",search);
    clearButton.addEventListener("click",clearAllTodox);
}

function clearAllTodox(e){
     if (confirm("Tümünü Silmek İstediğine Eminmisin ??")) {
         while (elementLi.firstElementChild!=null) {
            elementLi.removeChild(elementLi.firstElementChild);
        }
        localStorage.removeItem("todox");

     }
}


function search(e){
const comer=e.target.value.toLowerCase();
const LiItem=document.querySelectorAll(".list-group-item");

LiItem.forEach(function(liit){
    const text=liit.textContent.toLowerCase();

        if(text.indexOf(comer)){
            liit.setAttribute("style","display:none !important");
        }
        else
        {
            liit.setAttribute("style","display:block");
        }
    });
}

function deleteTodox(e){
    if(e.target.className==="fa fa-remove")
    {
        e.target.parentElement.parentElement.remove();
        deleteTodosFromStorage(e.target.parentElement.parentElement.textContent);
        showAlerts("success","Todo Başarıyla Silindi");

    }

}

function deleteTodosFromStorage(deletetodos){
  
    let todox=getTodoFromStorage();
    todox.forEach(function(vvv,index){
        if(vvv==deletetodos)
        {
            todox.splice(index,1)
        }
    });
    localStorage.setItem("todox",JSON.stringify(todox));

}

function loadAllTodoxToUI()
{
    let tods=getTodoFromStorage();
    tods.forEach(function(tod) {
        addedUI(tod);
    });

}

function run(e){
    const value=todoInput.value.trim();
     const all=getTodoFromStorage();
    if(value==="")
    {
        showAlerts("danger","Lütfen bir todo giriniz");
    }
    else if(all.indexOf(value)!=-1)
    {
        showAlerts("warning","Bu todo mevcutta bulunuyor. Ekleyemezsiniz.");
    }
    else
    {
        addedUI(value);
        addTodoStorage(value);
        showAlerts("success","Todo başarı ile eklendi");
    }
    e.preventDefault();
}

function getTodoFromStorage()
{
    let todox;
    if(localStorage.getItem("todox")===null)
    {
        todox=[];
    }
    else
    {
        todox=JSON.parse(localStorage.getItem("todox"));
    }
    return todox;
}

function addTodoStorage(value)
{
    let todox=getTodoFromStorage();
    todox.push(value);
    localStorage.setItem("todox",JSON.stringify(todox));
}

function showAlerts(type,message){
    const alerts=document.createElement("div");
    alerts.className=`alert alert-${type}`;
    alerts.textContent=message;
    firstcardBody.appendChild(alerts);

    window.setTimeout(function(){
     alerts.remove();
    },1000);
}

function addedUI(value){
    const li=document.createElement("li");
    li.className="list-group-item d-flex justify-content-between";
    li.appendChild(document.createTextNode(value));

    const a=document.createElement("a");
    a.href="#";
    a.className="delete-item";
    a.innerHTML="<i class = 'fa fa-remove'></i>";

    li.appendChild(a);
    elementLi.appendChild(li);
}