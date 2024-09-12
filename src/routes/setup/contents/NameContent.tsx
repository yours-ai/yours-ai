import SettingTitle from "@/components/SettingTitle";
import { Trans, useTranslation } from "react-i18next";

function NameContent() {
  const { t } = useTranslation("pages/setup");
  return (
    <>
      <SettingTitle
        title={
          <Trans i18nKey="nameContent.title" t={t}>
            설정이 모두 끝났어요!<br></br>마지막으로, 어떻게 불러드릴까요?
          </Trans>
        }
      />
      <div className="mt-[56px] flex w-[263px] flex-col gap-[21px] overflow-visible text-13p leading-[16px]">
        <div className="relative flex w-full gap-[22px]">
          <div
            className="absolute bottom-[3px] right-0 text-13p leading-[16px]"
            style={{ transform: "translateX(-280px)", whiteSpace: "nowrap" }}
          >
            {t("nameContent.name.label")}:
          </div>
          <input
            type="text"
            className="w-1/2 rounded-[5px] px-[7px] py-[3px] outline-0 placeholder:text-black/25"
            placeholder={t("nameContent.name.placeholder.first")}
            style={{
              boxShadow:
                "0px 0.5px 2.5px 0px rgba(0, 0, 0, 0.30), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.05)",
            }}
          />
          <input
            type="text"
            className="w-1/2 rounded-[5px] px-[7px] py-[3px] outline-0 placeholder:text-black/25"
            placeholder={t("nameContent.name.placeholder.second")}
            style={{
              boxShadow:
                "0px 0.5px 2.5px 0px rgba(0, 0, 0, 0.30), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.05)",
            }}
          />
        </div>
        <div className="relative">
          <div
            className="absolute right-0 top-[3px] text-13p leading-[16px]"
            style={{ transform: "translateX(-280px)", whiteSpace: "nowrap" }}
          >
            {t("nameContent.intro.label")}:
          </div>
          <textarea
            placeholder={t("nameContent.intro.placeholder")}
            rows={10}
            className="w-full resize-none rounded-[5px] px-[7px] py-[5px] outline-0 placeholder:text-black/25"
            style={{
              boxShadow:
                "0px 0.5px 2.5px 0px rgba(0, 0, 0, 0.30), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.05)",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default NameContent;
