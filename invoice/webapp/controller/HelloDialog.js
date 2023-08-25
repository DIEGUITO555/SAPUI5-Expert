sap.ui.define([
  
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment",    
    
],function(ManagedObject,Fragment) {
    
    'use strict';

    return ManagedObject.extend("logaligroup.invoice.controller.HelloDialog",{

       constructor : function (oView) {
            this._oView = oView;
       },

       exit: function () {
        delete this._oView;
       },

       open : function () {
      
         let oView = this._oView;
         

        if (!this.pDialog) {

            let oController = {
                onCloseDialog : function (){
                    oView.byId("helloDialog").close();
                }
            };

            this.pDialog = Fragment.load({
                id: oView.getId(),
                name: "logaligroup.invoice.fragment.HelloDialog",
                controller : oController
            }).then(function (oDialog){
                oView.addDependent(oDialog);
                return oDialog;
            });
        } 
        
        this.pDialog.then(function(oDialog){
            oDialog.open();
        });

       }

    });

});