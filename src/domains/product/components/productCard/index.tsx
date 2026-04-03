import Image from "next/image";
import Link from "next/link";

import { FavoriteToggle } from "@/domains/store/favorites/components/FavoriteToggle";
import { TProductCard } from "@/shared/types/common";
import { cn } from "@/shared/utils/styling";

function resolveProductCardId(productId: string | undefined, url: string): string | null {
  if (productId) return productId;
  const match = url.match(/\/product\/([^/?#]+)/);
  return match?.[1] ?? null;
}

const ProductCard = ({
  name,
  imgUrl,
  price,
  dealPrice = undefined,
  specs,
  url,
  isAvailable = true,
  productId: productIdProp,
  staticWidth = false,
}: TProductCard) => {
  const favoriteProductId = resolveProductCardId(productIdProp, url);

  return (
    <div
      className={cn(
        "relative rounded-xl bg-white p-2 transition-all duration-500 hover:drop-shadow-sm hover:[&_.imageWrapper>img:last-child]:opacity-100 hover:[&_.imageWrapper>img:last-child]:scale-[1.05]",
        staticWidth && "min-w-64"
      )}
    >
      <Link href={url} className="block">
        {!isAvailable && (
          <div className="absolute left-2 right-2 top-2 z-[1] flex bottom-2 items-center justify-center rounded-lg bg-white/40 backdrop-blur-[1px]">
            <span className="mt-14 rounded-md bg-black/60 px-6 py-1 font-light text-gray-100 shadow-gray-200 backdrop-blur-[6px]">
              Out of Stock
            </span>
          </div>
        )}
        <div className="imageWrapper relative block h-[225px] w-full overflow-hidden rounded-xl border border-gray-200 transition-all duration-500 hover:border-gray-300">
          <Image
            src={imgUrl[0]}
            alt={name}
            fill
            sizes="(max-width: 240px)"
            className="object-contain transition-all duration-400 ease-out"
          />
          <Image
            src={imgUrl[1]}
            alt={name}
            fill
            sizes="(max-width: 240px)"
            className="scale-[0.9] object-contain opacity-0 transition-all duration-400 ease-out"
          />
        </div>
        <span className="mb-2 ml-2 mt-2.5 inline-block text-gray-800">{name}</span>
        <div className="flex h-16 flex-col">
          {specs.map((spec, index) => (
            <span key={index} className="ml-2 block text-sm text-gray-600">
              {spec}
            </span>
          ))}
        </div>
        <div className="ml-2 mt-6 flex h-10 items-center pr-11">
          <div className="relative flex-grow">
            {dealPrice ? (
              <>
                <div className="absolute -top-6 flex h-5 w-48 justify-start">
                  <span className="block rounded-sm bg-red-200 px-2 pt-[1px] text-sm font-medium text-red-800">
                    -
                    {(100 - (dealPrice / price) * 100).toLocaleString("en-us", {
                      maximumFractionDigits: 0,
                    })}
                    %
                  </span>
                  <span className="ml-2 block w-full text-sm text-gray-700 line-through">
                    was {price.toLocaleString("en-us", { minimumFractionDigits: 2 })}€
                  </span>
                </div>
                <span className="text-lg font-medium text-gray-800">
                  {dealPrice.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                  })}
                  €
                </span>
              </>
            ) : (
              <span className="text-lg font-medium text-gray-800">
                {price.toLocaleString("en-us", { minimumFractionDigits: 2 })}€
              </span>
            )}
          </div>
        </div>
      </Link>
      {favoriteProductId ? (
        <div className="absolute bottom-3 right-2 z-[2]">
          <FavoriteToggle productId={favoriteProductId} iconWidth={20} />
        </div>
      ) : null}
    </div>
  );
};

export default ProductCard;
