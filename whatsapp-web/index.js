const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

// client.on('message', message => {
// 	console.log(message.body);
// });

// Mention contacts that send you a message
client.on('message', async (msg) => {
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    
    await chat.sendMessage(`Olá @${contact.id.user}, tudo bem ?`, {
        mentions: [contact]
    });
});
 
 
client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('pong');
	}
});
 

client.initialize();