import { Telegraf, Markup, session } from "telegraf";
import dotenv from "dotenv";
import { checkValidation, calculateResult } from "./services.js";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Use session to store data per user
bot.use(session());

bot.start((ctx) => {
    ctx.session = ctx.session || {};
    ctx.reply("Welcome to Calculator Bot!", Markup.inlineKeyboard([
        [Markup.button.callback(" Add", "add"), Markup.button.callback(" Subtract", "sub")],
        [Markup.button.callback(" Multiply", "mul"), Markup.button.callback("Divide", "div")]
    ]));
});

bot.command("stop", (ctx) => {
    ctx.reply("👋 Bot stopped. Type /start to begin again.");
    bot.stop();
});

const setupAction = (actionName, prompt) => {
    bot.action(actionName, (ctx) => {
        ctx.session = ctx.session || {};
        ctx.session.currentOperation = actionName;
        ctx.reply(`${prompt}`);
    });
};

setupAction("add", "Enter numbers to add (e.g., 10 20)");
setupAction("sub", "Enter numbers to subtract (e.g., 50 10)");
setupAction("mul", "Enter numbers to multiply (e.g., 5 4)");
setupAction("div", "Enter numbers to divide (e.g., 100 2)");

bot.on("text", (ctx) => {
    const operation = ctx.session?.currentOperation;

    if (!operation) {
        return ctx.reply("⚠️ Please choose an operation first using /start");
    }

    const textArray = ctx.message.text.trim().split(/\s+/);
    const { isValid, message } = checkValidation(textArray);

    if (!isValid) {
        return ctx.reply(message);
    }

    const { result, error } = calculateResult(operation, textArray);

    if (error) {
        return ctx.reply(`❌ Error: ${error}`);
    }

    ctx.reply(`Result: ${result}`, Markup.inlineKeyboard([
        [Markup.button.callback("New Calculation", "start_over")]
    ]));
});

bot.action("start_over", (ctx) => {
    ctx.session.currentOperation = null;
    ctx.reply("Choose operation", Markup.inlineKeyboard([
        [Markup.button.callback("Add", "add"), Markup.button.callback("Subtract", "sub")],
        [Markup.button.callback("Multiply", "mul"), Markup.button.callback("Divide", "div")]
    ]));
});

bot.launch();
console.log("Calculator Bot is running...");

console.log("Bot started successfully");
