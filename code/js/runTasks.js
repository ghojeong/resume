/**
 * 비동기 함수들의 Array 인 tasks 를 실행시켜 주는 runTasks 함수를 작성
 * 자바스크립트에서 비동기를 처리하는 다양한 테크닉을 느껴볼 수 있다.
 */

// Promise와 async/await를 쓰지 않고 구현
function runTasks1(seed, tasks, callback) {
  return tasks.reduce(
    (accCallback, currentTask) => acc => currentTask(acc, accCallback),
    callback
  )(seed);
}

// Promise를 사용해서 구현
function runTasks2(seed, tasks) {
  return tasks.reduce(
    (accPromise, currentTask) => accPromise.then(acc => currentTask(acc)),
    Promise.resolve(seed)
  );
}

// async/await를 써서 구현
async function runTasks3(seed, tasks) {
  // throw new Error("not implemented");
  let acc = seed;
  for (const currentTask of tasks) {
    acc = await currentTask(acc);
  }
  return acc;
}

function assert(assertion) {
  if (!assertion) {
    throw new Error("WrongAnswer");
  }
}

function randInt(n) {
  return Math.floor(Math.random() * n);
}

function test1(runTasks) {
  const n = 100;
  const tasks = [];
  let expectedAnswer = 0;
  for (let i = 0; i < n; i++) {
    tasks.push((acc, callback) => {
      const k = randInt(10000);
      expectedAnswer += k;
      setTimeout(() => {
        callback(acc + k);
      }, 5);
    });
  }
  runTasks(0, tasks, actualAnswer => {
    assert(expectedAnswer === actualAnswer);
    console.log("CorrectAnswer");
  });
}

function test2(runTasks) {
  const n = 100;
  const tasks = [];
  let expectedAnswer = 0;
  for (let i = 0; i < n; i++) {
    tasks.push((acc, callback) => {
      const k = randInt(10000);
      expectedAnswer -= k;
      setTimeout(() => {
        callback(acc - k);
      }, 5);
    });
  }
  runTasks(0, tasks, actualAnswer => {
    assert(expectedAnswer === actualAnswer);
    console.log("CorrectAnswer");
  });
}

function test3(runTasks) {
  const n = 100;
  const tasks = [];
  let expectedAnswer = 0;
  for (let i = 0; i < n; ++i) {
    const k = randInt(10000);
    expectedAnswer += k;
    tasks.push(acc => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(acc + k);
        }, 5);
      });
    });
  }
  runTasks(0, tasks).then(actualAnswer => {
    assert(expectedAnswer === actualAnswer);
    console.log("CorrectAnswer");
  });
}

// CorrectAnswer이 네 번 출력돼야 함
test1(runTasks1);
test2(runTasks1);
test3(runTasks2);
test3(runTasks3);
