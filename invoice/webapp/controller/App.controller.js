sap.ui.define([
    "sap/ui/core/mvc/Controller",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("logaligroup.invoice.controller.App", {
            onChangeLanguage:function(oEvent){

                var selectedItemKey = oEvent.getParameter("selectedItem").getKey();
                sap.ui.getCore().getConfiguration().setLanguage(selectedItemKey);
            }
      
        });
    });