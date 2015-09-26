document.addEventListener('deviceready', function(){

    window.onerror = function(err){
        alert(err);
    };

    var store = new Lawnchair({adaptor:'dom', table:'scans'}, function(){

    });

    /*
    alert(localStorage['key']);
    localStorage['key'] = 'theOne';
    alert("--> " + localStorage['key']);
    */

    var inventory = {};

    var homepage = template('homepage');
    var addNewProductTemplate = template('addNewProduct');
    var showExistingProductTemplate = template('showExistingProduct');

    var addProduct = function(){
        var form = document.getElementById('addProductForm');
        var productCode = form.elements.productCode.value;
        var productName = form.elements.productName.value;
        var entry = {
            key : productCode,
            product : productName
        };
        //entry[productCode] = productName;
        store.save(entry, function (obj) {
            alert(JSON.stringify(obj));
            scans.innerHTML = "";
            // body...
        });


    };

    var processBarcode = function(barcode){
        //
        //Lawnchair(function(){
        store.exists(barcode, function(exists){
            if (exists){
                this.get(barcode, function(entry) {
                    showExistingProductTemplate
                        .show('scans',  {productName : entry.product});
                });
            }
            else{
                addNewProductTemplate
                    .on('click', 'addProduct', addProduct)
                    .show('scans', {productCode : barcode});
            }
        });

        //});
    };

    homepage
        .on('click', 'scanButton', function(){
            cordova.plugins.barcodeScanner.scan(
              function (result) {
                  processBarcode(result.text);
              },
              function (error) {
                  alert("Scanning failed: " + error);
              }
           );
        })
        .on('click', 'cameraButton', function(){
            navigator.camera.getPicture(function(imageURI){
                var target = document.getElementById('theImage');
                target.src = imageURI;

            }, function (err) {
                alert(err)
            }, { quality: 50 });

        })
        .show('scans');

});
