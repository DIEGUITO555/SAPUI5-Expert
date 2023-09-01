/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "logaligroup/invoice/model/models",
        "logaligroup/invoice/controller/HelloDialog"
    ],
    function (UIComponent, Device, models,HelloDialog) {
        "use strict";

        return UIComponent.extend("logaligroup.invoice.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                this.setModel(models.createRecipient(), "model");

                this._helloDialog = new HelloDialog(this.getRootControl()); //Esta funcion "getRootControl" regresa la instancia donde se llama
            },

            exit : function (){                    //Esta funcion destuye las instancias que son Manejadas
                this._helloDialog.destroy(); 
                delete this._helloDialog;
            },

            openHelloDialog : function (){
                this._helloDialog.open();
            }
        });
    }
);