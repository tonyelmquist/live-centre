const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

const score = {
    team1Score: 0,
    team2Score: 0,
};
let animals = [
    "Aardvark",
    "Albatross",
    "Alligator",
    "Alpaca",
    "Ant",
    "Anteater",
    "Antelope",
    "Ape",
    "Armadillo",
    "Donkey",
    "Baboon",
    "Badger",
    "Barracuda",
    "Bat",
    "Bear",
    "Beaver",
    "Bee",
    "Bison",
    "Boar",
    "Buffalo",
    "Butterfly",
    "Camel",
    "Capybara",
    "Caribou",
    "Cassowary",
    "Cat",
    "Caterpillar",
    "Cattle",
    "Chamois",
    "Cheetah",
    "Chicken",
    "Chimpanzee",
    "Chinchilla",
    "Chough",
    "Clam",
    "Cobra",
    "Cockroach",
    "Cod",
    "Cormorant",
    "Coyote",
    "Crab",
    "Crane",
    "Crocodile",
    "Crow",
    "Curlew",
    "Deer",
    "Dinosaur",
    "Dog",
    "Dogfish",
    "Dolphin",
    "Dotterel",
    "Dove",
    "Dragonfly",
    "Duck",
    "Dugong",
    "Dunlin",
    "Eagle",
    "Echidna",
    "Eel",
    "Eland",
    "Elephant",
    "Elk",
    "Emu",
    "Falcon",
    "Ferret",
    "Finch",
    "Fish",
    "Flamingo",
    "Fly",
    "Fox",
    "Frog",
    "Gaur",
    "Gazelle",
    "Gerbil",
    "Giraffe",
    "Gnat",
    "Gnu",
    "Goat",
    "Goldfinch",
    "Goldfish",
    "Goose",
    "Gorilla",
    "Goshawk",
    "Grasshopper",
    "Grouse",
    "Guanaco",
    "Gull",
    "Hamster",
    "Hare",
    "Hawk",
    "Hedgehog",
    "Heron",
    "Herring",
    "Hippopotamus",
    "Hornet",
    "Horse",
    "Human",
    "Hummingbird",
    "Hyena",
    "Ibex",
    "Ibis",
    "Jackal",
    "Jaguar",
    "Jay",
    "Jellyfish",
    "Kangaroo",
    "Kingfisher",
    "Koala",
    "Kookabura",
    "Kouprey",
    "Kudu",
    "Lapwing",
    "Lark",
    "Lemur",
    "Leopard",
    "Lion",
    "Llama",
    "Lobster",
    "Locust",
    "Loris",
    "Louse",
    "Lyrebird",
    "Magpie",
    "Mallard",
    "Manatee",
    "Mandrill",
    "Mantis",
    "Marten",
    "Meerkat",
    "Mink",
    "Mole",
    "Mongoose",
    "Monkey",
    "Moose",
    "Mosquito",
    "Mouse",
    "Mule",
    "Narwhal",
    "Newt",
    "Nightingale",
    "Octopus",
    "Okapi",
    "Opossum",
    "Oryx",
    "Ostrich",
    "Otter",
    "Owl",
    "Oyster",
    "Panther",
    "Parrot",
    "Partridge",
    "Peafowl",
    "Pelican",
    "Penguin",
    "Pheasant",
    "Pig",
    "Pigeon",
    "Pony",
    "Porcupine",
    "Porpoise",
    "Quail",
    "Quelea",
    "Quetzal",
    "Rabbit",
    "Raccoon",
    "Rail",
    "Ram",
    "Rat",
    "Raven",
    "Red deer",
    "Red panda",
    "Reindeer",
    "Rhinoceros",
    "Rook",
    "Salamander",
    "Salmon",
    "Sand Dollar",
    "Sandpiper",
    "Sardine",
    "Scorpion",
    "Seahorse",
    "Seal",
    "Shark",
    "Sheep",
    "Shrew",
    "Skunk",
    "Snail",
    "Snake",
    "Sparrow",
    "Spider",
    "Spoonbill",
    "Squid",
    "Squirrel",
    "Starling",
    "Stingray",
    "Stinkbug",
    "Stork",
    "Swallow",
    "Swan",
    "Tapir",
    "Tarsier",
    "Termite",
    "Tiger",
    "Toad",
    "Trout",
    "Turkey",
    "Turtle",
    "Viper",
    "Vulture",
    "Wallaby",
    "Walrus",
    "Wasp",
    "Weasel",
    "Whale",
    "Wildcat",
    "Wolf",
    "Wolverine",
    "Wombat",
    "Woodcock",
    "Woodpecker",
    "Worm",
    "Wren",
    "Yak",
    "Zebra"
]

let messageID = 0;
let connectedUsers = [];

let notificationId = 0;
let notifications = [];

io.on('connection', (socket) => {
    io.to(socket.id).emit('SCORE_UPDATE', score);
    io.to(socket.id).emit('REHYDRATE_NOTIFICATIONS', notifications);

    connectedUsers[socket.id] = {
        animal: animals[Math.round(Math.random() * animals.length)],
    };

    console.log('a user connected as a ' + connectedUsers[socket.id].animal);

    socket.on('SENT_MESSAGE', (data) => {
        const message = data;
        message.animal = connectedUsers[message.socketId].animal;
        message.id = messageID;
        delete message.socketId;
        messageID += 1;
        console.log('emitting NEW MESSAGE', message);
        socket.broadcast.emit('NEW_MESSAGE', message);
    });

    socket.on('PENALTY_CARD_EMIT', (data) => {
        const message = data;
        console.log('emitting PENALTY CARD', message);
        socket.broadcast.emit('NEW_PENALTY_CARD', message);
    });

    socket.on('NEW_NOTIFICATION', (data) => {
        notificationId += 1;
        const message = data;
        message.id = notificationId;
        message.start = new Date().getTime();
        delete message.socketId;

        notifications.push(message);

        console.log('emitting NOITIFICATIONS', notifications);
        socket.broadcast.emit('NOTIFICATIONS', {
            id: message.id,
            message: message.message,
            minutes: message.minutes,
            start: message.start,
        });
    });

    socket.on('disconnect', () => {
        console.log('Disconnected socket');
        delete connectedUsers[socket.id];
    });
});


setInterval(() => {
    if (Math.random() < 0.5) {
        if (score.team1Score > 5) {
            score.team1Score -= 4;
        } else {
            score.team1Score += 1;
        }
    } else {
        if (score.team2Score > 5) {
            score.team2Score -= 4;
        } else {
            score.team2Score += 1;
        }
    }
    io.emit('SCORE_UPDATE', score);
    console.log('SCORE_UPDATE EMITTED', score);

    for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].start + (notifications[i].minutes * 60000) < new Date().getTime()) {
            notifications.splice(i, 1);
        }
    }
}, 10000);

http.listen(3000, () => {
    console.log('listening on *:3000');
});
