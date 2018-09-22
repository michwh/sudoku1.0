# sudoku1.0
这次版本存在瑕疵，给用户填写的数独有不唯一解的可能，这将会在以后改进

## [demo](https://michwh.github.io/sudoku1.0/index.html)

1.界面展示
======
![](https://github.com/michwh/sudoku1.0/blob/master/images/1.jpg)
![](https://github.com/michwh/sudoku1.0/blob/master/images/2.jpg)
2.实现方法
======
2.1生成数独
-------
### (1)定义并初始化数组sudoku
```
var sudoku=[
     [0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0],
  ]; 
  ```
### (2)执行generateSudoku()函数
```
function generateSudoku(){
    for(var i=1;i<10;i++){
      for(var j=0;j<9;j++){

      //把数字i填入第j个小九宫格中
        fillNumberInOneArray(i,j);
      }
    }
}
```
### (3)fillNumberInOneArray(num,n)
 ①执行collectNumPosition(num,n)<br>
        收集数字num在第n个九宫格上可以填入的位置<br>
②执行flashBack(num,n)<br>
        当数字num在第n个小九宫格上没有可以填入的位置时执行<br>
### (4)collectNumPosition(num,n)
 ①判断num在该行是否已填过<br>
  ②判断num在该列上是否已填过<br>
  ③判断该位置上是否有其他数字<br>
 ④存入数组numPosition中<br>
 
 ### (4)flashBack(num,n)
 ①依次提取数组numPosition中的元素<br>
  ②将导致程序无法进行的元素删除，直到找到合适的位置<br>
 
 2.2生成界面
 --------
  根据用户选择的难度系数来决定要挖掉的格子数blank<br>
 随机生成blank个位置<br>
 在页面上渲染出除这bank个位置外，其他位置上的数字<br>

2.3显示答案
--------
  将用户填入的数字存到数组userAnswer中<br>
  将userAnswer与sudoku进行对比<br>
 相同的显示为蓝色，不同的保留错误答案，并以红色显示<br>





 

