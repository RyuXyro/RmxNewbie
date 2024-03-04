const { Bot, webhookCallback } = require("grammy");
const { token } = require('./config.json');
const { bot_developer } = require('./config.json'); // bot developer id
const { bot_dev_username } = require('./config.json'); // bot developer username
const { bot_channel_log } = require('./config.json'); // channel log
const { badword } = require('./data.json'); // some badword
const client = new Bot(token);
if (!token) throw new Error("BOT_TOKEN is unset");


const log_1 = `
| ======== [Bot Is Ready] ======== |
|                                  |
|          KazuoYuuka_Bot          |
|                                  |
|                                  |
| type /help - to see all command  |
| -------------------------------- |
|                                  |
|                                  |
| v1.0.0 Beta                      |
|                                  |
| by KazuoYuuka                    |
|                                  |
| ================================ |
`

client.use(async (ctx, next) => {
  ctx.config = {
    botDeveloper: bot_developer,
    isDeveloper: ctx.from?.id === bot_developer
  };
  await next();
});

client.hears("p", async (ctx) => {
  if (ctx.config.isDeveloper) {
    await ctx.reply("Hello Master!", {
      reply_parameters: {
        message_id: ctx.msg.message_id
      }
    })
  }
});

client.command("start", async (ctx) => {
  const au = ctx.getAuthor();
  await ctx.reply(`Welcome Back @${(await (au)).user.username}!!`, {
    reply_parameters: { message_id: ctx.msg.message_id },
  })
});

client.command("help", async (ctx) => {
  await ctx.reply(`
    Available Command:\n\n/start - start the bot\n/help - show this message\n/ping - ping the bot\n/info - see info about your self\n/groupinfo - see info about the group\n/aboutbot - see information about the bot
    `, {
    reply_parameters: { message_id: ctx.msg.message_id },
  })
});

client.command('info', async (ctx) => {
  const au = ctx.getAuthor();
  await ctx.reply(`
  Info\nID: ${(await (au)).user.id}\nUsername: @${(await (au)).user.username}\nFirst Name: ${(await (au)).user.first_name}\nLast Name: ${(await (au)).user.last_name}\nIs Bot: ${(await (au)).user.is_bot}\nStatus: ${(await (au)).status}\nIs Anonymous: ${(await (au)).is_anonymous}
  `)
  console.log(au)
});

client.command('aboutbot', async (ctx) => {
  const meu = ctx.me.username;
  const mei = ctx.me.id;
  const mef = ctx.me.first_name;
  const mejg = ctx.me.can_join_groups;
  const merlg = ctx.me.can_read_all_group_messages;
  const melc = ctx.me.language_code;
  const au = ctx.getAuthor();
  await ctx.reply(`
  Hello...\nHere's some information about meee\n\nUserName: @${meu}\nID: ${mei}\nName: ${mef}\n\n--Setting--\nCan Join Group: ${mejg}\nCan Read All Message: ${merlg}\nLanguage: ${melc}\nBot Owner: ${bot_dev_username}\n\nNice to Meet you @${(await au).user.username}
  `)
})

client.command('groupinfo', async (ctx) => {
  const c = ctx.getChat();
  try {
    await ctx.reply(`
    About The Channel\n\nName: ${(await c).title}\nID: ${(await c).id}\nBio: ${(await c).description}\nLink: ${(await c).invite_link}
    `)
  } catch (err) {
    await ctx.reply('This command only used in channel')
  }
});

client.command("ping", async (ctx) => {
  const c = ctx.getChat();
  await ctx.reply(`Pong...`);
});

client.hears(badword, async (ctx) => {
  const au = ctx.getAuthor();
  const c = ctx.getChat();
  const ci = ctx.msg.chat.id;
  const message = await client.api.sendMessage(bot_channel_log, `BadWord:\n\nChatID: ${ci}\nfrom UserName: @${(await (au)).user.username}\nUserID: ${(await (au)).user.id}\nLink: ${(await c).invite_link}`);
  console.log(message)
})


client.start(
  console.log(log_1),
  client.api.sendMessage(bot_channel_log, `Bot is online\n${log_1}`)
);

export default webhookCallback(client, "http");

