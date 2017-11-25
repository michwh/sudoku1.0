
	var count = 0;
	var timeArea = document.getElementById("timer");
  var startGame;
  var startTimes=0;//用户连续点击“开始游戏”的次数
  var answer=false;
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
  var userAnswer=[
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
  var numCoor=[[],[],[],[],[],[],[],[]];
  var numPosition=[[],[],[],[],[],[],[],[],[]];
  var blankArray=[[],[]];
   var blank=20;

  //显示答案
 
  showAnser=function(){
    stop();
    checkAnswer();
    returnPage();
    var num=0;
       for(var i=0;i<9;i++){
          for(var j=0;j<9;j++){
            var elem=document.getElementById(num);
            if(userAnswer[i][j]==sudoku[i][j]){
              elem.innerHTML=sudoku[i][j];
              num++;
            }else{
              elem.innerHTML=userAnswer[i][j];
              num++;
              elem.style="color:red;font-size:25px;text-align:center;font-family:微软雅黑;height:46px;width:46px;line-height:46px;"
            }
          }
       }
  }
  
   //选择难度系数
  selectLv=function(){
    returnPage();
    var value=document.getElementById("mySelect").value;
    if(value=="1"){
      blank=20;
    }else if(value=="2"){
      blank=30;
    }else{
      blank=40;
    }
    blankArray=[[],[]];
    generateAnswer();
    generateBlankArray(blank);
    renderArray(sudoku);
    timeArea.innerHTML = "00:00:00";
    count=0;
    startTimes=0;
  }
   
   //计时方法
	 pad=function(i) {
  
  if (i < 10) {
    return "0" + i;
  }  
     return i;  
  }

      //计时方法
    timer=function(){
        count++;
  var h = pad(parseInt(count / 3600));
  var m = pad(parseInt(count / 60));
  var s = pad(parseInt(count % 60));
  timeArea.innerHTML = h + ":" + m + ":" + s;
  
   }

    //开始游戏
    start=function (){
    //开始计时
    if(startTimes==0){
     startGame=setInterval(timer, 1000);
     startTimes++;
    }
    
   }

   stop=function(){//暂停游戏
      clearInterval(startGame);
      startTimes=0;
   }
   
   //重新开始游戏
   restart=function(){

    //重新开始计时
    timeArea.innerHTML = "00:00:00";
    count=0;
    startTimes=0;
    selectLv();
 }

 //生成数独
 function generateSudoku(){
    for(var i=1;i<10;i++){
    var k=1;
      for(var j=0;j<9;j++){
      answer=false;
        fillNumberInOneArray(i,j);
        if(answer==false){
          flashBack(i,j);
          if(answer==false){
            k=0;
            break;
          }          
        }
  }
      if(k==0){
        break;
      }
       numPosition=[[],[],[],[],[],[],[],[],[]];
    }
  }
   
   //收集数字num在第n个九宫格上可填入的位置
   function collectNumPosition(num,n){
    var position=0;
    var coor=[0,0];
    for(var i=0;i<9;i++){
      position=i;
      coor=calculateCoordinate(position,n);
     if(judgeElse(coor[0],coor[1])&&lockRow(num,n,coor[1])&&lockColumn(num,n,coor[0])){
      numPosition[n].push(position);
      }
    }
    if(numPosition[n].length!=0){
      //打乱数组中元素的顺序
      numPosition[n].sort(function(a,b){return Math.random()>0.5?1:0});
     answer=true;
    }else{
      answer=false;
    }
   }

  //回溯
  //m表示要填入的数字，n表示第n个九宫格
  function flashBack(num,n){
    for(var i=n;i>0;i--){
       var position=0;
       var coor=[0,0];
       coor=numCoor[i-1];
       sudoku[coor[0]][coor[1]]=0;
       numPosition[i-1].splice(0,1);
       while(numPosition[i-1].length!=0){
            position=numPosition[i-1][0];
            coor=calculateCoordinate(position,i-1);   
            sudoku[coor[0]][coor[1]]=num;
            numCoor[i-1]=coor;
            for(var j=i;j<=n;j++){
              fillNumberInOneArray(num,j);
              if(answer==false){
               break;
            }
            }
           if(answer==true){
               break;
            }
          numPosition[i-1].splice(0,1); 
          for(var k=j-1;k>=i-1;k--){
            coor=numCoor[k];
            sudoku[coor[0]][coor[1]]=0;
            numPosition[k]=[]; 
          }
        }
        if(answer==true){
          break;
        }
        sudoku[coor[0]][coor[1]]=0;
    }
  }
 


  //根据position和n计算出在数组sudoku中的位置,并通过数组返回坐标
  function calculateCoordinate(position, n) {
  // 先计算九宫格是几排几列的九宫格, 我们把数独看成是 3*3 的9个9宫格
  var nx = n % 3;
  var ny = Math.floor(n / 3); 

  var px = position % 3;
  var py = Math.floor(position / 3);
  // 同样的套路处理小9宫格内的坐标，
  
  // 转换一下坐标系
  var returnX = px + nx * 3; 
  var returnY = py + ny * 3;
  return [returnY, returnX];
  }

   //随机产生在[min,max)之间的随机数
   function RandomNumBoth(Min,Max){

    return Math.floor(Math.random()*(Max-Min))+Min;
   }

   //将数字m填入到第n个小数组中
   function fillNumberInOneArray(num,n){

     var position=0;
     var coor=[0,0];
      collectNumPosition(num,n);

    if(answer==true){ 
    position=numPosition[n][0];
    coor=calculateCoordinate(position,n);   
     sudoku[coor[0]][coor[1]]=num;
     numCoor[n]=coor;
     }
   } 

   //查看数字num所在的列是否已有该数字
   function lockRow(num,n,y){
    var ii=parseInt(n/3);
    if(ii==1){
      for(var i=0;i<3;i++){
          if(sudoku[i][y]==num){
            return false;
          }
        }
      }else if(ii==2){
        for(var i=0;i<6;i++){
          if(sudoku[i][y]==num){
            return false;
          }
        }
      }
      return true;
   }

   //查看数字num所在的行是否已有该数字
   function lockColumn(num,n,x){
    var jj=n%3;
    if(jj==1){
      for(var j=0;j<3;j++){
          if(sudoku[x][j]==num){
            return false;
          }
        }
    }else if(jj==2){
      for(var j=0;j<6;j++){
          if(sudoku[x][j]==num){
            return false;
          }
        }
    }
    return true;
   }

   //判断数字填入的位置上是否已有数字
   function judgeElse(x,y){
    if(sudoku[x][y]!=0){
      return false;
    }
    return true;
   }
  
  //在数组中查找num
  function searchNumberInArray(num1,array1,num2,array2){
      
        for(var j=0;j<array1.length;j++){
          if(array1[j]==num1&&array2[j]==num2){
            //alert("重复");
            return true;
          }
        }
      return false;
  }

   //将数组sudoku中需要挖掉的位置存入数组blankArray中
   //blank为要挖掉的格子数
  function generateBlankArray(blank){
     for(var i=0;i<blank;i++){
      do{
       var x=RandomNumBoth(0,9);
       var y=RandomNumBoth(0,9);
       }while(searchNumberInArray(x,blankArray[0],y,blankArray[1]))
      blankArray[0].push(x);
      blankArray[1].push(y);
     }
  }


    //将数组sudoku渲染到页面上
    function renderArray(sudoku){
      var num=0;
       for(var i=0;i<9;i++){
          for(var j=0;j<9;j++){
            var elem=document.getElementById(num);
            if(searchNumberInArray(i,blankArray[0],j,blankArray[1])){
              num++;
              elem.className='hide';
              elem.innerHTML='<input type="text" class="hide-text">';
              continue;
            }
            elem.className='show';
            elem.innerHTML=sudoku[i][j];
            num++;
          }
       }
    }
     
     //将界面上的数值清空
    function returnPage(){
      var num=0;
      for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
           var elem=document.getElementById(num);
          // alert(num);
            elem.innerHTML="";
            num++;
            elem.style.cssText="";
        }
      }
    }

function generateAnswer(){
do{
      numPosition=[[],[],[],[],[],[],[],[],[]];
       sudoku=[
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
      generateSudoku();
   }while(answer==false)
   answer==false;
}

  function checkAnswer(){
    for(var i=0;i<9;i++){
      for(var j=0;j<9;j++){
        userAnswer[i][j]=sudoku[i][j];
      }
    }
    var elem=document.getElementsByClassName("hide-text");
    for(var i=0;i<elem.length;i++){
        var parentID=elem[i].parentNode.id;
        if(elem[i].value==""){
          continue;
        }
        userAnswer[parseInt(parentID/9)][parentID%9]=elem[i].value;
    }
  }


//页面初始化
selectLv();




