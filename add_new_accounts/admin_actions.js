const email = document.getElementById('email');
const pass = document.getElementById('pass');
const name = document.getElementById('name');
const admin = document.getElementById('admin');
const selector = document.getElementById('exampleFormControlSelect1');
const currentUser = {}

//start registration
function register() {
    //getting the data from the inputs fields
    getInfo();
    console.log(currentUser);
    if (validation() && isValidEmail(email)) {
        //create the user
        createUser();
    }
}

//adding the data to the newUser object
function getInfo() {
    currentUser["email"] = email.value.toString();
    currentUser["password"] = pass.value.toString();
    currentUser["adminPassword"] = admin.value.toString();
    currentUser["name"] = name.value.toString();
    currentUser["university"] = selector.options[selector.selectedIndex].text;
    currentUser["universityID"] = selector.value;
    //add the uni and uniID
}

//checking if all the inputs are in the correct form
function validation() {
    const inputs = document.getElementsByTagName("input");

    //to make sure nothing is empty
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.toString() == '') {
            swal({
                title: "warning",
                text: "sorry but all the fields are required!",
                icon: "warning"
            });
            return false;
        }
    }
    return true;
}

//sending the request to CREATE the user
function createUser() {
    //the needed url to create new users
    const addUrl = 'https://cors-anywhere.herokuapp.com/https://us-central1-ivr-labs2.cloudfunctions.net/AddManager';

    //sending the request to create the user
    sendingHttpRequests('POST', addUrl, currentUser)
        .then(responseHandler)
        .catch(errorHandler);
}

//handel errors from the request
function errorHandler() {
    swal({
        title: "Something went wrong",
        text: 'user is already created check firebase for more info',
        icon: "error"
    });
}

//handel the massages from the request
function responseHandler(responseData) {
    //if the password of the admin is wrong
    if (responseData['Message'] == 'Wrong admin password') {
        swal("Ops", "Wrong admin password", "error");
    } else if (responseData['Message'] == 'Successfully created!') {
        swal("Congratulation", "You have created a new account", "success");
    } else {
        swal("Ops", responseData['Message'], "warning");
    }
}
localStorage.ge
//gets the university
function getUniversities() {
    const univeristiesApi = 'https://cors-anywhere.herokuapp.com/https://us-central1-ivr-labs2.cloudfunctions.net/Universities';
    sendingHttpRequests('GET', univeristiesApi,)
        .then(addUniversitiesToList)
        .catch();
}

//takes the response from the get universities name and add them to the list
function addUniversitiesToList(responseData) {
    for (let i = 0; i < responseData.length; i++) {
        let option = document.createElement('option');
        option.appendChild(document.createTextNode(responseData[i]['Name']));
        option.value = responseData[i]['ID'];
        selector.appendChild(option);
    }
}
