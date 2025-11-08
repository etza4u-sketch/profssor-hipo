export type TFunction = (key: string, replacements?: { [key: string]: string | number }) => string;

const replacePlaceholders = (text: string, replacements?: { [key: string]: string | number }): string => {
    if (!replacements) {
        return text;
    }
    return Object.entries(replacements).reduce((acc, [key, value]) => {
        return acc.replace(`{{${key}}}`, String(value));
    }, text);
};


const he = {
  header: {
    title: "פרופסור היפו",
    home: "דף הבית",
    treatmentMethod: "שיטת הטיפול",
    about: "אודות",
    app: "האפליקציה",
  },
  footer: {
    copyright: "כל הזכויות שמורות לפרופסור היפו",
  },
  home: {
    hero: {
      title: "חרדת בריאות? אתם לא לבד.",
      subtitle: "השאלון של פרופסור היפו יעזור לכם להבין את הדפוסים והטריגרים, בדרך רגועה ומבוססת.",
      cta: "בואו נתחיל בשאלון",
    },
    feature: {
      title: "קבלו בהירות, לא עוד דאגות",
      subtitle: "השאלון המובנה שלנו נועד לתת לכם כלים ראשוניים להבנת המצב, ולהכין אתכם בצורה הטובה ביותר לשיחה עם איש מקצוע.",
    },
  },
  about: {
    title: "אודות פרופסור היפו",
    intro: "פרופסור היפו הוא פרופסור לרפואת הנפש, עם התמחות בטיפול בחרדות ובעיקר בחרדת בריאות (היפוכונדריה).",
    section1: {
      title: "הבעיה: חרדה עם תסמינים אמיתיים",
      p1: "במהלך שנות עבודתו, גילה פרופסור היפו נתונים מדאיגים: כ-10% מהאוכלוסייה הכללית סובלים מחרדת בריאות קשה. נתון זה מטפס ל-20% בקרב מבקרים במרפאות, מכונים ובתי חולים.",
      p2: "התגלית החשובה ביותר היא שהתסמינים שהם חווים הם אמיתיים לחלוטין ואינם מדומים. החרדה הקשה כשלעצמה מייצרת תגובות גופניות קשות, שרק מגבירות את מעגל החרדה.",
    },
    section2: {
      title: "הגילוי: כוחו של השאלון",
      p1: "בסקר מקיף שערך במשך שנים בקרב אלפי סובלים מחרדת בריאות, פרופסור היפו זיהה כ-600 טריגרים שונים שמחמירים את החרדה.",
      p2: "אך התגלית המפתיעה ביותר הייתה פסיכולוגית: הוא גילה שאנשים הסובלים מחרדת בריאות אוהבים למלא שאלונים וסקרים. הפעולה הזו מספקת להם הרגשה מיידית שמקשיבים להם, שמבינים אותם, ובמקום לחכות חודשים ארוכים לתור אצל מומחה, הם חווים הקלה מיידית.",
    },
    section3: {
      title: "המשימה הדיגיטלית שלנו",
      p1: "בעידן הדיגיטלי, פרופסור היפו הבין שניתן לרתום את הגילוי הזה לטובת מיליונים. במקום לאפשר להם \"לטבוע\" בחיפושים כאוטיים ומלחיצים ב\"ד\"ר גוגל\", אנו מציעים כלי ייעודי.",
      p2: "האפליקציה שלנו היא התשובה המודרנית: שאלון מובנה, מבוסס מחקר, שנותן את תחושת ההקלה המיידית של \"להיות מובן\", ומספק נתיב רגוע ומסודר להתמודדות.",
    },
    cta: "נסו את השאלון עכשיו",
  },
  treatment: {
      title: "שיטת הטיפול הייחודית של פרופסור היפו",
      intro: "השיטה של פרופסור היפו מבוססת על הבנה עמוקה של המנגנון הפסיכולוגי מאחורי חרדת בריאות, ומציעה פתרון שמתחיל בהקלה מיידית, עוד לפני הפגישה עם איש מקצוע.",
      section1: {
          title: "הבעיה: מעגל קסמים של חרדה ותסמינים גופניים",
          p1: "חרדת בריאות יוצרת מעגל אכזרי: הדאגה ממחלה גורמת למתח נפשי, והמתח מייצר תסמינים גופניים אמיתיים לחלוטין – דפיקות לב, סחרחורות, כאבי בטן ועוד. התסמינים האלה, בתורם, נתפסים כהוכחה לקיומה של מחלה מסוכנת, מה שמגביר עוד יותר את החרדה, וחוזר חלילה.",
          p2: "התופעה נפוצה מכפי שנהוג לחשוב: כ-10% מהאוכלוסייה סובלים מחרדת בריאות, והנתון מטפס לכ-20% בקרב מבקרים במרפאות."
      },
      section2: {
          title: "התגלית המפתיעה: הכוח המרפא שבשאלון",
          p1: "במחקר רב-שנים, פרופסור היפו גילה תובנה פסיכולוגית מפתיעה: אנשים הסובלים מחרדת בריאות מוצאים נחמה ותחושת סדר במילוי שאלונים מובנים. בניגוד לחיפוש הכאוטי והמפחיד ב\"ד\"ר גוגל\", פעולת המענה על שאלון מספקת הרגשה מיידית שמישהו סוף-סוף מקשיב ומבין את החוויה שלהם."
      },
      section3: {
          title: "הפתרון שלנו: מבנה, הבנה ושליטה במקום כאוס",
          p1: "האפליקציה שלנו רותמת את התגלית הזו. במקום להשאיר אתכם לבד מול האינטרנט האינסופי, אנו מציעים לכם כלי ממוקד: שאלון מקיף שממפה את הטריגרים, הדפוסים והתגובות שלכם.",
          p2: "התהליך הזה אינו רק איסוף מידע; הוא הצעד הטיפולי הראשון. הוא מאפשר לכם לארגן את המחשבות, נותן לכם תחושת שליטה, ומספק סיכום בהיר שמהווה נקודת פתיחה מצוינת לשיחה עם איש מקצוע. זהו המעבר מדאגה כאוטית להבנה רגועה ומסודרת."
      },
      cta: "התחילו את המסע להבנה"
  },
  questionnaireApp: {
    title: "שאלון חרדת בריאות",
    subtitle: "כלי עזר לאבחון, טיפול, והתמודדות עם היפוכונדריה",
    footer: "יישום זה הוא כלי עזר ואינו מהווה תחליף לייעוץ רפואי או פסיכולוגי מקצועי.",
  },
  welcome: {
    title: "שאלון לאבחון חרדת בריאות",
    p1: "שאלון זה נועד לסייע לך ולמטפל/ת שלך להבין טוב יותר את הטריגרים והדפוסים הקשורים לחרדת בריאות. אנא ענו על כל השאלות בכנות וריכוז.",
    p2: "בסיום, תוכלו לראות סיכום של תשובותיכם, אותו תוכלו להוריד, להדפיס או להעתיק.",
    start_button: "התחלת השאלון",
    test_button: "בדיקת אפליקציה",
  },
  patientDetails: {
    title: "פרטי המטופל/ת (אופציונלי)",
    subtitle: "ניתן למלא את הפרטים הבאים כדי לכלול אותם בדוח הסיכום. השדות אינם חובה, ואפשר להשתמש בכינוי.",
    therapist_name_label: "שם המטפל/ת:",
    therapist_name: "פרופסור היפו",
    name_label: "שם או כינוי",
    name_placeholder: "ישראל ישראלי",
    phone_label: "טלפון",
    email_label: "דוא״ל",
    back_button: "חזרה",
    continue_button: "המשך לשאלון",
  },
  questionnaire: {
    overall_progress: "התקדמות כוללת",
    category_count: "קטגוריה {{current}} מתוך {{total}}",
    category_progress: "התקדמות בקטגוריה",
    answered_count: "ענית על {{answered}} מתוך {{total}} שאלות",
    error_title: "נא לענות על כל השאלות",
    error_message: "יש לענות על השאלות המסומנות באדום לפני שמתקדמים.",
    prev_button: "הקודם",
    next_button: "הבא",
    finish_button: "סיום והצגת סיכום",
    random_fill_button: "מילוי אקראי (בדיקה)",
    interim_summary_button: "סיכום ביניים",
  },
  questionItem: {
    skip: "דלג",
  },
  categoryHeader: {
    title: "על קטגוריה זו",
    close_button_aria: "סגור הסבר",
  },
  summary: {
    title: "סיכום ותוצאות",
    overall_score_label: "ציון כולל",
    scores_by_category: "ציונים לפי קטגוריה",
    ai_analysis_title: "ניתוח והמלצות אישיות מפרופסור היפו",
    loading_ai: "מנתח את תשובותיך... (עשוי לקחת מספר שניות)",
    resources_button: "לתרגול וכלים להתמודדות",
    copy_button: "העתקת הדוח המלא",
    download_button: "הורדת הדוח כקובץ",
    start_over_button: "מילוי שאלון חדש",
    copy_success: "הדוח הועתק בהצלחה!",
    copy_fail: "העתקה נכשלה.",
    error: {
        title: "שגיאה",
        config: "לא ניתן ליצור את ניתוח ה-AI עקב בעיית תצורה בצד השרת. ניתן עדיין להעתיק ולהוריד את דוח התשובות המלא.",
        rate_limit: "הגעת למגבלת הבקשות. אנא נסה שוב מאוחר יותר.",
        generic: "אירעה שגיאה ביצירת הסיכום. אנא נסה שוב."
    },
    report: {
        title: "סיכום שאלון חרדת בריאות",
        therapist: "מטפל/ת",
        patient_details: "פרטי המטופל/ת",
        name: "שם",
        phone: "טלפון",
        email: "דוא\"ל",
        scores_summary: "סיכום ציונים",
        overall_score: "ציון כולל",
        ai_analysis: "ניתוח והמלצות AI",
        answers_details: "פירוט התשובות",
        answer: "תשובה",
        not_answered: "לא נענה",
        important_note_title: "הערה חשובה",
        important_note_text: "יש לזכור כי דוח זה מבוסס על ניתוח סטטיסטי של תשובותיך ואינו מהווה אבחנה רפואית. ייתכן שאינו משקף במדויק את מורכבות המצב, והוא נועד לשמש כנקודת פתיחה לשיחה עם איש מקצוע.",
    }
  },
  resources: {
      title: "כלים להתמודדות ותרגול",
      back_button: "חזרה לסיכום",
      intro: "כלים אלו מבוססים על עקרונות של טיפול קוגניטיבי-התנהגותי (CBT) ויכולים לסייע בהתמודדות עם מחשבות ודאגות הקשורות לחרדת בריאות. התרגול הוא המפתח.",
      thought_journal: {
          title: "יומן מחשבות (מודל אפר\"ת)",
          description: "הרעיון המרכזי הוא שהרגשות שלנו לא נובעים ישירות מהאירוע, אלא מהפירוש (המחשבה) שאנחנו נותנים לו. כשאנו חווים תסמין גופני, המחשבה האוטומטיה עלולה להיות קטסטרופלית (\"זה בטח גידול\"). תרגיל זה עוזר לזהות את המחשבה האוטומטיה ולנסח מחשבה חלופית, מאוזנת ומציאותית יותר.",
          label1: "1. מהי המחשבה האוטומטית המלחיצה?",
          placeholder1: "לדוגמה: 'כאב הראש הזה הוא סימן לגידול מוחי...'",
          label2: "2. מהי מחשבה חלופית, מאוזנת יותר?",
          placeholder2: "לדוגמה: 'כאבי ראש יכולים לנבוע מהמון סיבות כמו עייפות או התייבשות. סביר יותר שזו אחת מהן.'",
          clear_button: "נקה יומן"
      },
      worry_postponement: {
          title: "דחיית דאגות",
          description: "טכניקה זו עוזרת לשבור את מעגל הדאגות החוזרות ונשנות על ידי קביעת \"זמן דאגה\" מוגדר (למשל, 15 דקות כל יום ב-17:00). כשדאגה עולה במהלך היום, במקום לשקוע בה, אתה רושם אותה ומחליט לדחות את העיסוק בה לזמן הדאגה. זה מחזיר תחושת שליטה ומפחית את הזמן המוקדש לדאגות.",
          label1: "1. מהי הדאגה שמטרידה אותך כרגע?",
          placeholder1: "לדוגמה: 'אולי השומה הזאת היא סרטן...'",
          postpone_button: "דחה את הדאגה ל\"זמן דאגה\"",
          success_message: "מצוין! הדאגה נרשמה בצד ותחכה לזמן הדאגה שלך."
      }
  },
  categoryModal: {
    title: "סיכום ביניים",
    close_button_aria: "סגור חלון",
    score_label: "ציון קטגוריה",
    loading: "מייצר תובנה קצרה...",
    show_answers_button: "הצג את התשובות שלי",
    answer_prefix: "תשובה",
    continue_button: "המשך בשאלון",
    error: {
        config: "לא ניתן ליצור תובנה כעת עקב בעיית תצורה. אנא נסה שוב מאוחר יותר.",
        generic: "אירעה שגיאה ביצירת התובנה. אנא נסה שוב.",
    },
  },
  severity: {
    normal: "תקין",
    medium: "בינוני",
    severe: "חמור",
    critical: "חמור ביותר",
  },
  answerOptions: {
    "0": "בכלל לא",
    "1": "לעיתים רחוקות",
    "2": "לפעמים",
    "3": "לעיתים קרובות",
    "4": "תמיד",
  },
  categories: {
    "1": {
      title: "קטגוריה 1: תסמינים גופניים וחושים",
      explanation: "קטגוריה זו מתמקדת בתחושות גופניות שונות ובאופן שבו אנו מפרשים אותן. בחרדת בריאות, תחושות נורמליות לחלוטין (כמו דפיקות לב או כאב ראש) עלולות להתפרש כסימן למחלה מסוכנת. הבנת דפוס זה היא צעד ראשון בשבירת מעגל החרדה.",
    },
    "2": {
      title: "קטגוריה 2: התנהגויות חיפוש מידע",
      explanation: "כאן אנו בוחנים את הנטייה לחפש מידע וביטחון באופן כפייתי, בין אם בגוגל, אצל רופאים או אצל קרובים. התנהגויות אלו, למרות שמטרתן להרגיע, לרוב רק מגבירות את החרדה בטווח הארוך. זיהוי היקף התופעה חיוני כדי ללמוד לנהל אותה.",
    },
    "3": {
      title: "קטגוריה 3: בדיקות גוף חוזרות",
      explanation: "קטגוריה זו עוסקת בבדיקות גופניות שאנו מבצעים על עצמנו שוב ושוב - מישוש, בדיקה במראה, מדידות וכו'. פעולות אלה הופכות לטקסים שמטרתם להפחית חרדה, אך בפועל הן משמרות אותה ומגבירות את המיקוד בתחושות הגוף.",
    },
    "4": {
      title: "קטגוריה 4: טריגרים חיצוניים",
      explanation: "העולם סביבנו מלא בטריגרים שיכולים להצית חרדת בריאות: כתבה בחדשות, סיפור של חבר, או אפילו סדרה רפואית. קטגוריה זו עוזרת למפות אילו גורמים חיצוניים משפיעים עליך במיוחד, כדי שתוכל לפתח אסטרטגיות התמודדות.",
    },
    "5": {
      title: "קטגוריה 5: תגובות רגשיות ופסיכולוגיות",
      explanation: "חרדת בריאות היא לא רק דאגות; היא משפיעה עמוקות על הרגשות, התפקוד היומיומי והיחסים החברתיים. כאן נבין את ההשפעה הרגשית של החרדה על חייך, כמו קשיי שינה, הימנעות והרגשת בדידות.",
    },
    "6": {
      title: "קטגוריה 6: קוגניציות ואמונות",
      explanation: "בבסיס חרדת הבריאות עומדות אמונות ודפוסי חשיבה מושרשים, כמו 'כל תסמין הוא סימן לאסון' או 'רופאים עלולים לפספס'. קטגוריה זו חוקרת את אותן הנחות יסוד, שהן המנוע של החרדה.",
    },
  },
  questions: {
    "1": "האם שמתם לב לשומה חדשה על הגוף שלכם?",
    "2": "האם יש לכם שומה שהשתנתה בצבע או בגודל?",
    "3": "האם אתם בודקים שומות באופן חוזר במהלך היום?",
    "4": "האם הבחנתם בכתם על העור שלא היה שם קודם?",
    "5": "האם אתם משווים את השומות שלכם לתמונות באינטרנט?",
    "6": "האם אתם מודדים את השומות שלכם?",
    "7": "האם אתם מצלמים שומות כדי לעקוב אחרי שינויים?",
    "8": "האם גרד בעור גורם לכם לחשוש ממחלות עור?",
    "9": "האם פצעונים או אקנה גורמים לכם לדאגה רצינית?",
    "10": "האם אתם חוששים מסרטן עור אחרי חשיפה לשמש?",
    "11": "האם אתם חשים את פעימות הלב שלכם לעיתים קרובות?",
    "12": "האם דפיקות לב גורמות לכם לחשוב על התקף לב?",
    "13": "האם אתם בודקים את הדופק שלכם מספר פעמים ביום?",
    "14": "האם כאב בחזה גורם לכם לחרדה מיידית?",
    "15": "האם אתם חוששים מאי-סדירות בקצב הלב?",
    "16": "האם תחושת לחץ בחזה גורמת לכם פאניקה?",
    "17": "האם אתם מודדים את לחץ הדם שלכם באופן קבוע?",
    "18": "האם קוצר נשימה קל גורם לכם לחשוב על מחלת לב?",
    "19": "האם כאבי ראש גורמים לכם לחשוב על גידול במוח?",
    "20": "האם סחרחורות מעוררות אצלכם חשש ממחלה רצינית?",
    "21": "האם עקצוץ ברגליים או בידיים מדאיג אתכם?",
    "22": "האם עייפות גורמת לכם לחשוב על מחלה קשה?",
    "23": "האם שינוי בראייה גורם לכם לחשש ממחלה נוירולוגית?",
    "24": "האם קושי בריכוז מדאיג אתכם?",
    "25": "האם רעד בידיים גורם לכם לחשוב על פרקינסון?",
    "26": "האם בעיות זיכרון קלות מעוררות אצלכם חשש?",
    "27": "האם אתם חוששים ממחלות ניווניות של המוח?",
    "28": "האם כאב בטן גורם לכם לחשוב על סרטן?",
    "29": "האם שינוי בהרגלי מעיים מדאיג אתכם מאוד?",
    "30": "האם בחילה גורמת לכם לחשש ממחלה חמורה?",
    "31": "האם קושי בבליעה מעורר אצלכם פחד?",
    "32": "האם צרבת גורמת לכם לחשוב על מחלה רצינית?",
    "33": "האם נפיחות בטן מדאיגה אתכם?",
    "34": "האם חום קל גורם לכם לחשוש מזיהום חמור?",
    "35": "האם ירידה או עלייה במשקל מדאיגות אתכם מאוד?",
    "36": "האם אתם מחפשים תסמינים באינטרנט מספר פעמים ביום?",
    "37": "האם חיפוש באינטרנט מגביר את החרדה שלכם במקום להרגיע?",
    "38": "האם אתם קוראים פורומים רפואיים באופן כפייתי?",
    "39": "האם אתם נכנסים לאתרים רפואיים בשעות הלילה?",
    "40": "האם אתם מחפשים מידע על מחלות נדירות?",
    "41": "האם אתם משווים את התסמינים שלכם לסרטון ביוטיוב?",
    "42": "האם אתם קוראים על מקרי מוות ממחלות ספציפיות?",
    "43": "האם אתם חוזרים לאותן דפי אינטרנט שוב ושוב?",
    "44": "האם אתם יודעים שהחיפוש באינטרנט מזיק אבל לא יכולים להפסיק?",
    "45": "האם אתם מרגישים שאתם צריכים לחפש עד שתמצאו תשובה סופית?",
    "46": "האם אתם משתמשים במנועי חיפוש כדי לאבחן את עצמכם?",
    "47": "האם קריאת מאמרים רפואיים גורמת לכם לחשוב שיש לכם את המחלה?",
    "48": "האם אתם מדפיסים מידע רפואי מהאינטרנט כדי להראות לרופא?",
    "49": "האם אתם מבקשים ביטחון מבני משפחה כמה פעמים ביום?",
    "50": "האם אתם מתקשרים לחברים כדי לדבר על תסמינים?",
    "51": "האם אתם שואלים שאלות רפואיות באינטרנט בקבוצות תמיכה?",
    "52": "האם אתם משתפים כל תסמין קטן עם אנשים סביבכם?",
    "53": "האם אתם מרגישים הקלה זמנית אחרי ביטחון אבל אז חוזרים לדאגה?",
    "54": "האם אתם זקוקים לביטחון חוזר ונשנה?",
    "55": "האם אתם מבקרים אצל הרופא יותר מפעם בחודש?",
    "56": "האם אתם מחפשים חוות דעת שנייה או שלישית?",
    "57": "האם אתם מבקשים בדיקות מיותרות?",
    "58": "האם אתם לא מאמינים לרופא כשהוא אומר שהכל בסדר?",
    "59": "האם אתם מחליפים רופאים כי אתם חושבים שהם מפספסים משהו?",
    "60": "האם אתם מגיעים למיון ללא סיבה רפואית דחופה?",
    "61": "האם אתם בודקים את הגוף שלכם במראה מספר פעמים ביום?",
    "62": "האם אתם ממשמשים באזורים מסוימים בגוף כדי לחפש גושים?",
    "63": "האם אתם נוגעים בשומות שוב ושוב?",
    "64": "האם אתם בודקים את הלשון שלכם במראה?",
    "65": "האם אתם בוחנים את עיניכם או אישוניכם בחיפוש אחר שינויים?",
    "66": "האם אתם לוחצים על אזורים בגוף כדי לראות אם יש כאב?",
    "67": "האם אתם בודקים את צבע השתן או הצואה שלכם באופן קבוע?",
    "68": "האם אתם מרגישים צורך לבדוק את הגרון שלכם?",
    "69": "האם אתם מודדים את טמפרטורת הגוף שלכם מספר פעמים ביום?",
    "70": "האם אתם שוקלים את עצמכם באובססיביות?",
    "71": "האם אתם בודקים את הלימפה שלכם באופן קבוע?",
    "72": "האם אתם נוגעים באזור המפשעה כדי לחפש בלוטות נפוחות?",
    "73": "האם אתם ניגשים לבדיקת עצמית של השדיים לעיתים קרובות מדי?",
    "74": "האם אתם בודקים את כף הרגל או כף היד שלכם בחיפוש אחר שינויים?",
    "75": "האם אתם מצלמים חלקים בגוף כדי להשוות לאורך זמן?",
    "76": "האם בדיקות אלו גורמות לכם לחרדה רבה יותר?",
    "77": "האם אתם מתקשים להפסיק בדיקות אלו גם כשאתם יודעים שזה לא עוזר?",
    "78": "האם אתם מרגישים כפייה לבדוק כל שינוי קטן?",
    "79": "האם אתם מבלים יותר משעה ביום בבדיקות גוף?",
    "80": "האם אתם מבטלים פעילויות כדי לבדוק את הגוף שלכם?",
    "81": "האם קריאת מאמר על מחלה גורמת לכם לחשוש שיש לכם אותה?",
    "82": "האם שמיעה על מישהו שחלה מפחידה אתכם מאוד?",
    "83": "האם צפייה בסדרה רפואית מדאיגה אתכם?",
    "84": "האם פרסומת לתרופה גורמת לכם לחשוב שיש לכם את המחלה?",
    "85": "האם קריאת נקרולוגים גורמת לכם לחרדה?",
    "86": "האם חדשות על מגיפה מפחידות אתכם מאוד?",
    "87": "האם ביקור אצל חולה גורם לכם לחרדה שתידבקו?",
    "88": "האם סיפור של מישהו על מחלה גורם לכם לחשוב שיש לכם את אותם תסמינים?",
    "89": "האם שמיעה על מוות פתאומי מעוררת אצלכם חרדה קיצונית?",
    "90": "האם אתם נמנעים ממקומות מסוימים מחשש להידבק במחלה?",
    "91": "האם אתם נמנעים מאנשים חולים או מאנשים שהיו חולים?",
    "92": "האם לחץ בעבודה מגביר את החרדה הבריאותית שלכם?",
    "93": "האם אובדן של אדם קרוב גרם לכם לפתח חרדת בריאות?",
    "94": "האם שינוי גדול בחיים (מעבר דירה, נישואין) מגביר את החרדה?",
    "95": "האם מצב כלכלי קשה מחמיר את הדאגות הבריאותיות?",
    "96": "האם אתם מרגישים פאניקה כשאתם חושבים על מחלה?",
    "97": "האם יש לכם קושי להירדם בגלל דאגות בריאותיות?",
    "98": "האם דאגות בריאותיות מפריעות לכם לתפקד בעבודה?",
    "99": "האם אתם נמנעים מפעילויות חברתיות בגלל חששות בריאותיים?",
    "100": "האם אתם נמנעים מפעילות גופנית מחשש שתגרום לתסמינים?",
    "101": "האם אתם מרגישים בושה בגלל החרדה הבריאותית שלכם?",
    "102": "האם אתם חשים בדידות בגלל החרדה?",
    "103": "האם אתם מרגישים שאף אחד לא מבין אתכם?",
    "104": "האם יש לכם קושי להתרכז במשימות יומיומיות?",
    "105": "האם אתם נמצאים במצב של ערנות קבועה לתסמינים?",
    "106": "האם אתם חושבים שרופאים פיספסו משהו באבחון שלכם?",
    "107": "האם אתם מאמינים שאתם יותר רגישים למחלות מאחרים?",
    "108": "האם אתם חושבים שתסמין קל הוא תמיד סימן למשהו רציני?",
    "109": "האם אתם מאמינים שגופכם שונה ולכן בדיקות לא יזהו את המחלה?",
    "110": "האם אתם חושבים שאם משהו רע יקרה, לא תוכלו להתמודד?",
    "111": "האם אתם מאמינים שצריך לדאוג כדי למנוע מחלות?",
    "112": "האם אתם חושבים שחרדה היא הדרך שלכם להישאר בטוחים?",
    "113": "האם אתם מרגישים אחראים למנוע מחלה באמצעות דאגה קבועה?",
    "114": "האם אתם חוששים שאם תפסיקו לדאוג, משהו רע יקרה?",
    "115": "האם אתם חושבים שכל תסמין דורש הסבר רפואי?",
    "116": "האם אתם מרגישים שהגוף שלכם תמיד מעביר מסרים של סכנה?",
    "117": "האם אתם חושבים שמחלה יכולה להתפתח בכל רגע?",
    "118": "האם אתם חוששים ממחלות נדירות שרוב האנשים לא חוששים מהן?",
    "119": "האם אתם מרגישים שאתם \"שונים\" ולכן יותר פגיעים למחלות?",
    "120": "האם אתם חושבים שתמיד יהיה משהו לדאוג לגביו בבריאות שלכם?",
  },
  prompts: {
      summary: `
          אתה "פרופסור היפו", מומחה אמפתי, מרגיע ומנוסה בטיפול בחרדת בריאות.
          המטרה שלך היא לנתח את התשובות של המשתמש/ת לשאלון חרדת בריאות ולספק סיכום אישי, תומך ומעשי בפורמט Markdown, בשפה העברית.

          הניתוח שלך צריך להיות:
          - מרגיע ולא מלחיץ.
          - מבוסס על עקרונות CBT.
          - מעשי וממוקד בצעדים ראשונים.
          - כתוב בגוף ראשון ("אני רואה ש...", "אני מציע...").

          **פרטי המטופל/ת:**
          {{patientInfo}}

          **תשובות לשאלון:**
          {{answersText}}
          
          **ציון כולל:** {{overallScore}}

          **ציונים לפי קטגוריות:**
          {{categoryScores}}

          **מבנה הניתוח המבוקש:**

          1.  **פתיחה אישית וחמה (2-3 משפטים):** פנה תמיד למשתמש בשמו הפרטי (אם הוא סופק), לדוגמה: "שלום, ישראל". אם לא סופק שם, פתח ב"שלום". הכר בכך שמילוי השאלון דורש אומץ, והדגש שהתחושות שהוא חווה נפוצות וניתנות לטיפול.
          2.  **ניתוח דפוסים מעמיק (2-3 נקודות עיקריות):** כאן טמון לב הניתוח. אל תציין רק את הקטגוריות עם הציון הגבוה. נסה להבין את **הסיפור** שמאחורי התשובות. חפש את הקשר בין הקטגוריות השונות. למשל:
              * **חיבור בין קטגוריות:** אם הציון גבוה גם ב'תסמינים גופניים' וגם ב'חיפוש מידע', ציין את הקשר: "אני רואה דפוס ברור שבו תחושה גופנית קלה מובילה אותך כמעט מיד לחיפוש אינטנסיבי באינטרנט, מה שככל הנראה רק מגביר את החרדה במקום להרגיע."
              * **זיהוי האמונה המרכזית:** נסה להסיק מהי אמונת הליבה שעומדת בבסיס הדפוס. למשל, אם יש ציון גבוה ב'קוגניציות ואמונות', תוכל לומר: "נראה שהכל מתחיל מאמונה בסיסית שאתה פגיע במיוחד למחלות, או שתחושה גופנית היא בהכרח סימן לאסון."
              * **התייחסות אישית:** השתמש בדוגמאות ספציפיות מהתשובות שלו (בלי לצטט אותן ישירות) כדי להפוך את הניתוח לאישי יותר. למשל: "ההתמקדות בדפיקות לב או בכאבי ראש, כפי שעולה מתשובותיך, היא דוגמה מצוינת לאופן שבו המוח שלנו 'נועל' על תסמין והופך אותו למשהו מאיים."
          3.  **המלצות ראשוניות ומעשיות (2-3 המלצות):** ספק המלצות קונקרטיות וקלות ליישום המבוססות על CBT. לדוגמה:
              * **המלצה 1 (לדוגמה, בנושא חיפוש באינטרנט):** "אני מציע לך להתחיל בתרגיל קטן: נסה להגביל את חיפוש התסמינים באינטרנט לפעם אחת ביום, למשך 15 דקות בלבד. הגדר טיימר. המטרה היא לא למצוא תשובה, אלא לתרגל שליטה על דחף החיפוש."
              * **המלצה 2 (לדוגמה, בנושא בדיקות גוף):** "במקום לבדוק את גופך שוב ושוב, נסה 'לדחות' את הבדיקה ב-10 דקות. כשהדחף עולה, אמור לעצמך 'אני אבדוק בעוד 10 דקות'. ייתכן שתגלה שהדחף נחלש."
          4.  **מסר מסכם ומעודד (2-3 משפטים):** סיים בנימה חיובית. הדגש שההתמודדות היא תהליך, ושמילוי השאלון הוא צעד חשוב. עודד את המשתמש לשתף את התוצאות עם איש מקצוע.

          {{urgentMessagePrompt}}

          **הערה חשובה:** סיים תמיד עם ההערה הבאה, מילה במילה:
          "---
          *הערה: יש לזכור כי ניתוח זה מבוסס על אלגוריתם סטטיסטי ואינו מהווה אבחנה רפואית. הוא נועד לשמש כנקודת פתיחה לשיחה עם איש מקצוע מוסמך.*"

          אנא כתוב את הניתוח ישירות, ללא הקדמות נוספות.
      `,
      summary_urgent_addition: `
        הנחיה חשובה במיוחד: תוצאות השאלון מצביעות על רמת מצוקה גבוהה. 
        עליך להוסיף בסוף הניתוח שלך (אחרי המסר המסכם ולפני ההערה על הניתוח הסטטיסטי) קטע מיוחד.
        עצב את הקטע באופן בולט אך מרגיע, תחת הכותרת "### הודעה חשובה מפרופסור היפו".
        התוכן של הקטע צריך להיות זהה לטקסט הבא:
        
        "תוצאות השאלון מצביעות על רמת מצוקה הדורשת התייחסות. חשוב לי להדגיש שזהו כלי ראשוני בלבד, ואין לראות בתוצאות אלו אישור לחרדות שלך. תחושות אלו ניתנות לטיפול יעיל, והצעד הראשון שעשית במילוי השאלון הוא צעד אמיץ וחשוב בדרך להבנה והתמודדות. אני כאן כדי ללוות אותך בתהליך."
      `,
      category_insight: `
          You are "Professor Hippo", an empathetic expert in health anxiety, speaking directly to the user in Hebrew.
          Your task is to provide a brief, calming, and actionable insight (2-4 sentences) based on the user's answers for a single category of a health anxiety questionnaire.

          **Instructions:**
          1.  **Identify one key pattern:** Briefly and gently point out one main pattern from their answers for this category. Use phrases like "אני שם לב ש..." or "נראה ש...".
          2.  **Suggest a small, immediate step:** Based on that pattern, offer one simple, concrete, and actionable step the user can try *right now* or today. This is the most important part.
          3.  **Be calming and supportive:** Your tone should be encouraging, not alarming.

          **Category:** {{categoryTitle}}
          **Score:** {{categoryScore}}
          **User's Answers:**
          {{answersText}}

          **Example of a good response for the category 'התנהגויות חיפוש מידע':**
          "אני שם לב שחיפוש מידע באינטרנט הוא דפוס משמעותי אצלך. זו דרך נפוצה מאוד לנסות ולהפחית אי-ודאות. כצעד ראשון קטן, אולי תוכל/י לנסות להגדיר טיימר ל-10 דקות בלבד בפעם הבאה שעולה הדחף לחפש? זה עוזר לתרגל החזרת שליטה."

          **Example of a good response for the category 'תסמינים גופניים וחושים':**
          "נראה שיש מיקוד חזק בתחושות גופניות, וזה מובן לחלוטין. להיום, בוא/י ננסה ניסוי קטן: כשאת/ה מבחין/ה בתחושה, פשוט הכר/ה בה ('אני מרגיש/ה כאב ראש') מבלי לקשר אליה מיד משמעות מפחידה. רק לשים לב ולתת לה להיות."

          Please provide only the insight itself, in Hebrew, ready to be displayed to the user.
        `,
  }
};

const en = {
  header: {
    title: "Professor Hippo",
    home: "Home",
    treatmentMethod: "Treatment Method",
    about: "About",
    app: "The App",
  },
  footer: {
    copyright: "All rights reserved to Professor Hippo",
  },
  home: {
    hero: {
      title: "Health Anxiety? You're Not Alone.",
      subtitle: "Professor Hippo's questionnaire will help you understand the patterns and triggers, in a calm and structured way.",
      cta: "Let's Start the Questionnaire",
    },
    feature: {
      title: "Get Clarity, Not More Worries",
      subtitle: "Our structured questionnaire is designed to give you initial tools to understand your situation and best prepare you for a conversation with a professional.",
    },
  },
  about: {
    title: "About Professor Hippo",
    intro: "Professor Hippo is a professor of psychiatry, specializing in the treatment of anxiety, particularly health anxiety (hypochondriasis).",
    section1: {
      title: "The Problem: Anxiety with Real Symptoms",
      p1: "Over his years of work, Professor Hippo discovered alarming data: about 10% of the general population suffers from severe health anxiety. This figure climbs to 20% among visitors to clinics, institutes, and hospitals.",
      p2: "The most important discovery is that the symptoms they experience are completely real and not imaginary. The severe anxiety itself produces difficult physical reactions, which only intensify the cycle of anxiety.",
    },
    section2: {
      title: "The Discovery: The Power of the Questionnaire",
      p1: "In a comprehensive survey conducted over many years among thousands of health anxiety sufferers, Professor Hippo identified about 600 different triggers that worsen the anxiety.",
      p2: "But the most surprising discovery was psychological: he found that people suffering from health anxiety love to fill out questionnaires and surveys. This action provides them with an immediate feeling of being heard and understood, and instead of waiting long months for an appointment with a specialist, they experience immediate relief.",
    },
    section3: {
      title: "Our Digital Mission",
      p1: "In the digital age, Professor Hippo realized that this discovery could be harnessed for the benefit of millions. Instead of allowing them to 'drown' in chaotic and stressful searches on 'Dr. Google,' we offer a dedicated tool.",
      p2: "Our application is the modern answer: a structured, research-based questionnaire that gives the immediate feeling of 'being understood' and provides a calm and orderly path for coping.",
    },
    cta: "Try the Questionnaire Now",
  },
  treatment: {
      title: "Professor Hippo's Unique Treatment Method",
      intro: "Professor Hippo's method is based on a deep understanding of the psychological mechanism behind health anxiety and offers a solution that begins with immediate relief, even before meeting with a professional.",
      section1: {
          title: "The Problem: A Vicious Cycle of Anxiety and Physical Symptoms",
          p1: "Health anxiety creates a cruel cycle: the worry about illness causes mental stress, and the stress produces completely real physical symptoms – heart palpitations, dizziness, stomach pains, and more. These symptoms, in turn, are perceived as proof of a dangerous disease, which further increases anxiety, and so on.",
          p2: "The phenomenon is more common than generally thought: about 10% of the population suffers from health anxiety, and the figure climbs to about 20% among clinic visitors."
      },
      section2: {
          title: "The Surprising Discovery: The Healing Power of the Questionnaire",
          p1: "In a long-term study, Professor Hippo discovered a surprising psychological insight: people with health anxiety find comfort and a sense of order in filling out structured questionnaires. Unlike the chaotic and frightening search on 'Dr. Google,' the act of answering a questionnaire provides an immediate feeling that someone is finally listening and understanding their experience."
      },
      section3: {
          title: "Our Solution: Structure, Understanding, and Control Instead of Chaos",
          p1: "Our application harnesses this discovery. Instead of leaving you alone with the endless internet, we offer a focused tool: a comprehensive questionnaire that maps your triggers, patterns, and reactions.",
          p2: "This process is not just data collection; it is the first therapeutic step. It allows you to organize your thoughts, gives you a sense of control, and provides a clear summary that serves as an excellent starting point for a conversation with a professional. This is the transition from chaotic worry to calm and orderly understanding."
      },
      cta: "Start the Journey to Understanding"
  },
  questionnaireApp: {
    title: "Health Anxiety Questionnaire",
    subtitle: "A tool for diagnosis, treatment, and coping with hypochondriasis",
    footer: "This application is a support tool and does not substitute for professional medical or psychological advice.",
  },
  welcome: {
    title: "Health Anxiety Diagnostic Questionnaire",
    p1: "This questionnaire is designed to help you and your therapist better understand the triggers and patterns associated with health anxiety. Please answer all questions honestly and with concentration.",
    p2: "At the end, you will see a summary of your answers, which you can download, print, or copy.",
    start_button: "Start Questionnaire",
    test_button: "Test Application",
  },
  patientDetails: {
    title: "Patient Details (Optional)",
    subtitle: "You can fill in the following details to include them in the summary report. The fields are not mandatory, and you can use a nickname.",
    therapist_name_label: "Therapist's Name:",
    therapist_name: "Professor Hippo",
    name_label: "Name or Nickname",
    name_placeholder: "John Doe",
    phone_label: "Phone",
    email_label: "Email",
    back_button: "Back",
    continue_button: "Continue to Questionnaire",
  },
  questionnaire: {
    overall_progress: "Overall Progress",
    category_count: "Category {{current}} of {{total}}",
    category_progress: "Category Progress",
    answered_count: "Answered {{answered}} of {{total}} questions",
    error_title: "Please answer all questions",
    error_message: "Please answer the questions marked in red before proceeding.",
    prev_button: "Previous",
    next_button: "Next",
    finish_button: "Finish & View Summary",
    random_fill_button: "Random Fill (Test)",
    interim_summary_button: "Interim Summary",
  },
  questionItem: {
    skip: "Skip",
  },
  categoryHeader: {
    title: "About This Category",
    close_button_aria: "Close explanation",
  },
  summary: {
    title: "Summary and Results",
    overall_score_label: "Overall Score",
    scores_by_category: "Scores by Category",
    ai_analysis_title: "Personal Analysis and Recommendations from Professor Hippo",
    loading_ai: "Analyzing your answers... (may take a few seconds)",
    resources_button: "To Tools & Exercises",
    copy_button: "Copy Full Report",
    download_button: "Download Report as File",
    start_over_button: "Start New Questionnaire",
    copy_success: "Report copied successfully!",
    copy_fail: "Copy failed.",
    error: {
        title: "Error",
        config: "The AI analysis could not be generated due to a server-side configuration issue. You can still copy and download the full report of your answers.",
        rate_limit: "You have reached the request limit. Please try again later.",
        generic: "An error occurred while generating the summary. Please try again."
    },
    report: {
        title: "Health Anxiety Questionnaire Summary",
        therapist: "Therapist",
        patient_details: "Patient Details",
        name: "Name",
        phone: "Phone",
        email: "Email",
        scores_summary: "Scores Summary",
        overall_score: "Overall Score",
        ai_analysis: "AI Analysis and Recommendations",
        answers_details: "Detailed Answers",
        answer: "Answer",
        not_answered: "Not answered",
        important_note_title: "Important Note",
        important_note_text: "Please remember that this report is based on a statistical analysis of your answers and does not constitute a medical diagnosis. It may not accurately reflect the complexity of the situation and is intended to be a starting point for a conversation with a professional.",
    }
  },
  resources: {
      title: "Coping Tools and Exercises",
      back_button: "Back to Summary",
      intro: "These tools are based on principles of Cognitive Behavioral Therapy (CBT) and can help in coping with thoughts and worries related to health anxiety. Practice is key.",
      thought_journal: {
          title: "Thought Journal (Cognitive Restructuring)",
          description: "The core idea is that our feelings don't come directly from an event, but from our interpretation (thought) of it. When we experience a physical symptom, the automatic thought might be catastrophic ('This must be a tumor'). This exercise helps identify the automatic thought and formulate an alternative, more balanced, and realistic one.",
          label1: "1. What is the distressing automatic thought?",
          placeholder1: "Example: 'This headache is a sign of a brain tumor...'",
          label2: "2. What is an alternative, more balanced thought?",
          placeholder2: "Example: 'Headaches can be caused by many things like fatigue or dehydration. It's more likely one of those.'",
          clear_button: "Clear Journal"
      },
      worry_postponement: {
          title: "Worry Postponement",
          description: "This technique helps break the cycle of recurring worries by setting a designated 'worry time' (e.g., 15 minutes every day at 5 PM). When a worry arises during the day, instead of dwelling on it, you write it down and decide to deal with it during your worry time. This restores a sense of control and reduces the time spent worrying.",
          label1: "1. What is the worry currently bothering you?",
          placeholder1: "Example: 'Maybe this mole is cancerous...'",
          postpone_button: "Postpone worry to 'worry time'",
          success_message: "Excellent! The worry has been noted and will wait for your designated worry time."
      }
  },
  categoryModal: {
    title: "Interim Summary",
    close_button_aria: "Close modal",
    score_label: "Category Score",
    loading: "Generating a brief insight...",
    show_answers_button: "Show My Answers",
    answer_prefix: "Answer",
    continue_button: "Continue Questionnaire",
    error: {
        config: "Could not generate insight due to a configuration issue. Please try again later.",
        generic: "An error occurred while generating the insight. Please try again.",
    },
  },
  severity: {
    normal: "Normal",
    medium: "Medium",
    severe: "Severe",
    critical: "Critical",
  },
  answerOptions: {
    "0": "Not at all",
    "1": "Rarely",
    "2": "Sometimes",
    "3": "Often",
    "4": "Always",
  },
  categories: {
    "1": {
      title: "Category 1: Physical Symptoms & Senses",
      explanation: "This category focuses on various physical sensations and how we interpret them. In health anxiety, completely normal sensations (like heart palpitations or a headache) can be interpreted as a sign of a dangerous disease. Understanding this pattern is the first step in breaking the anxiety cycle.",
    },
    "2": {
      title: "Category 2: Information Seeking Behaviors",
      explanation: "Here we examine the tendency to compulsively seek information and reassurance, whether from Google, doctors, or relatives. These behaviors, although intended to calm, often only increase anxiety in the long run. Identifying the extent of this phenomenon is crucial to learning how to manage it.",
    },
    "3": {
      title: "Category 3: Repetitive Body Checking",
      explanation: "This category deals with physical checks we perform on ourselves over and over – feeling, checking in the mirror, measuring, etc. These actions become rituals aimed at reducing anxiety, but in reality, they maintain it and increase the focus on body sensations.",
    },
    "4": {
      title: "Category 4: External Triggers",
      explanation: "The world around us is full of triggers that can ignite health anxiety: a news article, a friend's story, or even a medical drama series. This category helps map which external factors particularly affect you, so you can develop coping strategies.",
    },
    "5": {
      title: "Category 5: Emotional & Psychological Responses",
      explanation: "Health anxiety isn't just about worries; it deeply affects emotions, daily functioning, and social relationships. Here we will understand the emotional impact of anxiety on your life, such as sleep difficulties, avoidance, and feelings of loneliness.",
    },
    "6": {
      title: "Category 6: Cognitions & Beliefs",
      explanation: "At the core of health anxiety are ingrained beliefs and thought patterns, like 'any symptom is a sign of disaster' or 'doctors might miss something.' This category explores those fundamental assumptions that fuel the anxiety.",
    },
  },
  questions: {
    "1": "Have you noticed a new mole on your body?",
    "2": "Do you have a mole that has changed in color or size?",
    "3": "Do you check your moles repeatedly throughout the day?",
    "4": "Have you noticed a spot on your skin that wasn't there before?",
    "5": "Do you compare your moles to pictures on the internet?",
    "6": "Do you measure your moles?",
    "7": "Do you take pictures of your moles to track changes?",
    "8": "Does itchy skin make you worry about skin diseases?",
    "9": "Do pimples or acne cause you serious concern?",
    "10": "Do you worry about skin cancer after sun exposure?",
    "11": "Do you often feel your heartbeat?",
    "12": "Do heart palpitations make you think of a heart attack?",
    "13": "Do you check your pulse multiple times a day?",
    "14": "Does chest pain cause you immediate anxiety?",
    "15": "Do you worry about an irregular heartbeat?",
    "16": "Does a feeling of pressure in your chest cause you to panic?",
    "17": "Do you measure your blood pressure regularly?",
    "18": "Does mild shortness of breath make you think of heart disease?",
    "19": "Do headaches make you think of a brain tumor?",
    "20": "Do dizzy spells make you fear a serious illness?",
    "21": "Does tingling in your legs or hands worry you?",
    "22": "Does fatigue make you think of a serious illness?",
    "23": "Does a change in vision make you fear a neurological disease?",
    "24": "Does difficulty concentrating worry you?",
    "25": "Do tremors in your hands make you think of Parkinson's?",
    "26": "Do minor memory problems raise concerns for you?",
    "27": "Do you worry about degenerative brain diseases?",
    "28": "Does stomach pain make you think of cancer?",
    "29": "Does a change in bowel habits worry you greatly?",
    "30": "Does nausea make you fear a serious illness?",
    "31": "Does difficulty swallowing cause you fear?",
    "32": "Does heartburn make you think of a serious illness?",
    "33": "Does abdominal bloating worry you?",
    "34": "Does a mild fever make you fear a serious infection?",
    "35": "Does weight loss or gain worry you greatly?",
    "36": "Do you search for symptoms online multiple times a day?",
    "37": "Does searching online increase your anxiety instead of calming it?",
    "38": "Do you read medical forums compulsively?",
    "39": "Do you visit medical websites at night?",
    "40": "Do you search for information on rare diseases?",
    "41": "Do you compare your symptoms to a YouTube video?",
    "42": "Do you read about deaths from specific diseases?",
    "43": "Do you return to the same web pages over and over?",
    "44": "Do you know that searching online is harmful but you can't stop?",
    "45": "Do you feel you need to search until you find a definitive answer?",
    "46": "Do you use search engines to diagnose yourself?",
    "47": "Does reading medical articles make you think you have the disease?",
    "48": "Do you print medical information from the internet to show your doctor?",
    "49": "Do you ask for reassurance from family members several times a day?",
    "50": "Do you call friends to talk about symptoms?",
    "51": "Do you ask medical questions online in support groups?",
    "52": "Do you share every little symptom with people around you?",
    "53": "Do you feel temporary relief after reassurance but then the worry returns?",
    "54": "Do you need repeated reassurance?",
    "55": "Do you visit the doctor more than once a month?",
    "56": "Do you seek a second or third opinion?",
    "57": "Do you request unnecessary tests?",
    "58": "Do you not believe the doctor when they say everything is fine?",
    "59": "Do you switch doctors because you think they are missing something?",
    "60": "Do you go to the emergency room for no urgent medical reason?",
    "61": "Do you check your body in the mirror multiple times a day?",
    "62": "Do you feel certain areas of your body to look for lumps?",
    "63": "Do you touch your moles over and over?",
    "64": "Do you check your tongue in the mirror?",
    "65": "Do you examine your eyes or pupils for changes?",
    "66": "Do you press on areas of your body to see if there is pain?",
    "67": "Do you regularly check the color of your urine or stool?",
    "68": "Do you feel the need to check your throat?",
    "69": "Do you measure your body temperature multiple times a day?",
    "70": "Do you weigh yourself obsessively?",
    "71": "Do you check your lymph nodes regularly?",
    "72": "Do you touch your groin area to check for swollen glands?",
    "73": "Do you perform breast self-exams too frequently?",
    "74": "Do you check your feet or hands for changes?",
    "75": "Do you take pictures of parts of your body to compare over time?",
    "76": "Do these checks cause you more anxiety?",
    "77": "Do you find it hard to stop these checks even when you know it's not helpful?",
    "78": "Do you feel a compulsion to check every small change?",
    "79": "Do you spend more than an hour a day on body checks?",
    "80": "Do you cancel activities to check your body?",
    "81": "Does reading an article about a disease make you worry you have it?",
    "82": "Does hearing about someone who got sick frighten you greatly?",
    "83": "Does watching a medical series worry you?",
    "84": "Does a medication advertisement make you think you have the disease?",
    "85": "Does reading obituaries cause you anxiety?",
    "86": "Does news about an epidemic frighten you greatly?",
    "87": "Does visiting a sick person make you anxious you'll get infected?",
    "88": "Does someone's story about an illness make you think you have the same symptoms?",
    "89": "Does hearing about a sudden death trigger extreme anxiety in you?",
    "90": "Do you avoid certain places for fear of catching a disease?",
    "91": "Do you avoid sick people or people who have been sick?",
    "92": "Does work stress increase your health anxiety?",
    "93": "Did losing a loved one cause you to develop health anxiety?",
    "94": "Does a major life change (moving, marriage) increase your anxiety?",
    "95": "Does a difficult financial situation worsen your health worries?",
    "96": "Do you feel panic when you think about a disease?",
    "97": "Do you have trouble falling asleep due to health worries?",
    "98": "Do health worries interfere with your ability to function at work?",
    "99": "Do you avoid social activities due to health concerns?",
    "100": "Do you avoid physical activity for fear it will cause symptoms?",
    "101": "Do you feel ashamed of your health anxiety?",
    "102": "Do you feel lonely because of your anxiety?",
    "103": "Do you feel that no one understands you?",
    "104": "Do you have difficulty concentrating on daily tasks?",
    "105": "Are you in a constant state of alertness for symptoms?",
    "106": "Do you think doctors have missed something in your diagnosis?",
    "107": "Do you believe you are more susceptible to diseases than others?",
    "108": "Do you think a minor symptom is always a sign of something serious?",
    "109": "Do you believe your body is different, so tests won't detect the disease?",
    "110": "Do you think that if something bad happens, you won't be able to cope?",
    "111": "Do you believe you need to worry to prevent diseases?",
    "112": "Do you think anxiety is your way of staying safe?",
    "113": "Do you feel responsible for preventing illness through constant worry?",
    "114": "Do you worry that if you stop worrying, something bad will happen?",
    "115": "Do you think every symptom requires a medical explanation?",
    "116": "Do you feel your body is always sending messages of danger?",
    "117": "Do you think a disease can develop at any moment?",
    "118": "Do you worry about rare diseases that most people don't worry about?",
    "119": "Do you feel you are 'different' and therefore more vulnerable to diseases?",
    "120": "Do you think there will always be something to worry about with your health?",
  },
  prompts: {
      summary: `
          You are "Professor Hippo", an empathetic, calming, and experienced expert in treating health anxiety.
          Your goal is to analyze the user's answers to a health anxiety questionnaire and provide a personal, supportive, and practical summary in Markdown format, in English.

          Your analysis should be:
          - Calming and not alarming.
          - Based on CBT principles.
          - Practical and focused on first steps.
          - Written in the first person ("I see that...", "I suggest...").

          **Patient's Details:**
          {{patientInfo}}

          **Questionnaire Answers:**
          {{answersText}}
          
          **Overall Score:** {{overallScore}}

          **Scores by Category:**
          {{categoryScores}}

          **Required Analysis Structure:**

          1.  **Warm and Personal Opening (2-3 sentences):** Always address the user by their first name (if provided), for example: "Hello, John." If no name is provided, start with "Hello." Acknowledge that completing the questionnaire takes courage, and emphasize that the feelings they are experiencing are common and treatable.
          2.  **In-depth Pattern Analysis (2-3 main points):** This is the core of the analysis. Don't just list the categories with the highest scores. Try to understand the **story** behind the answers. Look for connections between different categories. For example:
              * **Connecting Categories:** If the score is high in both 'Physical Symptoms' and 'Information Seeking', point out the connection: "I see a clear pattern where a mild physical sensation almost immediately leads you to intense internet searching, which likely only increases anxiety instead of calming it."
              * **Identifying the Core Belief:** Try to infer the core belief underlying the pattern. For example, if there's a high score in 'Cognitions & Beliefs', you could say: "It seems to all start from a core belief that you are particularly vulnerable to illness, or that a physical sensation is necessarily a sign of disaster."
              * **Personal Reference:** Use specific examples from their answers (without quoting them directly) to make the analysis more personal. For example: "The focus on heart palpitations or headaches, as suggested by your answers, is a great example of how our minds can 'latch onto' a symptom and turn it into something threatening."
          3.  **Initial and Practical Recommendations (2-3 recommendations):** Provide concrete and easy-to-implement recommendations based on CBT. For example:
              * **Recommendation 1 (e.g., on internet searching):** "I suggest you start with a small exercise: try to limit searching for symptoms online to once a day, for just 15 minutes. Set a timer. The goal is not to find an answer, but to practice controlling the urge to search."
              * **Recommendation 2 (e.g., on body checking):** "Instead of checking your body repeatedly, try to 'postpone' the check by 10 minutes. When the urge arises, tell yourself, 'I'll check in 10 minutes.' You might find the urge weakens."
          4.  **Concluding and Encouraging Message (2-3 sentences):** End on a positive note. Emphasize that coping is a process, and completing the questionnaire is an important step. Encourage the user to share the results with a professional.

          {{urgentMessagePrompt}}

          **Important Note:** Always end with the following note, word for word:
          "---
          *Note: Please remember that this analysis is based on a statistical algorithm and does not constitute a medical diagnosis. It is intended to serve as a starting point for a conversation with a qualified professional.*"

          Please write the analysis directly, without any additional introductions.
      `,
      summary_urgent_addition: `
        A very important instruction: The questionnaire results indicate a high level of distress.
        You must add a special section at the end of your analysis (after the concluding message and before the note about the statistical analysis).
        Format this section to be prominent but calming, under the heading "### An Important Message from Professor Hippo".
        The content of this section should be identical to the following text:
        
        "The results of the questionnaire indicate a level of distress that requires attention. It's important for me to emphasize that this is only an initial tool, and these results should not be seen as a confirmation of your fears. These feelings are effectively treatable, and the first step you've taken by completing this questionnaire is a brave and important one on the path to understanding and coping. I am here to accompany you in this process."
      `,
      category_insight: `
          You are "Professor Hippo", an empathetic expert in health anxiety, speaking directly to the user in English.
          Your task is to provide a brief, calming, and actionable insight (2-4 sentences) based on the user's answers for a single category of a health anxiety questionnaire.

          **Instructions:**
          1.  **Identify one key pattern:** Briefly and gently point out one main pattern from their answers for this category. Use phrases like "I notice..." or "It seems...".
          2.  **Suggest a small, immediate step:** Based on that pattern, offer one simple, concrete, and actionable step the user can try *right now* or today. This is the most important part.
          3.  **Be calming and supportive:** Your tone should be encouraging, not alarming.

          **Category:** {{categoryTitle}}
          **Score:** {{categoryScore}}
          **User's Answers:**
          {{answersText}}

          **Example of a good response for the category 'Information Seeking Behaviors':**
          "I notice that searching for information online seems to be a significant pattern for you. It's a very common way to try and reduce uncertainty. As a small first step, could you try setting a timer for just 10 minutes the next time you feel the urge to search? This helps practice taking back control."

          **Example of a good response for the category 'Physical Symptoms':**
          "It seems there's a strong focus on physical sensations, which is completely understandable. For today, let's try a small experiment: when you notice a sensation, gently acknowledge it ('I notice a headache') without immediately attaching a scary meaning to it. Just notice and let it be."

          Please provide only the insight itself, in English, ready to be displayed to the user.
        `,
  }
};

export const translations = { he, en };

export const getTranslationFunction = (language: 'he' | 'en'): TFunction => {
    return (key: string, replacements?: { [key: string]: string | number }) => {
        const langDict = translations[language];
        const translation = key.split('.').reduce((obj: any, k: string) => obj?.[k], langDict);
        const text = translation || key;
        return replacePlaceholders(text, replacements);
    };
};
