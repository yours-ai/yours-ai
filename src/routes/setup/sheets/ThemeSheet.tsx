import { Dispatch, SetStateAction, useState } from "react";
import SettingTitle from "@/routes/setup/sheets/SettingTitle.tsx";
import SegmentedControlBar from "@/components/macos/SegmentedControlBar.tsx";
import SegmentBoard from "@/components/macos/SegmentBoard.tsx";
import SetupControlButton from "@/components/macos/SetupControlButton.tsx";
import { useTranslation } from "react-i18next";
import Sheet from "@/components/macos/Sheet.tsx";
import { AvailableBundledThemeId } from "@/domain/config/models.ts";
import { BundledThemes } from "@/components/themes/models";
import { useDynamicTranslation } from "@/locales/hooks.ts";
import { useMutation } from "@tanstack/react-query";
import { makeGlobalConfigService } from "@/domain/config/services.ts";
import { useDb } from "@/contexts/DbContext.ts";

export interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

export default function ThemeSheet({ setStep }: Props) {
  const { t } = useTranslation("pages/setup");
  const [value, setValue] = useState<AvailableBundledThemeId | "custom">(
    "theFruit",
  );
  const { t: dynamicT } = useDynamicTranslation();
  const mutation = useMutation({
    mutationFn: makeGlobalConfigService(useDb()).updateGlobalConfig,
    onSuccess() {
      setStep((prev) => prev + 1);
    },
  });

  return (
    <Sheet
      content={
        <>
          <SettingTitle title={t("themeContent.title")} />
          <div className="mt-[24px] flex w-full flex-col items-center gap-[17px]">
            <SegmentedControlBar
              value={value}
              options={[
                ...Object.values(BundledThemes).map((theme) => ({
                  value: theme.id as AvailableBundledThemeId,
                  label: dynamicT(theme.name),
                })),
                /* TODO: upload custom theme */
                {
                  value: "custom",
                  label: t("themeContent.themes.custom.name"),
                },
              ]}
              onChange={setValue}
            />
            {value === "custom" ? (
              <div className="flex h-[223px] w-[421px] items-center justify-center">
                <SetupControlButton
                  custom={t("themeContent.themes.custom.upload")}
                  upload
                />
              </div>
            ) : (
              <SegmentBoard
                img={
                  BundledThemes[value].descriptionImg
                    ? dynamicT(BundledThemes[value].descriptionImg)
                    : undefined
                }
              />
            )}
            <div className="text-13p leading-[16px]">
              {value !== "custom" &&
                BundledThemes[value].description &&
                dynamicT(BundledThemes[value].description)}
            </div>
          </div>
        </>
      }
      rightActions={
        <>
          <SetupControlButton
            onClick={() => setStep((prev) => prev - 1)}
            goBack
          />
          <SetupControlButton
            disabled={value === "custom" /* TODO: implement custom theme */}
            onClick={() =>
              value !== "custom" &&
              mutation.mutate({
                theme: {
                  type: "bundled",
                  id: value,
                },
              })
            }
          />
        </>
      }
    />
  );
}
