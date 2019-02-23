
var app = angular.module("app.todos", ["xeditable",'ui.bootstrap','appRoutes']);
          angular.module('appRoutes', ['ngRoute']);     

app.controller("todoController", ['$scope', 'svTodos', function ($scope, svTodos) {
   
    $scope.appName = 444;
    $scope.formData = {};
    $scope.loading = true;
  


    $scope.todos = [];

    //load data from api
    svTodos.get().then(function successCallback(data) {
        //console.log(data);
        $scope.todos = data.data;
        $scope.loading = false;
    }, function errorCallback(error) {
        //error code
        $scope.todos = error;
    });



    $scope.createTodo = function () {
        $scope.loading = true;
        //console.log($scope.formData)
        var todo = {

            text: $scope.formData.text,
            isDone: false
        }
        svTodos.create(todo).then(function (data) {
            $scope.todos = data.data;
            $scope.formData.text = "";
            $scope.loading = false;
        })
        //$scope.todos.push(todo);
        // $scope.formData.text = "";
    }

    $scope.updateTodo = function (todo) {
        console.log("update todo: ", todo);
        $scope.loading = true;

        svTodos.update(todo).then(function (data) {
            $scope.todos = data.data;
            $scope.loading = false;
        })
    }

    $scope.deleteTodo = function (todo) {
        console.log("delete todo: ", todo);
        $scope.loading = true;
        svTodos.delete(todo._id).then(function (data) {
            $scope.todos = data.data;
            $scope.loading = false;

        })
    }
}])
//////////////////////////////
//test cho project

app.controller("projectController", ['$scope', 'svProject', function ($scope, svTodos) {
    $scope.appName = "Work Day Organizer -";
    $scope.formData = {};
    $scope.loading = true;
    $scope.pageSize = 1;
    $scope.currentPage = 1;
    $scope.todos = [];

    //load data from api
    svTodos.get().then(function successCallback(data) {
        //console.log(data);
        $scope.todos = data.data;
        $scope.loading = false;
    }, function errorCallback(error) {
        //error code
        $scope.todos = error;
    });



    $scope.createTodo = function () {
        $scope.loading = true;
        //lấy ra ngay thang nam hien tai
        var date = new Date();
        //console.log(date.toString())

        var todo = {
            name: $scope.formData.text,
            timeCreate: date.toString(),
            describe: $scope.formMoTa.text,
            _idCreator: "chua co"
        }
        svTodos.create(todo).then(function (data) {
            $scope.todos = data.data;
            $scope.formData.text = "";
            $scope.loading = false;
        })
        // $scope.todos.push(todo);
        // $scope.formData.text = "";
    }

    $scope.updateTodo = function (todo) {
        console.log("update todo: ", todo);
        $scope.loading = true;

        svTodos.update(todo).then(function (data) {
            $scope.todos = data.data;
            $scope.loading = false;
        })
    }
    $scope.deleteTodo = function (todo) {
        //$scope.post.comment.splice(todo,1)
        console.log("delete todo: ", todo);
        $scope.loading = true;
        //hộp thoại xóa
        var retVal = confirm("Bạn có muốn xóa hay không ?");
        if (retVal == true) {
            svTodos.delete(todo._id).then(function (data) {
                $scope.todos = data.data;
                
            })
            alert('xóa thành công');
        }
        $scope.loading = false;
    }
}]).filter('pagination', function() {
    return function(data, start) {
        return data.slice(start);
    };
});
;

////
app.controller("toDosController", ['$scope', 'svToDos', function ($scope, svTodos) {
    $scope.appName = "Work Day Organizer -";
    $scope.formData = {};
    $scope.loading = true;

    $scope.todos = [];

    //load data from api
    svTodos.get().then(function successCallback(data) {
        //console.log(data);
        $scope.todos = data.data;
        $scope.loading = false;
    }, function errorCallback(error) {
        //error code
        $scope.todos = error;
    });



    $scope.createTodo = function () {
        $scope.loading = true;

        var todo = {

            TodoName: $scope.formTodoName.text,
            _idReviewer: $scope.form_idReviewer.text,
            Priority: $scope.formPriority.text,
            timeStart: $scope.formTimeStart.text,
            timeFinish: $scope.formTimeFinish.text,
            Progress: $scope.formProgress.text,
            comment: $scope.formComment.text,
            _idProject: $scope.form_idProject.text,
            _idMemberJoin: $scope.form_idMemberJoin,
            status: 0
        }
        svTodos.create(todo).then(function (data) {
            $scope.todos = data.data;
            $scope.formTodoName.text = "";
            $scope.form_idReviewer.text = "",
                $scope.formPriority.text = "",
                $scope.formTimeStart.text = "",
                $scope.formTimeFinish.text = "",
                $scope.formProgress.text = "",
                $scope.formComment.text = "",
                $scope.form_idMemberJoin = "",
                $scope.form_idProject = ""
        })
        // $scope.todos.push(todo);
        // $scope.formData.text = "";
    }

    $scope.updateTodo = function (todo) {
        console.log("update todo: ", todo);
        $scope.loading = true;

        svTodos.update(todo).then(function (data) {
            $scope.todos = data.data;
            $scope.loading = false;
        })
    }
    $scope.deleteTodo = function (todo) {
        console.log("delete todo: ", todo);
        $scope.loading = true;
        svTodos.delete(todo._id).then(function (data) {
            $scope.todos = data.data;
            $scope.loading = false;

        })
    }
}]);