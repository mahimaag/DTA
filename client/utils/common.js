const correctHeight = () => {

    var pageWrapper = $('#page-wrapper');
    var navbarHeight = $('nav.navbar-default').height();
    var wrapperHeigh = pageWrapper.height() ;

    if (navbarHeight > wrapperHeigh) {
        pageWrapper.css("min-height", navbarHeight + "px");
    }

    if (navbarHeight < wrapperHeigh) {
        if (navbarHeight < $(window).height()) {
            pageWrapper.css("min-height", $(window).height() + "px");
        } else {
            pageWrapper.css("min-height", navbarHeight + "px");
        }
    }

    if ($('body').hasClass('fixed-nav')) {
        if (navbarHeight > wrapperHeigh) {
            pageWrapper.css("min-height", navbarHeight + "px");
        } else {
            pageWrapper.css("min-height", $(window).height() - 60 + "px");
        }
    }
}

const detectBody = () => {
    if ($(document).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
}

const smoothlyMenu = () => {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 200);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 100);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
}

const getDate = (newDate) => {
   return(`${newDate.getMonth() + 1 }/${newDate.getDate()}/${newDate.getFullYear()}`);

}

module.exports = {correctHeight, detectBody, smoothlyMenu,getDate};

