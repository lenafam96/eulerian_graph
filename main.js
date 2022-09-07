let swap_mode = true;
let defaultCol = 3;
let array = [];
let u;

function swap_mode_button(){
    remove_input();
    if(swap_mode)
        create_textarea();
    else
        create_matrix_input();
    swap_mode = swap_mode?false:true;
}

function clear_input(){
    remove_input();
    if(swap_mode){
        create_matrix_input();
    }
    else{
        create_textarea();
    }
}


function disable_button(){
    let add = document.getElementById("increment-size-button");
    let sub = document.getElementById("decrement-size-button");
    add.setAttribute('disabled', '');
    sub.setAttribute('disabled', '');
}

function enable_button(){
    let add = document.getElementById("increment-size-button");
    let sub = document.getElementById("decrement-size-button");
    add.removeAttribute('disabled');
    sub.removeAttribute('disabled');
}

function create_textarea(){
    var container = document.getElementById('container');
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    let input = document.createElement('textarea');
    input.rows = 10;
    input.cols = 50;
    input.id = "input-matrix";
    input.placeholder = "0 1 0 0 0\n1 0 1 1 1\n0 1 0 1 0\n0 1 1 0 1\n0 1 0 1 0";
    container.appendChild(input);
    disable_button();
}

function create_matrix_input(){
    let table = document.createElement('table');
    for(let i = 0; i<defaultCol;i++){
        let tr = document.createElement('tr');
        for(let j = 0; j<defaultCol;j++){
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.id='cell-'+i+'-'+j;
            input.type = 'number';
            input.min = 0;
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    container.appendChild(table);
    enable_button();
}

function remove_input(){
    var container = document.getElementById('container');
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

function add() {
    remove_input();
    defaultCol+=1;
    create_matrix_input();
}


function sub(){
    remove_input();
    defaultCol = defaultCol<2?1:--defaultCol;
    create_matrix_input();
}

function checkValidMatrix(){
    for (const row of array) {
        if(row.length != array.length)
            return false;
        for (const item of row) {
            if(!Number.isFinite(item))
                return false;
        }
    }
    for (const row of array) {
        for (const item of row) {
            if(item!=0)
                return true;
        }
    }
    return false;
}

function checkExist(){
    let s,d = 0;
    for (let i = 0; i < array.length; i++) {
        s = 0;
        for (let j = 0; j < array.length; j++) 
            s += array[i][j];
            if(s%2) {
                    d++;
                    u = i;
                }
    }
    return d;
}

function PathEuler(){
    let v, x, top, dCE;
    let stack = [], CE = [];
    top = 1;
    stack[top]=u;
    dCE = 0;
    do{
        v = stack[top];
        x=0;
        while(x<array.length && array[v][x]==0)
            x++;
        if(x>=array.length){
            dCE++;
            CE[dCE]=v;
            top--;
        }
        else {
            top++;
            stack[top]=x;
            array[v][x]=0;
            array[x][v]=0;
        }
    }while (top);
    let path = "";
    for(x=dCE;x>1;x--)
        path+=CE[x]+"->";
    path+=CE[x];
    return path;
}

function main(){
    array = []
    let conclusion = document.getElementById("conclusion");
    let result = document.getElementById("result");
    if(swap_mode){
            for(let i = 0; i<defaultCol;i++){
            let row = []
            for(let j = 0; j<defaultCol;j++){
                if(document.getElementById('cell-'+i+'-'+j).value!=="")
                    row.push(Number(document.getElementById('cell-'+i+'-'+j).value));
            }
            array.push(row);
        }
    }
    else{
        let matrix = document.getElementById('input-matrix').value;
        array = matrix.split('\n').map(function(row){
            return row.split(" ").map(Number);
        });
    }
    if(checkValidMatrix()){
        let d = checkExist();
        if(d===0){
                u = 1;
                let circuit = PathEuler();
                conclusion.innerHTML = "Có chu trình Euler: ";
                result.innerHTML = circuit;
        }
        else{
            if(d===2) {
                let path = PathEuler();
                conclusion.innerHTML = "Có đường đi Euler: ";
                result.innerHTML = path;
            }
            else {
                conclusion.innerHTML = "Không có đường đi Euler vì đồ thị có "+d+" đỉnh bậc lẻ!";
                result.innerHTML = "";
            }
        }
    }
    else {
            conclusion.innerHTML = "Ma trận kề không hợp lệ!";
            result.innerHTML = "";
    }
}