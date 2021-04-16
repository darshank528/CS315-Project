function myFunction(i) {
  document.getElementsByClassName("myDropdown")[i].classList.toggle("show");
}

function filterFunction(i) {
  var input, filter, ul, li, a, i;
  input = document.getElementsByClassName("myInput")[i];
  filter = input.value.toUpperCase();
  div = document.getElementsByClassName("myDropdown")[i];
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}