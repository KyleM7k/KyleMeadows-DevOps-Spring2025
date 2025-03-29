function init_tinymce(){$(function(){tinyMCE.init({selector:"textarea:not(.no_wysiwyg)",theme:"modern",plugins:"advlist autoresize code fullscreen link lists paste table textcolor",toolbar:"bold italic underline | forecolor | alignleft aligncenter alignright | bullist numlist outdent indent | link unlink | table | fullscreen | code",toolbar_items_size:"small",menubar:false,statusbar:false,content_style:"body, td, th {font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji' !important;}",valid_classes:"none",invalid_styles:"float font font-family font-size font-style font-variant font-weight",table_appearance_options:false,table_advtab:false,table_cell_advtab:false,table_row_advtab:false,table_default_attributes:{border:'1'},advlist_bullet_styles:"circle square",advlist_number_styles:"lower-alpha lower-roman upper-alpha upper-roman",setup:function(editor){editor.on('init',function(e){});editor.on('FullscreenStateChanged',function(e){$(".modal").toggleClass("mce-fullscreen-modal");$(".modal-dialog").toggleClass("mce-fullscreen-modal-dialog");});},target_list:[{title:'New tab',value:'_blank'},{title:'Same tab (may not work with embed mode)',value:''}],browser_spellcheck:true});});}
function dofocus(){set_focus_on('.default_focus');}
function remove_tinymces(){for(n in tinyMCE.editors){inst=tinyMCE.editors[n];tinyMCE.remove(inst);}}
function ajax_save_success_func(responseText,statusText){$("#editor_dialog").html(responseText);}
function ajax_save_error_func(jqXHR,textStatus,errorThrown){console.log(jqXHR.responseText);$(".modal-body").html("<p class='h5'>We're sorry, but this item could not be saved.</p><p>This usually happens when the form has been left open for a long time. Please try reloading the page.</p><p>If see this message again <a href='support_redirect' target='_blank'>submit a ticket</a> including the content and browser you were working with.</p><script>$(function() {gtag('event', 'item_save_fail');});</script>");$(".modal-footer button").not(":last").hide();$(".modal-footer button").last().on("click",function(event){window.location=window.location;}).html("Reload").removeAttr("disabled");}
function save_item_edit(){$('.modal-footer button').attr('disabled','disabled');$("#edit_item_notification").remove();tinyMCE.triggerSave();$('#edit_item_form').ajaxSubmit({success:ajax_save_success_func,error:ajax_save_error_func});}
function save_and_notify_item_edit(){$("#edit_item_notification").remove();$('.modal-footer').children().attr('disabled','disabled');tinyMCE.triggerSave();$("#notify").prop("disabled",false);$('#edit_item_form').ajaxSubmit({success:ajax_save_success_func,error:ajax_save_error_func});}
function do_bootbox_alert(message,callback=function(){return;}){bootbox.alert({size:"small",centerVertical:true,message:message,callback:callback});}
function do_bootbox_confirm(message,callback){event.preventDefault();bootbox.confirm({size:"small",centerVertical:true,swapButtonOrder:true,message:message,buttons:{confirm:{className:'btn-indigo'},cancel:{className:'btn-mdb-color'}},callback:callback});}
function do_bootbox_confirm_submit(message){form_to_submit=event.target.closest('form');do_bootbox_confirm(message,function(result){if(result){form_to_submit.submit();}});}
function setup_ajax_edit(){$(function(){$('#editor_dialog').modal('hide');$(document).on("click","button.add_item",function(event){url=$(this).attr("add_url");event.preventDefault();do_confirmed_add=function(){remove_tinymces();$("#editor_dialog").html("").hide().load(url,dofocus).show();};if(syllabus_has_linked_children&&!$(this).hasClass("multi_item")){do_bootbox_confirm("Adding this item will <strong>replace all linked items and their subitems</strong> on other syllabi.",function(result){if(result){do_confirmed_add();}});}else{do_confirmed_add();}});$(document).on("click","button.edit_item",function(event){event.preventDefault();remove_tinymces();url=$(this).attr("edit_url")
$('#editor_dialog').html('').hide().load(url,dofocus).show();});$(document).on("click","button.delete_item",function(event){item_class=$(this).attr("item_class");item_id=$(this).attr("item_id");event.preventDefault();do_confirmed_delete=function(){$.post("delete_item",{item_class:item_class,item_id:item_id},function(data){$("#dummydiv").html(data);});}
standard_deletion_confirm=function(){do_bootbox_confirm("Deleting this item will <strong>permanently</strong> remove it <strong>and any of its subitems.</strong>",function(result){if(result){do_confirmed_delete();}});}
if(syllabus_has_linked_children){do_bootbox_confirm("Deleting this item will <strong>also remove all linked items and their subitems</strong> on other syllabi.",function(result){if(result){standard_deletion_confirm();}});}else{standard_deletion_confirm();}});$(document).on("click","button.reorder_item",function(event){event.preventDefault();$.post("reorder_item",{item_class:$(this).attr("item_class"),item_id:$(this).attr("item_id"),direction:$(this).attr("direction")},function(data){$('#dummydiv').html(data);});});});}
function ajax_replace(selector,url){$.get(url,function(data){$(selector).before(data).remove();});}
function complete_edit_item_action(url,child){$.get(url,function(data){$('#syllabus').before(data).remove();if(typeof child!=='undefined'){scroll_to_item(child);}});$('#editor_dialog').modal('hide');}
function scroll_to_item(item){$(function(){item_line=$(item).offset().top;scroll_line=$(document).scrollTop();window_height=document.documentElement.clientHeight;if(item_line>0&&(((item_line-scroll_line)>window_height)||(scroll_line>item_line))){$('html, body').animate({scrollTop:$(item).offset().top-5},2000,'swing');}});}
function set_focus_on(sel){$(function(){$(sel).trigger("focus");});}
function calendarize(elem){$(function(){$(elem).datetimepicker({format:'YYYY-MM-DD',allowInputToggle:true});});}
function calendarize_start_and_end_dates(){$(function(){$('#start_date_picker').datetimepicker({format:'YYYY-MM-DD',allowInputToggle:true,minDate:new Date('1970-01-01')});$('#end_date_picker').datetimepicker({format:'YYYY-MM-DD',allowInputToggle:true,minDate:new Date('1970-01-01'),useCurrent:false});$("#start_date_picker").on("change.datetimepicker",function(e){$('#end_date_picker').datetimepicker('minDate',e.date);});$("#end_date_picker").on("change.datetimepicker",function(e){$('#start_date_picker').datetimepicker('maxDate',e.date);});});}
function alternate_label_click(){$(function(){$('.label_alt').on('click',function(){$(this).next().find('input').click();});});}
function sizeModal(){function reposition(){var modal=$(this),modalDialog=modal.find('.modal-dialog');modalHeader=modal.find('.modal-header');modalBody=modal.find('.modal-body');modalFooter=modal.find('.modal-footer');modal.css('display','block');modalBody.css('height',Math.max(300,($(window).height()-modalHeader.outerHeight()-modalFooter.outerHeight()-(modalDialog.css("margin-top").replace('px',''))*2-2)));}
$('.modal').on('show.bs.modal',reposition);$(window).on('resize',function(){$('.modal:visible').each(reposition);});}
function syllabus_nav(){if($("#syllabus").length){if($("#syllabus").outerHeight()>(2.5*$(window).height())){$(".syllabus-wedge").css("width",0+"px");var wedge_width=($(window).width()-$("#syllabus").outerWidth())/2-15;if(wedge_width<150){var left_wedge=($(window).width()-$("#syllabus").outerWidth())-180;$("#left-wedge").css("width",left_wedge+"px");$("#right-wedge").css("width","auto");}else{$(".syllabus-wedge").css("width",wedge_width+"px");}
$("#scrollspy").fadeIn("slow");}
else{$("#scrollspy").fadeOut("slow");}}
$("#syllabus_download_button").css("padding-right",$("#right-wedge").outerWidth()+"px");}
function fill_content_height(){$(function(){var footer_height=0;var content_start=$("#content").position().top;var window_height=($(window).height());if($('#footer').length){var footer_height=$("#footer").outerHeight();}
var content_height=window_height-content_start-footer_height-32;$("#content").css("min-height",content_height+"px");$("#feature-card").css("min-height",content_height+"px");$("#embedded_syllabus_container > object").css("height",content_height+31+"px");});}
function adjust_footer(){var footer=0;if($('#footer').length){var footer=$("footer").outerHeight()+16;}
$("body").css("margin-bottom",footer+"px");}
function cookie_warning(){if(!navigator.cookieEnabled){$("#cookie-support").show();};}
function keepalive(){$.get('keepalive.php');}
function setup_attach_and_detach_file(){$(function(){$("#attach_file").on("click",function(){file_id=$("#file_id_select").val();if(file_id=='null'){return;}
$("option[file_id="+file_id+"]").attr("disabled",true);$("div[file_id="+file_id+"]").css("display","flex");$("input[file_id="+file_id+"]").prop("disabled",false);$("option[value='null']").attr("selected",true);});$(".detach_file").on("click",function(){file_id=$(this).attr("file_id");$("option[file_id="+file_id+"]").prop("disabled",false);$("div[file_id="+file_id+"]").css("display","none");$("input[file_id="+file_id+"]").attr("disabled",true);});});}
function make_tables_sortable(){$(".tablesorter").tablesorter({theme:'bootstrap',headerTemplate:'{content} {icon}',widgets:['uitheme','zebra','stickyHeaders']});}
function upload_submit(){$(".icon-spin-wrapper").show();return true;}
function edit_cds(obj){obj.parent().siblings('.cds_selector').removeClass("d-none");obj.parent().siblings('.cds_listing').hide();obj.parent().siblings('.save_cds').show();obj.parent().siblings('.remove_button').hide();obj.parent().siblings('.cancel_button').show();obj.parent().hide();return true;}
function cancel_edit_cds(obj){obj.parent().siblings('.cds_selector').addClass("d-none");obj.parent().siblings('.cds_listing').show();obj.parent().siblings('.save_cds').hide();obj.parent().siblings('.edit_button').show();obj.parent().siblings('.remove_button').show();obj.parent().hide();return true;}
$(function(){adjust_footer();$(window).on("resize",adjust_footer).trigger("resize");$(".default_focus").trigger("focus");alternate_label_click();setInterval("$.get('keepalive')",1500000);make_tables_sortable();$('#editor_dialog').on('shown.bs.modal',function(){$(document).off('focusin.modal');});});