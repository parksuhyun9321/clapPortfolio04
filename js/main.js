let loading_color = 1;
let loading_second = 0;
window.addEventListener("load", function () {
    let second = setInterval(() => {
        if (loading_second < 100) {
            loading_second++;
            document.querySelector(".loading_second").innerHTML = `${loading_second}%`;
        } else if (loading_second == 100) {
            clearInterval(second);
            document.querySelector(".loading_second").remove();
            let background_set = setInterval(() => {
                if (loading_color > 0) {
                    loading_color = loading_color - 0.2;
                    document.querySelector("body.loading").style.backgroundColor = `rgba(0,0,0,${loading_color})`;
                    if (Math.floor(loading_color) == -1) {
                        document.querySelector("body").classList.remove("loading");
                        clearInterval(background_set);
                    }
                }
            }, 100);
        }
    }, 30);
});

let about_st = 4;
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

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        document.querySelector(".btn_top").classList.add("on");
        if(document.querySelector("#popup") != null){
            document.querySelector("#popup").classList.add("show");
        }
    } else {
        document.querySelector(".btn_top").classList.remove("on");
    }
});

let skill_btn = document.querySelectorAll(".skill_list li button"); // 스킬버튼 클릭시 해당 내용과 사진을 띄움

for (let i = 0; i < skill_btn.length; i++) {
    skill_btn[i].addEventListener("click", function () {
        for (let j = 0; j < skill_btn.length; j++) {
            skill_btn[j].classList.remove("on");
        }
        let src = this.value;
        let alt = this.textContent.replace("#", "").toLowerCase();
        let txt = this.parentNode.children[1].textContent.trim();
        
        this.classList.add("on");
        document.querySelector(".skill_view img").src = src;
        document.querySelector(".skill_view img").alt = alt;
        document.querySelector(".skill_view p").innerHTML = txt;
    });
}

document.querySelector(".btn_gnb").addEventListener("click", function () {
    document.querySelector(".gnb").classList.add("on");
    this.style.display="none";
});

document.querySelector(".btn_close").addEventListener("click", function () {
    document.querySelector(".gnb").classList.remove("on");
    document.querySelector(".btn_gnb").style.display="block";
});

let gnb_btn = document.querySelectorAll(".gnb_list li a");

for (let i = 0; i < gnb_btn.length; i++) {
    gnb_btn[i].addEventListener("click", function () {
        document.querySelector(".gnb").classList.remove("on");
        document.querySelector(".btn_gnb").style.display="block";
        if(this.textContent == "HOME"){
            smoothScroll(document.getElementById("main_visual").offsetTop);
        } else {
            smoothScroll(document.getElementById(`${this.textContent.toLowerCase()}`).offsetTop);
        }
    });
}

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

document.querySelector(".btn_top").addEventListener("click", function () { // 클릭시 맨위로 이동
    smoothScroll("0");
});

let deviceUA = navigator.userAgent.toLowerCase();

if (deviceUA.indexOf("android") > -1 ||deviceUA.indexOf("iphone") > -1 ||deviceUA.indexOf("ipad") > -1 ||deviceUA.indexOf("ipod") > -1) {
    document.querySelector(".cursor").remove();
    about_st = 2;
} else {
    window.addEventListener("mousemove", function (e) {
        document.querySelector(".cursor").style.top = e.pageY + "px";
        document.querySelector(".cursor").style.left = e.pageX + "px";
    });

    document.querySelectorAll(".item").forEach((items) => {
        items.addEventListener("mouseenter", function () {
            document.querySelector(".cursor").classList.add("active");
        });
        items.addEventListener("mouseleave", function () {
            document.querySelector(".cursor").classList.remove("active");
        });
    });

    document.querySelector(".gnb").addEventListener("mouseenter", function () {
        document.querySelector(".cursor").style.backgroundColor = "rgba(255,255,255,0.8)";
    });
    document.querySelector(".gnb").addEventListener("mouseleave", function () {
        document.querySelector(".cursor").style.backgroundColor = "rgba(0,0,0,0.8)";
    });

    if (document.querySelector(".loading-second") != null) {
        document.querySelector(".loading-second").addEventListener("mouseenter", function () {
            document.querySelector(".loading-second").style.color = "#000";
        });
    }
}

let date = new Date();
let today = date.getDate();

if (localStorage.getItem("cookie") != today) {
    localStorage.removeItem("cookie");
}

if (localStorage.getItem("cookie") != null) {
    document.querySelector("#popup").remove();
} else {
    dragElement(document.getElementById("popup")); 
    window.addEventListener("resize",function(){
        if(window.innerWidth <= 750){
            dragElement("none")
        }
    })
}

document.querySelectorAll("#popup .btn_list li button").forEach((item)=>{
    item.addEventListener("click",function(){
        document.querySelector("#popup").remove();
        if(item.className.indexOf("today_hide") != -1){
            localStorage.setItem("cookie", today);
        }
    })
});


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt.id ==  "popup") {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id).onmousedown = dragMouseDown;
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
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
}
