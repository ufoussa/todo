//fetch("task.json")
//  .then(response => response.json())
//  .then(json => {
//    json.forEach(task => {
//        console.log(task.name)
//    });
//});
tasks=document.querySelector(".task-list ul");
categories=document.querySelector(".cat ul");
document.addEventListener("DOMContentLoaded", ()=>{
    let taskUL=document.querySelector(".task-list ul");
    fetch("task.json")
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                let LI=document.createElement("LI");
                LI.innerHTML=generateTaskLi(task);
                taskUL.appendChild(LI);
            });
        });
});

/*Search*/

let searchDom = document.querySelector(".nav-left .search input[type='text']");
searchDom.addEventListener("keyup", function (e) {
    searchText = e.target.value;
    
    tasks.innerHTML="";

    fetch("task.json")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.forEach((task) => {
            
            LI=document.createElement("LI");
            if (task["name"].includes(searchText)) {
                LI.innerHTML=generateTaskLi(task);
                tasks.appendChild(LI);
            } 

        });
    });
    // console.log(e.target.value);
    // const taskUL = document.querySelector(".task-list ul");
    // const tasksLI = taskUL.querySelectorAll("li .tasks");
    // tasksLI.forEach((taskLI) => {
    //     let taskname = taskLI.lastElementChild.textContent;
    //     if (taskname.includes(searchText)) {

    //     } else {
    //         const parentEle = taskLI.parentElement;
    //         taskUL.removeChild(parentEle);
    //     }
    // });
});

function generateTaskLi(task){
    task = `
    <div class="tasks">
        <input type="checkbox" name="playing-game" />
        <label>${task.name}</label>
    </div>
    <div class="desc">
       <span>${task.catgory}</span>
        <span>${task.create_at}</span>
    </div>
    `;
    return task;
}

document.addEventListener("DOMContentLoaded", ()=>{
    let tagUL=document.querySelector(".list-group");
    fetch("tag.json")
        .then(response => response.json())
        .then(tags => {
            tags.forEach(tag => {
                let LE=document.createElement('LE');
                LE.innerHTML=generateTagLe(tag);
                tagUL.appendChild(LE);
            });
        });
});

function generateTagLe(tag){
    let le = `<li onclick="fillter_task('${tag.task_name}')">
    <div class="toy">
    <span class="material-symbols-outlined">${tag.logo}</span>
    <span>${tag.task_name}</span>
</div>
    <div class="badge">
    ${tag.badge}
    </div>
    </li>
    `;
    return le;
}
/* Add New */
let btnAddNewTask=document.querySelector("#Add-New");
btnAddNewTask.addEventListener("click",function(e){
    btnAddNewTask.innerHTML="";
    let inputTaskName=document.createElement("input");
    let inputTaskCheck=document.createElement("input");
    // let inputSelect=document.createElement("input");
    inputTaskCheck.setAttribute("type","checkbox");
    inputTaskName.setAttribute("type","text");
    inputTaskName.setAttribute("placeholder","enter new task...");
    // inputSelect.setAttribute("type","dropdown");
    btnAddNewTask.appendChild(inputTaskCheck);
    btnAddNewTask.appendChild(inputTaskName);
    // btnAddNewTask.appendChild(inputSelect);
    
    
    inputTaskName.focus();
    inputTaskName.addEventListener("keyup",function(e){
        if(e.code=="Enter"){
            const d="20-Oct-2022";
            let new_task_name=e.target.value;
            let task={
                name:new_task_name,
                catgory:"N/A",
                create_at:d,
            };

            let LI=document.createElement("LI");
            LI.innerHTML=generateTaskLi(task);
            tasks.appendChild(LI);

            inputTaskName.value="";
        }
    });
    // inputTaskName.addEventListener("change",function(e){    
    //     if(e.target.value==""){
    //         btnAddNewTask.innerHTML=`
    //         <span class="material-symbols-outlined">add_circle</span>
    //         <span>Add New Task</span>
    //         `;
    //     }
    // });
});   

/* Filtter Task */

function fillter_task(name){
    tasks.innerHTML="";
    fetch("./task.json")
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        data.forEach((task)=>{
            
            if(name=="All tasks"){
                LI=document.createElement("LI");
                LI.innerHTML=generateTaskLi(task);
                tasks.appendChild(LI);
            }
            if(task.catgory==name){
                LI=document.createElement("LI");
                LI.innerHTML=generateTaskLi(task);
                tasks.appendChild(LI);
            }

        })

    });
    
}
let btnAddNewCategory=document.querySelector(".Add");
console.log(btnAddNewCategory);
btnAddNewCategory.addEventListener("click",function(e){
    let newCategoryLI=document.createElement("LI");
    newCategoryLI.innerHTML=`
    <div class="toy">
    <span class="material-symbols-outlined">list_alt</span>
    <input type="text">
</div>`;
categories.appendChild(newCategoryLI);
newCategoryInput=newCategoryLI.querySelector("input");
// newCategoryInput.setAttribute("Value","New Category...");
newCategoryInput.focus();
});

// seleted.addEventListener(("click"),function(e)=>{
//     let seletedLI=document.createElement("LI");
// })

// var select=document.getElementById("select");
// var selecttext=document.getElementById("selecttext");
// var options=document.getElementsByClassName("options");
// var ltask=document.getElementById("ltask");

// select.onclick=function(){
//     ltask.classList.toggle("hide");
// }
// for(option of options){
//     option.onclick=function(){
//         selecttext.innerHTML=this.textContent;
//         ltask.classList.toggle("hide");
//     }
// }