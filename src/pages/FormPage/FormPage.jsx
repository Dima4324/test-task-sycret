import { useState } from "react";
import styles from "./FormPage.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSale } from "../../api/create-sale";

export const FormPage = () => {
  const [inputsValue, setinputsValue] = useState({
    name: "",
    phone: "",
    message: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    status: true,
    name: "",
    phone: "",
    email: "",
    requestError: "",
  });
  const certificate = useSelector((certificate) => certificate);
  const navigate = useNavigate();

  function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 2) return "+7";
    if (phoneNumberLength < 5) return `+7 (${phoneNumber.slice(1)}`;
    if (phoneNumberLength < 8)
      return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`;
    if (phoneNumberLength < 10)
      return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(
        4,
        7
      )}-${phoneNumber.slice(7)}`;
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(
      4,
      7
    )}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`;
  }

  const handleChange = (e) => {
    if (e.target.name === "phone") {
      const formattedPhone = formatPhoneNumber(e.target.value);
      setinputsValue({ ...inputsValue, [e.target.name]: formattedPhone });
      return;
    }
    setinputsValue({ ...inputsValue, [e.target.name]: e.target.value });
  };

  function getCleanPhoneNumber(phone) {
    const digitsOnly = phone.replace(/[^\d]/g, "");
    return digitsOnly.startsWith("7") ? digitsOnly.slice(1) : digitsOnly;
  }

  const validate = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value) error = "Имя не может быть пустым!";
        break;
      case "phone":
        if (!value) {
          error = "Телефон не может быть пустым!";
        } else if (!/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(value)) {
          error = "Неверный формат телефона!";
        }
        break;
      case "email":
        if (!value) {
          error = "Email не может быть пустым!";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Неверный формат email!";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleButton = () => {
    let formIsValid = true;
    Object.keys(inputsValue).forEach((field) => {
      const error = validate(field, inputsValue[field]);
      if (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: error,
          status: true,
        }));
        formIsValid = false;
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "",
          status: false,
        }));
      }
    });

    if (formIsValid) {
      const cleanNumber = getCleanPhoneNumber(inputsValue.phone);

      const requestData = {
        ...certificate,
        ClientName: inputsValue.name,
        Phone: cleanNumber,
        Email: inputsValue.email,
        PaymentTypeId: 2,
        UseDelivery: 0,
      };

      createSale(requestData)
        .then(() => {
            // setErrors({
            //     ...errors,
            //     requestError: "",
            //   })
            navigate("/paying")
        })
        .catch(() =>
          setErrors({
            ...errors,
            requestError: "Ошибка отправки данных, попробуйте отправить позже",
          })
        );
    }
  };

  return (
    <main className={styles.formPage}>
      <p>{certificate.NAME}</p>
      <form
        className={styles.form}
        onSubmit={(e) => e.preventDefault()}
      >
        <label>
          <span>ФИО *</span>
          <input
            placeholder="Введите..."
            type="text"
            name="name"
            value={inputsValue.name}
            onChange={handleChange}
          />
          {errors.status && <span>{errors.name}</span>}
        </label>
        <label>
          <span>Телефон *</span>
          <input
            type="tel"
            name="phone"
            value={inputsValue.phone}
            onChange={handleChange}
            placeholder="+7 (___) ___-__-__"
          />
          {errors.status && <span>{errors.phone}</span>}
        </label>
        <label>
          <span>Сообщение </span>
          <textarea
            rows="3"
            placeholder="Введите..."
            type="text"
            name="message"
            value={inputsValue.message}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          <span>Почта *</span>
          <input
            placeholder="Введите..."
            type="email"
            name="email"
            value={inputsValue.email}
            onChange={handleChange}
          />
          {errors.status && <span>{errors.email}</span>}
        </label>
        <button onClick={handleButton}>Отправить</button>
        {errors.requestError && <span>{errors.requestError}</span>}
        <button onClick={() => navigate(-1)}>Назад</button>
      </form>
    </main>
  );
};
