//aux method to fill empty array positions with empty arraies for Format homogenization
const fillArray = (array, indexes) => {
  for (var i = indexes; i >= 0; i--) {
    array[i] = array[i] ? array[i] : (array[i] = []);
  }
  return array;
};
//aux method to get the img required
const getImg = (idSection, idOption, idAlt) => {
  let urlBackground;
  switch (true) {
    case idSection == 0 && idOption == 0 && idAlt == 1:
      urlBackground = "helpInfo1.jpg";
      break;
    case idSection == 0 && idOption == 0 && idAlt == 2:
      urlBackground = "helpInfo2.jpg";
      break;
    case idSection == 0 && idOption == 0 && idAlt == 3:
      urlBackground = "helpInfo3.jpg";
      break;
    case idSection == 0 && idOption == 0 && idAlt == 4:
      urlBackground = "helpInfo4.jpg";
      break;
    case idSection == 0 && idOption == 0 && idAlt == 5:
      urlBackground = "helpInfo5.jpg";
      break;
    case idSection == 0 && idOption == 0 && idAlt == 6:
      urlBackground = "helpInfo6.jpg";
      break;
    case idSection == 0 && idOption == 0 && idAlt == 7:
      urlBackground = "helpInfo7.jpg";
      break;
    case idSection == 1 && idOption == 0 && idAlt == 0:
      urlBackground = "titleFlow.jpg";
      break;
    case idSection == 1 && idOption == 1 && idAlt == 1:
      urlBackground = "river.jpg";
      break;
    case idSection == 1 && idOption == 2 && idAlt == 1:
      urlBackground = "riverFlow.gif";
      break;
    case idSection == 2 && idOption == 0 && idAlt == 0:
      urlBackground = "titleWidth.jpg";
      break;
    case idSection == 2 && idOption == 0 && idAlt == 1:
      urlBackground = "helpWidth1.jpg";
      break;
    case idSection == 2 && idOption == 0 && idAlt == 2:
      urlBackground = "helpWidth2.jpg";
      break;
    case idSection == 2 && idOption == 0 && idAlt == 3:
      urlBackground = "helpWidth3.jpg";
      break;
    case idSection == 2 && idOption == 1 && idAlt == 1:
      urlBackground = "yellowWidth.jpg";
      break;
    case idSection == 2 && idOption == 2 && idAlt == 1:
      urlBackground = "blueWidth.jpg";
      break;
    case idSection == 2 && idOption == 3 && idAlt == 1:
      urlBackground = "greenWidth.jpg";
      break;
    case idSection == 2 && idOption == 4 && idAlt == 1:
      urlBackground = "redWidth.jpg";
      break;
    case idSection == 2 && idOption == 5 && idAlt == 1:
      urlBackground = "turquoiseWidth.jpg";
      break;
    case idSection == 3 && idOption == 0 && idAlt == 0:
      urlBackground = "titleDepth.jpg";
      break;
    case idSection == 3 && idOption == 0 && idAlt == 1:
      urlBackground = "helpDepth1.jpg";
      break;
    case idSection == 3 && idOption == 0 && idAlt == 2:
      urlBackground = "helpDepth2.jpg";
      break;
    case idSection == 3 && idOption == 0 && idAlt == 3:
      urlBackground = "helpDepth3.jpg";
      break;
    case idSection == 3 && idOption == 1 && idAlt == 1:
      urlBackground = "yellowDepth.jpg";
      break;
    case idSection == 3 && idOption == 2 && idAlt == 1:
      urlBackground = "blueDepth.jpg";
      break;
    case idSection == 3 && idOption == 3 && idAlt == 1:
      urlBackground = "greenDepth.jpg";
      break;
    case idSection == 3 && idOption == 4 && idAlt == 1:
      urlBackground = "redDepth.jpg";
      break;
    case idSection == 4 && idOption == 0 && idAlt == 0:
      urlBackground = "titleTemp.jpg";
      break;
    case idSection == 4 && idOption == 0 && idAlt == 1:
      urlBackground = "helpTemp1.jpg";
      break;
    case idSection == 4 && idOption == 0 && idAlt == 2:
      urlBackground = "helpTemp2.jpg";
      break;
    case idSection == 4 && idOption == 0 && idAlt == 3:
      urlBackground = "helpTemp3.jpg";
      break;
    case idSection == 4 && idOption == 1 && idAlt == 1:
      urlBackground = "greenTemp.jpg";
      break;
    case idSection == 4 && idOption == 2 && idAlt == 1:
      urlBackground = "redTemp.jpg";
      break;
    case idSection == 4 && idOption == 3 && idAlt == 1:
      urlBackground = "blueTemp.jpg";
      break;
    case idSection == 4 && idOption == 4 && idAlt == 1:
      urlBackground = "yellowTemp.jpg";
      break;
    case idSection == 4 && idOption == 5 && idAlt == 1:
      urlBackground = "blackTemp.jpg";
      break;
    case idSection == 5 && idOption == 0 && idAlt == 0:
      urlBackground = "titleEnv.jpg";
      break;
    case idSection == 5 && idOption == 0 && idAlt == 1:
      urlBackground = "helpEnv1.gif";
      break;
    case idSection == 5 && idOption == 1 && idAlt == 1:
      urlBackground = "forestEnv.jpg";
      break;
    case idSection == 5 && idOption == 2 && idAlt == 1:
      urlBackground = "plantsEnv.jpg";
      break;
    case idSection == 5 && idOption == 3 && idAlt == 1:
      urlBackground = "roadsEnv.jpg";
      break;
    case idSection == 5 && idOption == 4 && idAlt == 1:
      urlBackground = "animalsEnv.jpg";
      break;
    case idSection == 5 && idOption == 5 && idAlt == 1:
      urlBackground = "houseEnv.jpg";
      break;
    case idSection == 5 && idOption == 6 && idAlt == 1:
      urlBackground = "factoryEnv.jpg";
      break;
    case idSection == 5 && idOption == 7 && idAlt == 1:
      urlBackground = "parkingEnv.jpg";
      break;
    case idSection == 5 && idOption == 8 && idAlt == 1:
      urlBackground = "orchardEnv.jpg";
      break;
    case idSection == 5 && idOption == 9 && idAlt == 1:
      urlBackground = "treatmentEnv.jpg";
      break;
    case idSection == 5 && idOption == 10 && idAlt == 1:
      urlBackground = "trainEnv.jpg";
      break;
    case idSection == 5 && idOption == 11 && idAlt == 1:
      urlBackground = "recreationEnv.jpg";
      break;
    case idSection == 5 && idOption == 12 && idAlt == 1:
      urlBackground = "campingEnv.jpg";
      break;
    case idSection == 6 && idOption == 0 && idAlt == 0:
      urlBackground = "titleColor.jpg";
      break;
    case idSection == 6 && idOption == 0 && idAlt == 1:
      urlBackground = "helpColor1.jpg";
      break;
    case idSection == 6 && idOption == 0 && idAlt == 2:
      urlBackground = "helpColor2.jpg";
      break;
    case idSection == 6 && idOption == 0 && idAlt == 3:
      urlBackground = "helpColor3.jpg";
      break;
    case idSection == 6 && idOption == 1 && idAlt == 1:
      urlBackground = "riverColor.jpg";
      break;
    case idSection == 6 && idOption == 2 && idAlt == 1:
      urlBackground = "brownColor.jpg";
      break;
    case idSection == 6 && idOption == 3 && idAlt == 1:
      urlBackground = "greenColor.jpg";
      break;
    case idSection == 6 && idOption == 4 && idAlt == 1:
      urlBackground = "greyColor.jpg";
      break;
    case idSection == 7 && idOption == 0 && idAlt == 0:
      urlBackground = "titleSmell.jpg";
      break;
    case idSection == 7 && idOption == 0 && idAlt == 1:
      urlBackground = "helpSmell1.jpg";
      break;
    case idSection == 7 && idOption == 0 && idAlt == 2:
      urlBackground = "helpSmell2.jpg";
      break;
    case idSection == 7 && idOption == 0 && idAlt == 3:
      urlBackground = "helpSmell3.jpg";
      break;
    case idSection == 7 && idOption == 1 && idAlt == 1:
      urlBackground = "riverSmell.jpg";
      break;
    case idSection == 7 && idOption == 2 && idAlt == 1:
      urlBackground = "garbageSmell.jpg";
      break;
    case idSection == 8 && idOption == 0 && idAlt == 0:
      urlBackground = "titleGarbage.jpg";
      break;
    case idSection == 8 && idOption == 0 && idAlt == 1:
      urlBackground = "helpGarbage1.jpg";
      break;
    case idSection == 8 && idOption == 0 && idAlt == 2:
      urlBackground = "helpGarbage2.jpg";
      break;
    case idSection == 8 && idOption == 0 && idAlt == 3:
      urlBackground = "helpGarbage3.jpg";
      break;
    case idSection == 8 && idOption == 1 && idAlt == 1:
      urlBackground = "plasticBagGarbage.jpg";
      break;
    case idSection == 8 && idOption == 2 && idAlt == 1:
      urlBackground = "plasticBottleGarbage.jpg";
      break;
    case idSection == 8 && idOption == 3 && idAlt == 1:
      urlBackground = "paperGarbage.jpg";
      break;
    case idSection == 8 && idOption == 4 && idAlt == 1:
      urlBackground = "canGarbage.jpg";
      break;
    case idSection == 8 && idOption == 5 && idAlt == 1:
      urlBackground = "glassBottleGarbage.jpg";
      break;
    case idSection == 8 && idOption == 6 && idAlt == 1:
      urlBackground = "clothesGarbage.jpg";
      break;
    case idSection == 8 && idOption == 7 && idAlt == 1:
      urlBackground = "cigaretteGarbage.jpg";
      break;
    case idSection == 9 && idOption == 0 && idAlt == 0:
      urlBackground = "titlePlants.jpg";
      break;
    case idSection == 9 && idOption == 0 && idAlt == 1:
      urlBackground = "helpPlants1.gif";
      break;
    case idSection == 8 && idOption == 8 && idAlt == 1:
      urlBackground = "brickGarbage.jpg";
      break;
    case idSection == 9 && idOption == 1 && idAlt == 1:
      urlBackground = "nettlePlants.jpg";
      break;
    case idSection == 9 && idOption == 2 && idAlt == 1:
      urlBackground = "hazelPlants.jpg";
      break;
    case idSection == 9 && idOption == 3 && idAlt == 1:
      urlBackground = "ashTreePlants.jpg";
      break;
    case idSection == 9 && idOption == 4 && idAlt == 1:
      urlBackground = "oakPlants.jpg";
      break;
    case idSection == 9 && idOption == 5 && idAlt == 1:
      urlBackground = "pampasGrassPlants.jpg";
      break;
    case idSection == 9 && idOption == 6 && idAlt == 1:
      urlBackground = "saintJosephPlants.jpg";
      break;
    case idSection == 9 && idOption == 7 && idAlt == 1:
      urlBackground = "bambuPlants.jpg";
      break;
    case idSection == 10 && idOption == 0 && idAlt == 0:
      urlBackground = "titleAnimals.jpg";
      break;
    case idSection == 10 && idOption == 0 && idAlt == 1:
      urlBackground = "helpAnimals1.jpg";
      break;
    case idSection == 10 && idOption == 0 && idAlt == 2:
      urlBackground = "helpAnimals2.jpg";
      break;
    case idSection == 10 && idOption == 0 && idAlt == 3:
      urlBackground = "helpAnimals3.jpg";
      break;
    case idSection == 10 && idOption == 0 && idAlt == 4:
      urlBackground = "helpAnimals4.jpg";
      break;
    case idSection == 10 && idOption == 1 && idAlt == 1:
      urlBackground = "caddisflyCoveredAnimals1.jpg";
      break;
    case idSection == 10 && idOption == 1 && idAlt == 2:
      urlBackground = "caddisflyCoveredAnimals2.jpg";
      break;
    case idSection == 10 && idOption == 2 && idAlt == 1:
      urlBackground = "mayflyAnimals1.jpg";
      break;
    case idSection == 10 && idOption == 2 && idAlt == 2:
      urlBackground = "mayflyAnimals2.jpg";
      break;
    case idSection == 10 && idOption == 3 && idAlt == 1:
      urlBackground = "caddisflyUncoveredAnimals1.jpg";
      break;
    case idSection == 10 && idOption == 3 && idAlt == 2:
      urlBackground = "caddisflyUncoveredAnimals2.jpg";
      break;
    case idSection == 11 && idOption == 0 && idAlt == 1:
      urlBackground = "goodGame1.jpg";
      break;
    case idSection == 11 && idOption == 0 && idAlt == 2:
      urlBackground = "goodGame2.jpg";
      break;
    case idSection == 11 && idOption == 0 && idAlt == 3:
      urlBackground = "badGame1.jpg";
      break;
    case idSection == 11 && idOption == 0 && idAlt == 4:
      urlBackground = "badGame2.jpg";
      break;
    case idSection == 11 && idOption == 1 && idAlt == 1:
      urlBackground = "clearGame.jpg";
      break;
    case idSection == 11 && idOption == 2 && idAlt == 1:
      urlBackground = "decontaminateGame.jpg";
      break;
    case idSection == 11 && idOption == 3 && idAlt == 1:
      urlBackground = "sowGame.jpg";
      break;
    case idSection == 11 && idOption == 4 && idAlt == 1:
      urlBackground = "sowGame.jpg";
      break;
  }
  return urlBackground;
};
//aux method to Deep clone multi dimension Arrays
const deepCloneMultiArray = arr => {
  return arr.map(item =>
    Array.isArray(item) ? deepCloneMultiArray(item) : item
  );
};

const roundValue = (number, decimals) => {
  return +(Math.round(number + "e+" + decimals) + "e-" + decimals);
};

const promiseTimeout = function(ms, promise) {
  // Create a promise that rejects in <ms> milliseconds
  let timeout = new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      reject("Timed out in " + ms + "ms.");
    }, ms);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeout]);
};

const checkNestedProperty = function(obj, propertyPath) {
  if (!propertyPath) return false;

  var properties = propertyPath.split(".");

  for (var i = 0; i < properties.length; i++) {
    var prop = properties[i];

    if (!obj || !obj.hasOwnProperty(prop)) {
      return false;
    } else {
      obj = obj[prop];
    }
  }

  return true;
};

export {
  fillArray,
  deepCloneMultiArray,
  roundValue,
  promiseTimeout,
  checkNestedProperty,
  getImg
};
