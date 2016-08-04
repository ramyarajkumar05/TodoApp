function addtoList(todoItem,bool){
	if(todoItem.length != 0){
		createHtmlForTodoItem(todoItem,bool);
		document.getElementById("todoTxtBox").value="";
		saveToLocalStorage();
	}
}

function triggerAdd(){
	if (event.keyCode == 13)
    document.getElementById('add').click();
}

function createHtmlForTodoItem(todoItem, bool){

// Create a check box with the todo item label.	
var checkbox = document.createElement('input');
checkbox.type = "checkbox";
checkbox.name = "name";
checkbox.value=todoItem;
checkbox.onchange=function(){
			saveToLocalStorage();
			}
checkbox.checked=bool;

var label = document.createElement('label')
label.htmlFor = "name";
label.appendChild(document.createTextNode(todoItem));

// Create a (x) link
var deleteButton = document.createElement('a');
deleteButton.href="#";
var tn = document.createTextNode('(x)');
deleteButton.appendChild(tn);

// Onclick event for (x)
deleteButton.onclick=function(){
	this.parentNode.parentNode.removeChild(this.parentNode);
	saveToLocalStorage();
};

// Create br element
var br =document.createElement('br');

// create a div for checkbox and button

var div = document.createElement('div');


div.appendChild(deleteButton);
div.appendChild(checkbox);
div.appendChild(label);
div.appendChild(br);

document.getElementById("content").appendChild(div);
}

var setObjectArray = function(cbItem, isChecked){
this.cbItem=cbItem;
this.isChecked=isChecked;
};

function saveToLocalStorage(){
	var arr = [];
	var allItems=[];
	arr=document.getElementsByName("name");
	for (var i=0;i<arr.length;i++){
			allItems.push(new setObjectArray(arr[i].value,arr[i].checked) );
	}
localStorage.setItem("allItems", JSON.stringify(allItems));

}

function loadListFromLocalStorage(){
	var storedItems = JSON.parse(localStorage.getItem("allItems"));
	for(var i=0;i<storedItems.length;i++)
	{
		createHtmlForTodoItem(storedItems[i].cbItem,storedItems[i].isChecked);
	}

}

