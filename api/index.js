const { Bot, webhookCallback } = require("grammy");
export default webhookCallback(client, "http");


const { token } = require('./config.json');
const bot_developer = require('./config.json'); // bot developer id
const { badword } = require('./data.json');

const client = new Bot(token);
client.use(async (ctx, next) => {
  ctx.config = {
    botDeveloper: bot_developer,
    isDeveloper: ctx.from?.id === bot_developer,
    isDeveloper: true
  };
  await next();
});

client.command("start", async (ctx) => {
  if (ctx.config.isDeveloper) {
    await ctx.reply("Welcome Kazuo!!");
  } else {
    await ctx.reply('Hello user')
  }
});
client.command("help", async (ctx) => {
  if (ctx.config.isDeveloper) {
    await ctx.reply(`/start\n/help`)
  } else {
    ctx.reply("Soon available for user")
  }
})

// client.command()

client.command("ping", async (ctx) => {
  await ctx.reply("pong", {
    reply_parameters: { message_id: ctx.msg.message_id },
  });
});

client.hears(badword, async (ctx) => {
  const au = ctx.getAuthor();
  await ctx.reply("Don't say that uhhhh")
  console.log(au)
})


client.command('info', async (ctx) => {
  const au = ctx.getAuthor();
  await ctx.reply(`
  Info\n
  ID: ${(await (au)).user.id}
  Username: @${(await (au)).user.username}
  First Name: ${(await (au)).user.first_name}
  Last Name: ${(await (au)).user.last_name}
  Is Bot: ${(await (au)).user.is_bot}
  Status: ${(await (au)).status}
  Is Anonymous: ${(await (au)).is_anonymous}
  `)
  console.log(au)
})

client.start(
  console.log(`
  | ====== [Bot is ready] ====== |
  |                              |
  |      KazuoYuuka_Bot v1       |
  |                              |
  | ---------------------------- |
  |                              |
  | by KazuoYuuka                |
  |                              |
  | ============================ |
  `)
);

