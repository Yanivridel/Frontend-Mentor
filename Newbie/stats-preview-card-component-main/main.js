const stat1 = document.getElementById("stat1");
const stat2 = document.getElementById("stat2");
const stat3 = document.getElementById("stat3");
let val1, val2, val3;
val1 = val2 = val3 = 0;

function increament1(time) {
    if(val1 >= 11) return
    stat1.textContent = val1 + 'K';
    val1++;
    setTimeout(() => increament1(time+10), time);
}
increament1(5);
function increament2(time) {
    if(val2 >= 315) return
    stat2.textContent = val2;
    val2+=2;
    setTimeout(() => increament2(time+0.01), time);
}
increament2(0);
function increament3(time) {
    if(val3 >= 13) return
    stat3.textContent = val3 + 'm+';
    val3++;
    setTimeout(() => increament3(time+10), time);
}
increament3(5);