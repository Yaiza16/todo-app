const toggle = document.getElementById('toggle');
const app = document.getElementById('app');
const iconLight = document.getElementById('icon-light');
const iconDark = document.getElementById('icon-dark')
const form = document.getElementById('form')
const input = document.getElementById('input-text');
const todoContainer = document.getElementById('todo-list__container')
const numberDynamic = document.getElementById('number-dynamic')
const itemsStatus = document.getElementById('items-status')
const itemStatus = document.querySelectorAll('.items-status__item')
const clearCompleted = document.getElementById('clear-completed');

let buttonTask;
let isSortableDisabled = false;


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
    tasks = JSON.parse(localStorage.getItem('tasks'))
    taskListUpdate(tasks)
    itemsLeftUpdate()
    app.dataset.theme = localStorage.getItem('theme');
    setIcon(localStorage.getItem('theme'));
})

toggle.addEventListener('click', () =>{
    toggleTheme()
})

form.addEventListener('submit', e => {
    e.preventDefault()
    newTaskUpdate()
    input.value = ""
})

todoContainer.addEventListener('click', e =>{
    const ele = e.target
    if (ele.classList.contains('button')){
        tasks.forEach(task =>{
            if (task.def == ele.nextSibling.innerHTML){
                if (task.status == "Actived"){
                    task.status = "Completed"
                }else{
                    task.status = "Actived"
                }
                taskListUpdate(tasks)
                focusChange(document.querySelector('.items-status__item--actived'))
            }
        })
    } else if(ele.classList.contains('delete-icon')){
         removeTask(ele)
     }
})

itemsStatus.addEventListener('click', e =>{
    let item = e.target
    focusChange(item)
})

clearCompleted.addEventListener('click',() =>{
    let newList = tasks.filter(el => el.status == "Actived")
    tasks = newList
    taskListUpdate(tasks);
    focusChange(document.getElementById('all-status'))
})




//Change toggle theme
let toggleTheme = () =>{
        // Change app theme mode
        if (app.dataset.theme == 'light'){
            app.dataset.theme = 'dark';
            localStorage.setItem('theme', 'dark');
        }else{
            app.dataset.theme = 'light';
            localStorage.setItem('theme', 'light')

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

// Set icon localStorage
const setIcon = theme =>{
    let currentTheme = app.dataset.theme;
    if (currentTheme == 'light'){
        if (iconLight.classList.contains('toggle-icon--hidden')){
            iconLight.classList.remove('toggle-icon--hidden')
            iconDark.classList.add('toggle-icon--hidden')
        }
    }else{
        if (iconDark.classList.contains('toggle-icon--hidden')){
            iconDark.classList.remove('toggle-icon--hidden')
            iconLight.classList.add('toggle-icon--hidden')
        }   
    }
}


// Load task list
const taskListUpdate = (tasksList) => {
    todoContainer.innerHTML = ""
    tasksList.forEach(task => {
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
    localStorage.setItem('tasks', JSON.stringify(tasks))

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
    taskListUpdate(tasks)
}

//Change focus status
const focusChange = (item) =>{
    itemStatus.forEach(el =>{
        if (el.classList.contains('items-status__item--actived')){
            el.classList.remove('items-status__item--actived')
        }
    })

    if (item == document.getElementById('all-status')){
        taskListUpdate(tasks)
        item.classList.add('items-status__item--actived')
        sortable.options.disabled = false;
    } else if(item == document.getElementById('active-status')){
        let newList = tasks.filter(el => el.status == "Actived")
        taskListUpdate(newList);
        item.classList.add('items-status__item--actived');
        sortable.options.disabled = true;
        
    } else if(item == document.getElementById('completed-status')){
        let newList = tasks.filter(el => el.status == "Completed")
        taskListUpdate(newList);
        item.classList.add('items-status__item--actived')
        sortable.options.disabled = true;

    }
}

//Remove task
const removeTask = cross =>{
    let item = cross.parentNode.previousSibling;
    let itemPosition = -1;
    tasks.forEach(task =>{
        itemPosition++
        console.log(item.innerHTML)
        console.log(task.def)
        if (item.innerHTML == task.def){
            tasks.splice(itemPosition, 1)
        }
    })
    taskListUpdate(tasks)
    itemsLeftUpdate()
}

//Sortable
let sortable = new Sortable(todoContainer, {
    animation: 150, 	
    easing: "cubic-bezier(0.83, 0, 0.17, 1)",
    disabled: false,
    chosenClass: 'task--sortableActive',
    onSort: () =>{
        tasks = [];
        let status;
        let newOrderedList = todoContainer.childNodes;
        newOrderedList.forEach(item =>{
            if (item.classList.contains('task--completed')){
                status = 'Completed'
            }else{
                status = 'Actived'
            }

            let def = item.childNodes[1].innerHTML;
            let newTask = {
                'def': def,
                'status': status
            }

            tasks.unshift(newTask)
        })
    }
})


