import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

// تصحيح زر الاتصال
// sendContact دالة ارسال فورم
// useCallback هوك في راكت يُستخدم لحفظ دالة حتى لا تُعاد كتابتها في كل مرة يُعاد فيها التصيير

 const sendContact = useCallback(
  async (evt) => {
    evt.preventDefault();        // يمنع تحديث الصفحة
    setSending(true);            // يعرض "En cours"

    try {
      await mockContactApi();    // تجربة الاتصال بالخادم
      setSending(false);         // يعيد الزر لحالته الأصلية
      onSuccess();               // *الحل هنا *ينادي الدالة التي تم تمريرها كمُعالج للنجاح
    } catch (err) {
      setSending(false);         // يعيد الزر لحالته الأصلية
      onError(err);              // ينادي الدالة التي تم تمريرها كمُعالج للخطأ
    }
  },
  [onSuccess, onError]
);

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
