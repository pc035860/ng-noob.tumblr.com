var taskIds = [1, 2, 3, 4, 5];

angular.forEach(taskIds, function (taskId) {

  // 以 $http 為例
  $http.get('/someUrl', {params: {taskId: taskId}});

});

console.log('工作順利完成！')


$http.get('/someUrl', {params: {taskId: 1}})
.then(function () {
  return $http.get('/someUrl', {params: {taskId: 2}});
})
.then(function () {
  return $http.get('/someUrl', {params: {taskId: 3}});
})
.then(function () {
  return $http.get('/someUrl', {params: {taskId: 4}});
})
.then(function () {
  return $http.get('/someUrl', {params: {taskId: 5}});
})
.then(function () {
  console.log('工作順利完成！');
});


<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js"></script>
<script src="http://pc035860.github.io/ngQueue/ngQueue.min.js"></script>


angular.module('myApp', ['ngQueue']);


// 建立同時執行兩件工作的 queue
var queue = $queueFactory(2);


queue.enqueue(function (inA, inB, inC) {

  console.log(this);  // {name: "context"}

  console.log(inA, inB, inC);  // hello world !

  doSomething();

// 傳入 context 以及 arguments
}, {name: 'context'}, ['hello', 'world', '!']);


// $timeout delay
queue.enqueue(function () {
  var dfd = $q.defer();

  $timeout(function () {
    dfd.resolve();
    // or dfd.reject()
  }, 100);

  return dfd.promise;
});

// $http request
queue.enqueue(function () {

  return $http.get('/some/api/call')
    .success(function () {
      // do something if success
    })
    .error(function () {
      // do something if error
    });

});


var queue = $queueFactory(1),
    taskIds = [1, 2, 3, 4, 5];

angular.forEach(taskIds, function (taskId) {

  // enqueue with argument: taskId
  queue.enqueue(function (taskId) {

    // returns $http promise
    return $http.get('/someUrl', {params: {taskId: taskId}});

  }, null, [taskId]);

});

queue.enqueue(function () {
  // all tasks finished
  console.log('工作順利完成！')
});