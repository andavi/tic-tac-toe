(function() {
	var P1 = 'X', P2 = 'O';
	var socket = io.connect('http://localhost:5000'),
		player,
		game;

	var Player = function(name, type) {
		this.name = name;
		this.type = type;
		this.currentTurn = true;
		this.movesPlayed = 0;
	}

	Player.wins = [7, 56, 448, 73, 146, 292, 273, 84];

	Player.prototype.updateMovesPlayed = function(tileValue) {
		this.movesPlayed += tileValue;
	}

	Player.prototype.getMovesPlayed = function() {
		return this.movesPlayed;
	}

	Player.prototype.setCurrentTurn = function(turn) {
		this.currentTurn = turn;
		if (turn) {
			$('#turn').text('Your turn.');
		} else {
			$('#turn').text('Waiting for opponent.');
		}
	}

	Player.prototype.getPlayerName = function() {
		return this.name;
	}

	Player.prototype.getPlayerType = function() {
		return this.type;
	}

	Player.prototype.getCurrentTurn = function() {
		return this.currentTurn;
	}

		$('#new').on('click', function() {
			var name = $('#nameNew').val();
			if (!name) {
				alert('Please enter you name.');
				return;
			}
			socket.emit('createGame', {name: name});
			player = new Player(name, P1);
		});

		$('#join').on('click', function() {
			var name = $('#nameJoin').val();
			var roomID = $('#room').val();
			if (!name || !roomID) {
				alert('Please enter your name and game ID.');
				return;
			}
			socket.emit('joinGame', {name: name, room: roomID});
			player = new Player(name, P2);
		});
})();