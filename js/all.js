new Vue({
    el: '#app',
    data: {
        dataArray : JSON.parse(localStorage.getItem('dataArray')) || [],
        tallValue: '',
        weightValue: '',
        showDefaultBtn: true,
        showResultBtn: false,
        colorClass: '',
        bmiValClassContent: '',
        rangeClassContent: '',
        delAll: true,
    },
    mounted(){
        this.delAllCondition();
    },
    updated(){
        this.delAllCondition();
    },
    methods: {
        calBMI(){
            if (this.tallValue === "" || this.weightValue ==="") {
                this.$el.querySelector('#header em').textContent = '身高與體重皆須填寫';
                return;
            }
            this.$el.querySelector('#header em').textContent = '';

            //get dataArray
            let tallData = parseInt(this.tallValue).toFixed(1);
            let weightData = parseInt(this.weightValue).toFixed(1);
            let BMIData = (this.weightValue/(this.tallValue*this.tallValue/10000)).toFixed(2);
            let todayData = new Date().getMonth()+1 + "-" + new Date().getDate() + "-" + new Date().getFullYear();
            
            let switchFn = this.switchFn(BMIData);
            let rangeData = switchFn.range;
            let colorData = switchFn.color;
            console.log(tallData,weightData,BMIData,todayData,rangeData,colorData)
            
            //push data
            this.colorClass = colorData;
            this.bmiValClassContent = BMIData;
            this.rangeClassContent = rangeData;

            //update array & localStorage
            let dataObject = {
                tallData : tallData,
                weightData : weightData,
                BMIData : BMIData,
                todayData : todayData,
                rangeData: rangeData,
                colorData: colorData
            }
            this.dataArray.unshift(dataObject);
            localStorage.setItem('dataArray',JSON.stringify(this.dataArray));

            // change btn
            this.showDefaultBtn = false;
            this.showResultBtn = true;
            this.delAll = true;
        },
        restoreInitial(){
            this.tallValue = '',
            this. weightValue = '',
            this.showDefaultBtn = true;
            this.showResultBtn = false;
        },
        switchFn(val){
            let range;
            let color;
            switch(true) {
                case (val < 18.5):
                    range = '過輕';
                    color = 'blue'
                    break;
                case (val < 25):
                    range = '正常';
                    color = 'green';
                    break;
                case (val < 30):
                    range = '偏重';
                    color = 'lightorange';
                    break;
                case (val < 35):
                    range = '嚴重肥胖';
                    color = 'orange';
                    break;
                case (35 < val):
                    range = '紅色警戒';
                    color = 'red';
                    break;
            }
            return { range: range , color : color };
        },
        showAndDelBtn(index,event){
            event.stopPropagation();
            switch(true) {
                case event.target.classList == "showBtn":
                    event.preventDefault();
                    event.target.parentNode.lastElementChild.style.display="block";
                    break;
                case event.target.classList == "delA":
                    event.preventDefault();
                     this.dataArray.splice(index,1);
                     localStorage.setItem('dataArray',JSON.stringify(this.dataArray));
                     event.target.parentNode.parentNode.lastElementChild.style.display="none";
                     break;
            }
        },
        delAllItem() {
            this.dataArray = [];
            localStorage.setItem('dataArray',JSON.stringify(this.dataArray));
            this.delAll = false;
        },
        delAllCondition(){
            if (this.dataArray.length === 0){
                this.delAll = false;
            } else {
                this.delAll = true;
            }
        }

    }
});


document.addEventListener("click" , hide );
function hide(e){
    if (e.target.className !== "delA") {
        let hideBtn = document.querySelectorAll('.hideBtn');
        for (let i = 0 ; i < hideBtn.length ; i++) {
            hideBtn[i].style.display="none";
        }
    }  
}