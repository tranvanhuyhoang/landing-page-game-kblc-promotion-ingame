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

function openSelectLanguages(){
    const element = document.getElementById('option-languages');
    element.classList.toggle("active-pop-up");
} 

function closeSelectLanguages(){
    closePopUp('option-languages');
} 

function openPopUpReceiveGiftFree(id){
    openPopUp(id);
    closePopUp('popup__receive-turn');
} 


