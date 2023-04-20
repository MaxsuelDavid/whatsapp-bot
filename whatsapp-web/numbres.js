const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Cliente pronto');
});

client.on('message', async (msg) => {
  if (msg.body === 'oi') {
    const menu = `Olá, escolha uma opção:
    1. Você é incrível!
    2. Não desista, você consegue!
    3. O sucesso está chegando!
    `;

    await client.sendMessage(msg.from, menu);
  }
});

client.initialize();

async function sendMessages(numbers) {
  for (const number of numbers) {
    const chat = await client.getChatById(`${number}@c.us`);
    await chat.sendMessage('oi');
  }
}

// Lista de números para enviar mensagem
const numbers = ['5511999999999', '5521988888888'];

sendMessages(numbers);