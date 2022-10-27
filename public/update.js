// päivitysfunktio
document.body.onload = function() {
    document.getElementById('_id').value = getParam('_id');
    document.getElementById('Manufacturer').value = getParam('Manufacturer');
    document.getElementById('Model').value = getParam('Model');
    document.getElementById('Price').value = getParam('Price');
    document.getElementById('Color').value = getParam('Color');
    document.getElementById('ProductCategory').value = getParam('ProductCategory');
} 
function getParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}