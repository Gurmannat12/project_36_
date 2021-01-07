var dog;
var dogImg,happyDogImg;
var foodS,foodStock;
var lastFed;
var lastFed=0;
var database;
var fedTime;
var foodObj;
var feed,addFood;

function preload()
{
  dogImg = loadImage("dog.png");
  happyDogImg = loadImage("happy.png");
}

function setup() {

  database = firebase.database();

  createCanvas(1200,700);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
 // textSize(20);

  dog = createSprite(900,200,40,150);
  dog.scale = 0.3;
  dog.addImage(dogImg);

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() { 
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM",500,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",500,30);
  }else{
    text("Last Feed : "+ lastFed + "AM",500,30);
  }

  drawSprites();

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



