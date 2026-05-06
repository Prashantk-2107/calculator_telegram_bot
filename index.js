import { Telegraf,Markup } from "telegraf";
import dotenv from "dotenv";
import { checkValidation } from "./services.js";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
let currentOperation;
bot.start((ctx)=>{
  ctx.reply("Welcome to Calculator Bot!");
  ctx.reply("Use buttons below to perform calculations");
  ctx.reply(
    "Choose operation 👇",
    Markup.keyboard([
      ["/add", "/sub"],
      ["/mul", "/div"]
    ]).resize()
  );
})

bot.command("add",(ctx)=>{
    currentOperation = "add";
    ctx.reply("Enter numbers to add");
})

bot.command("sub",(ctx)=>{
    currentOperation = "sub";
    ctx.reply("Enter numbers to subtract");
})

bot.command("mul",(ctx)=>{
    currentOperation = "mul";
    ctx.reply("Enter numbers to multiply");
})

bot.command("div",(ctx)=>{
    currentOperation = "div";
    ctx.reply("Enter numbers to divide");
})

bot.on("text",(ctx)=>{
    const text = ctx.message.text.split(" ");

    const {isValid,message} = checkValidation(text);
    if(!isValid){
        ctx.reply(message);
        return;
    }

    switch(currentOperation){
        case "add":
            const addResult = text.reduce((acc,curr)=>{
                return Number(acc)+Number(curr)
            })
            ctx.reply(`Result: ${addResult}`);
            break;
        
        case "sub":
            const subResult = text.reduce((acc,curr)=>{
                return Number(acc)-Number(curr)
            })
            ctx.reply(`Result: ${subResult}`);
            break;
        
        case "mul":
            console.log("array", text);
            const mulResult = text.reduce((acc,curr)=>{
                return Number(acc)*Number(curr)
            },1)
            console.log("mulResult",mulResult)
            ctx.reply(`Result: ${mulResult}`);
            break;
        
        case "div":
            const divResult = text.reduce((acc,curr)=>{
                return Number(acc)/Number(curr)
            })
            ctx.reply(`Result: ${divResult}`);
            break;
        
    }

})

bot.launch();

console.log("Bot started successfully");
