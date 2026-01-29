import { downloadInvoiceService } from "../../services/payment/downloadInvoice.service.js";
import { respond } from "../../utils/respond.js";

export const downloadInvoiceController = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const pdfBuffer = await downloadInvoiceService(paymentId);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${paymentId}.pdf`,
      "Content-Length": pdfBuffer.length,
    });

    res.status(200).send(pdfBuffer);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
