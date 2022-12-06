document.addEventListener('DOMContentLoaded', function() {
    balao = document.querySelectorAll('main li p'); //por o p depois
    i = 0
    while (i < balao.length){
        balao[i].style.display = 'none';
        i +=1
    }
    a = 0
    function aparece(){
        balao[a].style.display = 'block';
        a +=1
    }
    var timer = setInterval(aparece, 1500);
    
});