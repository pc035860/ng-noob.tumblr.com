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
