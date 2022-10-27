function readProduct(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/storelibrary",true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    const storelibrary = JSON.parse(xmlhttp.responseText);
     let table = document.createElement('table');
     for (let i = 0; i < storelibrary.length; i++) {
      let newRow = document.createElement('tr');
      newRow.appendChild(createCell(storelibrary[i].Manufacturer));
      newRow.appendChild(createCell(storelibrary[i].Model));
      newRow.appendChild(createCell(storelibrary[i].Price));
      newRow.appendChild(createCell(storelibrary[i].Color));
      newRow.appendChild(createCell(storelibrary[i].ProductCategory));
      newRow.appendChild(createForm(storelibrary[i], 'update'));
      newRow.appendChild(createForm(storelibrary[i], 'delete'));
      table.appendChild(newRow);
     }
     document.getElementById("demo").appendChild(table);

        }
    }
function createCell(value) {
  let newCell = document.createElement('td');
  newCell.innerHTML = value;
  return newCell;
}
    }
    readProduct();

function createForm(product, action) {
  let newCell = document.createElement('td');
  let form = document.createElement('form');
  form.method = (action == 'delete') ? 'POST' : 'GET';
  form.action = (action == 'delete') ? '/deleteProduct' : '/updateProduct.html';
  
  let input = document.createElement('input');
  input.value = product._id;
  input.type = 'hidden'
  input.name = '_id'
  form.appendChild(input);

  input = document.createElement('input');
  input.value = product.Manufacturer;
  input.type = 'hidden'
  input.name = 'Manufacturer'
  form.appendChild(input);

  input = document.createElement('input');
  input.value = product.Model;
  input.type = 'hidden'
  input.name = 'Model'
  form.appendChild(input);

  input = document.createElement('input');
  input.value = product.Price;
  input.type = 'hidden'
  input.name = 'Price'
  form.appendChild(input);

  input = document.createElement('input');
  input.value = product.ProductCategory;
  input.type = 'hidden'
  input.name = 'ProductCategory'
  form.appendChild(input);

  input = document.createElement('input');
  input.value = product.Color;
  input.type = 'hidden'
  input.name = 'Color'
  form.appendChild(input);

  input = document.createElement('input');
  input.type = 'submit';
  input.value = (action == 'delete') ? 'Poista tuote' : 'Päivitä tuote';
  form.appendChild(input)
  newCell.appendChild(form);
  return newCell;

}