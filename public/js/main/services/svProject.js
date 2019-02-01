var app = angular.module("app.todos");
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


