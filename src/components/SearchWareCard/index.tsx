import { ProductDetail } from "@/client";
import { View, Text } from "@tarojs/components";
import { AppImage } from "../AppImage";

export type SearchWareCardProps = {
  info: ProductDetail;
  border?: boolean;
  handleClick?: () => void;
};

const TagBadge = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "sale" | "hot" | "new";
}) => {
  const styles = {
    sale: "bg-gradient-to-r from-orange-500 to-red-500",
    hot: "bg-gradient-to-r from-rose-500 to-pink-500",
    new: "bg-gradient-to-r from-sky-500 to-blue-500",
  };
  return (
    <View
      className={`px-[12px] py-[4px] rounded-full text-[20px] text-white font-medium ${styles[type]}`}
    >
      {children}
    </View>
  );
};

export const SearchWareCard = (props: SearchWareCardProps) => {
  const { border, info, handleClick } = props;
  const hasDiscount = info.originalPrice && info.originalPrice > info.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - info.price / info.originalPrice!) * 100)
    : 0;

  return (
    <View
      className="pb-3 pl-3 w-1/2 relative"
      onClick={() => {
        handleClick?.();
      }}
    >
      <View
        className="rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        style={{
          border: border ? "2px solid #E2E8F0" : "none",
        }}
      >
        <View className="relative">
          <AppImage
            className="w-full h-[280px] bg-gradient-to-br from-sky-50 to-blue-100"
            src={info.mainImage}
            mode="aspectFill"
          />
          <View className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <View className="absolute top-[16px] left-[16px] flex gap-[8px] flex-wrap">
            <TagBadge type="new">新品</TagBadge>
            {hasDiscount && discountPercent > 10 && discountPercent < 100 && (
              <TagBadge type="sale">{discountPercent / 10}折</TagBadge>
            )}
          </View>
          {/* <View className="absolute bottom-[16px] right-[16px]">
            <View
              className="w-[56px] h-[56px] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Text className="text-[28px] text-sky-500">♡</Text>
            </View>
          </View> */}
        </View>

        <View className="p-[20px]">
          <View className="flex items-start gap-[12px] mb-[16px]">
            <View className="flex-1 min-w-0">
              <Text className="text-[28px] font-bold text-slate-800 truncate block leading-tight">
                {info.name}
              </Text>
              <View className="flex items-center gap-[8px] mt-[8px]">
                <View
                  className="px-[12px] py-[4px] rounded-full text-[20px]"
                  style={{
                    background:
                      "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)",
                  }}
                >
                  <Text className="text-sky-600 font-medium">
                    {info.categoryName || "健康商品"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <Text className="text-[24px] text-slate-500 line-clamp-1 leading-relaxed mb-[16px]">
            {info.description || "暂无介绍"}
          </Text>

          <View className="flex items-end justify-between pt-[16px] border-t border-slate-100">
            <View className="flex items-baseline gap-[6px]">
              <Text className="text-[24px] text-sky-500 font-semibold">¥</Text>
              <Text className="text-[40px] font-bold text-sky-600 leading-none">
                {info.price}
              </Text>
              {hasDiscount && (
                <View className="flex items-center gap-[8px]">
                  <Text className="text-[22px] text-slate-400 line-through">
                    ¥{info.originalPrice}
                  </Text>
                  <View
                    className="px-[10px] py-[4px] rounded-md"
                    style={{
                      background:
                        "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
                    }}
                  >
                    <Text className="text-orange-600 text-[20px] font-semibold">
                      省 ¥{(info.originalPrice! - info.price).toFixed(1)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
