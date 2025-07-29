import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus
  ? [...data.focus].sort((evtA, evtB) => // الحل قمت بنسخ المصفوفة  [...data.focus]
      new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    )
  : [];

 // تصحيح طريقة التحديث التلقائي للشريحة (Slider) كل 5 ثواني
  // الكود الأصلي كان هناك استدعاء .ست تايم اوت. من دون تنظيف يسب تراكم 
// useEffect  هوك في رياكت يستخدم لتنفيذ كود بعد ان يتم عرض مكون او تغير القيمة
  useEffect(() => {
  const timer = setTimeout(() => {
    setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
  }, 5000);

  return () => clearTimeout(timer); // إلغاء المؤقت السابق
}, [index, byDateDesc.length]); // إعادة تشغيل التايمر فقط عندما يتغير index او byDateDesc

 return (
  <div className="SlideCardList">
    {byDateDesc?.map((event, idx) => ( //idx يساوي اندكس رقم العنصر
      <div key={`event-${event.id}-${idx}`}>
        <div
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
        
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>

        <div className="SlideCard__paginationContainer">
          <div className="SlideCard__pagination">
            {byDateDesc.map((_, radioIdx) => ( // radioIdx رقم 
              <input
                key={`radio-${radioIdx}`} // radioIdx رقم الزر داخل كل مجموعة 
                type="radio"
                name={`radio-button-${idx}`}
                checked={index  === radioIdx} // اضافة اندكس هنا لانه رقم الشريحة بينما ايديكس رقم العنصر داخل ماب
                readOnly
              />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

};

export default Slider;
