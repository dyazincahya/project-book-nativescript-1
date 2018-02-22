var conf            = require("./conf");

var frameModule     = require('ui/frame');
var dialogsModule   = require('tns-core-modules/ui/dialogs'); 
var timerModule     = require("timer");

var Model       = require("./all-model");
var ClassModel  = new Model([]);

var context, navData;


exports.onLoaded = function(args) {
    var page = args.object;

    context = ClassModel;
    page.bindingContext = context;
};

exports.saveData = function(){
    let data = {
        name            : context.name,
        phone           : context.phone,
        description     : context.description 
    };

    ClassModel.addData(data).then(function(result){
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

exports.backButton = function(){
    frameModule.topmost().goBack(); 
};
