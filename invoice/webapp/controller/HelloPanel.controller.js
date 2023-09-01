sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "logaligroup/invoice/model/models"
    
], 
/**
 * 
 * @param {typeof sap.ui.core.mvc.Controller} Controller 
 * @param {sap.m.MessageToast} MessageToast 
 * @param {logaligroup.invoice.model.models} models 
 */

function(Controller,MessageToast,models) {
    'use strict';
    return Controller.extend("logaligroup.invoice.controller.HelloPanel", {

        onInit: function () {
    
            this.getView().setModel(models.createRecipient());
            

    },
    onShowHello: function () {
        MessageToast.show(`hola`);
    },



    onOpenDialog: function(){

        this.getOwnerComponent().openHelloDialog(); // se usa desde cualquier controlador para llamar el Fragment manejado

      /*  let oView = this.oView;

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
        */

    }
       
    });
});
