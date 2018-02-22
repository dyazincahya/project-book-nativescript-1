var conf                    = require("./conf");

var ObservableArrayModule   = require("data/observable-array").ObservableArray;
var httpModule              = require("http");

function MyModel(items)
{
    var viewModel = new ObservableArrayModule(items);

    viewModel.getList = function()
    {
        return httpModule.request({
            url: conf.domain + '?action=list',
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            let result = response.content.toJSON();
            return result;
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };

    viewModel.addData = function(data)
    {
        return httpModule.request({
            url: conf.domain + '?action=add',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(function (response) {
            return response.content.toJSON();
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };

    viewModel.editData = function(data)
    {
        return httpModule.request({
            url: conf.domain + '?action=edit',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(function (response) {
            return response.content.toJSON();
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };

    viewModel.deleteData = function(data)
    {
        return httpModule.request({
            url: conf.domain + '?action=delete',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(function (response) {
            return response.content.toJSON();
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };

    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    return viewModel;
}

module.exports = MyModel;