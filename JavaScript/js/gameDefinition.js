/**
 * Main game object that controls game flow.
 */
class Game {

  /**
   * @param setupData An object specifcally formatted to provide info to the game.
   * See config.js for example structure.
   */
  constructor(setupData) {
    // Link the DOM command input area using jQuery
    const $userInput = $("#command")

    // Link the DOM output areas using jQuery
    const $messageArea = $("#message")
    const messenger = new Messenger($messageArea)
    const $nameArea = $("#name")
    const roomNamer = new Descriptor($nameArea)
    const $descriptionArea = $("#description")
    const descriptor = new Descriptor($descriptionArea)

    //create a new interpreter/parser with availible commands and synonyms
    const parser = new Parser({
      go: ['go', 'walk', 'run', 'flee'],
      look: ['look', 'l', 'view', 'examine', 'inspect'],
      take: ['take', 't', 'pick', 'grab', 'steal'],
      inventory: ['inventory', 'i', 'stuff', 'pack', 'backpack'],
      use: ['use', 'u', 'operate'],
      drop: ['drop', 'd', 'leave', 'throw', 'abandon']
    })

    // Initialize the game state
    let {_player, _rooms, _doors, _currentRoom} = loadGame(setupData)

    /**
     * Loads a game from a saved game state (or initializes from a default state).
     *
     * @param gameData Specifically formatted object that represents the game state.
     * See config.js for example structure.
     */
    function loadGame(gameData) {
      const player = gameData.entities.player
      const gameState = {
        // Create player object from gameData
        _player: new Player(
          player.name,
          player.descriptions[0],
          player.health,
          player.strength,
          player.inventory.map(item =>
            new Item(item.name, item.descriptions[0])),
          player.hunger),

        // Create room objects from setupData
        //TODO add entities to the room objs once entity class is implemented
        _rooms: gameData.rooms.map(room => new Room(
          room.name,
          room.descriptions[0],
          room.items.map(item =>
            new Item(item.name, item.descriptions[0]))
          ))
      }//end gameState init

      // Create door objects and connect rooms from gameData/gameState
      gameState._doors = gameData.doors.map(door => new Door(
        door.name,
        door.descriptions[0],
        door.connectingRooms.map(connection => ({
          room: successOrError(
            gameState._rooms.find(room => room.name() === connection.inRoom),
            `Connect failed for room "${connection.inRoom}" on door "${door.name}"`
          ),
          located: connection.located
        })),
      ))

      // Set current room from gameData
      gameState._currentRoom = successOrError(
          gameState._rooms.find(room => room.name() === gameData.game.startingRoom),
          `Set current room failed for room "${gameData.game.startingRoom}"`
        )

      return gameState
    }

    // Function to display initial info about the current room
    function displayRoomInfo(room) {
      roomNamer.display(room.name())
      descriptor.display(room.description())
    }

    //run function starts the game accepting input
    this.run = () => {
      displayRoomInfo(_currentRoom)

      $userInput.on('keydown', (event) => {
        //user presses enter
        if (event.which === 13) {
          let commands = parser.validate($userInput.val())
          let command = {}

          while (command = commands.next().value) {
            switch (command.action) {
              case 'go':
                go(command.payload)
                break
              case 'take':
                take(command.payload)
                break
              case 'inventory':
                inventory()
                break
              case 'drop':
                drop(command.payload)
                break
              default:
                throw new Error('Something went wrong in the parser for command', command)

            }
          }//end while, no more commands to switch

          //clear the input field
          $userInput.val('')
          displayRoomInfo(_currentRoom)
        }
        else if(event.which === 38){//Up arror pushed
          $userInput.val(parser.getLastCommandHistory())
        }
        else if(event.which === 40){//Down arror pushed
          $userInput.val(parser.getNextCommandHistory())
        }
      })
    }

    /// Functions for commands start here *******
    function go(direction) {
      if (_currentRoom.canGo(direction)) {
        _currentRoom = _currentRoom.connectedRoom(direction)
        checkWinningConditions()
      }
      else{
        messenger.addMessage(`You can't go ${direction}.`)
      }
    }

    function take(itemName) {
      if (_currentRoom.hasItem(itemName)) {
        let item = _currentRoom.removeItem(itemName)
        _player.take(item)
        $('#items').text(_currentRoom.listOfItems())
      }
      else{
        messenger.addMessage(`There's no ${itemName} here.`)
      }
    }

    function inventory() {
      messenger.addMessage(_player.inventory())
    }

    function drop(itemName) {
      if (_player.has(itemName)) {
        let item = _player.drop(itemName)
        _currentRoom.addItem(item)
      }
      else{
        messenger.addMessage(`You don't have a ${itemName}.`)
      }

      checkWinningConditions()
    }

    function checkWinningConditions() {
      // Hacked in game-winning condition.
      if (_currentRoom.name() === 'Secret Room'
          && _currentRoom.hasItem('toy')
          && _currentRoom.hasItem('knife')) {
        _currentRoom = new Room('You win!',
                                "You've completed the game by giving the man the toy and the knife.")
      }
    }

    function successOrError(test, errMsg){
      if(!test){
        throw new Error(errMsg)
      }
      return test
    }
  } //end constructor
}
