import SetupLayout from "@/routes/setup/SetupLayout.tsx";
import SetupStart from "@/routes/setup/SetupStart.tsx";
import { Suspense, useEffect, useMemo, useState } from "react";
import DefaultErrorBoundary from "@/components/common/DefaultErrorBoundary.tsx";
import { DefaultLanguage } from "@/locales/models.ts";
import LanguageSheet from "@/routes/setup/sheets/LanguageSheet.tsx";
import DataSheet from "@/routes/setup/sheets/DataSheet.tsx";
import ThemeSheet from "@/routes/setup/sheets/ThemeSheet.tsx";
import ConversationStyleSheet from "@/routes/setup/sheets/ConversationStyleSheet.tsx";
import { useCurrentLanguage } from "@/locales/hooks.ts";
import ApiKeySheet from "@/routes/setup/sheets/ApiKeySheet.tsx";
import TranslateSheet from "@/routes/setup/sheets/TranslateSheet.tsx";
import TypingSimulationSheet from "@/routes/setup/sheets/TypingSimulationSheet.tsx";
import PersonaSheet from "@/routes/setup/sheets/PersonaSheet.tsx";
import { useLiveQuery } from "dexie-react-hooks";
import { useDb } from "@/contexts/DbContext.ts";
import { makeGlobalConfigRepository } from "@/domain/config/repository.ts";
import { prefetchBundledThemes } from "@/hooks/useTheme.ts";
import { useQueryClient } from "@tanstack/react-query";
import InstallSheet from "@/routes/setup/sheets/InstallSheet.tsx";
import { useIsPwa } from "@/hooks/useIsPwa.ts";

export function Component() {
  const currentLanguage = useCurrentLanguage();
  const [step, setStep] = useState<number>(0);
  const db = useDb();
  const config = useLiveQuery(makeGlobalConfigRepository(db).getGlobalConfig);
  const needAPIKeySetup = useLiveQuery(
    makeGlobalConfigRepository(db).needAPIKeySetup,
  );
  const queryClient = useQueryClient();
  const isPwa = useIsPwa();

  useEffect(() => {
    if (config?.language === "en" && config.conversationConfig.doTranslation) {
      void makeGlobalConfigRepository(db).updateGlobalConversationConfig({
        doTranslation: false,
      });
    }
  }, [config, db]);

  useEffect(() => {
    void prefetchBundledThemes(queryClient);
  }, [queryClient]);

  const steps = useMemo(() => {
    const stepsLength = [
      true,
      true,
      !isPwa,
      true,
      Boolean(config),
      Boolean(config),
      Boolean(needAPIKeySetup),
      Boolean(config && currentLanguage !== DefaultLanguage),
      Boolean(config),
      Boolean(config),
    ].filter(Boolean).length;
    return [
      <SetupStart key={0} setStep={setStep} />,
      <LanguageSheet key={1} setStep={setStep} />,
      !isPwa && <InstallSheet key={2} setStep={setStep} />,
      <DataSheet
        key={3}
        setStep={setStep}
        goToLastStep={() => setStep(stepsLength - 1)}
      />,
      config && <ThemeSheet config={config} key={4} setStep={setStep} />,
      config && (
        <ConversationStyleSheet key={5} config={config} setStep={setStep} />
      ),
      needAPIKeySetup && <ApiKeySheet key={6} setStep={setStep} />,
      config && currentLanguage !== DefaultLanguage && (
        <TranslateSheet config={config} key={7} setStep={setStep} />
      ),
      config && (
        <TypingSimulationSheet key={8} setStep={setStep} config={config} />
      ),
      config && <PersonaSheet config={config} key={9} setStep={setStep} />,
    ].filter(Boolean);
  }, [config, currentLanguage, needAPIKeySetup, isPwa]);

  return (
    <SetupLayout>
      <Suspense fallback={<div />}>{steps[step]}</Suspense>
    </SetupLayout>
  );
}

export const ErrorBoundary = DefaultErrorBoundary;

Component.displayName = "SetupPage";
