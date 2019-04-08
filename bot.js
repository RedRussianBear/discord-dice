const Discord = require('discord.js');
const auth = require('./auth.json');

const bot = new Discord.Client();

const diceCall = /([+\-]?\s*(([1-9][0-9]*d[1-9][0-9]*)|([1-9][0-9]*))\s*?)/g;

bot.on('ready', function (evt) {
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.user.username);
});

bot.on('message', function (msg) {
    let message = msg.content;
    if (!message.includes('!roll')) return;

    let parse = message.match(diceCall);

    if (parse == null) return;

    console.log(parse);
    let acc = 0;
    let trace = '';

    for (let i = 0; i < parse.length; i++) {
        let current = parse[i];
        let sign = 1;
        let add = 0;

        if (current.charAt(0) === '+' || current.charAt(0) === '-') {
            if (current.charAt(0) === '-')
                sign = -1;
            current = current.substr(1);
        }

        if (sign < 0) trace += '-';
        else if (i > 0) trace += '+';

        trace += '(';

        if (current.includes('d')) {
            let splitBoy = current.split('d');
            let times = parseInt(splitBoy[0]);
            let die = parseInt(splitBoy[1]);

            for (let j = 0; j < times; j++) {
                let roll = Math.ceil(Math.random() * die);

                if (j > 0) trace += '+';
                trace += roll;

                add += roll;
            }
        } else {
            add = parseInt(current);
            trace += add;
        }

        trace += ')';

        acc += sign * add;
    }

    trace += ' = **' + acc + '**';

    console.log(trace);
    msg.channel.send(trace);

});

bot.login(auth.token);

