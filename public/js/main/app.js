var app = angular.module("app.todos", ["xeditable"]);

app.controller("todoController", ['$scope', 'svTodos', function ($scope, svTodos) {
    $scope.appName = "Work Day Organizer -";
    $scope.formData = {};
    $scope.loading=true;

    $scope.todos= [];

    //load data from api
    svTodos.get().then(function successCallback(data) {
        //console.log(data);
        $scope.todos = data.data;
        $scope.loading=false;
     }, function errorCallback(error){
        //error code
        $scope.todos = error;
    });

    //  $scope.todos=[
    //     {
    //         text:"create angularjs app1",
    //         isDone:true
    //     },
    //     {
    //         text:"create angularjs app2",
    //         isDone:true
    //     },
    //     {
    //         text:"create angularjs app3",
    //         isDone:false
    //     },
    //     {
    //         text:"create angularjs app4 ",
    //         isDone:false
    //     }
    // ];

    $scope.createTodo = function () {
        $scope.loading=true;
        var todo = {
            text: $scope.formData.text,
            isDone: false
        }
        svTodos.create(todo).then(function(data){
            $scope.todos=data.data;
            $scope.formData.text="";
            $scope.loading=false;
        })
        // $scope.todos.push(todo);
        // $scope.formData.text = "";
    }

    $scope.updateTodo = function (todo) {
        console.log("update todo: ",todo);
        $scope.loading=true;        

        svTodos.update(todo).then(function(data){
            $scope.todos=data.data;
            $scope.loading=false;
        })
    }
    $scope.deleteTodo =function(todo){
        console.log("delete todo: ",todo);
        $scope.loading=true;
        svTodos.delete(todo._id).then(function(data){
            $scope.todos=data.data;
            $scope.loading=false;
            
        })
    }
}]);

//test cho project

app.controller("projectController", ['$scope', 'svProject', function ($scope, svTodos) {
    $scope.appName = "Work Day Organizer -";
    $scope.formData = {};
    $scope.loading=true;

    $scope.todos= [];

    //load data from api
    svTodos.get().then(function successCallback(data) {
        //console.log(data);
        $scope.todos = data.data;
        $scope.loading=false;
     }, function errorCallback(error){
        //error code
        $scope.todos = error;
    });

    

    $scope.createTodo = function () {
        $scope.loading=true;
        var todo = {
            text: $scope.formData.text,
            isDone: false
        }
        svTodos.create(todo).then(function(data){
            $scope.todos=data.data;
            $scope.formData.text="";
            $scope.loading=false;
        })
        // $scope.todos.push(todo);
        // $scope.formData.text = "";
    }

    $scope.updateTodo = function (todo) {
        console.log("update todo: ",todo);
        $scope.loading=true;        

        svTodos.update(todo).then(function(data){
            $scope.todos=data.data;
            $scope.loading=false;
        })
    }
    $scope.deleteTodo =function(todo){
        console.log("delete todo: ",todo);
        $scope.loading=true;
        svTodos.delete(todo._id).then(function(data){
            $scope.todos=data.data;
            $scope.loading=false;
            
        })
    }
}]);
