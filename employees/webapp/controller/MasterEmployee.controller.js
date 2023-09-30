sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.JSONModel} JSONModel
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller,JSONModel,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("employees.controller.MasterEmployee", {
            
            onInit: function () {
                this.oEventBus = sap.ui.getCore().getEventBus();


            },

            

            onValidate: function (){
                let oInput = this.getView().byId("inputEmployee"),
                    oSelect = this.getView().byId("country"),
                    sValue = oInput.getValue();

                if (sValue.length === 6){
                    oInput.setDescription("OK");
                    oSelect.setVisible(true);

                }else{
                    oInput.setDescription("NOT OK");
                    oSelect.setVisible(false);

                }

            },

            onFilter : function () {
                
                let oModel = this.getView().getModel("jsonCountries");
                
                let sName = oModel.getProperty("/EmployeeId"),
                    sCountry = oModel.getProperty("/CountryKey");
                   

                    console.log(oModel);  

                let aFilter = [];
                
                if(sName) {
                 
                    aFilter.push(
                        new Filter({
                            filters:[
                                new Filter("FirstName",FilterOperator.Contains,sName),
                                new Filter("LastName",FilterOperator.Contains,sName)
                            ],
                            and : false
                        })
                    ); 
                }

                if(sCountry){
                    aFilter.push(new Filter("Country",FilterOperator.EQ,sCountry ))
                }

                console.log(aFilter);   

                let oTable = this.byId("tableEmployee"),
                    oBinding = oTable.getBinding("items");
                    oBinding.filter(aFilter);

            },

            onClearFilter: function (){
                let oTable = this.byId("tableEmployee"),
                    oBinding = oTable.getBinding("items");
                    oBinding.filter([]);

                    let oModel = this.getView().getModel("jsonCountries");
                        oModel.setProperty("/EmployeeId", ""),
                        oModel.setProperty("/CountryKey", "");
            },

            onShowCity: function(){
                let oModel = this.getView().getModel("jsonConfig");
                    oModel.setProperty("/visibleCity",true)
                    oModel.setProperty("/visibleBtnHideCity",true)
                    oModel.setProperty("/visibleBtnShowCity",false)

            },
            onHideCity: function(){
                let oModel = this.getView().getModel("jsonConfig");
                    oModel.setProperty("/visibleCity",false)
                    oModel.setProperty("/visibleBtnHideCity",false)
                    oModel.setProperty("/visibleBtnShowCity",true)

            },

            onShowPostalCode: function (oEvent){
                let oItem = oEvent.getSource(),
                oBindingContext = oItem.getBindingContext("odataNorthwind"),
                oObject = oBindingContext.getObject(),
                sPostalCode = oBindingContext.getProperty("PostalCode");

                let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

                sap.m.MessageToast.show(oResourceBundle.getText("postalCode",[sPostalCode]));

            },

            onShowOrders : function(oEvent){

                let oHbox = this.byId("ordersTable");
                    oHbox.removeAllItems();


                let oItem = oEvent.getSource(),
                    oBindingContext = oItem.getBindingContext("odataNorthwind"),
                    aOrders = oBindingContext.getProperty("Orders");

                    let aOrdersItems = [];

                    for (let i in aOrders){
                        aOrdersItems.push(
                            new sap.m.ColumnListItem({
                                cells: [
                                    new sap.m.Text({text: aOrders[i].OrderID}),
                                    new sap.m.Text({text: aOrders[i].Freight}),
                                    new sap.m.Text({text: aOrders[i].ShipAddress})
                                ]
                            })
                        );

                    }

                let oNewTable = new sap.m.Table({
                    width : "auto",
                    class: "sapUiSmallMargin",
                    columns: [
                        new sap.m.Column({
                            header: new sap.m.Label({text:"{i18n>orderID}"})
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({text:"{i18n>Freight}"})
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({text:"{i18n>ShipAddress}"})
                        }),
                    ],
                    items: aOrdersItems
                });

                
                    oHbox.addItem(oNewTable);

            },

            showOrders: function (oEvent){
                        let oIcon = oEvent.getSource();
                        let oContext = oIcon.getBindingContext("odataNorthwind");

                        if(!this.oDialogOrders){
                            this.oDialogOrders = sap.ui.xmlfragment("employees.fragment.DialogOrders",this);
                            this.getView().addDependent(this.oDialogOrders);
                        }

                        this.oDialogOrders.bindElement("odataNorthwind>"+oContext);
                        this.oDialogOrders.open();
            
  
            },

            onCloseOrders: function (){
                this.oDialogOrders.close();
            },

            ShowEmployee: function (oEvent){
                let oItem = oEvent.getSource(),
                    oBindingContext = oItem.getBindingContext("odataNorthwind"),
                    sPath = oBindingContext.getPath();

                this.oEventBus.publish("flexible","ShowEmployee",sPath);
            },

            onNavToOrderDetails: function (oEvent) {

                let oSource = oEvent.getSource(),
                    oBindingContext = oSource.getBindingContext("odataNorthwind"),
                    sOrderId = oBindingContext.getProperty("OrderID").toString();

          /*           console.log(oBindingContext.getObject());    
                    console.log(oEvent.getSource());
                    console.log(oEvent.getSource().getBindingContext("odataNorthwind"));  */   

                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                
                oRouter.navTo("RouteOrderDetails",{
                    OrderID : sOrderId
                });
                
                //console.log(oRouter); 

                
            }
        });
    });
