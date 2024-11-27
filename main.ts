import { Bot, CommandContext, Context, GrammyError, HttpError } from "https://deno.land/x/grammy@v1.32.0/mod.ts";
import { Logger } from "jsr:@deno-library/logger";
// import { I18n, I18nFlavor } from "https://deno.land/x/grammy_i18n@v1.1.0/mod.ts";
import convert from 'npm:telegramify-markdown';
import { t } from "./locales.ts";
const logger = new Logger();
await logger.initFileLogger("../log");
const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
if (!botToken) {
    console.error("Please specify your bot token in the environment variable TELEGRAM_BOT_TOKEN.");
    Deno.exit(1);
}
const bot = new Bot(botToken);

const dispatchBasicInfo = (ctx: CommandContext<Context>) => {
    const chatId = ctx.chat.id;
    const userId = ctx.from?.id;
    const languageCode = ctx.from?.language_code || "en";
    const fullName = ctx.from?.first_name ? `${ctx.from?.first_name} ${ctx.from?.last_name}` : ctx.from?.last_name;
    const chatTitle = ctx.chat.title;
    return {
        chatId,
        userId,
        languageCode,
        fullName,
        chatTitle,
    };
}

bot.command("start", (ctx) => {
    const { chatId, userId, languageCode, fullName } = dispatchBasicInfo(ctx);
    const botUsername = bot.botInfo?.username;
    const inviteLink = `https://t.me/${botUsername}?startgroup&admin=can_invite_users+restrict_members+delete_messages`;
    logger.info(`start:${userId}:${chatId} --name ${fullName} --lang ${languageCode}`);
    ctx.reply(
        convert(
            `${t(languageCode).invite_group}`,
            "escape"
        ),
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Invite me to your group", url: inviteLink }],
                ],
            },
            parse_mode: "MarkdownV2"
        }
    )
});
bot.on("message", (ctx) => ctx.reply("Got another message!"));
bot.api.getMe().then((me) => console.log(`Bot @${me.username} is up and running!`));
bot.catch((err) => {
    const ctx = err.ctx;
    logger.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        logger.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        logger.error("Could not contact Telegram:", e);
    } else {
        logger.error("Unknown error:", e);
    }
});
bot.start();
