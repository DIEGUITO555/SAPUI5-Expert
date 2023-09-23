sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",

],function (Controller,JSONModel) {
    "use strict";

    return Controller.extend("employees.controller.Container", {

        onInit : function (){

            this._loadCountries();
            this._loadEmployees();
            this._loadConfig();
            this.oEventBus = sap.ui.getCore().getEventBus();
            this.oEventBus.subscribe("flexible","ShowEmployee",this.showEmployeeDetails, this);
        },

        _loadCountries : function(){
            let oModel = new JSONModel(),
                oView = this.getView(),
                oResourceBundle = oView.getModel("i18n").getResourceBundle();
               
                

   /*          let oData = {
                employeeId : "123456",
                countryKey : "UK",
                listCountry :[
                    {
                        "Key":"US",
                        "text": oResourceBundle.getText("countryUS")
                    },
                    {
                        "Key":"UK",
                        "text": oResourceBundle.getText("countryUK")
                    },
                    {
                        "Key":"ES",
                        "text": oResourceBundle.getText("countryES")
                    },
                ]
            } 
             
            let oModel2 = new JSONModel(oData);
           
            oModel.setData(oData);*/
            oModel.loadData("../model/Countries.json");
            oView.setModel(oModel,"jsonCountries");
            
          

        },

        _loadEmployees : function(){

            let oModel = new JSONModel(),
                oView = this.getView();
               
            oModel.loadData("../model/Employees.json");
            oView.setModel(oModel,"jsonEmployees");

        },

        _loadConfig : function(){

            let oModel = new JSONModel(),
                oView = this.getView();
               
            oModel.loadData("../model/config.json");
            oView.setModel(oModel,"jsonConfig");

        },

        _loadLayouts : function (){
            let oModel = new JSONModel(),
                oView = this.getView();
               
            oModel.loadData("../model/Layouts.json");
            oView.setModel(oModel,"jsonLayout");
        },

        showEmployeeDetails: function(sChannel,SNameEvent,sPath){
            let oDetails = this.getView().byId("details");
                oDetails.bindElement("jsonEmployees>"+sPath);
                this.getView().getModel("layouts").setProperty("/ActiveKey","TwoColumnsMidExpanded");

            let oIncidence = new sap.ui.model.json.JSONModel([]);   
                oDetails.setModel(oIncidence, "incidenceModel");
                oDetails.byId("tableIncidence").removeAllContent();
        }

    });
});