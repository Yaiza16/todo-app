export default function toggleTheme(){
    const toggle = document.getElementById('toggle');
    const app = document.getElementById('app');
    const iconLight = document.getElementById('icon-light');
    const iconDark = document.getElementById('icon-dark')


    toggle.addEventListener('click', () => {
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
    })
}