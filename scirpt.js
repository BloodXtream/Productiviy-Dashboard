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

    let lastQuote = ''
    const fetchQuote = async () => {
        try {
            const response = await fetch(
                'https://api.allorigins.win/get?url=' +
                encodeURIComponent('https://zenquotes.io/api/random') +
                '&cache=' + new Date().getTime()
            )
            const data = await response.json()
            const parsedData = JSON.parse(data.contents)

            if (!parsedData || !parsedData[0]) {
                throw new Error('Quote not found in parsed data.')
            }

            const quote = parsedData[0].q
            const author = parsedData[0].a

            if (quote === lastQuote) {
                console.log('Same quote received, trying again...')
                return fetchQuote()
            }

            lastQuote = quote
            motivationQuote.innerHTML = quote
            motivationAuthor.innerHTML = `- ${author}`
        } catch (error) {
            console.error("Error fetching quote:", error)
            motivationQuote.innerHTML = 'Error While Fetching Quote'
            motivationAuthor.innerHTML = ''
        }
    }
    fetchQuote()

    motivationRefresh.addEventListener('click', () => {
        motivationFullPage.style.display = 'block'
        fetchQuote()
    })
}
motivation()


const timer = document.querySelector('.pomo-timer h1')
const startbtn = document.querySelector('.pomo-timer .start-timer')
const pausebtn = document.querySelector('.pomo-timer .pause-timer')
const resetbtn = document.querySelector('.pomo-timer .reset-timer')
const session = document.querySelector('.prmodoro-timer-fullpage .session')

let totalSeconds = 25 * 60
let timerInterval = null
let isWorkSession = true


const updateTime = () => {
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = totalSeconds % 60
    timer.innerHTML = `${String(minutes).padStart('2', 0)}:${String(seconds).padStart('2', 0)}`
}

const startTimer = () => {
    clearInterval(timerInterval)
    startbtn.innerHTML = `Resume`
    if (isWorkSession) {
        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--
                updateTime()
            } else {
                isWorkSession = false
                clearInterval(timerInterval)
                timer.innerHTML = `05:00`
                session.innerHTML = `Break Session`
                totalSeconds = 5 * 60
            }
        }, 1000)
    } else {

        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--
                updateTime()
            } else {
                isWorkSession = true
                clearInterval(timerInterval)
                timer.innerHTML = `25:00`
                session.innerHTML = `Work Session`
                totalSeconds = 25 * 60
            }
        }, 1000)
    }
}

const pauseTimer = () => {
    clearInterval(timerInterval)
}

const resetTimer = () => {
    clearInterval(timerInterval)
    startbtn.innerHTML = `Start`
    totalSeconds = 25 * 60
    updateTime()
}

startbtn.addEventListener('click', startTimer)
pausebtn.addEventListener('click', pauseTimer)
resetbtn.addEventListener('click', resetTimer)
