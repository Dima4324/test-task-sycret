import { useDispatch } from "react-redux";
import styles from "./CertCard.module.css";
import { setCertificate } from "../../store/actions/set-certificate";
import { useState } from "react";

export const CertCard = ({ cert, id, isActive, setActiveId }) => {
  const dispatch = useDispatch();
  const [isChoose, setIsChoose] = useState(false);

  const handleCertCard = (certificate, id) => {
    dispatch(setCertificate(certificate));
    setIsChoose(!isChoose);
    setActiveId(id);
  };

  return (
    <li className={`${styles.certContainer} ${isActive && styles.choosedCard}`} onClick={() => handleCertCard(cert, id)}>
      <div className={styles.priceRectangle}>
        <p className={styles.price}>{Math.floor(cert.PRICE)} рублей</p>
      </div>
      <div className={styles.certInfo}>
        <p>{cert.NAME}</p>
        <p>Скидка: {Math.floor(cert.DISCOUNT)}%</p>
        <p>Стоимость: {Math.floor(cert.SUMMA)} рублей</p>
      </div>
    </li>
  );
};
