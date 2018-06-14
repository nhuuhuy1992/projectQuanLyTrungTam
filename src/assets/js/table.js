import * as $ from "jquery";


function paginate(data, entry, div, callback) {
    let length = data.length;
    let pagination = '';
    $(div).parent().next('.pagination').html('');
    if (length / entry === 0) {
        for (let i = 1; i < length / entry; i++) {

            pagination += `<li class="page-item" ><a class="page-link" >${i}</a></li>`

        }
    } else {
        for (let i = 1; i < length / entry + 1; i++) {

            pagination += `<li class="page-item"><a class="page-link" >${i}</a></li>`

        }
    }

    $(div).parent().after(`<ul class="pagination">${pagination}</ul>`);
    pageOnClick(data, callback, entry, div)

}

function pageOnClick(data, callback, entry, div) {

    return $(div).parent().next('.pagination').find('.page-link').click(function() {
        $(div).parent().next('.pagination').find('.page-item').removeClass('active');
        $(this).parent().addClass("active");

        let numpage = parseFloat($(this).html());
        let newArr = $(data).slice((numpage - 1) * entry, numpage * entry);
        callback(newArr, div, (numpage - 1) * entry);
    })
}

function compareValues(key, order = 'asc') {
    return function(a, b) {
        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order == 'desc') ?
            (comparison * -1) : comparison
        );
    };
}

function renderTable(data, element, table, callback) {
    let pageItem = $(table).next('.pagination').find('.page-item');
    let flag = false;
    let index = 0;
    pageItem.each(function(i) {
        if ($(this).hasClass('active')) {
            flag = true;
            index = i;
            return true;
        }
    })
    paginate(data, $(element).val(), table, callback);

    if (flag) {
        // $(table).next('.pagination').find('.page-item.active > .page-link').click();
        $(table).parent().next('.pagination').find('.page-item').eq(index).children('.page-link').click();
    } else {
        $(table).parent().next('.pagination').find('.page-item').eq(0).children('.page-link').click();
    }
}


export { paginate, compareValues, renderTable, pageOnClick }