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
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
}

function deleteTodo(e){
  if(e.target.className==="fa fa-remove")
  {
    e.target.parentElement.parentElement.remove();//burada şunu yaptım doğru biz x ya basınca siliyoruz ama ona basınca neyi silmesi lazım
    //li yi silmesi lazımki komple o satır silinsin. <i fa. nın üstünde a var onun üstünde li var. Bu yüzden 2 üste geçtim parentElement.parentElement sonra sil dedim
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success","Todo Başarıyla Silindi");
  }
}

function deleteTodoFromStorage(deletetodo){//todo şeklinde stringi arayüzden döndericem
   let todos=getTodosFromStorage();
   
   todos.forEach(function(todo,index){//hem eleman hem indexi geliyor
       if(todo===deletetodo){
         todos.splice(index,1);//verdiğin indexten itibaren 1 değer siler
       }
   });
   localStorage.setItem("todos",JSON.stringify(todos));//yeni değerle güncelliyorum
}


function loadAllTodosToUI(){//localstorageden çağırıp ui'a yazdırıcaz
  let todos=getTodosFromStorage();//şuan burada todolarım var arrayimizi aldık
  todos.forEach(function(todo) {//ve her bir değeri burada ekleyeceğiz localstorageye
    addTodoToUI(todo);
  });
}


function addTodo(e){
    //şimdi ilk başta inputtaki değerleri almam lazım
    const newTodo=todoInput.value.trim();//trim ile sondaki ve baştaki boşlukları silerim. olaki boşluk kalırsa diye

    if(newTodo==="")//inputodo boşsa alertçıkart
    {
      showAlert("danger","Lütfen bir todo girin...");
    }
    else
    {
      addTodoToUI(newTodo);//arayüze sen bu todoyu ekle
      addTodoStorage(newTodo);//storageye ekler
      showAlert("success","Todo başarı ile eklendi...")
    }

    e.preventDefault();
}

function getTodosFromStorage(){
  let todos;

  if(localStorage.getItem("todos")===null){
    todos=[];
  }
  else
  {
    todos=JSON.parse(localStorage.getItem("todos"));
  }
//şimdi biz bu kodu çoğu yerde kullanacağımız için fonksiyon haline çevirdik.Bu sayede sadece bi fonksiyon yazıp heryerde kullanabilicez.
  return todos;
}

function addTodoStorage(newTodo){ //todos isimli keyimiz varsa onu alıcaz ve bize gönderilen todoyu alıp ona ekliycez
   let todos=getTodosFromStorage();
   todos.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message){
    const alert=document.createElement("div");//bootstrap
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);//zaten firstcardbodyde 1. bodymi almıştım appendchilde son çocuk olarak ekliyorum
    
    //setTimeout ile belirli saniye sonra alert gitsin istiyorum
    window.setTimeout(function(){
       alert.remove();
    },2000);//bir saniye sonra çalışsın

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