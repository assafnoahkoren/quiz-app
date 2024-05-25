import { db } from "../db";

const rootSubject = {
    name: "קלינאות תקשורת",
    Subjects: {
      create: [
        {
          name: "שמיעה",
          Subjects: {
            create: [
              { name: "שתל השבלול" },
              { name: "שיווי משקל" },
              { name: "אודיולוגיה קלינית של התינוק, הילד והמבוגר" },
              { name: "פיזיולוגיה של מערכת השמע" },
              { name: "שיקום שמיעה ומכשירי שמיעה" },
              { name: "אקוסטיקה" },
              { name: "מדע הדיבור" },
              { name: "רעש והשפעתו על האדם" },
            ],
          },
        },
        {
          name: "שפה דיבור ובליעה",
          Subjects: {
            create: [
              { name: "היגוי והפרעות היגוי" },
              { name: "הפרעות קול" },
              { name: "הפרעות בליעה" },
              { name: "הפרעות בשטף הדיבור" },
              { name: "הפרעות מוטוריות" },
              { name: "התפתחות שפה מוקדמת ומאוחרת" },
              { name: "הפרעות שפה" },
              { name: "ליקויי שפה- למידה" },
              { name: "אפזיה" },
              { name: "תקשורת תומכת וחלופית" },
            ],
          },
        },
        {
          name: "כללי",
          Subjects: {
            create: [
              { name: "יחסי מטפל מטופל" },
              { name: "אתיקה מקצועית" },
            ],
          },
        },
      ],
    },
  };



db.subject.create({ data: rootSubject }).then(() => {
  console.log("done");
}).catch((err) => {
  console.log(err);
})