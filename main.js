var dataDefault = {
    url: '',
    directory: 'http://khobaulucchau.com/getData.html',
    directory5Gift: 'http://khobaulucchau.com/getdatax5.html',
    urlSaveData: 'http://khobaulucchau.com/savedata.html',
    items: {
        A: {class:'gift__item-image-1', name: 'Đích Lô'},
        B: {class:'gift__item-image-2', name: 'Tuyệt Ảnh'},
        C: {class:'gift__item-image-3', name: 'Chiến Hồn Cam (Ngẫu Nhiên)'},
        D: {class:'gift__item-image-4', name: 'Chiêu Mộ Lệnh x10'},
        E: {class:'gift__item-image-5', name: 'Chiến hồn Tím (Ngẫu Nhiên)'},
        F: {class:'gift__item-image-6', name: 'Phiếu đổi quà'},
        G: {class:'gift__item-image-7', name: 'Chiêu Mộ Lệnh'},
        H: {class:'gift__item-image-8', name: 'Bột than bảo vệ Lv1'},
        I: {class:'gift__item-image-9', name: 'Âu Dã Tử Phù Hộ'},
        J: {class:'gift__item-image-10', name: 'Vạn Đoàn Thạch'},
        K: {class:'gift__item-image-11', name: 'Trúc Diệp Thanh'},
        L: {class:'gift__item-image-12', name: 'Nguyên Liệu Kỵ Thuật'},
        M: {class:'gift__item-image-13', name: 'Lô Nham Than'},
        N: {class:'gift__item-image-14', name: 'Bạc'},
        O: {class:'gift__item-image-15', name: 'Lượt Quay'},
        P: {class:'gift__item-image-16', name: 'Rương Tướng Truyền Kỳ'},
        Q: {class:'gift__item-image-17', name: 'Skin Quan Vũ Võ Tài Thần'},
        R: {class:'gift__item-image-18', name: 'Mảnh Thú Cưỡi Tím'},
        S: {class:'gift__item-image-19', name: 'Chiêu Mộ Lệnh *10'},
        T: {class:'gift__item-image-20', name: 'Bạc'},
    }
};

let resultEl = document.querySelector(".resultSet");
let decrease = document.querySelector(".decrease");
let increase = document.querySelector(".increase");
let number = document.querySelector(".number");
let couter = 0;

decrease.addEventListener("click", clickHandleCouter);
increase.addEventListener("click", clickHandleCouter);
number.addEventListener("change", changeHandler);

function clickHandleCouter(event) {
    let countEl = event.target.parentNode.querySelector(".number");
    if (event.target.className.match(/\bdecrease\b/)) {
        if(Number(countEl.value) > 1){
            countEl.value = Number(countEl.value) - 1;
        }
    } else if (event.target.className.match(/\bincrease\b/)) {
        countEl.value = Number(countEl.value) + 1;
    }
    triggerEvent(countEl, "change");
};

function changeHandler(event) {
    Number(document.querySelector('.number').value);
};

function triggerEvent(el, type){
    if ('createEvent' in document) {
         // modern browsers, IE9+
         var e = document.createEvent('HTMLEvents');
         e.initEvent(type, false, true);
         el.dispatchEvent(e);
     } else {
         var e = document.createEventObject();
         e.eventType = type;
         el.fireEvent('on'+e.eventType, e);
     }
 }


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

function openPopUpBuyTurn(id){
    openPopUp(id);
    closePopUp('popup__receive-turn');
} 

function randomOpenGift(popUpId) {
    let activeClass= 'active-light';
    let timeLoop = 10;
    let lights = document.getElementsByClassName("light");
    let previousRandomLight = null;
    
    function repeatOften() {
      if(timeLoop === 0){
        previousRandomLight.remove(activeClass);
        if(popUpId === 'popup__gift-1'){
            get1Gift();
        }
        if(popUpId === 'popup__gift-5'){
            get5Gift();
        }
        return;
      }
      if (previousRandomLight) previousRandomLight.classList.toggle(activeClass)
      let random = Math.floor(Math.random() * (lights.length)) + 0;
      let randomLight = lights[random];
      randomLight.classList.toggle(activeClass);
      previousRandomLight = randomLight;
      setTimeout(repeatOften, 250);
      timeLoop--;
    }
    repeatOften();
};

function getImgClass(code){
    return dataDefault.items[code].class;
};

function getNameGiftActive(code){
    return dataDefault.items[code].name;
};

function get1Gift() {
    let xhr = new XMLHttpRequest();
    let url = dataDefault.directory;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (this.status === 200) {
            const response = this.response && JSON.parse(this.response);
            if(response){
                const {data} = response;
                let Key128 = data.split("=")[1];
                let index = parseInt(Key128.charAt(127));
                let AC = Key128.substr(index + 32, 1);
                let Encry1 = Key128.substr(index, 32);
                let Encry2 = md5(Encry1 + Key128.substr(index + 32, 1));
                saveData({Encry1, Encry2, AC});
            }
        }
    }
    xhr.send();
}

function get5Gift() {
    let listPrize = [];
    let xhr = new XMLHttpRequest();
    let url = dataDefault.directory5Gift;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (this.status === 200) {
            const response = this.response && JSON.parse(this.response);
            if(response){
                const {data} = response;
                for(let key = 0; key < data.length; key++){
                    let Key128 = data[key].split("=")[1];
                    let index = parseInt(Key128.charAt(127));
                    let AC = Key128.substr(index + 32, 1);
                    let Encry1 = Key128.substr(index, 32);
                    let Encry2 = md5(Encry1 + Key128.substr(index + 32, 1)); 
                    if(listPrize && listPrize.length < 5){
                        listPrize.push({
                            AC,
                            Encry1,
                            Encry2,
                        })
                    } 
                }
                saveData5(listPrize);  
            }
        }
    }
    xhr.send();
}

function saveData(data){
    let dataKey = "Key32Bytes1=" + data.Encry1 + "&Key32Bytes2=" + data.Encry2;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", dataDefault.urlSaveData);
    
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);
        if (response.data === 'ok') {
            activeGift1(data.AC);
        }
    }   

    let dataSend = `{
        data: ${dataKey}
    }`;

    xhr.send(dataSend);
};

function saveData5(data){
    let dataKey = [];
    if(data){
        for(let i = 0; i < data.length; i++){
            dataKey.push("Key32Bytes1=" + data[i].Encry1 + "&Key32Bytes2=" + data[i].Encry2);
        }
    }
    let xhr = new XMLHttpRequest();
    xhr.open("POST", dataDefault.urlSaveData);
    
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);
        if (response.data === 'ok') {
            activeGift5(data);
        }
    }   

    let dataSend = `{
        data: ${dataKey}
    }`;

    xhr.send(dataSend);
};

function activeGift1(elementActive){
    const classActive = getImgClass(elementActive);
    const element = document.getElementById('img-gift1');
    const elGiftName = document.getElementById('img-gift1-name');
    element.classList.add(classActive);
    elGiftName.textContent = dataDefault.items[elementActive].name;
    openPopUp("popup__gift-1");
}

function activeGift5(listElementActive){
    let nameOf5Gift = [];    
    let lengthListElement = listElementActive.length;
    if(listElementActive){
        for(let i = 0; i < lengthListElement; i++){
            const classActive = getImgClass(listElementActive[i].AC);
            const nameGiftActive = getNameGiftActive(listElementActive[i].AC);
            const element = document.getElementById(`gift__image-position-${i+1}`);
            element.classList.add(classActive);
            nameOf5Gift.push(nameGiftActive);
        }
    }
    const elGiftName = document.getElementById('img-gift5-name');
    elGiftName.textContent = nameOf5Gift.join(' | ');
    openPopUp("popup__gift-5");
}

