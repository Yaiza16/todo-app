import taskList from "./taskList.js";
import toggleTheme from "./toggleTheme.js";

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

toggleTheme();

document.addEventListener('DOMContentLoaded', ( ) =>{
    taskList(tasks)
})