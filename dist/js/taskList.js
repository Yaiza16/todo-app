export default function taskList(tasks) {
    const todoContainer = document.getElementById('todo-list')
    tasks.forEach(task => {
        let container = document.createElement('div')
        container.classList.add('task', 'task--list')

        if (task.status == 'Completed'){
            container.classList.add('task--completed')
        }

        let button = document.createElement('button')
        button.classList.add('button')
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

        todoContainer.insertAdjacentElement('afterbegin', container)



        console.log(container)
    });
}