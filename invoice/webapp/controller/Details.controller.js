sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.mvc.routing.History} History
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     */
    function (Controller,History,UIComponent) {
        "use strict";

        return Controller.extend("logaligroup.invoice.controller.Details", {

            onInit: function(){
               
                let  oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                     oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatch, this);
            },

            _onObjectMatch : function(oEvent){

                this.byId("rating").reset();

                let oView = this.getView(),
                    oRouter = oEvent.getParameter("arguments"),
                    sPath = oRouter.invoicePath;

                oView.bindElement({
                    path : window.decodeURIComponent(sPath),
                    model :"northwind"
                });
            } ,
            
            onNavBack : function ()
            {
                let oHistory = History.getInstance();
                let sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined){
                    window.history.go(-1)
                }else{
                    let oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteApp",{},true)
                }
            },

            onRatingChange: function(oEvent){
                const fValue = oEvent.getParameter("value");
                const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

                sap.m.MessageToast.show(oResourceBundle.getText("ratingConfirmation",[fValue]));
            }
           
      
        });
    });