/**
 * Created by LQL on 2016/7/29.
 */

(function($){

    $(function(){

        var $category = $('.selector-container ul li:gt(5):not(:last)');

        $category.hide();

        var $toggleBtn = $('.selector-container div.show-more a');
        $toggleBtn.click(function(){

            if($category.is(':visible')){
                $category.hide();
                $(this).text('显示所有品牌');
                $('.selector-container ul li a').removeClass('lighter');
            }else{
                $category.show();
                $(this).text('精简显示');
                $('.selector-container ul li a')
                    .filter(':contains("佳能"),:contains("尼康"),:contains("松下")')
                    .addClass('lighter');
            }

        });


    });


})(jQuery);