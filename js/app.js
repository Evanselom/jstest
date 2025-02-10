//enable all tooltips in the document
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// "close" button to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// to add new note to the list
function newElement() {
  //var myNodelist = document.getElementsByTagName("LI");
  var li = document.createElement("li");
  li.className = 'list-group-item';
  var inputValue = document.getElementById("todo").value;
  var inputDesc = document.getElementById("desc").value;
  var tokenState = document.getElementById("token").value;
  li.setAttribute("onclick", "show(event);");
  li.setAttribute("title", inputDesc);// to show description on tooltip ; not the title field
  li.setAttribute("data-toggle", "tooltip");
  li.setAttribute("data-placement", "left");
  li.setAttribute("id", myNodelist.length)
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    $('#myModal').modal(show);
  } else {
    if (tokenState === '') {
      //new note
      document.getElementById("note").appendChild(li);
      $("#alert").fadeTo(2000, 500).slideUp(500, function () {
        $("#alert").slideUp(500);
      });
    } else {
      //editing an existing note
      var key = document.getElementById("token").value;
      document.getElementById(key).childNodes[0].nodeValue = document.getElementById("todo").value;
      document.getElementById(key).setAttribute("title", inputDesc);
      document.getElementById("token").value = "";
      $("#alrt").fadeTo(2000, 500).slideUp(500, function () {
        $("#alrt").slideUp(500)
      });
      document.getElementById("btn").value = "Save";
    }
  }
  //empty fields
  document.getElementById("todo").value = "";
  document.getElementById("desc").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.idName = "azert"
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

// to put selected note's attributes in the fields for editing
function show(event) {
  var target = event.srcElement || event.target;
  if (target !== event.currentTarget) {
    document.getElementById("todo").value = "";
    document.getElementById("desc").value = ""
    document.getElementById("btn").value = "Save";
  } else {
    document.getElementById("todo").value = event.target.childNodes[0].nodeValue;
    document.getElementById("desc").value = event.target.getAttribute('title');
    document.getElementById("token").value = event.target.getAttribute('id');
    document.getElementById("btn").value = "Edit";
  }
}
