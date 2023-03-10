    const registrationButton = document.getElementById('registerButton');
const errorMessage = document.getElementById('errorMessage');

const allowedRoleFirst = 'Student'
const allowedRoleSecond = 'Teacher'

const regexObj = {
    usernameRegex: /^[a-zA-Z]+/,
    passwordRegex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,

}
function userCredentials(username, email, phone, password, role, schoolName) {
    if (!username.match(regexObj.usernameRegex) || username.length < 3) {
        errorMessage.innerText = `Student name should contain upper and lower case character and be over 2 characters.`;
        hideSubmitButton();
        windowReload();
        return;

    } else if (phone.length < 10) {
        errorMessage.innerText = `Phone number should be 10 digits long.`;
        hideSubmitButton();
        windowReload();
        return;

    } else if (!password.match(regexObj.passwordRegex) || password.length < 8) {
        errorMessage.innerText = `Password should contain: Upper case, lower case letter and have special symbol with at least 8 characters.`;
        hideSubmitButton();
        setTimeout(() => {
            window.location.reload();
        }, 3500);
        return;
    } else if (schoolName.length < 5) {
        errorMessage.innerText = "Please provide the correct name of your school";
        windowReload();
        return;
    }

    const data = { username, email, phone, password, role, schoolName };

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    }
    try {
        fetch('https://tagebuch-api-production.onrender.com/users/registration', options)
        .then((response) => {
            try {
                if (response.status === 409) {
                    errorMessage.innerText = 'Username already exists';
                    hideSubmitButton();
                    windowReload();
                    return;
                } else if (response.status === 201){
                    
                    window.location.href = '../Login/login.html';
                    return;
                } else {
                    return errorMessage.innerText = 'An error has occured. Please try again later.';
                }
            } catch (error) {
                throw new Error('Error at registration page: ' + error);
            }
        }).catch(() => {
            errorMessage.innerText = 'User already exists';
            windowReload();
            return;
        });
    } catch(error) {
        console.log('Can\'t not do POST request');
        return
    }
}

registrationButton.addEventListener('click', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('userRole').value;
    const schoolName = document.getElementById('schoolName').value;

    try {
        userCredentials(username, email, phoneNumber, password, role, schoolName);
    } catch (error) {
        console.log(error);
    }
})
function windowReload() {
    setTimeout(() => {
        window.location.reload();
    }, 2500);
}
function hideSubmitButton() {
    registrationButton.style.display = 'none';
}
