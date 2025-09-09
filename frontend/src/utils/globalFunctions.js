globalThis.enToFa = (str) => {
    str = String(str);
    let fa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    let en = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let i = 0; i < 10; i++) {
        str = str.replaceAll(en[i], fa[i]);
    }
    return str;
};

globalThis.faToEn = (str) => {
    str = String(str);
    let fa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    let en = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let i = 0; i < 10; i++) {
        str = str.replaceAll(fa[i], en[i]);
    }
    return str;
};
