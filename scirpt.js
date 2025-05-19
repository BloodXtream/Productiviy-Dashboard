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
                    </summary>
                    <p>${elem.details}<p>
                </details>
                <button id=${idx}>Remove</button>
            </div>`
        })

        allTask.innerHTML = sum

        localStorage.setItem('currentTask', JSON.stringify(currentTask))
        document.querySelectorAll('.task button').forEach((btn) => {
            btn.addEventListener('click', () => {
                currentTask.splice(btn.id, 1)
                renderTask()
            })
        })
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
        taskInput.value = ''
        taskDetailsInput.value = ''
        taskCheckbox.checked = false

    })
}
toDoList()

const dailyPlanner = () => {
    let dayPlanner = document.querySelector('.day-planner')
    let dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    let hours = Array.from({ length: 18 }, (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`)

    let wholeDaySum = ' '
    hours.forEach((elem, idx) => {
        let savedData = dayPlanData[idx] || ''
        wholeDaySum += `
    <div class="day-planner-time">
    <p>${elem}</p>
    <input id="${idx}" type="text" placeholder="..." value="${savedData}">
    </div>
    `
    })
    dayPlanner.innerHTML = wholeDaySum

    let dayPlannerInput = document.querySelectorAll('.day-planner input')
    dayPlannerInput.forEach((elem) => {
        elem.addEventListener('input', () => {
            dayPlanData[elem.id] = elem.value
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}
dailyPlanner()

const motivation = () => {

    const motivationQuote = document.querySelector('.motivation-2 h1')
    const motivationAuthor = document.querySelector('.motivation-3 h2')
    const motivationFullPage = document.querySelector('.motivaiton-fullpage')
    const motivationRefresh = document.querySelector('.fullElem .refresh')
    const fetchQuote = async () => {
        try {
            let response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent("https://zenquotes.io/api/random")}&timestamp=${new Date().getTime()}`)
            let data = await response.json()

            motivationQuote.innerHTML = data[0].q
            motivationAuthor.innerHTML = `- ${data[0].a}`
        } catch (error) {
            console.error("Error fetching quote:", error)
            motivationQuote.innerHTML = 'Error While Fetching Quote'
            motivationAuthor.innerHTML = ''
        }
    }
    fetchQuote()
    motivationRefresh.addEventListener('click', () => {
        motivationFullPage.style.display = 'block'
        console.log('clicked')
        fetchQuote()
    })
}
motivation()