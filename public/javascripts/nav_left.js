/**
 * Created by LQL on 2016/7/29.
 */
$(function(){

    var Accordion = function(el,multiple){
        this.el = el||{};
        this.multiline = multiple || false;
        var links = this.el.find('.link');
        links.on('click',{el:this.el,multiple:this.multiline},this.dropdown);
    }

    Accordion.prototype.dropdown = function(e){
        var $el = e.data.el;
        var $this = $(this);
        var $next = $this.next();
        $next.slideToggle();
        $this.parent().toggleClass('open');

        if(!e.data.multiple){
            $el.find('.sub-menu').not($next).slideUp().parent().removeClass('open');
        }
    }

    var accordion = new Accordion($('#accordion'),false);
});