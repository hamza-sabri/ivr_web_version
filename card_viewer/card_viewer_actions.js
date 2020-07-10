// add fab animation
//getting the references of the elements
const fab = gettingElementsToAnimate('fab');
const inner = gettingElementsToAnimate('.inner-span');
startGrowingAnimation(fab, inner, 'y', 50,);

//initializing the bouncing ball of the fab
function initializeAnimations() {

    initializePhysics(document.querySelector('#fab'));
    // startTyping();
}

let postion = 0;
let firstPageOpacity = 1;
let secondPageOpacity = 0;
const innerContent = document.querySelector('.inner-content');
const firstPage = document.querySelector('.first-page');
const secondPage = document.querySelector('.second-page');


function moveNext() {
    postion--;
    innerContent.style.left = postion + 'rem';
    if (postion >= -26) {
        firstPage.style.opacity = firstPageOpacity + '';
        secondPage.style.opacity = secondPageOpacity + '';
        firstPageOpacity -= 0.1;
        secondPageOpacity += 0.1;
        window.setTimeout(moveNext, 20);
    }

}

function moveBack() {
    postion++;
    innerContent.style.left = postion + 'rem';
    if (postion <= 1) {
        firstPage.style.opacity = firstPageOpacity + '';
        secondPage.style.opacity = secondPageOpacity + '';
        firstPageOpacity += 0.1;
        secondPageOpacity -= 0.1;
        window.setTimeout(moveBack, 20);
    }
}

