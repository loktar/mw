(function () {

    window.AvailableRoomsList = function (el) {
        var self = this;
        this.roomSelectedCallback = null;

        $(el)[0].on('click', function (event) {
            var li = event.target;
            var roomId = li.attributes['data-room-id'].value;

            if (self.roomSelectedCallback) {
                self.roomSelectedCallback(roomId);
            }
        });

        var fragment = document.createDocumentFragment();
        RoomsStore.rooms.forEach(function (room) {
            var li = document.createElement('li');
            li.setAttribute('data-room-id', room.identifier);
            li.innerHTML = room.name;

            fragment.appendChild(li);
        });
        el.appendChild(fragment);
    };

})();