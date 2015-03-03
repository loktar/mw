(function () {
    window.RoomsStore = {
        setRooms: function (rooms) {
            this.rooms = rooms;
        },

        roomForId: function (roomId) {
            for (var i = 0; i < this.rooms.length; i++) {
                var room = this.rooms[i];
                if (room.identifier == roomId) {
                    return room;
                }
            }
            return null;
        }
    }
})();