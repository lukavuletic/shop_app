//controller.js
//varijable cd ili cds - u funkciji camelcase Cd ili Cds


(function(){
	var list = $('#cdsList');
	var baseUrl = 'api/cds/';
	readCds();
	$("#saveButton").click(submit);

	function submit() {
		var inputData = $('#inputForm').serialize();
		var id = $( "input[name$='id']" ).val();
		if (id) {
			updateCd(inputData);
		} else {
			createCd(inputData);
		}
	}

	function createCd(data) {
		var url = baseUrl + 'create.php';
		httpRequest(url, 'POST', insertCdToList, data);
	}

	function deleteCd(event) {
		var data = {id: event.data.id};
		var url = baseUrl + 'delete.php';
		httpRequest(url, 'POST', removeCdFromList, data);
	}

	//--------------------------------------------------------------------------

	function readCD(event) {
		 var url = baseUrl + 'read.php';
		 var data = {id: event.data.id};
		 httpRequest(url, 'GET', syncCdToInputForm, data);
	}

	//--------------------------------------------------------------------------

	function readCds() {
		var url = baseUrl + 'read.php';
		httpRequest(url, 'GET', insertCdsToList);
	}


	//--------------------------------------------------------------------------

	function updateCd(data) {
		var url = baseUrl + 'update.php';
		httpRequest(url, 'POST', updateCdInList, data);
	}

	//--------------------------------------------------------------------------
	
	function syncCdToInputForm(cds) {
		for (var key in cds) {
			var value = cds[key];
			$( "input[name$='" + key + "']" ).val(value);
		}
	}

	//--------------------------------------------------------------------------

	function httpRequest(url, type, callback, data) {
		//console.log(">>>>SEND: ", data);
		$.ajax({
			url: url,
			type: type,
			success: function(data) {
				//console.log('>>>>RECEIVE: ', data);
				callback(JSON.parse(data));
      		},
			data:data
		});
	}

	//==========================================================================

	function appendDeleteButtonToLi(cd, li) {
		var btn = createButton('Delete ', cd);
		btn.addClass("btn btn-danger");
		btn.on('click',{id:cd.id}, deleteCd);
		(li).append(btn);
	}

	//--------------------------------------------------------------------------

	function appendUpdateButtonToLi(cd, li) {
		var btn = createButton('Update ', cd);
		btn.on('click',{id:cd.id}, readCD);
		(li).append(btn);
	}

	//--------------------------------------------------------------------------

	function createButton(label, cd) {
		var str = label + cd.id;
		var btn = $('<button/>', {text:str});
		return btn;
	}

	//--------------------------------------------------------------------------

	function createCdLi(cd) {
		var li = $('<li/>', {id:'cd'+cd.id});
		var str = cdToStr(cd);
		var p = $('<h1/>', {text:str, id:str}).appendTo(li);

		var imeidatum = cdToStrImeiDatum(cd);
		var p1 = $('<h3/>', {text:imeidatum}).appendTo(li);

		var pitanje = cdToStrPitanje(cd);
		var p2 = $('<p/>', {text:pitanje}).appendTo(li);

		appendDeleteButtonToLi(cd, li);
		return li;
	}

	//--------------------------------------------------------------------------

	function insertCdToList(cd) {
		var li = createCdLi(cd);
		list.append(li);
	}

	//--------------------------------------------------------------------------

	function insertCdsToList(cds) {
		list.empty();
		for (i in cds) {
			var li = createCdLi(cds[i]);
			list.append(li);
		}
	}

	//--------------------------------------------------------------------------

	function removeCdFromList(cd) {
		var cdId = '#cd' + cd.id;
		$(cdId).remove();
	}

	//--------------------------------------------------------------------------

	function cdToStr(cd) {
		return cd.predmet;
	}
	//--------------------------------------------------------------------------

	function cdToStrPitanje(cd) {
		return 'Pitanje: ' + cd.pitanje;
	}
	
	//--------------------------------------------------------------------------

	function cdToStrImeiDatum(cd) {
		return cd.ime_prezime + " " + cd.datum;
	}
	
	//--------------------------------------------------------------------------

	function updateCdInList(cd) {
		clearFromFields(cd);
		var cdId1 = "#cd" + cd.id + ' h1'
		var cdId2 = "#cd" + cd.id + ' h3'
		var cdId3 = '#cd' + cd.id + ' p';
		var str = cdToStr(cd);
		$(cdId1).text(str);
		var str = cdToStrImeiDatum(cd);
		$(cdId2).text(str);
		var str = cdToStrPitanje(cd);
		$(cdId3).text(str);
	}

	//--------------------------------------------------------------------------

	function clearFromFields(cds) {
		for (var key in cds) {
			$( "input[name$='" + key + "']" ).val("");
		}
	}

	//--------------------------------------------------------------------------

})();