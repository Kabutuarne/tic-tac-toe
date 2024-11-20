const klase_x = 'x';
const klase_o = 'circle';

const uzvarasNosacijumi = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const visiLaucini = document.querySelectorAll('.cell');
const rezultatuLogs = document.getElementById('resultBox');
const rezultatuPazinojums = document.querySelector('.resultInfo');
const restartButton = document.getElementById('restartButton');
const attelotSpeletaju = document.querySelector('.display');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const body = document.body;
const colorX = '#1c2c1a';
const colorO = '#1a252c';


uzstadaDatus();
let speletajsO;

saktSpeli();
restartButton.addEventListener('click', saktSpeli);

function saktSpeli() {
    speletajsO = false;
    visiLaucini.forEach(laucins => {
        laucins.classList.remove(klase_o);
        laucins.classList.remove(klase_x);
        laucins.removeEventListener('click', lietotajaDarbiba);
        laucins.addEventListener('click', lietotajaDarbiba, { once: true });
    });
    attelotSpeletaju.innerText = 'x';
    rezultatuLogs.classList.remove('show');
    atkrasoLaucinus();
}

function lietotajaDarbiba(klikskis) {
    const laucins = klikskis.target;
    const aktivaisSpeletajs = speletajsO ? klase_o : klase_x;
    atzimetLaucinu(laucins, aktivaisSpeletajs);
    if (parbauditUzvaru(aktivaisSpeletajs)) {
        beigtSpeli(false);
    } else if (neizskirts()) {
        beigtSpeli(true);
    } else {
        speletajsO = !speletajsO;
        paradaSpeletaju();
    }
}

function atzimetLaucinu(laucins, aktivaisSpeletajs) {
    laucins.classList.add(aktivaisSpeletajs);
}

function paradaSpeletaju() {
    //attelotSpeletaju.innerText = speletajsO ? 'o' : 'x';
    if(speletajsO){
        attelotSpeletaju.innerText = 'o';
        body.style.backgroundColor = colorO;
    }else{
        attelotSpeletaju.innerText = 'x';
        body.style.backgroundColor = colorX;
    }
}

function beigtSpeli(neizskirts) {
    if (neizskirts) {
        rezultatuPazinojums.innerText = 'Neizšķirts rezultāts';
    } else {
        //rezultatuPazinojums.innerText = `${speletajsO ? 'o' : 'x'} uzvarēja`;
        if(speletajsO){
            rezultatuPazinojums.innerText = `O uzvarēja!`
            punktiO++;
        }else{
            rezultatuPazinojums.innerText = `X uzvarēja!`
            punktiX++;
        }
    }
    parbauditUzvaru();
    setTimeout(function () {
        ievietoLocalStorage();
        paradaPunktus();
        rezultatuLogs.classList.add('show');
    }, 1000)
}

function neizskirts() {
    return [...visiLaucini].every(laucins => {
        return laucins.classList.contains(klase_o) || laucins.classList.contains(klase_x);
    });
}

function parbauditUzvaru(aktivaisSpeletajs) {
    return uzvarasNosacijumi.some(nosacijums => {
        const uzvarasLaucini = nosacijums.every(index => {
            return visiLaucini[index].classList.contains(aktivaisSpeletajs);
        });
        if (uzvarasLaucini) {
            iekrasoLaucinus(nosacijums);
        }
        return uzvarasLaucini;
    });
}

function dzestPunktus(){
    punktiO = 0;
    punktiX = 0;
    console.log("Punkti dzēsti");
    paradaPunktus();
    ievietoLocalStorage();
}

function paradaPunktus(){
    scoreX.innerText = `X - ${punktiX} punkti`;
    scoreO.innerText = `O - ${punktiO} punkti`;
}

function ievietoLocalStorage(){
    localStorage.setItem('punktiO', punktiO);
    localStorage.setItem('punktiX', punktiX);
}

function uzstadaDatus(){
    if(localStorage.getItem('punktiO') !== null){
        punktiO = parseInt(localStorage.getItem('punktiO'), 10);
        punktiX = parseInt(localStorage.getItem('punktiX'), 10);
        console.log("iet");
    } else {
        punktiO = 0;
        punktiX = 0;
        console.log("bruh");
    }
    paradaPunktus();
}
function iekrasoLaucinus(nosacijums){
    visiLaucini[nosacijums[0]].classList.add("uzvara")
    visiLaucini[nosacijums[1]].classList.add("uzvara")
    visiLaucini[nosacijums[2]].classList.add("uzvara")
}
function atkrasoLaucinus(){
    visiLaucini.forEach(laucins => { laucins.classList.remove("uzvara"); });
}
function padoties(){
    speletajsO = !speletajsO;
    beigtSpeli(false);
}
