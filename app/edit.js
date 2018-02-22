var conf            = require("./conf");

var frameModule     = require('ui/frame');
var dialogsModule   = require('tns-core-modules/ui/dialogs'); 
var timerModule     = require("timer");

var Model       = require("./all-model");
var ClassModel  = new Model([]);

var context, navData;


exports.onLoaded = function(args) {
    var page = args.object;

    navData = page.navigationContext.data;
    context = ClassModel;

    context.set('name', navData.name);
    context.set('phone', navData.phone);
    context.set('description', navData.description);

    page.bindingContext = context;
};

exports.saveChange = function(){
    let data = {
        id              : navData.id,
        name            : context.name,
        phone           : context.phone,
        description     : context.description 
    };

    ClassModel.editData(data).then(function(result){
        if(result.success)
        {
            dialogsModule.alert({
                title: "Success",
                message: result.message,
                okButtonText: "OK"
            });
            frameModule.topmost().goBack();
        }
        else
        {
            dialogsModule.alert({
                title: "Alert",
                message: "Error occurred!",
                okButtonText: "OK"
            });
        }     
    });
}

exports.deleteData = function(){
    dialogsModule.confirm("Are you sure want delete this data?").then(function (result) {
        if(result)
        {
            let data = {
                id  : navData.id 
            };

            ClassModel.deleteData(data).then(function(result){
                if(result.success)
                {
                    dialogsModule.alert({
                        title: "Success",
                        message: result.message,
                        okButtonText: "OK"
                    });
                    frameModule.topmost().goBack();
                }
                else
                {
                    dialogsModule.alert({
                        title: "Alert",
                        message: "Error occurred!",
                        okButtonText: "OK"
                    });
                }     
            });
        }
    });
}

exports.backButton = function(){
    frameModule.topmost().goBack(); 
};
