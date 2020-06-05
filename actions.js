const email = document.getElementById('email');
const pass = document.getElementById('pass');
const pass2 = document.getElementById('pass2');


function send() {
    fetch('https://us-central1-ivr-labs2.cloudfunctions.net/helloWorld')
        .then(result => result.json())
        .then(console.log);
    console.log('working?');
}