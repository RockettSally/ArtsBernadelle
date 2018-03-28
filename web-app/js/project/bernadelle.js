jQuery(document).ready(function(){
	console.log('Hello bernadele.js');
	jQuery(".button-collapse").sideNav();
});

function showLoading(msg){
	jQuery('#msgLoading').text(msg);
	jQuery('#loading').show(500);
}

function hideLoading(){
	jQuery('#loading').hide(500);
	jQuery('#msgLoading').val('');
}

function dialogSuccess(title,msg){
	swal(title,msg,'success');
}

function dialogError(title,msg){
	swal(title,msg,'error');
}

function dialogWarning(title,msg){
	swal(title,msg,'warning');
}

function updateMasks() {
	$('.date').mask('11/11/1111');
	$('.time').mask('00:00:00');
	$('.date_time').mask('99/99/9999 00:00:00');
	$('.cep').mask('99999-999');
	$('.phone').mask('99999-9999');
	$('.phone_with_ddd').mask('(99) 9999-9999');
	$('.phone_us').mask('(999) 999-9999');
	$('.mixed').mask('AAA 000-S0S');
	$('.cpf').mask('000.000.000-00', {
		reverse : true
	});
	$('.cnpj').mask('00.000.000/0000-00', {
		reverse : true
	});
	$('.money').mask("##0,00", {
		reverse : true
	});
}

function successToast(msg){
	Materialize.Toast.removeAll();
	Materialize.toast(msg, 3000, 'rounded green');
}

function warningToast(msg){
	Materialize.Toast.removeAll();
	Materialize.toast(msg, 3000, 'rounded orange');
}

function dangerToast(msg){
	Materialize.Toast.removeAll();
	Materialize.toast(msg, 3000, 'rounded red');
}

function updateFilters(){
	jQuery('select').material_select();
}

function focusInput(input){
	jQuery(input).focus()
}

function fixCurrency(input){
	return jQuery(input).val().replace('.',',');
}

function currencyParseFloat(input){
	console.log('Hello currencyParseFloat');
	var number = jQuery(input).val()
	var numberConverted = number.replace(',','.');
	var numberParsed = 0;
	if(number){
		numberParsed = parseFloat(numberConverted).toFixed(2);
	} else {
		numberParsed = parseFloat(0).toFixed(2);
	}
	return numberParsed.replace('.',',');
}