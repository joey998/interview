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
  console.log(`---------------${name + ' start'}-------------------------`,
    `\nlength: ${length}, timeUse(ms):`, timeEnd - timeStart, '\nresult:\n前20位', sortedArr.slice(0, 20).toString(), "\n后20位", sortedArr.slice(length-20).toString(),
    `\n---------------------${name + ' end'}-------------------------`
    );
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

// 归并算法（将一个大数组分割为左右两个数组，然后将左右两个数组接着再分，直到分得只有一个元素，然后在排序小数组成大数组）

//分割
function mergeSort(arr, compareFn = defaultFn) {
  if(arr.length > 1){
    let {length} = arr;
    let middle = Math.floor(length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);
    left = mergeSort(left, compareFn = defaultFn)
    right = mergeSort(right, compareFn = defaultFn)
    arr = merge(left, right, compareFn)
  }
  return arr
}
//合并
function merge(left, right, compareFn){
  let result = []
  let i = 0, j = 0;
  while(i < left.length && j < right.length) {
    if(left[i] < right[j]){
      result.push(left[i])
      i++
    } else {
      result.push(right[j])
      j++
    } 
  }
  return result.concat(i === left.length ? right.slice(j) : left.slice(i))
}


/* 快速排序
  1. 指定主元，一般为left和right的中间值
  2. 左指针向右移动，直到碰到值大于或者等于主元的值
  3. 右指针向左移动，直到碰到值小于或者等于主元的值
  4. 交换指针所指的两个值
  5. 重复2，3步，直到左指针索引大于右指针。
  （此时，在左指针左边的所有值都小于或者等于主元，左指针右边的所有值都大于或者等于主元）
  6. 左右两边的子数组继续执行123456步骤。
*/
function quickSort(arr, compareFn = defaultFn) {
  return quick(arr, 0, arr.length - 1, compareFn)
}

function quick(arr, left, right, compareFn){
  if(arr.length > 1) {
    let index = partition(arr, left, right, compareFn);
    if(index - 1 > left){
      quick(arr, left, index - 1, compareFn)
    }
    if(index < right){
      quick(arr, index, right, compareFn)
    }
  }
  return arr
}

function partition(arr, left, right, compareFn){
  let i = left, j = right;
  let middleIndex = Math.floor((left + right) / 2)
  // if(right > left) {  //这里不需要是因为上面的quick已经判断了，left肯定是小于right的
    while(i <= j){
      while(compareFn(arr[i], arr[middleIndex]) === Compare.LESS_THAN) {
        i++
      }
      while(compareFn(arr[j], arr[middleIndex]) === Compare.BIGGER_THAN) {
        j--;
      }
      if(i <= j){
        swap(arr, i, j)
        i++;
        j--;
      }
    }
  // }
  return i
}

// sortInfo('bubbleSort', bubbleSort, 100000) //24824(4800u)  
// sortInfo('selectionSort', selectionSort, 100000) //6337(4800u)  7816(i5-8500)
// sortInfo('insertionSort', insertionSort, 100000) //30948(4800u)  31605(i5-8500)
// sortInfo('mergeSort', mergeSort, 100000) //  54(i5-8500)  
sortInfo('quickSort', quickSort, 100000) //  31(i5-8500)  