var cartas = ['fa fa-hand-rock-o', 'fa fa-hand-paper-o', 'fa fa-hand-scissors-o']; 
var jogador1= 0;
var jogador2 = 0;

function inicioJogo(){
    var inicio = '<button type="button" class="play btn btn-primary btn-lg">' +
       'Iniciar <i class="fa fa-play"></i></button>';
    jogador1 = 0;
    jogador2 = 0;
    $('#pontos1').text(' ' + 0 + ' ');
    $('#pontos2').text(' ' + 0 + ' ');
    
    $(".aviso").html(inicio);
    $(".mesa").hide();
    $(".aviso").show();
}

inicioJogo();

$('.nav a').click(function(){
    $('.nav li').removeClass('active');
    $(this).parent().addClass('active');
    inicioJogo();
});


$('.aviso').on("click", "button", function() {
  $(".aviso").hide();
  $(".mesa").show();  
});

$('#reiniciar').click(function(){
    inicioJogo();
});

function modoAleatorio(){
    sorteiro = Math.floor(Math.random() * 3);
    switch(sorteiro) {
            case 0:
                $('#jogador2').attr('class', cartas[sorteiro] + ' jogada fa-rotate-270');
                return 'pedra';
            break;
            case 1:
                $('#jogador2').attr('class', cartas[sorteiro] + ' jogada fa-rotate-270');
                return 'papel';
            break;
            case 2:
                $('#jogador2').attr('class', cartas[sorteiro] + ' jogada');
                return 'tesoura';
            break;
    }
}

function modoComputadorGanha(carta){
    switch(carta){
        case 'pedra':
           $('#jogador2').attr('class', cartas[1] + ' jogada fa-rotate-270');
           return 'papel';
        break;
        case 'papel':
            $('#jogador2').attr('class', cartas[2] + ' jogada');
            return 'tesoura';
        break;
        case 'tesoura':
            $('#jogador2').attr('class', cartas[0] + ' jogada fa-rotate-270'); 
            return 'pedra';
        break;
    }
}

function calResultado(jog1, jog2){
    var resultado = 0;
    
    if(jog1 == jog2)
        return -1;
    
    
    switch(jog1){
            case 'papel':
                if(jog2 != 'tesoura'){
                    jogador1 += 1;
                    $('#pontos1').text(' ' + jogador1 + ' ');
                }else{
                    jogador2 += 1;
                    $('#pontos2').text(' ' + jogador2 + ' ');
                    resultado = 1;
                }
            break;
            case 'pedra':
                if(jog2 != 'papel'){
                    jogador1 += 1;
                    $('#pontos1').text(' ' + jogador1 + ' ');
                }else{
                    jogador2 += 1;
                    $('#pontos2').text(' ' + jogador2 + ' ');
                    resultado = 1;
                }
            break;
            case 'tesoura':
                if(jog2 != 'pedra'){
                    jogador1 += 1;
                    $('#pontos1').text(' ' + jogador1 + ' ');
                }else{
                    jogador2 += 1;
                    $('#pontos2').text(' ' + jogador2 + ' ');
                    resultado = 1;
                }
            break;
    }
    return resultado;
}


$('.carta').click(function(){
    modo = $('.nav li.active').attr('role');
    id = $(this).attr("id");
    var resultado;
    
    switch(modo){
        case 'normal':
            jog2 = modoAleatorio();
        break;
        case 'ganha':
            jog2 = modoComputadorGanha(id);
        break;
        case 'multi':
        break;
    }
    
    switch(id){
        case 'pedra':
            $('#jogador1').attr('class', cartas[0] + ' jogada fa-rotate-90');
            resultado = calResultado('pedra', jog2);
        break;
        case 'papel':
            $('#jogador1').attr('class', cartas[1] + ' jogada fa-rotate-90');
            resultado = calResultado('papel', jog2);
        break;
        case 'tesoura':
            $('#jogador1').attr('class', cartas[2] + ' jogada fa-rotate-180');
            resultado = calResultado('tesoura', jog2);
        break;
    }
    
    if(resultado == 1)
        vencendor = '<i class="fa fa-trophy jogada"></i> Computador';
    else if(resultado == 0)
        vencendor = '<i class="fa fa-trophy jogada"></i> Jogador';
    else
        vencendor = 'Ninquém';
    $('.aviso').html(vencendor + ' venceu!');
    
    $('.mesa').fadeOut(1000, function(){
        $('.aviso').fadeIn(2000).fadeOut();
    }).delay(2000).fadeIn('slow', function(){
        $('#jogador1').attr('class', 'fa fa-spinner fa-spin jogada');
        $('#jogador2').attr('class', 'fa fa-spinner fa-spin jogada');
    });
    
});

