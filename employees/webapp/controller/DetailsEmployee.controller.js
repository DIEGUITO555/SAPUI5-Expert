sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "employees/model/formatter"

],function (Controller,formatter) {
    "use strict";

    return Controller.extend("employees.controller.DetailsEmployee", {

        formatter: formatter,

        onInit : function (){
            this._oEventBus = sap.ui.getCore().getEventBus();
            
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
    
        },

        onSaveIncidence : function (oEvent) {
            let oButton = oEvent.getSource(),
                oToolbar = oButton.getParent(),
                oPanel = oToolbar.getParent(),
                oBindingContext = oPanel.getBindingContext("incidenceModel");
              
                this._oEventBus.publish("incidence","onSaveIncidence", oBindingContext)
        },

        updateIncidenceCreationDate: function (oEvent){
            let oBindingContext = oEvent.getSource().getBindingContext("incidenceModel").getObject();
                oBindingContext.CreationDateX = true;
        },  

        updateIncidenceReason: function (oEvent){
            let oBindingContext = oEvent.getSource().getBindingContext("incidenceModel").getObject();
                oBindingContext.ReasonX = true;

        },

        updateIncidenceType: function (oEvent){
            let oBindingContext = oEvent.getSource().getBindingContext("incidenceModel").getObject();
                oBindingContext.TypeX = true;

        },

        onDeleteIncidence : function (oEvent){
            let oBindingContext = oEvent.getSource().getBindingContext("incidenceModel");

            this._oEventBus.publish("incidence","onDeleteIncidence",oBindingContext);
        }


    });
});