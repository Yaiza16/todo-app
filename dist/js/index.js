const toggle = document.getElementById('toggle');
const app = document.getElementById('app');
const iconLight = document.getElementById('icon-light');
const iconDark = document.getElementById('icon-dark')
const form = document.getElementById('form')
const input = document.getElementById('input-text');
const todoContainer = document.getElementById('todo-list__container')
const numberDynamic = document.getElementById('number-dynamic')
let buttonTask;


let tasks = [
    {
        "def": '10 minutes meditation',
        "status": 'Actived'
    },

    {
        "def": 'Job around the park 3x',
        "status": 'Actived'
    },

    {
        'def': 'Complete online JavaScript course',
        'status': 'Completed'
    }
]


document.addEventListener('DOMContentLoaded', () =>{
    taskListUpdate()
})

toggle.addEventListener('click', () =>{
    toggleTheme()
})

form.addEventListener('submit', () => {
    newTaskUpdate()
})

todoContainer.addEventListener('click', e =>{
    const ele = e.target
    if (ele.classList.contains('button')){
        console.log(ele.nextSibling.innerHTML)
        tasks.forEach(task =>{
            if (task.def == ele.nextSibling.innerHTML){
                if (task.status == "Actived"){
                    task.status = "Completed"
                }else{
                    task.status = "Actived"
                }
                taskListUpdate()
            }
        })
    }
})



//Change toggle theme
let toggleTheme = () =>{
        // Change app theme mode
        if (app.dataset.theme == 'light'){
            app.dataset.theme = 'dark';
        }else{
            app.dataset.theme = 'light'
        }

        //Change icons
        if (!iconLight.classList.contains('toggle-icon--hidden')){
            iconLight.classList.add('toggle-icon--hidden')
        }else{
            iconLight.classList.remove('toggle-icon--hidden')
            iconLight.disabled = true;
        }

        if (!iconDark.classList.contains('toggle-icon--hidden')){
            iconDark.classList.add('toggle-icon--hidden')
        }else{
            iconDark.classList.remove('toggle-icon--hidden')
            iconLight.disabled = true;
        }
    }


// Load task list
const taskListUpdate = () => {
    todoContainer.innerHTML = ""
    tasks.forEach(task => {
        let container = document.createElement('div')
        container.classList.add('task', 'task--list')

        if (task.status == 'Completed'){
            container.classList.add('task--completed')
        }

        let button = document.createElement('button')
        button.classList.add('button', 'button--tasks-list')
        container.appendChild(button)

        let input = document.createElement('p');
        input.classList.add('input')
        let inputText = document.createTextNode(task.def);
        input.appendChild(inputText)
        container.appendChild(input)

        let iconContainer = document.createElement('div');
        iconContainer.classList.add('delete-icon-container')
        let icon = document.createElement('img');
        icon.setAttribute('src', '/dist/images/icon-cross.svg')
        icon.classList.add('delete-icon')
        iconContainer.appendChild(icon)
        container.appendChild(iconContainer)

        todoContainer.insertAdjacentElement('afterbegin', container);
        buttonTask = document.querySelectorAll('.button--tasks-list');

        itemsLeftUpdate()
    });
}

const itemsLeftUpdate = () =>{
    let number = 0;
    tasks.forEach(task =>{
        if (task.status == "Actived"){
            number++
        }
    })
    numberDynamic.innerHTML = number;
}

const newTaskUpdate = () =>{
    let text = input.value;
    let newItemTask = {
        "def": text,
        "status": 'Actived'
    }
    tasks.push(newItemTask);
    taskListUpdate()
}

//Change task's status
const statusChanged = () =>{

}