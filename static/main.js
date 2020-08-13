import $ from 'jquery'
import './css/style.css'

$(function(){
	$('#qd').click(function(){
	    var theta = $('#theta').val();
	    location.href = 'http://localhost:3000/dynamic/set?'+'theta='+theta;
	})
})
