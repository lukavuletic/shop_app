function racun() {
		var prvi = document.getElementById('prvi').value;
		var drugi = document.getElementById('drugi').value;
		var prviInt = parseFloat(prvi);
		var drugiInt = parseFloat(drugi);
		var rez = prviInt / (drugiInt*drugiInt) * 10000;
		document.getElementById('izlaz').value = rez.toFixed(2);
		var rez2 = drugiInt * drugiInt * parseFloat(22.5) / 10000;
		document.getElementById('izlaz2').value = rez2.toFixed(2);
		 if (19 > rez) {
			document.getElementById('masa').value = "Pothranjeni ste!";
			console.log ("pothranjeni");
		} else if (19 <= rez && rez <= 25) {
			document.getElementById('masa').value = "Normalne ste mase.";
			console.log ("norm");
		} else if (25 < rez && rez < 30) {
			document.getElementById('masa').value = "Imate prekomjernu tjelesnu masu.";
			console.log ("previse");
		} else if (30 <= rez) {
			document.getElementById('masa').value = "Pretili ste!";
			console.log ("pretili");
		}
	}

	function brisi() {
		var rez = "";
		document.getElementById('prvi').value = rez;
		document.getElementById('drugi').value = rez;
		document.getElementById('izlaz').value = rez;
		document.getElementById('izlaz2').value = rez;
	}

///////////////////////

	function kalorije() {
		if (document.getElementById('mccheese').checked) {
				var broj = document.getElementById('broj').value
				var rez = broj * 300;
				document.getElementById('izlazkalorija').value = rez + " kalorija";
			}
	}