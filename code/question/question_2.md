# 상태 관리

아래 이야기 주제에 흥미롭다면, 같이 이야기했으면 좋겠습니다.

https://github.com/deminoth/redux/blob/8408d9e92889ac07e5fd14f937e56cb189010cf9/docs/faq/OrganizingState.md#do-i-have-to-put-all-my-state-into-redux-should-i-ever-use-reacts-setstate

##### 1. Flux 아키텍처를 도입할 때, store(global state)가 아닌 local state를 활용해야 하는 경우가 있는가?

- local state를 활용해야만 하는 경우가 있다면 언제인가?
- local state를 허용하기로 했다면 어디까지 허용해야 하는가?

##### 2. 웹과 앱에서 동일한 기능을 제공할 때, 상태관리 정책(state policy)을 동일하게 해야 하는가?

- 동일하게 해야 한다면 혹은 동일하지 않아야 한다면 그 이유는 무엇인가?
- 동일하지 않게 해야 한다면, 어떻게 달라야 하는가?

## 재미있는 이야기

옛날 옛적에 jQuery 를 사용하던 개발자들이 있었습니다. 그들은 hidden.value, input.value, window global 객체에 마음대로 뿌려져있던 상태값들 때문에 도대체 어떤 값을 읽어야 하는지 몰라서 매일 버그를 만들어 내곤 했습니다.

그러던 어느날 AngularJS 가 등장했습니다. 개발자들은 더이상 hidden.value, input.value 를 신경쓸 필요 없이 $scope 만 잘 관리하면 된다는 생각에 열광했습니다. 하지만 그들은 프로젝트 규모가 커질수록 저마다 자신만의 $scope 에 값을 저장하기 시작했고 여러 \$scope 에 동일한 값이 필요한 경우 이를 동기화 시키는데 문제가 있다는 것을 깨닫기 시작했습니다.

이때 Flux 아키텍쳐가 등장했고 Flux 아키텍쳐를 구현한 Redux 가 나오면서 개발자들은 Redux 를 칭송하기 시작했습니다. 모든 상태값은 single store 로 관리되기 때문에 컴포턴트에서는 store 값을 읽으면 그게 최신값이라는게 보장되므로 동기화 문제가 사라졌기 때문이죠.

시간이 흘러 Facebook 에서 React hook 이라는 개념을 내어 놓았고 뉴비들은 Redux 와 React hook 을 이용해 개발을 하기 시작했습니다. 올드비는 코드 리뷰를 하다가 뉴비들의 코드가 마치 AngularJS 시절로 돌아간것 같은 느낌을 받게 됩니다. 어떤 값들은 Redux 로 관리되고 어떤 값들은 컴포턴트에 state 로 흩어져 있었습니다.
올드비는 생각합니다. 본인이 React hook 을 잘 몰라서 그런걸까… 저들이 잘못된 방향으로 가고 있는 것일까…
