// Import Puppeteer
import puppeteer from "puppeteer";

// Function to generate PDF from given HTML string
export const generatePdfFromHtml = async (html) => {
  // Launch a new headless browser instance
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // Open a new blank page
  const page = await browser.newPage();

  // Set the HTML content into the page
  await page.setContent(html, { waitUntil: "networkidle0" });

  // Generate PDF from the rendered page
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "0px",
      bottom: "0px",
      left: "0px",
      right: "0px",
    },
  });

  // Close the browser
  await browser.close();

  // Return the PDF file as Buffer
  return pdfBuffer;
};
