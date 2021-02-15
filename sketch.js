//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogimg,happydogimg;
var feedDog,addFood;
var fedTime,lastFed;
var foodObj

function preload()
{
  //load images here
  happydogimg = loadImage("images/dogImg.png")
  dogimg = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(700, 600);
  database = firebase.database();
  dog = createSprite(300,300)
  dog.addImage("dog",dogimg)
  dog.scale = 0.5
  foodStock = database.ref('Food')
  foodStock.on("value",readStock)


  feedDog=createButton("Feed the dog"); 
  feedDog.position(350,95); 
  feedDog.mousePressed(feed); 
  addFood=createButton("Add Food"); 
  addFood.position(450,95); 
  addFood.mousePressed(addFoods);
}

function feed(){ 
  dog.addImage("dog",happydogimg); 
  foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
  database.ref('/').update({ 
    Food:foodObj.getFoodStock(),
    hour:hour()
  })
} 

function addFoods(){ 
  foodS++; 
  database.ref('/').update({ 
    Food:foodS 
  }) 
} 



function draw() {  
  background(46,139,87);

  fedTime = database.ref('hour');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  //if(keyWentDown(UP_ARROW)){
   // foodS=foodS-1
   // writeStock(foodS)
   // dog.addImage("dog",happydogimg)
  //} 

  drawSprites();
  foodObj.display();
  fill(255,255,254); 
  textSize(15); 
  if(lastFed>=12){ 
    text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
  }else if(lastFed==0){ 
    text("Last Feed : 12 AM",350,30); 
  }else{ 
    text("Last Feed : "+ lastFed + " AM", 350,30); 
  } 
  

 // fill("black")
  //textSize(30)
  //text("Press the Up_Arrow to feed the Dog",100,100)
  

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x

  })
}

