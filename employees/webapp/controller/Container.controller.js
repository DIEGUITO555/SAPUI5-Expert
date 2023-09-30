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
            this.oEventBus.subscribe("incidence","onSaveIncidence", this.onSaveoDataIncidence, this )

            this.oEventBus.subscribe("incidence","onDeleteIncidence", function (sChannelId,sEventId, oBindingContext) {
                let oResourceBundle = this.getView().getModel("i18n").getResourceBundle(),
                    sIncidenceId = oBindingContext.getProperty("IncidenceId"),
                    sSapId = oBindingContext.getProperty("SapId"),
                    sEmployeeId = oBindingContext.getProperty("EmployeeId");

                let sUrl = "/IncidentsSet(IncidenceId='"+sIncidenceId+"',SapId='"+sSapId+"',EmployeeId='"+sEmployeeId+"')"; 
                // console.log(oBindingContext.getObject());   
                // console.log(oBindingContext.getProperty("IncidenceId"));


                 this.getOwnerComponent().getModel("incidence").remove(sUrl,{
                    success: function () {
                        this.onReadDataIncidence.bind(this)(sEmployeeId);
                        sap.m.MessageToast.show(oResourceBundle.getText("odataDeleteOK"));
                    }.bind(this),
                    error: function (){
                        sap.m.MessageToast.show(oResourceBundle.getText("odataDeleteKO"));
                    }
                }) 
            },this );
        },

        onBeforeRendering: function () {
            this._oDetails = this.getView().byId("details");
        },

        _loadCountries : function(){
            let oModel = new JSONModel(),
                oView = this.getView();
                //oResourceBundle = oView.getModel("i18n").getResourceBundle();
               
                

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
                oDetails.bindElement("odataNorthwind>"+sPath);
                this.getView().getModel("layouts").setProperty("/ActiveKey","TwoColumnsMidExpanded");

            let oIncidence = new sap.ui.model.json.JSONModel([]);   
                oDetails.setModel(oIncidence, "incidenceModel");
                oDetails.byId("tableIncidence").removeAllContent();

            let oBindingContext = this._oDetails.getBindingContext("odataNorthwind"),
                iEmployeeId = oBindingContext.getProperty("EmployeeID"),
                sEmployeeId = iEmployeeId.toString();

            this.onReadDataIncidence(sEmployeeId);    
        },

        onSaveoDataIncidence : function (sChannelId,sEventId, oBindingContext){
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            let sEmployeeID = this._oDetails.getBindingContext("odataNorthwind").getProperty("EmployeeID");
            let sSapId = this.getOwnerComponent().SapId;
           
            // 1. Antes de enviar datos a SAP se debe crear un Objeto con  los campos declarados en la base de datos.
            // Los nombres deben ser iguales
            // 2. Llama el modelo de Servicio web y usar el metodo Respectivo

            if (oBindingContext.getProperty("IncidenceId") === undefined){
                let oData = {
                    SapId :          sSapId,
                    EmployeeId :     sEmployeeID.toString(),
                    CreationDate :   oBindingContext.getProperty("CreationDate"),
                    Type :           oBindingContext.getProperty("Type"),
                    Reason:          oBindingContext.getProperty("Reason")
                }

                let sUrl = "/IncidentsSet";
    
                this.getOwnerComponent().getModel("incidence").create(sUrl,oData,{
                    success : function(){
                        this.onReadDataIncidence.bind(this)(sEmployeeID.toString());
                        sap.m.MessageToast.show(oResourceBundle.getText("odataSaveOK"))
                    }.bind(this),
                    error : function (){
                        sap.m.MessageToast.show(oResourceBundle.getText("odataSaveKO"))
                    }
                });
            }else if(oBindingContext.getProperty("CreationDateX") || oBindingContext.getProperty("ReasonX") || oBindingContext.getProperty("TypeX")){
                let oData = {
                    
                    CreationDate :    oBindingContext.getProperty("CreationDate"),
                    CreationDateX :   oBindingContext.getProperty("CreationDateX"),
                    Type :            oBindingContext.getProperty("Type"),
                    TypeX :           oBindingContext.getProperty("TypeX"),
                    Reason:           oBindingContext.getProperty("Reason"),
                    ReasonX:          oBindingContext.getProperty("ReasonX")
                };

                let sIncidenceId = oBindingContext.getProperty("IncidenceId"),
                    sSapId = this.getOwnerComponent().SapId,
                    sEmployeeId = sEmployeeID.toString();


                let sUrl = "/IncidentsSet(IncidenceId='"+sIncidenceId+"',SapId='"+sSapId+"',EmployeeId='"+sEmployeeId+"')";

                this.getOwnerComponent().getModel("incidence").update(sUrl, oData, {
                    success : function(){
                        this.onReadDataIncidence.bind(this)(sEmployeeID.toString());
                        sap.m.MessageToast.show(oResourceBundle.getText("odataUpdateOK"))
                    }.bind(this),
                    error : function(){
                        sap.m.MessageToast.show(oResourceBundle.getText("odataUpdateKO"))
                    }
                })

            }

         
        },

        onReadDataIncidence: function (sEmployeeId){

            let sUrl = "/IncidentsSet";
            let sSapId = this.getOwnerComponent().SapId;

            this.getOwnerComponent().getModel("incidence").read(sUrl,{
                filters:[
                    new sap.ui.model.Filter("SapId","EQ",sSapId),
                    new sap.ui.model.Filter("EmployeeId","EQ",sEmployeeId)
                ],
                success: function(data){
                    let oIncidenceModel = this._oDetails.getModel("incidenceModel");
                        oIncidenceModel.setData(data.results);
                    let oTableIncidence = this._oDetails.byId("tableIncidence");
                        oTableIncidence.removeAllContent();

                     for (var incidence in data.results){
                        let oNewIncidence = sap.ui.xmlfragment("employees.fragment.NewIncidence",this._oDetails.getController());
                            this._oDetails.addDependent(oNewIncidence);
                            oNewIncidence.bindElement("incidenceModel>/"+incidence);
                            oTableIncidence.addContent(oNewIncidence);
                     }   
                }.bind(this),
                error: function (e){
                    console.log(e);
                }
            })
        },



    });
});