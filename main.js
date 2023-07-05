// текущая дата
let date = new Date()
let year = date.getFullYear()
let month = date.toLocaleString('default', {month:'long'})
let day = date.getDate()
let today = `${day}.${month}.${year}`

let div =document.querySelector('.date');
div.textContent = today;



const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const btnAdd =document.querySelector('.btn-add');

// btnAdd.disabled = true


let tasks = []

if (localStorage.getItem('tasks')) {
    tasks =  JSON.parse(localStorage.getItem('tasks'));
} 

tasks.forEach((el) => renderTask(el));

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', daleteTask)

tasksList.addEventListener('click', doneTask)


function addTask(e){
    e.preventDefault();

    const textTask = taskInput.value;


    if (!textTask) {
        return
    }

    const newTask = {
        id: Date.now(),
        text: textTask,
        done: false
    }

    tasks.push(newTask);

    saveToLs();

    renderTask(newTask)

taskInput.value = '';
taskInput.focus()
}

function daleteTask(e){
  if (e.target.dataset.action === 'delete'){
    const parent = e.target.closest('.item-list')

    const id = parent.id;
    
    const indexId = tasks.findIndex((el) => el.id == id)
    
    tasks.splice(indexId, 1);

    saveToLs();

    parent.remove()
  } 
}

function doneTask(e){

    if (e.target.dataset.action !== 'done') return

    const parent = e.target.closest('.item-list')

    const id = parent.id;

    const taskDone = tasks.find( (el) => el.id == id);

    taskDone.done = !taskDone.done;

    saveToLs();

      const itemTitle =  parent.querySelector('.item-title')
      itemTitle.classList.toggle('item-title--done')
      const itemBtn = parent.querySelector('.item-btn')
      itemBtn.classList.toggle('item-btn--done')
}


function saveToLs(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(el) { 

    const cssClass = el.done ? 'item-title item-title--done' : 'item-title'
    
    const taskHtml = `
    <li id="${el.id}" class="item-list">
    <span class="${cssClass}">${el.text}</span>
    <div class="item-title__btn">
        <button class="item-btn" type="button" data-action="done">
            <img src="./img/tick.svg" alt="done" width="15" height="15">
        </button>
        <button class="item-btn" type="button" data-action="delete">
            <img src="./img/cross.svg" alt="delete" width="15" height="15">
        </button>
    </div>
</li>`

tasksList.insertAdjacentHTML('beforeend', taskHtml);
}