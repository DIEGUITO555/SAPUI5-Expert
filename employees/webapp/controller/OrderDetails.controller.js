sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.routing.History} History
    */
    function (Controller,History) {
        "use strict";

        return Controller.extend("employees.controller.OrderDetails", {

            onInit: function (){
              

            },

            onAfterRendering: function () {
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteOrderDetails").attachPatternMatched(this._oObjectMatched,this);

            },

            _oObjectMatched: function(oEvent){
                let oArg = oEvent.getParameter("arguments"),
                    sOrderId = oArg.OrderID;
                this.getView().bindElement({
                    path: "/Orders("+sOrderId+")",
                    model: "odataNorthwind"
                })
            },

            onNavToBack: function (){
                let oHistory = History.getInstance(),
                    sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined){
                    window.history.go(-1);
                }else{
                    let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteContainer");
                }
            }

        });
    });
