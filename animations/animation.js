let currentAxis = 'y';
let startingPoint = 0;
let maxWobbling = 150;

function startGrowingAnimation(parent, inner, axis, start, wobbling) {
    initializeValues(axis, start, wobbling)
    const styler = childrenMap(inner);
    const springEffect = addingSpringEffect(styler);
    const growingAnimation = createGrowingAnimation();
    addingStaggerAnimation(springEffect, styler);
    if (inner.className == 'inner-span') {
        showAddMassage(growingAnimation, parent);
    } else {
        growingAnimation.start(parent.set);
    }


}

function showAddMassage(growingAnimation, parent) {
    const keyFrames = getKeyFrames();
    const popAddMassage = gettingElementsToAnimate('msg');
    growingAnimation.start({
        update: parent.set,
        complete: () => {
            keyFrames.start(popAddMassage.set);
        },
    });
}

function getKeyFrames() {
    return popmotion.keyframes({
        values: [
            {y: -50, opacity: 0},
            {y: -20, opacity: 1},
            {y: -20, opacity: 1},
            {y: 0, opacity: 0},
        ],
        times: [0, .2, .8, 1],
        duration: 5000,
    });

}

function initializeValues(axis, start, wobbling) {
    currentAxis = axis;
    startingPoint = start;
    maxWobbling = wobbling;
}

function addingSpringEffect(styler) {
    return Array(styler.length)
        .fill(popmotion.spring({from: maxWobbling, to: 0}));
}

function addingStaggerAnimation(springEffect, styler) {
    popmotion.stagger(springEffect, 200)
        .start((val) => val.forEach((axis, i) => styler[i].set(currentAxis, axis)));
}

function childrenMap(formElements) {
    return Array
        .from(formElements.children)
        .map(popmotion.styler);

}

//very bad writing you still can do better than this
function createGrowingAnimation() {
    if (currentAxis == 'y') {
        return popmotion.tween({
            from: {
                scale: 0.5,
                opacity: 0,
                y: startingPoint
            },
            to: {
                scale: 1,
                opacity: 1,
                y: 0
            },
            duration: 1000,
        });
    } else {
        return popmotion.tween({
            from: {
                scale: 0,
                opacity: 0,
                x: startingPoint
            },
            to: {
                scale: 1,
                opacity: 1,
                x: 0
            },
            duration: 1200,
        });
    }

}

function gettingElementsToAnimate(name) {
    if (name == 'fab' || name == 'login' || name == 'cards-container' || name == 'msg' || name == 'parent-to-hide-scrolling') {
        return popmotion.styler(document.getElementById(name));
    }
    return document.querySelector(name);
}


//bouncing ball animation
let isFalling = false;
let touched = false;
let ballStyler = null;
let ballY = null;
let ballScale = null;
let ballBorder = null;
let gravity = null;

function initializePhysics(bouncingBall) {
    const {easing, physics, spring, tween, styler, listen, value, transform} = window.popmotion;
    const {pipe, clampMax} = transform;
    ballStyler = styler(bouncingBall);
    ballY = value(0, (v) => ballStyler.set('y', Math.min(0, v)));
    ballScale = value(1, (v) => {
        ballStyler.set('scaleX', 1 + (1 - v));
        ballStyler.set('scaleY', v);
    });


    ballBorder = value({
        borderColor: '',
        borderWidth: 0
    }, ({borderColor, borderWidth}) => ballStyler.set({
        boxShadow: `0 0 0 ${borderWidth}px ${borderColor}`
    }));

    const checkBounce = () => {
        if (!isFalling || ballY.get() < 0) return;

        isFalling = false;
        const impactVelocity = ballY.getVelocity();
        const compression = spring({
            to: 1,
            from: 1,
            velocity: -impactVelocity * 0.02,
            stiffness: 300
        }).pipe((s) => {
            if (s >= 1) {
                s = 1;
                compression.stop();

                if (impactVelocity > 20) {
                    isFalling = true;
                    gravity
                        .set(0)
                        .setVelocity(-impactVelocity * 0.5);
                }
            }
            return s;
        }).start(ballScale);
    };

    const checkFail = () => {
        if (ballY.get() >= 0 && ballY.getVelocity() !== 0 && touched) {
            touched = false;
            tween({
                from: {borderWidth: 0, borderColor: 'rgb(255, 28, 104, 1)'},
                to: {borderWidth: 30, borderColor: 'rgb(255, 28, 104, 0)'}
            }).start(ballBorder);
            //when this end start loading the next page
            bouncingBall.innerHTML = '  <span class="msg" id="msg">Add a new card</span>\n' +
                '    <div class="inner-span">\n' +
                '        <span>+</span>\n' +
                '    </div>';

        }
    };

    gravity = physics({
        acceleration: 3800,
        restSpeed: false
    }).start((v) => {
        ballY.update(v);
        checkBounce(v);
        checkFail(v);
    });
}

function startBouncing() {
    touched = true;
    isFalling = true;
    ballScale.stop();
    ballScale.update(1);
    gravity
        .set(Math.min(0, ballY.get()))
        .setVelocity(-1000);

    popmotion.tween({
        from: {borderWidth: 0, borderColor: 'rgb(20, 215, 144, 1)'},
        to: {borderWidth: 30, borderColor: 'rgb(20, 215, 144, 0)'}
    }).start(ballBorder);
}