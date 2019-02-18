var app = angular.module("app.todos");
app.factory("svTodos",["$http",function($http){

    return {
        get:function(){
            return $http.get("/api/todos");
        },
        create: function (todoData) {
            return $http.post("/api/todo", todoData);
        },
        update: function (todoData) {
            return $http.put("/api/todo/", todoData);
        },
        delete: function (id) {
            return $http.delete("/api/todo/" + id);
        }
    }

}]);

app.factory("svProject",["$http",function($http){

    return {
        get:function(){
            return $http.get("/api/projects");
        },
        create: function (todoData) {
            return $http.post("/api/project/", todoData);
        },
        update: function ( todoData) {
            return $http.put("/api/project/", todoData);
        },
        delete: function (id) {
            return $http.delete("/api/project/" + id);
        }
    }

}]);

app.factory("svToDos",["$http",function($http){

    return {
        get:function(){
            return $http.get("/api/todos");
        },
        create: function (todoData) {
            return $http.post("/api/todo", todoData);
        },
        update: function ( todoData) {
            return $http.put("/api/todo/", todoData);
        },
        delete: function (id) {
            return $http.delete("/api/todo/" + id);
        }
    }

}]);




