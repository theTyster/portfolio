import { useRef, type MutableRefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./zoomable-image.scss";

export class ZoomImage {
  zoomTl: gsap.core.Timeline | undefined;
  container: HTMLButtonElement | null;
  selector: HTMLImageElement | null;
  initialWidth: number;

  constructor(
    container: HTMLButtonElement | null,
    selector: HTMLImageElement | null,
    initialWidth: number,
  ) {
    this.selector = selector;
    this.container = container;
    this.initialWidth = initialWidth;
  }

  createTimeline() {
    const zoomDefaults = {
      duration: 0.5,
      ease: "power2.inOut",
    };

    this.zoomTl = gsap
      .timeline({ defaults: zoomDefaults })
      .to([this.selector, this.container], {
        width: "100%",
        flex: 1,
      })
      .to("svg", {
        duration: 0,
        opacity: 1,
        zIndex: 2,
        width: "revert",
        height: "revert",
      });

    this.zoom();
  }

  async zoom() {
    if (!this.zoomTl) {
      this.createTimeline();
    }
    if (!this.zoomTl) {
      throw new Error("Zoom Animation was not successfully created");
    }
    await this.zoomTl.reversed(!this.zoomTl.reversed());
  }
}

function ZoomableImage({
  img: zImage,
  container: zContainerRef,
  initialWidth,
}: {
  img: React.ImgHTMLAttributes<HTMLImageElement>;
  container?: MutableRefObject<HTMLButtonElement | null>;
  initialWidth: number;
}) {
  const zoomContainer: MutableRefObject<HTMLButtonElement | null> =
    zContainerRef ? zContainerRef : useRef(null);

  const hoverTextRef: MutableRefObject<HTMLHeadingElement | null> =
    useRef(null);
  const hoverTextTl: MutableRefObject<gsap.core.Timeline | null> = useRef(null);

  const zoomAnimRef: MutableRefObject<ZoomImage | null> = useRef(null);
  const zImageRef: MutableRefObject<HTMLImageElement | null> = useRef(null);

  const { contextSafe: zoomCtx } = useGSAP(
    async () => {
      zoomAnimRef.current = new ZoomImage(
        zoomContainer.current,
        zImageRef.current,
        initialWidth,
      );
      hoverTextTl.current = gsap.timeline();
      hoverTextTl.current.to(hoverTextRef.current, {
        opacity: 1,
        height: "initial",
        duration: 0.2,
        ease: "power2.inOut",
      });
      await hoverTextTl.current.play();
    },
    {
      scope: zoomContainer,
    },
  );

  const zoomAnimClick = zoomCtx(() => {
    if (!zoomAnimRef.current) {
      throw new Error("Zoom Animation not successfully created");
    }
    zoomAnimRef.current.zoom();
    hoverTextTl.current!.reversed(!hoverTextTl.current!.reversed());
  });

  const keyUpHandler = (e: React.KeyboardEvent<HTMLOrSVGElement>) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
      zoomAnimClick();
    }
  };
  const buttonBorder = 25;
  return (
    <button
      className="zoomable-image"
      style={{ width: initialWidth + buttonBorder + "px" }}
      ref={zoomContainer}
      onClick={zoomAnimClick}
      onKeyUp={keyUpHandler}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-label="Zoom Image"
        role="button"
        tabIndex={0}
        width={buttonBorder * 2}
        height={buttonBorder * 2}
        viewBox="-5,-5,266,266"
        onKeyUp={keyUpHandler}
      >
        <rect
          fill="#ffffff"
          stroke="#424b54"
          strokeWidth="10"
          width="256"
          height="256"
          rx="40"
        ></rect>
        <g transform="scale(5.12,5.12)">
          <path
            fill="#424b54"
            d="M5.97852,3.98047c-0.81349,0.00101 -1.54534,0.49459 -1.85108,1.24844c-0.30574,0.75385 -0.12447,1.61777 0.4585,2.18515l10.58594,10.58594h-5.17187c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h12v-12c0.00739,-0.54026 -0.2041,-1.06052 -0.58634,-1.44239c-0.38224,-0.38187 -0.90271,-0.59286 -1.44296,-0.58495c-1.1038,0.01618 -1.9858,0.92353 -1.9707,2.02734v5.17188l-10.58594,-10.58594c-0.37701,-0.38755 -0.89487,-0.60596 -1.43555,-0.60547zM43.96094,3.98047c-0.5196,0.01548 -1.01276,0.23264 -1.375,0.60547l-10.58594,10.58594v-5.17187c0.00739,-0.54026 -0.2041,-1.06052 -0.58634,-1.44239c-0.38224,-0.38187 -0.90271,-0.59286 -1.44296,-0.58495c-1.1038,0.01618 -1.9858,0.92353 -1.9707,2.02734v12h12c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175h-5.17187l10.58594,-10.58594c0.59152,-0.57498 0.76938,-1.45413 0.44787,-2.21383c-0.32151,-0.75969 -1.07643,-1.24409 -1.90099,-1.21977zM10,28c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h5.17188l-10.58594,10.58594c-0.52247,0.50163 -0.73294,1.24653 -0.55022,1.94741c0.18271,0.70088 0.73006,1.24822 1.43094,1.43094c0.70088,0.18271 1.44578,-0.02775 1.94741,-0.55022l10.58594,-10.58594v5.17188c-0.0102,0.72127 0.36875,1.39216 0.99175,1.75578c0.623,0.36361 1.39351,0.36361 2.01651,0c0.623,-0.36361 1.00195,-1.0345 0.99175,-1.75578v-12zM28,28v12c-0.0102,0.72127 0.36875,1.39216 0.99175,1.75578c0.623,0.36361 1.39351,0.36361 2.01651,0c0.623,-0.36361 1.00195,-1.0345 0.99175,-1.75578v-5.17187l10.58594,10.58594c0.50163,0.52248 1.24653,0.73295 1.94742,0.55024c0.70088,-0.18271 1.24823,-0.73006 1.43094,-1.43094c0.18271,-0.70088 -0.02776,-1.44578 -0.55024,-1.94742l-10.58594,-10.58594h5.17188c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175z"
          ></path>
        </g>
      </svg>
      <p
        className="zoomable-image_clickExpand"
        style={{ width: initialWidth }}
        ref={hoverTextRef}
      >
        Click to Expand
      </p>
      <img
        {...zImage}
        width={initialWidth}
        src={zImage.src}
        className={zImage.className ? zImage.className : ""}
        ref={zImageRef}
      />
    </button>
  );
}

export default ZoomableImage;
