$('._item-zoom').magnificPopup({
    type: 'image',
    gallery: {
        enabled: true
    },
    mainClass: 'mfp-fade'
});

//Для портфолио

$('._item-zoom1').magnificPopup({
    type: 'image',
    gallery: {
        enabled: true
    },
    mainClass: 'mfp-fade'
});

$('._item-zoom2').magnificPopup({
    type: 'image',
    gallery: {
        enabled: true
    },
    mainClass: 'mfp-fade'
});

//3D visualization
$('.visual__card-pic').each(function () {
    $(this).magnificPopup({
        delegate : 'a',
        type: 'image',
        gallery: {
            enabled: true
        },
        mainClass: 'mfp-fade'
    })
})
