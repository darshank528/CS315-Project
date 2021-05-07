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

$(function () {
    $('.selectpicker').selectpicker();
});

function filter(){
  var cui = $('#cuisine').val();
  var cat = $('#category').val();

  var cost = $('#cost').val();
  console.log(cui,cat,cost);
  $('#filter_cui').val(cui);
  $('#filter_cat').val(cat);
  $('#filter_cost').val(cost);
  console.log(cui,cat,cost);

  const data = JSON.stringify({
  cui: cui,
  cat:cat,
  cost:cost
  })

  
  // var xhr = new XMLHttpRequest();
  // xhr.open("POST", "/filter", true);
  // xhr.setRequestHeader('Content-Type', 'application/json');
  // xhr.send( data);
  

}