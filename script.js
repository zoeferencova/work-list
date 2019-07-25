//Date and day of the week 
const date = new Date();
let day = date.getDay();
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
day = weekDays[day];
document.getElementById("date").innerHTML = `${day}, ${date.toLocaleDateString()}`;

//Create a new list item when clicking the "Add to List" button

const createListElement = () => {
	
	//Defining variables
	const projItem = document.getElementById("projInput").value;
	const advItem = document.getElementById("advInput").value;
	const manItem = document.getElementById("manInput").value;
	const table = document.getElementById("listcontainer");
		
	//Defining images for icons
	const img1 = document.createElement("img");
	img1.src = "http://freevector.co/wp-content/uploads/2010/11/55158-left-arrow-angle-in-circular-button.png";
	const img2 = document.createElement("img");
	img2.src = "https://www.botlibre.biz/media/a532515.png"
	const img3 = document.createElement("img");
	img3.src = "https://www.freeiconspng.com/uploads/close-icon-39.png"

	//Functions for icon opacity change
	const changeArrow = () => {
		img1.classList.toggle("opacity");
	}
	const changeCheck = () => {
		img2.classList.toggle("opacity1");
	}

	//Function to delete row using "X" icon
	const deleteItem = (event) => {
		const td = event.target.parentNode; 
	  	const tr = td.parentNode; // the row to be removed
	  	tr.parentNode.removeChild(tr);
	}

	img1.addEventListener("click", changeArrow);
	img2.addEventListener("click", changeCheck);
	img3.addEventListener("click", deleteItem);

	//Defining cell placement for new rows
	const rowCount = table.rows.length;
	const row = table.insertRow(rowCount);
	const cell0 = row.insertCell(0);
	const cell1 = row.insertCell(1);
	const cell2 = row.insertCell(2);
	const cell3 = row.insertCell(3);
	const cell4 = row.insertCell(4);

	//Inserting rows and adding classes to new rows
	if (projInput.value !== '' && advInput.value !== '') {
		cell0.appendChild(img2);
		cell0.appendChild(img1);
		cell1.innerHTML = projItem;
		cell2.innerHTML = advItem;
		cell3.innerHTML = manItem;
		cell4.appendChild(img3); 
		cell1.className = "projColumn"
		cell2.className = "advColumn"
		cell3.className = "manColumn"
		img1.className = "arrow"
		img2.className = "check"
		img3.className = "x"
	} else {
		alert('Please enter text!')
	}
	
	//Clear fields after submitting
	document.getElementById("projInput").value = '';
	document.getElementById("advInput").value = '';
}

//Event listener for "Add to List" button
const button = document.getElementById("button");
button.addEventListener("click", createListElement);

//Event listener for enter key
window.addEventListener("keypress", function (e) {
	if (13 === e.keyCode) {
		createListElement();
	}
});


//"Clear Completed" button functionality
const clearCompleted = () => {
const aObj = document.getElementsByTagName("tr");
let i = aObj.length;
	while(i--) { 
	if(aObj[i].querySelector(".opacity1")) {
	    aObj[i].parentNode.removeChild(aObj[i]);
	    }
	}
}

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearCompleted)

//"Reset" button functionality
const reset = () => {
	const images = document.getElementsByTagName("img");
	let j = images.length;
	while(j--) { 
		if(images[j].classList.contains("opacity1") || images[j].classList.contains("opacity")) {
		    images[j].classList.remove("opacity1")
		    images[j].classList.remove("opacity")
	  	}
	}
}

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", reset)

//Export table to Excel
var tableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
    if (!table.nodeType) table = document.getElementById("listcontainer")
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
    window.location.href = uri + base64(format(template, ctx))
  }
})()

const exp = document.getElementById("exportButton");
exp.addEventListener("click", tableToExcel);
