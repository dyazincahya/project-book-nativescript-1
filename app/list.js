var conf        = require("./conf");

var frameModule = require('ui/frame'); 
var timerModule = require("timer");

var Model       = require("./all-model");
var ClassModel  = new Model([]);

var context;

function getList()
{
    ClassModel.empty();
    ClassModel.getList().then(function(result){
        context.set("items", result.data);
    }); 
}

exports.onLoaded = function(args) {
    var page = args.object;

    context = ClassModel;

    timerModule.setTimeout(function(){
        getList();
    }, conf.timeloader);
    
    page.bindingContext = context;
};

exports.addContact = function(args) {
    timerModule.setTimeout(function(){
        let navOption = {
            moduleName: "add",
            animated: true,
            transition: {
                duration: conf.transduration,
                curve: conf.curve
            }
        };
        frameModule.topmost().navigate(navOption);
    }, conf.timeloader);
}

exports.editContact = function(args) {
    timerModule.setTimeout(function(){
        let selected = args.view.bindingContext;
        let navOption = {
            moduleName: "edit",
            context: { data: selected },
            animated: true,
            transition: {
                duration: conf.transduration,
                curve: conf.curve
            }
        };
        frameModule.topmost().navigate(navOption);
    }, conf.timeloader);
}
