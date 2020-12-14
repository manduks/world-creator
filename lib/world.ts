
// save world in an object
let world = {};
// cache visited to avoid duplication
let visited = {};

function walkTheWorld(x, y) {
  let hasMoreLand = false;
  visited[`${x}_${y}`] = true;  
  //forward
  if (world[`${x + 1}_${y}`] && !visited[`${x + 1}_${y}`]) {
    walkTheWorld(x + 1, y);
    hasMoreLand = true;
  }
  if (world[`${x}_${y + 1}`] && !visited[`${x}_${y + 1}`]) {
    walkTheWorld(x, y + 1);
    hasMoreLand = true;
  }

  //backwards
  if (world[`${x - 1}_${y}`] && !visited[`${x - 1}_${y}`]) {
    walkTheWorld(x - 1, y);
    hasMoreLand = true;
  }
  if (world[`${x}_${y - 1}`] && !visited[`${x}_${y - 1}`]) {
    walkTheWorld(x, y - 1);
    hasMoreLand = true;
  }

  return hasMoreLand;
}

function isIsland(x, y) {
  return walkTheWorld(x, y);
}

function calculateIslands() {
  let islands = 0;
  visited = {};

  Object.keys(world).forEach((key) => {
    const [x, y] = key.split("_");

    if (!visited[`${x}_${y}`]) {
      islands = isIsland(Number(x), Number(y)) ? islands + 1 : islands;
    }
  });

  return islands;
}

function setWorld(newWorld) {
  world = { ...newWorld };
  return world;
}

function getWorld() {
  return world;
}

function setLand(position, value) {
  world[position] = value;
}

function deleteLand(newWorld) {
  world = { ...newWorld };
}

export { world, walkTheWorld, calculateIslands, setWorld, getWorld, setLand, deleteLand };
