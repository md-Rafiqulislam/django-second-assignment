
// create an element
export const createTag = (tagName) => document.createElement(tagName);


// append an element to an element
export function appendElement (parentElement, childElement) {
    // console.log(parentElement);
    // console.log(childElement);
    parentElement.appendChild(childElement);
}



// call an element by its id
export const callById = (id) => document.getElementById(id);



// set an id to an element
export function setId (element, id) {
    element.setAttribute('id', id);
}


export const apiCall = async (apiLink) => {
    const res = await fetch(apiLink);
    const data = await res.json();
    return data;
};


export const secondToTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const remainingSecondsForMinutes = seconds - (hours * 3600);
    const minutes = Math.floor(remainingSecondsForMinutes / 60);
    const remainingSeconds = remainingSecondsForMinutes - (minutes * 60);
    return `${hours} hours ${minutes} minutes ${remainingSeconds} seconds`;
};