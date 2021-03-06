// possible inspiration: http://textadventures.co.uk/games/play/5zyoqrsugeopel3ffhz_vq


// Converted to new setup data format as discussed by
// Jacob and J.D. on 2017-05-31.
const setupData = {
	game: {
	  name: "the game",
	  description: ["A Simple Text Adventure Game",
        "A slightly more complex text adventure game.",
        "Keep at it! I can make the game harder still..."],
	  help: "Try simple commands like \"look\", \"go east\", and \"eat banana\". If something doesn't work, try a variant of the command. Good luck!",
		startingRoom: "Study"
  },

  /* room map:

  ****4-------**
  ****|******|**
  ****|******|**
  *6--3--1--2-**
  **********|***
  **********5***

  room 1 (Study): go east to room 2 or west to room 3
  room 2 (Kitchen): go west to room 1 or east (turns north) to room 4,
                    secret door that leads to room 5
  room 3 (Foyer): go east to room 1 or north to room 4, west to room 6
  room 4 (Backyard): go south to room 3 or east to room 2
  room 5 (Hidden Nook): only go north back to room 2
  room 6 (Secret Room): only go east back to room 3
  */

  // The first room listed is the starting room.
  // Then there's no need to have a location for the player anywhere.
	rooms: [
    {
			name: "Study",
		  descriptions: ["You are in a large study with lots of dusty, old books. To the east, you see an open door and to the west a hallway."],
		  entities: {
			  enemies: [],
			  neutrals: [],
      },
      items: [{
				name: "cook book",
			  descriptions: ["A dusty old cook book that looks like it's from the 1950s"],
			  type: "item",
			  action: ""
			}]
		},
    {
			name: "Kitchen",
		  descriptions: ["You are in a messy kitchen with mold growing in its dark corners. There is a table in the center of the room."],
		  entities: {
			  enemies: [],
			  neutrals: [],
      },
      items: [
				{
					name: "mushroom",
				  descriptions: ["Nasty smelling mushroom that looks uninteresting"],
				  type: "item",
				  action: ""
		    },
		    {
					name: "toy",
				  descriptions: ["A wooden snake toy: It's amazing how flexible it is; very snakelike."],
				  type: "item",
				  action: ""
		    },
				{
					name: "cheese",
				  descriptions: ["A chunk of yellow cheese - maybe cheddar"],
				  type: "food", // should give 50 hunger units (not implemented)
				  action: ""
		    },
			]
    },
    {
			name: "Foyer",
		  descriptions: ["There is a door to the north and a hallway to the east."],
		  entities: {
			  enemies: [],
			  neutrals: [],
      },
      items: []
    },
    {
			name: "Backyard",
		  descriptions: ["There is a pathway to the east and a door to the south. A cat is startled and scurries off as you approach."],
		  entities: {
			  enemies: [],
			  neutrals: [],
      },
      items: [
				{
					name: "knife",
				  descriptions: ["A small pocket knife"],
				  type: "weapon",
				  action: "cut" // not sure how actions will work yet
		    },
			]
    },
    {
			name: "Hidden Nook",
		  descriptions: ["This room is a trap. Player loses the knife and the room picks it up."],
		  entities: {
			  enemies: [],
			  neutrals: [],
      },
      items: []
    },
    {
			name: "Secret Room",
		  descriptions: ["You have found a secret room. The only way out is the way you came in. A man watches you closely."],
		  entities: {
			  enemies: [],
			  neutrals: [],
      },
      items: []
    }
  ],

	doors: [
    {
			name: "open door",
		  descriptions: ["This door is open."],
		  connectingRooms: [{
				located: "west",
				inRoom: "Kitchen"
			},{
				located: "east",
				inRoom: "Study"
			}],
		  isLocked: false
		},
    {
			name: "hallway",
		  descriptions: ["A short hallway"],
			connectingRooms: [{
				located: "west",
				inRoom: "Study"
			},{
				located: "east",
				inRoom: "Foyer"
			}],
		  isLocked: false
    },
    {
			name: "pathway",
		  descriptions: ["A long, twisting corridor."],
			connectingRooms: [{
				located: "west",
				inRoom: "Backyard"
			},{
				located: "east",
				inRoom: "Kitchen"
			}],
		  isLocked: false
    },
    {
			name: "secret door",
		  descriptions: ["Shhh! No one's supposed to know about this secret door."],
			connectingRooms: [{
				located: "south",
				inRoom: "Kitchen"
			},{
				located: "north",
				inRoom: "Hidden Nook"
			}],
		  isLocked: false
    },
    {
			name: "room 4 door",
		  descriptions: ["It's hard to tell what it is..."],
			connectingRooms: [{
				located: "north",
				inRoom: "Foyer"
			},{
				located: "south",
				inRoom: "Backyard"
			}],
		  isLocked: false
    },
    {
			name: "secret passage",
		  descriptions: ["It's a secret passage!"],
			connectingRooms: [{
				located: "west",
				inRoom: "Foyer"
			},{
				located: "east",
				inRoom: "Secret Room"
			}],
		  isLocked: false
    }
  ],

	entities: {
    "player": {
      name: "You",
      descriptions: ["This is you!"],
      health: 100,
      hunger: 0,
			strength: 100,
      inventory: [
				{
					name: "snack",
				  descriptions: ["A health fruit and grain snack bar"],
				  type: "food", // should give 75 hunger units (not implemented)
				  action: ""
		    }
			],
      abilities: [],
      actionHistory: []
	  },
		"enemy 1": {
			name: "",
			descriptions: [""],
			health: 50,
			inventory: [],
			abilities: [],
			actionHistory: []
		},
		"neutral 1": {
			name: "",
			descriptions: [""],
			health: 100,
			hunger: 10,
			inventory: [],
			abilities: [],
			actionHistory: []
		}
  }
}
