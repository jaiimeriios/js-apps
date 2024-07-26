const showData = (data) => {
    const content = document.getElementById('content');
    const userData = data.map((e) => {
        let template = `
        <tr>
            <td>
                <p>${e.firstName}</p>
            </td>
            <td>
                <p>${e.lastName}</p>
            </td>
            <td>
                <p>${e.email}</p>
            </td>
            <td>
                <p>${e.handle}</p>
            </td>
            <td>
                <button data-id="${e.id}" class="edit-button btn btn-xs btn-primary">
                    Edit
                </button>
                <button data-id="${e.id}" class="save-button btn btn-xs btn-success d-none">
                    Save
                </button>
            </td>
            <td>
                <button data-id="${e.id}" class="delete-button btn btn-xs btn-danger">
                    Delete
                </button>
            </td>
        </tr>`;
        return template;
    });
    content.innerHTML = userData.join('');
};


// DELETE
const deleteUser = (data) => {
    document.querySelectorAll('.delete-button').forEach((btn) => {
        btn.addEventListener('click', (e) => {

            const userId = e.target.dataset.id;
            
            const filteredUser = data.filter((user) => {
                return userId === user.id;
            });

            // console.log(filteredUser[0].id);

            fetch(`http://localhost:666/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filteredUser),
            });

            setTimeout(() => {
                getData();
            }, 100);
        });
    });
};



// POST
document.getElementById('users-form').addEventListener('submit', (e) => {
    e.preventDefault();

    let firstName = document.getElementById('user-first-name');
    let lastName = document.getElementById('user-last-name');
    let email = document.getElementById('user-email');
    let handle = document.getElementById('user-handle');

    if (firstName.value === '' || lastName === '' || email === '' || handle === '') {
        return;
    }

    let users = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        handle: handle.value,
    };
    todoJSON = JSON.stringify(users);

    firstName.value = '';
    lastName.value = '';
    email.value = '';
    handle.value = '';

    fetch('http://localhost:666/users', {
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
const editUser = () => {
    document.querySelectorAll('.edit-button').forEach((btn) => {
        btn.addEventListener('click', (e) => {

            e.target.classList === 'd-auto' && e.target.classList.remove('d-auto');
            e.target.classList.add('d-none');
            e.target.nextElementSibling.classList.remove('d-none');
            e.target.nextElementSibling.classList.add('d-auto');

            Array.from(e.target.parentNode.parentNode.children).splice(0,4).forEach((td) => {
                td.contentEditable = true;
                td.children[0].classList.add('bg-white', 'text-dark', 'ps-1' );
            })
        });
    });
};


// PUT
const saveUser = () => {
    document.querySelectorAll('.save-button').forEach((btn) => {
        btn.addEventListener('click', (e) => {

            e.target.classList.remove('d-auto');
            e.target.classList.add('d-none');
            e.target.previousElementSibling.classList.remove('d-none');
            e.target.previousElementSibling.classList.add('d-auto');

            Array.from(e.target.parentNode.parentNode.children).splice (0,4).forEach((td) => {
                td.contentEditable = false;
                td.children[0].classList.remove('bg-white', 'text-dark', 'ps-1' );
            })

            let newUser = e.target.parentNode.parentNode.children;
            const updatedUser = {
                firstName: newUser[0].innerText,
                lastName: newUser[1].innerText,
                email: newUser[2].innerText,
                handle: newUser[3].innerText,
            };

            const userId = e.target.dataset.id;
            fetch(`http://localhost:666/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            setTimeout(() => {
                getData();
            }, 100);
        });
    });
};


// GET
const getData = async () => {
    const response = await fetch('http://localhost:666/users');
    const data = await response.json();
    showData(data);
    deleteUser(data);
    editUser();
    saveUser();
};

getData();
