export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

export const getMonth = (date) => MONTHS[date.getMonth() + 1];
// مشكلة التواريخ تظهر بشكل غير صحيح أو فارغ
//date.getMonth() يرجع رقم الشهر من 0 إلى 11.
//بإضافة +1، يصبح من 1 إلى 12، وهو ما يتوافق مع مفاتيح كائن ...MONTHS