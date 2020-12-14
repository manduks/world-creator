// save world in an object
let world = {};
// cache visited to avoid duplication
let visited = {};

/**
 * 
 * @param x 
 * @param y 
 * we check if it is an island and also continue to walk the island
 * to mark other squares as visited to avoid walking twite the same island
 */
function walkTheWorld(x:number, y:number): boolean {
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

function isIsland(x: number, y: number):boolean {
  return walkTheWorld(x, y);
}

function calculateIslands():number {
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

function setWorld(newWorld: object) {
  world = { ...newWorld };
  return world;
}

function getWorld(): object {
  return world;
}

function setLand(position: string, value: number) {
  world[position] = value;
}

function deleteLand(position: string): void {
  delete world[position];
}

export { world, walkTheWorld, calculateIslands, setWorld, getWorld, setLand, deleteLand };
