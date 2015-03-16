(function () {

    window.IndexPageController = function () {
        var self = this;

        this.stateController = new StateController();
        this.scheduleService = new ScheduleService();

        this.selectRoomDialog = new SelectRoomDialog('#select-room-dialog');
        this.selectRoomDialog.roomSelectedCallback = this.selectRoom.bind(this);

        this.roomBookerService = new RoomBookerService(this.stateController);

        this.bookRoomDialog = new BookRoomDialog('#book-room-dialog', this.roomBookerService);
        this.bookRoomDialog.bookRoomCallback = this.bookRoom.bind(this);

        $('#sign-in button')[0].on('click', GoogleAuth.handleAuthClick);

        $('button#book-room')[0].on('click', this.showBookRoomDialog.bind(this));
        $('button#end-meeting')[0].on('click', this.endCurrentMeeting.bind(this));

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
        selectRoom: function (room, displayName) {
            var self = this;

            this.selectRoomDialog.hide();

            this.stateController.selectRoom(room);
            $('#room h1')[0].innerHTML = displayName;

            console.log('Did select room: ' + room.name);

            this.scheduleService.monitorRoom(room, function (event) {
                console.log('Current event: ' + event.id);
                self.stateController.setCurrentEvent(event);
            });
        },

        showBookRoomDialog: function () {
            this.bookRoomDialog.show(this.stateController.selectedRoom);
        },

        bookRoom: function (bookerName) {
            console.log('booking a room for ' + bookerName);
        },

        endCurrentMeeting: function () {
            var room = this.stateController.selectedRoom;
            var event = this.stateController.currentEvent;
            this.roomBookerService.endCurrentMeeting(room, event);
        }
    }

})();