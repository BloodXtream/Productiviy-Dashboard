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