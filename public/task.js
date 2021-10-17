const taskList = document.querySelector('.task-list');
const submit = document.getElementById('submit');

const getData = async()=>{
    const res = await fetch('http://127.0.0.1:3000/api/v1/tasks/');
    const data = await res.json();
    return data;
}

const deleteTask = async(id)=>{
    const res  = await fetch(`http://127.0.0.1:3000/api/v1/tasks/${id}`,
        {
            method:"delete",
        }
    )
    const data  = await res.json()
    console.log(data);
    
}

const editTask = async(element)=>{
    const dataEl = { name:element.name , completed: !element.completed }
    const res = await fetch(`http://127.0.0.1:3000/api/v1/tasks/${element._id}`,{
        method:"PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
         body:JSON.stringify(dataEl)  
    })
    const data = await res.json()
    return data;
}

const postData = async(nameValue)=>{
    const dataEl = {name:nameValue}
    const res = await fetch('http://127.0.0.1:3000/api/v1/tasks/',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(dataEl)  
        })

    const data = res.json()
    return data
}

const showList = async() =>{
    const tasks =  await getData();
    document.querySelector('.loading').style.display = "none"

    if (tasks.length < 1){
        
        taskList.innerHTML ="<h2>No Task <h2>"
    }

    tasks.forEach(element => {
        const task = document.createElement('div');
        task.classList.add('task');
        
        if(element.completed === 'true'){
            task.classList.add('outline')
        }
        
        task.innerHTML = `
        <p>${element.name}</p>
        <div class="btn-container">
            <button class="btn">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        `

        const deleteBtn = task.querySelector('.fa-trash');
        deleteBtn.addEventListener('click',async()=>{
           const isDelete =  await  deleteTask(element._id)
           location.reload()
        }) 

        const editBtn = task.querySelector('.fa-edit');
        editBtn.addEventListener('click',async(e)=>{
            const isEdited = await editTask(element)
            location.reload()
        })
      
        taskList.appendChild(task)
    });
    
}

submit.addEventListener('click',async(e)=>{
    e.preventDefault()
    let name = document.querySelector('.name').value;
    const isPosted = await postData(name)
    location.reload()
})

showList()

