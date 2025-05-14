const openFeatures = () => {
    const allElems = document.querySelectorAll('.elem')
    const fullElemPage = document.querySelectorAll('.fullElem')
    const fullElemPageBackBtn = document.querySelectorAll('.fullElem .back')
    allElems.forEach((elem) => {
        elem.addEventListener('click', () => {
            fullElemPage[elem.id].style.display = 'block'
        })
    })

    fullElemPageBackBtn.forEach((back) => {
        back.addEventListener('click', () => {
            fullElemPage[back.id].style.display = 'none'
        })
    })
}

openFeatures()

const toDoList = () => {

    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form input')
    let taskDetailsInput = document.querySelector('.addTask form textarea')
    let taskCheckbox = document.querySelector('.addTask form #check')

    var currentTask = []

    localStorage.getItem('currentTask') ? currentTask = JSON.parse(localStorage.getItem('currentTask')) : console.log('Task list is empty')

    const renderTask = () => {

        let allTask = document.querySelector('.allTask')
        let sum = ''

        currentTask.forEach((elem, idx) => {
            sum += `
            <div class="task">
                <details>
                    <summary>
                        <h5>${elem.task}<span class=${elem.imp}>imp</span></h5>
                    </summary
                    <p>${elem.details}<p>
                </details>
                <button id=${idx}>Remove</button>
            </div>`
        })

        allTask.innerHTML = sum

        localStorage.setItem('currentTask', JSON.stringify(currentTask))
    }
    renderTask()


    form.addEventListener('submit', (e) => {
        e.preventDefault()
        currentTask.push({
            task: taskInput.value,
            details: taskDetailsInput.value,
            imp: taskCheckbox.checked
        })
        renderTask()
        location.reload()
    })

    const markCompletedBtn = document.querySelectorAll('.task button')
    markCompletedBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            currentTask.splice(btn.id, 1)
            renderTask()
            location.reload()
        })
    })
}

toDoList()