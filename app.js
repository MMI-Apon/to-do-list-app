document.getElementById('inp-btn').addEventListener('click', () =>{
    const inpText = document.getElementById('inp-field').value;
    if(inpText.length === 0){
        alert('Please Enter A Task')
    }
    else{
        document.getElementById('to-do').innerHTML += `<div>
                <h4 class="task">${inpText}</h4>
                <i class="fa-regular fa-trash-can"></i>
            </div>`;
    }
    document.getElementById('inp-field').value = '';

    // deleteing task

    let deletes = document.querySelectorAll('.fa-trash-can');
    for(let dlt of deletes){
        dlt.addEventListener('click', (event) => {
            event.target.parentNode.remove();
        })
    }

    // task done

    let tasks = document.querySelectorAll('.task');
    for(let task of tasks){
        task.addEventListener('click', (event) => {
            event.target.classList.toggle('complete');
        })
    }
});
