
let acc = document.getElementsByClassName('btn-show');
console.log(acc[0])

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        console.log('a')
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}