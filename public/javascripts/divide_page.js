/**
 * Created by LQL on 2016/7/24.
 */

(function ($) {
    $.fn.dividePageNav = function (options) {
        var defauls = {
            totalCount: '',//记录总条数
            showPage: '5',//显示的数字页码数量
            pageSize: '5', //每页显示数据条数
            callback: function () {
                return false;
            }
        };
        $.extend(defauls, options || {});//将defaults中的字段值用options中的字段值替换
        console.log(defauls);
        if (defauls.totalCount == '') {
            $(this).empty();
            return false;
        } else if (Number(defauls.totalCount) <= 0) {
            $(this).empty();
            return false;
        }
        if (defauls.showPage == '') {
            defauls.showPage = 5;
        } else if (Number(defauls.showPage) <= 0) {
            defauls.showPage = 5;
        }
        if (defauls.pageSize == '') {
            defauls.pageSize = 5;
        } else if (Number(defauls.pageSize) <= 0) {
            defauls.pageSize = 5;
        }
        var totalCount = Number(defauls.totalCount);
        var showPage = Number(defauls.showPage);
        var pageSize = Number(defauls.pageSize);
        var totalPage = Math.ceil(totalCount / pageSize);
        if (totalPage > 0) {
            var html = '';
            html += ' <div class="divide_page_nav_wrapper">';
            html += ' <ul> <li><a id="previous" href="#">上一页</a></li>';
            html += ' <li class="hidden"><a class="ellipsis">...</a></li>';
            if (totalPage <= showPage) {
                for (var i = 1; i <= totalPage; i++) {
                    if (i == 1) html += ' <li><a class="nav_active" href="#">' + i + '</a></li>';
                    else html += ' <li><a  href="#">' + i + '</a></li>';
                }
            } else {
                for (var i = 1; i <= showPage; i++) {
                    if (i == 1) html += ' <li><a class="nav_active" href="#">' + i + '</a></li>';
                    else html += ' <li><a  href="#">' + i + '</a></li>';
                }
            }
            html += ' <li class="hidden"><a class="ellipsis">...</a></li>';
            html += '  <li><a id="next" href="#">下一页</a></li></ul>';
            html += ' <div class="total_count_wrapper"><p>共<span>' + totalPage + '</span>页</p></div>';
            html += ' <div class="to_page_wrapper">到第<input type="text" id="page_num" value="1" name="page_num"/>页 </div>';
            html += '<a id="confirm_btn">确定</a></div>';
            $(this).html(html);
            if (totalPage > showPage) {
                $(this).find(".divide_page_nav_wrapper ul li:last").prev().removeClass("hidden");
            }

            var pageObj = $(this).find(".divide_page_nav_wrapper ul");
            var preObj = $(this).find(".divide_page_nav_wrapper ul li:first");
            var currentObj = $(this).find(".divide_page_nav_wrapper ul a").not('#previous,.ellipsis,#next');
            var nextObj = $(this).find(".divide_page_nav_wrapper ul li:last");

            var pageNumObj = $(this).find("#page_num");//当前页码文本框
            var confirmBtn = $(this).find('#confirm_btn');

            function loopPageElement(minPage, maxPage) {
                var tempObj = preObj.next();
                for (var i = minPage; i <= maxPage; i++) {
                    if (minPage == 1 && (preObj.next().attr('class').indexOf('hidden')) < 0) {
                        preObj.next().addClass("hidden");
                    }
                    else if (minPage > 1 && (preObj.next().attr('class').indexOf('hidden')) >= 0) {
                        preObj.next().removeClass("hidden");
                    }
                    if (maxPage == totalPage && (nextObj.prev().attr('class').indexOf('hidden')) < 0) {
                        nextObj.prev().addClass('hidden');
                    }
                    else if (maxPage < totalPage && (nextObj.prev().attr('class').indexOf('hidden')) >= 0) {
                        nextObj.prev().removeClass('hidden');
                    }

                    var obj = tempObj.next().find('a');
                    if (!isNaN(obj.html())) obj.html(i);
                    tempObj = tempObj.next();
                }
            }

            //调用回调函数
            function callback(currentPage) {
                defauls.callback(currentPage, defauls.pageSize, totalCount);
            }

            /*当前页*/
            currentObj.click(function (event) {
                event.preventDefault();
                var currentPage = Number($(this).html());
                var activeObj = pageObj.find('a[class="nav_active"]');
                var activePage = Number(activeObj.html());
                if (currentPage == activePage) return false;
                if (totalPage > showPage) {
                    var maxPage = currentPage, minPage = 1;
                    if (($(this).parent().prev().children().attr('class'))
                        && ($(this).parent().prev().children().attr('class').indexOf('ellipsis') >= 0)) {
                        if (currentPage > 1) {
                            minPage = currentPage - 1;
                        }
                        maxPage = minPage + showPage - 1;
                        loopPageElement(minPage, maxPage);
                    } else if (($(this).parent().next().children().attr('class'))
                        && ($(this).parent().next().children().attr('class').indexOf('ellipsis') >= 0)) {
                        if (totalPage - currentPage >= 1) maxPage = currentPage + 1;
                        else maxPage = totalPage;
                        if (maxPage - showPage > 0) minPage = maxPage - showPage + 1;
                        loopPageElement(minPage, maxPage);
                    }
                }
                /*将页码设为选中页码*/
                pageNumObj.val(currentPage);
                $.each(currentObj, function (index, item) {
                    if ($(item).html() == currentPage) {
                        activeObj.removeClass('nav_active');
                        $(item).addClass('nav_active');
                        callback(currentPage);
                    }
                });
            });

            /*上一页*/
            preObj.click(function (event) {
                event.preventDefault();
                var activeObj = pageObj.find('a[class="nav_active"]');
                var activePage = Number(activeObj.html());
                if (activePage <= 1) return false;
                if (totalPage > showPage) {
                    var maxPage = activePage, minPage = 1;
                    if ((activeObj.parent().prev().prev().children().attr('class'))
                        && (activeObj.parent().prev().prev().children().attr('class').indexOf('ellipsis') >= 0)) {
                        minPage = activePage - 1;
                        if (minPage > 1) minPage = minPage - 1;
                        maxPage = minPage + showPage - 1;
                        loopPageElement(minPage, maxPage);
                    }
                }
                pageNumObj.val(activePage - 1);
                $.each(currentObj, function (index, item) {
                    if ($(item).html() == (activePage - 1)) {
                        activeObj.removeClass('nav_active');
                        $(item).addClass('nav_active');
                        callback(activePage - 1);
                    }
                });
            });

            /*下一页*/
            nextObj.click(function (event) {
                event.preventDefault();
                var activeObj = pageObj.find('a[class="nav_active"]');
                var activePage = Number(activeObj.html());
                if (activePage >= totalPage) return false;
                if (totalPage > showPage) {
                    var maxPage = activePage, minPage = 1;
                    if ((activeObj.parent().next().next().children().attr('class')) &&
                        (activeObj.parent().next().next().children().attr('class').indexOf('ellipsis') >= 0)) {
                        maxPage = activePage + 2;
                        if (maxPage > totalPage) maxPage = totalPage;
                        minPage = maxPage - showPage + 1;
                        loopPageElement(minPage, maxPage);
                    }
                }
                pageNumObj.val(activePage + 1);
                $.each(currentObj, function (index, item) {
                    if ($(item).html() == (activePage + 1)) {
                        activeObj.removeClass('nav_active');
                        $(item).addClass('nav_active');
                        callback(activePage + 1);
                    }
                });
            });

            /*确定按钮*/
            confirmBtn.click(function (event) {
                event.preventDefault();
                var activeObj = pageObj.find('a[class="nav_active"]');
                var pageNum = Number(pageNumObj.val());
                pageNum = pageNum <= 0 ? 1 : pageNum;
                pageNum = pageNum > totalPage ? totalPage : pageNum;
                //总页数小于5时
                if (totalPage <= showPage) {
                    loopPageElement(1, totalPage);
                }
                //页数大于5时
                else {
                    if (pageNum <= 2) {
                        loopPageElement(1, showPage);
                    } else if (pageNum >= (totalPage - 1)) {
                        loopPageElement(totalPage - showPage + 1, totalPage);
                    } else {
                        var minPage = pageNum - 2;
                        var maxPage = pageNum + 2;
                        minPage = minPage <= 0 ? 1 : minPage;
                        maxPage = maxPage > totalPage ? totalPage : maxPage;
                        loopPageElement(minPage, maxPage);
                    }
                }
                $.each(currentObj,function(index,item){
                    if($(item).html() == pageNum){
                        activeObj.removeClass('nav_active');
                        $(item).addClass('nav_active');
                        pageNumObj.val(pageNum);
                        callback(pageNum);
                    }
                });
            });
        }
    }
})(jQuery);


