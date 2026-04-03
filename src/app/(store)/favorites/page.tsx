"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getFavoriteProducts } from "@/actions/product/product";
import ProductCard from "@/domains/product/components/productCard";
import Button from "@/shared/components/UI/button";
import { IMAGE_BASE_URL } from "@/shared/constants/store";
import type { RootState } from "@/store/shoppingCart";

type TFavoriteRow = {
  id: string;
  name: string;
  images: string[];
  price: number;
  salePrice: number | null;
  specialFeatures: string[];
  isAvailable: boolean;
};

const FavoritesPage = () => {
  const favoriteIds = useSelector((s: RootState) => s.favorites.ids);
  const [products, setProducts] = useState<TFavoriteRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (favoriteIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const response = await getFavoriteProducts(favoriteIds);
      if (cancelled) return;
      if (response.error || !response.res) {
        setProducts([]);
      } else {
        const byId = new Map(response.res.map((p) => [p.id, p]));
        const ordered = favoriteIds.map((id) => byId.get(id)).filter((p): p is NonNullable<typeof p> => Boolean(p));
        setProducts(ordered);
      }
      setLoading(false);
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [favoriteIds]);

  return (
    <div className="mt-[136px] w-full min-h-[60vh] bg-white pb-24">
      <div className="storeContainer flex w-full max-w-full flex-col pt-8">
        <div className="mb-8 flex w-full flex-col gap-2 border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-light text-gray-900">Favorites</h1>
          <p className="text-sm text-gray-500">Products you have saved for later.</p>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : favoriteIds.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 py-20">
            <p className="text-gray-600">You have not added any favorites yet.</p>
            <Link href="/">
              <Button>Browse store</Button>
            </Link>
          </div>
        ) : products.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 py-20">
            <p className="text-gray-600">These products are no longer available.</p>
            <Link href="/">
              <Button>Back to home</Button>
            </Link>
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                imgUrl={[
                  `${IMAGE_BASE_URL}${product.images[0]}`,
                  `${IMAGE_BASE_URL}${product.images[1] ?? product.images[0]}`,
                ]}
                name={product.name}
                price={product.price}
                isAvailable={product.isAvailable}
                dealPrice={product.salePrice ?? undefined}
                specs={product.specialFeatures}
                url={`/product/${product.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
