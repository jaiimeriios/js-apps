const showData = (data) => {
    const content = document.getElementById('content');
    const todosData = data.map((e) => {
        let template = `
        <div class="todo-section mt-3 py-2 important-${e.important}">
            <h3>${e.title}</h3>
            <p>${e.description}</p>
            <div class="form-check form-switch d-none">
                <input class="form-check-input" type="checkbox"
                data-checked="${e.important}" data-id="${e.id}">
            </div>
            <button data-id="${e.id}" class="edit-button btn btn-xs btn-primary">
                Edit
            </button>
            <button data-id="${e.id}" class="save-button btn btn-xs btn-success d-none">
                Save
            </button>
            <button data-id="${e.id}" class="delete-button btn btn-xs btn-danger">
                Delete
            </button>
        </div>`;
        return template;
    });
    content.innerHTML = todosData.join('');
};

const deleteTodo = (data) => {
    document.querySelectorAll('.delete-button').forEach((btn) => {
        btn.addEventListener('click', (e) => {

            const todoId = e.target.dataset.id;

            const filteredTodo = data.filter((todo) => {
                return todoId === todo.id;
            });

            fetch(`http://localhost:666/todos/${todoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filteredTodo),
            });

            setTimeout(() => {
                getData();
            }, 100);
        });
    });
};

document.getElementById('todo-form').addEventListener('submit', (e) => {
    e.preventDefault();

    let title = document.getElementById('todo-title');
    let description = document.getElementById('todo-description');
    let important = document.getElementById('todo-important');

    if (title.value === '' || description === '') {
        return
    }

    let todos = {
        title: title.value,
        description: description.value,
        important: important.checked,
    };
    todoJSON = JSON.stringify(todos);

    title.value = '';
    description.value = '';
    important.checked = false;

    fetch('http://localhost:666/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: todoJSON,
    });

    setTimeout(() => {
        getData();
    }, 100);
});


// editable
const editTodo = (data) => {
    document.querySelectorAll('.edit-button').forEach((btn) => {
        btn.addEventListener('click', (e) => {

            if (e.target.classList === 'd-auto') {
                e.target.classList.remove('d-auto');
            }
            e.target.classList.add('d-none');
            e.target.nextElementSibling.classList.remove('d-none');
            e.target.nextElementSibling.classList.add('d-auto');

            Array.from(e.target.parentNode.children).splice(0, 2).forEach((input) => {
                    input.contentEditable = true;
                    input.classList.add('bg-white', 'text-dark', 'p-1');
                });

            e.target.parentNode.children[2].classList.remove('d-none');
            e.target.parentNode.children[2].classList.add('d-auto');

            let input = e.target.parentNode.children[2].children[0];

            let correctTodo = data.filter((todo) => {
                return todo.id === input.dataset.id;
            });

            if (
                correctTodo[0].important === true ||
                correctTodo[0].important === 'true'
            ) {
                input.checked = 'checked';
            }

            input.addEventListener('click', (e) => {
                e.target.checked
                    ? (e.target.dataset.checked = true)
                    : (e.target.dataset.checked = false);
            });

        });
    });
};

const saveTodo = () => {
    document.querySelectorAll('.save-button').forEach((btn) => {
        btn.addEventListener('click', (e) => {

            e.target.classList.remove('d-auto');
            e.target.classList.add('d-none');
            e.target.previousElementSibling.classList.remove('d-none');
            e.target.previousElementSibling.classList.add('d-auto');

            e.target.parentNode.children[2].classList.remove('d-auto')
            e.target.parentNode.children[2].classList.add('d-none')

            Array.from(e.target.parentNode.children).splice(0,2).forEach((input) => {
                input.contentEditable = true;
                input.classList.remove('bg-white', 'text-dark', 'p-1' );
            })


            let newTodo = e.target.parentNode.children;
            const updatedTodo = {
                title: newTodo[0].innerText,
                description: newTodo[1].innerText,
                important: newTodo[2].children[0].dataset.checked
            }
            
            const todoId = e.target.dataset.id;
            fetch(`http://localhost:666/todos/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTodo),
            });

            setTimeout(() => {
                getData();
            }, 100);
        });
    });
};

const getData = async () => {
    const response = await fetch('http://localhost:666/todos');
    const data = await response.json();
    showData(data);
    deleteTodo(data);
    editTodo(data);
    saveTodo();
};

getData();