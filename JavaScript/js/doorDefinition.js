//JD's working on this..

class Door extends Asset {
  constructor(name, description, connectedRooms) {
    super(name, description)
    const _connectedRooms = connectedRooms || []

    this.otherRoom = room => {
      if (_connectedRooms.indexOf(room) === 0)
        return _connectedRooms[1]
      else if (_connectedRooms.indexOf(room) === 1)
        return _connectedRooms[0]
      else
        throw new Error("Door.otherRoom(room): This door is not connected to the room you gave.")
    }
  }
}