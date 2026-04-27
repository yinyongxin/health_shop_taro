import { getWxShopCateList } from "@/client";
import { LucideIcon } from "@/components";
import { useRequest } from "@/hooks";
import { appRouter } from "@/router";
import { Text, View, Image } from "@tarojs/components";

const QuickService = ({
  icon,
  label,
  onClick,
}: {
  icon?: string;
  label: string;
  onClick?: () => void;
}) => (
  <View className="flex flex-col items-center gap-2" onClick={onClick}>
    <View
      className="size-[100px] rounded-full flex items-center justify-center shadow-sm"
      style={{
        background: "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)",
      }}
    >
      {icon ? (
        <Image className="size-[40px]" src={icon} />
      ) : (
        <LucideIcon name="image" />
      )}
    </View>
    <Text className="text-[24px] text-slate-600 font-medium w-full truncate text-center">
      {label}
    </Text>
  </View>
);

export type CategoriesPropsType = {
  orgId?: string;
};

export const Categories = (props: CategoriesPropsType) => {
  const { orgId } = props;
  const { data: categories } = useRequest(
    async () => {
      if (!orgId) {
        return;
      }
      const res = await getWxShopCateList({
        query: { orgId },
      });
      return res.data?.data
        .map((item) => item.subCategoryList)
        .flat()
        .slice(0, 4);
    },
    {
      refreshDeps: [orgId],
    },
  );
  return (
    categories &&
    categories.length > 0 && (
      <View className="grid grid-cols-4 mt-4">
        {categories.map((item) => (
          <QuickService
            key={item.id}
            icon={item.logo}
            label={item.name}
            onClick={() => {
              appRouter.navigateTo("subCategoryProductList", {
                query: {
                  subCategoryId: item.id.toString(),
                },
              });
            }}
          />
        ))}
      </View>
    )
  );
};
