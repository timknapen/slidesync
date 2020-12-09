


var currentSlide = 0;

$(function () {
    $('.button').on('touchstart',function(){
        flashButton($(this));
       
    });
    $('.button').click(function(){
        var target = $(this).attr('target');
        flashButton($(this));
        console.log(target);
        switch(target){
            case 'forward':
                prevSlide();
            break;
            case 'backward':
                nextSlide();
                break;

        }
    })
    connectSocket();
    updateSlideNr();
});

function flashButton($el){
    $el.addClass('selected');
    setTimeout(function(){
        $('.button').removeClass('selected');
    }, 100);
}

function nextSlide(){
    currentSlide ++;
    updateSlideNr();
}

function prevSlide(){
    currentSlide--;
    if(currentSlide < 0){
        currentSlide = 0;
    }
    updateSlideNr();
}

function updateSlideNr(){
    targetSlide(currentSlide);
    $('#slidenr').html(currentSlide);
}

