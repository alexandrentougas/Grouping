const fetchPeople = () => {
    fetch("./people.json")
    .then(res => res.json())
    .then(data => createCheckboxes(petitMalin ? shuffle(data.people) : data.people))
}

window.addEventListener("load", fetchPeople)

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const evadeUser = (evadeValue = 30) => `position:relative;right:${Math.floor(Math.random() * evadeValue)}px;bottom:${Math.floor(Math.random() * evadeValue)}px;margin:${evadeValue}px`
const petitMalin = getCookie('petitMalin') == 'true';

const createCheckboxes = (people) => {
    const container = document.querySelector('#learners')
    let html = ``
    for (let learner in people) {
        html += `
        <div style=${petitMalin ? evadeUser() : ""}>
            <input ${petitMalin ? '' : 'checked'} type="checkbox" id="${people[learner]}" name="${people[learner]}" value="${people[learner]}">
            <label style=${petitMalin ? "pointer-events:none" : ""} for="${people[learner]}"> ${people[learner]}</label>
        </div>
        `
    }
    container.innerHTML = html
}

const createGroups = () => {
    const groupSize = Math.abs(parseInt(document.querySelector('#groupSize').value))

    if (document.querySelector('#groupSize').value < 0) {
        document.cookie = "petitMalin=true"
    }

    const people = [...document.querySelectorAll("input[type='checkbox']:checked")].map(elem => elem.value)
    let groups = {}
    const shuffledPeople = shuffle(people);

    try {
        for (let i = 0, j = 1; i < shuffledPeople.length && groupSize != 0; i = i + groupSize, j++ ) {
            if (i != 0 && shuffledPeople.slice(i, i + groupSize).length < groupSize - 1 && shuffledPeople.slice(i, i + groupSize).length != 0) {
                for (let k = 0, l = 1; k < shuffledPeople.slice(i, i + groupSize).length; k++, l++) {
                    groups["Group " + l].push(shuffledPeople.slice(i, i + groupSize)[k])
                    l = l == Object.keys(groups).length ? 0 : l
                }
            } else {
                groups["Group " + j] = shuffledPeople.slice(i, i + groupSize)
            }
        }
        displayGroups(groups);
    } catch(error) {
        alert(error)
    }
        
}

const createButton = document.querySelector("#createGroups");
createButton.addEventListener("click", createGroups);

const  displayGroups = (groups) => {
    const displayElement = document.querySelector("#groupsDisplay")
    displayElement.innerHTML = ""

    for (let group in groups) {
        displayElement.innerHTML += `<div class="group">
            ${group}: ${groups[group]}
        </div>`
    }
}

const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}