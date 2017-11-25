# sudoku1.0
这次版本存在瑕疵，给用户填写的数独有不唯一解的可能，这将会在以后改进
1.	需求分析
      

（1）开始游戏：开始游戏
（2）暂停游戏：暂停计时
（3）难度系数选择：分为初级、中级、高级，根据用户选择不同的难度系数来决定要挖去的格子数
（4）显示答案：当用户点击“显示答案”以后，若用户填入的答案是错的，则该格数字以红色显示；若用户填入的数字是正确的，或者用户没有填入数字，则该格的答案显示为蓝色
（5）重新开始：当用户点击“重新开始”后，系统会根据用户所选的难度系数，重新生成一组数独游戏

2.算法原理介绍
把一个完整的数独看成由九个小宫格组成。通过for循环依次好数字1填入到每个小九宫格中，然后再把数字2填入到每个小九宫格中，依次类推。

3.实现
3.1生成数独
var sudoku[9][9]:用来存放生成的数独。
function fillNumberInOneArray(num,n):把数字num填入到第n个小九宫格中，其中num取值在[1,9],n取值在[0,8]
function lockRow(num,n,y): 查看数字num在数组sudoku所在的列上是否已有该数字。若存在返回false，若不存在返回true。
function lockColumn(num,n,x)：查看数字num在数组sudoku所在的行上是否已有该数字。若存在返回false，若不存在返回true
function judgeElse(x,y)：判断sudoku[x][y]上是否已有数字
function collectNumPosition(num,n)：收集数字num在第n个九宫格上可以填入的位置，并将这些位置存入到数组numPosition中。
function generateSudoku()：通过两个for循环执行fillNumberInOneArray，来达到将数字1~9都填入到每个小九宫格中的目的
function flashBack(num,n)：若把数字num填入到第n个小九宫格时，经过judgeElse、lockRow、lockColumn的检查发现该位置并不适合，此时调用flashBack函数。flashBack函数会把数组numPosition中存的位置一一拿出来了尝试，若某位置不合适，则将该位置中数组numPosition中删除，若找到适合的位置，则继续将数字num填入到第n+1个小九宫格中。若知道数组numPosition中存的位置均不适合，则重新开始填写数字num在第n-1个小九宫格中的位置，一次类推。
3.2生成游戏界面
function generateBlankArray(blank)：随机生成blank个大九宫格中要挖掉的位置，并将这些位置信息存入到数组blankArrary中
function selectLv():根据用户选择的难度系数来决定数独中用户要填的格子数。
function renderArray(sudoku)：根据数组sudoku中存的数独和blankArray中要挖掉的位置，将数独渲染到页面上。
3.3显示答案
function checkAnswer()：把用户填写的数独与数组sudoku中存的数组进行对比，若不一致，则该位置的数字用红色显示，若一致或者用户并没有在该位置填入数字，则该位置的数字用蓝色显示。
4.测试
4.1生成界面
 

4.2显示答案
 

