sap.ui.define([

], function() {
    
    let oInvoicesFormatter = {

        invoicesStatus2 : function (sStatus)
        {
            console.log("Entre en el formateador");
            console.log(sStatus);
            const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            switch(sStatus){
                case 'A' : return oResourceBundle.getText("invoicesStatusA");
                case 'B' : return oResourceBundle.getText("invoicesStatusB");
                case 'C' : return oResourceBundle.getText("invoicesStatusC");
                default: return sStatus;
    
            }
        }

    }

    return oInvoicesFormatter;
    
});