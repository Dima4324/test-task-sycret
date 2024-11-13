import { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import { CertCard } from "../../components/CertCard/CertCard";
import { useSelector } from "react-redux";
import { getCertificateList } from "../../api/get-certificate-list";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const [certsArr, setCertsArr] = useState([]);
  const priceSelect = useSelector((certificate) => certificate.PRICE);
  const [activeId, setActiveId] = useState(null);

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/form");
  };

  useEffect(() => {
    getCertificateList(setCertsArr);
  }, []);

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>
        Ознакомьтесь с нашими сертификатами и выберите подходящий
      </h2>
      <ul className={styles.certsList}>
        {certsArr.length > 0 &&
          certsArr.map((cert) => (
            <CertCard
              key={cert.ID}
              cert={cert}
              id={cert.ID}
              isActive={cert.ID === activeId}
              setActiveId={setActiveId}
            />
          ))}
      </ul>
      {priceSelect && (
        <div className={styles.cartContainer}>
          <p className={styles.cartPrice}>{Math.floor(priceSelect)} рублей</p>
          <div className={styles.imgCircle}>
            <img
              src="/imgs/cart_8t6kp9u3x5i4.svg"
              alt="корзина"
              className={styles.cartImg}
              onClick={handleRedirect}
            />
          </div>
        </div>
      )}
    </main>
  );
};
