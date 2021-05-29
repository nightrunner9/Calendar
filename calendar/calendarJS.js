let parentDiv1 = document.querySelector('#div1')


function createKalendar(parent){
    let dayNow = new Date()
    let choosenMonth = [dayNow.getFullYear(), dayNow.getMonth()]
    createControls(parent)
    let today = dayNow.getDate()
    let weeks
    let days
    function createControls(parent){
        let months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
        let div11 = document.createElement('div')
        parent.appendChild(div11)
        div11.className ='div11'
        let divPrev = document.createElement('div')
        div11.appendChild(divPrev)
        divPrev.className = 'divPrev'
        let divMonth = document.createElement('div')
        div11.appendChild(divMonth)
        divMonth.className = 'divMonth'
        divMonth.innerHTML = months[choosenMonth[1]] + ' ' + choosenMonth[0]+ 'г'
        let divNext = document.createElement('div')
        div11.appendChild(divNext)
        divNext.className = 'divNext'
        divPrev.addEventListener('click',function(){
            let mo
            let year
            let t1 = document.querySelector('.t1')
            parent.removeChild(t1)
            if(choosenMonth[1]==0){
                mo = 11
                year = choosenMonth[0] - 1

            } else {
                mo = choosenMonth[1] - 1
                year = choosenMonth[0]
            }
            choosenMonth = [year,mo]
            divMonth.innerHTML = months[choosenMonth[1]] + ' ' + choosenMonth[0]+ 'г'
            createTable(parent,year,mo)
        })
        divNext.addEventListener('click',function(){
            let mo1
            let year1
            let t11 = document.querySelector('.t1')
            parent.removeChild(t11)
            if(choosenMonth[1]==11){
                mo1 = 0
                year1 = choosenMonth[0] + 1
            } else {
                mo1 = choosenMonth[1] + 1
                year1 = choosenMonth[0]
            }
            choosenMonth = [year1,mo1]
            divMonth.innerHTML = months[choosenMonth[1]] + ' ' + choosenMonth[0]+ 'г'
            createTable(parent,year1,mo1)
        })
    }



    createTable(parent,choosenMonth[0],choosenMonth[1])

    function createTable(parent,year,month){
        days1 = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']
        let table = document.createElement('table')
        parent.appendChild(table)
        table.className = 't1'
        let tr = document.createElement('tr')
        tr.className = 'newTr_Th'
        table.appendChild(tr)
        for(let i = 0; i < 7; i++){
            let th = document.createElement('th')
            tr.appendChild(th)
            th.className = 'newTh'
            th.innerHTML = days1[i]
        }
        weeks = getWeeks(year,month)
        let count = 0     // счет конкретно для weeks
        let flag = 'grey'
        for(let i = 0; i < 6; i++){
            let newtr = document.createElement('tr')
            newtr.className = 'newTr_Td'
            table.appendChild(newtr)
            for(let j = 0; j < 7; j++){
                let td = document.createElement('td')
                if(weeks[count] == 1 && flag == 'grey'){
                    flag = 'black'
                }
                else if(weeks[count] == 1 && flag == 'black'){
                    flag = 'grey'
                }

                td.style.color=flag

                td.className = 'newTd'
                newtr.appendChild(td)
                if (dayNow.getFullYear() == year && dayNow.getMonth() == month && today == weeks[count] && td.style.color == 'black' ){
                    td.classList.add('newTdNow')
                } 
                else if (dayNow.getMonth() != month){
                    td.classList.add('newTdWrongDate')
                    
                }
                td.innerHTML = weeks[count++]
            
            }

        console.log(weeks)

    }
        function selectTd (e){
            e.stopPropagination
            let tds = document.querySelector('.selectedDate')
            let selectedTd = e.target.closest('td')
            selectedTd.classList.add('selectedDate')
            console.log(year + '',zero(month),e.target.innerHTML + '')


            if (tds != null){
                tds.classList.remove('selectedDate')

            }                 

    }

    table.addEventListener('click',selectTd)

}


    function getWeeks(year,month){
        
        let firstDay = getFirstDay(year,month)
        let daysNum = getDaysNum(year,month)                        //кол во дней в текущем месяце
        let prevMonthDaysNum = getDaysNum(year,month-1)             //прошлый месяц
        let firstWeekDate = getfirstWeekDate(firstDay,prevMonthDaysNum)
        days = []

        for(let i = firstWeekDate; i <= prevMonthDaysNum; i++){    //заполняем календарь прошлыми числами прошлого месяца от 26 - 30 
            days.push(i)
        }                           
        let firstArrLength = days.length                    //кол-во дней прошлого месяца (26-30)
        for(let i = 1; i <= daysNum; i++){
            days.push(i)
        }
        console.log(firstArrLength)                 //второй цикл не вернул длинну массива
        let nextDaysNum = 42 - daysNum - firstArrLength   //узнаем колво дней в конце календаря
        
        for(let i = 1; i <= nextDaysNum; i++){          //добавляем в календарь оставшиеся первые дни следю месяца
            days.push(i)
        }
        
       



        function getFirstDay(year,month){            //узнаем день недели на который попадает первое число
            let firstDate = new Date(year,month,1)
            return firstDate.getDay()
        }
        function getDaysNum(year,month){            //кол-во дней в текущем месяце 
            let nextMonth = new Date(year,month+1,0)
            return nextMonth.getDate()
        }
        function getfirstWeekDate(firstDay,prevMonthDaysNum){     //должна вернуть 26 предыдущего месяца
            let daynums                             
            let result 
            if (firstDay == 0) {        //если это воскресенье firstDay это день неедли
                daynums = 6
                result = prevMonthDaysNum - 5 
            } 
            else if (firstDay == 1){
                daynums = 7
                result = prevMonthDaysNum - 6
            } else {
                daynums = firstDay - 1     //в противном случае , мы узнаем сколько дней перед определенным числом
                result = prevMonthDaysNum - daynums + 1
            }
            return result
        }
        


        return days
    } 

    function zero (arg){
        if (arg < 10){
            return '0' + arg
        } else {
            return arg
        }
    }


}

createKalendar(parentDiv1)

