/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/
function GameObject(attributes){
  this.createdAt = attributes.createdAt;
  this.dimensions = attributes.dimensions;
}

GameObject.prototype.destroy = function(){
  return `${this.name} was removed from the game.`;
}
/*
  === CharacterStats ===
  * healthPoints
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(stats){
  GameObject.call(this, stats);
  this.healthPoints = stats.healthPoints;
  this.name = stats.name;
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage =  function(){
  return `${this.name} took damage.`;
}

CharacterStats.prototype.celebrate = function(){
  return `${this.name} HAS WON!`;
}

CharacterStats.prototype.dealDamage =  function(dealTo, amount, criticalHit){
  this.healthPoints = this.healthPoints - amount;
  if(this.healthPoints > 0){
    if(criticalHit && amount !== 0){
      addRow(this.name, amount, this.healthPoints);
      console.error(`Critical Hit: ${this.name} takes ${amount} damage and has ${this.healthPoints} health left.`);
    }
    else{
      addRow(this.name, amount, this.healthPoints);
      console.log(`${this.name} takes ${amount} damage and has ${this.healthPoints} health left.`);
    }
  }
  else {
    addRow(this.name, amount, "Die");
    console.log(`${this.name} took ${amount} damage and has died.`);
  }
}
/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats\
*/

function Humanoid(user){
  CharacterStats.call(this, user);
  this.team = user.team;
  this.weapons = user.weapons;
  this.language = user.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet =  function(){
  return `${this.name} offers a greeting in ${this.language}.`;
}


/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:

  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  // console.log(mage.createdAt); // Today's date
  // console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  // console.log(swordsman.healthPoints); // 15
  // console.log(mage.name); // Bruce
  // console.log(swordsman.team); // The Round Table
  // console.log(mage.weapons); // Staff of Shamalama
  // console.log(archer.language); // Elvish
  // console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  // console.log(mage.takeDamage()); // Bruce took damage.
  // console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!

  function Villain(atr){
    Humanoid.call(this, atr);
  }

  Villain.prototype = Object.create(Humanoid.prototype);

  function Hero(atr){
    Humanoid.call(this, atr);
  }

  Hero.prototype = Object.create(Humanoid.prototype);

  const yokai = new Villain({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 50,
    name: 'Yokai',
    team: 'Anti Big Hero 6',
    weapons: [
      'Robots',
      'Missiles',
    ],
    language: 'English',
  });

  

  const hamada = new Hero({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 45,
    name: 'Hiro',
    team: 'Big Hero 6',
    weapons: [
      'Baymax',
      'Dagger',
    ],
    language: 'English',
  });

  function randomCrit (){
    if(Math.floor(Math.random() * Math.floor(5)) === Math.floor(Math.random() * Math.floor(5))){
      return true;
    }
    else {
      return false;
    }
  }

  // console.log(yokai);
  // console.log(hamada.healthPoints);
  function fight(villain, hero){
    let forceStop = 0;
    while(hamada.healthPoints > 0 && yokai.healthPoints > 0 && forceStop < 100){
      let dealTo = Math.floor(Math.random() * Math.floor(2));
      let damage = Math.floor(Math.random() * Math.floor(11));
      let criticalHit = randomCrit();
      if(criticalHit){
        damage = damage + 3;
        critAmount =  Math.floor(Math.random() * Math.floor(5));
        damage = damage * critAmount;
      }
      forceStop = forceStop + damage;
      if(dealTo === 1){
        villain.dealDamage(villain.name, damage, criticalHit);
        if(villain.healthPoints < 1){
          console.log(hero.celebrate());
        }
      }
      else{
        hero.dealDamage(hero.name, damage, criticalHit);
        if(hero.healthPoints < 1){
          console.log(villain.celebrate());
        }
      }
    }
  }

  fight(yokai,hamada);

  function addRow(name, damage, health){
    var table = document.getElementById("myTable");
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = name + " was Attacked";
    cell2.innerHTML = damage;
    cell3.innerHTML = health;
  }