$(document).ready(function() {
	jQuery.support.cors = true;
});

function traerListado(){
	$.mobile.loading( 'show', {
		text: 'Cargando...',
		textVisible: true,
		theme: 'a',
		html: ""
	});
	$.getJSON('http://192.168.2.159:8080/minegociorestful/rest/listarClientes?random='+Math.random(), function(data) {
		  var items = [];
		  $.each(data.listarClientes, function(key, val) {
			items.push('<li><a href="#editar?id=' + val.numide + '" data-ajax="false">' + val.numide + ' - '+val.razonsocial+'</a></li>');
		  });

		  $('#listview').empty();
		  $('#listview').append(items.join('')).listview('refresh');
			$.mobile.loading( 'hide');
		});
}

function editarUsuario(p_cc){
	id_actual = p_cc;
	$.mobile.loading( 'show', {
		text: 'Cargando...',
		textVisible: true,
		theme: 'a',
		html: ""
	});
	$.getJSON('http://192.168.2.159:8080/minegociorestful/rest/listarClientePorId?numideId='+p_cc, function(data) {
		  val = data.listarClientes[0];
		  $("#id").val(val.numide);
		  $("#nombre").val(val.razonsocial);
		  $("#direccion").val(val.direccion);
		  $("#telefono").val(val.telefono);
		  $.mobile.loading( 'hide');
		});	
}

function guardarUsuario(){	
	$.mobile.loading( 'show', {
		text: 'Guardando...',
		textVisible: true,
		theme: 'a',
		html: ""
	});
	$.getJSON('http://192.168.2.159:8080/minegociorestful/rest/modificarCliente?numide='+$("#id").val()+
	"&razonsocial="+$("#nombre").val()+"&direccion="+$("#direccion").val()+"&telefono="+$("#telefono").val(), function(data) {
		  $.mobile.loading( 'hide');
		  val = data.listarClientes[0];
		  
		  $('#popupBasic').empty();
		  txt = "Registro actualizado correctamente";
		  if (val.mensaje != "modOk")
			txt = "Error: "+val.mensaje+ "- Intente de nuevo";
		  $('#popupBasic').append(txt);
		  $('#popupBasic').popup("open");
		});	
}

function eliminarUsuario(){	
	$('#dialogo').dialog('close');
	$.mobile.loading( 'show', {
		text: 'Eliminando...',
		textVisible: true,
		theme: 'a',
		html: ""
	});	
	$.getJSON('http://192.168.2.159:8080/minegociorestful/rest/eliminarCliente?numideId='+$("#id").val(), function(data) {
		  $.mobile.loading( 'hide');
		  val = data.listarClientes[0];
		  
		  $('#popupBasic2').empty();
		  txt = "Registro eliminado correctamente";
		  if (val.mensaje != "eliOk"){
			txt = "El registro a eliminar no existe: "+val.mensaje;
			$('#popupBasic2').append(txt);
			$('#popupBasic2').popup("open");
		  }else{
			$('#popupBasic2').popup("close");
			$.mobile.changePage( "#listado", { transition: "fade"} );
			$('#popupBasic3').empty();
			$('#popupBasic3').append(txt);
			$('#popupBasic3').popup("open");
		  }
		});	
}

function crearUsuario(){
	$.mobile.loading( 'show', {
		text: 'Creando...',
		textVisible: true,
		theme: 'a',
		html: ""
	});
	$.getJSON('http://192.168.2.159:8080/minegociorestful/rest/ingresarCliente?numide='+$("#c_id").val()+
	"&razonsocial="+$("#c_nombre").val()+"&direccion="+$("#c_direccion").val()+"&telefono="+$("#c_telefono").val(), function(data) {
		  $.mobile.loading( 'hide');
		  val = data.listarClientes[0];
		  
		  $('#popupBasic2').empty();
		  txt = "Registro creado correctamente";
		  if (val.mensaje != "ingOk")
			txt = "El registro a crear ya existe: "+val.mensaje;
		  $('#popupBasic2').append(txt);
		  $('#popupBasic2').popup("open");
		});	
}