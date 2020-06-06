const email = document.getElementById('email');
const pass = document.getElementById('pass');
const pass2 = document.getElementById('pass2');
const admin = document.getElementById('admin');


function send() {
    const userEmail = email.value.toString();
    const password = pass.value.toString();
    const adminPass = admin.value.toString();
    if (userEmail == '' || password == '' || adminPass == '') {
        swal({
            title: "warning",
            text: "sorry but all the fields are required!",
            icon: "warning"
        });
    } else if (password != pass2.value.toString()) {
        swal({
            title: "wrong password",
            text: "sorry but the password field and the repeat password field doesn't match!",
            icon: "error"
        });
    } else {
        createUser(userEmail, password, adminPass);
    }
}

function createUser(email, pass, adminPassword) {
    const addUrl = 'https://cors-anywhere.herokuapp.com/https://us-central1-ivr-labs2.cloudfunctions.net/AddManager';
    sendingHttpRequests('POST', addUrl, {
        email: email,
        password: pass,
        adminPassword: adminPassword,
    }).then(responseData => {
        if (responseData['Message'] == 'Wrong admin password') {
            swal("Ops", "Wrong admin password", "error");
        } else
            swal("Congratulation", "You have created a new account", "success");
    }).catch(error => {
        console.log(error);
        swal("Something went wrong", error, "error");
    });
}


function sendingHttpRequests(method, url, data) {
    const promise = new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open(method, url);
        request.responseType = 'json';
        if (data) {
            request.setRequestHeader('Content-Type', 'application/json');
        }
        request.onload = () => {
            if (request.statusCode > 200) {
                console.log(request.statusCode);
                reject(request.response);
            } else {
                resolve(request.response);
            }
        };

        request.onerror = () => {
            reject(request.response);
        };
        request.send(JSON.stringify(data));
    });
    return promise;
}