        //Tüm elementleri seçme
const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");
eventListeners();//sayfamız yeni açıldığı zaman eventlisteners eklenecek ve çalışacak
function eventListeners(){//tüm eventlistenerları buradan ekliycem.Bu fonksiyon görev eventlistener atamak
    form.addEventListener("submit",addTodo);
}

function addTodo(e){
    //şimdi ilk başta inputtaki değerleri almam lazım
    const newTodo=todoInput.value.trim();//trim ile sondaki ve baştaki boşlukları silerim. olaki boşluk kalırsa diye
    
    addTodoToUI(newTodo);//arayüze sen bu todoyu ekle

    e.preventDefault();
}

function addTodoToUI(newTodo){//string değer gelicek ve arayüze yazıcaz list item olarak
    /*
    <li class="list-group-item d-flex justify-content-between">
             Todo 1
          <a href = "#" class ="delete-item">
               <i class = "fa fa-remove"></i>
          </a>
      </li>*/
              //List Item oluşturma
      const listItem=document.createElement("li");
      listItem.className="list-group-item d-flex justify-content-between";
      //text node ekliycem todo1 yazısını
      listItem.appendChild(document.createTextNode(newTodo));
            //Link oluşturma
      const link=document.createElement("a");
      link.href="#";
      link.className="delete-item";
      link.innerHTML="<i class = 'fa fa-remove'></i>";
      
      listItem.appendChild(link); //tanımladığım linkide li ye ekledim yani yukarıda açıklama satırı olan yeri yaptık
    //şimdi todolisede listitemi eklemem gerek
      todoList.appendChild(listItem);
      todoInput.value="";

    }