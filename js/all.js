
var data = JSON.parse(localStorage.getItem('dataArray')) || [];
var tallInput = document.querySelector('.tall');
var weightInput = document.querySelector('.weight');
var defaultBtn = document.querySelector('.default a');


tallInput.addEventListener('blur' , checkInput , false);
weightInput.addEventListener('blur' , checkInput , false);
document.querySelector('.result a').addEventListener("click" , refreshPage , false);
defaultBtn.addEventListener('click' , calBMI , false);
document.addEventListener("click" , hide, false);


updataPage();

function checkInput(e){
    var check = e.target.value;
    if (check == '') {
        alert('身高與體重皆須填寫');
    }
}

function refreshPage(){
    location.reload();
}

function calBMI(){
    var weight = parseInt(document.querySelector('.weight').value).toFixed(1);
    var tall = parseInt(document.querySelector('.tall').value).toFixed(1);
    var BMI = (weight/(tall*tall/10000)).toFixed(2);
    var today = new Date().getMonth()+1 + "-" + new Date().getDate() + "-" + new Date().getFullYear();

    if (document.querySelector('.weight').value == "" || document.querySelector('.tall').value == "") {
        alert('身高與體重皆須填寫');
        return;
    }
    // change header btn
    var resultNode = document.querySelector('.result');
    document.querySelector('.default').style.display = "none";
    resultNode.style.display = "inline-block";
    resultNode.querySelector('.bmiVal').textContent = BMI;

    var switchF = switchFun(BMI);
    resultNode.querySelector('.range').textContent = switchF.comment;
    resultNode.classList.add(switchF.color);
    resultNode.querySelector('a').classList.add(switchF.color);

    //update array
    var dataObject = {
        weightData : weight,
        tallData : tall,
        BMIData : BMI,
        todayData : today
    }
    data.push(dataObject);
    localStorage.setItem('dataArray',JSON.stringify(data));
    addItem(data.length - 1, dataObject);
}

function updataPage(){
    document.querySelector('.data').innerHTML="";
    for(var i = 0 ; i < data.length ; i++ ) {
        addItem(i, data[i])
    }
}
function addItem(i, item) {
    var weight = item.weightData;
    var tall =  item.tallData;
    var BMI = item.BMIData;
    var today = item.todayData;

    var newNode = document.createElement('div');  //新 div
    document.querySelector('.data').prepend(newNode); //指定新節點 插入位置
    newNode.setAttribute('class' , 'row');

    var switchF = switchFun(BMI);
    var content = '<div class="threePoint"><a class="showBtn" href="#">⋮</a><div class="hideBtn"><a class="delA" href="#" data-num="'+i+'">刪除</a></div></div><div class="col-sm-2 not">'+switchF.comment+'</div><div class="col-sm-2" data-bmi="'+i+'"><em>BMI</em>'+BMI+'</div><div class="col-sm-3" data-weight="'+i+'"><em>weight</em>'+weight+'kg</div><div class="col-sm-3" data-tall="'+i+'"><em>height</em>'+tall+'cm</div><div class="col-sm-2" data-today="'+i+'">'+today+'</div>';
    newNode.innerHTML = content;
    newNode.classList.add(switchF.color);
    newNode.querySelector('.threePoint').addEventListener('click' , del , false);
}

function switchFun(val){
    var comment;
    var color;
    switch(true) {
        case (val < 18.5):
            comment = '過輕';
            color = 'blue'
            break;
        case (val < 25):
            comment = '正常';
            color = 'green';
            break;
        case (val < 30):
            comment = '偏重';
            color = 'lightorange';
            break;
        case (val < 35):
            comment = '嚴重肥胖';
            color = 'orange';
            break;
        case (35 < val):
            comment = '紅色警戒';
            color = 'red';
            break;
    }
    return { comment: comment , color : color };
}

function del(e){
    e.stopPropagation();
    switch(true) {
        case e.target.classList == "showBtn":
            e.preventDefault();
            e.target.parentNode.lastElementChild.style.display="block";
            break;
        case e.target.classList == "delA":
             e.preventDefault();
             var num = e.target.dataset.num;
             data.splice(num,1);
             localStorage.setItem('dataArray',JSON.stringify(data));
             updataPage();
             break;
    }
}

function hide(e){
    if (e.target.className !== "delA") {
        var hideBtn = document.querySelectorAll('.hideBtn');
        for (var i = 0 ; i < hideBtn.length ; i++) {
            hideBtn[i].style.display="none";
            console.log(hideBtn[i]);
        }
    }  
}


