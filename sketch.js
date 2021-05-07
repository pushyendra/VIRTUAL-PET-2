var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed
//Create variables here

function preload()

{
  dogimg1 = loadImage("dogImg.png")
  dogimg2 = loadImage("dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED DRAGO")
  feed.position(500,95)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,95)
  add.mousePressed(AddFood)

} 

function draw(){
 background(46,139,87);

 foodobject.display()
 Feedtime = database.ref('Feedtime');
 Feedtime.on("value",function (data){
   Lastfeed = data.val();
 })


fill(255,255,254)
textSize(15)
if(Lastfeed>=12){
  text("last feed : "+ Lastfeed%12 + "PM",350,30)
}else if(Lastfeed==0){
  text("last feed : 12AM",350,30)
}else{
  text("last feed :"+ Lastfeed + "AM",350,30);
}


drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
  Feedtime:hour()
 })
}
