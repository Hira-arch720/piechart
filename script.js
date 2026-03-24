document.addEventListener('DOMContentLoaded',()=>{
    const expenseForm=document.getElementById('expense-form');
    const monthSelect=document.getElementById('month');
    const yearSelect=document.getElementById('year');
    const amountInput=document.getElementById('amount');
    const expenseChart=document.getElementById('expense-chart');
    let selectedMonth;
    let selectedYear;
    let chart; // ✅ FIX

    //Generate year option dynamically
for(let year=2020;year<=2040;year++){
    const option=document.createElement('option');
    option.value=year;
    option.textContent=year;
    yearSelect.appendChild(option);
}
//Intialize expenses object with categories
const expenses={
    January:{Housing:0,Food:0, Transportation:0,Bills:0,Miscellaneous:0},
    February:{Housing:0,Food:0, Transportation:0,Bills:0,Miscellaneous:0},
    March:{Housing:0,Food:0, Transportation:0,Bills:0,Miscellaneous:0},
    April:{Housing:0,Food:0, Transportation:0,Bills:0,Miscellaneous:0},
    May:{Housing:0,Food:0, Transportation:0,Bills:0,Miscellaneous:0},
    June:{Housing:0,Food:0, Transportation:0,Bills:0,Miscellaneous:0},
    July:{Housing:0,Food:0, Transportation:0,Bills:0,Miscellaneous:0},
    August:{Housing:0,Food:0, Transportation:0,Bills:0,Miscellaneous:0},
    September:{Housing:0,Food:0, Transportation:0,Bills:0,Miscellaneous:0},
    October:{Housing:0,Food:0, Transportation:0,Bills:0,Miscellaneous:0},
    November:{Housing:0,Food:0, Transportation:0,Bills:0,Miscellaneous:0},
    December:{Housing:0,Food:0, Transportation:0,Bills:0,Miscellaneous:0},
    
};
//Load expenses
function getExpensesFromLocalStorage(month,year){
    const key=`${month}-${year}`;
    return JSON.parse(localStorage.getItem(key))||{};
}
//Save expenses
function saveExpensesToLocalStorage(month,year){
    const key=`${month}-${year}`;
    localStorage.setItem(key,JSON.stringify(expenses[month]));
}
// get Selected Month and Year
function getSelectedMonthYear(){
       selectedMonth=monthSelect.value;
     selectedYear=yearSelect.value;
    if(!selectedMonth||!selectedYear){
        alert("Month or Year not selected");
        return;

    }
    if(!expenses[selectedMonth]){
        expenses[selectedMonth]={Housing:0,Food:0, Transportation:0,Bills:0,Miscellaneous:0};
    }

}
//Update chart
function upadteChart(){
    getSelectedMonthYear();

    const expenseData = getExpensesFromLocalStorage(selectedMonth,selectedYear);

    const dataToUse = Object.keys(expenseData).length 
        ? expenseData 
        : expenses[selectedMonth];

    const ctx=expenseChart.getContext('2d');

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(dataToUse),
      datasets: [{
        
        data: Object.values(dataToUse),
        backgroundColor:[
            ' #FF6384',
            ' #4CAF50',
            ' #FFCE56',
            ' #36A2EB',
            ' #FF9F40',
        ],
      }]
      
    },
    
    options: {
      responsive:true,
      plugins:{
        legend:{
            display:false,
            position:'top',
        },
        tooltip:{
            callbacks:{
                label:function(tooltipItem){
                    return`${tooltipItem.label}:${tooltipItem.raw}`
                }
            }
        }
      }

    }
  });
}
// Handle Form submission
function handleSubmit(event){
    event.preventDefault();
    getSelectedMonthYear();
  
    const category=event.target.category.value;
    const amount=parseFloat(event.target.amount.value);
    
    const currentAmount=expenses[selectedMonth][category]||0;
    if(amount>0){
        expenses[selectedMonth][category]=currentAmount+amount;
    }else if(amount<0&&currentAmount>Math.abs(amount)){
        expenses[selectedMonth][category]=currentAmount+amount;

    }
    else{
        alert("Invaild Amount Cannot reduce Category below zero");
    }

    saveExpensesToLocalStorage(selectedMonth,selectedYear); // ✅ FIX
    upadteChart(); // ✅ FIX

    amountInput.value='';
}
expenseForm.addEventListener('submit', handleSubmit);
monthSelect.addEventListener('change',upadteChart);
yearSelect.addEventListener('change',upadteChart);
// set default month and year on current month and year
function setDeaultMonthYear(){
    const now=new Date();
    const intialMonth=now.toLocaleString('default',{month:'long'});
    const intialYear=now.getFullYear();
    monthSelect.value=intialMonth;
    yearSelect.value=intialYear;
}
setDeaultMonthYear();
upadteChart();
});