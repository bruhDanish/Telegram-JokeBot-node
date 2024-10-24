const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

// bot.on(/\/start/, (option) => {
//     console.log('message received on bot', option);
//     bot.sendMessage(option.chat.id, 'Hello, I am a bot');
// });  

bot.onText(/\/start/, (option) => {
    console.log('message received on bot', option);
    bot.sendMessage(option.chat.id, 'Hello, write /joke to get a joke');
})

bot.onText(/\/joke/, async (option) => {
    const response = await axios.get('http://www.official-joke-api.appspot.com/jokes/random');
    const setup = response.data.setup;
    const punchline = response.data.punchline;
    bot.sendMessage(option.chat.id, `${setup}\n${punchline}`);
})