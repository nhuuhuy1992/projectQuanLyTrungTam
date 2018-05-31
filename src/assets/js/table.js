import * as $ from "jquery";


function paginate(data, entry, div, callback){
	let length = data.length;
	let pagination = '';
	$(div).next('.pagination').html('');
	if(length/entry === 0 ){
		for(let i = 1; i < length/entry ; i++){
			if(i==1){
				pagination += `<li class="page-item active"><a class="page-link" >${i}</a></li>`
			}else{
			pagination += `<li class="page-item" ><a class="page-link" >${i}</a></li>`
				
			}
		}
	}else{
		for(let i = 1; i < length/entry +1 ; i++){
			if(i==1){
				pagination += `<li class="page-item active"><a class="page-link" >${i}</a></li>`
			}else{
			pagination += `<li class="page-item"><a class="page-link" >${i}</a></li>`
				
			}
		}
	}

	$(div).after(`<ul class="pagination">${pagination}</ul>`);
	pageOnClick(data,callback, entry, div)

}
function pageOnClick( data, callback,entry,div ) {

	return  $(div).next('.pagination').find('.page-link').click(function(){
		$(div).next('.pagination').find('.page-item').removeClass('active');
		$(this).parent().addClass("active");
		
		 let numpage= parseFloat($(this).html());
		let newArr = $(data).slice((numpage-1)*entry,numpage*entry);
		callback(newArr,$(div).find('tbody'),(numpage-1)*entry);
	})
}

function compareValues(key, order='asc') {
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

  function showEntries(data,element,table,callback){
	paginate(data,$(element).val(), table,callback);
	$(table).next('.pagination').find('.page-item.active > .page-link').click();
}


export  {paginate, compareValues, showEntries, pageOnClick}