var CharacterSheet = angular.module('CharacterSheet', []);

CharacterSheet.directive('contenteditable', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      // view -> model
      element.bind('blur', function() {
        scope.$apply(function() {
          ctrl.$setViewValue(element.html());
        });
      });

      // model -> view
      ctrl.$render = function() {
        element.html(ctrl.$viewValue);
      };

      // load init value from DOM
      ctrl.$render();
    }
  };
});

CharacterSheet.controller('CharacterController', function ($scope,$http) {
    $http.get('/character/342').success(function(data) {
            $scope.character = data;
            $scope.character.totalweight = $scope.getTotalWeight();
            console.log($scope.character);
    });
    
    $scope.setAttr = function (attrName) {
        $scope.character.characterAbility[attrName].characterAbility__ability_modifier = Math.floor(($scope.character.characterAbility[attrName].characterAbility__ability_score - 10)/2);
    };
    
    $scope.setWeight = function (item) {
        $scope.character.totalweight = $scope.getTotalWeight();
    };
        
    $scope.getTotalWeight = function() {
        var totalweight = 0;
        for (var item in $scope.character.gear){
            totalweight += parseFloat($scope.character.gear[item].gear__weight);
        }
        return totalweight;
    };
});

