let Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUEL_THAN: 0
}

function defaultFn(a, b){
  if(a > b) {
    return Compare.BIGGER_THAN
  } else if (a < b) {
    return Compare.LESS_THAN
  } else {
    return Compare.EQUEL_THAN
  }
}

//数组元素交换
function swap(arr, i, j){
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

//随机算法
function shuffle(arr){
  let {length} = arr;
  for (let i = length - 1; i > 0; i--){
    let randomIndex = Math.floor(Math.random() * (i + 1));
    swap(arr, i, randomIndex)
  }
  return arr
}

//生成随机数组
function getShuffleArray(length = 1000){
  let origin = []
  for(let i = 0; i < length; i++) {
    origin.push(i)
  }
  let arr = shuffle(origin)
  // console.log('origin', arr);
  return arr
}

//显示格式
function sortInfo( name = 'sort', fn, length){
  let arr = getShuffleArray(length)
  let timeStart = new Date();
  let sortedArr = fn(arr)
  let timeEnd = new Date();
  console.log(name, 'result: ', sortedArr, ', timeUse(ms):', timeEnd - timeStart);
}

//冒泡算法(双层循环)
function bubbleSort(arr, compareFn = defaultFn) {
  let {length} = arr;
  for (let i = 0; i < length - 1; i++) {
    for(let j = 0; j < length - i - 1; j++){
      if(compareFn(arr[j], arr[j + 1]) === Compare.BIGGER_THAN) {
        swap(arr, j, j+1)
      }
    }
  } 
  return arr
}

//选择算法(每次找出最大值，然后交换)
function selectionSort(arr, compareFn = defaultFn) {
  let {length} = arr;
  for(let i = 0; i < length - 1; i++) {
    let maxIndex = 0;
    for(let j = 0; j < length - i; j++) {
      if(compareFn(arr[j], arr[maxIndex]) === Compare.BIGGER_THAN){
        maxIndex = j
      }
    }
    if(maxIndex !== length - i - 1){
      swap(arr, maxIndex, length - i - 1)
    }
  }
  return arr
}

// 插入算法(假设第一项排好序，第二项应该插入哪里，后面项跟前面排好序的从后往前比较，后面的小的话就交换位置)
function insertionSort(arr, compareFn = defaultFn){
  let {length} = arr
  for(let i = 1; i < length; i++ ){
    let j = i;
    let temp = arr[j]
    while(compareFn(temp, arr[j-1]) === Compare.LESS_THAN && j > 0){
      // swap(arr, j, j - 1)
      arr[j] = arr[j-1]
      j--
    }
    arr[j] = temp
  }
  return arr
}

// sortInfo('bubbleSort', bubbleSort, 100000) //24824
// sortInfo('selectionSort', selectionSort, 100000) //6337
sortInfo('insertionSort', insertionSort, 100000) //30948