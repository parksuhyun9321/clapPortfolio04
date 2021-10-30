let loading_color = 1;
let loading_second = 0;
let deviceUA = navigator.userAgent.toLowerCase();
let about_st;

let date = new Date();
let today = date.getDate();

if (localStorage.getItem("cookie") != today) { // 쿠키생성일과 오늘의 날짜가 다를시 쿠키를 지움
    localStorage.removeItem("cookie");
}

if (localStorage.getItem("cookie") != null) { // 쿠키가 있을시 팝업창을 띄우지 않음
    document.querySelector("#popup").remove();
} else {// 쿠키가 없을시
    dragElement(document.getElementById("popup"));
    window.addEventListener("resize", function () {
        if (window.innerWidth <= 750) { // 윈도우 사이즈가 750보다 작을시 드래그 이벤트를 실행하지 않음
            dragElement();
        } else {
            dragElement(document.getElementById("popup"));
        }
    });
}

window.addEventListener("load", function () {
    if ( deviceUA.indexOf("android") > -1 || deviceUA.indexOf("iphone") > -1 || deviceUA.indexOf("ipad") > -1 || deviceUA.indexOf("ipod") > -1) { // 모바일 구분
        let transparent_area = document.createElement("div");
        transparent_area.classList.add("transparent_area");
        document.querySelector(".skip").before(transparent_area);
        document.querySelector(".cursor").remove();
        about_st = 2;
    } else { // pc
        about_st = 4;
        window.addEventListener("mousemove", function (e) { // 마우스 따라다니기
            document.querySelector(".cursor").style.top = e.pageY + "px";
            document.querySelector(".cursor").style.left = e.pageX + "px";
        });
    }

    let second = setInterval(() => { // 로딩 화면
        if (loading_second < 100) {
            loading_second++;
            document.querySelector(".loading_second").innerHTML = `${loading_second}%`;
        } else if (loading_second == 100) { // 로딩 100% 가 되면
            clearInterval(second);
            document.querySelector(".loading_second").remove();
            let background_set = setInterval(() => {
                if (loading_color > 0) {
                    loading_color = loading_color - 0.2;
                    document.querySelector("body.loading").style.backgroundColor = `rgba(0,0,0,${loading_color})`;
                    if (Math.floor(loading_color) == -1) {
                        document.querySelector("body").classList.remove("loading");
                        clearInterval(background_set);
                        this.document.querySelector("#header").style.opacity = 1;
                        if(document.querySelector(".transparent_area") != null){ // 모바일일때
                            document.querySelector(".transparent_area").remove();
                        }
                    }
                }
            }, 100);
        }
    }, 30);
});



window.addEventListener("scroll", function () {//스크롤링 이벤트
    let st = (document.documentElement.scrollTop || window.scrollY || window.pageYOffset) + window.innerHeight;
    if (st >= document.querySelector(".skill_view").offsetTop * about_st) {
        document.querySelector("#about").classList.add("show");
    } else {
        document.querySelector("#about").classList.remove("show");
    }

    if (st >= document.querySelector("#portfolio").offsetTop * 1.3) {
        document.querySelector("#portfolio .portfolio_list").classList.add("show");
    } else {
        document.querySelector("#portfolio .portfolio_list").classList.remove("show");
    }

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) { // 맨아래로 내려왔을시
        document.querySelector(".btn_top").classList.add("on");
        if (document.querySelector("#popup") != null) {
            document.querySelector("#popup").classList.add("show");
        }
    } else {
        document.querySelector(".btn_top").classList.remove("on");
    }
});

let skill_btn = document.querySelectorAll(".skill_list li button"); // 스킬버튼 클릭시 해당 내용과 사진을 띄움

for (let i = 0; i < skill_btn.length; i++) { // 스킬버튼을 클릭시 이벤트
    skill_btn[i].addEventListener("click", function () {
        for (let j = 0; j < skill_btn.length; j++) {
            skill_btn[j].classList.remove("on");
        }
        let src = this.value;
        let txt_alt = this.parentNode.children[1].textContent.trim();

        this.classList.add("on");
        document.querySelector(".skill_view img").src = src;
        document.querySelector(".skill_view img").alt = txt_alt;
        document.querySelector(".skill_view p").innerHTML = txt_alt;
    });
}

document.querySelector(".btn_gnb").addEventListener("click", function () { // 클릭시 gnb 메뉴 오픈
    document.querySelector(".gnb").classList.add("on");
    this.style.display = "none";
});

document.querySelector(".btn_close").addEventListener("click", function () { // 클릭시 gnb 메뉴 닫음
    document.querySelector(".gnb").classList.remove("on");
    document.querySelector(".btn_gnb").style.display = "block";
});

let gnb_btn = document.querySelectorAll(".gnb_list li a");

for (let i = 0; i < gnb_btn.length; i++) { // 클릭시 해당 섹션으로 스크롤
    gnb_btn[i].addEventListener("click", function () {
        smoothScroll(document.getElementById(`${this.dataset.target}`).offsetTop);
        document.querySelector(".gnb").classList.remove("on");
        document.querySelector(".btn_gnb").style.display = "block";
    });
}

document.querySelector(".btn_top").addEventListener("click", function () { // 클릭시 맨위로 스크롤
    smoothScroll(0);
});

function smoothScroll(a) {
    const targetPosition = a;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 750;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
    }
}

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
}

document.querySelectorAll(".item").forEach((items) => { // 버튼에 마우스를 올릴시 마우스효과
    let class_name = items.textContent;
    items.addEventListener("mouseenter", function () {
        document.querySelector(".cursor").classList.add("active");
    });
    items.addEventListener("mouseleave", function () {
        document.querySelector(".cursor").classList.remove("active");
    });
});

// gnb 메뉴에 마우스를 올릴시 색상 변경
document.querySelector(".gnb").addEventListener("mouseenter", function () {
    document.querySelector(".cursor").classList.add("white");
});
document.querySelector(".gnb").addEventListener("mouseleave", function () {
    document.querySelector(".cursor").classList.remove("white");
});

// 포트폴리오 팝업창 하단 버튼
document.querySelectorAll("#popup .btn_list li button").forEach((item) => {
    item.addEventListener("click", function () {
        document.querySelector("#popup").remove();
        if (item.className.indexOf("today_hide") != -1) {// 오늘하루 보지 않기 클릭시 쿠키 생성
            localStorage.setItem("cookie", today);
        }
    });
});

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
