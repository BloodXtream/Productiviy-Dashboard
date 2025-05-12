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

// openFeatures()

let form = document.querySelector('.addTask form')
let taskInput = document.querySelector('.addTask form input')
let taskDetailsInput = document.querySelector('.addTask form textarea')
let taskCheckbox = document.querySelector('.addTask form #check')

let currentTask = []

const renderTask = () => {

    let allTask = document.querySelector('.allTask')
    let sum = ''


    currentTask.forEach((elem) => {
        sum += `<div class="task">
                <h5>${elem.task}<span class=${elem.imp}>imp</span></h5>
                <button>Done</button>
            </div>`
    })

    allTask.innerHTML = sum
}
renderTask()


form.addEventListener('submit', (e) => {
    e.preventDefault()
    currentTask.push({
        task: taskInput.value,
        details: taskDetailsInput.value,
        imp: taskCheckbox.checked
    })
    taskInput.value = ''
    taskDetailsInput.value = ''
    taskCheckbox.checked = ''
    renderTask()
})