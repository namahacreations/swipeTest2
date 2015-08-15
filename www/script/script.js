/***************
The use of jQuery UI is minimised as we have created our own widgets.
For eg:-
1.Accordion
2.Model Window
3.Custom Check-box


***************/



$(function(){	

// Point Deduction Tabs
	$('.tabs .tab-links a').on('click', function(e){
		var currentAttrValue = $(this).attr('href');
		$('.tabs ' + currentAttrValue).show().siblings().hide();
		$(this).parent('li').addClass('active').siblings().removeClass('active');
		 e.preventDefault();
	});

//Currently inspected item block highlighted
	
	$('.inspection-items li').on('click', function(e){
		$(this).addClass('active-inspection-item').siblings().removeClass('active-inspection-item');
	});
	
	
// Points assigned to an item
	$('.points li').on('click', function(){
		$(this).addClass('assigned').siblings().removeClass('assigned');
	});
    
	
// Dashboard Menu show-hide
	$('.ham-burger ul').on('click', function () {
	    $('.menu-body-wrapper').animate({ "left": "+=367px" }, "medium");
	});
	$('.ham-burger-blue ul').on('click', function () {
	    $('.menu-body-wrapper').animate({ "left": "-=367px" }, "medium");
	});


// Active class assigned in the dashboard menu to the current screen
	$('.menu-list li').on('click', function () {
	    var thisclass = $(this).attr('class');
	    if (thisclass == 'active') { }
	    else {
	        $(this).addClass('active').siblings().removeClass('active');
	    }
	});

	
// Point Deduction, menu to switch among the different  sections and cabins etc
	$('.cabins').on('click', function () {
	    $('.cabins-menu').show();
	});
	$(document).on('click', function (e) {
	    if ($('.cabins-menu').is(':visible')) {
	        if (!($(e.target).parents().hasClass('cabins-menu') || $(e.target).hasClass('cabins') || $(e.target).parents().hasClass('cabins'))) {
	            $('.cabins-menu').hide();
	        }
	    }
	});
	// show list of cabins in a section
	$('.line-2').click(function () {
	    if ($(this).next('.line-3').find('ul li ~ li ').is(':visible')) {
	        $(this).next('.line-3').find('ul li ~ li ').slideUp();
	        $(this).find('.right').css({ 'transform': 'rotate(-45deg)' });
	    }
	    else if (!$(this).next('.line-3').find('ul li ~ li ').is(':visible')) {
	        $(this).next('.line-3').find('ul li ~ li ').slideDown();
	        $(this).find('.right').css({ 'transform': 'rotate(45deg)' });
	    }
	});
	
// Custom Check-box
	$('input[type=checkbox]').each(function(){
		$(this).is(':checked')?$(this).parent().addClass('checked1'):$(this).parent().addClass('');
	});
	$(document).on('click', '.checkA', function(){
	   $(this).parent('div').toggleClass('checked1');
	});
	
	
// Custom accordion
	$(document).on('click', '.acchead .right-acchead', function(){
		if(!$('.left-acchead').is(':visible')){
			$('.acchead').slideDown();
			$(this).parent('.acchead').slideUp();
			$('.acc-child').slideUp();
			$(this).parent('.acchead').next('.acc-child').slideDown();
		}
	});
	
	// filling values in input fields
	
	$('.accordion h1').each(function(){
		$(this).next('.acc-child ').find('.inspection-type-placeholder').val($(this).find('.inspection-name').text());
		$(this).next('.acc-child ').find('.inspection-type-desc-placeholder').val($(this).find('.inspection-desc').text());
		$(this).next('.acc-child ').find('.inspection-type-points').val($(this).find('.assigned-apointsPA').text());
	});
	
	
	// editing/ Updating the details of inspection type
	$(document).on('click', '.update', function(){
		$(this).parents('.acc-child').prev().find('.inspection-name').text($(this).parents('.acc-child-right').find('.inspection-type-placeholder').val());
		$(this).parents('.acc-child').prev().find('.inspection-desc').text($(this).parents('.acc-child-right').find('.inspection-type-desc-placeholder').val());
		$(this).parents('.acc-child').prev().find('.assigned-apointsPA').text($(this).parents('.acc-child-right').find('.inspection-type-points').val());
		$(this).parents('.acc-child').slideUp();
		$(this).parents('.acc-child').prev().slideDown();
	});
	
	// -- value from points 
	$(document).on('click', '.delete-points', function(){
	  var inVal = $(this).parent('.row').find('.inputbox-smallPA').find('input[type=text]').val();
	inVal--;
	 $(this).parent('.row').find('.inputbox-smallPA').find('input[type=text]').val(inVal);
	});
	
	// ++ value from points 
	$(document).on('click', '.add-points', function(){
	  var inpVal = $(this).prev('.inputbox-smallPA').find('input[type=text]').val();
	inpVal++;
	$(this).prev('.inputbox-smallPA').find('input[type=text]').val(inpVal);
	});
	
	//assigning ids to h1, check-box and acc-child(accordion content)
	$('.accordion .acchead').each(function (i) {
		//$(this).attr('id', 'p_' + i);
		//$(this).next().attr('id', 'pc_' + i);
		//$(this).find('.left-checkbox-PA-red .style1.style2').attr('id', 'pcheck_' + i);
	});
	
// Point Assignment add/delete menu
	$('.vertical-dot-ul-1').click(function(){
		$('.edit-menu').fadeIn();
	});
	$(document).on('click', function (e) {
		if($('.aux-1').is(':visible')){
			if(!($(e.target).parents().hasClass('.edit_menu') || $(e.target).parents().hasClass('vertical-dots'))){
				$('.edit-menu').fadeOut();
			}
		}
	});
	
// showing check boxes for deleting
	var checkBoxes = 0;
	$('.delete-inspection-type').click(function(){
		$('.acchead').slideDown();
		$('.acc-child').slideUp();
		$('.edit-menu').fadeOut();
		
		$('.left-acchead, .left-headerPA').show();
		//$('.acc-remove').slideDown();
		$('.acc-remove').fadeIn('slow');
		$('.close-icon').fadeIn('slow');
		
		
		//checking the number of check boxes in accordion
		$('.left-checkbox-PA-red input[type=checkbox]').each(function(){
		  checkBoxes++;
		});
		console.log(checkBoxes);
	});
	
// adding new inspection-type

	$('.add-inspection-type').click(function(){
		$('.accordion h1:last, .accordion .acc-child:last').clone().appendTo('.accordion');
		$('.accordion h1:last').css('display','none');
		$('.accordion h1:last').find('.inspection-name').text('');
		$('.accordion h1:last').find('.inspection-desc').text('');
		$('.accordion h1:last').find('.assigned-apointsPA').text('');
		$('.accordion .acc-child:last').find('.inspection-type-placeholder').val('');
		$('.accordion .acc-child:last').find('.inspection-type-desc-placeholder').val('');
		$('.accordion .acc-child:last').find('.inspection-type-points').val('');
		$('.accordion .acc-child:last').slideDown();
	});
	
	
// closing remove check boxes

	$('.close-icon').on('click', function(){
		$('.left-acchead, .left-headerPA').hide();
		$('input[type=checkbox]').prop('checked', false); // unchecking all the check boxes
		$('input[type=checkbox]').parent().removeClass('checked1')
		$('.acc-remove').fadeOut('fast');
		$('.close-icon').fadeOut('fast');
	});
	
// Checking all the check boxes on if master check box is checked

	$('#master-check').on('click', function(){
	   if($(this).is(':checked')){   
			$('.left-checkbox-PA-red ').find('input[type=checkbox]').prop('checked', true);
		}
	  if(!$(this).is(':checked')){
		 $('.left-checkbox-PA-red ').find('input[type=checkbox]').prop('checked', false);
	  }
		$('.left-checkbox-PA-red input[type=checkbox]').each(function(){
			$(this).is(':checked')?$(this).parent().addClass('checked1'):$(this).parent().removeClass('checked1');
		});
	});

	
	
	$('.left-checkbox-PA-red input[type=checkbox]').on('click', function(){
		var checked = 0;
		var notchecked = 0;
	  $('.left-checkbox-PA-red input[type=checkbox]').each(function(){
	  $(this).is(':checked')?checked++:notchecked++;
	});
		if(checked === checkBoxes){
			$('#master-check').prop('checked', true);
			$('#master-check').is(':checked')?$('#master-check').parent().addClass('checked1'):$('#master-check').parent().removeClass('checked1');
		}
		else if(checked < checkBoxes){
				$('#master-check').prop('checked', false);
			$('#master-check').is(':checked')?$('#master-check').parent().addClass('checked1'):$('#master-check').parent().removeClass('checked1');
			}
	});



// Displaying Modal Window
	$('.acc-remove').on('click', function(){
			var winHeight = $(window).height();
			var winWidth = $(window).width();
			var dialogTop = (winHeight)/2 - $('.delete-confirmation').height()/2;
			var dialogLeft = (winWidth)/2 - $('.delete-confirmation').width()/2;
			$('.mask').height($(window).height());
			$('.mask').width($(window).width());
			$('.delete-confirmation, .select-one').css('top',dialogTop);
			$('.delete-confirmation, .select-one').css('left',dialogLeft);	
			
		if($('.left-checkbox-PA-red input[type=checkbox]').is(':checked')){
			$('.delete-confirmation').addClass('bounceInDown').removeClass('bounceOutUp');
			$('.delete-confirmation').fadeIn();
		}
		else{
			$('.select-one').addClass('bounceInDown').removeClass('bounceOutUp');
			$('.select-one').fadeIn();
			
		}
			$('.mask').fadeIn();
	});
	

//deleting inspection type
	$('.dialog-yes').on('click', function(){
		$(".left-acchead input[type='checkbox']").each(function(){
			if($(this).is(':checked')){
				$(this).parents('h1').next().remove();
				$(this).parents('h1').remove();
			}
		});
		if(!$(".left-acchead input[type='checkbox']").length){
			$('.acc-remove').fadeOut('fast');
			$('.close-icon').fadeOut('fast');
			$('.left-headerPA').hide();
		}
		$('.delete-confirmation').removeClass('bounceInDown').addClass('bounceOutUp');
		$('.mask').fadeOut();
	});
	$('.dialog-no').on('click', function(){
		$('.delete-confirmation').removeClass('bounceInDown').addClass('bounceOutUp');
		$('.mask').fadeOut();
	});
	$('.dialog-ok').on('click', function(){
		$('.select-one').removeClass('bounceInDown').addClass('bounceOutUp');
		$('.mask').fadeOut();
	});
	
	
	$(function() {   
	// there's the gallery and the trash   
	var $accordion = $( ".accordion" ),    
	$trash = $( ".PA-header" );  	// let the gallery items be draggable
	
	$( "h1.acchead", $accordion ).draggable({ revert: "invalid" });   
	// let the trash be droppable, accepting the gallery items  
	$trash.droppable({   
		accept: "h1.acchead",  
		activeClass: "ui-state-highlight",   
		drop: function( event, ui ){     
			 $(ui.draggable).next('.acc-child').remove();
			 $(ui.draggable).remove();
			 $(ui.draggable).css('background','#D3E6F5');
	}    
	}); 
      
	  
  });  
	
	
});

