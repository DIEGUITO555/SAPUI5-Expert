sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "logaligroup/invoice/model/invoicesFormatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], function (Controller,JSONModel,invoicesFormatter,Filter,FilterOperator) {
        "use strict";
        return Controller.extend("logaligroup.invoice.controller.InvoicesList", {

            formatter: invoicesFormatter,
            
         
            onInit: function () {
                let oData = {
                     usd: "USD",
                     eur: "EUR"
                       
                };
                let oModel = new JSONModel(oData);
                this.getView().setModel(oModel,"currency");
            },

            onFilterInvoice : function(oEvent){

                let oParameter = oEvent.getParameters(),
                sQuery1 = oEvent.getParameters().query;

                let aFilter = [];

                console.log(sQuery1);

                if(sQuery1){
                    aFilter.push(
                         new Filter("ProductName", FilterOperator.Contains, sQuery1)   
                    );
                }
                console.log(aFilter);
                let oList = this.getView().byId("invoicesList2"),
                    oBinding = oList.getBinding("items");
                    oBinding.filter(aFilter);
                

            }

        });
    });