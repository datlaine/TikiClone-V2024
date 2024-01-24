export const addEventListenerMain = (nameElement) => {
    const main = document.getElementById('main')
    main.addEventListener('click', () => {
        const hienLenHoacAnDi = document.querySelector(nameElement)
        console.log(hienLenHoacAnDi)
        if (hienLenHoacAnDi) {
            hienLenHoacAnDi.style.display = 'none'
        }
    })
}
