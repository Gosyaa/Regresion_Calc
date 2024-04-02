const numberInput = document.querySelector('#number-of-experiments');
numberInput.addEventListener('change', numHandle);

const form = document.querySelector('.experiment-form');
form.addEventListener('submit', calc);

let pairNumber = 0;

function setOk(event){
    this.classList.add("number-ok");
    this.classList.remove("number-wrong");
}

function clear(n){
    let toRemoveX = document.getElementsByClassName('experiment-data-x');
    let toRemoveY = document.getElementsByClassName('experiment-data-y');
    let toRemoveBr = document.getElementsByClassName('experiment-data-br');
    while (toRemoveX[n] && toRemoveY[n] && toRemoveBr[n]){
        toRemoveX[n].parentNode.removeChild(toRemoveX[n]);
        toRemoveY[n].parentNode.removeChild(toRemoveY[n]);
        toRemoveBr[n].parentNode.removeChild(toRemoveBr[n]);
    }
}

function createInput(n){
    //clear();
    for (let i = 0; i < n; i++){
        if (!document.getElementById("x" + (i + 1))){
            let input = document.createElement('input');
            input.className = "experiment-data-x";
            input.classList.add("experiment-data");
            input.classList.add("number-ok");
            input.addEventListener('change', setOk);
            input.id = "x" + (i + 1);
            input.type = "number";
            input.placeholder = 'x';
            input.name = input.id;
            input.step = 0.00001;
            form.appendChild(input);
        }
        if (!document.getElementById("y" + (i + 1))){
            input = document.createElement('input');
            input.className = "experiment-data-y";
            input.classList.add("experiment-data");
            input.classList.add("number-ok");
            input.addEventListener('change', setOk);
            input.id = "y" + (i + 1);
            input.type = "number";
            input.placeholder = 'y';
            input.name = input.id;
            input.step = 0.00001;
            form.appendChild(input);
            let mybr = document.createElement('br');
            mybr.classList.add("experiment-data-br");
            form.appendChild(mybr);
        }
    }
    clear(n);
    pairNumber = n;
}

function numHandle(event) {
    if (/^\d+$/.test(numberInput.value)){
        let n = Number(numberInput.value);
        if (n <= 0 || n >= 50){
            numberInput.classList.add("number-wrong");
            numberInput.classList.remove('number-ok');
        }
        else{
            numberInput.classList.add("number-ok");
            numberInput.classList.remove('number-wrong');
            createInput(n);
        }
    }
    else{
        numberInput.classList.add("number-wrong");
        numberInput.classList.remove('number-ok');
    }
}

function disableY(){
    let elemetsY = document.getElementsByClassName('experiment-data-y');
    for (let i = 0; i < pairNumber; i++){
        elemetsY[i].disabled = "disabled";
    }
}

function calc(event){
    event.preventDefault();

    let xy = 0, X = 0, Y = 0, xx = 0, yy = 0;
    let ok = true;
    for (let i = 0; i < pairNumber; i++){
        let idx = 'x' + (i + 1), idy = 'y' + (i + 1);
        let cur_x = document.getElementById(idx).valueAsNumber;
        let cur_y = document.getElementById(idy).valueAsNumber;
        if (cur_x && cur_y){
            xy += (cur_x * cur_y);
            X += cur_x;
            Y += cur_y ;
            yy += (cur_y * cur_y);
            xx += (cur_x * cur_x);
        }
        else{
            if (!cur_x){
                document.getElementById(idx).classList.remove('number-ok');
                document.getElementById(idx).classList.add('number-wrong');
            }
            if (!cur_y){
                document.getElementById(idy).classList.remove('number-ok');
                document.getElementById(idy).classList.add('number-wrong');
            }
            ok = false;
        }
    }
    if (!ok)
        return false;
    disableY();

    let a = (pairNumber * xy - X * Y) / (pairNumber * xx - X * X);
    let b = (xx * Y - X *  xy) / (pairNumber * xx - X * X);
    let R = (pairNumber * xy - X * Y) / Math.sqrt((pairNumber * xx - X * X) * (pairNumber * yy - Y * Y));

    let inputN = document.createElement('input');
    inputN.type = 'number';
    inputN.value = pairNumber;
    inputN.type = 'hidden';
    inputN.name = 'n';
    form.appendChild(inputN);

    let inputA = document.createElement('input');
    inputA.type = 'number';
    inputA.value = a;
    inputA.type = 'hidden';
    inputA.name = 'a';
    form.appendChild(inputA);

    let inputB = document.createElement('input');
    inputB.type = 'number';
    inputB.value = b;
    inputB.type = 'hidden';
    inputB.name = 'b';
    form.appendChild(inputB);

    let inputR = document.createElement('input');
    inputR.type = 'number';
    inputR.value = R;
    inputR.type = 'hidden';
    inputR.name = 'R';
    form.appendChild(inputR);

    form.submit();

    form.removeChild(inputA);
    form.removeChild(inputB);
    form.removeChild(inputR);
    form.removeChild(inputN);
}