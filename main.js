function openPopUp(id){
    const element = document.getElementById(id);
    element.classList.add("active-pop-up");
}

function closePopUp(id){
    const element = document.getElementById(id);
    if(element && element.classList.contains("active-pop-up")){
        element.classList.remove("active-pop-up");
    }
}
