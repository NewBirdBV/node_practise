window.onload = function () {
    let socket = io.connect();
    socket.on('connect', function () {
        socket.emit('join', getUser());
        document.getElementById('chat').style.display = 'block';

        socket.on('hello', function (msg) {
            let li = document.createElement('li');
            li.className = 'annoucement';
            li.innerHTML = msg;
            document.getElementById('messages').appendChild(li);
        });

        socket.on('text', addMsg);
    });

    document.getElementById('form').onsubmit = function () {
        const input = document.getElementById('input');
        const li = addMsg('me', input.value);
        socket.emit('text', input.value, function (date) {
            li.className = 'confirmed';
            li.title = date;
        });
        input.value = '';
        input.focus();
        return false;
    }

    function addMsg(from, text) {
        let li = document.createElement('li');
        li.className = 'text';
        li.innerHTML = `<b>${from}</b>：${text}`;
        document.getElementById('messages').appendChild(li);
        return li;
    }

    function getUser() {
        let user = prompt('what is your nickname');
        if (user) {
            return user;
        }
        getUser();
    }
}
