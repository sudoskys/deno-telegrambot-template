
import { EXPIRE_SHOW } from "./constv.ts";

abstract class BaseLocales {
    abstract verify_join: string;
    abstract invite_group: string;
    abstract expired_join: string;
    abstract join_check_toggle: string;
    abstract anti_spam_toggle: string;
}

class EnLocales extends BaseLocales {
    verify_join = `Click the button below to prove you are not a robot, it will be expired in ${EXPIRE_SHOW}. If you think it's too difficult, you can try using the mobile app.`;
    invite_group = "You can invite me to your group by clicking the button below, btw I need some permissions to work properly.";
    expired_join = "Your join request is expired, so I rejected it.";
    join_check_toggle = "Now I will check new members' bio for ads and promotions. You can add extra appeal guide to prevent false positives.";
    anti_spam_toggle = "Now I will check new messages for spam and ads, I will just delete them and mute for 2 minutes.";
}

class ZhLocales extends BaseLocales {
    verify_join = `点击下方按钮证明你不是机器人，否则 ${EXPIRE_SHOW} 后您的加入请求会被自动拒绝。如果你认为验证太难，可以在 Telegram APP 一键验证。`;
    invite_group = "你可以通过点击下方按钮邀请我加入你的群组，顺便我需要一些权限才能正常工作。";
    expired_join = "您的加入请求已经过期，所以我拒绝了它。";
    join_check_toggle = "现在我会检查新成员的简介是否包含广告和推广内容。您可以额外添加申诉指引防范误判。";
    anti_spam_toggle = "现在我会检查新消息是否包含冒犯内容，我会删除它们并禁言 2 分钟。";
}

class RuLocales extends BaseLocales {
    verify_join = `Нажмите кнопку ниже, чтобы доказать, что вы не робот, она истекает через ${EXPIRE_SHOW}. Если вы считаете, что это слишком сложно, вы можете попробовать использовать мобильное приложение.`;
    invite_group = "Вы можете пригласить меня в свою группу, нажав на кнопку ниже, кстати, мне нужны некоторые разрешения, чтобы работать правильно.";
    expired_join = "Ваш запрос на вступление истек, поэтому я его отклонил.";
    join_check_toggle = "Теперь я буду проверять биографии новых участников на наличие рекламы и продвижения. Вы можете добавить дополнительное руководство по обращению, чтобы предотвратить ложные срабатывания.";
    anti_spam_toggle = "Теперь я буду проверять новые сообщения на спам и рекламу, я просто удалю их и замучу на 2 минуты.";
}

class EsLocales extends BaseLocales {
    verify_join = `Haga clic en el botón de abajo para demostrar que no es un robot, expirará en ${EXPIRE_SHOW}. Si cree que es demasiado difícil, puede intentar usar la aplicación móvil.`;
    invite_group = "Puedes invitarme a tu grupo haciendo clic en el botón de abajo, por cierto, necesito algunos permisos para funcionar correctamente.";
    expired_join = "Su solicitud de unirse ha expirado, por lo que la rechacé.";
    join_check_toggle = "Ahora revisaré la biografía de los nuevos miembros en busca de anuncios y promociones. Puede agregar una guía de apelación adicional para evitar falsos positivos.";
    anti_spam_toggle = "Ahora revisaré los nuevos mensajes en busca de spam y anuncios, simplemente los eliminaré y los silenciaré durante 2 minutos.";
}

class ArLocales extends BaseLocales {
    verify_join = `انقر على الزر أدناه لإثبات أنك لست روبوتًا ، سينتهي الأمر في ${EXPIRE_SHOW}. إذا كنت تعتقد أنه صعب جدًا ، يمكنك محاولة استخدام تطبيق الجوال.`;
    invite_group = "يمكنك دعوتي إلى مجموعتك عن طريق النقر على الزر أدناه ، على الجانب الآخر ، أحتاج إلى بعض الأذونات للعمل بشكل صحيح.";
    expired_join = "انتهت صلاحية طلب الانضمام الخاص بك ، لذلك رفضته.";
    join_check_toggle = "الآن سأقوم بفحص سيرة الأعضاء الجدد للبحث عن الإعلانات والترويج. يمكنك إضافة دليل استئناف إضافي لتجنب الإيجابيات الكاذبة.";
    anti_spam_toggle = "الآن سأقوم بفحص الرسائل الجديدة للبحث عن الرسائل غير المرغوب فيها والإعلانات ، سأقوم فقط بحذفها وكتمها لمدة 2 دقيقة.";
}
const langMap: { [key: string]: BaseLocales } = {
    "en": new EnLocales(),
    "zh": new ZhLocales(),
    "ru": new RuLocales(),
    "es": new EsLocales(),
    "ar": new ArLocales()
};

export const t = function (language: string, onlyPrefix: boolean = false): BaseLocales {
    if (!language) {
        return new EnLocales();
    }
    language = language.toLowerCase();
    if (language in langMap) {
        return langMap[language];
    }
    if (language.includes("-") && onlyPrefix) {
        language = language.split("-")[0];
    }
    for (const lang in langMap) {
        if (language.startsWith(lang)) {
            return langMap[lang];
        }
    }
    return new EnLocales();
}