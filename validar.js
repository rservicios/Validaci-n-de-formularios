document.addEventListener('DOMContentLoaded', prepararValidacion);

var elTexto = document.getElementById("respuesta");



function prepararValidacion(){
	
	var form1 = document.formul;
	
	form1.addEventListener("submit",verificar);
	
	function verificar(ev){
		ev.preventDefault();
		var f = this;
		var t = 0;
		//console.dir(f);
		
		var edadEs = Number(f.edad.value);
		if(edadEs == "" || isNaN(edadEs) || edadEs % 1 != 0 || edadEs > 150)
		{
			form1.edad.nextElementSibling.innerHTML="Registró inválido o vacio";
			form1.edad.nextElementSibling.style.display="inline";
		}else{
			form1.edad.nextElementSibling.style.display="none";
			t++;
		}
		
		var reDni = /([a-zA-Z0-9]{5,15})/;
	    if(reDni.test(f.dni.value) == false){
			f.dni.nextElementSibling.innerHTML="DNI inválido o vacio";
			f.dni.nextElementSibling.style.display="inline";
		}else{
			f.dni.nextElementSibling.style.display="none";
			t++;
		}
		
		if(f.comentario.textLength > 0 && f.comentario.textLength < 20 ){
			var faltan = 20 - f.comentario.textLength;
			f.comentario.nextElementSibling.innerHTML="Faltan "+faltan+" caracteres<br> para completar";
			f.comentario.nextElementSibling.style.display="inline-block";
			f.comentario.nextElementSibling.style.top="-20px";
		}else{
			f.comentario.nextElementSibling.style.display="none";
			t++;
		}
		
		var rePass = /^(?=.*[a-z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ]){6,}$/;
		if(rePass.test(f.clave.value) == false){
			var x = f.clave.value;
			var txt = "";
			if(x.length < 6){
				txt +='Faltan '+(6 - x.length)+' caracteres';
			} else if(x.search(/[A-Za-z]/) == -1){
				txt += 'No hay ninguna letra en la clave';
			}else{
				txt += 'No hay ningún número en la clave';
			}
			f.clave.nextElementSibling.innerHTML=txt;
			f.clave.nextElementSibling.style.display="inline";
		}else{
			f.clave.nextElementSibling.style.display="none";
			t++;
		}
		if(f.clave.value != f.claveRe.value)
		{
			form1.claveRe.nextElementSibling.innerHTML="Las claves no coinciden";
			form1.claveRe.nextElementSibling.style.display="inline";
		}else{
			form1.claveRe.nextElementSibling.style.display="none";
			t++;
		}
		
		if(t == 5){
			
			elTexto.innerHTML="Enviando los datos";
			f.submit.disabled=true;
			f.submit.value="Validando...";
			var laEdad = f.edad.value;
			var elDni = f.dni.value;
			var elComentario = f.comentario.value;
			var laClave = f.clave.value;
			
			var miObjeto = new Object();
				 miObjeto.laEdad=laEdad;
				 miObjeto.elDni=elDni;
				 miObjeto.elComentario=elComentario;
				 miObjeto.laClave=laClave;
				 var paquete = JSON.stringify(miObjeto);
			
			enviar(paquete);	 
			
		}else{
			return false;
		}
		
	}
	
}


function enviar(paquete){
	console.log(paquete);
	
}