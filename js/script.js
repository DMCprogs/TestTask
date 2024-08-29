
const overlay = document.querySelector('.overlay'),
   
    modals = document.querySelectorAll('.dlg-modal'),
   
    mOpen = document.querySelectorAll('[data-modal]'),
   
    mClose = document.querySelectorAll('[data-close]');

let mStatus = false;


let currentModal = null;


function modalShow(modal) {
    const typeAnimate = 'fade';
   
    overlay.classList.remove('fadeOut');
    overlay.classList.add('fadeIn');

    
   
        modal.classList.remove('fadeOut');
        modal.classList.add('fadeIn');
    
   
    currentModal = modal;
  
    mStatus = true;
}


function modalClose(event) {
    if (mStatus && (event.type !== 'keydown' || event.keyCode === 27)) {
        const typeAnimate = 'fade';

        if (currentModal !== null) {
           
            if (typeAnimate === 'fade') {
                currentModal.classList.remove('fadeIn');
                currentModal.classList.add('fadeOut');
            }
        }

      
        overlay.classList.remove('fadeIn');
        overlay.classList.add('fadeOut');
       
        mStatus = false;
        currentModal = null;
    }
}


(function () {
    if (mOpen.length === 0) return;

    for (let el of mOpen) {
        el.addEventListener('click', function (e) {
           
            let modalId = el.dataset.modal,
                modal = document.getElementById(modalId);
          
            modalShow(modal);
        });
    }
    for (let el of mClose) {
        el.addEventListener('click', modalClose);
    }
    document.addEventListener('keydown', modalClose);
})();



(() => {
    window.addEventListener("DOMContentLoaded", function () {
        [].forEach.call(
            document.querySelectorAll(".js-input-mask"),
            function (input) {
                var keyCode;
                function mask(event) {
                    event.keyCode && (keyCode = event.keyCode);
                    var pos = this.selectionStart;
                    if (pos < 3) event.preventDefault();
                    var matrix = "+7 (___) ___-__-__",
                        i = 0,
                        def = matrix.replace(/\D/g, ""),
                        val = this.value.replace(/\D/g, ""),
                        new_value = matrix.replace(/[_\d]/g, function (a) {
                            return i < val.length ? val.charAt(i++) : a;
                        });
                    i = new_value.indexOf("_");
                    if (i != -1) {
                        i < 5 && (i = 3);
                        new_value = new_value.slice(0, i);
                    }
                    var reg = matrix
                        .substr(0, this.value.length)
                        .replace(/_+/g, function (a) {
                            return "\\d{1," + a.length + "}";
                        })
                        .replace(/[+()]/g, "\\$&");
                    reg = new RegExp("^" + reg + "$");
                    if (
                        !reg.test(this.value) ||
                        this.value.length < 5 ||
                        (keyCode > 47 && keyCode < 58)
                    ) {
                        this.value = new_value;
                        this.classList.remove("not");
                    }
                    if (event.type == "blur" && this.value.length < 5) {
                        this.value = "";
                        this.classList.add("not");
                        this.labels[0].classList.remove("label--is-active");
                    }
                }

                input.addEventListener("input", mask, false);
                input.addEventListener("focus", mask, false);
                input.addEventListener("blur", mask, false);
                input.addEventListener("keydown", mask, false);
            }
        );
    });

    const formHandle = document.querySelectorAll(".form");

    formHandle.forEach((formItem) => {
        new Validator(formItem, function (err, res) {
            return res;
        });
    });
})();


function inputEvent(label) {
    const input = label.querySelector(".js-input");
    const textarea = label.querySelector("textarea");
    const clearBtn = label.querySelector(".js-clear-input");

    function inputValueCheck() {
        if (input.value !== "") {
            label.classList.add("label--is-active");
        } else {
            label.classList.remove("label--is-active");
        }
    }

    function inputFocus() {
        label.classList.add("label--is-active");
    }

    input.addEventListener("input", inputValueCheck);
    input.addEventListener("focus", inputFocus);
    input.addEventListener("blur", inputValueCheck);

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            input.value = "";
            inputValueCheck();

            if (textarea) {
                textarea.style.height = "104px";
            }
        });
    }

    if (textarea) {
        textarea.style.height = textarea.scrollHeight + "px";
        textarea.addEventListener("input", () => {
            textarea.style.height = textarea.scrollHeight + "px";
        });
    }

    inputValueCheck();
}

const labels = document.querySelectorAll(".js-label");
labels.forEach(inputEvent);