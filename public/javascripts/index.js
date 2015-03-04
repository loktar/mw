(function () {

    window.IndexPageController = function () {
        var self = this;

        this.stateController = new StateController();

        this.selectRoomDialog = new SelectRoomDialog('#select-room-dialog');
        this.selectRoomDialog.roomSelectedCallback = this.selectRoom.bind(this);

        $('#sign-in button')[0].on('click', GoogleAuth.handleAuthClick);

        GoogleAuth.onAuthSuccess = function () {
            Ajax.get('/api/v1/google/resources').then(function (response) {
                RoomsStore.setRooms(response);

                console.log('get success');
                self.selectRoomDialog.show();
            }, function (e) {
                console.log('get failed: ' + e);
            })
        };

        this.stateController.update();
    };

    IndexPageController.prototype = {
        selectRoom: function (room) {
            this.selectRoomDialog.hide();

            this.stateController.selectRoom(room);
            $('#room h1')[0].innerHTML = room.name;

            console.log('Did select room: ' + room.name);
        }
    }

})();