class Elevator {
  constructor() {
    this.currentFloor = 1;
    this.isMoving = false;
  }

  moveToFloor(floor) {
    if (this.isMoving) {
      document.getElementById("result").innerHTML = `Elevator is already moving!`;
	  clearField();
      return;
    }

    if (floor > 100 || floor === 0) {
      document.getElementById("floor").value = `Elevator can't go to floor ${floor}`;
	  setTimeout(() => {
		  clearField();
	  }, 2000);
      return;
    }

    this.isMoving = true;
	
	clearField();

    document.getElementById("result").innerHTML = `Elevator is now going to floor: ${floor}`;

    setTimeout(() => {
      this.currentFloor = floor;
      this.isMoving = false;

      document.getElementById("result").innerHTML = `Elevator is now in floor: ${floor}`;
    }, 2000);
  }
}


let elevator = new Elevator();


function inputField(value) {
  document.getElementById("floor").value += value;
}


function clearField() {
  document.getElementById("floor").value = "";
}


function moveFloor() {
  let floor = Number(document.getElementById("floor").value);

  elevator.moveToFloor(floor);
}