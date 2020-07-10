const request = new XMLHttpRequest();

//get the method to perform it {POST , GET} on the given url with the given data
function sendingHttpRequests(method, url, data) {
    const promise = new Promise((resolve, reject) => {
        request.open(method, url);
        request.responseType = 'json';
        if (data) {
            request.setRequestHeader('Content-Type', 'application/json');
        }
        request.onload = () => {
            if (request.statusCode > 200) {
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

//check if the email is valid or not
function isValidEmail(email) {
    let emailToTest = email.value;
    let indexOfDot = emailToTest.lastIndexOf('.');
    let indexOfAt = emailToTest.indexOf('@');
    if (indexOfDot <= 0 || indexOfAt <= 0 || indexOfDot < indexOfAt || (indexOfAt + 1) == indexOfDot) {
        swal({
            title: "warning",
            text: "the email was badly formatted",
            icon: "error"
        });
        return false;
    }
    return true;

}