import { NextResponse } from "next/server";
import { chromium } from "playwright";

export async function POST(
  req: Request
) {
  const { url } = await req.json();

  if (
    !url ||
    typeof url !== "string" ||
    !url.startsWith("http")
  ) {
    return NextResponse.json(
      {
        error: "Invalid URL",
      },
      {
        status: 400,
      }
    );
  }

  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage({
      viewport: {
        width: 1728,
        height: 1117,
      },
    });

    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    // Wait for fonts

    await page.evaluate(async () => {
      // @ts-ignore
      if (document.fonts) {
        // @ts-ignore
        await document.fonts.ready;
      }
    });

    // Let page settle

    await page.waitForTimeout(2000);

    // Trigger scroll animations
    // GSAP, Framer Motion, AOS, etc.

    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;

        const distance = 500;

        const timer = setInterval(() => {
          window.scrollBy(0, distance);

          totalHeight += distance;

          if (
            totalHeight >=
            document.body.scrollHeight
          ) {
            clearInterval(timer);
            resolve();
          }
        }, 250);
      });
    });

    // Scroll back to top

    await page.evaluate(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant" as ScrollBehavior,
      });
    });

    await page.waitForTimeout(1000);

    // Freeze animations before capture

    await page.addStyleTag({
      content: `
        *,
        *::before,
        *::after {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }
      `,
    });

    // Small delay after freezing

    await page.waitForTimeout(300);

    const screenshot =
      await page.screenshot({
        fullPage: true,
        type: "png",
        animations: "disabled",
      });

    return new NextResponse(
      new Uint8Array(screenshot),
      {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to capture website screenshot",
      },
      {
        status: 500,
      }
    );
  } finally {
    await browser.close();
  }
}