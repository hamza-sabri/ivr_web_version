const email = document.getElementById('email');
const password = document.getElementById('password');

function login() {
    //get the values from thee email and the password
    if (isValidEmail(email)) {
        const loginApi = 'https://cors-anywhere.herokuapp.com/https://us-central1-ivr-labs2.cloudfunctions.net/Login';
        sendingHttpRequests('POST', loginApi, {email: email.value, password: password.value})
            .then(logMeIn)
            .catch();//TODO handle the fucken exceptions
    }
}

function logMeIn(responseData) {
    //TODO show a massage to the user
    if (responseData['result']) {
        saveUser(responseData);
        swal({
            title: "Welcome",
            text: "thanks for helping us build this beautiful community " + responseData['data']['name'],
            icon: "success"
        });
        setTimeout(openDataViewer, 1700);

    } else {
        swal({
            title: "Ops",
            text: "the email/password is incorrect please try again",
            icon: "warning"
        });
    }

    // localStorage.setItem('universityID', responseData['universityID']);
    // localStorage.setItem('')
}

function openDataViewer() {
    open('../card_viewer/card_viewer.html', '_self');
}

function saveUser(responseData) {
    let universityID = responseData['data']['universityID'];
    let universityName = responseData['data']['university'];
    let userName = responseData['data']['name'];
    localStorage.setItem('userName', userName);
    localStorage.setItem('universityName', universityName);
    localStorage.setItem('universityID', universityID);
}

// login animation
//getting the references of the elements

const loginForm = gettingElementsToAnimate('login');
const formElements = gettingElementsToAnimate('.inner');

startGrowingAnimation(loginForm, formElements, 'y', -200, 150);


