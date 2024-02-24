import Image from "next/image";
import Link from "next/link";
import styles from "./productCard.module.scss";
import { TProductCard } from "@/types/common";

const ProductCard = ({
  name,
  imgUrl,
  price,
  dealPrice = undefined,
  specs,
  url,
  isAvailable = true,
  staticWidth = false,
}: TProductCard) => {
  return (
    <div
      className={`${styles.productCard} ${staticWidth && styles.staticWidth} `}
    >
      {!isAvailable && (
        <div className={styles.outOfStock}>
          <span> Out of Stock</span>
        </div>
      )}
      <Link href={url} className={styles.imageWrapper}>
        <Image
          src={"/images/products/" + imgUrl[0]}
          alt={name}
          fill
          sizes="(max-width: 240px)"
        />
        <Image
          src={"/images/products/" + imgUrl[1]}
          alt={name}
          fill
          sizes="(max-width: 240px)"
        />
      </Link>
      <Link href={url}>
        <span>{name}</span>
      </Link>
      <div className={styles.specWrapper}>
        {specs.map((spec, index) => (
          <span key={index}>{spec}</span>
        ))}
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.priceWrapper}>
          {dealPrice ? (
            <>
              <div className={styles.oldPrice}>
                <span>
                  -
                  {(100 - (dealPrice / price) * 100).toLocaleString("en-us", {
                    maximumFractionDigits: 0,
                  })}
                  %
                </span>
                <span>
                  was{" "}
                  {price.toLocaleString("en-us", { minimumFractionDigits: 2 })}€
                </span>
              </div>
              <span className={styles.mainPrice}>
                {dealPrice.toLocaleString("en-us", {
                  minimumFractionDigits: 2,
                })}
                €
              </span>
            </>
          ) : (
            <span className={styles.mainPrice}>
              {price.toLocaleString("en-us", { minimumFractionDigits: 2 })}€
            </span>
          )}
        </div>
        <div className={styles.basketWrapper}>
          <button className={styles.addFavorite} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
