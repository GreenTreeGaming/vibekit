import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(
  req: Request
) {
  let browser: any;

  try {
    const { url } =
      await req.json();

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

    const isDev =
      process.env.NODE_ENV ===
      "development";

    if (isDev) {
      const {
        chromium,
      } = await import(
        "playwright"
      );

      browser =
        await chromium.launch({
          headless: true,
        });
    } else {
      const chromium =
        (
          await import(
            "@sparticuz/chromium"
          )
        ).default;

      const {
        chromium: playwright,
      } = await import(
        "playwright-core"
      );

      browser =
        await playwright.launch({
          args: chromium.args,

          executablePath:
            await chromium.executablePath(),

          headless: true,
        });
    }

    const page =
      await browser.newPage({
        viewport: {
          width: 1728,
          height: 1117,
        },
      });

    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    await page.evaluate(
      async () => {
        // @ts-ignore
        if (document.fonts) {
          // @ts-ignore
          await document.fonts.ready;
        }
      }
    );

    await page.waitForTimeout(
      2000
    );

    await page.evaluate(
      async () => {
        await new Promise<void>(
          (resolve) => {
            let totalHeight = 0;

            const distance = 500;

            const timer =
              setInterval(() => {
                window.scrollBy(
                  0,
                  distance
                );

                totalHeight +=
                  distance;

                if (
                  totalHeight >=
                  document.body
                    .scrollHeight
                ) {
                  clearInterval(
                    timer
                  );

                  resolve();
                }
              }, 250);
          }
        );
      }
    );

    await page.evaluate(() => {
      window.scrollTo({
        top: 0,
        behavior:
          "instant" as ScrollBehavior,
      });
    });

    await page.waitForTimeout(
      1000
    );

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

    await page.waitForTimeout(
      300
    );

    const screenshot =
      await page.screenshot({
        fullPage: true,
        type: "png",
        animations:
          "disabled",
      });

    return new NextResponse(
      new Uint8Array(
        screenshot
      ),
      {
        headers: {
          "Content-Type":
            "image/png",
          "Cache-Control":
            "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "SCREENSHOT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}