(function() {
	var P1 = 'X', P2 = 'O';
	var socket = io.connect('http://localhost:5000'),
		player,
		game;

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