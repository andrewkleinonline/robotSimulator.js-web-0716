'use strict';

class Robot {

  orient(direction) {
    if([ 'east', 'west', 'north', 'south' ].includes(direction)){
      this.bearing = direction
    } else {
      throw new Error("Invalid Robot Bearing")
    }
  }

  turnRight() {
    var directions = ['north','east','south','west']
    this.bearing = directions[(directions.indexOf(this.bearing) + 1) % 4]
  }

  turnLeft() {
    var directions = ['west', 'south', 'east', 'north']
    this.bearing = directions[(directions.indexOf(this.bearing) + 1) % 4]
  }

  at(ew, ns) {
    this.coordinates = [ew,ns]
  }

  advance() {
    var ew = { west: -1, east: 1 }
    var ns = { north: 1, south: -1 }
    this.coordinates[0] += (ew[this.bearing] || 0)
    this.coordinates[1] += (ns[this.bearing] || 0)
  }

  instructions(instruction_set) {
    var instructions_array = []
    var guidelines = {"A": "advance",
                      "R": "turnRight",
                      "L": "turnLeft"}
    instruction_set.split("").forEach(function(instruction){
      instructions_array.push(guidelines[instruction])
    })
    return instructions_array
  }

  evaluate(instruction_set) {
    var instructions_array = [];
    var guidelines = {"A": this.advance,
                      "R": this.turnRight,
                      "L": this.turnLeft};
    var self = this;
    instruction_set.split("").forEach((instruction) => {
      guidelines[instruction].call(self)
    })
  }

  place(placement_object) {
    this.at(placement_object["x"], placement_object["y"])
    this.orient(placement_object["direction"])
  }
}
