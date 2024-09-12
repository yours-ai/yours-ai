import { useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { useTranslation } from "react-i18next";
import {
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";

function AreYouThereBubble({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation("pages/setup");
  const [isPrompt, setIsPrompt] = useState<boolean>(false);
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);
  const arrowRef = useRef(null);
  const { refs, context, strategy, x, y } = useFloating({
    open: true,
    middleware: [
      offset(15),
      flip(),
      shift(),
      arrow({ element: arrowRef, padding: 10 }),
    ],
    whileElementsMounted: autoUpdate,
    placement: "bottom",
  });
  const hover = useHover(context, { delay: { open: 0, close: 0 } });
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: "tooltip",
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
    role,
  ]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      <div
        ref={refs.setFloating}
        className={`rounded-[10px] bg-white px-[17px] pb-[17px] pt-[10px] text-25p leading-[30px]`}
        style={{
          width: "max-content",
          position: strategy,
          top: y ?? 0,
          left: x,
          zIndex: 10,
          boxShadow:
            "0px 8px 40px 0px rgba(0, 0, 0, 0.25), 0px 0px 3px 0px rgba(0, 0, 0, 0.55), 0px 0px 3px 0px rgba(255, 255, 255, 0.10)",
        }}
        {...getFloatingProps()}
      >
        <p className="relative z-20">
          <div className={`${isPrompt ? "italic text-[#CA5858]" : ""}`}>
            {!animationComplete ? (
              <TypeAnimation
                sequence={[
                  t("setupStart.bubble.systemPrompt"),
                  1000,
                  () => {
                    setIsPrompt(true);
                    setAnimationComplete(true);
                  },
                ]}
                wrapper="span"
                cursor={false}
                className="leading-[30px]"
              />
            ) : (
              <span className="leading-[30px]">
                {t("setupStart.bubble.systemPromptItalics")}
              </span>
            )}
          </div>
          {isPrompt ? (
            <TypeAnimation
              sequence={[
                t("setupStart.bubble.conversation"),
                1000,
                () => {
                  console.log("sequence completed");
                },
              ]}
              wrapper="span"
              cursor={false}
              className="leading-[30px]"
              style={{ display: "inline-block", textAlign: "center" }}
            />
          ) : null}
        </p>

        <div
          ref={arrowRef}
          style={{
            position: "absolute",
            width: "12px",
            height: "12px",
            background: "white",
            transform: "rotate(45deg)",
            top: "-5px",
            left: "10px",
            zIndex: 2,
            marginLeft: "1px",
            borderRadius: "2px",
            boxShadow:
              "0px 8px 40px 0px rgba(0, 0, 0, 0.25), 0px 0px 3px 0px rgba(0, 0, 0, 0.55), 0px 0px 3px 0px rgba(255, 255, 255, 0.10)",
          }}
        />
        <div className="absolute inset-0 z-10 rounded-[10px] bg-white" />
      </div>
    </>
  );
}

export default AreYouThereBubble;
