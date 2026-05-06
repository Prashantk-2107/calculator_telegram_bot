import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { checkValidation } from "./services.js";
import { evaluate } from "mathjs";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("Welcome to Calculator Bot!");
});

bot.command("help", (ctx) => {
  ctx.reply("Use buttons below to perform calculations");
});

bot.command("add", (ctx) => {
  const text = ctx.message.text.split(" ").splice(1);

  const check = checkValidation(text);
  //check whether min 2 numbers is provided
  if (check.isValid == false) {
    ctx.reply(check.message);
    return;
  }
  const result = text.reduce((acc, num) => acc + Number(num), 0);
  ctx.reply(`The sum of ${text.join(", ")} is ${result}`);
});

bot.command("sub", (ctx) => {
  const text = ctx.message.text.split(" ").splice(1);

  const check = checkValidation(text);
  //check whether min 2 numbers is provided
  if (check.isValid == false) {
    ctx.reply(check.message);
    return;
  }
  const result = text.map(Number).reduce((acc, num) => acc - num);
  ctx.reply(`The difference of ${text.join(", ")} is ${result}`);
});

bot.command("mul", (ctx) => {
  const text = ctx.message.text.split(" ").splice(1);

  const check = checkValidation(text);
  //check whether min 2 numbers is provided
  if (check.isValid == false) {
    ctx.reply(check.message);
    return;
  }
  const result = text.map(Number).reduce((acc, num) => acc * num);
  ctx.reply(`The product of ${text.join(", ")} is ${result}`);
});

bot.command("div", (ctx) => {
  const text = ctx.message.text.split(" ").splice(1);

  const check = checkValidation(text);
  //check whether min 2 numbers is provided
  if (check.isValid == false) {
    ctx.reply(check.message);
    return;
  }
  const result = text.map(Number).reduce((acc, num) => acc / num);
  ctx.reply(`The division of ${text.join(", ")} is ${result}`);
});

bot.on("text", (ctx) => {
  try {
    const expression = ctx.message.text;

    // ⚠️ basic safety check
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
      ctx.reply("Invalid expression ❌");
      return;
    }

    const result = evaluate(expression);
    ctx.reply(`Result: ${result}`);
  } catch (err) {
    ctx.reply("Invalid expression ❌");
  }
});

bot.launch();

console.log("Bot started successfully");
