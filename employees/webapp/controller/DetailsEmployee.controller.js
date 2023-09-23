sap.ui.define([
    "sap/ui/core/mvc/Controller"

],function (Controller) {
    "use strict";

    return Controller.extend("employees.controller.DetailsEmployee", {

        onInit : function (){
            
        },

        onCreateIncidence: function (){
            let oTableIncidence = this.getView().byId("tableIncidence");
            let oNewIncidence = sap.ui.xmlfragment("employees.fragment.NewIncidence",this);
            let oIncidenceModel = this.getView().getModel("incidenceModel");
            let aData = oIncidenceModel.getData();
            let iIndex = aData.length;
                aData.push({index: iIndex + 1});
                oIncidenceModel.refresh();
                oNewIncidence.bindElement("incidenceModel>/"+iIndex);
                oTableIncidence.addContent(oNewIncidence);
    
        }

    });
});