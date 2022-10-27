// Luo taulukon tuotteista
function readProduct(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/storelibrary",true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    const storelibrary = JSON.parse(xmlhttp.responseText);
    // Luodaan taulukko, jossa tuotteet näkyvät
     let table = document.createElement('table');
     // Silmukka tuotteiden läpikäymiseen
     for (let i = 0; i < storelibrary.length; i++) {
      // Luo taulukkorivin
      let newRow = document.createElement('tr');
      // Luo solut manufactuer, model, price, color ja productcategory kentille
      // Käyttää funktiota createCell
      newRow.appendChild(createCell(storelibrary[i].Manufacturer));
      newRow.appendChild(createCell(storelibrary[i].Model));
      newRow.appendChild(createCell(storelibrary[i].Price));
      newRow.appendChild(createCell(storelibrary[i].Color));
      newRow.appendChild(createCell(storelibrary[i].ProductCategory));
      //Luodaan päivitä-painike
      newRow.appendChild(createForm(storelibrary[i], 'update'));
      //Luodaan poisto-painike
      newRow.appendChild(createForm(storelibrary[i], 'delete'));
      table.appendChild(newRow);
     }
     document.getElementById("demo").appendChild(table);

        }
    }

// Taulukon luonnissa kutsutaan funktiota, ettei tarvi kirjoittaa auki jokaiseen solun luontiin erikseen.
function createCell(value) {
  let newCell = document.createElement('td');
  newCell.innerHTML = value;
  return newCell;
}
    }
    readProduct();
// Luo päivitys, lisäys ja poistoformit
function createForm(product, action) {
  let newCell = document.createElement('td');
  let form = document.createElement('form');
  form.method = (action == 'delete') ? 'POST' : 'GET';
  // Ternääri (ternatry) operaatio, ensimmäinen vaihtoehto true ja jälkimmäinen false. Vertaa IF
  form.action = (action == 'delete') ? '/deleteProduct' : '/updateProduct.html';
  //Lisää piilokenttä id:lle
  let input = document.createElement('input');
  input.value = product._id;
  input.type = 'hidden'
  input.name = '_id'
  form.appendChild(input);
  // Jos update -> lisää lomakkeelle muutkin tiedot
  // lisätään tuotteen valmistaja
  input = document.createElement('input');
  input.value = product.Manufacturer;
  input.type = 'hidden'
  input.name = 'Manufacturer'
  form.appendChild(input);
  // lisätään malli
  input = document.createElement('input');
  input.value = product.Model;
  input.type = 'hidden'
  input.name = 'Model'
  form.appendChild(input);
  // lisätään hinta
  input = document.createElement('input');
  input.value = product.Price;
  input.type = 'hidden'
  input.name = 'Price'
  form.appendChild(input);
  // lisätään tyyppi
  input = document.createElement('input');
  input.value = product.ProductCategory;
  input.type = 'hidden'
  input.name = 'ProductCategory'
  form.appendChild(input);
  // lisätään väri
  input = document.createElement('input');
  input.value = product.Color;
  input.type = 'hidden'
  input.name = 'Color'
  form.appendChild(input);
  // lisää painike
  input = document.createElement('input');
  input.type = 'submit';
  input.value = (action == 'delete') ? 'Poista tuote' : 'Päivitä tuote';
  form.appendChild(input)
  newCell.appendChild(form);
  return newCell;

}