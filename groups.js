function fetchPeople() {
    fetch("./people.json")
    .then(res => res.json())
    .then(data => createCheckboxes(data.people))
}

window.addEventListener("load", fetchPeople)

const createCheckboxes = (people) => {
    const container = document.querySelector('#learners')
    let html = ``
    for (let learner in people) {
        html += `
            <input checked type="checkbox" id="${people[learner]}" name="${people[learner]}" value="${people[learner]}">
            <label for="${people[learner]}"> ${people[learner]}</label>
        `
    }
    container.innerHTML = html
}

const createGroups = () => {
    const groupSize = Math.abs(parseInt(document.querySelector('#groupSize').value))
    const people = [...document.querySelectorAll("input[type='checkbox']:checked")].map(elem => elem.value)
    
    let groups = {}
    const shuffledPeople = shuffle(people);
    try {
        for (let i = 0, j = 1; i < shuffledPeople.length; i = i + groupSize, j++ ) {
            if (shuffledPeople.slice(i, i + groupSize).length < groupSize - 1) {
                for (let k = 0; k < shuffledPeople.slice(i, i + groupSize).length; k++) {
                    groups["Group " + (k + 1)].push(shuffledPeople.slice(i, i + groupSize)[k])
                }
            } else {
                groups["Group " + j] = shuffledPeople.slice(i, i + groupSize)
            }
        }
        displayGroups(groups);
    } catch {
        alert("Group size is too high !")
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

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}