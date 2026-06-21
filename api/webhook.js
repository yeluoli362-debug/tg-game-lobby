import { Telegraf } from 'telegraf';

const botToken = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL || 'https://your-domain.vercel.app';

export default async function handler(req, res) {
  if (!botToken) {
    return res.status(500).json({ error: 'BOT_TOKEN is not configured' });
  }

  const bot = new Telegraf(botToken);

  bot.start((ctx) => {
    ctx.reply('欢迎来到游戏大厅！🎮\n点击下方按钮开始游玩。', {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🎲 打开游戏大厅', web_app: { url: webAppUrl } }]
        ]
      }
    });
  });

  try {
    if (req.method === 'POST') {
      await bot.handleUpdate(req.body);
      return res.status(200).send('OK');
    } else {
      return res.status(200).json({ status: 'ok', message: 'Webhook endpoint is active. Set this URL in Telegram API.' });
    }
  } catch (error) {
    console.error('Error handling update:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
