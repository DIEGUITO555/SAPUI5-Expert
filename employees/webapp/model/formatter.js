sap.ui.define([

], function () {
    "use strict";

    let oFormatter = {
        dateFormat: function (date){
            const iTimeDay = 24 * 60 * 60 * 1000 ;
            if (date){

                
                let oDateNow = new Date();
                let oDateFormatOnlyDate = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: "yyyy/MM/dd"
                });

                let oDateNowFormat = new Date(oDateFormatOnlyDate.format(oDateNow));
                let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

                switch(true){
                    case date.getTime() === oDateNowFormat.getTime():
                        return oResourceBundle.getText("today");
                    case date.getTime() === oDateNowFormat.getTime() + iTimeDay:
                        return oResourceBundle.getText("tomorrow");
                    case date.getTime() === oDateNowFormat.getTime() - iTimeDay:
                        return oResourceBundle.getText("yesterday");
                    default : return "";
                }
            }
        }
    };

    return oFormatter;

});        